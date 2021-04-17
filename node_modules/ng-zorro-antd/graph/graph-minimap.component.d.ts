/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ElementRef, OnInit } from '@angular/core';
import { ZoomBehavior } from 'd3-zoom';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Minimap } from './core/minimap';
import { NzZoomTransform } from './interface';
export declare class NzGraphMinimapComponent implements OnInit {
    private elementRef;
    minimap?: Minimap;
    constructor(elementRef: ElementRef<HTMLElement>);
    ngOnInit(): void;
    init(containerEle: ElementRef, zoomBehavior: ZoomBehavior<NzSafeAny, NzSafeAny>): void;
    zoom(transform: NzZoomTransform): void;
    update(): void;
}
