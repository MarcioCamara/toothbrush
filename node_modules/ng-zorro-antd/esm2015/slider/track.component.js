/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';
export class NzSliderTrackComponent {
    constructor() {
        this.offset = 0;
        this.reverse = false;
        this.dir = 'ltr';
        this.length = 0;
        this.vertical = false;
        this.included = false;
        this.style = {};
    }
    ngOnChanges() {
        const vertical = this.vertical;
        const reverse = this.reverse;
        const visibility = this.included ? 'visible' : 'hidden';
        const offset = this.offset;
        const length = this.length;
        const positonStyle = vertical
            ? {
                [reverse ? 'top' : 'bottom']: `${offset}%`,
                [reverse ? 'bottom' : 'top']: 'auto',
                height: `${length}%`,
                visibility
            }
            : Object.assign(Object.assign({}, this.getHorizontalStylePosition()), { width: `${length}%`, visibility });
        this.style = positonStyle;
    }
    getHorizontalStylePosition() {
        let left = this.reverse ? 'auto' : `${this.offset}%`;
        let right = this.reverse ? `${this.offset}%` : 'auto';
        if (this.dir === 'rtl') {
            const tmp = left;
            left = right;
            right = tmp;
        }
        return { left, right };
    }
}
NzSliderTrackComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-slider-track',
                exportAs: 'nzSliderTrack',
                preserveWhitespaces: false,
                template: `
    <div class="ant-slider-track" [ngStyle]="style"></div>
  `
            },] }
];
NzSliderTrackComponent.propDecorators = {
    offset: [{ type: Input }],
    reverse: [{ type: Input }],
    dir: [{ type: Input }],
    length: [{ type: Input }],
    vertical: [{ type: Input }],
    included: [{ type: Input }]
};
__decorate([
    InputNumber(),
    __metadata("design:type", Number)
], NzSliderTrackComponent.prototype, "offset", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzSliderTrackComponent.prototype, "reverse", void 0);
__decorate([
    InputNumber(),
    __metadata("design:type", Number)
], NzSliderTrackComponent.prototype, "length", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSliderTrackComponent.prototype, "vertical", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSliderTrackComponent.prototype, "included", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9zbGlkZXIvdHJhY2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7QUFHSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4RyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBcUJwRSxNQUFNLE9BQU8sc0JBQXNCO0lBVm5DO1FBaUIwQixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekMsUUFBRyxHQUFjLEtBQUssQ0FBQztRQUNSLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRTFDLFVBQUssR0FBdUIsRUFBRSxDQUFDO0lBbUNqQyxDQUFDO0lBakNDLFdBQVc7UUFDVCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9CLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0IsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDeEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRTNCLE1BQU0sWUFBWSxHQUF1QixRQUFRO1lBQy9DLENBQUMsQ0FBQztnQkFDRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLE1BQU0sR0FBRztnQkFDMUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTTtnQkFDcEMsTUFBTSxFQUFFLEdBQUcsTUFBTSxHQUFHO2dCQUNwQixVQUFVO2FBQ1g7WUFDSCxDQUFDLGlDQUNNLElBQUksQ0FBQywwQkFBMEIsRUFBRSxLQUNwQyxLQUFLLEVBQUUsR0FBRyxNQUFNLEdBQUcsRUFDbkIsVUFBVSxHQUNYLENBQUM7UUFFTixJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztJQUM1QixDQUFDO0lBRU8sMEJBQTBCO1FBQ2hDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7UUFDckQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN0RCxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxFQUFFO1lBQ3RCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQ2IsS0FBSyxHQUFHLEdBQUcsQ0FBQztTQUNiO1FBQ0QsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7WUExREYsU0FBUyxTQUFDO2dCQUNULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLFFBQVEsRUFBRTs7R0FFVDthQUNGOzs7cUJBUUUsS0FBSztzQkFDTCxLQUFLO2tCQUNMLEtBQUs7cUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLEtBQUs7O0FBTGtCO0lBQWQsV0FBVyxFQUFFOztzREFBb0I7QUFDbEI7SUFBZixZQUFZLEVBQUU7O3VEQUEwQjtBQUUxQjtJQUFkLFdBQVcsRUFBRTs7c0RBQW9CO0FBQ2xCO0lBQWYsWUFBWSxFQUFFOzt3REFBa0I7QUFDakI7SUFBZixZQUFZLEVBQUU7O3dEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE51bWJlcklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiwgSW5wdXROdW1iZXIgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnpTbGlkZXJUcmFja1N0eWxlIHtcbiAgYm90dG9tPzogc3RyaW5nIHwgbnVsbDtcbiAgaGVpZ2h0Pzogc3RyaW5nIHwgbnVsbDtcbiAgbGVmdD86IHN0cmluZyB8IG51bGw7XG4gIHJpZ2h0Pzogc3RyaW5nIHwgbnVsbDtcbiAgd2lkdGg/OiBzdHJpbmcgfCBudWxsO1xuICB2aXNpYmlsaXR5Pzogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnbnotc2xpZGVyLXRyYWNrJyxcbiAgZXhwb3J0QXM6ICduelNsaWRlclRyYWNrJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC1zbGlkZXItdHJhY2tcIiBbbmdTdHlsZV09XCJzdHlsZVwiPjwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56U2xpZGVyVHJhY2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfb2Zmc2V0OiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2xlbmd0aDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV92ZXJ0aWNhbDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaW5jbHVkZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3JldmVyc2U6IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBASW5wdXROdW1iZXIoKSBvZmZzZXQ6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSByZXZlcnNlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRpcjogRGlyZWN0aW9uID0gJ2x0cic7XG4gIEBJbnB1dCgpIEBJbnB1dE51bWJlcigpIGxlbmd0aDogbnVtYmVyID0gMDtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIHZlcnRpY2FsID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBpbmNsdWRlZCA9IGZhbHNlO1xuXG4gIHN0eWxlOiBOelNsaWRlclRyYWNrU3R5bGUgPSB7fTtcblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICBjb25zdCB2ZXJ0aWNhbCA9IHRoaXMudmVydGljYWw7XG4gICAgY29uc3QgcmV2ZXJzZSA9IHRoaXMucmV2ZXJzZTtcbiAgICBjb25zdCB2aXNpYmlsaXR5ID0gdGhpcy5pbmNsdWRlZCA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nO1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuXG4gICAgY29uc3QgcG9zaXRvblN0eWxlOiBOelNsaWRlclRyYWNrU3R5bGUgPSB2ZXJ0aWNhbFxuICAgICAgPyB7XG4gICAgICAgICAgW3JldmVyc2UgPyAndG9wJyA6ICdib3R0b20nXTogYCR7b2Zmc2V0fSVgLFxuICAgICAgICAgIFtyZXZlcnNlID8gJ2JvdHRvbScgOiAndG9wJ106ICdhdXRvJyxcbiAgICAgICAgICBoZWlnaHQ6IGAke2xlbmd0aH0lYCxcbiAgICAgICAgICB2aXNpYmlsaXR5XG4gICAgICAgIH1cbiAgICAgIDoge1xuICAgICAgICAgIC4uLnRoaXMuZ2V0SG9yaXpvbnRhbFN0eWxlUG9zaXRpb24oKSxcbiAgICAgICAgICB3aWR0aDogYCR7bGVuZ3RofSVgLFxuICAgICAgICAgIHZpc2liaWxpdHlcbiAgICAgICAgfTtcblxuICAgIHRoaXMuc3R5bGUgPSBwb3NpdG9uU3R5bGU7XG4gIH1cblxuICBwcml2YXRlIGdldEhvcml6b250YWxTdHlsZVBvc2l0aW9uKCk6IHsgbGVmdDogc3RyaW5nOyByaWdodDogc3RyaW5nIH0ge1xuICAgIGxldCBsZWZ0ID0gdGhpcy5yZXZlcnNlID8gJ2F1dG8nIDogYCR7dGhpcy5vZmZzZXR9JWA7XG4gICAgbGV0IHJpZ2h0ID0gdGhpcy5yZXZlcnNlID8gYCR7dGhpcy5vZmZzZXR9JWAgOiAnYXV0byc7XG4gICAgaWYgKHRoaXMuZGlyID09PSAncnRsJykge1xuICAgICAgY29uc3QgdG1wID0gbGVmdDtcbiAgICAgIGxlZnQgPSByaWdodDtcbiAgICAgIHJpZ2h0ID0gdG1wO1xuICAgIH1cbiAgICByZXR1cm4geyBsZWZ0LCByaWdodCB9O1xuICB9XG59XG4iXX0=