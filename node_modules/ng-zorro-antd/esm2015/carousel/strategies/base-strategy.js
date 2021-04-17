/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
export class NzCarouselBaseStrategy {
    constructor(carouselComponent, cdr, renderer, platform, options) {
        this.cdr = cdr;
        this.renderer = renderer;
        this.platform = platform;
        this.options = options;
        this.carouselComponent = carouselComponent;
    }
    get maxIndex() {
        return this.length - 1;
    }
    get firstEl() {
        return this.contents[0].el;
    }
    get lastEl() {
        return this.contents[this.maxIndex].el;
    }
    /**
     * Initialize dragging sequences.
     * @param contents
     */
    withCarouselContents(contents) {
        const carousel = this.carouselComponent;
        this.slickListEl = carousel.slickListEl;
        this.slickTrackEl = carousel.slickTrackEl;
        this.contents = (contents === null || contents === void 0 ? void 0 : contents.toArray()) || [];
        this.length = this.contents.length;
        if (this.platform.isBrowser) {
            const rect = carousel.el.getBoundingClientRect();
            this.unitWidth = rect.width;
            this.unitHeight = rect.height;
        }
        else {
            // Since we cannot call getBoundingClientRect in server, we just hide all items except for the first one.
            contents === null || contents === void 0 ? void 0 : contents.forEach((content, index) => {
                if (index === 0) {
                    this.renderer.setStyle(content.el, 'width', '100%');
                }
                else {
                    this.renderer.setStyle(content.el, 'display', 'none');
                }
            });
        }
    }
    /**
     * When user drag the carousel component.
     * @optional
     */
    dragging(_vector) { }
    /**
     * Destroy a scroll strategy.
     */
    dispose() { }
    getFromToInBoundary(f, t) {
        const length = this.maxIndex + 1;
        return { from: (f + length) % length, to: (t + length) % length };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY2Fyb3VzZWwvc3RyYXRlZ2llcy9iYXNlLXN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQVVILE1BQU0sT0FBZ0Isc0JBQXNCO0lBc0IxQyxZQUNFLGlCQUE4QyxFQUNwQyxHQUFzQixFQUN0QixRQUFtQixFQUNuQixRQUFrQixFQUNsQixPQUFXO1FBSFgsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFlBQU8sR0FBUCxPQUFPLENBQUk7UUFFckIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO0lBQzdDLENBQUM7SUFwQkQsSUFBYyxRQUFRO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELElBQWMsT0FBTztRQUNuQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFjLE1BQU07UUFDbEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQVlEOzs7T0FHRztJQUNILG9CQUFvQixDQUFDLFFBQXNEO1FBQ3pFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBa0IsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7UUFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDO1FBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsT0FBTyxPQUFNLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBRW5DLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDM0IsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDL0I7YUFBTTtZQUNMLHlHQUF5RztZQUN6RyxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUNuQyxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQ3JEO3FCQUFNO29CQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUN2RDtZQUNILENBQUMsRUFBRTtTQUNKO0lBQ0gsQ0FBQztJQU9EOzs7T0FHRztJQUNILFFBQVEsQ0FBQyxPQUFzQixJQUFTLENBQUM7SUFFekM7O09BRUc7SUFDSCxPQUFPLEtBQVUsQ0FBQztJQUVSLG1CQUFtQixDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ2hELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQztJQUNwRSxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgUXVlcnlMaXN0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE56Q2Fyb3VzZWxDb250ZW50RGlyZWN0aXZlIH0gZnJvbSAnLi4vY2Fyb3VzZWwtY29udGVudC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRnJvbVRvSW50ZXJmYWNlLCBOekNhcm91c2VsQ29tcG9uZW50QXNTb3VyY2UsIFBvaW50ZXJWZWN0b3IgfSBmcm9tICcuLi90eXBpbmdzJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE56Q2Fyb3VzZWxCYXNlU3RyYXRlZ3k8VCA9IE56U2FmZUFueT4ge1xuICAvLyBQcm9wZXJ0aWVzIHRoYXQgc3RyYXRlZ2llcyBtYXkgd2FudCB0byB1c2UuXG4gIHByb3RlY3RlZCBjYXJvdXNlbENvbXBvbmVudDogTnpDYXJvdXNlbENvbXBvbmVudEFzU291cmNlIHwgbnVsbDtcbiAgcHJvdGVjdGVkIGNvbnRlbnRzITogTnpDYXJvdXNlbENvbnRlbnREaXJlY3RpdmVbXTtcbiAgcHJvdGVjdGVkIHNsaWNrTGlzdEVsITogSFRNTEVsZW1lbnQ7XG4gIHByb3RlY3RlZCBzbGlja1RyYWNrRWwhOiBIVE1MRWxlbWVudDtcbiAgcHJvdGVjdGVkIGxlbmd0aCE6IG51bWJlcjtcbiAgcHJvdGVjdGVkIHVuaXRXaWR0aCE6IG51bWJlcjtcbiAgcHJvdGVjdGVkIHVuaXRIZWlnaHQhOiBudW1iZXI7XG5cbiAgcHJvdGVjdGVkIGdldCBtYXhJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aCAtIDE7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IGZpcnN0RWwoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnRzWzBdLmVsO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBsYXN0RWwoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnRzW3RoaXMubWF4SW5kZXhdLmVsO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2Fyb3VzZWxDb21wb25lbnQ6IE56Q2Fyb3VzZWxDb21wb25lbnRBc1NvdXJjZSxcbiAgICBwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcm90ZWN0ZWQgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIHByb3RlY3RlZCBvcHRpb25zPzogVFxuICApIHtcbiAgICB0aGlzLmNhcm91c2VsQ29tcG9uZW50ID0gY2Fyb3VzZWxDb21wb25lbnQ7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBkcmFnZ2luZyBzZXF1ZW5jZXMuXG4gICAqIEBwYXJhbSBjb250ZW50c1xuICAgKi9cbiAgd2l0aENhcm91c2VsQ29udGVudHMoY29udGVudHM6IFF1ZXJ5TGlzdDxOekNhcm91c2VsQ29udGVudERpcmVjdGl2ZT4gfCBudWxsKTogdm9pZCB7XG4gICAgY29uc3QgY2Fyb3VzZWwgPSB0aGlzLmNhcm91c2VsQ29tcG9uZW50ITtcbiAgICB0aGlzLnNsaWNrTGlzdEVsID0gY2Fyb3VzZWwuc2xpY2tMaXN0RWw7XG4gICAgdGhpcy5zbGlja1RyYWNrRWwgPSBjYXJvdXNlbC5zbGlja1RyYWNrRWw7XG4gICAgdGhpcy5jb250ZW50cyA9IGNvbnRlbnRzPy50b0FycmF5KCkgfHwgW107XG4gICAgdGhpcy5sZW5ndGggPSB0aGlzLmNvbnRlbnRzLmxlbmd0aDtcblxuICAgIGlmICh0aGlzLnBsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgY29uc3QgcmVjdCA9IGNhcm91c2VsLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdGhpcy51bml0V2lkdGggPSByZWN0LndpZHRoO1xuICAgICAgdGhpcy51bml0SGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNpbmNlIHdlIGNhbm5vdCBjYWxsIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBpbiBzZXJ2ZXIsIHdlIGp1c3QgaGlkZSBhbGwgaXRlbXMgZXhjZXB0IGZvciB0aGUgZmlyc3Qgb25lLlxuICAgICAgY29udGVudHM/LmZvckVhY2goKGNvbnRlbnQsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY29udGVudC5lbCwgJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNvbnRlbnQuZWwsICdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgdHJhbnNpdGlvbi5cbiAgICovXG4gIGFic3RyYWN0IHN3aXRjaChfZjogbnVtYmVyLCBfdDogbnVtYmVyKTogT2JzZXJ2YWJsZTx2b2lkPjtcblxuICAvKipcbiAgICogV2hlbiB1c2VyIGRyYWcgdGhlIGNhcm91c2VsIGNvbXBvbmVudC5cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBkcmFnZ2luZyhfdmVjdG9yOiBQb2ludGVyVmVjdG9yKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IGEgc2Nyb2xsIHN0cmF0ZWd5LlxuICAgKi9cbiAgZGlzcG9zZSgpOiB2b2lkIHt9XG5cbiAgcHJvdGVjdGVkIGdldEZyb21Ub0luQm91bmRhcnkoZjogbnVtYmVyLCB0OiBudW1iZXIpOiBGcm9tVG9JbnRlcmZhY2Uge1xuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubWF4SW5kZXggKyAxO1xuICAgIHJldHVybiB7IGZyb206IChmICsgbGVuZ3RoKSAlIGxlbmd0aCwgdG86ICh0ICsgbGVuZ3RoKSAlIGxlbmd0aCB9O1xuICB9XG59XG4iXX0=