/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
export class NzTreeNodeCheckboxComponent {
    constructor() {
        this.nzClick = new EventEmitter();
    }
    onClick(e) {
        if (!this.nzDisabled) {
            this.nzClick.emit(e);
        }
    }
}
NzTreeNodeCheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tree-node-checkbox:not([builtin])',
                template: `
    <span class="ant-tree-checkbox-inner"></span>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                host: {
                    class: 'ant-tree-checkbox',
                    '[class.ant-tree-checkbox-checked]': `nzChecked`,
                    '[class.ant-tree-checkbox-indeterminate]': `nzIndeterminate`,
                    '[class.ant-tree-checkbox-disabled]': `nzDisabled`,
                    '(click)': 'onClick($event)'
                }
            },] }
];
NzTreeNodeCheckboxComponent.propDecorators = {
    nzChecked: [{ type: Input }],
    nzIndeterminate: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzClick: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTreeNodeCheckboxComponent.prototype, "nzDisabled", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3RyZWUtdmlldy9jaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdoRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFpQnZELE1BQU0sT0FBTywyQkFBMkI7SUFmeEM7UUFxQnFCLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO0lBTzlELENBQUM7SUFMQyxPQUFPLENBQUMsQ0FBYTtRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QjtJQUNILENBQUM7OztZQTNCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNDQUFzQztnQkFDaEQsUUFBUSxFQUFFOztHQUVUO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLG1CQUFtQjtvQkFDMUIsbUNBQW1DLEVBQUUsV0FBVztvQkFDaEQseUNBQXlDLEVBQUUsaUJBQWlCO29CQUM1RCxvQ0FBb0MsRUFBRSxZQUFZO29CQUNsRCxTQUFTLEVBQUUsaUJBQWlCO2lCQUM3QjthQUNGOzs7d0JBSUUsS0FBSzs4QkFDTCxLQUFLO3lCQUNMLEtBQUs7c0JBQ0wsTUFBTTs7QUFEa0I7SUFBZixZQUFZLEVBQUU7OytEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei10cmVlLW5vZGUtY2hlY2tib3g6bm90KFtidWlsdGluXSknLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzcGFuIGNsYXNzPVwiYW50LXRyZWUtY2hlY2tib3gtaW5uZXJcIj48L3NwYW4+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LXRyZWUtY2hlY2tib3gnLFxuICAgICdbY2xhc3MuYW50LXRyZWUtY2hlY2tib3gtY2hlY2tlZF0nOiBgbnpDaGVja2VkYCxcbiAgICAnW2NsYXNzLmFudC10cmVlLWNoZWNrYm94LWluZGV0ZXJtaW5hdGVdJzogYG56SW5kZXRlcm1pbmF0ZWAsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZS1jaGVja2JveC1kaXNhYmxlZF0nOiBgbnpEaXNhYmxlZGAsXG4gICAgJyhjbGljayknOiAnb25DbGljaygkZXZlbnQpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VHJlZU5vZGVDaGVja2JveENvbXBvbmVudCB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekRpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCkgbnpDaGVja2VkPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbnpJbmRldGVybWluYXRlPzogYm9vbGVhbjtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RGlzYWJsZWQ/OiBib29sZWFuO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICBvbkNsaWNrKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubnpEaXNhYmxlZCkge1xuICAgICAgdGhpcy5uekNsaWNrLmVtaXQoZSk7XG4gICAgfVxuICB9XG59XG4iXX0=