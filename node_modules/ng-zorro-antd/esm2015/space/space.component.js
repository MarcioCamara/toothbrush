/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { warnDeprecation } from 'ng-zorro-antd/core/logger';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzSpaceItemLegacyComponent } from './space-item.component';
import { NzSpaceItemDirective } from './space-item.directive';
const NZ_CONFIG_MODULE_NAME = 'space';
const SPACE_SIZE = {
    small: 8,
    middle: 16,
    large: 24
};
export class NzSpaceComponent {
    constructor(nzConfigService, cdr) {
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzDirection = 'horizontal';
        this.nzSplit = null;
        this.nzWrap = false;
        this.nzSize = 'small';
        this.spaceSize = SPACE_SIZE.small;
        this.destroy$ = new Subject();
    }
    updateSpaceItems() {
        var _a;
        const numberSize = typeof this.nzSize === 'string' ? SPACE_SIZE[this.nzSize] : this.nzSize;
        this.spaceSize = numberSize / (!!this.nzSplit ? 2 : 1);
        if ((_a = this.nzSpaceItemComponents) === null || _a === void 0 ? void 0 : _a.length) {
            warnDeprecation('`nz-space-item` in `nz-space` will be removed in 12.0.0, please use `*nzSpaceItem` instead.');
            this.nzSpaceItemComponents.forEach(item => {
                item.setDirectionAndSize(this.nzDirection, this.spaceSize);
            });
        }
        this.cdr.markForCheck();
    }
    ngOnChanges() {
        this.updateSpaceItems();
        this.mergedAlign = this.nzAlign === undefined && this.nzDirection === 'horizontal' ? 'center' : this.nzAlign;
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    ngAfterContentInit() {
        this.updateSpaceItems();
        this.nzSpaceItemComponents.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.updateSpaceItems();
        });
    }
}
NzSpaceComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-space, [nz-space]',
                exportAs: 'NzSpace',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-content></ng-content>
    <ng-template ngFor let-item let-last="last" let-index="index" [ngForOf]="items">
      <div
        class="ant-space-item"
        [style.margin-bottom.px]="nzDirection === 'vertical' ? (last ? null : spaceSize) : null"
        [style.margin-right.px]="nzDirection === 'horizontal' ? (last ? null : spaceSize) : null"
      >
        <ng-container [ngTemplateOutlet]="item"></ng-container>
      </div>
      <span
        *ngIf="nzSplit && !last"
        class="ant-space-split"
        [style.margin-bottom.px]="nzDirection === 'vertical' ? (last ? null : spaceSize) : null"
        [style.margin-right.px]="nzDirection === 'horizontal' ? (last ? null : spaceSize) : null"
      >
        <ng-template [ngTemplateOutlet]="nzSplit" [ngTemplateOutletContext]="{ $implicit: index }"></ng-template>
      </span>
    </ng-template>
  `,
                host: {
                    class: 'ant-space',
                    '[class.ant-space-horizontal]': 'nzDirection === "horizontal"',
                    '[class.ant-space-vertical]': 'nzDirection === "vertical"',
                    '[class.ant-space-align-start]': 'mergedAlign === "start"',
                    '[class.ant-space-align-end]': 'mergedAlign === "end"',
                    '[class.ant-space-align-center]': 'mergedAlign === "center"',
                    '[class.ant-space-align-baseline]': 'mergedAlign === "baseline"',
                    '[style.flex-wrap]': 'nzWrap ? "wrap" : null'
                }
            },] }
];
NzSpaceComponent.ctorParameters = () => [
    { type: NzConfigService },
    { type: ChangeDetectorRef }
];
NzSpaceComponent.propDecorators = {
    nzDirection: [{ type: Input }],
    nzAlign: [{ type: Input }],
    nzSplit: [{ type: Input }],
    nzWrap: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzSpaceItemComponents: [{ type: ContentChildren, args: [NzSpaceItemLegacyComponent,] }],
    items: [{ type: ContentChildren, args: [NzSpaceItemDirective, { read: TemplateRef },] }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzSpaceComponent.prototype, "nzWrap", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Object)
], NzSpaceComponent.prototype, "nzSize", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhY2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9zcGFjZS9zcGFjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsS0FBSyxFQUdMLFNBQVMsRUFDVCxXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFlLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRzlELE1BQU0scUJBQXFCLEdBQWdCLE9BQU8sQ0FBQztBQUNuRCxNQUFNLFVBQVUsR0FFWjtJQUNGLEtBQUssRUFBRSxDQUFDO0lBQ1IsTUFBTSxFQUFFLEVBQUU7SUFDVixLQUFLLEVBQUUsRUFBRTtDQUNWLENBQUM7QUFxQ0YsTUFBTSxPQUFPLGdCQUFnQjtJQXNCM0IsWUFBbUIsZUFBZ0MsRUFBVSxHQUFzQjtRQUFoRSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQW5CMUUsa0JBQWEsR0FBZ0IscUJBQXFCLENBQUM7UUFFbkQsZ0JBQVcsR0FBcUIsWUFBWSxDQUFDO1FBRTdDLFlBQU8sR0FBOEMsSUFBSSxDQUFDO1FBQzFDLFdBQU0s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IHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgUXVlcnlMaXN0LFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56Q29uZmlnS2V5LCBOekNvbmZpZ1NlcnZpY2UsIFdpdGhDb25maWcgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IHdhcm5EZXByZWNhdGlvbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9sb2dnZXInO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56U3BhY2VJdGVtTGVnYWN5Q29tcG9uZW50IH0gZnJvbSAnLi9zcGFjZS1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelNwYWNlSXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vc3BhY2UtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpTcGFjZUFsaWduLCBOelNwYWNlRGlyZWN0aW9uLCBOelNwYWNlU2l6ZSwgTnpTcGFjZVR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICdzcGFjZSc7XG5jb25zdCBTUEFDRV9TSVpFOiB7XG4gIFtzaXplS2V5IGluIE56U3BhY2VUeXBlXTogbnVtYmVyO1xufSA9IHtcbiAgc21hbGw6IDgsXG4gIG1pZGRsZTogMTYsXG4gIGxhcmdlOiAyNFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotc3BhY2UsIFtuei1zcGFjZV0nLFxuICBleHBvcnRBczogJ056U3BhY2UnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1pdGVtIGxldC1sYXN0PVwibGFzdFwiIGxldC1pbmRleD1cImluZGV4XCIgW25nRm9yT2ZdPVwiaXRlbXNcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJhbnQtc3BhY2UtaXRlbVwiXG4gICAgICAgIFtzdHlsZS5tYXJnaW4tYm90dG9tLnB4XT1cIm56RGlyZWN0aW9uID09PSAndmVydGljYWwnID8gKGxhc3QgPyBudWxsIDogc3BhY2VTaXplKSA6IG51bGxcIlxuICAgICAgICBbc3R5bGUubWFyZ2luLXJpZ2h0LnB4XT1cIm56RGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAobGFzdCA/IG51bGwgOiBzcGFjZVNpemUpIDogbnVsbFwiXG4gICAgICA+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwiaXRlbVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgICA8c3BhblxuICAgICAgICAqbmdJZj1cIm56U3BsaXQgJiYgIWxhc3RcIlxuICAgICAgICBjbGFzcz1cImFudC1zcGFjZS1zcGxpdFwiXG4gICAgICAgIFtzdHlsZS5tYXJnaW4tYm90dG9tLnB4XT1cIm56RGlyZWN0aW9uID09PSAndmVydGljYWwnID8gKGxhc3QgPyBudWxsIDogc3BhY2VTaXplKSA6IG51bGxcIlxuICAgICAgICBbc3R5bGUubWFyZ2luLXJpZ2h0LnB4XT1cIm56RGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAobGFzdCA/IG51bGwgOiBzcGFjZVNpemUpIDogbnVsbFwiXG4gICAgICA+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJuelNwbGl0XCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBpbmRleCB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtc3BhY2UnLFxuICAgICdbY2xhc3MuYW50LXNwYWNlLWhvcml6b250YWxdJzogJ256RGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIicsXG4gICAgJ1tjbGFzcy5hbnQtc3BhY2UtdmVydGljYWxdJzogJ256RGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCInLFxuICAgICdbY2xhc3MuYW50LXNwYWNlLWFsaWduLXN0YXJ0XSc6ICdtZXJnZWRBbGlnbiA9PT0gXCJzdGFydFwiJyxcbiAgICAnW2NsYXNzLmFudC1zcGFjZS1hbGlnbi1lbmRdJzogJ21lcmdlZEFsaWduID09PSBcImVuZFwiJyxcbiAgICAnW2NsYXNzLmFudC1zcGFjZS1hbGlnbi1jZW50ZXJdJzogJ21lcmdlZEFsaWduID09PSBcImNlbnRlclwiJyxcbiAgICAnW2NsYXNzLmFudC1zcGFjZS1hbGlnbi1iYXNlbGluZV0nOiAnbWVyZ2VkQWxpZ24gPT09IFwiYmFzZWxpbmVcIicsXG4gICAgJ1tzdHlsZS5mbGV4LXdyYXBdJzogJ256V3JhcCA/IFwid3JhcFwiIDogbnVsbCdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelNwYWNlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudEluaXQge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpXcmFwOiBCb29sZWFuSW5wdXQ7XG5cbiAgcmVhZG9ubHkgX256TW9kdWxlTmFtZTogTnpDb25maWdLZXkgPSBOWl9DT05GSUdfTU9EVUxFX05BTUU7XG5cbiAgQElucHV0KCkgbnpEaXJlY3Rpb246IE56U3BhY2VEaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCc7XG4gIEBJbnB1dCgpIG56QWxpZ24/OiBOelNwYWNlQWxpZ247XG4gIEBJbnB1dCgpIG56U3BsaXQ6IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBudW1iZXIgfT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56V3JhcDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56U2l6ZTogTnpTcGFjZVNpemUgPSAnc21hbGwnO1xuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBOelNwYWNlSXRlbUxlZ2FjeUNvbXBvbmVudCB3aWxsIGJlIHJlbW92ZWQgb24gMTIuMC4wLCB1c2UgTnpTcGFjZUl0ZW1EaXJlY3RpdmUgaW5zdGVhZC5cbiAgICogQGJyZWFraW5nLWNoYW5nZSAxMi4wLjBcbiAgICovXG4gIEBDb250ZW50Q2hpbGRyZW4oTnpTcGFjZUl0ZW1MZWdhY3lDb21wb25lbnQpIG56U3BhY2VJdGVtQ29tcG9uZW50cyE6IFF1ZXJ5TGlzdDxOelNwYWNlSXRlbUxlZ2FjeUNvbXBvbmVudD47XG4gIEBDb250ZW50Q2hpbGRyZW4oTnpTcGFjZUl0ZW1EaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSkgaXRlbXMhOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8TnpTYWZlQW55Pj47XG5cbiAgbWVyZ2VkQWxpZ24/OiBOelNwYWNlQWxpZ247XG4gIHNwYWNlU2l6ZTogbnVtYmVyID0gU1BBQ0VfU0laRS5zbWFsbDtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTcGFjZUl0ZW1zKCk6IHZvaWQge1xuICAgIGNvbnN0IG51bWJlclNpemUgPSB0eXBlb2YgdGhpcy5uelNpemUgPT09ICdzdHJpbmcnID8gU1BBQ0VfU0laRVt0aGlzLm56U2l6ZV0gOiB0aGlzLm56U2l6ZTtcbiAgICB0aGlzLnNwYWNlU2l6ZSA9IG51bWJlclNpemUgLyAoISF0aGlzLm56U3BsaXQgPyAyIDogMSk7XG4gICAgaWYgKHRoaXMubnpTcGFjZUl0ZW1Db21wb25lbnRzPy5sZW5ndGgpIHtcbiAgICAgIHdhcm5EZXByZWNhdGlvbignYG56LXNwYWNlLWl0ZW1gIGluIGBuei1zcGFjZWAgd2lsbCBiZSByZW1vdmVkIGluIDEyLjAuMCwgcGxlYXNlIHVzZSBgKm56U3BhY2VJdGVtYCBpbnN0ZWFkLicpO1xuICAgICAgdGhpcy5uelNwYWNlSXRlbUNvbXBvbmVudHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbS5zZXREaXJlY3Rpb25BbmRTaXplKHRoaXMubnpEaXJlY3Rpb24sIHRoaXMuc3BhY2VTaXplISk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVNwYWNlSXRlbXMoKTtcbiAgICB0aGlzLm1lcmdlZEFsaWduID0gdGhpcy5uekFsaWduID09PSB1bmRlZmluZWQgJiYgdGhpcy5uekRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnID8gJ2NlbnRlcicgOiB0aGlzLm56QWxpZ247XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVTcGFjZUl0ZW1zKCk7XG4gICAgdGhpcy5uelNwYWNlSXRlbUNvbXBvbmVudHMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlU3BhY2VJdGVtcygpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=