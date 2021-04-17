/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class NzTreeIndentComponent {
    constructor() {
        this.nzTreeLevel = 0;
        this.nzIsStart = [];
        this.nzIsEnd = [];
        this.nzSelectMode = false;
        this.listOfUnit = [];
    }
    ngOnInit() { }
    ngOnChanges(changes) {
        const { nzTreeLevel } = changes;
        if (nzTreeLevel) {
            this.listOfUnit = [...new Array(nzTreeLevel.currentValue || 0)];
        }
    }
}
NzTreeIndentComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tree-indent',
                exportAs: 'nzTreeIndent',
                template: `
    <span
      [class.ant-tree-indent-unit]="!nzSelectMode"
      [class.ant-select-tree-indent-unit]="nzSelectMode"
      [class.ant-select-tree-indent-unit-start]="nzSelectMode && nzIsStart[i]"
      [class.ant-tree-indent-unit-start]="!nzSelectMode && nzIsStart[i]"
      [class.ant-select-tree-indent-unit-end]="nzSelectMode && nzIsEnd[i]"
      [class.ant-tree-indent-unit-end]="!nzSelectMode && nzIsEnd[i]"
      *ngFor="let _ of listOfUnit; let i = index"
    ></span>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                host: {
                    '[attr.aria-hidden]': 'true',
                    '[class.ant-tree-indent]': '!nzSelectMode',
                    '[class.ant-select-tree-indent]': 'nzSelectMode'
                }
            },] }
];
NzTreeIndentComponent.propDecorators = {
    nzTreeLevel: [{ type: Input }],
    nzIsStart: [{ type: Input }],
    nzIsEnd: [{ type: Input }],
    nzSelectMode: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1pbmRlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy90cmVlL3RyZWUtaW5kZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBb0MsTUFBTSxlQUFlLENBQUM7QUF3QjVHLE1BQU0sT0FBTyxxQkFBcUI7SUF0QmxDO1FBdUJXLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGNBQVMsR0FBYyxFQUFFLENBQUM7UUFDMUIsWUFBTyxHQUFjLEVBQUUsQ0FBQztRQUN4QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUU5QixlQUFVLEdBQWEsRUFBRSxDQUFDO0lBVTVCLENBQUM7SUFSQyxRQUFRLEtBQVUsQ0FBQztJQUVuQixXQUFXLENBQUMsT0FBc0I7UUFDaEMsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUNoQyxJQUFJLFdBQVcsRUFBRTtZQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqRTtJQUNILENBQUM7OztZQXJDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRTs7Ozs7Ozs7OztHQVVUO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixJQUFJLEVBQUU7b0JBQ0osb0JBQW9CLEVBQUUsTUFBTTtvQkFDNUIseUJBQXlCLEVBQUUsZUFBZTtvQkFDMUMsZ0NBQWdDLEVBQUUsY0FBYztpQkFDakQ7YUFDRjs7OzBCQUVFLEtBQUs7d0JBQ0wsS0FBSztzQkFDTCxLQUFLOzJCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdHJlZS1pbmRlbnQnLFxuICBleHBvcnRBczogJ256VHJlZUluZGVudCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW5cbiAgICAgIFtjbGFzcy5hbnQtdHJlZS1pbmRlbnQtdW5pdF09XCIhbnpTZWxlY3RNb2RlXCJcbiAgICAgIFtjbGFzcy5hbnQtc2VsZWN0LXRyZWUtaW5kZW50LXVuaXRdPVwibnpTZWxlY3RNb2RlXCJcbiAgICAgIFtjbGFzcy5hbnQtc2VsZWN0LXRyZWUtaW5kZW50LXVuaXQtc3RhcnRdPVwibnpTZWxlY3RNb2RlICYmIG56SXNTdGFydFtpXVwiXG4gICAgICBbY2xhc3MuYW50LXRyZWUtaW5kZW50LXVuaXQtc3RhcnRdPVwiIW56U2VsZWN0TW9kZSAmJiBueklzU3RhcnRbaV1cIlxuICAgICAgW2NsYXNzLmFudC1zZWxlY3QtdHJlZS1pbmRlbnQtdW5pdC1lbmRdPVwibnpTZWxlY3RNb2RlICYmIG56SXNFbmRbaV1cIlxuICAgICAgW2NsYXNzLmFudC10cmVlLWluZGVudC11bml0LWVuZF09XCIhbnpTZWxlY3RNb2RlICYmIG56SXNFbmRbaV1cIlxuICAgICAgKm5nRm9yPVwibGV0IF8gb2YgbGlzdE9mVW5pdDsgbGV0IGkgPSBpbmRleFwiXG4gICAgPjwvc3Bhbj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBob3N0OiB7XG4gICAgJ1thdHRyLmFyaWEtaGlkZGVuXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmFudC10cmVlLWluZGVudF0nOiAnIW56U2VsZWN0TW9kZScsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LXRyZWUtaW5kZW50XSc6ICduelNlbGVjdE1vZGUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUcmVlSW5kZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBuelRyZWVMZXZlbCA9IDA7XG4gIEBJbnB1dCgpIG56SXNTdGFydDogYm9vbGVhbltdID0gW107XG4gIEBJbnB1dCgpIG56SXNFbmQ6IGJvb2xlYW5bXSA9IFtdO1xuICBASW5wdXQoKSBuelNlbGVjdE1vZGUgPSBmYWxzZTtcblxuICBsaXN0T2ZVbml0OiBudW1iZXJbXSA9IFtdO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuelRyZWVMZXZlbCB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpUcmVlTGV2ZWwpIHtcbiAgICAgIHRoaXMubGlzdE9mVW5pdCA9IFsuLi5uZXcgQXJyYXkobnpUcmVlTGV2ZWwuY3VycmVudFZhbHVlIHx8IDApXTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==