define([], function () { 
    
    /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Controller
     */
    function DecisionManagementModule_BusinessController() { 

        kony.mvc.Business.Delegator.call(this); 

    } 

    inheritsFrom(DecisionManagementModule_BusinessController, kony.mvc.Business.Controller); 

    /**
     * Overridden Method of kony.mvc.Business.Controller
     * This method gets called when business controller gets initialized
     * @method
     */
    DecisionManagementModule_BusinessController.prototype.initializeBusinessController = function() { 

    }; 

    /**
     * Overridden Method of kony.mvc.Business.Controller
     * This method gets called when business controller is told to execute a command
     * @method
     * @param {Object} kony.mvc.Business.Command Object
     */
	DecisionManagementModule_BusinessController.prototype.execute = function(command) { 

		kony.mvc.Business.Controller.prototype.execute.call(this, command);

	};
  DecisionManagementModule_BusinessController.prototype.createDecisionRule = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("DecisionManagementManager")
      .businessController.createDecisionRule(context, onSuccess, onError);
  };
  DecisionManagementModule_BusinessController.prototype.getDecisionRules = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("DecisionManagementManager")
      .businessController.getDecisionRules(context, onSuccess, onError);
  };
  
   DecisionManagementModule_BusinessController.prototype.editDecisionRule = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("DecisionManagementManager")
      .businessController.editDecisionRule(context, onSuccess, onError);
  };
  
  DecisionManagementModule_BusinessController.prototype.GetAllFilesofDecisionRule = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("DecisionManagementManager")
      .businessController.GetAllFilesofDecisionRule(context, onSuccess, onError);
  };
  DecisionManagementModule_BusinessController.prototype.UploadRuleFile = function(context, onSuccess, onError){
    try {
      var mfURL = KNYMobileFabric.mainRef.config.selflink;
      mfURL = mfURL.substring(0, mfURL.indexOf("/authService"));

      var authToken = KNYMobileFabric.currentClaimToken;
      var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
      var uploadURL = mfURL + "/services/data/v1/DecisionManagement/operations/decision/UploadRulesFile";

      var formData = new FormData();
      formData.append("X-Kony-Authorization", authToken);
      formData.append("uploadedBy", user_ID);
      formData.append("decisionName", context.decisionName);
      formData.append("comment", context.comments);
      if (context.fileForUpload !== undefined) {
        formData.append("fileName", context.fileForUpload);
      }
      //formData
      var xhr = new XMLHttpRequest();
      xhr.open('POST', uploadURL, true);
      xhr.setRequestHeader("X-Kony-Authorization", authToken);
      
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          onSuccess(response);
        }
        else{
          onError({"status":kony.mvc.constants.STATUS_FAILURE,"message":"Upload file server error"});
        }
      };
      xhr.send(formData);
    } catch (err) {
      onError({"status":kony.mvc.constants.STATUS_FAILURE,"message":err});
    }

  };
  DecisionManagementModule_BusinessController.prototype.downloadFile = function(context, onSuccess, onError){
     try {
        var authToken = KNYMobileFabric.currentClaimToken;
        var mfURL = KNYMobileFabric.mainRef.config.selflink;
        mfURL = mfURL.substring(0, mfURL.indexOf("/authService"));
		var decisionName=context.decisionName;
   		var version = context.version;
        var decisionURL=  "/services/data/v1/DecisionManagement/operations/decision/DownloadRulesFile?decisionName=";
        var downloadURL = mfURL + decisionURL + decisionName + "&version=" + version + "&authToken=" + authToken;
        var encodedURI = encodeURI(downloadURL);
        var downloadLink = document.createElement("a");
        downloadLink.href = encodedURI;
        downloadLink.target="_blank";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
     }
    catch (err) {
      onError({"status":kony.mvc.constants.STATUS_FAILURE,"message":err});
    }
  };

    return DecisionManagementModule_BusinessController;

});