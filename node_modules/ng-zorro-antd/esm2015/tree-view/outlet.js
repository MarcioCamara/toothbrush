/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CdkTreeNodeOutlet, CDK_TREE_NODE_OUTLET_NODE } from '@angular/cdk/tree';
import { Directive, Inject, Optional, ViewContainerRef } from '@angular/core';
export class NzTreeNodeOutletDirective {
    constructor(viewContainer, _node) {
        this.viewContainer = viewContainer;
        this._node = _node;
    }
}
NzTreeNodeOutletDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nzTreeNodeOutlet]',
                providers: [
                    {
                        provide: CdkTreeNodeOutlet,
                        useExisting: NzTreeNodeOutletDirective
                    }
                ]
            },] }
];
NzTreeNodeOutletDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: undefined, decorators: [{ type: Inject, args: [CDK_TREE_NODE_OUTLET_NODE,] }, { type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy90cmVlLXZpZXcvb3V0bGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWE5RSxNQUFNLE9BQU8seUJBQXlCO0lBQ3BDLFlBQW1CLGFBQStCLEVBQXdELEtBQWlCO1FBQXhHLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUF3RCxVQUFLLEdBQUwsS0FBSyxDQUFZO0lBQUcsQ0FBQzs7O1lBVmhJLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixTQUFTLEVBQUU7b0JBQ1Q7d0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLHlCQUF5QjtxQkFDdkM7aUJBQ0Y7YUFDRjs7O1lBWnFDLGdCQUFnQjs0Q0FjQyxNQUFNLFNBQUMseUJBQXlCLGNBQUcsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENka1RyZWVOb2RlT3V0bGV0LCBDREtfVFJFRV9OT0RFX09VVExFVF9OT0RFIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RyZWUnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbmplY3QsIE9wdGlvbmFsLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuelRyZWVOb2RlT3V0bGV0XScsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IENka1RyZWVOb2RlT3V0bGV0LFxuICAgICAgdXNlRXhpc3Rpbmc6IE56VHJlZU5vZGVPdXRsZXREaXJlY3RpdmVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTnpUcmVlTm9kZU91dGxldERpcmVjdGl2ZSBpbXBsZW1lbnRzIENka1RyZWVOb2RlT3V0bGV0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsIEBJbmplY3QoQ0RLX1RSRUVfTk9ERV9PVVRMRVRfTk9ERSkgQE9wdGlvbmFsKCkgcHVibGljIF9ub2RlPzogTnpTYWZlQW55KSB7fVxufVxuIl19