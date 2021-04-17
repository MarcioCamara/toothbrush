/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { CdkTree, CdkTreeNodeOutletContext } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { warnDeprecation } from 'ng-zorro-antd/core/logger';
import { NzTreeNodeOutletDirective } from './outlet';
import { NzTreeView } from './tree';
const DEFAULT_SIZE = 28;
export class NzTreeVirtualScrollViewComponent extends NzTreeView {
    constructor() {
        super(...arguments);
        this.itemSize = DEFAULT_SIZE;
        /**
         * @deprecated use `nzItemSize` instead
         * @breaking-change 12.0.0
         */
        this.nzNodeWidth = DEFAULT_SIZE;
        this.nzItemSize = DEFAULT_SIZE;
        this.nzMinBufferPx = DEFAULT_SIZE * 5;
        this.nzMaxBufferPx = DEFAULT_SIZE * 10;
        this.nodes = [];
    }
    renderNodeChanges(data) {
        this.nodes = new Array(...data).map((n, i) => this.createNode(n, i));
    }
    createNode(nodeData, index) {
        const node = this._getNodeDef(nodeData, index);
        const context = new CdkTreeNodeOutletContext(nodeData);
        if (this.treeControl.getLevel) {
            context.level = this.treeControl.getLevel(nodeData);
        }
        else {
            context.level = 0;
        }
        return {
            data: nodeData,
            context,
            nodeDef: node
        };
    }
    ngOnChanges(changes) {
        const { nzNodeWidth, nzItemSize } = changes;
        if (nzNodeWidth) {
            warnDeprecation('`nzNodeWidth` in nz-tree-virtual-scroll-view will be removed in 12.0.0, please use `nzItemSize` instead.');
            this.itemSize = nzNodeWidth.currentValue;
        }
        if (nzItemSize) {
            this.itemSize = nzItemSize.currentValue;
        }
    }
}
NzTreeVirtualScrollViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tree-virtual-scroll-view',
                exportAs: 'nzTreeVirtualScrollView',
                template: `
    <div class="ant-tree-list">
      <cdk-virtual-scroll-viewport
        class="ant-tree-list-holder"
        [itemSize]="itemSize"
        [minBufferPx]="nzMinBufferPx"
        [maxBufferPx]="nzMaxBufferPx"
      >
        <ng-container *cdkVirtualFor="let item of nodes; let i = index">
          <ng-template nzTreeVirtualScrollNodeOutlet [data]="item"></ng-template>
        </ng-container>
      </cdk-virtual-scroll-viewport>
    </div>
    <ng-container nzTreeNodeOutlet></ng-container>
  `,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    { provide: NzTreeView, useExisting: NzTreeVirtualScrollViewComponent },
                    { provide: CdkTree, useExisting: NzTreeVirtualScrollViewComponent }
                ],
                host: {
                    class: 'ant-tree',
                    '[class.ant-tree-block-node]': 'nzDirectoryTree || nzBlockNode',
                    '[class.ant-tree-directory]': 'nzDirectoryTree',
                    '[class.ant-tree-rtl]': `dir === 'rtl'`
                }
            },] }
];
NzTreeVirtualScrollViewComponent.propDecorators = {
    nodeOutlet: [{ type: ViewChild, args: [NzTreeNodeOutletDirective, { static: true },] }],
    virtualScrollViewport: [{ type: ViewChild, args: [CdkVirtualScrollViewport, { static: true },] }],
    nzNodeWidth: [{ type: Input }],
    nzItemSize: [{ type: Input }],
    nzMinBufferPx: [{ type: Input }],
    nzMaxBufferPx: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aXJ0dWFsLXNjcm9sbC12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy90cmVlLXZpZXcvdHJlZS12aXJ0dWFsLXNjcm9sbC12aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xJLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUc1RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUVwQyxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7QUFpQ3hCLE1BQU0sT0FBTyxnQ0FBb0MsU0FBUSxVQUFhO0lBL0J0RTs7UUFnQ0UsYUFBUSxHQUFHLFlBQVksQ0FBQztRQUt4Qjs7O1dBR0c7UUFDTSxnQkFBVyxHQUFHLFlBQVksQ0FBQztRQUUzQixlQUFVLEdBQUcsWUFBWSxDQUFDO1FBQzFCLGtCQUFhLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQyxrQkFBYSxHQUFHLFlBQVksR0FBRyxFQUFFLENBQUM7UUFFM0MsVUFBSyxHQUFvQyxFQUFFLENBQUM7SUErQjlDLENBQUM7SUE3QkMsaUJBQWlCLENBQUMsSUFBNEI7UUFDNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVPLFVBQVUsQ0FBQyxRQUFXLEVBQUUsS0FBYTtRQUMzQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQyxNQUFNLE9BQU8sR0FBRyxJQUFJLHdCQUF3QixDQUFJLFFBQVEsQ0FBQyxDQUFDO1FBQzFELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUU7WUFDN0IsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNyRDthQUFNO1lBQ0wsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDbkI7UUFDRCxPQUFPO1lBQ0wsSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPO1lBQ1AsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUM1QyxJQUFJLFdBQVcsRUFBRTtZQUNmLGVBQWUsQ0FBQywwR0FBMEcsQ0FBQyxDQUFDO1lBQzVILElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQztTQUMxQztRQUNELElBQUksVUFBVSxFQUFFO1lBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQzs7O1lBN0VGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2QyxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0dBY1Q7Z0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxTQUFTLEVBQUU7b0JBQ1QsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxnQ0FBZ0MsRUFBRTtvQkFDdEUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxnQ0FBZ0MsRUFBRTtpQkFDcEU7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxVQUFVO29CQUNqQiw2QkFBNkIsRUFBRSxnQ0FBZ0M7b0JBQy9ELDRCQUE0QixFQUFFLGlCQUFpQjtvQkFDL0Msc0JBQXNCLEVBQUUsZUFBZTtpQkFDeEM7YUFDRjs7O3lCQUlFLFNBQVMsU0FBQyx5QkFBeUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7b0NBQ3JELFNBQVMsU0FBQyx3QkFBd0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7MEJBTXBELEtBQUs7eUJBRUwsS0FBSzs0QkFDTCxLQUFLOzRCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IENka1RyZWUsIENka1RyZWVOb2RlT3V0bGV0Q29udGV4dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90cmVlJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHdhcm5EZXByZWNhdGlvbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9sb2dnZXInO1xuXG5pbXBvcnQgeyBOelRyZWVWaXJ0dWFsTm9kZURhdGEgfSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHsgTnpUcmVlTm9kZU91dGxldERpcmVjdGl2ZSB9IGZyb20gJy4vb3V0bGV0JztcblxuaW1wb3J0IHsgTnpUcmVlVmlldyB9IGZyb20gJy4vdHJlZSc7XG5cbmNvbnN0IERFRkFVTFRfU0laRSA9IDI4O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei10cmVlLXZpcnR1YWwtc2Nyb2xsLXZpZXcnLFxuICBleHBvcnRBczogJ256VHJlZVZpcnR1YWxTY3JvbGxWaWV3JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYW50LXRyZWUtbGlzdFwiPlxuICAgICAgPGNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydFxuICAgICAgICBjbGFzcz1cImFudC10cmVlLWxpc3QtaG9sZGVyXCJcbiAgICAgICAgW2l0ZW1TaXplXT1cIml0ZW1TaXplXCJcbiAgICAgICAgW21pbkJ1ZmZlclB4XT1cIm56TWluQnVmZmVyUHhcIlxuICAgICAgICBbbWF4QnVmZmVyUHhdPVwibnpNYXhCdWZmZXJQeFwiXG4gICAgICA+XG4gICAgICAgIDxuZy1jb250YWluZXIgKmNka1ZpcnR1YWxGb3I9XCJsZXQgaXRlbSBvZiBub2RlczsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuelRyZWVWaXJ0dWFsU2Nyb2xsTm9kZU91dGxldCBbZGF0YV09XCJpdGVtXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2Nkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydD5cbiAgICA8L2Rpdj5cbiAgICA8bmctY29udGFpbmVyIG56VHJlZU5vZGVPdXRsZXQ+PC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IE56VHJlZVZpZXcsIHVzZUV4aXN0aW5nOiBOelRyZWVWaXJ0dWFsU2Nyb2xsVmlld0NvbXBvbmVudCB9LFxuICAgIHsgcHJvdmlkZTogQ2RrVHJlZSwgdXNlRXhpc3Rpbmc6IE56VHJlZVZpcnR1YWxTY3JvbGxWaWV3Q29tcG9uZW50IH1cbiAgXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LXRyZWUnLFxuICAgICdbY2xhc3MuYW50LXRyZWUtYmxvY2stbm9kZV0nOiAnbnpEaXJlY3RvcnlUcmVlIHx8IG56QmxvY2tOb2RlJyxcbiAgICAnW2NsYXNzLmFudC10cmVlLWRpcmVjdG9yeV0nOiAnbnpEaXJlY3RvcnlUcmVlJyxcbiAgICAnW2NsYXNzLmFudC10cmVlLXJ0bF0nOiBgZGlyID09PSAncnRsJ2BcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRyZWVWaXJ0dWFsU2Nyb2xsVmlld0NvbXBvbmVudDxUPiBleHRlbmRzIE56VHJlZVZpZXc8VD4gaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBpdGVtU2l6ZSA9IERFRkFVTFRfU0laRTtcblxuICBAVmlld0NoaWxkKE56VHJlZU5vZGVPdXRsZXREaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlIH0pIHJlYWRvbmx5IG5vZGVPdXRsZXQhOiBOelRyZWVOb2RlT3V0bGV0RGlyZWN0aXZlO1xuICBAVmlld0NoaWxkKENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCwgeyBzdGF0aWM6IHRydWUgfSkgcmVhZG9ubHkgdmlydHVhbFNjcm9sbFZpZXdwb3J0ITogQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0O1xuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCB1c2UgYG56SXRlbVNpemVgIGluc3RlYWRcbiAgICogQGJyZWFraW5nLWNoYW5nZSAxMi4wLjBcbiAgICovXG4gIEBJbnB1dCgpIG56Tm9kZVdpZHRoID0gREVGQVVMVF9TSVpFO1xuXG4gIEBJbnB1dCgpIG56SXRlbVNpemUgPSBERUZBVUxUX1NJWkU7XG4gIEBJbnB1dCgpIG56TWluQnVmZmVyUHggPSBERUZBVUxUX1NJWkUgKiA1O1xuICBASW5wdXQoKSBuek1heEJ1ZmZlclB4ID0gREVGQVVMVF9TSVpFICogMTA7XG5cbiAgbm9kZXM6IEFycmF5PE56VHJlZVZpcnR1YWxOb2RlRGF0YTxUPj4gPSBbXTtcblxuICByZW5kZXJOb2RlQ2hhbmdlcyhkYXRhOiBUW10gfCBSZWFkb25seUFycmF5PFQ+KTogdm9pZCB7XG4gICAgdGhpcy5ub2RlcyA9IG5ldyBBcnJheSguLi5kYXRhKS5tYXAoKG4sIGkpID0+IHRoaXMuY3JlYXRlTm9kZShuLCBpKSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU5vZGUobm9kZURhdGE6IFQsIGluZGV4OiBudW1iZXIpOiBOelRyZWVWaXJ0dWFsTm9kZURhdGE8VD4ge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLl9nZXROb2RlRGVmKG5vZGVEYXRhLCBpbmRleCk7XG4gICAgY29uc3QgY29udGV4dCA9IG5ldyBDZGtUcmVlTm9kZU91dGxldENvbnRleHQ8VD4obm9kZURhdGEpO1xuICAgIGlmICh0aGlzLnRyZWVDb250cm9sLmdldExldmVsKSB7XG4gICAgICBjb250ZXh0LmxldmVsID0gdGhpcy50cmVlQ29udHJvbC5nZXRMZXZlbChub2RlRGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRleHQubGV2ZWwgPSAwO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogbm9kZURhdGEsXG4gICAgICBjb250ZXh0LFxuICAgICAgbm9kZURlZjogbm9kZVxuICAgIH07XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuek5vZGVXaWR0aCwgbnpJdGVtU2l6ZSB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpOb2RlV2lkdGgpIHtcbiAgICAgIHdhcm5EZXByZWNhdGlvbignYG56Tm9kZVdpZHRoYCBpbiBuei10cmVlLXZpcnR1YWwtc2Nyb2xsLXZpZXcgd2lsbCBiZSByZW1vdmVkIGluIDEyLjAuMCwgcGxlYXNlIHVzZSBgbnpJdGVtU2l6ZWAgaW5zdGVhZC4nKTtcbiAgICAgIHRoaXMuaXRlbVNpemUgPSBuek5vZGVXaWR0aC5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChuekl0ZW1TaXplKSB7XG4gICAgICB0aGlzLml0ZW1TaXplID0gbnpJdGVtU2l6ZS5jdXJyZW50VmFsdWU7XG4gICAgfVxuICB9XG59XG4iXX0=