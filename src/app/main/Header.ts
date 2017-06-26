import { Component } from '@angular/core';
 
@Component({
	selector: 'header',
	styles : [`
		.selectedTopLink {
            border-bottom: 3px solid #0000ff;
            padding-bottom: 2px;
            color:#000;
            cursor:default;
        }
        
        .unselectedTopLink {
            border-bottom: 0px solid #0000ff;
            padding-bottom: 2px;
            color:#333;
            cursor:pointer;
        }
    `],
	template: `
		<div style="height:100px">
            <div style="float:left">
                <img style="height:60px" src="/img/coolshare.gif"/>
                <h2>Welcome to Coolshare Angular Pubsub</h2>
            </div>
            <div style="float:right">
                <span style="margin-right:50px"  [ngClass]="{'selectedTopLink': this.selectedLink === 'HousingInfo', 'unselectedTopLink': this.selectedLink !== 'HousingInfo'}">Pub Sub Demo</span><span href="" [ngClass]="{'selectedTopLink': this.selectedLink === 'StockInfo', 'unselectedTopLink': this.selectedLink !== 'StockInfo'}">Form And Table</span>
            </div>
            <br style="clear:both"/>

		</div>`
})
 
export class Header {
 
         name = "Header"
        selectedLink = "HousingInfo";
}