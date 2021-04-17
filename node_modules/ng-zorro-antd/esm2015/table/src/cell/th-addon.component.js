import { __decorate, __metadata } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* tslint:disable:component-selector */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class NzThAddOnComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.manualClickOrder$ = new Subject();
        this.calcOperatorChange$ = new Subject();
        this.nzFilterValue = null;
        this.sortOrder = null;
        this.sortDirections = ['ascend', 'descend', null];
        this.sortOrderChange$ = new Subject();
        this.destroy$ = new Subject();
        this.isNzShowSortChanged = false;
        this.isNzShowFilterChanged = false;
        this.nzFilterMultiple = true;
        this.nzSortOrder = null;
        this.nzSortPriority = false;
        this.nzSortDirections = ['ascend', 'descend', null];
        this.nzFilters = [];
        this.nzSortFn = null;
        this.nzFilterFn = null;
        this.nzShowSort = false;
        this.nzShowFilter = false;
        this.nzCustomFilter = false;
        this.nzCheckedChange = new EventEmitter();
        this.nzSortOrderChange = new EventEmitter();
        this.nzFilterChange = new EventEmitter();
    }
    getNextSortDirection(sortDirections, current) {
        const index = sortDirections.indexOf(current);
        if (index === sortDirections.length - 1) {
            return sortDirections[0];
        }
        else {
            return sortDirections[index + 1];
        }
    }
    emitNextSortValue() {
        if (this.nzShowSort) {
            const nextOrder = this.getNextSortDirection(this.sortDirections, this.sortOrder);
            this.setSortOrder(nextOrder);
            this.manualClickOrder$.next(this);
        }
    }
    setSortOrder(order) {
        this.sortOrderChange$.next(order);
    }
    clearSortOrder() {
        if (this.sortOrder !== null) {
            this.setSortOrder(null);
        }
    }
    onFilterValueChange(value) {
        this.nzFilterChange.emit(value);
        this.nzFilterValue = value;
        this.updateCalcOperator();
    }
    updateCalcOperator() {
        this.calcOperatorChange$.next();
    }
    ngOnInit() {
        this.sortOrderChange$.pipe(takeUntil(this.destroy$)).subscribe(order => {
            if (this.sortOrder !== order) {
                this.sortOrder = order;
                this.nzSortOrderChange.emit(order);
            }
            this.updateCalcOperator();
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { nzSortDirections, nzFilters, nzSortOrder, nzSortFn, nzFilterFn, nzSortPriority, nzFilterMultiple, nzShowSort, nzShowFilter } = changes;
        if (nzSortDirections) {
            if (this.nzSortDirections && this.nzSortDirections.length) {
                this.sortDirections = this.nzSortDirections;
            }
        }
        if (nzSortOrder) {
            this.sortOrder = this.nzSortOrder;
            this.setSortOrder(this.nzSortOrder);
        }
        if (nzShowSort) {
            this.isNzShowSortChanged = true;
        }
        if (nzShowFilter) {
            this.isNzShowFilterChanged = true;
        }
        const isFirstChange = (value) => value && value.firstChange && value.currentValue !== undefined;
        if ((isFirstChange(nzSortOrder) || isFirstChange(nzSortFn)) && !this.isNzShowSortChanged) {
            this.nzShowSort = true;
        }
        if (isFirstChange(nzFilters) && !this.isNzShowFilterChanged) {
            this.nzShowFilter = true;
        }
        if ((nzFilters || nzFilterMultiple) && this.nzShowFilter) {
            const listOfValue = this.nzFilters.filter(item => item.byDefault).map(item => item.value);
            this.nzFilterValue = this.nzFilterMultiple ? listOfValue : listOfValue[0] || null;
        }
        if (nzSortFn || nzFilterFn || nzSortPriority || nzFilters) {
            this.updateCalcOperator();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzThAddOnComponent.decorators = [
    { type: Component, args: [{
                selector: 'th[nzColumnKey], th[nzSortFn], th[nzSortOrder], th[nzFilters], th[nzShowSort], th[nzShowFilter], th[nzCustomFilter]',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <nz-table-filter
      *ngIf="nzShowFilter || nzCustomFilter; else notFilterTemplate"
      [contentTemplate]="notFilterTemplate"
      [extraTemplate]="extraTemplate"
      [customFilter]="nzCustomFilter"
      [filterMultiple]="nzFilterMultiple"
      [listOfFilter]="nzFilters"
      (filterChange)="onFilterValueChange($event)"
    ></nz-table-filter>
    <ng-template #notFilterTemplate>
      <ng-template [ngTemplateOutlet]="nzShowSort ? sortTemplate : contentTemplate"></ng-template>
    </ng-template>
    <ng-template #extraTemplate>
      <ng-content select="[nz-th-extra]"></ng-content>
      <ng-content select="nz-filter-trigger"></ng-content>
    </ng-template>
    <ng-template #sortTemplate>
      <nz-table-sorters [sortOrder]="sortOrder" [sortDirections]="sortDirections" [contentTemplate]="contentTemplate"></nz-table-sorters>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
                host: {
                    '[class.ant-table-column-has-sorters]': 'nzShowSort',
                    '[class.ant-table-column-sort]': `sortOrder === 'descend' || sortOrder === 'ascend'`,
                    '(click)': 'emitNextSortValue()'
                }
            },] }
];
NzThAddOnComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
NzThAddOnComponent.propDecorators = {
    nzColumnKey: [{ type: Input }],
    nzFilterMultiple: [{ type: Input }],
    nzSortOrder: [{ type: Input }],
    nzSortPriority: [{ type: Input }],
    nzSortDirections: [{ type: Input }],
    nzFilters: [{ type: Input }],
    nzSortFn: [{ type: Input }],
    nzFilterFn: [{ type: Input }],
    nzShowSort: [{ type: Input }],
    nzShowFilter: [{ type: Input }],
    nzCustomFilter: [{ type: Input }],
    nzCheckedChange: [{ type: Output }],
    nzSortOrderChange: [{ type: Output }],
    nzFilterChange: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzThAddOnComponent.prototype, "nzShowSort", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzThAddOnComponent.prototype, "nzShowFilter", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzThAddOnComponent.prototype, "nzCustomFilter", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGgtYWRkb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50cy90YWJsZS9zcmMvY2VsbC90aC1hZGRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRztBQUNILHVDQUF1QztBQUN2QyxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEVBR04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQXNDM0MsTUFBTSxPQUFPLGtCQUFrQjtJQWtFN0IsWUFBb0IsR0FBc0I7UUFBdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUE3RDFDLHNCQUFpQixHQUFHLElBQUksT0FBTyxFQUFzQixDQUFDO1FBQ3RELHdCQUFtQixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDcEMsa0JBQWEsR0FBdUIsSUFBSSxDQUFDO1FBQ3pDLGNBQVMsR0FBcUIsSUFBSSxDQUFDO1FBQ25DLG1CQUFjLEdBQXVCLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6RCxxQkFBZ0IsR0FBRyxJQUFJLE9BQU8sRUFBb0IsQ0FBQztRQUNuRCxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUN6Qix3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDNUIsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBRTdCLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUN4QixnQkFBVyxHQUFxQixJQUFJLENBQUM7UUFDckMsbUJBQWMsR0FBcUIsS0FBSyxDQUFDO1FB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b2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cbi8qIHRzbGludDpkaXNhYmxlOmNvbXBvbmVudC1zZWxlY3RvciAqL1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOelRhYmxlRmlsdGVyRm4sIE56VGFibGVGaWx0ZXJMaXN0LCBOelRhYmxlRmlsdGVyVmFsdWUsIE56VGFibGVTb3J0Rm4sIE56VGFibGVTb3J0T3JkZXIgfSBmcm9tICcuLi90YWJsZS50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoW256Q29sdW1uS2V5XSwgdGhbbnpTb3J0Rm5dLCB0aFtuelNvcnRPcmRlcl0sIHRoW256RmlsdGVyc10sIHRoW256U2hvd1NvcnRdLCB0aFtuelNob3dGaWx0ZXJdLCB0aFtuekN1c3RvbUZpbHRlcl0nLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG56LXRhYmxlLWZpbHRlclxuICAgICAgKm5nSWY9XCJuelNob3dGaWx0ZXIgfHwgbnpDdXN0b21GaWx0ZXI7IGVsc2Ugbm90RmlsdGVyVGVtcGxhdGVcIlxuICAgICAgW2NvbnRlbnRUZW1wbGF0ZV09XCJub3RGaWx0ZXJUZW1wbGF0ZVwiXG4gICAgICBbZXh0cmFUZW1wbGF0ZV09XCJleHRyYVRlbXBsYXRlXCJcbiAgICAgIFtjdXN0b21GaWx0ZXJdPVwibnpDdXN0b21GaWx0ZXJcIlxuICAgICAgW2ZpbHRlck11bHRpcGxlXT1cIm56RmlsdGVyTXVsdGlwbGVcIlxuICAgICAgW2xpc3RPZkZpbHRlcl09XCJuekZpbHRlcnNcIlxuICAgICAgKGZpbHRlckNoYW5nZSk9XCJvbkZpbHRlclZhbHVlQ2hhbmdlKCRldmVudClcIlxuICAgID48L256LXRhYmxlLWZpbHRlcj5cbiAgICA8bmctdGVtcGxhdGUgI25vdEZpbHRlclRlbXBsYXRlPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm56U2hvd1NvcnQgPyBzb3J0VGVtcGxhdGUgOiBjb250ZW50VGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICNleHRyYVRlbXBsYXRlPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW256LXRoLWV4dHJhXVwiPjwvbmctY29udGVudD5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm56LWZpbHRlci10cmlnZ2VyXCI+PC9uZy1jb250ZW50PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICNzb3J0VGVtcGxhdGU+XG4gICAgICA8bnotdGFibGUtc29ydGVycyBbc29ydE9yZGVyXT1cInNvcnRPcmRlclwiIFtzb3J0RGlyZWN0aW9uc109XCJzb3J0RGlyZWN0aW9uc1wiIFtjb250ZW50VGVtcGxhdGVdPVwiY29udGVudFRlbXBsYXRlXCI+PC9uei10YWJsZS1zb3J0ZXJzPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICNjb250ZW50VGVtcGxhdGU+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXRhYmxlLWNvbHVtbi1oYXMtc29ydGVyc10nOiAnbnpTaG93U29ydCcsXG4gICAgJ1tjbGFzcy5hbnQtdGFibGUtY29sdW1uLXNvcnRdJzogYHNvcnRPcmRlciA9PT0gJ2Rlc2NlbmQnIHx8IHNvcnRPcmRlciA9PT0gJ2FzY2VuZCdgLFxuICAgICcoY2xpY2spJzogJ2VtaXROZXh0U29ydFZhbHVlKCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUaEFkZE9uQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dTb3J0OiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dGaWx0ZXI6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Q3VzdG9tRmlsdGVyOiBCb29sZWFuSW5wdXQ7XG5cbiAgbWFudWFsQ2xpY2tPcmRlciQgPSBuZXcgU3ViamVjdDxOelRoQWRkT25Db21wb25lbnQ+KCk7XG4gIGNhbGNPcGVyYXRvckNoYW5nZSQgPSBuZXcgU3ViamVjdCgpO1xuICBuekZpbHRlclZhbHVlOiBOelRhYmxlRmlsdGVyVmFsdWUgPSBudWxsO1xuICBzb3J0T3JkZXI6IE56VGFibGVTb3J0T3JkZXIgPSBudWxsO1xuICBzb3J0RGlyZWN0aW9uczogTnpUYWJsZVNvcnRPcmRlcltdID0gWydhc2NlbmQnLCAnZGVzY2VuZCcsIG51bGxdO1xuICBwcml2YXRlIHNvcnRPcmRlckNoYW5nZSQgPSBuZXcgU3ViamVjdDxOelRhYmxlU29ydE9yZGVyPigpO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBpc056U2hvd1NvcnRDaGFuZ2VkID0gZmFsc2U7XG4gIHByaXZhdGUgaXNOelNob3dGaWx0ZXJDaGFuZ2VkID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56Q29sdW1uS2V5Pzogc3RyaW5nO1xuICBASW5wdXQoKSBuekZpbHRlck11bHRpcGxlID0gdHJ1ZTtcbiAgQElucHV0KCkgbnpTb3J0T3JkZXI6IE56VGFibGVTb3J0T3JkZXIgPSBudWxsO1xuICBASW5wdXQoKSBuelNvcnRQcmlvcml0eTogbnVtYmVyIHwgYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBuelNvcnREaXJlY3Rpb25zOiBOelRhYmxlU29ydE9yZGVyW10gPSBbJ2FzY2VuZCcsICdkZXNjZW5kJywgbnVsbF07XG4gIEBJbnB1dCgpIG56RmlsdGVyczogTnpUYWJsZUZpbHRlckxpc3QgPSBbXTtcbiAgQElucHV0KCkgbnpTb3J0Rm46IE56VGFibGVTb3J0Rm4gfCBib29sZWFuIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56RmlsdGVyRm46IE56VGFibGVGaWx0ZXJGbiB8IGJvb2xlYW4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56U2hvd1NvcnQgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56U2hvd0ZpbHRlciA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpDdXN0b21GaWx0ZXIgPSBmYWxzZTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q2hlY2tlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56U29ydE9yZGVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmcgfCBudWxsPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpGaWx0ZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE56VGFibGVGaWx0ZXJWYWx1ZT4oKTtcblxuICBnZXROZXh0U29ydERpcmVjdGlvbihzb3J0RGlyZWN0aW9uczogTnpUYWJsZVNvcnRPcmRlcltdLCBjdXJyZW50OiBOelRhYmxlU29ydE9yZGVyKTogTnpUYWJsZVNvcnRPcmRlciB7XG4gICAgY29uc3QgaW5kZXggPSBzb3J0RGlyZWN0aW9ucy5pbmRleE9mKGN1cnJlbnQpO1xuICAgIGlmIChpbmRleCA9PT0gc29ydERpcmVjdGlvbnMubGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuIHNvcnREaXJlY3Rpb25zWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc29ydERpcmVjdGlvbnNbaW5kZXggKyAxXTtcbiAgICB9XG4gIH1cblxuICBlbWl0TmV4dFNvcnRWYWx1ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uelNob3dTb3J0KSB7XG4gICAgICBjb25zdCBuZXh0T3JkZXIgPSB0aGlzLmdldE5leHRTb3J0RGlyZWN0aW9uKHRoaXMuc29ydERpcmVjdGlvbnMsIHRoaXMuc29ydE9yZGVyISk7XG4gICAgICB0aGlzLnNldFNvcnRPcmRlcihuZXh0T3JkZXIpO1xuICAgICAgdGhpcy5tYW51YWxDbGlja09yZGVyJC5uZXh0KHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIHNldFNvcnRPcmRlcihvcmRlcjogTnpUYWJsZVNvcnRPcmRlcik6IHZvaWQge1xuICAgIHRoaXMuc29ydE9yZGVyQ2hhbmdlJC5uZXh0KG9yZGVyKTtcbiAgfVxuXG4gIGNsZWFyU29ydE9yZGVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNvcnRPcmRlciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXRTb3J0T3JkZXIobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgb25GaWx0ZXJWYWx1ZUNoYW5nZSh2YWx1ZTogTnpUYWJsZUZpbHRlclZhbHVlKTogdm9pZCB7XG4gICAgdGhpcy5uekZpbHRlckNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB0aGlzLm56RmlsdGVyVmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnVwZGF0ZUNhbGNPcGVyYXRvcigpO1xuICB9XG5cbiAgdXBkYXRlQ2FsY09wZXJhdG9yKCk6IHZvaWQge1xuICAgIHRoaXMuY2FsY09wZXJhdG9yQ2hhbmdlJC5uZXh0KCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zb3J0T3JkZXJDaGFuZ2UkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUob3JkZXIgPT4ge1xuICAgICAgaWYgKHRoaXMuc29ydE9yZGVyICE9PSBvcmRlcikge1xuICAgICAgICB0aGlzLnNvcnRPcmRlciA9IG9yZGVyO1xuICAgICAgICB0aGlzLm56U29ydE9yZGVyQ2hhbmdlLmVtaXQob3JkZXIpO1xuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGVDYWxjT3BlcmF0b3IoKTtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHtcbiAgICAgIG56U29ydERpcmVjdGlvbnMsXG4gICAgICBuekZpbHRlcnMsXG4gICAgICBuelNvcnRPcmRlcixcbiAgICAgIG56U29ydEZuLFxuICAgICAgbnpGaWx0ZXJGbixcbiAgICAgIG56U29ydFByaW9yaXR5LFxuICAgICAgbnpGaWx0ZXJNdWx0aXBsZSxcbiAgICAgIG56U2hvd1NvcnQsXG4gICAgICBuelNob3dGaWx0ZXJcbiAgICB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpTb3J0RGlyZWN0aW9ucykge1xuICAgICAgaWYgKHRoaXMubnpTb3J0RGlyZWN0aW9ucyAmJiB0aGlzLm56U29ydERpcmVjdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuc29ydERpcmVjdGlvbnMgPSB0aGlzLm56U29ydERpcmVjdGlvbnM7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChuelNvcnRPcmRlcikge1xuICAgICAgdGhpcy5zb3J0T3JkZXIgPSB0aGlzLm56U29ydE9yZGVyO1xuICAgICAgdGhpcy5zZXRTb3J0T3JkZXIodGhpcy5uelNvcnRPcmRlcik7XG4gICAgfVxuICAgIGlmIChuelNob3dTb3J0KSB7XG4gICAgICB0aGlzLmlzTnpTaG93U29ydENoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAobnpTaG93RmlsdGVyKSB7XG4gICAgICB0aGlzLmlzTnpTaG93RmlsdGVyQ2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIGNvbnN0IGlzRmlyc3RDaGFuZ2UgPSAodmFsdWU6IFNpbXBsZUNoYW5nZSkgPT4gdmFsdWUgJiYgdmFsdWUuZmlyc3RDaGFuZ2UgJiYgdmFsdWUuY3VycmVudFZhbHVlICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKChpc0ZpcnN0Q2hhbmdlKG56U29ydE9yZGVyKSB8fCBpc0ZpcnN0Q2hhbmdlKG56U29ydEZuKSkgJiYgIXRoaXMuaXNOelNob3dTb3J0Q2hhbmdlZCkge1xuICAgICAgdGhpcy5uelNob3dTb3J0ID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGlzRmlyc3RDaGFuZ2UobnpGaWx0ZXJzKSAmJiAhdGhpcy5pc056U2hvd0ZpbHRlckNoYW5nZWQpIHtcbiAgICAgIHRoaXMubnpTaG93RmlsdGVyID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKChuekZpbHRlcnMgfHwgbnpGaWx0ZXJNdWx0aXBsZSkgJiYgdGhpcy5uelNob3dGaWx0ZXIpIHtcbiAgICAgIGNvbnN0IGxpc3RPZlZhbHVlID0gdGhpcy5uekZpbHRlcnMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5ieURlZmF1bHQpLm1hcChpdGVtID0+IGl0ZW0udmFsdWUpO1xuICAgICAgdGhpcy5uekZpbHRlclZhbHVlID0gdGhpcy5uekZpbHRlck11bHRpcGxlID8gbGlzdE9mVmFsdWUgOiBsaXN0T2ZWYWx1ZVswXSB8fCBudWxsO1xuICAgIH1cbiAgICBpZiAobnpTb3J0Rm4gfHwgbnpGaWx0ZXJGbiB8fCBuelNvcnRQcmlvcml0eSB8fCBuekZpbHRlcnMpIHtcbiAgICAgIHRoaXMudXBkYXRlQ2FsY09wZXJhdG9yKCk7XG4gICAgfVxuICB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19