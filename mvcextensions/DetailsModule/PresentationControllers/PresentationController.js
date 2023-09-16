define([], function() {

  function PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
  }
  inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);
  PresentationController.prototype.initializePresentationController = function() {
    this.QueryResponseID = "";
    this.QuestionResponse = [];
    this.LoanDashBoardData = {
      LoansMasterData: null,
      LoansPreQualification: null
    };
    this.simulationResult={
      simulationQuestions:null,
      simulationAnswers:null,

    }
  };
  PresentationController.prototype.getCustomerBasicInfo=function(context,onSuccess,onError){
    kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.getBasicInfo(context, onSuccess, onError);
  };
  PresentationController.prototype.getAddressSuggestion=function(text,onSucess,OnError){
       var context={
         "input":text,
       }
      this.businessController.getAddressSuggestion(context,onSucess,OnError);
    };
   PresentationController.prototype.getPlaceDetails=function(PlaceId,onSucess,OnError){
       var context={
         "placeid":PlaceId,
       }
      this.businessController.getPlaceDetails(context,onSucess,OnError);
    };
  PresentationController.prototype.USPSAddressValidation=function(payLoad,onSucess,OnError){
       this.businessController.USPSAddressValidation(payLoad,onSucess,OnError);
    };
  
  PresentationController.prototype.sortParticularField = function(sortParameter,sortDirection){
    var scopeObj = this;
    function sortSuccess(responsePayLoad,sortParameter,nextSortDirection){
     var finalResponse = [];
    if(responsePayLoad !== null){
      for(var iterator=0;iterator<responsePayLoad.length;iterator++){
        finalResponse.push(Object.assign({},responsePayLoad[iterator]));
      }
    }
      for(var i in finalResponse){
        finalResponse[i]["modifiedTS"]=new Date(finalResponse[i]["modifiedTS"]);
        finalResponse[i]["modifiedTS"]=finalResponse[i]["modifiedTS"].getFullYear()+"-"+(finalResponse[i]["modifiedTS"].getMonth()+1)+"-"+finalResponse[i]["modifiedTS"].getDate();
        if(responsePayLoad[i]["createdTS"]){
          finalResponse[i]["createdTS"]=new Date(finalResponse[i]["createdTS"]);        
          finalResponse[i]["createdTS"]=finalResponse[i]["createdTS"].getFullYear()+"-"+(finalResponse[i]["createdTS"].getMonth()+1) +"-"+finalResponse[i]["createdTS"].getDate();
        }
      }
      scopeObj.presentUserInterface("frmLoansDashboard",{"responsePayLoad":finalResponse,"sortParameter":sortParameter,"nextSortDirection":nextSortDirection});
    }
    function sortError(){
      kony.print("in error");
    }
    var sortDetails={
      "parameter":sortParameter,
      "direction":sortDirection
    };
    scopeObj.businessController.sortParticularField(sortDetails, sortSuccess, sortError);
  };

  /**
     * @name showForm
     * @member DetailsModule.presentationController
     * 
     */
  PresentationController.prototype.showForm = function(context) {
    this.navigateTo('DetailsModule', 'showLoansForm',[context]);
  };
  /**
         * @name showGuestDashboard
         * @member DetailsModule.presentationController
         * 
         */
  PresentationController.prototype.showGuestDashboard = function() {
    this.navigateTo('DetailsModule', 'showGuestDashboardForm');
  };

  /**
   	* @name showLeadDashboard
    * @member DetailsModule.presentationController
    *
    */
  PresentationController.prototype.showLeadDashboard = function(CustomerBasicInfo, searchResultsSelectedItems) {
    this.navigateTo('DetailsModule', 'showLeadDashboardForm', [CustomerBasicInfo]);
  };

  PresentationController.prototype.updateLeadToApplicant = function(customerID,infoObj){
    var scopeObj = this;
    scopeObj.presentUserInterface('frmGuestDashboard', {
      "LoadingScreen": {
        focus: true
      }
    });
    function updateLeadToApplicantSuccessCallback(res){
      kony.store.setItem("CustomerType_id","Applicant")
       scopeObj.presentUserInterface('frmGuestDashboard', {
      "LoadingScreen": {
        focus: false
       }
       });
      var detailsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("DetailsModule");
      detailsModule.presentationController.showForm({"isApplicantFlow":true,"response":infoObj});
    }
    function updateLeadToApplicantErrorCallback(err){
       scopeObj.presentUserInterface('frmGuestDashboard', {
      "LoadingScreen": {
        focus: false
       }
       });
      scopeObj.presentUserInterface("frmLoansDashboard", { 
        "action":"ErrorOccured"
      });
    }
    var customer = {
      "id": customerID,
      "CustomerType_id": "Applicant"
    };
    scopeObj.businessController.updateCustomerDetails(customer, updateLeadToApplicantSuccessCallback, updateLeadToApplicantErrorCallback);
  };

  PresentationController.prototype.showLeadDashboardForm = function(params) {
    var scopeObj=this;
    scopeObj.presentUserInterface('frmGuestDashboard', {
      "LoadingScreen": {
        focus: true
      }
    });
    function successCallback(response)
    { 
      scopeObj.LoanDashBoardData.LoansMasterData = response;
      scopeObj.presentUserInterface("frmGuestDashboard", {
        "LoanDashBoardData": scopeObj.LoanDashBoardData
      });
      scopeObj.presentUserInterface('frmGuestDashboard', {
        "LoadingScreen": {
          focus: false
        }
      });
      scopeObj.presentUserInterface('frmGuestDashboard', { "CustomerBasicInfo": params.customer});
    }
    function failureCallback(error)
    {
      scopeObj.presentUserInterface('frmGuestDashboard', {
        "LoadingScreen": {
          focus: false
        }
      });
      scopeObj.presentUserInterface('frmGuestDashboard', { "CustomerBasicInfo": params.customer});
    }
    scopeObj.businessController.getLoanTypes("", successCallback, failureCallback);

  };
  /**
         * @name showLoansForm
         * @member DetailsModule.presentationController
         * 
         */
  PresentationController.prototype.showLoansForm = function(context) {
    var scopeObj = this;
    function sucessCallbackPrequalification(response) {
      scopeObj.LoanDashBoardData.LoansPreQualification = response;
      scopeObj.retrieveAllLoansDetails();
      if(context && context.isApplicantFlow === true){
        scopeObj.presentUserInterface("frmLoansDashboard", {
          "LoanDashBoardData": scopeObj.LoanDashBoardData,
          "isApplicantFlow":true,
          "response":context.response,
          "LoadingScreen": {
          focus: true
        }
         });
      }else{
        scopeObj.presentUserInterface("frmLoansDashboard", {
          "LoanDashBoardData": scopeObj.LoanDashBoardData,
          "LoadingScreen": {
          focus: true
        }
           });
      }
    }

    function failureCallbackPreQualification(response) {
      scopeObj.retrieveAllLoansDetails();
    }
    function failureCallback(response) {
       var Params = {
        "Customer_id":"1"// kony.store.getItem("Customer_id")
      };
      scopeObj.businessController.getPrequalificationPackages(Params, sucessCallbackPrequalification, failureCallbackPreQualification);
    }

    function successCallback(response) {
     scopeObj.LoanDashBoardData.LoansMasterData = response;
      var Params = {
        "Customer_id":"1"// kony.store.getItem("Customer_id")
      };
      scopeObj.businessController.getPrequalificationPackages(Params, sucessCallbackPrequalification, failureCallbackPreQualification);
    }
    scopeObj.businessController.getLoanTypes("", successCallback, failureCallback);
  };
  /**
     * @name showGuestDashboardForm
     * @member DetailsModule.presentationController
     * 
     */
  PresentationController.prototype.showGuestDashboardForm = function() {
    var scopeObj = this;
    scopeObj.presentUserInterface('frmGuestDashboard', {
      "LoadingScreen": {
        focus: true
      }
    });
    scopeObj.presentUserInterface('frmGuestDashboard', {
      "fromGuestDashboard": {
        value: true
      }
    });
    function successCallback(response) {
      scopeObj.presentUserInterface('frmGuestDashboard', {
        "LoadingScreen": {
          focus: false
        }
      });
      scopeObj.LoanDashBoardData.LoansMasterData = response;
      scopeObj.presentUserInterface("frmGuestDashboard", {
        "LoanDashBoardData": scopeObj.LoanDashBoardData
      });
    }

    function failureCallback(response) {
      scopeObj.presentUserInterface("frmGuestDashboard", response);
    }
    scopeObj.businessController.getLoanTypes("", successCallback, failureCallback);
  };
  
  /**
     * @name getSimulationQuestions
     * @member DetailsModule.presentationController
     * 
     */
  PresentationController.prototype.getSimulationQuestions = function() {
    var scopeObj = this;

    function getQueryQuestionsSuccess(response) {
      scopeObj.simulationResult.simulationQuestions=response;
      scopeObj.getSimulationAnswers();
    }

    function getQueryQuestionsError(response) {
      scopeObj.presentUserInterface('frmLoansDashboard', {
        "LoadingScreen": {
          focus: false
        }});
      scopeObj.simulationResult.simulationQuestions=null;
      scopeObj.getSimulationAnswers();
    }
    var criteria = kony.mvc.Expression.eq("id", "PERSONAL_SIMULATION");
    scopeObj.businessController.getQueryQuestions(criteria, getQueryQuestionsSuccess, getQueryQuestionsError);
  };
  
  PresentationController.prototype.getGuestSimulationQuestions = function(simulationFlag) {
    var scopeObj = this;
    function getQueryQuestionsSuccess(response) {
      if(!simulationFlag){
        scopeObj.presentUserInterface('frmGuestDashboard', {
          "LoadingScreen": {
            focus: false
          }
        });
        scopeObj.presentUserInterface("frmGuestDashboard", {
          "action": "SimulationQuestions",
          "response": response
        });
      }
      else {
        scopeObj.simulationResult.simulationQuestions=response;
        scopeObj.getLeadSimulationAnswers();
      }
    }

    function getQueryQuestionsError(response) {
      if(!simulationFlag){
        scopeObj.presentUserInterface('frmGuestDashboard', {
          "LoadingScreen": {
            focus: false
          },
          "action": "SimulationQuestionsError"
        });
        scopeObj.presentUserInterface("frmGuestDashboard", response);
      }
      else{
        scopeObj.simulationResult.simulationQuestions=null;
        scopeObj.getLeadSimulationAnswers();
      }
    }
    var criteria = kony.mvc.Expression.eq("id", "PERSONAL_SIMULATION");
    scopeObj.businessController.getQueryQuestions(criteria, getQueryQuestionsSuccess, getQueryQuestionsError);
  };
  
  PresentationController.prototype.saveSimulationResponse = function(questionResponse, simulationFlag) {
    var scopeObj = this;
    var loanAmount = scopeObj.addLoanAmount(questionResponse.loanamount, questionResponse.SimulationResults.QuestionResponse_id.LoanAmount);
    var empStatus = scopeObj.addEmploymentStatus(questionResponse.employmentStatus, questionResponse.SimulationResults.QuestionResponse_id.EmploymentStatus);
    var creditScore = scopeObj.addCreditScore(questionResponse.creditScore, questionResponse.SimulationResults.QuestionResponse_id.CreditScore);
    var simulationAnswers = [];
    simulationAnswers.push(loanAmount);
    simulationAnswers.push(empStatus);
    simulationAnswers.push(creditScore);
    var queryResponse = {};
    queryResponse.QueryDefinition_id = "PERSONAL_SIMULATION";
    queryResponse.Status_id = "SUBMITTED";
    queryResponse.id = questionResponse.SimulationResults.QueryResponse_id;
    queryResponse.User_id = kony.store.getItem("Customer_id");
    queryResponse.QuestionResponse = simulationAnswers;

    function saveSimulationResponseSuccess(response) {
      if(simulationFlag){
        scopeObj.presentUserInterface("frmGuestDashboard", {
          "action": "SaveSimulationResponse",
          "response": response
        });
      }
      else{
        scopeObj.presentUserInterface("frmLoansDashboard", {
          "action": "SaveSimulationResponse",
          "response": response
        });
      }
    }

    function saveSimulationResponseError(response) {
      if(simulationFlag){
        scopeObj.presentUserInterface("frmGuestDashboard", {
          "action": "SaveSimulationResponseError",
          "response": response
        });
      }
      else{
        scopeObj.presentUserInterface("frmLoansDashboard", {
          "action": "SaveSimulationResponseError",
          "response": response
        });
      }
      
    }
    scopeObj.businessController.saveSimulationResponse(queryResponse, saveSimulationResponseSuccess, saveSimulationResponseError, queryResponse.id);
  };
  
  
  
  PresentationController.prototype.addLoanAmount = function(loanAmount, loanAmoutID) {
    var answerLoanAmount = {};
    answerLoanAmount.QuestionDefinition_id = "QUESTION_SIMULATION_LOAN_AMOUNT";
    answerLoanAmount.QuerySection_id = "LOAN_AMOUNT_APPLICANT";
    answerLoanAmount.QueryDefinition_id = "PERSONAL_SIMULATION";
    answerLoanAmount.ResponseValue = loanAmount;
    answerLoanAmount.id = loanAmoutID;
    answerLoanAmount.Unit = "$";
    return answerLoanAmount;
  };
  PresentationController.prototype.addEmploymentStatus = function(employmentType, employmentTypeID) {
    var answerLoanAmount = {};
    answerLoanAmount.QuestionDefinition_id = "QUESTION_SIMULATION_EMPLOYMENT_TYPE";
    answerLoanAmount.QuerySection_id = "EMPLOYMENT_TYPE_APPLICANT";
    answerLoanAmount.QueryDefinition_id = "PERSONAL_SIMULATION";
    answerLoanAmount.ResponseValue = employmentType[1];
    answerLoanAmount.id = employmentTypeID;
    answerLoanAmount.Unit = "";
    return answerLoanAmount;
  };
  PresentationController.prototype.addCreditScore = function(creditScore, creditScoreID) {
    var answerLoanAmount = {};
    answerLoanAmount.QuestionDefinition_id = "QUESTION_SIMULATION_CREDIT_SCORE";
    answerLoanAmount.QuerySection_id = "CREDIT_SCORE_APPLICANT";
    answerLoanAmount.QueryDefinition_id = "PERSONAL_SIMULATION";
    answerLoanAmount.ResponseValue = creditScore;
    answerLoanAmount.id = creditScoreID;
    answerLoanAmount.Unit = "";
    return answerLoanAmount;
  };

  PresentationController.prototype.retrieveAllLoansDetails = function(){
    var scopeObj = this;
     var applicationListResponse={
      PendingList:null,
      SubmittedList:null
    };
    function getSubmittedApplicationsListSuccess(response){
      applicationListResponse.SubmittedList=response;
      scopeObj.presentUserInterface("frmLoansDashboard", {
        "action": "getAllApplicationData",
        "response": applicationListResponse,
        "LoadingScreen": {
          focus: false
        }
      });
    }
    function getSubmittedApplicationsListError(response){
      scopeObj.presentUserInterface("frmLoansDashboard", {
        "action": "getAllApplicationData",
        "response": applicationListResponse,
        "LoadingScreen": {
          focus: false
        }
      });
    }
    function getPendingApplicationsListSuccess(response){
      applicationListResponse.PendingList=response;
      var idtobesent={"User_id":customerId,"Status_id":"SUBMITTED"};
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("DetailsModule").businessController.getPendingApplicationsList(idtobesent, getSubmittedApplicationsListSuccess, getSubmittedApplicationsListError);
    }
    function getPendingApplicationsListError(response)
    {
      var idtobesent={"User_id":customerId,"Status_id":"SUBMITTED"};
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("DetailsModule").businessController.getPendingApplicationsList(idtobesent, getSubmittedApplicationsListSuccess, getSubmittedApplicationsListError); 
    }
    var customerId=kony.store.getItem("Customer_id");
    var idtobesent={"User_id":customerId,"Status_id":"PENDING"};
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("DetailsModule").businessController.getPendingApplicationsList(idtobesent, getPendingApplicationsListSuccess, getPendingApplicationsListError);

  };


  PresentationController.prototype.retrieveLoansList = function(Status_id) {
    var scopeObj = this;
    var customerId=kony.store.getItem("Customer_id");
    scopeObj.presentUserInterface('frmLoansDashboard', {
      "LoadingScreen": {
        focus: true
      }
    });
    function getPendingApplicationsListSuccess(response) {
      scopeObj.presentUserInterface('frmLoansDashboard', {
        "LoadingScreen": {
          focus: false
        }
      });
      scopeObj.presentUserInterface("frmLoansDashboard", {
        "action": "getPendingApplicationsList"+Status_id,
        "response": response
      });
    }

    function getPendingApplicationsListError(response) {
      kony.print("failed retrieving pending applications list");
      scopeObj.presentUserInterface('frmLoansDashboard', {
        "LoadingScreen": {
          focus: false
        }
      });
      scopeObj.presentUserInterface("frmLoansDashboard", {
        "action":"getPendingApplicationsList"+Status_id,
        "response": response
      });
    }
    var idtobesent={"User_id":customerId,"Status_id":Status_id};
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("DetailsModule").businessController.getPendingApplicationsList(idtobesent, getPendingApplicationsListSuccess, getPendingApplicationsListError);
  };
  
  PresentationController.prototype.getSimulationAnswers = function() {
    var scopeObj = this;

    function getQuestionResponseSuccess(response) {
      scopeObj.presentUserInterface('frmLoansDashboard', {
        "LoadingScreen": {
          focus: false
        }});
      scopeObj.simulationResult.simulationAnswers=response;
      scopeObj.presentUserInterface("frmLoansDashboard",{"simulationResult":scopeObj.simulationResult});
    }

    function getQuestionResponseError(response) {
      scopeObj.presentUserInterface('frmLoansDashboard', {
        "LoadingScreen": {
          focus: false
        }});
      scopeObj.simulationResult.simulationAnswers=null;
      scopeObj.presentUserInterface("frmLoansDashboard",scopeObj.simulationResult);
    }
    scopeObj.businessController.getQuestionResponse({"id": kony.store.getItem("Customer_id")}, getQuestionResponseSuccess, getQuestionResponseError);
  };
  
  PresentationController.prototype.getLeadSimulationAnswers = function() {
    var scopeObj = this;

    function getQuestionResponseSuccess(response) {
      scopeObj.presentUserInterface('frmGuestDashboard', {
        "LoadingScreen": {
          focus: false
        }});
      scopeObj.simulationResult.simulationAnswers=response;
      scopeObj.presentUserInterface("frmGuestDashboard",{"simulationResult":scopeObj.simulationResult});
    }

    function getQuestionResponseError(response) {
      scopeObj.presentUserInterface('frmGuestDashboard', {
        "LoadingScreen": {
          focus: false
        }});
      scopeObj.simulationResult.simulationAnswers=null;
      scopeObj.presentUserInterface("frmGuestDashboard",scopeObj.simulationResult);
    }
    scopeObj.businessController.getQuestionResponse({"id": kony.store.getItem("Customer_id")}, getQuestionResponseSuccess, getQuestionResponseError);
  };  
  PresentationController.prototype.resumeApplicationData = function(queryResponseId,queryDefID,createdDate,modifiedDate) {
    var scopeObj = this;
    if(queryDefID=="PERSONAL_APPLICATION"){
     // NEED TO ADD
    }
   else if(queryDefID == "CREDIT_CARD_APPLICATION"){
      scopeObj.resumeCCApplication(queryResponseId,queryDefID);
    }
  };
  PresentationController.prototype.updateUser=function(response){
  var scopeObj = this;
  function Sucess(response){
  scopeObj.presentUserInterface("frmGuestDashboard",{
        "action":"UpdateUser",
        "response":response
      });
    }
  function Error(response){
   kony.print("In Error"); 
  }
  scopeObj.businessController.updateCustomerDetails(response, Sucess, Error);
  };
  PresentationController.prototype.submitMembershipEligabilty=function(value){
    var scopeObj = this;
    var customer_id=kony.store.getItem("Customer_id");
    function Sucess(response){
      kony.print("In sucess"+response);
    }
    function Error(response){
      kony.print("In Error"+response);
    }
    var response=
        {
          "id":customer_id,
          "Is_MemberEligibile":value
        };
    scopeObj.businessController.updateCustomerDetails(response, Sucess, Error);
  };

  PresentationController.prototype.createLead=function(response){
    var scopeObj=this;
    scopeObj.presentUserInterface("frmGuestDashboard", {
      "LoadingScreen": {
        focus: true
      }
    });
    function createLeadSucess(response){
      scopeObj.presentUserInterface("frmGuestDashboard", {
        "LoadingScreen": {
          focus: false
        }
      });
      scopeObj.presentUserInterface("frmGuestDashboard",{
        "action":"createLead",
        "response":response
      });
    }
    function createLeadError(response){
      scopeObj.presentUserInterface("frmGuestDashboard", {
        "LoadingScreen": {
          focus: false
        }
      }); 
    }
    this.businessController.createCustomerDetails(response, createLeadSucess, createLeadError);
  };
  PresentationController.prototype.sendEmail=function(response,RegistrationCount,FromGuestDashboard){
    var scopeObj=this;
    if(FromGuestDashboard=="true"){
      formName="frmGuestDashboard";
    }
    else{
      formName="frmLoansDashboard";
    }
    scopeObj.presentUserInterface(formName, {
      "LoadingScreen": {
        focus: true
      }
    });
    function sendEmailSucess(response){
     var CustomerUpdateResponse={
       "id":kony.store.getItem("Customer_id"),
       "RegLinkResendCount":RegistrationCount
     };
      function Sucess(response){
        kony.print("sucess");
      }
      function Error(response){
        
      }
     scopeObj.businessController.updateCustomerDetails(CustomerUpdateResponse, Sucess, Error);
     scopeObj.presentUserInterface(formName, {
        "LoadingScreen": {
          focus: false
        }
      }); 
      scopeObj.presentUserInterface(formName, {
        "action":"sendEmail",
         "response":"Sucess"
       });
    }
    function sendEmailError(response){
      scopeObj.presentUserInterface(formName, {
        "LoadingScreen": {
          focus: false
        }
      });
    }
    this.businessController.sendEmail(response, sendEmailSucess, sendEmailError);
  };
  PresentationController.prototype.addInfoCoA=function(payload,Status_id){
    var scopeObj=this;
      var queryResponse = {};
      queryResponse.QueryDefinition_id = "PERSONAL_APPLICATION";
      queryResponse.Status_id = Status_id;
      queryResponse.LoanProduct_id = "JUMBO_PERSONAL_LOAN";
      queryResponse.User_id = kony.store.getItem("Customer_id");
      if(scopeObj.QueryResponseID !== null && scopeObj.QueryResponseID !==undefined && scopeObj.QueryResponseID !== ""){
        queryResponse.id = scopeObj.QueryResponseID;
      }
      queryResponse.QuestionResponse =[];
      queryResponse.QueryCoBorrower = [];
      queryResponse.QueryCoBorrower.push(payload);
      function saveApplicationDataSuccess(response){
        
      }
      function saveApplicationDataError(err){
        
      }
      scopeObj.businessController.createQueryResponse(queryResponse, saveApplicationDataSuccess, saveApplicationDataError); 
  };
  PresentationController.prototype.sendEmailCoA=function(response,RegistrationCount){
    var scopeObj=this;
    function sendEmailSucessCoA(response){
      
    }
    function sendEmailErrorCoA(response){
     
    }
    this.businessController.sendEmail(response, sendEmailSucessCoA, sendEmailErrorCoA);
  };
  PresentationController.prototype.startApplication = function(QueryDefinition_id) {
    var scopeObj = this;
    function errorCallback(err) {
      scopeObj.presentUserInterface("frmLoansDashboard", { 
        "action":"ErrorOccured"
      });
    }
    var getQueryDefinitionSuccess = function(QueryDefinition_id, response){
      var queryDefinition = response.records;
      if(QueryDefinition_id=="PERSONAL_APPLICATION"){
      this.initializeNewApplication(QueryDefinition_id, queryDefinition, this.disableCoApplicantSectionsAndNavigateToNextSection.bind(this,QueryDefinition_id),errorCallback);
      }
      if(QueryDefinition_id=="CREDIT_CARD_APPLICATION"){
      this.initializeNewApplication(QueryDefinition_id, queryDefinition, this.disableAuthUserSectionsAndNavigateToNextSection.bind(this,QueryDefinition_id),errorCallback);
      }
       if(QueryDefinition_id=="VEHICLE_APPLICATION"){
      this.initializeNewApplication(QueryDefinition_id, queryDefinition, this.disableAuthUserSectionsAndNavigateToNextSection.bind(this,QueryDefinition_id),errorCallback);
      }
      };
    this.businessController.queryDefinitionGet(QueryDefinition_id, getQueryDefinitionSuccess.bind(this, QueryDefinition_id),errorCallback);
  };  
   PresentationController.prototype.startPersonalLoanApplication = function(selectedCardDetails) {
    this.startApplication("PERSONAL_APPLICATION");
  };  
  PresentationController.prototype.startCCApplication = function(product_Id, selectedCardDetails) {
    this.startApplication("CREDIT_CARD_APPLICATION");
  };
  PresentationController.prototype.startVehicleApplication = function(){
    this.startApplication("VEHICLE_APPLICATION");
  };
  PresentationController.prototype.disableAuthUserSectionsAndNavigateToNextSection = function(QueryDefinition_id) {
    this.disableSections(["AUPersonalInfo"]);
    this.navigateToNextSection(QueryDefinition_id);
  };
  PresentationController.prototype.disableCoApplicantSectionsAndNavigateToNextSection = function(QueryDefinition_id) {
    this.disableSections(["CoAppPersonalInfo"]);
     this.disableSections(["CoAppIncome"]);
    this.navigateToNextSection(QueryDefinition_id);
  };
  
  PresentationController.prototype.toggleAuthUserSectionsAndNavigateToNextSection = function(QueryDefinition_id) {
    var previousResponses = this.getPreviousResponses();
    for(var i=0; i<previousResponses.length; i++){
      if(previousResponses[i].abstractName === "AUChallenge"){
        if(previousResponses[i].Value === "Yes"){
          this.enableSections(["AUPersonalInfo"]);
          this.navigateToNextSection(QueryDefinition_id);
          return;
        }else{
          this.disableAuthUserSectionsAndNavigateToNextSection(QueryDefinition_id);
          return;
        }
      }
    }
    this.navigateToNextSection(QueryDefinition_id);
  };
  
  PresentationController.prototype.navigateToNextSection = function(QueryDefinition_id) {
    var scopeObj = this;
    var sectionData = this.getNextSectionData();
    if(sectionData){
      var screenToNavigate = this.getScreenForSection(sectionData.QuerySection_FriendlyName);
      //navigateToSection
      this.presentUserInterface("frmLoansDashboard",  { 
          "navigateToSection":screenToNavigate,
          "queryDefID":QueryDefinition_id
        });
    }else{
      //submit application here since no next section found
      this.presentUserInterface("frmLoansDashboard",  { 
          "navigateToReviewScreen":true,
          "queryDefID":QueryDefinition_id
        });
    }
  };
  PresentationController.prototype.navigateToClickedSection = function(QueryDefinition_id,sectionFriendlyName) {
    var scopeObj = this;
    var sectionData = this.getSectionData(sectionFriendlyName);
    if(sectionData){
      var screenToNavigate = this.getScreenForSection(sectionData.QuerySection_FriendlyName);
      //navigateToSection
      this.presentUserInterface("frmLoansDashboard",  { 
          "navigateToSection":screenToNavigate,
          "queryDefID":QueryDefinition_id
        });
    }else{
      //submit application here since no next section found
      this.presentUserInterface("frmLoansDashboard",  { 
          "navigateToReviewScreen":true,
          "queryDefID":QueryDefinition_id
        });
    }
  };
  PresentationController.prototype.resumeCCApplication = function(QueryResponse_Id,QueryDefinition_id) {
    var scopeObj = this;
    function errorCallback(err) {
      scopeObj.presentUserInterface("frmLoansDashboard", { 
        "action":"ErrorOccured"
      });
    }
    var getQueryDefinitionSuccess = function(QueryDefinition_id, QueryResponse_Id, response){
      var queryDefinition = response.records;
      this.resumeApplication(QueryDefinition_id, queryDefinition, QueryResponse_Id, scopeObj.toggleAuthUserSectionsAndNavigateToNextSection.bind(this,QueryDefinition_id),errorCallback);
    };
    this.businessController.queryDefinitionGet(QueryDefinition_id, getQueryDefinitionSuccess.bind(scopeObj, QueryDefinition_id, QueryResponse_Id),errorCallback);
  };
  return PresentationController;
});

