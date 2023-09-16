define(['ModelManager'], function (ModelManager) {
  /**
     * LoansServicesManager
     */
  function LoansServicesManager() {
    kony.mvc.Business.Delegator.call(this);    
  }

  inheritsFrom(LoansServicesManager, kony.mvc.Business.Delegator);

  LoansServicesManager.prototype.initializeBusinessController = function () {

  };
  LoansServicesManager.prototype.getAddressSuggestion=function(context,sucess,error){
         ModelManager.invoke('GetAddressesSuggestions','GetAddressSuggestionsCreate', context, sucess, error);
   };   
  LoansServicesManager.prototype.getPlaceDetails=function(context,sucess,error){
         ModelManager.invoke('GetPlaceDetails','PlaceDetails', context, sucess, error);
   };
  LoansServicesManager.prototype.USPSAddressValidation=function(context,sucess,error){
         ModelManager.invoke('ValidateAddress','ValidationCreate', context, sucess, error);
   };
  
  LoansServicesManager.prototype.getPendingApplicationsList = function(context,onSuccess, onError){

    var queryResponseModel = ModelManager.getModel("QueryResponse");      
    queryResponseModel.addAttribute("amount", null);
    queryResponseModel.addAttribute("currency", null);      
    queryResponseModel.addAttribute("loantype", null);      
    ModelManager.invokeWithModelDef(queryResponseModel,'getQueryResponseApplicationsList',context, function(resp){
      onSuccess(resp); }, onError);

  };

  LoansServicesManager.prototype.getLoanTypes = function(context, onSuccess, onError){
    ModelManager.invoke('LoanType','getAll', context, onSuccess, onError);
  };
  LoansServicesManager.prototype.getQueryQuestions = function(context, onSuccess, onError){

    var queryDefinitionModel = ModelManager.getModel("QueryDefinition");

    queryDefinitionModel.addAttribute("Optionitem_id", null);
    queryDefinitionModel.addAttribute("QuestionDefinition_id", null);
    queryDefinitionModel.addAttribute("Optionitem_DefaultValue", null);
    queryDefinitionModel.addAttribute("QuestionDefinition_OtherLabel", null);
    queryDefinitionModel.addAttribute("QuerySectionQuestion_Sequence", null);      

    ModelManager.invokeWithModelDef(queryDefinitionModel,'getByCriteria', context, onSuccess, onError);
  };

  LoansServicesManager.prototype.getQuestionResponse = function(context,onSuccess,onError){
    ModelManager.invoke('QuestionResponse','getQuestionResponse', context, onSuccess, onError);
  };

  LoansServicesManager.prototype.createQueryResponse = function(context, onSuccess, onError) {
    var queryResponseModel = ModelManager.getModel("QueryResponse");
    if(context !== null && context.CustomerQuerySectionStatus !== null && context.CustomerQuerySectionStatus !== undefined){
      queryResponseModel.addAttribute("CustomerQuerySectionStatus", context.CustomerQuerySectionStatus);
    }
    if(context !== null && context.QueryCoBorrower !== null && context.QueryCoBorrower !== undefined){
      queryResponseModel.addAttribute("QueryCoBorrower", context.QueryCoBorrower);
    }

    if(context){
      queryResponseModel.addAttribute("QuestionResponse", context.QuestionResponse);
    }
    ModelManager.invokeWithModelDef(queryResponseModel, 'createQueryResponse', context, onSuccess, onError);
  };

  LoansServicesManager.prototype.updateQueryResponse = function(context, onSuccess, onError) {
    var queryResponseModel = ModelManager.getModel("QueryResponse");
    var queryResponseModelObj = new queryResponseModel(context);
    if(context !== null && context.CustomerQuerySectionStatus !== null && context.CustomerQuerySectionStatus !== undefined){
      queryResponseModelObj.addAttribute("CustomerQuerySectionStatus", context.CustomerQuerySectionStatus);
    }
    if(context){
      queryResponseModelObj.addAttribute("QuestionResponse", context.QuestionResponse);
    }
    ModelManager.invokeWithModelDef(queryResponseModelObj, 'update', context, onSuccess, onError);
  };

  LoansServicesManager.prototype.getPrequalificationPackages=function(context,onSuccess,onError)
  {
    ModelManager.invoke('CustomerPrequalifyPackage','GetCustomerPrequalifyPackage', context, onSuccess, onError);
  };

  LoansServicesManager.prototype.getQueryAnswers = function(queryResponseId,onSuccess, onError){
    var queryResponseModel = ModelManager.getModel("QueryResponse"); 
    var context = {"id":queryResponseId};
    queryResponseModel.addAttribute("QuestionResponse", null);      

    ModelManager.invokeWithModelDef(queryResponseModel,'getQueryAnswers',context, onSuccess, onError);
  };

  LoansServicesManager.prototype.updateCustomerDetails=function(context,onSuccess,onError){
    var customerModel=ModelManager.getModel("LoansCustomer");
    customerModel.addAttribute("Phone",null);
    customerModel.addAttribute("Email",null);
    customerModel.addAttribute("PhoneId",null);
    customerModel.addAttribute("EmailId",null);
    ModelManager.invokeWithModelDef(customerModel,'updateCustomerDetails',context, onSuccess, onError);
  };
  LoansServicesManager.prototype.createCustomerDetails=function(context,onSuccess,onError){
    var customerModel=ModelManager.getModel("LoansCustomer");
    customerModel.addAttribute("Phone",null);
    customerModel.addAttribute("Email",null);
    ModelManager.invokeWithModelDef(customerModel,'CreateNewCustomer',context, onSuccess, onError);
  };
  LoansServicesManager.prototype.sendEmail=function(context,onSuccess,onError){
    var customerModel=ModelManager.getModel("LoansCustomer");
    customerModel.addAttribute("copyToEmails",null);
    customerModel.addAttribute("sendToEmails",null);
    customerModel.addAttribute("senderEmail",null);
    customerModel.addAttribute("senderName",null);
    customerModel.addAttribute("subject",null);
    customerModel.addAttribute("content",null);
    ModelManager.invokeWithModelDef(customerModel,'SendEmailService',context, onSuccess, onError);
  };
  LoansServicesManager.prototype.submitResponses = function(responsesToSave, onSuccess, onError){
    var queryResponseModel = ModelManager.getModel("QueryResponse");
    queryResponseModel.addAttribute("QuestionResponse", responsesToSave.QuestionResponse);
     if(responsesToSave.QueryDefinition_id === "PERSONAL_APPLICATION"){
      delete responsesToSave.QueryDefinition_id;
      ModelManager.invokeWithModelDef(queryResponseModel, 'createPersonalLoan', responsesToSave, onSuccess, onError);
    }
    else if(responsesToSave.QueryDefinition_id === "CREDIT_CARD_APPLICATION"){
      delete responsesToSave.QueryDefinition_id;
      ModelManager.invokeWithModelDef(queryResponseModel, 'createCreditCardLoan', responsesToSave, onSuccess, onError);
    }
    else if(responsesToSave.QueryDefinition_id === "VEHICLE_APPLICATION"){
      delete responsesToSave.QueryDefinition_id;
      ModelManager.invokeWithModelDef(queryResponseModel, 'createVehicleLoan', responsesToSave, onSuccess, onError);
    }
  };

  LoansServicesManager.prototype.queryDefinitionGet = function(QueryDefinition_id, onSuccess, onError){
    var queryDefinitionModel = ModelManager.getModel("QueryDefinition");
    queryDefinitionModel.addAttribute("QuerySection_FriendlyName", null);
    queryDefinitionModel.addAttribute("QuestionResponse", null);
    queryDefinitionModel.addAttribute("QuerySection_Name", null);
    queryDefinitionModel.addAttribute("QuerySection_Parent_id", null);
    ModelManager.invokeWithModelDef(queryDefinitionModel, 'getQuestionOptions', {"QueryDefinitionID":QueryDefinition_id}, onSuccess, onError);
  };
  
  LoansServicesManager.prototype.fetchResponses = function(QueryResponse_id, onSuccess, onError){
    var queryResponseModel = ModelManager.getModel("QueryResponse");
    var idToFetch = {
      "QueryResponseID" : QueryResponse_id
    };
    ModelManager.invokeWithModelDef(queryResponseModel, 'GetLoanAnswers', idToFetch, onSuccess, onError);
  };
  
  LoansServicesManager.prototype.updateResponses = function(responsesToUpdate, onSuccess, onError){
    var queryResponseModel = ModelManager.getModel("QueryResponse");
    if(responsesToUpdate.QueryDefinition_id === "CREDIT_CARD_APPLICATION"){
      delete responsesToUpdate.QueryDefinition_id;
      ModelManager.invokeWithModelDef(queryResponseModel, 'updateCreditCardApp', responsesToUpdate, onSuccess, onError);
    }
    else if(responsesToUpdate.QueryDefinition_id === "VEHICLE_APPLICATION"){
      delete responsesToUpdate.QueryDefinition_id;
      ModelManager.invokeWithModelDef(queryResponseModel, 'updateVehicleLoan', responsesToUpdate, onSuccess, onError);
    }
  };
  
  LoansServicesManager.prototype.getLoanTypeApr = function(onSuccess, onError){
    ModelManager.invoke('LoanType','GetAPRs', {}, onSuccess, onError);
  };

  LoansServicesManager.prototype.trackApplication = function(context, onSuccess, onError) {
    var queryResponseModel = ModelManager.getModel("QueryResponse");   
    ModelManager.invokeWithModelDef(queryResponseModel, 'GetLoanAnswersTrack', context, onSuccess, onError);
  };

  LoansServicesManager.prototype.updatePersonalLoan = function(context, onSuccess, onError) {
    var queryResponseModel = ModelManager.getModel("QueryResponse");   
    ModelManager.invokeWithModelDef(queryResponseModel, 'updatePersonalLoan', context, onSuccess, onError);
  };

  LoansServicesManager.prototype.updateVehicleLoan = function(context, onSuccess, onError) {
    var queryResponseModel = ModelManager.getModel("QueryResponse");   
    ModelManager.invokeWithModelDef(queryResponseModel, 'updateVehicleLoan', context, onSuccess, onError);
  };

  LoansServicesManager.prototype.updateCreditCardApp = function(context, onSuccess, onError) {
    var queryResponseModel = ModelManager.getModel("QueryResponse");   
    ModelManager.invokeWithModelDef(queryResponseModel, 'updateCreditCardApp', context, onSuccess, onError);
  };
  
  LoansServicesManager.prototype.getPersonalLoanPurpose = function(context, onSuccess, onError) {
    var queryResponseModel = ModelManager.getModel("QueryDefinition");   
    ModelManager.invokeWithModelDef(queryResponseModel, 'getQuestionOptions', context, onSuccess, onError);
  };
  
  LoansServicesManager.prototype.SSNValidation = function(context, onSuccess, onError) {
    var queryResponseModel = ModelManager.getModel("DBXUser");   
    ModelManager.invokeWithModelDef(queryResponseModel, 'verifyDBXUser', context, onSuccess, onError);
  };
  
  LoansServicesManager.prototype.NumberValidation = function(context, onSuccess, onError) {
    var queryResponseModel = ModelManager.getModel("NumberValidation");   
    ModelManager.invokeWithModelDef(queryResponseModel, context, onSuccess, onError);
  };
  
  return LoansServicesManager;

});