import { Component, NgZone  } from '@angular/core';
import {UIComponent} from './common/UIComponent'

@Component({
	selector: 'left-pane-component',
	styles : [`
				.LeftPane {
					background : #bbb;
					padding: 10px;
                    margin:20px;
                }
         `],
	template: `
               <div class="LeftPane" [style.height.px]="hh"  [ngStyle]="{'background': bg}">
					<h4 [ngStyle]="{'color':fg}">{{name}}</h4>
					<input type="checkbox" id="leftPane" (click) = "handleCheckbox($event)" />Subscribe "/Inside/append/text"
					<button  publisher="{'topic':'/LeftPane/Botton/bg','event':'click', 'options':{'color':'#11ff55'}}">Button in Left Pane (click): Change backgroud color of subscriber</button>
					<inside-pane-component></inside-pane-component>
               </div>`
})
 
export class LeftPaneComponent extends UIComponent{
    name = "LeftPaneComponent";
    hh = 400;
    fg = "#000";
    bg = "#bbb";
    originalName = "";
	subscriptionMap = new Map();
	
 	constructor(public zone: NgZone) {
        super(name);
		var self = this;
		self.zone = zone;
		
	    self.subscriptionMap["/RightPane/Botton/dh"] = self.subscribe("/RightPane/Botton/dh", function(options:any) {
	    	self.log("LeftPane received topic /RightPane/Botton/dh and options="+JSON.stringify(options));
		    self.zone.run(() => {
				self.hh += options.dh
	    	}); 
		});  
		
		self.subscriptionMap["/InsidePane/Link/fg"] = self.subscribe("/InsidePane/Link/fg", function(options:any) {
	    	self.log("LeftPane received topic /InsidePane/Link/fg and options="+JSON.stringify(options));
		    self.fg = self.getRandomColor();
		}); 
		
		self.subscriptionMap["/RightPane/Dropdown/bg"] = self.subscribe("/RightPane/Dropdown/bg", function(options:any) {
	    	self.log("LeftPane received topic /RightPane/Dropdown/bg and options="+JSON.stringify(options));
		    self.bg = options.bgColor;
		}); 
		
		self.originalName = self.name;
	}  
	
	handleCheckbox(e:any) {
		var self = this;
		if (e.target.checked) {
			self.subscriptionMap["/Inside/append/text"] = self.subscribe("/Inside/append/text", function(options:any) {
		    	self.log("LeftPane received topic /Inside/append/text and options="+JSON.stringify(options));
		    	self.name = self.originalName+" "+options.text;
		    });
		} else {
			self.unsubscribe("/Inside/append/text", self.subscriptionMap["/Inside/append/text"]);
		}
	}    
}