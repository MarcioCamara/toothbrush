/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, Optional, Output, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { cancelRequestAnimationFrame, reqAnimFrame } from 'ng-zorro-antd/core/polyfill';
import { NzResizeService } from 'ng-zorro-antd/core/services';
import { InputBoolean, InputNumber, isStyleSupport, measure } from 'ng-zorro-antd/core/util';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { Directionality } from '@angular/cdk/bidi';
import { NzTextCopyComponent } from './text-copy.component';
import { NzTextEditComponent } from './text-edit.component';
const NZ_CONFIG_MODULE_NAME = 'typography';
const EXPAND_ELEMENT_CLASSNAME = 'ant-typography-expand';
export class NzTypographyComponent {
    constructor(nzConfigService, host, cdr, viewContainerRef, renderer, platform, i18n, document, resizeService, directionality) {
        this.nzConfigService = nzConfigService;
        this.host = host;
        this.cdr = cdr;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
        this.platform = platform;
        this.i18n = i18n;
        this.resizeService = resizeService;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzCopyable = false;
        this.nzEditable = false;
        this.nzDisabled = false;
        this.nzExpandable = false;
        this.nzEllipsis = false;
        this.nzCopyTooltips = undefined;
        this.nzCopyIcons = ['copy', 'check'];
        this.nzEditTooltip = undefined;
        this.nzEditIcon = 'edit';
        this.nzEllipsisRows = 1;
        this.nzContentChange = new EventEmitter();
        this.nzCopy = new EventEmitter();
        this.nzExpandChange = new EventEmitter();
        // This is not a two-way binding output with {@link nzEllipsis}
        this.nzOnEllipsis = new EventEmitter();
        this.expandableBtnElementCache = null;
        this.editing = false;
        this.cssEllipsis = false;
        this.isEllipsis = true;
        this.expanded = false;
        this.ellipsisStr = '...';
        this.dir = 'ltr';
        this.viewInit = false;
        this.rfaId = -1;
        this.destroy$ = new Subject();
        this.windowResizeSubscription = Subscription.EMPTY;
        this.document = document;
    }
    get hasEllipsisObservers() {
        return this.nzOnEllipsis.observers.length > 0;
    }
    get canCssEllipsis() {
        return this.nzEllipsis && this.cssEllipsis && !this.expanded && !this.hasEllipsisObservers;
    }
    get hasOperationsWithEllipsis() {
        return (this.nzCopyable || this.nzEditable || this.nzExpandable) && this.nzEllipsis;
    }
    get copyText() {
        return (typeof this.nzCopyText === 'string' ? this.nzCopyText : this.nzContent);
    }
    onTextCopy(text) {
        this.nzCopy.emit(text);
    }
    onStartEditing() {
        this.editing = true;
    }
    onEndEditing(text) {
        this.editing = false;
        this.nzContentChange.emit(text);
        if (this.nzContent === text) {
            this.renderOnNextFrame();
        }
        this.cdr.markForCheck();
    }
    onExpand() {
        this.isEllipsis = false;
        this.expanded = true;
        this.nzExpandChange.emit();
        this.nzOnEllipsis.emit(false);
    }
    canUseCSSEllipsis() {
        if (this.nzEditable || this.nzCopyable || this.nzExpandable || this.nzSuffix) {
            return false;
        }
        // make sure {@link nzOnEllipsis} works, will force use JS to calculations
        if (this.hasEllipsisObservers) {
            return false;
        }
        if (this.nzEllipsisRows === 1) {
            return isStyleSupport('textOverflow');
        }
        else {
            return isStyleSupport('webkitLineClamp');
        }
    }
    renderOnNextFrame() {
        cancelRequestAnimationFrame(this.rfaId);
        if (!this.viewInit || !this.nzEllipsis || this.nzEllipsisRows < 0 || this.expanded || !this.platform.isBrowser) {
            return;
        }
        this.rfaId = reqAnimFrame(() => {
            this.syncEllipsis();
        });
    }
    getOriginContentViewRef() {
        const viewRef = this.viewContainerRef.createEmbeddedView(this.contentTemplate, {
            content: this.nzContent
        });
        viewRef.detectChanges();
        return {
            viewRef,
            removeView: () => {
                this.viewContainerRef.remove(this.viewContainerRef.indexOf(viewRef));
            }
        };
    }
    syncEllipsis() {
        if (this.cssEllipsis) {
            return;
        }
        const { viewRef, removeView } = this.getOriginContentViewRef();
        const fixedNodes = [this.textCopyRef, this.textEditRef].filter(e => e && e.nativeElement).map(e => e.nativeElement);
        const expandableBtnElement = this.getExpandableBtnElement();
        if (expandableBtnElement) {
            fixedNodes.push(expandableBtnElement);
        }
        const { contentNodes, text, ellipsis } = measure(this.host.nativeElement, this.nzEllipsisRows, viewRef.rootNodes, fixedNodes, this.ellipsisStr, this.nzSuffix);
        removeView();
        this.ellipsisText = text;
        if (ellipsis !== this.isEllipsis) {
            this.isEllipsis = ellipsis;
            this.nzOnEllipsis.emit(ellipsis);
        }
        const ellipsisContainerNativeElement = this.ellipsisContainer.nativeElement;
        while (ellipsisContainerNativeElement.firstChild) {
            this.renderer.removeChild(ellipsisContainerNativeElement, ellipsisContainerNativeElement.firstChild);
        }
        contentNodes.forEach(n => {
            this.renderer.appendChild(ellipsisContainerNativeElement, n.cloneNode(true));
        });
        this.cdr.markForCheck();
    }
    // Need to create the element for calculation size before view init
    getExpandableBtnElement() {
        if (this.nzExpandable) {
            const expandText = this.locale ? this.locale.expand : '';
            const cache = this.expandableBtnElementCache;
            if (!cache || cache.innerText === expandText) {
                const el = this.document.createElement('a');
                el.className = EXPAND_ELEMENT_CLASSNAME;
                el.innerText = expandText;
                this.expandableBtnElementCache = el;
            }
            return this.expandableBtnElementCache;
        }
        else {
            this.expandableBtnElementCache = null;
            return null;
        }
    }
    renderAndSubscribeWindowResize() {
        if (this.platform.isBrowser) {
            this.windowResizeSubscription.unsubscribe();
            this.cssEllipsis = this.canUseCSSEllipsis();
            this.renderOnNextFrame();
            this.windowResizeSubscription = this.resizeService
                .subscribe()
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.renderOnNextFrame());
        }
    }
    ngOnInit() {
        var _a;
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Text');
            this.cdr.markForCheck();
        });
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    ngAfterViewInit() {
        this.viewInit = true;
        this.renderAndSubscribeWindowResize();
    }
    ngOnChanges(changes) {
        const { nzCopyable, nzEditable, nzExpandable, nzEllipsis, nzContent, nzEllipsisRows, nzSuffix } = changes;
        if (nzCopyable || nzEditable || nzExpandable || nzEllipsis || nzContent || nzEllipsisRows || nzSuffix) {
            if (this.nzEllipsis) {
                if (this.expanded) {
                    this.windowResizeSubscription.unsubscribe();
                }
                else {
                    this.renderAndSubscribeWindowResize();
                }
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.expandableBtnElementCache = null;
        this.windowResizeSubscription.unsubscribe();
    }
}
NzTypographyComponent.decorators = [
    { type: Component, args: [{
                selector: `
  nz-typography,
  [nz-typography],
  p[nz-paragraph],
  span[nz-text],
  h1[nz-title], h2[nz-title], h3[nz-title], h4[nz-title]
  `,
                exportAs: 'nzTypography',
                template: `
    <ng-template #contentTemplate let-content="content">
      <ng-content *ngIf="!content"></ng-content>
      {{ content }}
    </ng-template>
    <ng-container *ngIf="!editing">
      <ng-container
        *ngIf="
          expanded ||
            (!hasOperationsWithEllipsis && nzEllipsisRows === 1 && !hasEllipsisObservers) ||
            canCssEllipsis ||
            (nzSuffix && expanded);
          else jsEllipsis
        "
      >
        <ng-template [ngTemplateOutlet]="contentTemplate" [ngTemplateOutletContext]="{ content: nzContent }"></ng-template>
        <ng-container *ngIf="nzSuffix">{{ nzSuffix }}</ng-container>
      </ng-container>
      <ng-template #jsEllipsis>
        <span #ellipsisContainer></span>
        <ng-container *ngIf="isEllipsis">{{ ellipsisStr }}</ng-container>
        <ng-container *ngIf="nzSuffix">{{ nzSuffix }}</ng-container>
        <a #expandable *ngIf="nzExpandable && isEllipsis" class="ant-typography-expand" (click)="onExpand()">{{ locale?.expand }}</a>
      </ng-template>
    </ng-container>

    <nz-text-edit
      *ngIf="nzEditable"
      [text]="nzContent"
      [icon]="nzEditIcon"
      [tooltip]="nzEditTooltip"
      (endEditing)="onEndEditing($event)"
      (startEditing)="onStartEditing()"
    ></nz-text-edit>

    <nz-text-copy
      *ngIf="nzCopyable && !editing"
      [text]="copyText"
      [tooltips]="nzCopyTooltips"
      [icons]="nzCopyIcons"
      (textCopy)="onTextCopy($event)"
    ></nz-text-copy>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                host: {
                    '[class.ant-typography]': '!editing',
                    '[class.ant-typography-rtl]': 'dir === "rtl"',
                    '[class.ant-typography-edit-content]': 'editing',
                    '[class.ant-typography-secondary]': 'nzType === "secondary"',
                    '[class.ant-typography-warning]': 'nzType === "warning"',
                    '[class.ant-typography-danger]': 'nzType === "danger"',
                    '[class.ant-typography-success]': 'nzType === "success"',
                    '[class.ant-typography-disabled]': 'nzDisabled',
                    '[class.ant-typography-ellipsis]': 'nzEllipsis && !expanded',
                    '[class.ant-typography-ellipsis-single-line]': 'canCssEllipsis && nzEllipsisRows === 1',
                    '[class.ant-typography-ellipsis-multiple-line]': 'canCssEllipsis && nzEllipsisRows > 1',
                    '[style.-webkit-line-clamp]': '(canCssEllipsis && nzEllipsisRows > 1) ? nzEllipsisRows : null'
                }
            },] }
];
NzTypographyComponent.ctorParameters = () => [
    { type: NzConfigService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: ViewContainerRef },
    { type: Renderer2 },
    { type: Platform },
    { type: NzI18nService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NzResizeService },
    { type: Directionality, decorators: [{ type: Optional }] }
];
NzTypographyComponent.propDecorators = {
    nzCopyable: [{ type: Input }],
    nzEditable: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzExpandable: [{ type: Input }],
    nzEllipsis: [{ type: Input }],
    nzCopyTooltips: [{ type: Input }],
    nzCopyIcons: [{ type: Input }],
    nzEditTooltip: [{ type: Input }],
    nzEditIcon: [{ type: Input }],
    nzContent: [{ type: Input }],
    nzEllipsisRows: [{ type: Input }],
    nzType: [{ type: Input }],
    nzCopyText: [{ type: Input }],
    nzSuffix: [{ type: Input }],
    nzContentChange: [{ type: Output }],
    nzCopy: [{ type: Output }],
    nzExpandChange: [{ type: Output }],
    nzOnEllipsis: [{ type: Output }],
    textEditRef: [{ type: ViewChild, args: [NzTextEditComponent, { static: false },] }],
    textCopyRef: [{ type: ViewChild, args: [NzTextCopyComponent, { static: false },] }],
    ellipsisContainer: [{ type: ViewChild, args: ['ellipsisContainer', { static: false },] }],
    expandableBtn: [{ type: ViewChild, args: ['expandable', { static: false },] }],
    contentTemplate: [{ type: ViewChild, args: ['contentTemplate', { static: false },] }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTypographyComponent.prototype, "nzCopyable", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTypographyComponent.prototype, "nzEditable", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTypographyComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTypographyComponent.prototype, "nzExpandable", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTypographyComponent.prototype, "nzEllipsis", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Object)
], NzTypographyComponent.prototype, "nzCopyTooltips", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Array)
], NzTypographyComponent.prototype, "nzCopyIcons", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Object)
], NzTypographyComponent.prototype, "nzEditTooltip", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Object)
], NzTypographyComponent.prototype, "nzEditIcon", void 0);
__decorate([
    WithConfig(),
    InputNumber(),
    __metadata("design:type", Number)
], NzTypographyComponent.prototype, "nzEllipsisRows", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwb2dyYXBoeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3R5cG9ncmFwaHkvdHlwb2dyYXBoeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFFVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFJTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFFVCxXQUFXLEVBQ1gsU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFlLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDeEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTlELE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU3RixPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBdUIsTUFBTSxvQkFBb0IsQ0FBQztBQUV4RSxPQUFPLEVBQWEsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFF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REFBK0I7QUFFZjtJQUE1QixVQUFVLEVBQUU7SUFBRSxXQUFXLEVBQUU7OzZEQUE0QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56Q29uZmlnS2V5LCBOekNvbmZpZ1NlcnZpY2UsIFdpdGhDb25maWcgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IGNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSwgcmVxQW5pbUZyYW1lIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3BvbHlmaWxsJztcbmltcG9ydCB7IE56UmVzaXplU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE51bWJlcklucHV0LCBOelNhZmVBbnksIE56VFNUeXBlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiwgSW5wdXROdW1iZXIsIGlzU3R5bGVTdXBwb3J0LCBtZWFzdXJlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpJMThuU2VydmljZSwgTnpUZXh0STE4bkludGVyZmFjZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5cbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBOelRleHRDb3B5Q29tcG9uZW50IH0gZnJvbSAnLi90ZXh0LWNvcHkuY29tcG9uZW50JztcbmltcG9ydCB7IE56VGV4dEVkaXRDb21wb25lbnQgfSBmcm9tICcuL3RleHQtZWRpdC5jb21wb25lbnQnO1xuXG5jb25zdCBOWl9DT05GSUdfTU9EVUxFX05BTUU6IE56Q29uZmlnS2V5ID0gJ3R5cG9ncmFwaHknO1xuY29uc3QgRVhQQU5EX0VMRU1FTlRfQ0xBU1NOQU1FID0gJ2FudC10eXBvZ3JhcGh5LWV4cGFuZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogYFxuICBuei10eXBvZ3JhcGh5LFxuICBbbnotdHlwb2dyYXBoeV0sXG4gIHBbbnotcGFyYWdyYXBoXSxcbiAgc3Bhbltuei10ZXh0XSxcbiAgaDFbbnotdGl0bGVdLCBoMltuei10aXRsZV0sIGgzW256LXRpdGxlXSwgaDRbbnotdGl0bGVdXG4gIGAsXG4gIGV4cG9ydEFzOiAnbnpUeXBvZ3JhcGh5JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI2NvbnRlbnRUZW1wbGF0ZSBsZXQtY29udGVudD1cImNvbnRlbnRcIj5cbiAgICAgIDxuZy1jb250ZW50ICpuZ0lmPVwiIWNvbnRlbnRcIj48L25nLWNvbnRlbnQ+XG4gICAgICB7eyBjb250ZW50IH19XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWVkaXRpbmdcIj5cbiAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgKm5nSWY9XCJcbiAgICAgICAgICBleHBhbmRlZCB8fFxuICAgICAgICAgICAgKCFoYXNPcGVyYXRpb25zV2l0aEVsbGlwc2lzICYmIG56RWxsaXBzaXNSb3dzID09PSAxICYmICFoYXNFbGxpcHNpc09ic2VydmVycykgfHxcbiAgICAgICAgICAgIGNhbkNzc0VsbGlwc2lzIHx8XG4gICAgICAgICAgICAobnpTdWZmaXggJiYgZXhwYW5kZWQpO1xuICAgICAgICAgIGVsc2UganNFbGxpcHNpc1xuICAgICAgICBcIlxuICAgICAgPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudFRlbXBsYXRlXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgY29udGVudDogbnpDb250ZW50IH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibnpTdWZmaXhcIj57eyBuelN1ZmZpeCB9fTwvbmctY29udGFpbmVyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctdGVtcGxhdGUgI2pzRWxsaXBzaXM+XG4gICAgICAgIDxzcGFuICNlbGxpcHNpc0NvbnRhaW5lcj48L3NwYW4+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc0VsbGlwc2lzXCI+e3sgZWxsaXBzaXNTdHIgfX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56U3VmZml4XCI+e3sgbnpTdWZmaXggfX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPGEgI2V4cGFuZGFibGUgKm5nSWY9XCJuekV4cGFuZGFibGUgJiYgaXNFbGxpcHNpc1wiIGNsYXNzPVwiYW50LXR5cG9ncmFwaHktZXhwYW5kXCIgKGNsaWNrKT1cIm9uRXhwYW5kKClcIj57eyBsb2NhbGU/LmV4cGFuZCB9fTwvYT5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8bnotdGV4dC1lZGl0XG4gICAgICAqbmdJZj1cIm56RWRpdGFibGVcIlxuICAgICAgW3RleHRdPVwibnpDb250ZW50XCJcbiAgICAgIFtpY29uXT1cIm56RWRpdEljb25cIlxuICAgICAgW3Rvb2x0aXBdPVwibnpFZGl0VG9vbHRpcFwiXG4gICAgICAoZW5kRWRpdGluZyk9XCJvbkVuZEVkaXRpbmcoJGV2ZW50KVwiXG4gICAgICAoc3RhcnRFZGl0aW5nKT1cIm9uU3RhcnRFZGl0aW5nKClcIlxuICAgID48L256LXRleHQtZWRpdD5cblxuICAgIDxuei10ZXh0LWNvcHlcbiAgICAgICpuZ0lmPVwibnpDb3B5YWJsZSAmJiAhZWRpdGluZ1wiXG4gICAgICBbdGV4dF09XCJjb3B5VGV4dFwiXG4gICAgICBbdG9vbHRpcHNdPVwibnpDb3B5VG9vbHRpcHNcIlxuICAgICAgW2ljb25zXT1cIm56Q29weUljb25zXCJcbiAgICAgICh0ZXh0Q29weSk9XCJvblRleHRDb3B5KCRldmVudClcIlxuICAgID48L256LXRleHQtY29weT5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtdHlwb2dyYXBoeV0nOiAnIWVkaXRpbmcnLFxuICAgICdbY2xhc3MuYW50LXR5cG9ncmFwaHktcnRsXSc6ICdkaXIgPT09IFwicnRsXCInLFxuICAgICdbY2xhc3MuYW50LXR5cG9ncmFwaHktZWRpdC1jb250ZW50XSc6ICdlZGl0aW5nJyxcbiAgICAnW2NsYXNzLmFudC10eXBvZ3JhcGh5LXNlY29uZGFyeV0nOiAnbnpUeXBlID09PSBcInNlY29uZGFyeVwiJyxcbiAgICAnW2NsYXNzLmFudC10eXBvZ3JhcGh5LXdhcm5pbmddJzogJ256VHlwZSA9PT0gXCJ3YXJuaW5nXCInLFxuICAgICdbY2xhc3MuYW50LXR5cG9ncmFwaHktZGFuZ2VyXSc6ICduelR5cGUgPT09IFwiZGFuZ2VyXCInLFxuICAgICdbY2xhc3MuYW50LXR5cG9ncmFwaHktc3VjY2Vzc10nOiAnbnpUeXBlID09PSBcInN1Y2Nlc3NcIicsXG4gICAgJ1tjbGFzcy5hbnQtdHlwb2dyYXBoeS1kaXNhYmxlZF0nOiAnbnpEaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5hbnQtdHlwb2dyYXBoeS1lbGxpcHNpc10nOiAnbnpFbGxpcHNpcyAmJiAhZXhwYW5kZWQnLFxuICAgICdbY2xhc3MuYW50LXR5cG9ncmFwaHktZWxsaXBzaXMtc2luZ2xlLWxpbmVdJzogJ2NhbkNzc0VsbGlwc2lzICYmIG56RWxsaXBzaXNSb3dzID09PSAxJyxcbiAgICAnW2NsYXNzLmFudC10eXBvZ3JhcGh5LWVsbGlwc2lzLW11bHRpcGxlLWxpbmVdJzogJ2NhbkNzc0VsbGlwc2lzICYmIG56RWxsaXBzaXNSb3dzID4gMScsXG4gICAgJ1tzdHlsZS4td2Via2l0LWxpbmUtY2xhbXBdJzogJyhjYW5Dc3NFbGxpcHNpcyAmJiBuekVsbGlwc2lzUm93cyA+IDEpID8gbnpFbGxpcHNpc1Jvd3MgOiBudWxsJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VHlwb2dyYXBoeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICByZWFkb25seSBfbnpNb2R1bGVOYW1lOiBOekNvbmZpZ0tleSA9IE5aX0NPTkZJR19NT0RVTEVfTkFNRTtcblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpDb3B5YWJsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpFZGl0YWJsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpFeHBhbmRhYmxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekVsbGlwc2lzOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekVsbGlwc2lzUm93czogTnVtYmVySW5wdXQ7XG5cbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Q29weWFibGUgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RWRpdGFibGUgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RXhwYW5kYWJsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpFbGxpcHNpcyA9IGZhbHNlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56Q29weVRvb2x0aXBzPzogW056VFNUeXBlLCBOelRTVHlwZV0gfCBudWxsID0gdW5kZWZpbmVkO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56Q29weUljb25zOiBbTnpUU1R5cGUsIE56VFNUeXBlXSA9IFsnY29weScsICdjaGVjayddO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56RWRpdFRvb2x0aXA/OiBudWxsIHwgTnpUU1R5cGUgPSB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpFZGl0SWNvbjogTnpUU1R5cGUgPSAnZWRpdCc7XG4gIEBJbnB1dCgpIG56Q29udGVudD86IHN0cmluZztcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBASW5wdXROdW1iZXIoKSBuekVsbGlwc2lzUm93czogbnVtYmVyID0gMTtcbiAgQElucHV0KCkgbnpUeXBlOiAnc2Vjb25kYXJ5JyB8ICd3YXJuaW5nJyB8ICdkYW5nZXInIHwgJ3N1Y2Nlc3MnIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBuekNvcHlUZXh0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIG56U3VmZml4OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekNvbnRlbnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q29weSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpFeHBhbmRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIC8vIFRoaXMgaXMgbm90IGEgdHdvLXdheSBiaW5kaW5nIG91dHB1dCB3aXRoIHtAbGluayBuekVsbGlwc2lzfVxuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPbkVsbGlwc2lzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIEBWaWV3Q2hpbGQoTnpUZXh0RWRpdENvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pIHRleHRFZGl0UmVmPzogTnpUZXh0RWRpdENvbXBvbmVudDtcbiAgQFZpZXdDaGlsZChOelRleHRDb3B5Q29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSkgdGV4dENvcHlSZWY/OiBOelRleHRDb3B5Q29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdlbGxpcHNpc0NvbnRhaW5lcicsIHsgc3RhdGljOiBmYWxzZSB9KSBlbGxpcHNpc0NvbnRhaW5lcj86IEVsZW1lbnRSZWY8SFRNTFNwYW5FbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgnZXhwYW5kYWJsZScsIHsgc3RhdGljOiBmYWxzZSB9KSBleHBhbmRhYmxlQnRuPzogRWxlbWVudFJlZjxIVE1MU3BhbkVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCdjb250ZW50VGVtcGxhdGUnLCB7IHN0YXRpYzogZmFsc2UgfSkgY29udGVudFRlbXBsYXRlPzogVGVtcGxhdGVSZWY8eyBjb250ZW50OiBzdHJpbmcgfT47XG5cbiAgbG9jYWxlITogTnpUZXh0STE4bkludGVyZmFjZTtcbiAgZG9jdW1lbnQ6IERvY3VtZW50O1xuICBleHBhbmRhYmxlQnRuRWxlbWVudENhY2hlOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBlZGl0aW5nID0gZmFsc2U7XG4gIGVsbGlwc2lzVGV4dDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBjc3NFbGxpcHNpczogYm9vbGVhbiA9IGZhbHNlO1xuICBpc0VsbGlwc2lzOiBib29sZWFuID0gdHJ1ZTtcbiAgZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZWxsaXBzaXNTdHIgPSAnLi4uJztcbiAgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcblxuICBnZXQgaGFzRWxsaXBzaXNPYnNlcnZlcnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubnpPbkVsbGlwc2lzLm9ic2VydmVycy5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IGNhbkNzc0VsbGlwc2lzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm56RWxsaXBzaXMgJiYgdGhpcy5jc3NFbGxpcHNpcyAmJiAhdGhpcy5leHBhbmRlZCAmJiAhdGhpcy5oYXNFbGxpcHNpc09ic2VydmVycztcbiAgfVxuXG4gIGdldCBoYXNPcGVyYXRpb25zV2l0aEVsbGlwc2lzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy5uekNvcHlhYmxlIHx8IHRoaXMubnpFZGl0YWJsZSB8fCB0aGlzLm56RXhwYW5kYWJsZSkgJiYgdGhpcy5uekVsbGlwc2lzO1xuICB9XG5cbiAgcHJpdmF0ZSB2aWV3SW5pdCA9IGZhbHNlO1xuICBwcml2YXRlIHJmYUlkOiBudW1iZXIgPSAtMTtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgd2luZG93UmVzaXplU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBnZXQgY29weVRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHR5cGVvZiB0aGlzLm56Q29weVRleHQgPT09ICdzdHJpbmcnID8gdGhpcy5uekNvcHlUZXh0IDogdGhpcy5uekNvbnRlbnQpITtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuekNvbmZpZ1NlcnZpY2U6IE56Q29uZmlnU2VydmljZSxcbiAgICBwcml2YXRlIGhvc3Q6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIHByaXZhdGUgaTE4bjogTnpJMThuU2VydmljZSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudDogTnpTYWZlQW55LFxuICAgIHByaXZhdGUgcmVzaXplU2VydmljZTogTnpSZXNpemVTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5XG4gICkge1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgfVxuXG4gIG9uVGV4dENvcHkodGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5uekNvcHkuZW1pdCh0ZXh0KTtcbiAgfVxuXG4gIG9uU3RhcnRFZGl0aW5nKCk6IHZvaWQge1xuICAgIHRoaXMuZWRpdGluZyA9IHRydWU7XG4gIH1cblxuICBvbkVuZEVkaXRpbmcodGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5uekNvbnRlbnRDaGFuZ2UuZW1pdCh0ZXh0KTtcbiAgICBpZiAodGhpcy5uekNvbnRlbnQgPT09IHRleHQpIHtcbiAgICAgIHRoaXMucmVuZGVyT25OZXh0RnJhbWUoKTtcbiAgICB9XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBvbkV4cGFuZCgpOiB2b2lkIHtcbiAgICB0aGlzLmlzRWxsaXBzaXMgPSBmYWxzZTtcbiAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcbiAgICB0aGlzLm56RXhwYW5kQ2hhbmdlLmVtaXQoKTtcbiAgICB0aGlzLm56T25FbGxpcHNpcy5lbWl0KGZhbHNlKTtcbiAgfVxuXG4gIGNhblVzZUNTU0VsbGlwc2lzKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLm56RWRpdGFibGUgfHwgdGhpcy5uekNvcHlhYmxlIHx8IHRoaXMubnpFeHBhbmRhYmxlIHx8IHRoaXMubnpTdWZmaXgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gbWFrZSBzdXJlIHtAbGluayBuek9uRWxsaXBzaXN9IHdvcmtzLCB3aWxsIGZvcmNlIHVzZSBKUyB0byBjYWxjdWxhdGlvbnNcbiAgICBpZiAodGhpcy5oYXNFbGxpcHNpc09ic2VydmVycykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5uekVsbGlwc2lzUm93cyA9PT0gMSkge1xuICAgICAgcmV0dXJuIGlzU3R5bGVTdXBwb3J0KCd0ZXh0T3ZlcmZsb3cnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGlzU3R5bGVTdXBwb3J0KCd3ZWJraXRMaW5lQ2xhbXAnKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXJPbk5leHRGcmFtZSgpOiB2b2lkIHtcbiAgICBjYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZmFJZCk7XG4gICAgaWYgKCF0aGlzLnZpZXdJbml0IHx8ICF0aGlzLm56RWxsaXBzaXMgfHwgdGhpcy5uekVsbGlwc2lzUm93cyA8IDAgfHwgdGhpcy5leHBhbmRlZCB8fCAhdGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZmFJZCA9IHJlcUFuaW1GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnN5bmNFbGxpcHNpcygpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0T3JpZ2luQ29udGVudFZpZXdSZWYoKTogeyB2aWV3UmVmOiBFbWJlZGRlZFZpZXdSZWY8eyBjb250ZW50OiBzdHJpbmcgfT47IHJlbW92ZVZpZXcoKTogdm9pZCB9IHtcbiAgICBjb25zdCB2aWV3UmVmID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldzx7IGNvbnRlbnQ6IHN0cmluZyB9Pih0aGlzLmNvbnRlbnRUZW1wbGF0ZSEsIHtcbiAgICAgIGNvbnRlbnQ6IHRoaXMubnpDb250ZW50IVxuICAgIH0pO1xuICAgIHZpZXdSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHJldHVybiB7XG4gICAgICB2aWV3UmVmLFxuICAgICAgcmVtb3ZlVmlldzogKCkgPT4ge1xuICAgICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYucmVtb3ZlKHRoaXMudmlld0NvbnRhaW5lclJlZi5pbmRleE9mKHZpZXdSZWYpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgc3luY0VsbGlwc2lzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNzc0VsbGlwc2lzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgdmlld1JlZiwgcmVtb3ZlVmlldyB9ID0gdGhpcy5nZXRPcmlnaW5Db250ZW50Vmlld1JlZigpO1xuICAgIGNvbnN0IGZpeGVkTm9kZXMgPSBbdGhpcy50ZXh0Q29weVJlZiwgdGhpcy50ZXh0RWRpdFJlZl0uZmlsdGVyKGUgPT4gZSAmJiBlLm5hdGl2ZUVsZW1lbnQpLm1hcChlID0+IGUhLm5hdGl2ZUVsZW1lbnQpO1xuICAgIGNvbnN0IGV4cGFuZGFibGVCdG5FbGVtZW50ID0gdGhpcy5nZXRFeHBhbmRhYmxlQnRuRWxlbWVudCgpO1xuICAgIGlmIChleHBhbmRhYmxlQnRuRWxlbWVudCkge1xuICAgICAgZml4ZWROb2Rlcy5wdXNoKGV4cGFuZGFibGVCdG5FbGVtZW50KTtcbiAgICB9XG4gICAgY29uc3QgeyBjb250ZW50Tm9kZXMsIHRleHQsIGVsbGlwc2lzIH0gPSBtZWFzdXJlKFxuICAgICAgdGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICB0aGlzLm56RWxsaXBzaXNSb3dzLFxuICAgICAgdmlld1JlZi5yb290Tm9kZXMsXG4gICAgICBmaXhlZE5vZGVzLFxuICAgICAgdGhpcy5lbGxpcHNpc1N0cixcbiAgICAgIHRoaXMubnpTdWZmaXhcbiAgICApO1xuXG4gICAgcmVtb3ZlVmlldygpO1xuXG4gICAgdGhpcy5lbGxpcHNpc1RleHQgPSB0ZXh0O1xuICAgIGlmIChlbGxpcHNpcyAhPT0gdGhpcy5pc0VsbGlwc2lzKSB7XG4gICAgICB0aGlzLmlzRWxsaXBzaXMgPSBlbGxpcHNpcztcbiAgICAgIHRoaXMubnpPbkVsbGlwc2lzLmVtaXQoZWxsaXBzaXMpO1xuICAgIH1cbiAgICBjb25zdCBlbGxpcHNpc0NvbnRhaW5lck5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsbGlwc2lzQ29udGFpbmVyIS5uYXRpdmVFbGVtZW50O1xuICAgIHdoaWxlIChlbGxpcHNpc0NvbnRhaW5lck5hdGl2ZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZChlbGxpcHNpc0NvbnRhaW5lck5hdGl2ZUVsZW1lbnQsIGVsbGlwc2lzQ29udGFpbmVyTmF0aXZlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgY29udGVudE5vZGVzLmZvckVhY2gobiA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGVsbGlwc2lzQ29udGFpbmVyTmF0aXZlRWxlbWVudCwgbi5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIH0pO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLy8gTmVlZCB0byBjcmVhdGUgdGhlIGVsZW1lbnQgZm9yIGNhbGN1bGF0aW9uIHNpemUgYmVmb3JlIHZpZXcgaW5pdFxuICBwcml2YXRlIGdldEV4cGFuZGFibGVCdG5FbGVtZW50KCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgaWYgKHRoaXMubnpFeHBhbmRhYmxlKSB7XG4gICAgICBjb25zdCBleHBhbmRUZXh0ID0gdGhpcy5sb2NhbGUgPyB0aGlzLmxvY2FsZS5leHBhbmQgOiAnJztcbiAgICAgIGNvbnN0IGNhY2hlID0gdGhpcy5leHBhbmRhYmxlQnRuRWxlbWVudENhY2hlO1xuICAgICAgaWYgKCFjYWNoZSB8fCBjYWNoZS5pbm5lclRleHQgPT09IGV4cGFuZFRleHQpIHtcbiAgICAgICAgY29uc3QgZWwgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gRVhQQU5EX0VMRU1FTlRfQ0xBU1NOQU1FO1xuICAgICAgICBlbC5pbm5lclRleHQgPSBleHBhbmRUZXh0O1xuICAgICAgICB0aGlzLmV4cGFuZGFibGVCdG5FbGVtZW50Q2FjaGUgPSBlbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmV4cGFuZGFibGVCdG5FbGVtZW50Q2FjaGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZXhwYW5kYWJsZUJ0bkVsZW1lbnRDYWNoZSA9IG51bGw7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbmRlckFuZFN1YnNjcmliZVdpbmRvd1Jlc2l6ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHRoaXMud2luZG93UmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmNzc0VsbGlwc2lzID0gdGhpcy5jYW5Vc2VDU1NFbGxpcHNpcygpO1xuICAgICAgdGhpcy5yZW5kZXJPbk5leHRGcmFtZSgpO1xuICAgICAgdGhpcy53aW5kb3dSZXNpemVTdWJzY3JpcHRpb24gPSB0aGlzLnJlc2l6ZVNlcnZpY2VcbiAgICAgICAgLnN1YnNjcmliZSgpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlbmRlck9uTmV4dEZyYW1lKCkpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaTE4bi5sb2NhbGVDaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmxvY2FsZSA9IHRoaXMuaTE4bi5nZXRMb2NhbGVEYXRhKCdUZXh0Jyk7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlPy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgdGhpcy5kaXIgPSBkaXJlY3Rpb247XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRpciA9IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3SW5pdCA9IHRydWU7XG4gICAgdGhpcy5yZW5kZXJBbmRTdWJzY3JpYmVXaW5kb3dSZXNpemUoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56Q29weWFibGUsIG56RWRpdGFibGUsIG56RXhwYW5kYWJsZSwgbnpFbGxpcHNpcywgbnpDb250ZW50LCBuekVsbGlwc2lzUm93cywgbnpTdWZmaXggfSA9IGNoYW5nZXM7XG4gICAgaWYgKG56Q29weWFibGUgfHwgbnpFZGl0YWJsZSB8fCBuekV4cGFuZGFibGUgfHwgbnpFbGxpcHNpcyB8fCBuekNvbnRlbnQgfHwgbnpFbGxpcHNpc1Jvd3MgfHwgbnpTdWZmaXgpIHtcbiAgICAgIGlmICh0aGlzLm56RWxsaXBzaXMpIHtcbiAgICAgICAgaWYgKHRoaXMuZXhwYW5kZWQpIHtcbiAgICAgICAgICB0aGlzLndpbmRvd1Jlc2l6ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVuZGVyQW5kU3Vic2NyaWJlV2luZG93UmVzaXplKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5leHBhbmRhYmxlQnRuRWxlbWVudENhY2hlID0gbnVsbDtcbiAgICB0aGlzLndpbmRvd1Jlc2l6ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=