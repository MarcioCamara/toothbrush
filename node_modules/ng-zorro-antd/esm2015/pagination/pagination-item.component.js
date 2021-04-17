/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
export class NzPaginationItemComponent {
    constructor() {
        this.active = false;
        this.index = null;
        this.disabled = false;
        this.direction = 'ltr';
        this.type = null;
        this.itemRender = null;
        this.diffIndex = new EventEmitter();
        this.gotoIndex = new EventEmitter();
        this.title = null;
    }
    clickItem() {
        if (!this.disabled) {
            if (this.type === 'page') {
                this.gotoIndex.emit(this.index);
            }
            else {
                this.diffIndex.emit({
                    next: 1,
                    prev: -1,
                    prev_5: -5,
                    next_5: 5
                }[this.type]);
            }
        }
    }
    ngOnChanges(changes) {
        var _a, _b, _c, _d;
        const { locale, index, type } = changes;
        if (locale || index || type) {
            this.title = {
                page: `${this.index}`,
                next: (_a = this.locale) === null || _a === void 0 ? void 0 : _a.next_page,
                prev: (_b = this.locale) === null || _b === void 0 ? void 0 : _b.prev_page,
                prev_5: (_c = this.locale) === null || _c === void 0 ? void 0 : _c.prev_5,
                next_5: (_d = this.locale) === null || _d === void 0 ? void 0 : _d.next_5
            }[this.type];
        }
    }
}
NzPaginationItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'li[nz-pagination-item]',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-template #renderItemTemplate let-type let-page="page">
      <ng-container [ngSwitch]="type">
        <a *ngSwitchCase="'page'">{{ page }}</a>
        <button [disabled]="disabled" class="ant-pagination-item-link" *ngSwitchCase="'prev'">
          <ng-container [ngSwitch]="direction">
            <i *ngSwitchCase="'rtl'" nz-icon nzType="right"></i>
            <i *ngSwitchDefault nz-icon nzType="left"></i>
          </ng-container>
        </button>
        <button [disabled]="disabled" class="ant-pagination-item-link" *ngSwitchCase="'next'">
          <ng-container [ngSwitch]="direction">
            <i *ngSwitchCase="'rtl'" nz-icon nzType="left"></i>
            <i *ngSwitchDefault nz-icon nzType="right"></i>
          </ng-container>
        </button>
        <ng-container *ngSwitchDefault>
          <a class="ant-pagination-item-link" [ngSwitch]="type">
            <div class="ant-pagination-item-container" *ngSwitchDefault>
              <ng-container [ngSwitch]="type">
                <ng-container *ngSwitchCase="'prev_5'" [ngSwitch]="direction">
                  <i *ngSwitchCase="'rtl'" nz-icon nzType="double-right" class="ant-pagination-item-link-icon"></i>
                  <i *ngSwitchDefault nz-icon nzType="double-left" class="ant-pagination-item-link-icon"></i>
                </ng-container>
                <ng-container *ngSwitchCase="'next_5'" [ngSwitch]="direction">
                  <i *ngSwitchCase="'rtl'" nz-icon nzType="double-left" class="ant-pagination-item-link-icon"></i>
                  <i *ngSwitchDefault nz-icon nzType="double-right" class="ant-pagination-item-link-icon"></i>
                </ng-container>
              </ng-container>
              <span class="ant-pagination-item-ellipsis">•••</span>
            </div>
          </a>
        </ng-container>
      </ng-container>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="itemRender || renderItemTemplate"
      [ngTemplateOutletContext]="{ $implicit: type, page: index }"
    ></ng-template>
  `,
                host: {
                    '[class.ant-pagination-prev]': `type === 'prev'`,
                    '[class.ant-pagination-next]': `type === 'next'`,
                    '[class.ant-pagination-item]': `type === 'page'`,
                    '[class.ant-pagination-jump-prev]': `type === 'prev_5'`,
                    '[class.ant-pagination-jump-prev-custom-icon]': `type === 'prev_5'`,
                    '[class.ant-pagination-jump-next]': `type === 'next_5'`,
                    '[class.ant-pagination-jump-next-custom-icon]': `type === 'next_5'`,
                    '[class.ant-pagination-disabled]': 'disabled',
                    '[class.ant-pagination-item-active]': 'active',
                    '[attr.title]': 'title',
                    '(click)': 'clickItem()'
                }
            },] }
];
NzPaginationItemComponent.propDecorators = {
    active: [{ type: Input }],
    locale: [{ type: Input }],
    index: [{ type: Input }],
    disabled: [{ type: Input }],
    direction: [{ type: Input }],
    type: [{ type: Input }],
    itemRender: [{ type: Input }],
    diffIndex: [{ type: Output }],
    gotoIndex: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUdOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQWdFdkIsTUFBTSxPQUFPLHlCQUF5QjtJQTNEdEM7UUErRFcsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUVmLFVBQUssR0FBa0IsSUFBSSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixTQUFJLEdBQXVDLElBQUksQ0FBQztRQUNoRCxlQUFVLEdBQW9ELElBQUksQ0FBQztRQUN6RCxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUN2QyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUMxRCxVQUFLLEdBQWtCLElBQUksQ0FBQztJQTZCOUIsQ0FBQztJQTVCQyxTQUFTO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQU0sQ0FBQyxDQUFDO2FBQ2xDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUNoQjtvQkFDQyxJQUFJLEVBQUUsQ0FBQztvQkFDUCxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUNSLE1BQU0sRUFBRSxDQUFDLENBQUM7b0JBQ1YsTUFBTSxFQUFFLENBQUM7aUJBQ0ksQ0FBQyxJQUFJLENBQUMsSUFBSyxDQUFDLENBQzVCLENBQUM7YUFDSDtTQUNGO0lBQ0gsQ0FBQztJQUNELFdBQVcsQ0FBQyxPQUFzQjs7UUFDaEMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ3hDLElBQUksTUFBTSxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBSTtnQkFDWixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNyQixJQUFJLFFBQUUsSUFBSSxDQUFDLE1BQU0sMENBQUUsU0FBUztnQkFDNUIsSUFBSSxRQUFFLElBQUksQ0FBQyxNQUFNLDBDQUFFLFNBQVM7Z0JBQzVCLE1BQU0sUUFBRSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxNQUFNO2dCQUMzQixNQUFNLFFBQUUsSUFBSSxDQUFDLE1BQU0sMENBQUUsTUFBTTthQUNkLENBQUMsSUFBSSxDQUFDLElBQUssQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQzs7O1lBcEdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNUO2dCQUNELElBQUksRUFBRTtvQkFDSiw2QkFBNkIsRUFBRSxpQkFBaUI7b0JBQ2hELDZCQUE2QixFQUFFLGlCQUFpQjtvQkFDaEQsNkJBQTZCLEVBQUUsaUJBQWlCO29CQUNoRCxrQ0FBa0MsRUFBRSxtQkFBbUI7b0JBQ3ZELDhDQUE4QyxFQUFFLG1CQUFtQjtvQkFDbkUsa0NBQWtDLEVBQUUsbUJBQW1CO29CQUN2RCw4Q0FBOEMsRUFBRSxtQkFBbUI7b0JBQ25FLGlDQUFpQyxFQUFFLFVBQVU7b0JBQzdDLG9DQUFvQyxFQUFFLFFBQVE7b0JBQzlDLGNBQWMsRUFBRSxPQUFPO29CQUN2QixTQUFTLEVBQUUsYUFBYTtpQkFDekI7YUFDRjs7O3FCQUtFLEtBQUs7cUJBQ0wsS0FBSztvQkFDTCxLQUFLO3VCQUNMLEtBQUs7d0JBQ0wsS0FBSzttQkFDTCxLQUFLO3lCQUNMLEtBQUs7d0JBQ0wsTUFBTTt3QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOelBhZ2luYXRpb25JMThuSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcbmltcG9ydCB7IFBhZ2luYXRpb25JdGVtUmVuZGVyQ29udGV4dCwgUGFnaW5hdGlvbkl0ZW1UeXBlIH0gZnJvbSAnLi9wYWdpbmF0aW9uLnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGlbbnotcGFnaW5hdGlvbi1pdGVtXScsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI3JlbmRlckl0ZW1UZW1wbGF0ZSBsZXQtdHlwZSBsZXQtcGFnZT1cInBhZ2VcIj5cbiAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cInR5cGVcIj5cbiAgICAgICAgPGEgKm5nU3dpdGNoQ2FzZT1cIidwYWdlJ1wiPnt7IHBhZ2UgfX08L2E+XG4gICAgICAgIDxidXR0b24gW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgY2xhc3M9XCJhbnQtcGFnaW5hdGlvbi1pdGVtLWxpbmtcIiAqbmdTd2l0Y2hDYXNlPVwiJ3ByZXYnXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiZGlyZWN0aW9uXCI+XG4gICAgICAgICAgICA8aSAqbmdTd2l0Y2hDYXNlPVwiJ3J0bCdcIiBuei1pY29uIG56VHlwZT1cInJpZ2h0XCI+PC9pPlxuICAgICAgICAgICAgPGkgKm5nU3dpdGNoRGVmYXVsdCBuei1pY29uIG56VHlwZT1cImxlZnRcIj48L2k+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIGNsYXNzPVwiYW50LXBhZ2luYXRpb24taXRlbS1saW5rXCIgKm5nU3dpdGNoQ2FzZT1cIiduZXh0J1wiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cImRpcmVjdGlvblwiPlxuICAgICAgICAgICAgPGkgKm5nU3dpdGNoQ2FzZT1cIidydGwnXCIgbnotaWNvbiBuelR5cGU9XCJsZWZ0XCI+PC9pPlxuICAgICAgICAgICAgPGkgKm5nU3dpdGNoRGVmYXVsdCBuei1pY29uIG56VHlwZT1cInJpZ2h0XCI+PC9pPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hEZWZhdWx0PlxuICAgICAgICAgIDxhIGNsYXNzPVwiYW50LXBhZ2luYXRpb24taXRlbS1saW5rXCIgW25nU3dpdGNoXT1cInR5cGVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcGFnaW5hdGlvbi1pdGVtLWNvbnRhaW5lclwiICpuZ1N3aXRjaERlZmF1bHQ+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cInR5cGVcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCIncHJldl81J1wiIFtuZ1N3aXRjaF09XCJkaXJlY3Rpb25cIj5cbiAgICAgICAgICAgICAgICAgIDxpICpuZ1N3aXRjaENhc2U9XCIncnRsJ1wiIG56LWljb24gbnpUeXBlPVwiZG91YmxlLXJpZ2h0XCIgY2xhc3M9XCJhbnQtcGFnaW5hdGlvbi1pdGVtLWxpbmstaWNvblwiPjwvaT5cbiAgICAgICAgICAgICAgICAgIDxpICpuZ1N3aXRjaERlZmF1bHQgbnotaWNvbiBuelR5cGU9XCJkb3VibGUtbGVmdFwiIGNsYXNzPVwiYW50LXBhZ2luYXRpb24taXRlbS1saW5rLWljb25cIj48L2k+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ25leHRfNSdcIiBbbmdTd2l0Y2hdPVwiZGlyZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgICA8aSAqbmdTd2l0Y2hDYXNlPVwiJ3J0bCdcIiBuei1pY29uIG56VHlwZT1cImRvdWJsZS1sZWZ0XCIgY2xhc3M9XCJhbnQtcGFnaW5hdGlvbi1pdGVtLWxpbmstaWNvblwiPjwvaT5cbiAgICAgICAgICAgICAgICAgIDxpICpuZ1N3aXRjaERlZmF1bHQgbnotaWNvbiBuelR5cGU9XCJkb3VibGUtcmlnaHRcIiBjbGFzcz1cImFudC1wYWdpbmF0aW9uLWl0ZW0tbGluay1pY29uXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtcGFnaW5hdGlvbi1pdGVtLWVsbGlwc2lzXCI+4oCi4oCi4oCiPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJpdGVtUmVuZGVyIHx8IHJlbmRlckl0ZW1UZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IHR5cGUsIHBhZ2U6IGluZGV4IH1cIlxuICAgID48L25nLXRlbXBsYXRlPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtcGFnaW5hdGlvbi1wcmV2XSc6IGB0eXBlID09PSAncHJldidgLFxuICAgICdbY2xhc3MuYW50LXBhZ2luYXRpb24tbmV4dF0nOiBgdHlwZSA9PT0gJ25leHQnYCxcbiAgICAnW2NsYXNzLmFudC1wYWdpbmF0aW9uLWl0ZW1dJzogYHR5cGUgPT09ICdwYWdlJ2AsXG4gICAgJ1tjbGFzcy5hbnQtcGFnaW5hdGlvbi1qdW1wLXByZXZdJzogYHR5cGUgPT09ICdwcmV2XzUnYCxcbiAgICAnW2NsYXNzLmFudC1wYWdpbmF0aW9uLWp1bXAtcHJldi1jdXN0b20taWNvbl0nOiBgdHlwZSA9PT0gJ3ByZXZfNSdgLFxuICAgICdbY2xhc3MuYW50LXBhZ2luYXRpb24tanVtcC1uZXh0XSc6IGB0eXBlID09PSAnbmV4dF81J2AsXG4gICAgJ1tjbGFzcy5hbnQtcGFnaW5hdGlvbi1qdW1wLW5leHQtY3VzdG9tLWljb25dJzogYHR5cGUgPT09ICduZXh0XzUnYCxcbiAgICAnW2NsYXNzLmFudC1wYWdpbmF0aW9uLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5hbnQtcGFnaW5hdGlvbi1pdGVtLWFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgICAnW2F0dHIudGl0bGVdJzogJ3RpdGxlJyxcbiAgICAnKGNsaWNrKSc6ICdjbGlja0l0ZW0oKSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelBhZ2luYXRpb25JdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3R5cGU6IFBhZ2luYXRpb25JdGVtVHlwZSB8IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9pbmRleDogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICBASW5wdXQoKSBhY3RpdmUgPSBmYWxzZTtcbiAgQElucHV0KCkgbG9jYWxlITogTnpQYWdpbmF0aW9uSTE4bkludGVyZmFjZTtcbiAgQElucHV0KCkgaW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBkaXJlY3Rpb24gPSAnbHRyJztcbiAgQElucHV0KCkgdHlwZTogUGFnaW5hdGlvbkl0ZW1UeXBlIHwgc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGl0ZW1SZW5kZXI6IFRlbXBsYXRlUmVmPFBhZ2luYXRpb25JdGVtUmVuZGVyQ29udGV4dD4gfCBudWxsID0gbnVsbDtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGRpZmZJbmRleCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgZ290b0luZGV4ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHRpdGxlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgY2xpY2tJdGVtKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3BhZ2UnKSB7XG4gICAgICAgIHRoaXMuZ290b0luZGV4LmVtaXQodGhpcy5pbmRleCEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kaWZmSW5kZXguZW1pdChcbiAgICAgICAgICAoe1xuICAgICAgICAgICAgbmV4dDogMSxcbiAgICAgICAgICAgIHByZXY6IC0xLFxuICAgICAgICAgICAgcHJldl81OiAtNSxcbiAgICAgICAgICAgIG5leHRfNTogNVxuICAgICAgICAgIH0gYXMgTnpTYWZlQW55KVt0aGlzLnR5cGUhXVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBsb2NhbGUsIGluZGV4LCB0eXBlIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChsb2NhbGUgfHwgaW5kZXggfHwgdHlwZSkge1xuICAgICAgdGhpcy50aXRsZSA9ICh7XG4gICAgICAgIHBhZ2U6IGAke3RoaXMuaW5kZXh9YCxcbiAgICAgICAgbmV4dDogdGhpcy5sb2NhbGU/Lm5leHRfcGFnZSxcbiAgICAgICAgcHJldjogdGhpcy5sb2NhbGU/LnByZXZfcGFnZSxcbiAgICAgICAgcHJldl81OiB0aGlzLmxvY2FsZT8ucHJldl81LFxuICAgICAgICBuZXh0XzU6IHRoaXMubG9jYWxlPy5uZXh0XzVcbiAgICAgIH0gYXMgTnpTYWZlQW55KVt0aGlzLnR5cGUhXTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==