/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
interface FakeViewportRect {
    left: number;
    top: number;
    width: number;
    height: number;
    bottom: number;
    right: number;
}
interface FakeViewportSize {
    width: number;
    height: number;
}
interface FakeViewportScrollPosition {
    top: number;
    left: number;
}
/** @docs-private */
export declare class FakeViewportRuler {
    getViewportRect(): FakeViewportRect;
    getViewportSize(): FakeViewportSize;
    getViewportScrollPosition(): FakeViewportScrollPosition;
}
export {};
