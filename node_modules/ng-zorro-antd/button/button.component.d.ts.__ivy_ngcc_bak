/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { BooleanInput } from 'ng-zorro-antd/core/types';
/**
 * @deprecated `danger` not supported, use `nzDanger` instead
 * @breaking-change 12.0.0
 */
declare type NzLegacyButtonType = 'primary' | 'default' | 'dashed' | 'danger' | 'link' | 'text' | null;
export declare type NzButtonType = NzLegacyButtonType;
export declare type NzButtonShape = 'circle' | 'round' | null;
export declare type NzButtonSize = 'large' | 'default' | 'small';
export declare class NzButtonComponent implements OnDestroy, OnChanges, AfterViewInit, AfterContentInit, OnInit {
    private elementRef;
    private cdr;
    private renderer;
    nzConfigService: NzConfigService;
    private directionality;
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzBlock: BooleanInput;
    static ngAcceptInputType_nzGhost: BooleanInput;
    static ngAcceptInputType_nzSearch: BooleanInput;
    static ngAcceptInputType_nzLoading: BooleanInput;
    static ngAcceptInputType_nzDanger: BooleanInput;
    static ngAcceptInputType_disabled: BooleanInput;
    nzIconDirectiveElement: ElementRef;
    nzBlock: boolean;
    nzGhost: boolean;
    nzSearch: boolean;
    nzLoading: boolean;
    nzDanger: boolean;
    disabled: boolean;
    tabIndex: number | string | null;
    nzType: NzButtonType;
    nzShape: NzButtonShape;
    nzSize: NzButtonSize;
    dir: Direction;
    private destroy$;
    private loading$;
    insertSpan(nodes: NodeList, renderer: Renderer2): void;
    assertIconOnly(element: HTMLButtonElement, renderer: Renderer2): void;
    constructor(elementRef: ElementRef, cdr: ChangeDetectorRef, renderer: Renderer2, nzConfigService: NzConfigService, directionality: Directionality);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}
export {};
