"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var LeftPaneComponent = (function () {
    function LeftPaneComponent() {
        this.name = "LeftPane Component";
    }
    return LeftPaneComponent;
}());
LeftPaneComponent = __decorate([
    core_1.Component({
        selector: 'LeftPane-component',
        styles: ["\n \n                     .LeftPane {\n \n                                 background : #aaa;\n \n                                 padding: 10px;\n \n                     }\n \n         "],
        template: "\n \n                     <div class=\"LeftPane\">\n \n                                 <h2>{{name}}</h2>\n \n                     </div>\n \n         "
    })
], LeftPaneComponent);
exports.LeftPaneComponent = LeftPaneComponent;
//# sourceMappingURL=Leftpane.components.js.map