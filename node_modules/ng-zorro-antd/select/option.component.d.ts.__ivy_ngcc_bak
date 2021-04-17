/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OnChanges, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { Subject } from 'rxjs';
import { NzOptionGroupComponent } from './option-group.component';
export declare class NzOptionComponent implements OnChanges, OnInit, OnDestroy {
    private nzOptionGroupComponent;
    static ngAcceptInputType_nzDisabled: BooleanInput;
    static ngAcceptInputType_nzHide: BooleanInput;
    static ngAcceptInputType_nzCustomContent: BooleanInput;
    private destroy$;
    changes: Subject<unknown>;
    groupLabel: string | number | TemplateRef<NzSafeAny> | null;
    template: TemplateRef<NzSafeAny>;
    nzLabel: string | number | null;
    nzValue: NzSafeAny | null;
    nzDisabled: boolean;
    nzHide: boolean;
    nzCustomContent: boolean;
    constructor(nzOptionGroupComponent: NzOptionGroupComponent);
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
}
