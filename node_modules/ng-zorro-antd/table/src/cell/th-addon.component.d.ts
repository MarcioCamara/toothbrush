/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { Subject } from 'rxjs';
import { NzTableFilterFn, NzTableFilterList, NzTableFilterValue, NzTableSortFn, NzTableSortOrder } from '../table.types';
export declare class NzThAddOnComponent implements OnChanges, OnInit, OnDestroy {
    private cdr;
    static ngAcceptInputType_nzShowSort: BooleanInput;
    static ngAcceptInputType_nzShowFilter: BooleanInput;
    static ngAcceptInputType_nzCustomFilter: BooleanInput;
    manualClickOrder$: Subject<NzThAddOnComponent>;
    calcOperatorChange$: Subject<unknown>;
    nzFilterValue: NzTableFilterValue;
    sortOrder: NzTableSortOrder;
    sortDirections: NzTableSortOrder[];
    private sortOrderChange$;
    private destroy$;
    private isNzShowSortChanged;
    private isNzShowFilterChanged;
    nzColumnKey?: string;
    nzFilterMultiple: boolean;
    nzSortOrder: NzTableSortOrder;
    nzSortPriority: number | boolean;
    nzSortDirections: NzTableSortOrder[];
    nzFilters: NzTableFilterList;
    nzSortFn: NzTableSortFn | boolean | null;
    nzFilterFn: NzTableFilterFn | boolean | null;
    nzShowSort: boolean;
    nzShowFilter: boolean;
    nzCustomFilter: boolean;
    readonly nzCheckedChange: EventEmitter<boolean>;
    readonly nzSortOrderChange: EventEmitter<NzTableSortOrder>;
    readonly nzFilterChange: EventEmitter<any>;
    getNextSortDirection(sortDirections: NzTableSortOrder[], current: NzTableSortOrder): NzTableSortOrder;
    emitNextSortValue(): void;
    setSortOrder(order: NzTableSortOrder): void;
    clearSortOrder(): void;
    onFilterValueChange(value: NzTableFilterValue): void;
    updateCalcOperator(): void;
    constructor(cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
