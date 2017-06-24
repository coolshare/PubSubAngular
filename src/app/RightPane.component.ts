import { Component } from '@angular/core';
import {pm} from './PubSubManager/PubSubManager'

@Component({
 
	selector: 'right-pane-component',
	styles : [`
				.child {
				margin:20px;
				padding: 10px;
               }
         `],
	template: `
		<div class="child" [ngStyle]="{'background': bg}">
			<h4 [ngStyle]="{'color':fg}">{{name}}</h4>
			<input type="checkbox" id="rightPane" (click) = "handleCheckbox($event)" />Subscribe "/Inside/append/text"
	 		<button publisher="{'topic':'/RightPane/Botton/dh', 'options':{'dh':10}}">Button in Right Pane (click): Change height of subscriber</button>
	 		<br/>
	 		A dropdown in Left (set background color of subscribers):
            <select publisher="{'topic':'/RightPane/Dropdown/bg', 'options':{'bgColor':'___VALUE___'}}">
            	<option value="#ff0000">Red</option>
            	<option value="#00ff00">Green</option>
            	<option value="#0000ff">Blue</option>
            </select>
	 	</div>`
})
 
export class RightPaneComponent {
 
	name = "Right Pane Component";
	originalName = "";
	bg = "#888";
	fg = "#000";
	subscriptionMap = new Map();
	constructor() {
		var self = this;
		var topic = "/LeftPane/Botton/bg";
	    self.subscriptionMap[topic] = pm.subscribe(topic, function(options:any) {
	    	pm.log("LeftPane received topic "+topic+" and options="+JSON.stringify(options));
	    	self.bg = options.color;
	    });
	    
	    topic = "/InsidePane/Link/fg";
	    self.subscriptionMap[topic] = pm.subscribe(topic, function(options:any) {
	    	pm.log("LeftPane received topic "+topic+" and options="+JSON.stringify(options));
		    self.fg = pm.getRandomColor();
		});  
		
		self.originalName = self.name;
	    
	}    
 	handleCheckbox(e:any) {
		var self = this;
		if (e.target.checked) {
			self.subscriptionMap["/Inside/append/text"] = pm.subscribe("/Inside/append/text", function(options:any) {
		    	pm.log("RightPane received topic /Inside/append/text and options="+JSON.stringify(options));
		    	self.name = self.originalName+" "+options.text;
		    });
		} else {
			pm.unsubscribe("/Inside/append/text", self.subscriptionMap["/Inside/append/text"]);
		}
	}   
}