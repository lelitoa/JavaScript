class Observer{

    subscribers = [];

    notify(timer){       
        for(let i of this.subscribers) { i.execute(timer); }   
    }

    addSubscriber(subscriber){
        this.subscribers.push(subscriber)
    }

    removeObserver(subscriber){
        const deleteTarget = this.subscribers.findIndex(sub =>sub == subscriber)
        this.subscribers.splice(deleteTarget,1)
    }
}

export default new Observer();
