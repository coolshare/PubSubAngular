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
var RightPaneComponent = (function () {
    function RightPaneComponent() {
        this.name = "Right Pane Component";
        this.originalName = "";
        this.bg = "#888";
        this.fg = "#000";
        this.subscriptionMap = new Map();
        var self = this;
        var topic = "/LeftPane/Botton/bg";
        self.subscriptionMap[topic] = PubSubManager_1.PubSubManager.Instance.subscribe(topic, function (options) {
            PubSubManager_1.PubSubManager.Instance.log("LeftPane received topic " + topic + " and options=" + JSON.stringify(options));
            self.bg = options.color;
        });
        topic = "/InsidePane/Link/fg";
        self.subscriptionMap[topic] = PubSubManager_1.PubSubManager.Instance.subscribe(topic, function (options) {
            PubSubManager_1.PubSubManager.Instance.log("LeftPane received topic " + topic + " and options=" + JSON.stringify(options));
            self.fg = PubSubManager_1.PubSubManager.Instance.getRandomColor();
        });
        self.originalName = self.name;
    }
    RightPaneComponent.prototype.handleCheckbox = function (e) {
        var self = this;
        if (e.target.checked) {
            self.subscriptionMap["/Inside/append/text"] = PubSubManager_1.PubSubManager.Instance.subscribe("/Inside/append/text", function (options) {
                PubSubManager_1.PubSubManager.Instance.log("RightPane received topic /Inside/append/text and options=" + JSON.stringify(options));
                self.name = self.originalName + " " + options.text;
            });
        }
        else {
            PubSubManager_1.PubSubManager.Instance.unsubscribe("/Inside/append/text", self.subscriptionMap["/Inside/append/text"]);
        }
    };
    return RightPaneComponent;
}());
RightPaneComponent = __decorate([
    core_1.Component({
        selector: 'right-pane-component',
        styles: ["\n\t\t\t\t.child {\n\t\t\t\tmargin:20px;\n\t\t\t\tpadding: 10px;\n               }\n         "],
        template: "\n\t\t<div class=\"child\" [ngStyle]=\"{'background': bg}\">\n\t\t\t<h4 [ngStyle]=\"{'color':fg}\">{{name}}</h4>\n\t\t\t<input type=\"checkbox\" id=\"rightPane\" (click) = \"handleCheckbox($event)\" />Subscribe \"/Inside/append/text\"\n\t \t\t<button publisher=\"{'topic':'/RightPane/Botton/dh', 'options':{'dh':10}}\">Button in Right Pane (click): Change height of subscriber</button>\n\t \t\t<br/>\n\t \t\tA dropdown in Left (set background color of subscribers):\n            <select publisher=\"{'topic':'/RightPane/Dropdown/bg', 'options':{'bgColor':'___VALUE___'}}\">\n            \t<option value=\"#ff0000\">Red</option>\n            \t<option value=\"#00ff00\">Green</option>\n            \t<option value=\"#0000ff\">Blue</option>\n            </select>\n\t \t</div>"
    }),
    __metadata("design:paramtypes", [])
], RightPaneComponent);
exports.RightPaneComponent = RightPaneComponent;
//# sourceMappingURL=RightPane.component.js.map