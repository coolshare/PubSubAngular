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

class Sub {
	id: string;
	owner: any;
	handler:any;
	param:any;
	callback:any;
	ownerType:string;
	
	constructor(id:string, owner:any={}, handler:any=null, param:any={}) {
		this.id = id;
		if (typeof owner === "function") {
			this.callback = owner;
		} else {
			this.owner = owner;
			this.handler = handler;
		}
		this.param = param ||{};
	}
}


class Topic {
	name:string;
	subMap: Map<string, Sub>;

	constructor(name:string) {
		this.name = name;
		this.subMap = new Map<string, Sub>();
	}
}


class PubSubManager {
	topicMap: Map<string, Topic>;
	handlerMap: Map<string, Function>;
	loggerId:string;
	logger:any;
	
	constructor () {
		this.topicMap = new Map<string, Topic>();
		this.handlerMap = new Map<string, Function>();
	}
    
	subscribe(topicNameList:any, options:any={}) {
		options = options || {};

		if (typeof options ==="function" ) {
			let opt = {};
			opt["callback"] = options;
			options = opt;
		}
		if (!(topicNameList instanceof Array) ) {
			topicNameList = [topicNameList];
		}
		let result: string[] = [];
		for (let tn of topicNameList) {
			let topic:Topic = this.topicMap[tn];
			if (topic == null) {
				topic = this.topicMap[tn] = new Topic(tn);
			}
			if (options.id === undefined || options.id === "") {
				options.id = this.getId("ID_");
			}
			if (options.callback !== undefined) {
				topic.subMap[options.id] = new Sub(options.id,
						options.callback, null, options.param);
				//console.log ("subscribing: sub.id="+options.id + " callback:"+options.callback.toString().substring(0, 190))
			} else {

				
				topic.subMap[options.id] = new Sub(options.id,
						options.owner, options.handler, options.options);
			}
			result.push(options.id);
		}
		if (result.length==1) {
			return result[0];
		} else {
			return result;
		}
	}
	
	unsubscribe(topicName:string, id:string) {
		let topic:Topic = this.topicMap[topicName];
		if (topic == null) {
			this.log("WARNING: missing topic for:"+id);
			return;
		}
		delete topic.subMap[id];
	}
	
	publish(topicName:string, options:any={}) {
		let topic:Topic = this.topicMap[topicName];
		if (topic === undefined) {			
			this.topicMap[topicName] = new Topic(
					topicName);
			
			this.log("######WARNING######: there is no subscriber on topic '"+topicName+"'");
			return;
		}

		this.log("Publish topic: " + topic.name + " options="+JSON.stringify(options))
		options = options || {};
		for (var id in topic.subMap) {
			var sub = topic.subMap[id];
			if (sub.param.skip) {
				if (sub.param.skip()) {
					continue;
				}
			}

			if (sub.param) {
				options = Object.assign({}, options, sub.param);
			}

			if (sub.callback) {
				var target = window;
				if (sub.owner && window[sub.owner]) {
					target = window[sub.owner];
				}
				sub.callback.apply(target, [ options ]);
				
			} else if (sub.ownerType === "handlerMap") {
				var item = this.handlerMap[sub.owner];
				item.method.apply(item.owner, options);
			} else {
				if (sub.owner && window[sub.owner]) {
					if (sub.handler && window[sub.owner][sub.handler]) {
						window[sub.owner][sub.handler].apple(
								window[sub.owner], [ options ]);
					}
				}
				if (window[sub.handler]) {
					window[sub.handler].apply(window, [ options ]);
				}
			}

		}
		
	}
	publishSequntially(topicName:string, options:any={}) {
		if (options["optionsList"].length<1) {
			if (options["doneTopics"]) {
				this.publish(options["doneTopics"]);
			}
			return;
		}

		let opt:any = options["optionsList"].shift();
		opt.noConfirm = options.noConfirm;
		opt.callback = function() {
			this.publishSequntially(topicName, options);
		}
		this.publish(topicName, opt);
	}
	
	getId(pre:string) {
		let v:string = pre+new Date().valueOf();
		//console.info("v="+v)
		return v;
	}
	
	setLog(id:string) {
		this.loggerId = id;
	}
	
	log(msg:string) {
		console.log(msg);
		if (this.loggerId===undefined) {
			return;
		}
	}
	
	getRandomColor() {
	    var letters = '0123456789ABCDEF';
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}
}
export let pm = new PubSubManager();