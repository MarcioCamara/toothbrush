"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNgZorroExportDeclaration = exports.isNgZorroImportDeclaration = exports.ngZorroModuleSpecifier = void 0;
const schematics_1 = require("@angular/cdk/schematics");
exports.ngZorroModuleSpecifier = 'ng-zorro-antd';
function isNgZorroImportDeclaration(node) {
    return isNgZorroDeclaration(schematics_1.getImportDeclaration(node));
}
exports.isNgZorroImportDeclaration = isNgZorroImportDeclaration;
function isNgZorroExportDeclaration(node) {
    return isNgZorroDeclaration(schematics_1.getExportDeclaration(node));
}
exports.isNgZorroExportDeclaration = isNgZorroExportDeclaration;
function isNgZorroDeclaration(declaration) {
    if (!declaration.moduleSpecifier) {
        return false;
    }
    const moduleSpecifier = declaration.moduleSpecifier.getText();
    return moduleSpecifier.indexOf(exports.ngZorroModuleSpecifier) !== -1;
}
//# sourceMappingURL=module-specifiers.js.map