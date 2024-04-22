let Cal = function(divId) {
    this.divId = divId
    this.DaysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    this.Months =['january', 'February', 'March', 'April', 'May', 'June', 'JUly', 'August', 'Septemebr', 'October', 'November', 'December']
    var d = new Date()
    this.currMonth = d.getMonth()
    this.currYear = d.getFullYear()
    this.currDay = d.getDate()
}
Cal.prototype.nextMonth = function() {
    if(this.currMonth == 11){
        this.currMonth = 0
        this.currYear = this.currYear + 1
    }
    else {
        this.currMonth = this.currMonth + 1
    }
    this.showcurr()
}
Cal.prototype.previousMonth = function(){
    if ( this.currMonth == 0){
        this.currMonth = 11
        this.currYear = this.currYear - 1
    }
    else {
        this.currMonth = this.currMonth - 1
    }
    this.showcurr()
}
Cal.prototype.showcurr = function(){
    this.showMonth(this.currYear, this.currMonth)
}
Cal.prototype.showMonth = function(y, m){
    var d = new Date()
    firstDayOfMonth = new Date(y, m, 7).getDay()
    lastDateOfMonth =  new Date(y, m+1, 0).getDate()
    lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();
    html = '<table id="table1">'
    html += '<thead><tr>'
    html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>'
    html += '</tr></thead>'
    html += '<tr class="days">'
    for(var i=0; i < this.DaysOfWeek.length;i++) {
        html += '<td>' + this.DaysOfWeek[i] + '</td>'
    }
    html += '</tr>'
    var i=1
    var p=1
    do {
        var dow = new Date(y, m, i).getDay()
        if ( dow == 1 ) {
            html += '<tr id="week'+ p +'">'
            p += 1
        }
        else if ( i == 1 ) {
        html += '<tr id="week'+ p +'">'
        
        var k = lastDayOfLastMonth - firstDayOfMonth+1
        for(var j=0; j < firstDayOfMonth; j++) {
            html += '<td class="not-current">' + k + '</td>'
            k++
        }
        }
        var chk = new Date()
        var chkY = chk.getFullYear()
        var chkM = chk.getMonth()
        if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
            html += '<td class="today"><button class="todayDay calendarIds" id="day'+ i + '" onClick="leadsToTasks(this.id)"type="button">' + i + '</button></td>'
        } else {
            html += '<td class="normal""><button class="calendarIds" id="day'+ i + '" onClick="leadsToTasks(this.id)"type="button">' + i + '</button></td>'
        }
        if ( dow == 0 ) {
            html += '</tr>'
        }
        else if ( i == lastDateOfMonth ) {
            var k=1
            for(dow; dow < 7; dow++) {
                html += '<td class="not-current">' + k + '</td>'
                k++
            }
        }
        i++;
        }while(i <= lastDateOfMonth);
        html += '</table>'
        document.getElementById(this.divId).innerHTML = html;
    }


var dayObject = {
    elementId: undefined,
    numberParrentId: undefined,
    numberOfDay: undefined,
    generallRows: 5,
    correctNUmberOfRow: undefined,
    dt: undefined
}
function leadsToTasks(day){
    dayObject.elementId = day
    dayObject.numberParrentId = document.getElementById(day).parentNode.parentNode.id.match(/(\d+)/)[0]
    dayObject.numberOfDay = document.getElementById(day).id.match(/(\d+)/)[0]
    for (let h = Number(dayObject.numberParrentId); h < dayObject.generallRows; h++) {
        dayObject.correctNUmberOfRow = Number(h) + 1
        document.getElementById('week' + dayObject.correctNUmberOfRow).style.display = 'none'
    }
    if (document.getElementById(`inputTdForDay${dayObject.numberOfDay}`) == null) {
        html = 
        `<td colspan="7" class="inputTd" id="inputTdForDay${dayObject.numberOfDay}" >
            <button class="deleting-button" onClick="recoveryTable()">&#10006;</button>
            <div>
                <input type="text" name="userName" id="inputForDay${dayObject.numberOfDay}" placeholder="write notes for day ${dayObject.numberOfDay}" size="18" />
                <button class="remider-button" id="buttonNewReminderForDay" onClick="newReminder(this.id)">&#10012 New Reminder</button>
            </div>
            
        </td>`
        document.getElementById('table1').innerHTML += html
    } else{
        document.getElementById(`inputTdForDay${dayObject.numberOfDay}`).style.display = ''
    }
    if(dayObject.dt == undefined){
        dayObject.dt = document.getElementById(`inputTdForDay${dayObject.numberOfDay}`)
    }else{
        document.getElementById(dayObject.dt.id).style.display = 'none'
        recoveryTable()
        dayObject.dt = undefined
    }
}

function newReminder(id){
    html = ''
    
    let valueFromInput = document.getElementById(`inputForDay${dayObject.numberOfDay}`).value
    if(valueFromInput.length <= 1){
        if (document.getElementById(`attentionForDay${dayObject.numberOfDay}`) == null) {
            html = `<p id="attentionForDay${dayObject.numberOfDay}" class="attention">write more symbols</p>`
        }else{

        }
    } else{
        if(document.getElementById(`attentionForDay${dayObject.numberOfDay}`) == null){
            html =
            `<div class="task-box">
                <p class="task-text">${valueFromInput}</p>
                <span>
                    <button class="task-button done-button">&#9745</button>
                    <button class="task-button del-button">&#9746;</button>
                </span>
            </div>`
        }else{
            document.getElementById(`attentionForDay${dayObject.numberOfDay}`).remove()
            html =
            `<div class="task-box">
                <p class="task-text">${valueFromInput}</p>
                <span>
                    <button class="task-button done-button">&#9745</button>
                    <button class="task-button del-button">&#9746;</button>
                </span>
            </div>`
        }
    }
    document.getElementById(id).parentNode.parentNode.innerHTML += html
}

function recoveryTable(){
    document.getElementById(`inputTdForDay${dayObject.numberOfDay}`).style.display = 'none'
    for (let h = Number(dayObject.numberParrentId); h < dayObject.generallRows; h++) {
        dayObject.correctNUmberOfRow = Number(h) + 1
        document.getElementById('week' + dayObject.correctNUmberOfRow).style.display = ''
    }
}

function getId(id) {
    return document.getElementById(id)
}

var c = new Cal("divCal")
c.showcurr()
getId('btnNext').onclick = function() {
    c.nextMonth()
}
getId('btnPrev').onclick = function() {
    c.previousMonth()
}