/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ElementRef, EventEmitter, TemplateRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as ɵngcc0 from '@angular/core';
export declare class NzSelectClearComponent {
    private elementRef;
    clearIcon: TemplateRef<NzSafeAny> | null;
    readonly clear: EventEmitter<MouseEvent>;
    constructor(elementRef: ElementRef);
    onClick(e: MouseEvent): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NzSelectClearComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NzSelectClearComponent, "nz-select-clear", never, { "clearIcon": "clearIcon"; }, { "clear": "clear"; }, never, never>;
}

//# sourceMappingURL=select-clear.component.d.ts.map