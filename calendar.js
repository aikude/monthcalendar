const now = new Date(),
dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'];

const thisMonth = now.getMonth();

function setAppointment() {
    const [, clickedDate, clickedDayOfWeek] = this.id.split('-'),
        appointmentId = 'appointmentid-' + clickedDate,
        cancelId = 'cancel-' + clickedDate + '-' + clickedDayOfWeek,
        dateString = dayNames[clickedDayOfWeek] + ', ' + monthNames[thisMonth] + ' ' + clickedDate;

    appointmentItem = document.getElementById(appointmentId);

    if (appointmentItem) {
        alert(dateString + ' is already booked!');
    } else {
        let listItem = document.createElement("li");
        let cancelItem = document.createElement("span");

        listItem.id = appointmentId;
        listItem.className = 'appointment';
        listItem.innerHTML = dateString;

        cancelItem.id = cancelId;
        cancelItem.className = 'cancel';
        cancelItem.innerHTML = '(cancel)';
        cancelItem.addEventListener("click", cancelAppointment, false);

        listItem.appendChild (document.createTextNode(" "));
        listItem.appendChild(cancelItem);

        const appointmentItems = document.querySelectorAll("li.appointment");
        if (appointmentItems.length) {
            for (let [i, appointmentItem] of appointmentItems.entries()) {
                let appointmentItemDate = appointmentItem.id.split('-')[1];
                
                if (+clickedDate < +appointmentItemDate) {
                    document.getElementById("appointments").insertBefore(listItem, appointmentItem);
                    break;
                }
                else if (i == appointmentItems.length-1) {
                    document.getElementById("appointments").appendChild(listItem);
                }
            }
        } else {
            document.getElementById("appointments").appendChild(listItem);
        }

        this.classList.add('booked');
    }
}

function cancelAppointment() {
    const [, clickedDate, clickedDayOfWeek] = this.id.split('-'),
    appointmentId = 'appointmentid-' + clickedDate,
    dateBoxId = 'date-' + clickedDate + '-' + clickedDayOfWeek;

    appointmentItem = document.getElementById(appointmentId);
    dateBox = document.getElementById(dateBoxId);

    if (dateBox) {
        appointmentItem.parentNode.removeChild(appointmentItem);
        dateBox.classList.remove('booked');
    }
}

function makeCalendar() {
    const dates = getDates();
    let clickable = false;

    for (let row = 0; row <= 6; row++){
        for (let dayColumn = 0; dayColumn < 7; dayColumn++) {
            let dateBox = document.createElement("div");
            dateBox.className = 'datebox';
            
            if (row === 0) {
                dateBox.classList.add('header');
                dateBox.innerHTML = dayNames[dayColumn].toUpperCase();
            }
            else if (dates.length && dates[0].dayOfWeek === dayColumn) {
                let date = dates.shift();
                dateBox.id = 'date-' + date.date + '-' + date.dayOfWeek;
                dateBox.innerHTML = date.date;
                if (date.isToday) {
                    dateBox.classList.add('today');
                    clickable = true;
                }
                else dateBox.classList.add('date');

                if (clickable) {
                    if (!date.isToday) dateBox.classList.add('open');
                    dateBox.addEventListener("click", setAppointment, false);
                } 
            }
            else {
                clickable = false;
                dateBox.innerHTML = '.';
            }

            document.getElementById("calendar").appendChild(dateBox);
        }
    }
}

function getDates() {
    const dates = [];
    let calendarDay = new Date(now.getFullYear(), thisMonth, 1);

    while (calendarDay.getMonth() === thisMonth) {
        dateData = {
            date: calendarDay.getDate(), 
            dayOfWeek: calendarDay.getDay(), 
            isToday: calendarDay.getDate() == now.getDate()
        }
        dates.push(dateData);
        calendarDay.setDate(calendarDay.getDate() + 1);
    }

    return dates;
    }

    function setMonthName() {            
    document.getElementById("headerMonth").innerHTML = monthNames[thisMonth];
}

makeCalendar();
setMonthName();
