"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectStyle = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const schema_1 = require("@schematics/angular/application/schema");
function getProjectStyle(project) {
    const stylesPath = schematics_1.getProjectStyleFile(project);
    const style = stylesPath ? stylesPath.split('.').pop() : schema_1.Style.Css;
    return style;
}
exports.getProjectStyle = getProjectStyle;
//# sourceMappingURL=project-style.js.map