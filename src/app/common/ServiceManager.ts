class ServiceManager {
    serviceMap:any = {};
    constructor() {
        
        this.serviceMap = {};
    }
    registerService = (service)=> {
        this.serviceMap[service.name] = service;
    }
    
    init = () => {
        
    }
    
    //accessExternalService = (serviceName:string)=> {
        //return angular.element(document.body).injector().get(serviceName);
    //}
    
    get = (sn) => {
        let res = this.serviceMap[sn];
        if (res) {
            return res;
        }
        return null;//this.accessExternalService(sn);
    }
}
let sm = new ServiceManager();
export default sm;