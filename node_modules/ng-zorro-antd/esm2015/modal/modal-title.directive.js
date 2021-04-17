/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Optional, TemplateRef } from '@angular/core';
import { NzModalRef } from './modal-ref';
export class NzModalTitleDirective {
    constructor(nzModalRef, templateRef) {
        this.nzModalRef = nzModalRef;
        this.templateRef = templateRef;
        if (this.nzModalRef) {
            this.nzModalRef.updateConfig({
                nzTitle: this.templateRef
            });
        }
    }
}
NzModalTitleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nzModalTitle]',
                exportAs: 'nzModalTitle'
            },] }
];
NzModalTitleDirective.ctorParameters = () => [
    { type: NzModalRef, decorators: [{ type: Optional }] },
    { type: TemplateRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtdGl0bGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9tb2RhbC9tb2RhbC10aXRsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFNekMsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUFnQyxVQUFzQixFQUFTLFdBQTRCO1FBQTNELGVBQVUsR0FBVixVQUFVLENBQVk7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7UUFDekYsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDO2dCQUMzQixPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVc7YUFDMUIsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7WUFYRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLGNBQWM7YUFDekI7OztZQUxRLFVBQVUsdUJBT0osUUFBUTtZQVJPLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIE9wdGlvbmFsLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpNb2RhbFJlZiB9IGZyb20gJy4vbW9kYWwtcmVmJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW256TW9kYWxUaXRsZV0nLFxuICBleHBvcnRBczogJ256TW9kYWxUaXRsZSdcbn0pXG5leHBvcnQgY2xhc3MgTnpNb2RhbFRpdGxlRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcHJpdmF0ZSBuek1vZGFsUmVmOiBOek1vZGFsUmVmLCBwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPHt9Pikge1xuICAgIGlmICh0aGlzLm56TW9kYWxSZWYpIHtcbiAgICAgIHRoaXMubnpNb2RhbFJlZi51cGRhdGVDb25maWcoe1xuICAgICAgICBuelRpdGxlOiB0aGlzLnRlbXBsYXRlUmVmXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==