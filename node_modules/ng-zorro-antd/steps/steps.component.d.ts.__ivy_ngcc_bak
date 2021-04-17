/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AfterContentInit, ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { BooleanInput, NgClassType, NzSizeDSType } from 'ng-zorro-antd/core/types';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { NzStepComponent } from './step.component';
export declare type NzDirectionType = 'horizontal' | 'vertical';
export declare type NzStatusType = 'wait' | 'process' | 'finish' | 'error';
export declare type nzProgressDotTemplate = TemplateRef<{
    $implicit: TemplateRef<void>;
    status: string;
    index: number;
}>;
export declare class NzStepsComponent implements OnChanges, OnInit, OnDestroy, AfterContentInit {
    private cdr;
    private directionality;
    static ngAcceptInputType_nzProgressDot: BooleanInput | nzProgressDotTemplate | undefined | null;
    steps: QueryList<NzStepComponent>;
    nzCurrent: number;
    nzDirection: NzDirectionType;
    nzLabelPlacement: 'horizontal' | 'vertical';
    nzType: 'default' | 'navigation';
    nzSize: NzSizeDSType;
    nzStartIndex: number;
    nzStatus: NzStatusType;
    set nzProgressDot(value: boolean | nzProgressDotTemplate);
    readonly nzIndexChange: EventEmitter<number>;
    private destroy$;
    private indexChangeSubscription?;
    showProcessDot: boolean;
    customProcessDotTemplate?: TemplateRef<{
        $implicit: TemplateRef<void>;
        status: string;
        index: number;
    }>;
    classMap: NgClassType;
    dir: Direction;
    constructor(cdr: ChangeDetectorRef, directionality: Directionality);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    private updateChildrenSteps;
    private setClassMap;
}
