define(function() {

var controller = {
    preShow: function () {
      var dataMap=   {
      "lblSeperator":"lblSeperator"};
    var data=
        [{"lblSeperator":"-","template" : "flxDeviceManagement"}];
   this.view.segListing.widgetDataMap = dataMap;
    this.view.segListing.setData(data);
    },
  };
  return controller;
});