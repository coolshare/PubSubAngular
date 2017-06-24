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

import { Directive, ElementRef } from '@angular/core';
import {pm} from './PubSubManager'


@Directive({ selector: '[publisher]' })
export class Publisher {
    element:any;
    options:any;
    
	constructor(el: ElementRef) {
		this.element = el.nativeElement;
		var ttt:string = "("+this.element.attributes.publisher.nodeValue+")";
		this.options = eval(ttt);
		var self = this;
		var eventType:string = "click";
		if (this.options["event"] !== undefined) {
			
			eventType = this.options["event"];
		}
		this.element["on"+eventType] = function() {
			var ttt:string = "("+self.element.attributes.publisher.nodeValue+")";
			self.options = eval(ttt);
			self.handleMacroWords(self.options.options);
			pm.publish(self.options.topic, self.options.options||{});
		}
  }
  
  handleMacroWords(obj:any) {
  	for (let key in obj) {
  		let value:any = obj[key];
  		if (typeof value === "string") {
  			obj[key] = this.handleMacroWord(value);
  		} else if (typeof value === "number"){
  			continue;
  		} else {
  			this.handleMacroWords(obj[key]);
  		}
  	}
  }
  
  handleMacroWord(value:string) {
  	if (value==="___VALUE___") {
  		return this.element.value;
  	}
  	return value;
  }
 
}
