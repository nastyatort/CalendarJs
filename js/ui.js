class ui {
    constructor(settings) {
        this.settings = settings;

        this.today = new Date();

        this.year = this.today.getFullYear();
        this.month = this.today.getMonth();//текущий месяц
        this.day = this.today.getDate();

        this.currentMonth = this.month;//текущий листаем -+
        this.date = new Date(this.year, this.currentMonth);//листаем дату

        document.getElementById('prev').addEventListener("click", this.settings.onPrevClick);
        document.getElementById('next').addEventListener("click", this.settings.onNextClick);
        document.getElementById('today').addEventListener("click", this.settings.onTodayClick);
        document.getElementById('cancel').addEventListener("click", this.settings.onCancelModalClick);
        document.getElementById('event__cancel').addEventListener("click", this.settings.onCancelModalEventClick);

        this.counter = 0;
    }

    drawCalendar() {
        let monthTitle = document.getElementById('month__title');
        monthTitle.innerHTML = this.currentMonth + 1;
        let monthWrapper = document.getElementById('month');
        monthWrapper.innerHTML = '';

        for (let i = 0; i < this.date.getDay(); i++) {
            let day = document.createElement('div');
            day.className = 'day';
            monthWrapper.appendChild(day);
            day.innerHTML = '';
        }

        while (this.date.getMonth() == this.currentMonth) {
            let day = document.createElement('div');
            day.className = 'day';
            monthWrapper.appendChild(day);
            let dayNumber = document.createElement('p');
            dayNumber.innerHTML = this.date.getDate();
            day.appendChild(dayNumber);

            let addEvent = document.createElement('div');
            addEvent.className = 'add__event';
            addEvent.innerHTML = '+';
            day.id = this.date.getDate() + '' + this.date.getMonth() + '' + this.date.getFullYear();

            addEvent.addEventListener("click",
                this.onOpenModal.bind(this, day.id));

            day.appendChild(addEvent);

            if (this.date.getDate() == this.day && this.date.getMonth() == this.month
                && this.date.getFullYear() == this.year) {
                day.className += ' current';
            }
            this.date.setDate(this.date.getDate() + 1);
        }

        if (this.date.getDay() != 0) {
            for (let i = this.date.getDay(); i < 7; i++) {
                let day = document.createElement('div');
                day.className = 'day';
                monthWrapper.appendChild(day);
                day.innerHTML = '';
            }
        }
    }

    onOpenModal(id) {
        this.settings.onCreateModalClick();
        console.log(id);
        let modal = document.getElementById('modal');
        modal.className += ' visible';
        let textareaWrapper = document.getElementById('textarea__wrapper');
        textareaWrapper.innerHTML = '';
        let textarea = document.createElement('textarea');
        textarea.id = 'text' + id;
        textareaWrapper.appendChild(textarea);
        let saveWrapper = document.getElementById('save__wrapper');
        saveWrapper.innerHTML = '';
        let save = document.createElement('button');
        save.id = 'save' + id;
        save.innerHTML = 'save';
        saveWrapper.appendChild(save);
        save.addEventListener("click",
            this.onCreateEvent.bind(this, id));
    }

    onCreateEvent(id) {
        this.settings.onSaveEventClick(id);
    }

    onSaveEvent(id) {
        let textarea = document.getElementsByTagName('textarea');

        let modal = document.getElementById('modal');
        modal.className = 'modal';

        let eventWrapper = document.getElementById(id);
        this.date = new Date(this.year, this.currentMonth);

        if (eventWrapper.id == id) {
            let event = document.createElement('div');
            event.id = id + '-' + this.counter++;

            return {
                id: event.id,
                text: textarea[0].value
            }
        }
    }

    drawEvents(items) {
        let eventId;
        let day;
        let event;
        for (let i = 0; i < items.length; i++) {
            eventId = items[i].id;
            items[i].id = items[i].id.toString();
            items[i].id = items[i].id.split('-');
            items[i].id = items[i].id[0];
            day = document.getElementById(items[i].id);

            items[i].id = eventId;
            if(day != null){

                event = document.createElement('div');
                event.id = eventId;
                event.className = 'event';
                event.innerHTML = items[i].text;
                day.appendChild(event);
                event.addEventListener("click",
                    this.onShowEvent.bind(this, event.id, event.textContent));

                let remove = document.createElement('div');
                remove.className = 'remove';
                remove.innerHTML = 'x';
                event.appendChild(remove);

                remove.addEventListener("click",
                    this.onDeleteEvent.bind(this, event.id));
            }else{
                console.log('-');
            }
        }
    }


    onDeleteEvent(id, e) {
        e.stopPropagation();

        this.date = new Date(this.year, this.currentMonth);
        this.settings.onRemoveEventClick(id);
        return {
            id: id
        }
    }

    onRemoveEvent(id) {
        return {
            id: id
        }
    }

    onShowEvent(id, value) {
        let textWrapper = document.getElementById('text__wrapper');
        textWrapper.innerHTML = '';

        let text = document.createElement('div');
        text.className = 'text';
        text.innerHTML = value;
        textWrapper.appendChild(text);

        let eventModal = document.getElementById('event__modal');
        eventModal.className += ' visible';
    }


    onCancelModal() {
        let modal = document.getElementById('modal');
        modal.className = 'modal';
    }

    onCancelModalEvent() {
        let modal = document.getElementById('event__modal');
        modal.className = 'event__modal';
    }

    onToday() {
        this.currentMonth = this.today.getMonth();
        this.date = new Date(this.year, this.currentMonth);
    }

    prevMonth() {
        this.date = new Date(this.year, this.currentMonth - 1);
        this.currentMonth--;
        if (this.currentMonth == -1) {
            this.currentMonth = 11
        }
    }

    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth == 12) {
            this.currentMonth = 0;
        }
    }

}










