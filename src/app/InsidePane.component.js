"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var PubSubManager_1 = require("./PubSubManager/PubSubManager");
var InsidePaneComponent = (function () {
    function InsidePaneComponent() {
        this.name = "Inside Pane Component";
        this.originalName = "";
        this.subscriptionMap = new Map();
        var self = this;
        self.originalName = self.name;
    }
    InsidePaneComponent.prototype.handleCheckbox = function (e) {
        var self = this;
        if (e.target.checked) {
            self.subscriptionMap["/Inside/append/text"] = PubSubManager_1.PubSubManager.Instance.subscribe("/Inside/append/text", function (options) {
                PubSubManager_1.PubSubManager.Instance.log("InsidePane received topic /Inside/append/text and options=" + JSON.stringify(options));
                self.name = self.originalName + " " + options.text;
            });
        }
        else {
            PubSubManager_1.PubSubManager.Instance.unsubscribe("/Inside/append/text", self.subscriptionMap["/Inside/append/text"]);
        }
    };
    return InsidePaneComponent;
}());
InsidePaneComponent = __decorate([
    core_1.Component({
        selector: 'inside-pane-component',
        styles: ["\n\t\t\t.child {\n\t\t\tbackground : #aaa;\n\t\t\tmargin:20px;\n\t\t\tpadding: 10px;\n          }"
        ],
        template: "\n\t\t<div class=\"child\">\n\t\t\t<h4>{{name}}</h4> \n\t\t\t<input type=\"checkbox\" (click) = \"handleCheckbox($event)\" />Subscribe \"/Inside/append/text\"\n\t\t\t<br/>\n\t\t\t<a publisher=\"{'topic':'/InsidePane/Link/fg','event':'mouseover'}\">Link in Inside Pane (mouseover): Change backgroud color of subscriber randomly</a>\n\t\t\t<br/><br/>\n\t\t\t\n\t\t\t<p>This field shows dynamically subscription: just check the checkboxes and type below to publish topic \"/Inside/append/text\":</p>\n\t\t\t<input publisher=\"{'topic':'/Inside/append/text', 'event':'keyup', 'options':{'text':'___VALUE___'}}\"/>\n        </div>"
    }),
    __metadata("design:paramtypes", [])
], InsidePaneComponent);
exports.InsidePaneComponent = InsidePaneComponent;
//# sourceMappingURL=InsidePane.component.js.map