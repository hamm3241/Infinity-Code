define(function () {

  var DBP_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss.SSS";

  //This is the standard date format used accross the application
  var STANDARD_CLIENT_DATETIME_FORMAT = "yyyy-MM-dd hh:mm a";
  var CLIENT_DATETIME_FORMAT1 = "dd/MM/yyyy hh:mm a";
  /*
  * getFormattedTimeFromDateInstance will return a formatted localized time to be shown on client UI.
  * As of now only yyyy-MM-dd HH:mm a is supported
  */
  var getFormattedTimeFromDateInstance = function (dateInstance, toFormat) {

    if (toFormat === STANDARD_CLIENT_DATETIME_FORMAT) {
      var formattedDateString = dateInstance.getFullYear() + "-" +
        (dateInstance.getMonth() < 9 ? "0" + (dateInstance.getMonth()+1) : (dateInstance.getMonth()+1)) + "-" +
        (dateInstance.getDate() < 10 ? "0" + dateInstance.getDate() : dateInstance.getDate()) + " ";
      var hours = dateInstance.getHours() > 12 ? dateInstance.getHours() - 12 : (dateInstance.getHours() === 0? 12 : dateInstance.getHours());
      var am_pm = dateInstance.getHours() >= 12 ? "PM" : "AM";
      hours = hours < 10 ? "0" + hours : hours;
      var minutes = dateInstance.getMinutes() < 10 ? "0" + dateInstance.getMinutes() : dateInstance.getMinutes();
      formattedDateString += hours + ":" + minutes + " " + am_pm;

      return formattedDateString;

    } else if (toFormat === CLIENT_DATETIME_FORMAT1) {
      var formattedDateString = (dateInstance.getDate() < 10 ? "0" + dateInstance.getDate() : dateInstance.getDate()) + "/" +
        (dateInstance.getMonth() < 9 ? "0" + (dateInstance.getMonth()+1) : (dateInstance.getMonth()+1)) + "/" +
        dateInstance.getFullYear() + " ";
      var hours = dateInstance.getHours() > 12 ? dateInstance.getHours() - 12 : (dateInstance.getHours() === 0? 12 : dateInstance.getHours());
      var am_pm = dateInstance.getHours() >= 12 ? "PM" : "AM";
      hours = hours < 10 ? "0" + hours : hours;
      var minutes = dateInstance.getMinutes() < 10 ? "0" + dateInstance.getMinutes() : dateInstance.getMinutes();
      formattedDateString += hours + ":" + minutes + " " + am_pm;

      return formattedDateString;
    } else {
      //Format not supported
      throw Error("DateUtils: Format not supported");
    }

  }

  /*
   * This function will parse the given string to the given format.
   * This function is also compatible with IE and safari
   * For now only supports yyyy-MM-dd HH:mm:ss
   */
  var parseDateStringIntoDatePojo = function (dateString, format) {
    if (format === DBP_DATE_FORMAT) {
      var datestr = dateString.split(" ")[0];
      var timestr = dateString.split(" ")[1];

      var datePojo = new DatePojo();
      datePojo.setYear(datestr.split("-")[0]);
      datePojo.setMonth(parseInt(datestr.split("-")[1])-1);
      datePojo.setDay(datestr.split("-")[2]);
      datePojo.setHours(timestr.split(":")[0]);
      datePojo.setMinutes(timestr.split(":")[1]);
      datePojo.setSeconds(timestr.split(":")[2].split(".")[0]);

      return datePojo;
    } else {
      //Format not supported
      throw Error("DateUtils: Format not supported");
    }
  };

  /*
   * getLocalizedDateFromDatabaseTS will return a date object which is local to the client
   */
  var getLocalizedDateFromDatabaseTS = function (databaseTS) {
    var datePojoObject = parseDateStringIntoDatePojo(databaseTS, DBP_DATE_FORMAT);
    var databaseDateInstance = new Date(datePojoObject.getYear(), datePojoObject.getMonth(),
      datePojoObject.getDay(), datePojoObject.getHours(), datePojoObject.getMinutes(),
      datePojoObject.getSeconds());

    var offsetDifferenceInMinutes = kony.mvc.MDAApplication.getSharedInstance().appContext.TIME_ZONE_OFFSET_DIFFERENCE;
    var localTSDateObject = new Date();
    localTSDateObject.setTime((databaseDateInstance.getTime() + (offsetDifferenceInMinutes * 60 * 1000)));
    return localTSDateObject;
  };

  /*
  * getLocalizedStandardTimeFromDatabaseTS will return a standard client formatted localized time to be shown on client UI.
  */
  var getLocalizedStandardTimeFromDatabaseTS = function (databaseTS, toFormat) {
    var dateInstance = getLocalizedDateFromDatabaseTS(databaseTS);
    return getFormattedTimeFromDateInstance(dateInstance, toFormat);
  }

  /*
   * DatePojo is a bean which holds the basic date properties.
   * 
   */
  var DatePojo = function () {
    this.year;
    this.month;
    this.day;
    this.hours;
    this.minutes;
    this.seconds;

    this.setYear = function (year) {
      this.year = year;
    }
    this.getYear = function () {
      return this.year;
    }
    this.setMonth = function (month) {
      this.month = month;
    }
    this.getMonth = function () {
      return this.month;
    }
    this.setDay = function (day) {
      this.day = day;
    }
    this.getDay = function () {
      return this.day;
    }
    this.setHours = function (hours) {
      this.hours = hours;
    }
    this.getHours = function () {
      return this.hours;
    }
    this.setMinutes = function (minutes) {
      this.minutes = minutes;
    }
    this.getMinutes = function () {
      return this.minutes;
    }
    this.setSeconds = function (seconds) {
      this.seconds = seconds;
    }
    this.getSeconds = function () {
      return this.seconds;
    }
  }

  return {
      DBP_DATE_FORMAT: DBP_DATE_FORMAT,
      STANDARD_CLIENT_DATETIME_FORMAT: STANDARD_CLIENT_DATETIME_FORMAT,
      CLIENT_DATETIME_FORMAT1:CLIENT_DATETIME_FORMAT1,

      getLocalizedDateFromDatabaseTS: getLocalizedDateFromDatabaseTS,
      getLocalizedStandardTimeFromDatabaseTS: getLocalizedStandardTimeFromDatabaseTS,
      getFormattedTimeFromDateInstance: getFormattedTimeFromDateInstance
  };
});
