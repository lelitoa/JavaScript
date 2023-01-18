export class Subscriber{

    callback = null;

    constructor(callback){
        this.callback = callback;
    }

    execute = (data)=>{
        const sessionData = JSON.parse(sessionStorage.getItem("C")).data

        if(data != sessionData) { this.callbackHandler(data); }        
    }

    callbackHandler = (data)=>{
       new this.callback(data);
    }

}
