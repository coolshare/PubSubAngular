import { Component} from '@angular/core';
import pm from '../PubSubManager/PubSubManager'

export class UIComponent extends Component {
    constructor(public name:string) {
        super(name);
        //huawei.contollers[this.name] = this;
    }
    subscribe = (topicName:string, options:any) => {
        if(options instanceof Function) {
            let opt = {};
            opt['callback'] = options;
            options = opt;
        }
        options.id = options.id || this.name;
        //console.log("== "+options.id + " subscribed "+topicName)
        return pm.subscribe(topicName, options);
    }
    publish = (topicName:string, options:any=undefined) => {
        options = options ||{};
        options.pub = this.name;
        return pm.publish(topicName, options);
    }
    unsubscribe = (topicName:string, id:string) => {
        pm.unsubscribe(topicName, id);
    }
    //this.register = huawei.register;
    log = (msg:string) => {
        pm.log(msg);
    }
    getRandomColor = () => {
        return pm.getRandomColor();
    }
}