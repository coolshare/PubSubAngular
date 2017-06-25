import UIService from '../common/UIService'
import RemoteService from './RemoteService'

class _HousingInfoService extends UIService{
    name:string = "HousingInfoService";
    constructor() {
        super(name);
        let self = this;
    	this.subscribe("/HousingInfoService/load", function(options:any) {
    		self.load(options);
    	});
    	
	}

	
	load = (options:any={}) => {	
        options = options||{};	
		RemoteService.fatchThroughProxy("https://verdant.tchmachines.com/~coolsha/markqian/AngularJS/Directives/RoutedTab/data/House.json");
    }
}	
let housingInfoService = new _HousingInfoService();
export default housingInfoService;
