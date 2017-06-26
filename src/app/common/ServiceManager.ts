import DataService from '../services/DataService'
import HousingInfoService from '../services/HousingInfoService'
import StockInfoService from '../services/StockInfoService'
import RemoteService from '../services/RemoteService'


export default class ServiceManager {
    static serviceMap:any = {};
    constructor() {
        ServiceManager.serviceMap = {};
        new DataService();
        new HousingInfoService();
        new StockInfoService();
        new RemoteService();      
    }
    public static registerService = (service)=> {
        ServiceManager.serviceMap[service.name] = service;
    }
    public static get = (name:string) => {
        return ServiceManager.serviceMap[name];
    }
    init = () => {
        
    }
    
    //accessExternalService = (serviceName:string)=> {
        //return angular.element(document.body).injector().get(serviceName);
    //}
    
    get = (sn) => {
        let res = ServiceManager.serviceMap[sn];
        if (res) {
            return res;
        }
        return null;//this.accessExternalService(sn);
    }
}

