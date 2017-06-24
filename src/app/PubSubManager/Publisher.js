/*
 Coolshare Angular PubSub - A package/service to provide
 publish/subscribe pattern for communication in Angular

 Copyright (C) 2017 Mark Qian <markqian@hotmail.com>


Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/
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
var PubSubManager_1 = require("./PubSubManager");
var Publisher = (function () {
    function Publisher(el) {
        this.pubSubManager = PubSubManager_1.PubSubManager.Instance;
        this.element = el.nativeElement;
        var ttt = "(" + this.element.attributes.publisher.nodeValue + ")";
        this.options = eval(ttt);
        var self = this;
        var eventType = "click";
        if (this.options["event"] !== undefined) {
            eventType = this.options["event"];
        }
        this.element["on" + eventType] = function () {
            var ttt = "(" + self.element.attributes.publisher.nodeValue + ")";
            self.options = eval(ttt);
            self.handleMacroWords(self.options.options);
            /*for (var i in self.options) {
              var item = self.options[i];
              if (item==="___VALUE___") {
                  self.options[i] = self.element;
              } //else if (item["___FUNCTION___"]!==undefined && this.props.owner!==undefined) {
                //  self.options[i] = this.props.owner[item["___FUNCTION___"]]();
              //}
           }*/
            self.pubSubManager.publish(self.options.topic, self.options.options || {});
        };
        /*
           // this.publish = this.publish.bind(this);
            if (props.classes) {
                let cn = [];
                for (let c of props.classes) {
                    cn.push(c);
                }
                this.ppp.className = cn.join(" ");
            }
            this.event = "Click";
            if (props.event) {
                this.event = props.event;
            }*/
    }
    Publisher.prototype.handleMacroWords = function (obj) {
        for (var key in obj) {
            var value = obj[key];
            if (typeof value === "string") {
                obj[key] = this.handleMacroWord(value);
            }
            else if (typeof value === "number") {
                continue;
            }
            else {
                this.handleMacroWords(obj[key]);
            }
        }
    };
    Publisher.prototype.handleMacroWord = function (value) {
        if (value === "___VALUE___") {
            return this.element.value;
        }
        return value;
    };
    return Publisher;
}());
Publisher = __decorate([
    core_1.Directive({ selector: '[publisher]' }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], Publisher);
exports.Publisher = Publisher;
//# sourceMappingURL=Publisher.js.map