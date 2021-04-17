/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { CompatibleValue } from 'ng-zorro-antd/core/time';
import { BooleanInput, FunctionProp, NzSafeAny, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { DateHelperService, NzDatePickerI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';
import { DatePickerService } from './date-picker.service';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { NzPickerComponent } from './picker.component';
import { CompatibleDate, DisabledTimeFn, NzDateMode, PresetRanges, SupportTimeOptions } from './standard-types';
export declare type NzDatePickerSizeType = 'large' | 'default' | 'small';
/**
 * The base picker for all common APIs
 */
export declare class NzDatePickerComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
    nzConfigService: NzConfigService;
    datePickerService: DatePickerService;
    protected i18n: NzI18nService;
    protected cdr: ChangeDetectorRef;
    private renderer;
    private elementRef;
    protected dateHelper: DateHelperService;
    private directionality;
    noAnimation?: NzNoAnimationDirective | undefined;
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzAllowClear: BooleanInput;
    static ngAcceptInputType_nzAutoFocus: BooleanInput;
    static ngAcceptInputType_nzDisabled: BooleanInput;
    static ngAcceptInputType_nzBorderless: BooleanInput;
    static ngAcceptInputType_nzInputReadOnly: BooleanInput;
    static ngAcceptInputType_nzInline: BooleanInput;
    static ngAcceptInputType_nzOpen: BooleanInput;
    static ngAcceptInputType_nzShowToday: BooleanInput;
    static ngAcceptInputType_nzShowNow: BooleanInput;
    static ngAcceptInputType_nzMode: NzDateMode | NzDateMode[] | string | string[] | null | undefined;
    static ngAcceptInputType_nzShowTime: BooleanInput | SupportTimeOptions | null | undefined;
    isRange: boolean;
    focused: boolean;
    extraFooter?: TemplateRef<NzSafeAny> | string;
    dir: Direction;
    panelMode: NzDateMode | NzDateMode[];
    private destroyed$;
    private isCustomPlaceHolder;
    private isCustomFormat;
    private showTime;
    nzAllowClear: boolean;
    nzAutoFocus: boolean;
    nzDisabled: boolean;
    nzBorderless: boolean;
    nzInputReadOnly: boolean;
    nzInline: boolean;
    nzOpen?: boolean;
    nzDisabledDate?: (d: Date) => boolean;
    nzLocale: NzDatePickerI18nInterface;
    nzPlaceHolder: string | string[];
    nzPopupStyle: object;
    nzDropdownClassName?: string;
    nzSize: NzDatePickerSizeType;
    nzFormat: string;
    nzDateRender?: TemplateRef<NzSafeAny> | string | FunctionProp<TemplateRef<Date> | string>;
    nzDisabledTime?: DisabledTimeFn;
    nzRenderExtraFooter?: TemplateRef<NzSafeAny> | string | FunctionProp<TemplateRef<NzSafeAny> | string>;
    nzShowToday: boolean;
    nzMode: NzDateMode;
    nzShowNow: boolean;
    nzRanges?: PresetRanges;
    nzDefaultPickerValue: CompatibleDate | null;
    nzSeparator?: string;
    nzSuffixIcon: string | TemplateRef<NzSafeAny>;
    nzBackdrop: boolean;
    nzId: string | null;
    readonly nzOnPanelChange: EventEmitter<string | NzDateMode[] | string[]>;
    readonly nzOnCalendarChange: EventEmitter<(Date | null)[]>;
    readonly nzOnOk: EventEmitter<Date | Date[] | null>;
    readonly nzOnOpenChange: EventEmitter<boolean>;
    picker: NzPickerComponent;
    get nzShowTime(): SupportTimeOptions | boolean;
    set nzShowTime(value: SupportTimeOptions | boolean);
    constructor(nzConfigService: NzConfigService, datePickerService: DatePickerService, i18n: NzI18nService, cdr: ChangeDetectorRef, renderer: Renderer2, elementRef: ElementRef, dateHelper: DateHelperService, directionality: Directionality, noAnimation?: NzNoAnimationDirective | undefined);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    setModeAndFormat(): void;
    /**
     * Triggered when overlayOpen changes (different with realOpenState)
     * @param open The overlayOpen in picker component
     */
    onOpenChange(open: boolean): void;
    open(): void;
    close(): void;
    onChangeFn: OnChangeType;
    onTouchedFn: OnTouchedType;
    writeValue(value: CompatibleDate): void;
    registerOnChange(fn: OnChangeType): void;
    registerOnTouched(fn: OnTouchedType): void;
    setDisabledState(isDisabled: boolean): void;
    private setLocale;
    private setDefaultPlaceHolder;
    private getPropertyOfLocale;
    private setValue;
    onFocusChange(value: FocusEvent): void;
    onPanelModeChange(panelMode: NzDateMode | NzDateMode[]): void;
    onCalendarChange(value: CompatibleValue): void;
    onResultOk(): void;
}
