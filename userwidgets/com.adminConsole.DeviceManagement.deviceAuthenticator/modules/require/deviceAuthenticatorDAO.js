define(function () {
  function deviceAuthenticatorDAO(){

  }

  deviceAuthenticatorDAO.prototype.deviceAuthenticatorOperations = function(serviceConfig, callBack) {
    var flag = false;
    if(flag){
      let response = {};
      response.action = serviceConfig.operationName;
      response.authenticators = [
        {
          "expiryDate": "Thu Feb 10 16:37:53 IST 2022",
          "successfulCount": "0",
          "name": "AT_ACTPWD",
          "id": "567460.AT_ACTPWD",
          "isActive": "false",
          "maximumNumberOfUsages": "0",
          "failureCount": "0",
          "startDate": "Tue Feb 08 16:37:53 IST 2022",
          "resourceType": "Authenticator",
          "status": "DISABLED"
        },
        {
          "expiryDate": "Thu Feb 11 16:37:53 IST 2022",
          "successfulCount": "0",
          "name": "AT_ACTPWD",
          "id": "567000.AT_ACTPWD",
          "isActive": "true",
          "maximumNumberOfUsages": "0",
          "failureCount": "0",
          "startDate": "Tue Feb 08 16:37:53 IST 2022",
          "resourceType": "Authenticator",
          "status": "ENABLED"
        },
        {
          "expiryDate": "Thu Feb 10 16:37:53 IST 2022",
          "successfulCount": "0",
          "name": "AT_ACTPWD",
          "id": "767460.AT_ACTPWD",
          "isActive": "false",
          "maximumNumberOfUsages": "0",
          "failureCount": "0",
          "startDate": "Tue Feb 07 16:37:53 IST 2022",
          "resourceType": "Authenticator",
          "status": "DISABLED"
        },
        {
          "expiryDate": "Thu Feb 11 16:37:53 IST 2022",
          "successfulCount": "0",
          "name": "AT_ACTPWD",
          "id": "867000.AT_ACTPWD",
          "isActive": "true",
          "maximumNumberOfUsages": "0",
          "failureCount": "0",
          "startDate": "Tue Feb 06 16:37:53 IST 2022",
          "resourceType": "Authenticator",
          "status": "ENABLED"
        },
        {
          "expiryDate": "Thu Feb 10 16:37:53 IST 2022",
          "successfulCount": "0",
          "name": "AT_ACTPWD",
          "id": "367460.AT_ACTPWD",
          "isActive": "false",
          "maximumNumberOfUsages": "0",
          "failureCount": "0",
          "startDate": "Tue Feb 05 16:37:53 IST 2022",
          "resourceType": "Authenticator",
          "status": "DISABLED"
        },
        {
          "expiryDate": "Thu Feb 11 16:37:53 IST 2022",
          "successfulCount": "0",
          "name": "AT_ACTPWD",
          "id": "967000.AT_ACTPWD",
          "isActive": "true",
          "maximumNumberOfUsages": "0",
          "failureCount": "0",
          "startDate": "Tue Feb 04 16:37:53 IST 2022",
          "resourceType": "Authenticator",
          "status": "ENABLED"
        }
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
        if(response.authenticators){
          res.authenticators = response.authenticators;
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
        res.result = "Failed";
        callBack(res);
      });
  };

  return deviceAuthenticatorDAO;
});