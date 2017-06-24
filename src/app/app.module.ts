import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { Publisher }  from './PubSubManager/Publisher';

import { RightPaneComponent }  from './RightPane.component';
import { LeftPaneComponent }  from './LeftPane.component';
import { InsidePaneComponent }  from './InsidePane.component';


@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ Publisher, AppComponent, LeftPaneComponent, RightPaneComponent, InsidePaneComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
