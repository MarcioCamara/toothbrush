/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
export class NzSiderTriggerComponent {
    constructor() {
        this.nzCollapsed = false;
        this.nzReverseArrow = false;
        this.nzZeroTrigger = null;
        this.nzTrigger = undefined;
        this.matchBreakPoint = false;
        this.nzCollapsedWidth = null;
        this.siderWidth = null;
        this.nzBreakpoint = null;
        this.isZeroTrigger = false;
        this.isNormalTrigger = false;
    }
    updateTriggerType() {
        this.isZeroTrigger = this.nzCollapsedWidth === 0 && ((this.nzBreakpoint && this.matchBreakPoint) || !this.nzBreakpoint);
        this.isNormalTrigger = this.nzCollapsedWidth !== 0;
    }
    ngOnInit() {
        this.updateTriggerType();
    }
    ngOnChanges() {
        this.updateTriggerType();
    }
}
NzSiderTriggerComponent.decorators = [
    { type: Component, args: [{
                selector: '[nz-sider-trigger]',
                exportAs: 'nzSiderTrigger',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-container *ngIf="isZeroTrigger">
      <ng-template [ngTemplateOutlet]="nzZeroTrigger || defaultZeroTrigger"></ng-template>
    </ng-container>
    <ng-container *ngIf="isNormalTrigger">
      <ng-template [ngTemplateOutlet]="nzTrigger || defaultTrigger"></ng-template>
    </ng-container>
    <ng-template #defaultTrigger>
      <i nz-icon [nzType]="nzCollapsed ? 'right' : 'left'" *ngIf="!nzReverseArrow"></i>
      <i nz-icon [nzType]="nzCollapsed ? 'left' : 'right'" *ngIf="nzReverseArrow"></i>
    </ng-template>
    <ng-template #defaultZeroTrigger>
      <i nz-icon nzType="bars"></i>
    </ng-template>
  `,
                host: {
                    '[class.ant-layout-sider-trigger]': 'isNormalTrigger',
                    '[style.width]': 'isNormalTrigger ? siderWidth : null',
                    '[class.ant-layout-sider-zero-width-trigger]': 'isZeroTrigger',
                    '[class.ant-layout-sider-zero-width-trigger-right]': 'isZeroTrigger && nzReverseArrow',
                    '[class.ant-layout-sider-zero-width-trigger-left]': 'isZeroTrigger && !nzReverseArrow'
                }
            },] }
];
NzSiderTriggerComponent.propDecorators = {
    nzCollapsed: [{ type: Input }],
    nzReverseArrow: [{ type: Input }],
    nzZeroTrigger: [{ type: Input }],
    nzTrigger: [{ type: Input }],
    matchBreakPoint: [{ type: Input }],
    nzCollapsedWidth: [{ type: Input }],
    siderWidth: [{ type: Input }],
    nzBreakpoint: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXItdHJpZ2dlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2xheW91dC9zaWRlci10cmlnZ2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBa0MsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFnQzdILE1BQU0sT0FBTyx1QkFBdUI7SUE3QnBDO1FBOEJXLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLGtCQUFhLEdBQTZCLElBQUksQ0FBQztRQUMvQyxjQUFTLEdBQXlDLFNBQVMsQ0FBQztRQUM1RCxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixxQkFBZ0IsR0FBa0IsSUFBSSxDQUFDO1FBQ3ZDLGVBQVUsR0FBa0IsSUFBSSxDQUFDO1FBQ2pDLGlCQUFZLEdBQTJCLElBQUksQ0FBQztRQUNyRCxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixvQkFBZSxHQUFHLEtBQUssQ0FBQztJQVcxQixDQUFDO0lBVkMsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4SCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNELFFBQVE7UUFDTixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBQ0QsV0FBVztRQUNULElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQWpERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0dBY1Q7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLGtDQUFrQyxFQUFFLGlCQUFpQjtvQkFDckQsZUFBZSxFQUFFLHFDQUFxQztvQkFDdEQsNkNBQTZDLEVBQUUsZUFBZTtvQkFDOUQsbURBQW1ELEVBQUUsaUNBQWlDO29CQUN0RixrREFBa0QsRUFBRSxrQ0FBa0M7aUJBQ3ZGO2FBQ0Y7OzswQkFFRSxLQUFLOzZCQUNMLEtBQUs7NEJBQ0wsS0FBSzt3QkFDTCxLQUFLOzhCQUNMLEtBQUs7K0JBQ0wsS0FBSzt5QkFDTCxLQUFLOzJCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFRlbXBsYXRlUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpCcmVha3BvaW50S2V5IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3NlcnZpY2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW256LXNpZGVyLXRyaWdnZXJdJyxcbiAgZXhwb3J0QXM6ICduelNpZGVyVHJpZ2dlcicsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNaZXJvVHJpZ2dlclwiPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm56WmVyb1RyaWdnZXIgfHwgZGVmYXVsdFplcm9UcmlnZ2VyXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNOb3JtYWxUcmlnZ2VyXCI+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibnpUcmlnZ2VyIHx8IGRlZmF1bHRUcmlnZ2VyXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUcmlnZ2VyPlxuICAgICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cIm56Q29sbGFwc2VkID8gJ3JpZ2h0JyA6ICdsZWZ0J1wiICpuZ0lmPVwiIW56UmV2ZXJzZUFycm93XCI+PC9pPlxuICAgICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cIm56Q29sbGFwc2VkID8gJ2xlZnQnIDogJ3JpZ2h0J1wiICpuZ0lmPVwibnpSZXZlcnNlQXJyb3dcIj48L2k+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRaZXJvVHJpZ2dlcj5cbiAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiYmFyc1wiPjwvaT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtbGF5b3V0LXNpZGVyLXRyaWdnZXJdJzogJ2lzTm9ybWFsVHJpZ2dlcicsXG4gICAgJ1tzdHlsZS53aWR0aF0nOiAnaXNOb3JtYWxUcmlnZ2VyID8gc2lkZXJXaWR0aCA6IG51bGwnLFxuICAgICdbY2xhc3MuYW50LWxheW91dC1zaWRlci16ZXJvLXdpZHRoLXRyaWdnZXJdJzogJ2lzWmVyb1RyaWdnZXInLFxuICAgICdbY2xhc3MuYW50LWxheW91dC1zaWRlci16ZXJvLXdpZHRoLXRyaWdnZXItcmlnaHRdJzogJ2lzWmVyb1RyaWdnZXIgJiYgbnpSZXZlcnNlQXJyb3cnLFxuICAgICdbY2xhc3MuYW50LWxheW91dC1zaWRlci16ZXJvLXdpZHRoLXRyaWdnZXItbGVmdF0nOiAnaXNaZXJvVHJpZ2dlciAmJiAhbnpSZXZlcnNlQXJyb3cnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpTaWRlclRyaWdnZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIEBJbnB1dCgpIG56Q29sbGFwc2VkID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56UmV2ZXJzZUFycm93ID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56WmVyb1RyaWdnZXI6IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56VHJpZ2dlcjogVGVtcGxhdGVSZWY8dm9pZD4gfCB1bmRlZmluZWQgfCBudWxsID0gdW5kZWZpbmVkO1xuICBASW5wdXQoKSBtYXRjaEJyZWFrUG9pbnQgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpDb2xsYXBzZWRXaWR0aDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHNpZGVyV2lkdGg6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuekJyZWFrcG9pbnQ6IE56QnJlYWtwb2ludEtleSB8IG51bGwgPSBudWxsO1xuICBpc1plcm9UcmlnZ2VyID0gZmFsc2U7XG4gIGlzTm9ybWFsVHJpZ2dlciA9IGZhbHNlO1xuICB1cGRhdGVUcmlnZ2VyVHlwZSgpOiB2b2lkIHtcbiAgICB0aGlzLmlzWmVyb1RyaWdnZXIgPSB0aGlzLm56Q29sbGFwc2VkV2lkdGggPT09IDAgJiYgKCh0aGlzLm56QnJlYWtwb2ludCAmJiB0aGlzLm1hdGNoQnJlYWtQb2ludCkgfHwgIXRoaXMubnpCcmVha3BvaW50KTtcbiAgICB0aGlzLmlzTm9ybWFsVHJpZ2dlciA9IHRoaXMubnpDb2xsYXBzZWRXaWR0aCAhPT0gMDtcbiAgfVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVRyaWdnZXJUeXBlKCk7XG4gIH1cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVUcmlnZ2VyVHlwZSgpO1xuICB9XG59XG4iXX0=