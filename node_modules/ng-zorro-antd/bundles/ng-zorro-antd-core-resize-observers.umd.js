(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/coercion'), require('resize-observer-polyfill'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/core/resize-observers', ['exports', '@angular/core', '@angular/cdk/coercion', 'resize-observer-polyfill', 'rxjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].core = global['ng-zorro-antd'].core || {}, global['ng-zorro-antd'].core['resize-observers'] = {}), global.ng.core, global.ng.cdk.coercion, global.ResizeObserver, global.rxjs));
}(this, (function (exports, i0, coercion, ResizeObserver, rxjs) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var ResizeObserver__default = /*#__PURE__*/_interopDefaultLegacy(ResizeObserver);

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    /**
     * Factory that creates a new ResizeObserver and allows us to stub it out in unit tests.
     */
    var NzResizeObserverFactory = /** @class */ (function () {
        function NzResizeObserverFactory() {
        }
        NzResizeObserverFactory.prototype.create = function (callback) {
            return typeof ResizeObserver__default['default'] === 'undefined' ? null : new ResizeObserver__default['default'](callback);
        };
        return NzResizeObserverFactory;
    }());
    NzResizeObserverFactory.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzResizeObserverFactory_Factory() { return new NzResizeObserverFactory(); }, token: NzResizeObserverFactory, providedIn: "root" });
    NzResizeObserverFactory.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** An injectable service that allows watching elements for changes to their content. */
    var NzResizeObserver = /** @class */ (function () {
        function NzResizeObserver(nzResizeObserverFactory) {
            this.nzResizeObserverFactory = nzResizeObserverFactory;
            /** Keeps track of the existing ResizeObservers so they can be reused. */
            this.observedElements = new Map();
        }
        NzResizeObserver.prototype.ngOnDestroy = function () {
            var _this = this;
            this.observedElements.forEach(function (_, element) { return _this.cleanupObserver(element); });
        };
        NzResizeObserver.prototype.observe = function (elementOrRef) {
            var _this = this;
            var element = coercion.coerceElement(elementOrRef);
            return new rxjs.Observable(function (observer) {
                var stream = _this.observeElement(element);
                var subscription = stream.subscribe(observer);
                return function () {
                    subscription.unsubscribe();
                    _this.unobserveElement(element);
                };
            });
        };
        /**
         * Observes the given element by using the existing ResizeObserver if available, or creating a
         * new one if not.
         */
        NzResizeObserver.prototype.observeElement = function (element) {
            if (!this.observedElements.has(element)) {
                var stream_1 = new rxjs.Subject();
                var observer = this.nzResizeObserverFactory.create(function (mutations) { return stream_1.next(mutations); });
                if (observer) {
                    observer.observe(element);
                }
                this.observedElements.set(element, { observer: observer, stream: stream_1, count: 1 });
            }
            else {
                this.observedElements.get(element).count++;
            }
            return this.observedElements.get(element).stream;
        };
        /**
         * Un-observes the given element and cleans up the underlying ResizeObserver if nobody else is
         * observing this element.
         */
        NzResizeObserver.prototype.unobserveElement = function (element) {
            if (this.observedElements.has(element)) {
                this.observedElements.get(element).count--;
                if (!this.observedElements.get(element).count) {
                    this.cleanupObserver(element);
                }
            }
        };
        /** Clean up the underlying ResizeObserver for the specified element. */
        NzResizeObserver.prototype.cleanupObserver = function (element) {
            if (this.observedElements.has(element)) {
                var _a = this.observedElements.get(element), observer = _a.observer, stream = _a.stream;
                if (observer) {
                    observer.disconnect();
                }
                stream.complete();
                this.observedElements.delete(element);
            }
        };
        return NzResizeObserver;
    }());
    NzResizeObserver.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzResizeObserver_Factory() { return new NzResizeObserver(i0.ɵɵinject(NzResizeObserverFactory)); }, token: NzResizeObserver, providedIn: "root" });
    NzResizeObserver.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    NzResizeObserver.ctorParameters = function () { return [
        { type: NzResizeObserverFactory }
    ]; };

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzResizeObserversModule = /** @class */ (function () {
        function NzResizeObserversModule() {
        }
        return NzResizeObserversModule;
    }());
    NzResizeObserversModule.decorators = [
        { type: i0.NgModule, args: [{
                    providers: [NzResizeObserverFactory]
                },] }
    ];

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NzResizeObserver = NzResizeObserver;
    exports.NzResizeObserversModule = NzResizeObserversModule;
    exports.ɵNzResizeObserverFactory = NzResizeObserverFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-core-resize-observers.umd.js.map
