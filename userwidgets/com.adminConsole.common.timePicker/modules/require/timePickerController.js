define(function() {

  function getTime(){
    var hours = getHours(this);
    var minutes = getMinutes(this);
    var meridiem = getMeridiem(this);

    if(hours === "hh" || minutes === "mm"){
      if((hours === "hh" && minutes !== "mm") || (hours !== "hh" && minutes === "mm")) {
        return {
          "Error":"Either hour or minute not entered",
          "Hours":null,
          "Minutes":null,
          "Meridiem":null
        };
      }
      else {
        return {
          "Error":"Invalid time selection",
          "Hours":null,
          "Minutes":null,
          "Meridiem":null
        };
      }
    }

    return {
      "Hours":hours,
      "Minutes":minutes,
      "Meridiem":meridiem
    };
  }

  function setTime(hours, minutes, meridiem){
    setHours(this, hours);
    setMinutes(this, minutes);
    setMeridiem(this, meridiem);
  }

  function getHours(scopeObject){
    return scopeObject.view.lstbxHours.selectedKeyValue[1];
  }

  function setHours(scopeObject, hours){
    scopeObject.view.lstbxHours.selectedKey = hours;
  }

  function getMinutes(scopeObject){
    return scopeObject.view.lstbxMinutes.selectedKeyValue[1];
  }

  function setMinutes(scopeObject, minutes){
    scopeObject.view.lstbxMinutes.selectedKey = minutes;
  }

  function getMeridiem(scopeObject){
    return scopeObject.view.lstbxAMPM.selectedKeyValue[1];
  }

  function setMeridiem(scopeObject, meridiem){
    scopeObject.view.lstbxAMPM.selectedKey = meridiem;
  }

  return {
    getTime : getTime,
    setTime : setTime
  };
});