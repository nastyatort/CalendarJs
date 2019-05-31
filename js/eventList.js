class EventList{
    constructor(){
        this.events = [];
    }

    addEvent(id, text){
        let newEvent = new Event(id, text);
        this.events.push(newEvent);
        console.log('add event = ');
        console.log(this.events);
    }

    removeEvent(id){
        this.events = this.events.filter(c => c.id != id);
        console.log('remove event');
        console.log(this.events);
    }

    getEvents(){
        return this.events;
    }
}