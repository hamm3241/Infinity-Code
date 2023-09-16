define([], function () { 

  function BusinessController() {
    kony.mvc.Business.Delegator.call(this);
  } 

  inheritsFrom(BusinessController, kony.mvc.Business.Delegator);

  BusinessController.prototype.initializeBusinessController = function() { 

  }; 

  BusinessController.prototype.sortParticularField=function(sortPayload,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.sortingList(sortPayload, OnSucess, onError);
  };
  BusinessController.prototype.getAddressSuggestion=function(context,OnSucess,onError){
     kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.getAddressSuggestion(context, OnSucess, onError);
  };
  BusinessController.prototype.getPlaceDetails=function(context,OnSucess,onError){
     kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.getPlaceDetails(context, OnSucess, onError);
  };
   BusinessController.prototype.USPSAddressValidation=function(context,OnSucess,onError){
     kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.USPSAddressValidation(context, OnSucess, onError);
  };
  
   BusinessController.prototype.getLoanTypes=function(context,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.getLoanTypes(context,OnSucess, onError);
  };

  BusinessController.prototype.getQueryQuestions=function(context,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.getQueryQuestions(context, OnSucess, onError);
  };

  BusinessController.prototype.getQuestionResponse=function(context,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.getQuestionResponse(context, OnSucess, onError);
  };

  BusinessController.prototype.saveSimulationResponse = function(context, OnSuccess, onError, simulationFlag) {
    if(!simulationFlag)     { 	
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.createQueryResponse(context, OnSuccess, onError);
    }
    else{
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.updateQueryResponse(context, OnSuccess, onError);
    }
  };

  BusinessController.prototype.createQueryResponse=function(inputPayload,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.createQueryResponse(inputPayload, OnSucess, onError);
  };

  BusinessController.prototype.updateQueryResponse=function(inputPayload,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.updateQueryResponse(inputPayload, OnSucess, onError);
  };

  BusinessController.prototype.getQueryAnswers=function(inputPayload,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.getQueryAnswers(inputPayload, OnSucess, onError);
  };

  BusinessController.prototype.getPrequalificationPackages=function(context,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.getPrequalificationPackages(context,OnSucess, onError);
  };
  BusinessController.prototype.getPendingApplicationsList=function(context,OnSuccess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.getPendingApplicationsList(context,OnSuccess, onError);

  };
  BusinessController.prototype.updateCustomerDetails=function(context,onSuccess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.updateCustomerDetails(context,onSuccess,onError);
  };
  BusinessController.prototype.createCustomerDetails=function(context,onSuccess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.createCustomerDetails(context,onSuccess,onError);
  };
  BusinessController.prototype.sendEmail=function(context,onSuccess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.sendEmail(context,onSuccess,onError);
  };
  BusinessController.prototype.submitResponses = function(responsesToSave, successCallback, errorCallback){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.submitResponses(responsesToSave, successCallback, errorCallback);
  };
  BusinessController.prototype.queryDefinitionGet = function(QueryDefinition_id, successCallback, errorCallback){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.queryDefinitionGet(QueryDefinition_id, successCallback, errorCallback);
  };
  BusinessController.prototype.fetchResponses = function(QueryResponse_id, successCallback, errorCallback){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.fetchResponses(QueryResponse_id, successCallback, errorCallback);
  };
  BusinessController.prototype.updateResponses = function(responsesToUpdate, successCallback, errorCallback){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.updateResponses(responsesToUpdate, successCallback, errorCallback);
  };
  return BusinessController;
});