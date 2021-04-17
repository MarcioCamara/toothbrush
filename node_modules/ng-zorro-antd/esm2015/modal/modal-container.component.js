/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Optional, Renderer2, ViewChild } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { nzModalAnimations } from './modal-animations';
import { BaseModalContainerComponent } from './modal-container';
import { ModalOptions } from './modal-types';
export class NzModalContainerComponent extends BaseModalContainerComponent {
    constructor(elementRef, focusTrapFactory, cdr, render, overlayRef, nzConfigService, config, document, animationType) {
        super(elementRef, focusTrapFactory, cdr, render, overlayRef, nzConfigService, config, document, animationType);
        this.config = config;
    }
}
NzModalContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-modal-container',
                exportAs: 'nzModalContainer',
                template: `
    <div
      #modalElement
      role="document"
      class="ant-modal"
      (mousedown)="onMousedown()"
      [ngClass]="config.nzClassName!"
      [ngStyle]="config.nzStyle!"
      [style.width]="config?.nzWidth! | nzToCssUnit"
    >
      <div class="ant-modal-content">
        <button *ngIf="config.nzClosable" nz-modal-close (click)="onCloseClick()"></button>
        <div *ngIf="config.nzTitle" nz-modal-title></div>
        <div class="ant-modal-body" [ngStyle]="config.nzBodyStyle!">
          <ng-template cdkPortalOutlet></ng-template>
          <div *ngIf="isStringContent" [innerHTML]="config.nzContent"></div>
        </div>
        <div
          *ngIf="config.nzFooter !== null"
          nz-modal-footer
          [modalRef]="modalRef"
          (cancelTriggered)="onCloseClick()"
          (okTriggered)="onOkClick()"
        ></div>
      </div>
    </div>
  `,
                animations: [nzModalAnimations.modalContainer],
                // Using OnPush for modal caused footer can not to detect changes. we can fix it when 8.x.
                changeDetection: ChangeDetectionStrategy.Default,
                host: {
                    tabindex: '-1',
                    role: 'dialog',
                    '[class]': 'config.nzWrapClassName ? "ant-modal-wrap " + config.nzWrapClassName : "ant-modal-wrap"',
                    '[class.ant-modal-wrap-rtl]': `dir === 'rtl'`,
                    '[class.ant-modal-centered]': 'config.nzCentered',
                    '[style.zIndex]': 'config.nzZIndex',
                    '[@.disabled]': 'config.nzNoAnimation',
                    '[@modalContainer]': 'state',
                    '(@modalContainer.start)': 'onAnimationStart($event)',
                    '(@modalContainer.done)': 'onAnimationDone($event)',
                    '(click)': 'onContainerClick($event)',
                    '(mouseup)': 'onMouseup()'
                }
            },] }
];
NzModalContainerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusTrapFactory },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: OverlayRef },
    { type: NzConfigService },
    { type: ModalOptions },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
