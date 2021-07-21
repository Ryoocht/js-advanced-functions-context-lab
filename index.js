/* Your Code Here */
function createEmployeeRecord(arr){
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arr) {
    let employees = [];
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        employees.push(createEmployeeRecord(element));
    }
    return employees;
}

function createTimeInEvent(dateStamp){
    let date = dateStamp.split(" ")[0];
    let hour = dateStamp.split(" ")[1];
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return this;
}

function createTimeOutEvent(dateStamp){
    let date = dateStamp.split(" ")[0];
    let hour = dateStamp.split(" ")[1];
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return this;
}

function hoursWorkedOnDate(date){
    let inTime = this.timeInEvents.find(function(timeIn){
        return timeIn.date === date;
    });
    let outTime = this.timeOutEvents.find(function(timeOut){
        return timeOut.date === date;
    });
    return (outTime.hour - inTime.hour) / 100;
}

function wagesEarnedOnDate(date){
    let wage = hoursWorkedOnDate.call(this, date) * this.payPerHour;
    return parseFloat(wage.toString());
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(function(rec){
        return rec.firstName === firstName
    })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}