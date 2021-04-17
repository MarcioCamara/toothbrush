"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const schematics_2 = require("@angular/cdk/schematics");
const workspace_1 = require("@schematics/angular/utility/workspace");
const root_module_1 = require("../../utils/root-module");
function default_1(options) {
    return (host) => __awaiter(this, void 0, void 0, function* () {
        const workspace = yield workspace_1.getWorkspace(host);
        const project = schematics_2.getProjectFromWorkspace(workspace, options.project);
        const prefix = options.prefix || project.prefix;
        return schematics_1.chain([
            schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files/src'), [
                schematics_1.applyTemplates(Object.assign(Object.assign(Object.assign({}, core_1.strings), options), { prefix })),
                schematics_1.move(project.sourceRoot),
                schematics_1.forEach((fileEntry) => {
                    if (host.exists(fileEntry.path)) {
                        host.overwrite(fileEntry.path, fileEntry.content);
                    }
                    return fileEntry;
                })
            ]), schematics_1.MergeStrategy.Overwrite),
            root_module_1.addModule('AppRoutingModule', './app-routing.module'),
            root_module_1.addModule('IconsProviderModule', './icons-provider.module'),
            root_module_1.addModule('NzLayoutModule', 'ng-zorro-antd/layout'),
            root_module_1.addModule('NzMenuModule', 'ng-zorro-antd/menu')
        ]);
    });
}
exports.default = default_1;
//# sourceMappingURL=index.js.map