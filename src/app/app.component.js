"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var RightPane_component_1 = require("./RightPane.component");
var LeftPane_component_1 = require("./LeftPane.component");
var AppComponent = (function () {
    function AppComponent() {
        this.name = "Main Component";
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        styles: ["\n\t\t.parent {\n\t\t\tbackground : #c7c7c7;\n\t\t\tpadding: 20px;\n\t\t}"],
        template: "\n\t\t<div class=\"parent\">\n\t\t\t<div className=\"App-header\">\n\t\t\t\t<img src=\"../coolshare.gif\"/>\n\t\t\t\t<h2>Welcome to Coolshare Angular Pubsub</h2>\n\t\t\t</div>\n\t\t\t<p>This page shows how components communicate with pub/sub. There are 3 components on this page: \"Left\", \"Right\" and \"Inside\". You can try to click the buttons or mouseover the link to see the publishing history in the console.\n\t\t\t</p>\n\t\t\t<h3>{{name}}</h3>\n \t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<left-pane-component></left-pane-component>\n\t\t\t\t</div>\t\n\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<right-pane-component></right-pane-component>\n\t\t\t\t </div>\n\t\t\t</div>\n\t\t</div>",
        entryComponents: [RightPane_component_1.RightPaneComponent, LeftPane_component_1.LeftPaneComponent]
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map