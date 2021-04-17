/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
export class NzStringTemplateOutletDirective {
    constructor(viewContainer, templateRef) {
        this.viewContainer = viewContainer;
        this.templateRef = templateRef;
        this.embeddedViewRef = null;
        this.context = new NzStringTemplateOutletContext();
        this.nzStringTemplateOutletContext = null;
        this.nzStringTemplateOutlet = null;
    }
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    recreateView() {
        this.viewContainer.clear();
        const isTemplateRef = this.nzStringTemplateOutlet instanceof TemplateRef;
        const templateRef = (isTemplateRef ? this.nzStringTemplateOutlet : this.templateRef);
        this.embeddedViewRef = this.viewContainer.createEmbeddedView(templateRef, isTemplateRef ? this.nzStringTemplateOutletContext : this.context);
    }
    updateContext() {
        const isTemplateRef = this.nzStringTemplateOutlet instanceof TemplateRef;
        const newCtx = isTemplateRef ? this.nzStringTemplateOutletContext : this.context;
        const oldCtx = this.embeddedViewRef.context;
        if (newCtx) {
            for (const propName of Object.keys(newCtx)) {
                oldCtx[propName] = newCtx[propName];
            }
        }
    }
    ngOnChanges(changes) {
        const { nzStringTemplateOutletContext, nzStringTemplateOutlet } = changes;
        const shouldRecreateView = () => {
            let shouldOutletRecreate = false;
            if (nzStringTemplateOutlet) {
                if (nzStringTemplateOutlet.firstChange) {
                    shouldOutletRecreate = true;
                }
                else {
                    const isPreviousOutletTemplate = nzStringTemplateOutlet.previousValue instanceof TemplateRef;
                    const isCurrentOutletTemplate = nzStringTemplateOutlet.currentValue instanceof TemplateRef;
                    shouldOutletRecreate = isPreviousOutletTemplate || isCurrentOutletTemplate;
                }
            }
            const hasContextShapeChanged = (ctxChange) => {
                const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
                const currCtxKeys = Object.keys(ctxChange.currentValue || {});
                if (prevCtxKeys.length === currCtxKeys.length) {
                    for (const propName of currCtxKeys) {
                        if (prevCtxKeys.indexOf(propName) === -1) {
                            return true;
                        }
                    }
                    return false;
                }
                else {
                    return true;
                }
            };
            const shouldContextRecreate = nzStringTemplateOutletContext && hasContextShapeChanged(nzStringTemplateOutletContext);
            return shouldContextRecreate || shouldOutletRecreate;
        };
        if (nzStringTemplateOutlet) {
            this.context.$implicit = nzStringTemplateOutlet.currentValue;
        }
        const recreateView = shouldRecreateView();
        if (recreateView) {
            /** recreate view when context shape or outlet change **/
            this.recreateView();
        }
        else {
            /** update context **/
            this.updateContext();
        }
    }
}
NzStringTemplateOutletDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nzStringTemplateOutlet]',
                exportAs: 'nzStringTemplateOutlet'
            },] }
];
NzStringTemplateOutletDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: TemplateRef }
];
NzStringTemplateOutletDirective.propDecorators = {
    nzStringTemplateOutletContext: [{ type: Input }],
    nzStringTemplateOutlet: [{ type: Input }]
};
export class NzStringTemplateOutletContext {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nX3RlbXBsYXRlX291dGxldC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvcmUvb3V0bGV0L3N0cmluZ190ZW1wbGF0ZV9vdXRsZXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQW1CLEtBQUssRUFBMEMsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBT3pJLE1BQU0sT0FBTywrQkFBK0I7SUErQjFDLFlBQW9CLGFBQStCLEVBQVUsV0FBbUM7UUFBNUUsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQXdCO1FBOUJ4RixvQkFBZSxHQUFzQyxJQUFJLENBQUM7UUFDMUQsWUFBTyxHQUFHLElBQUksNkJBQTZCLEVBQUUsQ0FBQztRQUM3QyxrQ0FBNkIsR0FBcUIsSUFBSSxDQUFDO1FBQ3ZELDJCQUFzQixHQUF1QyxJQUFJLENBQUM7SUEyQndCLENBQUM7SUF6QnBHLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBSSxJQUF3QyxFQUFFLElBQWU7UUFDeEYsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU8sWUFBWTtRQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsWUFBWSxXQUFXLENBQUM7UUFDekUsTUFBTSxXQUFXLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBYyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FDMUQsV0FBVyxFQUNYLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDZCQUE2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NkI7Q0FFekMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVtYmVkZGVkVmlld1JlZiwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlLCBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW256U3RyaW5nVGVtcGxhdGVPdXRsZXRdJyxcbiAgZXhwb3J0QXM6ICduelN0cmluZ1RlbXBsYXRlT3V0bGV0J1xufSlcbmV4cG9ydCBjbGFzcyBOelN0cmluZ1RlbXBsYXRlT3V0bGV0RGlyZWN0aXZlPF9UID0gdW5rbm93bj4gaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBwcml2YXRlIGVtYmVkZGVkVmlld1JlZjogRW1iZWRkZWRWaWV3UmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBjb250ZXh0ID0gbmV3IE56U3RyaW5nVGVtcGxhdGVPdXRsZXRDb250ZXh0KCk7XG4gIEBJbnB1dCgpIG56U3RyaW5nVGVtcGxhdGVPdXRsZXRDb250ZXh0OiBOelNhZmVBbnkgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpTdHJpbmdUZW1wbGF0ZU91dGxldDogTnpTYWZlQW55IHwgVGVtcGxhdGVSZWY8TnpTYWZlQW55PiA9IG51bGw7XG5cbiAgc3RhdGljIG5nVGVtcGxhdGVDb250ZXh0R3VhcmQ8VD4oX2RpcjogTnpTdHJpbmdUZW1wbGF0ZU91dGxldERpcmVjdGl2ZTxUPiwgX2N0eDogTnpTYWZlQW55KTogX2N0eCBpcyBOelN0cmluZ1RlbXBsYXRlT3V0bGV0Q29udGV4dCB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIHJlY3JlYXRlVmlldygpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICBjb25zdCBpc1RlbXBsYXRlUmVmID0gdGhpcy5uelN0cmluZ1RlbXBsYXRlT3V0bGV0IGluc3RhbmNlb2YgVGVtcGxhdGVSZWY7XG4gICAgY29uc3QgdGVtcGxhdGVSZWYgPSAoaXNUZW1wbGF0ZVJlZiA/IHRoaXMubnpTdHJpbmdUZW1wbGF0ZU91dGxldCA6IHRoaXMudGVtcGxhdGVSZWYpIGFzIE56U2FmZUFueTtcbiAgICB0aGlzLmVtYmVkZGVkVmlld1JlZiA9IHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcoXG4gICAgICB0ZW1wbGF0ZVJlZixcbiAgICAgIGlzVGVtcGxhdGVSZWYgPyB0aGlzLm56U3RyaW5nVGVtcGxhdGVPdXRsZXRDb250ZXh0IDogdGhpcy5jb250ZXh0XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ29udGV4dCgpOiB2b2lkIHtcbiAgICBjb25zdCBpc1RlbXBsYXRlUmVmID0gdGhpcy5uelN0cmluZ1RlbXBsYXRlT3V0bGV0IGluc3RhbmNlb2YgVGVtcGxhdGVSZWY7XG4gICAgY29uc3QgbmV3Q3R4ID0gaXNUZW1wbGF0ZVJlZiA/IHRoaXMubnpTdHJpbmdUZW1wbGF0ZU91dGxldENvbnRleHQgOiB0aGlzLmNvbnRleHQ7XG4gICAgY29uc3Qgb2xkQ3R4ID0gdGhpcy5lbWJlZGRlZFZpZXdSZWYhLmNvbnRleHQgYXMgTnpTYWZlQW55O1xuICAgIGlmIChuZXdDdHgpIHtcbiAgICAgIGZvciAoY29uc3QgcHJvcE5hbWUgb2YgT2JqZWN0LmtleXMobmV3Q3R4KSkge1xuICAgICAgICBvbGRDdHhbcHJvcE5hbWVdID0gbmV3Q3R4W3Byb3BOYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPE56U2FmZUFueT4pIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbnpTdHJpbmdUZW1wbGF0ZU91dGxldENvbnRleHQsIG56U3RyaW5nVGVtcGxhdGVPdXRsZXQgfSA9IGNoYW5nZXM7XG4gICAgY29uc3Qgc2hvdWxkUmVjcmVhdGVWaWV3ID0gKCk6IGJvb2xlYW4gPT4ge1xuICAgICAgbGV0IHNob3VsZE91dGxldFJlY3JlYXRlID0gZmFsc2U7XG4gICAgICBpZiAobnpTdHJpbmdUZW1wbGF0ZU91dGxldCkge1xuICAgICAgICBpZiAobnpTdHJpbmdUZW1wbGF0ZU91dGxldC5maXJzdENoYW5nZSkge1xuICAgICAgICAgIHNob3VsZE91dGxldFJlY3JlYXRlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBpc1ByZXZpb3VzT3V0bGV0VGVtcGxhdGUgPSBuelN0cmluZ1RlbXBsYXRlT3V0bGV0LnByZXZpb3VzVmFsdWUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZjtcbiAgICAgICAgICBjb25zdCBpc0N1cnJlbnRPdXRsZXRUZW1wbGF0ZSA9IG56U3RyaW5nVGVtcGxhdGVPdXRsZXQuY3VycmVudFZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWY7XG4gICAgICAgICAgc2hvdWxkT3V0bGV0UmVjcmVhdGUgPSBpc1ByZXZpb3VzT3V0bGV0VGVtcGxhdGUgfHwgaXNDdXJyZW50T3V0bGV0VGVtcGxhdGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IGhhc0NvbnRleHRTaGFwZUNoYW5nZWQgPSAoY3R4Q2hhbmdlOiBTaW1wbGVDaGFuZ2UpOiBib29sZWFuID0+IHtcbiAgICAgICAgY29uc3QgcHJldkN0eEtleXMgPSBPYmplY3Qua2V5cyhjdHhDaGFuZ2UucHJldmlvdXNWYWx1ZSB8fCB7fSk7XG4gICAgICAgIGNvbnN0IGN1cnJDdHhLZXlzID0gT2JqZWN0LmtleXMoY3R4Q2hhbmdlLmN1cnJlbnRWYWx1ZSB8fCB7fSk7XG4gICAgICAgIGlmIChwcmV2Q3R4S2V5cy5sZW5ndGggPT09IGN1cnJDdHhLZXlzLmxlbmd0aCkge1xuICAgICAgICAgIGZvciAoY29uc3QgcHJvcE5hbWUgb2YgY3VyckN0eEtleXMpIHtcbiAgICAgICAgICAgIGlmIChwcmV2Q3R4S2V5cy5pbmRleE9mKHByb3BOYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IHNob3VsZENvbnRleHRSZWNyZWF0ZSA9IG56U3RyaW5nVGVtcGxhdGVPdXRsZXRDb250ZXh0ICYmIGhhc0NvbnRleHRTaGFwZUNoYW5nZWQobnpTdHJpbmdUZW1wbGF0ZU91dGxldENvbnRleHQpO1xuICAgICAgcmV0dXJuIHNob3VsZENvbnRleHRSZWNyZWF0ZSB8fCBzaG91bGRPdXRsZXRSZWNyZWF0ZTtcbiAgICB9O1xuXG4gICAgaWYgKG56U3RyaW5nVGVtcGxhdGVPdXRsZXQpIHtcbiAgICAgIHRoaXMuY29udGV4dC4kaW1wbGljaXQgPSBuelN0cmluZ1RlbXBsYXRlT3V0bGV0LmN1cnJlbnRWYWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCByZWNyZWF0ZVZpZXcgPSBzaG91bGRSZWNyZWF0ZVZpZXcoKTtcbiAgICBpZiAocmVjcmVhdGVWaWV3KSB7XG4gICAgICAvKiogcmVjcmVhdGUgdmlldyB3aGVuIGNvbnRleHQgc2hhcGUgb3Igb3V0bGV0IGNoYW5nZSAqKi9cbiAgICAgIHRoaXMucmVjcmVhdGVWaWV3KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8qKiB1cGRhdGUgY29udGV4dCAqKi9cbiAgICAgIHRoaXMudXBkYXRlQ29udGV4dCgpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTnpTdHJpbmdUZW1wbGF0ZU91dGxldENvbnRleHQge1xuICBwdWJsaWMgJGltcGxpY2l0OiBOelNhZmVBbnk7XG59XG4iXX0=