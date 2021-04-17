/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
export class NzDividerComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.nzType = 'horizontal';
        this.nzOrientation = 'center';
        this.nzDashed = false;
        this.nzPlain = false;
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-divider');
    }
}
NzDividerComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-divider',
                exportAs: 'nzDivider',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <span *ngIf="nzText" class="ant-divider-inner-text">
      <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
    </span>
  `,
                host: {
                    '[class.ant-divider-horizontal]': `nzType === 'horizontal'`,
                    '[class.ant-divider-vertical]': `nzType === 'vertical'`,
                    '[class.ant-divider-with-text]': `nzText`,
                    '[class.ant-divider-plain]': `nzPlain`,
                    '[class.ant-divider-with-text-left]': `nzText && nzOrientation === 'left'`,
                    '[class.ant-divider-with-text-right]': `nzText && nzOrientation === 'right'`,
                    '[class.ant-divider-with-text-center]': `nzText && nzOrientation === 'center'`,
                    '[class.ant-divider-dashed]': `nzDashed`
                }
            },] }
];
NzDividerComponent.ctorParameters = () => [
    { type: ElementRef }
];
NzDividerComponent.propDecorators = {
    nzText: [{ type: Input }],
    nzType: [{ type: Input }],
    nzOrientation: [{ type: Input }],
    nzDashed: [{ type: Input }],
    nzPlain: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzDividerComponent.prototype, "nzDashed", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzDividerComponent.prototype, "nzPlain", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGl2aWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2RpdmlkZXIvZGl2aWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBZSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd0SCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUF3QnZELE1BQU0sT0FBTyxrQkFBa0I7SUFVN0IsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUxqQyxXQUFNLEdBQThCLFlBQVksQ0FBQztRQUNqRCxrQkFBYSxHQUFnQyxRQUFRLENBQUM7UUFDdEMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBR3ZDLG1EQUFtRDtRQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzdELENBQUM7OztZQW5DRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7OztHQUlUO2dCQUNELElBQUksRUFBRTtvQkFDSixnQ0FBZ0MsRUFBRSx5QkFBeUI7b0JBQzNELDhCQUE4QixFQUFFLHVCQUF1QjtvQkFDdkQsK0JBQStCLEVBQUUsUUFBUTtvQkFDekMsMkJBQTJCLEVBQUUsU0FBUztvQkFDdEMsb0NBQW9DLEVBQUUsb0NBQW9DO29CQUMxRSxxQ0FBcUMsRUFBRSxxQ0FBcUM7b0JBQzVFLHNDQUFzQyxFQUFFLHNDQUFzQztvQkFDOUUsNEJBQTRCLEVBQUUsVUFBVTtpQkFDekM7YUFDRjs7O1lBMUI0QyxVQUFVOzs7cUJBK0JwRCxLQUFLO3FCQUNMLEtBQUs7NEJBQ0wsS0FBSzt1QkFDTCxLQUFLO3NCQUNMLEtBQUs7O0FBRG1CO0lBQWYsWUFBWSxFQUFFOztvREFBa0I7QUFDakI7SUFBZixZQUFZLEVBQUU7O21EQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotZGl2aWRlcicsXG4gIGV4cG9ydEFzOiAnbnpEaXZpZGVyJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzcGFuICpuZ0lmPVwibnpUZXh0XCIgY2xhc3M9XCJhbnQtZGl2aWRlci1pbm5lci10ZXh0XCI+XG4gICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpUZXh0XCI+e3sgbnpUZXh0IH19PC9uZy1jb250YWluZXI+XG4gICAgPC9zcGFuPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtZGl2aWRlci1ob3Jpem9udGFsXSc6IGBuelR5cGUgPT09ICdob3Jpem9udGFsJ2AsXG4gICAgJ1tjbGFzcy5hbnQtZGl2aWRlci12ZXJ0aWNhbF0nOiBgbnpUeXBlID09PSAndmVydGljYWwnYCxcbiAgICAnW2NsYXNzLmFudC1kaXZpZGVyLXdpdGgtdGV4dF0nOiBgbnpUZXh0YCxcbiAgICAnW2NsYXNzLmFudC1kaXZpZGVyLXBsYWluXSc6IGBuelBsYWluYCxcbiAgICAnW2NsYXNzLmFudC1kaXZpZGVyLXdpdGgtdGV4dC1sZWZ0XSc6IGBuelRleHQgJiYgbnpPcmllbnRhdGlvbiA9PT0gJ2xlZnQnYCxcbiAgICAnW2NsYXNzLmFudC1kaXZpZGVyLXdpdGgtdGV4dC1yaWdodF0nOiBgbnpUZXh0ICYmIG56T3JpZW50YXRpb24gPT09ICdyaWdodCdgLFxuICAgICdbY2xhc3MuYW50LWRpdmlkZXItd2l0aC10ZXh0LWNlbnRlcl0nOiBgbnpUZXh0ICYmIG56T3JpZW50YXRpb24gPT09ICdjZW50ZXInYCxcbiAgICAnW2NsYXNzLmFudC1kaXZpZGVyLWRhc2hlZF0nOiBgbnpEYXNoZWRgXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpEaXZpZGVyQ29tcG9uZW50IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGFzaGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelBsYWluOiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCkgbnpUZXh0Pzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIG56VHlwZTogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcbiAgQElucHV0KCkgbnpPcmllbnRhdGlvbjogJ2xlZnQnIHwgJ3JpZ2h0JyB8ICdjZW50ZXInID0gJ2NlbnRlcic7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRhc2hlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpQbGFpbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIC8vIFRPRE86IG1vdmUgdG8gaG9zdCBhZnRlciBWaWV3IEVuZ2luZSBkZXByZWNhdGlvblxuICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FudC1kaXZpZGVyJyk7XG4gIH1cbn1cbiJdfQ==