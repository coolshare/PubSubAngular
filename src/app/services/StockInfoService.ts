import UIService from '../common/UIService'
import ServiceManager from '../common/ServiceManager'

export default class StockInfoService extends UIService{
    constructor() {
        super("StockInfoService");
        let self = this;
    	this.subscribe("/StockInfoService/load", function(options:any) {
            
    		self.load(options);
    	});
    	
	}

	
	load = (options:any) => {		
		ServiceManager.get("RemoteService").fatchThroughProxy("https://verdant.tchmachines.com/~coolsha/markqian/AngularJS/Directives/RoutedTab/data/currency.json", options);
    }
}	
//let housingInfoService = new _StockInfoService();
//export default housingInfoService;
