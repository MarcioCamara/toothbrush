/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { zoomBadgeMotion } from 'ng-zorro-antd/core/animation';
export class NzBadgeSupComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.nzStyle = null;
        this.nzDot = false;
        this.nzOverflowCount = 99;
        this.disableAnimation = false;
        this.maxNumberArray = [];
        this.countArray = [];
        this.count = 0;
        this.countSingleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-scroll-number');
    }
    generateMaxNumberArray() {
        this.maxNumberArray = this.nzOverflowCount.toString().split('');
    }
    ngOnInit() {
        this.generateMaxNumberArray();
    }
    ngOnChanges(changes) {
        const { nzOverflowCount, nzCount } = changes;
        if (nzCount && typeof nzCount.currentValue === 'number') {
            this.count = Math.max(0, nzCount.currentValue);
            this.countArray = this.count
                .toString()
                .split('')
                .map(item => +item);
        }
        if (nzOverflowCount) {
            this.generateMaxNumberArray();
        }
    }
}
NzBadgeSupComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-badge-sup',
                exportAs: 'nzBadgeSup',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [zoomBadgeMotion],
                template: `
    <ng-container *ngIf="count <= nzOverflowCount; else overflowTemplate">
      <span
        *ngFor="let n of maxNumberArray; let i = index"
        class="ant-scroll-number-only"
        [style.transform]="'translateY(' + -countArray[i] * 100 + '%)'"
      >
        <ng-container *ngIf="!nzDot && countArray[i] !== undefined">
          <p *ngFor="let p of countSingleArray" class="ant-scroll-number-only-unit" [class.current]="p === countArray[i]">
            {{ p }}
          </p>
        </ng-container>
      </span>
    </ng-container>
    <ng-template #overflowTemplate>{{ nzOverflowCount }}+</ng-template>
  `,
                host: {
                    '[@.disabled]': `disableAnimation`,
                    '[@zoomBadgeMotion]': '',
                    '[attr.title]': `nzTitle === null ? '' : nzTitle || nzCount`,
                    '[style]': `nzStyle`,
                    '[style.right.px]': `nzOffset && nzOffset[0] ? -nzOffset[0] : null`,
                    '[style.margin-top.px]': `nzOffset && nzOffset[1] ? nzOffset[1] : null`,
                    '[class.ant-badge-count]': `!nzDot`,
                    '[class.ant-badge-dot]': `nzDot`,
                    '[class.ant-badge-multiple-words]': `countArray.length >= 2`
                }
            },] }
];
NzBadgeSupComponent.ctorParameters = () => [
    { type: ElementRef }
];
NzBadgeSupComponent.propDecorators = {
    nzOffset: [{ type: Input }],
    nzTitle: [{ type: Input }],
    nzStyle: [{ type: Input }],
    nzDot: [{ type: Input }],
    nzOverflowCount: [{ type: Input }],
    disableAnimation: [{ type: Input }],
    nzCount: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2Utc3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvYmFkZ2UvYmFkZ2Utc3VwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUtMLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFzQy9ELE1BQU0sT0FBTyxtQkFBbUI7SUFhOUIsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQVZqQyxZQUFPLEdBQXFDLElBQUksQ0FBQztRQUNqRCxVQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2Qsb0JBQWUsR0FBVyxFQUFFLENBQUM7UUFDN0IscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBRWxDLG1CQUFjLEdBQWEsRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBYSxFQUFFLENBQUM7UUFDMUIsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixxQkFBZ0IsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBR2hELG1EQUFtRDtRQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELHNCQUFzQjtRQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUM3QyxJQUFJLE9BQU8sSUFBSSxPQUFPLE9BQU8sQ0FBQyxZQUFZLEtBQUssUUFBUSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUs7aUJBQ3pCLFFBQVEsRUFBRTtpQkFDVixLQUFLLENBQUMsRUFBRSxDQUFDO2lCQUNULEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkI7UUFDRCxJQUFJLGVBQWUsRUFBRTtZQUNuQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUMvQjtJQUNILENBQUM7OztZQXpFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRSxZQUFZO2dCQUN0QixtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFVBQVUsRUFBRSxDQUFDLGVBQWUsQ0FBQztnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7R0FlVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osY0FBYyxFQUFFLGtCQUFrQjtvQkFDbEMsb0JBQW9CLEVBQUUsRUFBRTtvQkFDeEIsY0FBYyxFQUFFLDRDQUE0QztvQkFDNUQsU0FBUyxFQUFFLFNBQVM7b0JBQ3BCLGtCQUFrQixFQUFFLCtDQUErQztvQkFDbkUsdUJBQXVCLEVBQUUsOENBQThDO29CQUN2RSx5QkFBeUIsRUFBRSxRQUFRO29CQUNuQyx1QkFBdUIsRUFBRSxPQUFPO29CQUNoQyxrQ0FBa0MsRUFBRSx3QkFBd0I7aUJBQzdEO2FBQ0Y7OztZQTdDQyxVQUFVOzs7dUJBK0NULEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLO29CQUNMLEtBQUs7OEJBQ0wsS0FBSzsrQkFDTCxLQUFLO3NCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHpvb21CYWRnZU1vdGlvbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9hbmltYXRpb24nO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotYmFkZ2Utc3VwJyxcbiAgZXhwb3J0QXM6ICduekJhZGdlU3VwJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbem9vbUJhZGdlTW90aW9uXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY291bnQgPD0gbnpPdmVyZmxvd0NvdW50OyBlbHNlIG92ZXJmbG93VGVtcGxhdGVcIj5cbiAgICAgIDxzcGFuXG4gICAgICAgICpuZ0Zvcj1cImxldCBuIG9mIG1heE51bWJlckFycmF5OyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgY2xhc3M9XCJhbnQtc2Nyb2xsLW51bWJlci1vbmx5XCJcbiAgICAgICAgW3N0eWxlLnRyYW5zZm9ybV09XCIndHJhbnNsYXRlWSgnICsgLWNvdW50QXJyYXlbaV0gKiAxMDAgKyAnJSknXCJcbiAgICAgID5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFuekRvdCAmJiBjb3VudEFycmF5W2ldICE9PSB1bmRlZmluZWRcIj5cbiAgICAgICAgICA8cCAqbmdGb3I9XCJsZXQgcCBvZiBjb3VudFNpbmdsZUFycmF5XCIgY2xhc3M9XCJhbnQtc2Nyb2xsLW51bWJlci1vbmx5LXVuaXRcIiBbY2xhc3MuY3VycmVudF09XCJwID09PSBjb3VudEFycmF5W2ldXCI+XG4gICAgICAgICAgICB7eyBwIH19XG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bmctdGVtcGxhdGUgI292ZXJmbG93VGVtcGxhdGU+e3sgbnpPdmVyZmxvd0NvdW50IH19KzwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW0AuZGlzYWJsZWRdJzogYGRpc2FibGVBbmltYXRpb25gLFxuICAgICdbQHpvb21CYWRnZU1vdGlvbl0nOiAnJyxcbiAgICAnW2F0dHIudGl0bGVdJzogYG56VGl0bGUgPT09IG51bGwgPyAnJyA6IG56VGl0bGUgfHwgbnpDb3VudGAsXG4gICAgJ1tzdHlsZV0nOiBgbnpTdHlsZWAsXG4gICAgJ1tzdHlsZS5yaWdodC5weF0nOiBgbnpPZmZzZXQgJiYgbnpPZmZzZXRbMF0gPyAtbnpPZmZzZXRbMF0gOiBudWxsYCxcbiAgICAnW3N0eWxlLm1hcmdpbi10b3AucHhdJzogYG56T2Zmc2V0ICYmIG56T2Zmc2V0WzFdID8gbnpPZmZzZXRbMV0gOiBudWxsYCxcbiAgICAnW2NsYXNzLmFudC1iYWRnZS1jb3VudF0nOiBgIW56RG90YCxcbiAgICAnW2NsYXNzLmFudC1iYWRnZS1kb3RdJzogYG56RG90YCxcbiAgICAnW2NsYXNzLmFudC1iYWRnZS1tdWx0aXBsZS13b3Jkc10nOiBgY291bnRBcnJheS5sZW5ndGggPj0gMmBcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekJhZGdlU3VwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBuek9mZnNldD86IFtudW1iZXIsIG51bWJlcl07XG4gIEBJbnB1dCgpIG56VGl0bGU/OiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBuelN0eWxlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56RG90ID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56T3ZlcmZsb3dDb3VudDogbnVtYmVyID0gOTk7XG4gIEBJbnB1dCgpIGRpc2FibGVBbmltYXRpb24gPSBmYWxzZTtcbiAgQElucHV0KCkgbnpDb3VudD86IG51bWJlciB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT47XG4gIG1heE51bWJlckFycmF5OiBzdHJpbmdbXSA9IFtdO1xuICBjb3VudEFycmF5OiBudW1iZXJbXSA9IFtdO1xuICBjb3VudDogbnVtYmVyID0gMDtcbiAgY291bnRTaW5nbGVBcnJheSA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAvLyBUT0RPOiBtb3ZlIHRvIGhvc3QgYWZ0ZXIgVmlldyBFbmdpbmUgZGVwcmVjYXRpb25cbiAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhbnQtc2Nyb2xsLW51bWJlcicpO1xuICB9XG5cbiAgZ2VuZXJhdGVNYXhOdW1iZXJBcnJheSgpOiB2b2lkIHtcbiAgICB0aGlzLm1heE51bWJlckFycmF5ID0gdGhpcy5uek92ZXJmbG93Q291bnQudG9TdHJpbmcoKS5zcGxpdCgnJyk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmdlbmVyYXRlTWF4TnVtYmVyQXJyYXkoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56T3ZlcmZsb3dDb3VudCwgbnpDb3VudCB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpDb3VudCAmJiB0eXBlb2YgbnpDb3VudC5jdXJyZW50VmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLmNvdW50ID0gTWF0aC5tYXgoMCwgbnpDb3VudC5jdXJyZW50VmFsdWUpO1xuICAgICAgdGhpcy5jb3VudEFycmF5ID0gdGhpcy5jb3VudFxuICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAuc3BsaXQoJycpXG4gICAgICAgIC5tYXAoaXRlbSA9PiAraXRlbSk7XG4gICAgfVxuICAgIGlmIChuek92ZXJmbG93Q291bnQpIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVNYXhOdW1iZXJBcnJheSgpO1xuICAgIH1cbiAgfVxufVxuIl19