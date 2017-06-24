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
var Sub = (function () {
    function Sub(id, owner, handler, param) {
        if (owner === void 0) { owner = {}; }
        if (handler === void 0) { handler = null; }
        if (param === void 0) { param = {}; }
        this.id = id;
        if (typeof owner === "function") {
            this.callback = owner;
        }
        else {
            this.owner = owner;
            this.handler = handler;
        }
        this.param = param || {};
    }
    return Sub;
}());
var Topic = (function () {
    function Topic(name) {
        this.name = name;
        this.subMap = new Map();
    }
    return Topic;
}());
var PubSubManager = (function () {
    function PubSubManager() {
        this.topicMap = new Map();
        this.handlerMap = new Map();
    }
    Object.defineProperty(PubSubManager, "Instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    PubSubManager.prototype.subscribe = function (topicNameList, options) {
        if (options === void 0) { options = {}; }
        options = options || {};
        if (typeof options === "function") {
            var opt = {};
            opt["callback"] = options;
            options = opt;
        }
        if (!(topicNameList instanceof Array)) {
            topicNameList = [topicNameList];
        }
        var result = [];
        for (var _i = 0, topicNameList_1 = topicNameList; _i < topicNameList_1.length; _i++) {
            var tn = topicNameList_1[_i];
            var topic = this.topicMap[tn];
            if (topic == null) {
                topic = this.topicMap[tn] = new Topic(tn);
            }
            if (options.id === undefined || options.id === "") {
                options.id = this.getId("ID_");
            }
            if (options.callback !== undefined) {
                topic.subMap[options.id] = new Sub(options.id, options.callback, null, options.param);
            }
            else {
                topic.subMap[options.id] = new Sub(options.id, options.owner, options.handler, options.options);
            }
            result.push(options.id);
        }
        if (result.length == 1) {
            return result[0];
        }
        else {
            return result;
        }
    };
    PubSubManager.prototype.unsubscribe = function (topicName, id) {
        var topic = this.topicMap[topicName];
        if (topic == null) {
            this.log("WARNING: missing topic for:" + id);
            return;
        }
        delete topic.subMap[id];
    };
    PubSubManager.prototype.publish = function (topicName, options) {
        if (options === void 0) { options = {}; }
        //console.debug("enter publish:"+topicName)
        //if (topicName=="/applicationService/loadApplications") {
        //	debugger
        //}
        var topic = this.topicMap[topicName];
        //if (debug>0 && topicName.indexOf("/debug")<0) {
        //	debugInfo.addEvent(topicName, options);	
        //}
        if (topic === undefined) {
            this.topicMap[topicName] = new Topic(topicName);
            this.log("######WARNING######: there is no subscriber on topic '" + topicName + "'");
            return;
        }
        this.log("Publish topic: " + topic.name + " options=" + JSON.stringify(options));
        options = options || {};
        for (var id in topic.subMap) {
            var sub = topic.subMap[id];
            if (sub.param.skip) {
                if (sub.param.skip()) {
                    continue;
                }
            }
            //console.log("  ===>process sub=" + sub.id)
            // options.sub = sub;
            if (sub.param) {
                options = Object.assign({}, options, sub.param);
            }
            if (sub.callback) {
                //console.log("  invoke sub: id=" + sub.id + " callback="
                //+ sub.callback.toString().substring(0, 190));
                var target = window;
                if (sub.owner && window[sub.owner]) {
                    target = window[sub.owner];
                }
                sub.callback.apply(target, [options]);
            }
            else if (sub.ownerType === "handlerMap") {
                var item = this.handlerMap[sub.owner];
                item.method.apply(item.owner, options);
            }
            else {
                //console.log("  invoke sub: id=" + sub.id + " owner="
                //+ sub.owner + " handler=" + sub.handler)
                if (sub.owner && window[sub.owner]) {
                    if (sub.handler && window[sub.owner][sub.handler]) {
                        window[sub.owner][sub.handler].apple(window[sub.owner], [options]);
                    }
                }
                if (window[sub.handler]) {
                    window[sub.handler].apply(window, [options]);
                }
            }
        }
    };
    PubSubManager.prototype.publishSequntially = function (topicName, options) {
        if (options === void 0) { options = {}; }
        if (options["optionsList"].length < 1) {
            if (options["doneTopics"]) {
                this.publish(options["doneTopics"]);
            }
            return;
        }
        var opt = options["optionsList"].shift();
        opt.noConfirm = options.noConfirm;
        opt.callback = function () {
            this.publishSequntially(topicName, options);
        };
        this.publish(topicName, opt);
    };
    PubSubManager.prototype.getId = function (pre) {
        var v = pre + new Date().valueOf();
        //console.info("v="+v)
        return v;
    };
    PubSubManager.prototype.setLog = function (id) {
        this.loggerId = id;
    };
    PubSubManager.prototype.log = function (msg) {
        console.log(msg);
        if (this.loggerId === undefined) {
            return;
        }
        //if (this.logger===undefined) {
        //	this.logger = ("#"+this.loggerId);
        //}
        //??this.logger.val(function(_, val){return val + "\n\n\n"+msg; }); 
        //??this.logger[0].scrollTop = this.logger[0].scrollHeight;
    };
    PubSubManager.prototype.getRandomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    return PubSubManager;
}());
exports.PubSubManager = PubSubManager;
//# sourceMappingURL=PubSubManager.js.map