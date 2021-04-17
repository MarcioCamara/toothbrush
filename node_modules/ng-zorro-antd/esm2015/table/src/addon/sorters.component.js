/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
export class NzTableSortersComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.sortDirections = ['ascend', 'descend', null];
        this.sortOrder = null;
        this.contentTemplate = null;
        this.isUp = false;
        this.isDown = false;
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-table-column-sorters');
    }
    ngOnChanges(changes) {
        const { sortDirections } = changes;
        if (sortDirections) {
            this.isUp = this.sortDirections.indexOf('ascend') !== -1;
            this.isDown = this.sortDirections.indexOf('descend') !== -1;
        }
    }
}
NzTableSortersComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-table-sorters',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <span><ng-template [ngTemplateOutlet]="contentTemplate"></ng-template></span>
    <span class="ant-table-column-sorter" [class.ant-table-column-sorter-full]="isDown && isUp">
      <span class="ant-table-column-sorter-inner">
        <i nz-icon nzType="caret-up" *ngIf="isUp" class="ant-table-column-sorter-up" [class.active]="sortOrder == 'ascend'"></i>
        <i nz-icon nzType="caret-down" *ngIf="isDown" class="ant-table-column-sorter-down" [class.active]="sortOrder == 'descend'"></i>
      </span>
    </span>
  `
            },] }
];
NzTableSortersComponent.ctorParameters = () => [
    { type: ElementRef }
];
NzTableSortersComponent.propDecorators = {
    sortDirections: [{ type: Input }],
    sortOrder: [{ type: Input }],
    contentTemplate: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb21wb25lbnRzL3RhYmxlL3NyYy9hZGRvbi9zb3J0ZXJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUlMLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQW1CdkIsTUFBTSxPQUFPLHVCQUF1QjtJQU9sQyxZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBTmpDLG1CQUFjLEdBQXVCLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRSxjQUFTLEdBQXFCLElBQUksQ0FBQztRQUNuQyxvQkFBZSxHQUFrQyxJQUFJLENBQUM7UUFDL0QsU0FBSSxHQUFHLEtBQUssQ0FBQztRQUNiLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFHYixtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsTUFBTSxFQUFFLGNBQWMsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUNuQyxJQUFJLGNBQWMsRUFBRTtZQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDN0Q7SUFDSCxDQUFDOzs7WUFqQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFOzs7Ozs7OztHQVFUO2FBQ0Y7OztZQXhCQyxVQUFVOzs7NkJBMEJULEtBQUs7d0JBQ0wsS0FBSzs4QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56VGFibGVTb3J0T3JkZXIgfSBmcm9tICcuLi90YWJsZS50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRhYmxlLXNvcnRlcnMnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW4+PG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiYW50LXRhYmxlLWNvbHVtbi1zb3J0ZXJcIiBbY2xhc3MuYW50LXRhYmxlLWNvbHVtbi1zb3J0ZXItZnVsbF09XCJpc0Rvd24gJiYgaXNVcFwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtdGFibGUtY29sdW1uLXNvcnRlci1pbm5lclwiPlxuICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImNhcmV0LXVwXCIgKm5nSWY9XCJpc1VwXCIgY2xhc3M9XCJhbnQtdGFibGUtY29sdW1uLXNvcnRlci11cFwiIFtjbGFzcy5hY3RpdmVdPVwic29ydE9yZGVyID09ICdhc2NlbmQnXCI+PC9pPlxuICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImNhcmV0LWRvd25cIiAqbmdJZj1cImlzRG93blwiIGNsYXNzPVwiYW50LXRhYmxlLWNvbHVtbi1zb3J0ZXItZG93blwiIFtjbGFzcy5hY3RpdmVdPVwic29ydE9yZGVyID09ICdkZXNjZW5kJ1wiPjwvaT5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L3NwYW4+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpUYWJsZVNvcnRlcnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBzb3J0RGlyZWN0aW9uczogTnpUYWJsZVNvcnRPcmRlcltdID0gWydhc2NlbmQnLCAnZGVzY2VuZCcsIG51bGxdO1xuICBASW5wdXQoKSBzb3J0T3JkZXI6IE56VGFibGVTb3J0T3JkZXIgPSBudWxsO1xuICBASW5wdXQoKSBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgaXNVcCA9IGZhbHNlO1xuICBpc0Rvd24gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAvLyBUT0RPOiBtb3ZlIHRvIGhvc3QgYWZ0ZXIgVmlldyBFbmdpbmUgZGVwcmVjYXRpb25cbiAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhbnQtdGFibGUtY29sdW1uLXNvcnRlcnMnKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IHNvcnREaXJlY3Rpb25zIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChzb3J0RGlyZWN0aW9ucykge1xuICAgICAgdGhpcy5pc1VwID0gdGhpcy5zb3J0RGlyZWN0aW9ucy5pbmRleE9mKCdhc2NlbmQnKSAhPT0gLTE7XG4gICAgICB0aGlzLmlzRG93biA9IHRoaXMuc29ydERpcmVjdGlvbnMuaW5kZXhPZignZGVzY2VuZCcpICE9PSAtMTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==