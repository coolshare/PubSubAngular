import UIService from '../common/UIService'
import ServiceManager from '../common/ServiceManager'

export default class HousingInfoService extends UIService{
    constructor() {
        super("HousingInfoService");
        let self = this;
    	this.subscribe("/HousingInfoService/load", function(options:any) {
            
    		self.load(options);
    	});
    	
	}

	
	load = (options:any) => {		
		ServiceManager.get("RemoteService").fatchThroughProxy("https://verdant.tchmachines.com/~coolsha/markqian/AngularJS/Directives/RoutedTab/data/House.json", options);
    }
}	
//let housingInfoService = new _HousingInfoService();
//export default housingInfoService;
