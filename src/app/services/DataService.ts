import UIService from '../common/UIService'

class _DataService extends UIService{
    name:string = "DataService";
    dataMap:any = {};
    constructor() {	
        super(name);
        let self = this;
        this.subscribe("/dataService/set", function(options:any) {
        	self.dataMap[options.key] = options.value;
        })
        
        this.subscribe("/dataService/get", function(options:any) {
        	if (options.callback) {
        		options.callback({"data":this.dataMap[options.key]});
        	}
        	
        })
	}
	get = (key:string) => {
		return this.dataMap[key];
	}
	set = (key:string, value:any) => {
		this.dataMap[key] = value;
	}
	remove = (key:string) => {
		this.dataMap[key] = undefined;
		delete this.dataMap[key];
	}
};
let ds = new _DataService();
export default ds;
