/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkTreeNodeToggle } from '@angular/cdk/tree';
import { Directive, Input } from '@angular/core';
export class NzTreeNodeNoopToggleDirective {
}
NzTreeNodeNoopToggleDirective.decorators = [
    { type: Directive, args: [{
                selector: 'nz-tree-node-toggle[nzTreeNodeNoopToggle], [nzTreeNodeNoopToggle]',
                host: {
                    class: 'ant-tree-switcher ant-tree-switcher-noop'
                }
            },] }
];
export class NzTreeNodeToggleDirective extends CdkTreeNodeToggle {
    get recursive() {
        return this._recursive;
    }
    set recursive(value) {
        this._recursive = coerceBooleanProperty(value);
    }
    get isExpanded() {
        return this._treeNode.isExpanded;
    }
}
NzTreeNodeToggleDirective.decorators = [
    { type: Directive, args: [{
                selector: 'nz-tree-node-toggle:not([nzTreeNodeNoopToggle]), [nzTreeNodeToggle]',
                providers: [{ provide: CdkTreeNodeToggle, useExisting: NzTreeNodeToggleDirective }],
                host: {
                    class: 'ant-tree-switcher',
                    '[class.ant-tree-switcher_open]': 'isExpanded',
                    '[class.ant-tree-switcher_close]': '!isExpanded'
                }
            },] }
];
NzTreeNodeToggleDirective.propDecorators = {
    recursive: [{ type: Input, args: ['nzTreeNodeToggleRecursive',] }]
};
export class NzTreeNodeToggleRotateIconDirective {
}
NzTreeNodeToggleRotateIconDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-icon][nzTreeNodeToggleRotateIcon]',
                host: {
                    class: 'ant-tree-switcher-icon'
                }
            },] }
];
export class NzTreeNodeToggleActiveIconDirective {
}
NzTreeNodeToggleActiveIconDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-icon][nzTreeNodeToggleActiveIcon]',
                host: {
                    class: 'ant-tree-switcher-loading-icon'
                }
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy90cmVlLXZpZXcvdG9nZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBU2pELE1BQU0sT0FBTyw2QkFBNkI7OztZQU56QyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1FQUFtRTtnQkFDN0UsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSwwQ0FBMEM7aUJBQ2xEO2FBQ0Y7O0FBWUQsTUFBTSxPQUFPLHlCQUE2QixTQUFRLGlCQUFvQjtJQUVwRSxJQUNJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUNELElBQUksU0FBUyxDQUFDLEtBQWM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztJQUNuQyxDQUFDOzs7WUFyQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxRUFBcUU7Z0JBQy9FLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSx5QkFBeUIsRUFBRSxDQUFDO2dCQUNuRixJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLG1CQUFtQjtvQkFDMUIsZ0NBQWdDLEVBQUUsWUFBWTtvQkFDOUMsaUNBQWlDLEVBQUUsYUFBYTtpQkFDakQ7YUFDRjs7O3dCQUdFLEtBQUssU0FBQywyQkFBMkI7O0FBbUJwQyxNQUFNLE9BQU8sbUNBQW1DOzs7WUFOL0MsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1Q0FBdUM7Z0JBQ2pELElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsd0JBQXdCO2lCQUNoQzthQUNGOztBQVNELE1BQU0sT0FBTyxtQ0FBbUM7OztZQU4vQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVDQUF1QztnQkFDakQsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxnQ0FBZ0M7aUJBQ3hDO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQ2RrVHJlZU5vZGVUb2dnbGUgfSBmcm9tICdAYW5ndWxhci9jZGsvdHJlZSc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICduei10cmVlLW5vZGUtdG9nZ2xlW256VHJlZU5vZGVOb29wVG9nZ2xlXSwgW256VHJlZU5vZGVOb29wVG9nZ2xlXScsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC10cmVlLXN3aXRjaGVyIGFudC10cmVlLXN3aXRjaGVyLW5vb3AnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUcmVlTm9kZU5vb3BUb2dnbGVEaXJlY3RpdmUge31cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbnotdHJlZS1ub2RlLXRvZ2dsZTpub3QoW256VHJlZU5vZGVOb29wVG9nZ2xlXSksIFtuelRyZWVOb2RlVG9nZ2xlXScsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ2RrVHJlZU5vZGVUb2dnbGUsIHVzZUV4aXN0aW5nOiBOelRyZWVOb2RlVG9nZ2xlRGlyZWN0aXZlIH1dLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtdHJlZS1zd2l0Y2hlcicsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZS1zd2l0Y2hlcl9vcGVuXSc6ICdpc0V4cGFuZGVkJyxcbiAgICAnW2NsYXNzLmFudC10cmVlLXN3aXRjaGVyX2Nsb3NlXSc6ICchaXNFeHBhbmRlZCdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRyZWVOb2RlVG9nZ2xlRGlyZWN0aXZlPFQ+IGV4dGVuZHMgQ2RrVHJlZU5vZGVUb2dnbGU8VD4ge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmVjdXJzaXZlOiBCb29sZWFuSW5wdXQ7XG4gIEBJbnB1dCgnbnpUcmVlTm9kZVRvZ2dsZVJlY3Vyc2l2ZScpXG4gIGdldCByZWN1cnNpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY3Vyc2l2ZTtcbiAgfVxuICBzZXQgcmVjdXJzaXZlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVjdXJzaXZlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuXG4gIGdldCBpc0V4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl90cmVlTm9kZS5pc0V4cGFuZGVkO1xuICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuei1pY29uXVtuelRyZWVOb2RlVG9nZ2xlUm90YXRlSWNvbl0nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtdHJlZS1zd2l0Y2hlci1pY29uJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VHJlZU5vZGVUb2dnbGVSb3RhdGVJY29uRGlyZWN0aXZlIHt9XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuei1pY29uXVtuelRyZWVOb2RlVG9nZ2xlQWN0aXZlSWNvbl0nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtdHJlZS1zd2l0Y2hlci1sb2FkaW5nLWljb24nXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUcmVlTm9kZVRvZ2dsZUFjdGl2ZUljb25EaXJlY3RpdmUge31cbiJdfQ==