/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, OnDestroy, TemplateRef } from '@angular/core';
import { BooleanInput, NgClassType } from 'ng-zorro-antd/core/types';
import { Subject } from 'rxjs';
export declare class NzStepComponent implements OnDestroy {
    private cdr;
    static ngAcceptInputType_nzDisabled: BooleanInput;
    processDotTemplate?: TemplateRef<void>;
    nzTitle?: string | TemplateRef<void>;
    nzSubtitle?: string | TemplateRef<void>;
    nzDescription?: string | TemplateRef<void>;
    nzDisabled: boolean;
    get nzStatus(): string;
    set nzStatus(status: string);
    isCustomStatus: boolean;
    private _status;
    get nzIcon(): NgClassType | TemplateRef<void> | undefined;
    set nzIcon(value: NgClassType | TemplateRef<void> | undefined);
    oldAPIIcon: boolean;
    private _icon?;
    customProcessTemplate?: TemplateRef<{
        $implicit: TemplateRef<void>;
        status: string;
        index: number;
    }>;
    direction: string;
    index: number;
    last: boolean;
    outStatus: string;
    showProcessDot: boolean;
    clickable: boolean;
    click$: Subject<number>;
    get currentIndex(): number;
    set currentIndex(current: number);
    private _currentIndex;
    constructor(cdr: ChangeDetectorRef);
    onClick(): void;
    enable(): void;
    disable(): void;
    markForCheck(): void;
    ngOnDestroy(): void;
}
