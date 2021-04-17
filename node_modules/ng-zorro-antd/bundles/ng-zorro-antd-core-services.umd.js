(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('ng-zorro-antd/core/environments'), require('ng-zorro-antd/core/util'), require('@angular/common'), require('ng-zorro-antd/core/polyfill'), require('@angular/cdk/layout')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/core/services', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', 'ng-zorro-antd/core/environments', 'ng-zorro-antd/core/util', '@angular/common', 'ng-zorro-antd/core/polyfill', '@angular/cdk/layout'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].core = global['ng-zorro-antd'].core || {}, global['ng-zorro-antd'].core.services = {}), global.ng.core, global.rxjs, global.rxjs.operators, global['ng-zorro-antd'].core.environments, global['ng-zorro-antd'].core.util, global.ng.common, global['ng-zorro-antd'].core.polyfill, global.ng.cdk.layout));
}(this, (function (exports, i0, rxjs, operators, environments, util, i1, polyfill, i2) { 'use strict';

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NOOP = function () { };
    var ɵ0 = NOOP;
    var NzResizeService = /** @class */ (function () {
        function NzResizeService(ngZone, rendererFactory2) {
            var _this = this;
            this.ngZone = ngZone;
            this.rendererFactory2 = rendererFactory2;
            this.resizeSource$ = new rxjs.Subject();
            this.listeners = 0;
            this.disposeHandle = NOOP;
            this.handler = function () {
                _this.ngZone.run(function () {
                    _this.resizeSource$.next();
                });
            };
            this.renderer = this.rendererFactory2.createRenderer(null, null);
        }
        NzResizeService.prototype.subscribe = function () {
            var _this = this;
            this.registerListener();
            return this.resizeSource$.pipe(operators.auditTime(16), operators.finalize(function () { return _this.unregisterListener(); }));
        };
        NzResizeService.prototype.unsubscribe = function () {
            this.unregisterListener();
        };
        NzResizeService.prototype.registerListener = function () {
            var _this = this;
            if (this.listeners === 0) {
                this.ngZone.runOutsideAngular(function () {
                    _this.disposeHandle = _this.renderer.listen('window', 'resize', _this.handler);
                });
            }
            this.listeners += 1;
        };
        NzResizeService.prototype.unregisterListener = function () {
            this.listeners -= 1;
            if (this.listeners === 0) {
                this.disposeHandle();
                this.disposeHandle = NOOP;
            }
        };
        return NzResizeService;
    }());
    NzResizeService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzResizeService_Factory() { return new NzResizeService(i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i0.RendererFactory2)); }, token: NzResizeService, providedIn: "root" });
    NzResizeService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    NzResizeService.ctorParameters = function () { return [
        { type: i0.NgZone },
        { type: i0.RendererFactory2 }
    ]; };

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    /**
     * When running in test, singletons should not be destroyed. So we keep references of singletons
     * in this global variable.
     */
    var testSingleRegistry = new Map();
    /**
     * Some singletons should have life cycle that is same to Angular's. This service make sure that
     * those singletons get destroyed in HMR.
     */
    var NzSingletonService = /** @class */ (function () {
        function NzSingletonService() {
            /**
             * This registry is used to register singleton in dev mode.
             * So that singletons get destroyed when hot module reload happens.
             *
             * This works in prod mode too but with no specific effect.
             */
            this._singletonRegistry = new Map();
        }
        Object.defineProperty(NzSingletonService.prototype, "singletonRegistry", {
            get: function () {
                return environments.environment.isTestMode ? testSingleRegistry : this._singletonRegistry;
            },
            enumerable: false,
            configurable: true
        });
        NzSingletonService.prototype.registerSingletonWithKey = function (key, target) {
            var alreadyHave = this.singletonRegistry.has(key);
            var item = alreadyHave ? this.singletonRegistry.get(key) : this.withNewTarget(target);
            if (!alreadyHave) {
                this.singletonRegistry.set(key, item);
            }
        };
        NzSingletonService.prototype.getSingletonWithKey = function (key) {
            return this.singletonRegistry.has(key) ? this.singletonRegistry.get(key).target : null;
        };
        NzSingletonService.prototype.withNewTarget = function (target) {
            return {
                target: target
            };
        };
        return NzSingletonService;
    }());
    NzSingletonService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzSingletonService_Factory() { return new NzSingletonService(); }, token: NzSingletonService, providedIn: "root" });
    NzSingletonService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    function getPagePosition(event) {
        var e = util.getEventPosition(event);
        return {
            x: e.pageX,
            y: e.pageY
        };
    }
    /**
     * This module provide a global dragging service to other components.
     */
    var NzDragService = /** @class */ (function () {
        function NzDragService(rendererFactory2) {
            this.draggingThreshold = 5;
            this.currentDraggingSequence = null;
            this.currentStartingPoint = null;
            this.handleRegistry = new Set();
            this.renderer = rendererFactory2.createRenderer(null, null);
        }
        NzDragService.prototype.requestDraggingSequence = function (event) {
            var _this = this;
            if (!this.handleRegistry.size) {
                this.registerDraggingHandler(util.isTouchEvent(event));
            }
            // Complete last dragging sequence if a new target is dragged.
            if (this.currentDraggingSequence) {
                this.currentDraggingSequence.complete();
            }
            this.currentStartingPoint = getPagePosition(event);
            this.currentDraggingSequence = new rxjs.Subject();
            return this.currentDraggingSequence.pipe(operators.map(function (e) {
                return {
                    x: e.pageX - _this.currentStartingPoint.x,
                    y: e.pageY - _this.currentStartingPoint.y
                };
            }), operators.filter(function (e) { return Math.abs(e.x) > _this.draggingThreshold || Math.abs(e.y) > _this.draggingThreshold; }), operators.finalize(function () { return _this.teardownDraggingSequence(); }));
        };
        NzDragService.prototype.registerDraggingHandler = function (isTouch) {
            var _this = this;
            if (isTouch) {
                this.handleRegistry.add({
                    teardown: this.renderer.listen('document', 'touchmove', function (e) {
                        if (_this.currentDraggingSequence) {
                            _this.currentDraggingSequence.next(e.touches[0] || e.changedTouches[0]);
                        }
                    })
                });
                this.handleRegistry.add({
                    teardown: this.renderer.listen('document', 'touchend', function () {
                        if (_this.currentDraggingSequence) {
                            _this.currentDraggingSequence.complete();
                        }
                    })
                });
            }
            else {
                this.handleRegistry.add({
                    teardown: this.renderer.listen('document', 'mousemove', function (e) {
                        if (_this.currentDraggingSequence) {
                            _this.currentDraggingSequence.next(e);
                        }
                    })
                });
                this.handleRegistry.add({
                    teardown: this.renderer.listen('document', 'mouseup', function () {
                        if (_this.currentDraggingSequence) {
                            _this.currentDraggingSequence.complete();
                        }
                    })
                });
            }
        };
        NzDragService.prototype.teardownDraggingSequence = function () {
            this.currentDraggingSequence = null;
        };
        return NzDragService;
    }());
    NzDragService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzDragService_Factory() { return new NzDragService(i0.ɵɵinject(i0.RendererFactory2)); }, token: NzDragService, providedIn: "root" });
    NzDragService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    NzDragService.ctorParameters = function () { return [
        { type: i0.RendererFactory2 }
    ]; };

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    function easeInOutCubic(t, b, c, d) {
        var cc = c - b;
        var tt = t / (d / 2);
        if (tt < 1) {
            return (cc / 2) * tt * tt * tt + b;
        }
        else {
            return (cc / 2) * ((tt -= 2) * tt * tt + 2) + b;
        }
    }
    var NzScrollService = /** @class */ (function () {
        function NzScrollService(doc) {
            this.doc = doc;
        }
        /** Set the position of the scroll bar of `el`. */
        NzScrollService.prototype.setScrollTop = function (el, topValue) {
            if (topValue === void 0) { topValue = 0; }
            if (el === window) {
                this.doc.body.scrollTop = topValue;
                this.doc.documentElement.scrollTop = topValue;
            }
            else {
                el.scrollTop = topValue;
            }
        };
        /** Get position of `el` against window. */
        NzScrollService.prototype.getOffset = function (el) {
            var ret = {
                top: 0,
                left: 0
            };
            if (!el || !el.getClientRects().length) {
                return ret;
            }
            var rect = el.getBoundingClientRect();
            if (rect.width || rect.height) {
                var doc = el.ownerDocument.documentElement;
                ret.top = rect.top - doc.clientTop;
                ret.left = rect.left - doc.clientLeft;
            }
            else {
                ret.top = rect.top;
                ret.left = rect.left;
            }
            return ret;
        };
        /** Get the position of the scoll bar of `el`. */
        // TODO: remove '| Window' as the fallback already happens here
        NzScrollService.prototype.getScroll = function (target, top) {
            if (top === void 0) { top = true; }
            if (typeof window === 'undefined') {
                return 0;
            }
            var method = top ? 'scrollTop' : 'scrollLeft';
            var result = 0;
            if (this.isWindow(target)) {
                result = target[top ? 'pageYOffset' : 'pageXOffset'];
            }
            else if (target instanceof Document) {
                result = target.documentElement[method];
            }
            else if (target) {
                result = target[method];
            }
            if (target && !this.isWindow(target) && typeof result !== 'number') {
                result = (target.ownerDocument || target).documentElement[method];
            }
            return result;
        };
        NzScrollService.prototype.isWindow = function (obj) {
            return obj !== null && obj !== undefined && obj === obj.window;
        };
        /**
         * Scroll `el` to some position with animation.
         *
         * @param containerEl container, `window` by default
         * @param y Scroll to `top`, 0 by default
         */
        NzScrollService.prototype.scrollTo = function (containerEl, y, options) {
            var _this = this;
            if (y === void 0) { y = 0; }
            if (options === void 0) { options = {}; }
            var target = containerEl ? containerEl : window;
            var scrollTop = this.getScroll(target);
            var startTime = Date.now();
            var easing = options.easing, callback = options.callback, _a = options.duration, duration = _a === void 0 ? 450 : _a;
            var frameFunc = function () {
                var timestamp = Date.now();
                var time = timestamp - startTime;
                var nextScrollTop = (easing || easeInOutCubic)(time > duration ? duration : time, scrollTop, y, duration);
                if (_this.isWindow(target)) {
                    target.scrollTo(window.pageXOffset, nextScrollTop);
                }
                else if (target instanceof HTMLDocument || target.constructor.name === 'HTMLDocument') {
                    target.documentElement.scrollTop = nextScrollTop;
                }
                else {
                    target.scrollTop = nextScrollTop;
                }
                if (time < duration) {
                    polyfill.reqAnimFrame(frameFunc);
                }
                else if (typeof callback === 'function') {
                    callback();
                }
            };
            polyfill.reqAnimFrame(frameFunc);
        };
        return NzScrollService;
    }());
    NzScrollService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzScrollService_Factory() { return new NzScrollService(i0.ɵɵinject(i1.DOCUMENT)); }, token: NzScrollService, providedIn: "root" });
    NzScrollService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    NzScrollService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] }
    ]; };

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    (function (NzBreakpointEnum) {
        NzBreakpointEnum["xxl"] = "xxl";
        NzBreakpointEnum["xl"] = "xl";
        NzBreakpointEnum["lg"] = "lg";
        NzBreakpointEnum["md"] = "md";
        NzBreakpointEnum["sm"] = "sm";
        NzBreakpointEnum["xs"] = "xs";
    })(exports.NzBreakpointEnum || (exports.NzBreakpointEnum = {}));
    var gridResponsiveMap = {
        xs: '(max-width: 575px)',
        sm: '(min-width: 576px)',
        md: '(min-width: 768px)',
        lg: '(min-width: 992px)',
        xl: '(min-width: 1200px)',
        xxl: '(min-width: 1600px)'
    };
    var siderResponsiveMap = {
        xs: '(max-width: 479.98px)',
        sm: '(max-width: 575.98px)',
        md: '(max-width: 767.98px)',
        lg: '(max-width: 991.98px)',
        xl: '(max-width: 1199.98px)',
        xxl: '(max-width: 1599.98px)'
    };
    var NzBreakpointService = /** @class */ (function () {
        function NzBreakpointService(resizeService, mediaMatcher) {
            this.resizeService = resizeService;
            this.mediaMatcher = mediaMatcher;
            this.resizeService.subscribe().subscribe(function () { });
        }
        NzBreakpointService.prototype.subscribe = function (breakpointMap, fullMap) {
            var _this = this;
            if (fullMap) {
                var get = function () { return _this.matchMedia(breakpointMap, true); };
                return this.resizeService.subscribe().pipe(operators.map(get), operators.startWith(get()), operators.distinctUntilChanged(function (x, y) { return x[0] === y[0]; }), operators.map(function (x) { return x[1]; }));
            }
            else {
                var get = function () { return _this.matchMedia(breakpointMap); };
                return this.resizeService.subscribe().pipe(operators.map(get), operators.startWith(get()), operators.distinctUntilChanged());
            }
        };
        NzBreakpointService.prototype.matchMedia = function (breakpointMap, fullMap) {
            var _this = this;
            var bp = exports.NzBreakpointEnum.md;
            var breakpointBooleanMap = {};
            Object.keys(breakpointMap).map(function (breakpoint) {
                var castBP = breakpoint;
                var matched = _this.mediaMatcher.matchMedia(gridResponsiveMap[castBP]).matches;
                breakpointBooleanMap[breakpoint] = matched;
                if (matched) {
                    bp = castBP;
                }
            });
            if (fullMap) {
                return [bp, breakpointBooleanMap];
            }
            else {
                return bp;
            }
        };
        return NzBreakpointService;
    }());
    NzBreakpointService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzBreakpointService_Factory() { return new NzBreakpointService(i0.ɵɵinject(NzResizeService), i0.ɵɵinject(i2.MediaMatcher)); }, token: NzBreakpointService, providedIn: "root" });
    NzBreakpointService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    NzBreakpointService.ctorParameters = function () { return [
        { type: NzResizeService },
        { type: i2.MediaMatcher }
    ]; };

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NzBreakpointService = NzBreakpointService;
    exports.NzDragService = NzDragService;
    exports.NzResizeService = NzResizeService;
    exports.NzScrollService = NzScrollService;
    exports.NzSingletonService = NzSingletonService;
    exports.gridResponsiveMap = gridResponsiveMap;
    exports.siderResponsiveMap = siderResponsiveMap;
    exports.ɵ0 = ɵ0;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-core-services.umd.js.map
