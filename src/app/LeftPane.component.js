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
var LeftPaneComponent = (function () {
    function LeftPaneComponent(zone) {
        this.zone = zone;
        this.name = "LeftPane Component";
        this.hh = 350;
        this.fg = "#000";
        this.bg = "#bbb";
        this.originalName = "";
        this.subscriptionMap = new Map();
        var self = this;
        self.zone = zone;
        self.subscriptionMap["/RightPane/Botton/dh"] = PubSubManager_1.PubSubManager.Instance.subscribe("/RightPane/Botton/dh", function (options) {
            PubSubManager_1.PubSubManager.Instance.log("LeftPane received topic /RightPane/Botton/dh and options=" + JSON.stringify(options));
            self.zone.run(function () {
                self.hh += options.dh;
            });
        });
        self.subscriptionMap["/InsidePane/Link/fg"] = PubSubManager_1.PubSubManager.Instance.subscribe("/InsidePane/Link/fg", function (options) {
            PubSubManager_1.PubSubManager.Instance.log("LeftPane received topic /InsidePane/Link/fg and options=" + JSON.stringify(options));
            self.fg = PubSubManager_1.PubSubManager.Instance.getRandomColor();
        });
        self.subscriptionMap["/RightPane/Dropdown/bg"] = PubSubManager_1.PubSubManager.Instance.subscribe("/RightPane/Dropdown/bg", function (options) {
            PubSubManager_1.PubSubManager.Instance.log("LeftPane received topic /RightPane/Dropdown/bg and options=" + JSON.stringify(options));
            self.bg = options.bgColor;
        });
        self.originalName = self.name;
    }
    LeftPaneComponent.prototype.handleCheckbox = function (e) {
        var self = this;
        if (e.target.checked) {
            self.subscriptionMap["/Inside/append/text"] = PubSubManager_1.PubSubManager.Instance.subscribe("/Inside/append/text", function (options) {
                PubSubManager_1.PubSubManager.Instance.log("LeftPane received topic /Inside/append/text and options=" + JSON.stringify(options));
                self.name = self.originalName + " " + options.text;
            });
        }
        else {
            PubSubManager_1.PubSubManager.Instance.unsubscribe("/Inside/append/text", self.subscriptionMap["/Inside/append/text"]);
        }
    };
    return LeftPaneComponent;
}());
LeftPaneComponent = __decorate([
    core_1.Component({
        selector: 'left-pane-component',
        styles: ["\n\t\t\t\t.LeftPane {\n\t\t\t\t\tbackground : #bbb;\n\t\t\t\t\tpadding: 10px;\n                    margin:20px;\n                }\n         "],
        template: "\n               <div class=\"LeftPane\" [style.height.px]=\"hh\"  [ngStyle]=\"{'background': bg}\">\n\t\t\t\t\t<h4 [ngStyle]=\"{'color':fg}\">{{name}}</h4>\n\t\t\t\t\t<input type=\"checkbox\" id=\"leftPane\" (click) = \"handleCheckbox($event)\" />Subscribe \"/Inside/append/text\"\n\t\t\t\t\t<button  publisher=\"{'topic':'/LeftPane/Botton/bg','event':'click', 'options':{'color':'#11ff55'}}\">Button in Left Pane (click): Change backgroud color of subscriber</button>\n\t\t\t\t\t<inside-pane-component></inside-pane-component>\n               </div>"
    }),
    __metadata("design:paramtypes", [core_1.NgZone])
], LeftPaneComponent);
exports.LeftPaneComponent = LeftPaneComponent;
//# sourceMappingURL=LeftPane.component.js.map