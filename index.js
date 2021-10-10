// Your code here
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(arrays) {
  return arrays.map((array) => createEmployeeRecord(array));
}

function createTimeInEvent(empRecord, dateStamp) {
  let stamp = dateStamp.split(" ");

  let updated = {
    type: "TimeIn",
    hour: parseInt(stamp[1], 10),
    date: stamp[0],
  };

  empRecord.timeInEvents.push(updated);
  return empRecord;
}

function createTimeOutEvent(empRecord, dateStamp) {
  let stamp = dateStamp.split(" ");

  let updated = {
    type: "TimeOut",
    hour: parseInt(stamp[1], 10),
    date: stamp[0],
  };

  empRecord.timeOutEvents.push(updated);
  return empRecord;
}

function hoursWorkedOnDate(empRecord, date) {
  let inDate = empRecord.timeInEvents.find((element) => {
    return element.date === date;
  });

  let outDate = empRecord.timeOutEvents.find((element) => {
    return element.date === date;
  });

  return (outDate.hour - inDate.hour) / 100;
}

function wagesEarnedOnDate(empRecord, date) {
  return (
    hoursWorkedOnDate(empRecord, date) * parseInt(empRecord.payPerHour, 10)
  );
}

function allWagesFor(empRecord) {
  let workedDates = empRecord.timeInEvents.map((e) => e.date);

  const allWages = workedDates.reduce(function (totalDatesToBe, dates) {
    return totalDatesToBe + wagesEarnedOnDate(empRecord, dates);
  }, 0);

  return allWages;
}

//This function return all wages for all employees
//*wagesEarnedOnDate() shows pay owed for the date

//First collect all the dates worked for all the employee
//Then, calculate the amount 
function calculatePayroll(array) {
   const payroll = array.reduce(function (accum, employee) {
       return accum + allWagesFor(employee)
   }, 0)
   return payroll
}