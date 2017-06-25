import sm from './ServiceManager'
import pm from '../PubSubManager/PubSubManager'

export default class UIService {
    constructor(public name:string) {
        sm.registerService(this);
    }
    subscribe = (topicName, options) => {
        if (options instanceof Function) {
            let opt = {};
            opt['callback'] = options;
            options = opt;
        }
        options.id = options.id || this.name;
        return pm.subscribe(topicName, options);
    }
    publish = (topicName, options) => {
        options = options ||{};
        options.pub = this.name;
        return pm.publish(topicName, options);
    }
    register = pm.register;
}