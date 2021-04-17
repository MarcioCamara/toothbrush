(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/core/config', ['exports', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].core = global['ng-zorro-antd'].core || {}, global['ng-zorro-antd'].core.config = {}), global.ng.core, global.rxjs, global.rxjs.operators));
}(this, (function (exports, i0, rxjs, operators) { 'use strict';

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    /**
     * User should provide an object implements this interface to set global configurations.
     */
    var NZ_CONFIG = new i0.InjectionToken('nz-config');

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var isDefined = function (value) {
        return value !== undefined;
    };
    var ɵ0 = isDefined;
    var NzConfigService = /** @class */ (function () {
        function NzConfigService(defaultConfig) {
            this.configUpdated$ = new rxjs.Subject();
            this.config = defaultConfig || {};
        }
        NzConfigService.prototype.getConfigForComponent = function (componentName) {
            return this.config[componentName];
        };
        NzConfigService.prototype.getConfigChangeEventForComponent = function (componentName) {
            return this.configUpdated$.pipe(operators.filter(function (n) { return n === componentName; }), operators.mapTo(undefined));
        };
        NzConfigService.prototype.set = function (componentName, value) {
            this.config[componentName] = Object.assign(Object.assign({}, this.config[componentName]), value);
            this.configUpdated$.next(componentName);
        };
        return NzConfigService;
    }());
    NzConfigService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzConfigService_Factory() { return new NzConfigService(i0.ɵɵinject(NZ_CONFIG, 8)); }, token: NzConfigService, providedIn: "root" });
    NzConfigService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    NzConfigService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [NZ_CONFIG,] }] }
    ]; };
    // tslint:disable:no-invalid-this
    /**
     * This decorator is used to decorate properties. If a property is decorated, it would try to load default value from
     * config.
     */
    // tslint:disable-next-line:typedef
    function WithConfig() {
        return function ConfigDecorator(target, propName, originalDescriptor) {
            var privatePropName = "$$__assignedValue__" + propName;
            Object.defineProperty(target, privatePropName, {
                configurable: true,
                writable: true,
                enumerable: false
            });
            return {
                get: function () {
                    var originalValue = (originalDescriptor === null || originalDescriptor === void 0 ? void 0 : originalDescriptor.get) ? originalDescriptor.get.bind(this)() : this[privatePropName];
                    var assignedByUser = ((this.assignmentCount || {})[propName] || 0) > 1;
                    if (assignedByUser && isDefined(originalValue)) {
                        return originalValue;
                    }
                    var componentConfig = this.nzConfigService.getConfigForComponent(this._nzModuleName) || {};
                    var configValue = componentConfig[propName];
                    var ret = isDefined(configValue) ? configValue : originalValue;
                    return ret;
                },
                set: function (value) {
                    // If the value is assigned, we consider the newly assigned value as 'assigned by user'.
                    this.assignmentCount = this.assignmentCount || {};
                    this.assignmentCount[propName] = (this.assignmentCount[propName] || 0) + 1;
                    if (originalDescriptor === null || originalDescriptor === void 0 ? void 0 : originalDescriptor.set) {
                        originalDescriptor.set.bind(this)(value);
                    }
                    else {
                        this[privatePropName] = value;
                    }
                },
                configurable: true,
                enumerable: true
            };
        };
    }

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NZ_CONFIG = NZ_CONFIG;
    exports.NzConfigService = NzConfigService;
    exports.WithConfig = WithConfig;
    exports.ɵ0 = ɵ0;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-core-config.umd.js.map
