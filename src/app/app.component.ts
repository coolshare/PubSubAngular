import { Component } from '@angular/core';
 
import { RightPaneComponent } from './RightPane.component';
import { LeftPaneComponent } from './LeftPane.component';
 
@Component({
	selector: 'my-app',
	styles : [`
		.parent {
			background : #c7c7c7;
			padding: 20px;
			height:700px;
		}.`,
		`.floatLeft {
			float:left;
			width:50%;
		}`,
		`clearBoth {
			clear:both;
		}`],
	template: `
		<div class="parent">
			<div className="App-header">
				<img src="/img/coolshare.gif"/>
				<h2>Welcome to Coolshare Angular Pubsub</h2>
			</div>
			<p>This page shows how components communicate with pub/sub. There are 3 components on this page: "Left", "Right" and "Inside". You can try to click the buttons or mouseover the link to see the publishing history in the console.
			</p>
			<h3>{{name}}</h3>
 			<div class="row">
				<div class="floatLeft">
					<left-pane-component></left-pane-component>
				</div>	
				<div class="floatLeft">
					<right-pane-component></right-pane-component>
				 </div>
			</div>
			<br class="clearBoth"/>
			<a href="http://MarkQian.com" target=_blank>Go Mark's Home page to see more!</a>
		</div>`,
	entryComponents : [RightPaneComponent, LeftPaneComponent]
})
 
export class AppComponent {
 
         name = "Main Component"
 
}