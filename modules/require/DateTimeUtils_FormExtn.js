define(function() {
  var DATE_TIME_FORMAT = "yyyy-MMM-dd_HH.mm.ss";
  var DATE_TIME_FORMAT_12_HRS = "MM/dd/yyyy hh:mm a";
  var DATE_PATTERN = "dd MMM, yyyy";
  var DATE_TIME_FORMAT_WITHOUT_TIME = "MM/dd/yyyy";
  var language = window.navigator.userLanguage || window.navigator.language;
  var langLower = language.toLowerCase();
  var localeBasedDates = { "en-us" : "MM-DD-YYYY", "en-gb" : "DD/MM/YYYY", "es-es" : "DD/MM/YYYY", "de-de" : "YYYY-MM-DD", "fr-fr":"DD/MM/YYYY", "sv-se": "YYYY-MM-DD"};
  if(localeBasedDates[langLower] === undefined){
    langLower = "en-us";
  }
  var formatDate = function(dateString) {
    var yyyy = +dateString.substr(0, 4);
    var mm = +dateString.substr(5, 2);
    var dd = +dateString.substr(8, 2);

    var yy = yyyy.toString().substr(-2);

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    var dateObj = mm + "/" + dd + "/" + yy; //+'T'+hours+':'+minutes+':'+seconds;
    return dateObj;
  };

  var formatDateMMslashDDslashYYYY = function(dateString) {
    var yyyy = +dateString.substr(0, 4);
    var mm = +dateString.substr(5, 2);
    var dd = +dateString.substr(8, 2);

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    var dateObj = mm + "/" + dd + "/" + yyyy;
    return dateObj;
  };

  var getTransactionDateForServiceCall = function(date) {
    var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var mm = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var yyyy = date.getFullYear();
    date = yyyy + "-" + mm + "-" + dd;
    return date + " 00:00:00";
  };

  var getDateForString = function(dateString) {
    var dateObj = new Date();
    //var today = new Date();
    if (dateString === "Today") dateObj = new Date();
    else if (dateString === "Yesterday") dateObj.setDate(dateObj.getDate() - 1);
    else if (dateString === "Last 7 days") dateObj.setDate(dateObj.getDate() - 7);
    else if (dateString === "Last 30 days") dateObj.setDate(dateObj.getDate() - 30);
    else dateObj = new Date(dateString);

    var dd = dateObj.getDate();
    var mm = dateObj.getMonth() + 1;
    var yyyy = dateObj.getFullYear();
    //var yy = yyyy.toString().substr(-2);
    var hours = dateObj.getHours();
    var minutes = dateObj.getMinutes();
    var seconds = dateObj.getSeconds();

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    //2018-02-07 19:22:47
    dateObj = yyyy + "-" + mm + "-" + dd + " 00:00:00";
    return dateObj;
  };
  var getEndDateForString = function(dateString) {
    var dateObj = new Date();
    //var today = new Date();
    if (dateString === "Today") dateObj = new Date();
    else if (dateString === "Yesterday") dateObj.setDate(dateObj.getDate() - 1);
    else if (dateString === "Last 7 days") dateObj.setDate(dateObj.getDate() - 7);
    else if (dateString === "Last 30 days") dateObj.setDate(dateObj.getDate() - 30);
    else dateObj = new Date(dateString);

    var dd = dateObj.getDate();
    var mm = dateObj.getMonth() + 1;
    var yyyy = dateObj.getFullYear();
    //var yy = yyyy.toString().substr(-2);
    var hours = dateObj.getHours();
    var minutes = dateObj.getMinutes();
    var seconds = dateObj.getSeconds();

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    //2018-02-07 19:22:47
    dateObj = yyyy + "-" + mm + "-" + dd + " 23:59:59";
    return dateObj;
  };

  var getTodaysFormattedDate = function() {
    var dateObj = new Date();

    var dd = dateObj.getDate();
    var mm = dateObj.getMonth() + 1;
    var yyyy = dateObj.getFullYear();
    //var yy = yyyy.toString().substr(-2);
    var hours = dateObj.getHours();
    var minutes = dateObj.getMinutes();
    var seconds = dateObj.getSeconds();

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    //2018-02-07 19:22:47
    dateObj = mm + "/" + dd + "/" + yyyy ;
    return dateObj;
  };

  var validateDates = function(endDate, startDate) {
    var regExp = /(\d{1,2})\/(\d{1,2})\/(\d{2,4})/;
    if (parseInt(endDate.replace(regExp, "$3$1$2")) > parseInt(startDate.replace(regExp, "$3$1$2"))) {
      return false;
    } else return true;
  };

  var getMonthText = function(number) {
    var monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthArr[number];
  };

  var getDayText = function(number) {
    var dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return dayArr[number];
  };

  var convertDate = function() {
    var date = new Date();
    var formatedDate = getDayText(date.getDay()) + ", " + date.getDate() + " " + getMonthText(date.getMonth()) + ", " + date.getFullYear();
    return formatedDate;
  };

  var getCustomDate = function(Num, target) {
    var date = new Date();
    if (target === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.DAYS")) {
      date.setDate(date.getDate() - Num);
    } else if (target === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.MONTHS")) {
      date.setMonth(date.getMonth() - Num);
    } else if (target === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOM")) {
      var customDate = Num.split("/");
      date.setFullYear(customDate[2]);
      date.setMonth(customDate[1] - 1);
      date.setDate(customDate[0]);
    }
    return date;
  };

  var compareStartAndEndDate = function(start, end) {
    var startDate = new Date();
    var endDate = new Date();

    //start date
    var customDate1 = start.split("/");
    startDate.setFullYear(customDate1[2]);
    startDate.setMonth(customDate1[1] - 1);
    startDate.setDate(customDate1[0]);

    //end date
    var customDate2 = end.split("/");
    endDate.setFullYear(customDate2[2]);
    endDate.setMonth(customDate2[1] - 1);
    endDate.setDate(customDate2[0]);

    if (startDate > endDate) {
      return false;
    }
    return true;
  };

  var getFormattedTime = function(timePickerValues, format) {
    var finalString;
    var hr = parseInt(timePickerValues.Hours, 10);
    var min = timePickerValues.Minutes;
    var am_Pm_Value = timePickerValues.Meridiem;

    if (hr > 24 || hr < 1) {
      //add validation toastMessage
    }
    if (format === 12) {
      if (am_Pm_Value === "AM") {
        if (hr > 12) hr = hr - 12;
      } else {
        hr = hr + 12;
      }
    } else {
      if (hr < 12) {
        if (am_Pm_Value === "PM") {
          hr = hr + 12;
        }
      }
    }
    if (hr < 10) {
      hr = "0" + hr;
    }
    finalString = hr + ":" + min + ":00";
    return finalString;
  };
   var getFormattedLocationsTime = function(timePickerValues, format) {
    var finalString;
    var hours = parseInt(timePickerValues.Hours, 10);
    var min = timePickerValues.Minutes;
    var am_Pm_Value = timePickerValues.Meridiem;

    if (hours === 12) {
      hours = "00";
    }
    if (am_Pm_Value === "pm") {
      hours = parseInt(hours, 10) + 12;
    }else if(parseInt(hours)<10){
      hours="0"+hours;
    }
    finalString = hours + ":" + min + ":00";
    return finalString;
  };
  var convertDateTime = function(dateObj){

    var dd = dateObj.getDate();
    var mm = dateObj.getMonth() + 1;
    var yyyy = dateObj.getFullYear();
    var hours = dateObj.getHours();
    var minutes = dateObj.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    //2018-02-07 19:22:47
    dateObj = mm + "/" + dd + "/" + yyyy.toString().substring(2)+ "-"+hours+":"+minutes+' ' + ampm;
    return dateObj;
  };
  var getFormattedDateAndTimeFromMilliseconds = function(milliseconds) {
    var dateObj=new Date(milliseconds);
    return convertDateTime(dateObj);
  };
  var getDateInstanceFromDBDateTime = function(dbDateTime){
    if(dbDateTime === undefined)
      return null;
    if(dbDateTime instanceof Date){
      return dbDateTime;
    }else{
      var date = (dbDateTime.split(' ')[0]).split('-');
      var time = ((dbDateTime.split(' ')[1]).split('.')[0]).split(':');
      var dateObj=new Date(date[0],date[1]-1,date[2],time[0],time[1],time[2]);
      return dateObj;
    }
  };  
  var getFormattedDataTimeFromDBDateTime = function(dbDateTime){
    return convertDateTime(getDateInstanceFromDBDateTime(dbDateTime));
  };
  var getDateInstanceFromDBDate = function(dbDateTime){
    if(dbDateTime === undefined)
      return null;
    var date = (dbDateTime.split(' ')[0]).split('-');
    var dateObj=new Date(date[0],date[1],date[2]);
    return dateObj;
  };
  var timeValidationObj = function(timeString) {
    var finalString = "";
    var am = true;
    if (timeString) {
      var hr = parseInt(timeString.substr(0, 2), 10);
      var min = timeString.substr(3, 2);
      if (hr > 12) {
        hr = hr - 12;
        am = false;
      }
      if (hr < 10) {
        hr = "0" + hr;
      }
      finalString = hr + ":" + min + ":00";
      finalString = finalString.substr(0, 5);
    }
    return {
      value: finalString,
      am: am
    };
  };

  var timeValueObj = function(timeString) {
    var meridiem = "AM";
    var hours;
    var minutes;
    if (timeString) {
      hours = parseInt(timeString.split(":")[0], 10);
      minutes = parseInt(timeString.split(":")[1], 10);

      if (hours > 12) {
        hours = hours - 12;
        meridiem = "PM";
      }
    }
    return {
      hours: hours,
      minutes: minutes,
      meridiem: meridiem
    };
  };

  var timeValidationString = function(timeString) {
    var obj = timeValidationObj(timeString);
    return obj.value + (obj.value ? (obj.am ? " AM" : "PM") : "");
  };

  var getDateFromDBDateTime = function(dateTime) {
    var Month =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = dateTime.split(" ")[0].split("-");
    var dateString = Month[date[1] - 1] + " " + date[2] + ", " + date[0];
    return dateString;
  };

  var getTimeFromDBDateTime = function(dateTime) {
    var time = dateTime.split(" ")[1].split(":");
    var timeString;
    if (parseInt(time[0]) < 12) {
      timeString = time[0] + ":" + time[1] + "am";
    } else {
      if (parseInt(time[0]) === 12) timeString = time[0] + ":" + time[1] + "pm";
      else timeString = parseInt(time[0]) - 12 + ":" + time[1] + "pm";
    }
    return timeString;
  };
  var getLocaleDateAndTime = function(dateTime) {
    const event = new Date(dateTime);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    return moment(event).format(localeBasedDates[langLower])+ ", "+ event.toLocaleString(language, options);
  };
  var getLocaleDate = function(dateTime) {
    const event = new Date(dateTime);
    return moment(event).format(localeBasedDates[langLower]);
  };
  var getLocaleFormat = function(){
    return localeBasedDates[langLower];
  };
  var getDateFormatYYYYMMDD = function(dateString,seperator){
    try{
      if(!seperator){
        seperator = "-";
      }
       var o= new Date(Date.parse(dateString));
      if(!o){
        throw new Error("Inavlid Date String");
      }
      var formatNumber = function(num){
        return num<10?"0"+num:num;
      };
      return o.getFullYear()+seperator+formatNumber(o.getMonth()+1)+seperator+formatNumber(o.getDate());    
    }catch(err){
      kony.print("Inavlid Date String");
      throw err;
    }
  };

  var getDateFormatMMDDYYYY = function(dateString,seperator){
    try{
      if(!seperator){
        seperator = "-";
      }
      var d = new Date(dateString);
      if(!d){
        throw new Error("Inavlid Date String");
      }
      var formatNumber = function(num){
        return num<10?"0"+num:num;
      };
      return formatNumber(d.getMonth()+1)+seperator+formatNumber(d.getDate())+seperator+d.getFullYear();    
    }catch(err){
      kony.print("Inavlid Date String");
      throw err;
    }
  };

  var getFormattedDate = function(inputDate, inputFormat, outputFormat){
    var year, month, date, hours, minutes, seconds, result;
    if(inputFormat === "YYYY-MM-DD"){
      year = inputDate.split("-")[0];
      month = inputDate.split("-")[1];
      date = inputDate.split("-")[2];
    }else{
      kony.print("Invalid input format");
      return null;
    }

    if(outputFormat === "MM-DD-YYYY"){
      result = month+ "-" + date + "-" + year;
    }else{
      kony.print("Invalid output format");
      return null;
    }

    return result;
  };
  return {
    formatDate: formatDate,
    formatDateMMslashDDslashYYYY: formatDateMMslashDDslashYYYY,
    convertDate: convertDate,
    timeValueObj: timeValueObj,
    validateDates: validateDates,
    getCustomDate: getCustomDate,
    getFormattedTime: getFormattedTime,
    getFormattedLocationsTime: getFormattedLocationsTime,
    getDateForString: getDateForString,
    getEndDateForString:getEndDateForString,
    timeValidationObj: timeValidationObj,
    timeValidationString: timeValidationString,
    getDateFromDBDateTime: getDateFromDBDateTime,
    getTimeFromDBDateTime: getTimeFromDBDateTime,
    compareStartAndEndDate: compareStartAndEndDate,
    getTodaysFormattedDate:getTodaysFormattedDate,
    getTransactionDateForServiceCall: getTransactionDateForServiceCall,
    getFormattedDateAndTimeFromMilliseconds:getFormattedDateAndTimeFromMilliseconds,
    getFormattedDataTimeFromDBDateTime:getFormattedDataTimeFromDBDateTime,
    getDateInstanceFromDBDateTime:getDateInstanceFromDBDateTime,
    getLocaleDateAndTime:getLocaleDateAndTime,
    getLocaleDate:getLocaleDate,
    getDateInstanceFromDBDate:getDateInstanceFromDBDate,
    getLocaleFormat:getLocaleFormat,
    getDateFormatYYYYMMDD:getDateFormatYYYYMMDD,
    getDateFormatMMDDYYYY:getDateFormatMMDDYYYY,
    getFormattedDate:getFormattedDate
  };
});
