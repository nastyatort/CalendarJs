class CalendarController {
    constructor() {
        this.store = new EventList();
        this.UI = new ui({
            onPrevClick: this.onPrevMonth.bind(this),
            onNextClick: this.onNextMonth.bind(this),
            onTodayClick: this.onToday.bind(this),
            onCreateModalClick: this.onOpenModal.bind(this),
            onCancelModalClick: this.onCancelModal.bind(this),
            onCancelModalEventClick: this.onCancelModalEvent.bind(this),
            onSaveEventClick: this.onSaveEvent.bind(this),
            onShowEventClick: this.onShowEvent.bind(this),
            onRemoveEventClick: this.onRemoveEvent.bind(this)
        });

        this.render();
    }

    onToday() {
        this.UI.onToday();
        this.render();
    }

    onPrevMonth() {
        this.UI.prevMonth();
        this.render();
    }

    onNextMonth() {
        this.UI.nextMonth();
        this.render();
    }

    onOpenModal(id) {

    }

    onShowEvent(id) {
        let event = this.UI.onSaveEvent(id);
        this.UI.onShowEvent(event.id, event.value);
    }

    onSaveEvent(id) {
        let newEvent = this.UI.onSaveEvent(id);
        this.store.addEvent(newEvent.id, newEvent.text);
        this.render();
    }

    onRemoveEvent(id) {
        let remove = this.UI.onRemoveEvent(id);
        this.store.removeEvent(remove.id);
        this.render();
    }

    onCancelModal() {
        this.UI.onCancelModal();
    }

    onCancelModalEvent() {
        this.UI.onCancelModalEvent();
    }

    render() {
        this.UI.drawCalendar();
        let items = this.store.getEvents();
        this.UI.drawEvents(items);
    }
}


let
    calendar = new CalendarController();