/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { InputNumber } from 'ng-zorro-antd/core/util';
const NZ_CONFIG_MODULE_NAME = 'avatar';
export class NzAvatarComponent {
    constructor(nzConfigService, elementRef, cdr, platform) {
        this.nzConfigService = nzConfigService;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.platform = platform;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzShape = 'circle';
        this.nzSize = 'default';
        this.nzGap = 4;
        this.nzError = new EventEmitter();
        this.hasText = false;
        this.hasSrc = true;
        this.hasIcon = false;
        this.textStyles = {};
        this.classMap = {};
        this.customSize = null;
        this.el = this.elementRef.nativeElement;
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-avatar');
    }
    imgError($event) {
        this.nzError.emit($event);
        if (!$event.defaultPrevented) {
            this.hasSrc = false;
            this.hasIcon = false;
            this.hasText = false;
            if (this.nzIcon) {
                this.hasIcon = true;
            }
            else if (this.nzText) {
                this.hasText = true;
            }
            this.cdr.detectChanges();
            this.setSizeStyle();
            this.notifyCalc();
        }
    }
    ngOnChanges() {
        this.hasText = !this.nzSrc && !!this.nzText;
        this.hasIcon = !this.nzSrc && !!this.nzIcon;
        this.hasSrc = !!this.nzSrc;
        this.setSizeStyle();
        this.notifyCalc();
    }
    calcStringSize() {
        if (!this.hasText) {
            return;
        }
        const childrenWidth = this.textEl.nativeElement.offsetWidth;
        const avatarWidth = this.el.getBoundingClientRect().width;
        const offset = this.nzGap * 2 < avatarWidth ? this.nzGap * 2 : 8;
        const scale = avatarWidth - offset < childrenWidth ? (avatarWidth - offset) / childrenWidth : 1;
        this.textStyles = {
            transform: `scale(${scale}) translateX(-50%)`
        };
        if (this.customSize) {
            Object.assign(this.textStyles, {
                lineHeight: this.customSize
            });
        }
        this.cdr.detectChanges();
    }
    notifyCalc() {
        // If use ngAfterViewChecked, always demands more computations, so......
        if (this.platform.isBrowser) {
            setTimeout(() => {
                this.calcStringSize();
            });
        }
    }
    setSizeStyle() {
        if (typeof this.nzSize === 'number') {
            this.customSize = `${this.nzSize}px`;
        }
        else {
            this.customSize = null;
        }
        this.cdr.markForCheck();
    }
}
NzAvatarComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-avatar',
                exportAs: 'nzAvatar',
                template: `
    <i nz-icon *ngIf="nzIcon && hasIcon" [nzType]="nzIcon"></i>
    <img *ngIf="nzSrc && hasSrc" [src]="nzSrc" [attr.srcset]="nzSrcSet" [attr.alt]="nzAlt" (error)="imgError($event)" />
    <span class="ant-avatar-string" #textEl [ngStyle]="textStyles" *ngIf="nzText && hasText">{{ nzText }}</span>
  `,
                host: {
                    '[class.ant-avatar-lg]': `nzSize === 'large'`,
                    '[class.ant-avatar-sm]': `nzSize === 'small'`,
                    '[class.ant-avatar-square]': `nzShape === 'square'`,
                    '[class.ant-avatar-circle]': `nzShape === 'circle'`,
                    '[class.ant-avatar-icon]': `nzIcon`,
                    '[class.ant-avatar-image]': `hasSrc `,
                    '[style.width]': 'customSize',
                    '[style.height]': 'customSize',
                    '[style.line-height]': 'customSize',
                    // nzSize type is number when customSize is true
                    '[style.font-size.px]': '(hasIcon && customSize) ? $any(nzSize) / 2 : null'
                },
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] }
];
NzAvatarComponent.ctorParameters = () => [
    { type: NzConfigService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Platform }
];
NzAvatarComponent.propDecorators = {
    nzShape: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzGap: [{ type: Input }],
    nzText: [{ type: Input }],
    nzSrc: [{ type: Input }],
    nzSrcSet: [{ type: Input }],
    nzAlt: [{ type: Input }],
    nzIcon: [{ type: Input }],
    nzError: [{ type: Output }],
    textEl: [{ type: ViewChild, args: ['textEl', { static: false },] }]
};
__decorate([
    WithConfig(),
    __metadata("design:type", String)
], NzAvatarComponent.prototype, "nzShape", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Object)
], NzAvatarComponent.prototype, "nzSize", void 0);
__decorate([
    WithConfig(),
    InputNumber(),
    __metadata("design:type", Object)
], NzAvatarComponent.prototype, "nzGap", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvYXZhdGFyL2F2YXRhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFlLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdEQsTUFBTSxxQkFBcUIsR0FBZ0IsUUFBUSxDQUFDO0FBMkJwRCxNQUFNLE9BQU8saUJBQWlCO0lBeUI1QixZQUNTLGVBQWdDLEVBQy9CLFVBQXNCLEVBQ3RCLEdBQXNCLEVBQ3RCLFFBQWtCO1FBSG5CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUMvQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVU7UUExQm5CLGtCQUFhLEdBQWdCLHFCQUFxQixDQUFDO1FBQ3JDLFlBQU8sR0FBa0IsUUFBUSxDQUFDO1FBQ2xDLFdBQU0sR0FBMkIsU0FBUyxDQUFDO1FBQzVCLFVBQUssR0FBRyxDQUFDLENBQUM7UUFNN0IsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFTLENBQUM7UUFFdkQsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsZUFBVSxHQUFxQixFQUFFLENBQUM7UUFDbEMs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SUFBYixVQUFVLEVBQUU7O2tEQUFtQztBQUNsQztJQUFiLFVBQVUsRUFBRTs7aURBQTRDO0FBQzVCO0lBQTVCLFVBQVUsRUFBRTtJQUFFLFdBQVcsRUFBRTs7Z0RBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56Q29uZmlnS2V5LCBOekNvbmZpZ1NlcnZpY2UsIFdpdGhDb25maWcgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IE5nQ2xhc3NJbnRlcmZhY2UsIE5nU3R5bGVJbnRlcmZhY2UsIE51bWJlcklucHV0LCBOelNoYXBlU0NUeXBlLCBOelNpemVMRFNUeXBlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0TnVtYmVyIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5jb25zdCBOWl9DT05GSUdfTU9EVUxFX05BTUU6IE56Q29uZmlnS2V5ID0gJ2F2YXRhcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWF2YXRhcicsXG4gIGV4cG9ydEFzOiAnbnpBdmF0YXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxpIG56LWljb24gKm5nSWY9XCJuekljb24gJiYgaGFzSWNvblwiIFtuelR5cGVdPVwibnpJY29uXCI+PC9pPlxuICAgIDxpbWcgKm5nSWY9XCJuelNyYyAmJiBoYXNTcmNcIiBbc3JjXT1cIm56U3JjXCIgW2F0dHIuc3Jjc2V0XT1cIm56U3JjU2V0XCIgW2F0dHIuYWx0XT1cIm56QWx0XCIgKGVycm9yKT1cImltZ0Vycm9yKCRldmVudClcIiAvPlxuICAgIDxzcGFuIGNsYXNzPVwiYW50LWF2YXRhci1zdHJpbmdcIiAjdGV4dEVsIFtuZ1N0eWxlXT1cInRleHRTdHlsZXNcIiAqbmdJZj1cIm56VGV4dCAmJiBoYXNUZXh0XCI+e3sgbnpUZXh0IH19PC9zcGFuPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtYXZhdGFyLWxnXSc6IGBuelNpemUgPT09ICdsYXJnZSdgLFxuICAgICdbY2xhc3MuYW50LWF2YXRhci1zbV0nOiBgbnpTaXplID09PSAnc21hbGwnYCxcbiAgICAnW2NsYXNzLmFudC1hdmF0YXItc3F1YXJlXSc6IGBuelNoYXBlID09PSAnc3F1YXJlJ2AsXG4gICAgJ1tjbGFzcy5hbnQtYXZhdGFyLWNpcmNsZV0nOiBgbnpTaGFwZSA9PT0gJ2NpcmNsZSdgLFxuICAgICdbY2xhc3MuYW50LWF2YXRhci1pY29uXSc6IGBuekljb25gLFxuICAgICdbY2xhc3MuYW50LWF2YXRhci1pbWFnZV0nOiBgaGFzU3JjIGAsXG4gICAgJ1tzdHlsZS53aWR0aF0nOiAnY3VzdG9tU2l6ZScsXG4gICAgJ1tzdHlsZS5oZWlnaHRdJzogJ2N1c3RvbVNpemUnLFxuICAgICdbc3R5bGUubGluZS1oZWlnaHRdJzogJ2N1c3RvbVNpemUnLFxuICAgIC8vIG56U2l6ZSB0eXBlIGlzIG51bWJlciB3aGVuIGN1c3RvbVNpemUgaXMgdHJ1ZVxuICAgICdbc3R5bGUuZm9udC1zaXplLnB4XSc6ICcoaGFzSWNvbiAmJiBjdXN0b21TaXplKSA/ICRhbnkobnpTaXplKSAvIDIgOiBudWxsJ1xuICB9LFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTnpBdmF0YXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpHYXA6IE51bWJlcklucHV0O1xuXG4gIHJlYWRvbmx5IF9uek1vZHVsZU5hbWU6IE56Q29uZmlnS2V5ID0gTlpfQ09ORklHX01PRFVMRV9OQU1FO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56U2hhcGU6IE56U2hhcGVTQ1R5cGUgPSAnY2lyY2xlJztcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBuelNpemU6IE56U2l6ZUxEU1R5cGUgfCBudW1iZXIgPSAnZGVmYXVsdCc7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgQElucHV0TnVtYmVyKCkgbnpHYXAgPSA0O1xuICBASW5wdXQoKSBuelRleHQ/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG56U3JjPzogc3RyaW5nO1xuICBASW5wdXQoKSBuelNyY1NldD86IHN0cmluZztcbiAgQElucHV0KCkgbnpBbHQ/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG56SWNvbj86IHN0cmluZztcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56RXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xuXG4gIGhhc1RleHQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaGFzU3JjOiBib29sZWFuID0gdHJ1ZTtcbiAgaGFzSWNvbjogYm9vbGVhbiA9IGZhbHNlO1xuICB0ZXh0U3R5bGVzOiBOZ1N0eWxlSW50ZXJmYWNlID0ge307XG4gIGNsYXNzTWFwOiBOZ0NsYXNzSW50ZXJmYWNlID0ge307XG4gIGN1c3RvbVNpemU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIEBWaWV3Q2hpbGQoJ3RleHRFbCcsIHsgc3RhdGljOiBmYWxzZSB9KSB0ZXh0RWw/OiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgZWw6IEhUTUxFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm1cbiAgKSB7XG4gICAgLy8gVE9ETzogbW92ZSB0byBob3N0IGFmdGVyIFZpZXcgRW5naW5lIGRlcHJlY2F0aW9uXG4gICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYW50LWF2YXRhcicpO1xuICB9XG5cbiAgaW1nRXJyb3IoJGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIHRoaXMubnpFcnJvci5lbWl0KCRldmVudCk7XG4gICAgaWYgKCEkZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgdGhpcy5oYXNTcmMgPSBmYWxzZTtcbiAgICAgIHRoaXMuaGFzSWNvbiA9IGZhbHNlO1xuICAgICAgdGhpcy5oYXNUZXh0ID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5uekljb24pIHtcbiAgICAgICAgdGhpcy5oYXNJY29uID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5uelRleHQpIHtcbiAgICAgICAgdGhpcy5oYXNUZXh0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHRoaXMuc2V0U2l6ZVN0eWxlKCk7XG4gICAgICB0aGlzLm5vdGlmeUNhbGMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLmhhc1RleHQgPSAhdGhpcy5uelNyYyAmJiAhIXRoaXMubnpUZXh0O1xuICAgIHRoaXMuaGFzSWNvbiA9ICF0aGlzLm56U3JjICYmICEhdGhpcy5uekljb247XG4gICAgdGhpcy5oYXNTcmMgPSAhIXRoaXMubnpTcmM7XG5cbiAgICB0aGlzLnNldFNpemVTdHlsZSgpO1xuICAgIHRoaXMubm90aWZ5Q2FsYygpO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxjU3RyaW5nU2l6ZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaGFzVGV4dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNoaWxkcmVuV2lkdGggPSB0aGlzLnRleHRFbCEubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBhdmF0YXJXaWR0aCA9IHRoaXMuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5uekdhcCAqIDIgPCBhdmF0YXJXaWR0aCA/IHRoaXMubnpHYXAgKiAyIDogODtcbiAgICBjb25zdCBzY2FsZSA9IGF2YXRhcldpZHRoIC0gb2Zmc2V0IDwgY2hpbGRyZW5XaWR0aCA/IChhdmF0YXJXaWR0aCAtIG9mZnNldCkgLyBjaGlsZHJlbldpZHRoIDogMTtcblxuICAgIHRoaXMudGV4dFN0eWxlcyA9IHtcbiAgICAgIHRyYW5zZm9ybTogYHNjYWxlKCR7c2NhbGV9KSB0cmFuc2xhdGVYKC01MCUpYFxuICAgIH07XG4gICAgaWYgKHRoaXMuY3VzdG9tU2l6ZSkge1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnRleHRTdHlsZXMsIHtcbiAgICAgICAgbGluZUhlaWdodDogdGhpcy5jdXN0b21TaXplXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBub3RpZnlDYWxjKCk6IHZvaWQge1xuICAgIC8vIElmIHVzZSBuZ0FmdGVyVmlld0NoZWNrZWQsIGFsd2F5cyBkZW1hbmRzIG1vcmUgY29tcHV0YXRpb25zLCBzby4uLi4uLlxuICAgIGlmICh0aGlzLnBsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2FsY1N0cmluZ1NpemUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0U2l6ZVN0eWxlKCk6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgdGhpcy5uelNpemUgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLmN1c3RvbVNpemUgPSBgJHt0aGlzLm56U2l6ZX1weGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VzdG9tU2l6ZSA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iXX0=