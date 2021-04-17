/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NzTableData, NzTableFilterFn, NzTableFilterValue, NzTableQueryParams, NzTableSortFn, NzTableSortOrder } from './table.types';
export declare class NzTableDataService implements OnDestroy {
    private destroy$;
    private pageIndex$;
    private frontPagination$;
    private pageSize$;
    private listOfData$;
    pageIndexDistinct$: Observable<number>;
    pageSizeDistinct$: Observable<number>;
    listOfCalcOperator$: BehaviorSubject<{
        key?: string | undefined;
        sortFn: NzTableSortFn | null | boolean;
        sortOrder: NzTableSortOrder;
        filterFn: NzTableFilterFn | null | boolean;
        filterValue: NzTableFilterValue;
        sortPriority: number | boolean;
    }[]>;
    queryParams$: Observable<NzTableQueryParams>;
    private listOfDataAfterCalc$;
    private listOfFrontEndCurrentPageData$;
    listOfCurrentPageData$: Observable<any[]>;
    total$: Observable<number>;
    updatePageSize(size: number): void;
    updateFrontPagination(pagination: boolean): void;
    updatePageIndex(index: number): void;
    updateListOfData(list: ReadonlyArray<NzTableData>): void;
    constructor();
    ngOnDestroy(): void;
}
