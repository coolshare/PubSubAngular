import { Component } from '@angular/core';
import { PubSub } from '../PubSub/PubSub';
import { FormTable } from '../FormTable/FormTable';
import ServiceManager from '../common/ServiceManager'

 
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
			
            <form-table></form-table>
		</div>`,
	entryComponents : [PubSub, FormTable]
})
 
export class AppComponent {
    name = "AppComponent"

     ngOnInit() {
       //pm.init();
       new ServiceManager();
      }
}