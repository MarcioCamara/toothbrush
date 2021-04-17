/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
export declare class NzTreeIndentComponent implements OnInit, OnChanges {
    nzTreeLevel: number;
    nzIsStart: boolean[];
    nzIsEnd: boolean[];
    nzSelectMode: boolean;
    listOfUnit: number[];
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
