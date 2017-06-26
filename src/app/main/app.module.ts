import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { Publisher }  from '../PubSubManager/Publisher';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RightPaneComponent }  from '../PubSub/RightPane.component';
import { LeftPaneComponent }  from '../PubSub/LeftPane.component';
import { InsidePaneComponent }  from '../PubSub/InsidePane.component';
import { HousingInfo }  from '../FormTable/HousingInfo';
import { StockInfo }  from '../FormTable/StockInfo';
import { Header }  from './Header';
import { PubSub } from '../PubSub/PubSub';
import { FormTable } from '../FormTable/FormTable';
import { Ng2TableModule } from 'ng2-table/ng2-table';

@NgModule({
  imports:      [ Ng2TableModule, BrowserModule, NgbModule.forRoot() ],
  declarations: [ FormTable, PubSub, Header, Publisher, AppComponent, LeftPaneComponent, RightPaneComponent, InsidePaneComponent, HousingInfo, StockInfo],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