NzModalContainerComponent.propDecorators = {
    portalOutlet: [{ type: ViewChild, args: [CdkPortalOutlet, { static: true },] }],
    modalElementRef: [{ type: ViewChild, args: ['modalElement', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUksT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRzVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFrRDdDLE1BQU0sT0FBTyx5QkFBMEIsU0FBUSwyQkFBMkI7SUFHeEUsWUFDRSxVQUFzQixFQUN0QixnQkFBa0MsRUFDbEMsR0FBc0IsRUFDdEIsTUFBaUIsRUFDakIsVUFBc0IsRUFDdEIsZUFBZ0MsRUFDekIsTUFBb0IsRUFDRyxRQUFtQixFQUNOLGFBQXFCO1FBRWhFLEtBQUssQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFKeEcsV0FBTSxHQUFOLE1BQU0sQ0FBYztJQUs3QixDQUFDOzs7WUEvREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQlQ7Z0JBQ0QsVUFBVSxFQUFFLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDO2dCQUM5QywwRkFBMEY7Z0JBQzFGLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2dCQUNoRCxJQUFJLEVBQUU7b0JBQ0osUUFBUSxFQUFFLElBQUk7b0JBQ2QsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsU0FBUyxFQUFFLHdGQUF3RjtvQkFDbkcsNEJBQTRCLEVBQUUsZUFBZTtvQkFDN0MsNEJBQTRCLEVBQUUsbUJBQW1CO29CQUNqRCxnQkFBZ0IsRUFBRSxpQkFBaUI7b0JBQ25DLGNBQWMsRUFBRSxzQkFBc0I7b0JBQ3RDLG1CQUFtQixFQUFFLE9BQU87b0JBQzVCLHlCQUF5QixFQUFFLDBCQUEwQjtvQkFDckQsd0JBQXdCLEVBQUUseUJBQXlCO29CQUNuRCxTQUFTLEVBQUUsMEJBQTBCO29CQUNyQyxXQUFXLEVBQUUsYUFBYTtpQkFDM0I7YUFDRjs7O1lBeEQrRCxVQUFVO1lBSmpFLGdCQUFnQjtZQUlTLGlCQUFpQjtZQUEyQyxTQUFTO1lBSDlGLFVBQVU7WUFLVixlQUFlO1lBS2YsWUFBWTs0Q0E2RGhCLFFBQVEsWUFBSSxNQUFNLFNBQUMsUUFBUTt5Q0FDM0IsUUFBUSxZQUFJLE1BQU0sU0FBQyxxQkFBcUI7OzsyQkFYMUMsU0FBUyxTQUFDLGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7OEJBQzNDLFNBQVMsU0FBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cbmltcG9ydCB7IEZvY3VzVHJhcEZhY3RvcnkgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ2RrUG9ydGFsT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5qZWN0LCBPcHRpb25hbCwgUmVuZGVyZXIyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFOSU1BVElPTl9NT0RVTEVfVFlQRSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBOekNvbmZpZ1NlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IG56TW9kYWxBbmltYXRpb25zIH0gZnJvbSAnLi9tb2RhbC1hbmltYXRpb25zJztcbmltcG9ydCB7IEJhc2VNb2RhbENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwtY29udGFpbmVyJztcbmltcG9ydCB7IE1vZGFsT3B0aW9ucyB9IGZyb20gJy4vbW9kYWwtdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1tb2RhbC1jb250YWluZXInLFxuICBleHBvcnRBczogJ256TW9kYWxDb250YWluZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgICNtb2RhbEVsZW1lbnRcbiAgICAgIHJvbGU9XCJkb2N1bWVudFwiXG4gICAgICBjbGFzcz1cImFudC1tb2RhbFwiXG4gICAgICAobW91c2Vkb3duKT1cIm9uTW91c2Vkb3duKClcIlxuICAgICAgW25nQ2xhc3NdPVwiY29uZmlnLm56Q2xhc3NOYW1lIVwiXG4gICAgICBbbmdTdHlsZV09XCJjb25maWcubnpTdHlsZSFcIlxuICAgICAgW3N0eWxlLndpZHRoXT1cImNvbmZpZz8ubnpXaWR0aCEgfCBuelRvQ3NzVW5pdFwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzcz1cImFudC1tb2RhbC1jb250ZW50XCI+XG4gICAgICAgIDxidXR0b24gKm5nSWY9XCJjb25maWcubnpDbG9zYWJsZVwiIG56LW1vZGFsLWNsb3NlIChjbGljayk9XCJvbkNsb3NlQ2xpY2soKVwiPjwvYnV0dG9uPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiY29uZmlnLm56VGl0bGVcIiBuei1tb2RhbC10aXRsZT48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC1tb2RhbC1ib2R5XCIgW25nU3R5bGVdPVwiY29uZmlnLm56Qm9keVN0eWxlIVwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBjZGtQb3J0YWxPdXRsZXQ+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaXNTdHJpbmdDb250ZW50XCIgW2lubmVySFRNTF09XCJjb25maWcubnpDb250ZW50XCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgKm5nSWY9XCJjb25maWcubnpGb290ZXIgIT09IG51bGxcIlxuICAgICAgICAgIG56LW1vZGFsLWZvb3RlclxuICAgICAgICAgIFttb2RhbFJlZl09XCJtb2RhbFJlZlwiXG4gICAgICAgICAgKGNhbmNlbFRyaWdnZXJlZCk9XCJvbkNsb3NlQ2xpY2soKVwiXG4gICAgICAgICAgKG9rVHJpZ2dlcmVkKT1cIm9uT2tDbGljaygpXCJcbiAgICAgICAgPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGFuaW1hdGlvbnM6IFtuek1vZGFsQW5pbWF0aW9ucy5tb2RhbENvbnRhaW5lcl0sXG4gIC8vIFVzaW5nIE9uUHVzaCBmb3IgbW9kYWwgY2F1c2VkIGZvb3RlciBjYW4gbm90IHRvIGRldGVjdCBjaGFuZ2VzLiB3ZSBjYW4gZml4IGl0IHdoZW4gOC54LlxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG4gIGhvc3Q6IHtcbiAgICB0YWJpbmRleDogJy0xJyxcbiAgICByb2xlOiAnZGlhbG9nJyxcbiAgICAnW2NsYXNzXSc6ICdjb25maWcubnpXcmFwQ2xhc3NOYW1lID8gXCJhbnQtbW9kYWwtd3JhcCBcIiArIGNvbmZpZy5ueldyYXBDbGFzc05hbWUgOiBcImFudC1tb2RhbC13cmFwXCInLFxuICAgICdbY2xhc3MuYW50LW1vZGFsLXdyYXAtcnRsXSc6IGBkaXIgPT09ICdydGwnYCxcbiAgICAnW2NsYXNzLmFudC1tb2RhbC1jZW50ZXJlZF0nOiAnY29uZmlnLm56Q2VudGVyZWQnLFxuICAgICdbc3R5bGUuekluZGV4XSc6ICdjb25maWcubnpaSW5kZXgnLFxuICAgICdbQC5kaXNhYmxlZF0nOiAnY29uZmlnLm56Tm9BbmltYXRpb24nLFxuICAgICdbQG1vZGFsQ29udGFpbmVyXSc6ICdzdGF0ZScsXG4gICAgJyhAbW9kYWxDb250YWluZXIuc3RhcnQpJzogJ29uQW5pbWF0aW9uU3RhcnQoJGV2ZW50KScsXG4gICAgJyhAbW9kYWxDb250YWluZXIuZG9uZSknOiAnb25BbmltYXRpb25Eb25lKCRldmVudCknLFxuICAgICcoY2xpY2spJzogJ29uQ29udGFpbmVyQ2xpY2soJGV2ZW50KScsXG4gICAgJyhtb3VzZXVwKSc6ICdvbk1vdXNldXAoKSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOek1vZGFsQ29udGFpbmVyQ29tcG9uZW50IGV4dGVuZHMgQmFzZU1vZGFsQ29udGFpbmVyQ29tcG9uZW50IHtcbiAgQFZpZXdDaGlsZChDZGtQb3J0YWxPdXRsZXQsIHsgc3RhdGljOiB0cnVlIH0pIHBvcnRhbE91dGxldCE6IENka1BvcnRhbE91dGxldDtcbiAgQFZpZXdDaGlsZCgnbW9kYWxFbGVtZW50JywgeyBzdGF0aWM6IHRydWUgfSkgbW9kYWxFbGVtZW50UmVmITogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG4gIGNvbnN0cnVjdG9yKFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgZm9jdXNUcmFwRmFjdG9yeTogRm9jdXNUcmFwRmFjdG9yeSxcbiAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHJlbmRlcjogUmVuZGVyZXIyLFxuICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsXG4gICAgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UsXG4gICAgcHVibGljIGNvbmZpZzogTW9kYWxPcHRpb25zLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBOelNhZmVBbnksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIGFuaW1hdGlvblR5cGU6IHN0cmluZ1xuICApIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBmb2N1c1RyYXBGYWN0b3J5LCBjZHIsIHJlbmRlciwgb3ZlcmxheVJlZiwgbnpDb25maWdTZXJ2aWNlLCBjb25maWcsIGRvY3VtZW50LCBhbmltYXRpb25UeXBlKTtcbiAgfVxufVxuIl19