import { Component } from '@angular/core';
import { HousingInfo } from './HousingInfo';
import { StockInfo } from './StockInfo';
 
@Component({
	selector: 'form-table',
	template: `
		<div class="parent">
            
            <header></header>
            <div style="clear:both">
                <ngb-tabset>
                  <ngb-tab title="Housing Info">
                    <ng-template ngbTabContent>
                      <housing-info></housing-info>
                    </ng-template>
                  </ngb-tab>
                  <ngb-tab>
                    <ng-template ngbTabTitle><b>StockInfo</b> title</ng-template>
                    <ng-template ngbTabContent>
                        <stock-info></stock-info>
                    </ng-template>
                  </ngb-tab>
                </ngb-tabset>
            </div>

		</div>`,
	entryComponents : [HousingInfo, StockInfo]
})
 
export class FormTable {
 
         name = "FormTable"
 
}