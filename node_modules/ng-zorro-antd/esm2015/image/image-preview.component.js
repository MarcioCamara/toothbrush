import { OverlayRef } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { fadeMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { isNotNil } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { FADE_CLASS_NAME_MAP, NZ_CONFIG_MODULE_NAME } from './image-config';
import { NzImagePreviewOptions } from './image-preview-options';
import { getClientSize, getFitContentPosition, getOffset } from './utils';
const initialPosition = {
    x: 0,
    y: 0
};
export class NzImagePreviewComponent {
    constructor(cdr, nzConfigService, config, overlayRef) {
        var _a, _b;
        this.cdr = cdr;
        this.nzConfigService = nzConfigService;
        this.config = config;
        this.overlayRef = overlayRef;
        this.images = [];
        this.index = 0;
        this.isDragging = false;
        this.visible = true;
        this.animationState = 'enter';
        this.animationStateChanged = new EventEmitter();
        this.previewImageTransform = '';
        this.previewImageWrapperTransform = '';
        this.operations = [
            {
                icon: 'close',
                onClick: () => {
                    this.onClose();
                },
                type: 'close'
            },
            {
                icon: 'zoom-in',
                onClick: () => {
                    this.onZoomIn();
                },
                type: 'zoomIn'
            },
            {
                icon: 'zoom-out',
                onClick: () => {
                    this.onZoomOut();
                },
                type: 'zoomOut'
            },
            {
                icon: 'rotate-right',
                onClick: () => {
                    this.onRotateRight();
                },
                type: 'rotateRight'
            },
            {
                icon: 'rotate-left',
                onClick: () => {
                    this.onRotateLeft();
                },
                type: 'rotateLeft'
            }
        ];
        this.zoomOutDisabled = false;
        this.position = Object.assign({}, initialPosition);
        this.containerClick = new EventEmitter();
        this.closeClick = new EventEmitter();
        this.destroy$ = new Subject();
        // TODO: move to host after View Engine deprecation
        this.zoom = (_a = this.config.nzZoom) !== null && _a !== void 0 ? _a : 1;
        this.rotate = (_b = this.config.nzRotate) !== null && _b !== void 0 ? _b : 0;
        this.updateZoomOutDisabled();
        this.updatePreviewImageTransform();
        this.updatePreviewImageWrapperTransform();
    }
    get animationDisabled() {
        var _a;
        return (_a = this.config.nzNoAnimation) !== null && _a !== void 0 ? _a : false;
    }
    get maskClosable() {
        var _a, _b;
        const defaultConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME) || {};
        return (_b = (_a = this.config.nzMaskClosable) !== null && _a !== void 0 ? _a : defaultConfig.nzMaskClosable) !== null && _b !== void 0 ? _b : true;
    }
    setImages(images) {
        this.images = images;
        this.cdr.markForCheck();
    }
    switchTo(index) {
        this.index = index;
        this.cdr.markForCheck();
    }
    next() {
        if (this.index < this.images.length - 1) {
            this.reset();
            this.index++;
            this.updatePreviewImageTransform();
            this.updatePreviewImageWrapperTransform();
            this.updateZoomOutDisabled();
            this.cdr.markForCheck();
        }
    }
    prev() {
        if (this.index > 0) {
            this.reset();
            this.index--;
            this.updatePreviewImageTransform();
            this.updatePreviewImageWrapperTransform();
            this.updateZoomOutDisabled();
            this.cdr.markForCheck();
        }
    }
    markForCheck() {
        this.cdr.markForCheck();
    }
    onClose() {
        this.closeClick.emit();
    }
    onZoomIn() {
        this.zoom += 1;
        this.updatePreviewImageTransform();
        this.updateZoomOutDisabled();
        this.position = Object.assign({}, initialPosition);
    }
    onZoomOut() {
        if (this.zoom > 1) {
            this.zoom -= 1;
            this.updatePreviewImageTransform();
            this.updateZoomOutDisabled();
            this.position = Object.assign({}, initialPosition);
        }
    }
    onRotateRight() {
        this.rotate += 90;
        this.updatePreviewImageTransform();
    }
    onRotateLeft() {
        this.rotate -= 90;
        this.updatePreviewImageTransform();
    }
    onSwitchLeft(event) {
        event.preventDefault();
        event.stopPropagation();
        this.prev();
    }
    onSwitchRight(event) {
        event.preventDefault();
        event.stopPropagation();
        this.next();
    }
    onContainerClick(e) {
        if (e.target === e.currentTarget && this.maskClosable) {
            this.containerClick.emit();
        }
    }
    onAnimationStart(event) {
        if (event.toState === 'enter') {
            this.setEnterAnimationClass();
        }
        else if (event.toState === 'leave') {
            this.setLeaveAnimationClass();
        }
        this.animationStateChanged.emit(event);
    }
    onAnimationDone(event) {
        if (event.toState === 'enter') {
            this.setEnterAnimationClass();
        }
        else if (event.toState === 'leave') {
            this.setLeaveAnimationClass();
        }
        this.animationStateChanged.emit(event);
    }
    startLeaveAnimation() {
        this.animationState = 'leave';
        this.cdr.markForCheck();
    }
    onDragStarted() {
        this.isDragging = true;
    }
    onDragReleased() {
        this.isDragging = false;
        const width = this.imageRef.nativeElement.offsetWidth * this.zoom;
        const height = this.imageRef.nativeElement.offsetHeight * this.zoom;
        const { left, top } = getOffset(this.imageRef.nativeElement);
        const { width: clientWidth, height: clientHeight } = getClientSize();
        const isRotate = this.rotate % 180 !== 0;
        const fitContentParams = {
            width: isRotate ? height : width,
            height: isRotate ? width : height,
            left,
            top,
            clientWidth,
            clientHeight
        };
        const fitContentPos = getFitContentPosition(fitContentParams);
        if (isNotNil(fitContentPos.x) || isNotNil(fitContentPos.y)) {
            this.position = Object.assign(Object.assign({}, this.position), fitContentPos);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    updatePreviewImageTransform() {
        this.previewImageTransform = `scale3d(${this.zoom}, ${this.zoom}, 1) rotate(${this.rotate}deg)`;
    }
    updatePreviewImageWrapperTransform() {
        this.previewImageWrapperTransform = `translate3d(${this.position.x}px, ${this.position.y}px, 0)`;
    }
    updateZoomOutDisabled() {
        this.zoomOutDisabled = this.zoom <= 1;
    }
    setEnterAnimationClass() {
        if (this.animationDisabled) {
            return;
        }
        const backdropElement = this.overlayRef.backdropElement;
        if (backdropElement) {
            backdropElement.classList.add(FADE_CLASS_NAME_MAP.enter);
            backdropElement.classList.add(FADE_CLASS_NAME_MAP.enterActive);
        }
    }
    setLeaveAnimationClass() {
        if (this.animationDisabled) {
            return;
        }
        const backdropElement = this.overlayRef.backdropElement;
        if (backdropElement) {
            backdropElement.classList.add(FADE_CLASS_NAME_MAP.leave);
            backdropElement.classList.add(FADE_CLASS_NAME_MAP.leaveActive);
        }
    }
    reset() {
        this.zoom = 1;
        this.rotate = 0;
        this.position = Object.assign({}, initialPosition);
    }
}
NzImagePreviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-image-preview',
                exportAs: 'nzImagePreview',
                animations: [fadeMotion],
                template: `
    <div class="ant-image-preview">
      <div tabindex="0" aria-hidden="true" style="width: 0; height: 0; overflow: hidden; outline: none;"></div>
      <div class="ant-image-preview-content">
        <div class="ant-image-preview-body">
          <ul class="ant-image-preview-operations">
            <li
              class="ant-image-preview-operations-operation"
              [class.ant-image-preview-operations-operation-disabled]="zoomOutDisabled && option.type === 'zoomOut'"
              (click)="option.onClick()"
              *ngFor="let option of operations"
            >
              <span class="ant-image-preview-operations-icon" nz-icon [nzType]="option.icon" nzTheme="outline"></span>
            </li>
          </ul>
          <div
            class="ant-image-preview-img-wrapper"
            cdkDrag
            [style.transform]="previewImageWrapperTransform"
            [cdkDragFreeDragPosition]="position"
            (mousedown)="onDragStarted()"
            (cdkDragReleased)="onDragReleased()"
          >
            <ng-container *ngFor="let image of images; index as imageIndex">
              <img
                cdkDragHandle
                class="ant-image-preview-img"
                #imgRef
                *ngIf="index === imageIndex"
                [attr.src]="image.src"
                [attr.alt]="image.alt"
                [style.width]="image.width"
                [style.height]="image.height"
                [style.transform]="previewImageTransform"
              />
            </ng-container>
          </div>
          <ng-container *ngIf="images.length > 1">
            <div
              class="ant-image-preview-switch-left"
              [class.ant-image-preview-switch-left-disabled]="index <= 0"
              (click)="onSwitchLeft($event)"
            >
              <span nz-icon nzType="left" nzTheme="outline"></span>
            </div>
            <div
              class="ant-image-preview-switch-right"
              [class.ant-image-preview-switch-right-disabled]="index >= images.length - 1"
              (click)="onSwitchRight($event)"
            >
              <span nz-icon nzType="right" nzTheme="outline"></span>
            </div>
          </ng-container>
        </div>
      </div>
      <div tabindex="0" aria-hidden="true" style="width: 0; height: 0; overflow: hidden; outline: none;"></div>
    </div>
  `,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[class.ant-image-preview-moving]': 'isDragging',
                    '[style.zIndex]': 'config.nzZIndex',
                    '[class.ant-image-preview-wrap]': 'true',
                    '[@.disabled]': 'config.nzNoAnimation',
                    '[@fadeMotion]': 'animationState',
                    '(@fadeMotion.start)': 'onAnimationStart($event)',
                    '(@fadeMotion.done)': 'onAnimationDone($event)',
                    '(click)': 'onContainerClick($event)',
                    tabindex: '-1',
                    role: 'document'
                }
            },] }
];
NzImagePreviewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NzConfigService },
    { type: NzImagePreviewOptions },
    { type: OverlayRef }
];
NzImagePreviewComponent.propDecorators = {
    imageRef: [{ type: ViewChild, args: ['imgRef',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtcHJldmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2ltYWdlL2ltYWdlLXByZXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFFWixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFNUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQUFFLG1CQUFtQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUUsT0FBTyxFQUFXLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFekUsT0FBTyxFQUFFLGFBQWEsRUFBRSxxQkFBcUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFTMUUsTUFBTSxlQUFlLEdBQUc7SUFDdEIsQ0FBQyxFQUFFLENBQUM7SUFDSixDQUFDLEVBQUUsQ0FBQztDQUNMLENBQUM7QUFnRkYsTUFBTSxPQUFPLHVCQUF1QjtJQXFFbEMsWUFDVSxHQUFzQixFQUN2QixlQUFnQyxFQUNoQyxNQUE2QixFQUM1QixVQUFzQjs7UUFIdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdkIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFdBQU0sR0FBTixNQUFNLENBQXVCO1FBQzVCLGVBQVUsR0FBVixVQUFVLENBQVk7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RUFBRSxpQkFBaUI7b0JBQ25DLGdDQUFnQyxFQUFFLE1BQU07b0JBQ3hDLGNBQWMsRUFBRSxzQkFBc0I7b0JBQ3RDLGVBQWUsRUFBRSxnQkFBZ0I7b0JBQ2pDLHFCQUFxQixFQUFFLDBCQUEwQjtvQkFDakQsb0JBQW9CLEVBQUUseUJBQXlCO29CQUMvQyxTQUFTLEVBQUUsMEJBQTBCO29CQUNyQyxRQUFRLEVBQUUsSUFBSTtvQkFDZCxJQUFJLEVBQUUsVUFBVTtpQkFDakI7YUFDRjs7O1lBNUdDLGlCQUFpQjtZQVNWLGVBQWU7WUFNTixxQkFBcUI7WUFsQjlCLFVBQVU7Ozt1QkFzS2hCLFNBQVMsU0FBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cbmltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25EZXN0cm95LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmFkZU1vdGlvbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9hbmltYXRpb24nO1xuaW1wb3J0IHsgTnpDb25maWdTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgaXNOb3ROaWwgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEZBREVfQ0xBU1NfTkFNRV9NQVAsIE5aX0NPTkZJR19NT0RVTEVfTkFNRSB9IGZyb20gJy4vaW1hZ2UtY29uZmlnJztcbmltcG9ydCB7IE56SW1hZ2UsIE56SW1hZ2VQcmV2aWV3T3B0aW9ucyB9IGZyb20gJy4vaW1hZ2UtcHJldmlldy1vcHRpb25zJztcbmltcG9ydCB7IE56SW1hZ2VQcmV2aWV3UmVmIH0gZnJvbSAnLi9pbWFnZS1wcmV2aWV3LXJlZic7XG5pbXBvcnQgeyBnZXRDbGllbnRTaXplLCBnZXRGaXRDb250ZW50UG9zaXRpb24sIGdldE9mZnNldCB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE56SW1hZ2VDb250YWluZXJPcGVyYXRpb24ge1xuICBpY29uOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcblxuICBvbkNsaWNrKCk6IHZvaWQ7XG59XG5cbmNvbnN0IGluaXRpYWxQb3NpdGlvbiA9IHtcbiAgeDogMCxcbiAgeTogMFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotaW1hZ2UtcHJldmlldycsXG4gIGV4cG9ydEFzOiAnbnpJbWFnZVByZXZpZXcnLFxuICBhbmltYXRpb25zOiBbZmFkZU1vdGlvbl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC1pbWFnZS1wcmV2aWV3XCI+XG4gICAgICA8ZGl2IHRhYmluZGV4PVwiMFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHN0eWxlPVwid2lkdGg6IDA7IGhlaWdodDogMDsgb3ZlcmZsb3c6IGhpZGRlbjsgb3V0bGluZTogbm9uZTtcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtaW1hZ2UtcHJldmlldy1jb250ZW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtaW1hZ2UtcHJldmlldy1ib2R5XCI+XG4gICAgICAgICAgPHVsIGNsYXNzPVwiYW50LWltYWdlLXByZXZpZXctb3BlcmF0aW9uc1wiPlxuICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgIGNsYXNzPVwiYW50LWltYWdlLXByZXZpZXctb3BlcmF0aW9ucy1vcGVyYXRpb25cIlxuICAgICAgICAgICAgICBbY2xhc3MuYW50LWltYWdlLXByZXZpZXctb3BlcmF0aW9ucy1vcGVyYXRpb24tZGlzYWJsZWRdPVwiem9vbU91dERpc2FibGVkICYmIG9wdGlvbi50eXBlID09PSAnem9vbU91dCdcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwib3B0aW9uLm9uQ2xpY2soKVwiXG4gICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3BlcmF0aW9uc1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW50LWltYWdlLXByZXZpZXctb3BlcmF0aW9ucy1pY29uXCIgbnotaWNvbiBbbnpUeXBlXT1cIm9wdGlvbi5pY29uXCIgbnpUaGVtZT1cIm91dGxpbmVcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJhbnQtaW1hZ2UtcHJldmlldy1pbWctd3JhcHBlclwiXG4gICAgICAgICAgICBjZGtEcmFnXG4gICAgICAgICAgICBbc3R5bGUudHJhbnNmb3JtXT1cInByZXZpZXdJbWFnZVdyYXBwZXJUcmFuc2Zvcm1cIlxuICAgICAgICAgICAgW2Nka0RyYWdGcmVlRHJhZ1Bvc2l0aW9uXT1cInBvc2l0aW9uXCJcbiAgICAgICAgICAgIChtb3VzZWRvd24pPVwib25EcmFnU3RhcnRlZCgpXCJcbiAgICAgICAgICAgIChjZGtEcmFnUmVsZWFzZWQpPVwib25EcmFnUmVsZWFzZWQoKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaW1hZ2Ugb2YgaW1hZ2VzOyBpbmRleCBhcyBpbWFnZUluZGV4XCI+XG4gICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICBjZGtEcmFnSGFuZGxlXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJhbnQtaW1hZ2UtcHJldmlldy1pbWdcIlxuICAgICAgICAgICAgICAgICNpbWdSZWZcbiAgICAgICAgICAgICAgICAqbmdJZj1cImluZGV4ID09PSBpbWFnZUluZGV4XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5zcmNdPVwiaW1hZ2Uuc3JjXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hbHRdPVwiaW1hZ2UuYWx0XCJcbiAgICAgICAgICAgICAgICBbc3R5bGUud2lkdGhdPVwiaW1hZ2Uud2lkdGhcIlxuICAgICAgICAgICAgICAgIFtzdHlsZS5oZWlnaHRdPVwiaW1hZ2UuaGVpZ2h0XCJcbiAgICAgICAgICAgICAgICBbc3R5bGUudHJhbnNmb3JtXT1cInByZXZpZXdJbWFnZVRyYW5zZm9ybVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaW1hZ2VzLmxlbmd0aCA+IDFcIj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3M9XCJhbnQtaW1hZ2UtcHJldmlldy1zd2l0Y2gtbGVmdFwiXG4gICAgICAgICAgICAgIFtjbGFzcy5hbnQtaW1hZ2UtcHJldmlldy1zd2l0Y2gtbGVmdC1kaXNhYmxlZF09XCJpbmRleCA8PSAwXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uU3dpdGNoTGVmdCgkZXZlbnQpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHNwYW4gbnotaWNvbiBuelR5cGU9XCJsZWZ0XCIgbnpUaGVtZT1cIm91dGxpbmVcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3M9XCJhbnQtaW1hZ2UtcHJldmlldy1zd2l0Y2gtcmlnaHRcIlxuICAgICAgICAgICAgICBbY2xhc3MuYW50LWltYWdlLXByZXZpZXctc3dpdGNoLXJpZ2h0LWRpc2FibGVkXT1cImluZGV4ID49IGltYWdlcy5sZW5ndGggLSAxXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uU3dpdGNoUmlnaHQoJGV2ZW50KVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuIG56LWljb24gbnpUeXBlPVwicmlnaHRcIiBuelRoZW1lPVwib3V0bGluZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiB0YWJpbmRleD1cIjBcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBzdHlsZT1cIndpZHRoOiAwOyBoZWlnaHQ6IDA7IG92ZXJmbG93OiBoaWRkZW47IG91dGxpbmU6IG5vbmU7XCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LWltYWdlLXByZXZpZXctbW92aW5nXSc6ICdpc0RyYWdnaW5nJyxcbiAgICAnW3N0eWxlLnpJbmRleF0nOiAnY29uZmlnLm56WkluZGV4JyxcbiAgICAnW2NsYXNzLmFudC1pbWFnZS1wcmV2aWV3LXdyYXBdJzogJ3RydWUnLFxuICAgICdbQC5kaXNhYmxlZF0nOiAnY29uZmlnLm56Tm9BbmltYXRpb24nLFxuICAgICdbQGZhZGVNb3Rpb25dJzogJ2FuaW1hdGlvblN0YXRlJyxcbiAgICAnKEBmYWRlTW90aW9uLnN0YXJ0KSc6ICdvbkFuaW1hdGlvblN0YXJ0KCRldmVudCknLFxuICAgICcoQGZhZGVNb3Rpb24uZG9uZSknOiAnb25BbmltYXRpb25Eb25lKCRldmVudCknLFxuICAgICcoY2xpY2spJzogJ29uQ29udGFpbmVyQ2xpY2soJGV2ZW50KScsXG4gICAgdGFiaW5kZXg6ICctMScsXG4gICAgcm9sZTogJ2RvY3VtZW50J1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56SW1hZ2VQcmV2aWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgaW1hZ2VzOiBOekltYWdlW10gPSBbXTtcbiAgaW5kZXggPSAwO1xuICBpc0RyYWdnaW5nID0gZmFsc2U7XG4gIHZpc2libGUgPSB0cnVlO1xuICBhbmltYXRpb25TdGF0ZTogJ3ZvaWQnIHwgJ2VudGVyJyB8ICdsZWF2ZScgPSAnZW50ZXInO1xuICBhbmltYXRpb25TdGF0ZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEFuaW1hdGlvbkV2ZW50PigpO1xuXG4gIHByZXZpZXdJbWFnZVRyYW5zZm9ybSA9ICcnO1xuICBwcmV2aWV3SW1hZ2VXcmFwcGVyVHJhbnNmb3JtID0gJyc7XG4gIG9wZXJhdGlvbnM6IE56SW1hZ2VDb250YWluZXJPcGVyYXRpb25bXSA9IFtcbiAgICB7XG4gICAgICBpY29uOiAnY2xvc2UnLFxuICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgICAgIH0sXG4gICAgICB0eXBlOiAnY2xvc2UnXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiAnem9vbS1pbicsXG4gICAgICBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgIHRoaXMub25ab29tSW4oKTtcbiAgICAgIH0sXG4gICAgICB0eXBlOiAnem9vbUluJ1xuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogJ3pvb20tb3V0JyxcbiAgICAgIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgdGhpcy5vblpvb21PdXQoKTtcbiAgICAgIH0sXG4gICAgICB0eXBlOiAnem9vbU91dCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246ICdyb3RhdGUtcmlnaHQnLFxuICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICB0aGlzLm9uUm90YXRlUmlnaHQoKTtcbiAgICAgIH0sXG4gICAgICB0eXBlOiAncm90YXRlUmlnaHQnXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiAncm90YXRlLWxlZnQnLFxuICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICB0aGlzLm9uUm90YXRlTGVmdCgpO1xuICAgICAgfSxcbiAgICAgIHR5cGU6ICdyb3RhdGVMZWZ0J1xuICAgIH1cbiAgXTtcblxuICB6b29tT3V0RGlzYWJsZWQgPSBmYWxzZTtcbiAgcG9zaXRpb24gPSB7IC4uLmluaXRpYWxQb3NpdGlvbiB9O1xuICBwcmV2aWV3UmVmITogTnpJbWFnZVByZXZpZXdSZWY7XG4gIGNvbnRhaW5lckNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBjbG9zZUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2ltZ1JlZicpIGltYWdlUmVmITogRWxlbWVudFJlZjxIVE1MSW1hZ2VFbGVtZW50PjtcblxuICBwcml2YXRlIHpvb206IG51bWJlcjtcbiAgcHJpdmF0ZSByb3RhdGU6IG51bWJlcjtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgZ2V0IGFuaW1hdGlvbkRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5uek5vQW5pbWF0aW9uID8/IGZhbHNlO1xuICB9XG5cbiAgZ2V0IG1hc2tDbG9zYWJsZSgpOiBib29sZWFuIHtcbiAgICBjb25zdCBkZWZhdWx0Q29uZmlnOiBOelNhZmVBbnkgPSB0aGlzLm56Q29uZmlnU2VydmljZS5nZXRDb25maWdGb3JDb21wb25lbnQoTlpfQ09ORklHX01PRFVMRV9OQU1FKSB8fCB7fTtcbiAgICByZXR1cm4gdGhpcy5jb25maWcubnpNYXNrQ2xvc2FibGUgPz8gZGVmYXVsdENvbmZpZy5uek1hc2tDbG9zYWJsZSA/PyB0cnVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHB1YmxpYyBuekNvbmZpZ1NlcnZpY2U6IE56Q29uZmlnU2VydmljZSxcbiAgICBwdWJsaWMgY29uZmlnOiBOekltYWdlUHJldmlld09wdGlvbnMsXG4gICAgcHJpdmF0ZSBvdmVybGF5UmVmOiBPdmVybGF5UmVmXG4gICkge1xuICAgIC8vIFRPRE86IG1vdmUgdG8gaG9zdCBhZnRlciBWaWV3IEVuZ2luZSBkZXByZWNhdGlvblxuICAgIHRoaXMuem9vbSA9IHRoaXMuY29uZmlnLm56Wm9vbSA/PyAxO1xuICAgIHRoaXMucm90YXRlID0gdGhpcy5jb25maWcubnpSb3RhdGUgPz8gMDtcbiAgICB0aGlzLnVwZGF0ZVpvb21PdXREaXNhYmxlZCgpO1xuICAgIHRoaXMudXBkYXRlUHJldmlld0ltYWdlVHJhbnNmb3JtKCk7XG4gICAgdGhpcy51cGRhdGVQcmV2aWV3SW1hZ2VXcmFwcGVyVHJhbnNmb3JtKCk7XG4gIH1cblxuICBzZXRJbWFnZXMoaW1hZ2VzOiBOekltYWdlW10pOiB2b2lkIHtcbiAgICB0aGlzLmltYWdlcyA9IGltYWdlcztcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHN3aXRjaFRvKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBuZXh0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmluZGV4IDwgdGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkge1xuICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgdGhpcy5pbmRleCsrO1xuICAgICAgdGhpcy51cGRhdGVQcmV2aWV3SW1hZ2VUcmFuc2Zvcm0oKTtcbiAgICAgIHRoaXMudXBkYXRlUHJldmlld0ltYWdlV3JhcHBlclRyYW5zZm9ybSgpO1xuICAgICAgdGhpcy51cGRhdGVab29tT3V0RGlzYWJsZWQoKTtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHByZXYoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW5kZXggPiAwKSB7XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICB0aGlzLmluZGV4LS07XG4gICAgICB0aGlzLnVwZGF0ZVByZXZpZXdJbWFnZVRyYW5zZm9ybSgpO1xuICAgICAgdGhpcy51cGRhdGVQcmV2aWV3SW1hZ2VXcmFwcGVyVHJhbnNmb3JtKCk7XG4gICAgICB0aGlzLnVwZGF0ZVpvb21PdXREaXNhYmxlZCgpO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgbWFya0ZvckNoZWNrKCk6IHZvaWQge1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgb25DbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlQ2xpY2suZW1pdCgpO1xuICB9XG5cbiAgb25ab29tSW4oKTogdm9pZCB7XG4gICAgdGhpcy56b29tICs9IDE7XG4gICAgdGhpcy51cGRhdGVQcmV2aWV3SW1hZ2VUcmFuc2Zvcm0oKTtcbiAgICB0aGlzLnVwZGF0ZVpvb21PdXREaXNhYmxlZCgpO1xuICAgIHRoaXMucG9zaXRpb24gPSB7IC4uLmluaXRpYWxQb3NpdGlvbiB9O1xuICB9XG5cbiAgb25ab29tT3V0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnpvb20gPiAxKSB7XG4gICAgICB0aGlzLnpvb20gLT0gMTtcbiAgICAgIHRoaXMudXBkYXRlUHJldmlld0ltYWdlVHJhbnNmb3JtKCk7XG4gICAgICB0aGlzLnVwZGF0ZVpvb21PdXREaXNhYmxlZCgpO1xuICAgICAgdGhpcy5wb3NpdGlvbiA9IHsgLi4uaW5pdGlhbFBvc2l0aW9uIH07XG4gICAgfVxuICB9XG5cbiAgb25Sb3RhdGVSaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLnJvdGF0ZSArPSA5MDtcbiAgICB0aGlzLnVwZGF0ZVByZXZpZXdJbWFnZVRyYW5zZm9ybSgpO1xuICB9XG5cbiAgb25Sb3RhdGVMZWZ0KCk6IHZvaWQge1xuICAgIHRoaXMucm90YXRlIC09IDkwO1xuICAgIHRoaXMudXBkYXRlUHJldmlld0ltYWdlVHJhbnNmb3JtKCk7XG4gIH1cblxuICBvblN3aXRjaExlZnQoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMucHJldigpO1xuICB9XG5cbiAgb25Td2l0Y2hSaWdodChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5uZXh0KCk7XG4gIH1cblxuICBvbkNvbnRhaW5lckNsaWNrKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZS50YXJnZXQgPT09IGUuY3VycmVudFRhcmdldCAmJiB0aGlzLm1hc2tDbG9zYWJsZSkge1xuICAgICAgdGhpcy5jb250YWluZXJDbGljay5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgb25BbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQudG9TdGF0ZSA9PT0gJ2VudGVyJykge1xuICAgICAgdGhpcy5zZXRFbnRlckFuaW1hdGlvbkNsYXNzKCk7XG4gICAgfSBlbHNlIGlmIChldmVudC50b1N0YXRlID09PSAnbGVhdmUnKSB7XG4gICAgICB0aGlzLnNldExlYXZlQW5pbWF0aW9uQ2xhc3MoKTtcbiAgICB9XG5cbiAgICB0aGlzLmFuaW1hdGlvblN0YXRlQ2hhbmdlZC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIG9uQW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQudG9TdGF0ZSA9PT0gJ2VudGVyJykge1xuICAgICAgdGhpcy5zZXRFbnRlckFuaW1hdGlvbkNsYXNzKCk7XG4gICAgfSBlbHNlIGlmIChldmVudC50b1N0YXRlID09PSAnbGVhdmUnKSB7XG4gICAgICB0aGlzLnNldExlYXZlQW5pbWF0aW9uQ2xhc3MoKTtcbiAgICB9XG4gICAgdGhpcy5hbmltYXRpb25TdGF0ZUNoYW5nZWQuZW1pdChldmVudCk7XG4gIH1cblxuICBzdGFydExlYXZlQW5pbWF0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSAnbGVhdmUnO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgb25EcmFnU3RhcnRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICB9XG5cbiAgb25EcmFnUmVsZWFzZWQoKTogdm9pZCB7XG4gICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmltYWdlUmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggKiB0aGlzLnpvb207XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5pbWFnZVJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCAqIHRoaXMuem9vbTtcbiAgICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gZ2V0T2Zmc2V0KHRoaXMuaW1hZ2VSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgY29uc3QgeyB3aWR0aDogY2xpZW50V2lkdGgsIGhlaWdodDogY2xpZW50SGVpZ2h0IH0gPSBnZXRDbGllbnRTaXplKCk7XG4gICAgY29uc3QgaXNSb3RhdGUgPSB0aGlzLnJvdGF0ZSAlIDE4MCAhPT0gMDtcbiAgICBjb25zdCBmaXRDb250ZW50UGFyYW1zID0ge1xuICAgICAgd2lkdGg6IGlzUm90YXRlID8gaGVpZ2h0IDogd2lkdGgsXG4gICAgICBoZWlnaHQ6IGlzUm90YXRlID8gd2lkdGggOiBoZWlnaHQsXG4gICAgICBsZWZ0LFxuICAgICAgdG9wLFxuICAgICAgY2xpZW50V2lkdGgsXG4gICAgICBjbGllbnRIZWlnaHRcbiAgICB9O1xuICAgIGNvbnN0IGZpdENvbnRlbnRQb3MgPSBnZXRGaXRDb250ZW50UG9zaXRpb24oZml0Q29udGVudFBhcmFtcyk7XG4gICAgaWYgKGlzTm90TmlsKGZpdENvbnRlbnRQb3MueCkgfHwgaXNOb3ROaWwoZml0Q29udGVudFBvcy55KSkge1xuICAgICAgdGhpcy5wb3NpdGlvbiA9IHsgLi4udGhpcy5wb3NpdGlvbiwgLi4uZml0Q29udGVudFBvcyB9O1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUHJldmlld0ltYWdlVHJhbnNmb3JtKCk6IHZvaWQge1xuICAgIHRoaXMucHJldmlld0ltYWdlVHJhbnNmb3JtID0gYHNjYWxlM2QoJHt0aGlzLnpvb219LCAke3RoaXMuem9vbX0sIDEpIHJvdGF0ZSgke3RoaXMucm90YXRlfWRlZylgO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVQcmV2aWV3SW1hZ2VXcmFwcGVyVHJhbnNmb3JtKCk6IHZvaWQge1xuICAgIHRoaXMucHJldmlld0ltYWdlV3JhcHBlclRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3RoaXMucG9zaXRpb24ueH1weCwgJHt0aGlzLnBvc2l0aW9uLnl9cHgsIDApYDtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlWm9vbU91dERpc2FibGVkKCk6IHZvaWQge1xuICAgIHRoaXMuem9vbU91dERpc2FibGVkID0gdGhpcy56b29tIDw9IDE7XG4gIH1cblxuICBwcml2YXRlIHNldEVudGVyQW5pbWF0aW9uQ2xhc3MoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uRGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYmFja2Ryb3BFbGVtZW50ID0gdGhpcy5vdmVybGF5UmVmLmJhY2tkcm9wRWxlbWVudDtcbiAgICBpZiAoYmFja2Ryb3BFbGVtZW50KSB7XG4gICAgICBiYWNrZHJvcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChGQURFX0NMQVNTX05BTUVfTUFQLmVudGVyKTtcbiAgICAgIGJhY2tkcm9wRWxlbWVudC5jbGFzc0xpc3QuYWRkKEZBREVfQ0xBU1NfTkFNRV9NQVAuZW50ZXJBY3RpdmUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0TGVhdmVBbmltYXRpb25DbGFzcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hbmltYXRpb25EaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBiYWNrZHJvcEVsZW1lbnQgPSB0aGlzLm92ZXJsYXlSZWYuYmFja2Ryb3BFbGVtZW50O1xuICAgIGlmIChiYWNrZHJvcEVsZW1lbnQpIHtcbiAgICAgIGJhY2tkcm9wRWxlbWVudC5jbGFzc0xpc3QuYWRkKEZBREVfQ0xBU1NfTkFNRV9NQVAubGVhdmUpO1xuICAgICAgYmFja2Ryb3BFbGVtZW50LmNsYXNzTGlzdC5hZGQoRkFERV9DTEFTU19OQU1FX01BUC5sZWF2ZUFjdGl2ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnpvb20gPSAxO1xuICAgIHRoaXMucm90YXRlID0gMDtcbiAgICB0aGlzLnBvc2l0aW9uID0geyAuLi5pbml0aWFsUG9zaXRpb24gfTtcbiAgfVxufVxuIl19