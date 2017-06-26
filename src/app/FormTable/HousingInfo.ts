import { Component, OnInit  } from '@angular/core';
import {UIComponent} from '../common/UIComponent'

@Component({
 
	selector: 'housing-info',
	styles : [`
				.child {
				margin:20px;
				padding: 10px;
               }
         `],
	template: `
		<div [ngStyle]="{'background': 'white'}">
            <div [ngStyle]="{'overflow':'auto','height':'400px'}">
    			<ng-table [config]="config"
                      (cellClicked)="onCellClick($event)"
                      [rows]="rows" [columns]="columns">
                </ng-table>
            </div>
	 	</div>`
})
 
export class HousingInfo extends UIComponent implements OnInit {
    
    name = "HousingInfo";
    public rows:Array<any> = [];
    public columns:Array<any> = [
        {title: 'address', name: 'address', sort: 'asc'},
        {title: 'value.', name: 'value', sort: ''},
        {title: 'link.', name: 'link', sort: ''}
      ];
      public page:number = 1;
      public itemsPerPage:number = 10;
      public maxSize:number = 5;
      public numPages:number = 1;
      public length:number = 0;
    
      public config:any = {
        paging: true,
        sorting: {columns: this.columns},
        filtering: {filterString: ''},
        className: ['table-striped', 'table-bordered']
      };
    
      private data:Array<any> = [];
    
      public constructor() {
        super(name);
        this.length = this.data.length;
     }
    
      public ngOnInit():void {
        let self = this;
        //this.onChangeTable(this.config);
          
        this.publish("/HousingInfoService/load", (data)=>{
            //debugger
            let rows = [];
            let d = data.properties.comparables;
            for (let i=0; i<d.length; i++) {
                let dd = d[i];
                rows.push({"address":dd.address.street+" "+dd.address.city+", "+dd.address.state+" "+dd.address.zipcode, "value":dd.zestimate.amount["#text"]+dd.zestimate.amount["@currency"],"link":dd.links.comparables});   
            }
            self.rows = rows;
        });
      }
    
      public changePage(page:any, data:Array<any> = this.data):Array<any> {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
      }
    
      public changeSort(data:any, config:any):any {
        if (!config.sorting) {
          return data;
        }
    
        let columns = this.config.sorting.columns || [];
        let columnName:string = void 0;
        let sort:string = void 0;
    
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].sort !== '' && columns[i].sort !== false) {
            columnName = columns[i].name;
            sort = columns[i].sort;
          }
        }
    
        if (!columnName) {
          return data;
        }
    
        // simple sorting
        return data.sort((previous:any, current:any) => {
          if (previous[columnName] > current[columnName]) {
            return sort === 'desc' ? -1 : 1;
          } else if (previous[columnName] < current[columnName]) {
            return sort === 'asc' ? -1 : 1;
          }
          return 0;
        });
      }
    
      public changeFilter(data:any, config:any):any {
        let filteredData:Array<any> = data;
        this.columns.forEach((column:any) => {
          if (column.filtering) {
            filteredData = filteredData.filter((item:any) => {
              return item[column.name].match(column.filtering.filterString);
            });
          }
        });
    
        if (!config.filtering) {
          return filteredData;
        }
    
        if (config.filtering.columnName) {
          return filteredData.filter((item:any) =>
            item[config.filtering.columnName].match(this.config.filtering.filterString));
        }
    
        let tempArray:Array<any> = [];
        filteredData.forEach((item:any) => {
          let flag = false;
          this.columns.forEach((column:any) => {
            if (item[column.name].toString().match(this.config.filtering.filterString)) {
              flag = true;
            }
          });
          if (flag) {
            tempArray.push(item);
          }
        });
        filteredData = tempArray;
    
        return filteredData;
      }
    /*
      public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
        return;
        if (config.filtering) {
          Object.assign(this.config.filtering, config.filtering);
        }
    
        if (config.sorting) {
          Object.assign(this.config.sorting, config.sorting);
        }
    
        let filteredData = this.changeFilter(this.data, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
      }
    */
      public onCellClick(data: any): any {
        console.log(data);
      }
}