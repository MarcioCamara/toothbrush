/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';
export class NzCardLoadingComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.listOfLoading = [
            ['ant-col-22'],
            ['ant-col-8', 'ant-col-15'],
            ['ant-col-6', 'ant-col-18'],
            ['ant-col-13', 'ant-col-9'],
            ['ant-col-4', 'ant-col-3', 'ant-col-16'],
            ['ant-col-8', 'ant-col-6', 'ant-col-8']
        ];
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-card-loading-content');
    }
}
NzCardLoadingComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-card-loading',
                exportAs: 'nzCardLoading',
                template: `
    <div class="ant-card-loading-content">
      <div class="ant-row" style="margin-left: -4px; margin-right: -4px;" *ngFor="let listOfClassName of listOfLoading">
        <div *ngFor="let className of listOfClassName" [ngClass]="className" style="padding-left: 4px; padding-right: 4px;">
          <div class="ant-card-loading-block"></div>
        </div>
      </div>
    </div>
  `,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] }
];
NzCardLoadingComponent.ctorParameters = () => [
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC1sb2FkaW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvY2FyZC9jYXJkLWxvYWRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBa0JsRyxNQUFNLE9BQU8sc0JBQXNCO0lBU2pDLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFSMUMsa0JBQWEsR0FBZTtZQUMxQixDQUFDLFlBQVksQ0FBQztZQUNkLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQztZQUMzQixDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUM7WUFDM0IsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDO1lBQzNCLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUM7WUFDeEMsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQztTQUN4QyxDQUFDO1FBRUEsbURBQW1EO1FBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUMxRSxDQUFDOzs7WUE1QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7Ozs7Ozs7O0dBUVQ7Z0JBQ0QsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2FBQ3RDOzs7WUFqQjRDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1jYXJkLWxvYWRpbmcnLFxuICBleHBvcnRBczogJ256Q2FyZExvYWRpbmcnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJhbnQtY2FyZC1sb2FkaW5nLWNvbnRlbnRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcm93XCIgc3R5bGU9XCJtYXJnaW4tbGVmdDogLTRweDsgbWFyZ2luLXJpZ2h0OiAtNHB4O1wiICpuZ0Zvcj1cImxldCBsaXN0T2ZDbGFzc05hbWUgb2YgbGlzdE9mTG9hZGluZ1wiPlxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBjbGFzc05hbWUgb2YgbGlzdE9mQ2xhc3NOYW1lXCIgW25nQ2xhc3NdPVwiY2xhc3NOYW1lXCIgc3R5bGU9XCJwYWRkaW5nLWxlZnQ6IDRweDsgcGFkZGluZy1yaWdodDogNHB4O1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtY2FyZC1sb2FkaW5nLWJsb2NrXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBOekNhcmRMb2FkaW5nQ29tcG9uZW50IHtcbiAgbGlzdE9mTG9hZGluZzogc3RyaW5nW11bXSA9IFtcbiAgICBbJ2FudC1jb2wtMjInXSxcbiAgICBbJ2FudC1jb2wtOCcsICdhbnQtY29sLTE1J10sXG4gICAgWydhbnQtY29sLTYnLCAnYW50LWNvbC0xOCddLFxuICAgIFsnYW50LWNvbC0xMycsICdhbnQtY29sLTknXSxcbiAgICBbJ2FudC1jb2wtNCcsICdhbnQtY29sLTMnLCAnYW50LWNvbC0xNiddLFxuICAgIFsnYW50LWNvbC04JywgJ2FudC1jb2wtNicsICdhbnQtY29sLTgnXVxuICBdO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAvLyBUT0RPOiBtb3ZlIHRvIGhvc3QgYWZ0ZXIgVmlldyBFbmdpbmUgZGVwcmVjYXRpb25cbiAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhbnQtY2FyZC1sb2FkaW5nLWNvbnRlbnQnKTtcbiAgfVxufVxuIl19