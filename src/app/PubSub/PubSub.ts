import { Component  } from '@angular/core';
import {UIComponent} from '../common/UIComponent'
import { RightPaneComponent } from './RightPane.component';
import { LeftPaneComponent } from './LeftPane.component';

@Component({
    selector: 'pub-sub',
        styles : [`
            .child {
            background : #aaa;
            margin:20px;
            padding: 10px;
          }`
       ],
    template: `
        <div style="width:100%; height:100%">
            <header></header>
            <div>
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
            </div>
        </div>`,
    entryComponents : [RightPaneComponent, LeftPaneComponent]
})
 
export class PubSub extends UIComponent {
    name = "PubSub";
    constructor() {
        super(name);
    }    
}