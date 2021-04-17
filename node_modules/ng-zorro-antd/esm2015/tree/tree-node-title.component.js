/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd/core/tree';
export class NzTreeNodeTitleComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.treeTemplate = null;
        this.selectMode = false;
        // Drag indicator
        this.showIndicator = true;
    }
    get canDraggable() {
        return this.draggable && !this.isDisabled ? true : null;
    }
    get matchedValue() {
        return this.isMatched ? this.searchValue : '';
    }
    get isSwitcherOpen() {
        return this.isExpanded && !this.isLeaf;
    }
    get isSwitcherClose() {
        return !this.isExpanded && !this.isLeaf;
    }
    ngOnChanges(changes) {
        const { showIndicator, dragPosition } = changes;
        if (showIndicator || dragPosition) {
            this.cdr.markForCheck();
        }
    }
}
NzTreeNodeTitleComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tree-node-title',
                template: `
    <ng-template [ngTemplateOutlet]="treeTemplate" [ngTemplateOutletContext]="{ $implicit: context, origin: context.origin }"></ng-template>
    <ng-container *ngIf="!treeTemplate">
      <span
        *ngIf="icon && showIcon"
        [class.ant-tree-icon__open]="isSwitcherOpen"
        [class.ant-tree-icon__close]="isSwitcherClose"
        [class.ant-tree-icon_loading]="isLoading"
        [class.ant-select-tree-iconEle]="selectMode"
        [class.ant-tree-iconEle]="!selectMode"
      >
        <span
          [class.ant-select-tree-iconEle]="selectMode"
          [class.ant-select-tree-icon__customize]="selectMode"
          [class.ant-tree-iconEle]="!selectMode"
          [class.ant-tree-icon__customize]="!selectMode"
        >
          <i nz-icon *ngIf="icon" [nzType]="icon"></i>
        </span>
      </span>
      <span class="ant-tree-title" [innerHTML]="title | nzHighlight: matchedValue:'i':'font-highlight'"></span>
      <nz-tree-drop-indicator *ngIf="showIndicator" [dropPosition]="dragPosition" [level]="context.level"></nz-tree-drop-indicator>
    </ng-container>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                host: {
                    '[attr.title]': 'title',
                    '[attr.draggable]': 'canDraggable',
                    '[attr.aria-grabbed]': 'canDraggable',
                    '[class.draggable]': 'canDraggable',
                    '[class.ant-select-tree-node-content-wrapper]': `selectMode`,
                    '[class.ant-select-tree-node-content-wrapper-open]': `selectMode && isSwitcherOpen`,
                    '[class.ant-select-tree-node-content-wrapper-close]': `selectMode && isSwitcherClose`,
                    '[class.ant-select-tree-node-selected]': `selectMode && isSelected`,
                    '[class.ant-tree-node-content-wrapper]': `!selectMode`,
                    '[class.ant-tree-node-content-wrapper-open]': `!selectMode && isSwitcherOpen`,
                    '[class.ant-tree-node-content-wrapper-close]': `!selectMode && isSwitcherClose`,
                    '[class.ant-tree-node-selected]': `!selectMode && isSelected`
                }
            },] }
];
NzTreeNodeTitleComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
NzTreeNodeTitleComponent.propDecorators = {
    searchValue: [{ type: Input }],
    treeTemplate: [{ type: Input }],
    draggable: [{ type: Input }],
    showIcon: [{ type: Input }],
    selectMode: [{ type: Input }],
    context: [{ type: Input }],
    icon: [{ type: Input }],
    title: [{ type: Input }],
    isLoading: [{ type: Input }],
    isSelected: [{ type: Input }],
    isDisabled: [{ type: Input }],
    isMatched: [{ type: Input }],
    isExpanded: [{ type: Input }],
    isLeaf: [{ type: Input }],
    showIndicator: [{ type: Input }],
    dragPosition: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLXRpdGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvdHJlZS90cmVlLW5vZGUtdGl0bGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF5QyxNQUFNLGVBQWUsQ0FBQztBQUNwSSxPQUFPLEVBQUUsVUFBVSxFQUFxQixNQUFNLHlCQUF5QixDQUFDO0FBNkN4RSxNQUFNLE9BQU8sd0JBQXdCO0lBbUNuQyxZQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWpDakMsaUJBQVksR0FBNkUsSUFBSSxDQUFDO1FBRzlGLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFVNUIsaUJBQWlCO1FBQ1Isa0JBQWEsR0FBRyxJQUFJLENBQUM7SUFtQmUsQ0FBQztJQWhCOUMsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDMUQsQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN6QyxDQUFDO0lBRUQsSUFBSSxlQUFlO1FBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMxQyxDQUFDO0lBSUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ2hELElBQUksYUFBYSxJQUFJLFlBQVksRUFBRTtZQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQzs7O1lBckZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJUO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixJQUFJLEVBQUU7b0JBQ0osY0FBYyxFQUFFLE9BQU87b0JBQ3ZCLGtCQUFrQixFQUFFLGNBQWM7b0JBQ2xDLHFCQUFxQixFQUFFLGNBQWM7b0JBQ3JDLG1CQUFtQixFQUFFLGNBQWM7b0JBQ25DLDhDQUE4QyxFQUFFLFlBQVk7b0JBQzVELG1EQUFtRCxFQUFFLDhCQUE4QjtvQkFDbkYsb0RBQW9ELEVBQUUsK0JBQStCO29CQUNyRix1Q0FBdUMsRUFBRSwwQkFBMEI7b0JBQ25FLHVDQUF1QyxFQUFFLGFBQWE7b0JBQ3RELDRDQUE0QyxFQUFFLCtCQUErQjtvQkFDN0UsNkNBQTZDLEVBQUUsZ0NBQWdDO29CQUMvRSxnQ0FBZ0MsRUFBRSwyQkFBMkI7aUJBQzlEO2FBQ0Y7OztZQTdDaUMsaUJBQWlCOzs7MEJBK0NoRCxLQUFLOzJCQUNMLEtBQUs7d0JBQ0wsS0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7c0JBQ0wsS0FBSzttQkFDTCxLQUFLO29CQUNMLEtBQUs7d0JBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7d0JBQ0wsS0FBSzt5QkFDTCxLQUFLO3FCQUNMLEtBQUs7NEJBRUwsS0FBSzsyQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOelRyZWVOb2RlLCBOelRyZWVOb2RlT3B0aW9ucyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90cmVlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdHJlZS1ub2RlLXRpdGxlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidHJlZVRlbXBsYXRlXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBjb250ZXh0LCBvcmlnaW46IGNvbnRleHQub3JpZ2luIH1cIj48L25nLXRlbXBsYXRlPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdHJlZVRlbXBsYXRlXCI+XG4gICAgICA8c3BhblxuICAgICAgICAqbmdJZj1cImljb24gJiYgc2hvd0ljb25cIlxuICAgICAgICBbY2xhc3MuYW50LXRyZWUtaWNvbl9fb3Blbl09XCJpc1N3aXRjaGVyT3BlblwiXG4gICAgICAgIFtjbGFzcy5hbnQtdHJlZS1pY29uX19jbG9zZV09XCJpc1N3aXRjaGVyQ2xvc2VcIlxuICAgICAgICBbY2xhc3MuYW50LXRyZWUtaWNvbl9sb2FkaW5nXT1cImlzTG9hZGluZ1wiXG4gICAgICAgIFtjbGFzcy5hbnQtc2VsZWN0LXRyZWUtaWNvbkVsZV09XCJzZWxlY3RNb2RlXCJcbiAgICAgICAgW2NsYXNzLmFudC10cmVlLWljb25FbGVdPVwiIXNlbGVjdE1vZGVcIlxuICAgICAgPlxuICAgICAgICA8c3BhblxuICAgICAgICAgIFtjbGFzcy5hbnQtc2VsZWN0LXRyZWUtaWNvbkVsZV09XCJzZWxlY3RNb2RlXCJcbiAgICAgICAgICBbY2xhc3MuYW50LXNlbGVjdC10cmVlLWljb25fX2N1c3RvbWl6ZV09XCJzZWxlY3RNb2RlXCJcbiAgICAgICAgICBbY2xhc3MuYW50LXRyZWUtaWNvbkVsZV09XCIhc2VsZWN0TW9kZVwiXG4gICAgICAgICAgW2NsYXNzLmFudC10cmVlLWljb25fX2N1c3RvbWl6ZV09XCIhc2VsZWN0TW9kZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8aSBuei1pY29uICpuZ0lmPVwiaWNvblwiIFtuelR5cGVdPVwiaWNvblwiPjwvaT5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtdHJlZS10aXRsZVwiIFtpbm5lckhUTUxdPVwidGl0bGUgfCBuekhpZ2hsaWdodDogbWF0Y2hlZFZhbHVlOidpJzonZm9udC1oaWdobGlnaHQnXCI+PC9zcGFuPlxuICAgICAgPG56LXRyZWUtZHJvcC1pbmRpY2F0b3IgKm5nSWY9XCJzaG93SW5kaWNhdG9yXCIgW2Ryb3BQb3NpdGlvbl09XCJkcmFnUG9zaXRpb25cIiBbbGV2ZWxdPVwiY29udGV4dC5sZXZlbFwiPjwvbnotdHJlZS1kcm9wLWluZGljYXRvcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBob3N0OiB7XG4gICAgJ1thdHRyLnRpdGxlXSc6ICd0aXRsZScsXG4gICAgJ1thdHRyLmRyYWdnYWJsZV0nOiAnY2FuRHJhZ2dhYmxlJyxcbiAgICAnW2F0dHIuYXJpYS1ncmFiYmVkXSc6ICdjYW5EcmFnZ2FibGUnLFxuICAgICdbY2xhc3MuZHJhZ2dhYmxlXSc6ICdjYW5EcmFnZ2FibGUnLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC10cmVlLW5vZGUtY29udGVudC13cmFwcGVyXSc6IGBzZWxlY3RNb2RlYCxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtdHJlZS1ub2RlLWNvbnRlbnQtd3JhcHBlci1vcGVuXSc6IGBzZWxlY3RNb2RlICYmIGlzU3dpdGNoZXJPcGVuYCxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtdHJlZS1ub2RlLWNvbnRlbnQtd3JhcHBlci1jbG9zZV0nOiBgc2VsZWN0TW9kZSAmJiBpc1N3aXRjaGVyQ2xvc2VgLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC10cmVlLW5vZGUtc2VsZWN0ZWRdJzogYHNlbGVjdE1vZGUgJiYgaXNTZWxlY3RlZGAsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZS1ub2RlLWNvbnRlbnQtd3JhcHBlcl0nOiBgIXNlbGVjdE1vZGVgLFxuICAgICdbY2xhc3MuYW50LXRyZWUtbm9kZS1jb250ZW50LXdyYXBwZXItb3Blbl0nOiBgIXNlbGVjdE1vZGUgJiYgaXNTd2l0Y2hlck9wZW5gLFxuICAgICdbY2xhc3MuYW50LXRyZWUtbm9kZS1jb250ZW50LXdyYXBwZXItY2xvc2VdJzogYCFzZWxlY3RNb2RlICYmIGlzU3dpdGNoZXJDbG9zZWAsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZS1ub2RlLXNlbGVjdGVkXSc6IGAhc2VsZWN0TW9kZSAmJiBpc1NlbGVjdGVkYFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VHJlZU5vZGVUaXRsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIHNlYXJjaFZhbHVlITogc3RyaW5nO1xuICBASW5wdXQoKSB0cmVlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBOelRyZWVOb2RlOyBvcmlnaW46IE56VHJlZU5vZGVPcHRpb25zIH0+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGRyYWdnYWJsZSE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNob3dJY29uITogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VsZWN0TW9kZSA9IGZhbHNlO1xuICBASW5wdXQoKSBjb250ZXh0ITogTnpUcmVlTm9kZTtcbiAgQElucHV0KCkgaWNvbiE6IHN0cmluZztcbiAgQElucHV0KCkgdGl0bGUhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGlzTG9hZGluZyE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGlzU2VsZWN0ZWQhOiBib29sZWFuO1xuICBASW5wdXQoKSBpc0Rpc2FibGVkITogYm9vbGVhbjtcbiAgQElucHV0KCkgaXNNYXRjaGVkITogYm9vbGVhbjtcbiAgQElucHV0KCkgaXNFeHBhbmRlZCE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGlzTGVhZiE6IGJvb2xlYW47XG4gIC8vIERyYWcgaW5kaWNhdG9yXG4gIEBJbnB1dCgpIHNob3dJbmRpY2F0b3IgPSB0cnVlO1xuICBASW5wdXQoKSBkcmFnUG9zaXRpb24/OiBudW1iZXI7XG5cbiAgZ2V0IGNhbkRyYWdnYWJsZSgpOiBib29sZWFuIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZHJhZ2dhYmxlICYmICF0aGlzLmlzRGlzYWJsZWQgPyB0cnVlIDogbnVsbDtcbiAgfVxuXG4gIGdldCBtYXRjaGVkVmFsdWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pc01hdGNoZWQgPyB0aGlzLnNlYXJjaFZhbHVlIDogJyc7XG4gIH1cblxuICBnZXQgaXNTd2l0Y2hlck9wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNFeHBhbmRlZCAmJiAhdGhpcy5pc0xlYWY7XG4gIH1cblxuICBnZXQgaXNTd2l0Y2hlckNsb3NlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pc0V4cGFuZGVkICYmICF0aGlzLmlzTGVhZjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBzaG93SW5kaWNhdG9yLCBkcmFnUG9zaXRpb24gfSA9IGNoYW5nZXM7XG4gICAgaWYgKHNob3dJbmRpY2F0b3IgfHwgZHJhZ1Bvc2l0aW9uKSB7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==