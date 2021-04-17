/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzSliderService } from './slider.service';
export class NzSliderHandleComponent {
    constructor(sliderService, cdr) {
        this.sliderService = sliderService;
        this.cdr = cdr;
        this.tooltipVisible = 'default';
        this.active = false;
        this.dir = 'ltr';
        this.style = {};
        this.enterHandle = () => {
            if (!this.sliderService.isDragging) {
                this.toggleTooltip(true);
                this.updateTooltipPosition();
                this.cdr.detectChanges();
            }
        };
        this.leaveHandle = () => {
            if (!this.sliderService.isDragging) {
                this.toggleTooltip(false);
                this.cdr.detectChanges();
            }
        };
    }
    ngOnChanges(changes) {
        const { offset, value, active, tooltipVisible, reverse, dir } = changes;
        if (offset || reverse || dir) {
            this.updateStyle();
        }
        if (value) {
            this.updateTooltipTitle();
            this.updateTooltipPosition();
        }
        if (active) {
            if (active.currentValue) {
                this.toggleTooltip(true);
            }
            else {
                this.toggleTooltip(false);
            }
        }
        if ((tooltipVisible === null || tooltipVisible === void 0 ? void 0 : tooltipVisible.currentValue) === 'always') {
            Promise.resolve().then(() => this.toggleTooltip(true, true));
        }
    }
    focus() {
        var _a;
        (_a = this.handleEl) === null || _a === void 0 ? void 0 : _a.nativeElement.focus();
    }
    toggleTooltip(show, force = false) {
        var _a, _b;
        if (!force && (this.tooltipVisible !== 'default' || !this.tooltip)) {
            return;
        }
        if (show) {
            (_a = this.tooltip) === null || _a === void 0 ? void 0 : _a.show();
        }
        else {
            (_b = this.tooltip) === null || _b === void 0 ? void 0 : _b.hide();
        }
    }
    updateTooltipTitle() {
        this.tooltipTitle = this.tooltipFormatter ? this.tooltipFormatter(this.value) : `${this.value}`;
    }
    updateTooltipPosition() {
        if (this.tooltip) {
            Promise.resolve().then(() => { var _a; return (_a = this.tooltip) === null || _a === void 0 ? void 0 : _a.updatePosition(); });
        }
    }
    updateStyle() {
        const vertical = this.vertical;
        const reverse = this.reverse;
        const offset = this.offset;
        const positionStyle = vertical
            ? {
                [reverse ? 'top' : 'bottom']: `${offset}%`,
                [reverse ? 'bottom' : 'top']: 'auto',
                transform: reverse ? null : `translateY(+50%)`
            }
            : Object.assign(Object.assign({}, this.getHorizontalStylePosition()), { transform: `translateX(${reverse ? (this.dir === 'rtl' ? '-' : '+') : this.dir === 'rtl' ? '+' : '-'}50%)` });
        this.style = positionStyle;
        this.cdr.markForCheck();
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
NzSliderHandleComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-slider-handle',
                exportAs: 'nzSliderHandle',
                preserveWhitespaces: false,
                template: `
    <div
      #handle
      class="ant-slider-handle"
      tabindex="0"
      nz-tooltip
      [ngStyle]="style"
      [nzTooltipTitle]="tooltipFormatter === null || tooltipVisible === 'never' ? null : tooltipTitle"
      [nzTooltipTrigger]="null"
      [nzTooltipPlacement]="tooltipPlacement"
    ></div>
  `,
                host: {
                    '(mouseenter)': 'enterHandle()',
                    '(mouseleave)': 'leaveHandle()'
                }
            },] }
];
NzSliderHandleComponent.ctorParameters = () => [
    { type: NzSliderService },
    { type: ChangeDetectorRef }
];
NzSliderHandleComponent.propDecorators = {
    handleEl: [{ type: ViewChild, args: ['handle', { static: false },] }],
    tooltip: [{ type: ViewChild, args: [NzTooltipDirective, { static: false },] }],
    vertical: [{ type: Input }],
    reverse: [{ type: Input }],
    offset: [{ type: Input }],
    value: [{ type: Input }],
    tooltipVisible: [{ type: Input }],
    tooltipPlacement: [{ type: Input }],
    tooltipFormatter: [{ type: Input }],
    active: [{ type: Input }],
    dir: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSliderHandleComponent.prototype, "active", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvc2xpZGVyL2hhbmRsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUdILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUdMLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQTBCbkQsTUFBTSxPQUFPLHVCQUF1QjtJQW1CbEMsWUFBb0IsYUFBOEIsRUFBVSxHQUFzQjtRQUE5RCxrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQVR6RSxtQkFBYyxHQUF3QixTQUFTLENBQUM7UUFHaEMsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUMvQixRQUFHLEdBQWMsS0FBSyxDQUFDO1FBR2hDLFVBQUssR0FBcUIsRUFBRSxDQUFDO1FBNkI3QixnQkFBVyxHQUFHLEdBQUcsRUFBRTtZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2dCQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQzFCO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsZ0JBQVcsR0FBRyxHQUFHLEVBQUU7WUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFO2dCQUNs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QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7O0dBV1Q7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLGNBQWMsRUFBRSxlQUFlO29CQUMvQixjQUFjLEVBQUUsZUFBZTtpQkFDaEM7YUFDRjs7O1lBekJRLGVBQWU7WUFidEIsaUJBQWlCOzs7dUJBMENoQixTQUFTLFNBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtzQkFDckMsU0FBUyxTQUFDLGtCQUFrQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTt1QkFFL0MsS0FBSztzQkFDTCxLQUFLO3FCQUNMLEtBQUs7b0JBQ0wsS0FBSzs2QkFDTCxLQUFLOytCQUNMLEtBQUs7K0JBQ0wsS0FBSztxQkFDTCxLQUFLO2tCQUNMLEtBQUs7O0FBRG1CO0lBQWYsWUFBWSxFQUFFOzt1REFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTmdTdHlsZUludGVyZmFjZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IE56VG9vbHRpcERpcmVjdGl2ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvdG9vbHRpcCc7XG5pbXBvcnQgeyBOelNsaWRlclNlcnZpY2UgfSBmcm9tICcuL3NsaWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IE56U2xpZGVyU2hvd1Rvb2x0aXAgfSBmcm9tICcuL3R5cGluZ3MnO1xuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnbnotc2xpZGVyLWhhbmRsZScsXG4gIGV4cG9ydEFzOiAnbnpTbGlkZXJIYW5kbGUnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICAjaGFuZGxlXG4gICAgICBjbGFzcz1cImFudC1zbGlkZXItaGFuZGxlXCJcbiAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICBuei10b29sdGlwXG4gICAgICBbbmdTdHlsZV09XCJzdHlsZVwiXG4gICAgICBbbnpUb29sdGlwVGl0bGVdPVwidG9vbHRpcEZvcm1hdHRlciA9PT0gbnVsbCB8fCB0b29sdGlwVmlzaWJsZSA9PT0gJ25ldmVyJyA/IG51bGwgOiB0b29sdGlwVGl0bGVcIlxuICAgICAgW256VG9vbHRpcFRyaWdnZXJdPVwibnVsbFwiXG4gICAgICBbbnpUb29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgID48L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICcobW91c2VlbnRlciknOiAnZW50ZXJIYW5kbGUoKScsXG4gICAgJyhtb3VzZWxlYXZlKSc6ICdsZWF2ZUhhbmRsZSgpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56U2xpZGVySGFuZGxlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2FjdGl2ZTogQm9vbGVhbklucHV0O1xuXG4gIEBWaWV3Q2hpbGQoJ2hhbmRsZScsIHsgc3RhdGljOiBmYWxzZSB9KSBoYW5kbGVFbD86IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoTnpUb29sdGlwRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSkgdG9vbHRpcD86IE56VG9vbHRpcERpcmVjdGl2ZTtcblxuICBASW5wdXQoKSB2ZXJ0aWNhbD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJldmVyc2U/OiBib29sZWFuO1xuICBASW5wdXQoKSBvZmZzZXQ/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHZhbHVlPzogbnVtYmVyO1xuICBASW5wdXQoKSB0b29sdGlwVmlzaWJsZTogTnpTbGlkZXJTaG93VG9vbHRpcCA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgdG9vbHRpcFBsYWNlbWVudD86IHN0cmluZztcbiAgQElucHV0KCkgdG9vbHRpcEZvcm1hdHRlcj86IG51bGwgfCAoKHZhbHVlOiBudW1iZXIpID0+IHN0cmluZyk7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBhY3RpdmUgPSBmYWxzZTtcbiAgQElucHV0KCkgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcblxuICB0b29sdGlwVGl0bGU/OiBzdHJpbmc7XG4gIHN0eWxlOiBOZ1N0eWxlSW50ZXJmYWNlID0ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzbGlkZXJTZXJ2aWNlOiBOelNsaWRlclNlcnZpY2UsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBvZmZzZXQsIHZhbHVlLCBhY3RpdmUsIHRvb2x0aXBWaXNpYmxlLCByZXZlcnNlLCBkaXIgfSA9IGNoYW5nZXM7XG5cbiAgICBpZiAob2Zmc2V0IHx8IHJldmVyc2UgfHwgZGlyKSB7XG4gICAgICB0aGlzLnVwZGF0ZVN0eWxlKCk7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnVwZGF0ZVRvb2x0aXBUaXRsZSgpO1xuICAgICAgdGhpcy51cGRhdGVUb29sdGlwUG9zaXRpb24oKTtcbiAgICB9XG5cbiAgICBpZiAoYWN0aXZlKSB7XG4gICAgICBpZiAoYWN0aXZlLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICB0aGlzLnRvZ2dsZVRvb2x0aXAodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRvZ2dsZVRvb2x0aXAoZmFsc2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0b29sdGlwVmlzaWJsZT8uY3VycmVudFZhbHVlID09PSAnYWx3YXlzJykge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB0aGlzLnRvZ2dsZVRvb2x0aXAodHJ1ZSwgdHJ1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIGVudGVySGFuZGxlID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5zbGlkZXJTZXJ2aWNlLmlzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMudG9nZ2xlVG9vbHRpcCh0cnVlKTtcbiAgICAgIHRoaXMudXBkYXRlVG9vbHRpcFBvc2l0aW9uKCk7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9O1xuXG4gIGxlYXZlSGFuZGxlID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5zbGlkZXJTZXJ2aWNlLmlzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMudG9nZ2xlVG9vbHRpcChmYWxzZSk7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9O1xuXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlRWw/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlVG9vbHRpcChzaG93OiBib29sZWFuLCBmb3JjZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKCFmb3JjZSAmJiAodGhpcy50b29sdGlwVmlzaWJsZSAhPT0gJ2RlZmF1bHQnIHx8ICF0aGlzLnRvb2x0aXApKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHNob3cpIHtcbiAgICAgIHRoaXMudG9vbHRpcD8uc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRvb2x0aXA/LmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVRvb2x0aXBUaXRsZSgpOiB2b2lkIHtcbiAgICB0aGlzLnRvb2x0aXBUaXRsZSA9IHRoaXMudG9vbHRpcEZvcm1hdHRlciA/IHRoaXMudG9vbHRpcEZvcm1hdHRlcih0aGlzLnZhbHVlISkgOiBgJHt0aGlzLnZhbHVlfWA7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVRvb2x0aXBQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50b29sdGlwKSB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHRoaXMudG9vbHRpcD8udXBkYXRlUG9zaXRpb24oKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTdHlsZSgpOiB2b2lkIHtcbiAgICBjb25zdCB2ZXJ0aWNhbCA9IHRoaXMudmVydGljYWw7XG4gICAgY29uc3QgcmV2ZXJzZSA9IHRoaXMucmV2ZXJzZTtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm9mZnNldDtcblxuICAgIGNvbnN0IHBvc2l0aW9uU3R5bGUgPSB2ZXJ0aWNhbFxuICAgICAgPyB7XG4gICAgICAgICAgW3JldmVyc2UgPyAndG9wJyA6ICdib3R0b20nXTogYCR7b2Zmc2V0fSVgLFxuICAgICAgICAgIFtyZXZlcnNlID8gJ2JvdHRvbScgOiAndG9wJ106ICdhdXRvJyxcbiAgICAgICAgICB0cmFuc2Zvcm06IHJldmVyc2UgPyBudWxsIDogYHRyYW5zbGF0ZVkoKzUwJSlgXG4gICAgICAgIH1cbiAgICAgIDoge1xuICAgICAgICAgIC4uLnRoaXMuZ2V0SG9yaXpvbnRhbFN0eWxlUG9zaXRpb24oKSxcbiAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7cmV2ZXJzZSA/ICh0aGlzLmRpciA9PT0gJ3J0bCcgPyAnLScgOiAnKycpIDogdGhpcy5kaXIgPT09ICdydGwnID8gJysnIDogJy0nfTUwJSlgXG4gICAgICAgIH07XG5cbiAgICB0aGlzLnN0eWxlID0gcG9zaXRpb25TdHlsZTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SG9yaXpvbnRhbFN0eWxlUG9zaXRpb24oKTogeyBsZWZ0OiBzdHJpbmc7IHJpZ2h0OiBzdHJpbmcgfSB7XG4gICAgbGV0IGxlZnQgPSB0aGlzLnJldmVyc2UgPyAnYXV0bycgOiBgJHt0aGlzLm9mZnNldH0lYDtcbiAgICBsZXQgcmlnaHQgPSB0aGlzLnJldmVyc2UgPyBgJHt0aGlzLm9mZnNldH0lYCA6ICdhdXRvJztcbiAgICBpZiAodGhpcy5kaXIgPT09ICdydGwnKSB7XG4gICAgICBjb25zdCB0bXAgPSBsZWZ0O1xuICAgICAgbGVmdCA9IHJpZ2h0O1xuICAgICAgcmlnaHQgPSB0bXA7XG4gICAgfVxuICAgIHJldHVybiB7IGxlZnQsIHJpZ2h0IH07XG4gIH1cbn1cbiJdfQ==