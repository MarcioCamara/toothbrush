/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzTreeNodeComponent } from './node';
export class NzTreeNodeOptionComponent {
    constructor(treeNode) {
        this.treeNode = treeNode;
        this.nzSelected = false;
        this.nzDisabled = false;
        this.nzClick = new EventEmitter();
    }
    get isExpanded() {
        return this.treeNode.isExpanded;
    }
    onClick(e) {
        if (!this.nzDisabled) {
            this.nzClick.emit(e);
        }
    }
    ngOnChanges(changes) {
        const { nzDisabled, nzSelected } = changes;
        if (nzDisabled) {
            if (nzDisabled.currentValue) {
                this.treeNode.disable();
            }
            else {
                this.treeNode.enable();
            }
        }
        if (nzSelected) {
            if (nzSelected.currentValue) {
                this.treeNode.select();
            }
            else {
                this.treeNode.deselect();
            }
        }
    }
}
NzTreeNodeOptionComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tree-node-option',
                template: `
    <span class="ant-tree-title"><ng-content></ng-content></span>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    class: 'ant-tree-node-content-wrapper',
                    '[class.ant-tree-node-content-wrapper-open]': 'isExpanded',
                    '[class.ant-tree-node-selected]': 'nzSelected',
                    '(click)': 'onClick($event)'
                }
            },] }
];
NzTreeNodeOptionComponent.ctorParameters = () => [
    { type: NzTreeNodeComponent }
];
NzTreeNodeOptionComponent.propDecorators = {
    nzSelected: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzClick: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTreeNodeOptionComponent.prototype, "nzSelected", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTreeNodeOptionComponent.prototype, "nzDisabled", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy90cmVlLXZpZXcvb3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUUxSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sUUFBUSxDQUFDO0FBZTdDLE1BQU0sT0FBTyx5QkFBeUI7SUFRcEMsWUFBb0IsUUFBZ0M7UUFBaEMsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7UUFKM0IsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO0lBRUwsQ0FBQztJQUV4RCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxPQUFPLENBQUMsQ0FBYTtRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QjtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDM0MsSUFBSSxVQUFVLEVBQUU7WUFDZCxJQUFJLFVBQVUsQ0FBQyxZQUFZLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDekI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUN4QjtTQUNGO1FBRUQsSUFBSSxVQUFVLEVBQUU7WUFDZCxJQUFJLFVBQVUsQ0FBQyxZQUFZLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDeEI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUMxQjtTQUNGO0lBQ0gsQ0FBQzs7O1lBbERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUU7O0dBRVQ7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsK0JBQStCO29CQUN0Qyw0Q0FBNEMsRUFBRSxZQUFZO29CQUMxRCxnQ0FBZ0MsRUFBRSxZQUFZO29CQUM5QyxTQUFTLEVBQUUsaUJBQWlCO2lCQUM3QjthQUNGOzs7WUFkUSxtQkFBbUI7Ozt5QkFtQnpCLEtBQUs7eUJBQ0wsS0FBSztzQkFDTCxNQUFNOztBQUZrQjtJQUFmLFlBQVksRUFBRTs7NkRBQW9CO0FBQ25CO0lBQWYsWUFBWSxFQUFFOzs2REFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuaW1wb3J0IHsgTnpUcmVlTm9kZUNvbXBvbmVudCB9IGZyb20gJy4vbm9kZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRyZWUtbm9kZS1vcHRpb24nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzcGFuIGNsYXNzPVwiYW50LXRyZWUtdGl0bGVcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9zcGFuPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LXRyZWUtbm9kZS1jb250ZW50LXdyYXBwZXInLFxuICAgICdbY2xhc3MuYW50LXRyZWUtbm9kZS1jb250ZW50LXdyYXBwZXItb3Blbl0nOiAnaXNFeHBhbmRlZCcsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZS1ub2RlLXNlbGVjdGVkXSc6ICduelNlbGVjdGVkJyxcbiAgICAnKGNsaWNrKSc6ICdvbkNsaWNrKCRldmVudCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUcmVlTm9kZU9wdGlvbkNvbXBvbmVudDxUPiBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNlbGVjdGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekRpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56U2VsZWN0ZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RGlzYWJsZWQgPSBmYWxzZTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmVlTm9kZTogTnpUcmVlTm9kZUNvbXBvbmVudDxUPikge31cblxuICBnZXQgaXNFeHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy50cmVlTm9kZS5pc0V4cGFuZGVkO1xuICB9XG5cbiAgb25DbGljayhlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm56RGlzYWJsZWQpIHtcbiAgICAgIHRoaXMubnpDbGljay5lbWl0KGUpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56RGlzYWJsZWQsIG56U2VsZWN0ZWQgfSA9IGNoYW5nZXM7XG4gICAgaWYgKG56RGlzYWJsZWQpIHtcbiAgICAgIGlmIChuekRpc2FibGVkLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICB0aGlzLnRyZWVOb2RlLmRpc2FibGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudHJlZU5vZGUuZW5hYmxlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG56U2VsZWN0ZWQpIHtcbiAgICAgIGlmIChuelNlbGVjdGVkLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICB0aGlzLnRyZWVOb2RlLnNlbGVjdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50cmVlTm9kZS5kZXNlbGVjdCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19