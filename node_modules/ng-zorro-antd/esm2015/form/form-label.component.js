/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, Optional, Renderer2, SkipSelf, ViewEncapsulation } from '@angular/core';
import { InputBoolean, toBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { DefaultTooltipIcon, NzFormDirective } from './form.directive';
function toTooltipIcon(value) {
    const icon = typeof value === 'string' ? { type: value } : value;
    return Object.assign(Object.assign({}, DefaultTooltipIcon), icon);
}
export class NzFormLabelComponent {
    constructor(elementRef, renderer, cdr, nzFormDirective) {
        this.cdr = cdr;
        this.nzFormDirective = nzFormDirective;
        this.nzRequired = false;
        this.noColon = 'default';
        this._tooltipIcon = 'default';
        this.destroy$ = new Subject();
        renderer.addClass(elementRef.nativeElement, 'ant-form-item-label');
        if (this.nzFormDirective) {
            this.nzFormDirective
                .getInputObservable('nzNoColon')
                .pipe(filter(() => this.noColon === 'default'), takeUntil(this.destroy$))
                .subscribe(() => this.cdr.markForCheck());
            this.nzFormDirective
                .getInputObservable('nzTooltipIcon')
                .pipe(filter(() => this._tooltipIcon === 'default'), takeUntil(this.destroy$))
                .subscribe(() => this.cdr.markForCheck());
        }
    }
    set nzNoColon(value) {
        this.noColon = toBoolean(value);
    }
    get nzNoColon() {
        var _a;
        return this.noColon !== 'default' ? this.noColon : (_a = this.nzFormDirective) === null || _a === void 0 ? void 0 : _a.nzNoColon;
    }
    set nzTooltipIcon(value) {
        this._tooltipIcon = toTooltipIcon(value);
    }
    // due to 'get' and 'set' accessor must have the same type, so it was renamed to `tooltipIcon`
    get tooltipIcon() {
        var _a;
        return this._tooltipIcon !== 'default' ? this._tooltipIcon : toTooltipIcon(((_a = this.nzFormDirective) === null || _a === void 0 ? void 0 : _a.nzTooltipIcon) || DefaultTooltipIcon);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzFormLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-form-label',
                exportAs: 'nzFormLabel',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <label [attr.for]="nzFor" [class.ant-form-item-no-colon]="nzNoColon" [class.ant-form-item-required]="nzRequired">
      <ng-content></ng-content>
      <span *ngIf="nzTooltipTitle" class="ant-form-item-tooltip" nz-tooltip [nzTooltipTitle]="nzTooltipTitle">
        <ng-container *nzStringTemplateOutlet="tooltipIcon.type; let tooltipIconType">
          <i nz-icon [nzType]="tooltipIconType" [nzTheme]="tooltipIcon.theme"></i>
        </ng-container>
      </span>
    </label>
  `
            },] }
];
NzFormLabelComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: NzFormDirective, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
NzFormLabelComponent.propDecorators = {
    nzFor: [{ type: Input }],
    nzRequired: [{ type: Input }],
    nzNoColon: [{ type: Input }],
    nzTooltipTitle: [{ type: Input }],
    nzTooltipIcon: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzFormLabelComponent.prototype, "nzRequired", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1sYWJlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2Zvcm0vZm9ybS1sYWJlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUVMLFFBQVEsRUFDUixTQUFTLEVBQ1QsUUFBUSxFQUNSLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUl2QixPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFPdkUsU0FBUyxhQUFhLENBQUMsS0FBaUM7SUFDdEQsTUFBTSxJQUFJLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2pFLHVDQUFZLGtCQUFrQixHQUFLLElBQUksRUFBRztBQUM1QyxDQUFDO0FBbUJELE1BQU0sT0FBTyxvQkFBb0I7SUE2Qi9CLFlBQ0UsVUFBc0IsRUFDdEIsUUFBbUIsRUFDWCxHQUFzQixFQUNFLGVBQWdDO1FBRHhELFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ0Usb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBNUJ6QyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBU3BDLFlBQU8sR0FBd0IsU0FBUyxDQUFDO1FBV3pDLGlCQUFZLEdBQWtDLFNBQVMsQ0FBQztRQUV4RCxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQVEvQixRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUVuRSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWU7aUJBQ2pCLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztpQkFDL0IsSUFBSSxDQUNILE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxFQUN4QyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUN6QjtpQkFDQSxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBRTVDLElBQUksQ0FBQyxlQUFlO2lCQUNqQixrQkFBa0IsQ0FBQyxlQUFlLENBQUM7aUJBQ25DLElBQUksQ0FDSCxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLENBQUMsRUFDN0MsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FDekI7aUJBQ0EsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztTQUM3QztJQUNILENBQUM7SUFoREQsSUFDSSxTQUFTLENBQUMsS0FBYztRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBQ0QsSUFBSSxTQUFTOztRQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFDLElBQUksQ0FBQyxlQUFlLDBDQUFFLFNBQVMsQ0FBQztJQUNyRixDQUFDO0lBS0QsSUFDSSxhQUFhLENBQUMsS0FBaUM7UUFDakQsSUFBSSxDQUFDLFlBQVksR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNELDhGQUE4RjtJQUM5RixJQUFJLFdBQVc7O1FBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQUEsSUFBSSxDQUFDLGVBQWUsMENBQUUsYUFBYSxLQUFJLGtCQUFrQixDQUFDLENBQUM7SUFDeEksQ0FBQztJQWdDRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQTVFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7Ozs7Ozs7O0dBU1Q7YUFDRjs7O1lBMUNDLFVBQVU7WUFJVixTQUFTO1lBTlQsaUJBQWlCO1lBZ0JVLGVBQWUsdUJBOER2QyxRQUFRLFlBQUksUUFBUTs7O29CQTdCdEIsS0FBSzt5QkFDTCxLQUFLO3dCQUNMLEtBQUs7NkJBVUwsS0FBSzs0QkFDTCxLQUFLOztBQVptQjtJQUFmLFlBQVksRUFBRTs7d0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBSZW5kZXJlcjIsXG4gIFNraXBTZWxmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRoZW1lVHlwZSB9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zLWFuZ3VsYXInO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelRTVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IElucHV0Qm9vbGVhbiwgdG9Cb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEZWZhdWx0VG9vbHRpcEljb24sIE56Rm9ybURpcmVjdGl2ZSB9IGZyb20gJy4vZm9ybS5kaXJlY3RpdmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE56Rm9ybVRvb2x0aXBJY29uIHtcbiAgdHlwZTogTnpUU1R5cGU7XG4gIHRoZW1lOiBUaGVtZVR5cGU7XG59XG5cbmZ1bmN0aW9uIHRvVG9vbHRpcEljb24odmFsdWU6IHN0cmluZyB8IE56Rm9ybVRvb2x0aXBJY29uKTogUmVxdWlyZWQ8TnpGb3JtVG9vbHRpcEljb24+IHtcbiAgY29uc3QgaWNvbiA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyB7IHR5cGU6IHZhbHVlIH0gOiB2YWx1ZTtcbiAgcmV0dXJuIHsgLi4uRGVmYXVsdFRvb2x0aXBJY29uLCAuLi5pY29uIH07XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWZvcm0tbGFiZWwnLFxuICBleHBvcnRBczogJ256Rm9ybUxhYmVsJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxsYWJlbCBbYXR0ci5mb3JdPVwibnpGb3JcIiBbY2xhc3MuYW50LWZvcm0taXRlbS1uby1jb2xvbl09XCJuek5vQ29sb25cIiBbY2xhc3MuYW50LWZvcm0taXRlbS1yZXF1aXJlZF09XCJuelJlcXVpcmVkXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8c3BhbiAqbmdJZj1cIm56VG9vbHRpcFRpdGxlXCIgY2xhc3M9XCJhbnQtZm9ybS1pdGVtLXRvb2x0aXBcIiBuei10b29sdGlwIFtuelRvb2x0aXBUaXRsZV09XCJuelRvb2x0aXBUaXRsZVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwidG9vbHRpcEljb24udHlwZTsgbGV0IHRvb2x0aXBJY29uVHlwZVwiPlxuICAgICAgICAgIDxpIG56LWljb24gW256VHlwZV09XCJ0b29sdGlwSWNvblR5cGVcIiBbbnpUaGVtZV09XCJ0b29sdGlwSWNvbi50aGVtZVwiPjwvaT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L3NwYW4+XG4gICAgPC9sYWJlbD5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOekZvcm1MYWJlbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelJlcXVpcmVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek5vQ29sb246IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBuekZvcj86IHN0cmluZztcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56UmVxdWlyZWQgPSBmYWxzZTtcbiAgQElucHV0KClcbiAgc2V0IG56Tm9Db2xvbih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMubm9Db2xvbiA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gIH1cbiAgZ2V0IG56Tm9Db2xvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ub0NvbG9uICE9PSAnZGVmYXVsdCcgPyB0aGlzLm5vQ29sb24gOiB0aGlzLm56Rm9ybURpcmVjdGl2ZT8ubnpOb0NvbG9uO1xuICB9XG5cbiAgcHJpdmF0ZSBub0NvbG9uOiBib29sZWFuIHwgJ2RlZmF1bHQnID0gJ2RlZmF1bHQnO1xuXG4gIEBJbnB1dCgpIG56VG9vbHRpcFRpdGxlPzogTnpUU1R5cGU7XG4gIEBJbnB1dCgpXG4gIHNldCBuelRvb2x0aXBJY29uKHZhbHVlOiBzdHJpbmcgfCBOekZvcm1Ub29sdGlwSWNvbikge1xuICAgIHRoaXMuX3Rvb2x0aXBJY29uID0gdG9Ub29sdGlwSWNvbih2YWx1ZSk7XG4gIH1cbiAgLy8gZHVlIHRvICdnZXQnIGFuZCAnc2V0JyBhY2Nlc3NvciBtdXN0IGhhdmUgdGhlIHNhbWUgdHlwZSwgc28gaXQgd2FzIHJlbmFtZWQgdG8gYHRvb2x0aXBJY29uYFxuICBnZXQgdG9vbHRpcEljb24oKTogTnpGb3JtVG9vbHRpcEljb24ge1xuICAgIHJldHVybiB0aGlzLl90b29sdGlwSWNvbiAhPT0gJ2RlZmF1bHQnID8gdGhpcy5fdG9vbHRpcEljb24gOiB0b1Rvb2x0aXBJY29uKHRoaXMubnpGb3JtRGlyZWN0aXZlPy5uelRvb2x0aXBJY29uIHx8IERlZmF1bHRUb29sdGlwSWNvbik7XG4gIH1cbiAgcHJpdmF0ZSBfdG9vbHRpcEljb246IE56Rm9ybVRvb2x0aXBJY29uIHwgJ2RlZmF1bHQnID0gJ2RlZmF1bHQnO1xuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcHJpdmF0ZSBuekZvcm1EaXJlY3RpdmU6IE56Rm9ybURpcmVjdGl2ZVxuICApIHtcbiAgICByZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhbnQtZm9ybS1pdGVtLWxhYmVsJyk7XG5cbiAgICBpZiAodGhpcy5uekZvcm1EaXJlY3RpdmUpIHtcbiAgICAgIHRoaXMubnpGb3JtRGlyZWN0aXZlXG4gICAgICAgIC5nZXRJbnB1dE9ic2VydmFibGUoJ256Tm9Db2xvbicpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLm5vQ29sb24gPT09ICdkZWZhdWx0JyksXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKSk7XG5cbiAgICAgIHRoaXMubnpGb3JtRGlyZWN0aXZlXG4gICAgICAgIC5nZXRJbnB1dE9ic2VydmFibGUoJ256VG9vbHRpcEljb24nKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5fdG9vbHRpcEljb24gPT09ICdkZWZhdWx0JyksXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=