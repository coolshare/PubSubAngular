import { Component } from '@angular/core';
import {pm} from './PubSubManager/PubSubManager'
 
@Component({
 
	selector: 'inside-pane-component',
		styles : [`
			.child {
			background : #aaa;
			margin:20px;
			padding: 10px;
          }`
       ],
	template: `
		<div class="child">
			<h4>{{name}}</h4> 
			<input type="checkbox" (click) = "handleCheckbox($event)" />Subscribe "/Inside/append/text"
			<br/>
			<a publisher="{'topic':'/InsidePane/Link/fg','event':'mouseover'}">Link in Inside Pane (mouseover): Change backgroud color of subscriber randomly</a>
			<br/><br/>
			
			<p>This field shows dynamically subscription: just check the checkboxes and type below to publish topic "/Inside/append/text":</p>
			<input publisher="{'topic':'/Inside/append/text', 'event':'keyup', 'options':{'text':'___VALUE___'}}"/>
        </div>`
})
 
export class InsidePaneComponent {
	name = "Inside Pane Component";
	originalName = "";
	subscriptionMap = new Map();
 	constructor() {
		var self = this;
		self.originalName = self.name;  
	}
	handleCheckbox(e:any) {
		var self = this;
		if (e.target.checked) {
			self.subscriptionMap["/Inside/append/text"] = pm.subscribe("/Inside/append/text", function(options:any) {
		    	pm.log("InsidePane received topic /Inside/append/text and options="+JSON.stringify(options));
		    	self.name = self.originalName+" "+options.text;
		    });
		} else {
			pm.unsubscribe("/Inside/append/text", self.subscriptionMap["/Inside/append/text"]);
		}
	}    
}