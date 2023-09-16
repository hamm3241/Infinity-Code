define(function () {
  function userDeviceDetailsDAO(){

  }

  userDeviceDetailsDAO.prototype.userDevicesOperations = function(serviceConfig, callBack) {
    var flag = false;
    if(flag){
      let response = {};
      response.action = serviceConfig.operationName;
      response.result = "Success";
      response.userDevices = [
        {
          "expiryDate": "Thu Feb 10 16:37:53 IST 2022",
          "friendlyName": "My IPhone",
          "id": "DeviceId_1",
          "deviceType": "Device Type 1",
          "isActive": "true",
          "startDate": "Tue Feb 08 16:37:53 IST 2022",
          "resourceType": "DeviceDetails",
          "status": "Active",
          "registeredOn" : "Tue Feb 08 16:37:53 IST 2022"
        },
        {
          "expiryDate": "Thu Feb 10 16:37:53 IST 2022",
          "friendlyName": "Nokia 7Plus",
          "id": "DeviceId_2",
          "deviceType": "Device Type 2",
          "isActive": "true",
          "startDate": "Tue Feb 08 16:37:53 IST 2022",
          "resourceType": "DeviceDetails",
          "status": "Active",
          "registeredOn" : "Tue Feb 08 16:37:53 IST 2022"
        },
        {
          "expiryDate": "Thu Feb 10 16:37:53 IST 2022",
          "friendlyName": "My Windows Phone",
          "id": "DeviceId_3",
          "deviceType": "Device Type 3",
          "isActive": "true",
          "startDate": "Tue Feb 08 16:37:53 IST 2022",
          "resourceType": "DeviceDetails",
          "status": "Active",
          "registeredOn" : "Tue Feb 08 16:37:53 IST 2022"
        },
        {
          "expiryDate": "Thu Feb 10 16:37:53 IST 2022",
          "friendlyName": "My IPhone",
          "id": "DeviceId_4",
          "deviceType": "Device Type 4",
          "isActive": "false",
          "startDate": "Tue Feb 08 16:37:53 IST 2022",
          "resourceType": "DeviceDetails",
          "status": "Active",
          "registeredOn" : "Tue Feb 08 16:37:53 IST 2022"
        },
        {
          "expiryDate": "Thu Feb 10 16:37:53 IST 2022",
          "friendlyName": "Samsung Galaxy",
          "id": "DeviceId_5",
          "deviceType": "Device Type 5",
          "isActive": "false",
          "startDate": "Tue Feb 08 16:37:53 IST 2022",
          "resourceType": "DeviceDetails",
          "status": "Disabled",
          "registeredOn" : "Tue Feb 08 16:37:53 IST 2022"
        },
        {
          "expiryDate": "Thu Feb 10 16:37:53 IST 2022",
          "friendlyName": "My IPhone",
          "id": "DeviceId_1",
          "deviceType": "Device Type 1",
          "isActive": "false",
          "startDate": "Tue Feb 08 16:37:53 IST 2022",
          "resourceType": "DeviceDetails",
          "status": "DISABLED",
          "registeredOn" : "Tue Feb 08 16:37:53 IST 2022"
        },
      ];
      callBack(response);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
      return;
    }
    var objSvc = kony.sdk.getCurrentInstance().getObjectService(serviceConfig.objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(serviceConfig.objName);
    for(var key in serviceConfig.payload){
      dataObject.addField(key,serviceConfig.payload[key]);
    }
    var options = {
      "dataObject": dataObject
    };

    objSvc.customVerb(
      serviceConfig.operationName, 
      options,
      function(response) {
        let res = {};
        res.action = serviceConfig.operationName;
        res.payload = serviceConfig.payload;
        if(response.userDevices){
          res.userDevices = response.userDevices;
          res.result = "Success";
        }else{
          res.result = response.opstatus === 0 &&
            response.responseCode === "0" &&
            response.successCode === "200" ? "Success" : "Failed";
        }
        callBack(res);
      },
      function(error) {
        let res = {};
        res.action = serviceConfig.operationName;
        res.payload = serviceConfig.payload;
        res.result = "Failed";
        callBack(res);
      });
  };

  return userDeviceDetailsDAO;
});