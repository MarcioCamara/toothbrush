/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Directive, Input } from '@angular/core';
import { animationFrameScheduler, asapScheduler, merge } from 'rxjs';
import { auditTime } from 'rxjs/operators';
import { NzTreeNodeComponent } from './node';
import { NzTreeView } from './tree';
import { getNextSibling, getParent } from './utils';
/**
 * [true, false, false, true] => 1001
 */
function booleanArrayToString(arr) {
    return arr.map(i => (i ? 1 : 0)).join('');
}
const BUILD_INDENTS_SCHEDULER = typeof requestAnimationFrame !== 'undefined' ? animationFrameScheduler : asapScheduler;
export class NzTreeNodeIndentsComponent {
    constructor() {
        this.indents = [];
    }
}
NzTreeNodeIndentsComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tree-node-indents',
                template: `
    <span class="ant-tree-indent-unit" [class.ant-tree-indent-unit-end]="!isEnd" *ngFor="let isEnd of indents"></span>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    class: 'ant-tree-indent'
                }
            },] }
];
NzTreeNodeIndentsComponent.propDecorators = {
    indents: [{ type: Input }]
};
export class NzTreeNodeIndentLineDirective {
    constructor(treeNode, tree) {
        this.treeNode = treeNode;
        this.tree = tree;
        this.isLast = 'unset';
        this.isLeaf = false;
        this.preNodeRef = null;
        this.nextNodeRef = null;
        this.currentIndents = '';
        this.buildIndents();
        this.checkLast();
        /**
         * The dependent data (TreeControl.dataNodes) can be set after node instantiation,
         * and setting the indents can cause frame rate loss if it is set too often.
         */
        this.changeSubscription = merge(this.treeNode._dataChanges, tree._dataSourceChanged)
            .pipe(auditTime(0, BUILD_INDENTS_SCHEDULER))
            .subscribe(() => {
            this.buildIndents();
            this.checkAdjacent();
        });
    }
    getIndents() {
        const indents = [];
        const nodes = this.tree.treeControl.dataNodes;
        const getLevel = this.tree.treeControl.getLevel;
        let parent = getParent(nodes, this.treeNode.data, getLevel);
        while (parent) {
            const parentNextSibling = getNextSibling(nodes, parent, getLevel);
            if (parentNextSibling) {
                indents.unshift(true);
            }
            else {
                indents.unshift(false);
            }
            parent = getParent(nodes, parent, getLevel);
        }
        return indents;
    }
    buildIndents() {
        if (this.treeNode.data) {
            const indents = this.getIndents();
            const diffString = booleanArrayToString(indents);
            if (diffString !== this.currentIndents) {
                this.treeNode.setIndents(this.getIndents());
                this.currentIndents = diffString;
            }
        }
    }
    /**
     * We need to add an class name for the last child node,
     * this result can also be affected when the adjacent nodes are changed.
     */
    checkAdjacent() {
        const nodes = this.tree.treeControl.dataNodes;
        const index = nodes.indexOf(this.treeNode.data);
        const preNode = nodes[index - 1] || null;
        const nextNode = nodes[index + 1] || null;
        if (this.nextNodeRef !== nextNode || this.preNodeRef !== preNode) {
            this.checkLast(index);
        }
        this.preNodeRef = preNode;
        this.nextNodeRef = nextNode;
    }
    checkLast(index) {
        const nodes = this.tree.treeControl.dataNodes;
        this.isLeaf = this.treeNode.isLeaf;
        this.isLast = !getNextSibling(nodes, this.treeNode.data, this.tree.treeControl.getLevel, index);
    }
    ngOnDestroy() {
        this.preNodeRef = null;
        this.nextNodeRef = null;
        this.changeSubscription.unsubscribe();
    }
}
NzTreeNodeIndentLineDirective.decorators = [
    { type: Directive, args: [{
                selector: 'nz-tree-node[nzTreeNodeIndentLine]',
                host: {
                    class: 'ant-tree-show-line',
                    '[class.ant-tree-treenode-leaf-last]': 'isLast && isLeaf'
                }
            },] }
];
NzTreeNodeIndentLineDirective.ctorParameters = () => [
    { type: NzTreeNodeComponent },
    { type: NzTreeView }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy90cmVlLXZpZXcvaW5kZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDbkYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRXBDLE9BQU8sRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRXBEOztHQUVHO0FBQ0gsU0FBUyxvQkFBb0IsQ0FBQyxHQUFjO0lBQzFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFFRCxNQUFNLHVCQUF1QixHQUFHLE9BQU8scUJBQXFCLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO0FBWXZILE1BQU0sT0FBTywwQkFBMEI7SUFWdkM7UUFXVyxZQUFPLEdBQWMsRUFBRSxDQUFDO0lBQ25DLENBQUM7OztZQVpBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUU7O0dBRVQ7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9D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LElBQUksQ0FBQyxXQUFXLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssT0FBTyxFQUFFO1lBQ2hFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkI7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztJQUM5QixDQUFDO0lBRU8sU0FBUyxDQUFDLEtBQWM7UUFDOUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xHLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7OztZQXJGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9DQUFvQztnQkFDOUMsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxvQkFBb0I7b0JBQzNCLHFDQUFxQyxFQUFFLGtCQUFrQjtpQkFDMUQ7YUFDRjs7O1lBbENRLG1CQUFtQjtZQUNuQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRGlyZWN0aXZlLCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBhbmltYXRpb25GcmFtZVNjaGVkdWxlciwgYXNhcFNjaGVkdWxlciwgbWVyZ2UsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgYXVkaXRUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTnpUcmVlTm9kZUNvbXBvbmVudCB9IGZyb20gJy4vbm9kZSc7XG5pbXBvcnQgeyBOelRyZWVWaWV3IH0gZnJvbSAnLi90cmVlJztcblxuaW1wb3J0IHsgZ2V0TmV4dFNpYmxpbmcsIGdldFBhcmVudCB9IGZyb20gJy4vdXRpbHMnO1xuXG4vKipcbiAqIFt0cnVlLCBmYWxzZSwgZmFsc2UsIHRydWVdID0+IDEwMDFcbiAqL1xuZnVuY3Rpb24gYm9vbGVhbkFycmF5VG9TdHJpbmcoYXJyOiBib29sZWFuW10pOiBzdHJpbmcge1xuICByZXR1cm4gYXJyLm1hcChpID0+IChpID8gMSA6IDApKS5qb2luKCcnKTtcbn1cblxuY29uc3QgQlVJTERfSU5ERU5UU19TQ0hFRFVMRVIgPSB0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lICE9PSAndW5kZWZpbmVkJyA/IGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyIDogYXNhcFNjaGVkdWxlcjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdHJlZS1ub2RlLWluZGVudHMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzcGFuIGNsYXNzPVwiYW50LXRyZWUtaW5kZW50LXVuaXRcIiBbY2xhc3MuYW50LXRyZWUtaW5kZW50LXVuaXQtZW5kXT1cIiFpc0VuZFwiICpuZ0Zvcj1cImxldCBpc0VuZCBvZiBpbmRlbnRzXCI+PC9zcGFuPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LXRyZWUtaW5kZW50J1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VHJlZU5vZGVJbmRlbnRzQ29tcG9uZW50IHtcbiAgQElucHV0KCkgaW5kZW50czogYm9vbGVhbltdID0gW107XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ256LXRyZWUtbm9kZVtuelRyZWVOb2RlSW5kZW50TGluZV0nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtdHJlZS1zaG93LWxpbmUnLFxuICAgICdbY2xhc3MuYW50LXRyZWUtdHJlZW5vZGUtbGVhZi1sYXN0XSc6ICdpc0xhc3QgJiYgaXNMZWFmJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VHJlZU5vZGVJbmRlbnRMaW5lRGlyZWN0aXZlPFQ+IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgaXNMYXN0OiBib29sZWFuIHwgJ3Vuc2V0JyA9ICd1bnNldCc7XG4gIGlzTGVhZiA9IGZhbHNlO1xuICBwcml2YXRlIHByZU5vZGVSZWY6IFQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBuZXh0Tm9kZVJlZjogVCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGN1cnJlbnRJbmRlbnRzOiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSBjaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyZWVOb2RlOiBOelRyZWVOb2RlQ29tcG9uZW50PFQ+LCBwcml2YXRlIHRyZWU6IE56VHJlZVZpZXc8VD4pIHtcbiAgICB0aGlzLmJ1aWxkSW5kZW50cygpO1xuICAgIHRoaXMuY2hlY2tMYXN0KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZGVwZW5kZW50IGRhdGEgKFRyZWVDb250cm9sLmRhdGFOb2RlcykgY2FuIGJlIHNldCBhZnRlciBub2RlIGluc3RhbnRpYXRpb24sXG4gICAgICogYW5kIHNldHRpbmcgdGhlIGluZGVudHMgY2FuIGNhdXNlIGZyYW1lIHJhdGUgbG9zcyBpZiBpdCBpcyBzZXQgdG9vIG9mdGVuLlxuICAgICAqL1xuICAgIHRoaXMuY2hhbmdlU3Vic2NyaXB0aW9uID0gbWVyZ2UodGhpcy50cmVlTm9kZS5fZGF0YUNoYW5nZXMsIHRyZWUuX2RhdGFTb3VyY2VDaGFuZ2VkKVxuICAgICAgLnBpcGUoYXVkaXRUaW1lKDAsIEJVSUxEX0lOREVOVFNfU0NIRURVTEVSKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmJ1aWxkSW5kZW50cygpO1xuICAgICAgICB0aGlzLmNoZWNrQWRqYWNlbnQoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRJbmRlbnRzKCk6IGJvb2xlYW5bXSB7XG4gICAgY29uc3QgaW5kZW50cyA9IFtdO1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy50cmVlLnRyZWVDb250cm9sLmRhdGFOb2RlcztcbiAgICBjb25zdCBnZXRMZXZlbCA9IHRoaXMudHJlZS50cmVlQ29udHJvbC5nZXRMZXZlbDtcbiAgICBsZXQgcGFyZW50ID0gZ2V0UGFyZW50KG5vZGVzLCB0aGlzLnRyZWVOb2RlLmRhdGEsIGdldExldmVsKTtcbiAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICBjb25zdCBwYXJlbnROZXh0U2libGluZyA9IGdldE5leHRTaWJsaW5nKG5vZGVzLCBwYXJlbnQsIGdldExldmVsKTtcbiAgICAgIGlmIChwYXJlbnROZXh0U2libGluZykge1xuICAgICAgICBpbmRlbnRzLnVuc2hpZnQodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRlbnRzLnVuc2hpZnQoZmFsc2UpO1xuICAgICAgfVxuICAgICAgcGFyZW50ID0gZ2V0UGFyZW50KG5vZGVzLCBwYXJlbnQsIGdldExldmVsKTtcbiAgICB9XG4gICAgcmV0dXJuIGluZGVudHM7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkSW5kZW50cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50cmVlTm9kZS5kYXRhKSB7XG4gICAgICBjb25zdCBpbmRlbnRzID0gdGhpcy5nZXRJbmRlbnRzKCk7XG4gICAgICBjb25zdCBkaWZmU3RyaW5nID0gYm9vbGVhbkFycmF5VG9TdHJpbmcoaW5kZW50cyk7XG4gICAgICBpZiAoZGlmZlN0cmluZyAhPT0gdGhpcy5jdXJyZW50SW5kZW50cykge1xuICAgICAgICB0aGlzLnRyZWVOb2RlLnNldEluZGVudHModGhpcy5nZXRJbmRlbnRzKCkpO1xuICAgICAgICB0aGlzLmN1cnJlbnRJbmRlbnRzID0gZGlmZlN0cmluZztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV2UgbmVlZCB0byBhZGQgYW4gY2xhc3MgbmFtZSBmb3IgdGhlIGxhc3QgY2hpbGQgbm9kZSxcbiAgICogdGhpcyByZXN1bHQgY2FuIGFsc28gYmUgYWZmZWN0ZWQgd2hlbiB0aGUgYWRqYWNlbnQgbm9kZXMgYXJlIGNoYW5nZWQuXG4gICAqL1xuICBwcml2YXRlIGNoZWNrQWRqYWNlbnQoKTogdm9pZCB7XG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZGF0YU5vZGVzO1xuICAgIGNvbnN0IGluZGV4ID0gbm9kZXMuaW5kZXhPZih0aGlzLnRyZWVOb2RlLmRhdGEpO1xuICAgIGNvbnN0IHByZU5vZGUgPSBub2Rlc1tpbmRleCAtIDFdIHx8IG51bGw7XG4gICAgY29uc3QgbmV4dE5vZGUgPSBub2Rlc1tpbmRleCArIDFdIHx8IG51bGw7XG4gICAgaWYgKHRoaXMubmV4dE5vZGVSZWYgIT09IG5leHROb2RlIHx8IHRoaXMucHJlTm9kZVJlZiAhPT0gcHJlTm9kZSkge1xuICAgICAgdGhpcy5jaGVja0xhc3QoaW5kZXgpO1xuICAgIH1cbiAgICB0aGlzLnByZU5vZGVSZWYgPSBwcmVOb2RlO1xuICAgIHRoaXMubmV4dE5vZGVSZWYgPSBuZXh0Tm9kZTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tMYXN0KGluZGV4PzogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZGF0YU5vZGVzO1xuICAgIHRoaXMuaXNMZWFmID0gdGhpcy50cmVlTm9kZS5pc0xlYWY7XG4gICAgdGhpcy5pc0xhc3QgPSAhZ2V0TmV4dFNpYmxpbmcobm9kZXMsIHRoaXMudHJlZU5vZGUuZGF0YSwgdGhpcy50cmVlLnRyZWVDb250cm9sLmdldExldmVsLCBpbmRleCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnByZU5vZGVSZWYgPSBudWxsO1xuICAgIHRoaXMubmV4dE5vZGVSZWYgPSBudWxsO1xuICAgIHRoaXMuY2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==