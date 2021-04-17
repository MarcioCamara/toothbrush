/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { drag } from 'd3-drag';
import { pointer, select } from 'd3-selection';
import { zoomIdentity } from 'd3-zoom';
const FRAC_VIEWPOINT_AREA = 0.8;
export class Minimap {
    constructor(svg, zoomG, mainZoom, minimap, maxWidth, labelPadding) {
        this.svg = svg;
        this.labelPadding = labelPadding;
        this.zoomG = zoomG;
        this.mainZoom = mainZoom;
        this.maxWidth = maxWidth;
        const minimapElement = select(minimap);
        const minimapSvgElement = minimapElement.select('svg');
        const viewpointElement = minimapSvgElement.select('rect');
        this.canvas = minimapElement.select('canvas.viewport').node();
        this.canvasRect = this.canvas.getBoundingClientRect();
        const handleEvent = (event) => {
            const minimapOffset = this.minimapOffset();
            const width = Number(viewpointElement.attr('width'));
            const height = Number(viewpointElement.attr('height'));
            const clickCoords = pointer(event, minimapSvgElement.node());
            this.viewpointCoord.x = clickCoords[0] - width / 2 - minimapOffset.x;
            this.viewpointCoord.y = clickCoords[1] - height / 2 - minimapOffset.y;
            this.updateViewpoint();
        };
        this.viewpointCoord = { x: 0, y: 0 };
        const dragEvent = drag().subject(Object).on('drag', handleEvent);
        viewpointElement.datum(this.viewpointCoord).call(dragEvent);
        // Make the minimap clickable.
        minimapSvgElement.on('click', event => {
            if (event.defaultPrevented) {
                // This click was part of a drag event, so suppress it.
                return;
            }
            handleEvent(event);
        });
        this.viewpoint = viewpointElement.node();
        this.minimapSvg = minimapSvgElement.node();
        this.minimap = minimap;
        this.canvasBuffer = minimapElement.select('canvas.buffer').node();
        this.update();
    }
    minimapOffset() {
        return {
            x: (this.canvasRect.width - this.minimapSize.width) / 2,
            y: (this.canvasRect.height - this.minimapSize.height) / 2
        };
    }
    updateViewpoint() {
        // Update the coordinates of the viewpoint rectangle.
        select(this.viewpoint).attr('x', this.viewpointCoord.x).attr('y', this.viewpointCoord.y);
        // Update the translation vector of the main svg to reflect the
        // new viewpoint.
        const mainX = (-this.viewpointCoord.x * this.scaleMain) / this.scaleMinimap;
        const mainY = (-this.viewpointCoord.y * this.scaleMain) / this.scaleMinimap;
        select(this.svg).call(this.mainZoom.transform, zoomIdentity.translate(mainX, mainY).scale(this.scaleMain));
    }
    update() {
        let sceneSize = null;
        try {
            // Get the size of the entire scene.
            sceneSize = this.zoomG.getBBox();
            if (sceneSize.width === 0) {
                // There is no scene anymore. We have been detached from the dom.
                return;
            }
        }
        catch (e) {
            // Firefox produced NS_ERROR_FAILURE if we have been
            // detached from the dom.
            return;
        }
        const svgSelection = select(this.svg);
        // Read all the style rules in the document and embed them into the svg.
        // The svg needs to be self contained, i.e. all the style rules need to be
        // embedded so the canvas output matches the origin.
        let stylesText = '';
        for (const k of new Array(document.styleSheets.length).keys()) {
            try {
                const cssRules = document.styleSheets[k].cssRules || document.styleSheets[k].rules;
                if (cssRules == null) {
                    continue;
                }
                for (const i of new Array(cssRules.length).keys()) {
                    // Remove tf-* selectors from the styles.
                    stylesText += cssRules[i].cssText.replace(/ ?tf-[\w-]+ ?/g, '') + '\n';
                }
            }
            catch (e) {
                if (e.name !== 'SecurityError') {
                    throw e;
                }
            }
        }
        // Temporarily add the css rules to the main svg.
        const svgStyle = svgSelection.append('style');
        svgStyle.text(stylesText);
        // Temporarily remove the zoom/pan transform from the main svg since we
        // want the minimap to show a zoomed-out and centered view.
        const zoomGSelection = select(this.zoomG);
        const zoomTransform = zoomGSelection.attr('transform');
        zoomGSelection.attr('transform', null);
        // Since we add padding, account for that here.
        sceneSize.height += this.labelPadding * 2;
        sceneSize.width += this.labelPadding * 2;
        // Temporarily assign an explicit width/height to the main svg, since
        // it doesn't have one (uses flex-box), but we need it for the canvas
        // to work.
        svgSelection.attr('width', sceneSize.width).attr('height', sceneSize.height);
        // Since the content inside the svg changed (e.g. a node was expanded),
        // the aspect ratio have also changed. Thus, we need to update the scale
        // factor of the minimap. The scale factor is determined such that both
        // the width and height of the minimap are <= maximum specified w/h.
        this.scaleMinimap = this.maxWidth / Math.max(sceneSize.width, sceneSize.height);
        this.minimapSize = {
            width: sceneSize.width * this.scaleMinimap,
            height: sceneSize.height * this.scaleMinimap
        };
        const minimapOffset = this.minimapOffset();
        // Update the size of the minimap's svg, the buffer canvas and the
        // viewpoint rect.
        select(this.minimapSvg).attr(this.minimapSize);
        select(this.canvasBuffer).attr(this.minimapSize);
        if (this.translate != null && this.zoom != null) {
            // Update the viewpoint rectangle shape since the aspect ratio of the
            // map has changed.
            requestAnimationFrame(() => this.zoom());
        }
        // Serialize the main svg to a string which will be used as the rendering
        // content for the canvas.
        const svgXml = new XMLSerializer().serializeToString(this.svg);
        // Now that the svg is serialized for rendering, remove the temporarily
        // assigned styles, explicit width and height and bring back the pan/zoom
        // transform.
        svgStyle.remove();
        svgSelection.attr('width', '100%').attr('height', '100%');
        zoomGSelection.attr('transform', zoomTransform);
        const image = new Image();
        image.onload = () => {
            // Draw the svg content onto the buffer canvas.
            const context = this.canvasBuffer.getContext('2d');
            context.clearRect(0, 0, this.canvasBuffer.width, this.canvasBuffer.height);
            context.drawImage(image, minimapOffset.x, minimapOffset.y, this.minimapSize.width, this.minimapSize.height);
            requestAnimationFrame(() => {
                // Hide the old canvas and show the new buffer canvas.
                select(this.canvasBuffer).style('display', 'block');
                select(this.canvas).style('display', 'none');
                // Swap the two canvases.
                [this.canvas, this.canvasBuffer] = [this.canvasBuffer, this.canvas];
            });
        };
        image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgXml);
    }
    /**
     * Handles changes in zooming/panning. Should be called from the main svg
     * to notify that a zoom/pan was performed and this minimap will update it's
     * viewpoint rectangle.
     * @param transform
     */
    zoom(transform) {
        if (this.scaleMinimap == null) {
            // Scene is not ready yet.
            return;
        }
        // Update the new translate and scale params, only if specified.
        if (transform) {
            this.translate = [transform.x, transform.y];
            this.scaleMain = transform.k;
        }
        // Update the location of the viewpoint rectangle.
        const svgRect = this.svg.getBoundingClientRect();
        const minimapOffset = this.minimapOffset();
        const viewpointSelection = select(this.viewpoint);
        this.viewpointCoord.x = (-this.translate[0] * this.scaleMinimap) / this.scaleMain;
        this.viewpointCoord.y = (-this.translate[1] * this.scaleMinimap) / this.scaleMain;
        const viewpointWidth = (svgRect.width * this.scaleMinimap) / this.scaleMain;
        const viewpointHeight = (svgRect.height * this.scaleMinimap) / this.scaleMain;
        viewpointSelection
            .attr('x', this.viewpointCoord.x + minimapOffset.x)
            .attr('y', this.viewpointCoord.y + minimapOffset.y)
            .attr('width', viewpointWidth)
            .attr('height', viewpointHeight);
        // Show/hide the minimap depending on the viewpoint area as fraction of the
        // whole minimap.
        const mapWidth = this.minimapSize.width;
        const mapHeight = this.minimapSize.height;
        const x = this.viewpointCoord.x;
        const y = this.viewpointCoord.y;
        const w = Math.min(Math.max(0, x + viewpointWidth), mapWidth) - Math.min(Math.max(0, x), mapWidth);
        const h = Math.min(Math.max(0, y + viewpointHeight), mapHeight) - Math.min(Math.max(0, y), mapHeight);
        const fracIntersect = (w * h) / (mapWidth * mapHeight);
        if (fracIntersect < FRAC_VIEWPOINT_AREA) {
            this.minimap.classList.remove('hidden');
        }
        else {
            this.minimap.classList.add('hidden');
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaW1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvZ3JhcGgvY29yZS9taW5pbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDL0IsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDL0MsT0FBTyxFQUFnQixZQUFZLEVBQWlCLE1BQU0sU0FBUyxDQUFDO0FBSXBFLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFDO0FBRWhDLE1BQU0sT0FBTyxPQUFPO0lBbUJsQixZQUNFLEdBQWtCLEVBQ2xCLEtBQWtCLEVBQ2xCLFFBQTRDLEVBQzVDLE9BQW9CLEVBQ3BCLFFBQWdCLEVBQ2hCLFlBQW9CO1FBRXBCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0saUJBQWlCLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RCxNQUFNLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQXVCLENBQUM7UUFDbkYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFdEQs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QUFDLENBQUM7UUFDdkQsSUFBSSxhQUFhLEdBQUcsbUJBQW1CLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3pDO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdEM7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBkcmFnIH0gZnJvbSAnZDMtZHJhZyc7XG5pbXBvcnQgeyBwb2ludGVyLCBzZWxlY3QgfSBmcm9tICdkMy1zZWxlY3Rpb24nO1xuaW1wb3J0IHsgWm9vbUJlaGF2aW9yLCB6b29tSWRlbnRpdHksIFpvb21UcmFuc2Zvcm0gfSBmcm9tICdkMy16b29tJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOelpvb21UcmFuc2Zvcm0gfSBmcm9tICcuLi9pbnRlcmZhY2UnO1xuXG5jb25zdCBGUkFDX1ZJRVdQT0lOVF9BUkVBID0gMC44O1xuXG5leHBvcnQgY2xhc3MgTWluaW1hcCB7XG4gIHByaXZhdGUgbWluaW1hcDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgcHJpdmF0ZSBjYW52YXNSZWN0OiBDbGllbnRSZWN0O1xuICBwcml2YXRlIGNhbnZhc0J1ZmZlcjogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIHByaXZhdGUgbWluaW1hcFN2ZzogU1ZHU1ZHRWxlbWVudDtcbiAgcHJpdmF0ZSB2aWV3cG9pbnQ6IFNWR1JlY3RFbGVtZW50O1xuICBwcml2YXRlIHNjYWxlTWluaW1hcCE6IG51bWJlcjtcbiAgcHJpdmF0ZSBzY2FsZU1haW4hOiBudW1iZXI7XG4gIHByaXZhdGUgbWF4V2lkdGg6IG51bWJlcjtcbiAgcHJpdmF0ZSB0cmFuc2xhdGUhOiBbbnVtYmVyLCBudW1iZXJdO1xuICBwcml2YXRlIHZpZXdwb2ludENvb3JkOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH07XG4gIHByaXZhdGUgbWluaW1hcFNpemUhOiB7IHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyIH07XG4gIHByaXZhdGUgbGFiZWxQYWRkaW5nOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBzdmc6IFNWR1NWR0VsZW1lbnQ7XG4gIHByaXZhdGUgem9vbUc6IFNWR0dFbGVtZW50O1xuICBwcml2YXRlIG1haW5ab29tOiBab29tQmVoYXZpb3I8TnpTYWZlQW55LCBOelNhZmVBbnk+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHN2ZzogU1ZHU1ZHRWxlbWVudCxcbiAgICB6b29tRzogU1ZHR0VsZW1lbnQsXG4gICAgbWFpblpvb206IFpvb21CZWhhdmlvcjxOelNhZmVBbnksIE56U2FmZUFueT4sXG4gICAgbWluaW1hcDogSFRNTEVsZW1lbnQsXG4gICAgbWF4V2lkdGg6IG51bWJlcixcbiAgICBsYWJlbFBhZGRpbmc6IG51bWJlclxuICApIHtcbiAgICB0aGlzLnN2ZyA9IHN2ZztcbiAgICB0aGlzLmxhYmVsUGFkZGluZyA9IGxhYmVsUGFkZGluZztcbiAgICB0aGlzLnpvb21HID0gem9vbUc7XG4gICAgdGhpcy5tYWluWm9vbSA9IG1haW5ab29tO1xuICAgIHRoaXMubWF4V2lkdGggPSBtYXhXaWR0aDtcbiAgICBjb25zdCBtaW5pbWFwRWxlbWVudCA9IHNlbGVjdChtaW5pbWFwKTtcbiAgICBjb25zdCBtaW5pbWFwU3ZnRWxlbWVudCA9IG1pbmltYXBFbGVtZW50LnNlbGVjdCgnc3ZnJyk7XG4gICAgY29uc3Qgdmlld3BvaW50RWxlbWVudCA9IG1pbmltYXBTdmdFbGVtZW50LnNlbGVjdCgncmVjdCcpO1xuICAgIHRoaXMuY2FudmFzID0gbWluaW1hcEVsZW1lbnQuc2VsZWN0KCdjYW52YXMudmlld3BvcnQnKS5ub2RlKCkgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgdGhpcy5jYW52YXNSZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBjb25zdCBoYW5kbGVFdmVudCA9IChldmVudDogTnpTYWZlQW55KTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBtaW5pbWFwT2Zmc2V0ID0gdGhpcy5taW5pbWFwT2Zmc2V0KCk7XG4gICAgICBjb25zdCB3aWR0aCA9IE51bWJlcih2aWV3cG9pbnRFbGVtZW50LmF0dHIoJ3dpZHRoJykpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gTnVtYmVyKHZpZXdwb2ludEVsZW1lbnQuYXR0cignaGVpZ2h0JykpO1xuICAgICAgY29uc3QgY2xpY2tDb29yZHMgPSBwb2ludGVyKGV2ZW50LCBtaW5pbWFwU3ZnRWxlbWVudC5ub2RlKCkgYXMgTnpTYWZlQW55KTtcbiAgICAgIHRoaXMudmlld3BvaW50Q29vcmQueCA9IGNsaWNrQ29vcmRzWzBdIC0gd2lkdGggLyAyIC0gbWluaW1hcE9mZnNldC54O1xuICAgICAgdGhpcy52aWV3cG9pbnRDb29yZC55ID0gY2xpY2tDb29yZHNbMV0gLSBoZWlnaHQgLyAyIC0gbWluaW1hcE9mZnNldC55O1xuICAgICAgdGhpcy51cGRhdGVWaWV3cG9pbnQoKTtcbiAgICB9O1xuICAgIHRoaXMudmlld3BvaW50Q29vcmQgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICBjb25zdCBkcmFnRXZlbnQgPSBkcmFnKCkuc3ViamVjdChPYmplY3QpLm9uKCdkcmFnJywgaGFuZGxlRXZlbnQpO1xuICAgIHZpZXdwb2ludEVsZW1lbnQuZGF0dW0odGhpcy52aWV3cG9pbnRDb29yZCBhcyBOelNhZmVBbnkpLmNhbGwoZHJhZ0V2ZW50IGFzIE56U2FmZUFueSk7XG5cbiAgICAvLyBNYWtlIHRoZSBtaW5pbWFwIGNsaWNrYWJsZS5cbiAgICBtaW5pbWFwU3ZnRWxlbWVudC5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICBpZiAoKGV2ZW50IGFzIEV2ZW50KS5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIC8vIFRoaXMgY2xpY2sgd2FzIHBhcnQgb2YgYSBkcmFnIGV2ZW50LCBzbyBzdXBwcmVzcyBpdC5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaGFuZGxlRXZlbnQoZXZlbnQpO1xuICAgIH0pO1xuICAgIHRoaXMudmlld3BvaW50ID0gdmlld3BvaW50RWxlbWVudC5ub2RlKCkgYXMgU1ZHUmVjdEVsZW1lbnQ7XG4gICAgdGhpcy5taW5pbWFwU3ZnID0gbWluaW1hcFN2Z0VsZW1lbnQubm9kZSgpIGFzIFNWR1NWR0VsZW1lbnQ7XG4gICAgdGhpcy5taW5pbWFwID0gbWluaW1hcDtcbiAgICB0aGlzLmNhbnZhc0J1ZmZlciA9IG1pbmltYXBFbGVtZW50LnNlbGVjdCgnY2FudmFzLmJ1ZmZlcicpLm5vZGUoKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBtaW5pbWFwT2Zmc2V0KCk6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6ICh0aGlzLmNhbnZhc1JlY3Qud2lkdGggLSB0aGlzLm1pbmltYXBTaXplLndpZHRoKSAvIDIsXG4gICAgICB5OiAodGhpcy5jYW52YXNSZWN0LmhlaWdodCAtIHRoaXMubWluaW1hcFNpemUuaGVpZ2h0KSAvIDJcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVWaWV3cG9pbnQoKTogdm9pZCB7XG4gICAgLy8gVXBkYXRlIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgdmlld3BvaW50IHJlY3RhbmdsZS5cbiAgICBzZWxlY3QodGhpcy52aWV3cG9pbnQpLmF0dHIoJ3gnLCB0aGlzLnZpZXdwb2ludENvb3JkLngpLmF0dHIoJ3knLCB0aGlzLnZpZXdwb2ludENvb3JkLnkpO1xuICAgIC8vIFVwZGF0ZSB0aGUgdHJhbnNsYXRpb24gdmVjdG9yIG9mIHRoZSBtYWluIHN2ZyB0byByZWZsZWN0IHRoZVxuICAgIC8vIG5ldyB2aWV3cG9pbnQuXG4gICAgY29uc3QgbWFpblggPSAoLXRoaXMudmlld3BvaW50Q29vcmQueCAqIHRoaXMuc2NhbGVNYWluKSAvIHRoaXMuc2NhbGVNaW5pbWFwO1xuICAgIGNvbnN0IG1haW5ZID0gKC10aGlzLnZpZXdwb2ludENvb3JkLnkgKiB0aGlzLnNjYWxlTWFpbikgLyB0aGlzLnNjYWxlTWluaW1hcDtcbiAgICBzZWxlY3QodGhpcy5zdmcpLmNhbGwodGhpcy5tYWluWm9vbS50cmFuc2Zvcm0sIHpvb21JZGVudGl0eS50cmFuc2xhdGUobWFpblgsIG1haW5ZKS5zY2FsZSh0aGlzLnNjYWxlTWFpbikpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzY2VuZVNpemUgPSBudWxsO1xuICAgIHRyeSB7XG4gICAgICAvLyBHZXQgdGhlIHNpemUgb2YgdGhlIGVudGlyZSBzY2VuZS5cbiAgICAgIHNjZW5lU2l6ZSA9IHRoaXMuem9vbUcuZ2V0QkJveCgpO1xuICAgICAgaWYgKHNjZW5lU2l6ZS53aWR0aCA9PT0gMCkge1xuICAgICAgICAvLyBUaGVyZSBpcyBubyBzY2VuZSBhbnltb3JlLiBXZSBoYXZlIGJlZW4gZGV0YWNoZWQgZnJvbSB0aGUgZG9tLlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gRmlyZWZveCBwcm9kdWNlZCBOU19FUlJPUl9GQUlMVVJFIGlmIHdlIGhhdmUgYmVlblxuICAgICAgLy8gZGV0YWNoZWQgZnJvbSB0aGUgZG9tLlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN2Z1NlbGVjdGlvbiA9IHNlbGVjdCh0aGlzLnN2Zyk7XG4gICAgLy8gUmVhZCBhbGwgdGhlIHN0eWxlIHJ1bGVzIGluIHRoZSBkb2N1bWVudCBhbmQgZW1iZWQgdGhlbSBpbnRvIHRoZSBzdmcuXG4gICAgLy8gVGhlIHN2ZyBuZWVkcyB0byBiZSBzZWxmIGNvbnRhaW5lZCwgaS5lLiBhbGwgdGhlIHN0eWxlIHJ1bGVzIG5lZWQgdG8gYmVcbiAgICAvLyBlbWJlZGRlZCBzbyB0aGUgY2FudmFzIG91dHB1dCBtYXRjaGVzIHRoZSBvcmlnaW4uXG4gICAgbGV0IHN0eWxlc1RleHQgPSAnJztcblxuICAgIGZvciAoY29uc3QgayBvZiBuZXcgQXJyYXkoZG9jdW1lbnQuc3R5bGVTaGVldHMubGVuZ3RoKS5rZXlzKCkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNzc1J1bGVzID0gKGRvY3VtZW50LnN0eWxlU2hlZXRzW2tdIGFzIE56U2FmZUFueSkuY3NzUnVsZXMgfHwgKGRvY3VtZW50LnN0eWxlU2hlZXRzW2tdIGFzIE56U2FmZUFueSkucnVsZXM7XG4gICAgICAgIGlmIChjc3NSdWxlcyA9PSBudWxsKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBpIG9mIG5ldyBBcnJheShjc3NSdWxlcy5sZW5ndGgpLmtleXMoKSkge1xuICAgICAgICAgIC8vIFJlbW92ZSB0Zi0qIHNlbGVjdG9ycyBmcm9tIHRoZSBzdHlsZXMuXG4gICAgICAgICAgc3R5bGVzVGV4dCArPSBjc3NSdWxlc1tpXS5jc3NUZXh0LnJlcGxhY2UoLyA/dGYtW1xcdy1dKyA/L2csICcnKSArICdcXG4nO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChlLm5hbWUgIT09ICdTZWN1cml0eUVycm9yJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUZW1wb3JhcmlseSBhZGQgdGhlIGNzcyBydWxlcyB0byB0aGUgbWFpbiBzdmcuXG4gICAgY29uc3Qgc3ZnU3R5bGUgPSBzdmdTZWxlY3Rpb24uYXBwZW5kKCdzdHlsZScpO1xuICAgIHN2Z1N0eWxlLnRleHQoc3R5bGVzVGV4dCk7XG5cbiAgICAvLyBUZW1wb3JhcmlseSByZW1vdmUgdGhlIHpvb20vcGFuIHRyYW5zZm9ybSBmcm9tIHRoZSBtYWluIHN2ZyBzaW5jZSB3ZVxuICAgIC8vIHdhbnQgdGhlIG1pbmltYXAgdG8gc2hvdyBhIHpvb21lZC1vdXQgYW5kIGNlbnRlcmVkIHZpZXcuXG4gICAgY29uc3Qgem9vbUdTZWxlY3Rpb24gPSBzZWxlY3QodGhpcy56b29tRyk7XG4gICAgY29uc3Qgem9vbVRyYW5zZm9ybSA9IHpvb21HU2VsZWN0aW9uLmF0dHIoJ3RyYW5zZm9ybScpO1xuICAgIHpvb21HU2VsZWN0aW9uLmF0dHIoJ3RyYW5zZm9ybScsIG51bGwpO1xuXG4gICAgLy8gU2luY2Ugd2UgYWRkIHBhZGRpbmcsIGFjY291bnQgZm9yIHRoYXQgaGVyZS5cbiAgICBzY2VuZVNpemUuaGVpZ2h0ICs9IHRoaXMubGFiZWxQYWRkaW5nICogMjtcbiAgICBzY2VuZVNpemUud2lkdGggKz0gdGhpcy5sYWJlbFBhZGRpbmcgKiAyO1xuXG4gICAgLy8gVGVtcG9yYXJpbHkgYXNzaWduIGFuIGV4cGxpY2l0IHdpZHRoL2hlaWdodCB0byB0aGUgbWFpbiBzdmcsIHNpbmNlXG4gICAgLy8gaXQgZG9lc24ndCBoYXZlIG9uZSAodXNlcyBmbGV4LWJveCksIGJ1dCB3ZSBuZWVkIGl0IGZvciB0aGUgY2FudmFzXG4gICAgLy8gdG8gd29yay5cbiAgICBzdmdTZWxlY3Rpb24uYXR0cignd2lkdGgnLCBzY2VuZVNpemUud2lkdGgpLmF0dHIoJ2hlaWdodCcsIHNjZW5lU2l6ZS5oZWlnaHQpO1xuXG4gICAgLy8gU2luY2UgdGhlIGNvbnRlbnQgaW5zaWRlIHRoZSBzdmcgY2hhbmdlZCAoZS5nLiBhIG5vZGUgd2FzIGV4cGFuZGVkKSxcbiAgICAvLyB0aGUgYXNwZWN0IHJhdGlvIGhhdmUgYWxzbyBjaGFuZ2VkLiBUaHVzLCB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGUgc2NhbGVcbiAgICAvLyBmYWN0b3Igb2YgdGhlIG1pbmltYXAuIFRoZSBzY2FsZSBmYWN0b3IgaXMgZGV0ZXJtaW5lZCBzdWNoIHRoYXQgYm90aFxuICAgIC8vIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBtaW5pbWFwIGFyZSA8PSBtYXhpbXVtIHNwZWNpZmllZCB3L2guXG4gICAgdGhpcy5zY2FsZU1pbmltYXAgPSB0aGlzLm1heFdpZHRoIC8gTWF0aC5tYXgoc2NlbmVTaXplLndpZHRoLCBzY2VuZVNpemUuaGVpZ2h0KTtcbiAgICB0aGlzLm1pbmltYXBTaXplID0ge1xuICAgICAgd2lkdGg6IHNjZW5lU2l6ZS53aWR0aCAqIHRoaXMuc2NhbGVNaW5pbWFwLFxuICAgICAgaGVpZ2h0OiBzY2VuZVNpemUuaGVpZ2h0ICogdGhpcy5zY2FsZU1pbmltYXBcbiAgICB9O1xuXG4gICAgY29uc3QgbWluaW1hcE9mZnNldCA9IHRoaXMubWluaW1hcE9mZnNldCgpO1xuXG4gICAgLy8gVXBkYXRlIHRoZSBzaXplIG9mIHRoZSBtaW5pbWFwJ3Mgc3ZnLCB0aGUgYnVmZmVyIGNhbnZhcyBhbmQgdGhlXG4gICAgLy8gdmlld3BvaW50IHJlY3QuXG4gICAgc2VsZWN0KHRoaXMubWluaW1hcFN2ZykuYXR0cih0aGlzLm1pbmltYXBTaXplIGFzIE56U2FmZUFueSk7XG4gICAgc2VsZWN0KHRoaXMuY2FudmFzQnVmZmVyKS5hdHRyKHRoaXMubWluaW1hcFNpemUgYXMgTnpTYWZlQW55KTtcblxuICAgIGlmICh0aGlzLnRyYW5zbGF0ZSAhPSBudWxsICYmIHRoaXMuem9vbSAhPSBudWxsKSB7XG4gICAgICAvLyBVcGRhdGUgdGhlIHZpZXdwb2ludCByZWN0YW5nbGUgc2hhcGUgc2luY2UgdGhlIGFzcGVjdCByYXRpbyBvZiB0aGVcbiAgICAgIC8vIG1hcCBoYXMgY2hhbmdlZC5cbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLnpvb20oKSk7XG4gICAgfVxuXG4gICAgLy8gU2VyaWFsaXplIHRoZSBtYWluIHN2ZyB0byBhIHN0cmluZyB3aGljaCB3aWxsIGJlIHVzZWQgYXMgdGhlIHJlbmRlcmluZ1xuICAgIC8vIGNvbnRlbnQgZm9yIHRoZSBjYW52YXMuXG4gICAgY29uc3Qgc3ZnWG1sID0gbmV3IFhNTFNlcmlhbGl6ZXIoKS5zZXJpYWxpemVUb1N0cmluZyh0aGlzLnN2Zyk7XG5cbiAgICAvLyBOb3cgdGhhdCB0aGUgc3ZnIGlzIHNlcmlhbGl6ZWQgZm9yIHJlbmRlcmluZywgcmVtb3ZlIHRoZSB0ZW1wb3JhcmlseVxuICAgIC8vIGFzc2lnbmVkIHN0eWxlcywgZXhwbGljaXQgd2lkdGggYW5kIGhlaWdodCBhbmQgYnJpbmcgYmFjayB0aGUgcGFuL3pvb21cbiAgICAvLyB0cmFuc2Zvcm0uXG4gICAgc3ZnU3R5bGUucmVtb3ZlKCk7XG4gICAgc3ZnU2VsZWN0aW9uLmF0dHIoJ3dpZHRoJywgJzEwMCUnKS5hdHRyKCdoZWlnaHQnLCAnMTAwJScpO1xuXG4gICAgem9vbUdTZWxlY3Rpb24uYXR0cigndHJhbnNmb3JtJywgem9vbVRyYW5zZm9ybSk7XG5cbiAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIC8vIERyYXcgdGhlIHN2ZyBjb250ZW50IG9udG8gdGhlIGJ1ZmZlciBjYW52YXMuXG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jYW52YXNCdWZmZXIuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIGNvbnRleHQhLmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhc0J1ZmZlci53aWR0aCwgdGhpcy5jYW52YXNCdWZmZXIuaGVpZ2h0KTtcblxuICAgICAgY29udGV4dCEuZHJhd0ltYWdlKGltYWdlLCBtaW5pbWFwT2Zmc2V0LngsIG1pbmltYXBPZmZzZXQueSwgdGhpcy5taW5pbWFwU2l6ZS53aWR0aCwgdGhpcy5taW5pbWFwU2l6ZS5oZWlnaHQpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgLy8gSGlkZSB0aGUgb2xkIGNhbnZhcyBhbmQgc2hvdyB0aGUgbmV3IGJ1ZmZlciBjYW52YXMuXG4gICAgICAgIHNlbGVjdCh0aGlzLmNhbnZhc0J1ZmZlcikuc3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgc2VsZWN0KHRoaXMuY2FudmFzKS5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgIC8vIFN3YXAgdGhlIHR3byBjYW52YXNlcy5cbiAgICAgICAgW3RoaXMuY2FudmFzLCB0aGlzLmNhbnZhc0J1ZmZlcl0gPSBbdGhpcy5jYW52YXNCdWZmZXIsIHRoaXMuY2FudmFzXTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgaW1hZ2Uuc3JjID0gJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtjaGFyc2V0PXV0Zi04LCcgKyBlbmNvZGVVUklDb21wb25lbnQoc3ZnWG1sKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGNoYW5nZXMgaW4gem9vbWluZy9wYW5uaW5nLiBTaG91bGQgYmUgY2FsbGVkIGZyb20gdGhlIG1haW4gc3ZnXG4gICAqIHRvIG5vdGlmeSB0aGF0IGEgem9vbS9wYW4gd2FzIHBlcmZvcm1lZCBhbmQgdGhpcyBtaW5pbWFwIHdpbGwgdXBkYXRlIGl0J3NcbiAgICogdmlld3BvaW50IHJlY3RhbmdsZS5cbiAgICogQHBhcmFtIHRyYW5zZm9ybVxuICAgKi9cbiAgem9vbSh0cmFuc2Zvcm0/OiBab29tVHJhbnNmb3JtIHwgTnpab29tVHJhbnNmb3JtKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2NhbGVNaW5pbWFwID09IG51bGwpIHtcbiAgICAgIC8vIFNjZW5lIGlzIG5vdCByZWFkeSB5ZXQuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFVwZGF0ZSB0aGUgbmV3IHRyYW5zbGF0ZSBhbmQgc2NhbGUgcGFyYW1zLCBvbmx5IGlmIHNwZWNpZmllZC5cbiAgICBpZiAodHJhbnNmb3JtKSB7XG4gICAgICB0aGlzLnRyYW5zbGF0ZSA9IFt0cmFuc2Zvcm0ueCwgdHJhbnNmb3JtLnldO1xuICAgICAgdGhpcy5zY2FsZU1haW4gPSB0cmFuc2Zvcm0uaztcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgdGhlIGxvY2F0aW9uIG9mIHRoZSB2aWV3cG9pbnQgcmVjdGFuZ2xlLlxuICAgIGNvbnN0IHN2Z1JlY3QgPSB0aGlzLnN2Zy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBtaW5pbWFwT2Zmc2V0ID0gdGhpcy5taW5pbWFwT2Zmc2V0KCk7XG4gICAgY29uc3Qgdmlld3BvaW50U2VsZWN0aW9uID0gc2VsZWN0KHRoaXMudmlld3BvaW50KTtcbiAgICB0aGlzLnZpZXdwb2ludENvb3JkLnggPSAoLXRoaXMudHJhbnNsYXRlWzBdICogdGhpcy5zY2FsZU1pbmltYXApIC8gdGhpcy5zY2FsZU1haW47XG4gICAgdGhpcy52aWV3cG9pbnRDb29yZC55ID0gKC10aGlzLnRyYW5zbGF0ZVsxXSAqIHRoaXMuc2NhbGVNaW5pbWFwKSAvIHRoaXMuc2NhbGVNYWluO1xuICAgIGNvbnN0IHZpZXdwb2ludFdpZHRoID0gKHN2Z1JlY3Qud2lkdGggKiB0aGlzLnNjYWxlTWluaW1hcCkgLyB0aGlzLnNjYWxlTWFpbjtcbiAgICBjb25zdCB2aWV3cG9pbnRIZWlnaHQgPSAoc3ZnUmVjdC5oZWlnaHQgKiB0aGlzLnNjYWxlTWluaW1hcCkgLyB0aGlzLnNjYWxlTWFpbjtcbiAgICB2aWV3cG9pbnRTZWxlY3Rpb25cbiAgICAgIC5hdHRyKCd4JywgdGhpcy52aWV3cG9pbnRDb29yZC54ICsgbWluaW1hcE9mZnNldC54KVxuICAgICAgLmF0dHIoJ3knLCB0aGlzLnZpZXdwb2ludENvb3JkLnkgKyBtaW5pbWFwT2Zmc2V0LnkpXG4gICAgICAuYXR0cignd2lkdGgnLCB2aWV3cG9pbnRXaWR0aClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCB2aWV3cG9pbnRIZWlnaHQpO1xuICAgIC8vIFNob3cvaGlkZSB0aGUgbWluaW1hcCBkZXBlbmRpbmcgb24gdGhlIHZpZXdwb2ludCBhcmVhIGFzIGZyYWN0aW9uIG9mIHRoZVxuICAgIC8vIHdob2xlIG1pbmltYXAuXG4gICAgY29uc3QgbWFwV2lkdGggPSB0aGlzLm1pbmltYXBTaXplLndpZHRoO1xuICAgIGNvbnN0IG1hcEhlaWdodCA9IHRoaXMubWluaW1hcFNpemUuaGVpZ2h0O1xuICAgIGNvbnN0IHggPSB0aGlzLnZpZXdwb2ludENvb3JkLng7XG4gICAgY29uc3QgeSA9IHRoaXMudmlld3BvaW50Q29vcmQueTtcbiAgICBjb25zdCB3ID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgeCArIHZpZXdwb2ludFdpZHRoKSwgbWFwV2lkdGgpIC0gTWF0aC5taW4oTWF0aC5tYXgoMCwgeCksIG1hcFdpZHRoKTtcbiAgICBjb25zdCBoID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgeSArIHZpZXdwb2ludEhlaWdodCksIG1hcEhlaWdodCkgLSBNYXRoLm1pbihNYXRoLm1heCgwLCB5KSwgbWFwSGVpZ2h0KTtcbiAgICBjb25zdCBmcmFjSW50ZXJzZWN0ID0gKHcgKiBoKSAvIChtYXBXaWR0aCAqIG1hcEhlaWdodCk7XG4gICAgaWYgKGZyYWNJbnRlcnNlY3QgPCBGUkFDX1ZJRVdQT0lOVF9BUkVBKSB7XG4gICAgICB0aGlzLm1pbmltYXAuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWluaW1hcC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==