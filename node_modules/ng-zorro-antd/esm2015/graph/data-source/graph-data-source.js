/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, merge } from 'rxjs';
import { map } from 'rxjs/operators';
export class NzGraphData {
    constructor(source) {
        var _a;
        this._data = new BehaviorSubject({});
        /** A selection model with multi-selection to track expansion status. */
        this.expansionModel = new SelectionModel(true);
        if (source) {
            (_a = this.expansionModel) === null || _a === void 0 ? void 0 : _a.clear();
            this.dataSource = source;
            this._data.next(source);
        }
    }
    /** Toggles one single data node's expanded/collapsed state. */
    toggle(nodeName) {
        this.expansionModel.toggle(nodeName);
    }
    /** Expands one single data node. */
    expand(nodeName) {
        this.expansionModel.select(nodeName);
    }
    /** Collapses one single data node. */
    collapse(nodeName) {
        this.expansionModel.deselect(nodeName);
    }
    /** Whether a given data node is expanded or not. Returns true if the data node is expanded. */
    isExpanded(nodeName) {
        return this.expansionModel.isSelected(nodeName);
    }
    /** Collapse all dataNodes in the tree. */
    collapseAll() {
        this.expansionModel.clear();
    }
    expandAll() {
        this.expansionModel.select(...Object.keys(this._data.value.compound || {}));
    }
    setData(data) {
        var _a;
        (_a = this.expansionModel) === null || _a === void 0 ? void 0 : _a.clear();
        this.dataSource = data;
        this._data.next(data);
    }
    connect() {
        const changes = [this._data, this.expansionModel.changed];
        return merge(...changes).pipe(map(() => this._data.value));
    }
    disconnect() {
        // do nothing for now
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGgtZGF0YS1zb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2dyYXBoL2RhdGEtc291cmNlL2dyYXBoLWRhdGEtc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUMxRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJckMsTUFBTSxPQUFPLFdBQVc7SUF5Q3RCLFlBQVksTUFBdUI7O1FBeEMzQixVQUFLLEdBQUcsSUFBSSxlQUFlLENBQWlCLEVBQW9CLENBQUMsQ0FBQztRQUUxRSx3RUFBd0U7UUFDeEUsbUJBQWMsR0FBMkIsSUFBSSxjQUFjLENBQVMsSUFBSSxDQUFDLENBQUM7UUFzQ3hFLElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBQSxJQUFJLENBQUMsY0FBYywwQ0FBRSxLQUFLLEdBQUc7WUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7WUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBekNELCtEQUErRDtJQUMvRCxNQUFNLENBQUMsUUFBZ0I7UUFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELG9DQUFvQztJQUNwQyxNQUFNLENBQUMsUUFBZ0I7UUFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELHNDQUFzQztJQUN0QyxRQUFRLENBQUMsUUFBZ0I7UUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELCtGQUErRjtJQUMvRixVQUFVLENBQUMsUUFBZ0I7UUFDekIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsMENBQTBDO0lBQzFDLFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBb0I7O1FBQzFCLE1BQUEsSUFBSSxDQUFDLGNBQWMsMENBQUUsS0FBSyxHQUFHO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFVRCxPQUFPO1FBQ0wsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUQsT0FBTyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsVUFBVTtRQUNSLHFCQUFxQjtJQUN2QixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIG1lcmdlLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOekdyYXBoRGF0YURlZiB9IGZyb20gJy4uL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBOekdyYXBoQmFzZVNvdXJjZSB9IGZyb20gJy4vYmFzZS1ncmFwaC1zb3VyY2UnO1xuXG5leHBvcnQgY2xhc3MgTnpHcmFwaERhdGEgaW1wbGVtZW50cyBOekdyYXBoQmFzZVNvdXJjZTxOekdyYXBoRGF0YURlZiwgc3RyaW5nPiB7XG4gIHByaXZhdGUgX2RhdGEgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE56R3JhcGhEYXRhRGVmPih7fSBhcyBOekdyYXBoRGF0YURlZik7XG4gIGRhdGFTb3VyY2UhOiBOekdyYXBoRGF0YURlZjtcbiAgLyoqIEEgc2VsZWN0aW9uIG1vZGVsIHdpdGggbXVsdGktc2VsZWN0aW9uIHRvIHRyYWNrIGV4cGFuc2lvbiBzdGF0dXMuICovXG4gIGV4cGFuc2lvbk1vZGVsOiBTZWxlY3Rpb25Nb2RlbDxzdHJpbmc+ID0gbmV3IFNlbGVjdGlvbk1vZGVsPHN0cmluZz4odHJ1ZSk7XG5cbiAgLyoqIFRvZ2dsZXMgb25lIHNpbmdsZSBkYXRhIG5vZGUncyBleHBhbmRlZC9jb2xsYXBzZWQgc3RhdGUuICovXG4gIHRvZ2dsZShub2RlTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5leHBhbnNpb25Nb2RlbC50b2dnbGUobm9kZU5hbWUpO1xuICB9XG5cbiAgLyoqIEV4cGFuZHMgb25lIHNpbmdsZSBkYXRhIG5vZGUuICovXG4gIGV4cGFuZChub2RlTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5leHBhbnNpb25Nb2RlbC5zZWxlY3Qobm9kZU5hbWUpO1xuICB9XG5cbiAgLyoqIENvbGxhcHNlcyBvbmUgc2luZ2xlIGRhdGEgbm9kZS4gKi9cbiAgY29sbGFwc2Uobm9kZU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZXhwYW5zaW9uTW9kZWwuZGVzZWxlY3Qobm9kZU5hbWUpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgYSBnaXZlbiBkYXRhIG5vZGUgaXMgZXhwYW5kZWQgb3Igbm90LiBSZXR1cm5zIHRydWUgaWYgdGhlIGRhdGEgbm9kZSBpcyBleHBhbmRlZC4gKi9cbiAgaXNFeHBhbmRlZChub2RlTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZXhwYW5zaW9uTW9kZWwuaXNTZWxlY3RlZChub2RlTmFtZSk7XG4gIH1cblxuICAvKiogQ29sbGFwc2UgYWxsIGRhdGFOb2RlcyBpbiB0aGUgdHJlZS4gKi9cbiAgY29sbGFwc2VBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5leHBhbnNpb25Nb2RlbC5jbGVhcigpO1xuICB9XG5cbiAgZXhwYW5kQWxsKCk6IHZvaWQge1xuICAgIHRoaXMuZXhwYW5zaW9uTW9kZWwuc2VsZWN0KC4uLk9iamVjdC5rZXlzKHRoaXMuX2RhdGEudmFsdWUuY29tcG91bmQgfHwge30pKTtcbiAgfVxuXG4gIHNldERhdGEoZGF0YTogTnpHcmFwaERhdGFEZWYpOiB2b2lkIHtcbiAgICB0aGlzLmV4cGFuc2lvbk1vZGVsPy5jbGVhcigpO1xuICAgIHRoaXMuZGF0YVNvdXJjZSA9IGRhdGE7XG4gICAgdGhpcy5fZGF0YS5uZXh0KGRhdGEpO1xuICB9XG5cbiAgY29uc3RydWN0b3Ioc291cmNlPzogTnpHcmFwaERhdGFEZWYpIHtcbiAgICBpZiAoc291cmNlKSB7XG4gICAgICB0aGlzLmV4cGFuc2lvbk1vZGVsPy5jbGVhcigpO1xuICAgICAgdGhpcy5kYXRhU291cmNlID0gc291cmNlO1xuICAgICAgdGhpcy5fZGF0YS5uZXh0KHNvdXJjZSk7XG4gICAgfVxuICB9XG5cbiAgY29ubmVjdCgpOiBPYnNlcnZhYmxlPE56R3JhcGhEYXRhRGVmPiB7XG4gICAgY29uc3QgY2hhbmdlcyA9IFt0aGlzLl9kYXRhLCB0aGlzLmV4cGFuc2lvbk1vZGVsLmNoYW5nZWRdO1xuICAgIHJldHVybiBtZXJnZSguLi5jaGFuZ2VzKS5waXBlKG1hcCgoKSA9PiB0aGlzLl9kYXRhLnZhbHVlKSk7XG4gIH1cblxuICBkaXNjb25uZWN0KCk6IHZvaWQge1xuICAgIC8vIGRvIG5vdGhpbmcgZm9yIG5vd1xuICB9XG59XG4iXX0=