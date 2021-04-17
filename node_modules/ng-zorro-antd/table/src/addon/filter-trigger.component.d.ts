/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
export declare class NzFilterTriggerComponent {
    private cdr;
    private elementRef;
    nzActive: boolean;
    nzDropdownMenu: NzDropdownMenuComponent;
    nzVisible: boolean;
    nzHasBackdrop: boolean;
    readonly nzVisibleChange: EventEmitter<boolean>;
    onVisibleChange(visible: boolean): void;
    onFilterClick($event: MouseEvent): void;
    hide(): void;
    show(): void;
    constructor(cdr: ChangeDetectorRef, elementRef: ElementRef);
}
