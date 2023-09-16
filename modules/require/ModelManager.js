define([], function () {
    function ModelManager() {}

    ModelManager.prototype.getModel = function (modelName) {
        return kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition(modelName);
    };

    ModelManager.prototype.callBackFrom = function (onSuccess, onError) {
        return function (status, response, error) {
            if (status === kony.mvc.constants.STATUS_SUCCESS) {
              if(response.dbpErrCode)
              	onError(response);
              else
                onSuccess(response);
            } else {
              if (!error.opstatus) {
                error.opstatus = kony.sdk.errorcodes.connectivity_error_code;
                error.errmsg = kony.sdk.errormessages.connectivity_error_message;
              } 
              else if(error.mfcode && error.mfcode.toLowerCase() === "Gateway-35".toLowerCase()){ // Session has expired on server side
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
                authModule.presentationController.onSessionExpire();
                return;
              }
              else if(error.mfcode && error.mfcode.toLowerCase() === "Auth-55".toLowerCase()){ // Unauthorized access of user
                var authModule1 = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
                authModule1.presentationController.onSessionExpire();
                return;
              }
              else{
                error.dbpErrCode = error.opstatus;
                error.dbpErrMsg = error.errmsg;
              }
                onError(error);
            }
        };
    };
    var methodsWithCallBackAsFirstArg = ['getAll'];
    var modelInstanceOperations = ['save', 'update', 'partialUpdate', 'remove'];
    ModelManager.prototype.invoke = function (modelName, method, context, onSuccess, onError) {
        var modelDef = this.getModel(modelName);
        this.invokeWithModelDef(modelDef, method, context, onSuccess, onError);
    };
  
    ModelManager.prototype.invokeWithModelDef = function (modelDef, method, context, onSuccess, onError) {
        if(modelInstanceOperations.indexOf(method) > 0){
            throw Error('This operation should be performed by calling the model instance method.');
        }
        try {
            if (methodsWithCallBackAsFirstArg.indexOf(method) >=0 ) {
                modelDef[method](this.callBackFrom(onSuccess, onError));
            } else {
                modelDef[method](context, this.callBackFrom(onSuccess, onError));
            }
        } catch (exception) {
            onError(exception);
        }
    };

    return new ModelManager();
});