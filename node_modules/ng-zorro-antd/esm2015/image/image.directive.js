import { __decorate, __metadata } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectorRef, Directive, ElementRef, Input, Optional } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzImageGroupComponent } from './image-group.component';
import { NzImageService } from './image.service';
const NZ_CONFIG_MODULE_NAME = 'image';
export class NzImageDirective {
    constructor(nzConfigService, elementRef, nzImageService, cdr, parentGroup, directionality) {
        this.nzConfigService = nzConfigService;
        this.elementRef = elementRef;
        this.nzImageService = nzImageService;
        this.cdr = cdr;
        this.parentGroup = parentGroup;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzSrc = '';
        this.nzDisablePreview = false;
        this.nzFallback = null;
        this.nzPlaceholder = null;
        this.status = 'normal';
        this.destroy$ = new Subject();
    }
    get previewable() {
        return !this.nzDisablePreview && this.status !== 'error';
    }
    ngOnInit() {
        var _a;
        this.backLoad();
        if (this.parentGroup) {
            this.parentGroup.addImage(this);
        }
        if (this.directionality) {
            (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
                this.dir = direction;
                this.cdr.detectChanges();
            });
            this.dir = this.directionality.value;
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    onPreview() {
        if (!this.previewable) {
            return;
        }
        if (this.parentGroup) {
            // preview inside image group
            const previewAbleImages = this.parentGroup.images.filter(e => e.previewable);
            const previewImages = previewAbleImages.map(e => ({ src: e.nzSrc }));
            const previewIndex = previewAbleImages.findIndex(el => this === el);
            const previewRef = this.nzImageService.preview(previewImages, { nzDirection: this.dir });
            previewRef.switchTo(previewIndex);
        }
        else {
            // preview not inside image group
            const previewImages = [{ src: this.nzSrc }];
            this.nzImageService.preview(previewImages, { nzDirection: this.dir });
        }
    }
    getElement() {
        return this.elementRef;
    }
    ngOnChanges(changes) {
        const { nzSrc } = changes;
        if (nzSrc) {
            this.getElement().nativeElement.src = nzSrc.currentValue;
            this.backLoad();
        }
    }
    /**
     * use internal Image object handle fallback & placeholder
     * @private
     */
    backLoad() {
        this.backLoadImage = new Image();
        this.backLoadImage.src = this.nzSrc;
        this.status = 'loading';
        if (this.backLoadImage.complete) {
            this.status = 'normal';
            this.getElement().nativeElement.src = this.nzSrc;
        }
        else {
            if (this.nzPlaceholder) {
                this.getElement().nativeElement.src = this.nzPlaceholder;
            }
            else {
                this.getElement().nativeElement.src = this.nzSrc;
            }
            this.backLoadImage.onload = () => {
                this.status = 'normal';
                this.getElement().nativeElement.src = this.nzSrc;
            };
            this.backLoadImage.onerror = () => {
                this.status = 'error';
                if (this.nzFallback) {
                    this.getElement().nativeElement.src = this.nzFallback;
                }
            };
        }
    }
}
NzImageDirective.decorators = [
    { type: Directive, args: [{
                selector: 'img[nz-image]',
                exportAs: 'nzImage',
                host: {
                    '(click)': 'onPreview()'
                }
            },] }
];
NzImageDirective.ctorParameters = () => [
    { type: NzConfigService },
    { type: ElementRef },
    { type: NzImageService },
    { type: ChangeDetectorRef },
    { type: NzImageGroupComponent, decorators: [{ type: Optional }] },
    { type: Directionality, decorators: [{ type: Optional }] }
];
NzImageDirective.propDecorators = {
    nzSrc: [{ type: Input }],
    nzDisablePreview: [{ type: Input }],
    nzFallback: [{ type: Input }],
    nzPlaceholder: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    WithConfig(),
    __metadata("design:type", Boolean)
], NzImageDirective.prototype, "nzDisablePreview", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Object)
], NzImageDirective.prototype, "nzFallback", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Object)
], NzImageDirective.prototype, "nzPlaceholder", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9pbWFnZS9pbWFnZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRztBQUNILE9BQU8sRUFBYSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQWdDLFFBQVEsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDdkksT0FBTyxFQUFlLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWpELE1BQU0scUJBQXFCLEdBQWdCLE9BQU8sQ0FBQztBQVduRCxNQUFNLE9BQU8sZ0JBQWdCO0lBbUIzQixZQUNTLGVBQWdDLEVBQy9CLFVBQXNCLEVBQ3RCLGNBQThCLEVBQzVCLEdBQXNCLEVBQ1osV0FBa0MsRUFDbEMsY0FBOEI7UUFMM0Msb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQy9CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzVCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ1osZ0JBQVcsR0FBWCxXQUFXLENBQXVCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQXhCM0Msa0JBQWEsR0FBZ0IscUJBQXFCLENBQUM7UUFJbkQsVUFBSyxHQUFHLEVBQUUsQ0FB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QztTQUNIO0lBQ0gsQ0FBQzs7O1lBcEhGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLElBQUksRUFBRTtvQkFDSixTQUFTLEVBQUUsYUFBYTtpQkFDekI7YUFDRjs7O1lBbkJxQixlQUFlO1lBREUsVUFBVTtZQVF4QyxjQUFjO1lBUmQsaUJBQWlCO1lBT2pCLHFCQUFxQix1QkFzQ3pCLFFBQVE7WUE5Q08sY0FBYyx1QkErQzdCLFFBQVE7OztvQkFwQlYsS0FBSzsrQkFDTCxLQUFLO3lCQUNMLEtBQUs7NEJBQ0wsS0FBSzs7QUFGaUM7SUFBN0IsWUFBWSxFQUFFO0lBQUUsVUFBVSxFQUFFOzswREFBbUM7QUFDbEQ7SUFBYixVQUFVLEVBQUU7O29EQUFrQztBQUNqQztJQUFiLFVBQVUsRUFBRTs7dURBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3B0aW9uYWwsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56Q29uZmlnS2V5LCBOekNvbmZpZ1NlcnZpY2UsIFdpdGhDb25maWcgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56SW1hZ2VHcm91cENvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2UtZ3JvdXAuY29tcG9uZW50JztcbmltcG9ydCB7IE56SW1hZ2VTZXJ2aWNlIH0gZnJvbSAnLi9pbWFnZS5zZXJ2aWNlJztcblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICdpbWFnZSc7XG5cbmV4cG9ydCB0eXBlIEltYWdlU3RhdHVzVHlwZSA9ICdlcnJvcicgfCAnbG9hZGluZycgfCAnbm9ybWFsJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnaW1nW256LWltYWdlXScsXG4gIGV4cG9ydEFzOiAnbnpJbWFnZScsXG4gIGhvc3Q6IHtcbiAgICAnKGNsaWNrKSc6ICdvblByZXZpZXcoKSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekltYWdlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIHJlYWRvbmx5IF9uek1vZHVsZU5hbWU6IE56Q29uZmlnS2V5ID0gTlpfQ09ORklHX01PRFVMRV9OQU1FO1xuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekRpc2FibGVQcmV2aWV3OiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCkgbnpTcmMgPSAnJztcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIEBXaXRoQ29uZmlnKCkgbnpEaXNhYmxlUHJldmlldzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56RmFsbGJhY2s6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56UGxhY2Vob2xkZXI6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIGRpcj86IERpcmVjdGlvbjtcbiAgYmFja0xvYWRJbWFnZSE6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gIHByaXZhdGUgc3RhdHVzOiBJbWFnZVN0YXR1c1R5cGUgPSAnbm9ybWFsJztcbiAgcHJpdmF0ZSBkZXN0cm95JDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgZ2V0IHByZXZpZXdhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5uekRpc2FibGVQcmV2aWV3ICYmIHRoaXMuc3RhdHVzICE9PSAnZXJyb3InO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIG56SW1hZ2VTZXJ2aWNlOiBOekltYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHBhcmVudEdyb3VwOiBOekltYWdlR3JvdXBDb21wb25lbnQsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHlcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYmFja0xvYWQoKTtcbiAgICBpZiAodGhpcy5wYXJlbnRHcm91cCkge1xuICAgICAgdGhpcy5wYXJlbnRHcm91cC5hZGRJbWFnZSh0aGlzKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGlyZWN0aW9uYWxpdHkpIHtcbiAgICAgIHRoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlPy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgICB0aGlzLmRpciA9IGRpcmVjdGlvbjtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmRpciA9IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgb25QcmV2aWV3KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wcmV2aWV3YWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhcmVudEdyb3VwKSB7XG4gICAgICAvLyBwcmV2aWV3IGluc2lkZSBpbWFnZSBncm91cFxuICAgICAgY29uc3QgcHJldmlld0FibGVJbWFnZXMgPSB0aGlzLnBhcmVudEdyb3VwLmltYWdlcy5maWx0ZXIoZSA9PiBlLnByZXZpZXdhYmxlKTtcbiAgICAgIGNvbnN0IHByZXZpZXdJbWFnZXMgPSBwcmV2aWV3QWJsZUltYWdlcy5tYXAoZSA9PiAoeyBzcmM6IGUubnpTcmMgfSkpO1xuICAgICAgY29uc3QgcHJldmlld0luZGV4ID0gcHJldmlld0FibGVJbWFnZXMuZmluZEluZGV4KGVsID0+IHRoaXMgPT09IGVsKTtcbiAgICAgIGNvbnN0IHByZXZpZXdSZWYgPSB0aGlzLm56SW1hZ2VTZXJ2aWNlLnByZXZpZXcocHJldmlld0ltYWdlcywgeyBuekRpcmVjdGlvbjogdGhpcy5kaXIgfSk7XG4gICAgICBwcmV2aWV3UmVmLnN3aXRjaFRvKHByZXZpZXdJbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHByZXZpZXcgbm90IGluc2lkZSBpbWFnZSBncm91cFxuICAgICAgY29uc3QgcHJldmlld0ltYWdlcyA9IFt7IHNyYzogdGhpcy5uelNyYyB9XTtcbiAgICAgIHRoaXMubnpJbWFnZVNlcnZpY2UucHJldmlldyhwcmV2aWV3SW1hZ2VzLCB7IG56RGlyZWN0aW9uOiB0aGlzLmRpciB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRFbGVtZW50KCk6IEVsZW1lbnRSZWY8SFRNTEltYWdlRWxlbWVudD4ge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWY7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuelNyYyB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpTcmMpIHtcbiAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLm5hdGl2ZUVsZW1lbnQuc3JjID0gbnpTcmMuY3VycmVudFZhbHVlO1xuICAgICAgdGhpcy5iYWNrTG9hZCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB1c2UgaW50ZXJuYWwgSW1hZ2Ugb2JqZWN0IGhhbmRsZSBmYWxsYmFjayAmIHBsYWNlaG9sZGVyXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIGJhY2tMb2FkKCk6IHZvaWQge1xuICAgIHRoaXMuYmFja0xvYWRJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIHRoaXMuYmFja0xvYWRJbWFnZS5zcmMgPSB0aGlzLm56U3JjO1xuICAgIHRoaXMuc3RhdHVzID0gJ2xvYWRpbmcnO1xuXG4gICAgaWYgKHRoaXMuYmFja0xvYWRJbWFnZS5jb21wbGV0ZSkge1xuICAgICAgdGhpcy5zdGF0dXMgPSAnbm9ybWFsJztcbiAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5uelNyYztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMubnpQbGFjZWhvbGRlcikge1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoKS5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMubnpQbGFjZWhvbGRlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5uelNyYztcbiAgICAgIH1cblxuICAgICAgdGhpcy5iYWNrTG9hZEltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAnbm9ybWFsJztcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50KCkubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLm56U3JjO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5iYWNrTG9hZEltYWdlLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gJ2Vycm9yJztcbiAgICAgICAgaWYgKHRoaXMubnpGYWxsYmFjaykge1xuICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5uekZhbGxiYWNrO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuIl19