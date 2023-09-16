define({
  phoneId:null,
  EmailId:null,
  canWeApply : false,
  fromAddInfo:false,
  isMemberEligable:null,
  RegLinkResendCount:0,
  simulationFlag: false,

  creditScoreLimitNames: {
    "limitName1": "just okay",
    "limitName2": "fair",
    "limitName3": "good",
    "limitName4": "excellent"
  },

  fieldToValidateInAddInfoPopup : {
    "txtName":{"error":"false"},
    "txtLastName":{"error":"false"},
    "txtPrimaryPhoneNumber":{"error":"false"},
    "txtEmailAddress":{"error":"false"}
  },

  existingSimulationResults: {
    "QueryResponse_id": null,
    "QuestionResponse_id": {
      "LoanAmount": null,
      "CreditScore": null,
      "EmploymentStatus": null
    }
  },

  creditScoreValues: {
    "value": null
  },

  createLoanOnClickOfApply:function(){		
    this.applyAction();		
  },

  submitMemberEligability:function(){
    var selectedKey=this.view.rbgResponse.selectedKey;
    var scopeObj=this;
    var infoObj = {
      "FirstName" : scopeObj.view.txtName.text,
      "LastName" : scopeObj.view.txtLastName.text,
      "MiddleName" : scopeObj.view.txtMiddleName.text,
      "PhoneNumber" : scopeObj.view.txtPrimaryPhoneNumber.text,
      "Email" : scopeObj.view.txtEmailAddress.text
    };
    if(selectedKey=="YES"){
      var customerType  = kony.store.getItem("CustomerType_id");
      var customerID = kony.store.getItem("Customer_id");
      if(customerType == "Lead" && this.fromAddInfo!=true){
        this.presenter.updateLeadToApplicant(customerID,infoObj); 
        kony.mvc.MDAApplication.getSharedInstance().appContext.searchCustomerName=this.view.txtName.text+" "+this.view.txtMiddleName.text+" "+this.view.txtLastName.text;
      }
      this.isMemberEligable=true;
      this.view.lblMembershipValue.text="Eligible";
      this.view.lblMembershipValue.onTouchEnd=function(){
        scopeObj.fromAddInfo=true;
        scopeObj.view.flxEligibilityCheck.isVisible=true;
        scopeObj.view.flxDisabledBackground.isVisible=true;
        scopeObj.view.rbgResponse.selectedKey="YES";
        scopeObj.view.FlxResponseMsg.isVisible=true;
        scopeObj.view.flxErrorMsgMEC.isVisible=false;
        scopeObj.view.forceLayout();
      };
      this.view.flxEligibilityCheck.isVisible=false;
      this.view.flxDisabledBackground.isVisible=false;
    }
    else{
      this.view.lblMembershipValue.text="Check Eligibility";
      this.view.lblMembershipValue.onTouchEnd=function(){
        scopeObj.fromAddInfo=true;
        scopeObj.view.flxEligibilityCheck.isVisible=true;
        scopeObj.view.flxDisabledBackground.isVisible=true;
        if(selectedKey=="NO"){
          this.isMemberEligable=false;
          scopeObj.view.rbgResponse.selectedKey="NO";
          scopeObj.view.flxErrorMsgMEC.isVisible=true;
        }
        else{
          this.isMemberEligable=null;
          scopeObj.view.rbgResponse.selectedKey=null;
          scopeObj.view.flxErrorMsgMEC.isVisible=false;
        }
        scopeObj.view.FlxResponseMsg.isVisible=false;

        scopeObj.view.forceLayout();
      };
      this.view.flxEligibilityCheck.isVisible=false;
      this.view.flxDisabledBackground.isVisible=false;
    }
  },
  getMembershipStatus:function()
  {
    var selectedKey=this.view.rbgResponse.selectedKey;
    if(selectedKey=="YES"){
      this.presenter.submitMembershipEligabilty(1);
      this.isMemberEligable=true;
      this.view.FlxResponseMsg.isVisible=true;
      this.view.flxErrorMsgMEC.isVisible=false;
    }
    else{
      this.presenter.submitMembershipEligabilty(0);
      this.isMemberEligable=false;
      this.view.FlxResponseMsg.isVisible=false;
      this.view.flxErrorMsgMEC.isVisible=true;
    }
  },
  willUpdateUI:function(context){
    var scopeObj=this;
    if(context!=undefined){
      this.updateLeftMenu(context);
    }
    if(context){
      if (context.LoadingScreen) {
        if (context.LoadingScreen.focus)
          kony.adminConsole.utils.showProgressBar(this.view);
        else
          kony.adminConsole.utils.hideProgressBar(this.view);
      } 
      if(context.fromGuestDashboard){
        if(context.fromGuestDashboard.value==true)
        {
          this.setDefaultValuesForGuestDashboard();
        }
      }
      else if(context.LoanDashBoardData){
        if(context.LoanDashBoardData.LoansMasterData!==null &&context.LoanDashBoardData.LoansMasterData.length>0){
          this.setDataToLoanTypes(context.LoanDashBoardData.LoansMasterData);
        }
      }

      if(context.simulationResult){
        if(context.simulationResult.simulationQuestions!== null && context.simulationResult.simulationQuestions.length > 0){
          this.populateGuestSimulationQuestions(context.simulationResult.simulationQuestions);
          this.populateGuestEmploymentStatus(context.simulationResult.simulationQuestions);
        }
        if(context.simulationResult.simulationAnswers!== null && context.simulationResult.simulationAnswers.length > 0){
          this.populateLeadSimulationAnswers(context.simulationResult.simulationAnswers);
        }
        else{
          this.view.lstBoxLoanTypeGuestSimulation.selectedKey=this.view.ListBoxLoanTypes.selectedKey;
          this.view.txtLoanAmountGuestSimulation.text = null;
          this.view.lstBoxEmploymentStatusGuestSimulation.selectedKey = "Select";
          this.placeCreditScorePointer("fair");

          this.existingSimulationResults.QueryResponse_id = null;
          this.existingSimulationResults.QuestionResponse_id.CreditScore = null;
          this.existingSimulationResults.QuestionResponse_id.EmploymentStatus = null;
          this.existingSimulationResults.QuestionResponse_id.LoanAmount = null;

          this.view.simulationTemplate.lstLoanTypes.selectedKey = this.view.ListBoxLoanTypes.selectedKey;
          this.view.simulationTemplate.txtLoanAmount.text = null;
          this.view.simulationTemplate.lstEmploymentStatusSimulate.selectedKey = "Select";

        }
      }

      if(context.action == "SimulationQuestions"){
        if(context.response !== null && context.response.length > 0){
          this.populateGuestSimulationQuestions(context.response);
          this.populateGuestEmploymentStatus(context.response);
        }
        this.view.lstBoxLoanTypeGuestSimulation.selectedKey = this.view.ListBoxLoanTypes.selectedKey;
        this.view.txtLoanAmountGuestSimulation.text = null;
        this.view.lstBoxEmploymentStatusGuestSimulation.selectedKey = "Select";
        this.placeCreditScorePointer("fair");

        this.view.simulationTemplate.lstLoanTypes.selectedKey = this.view.ListBoxLoanTypes.selectedKey;
        this.view.simulationTemplate.txtLoanAmount.text = null;
        this.view.simulationTemplate.lstEmploymentStatusSimulate.selectedKey = "Select";
      }
      if(context.action == "SimulationQuestionsError"){
        this.view.lstBoxLoanTypeGuestSimulation.selectedKey=this.view.ListBoxLoanTypes.selectedKey;
        this.view.txtLoanAmountGuestSimulation.text = null;
        this.view.lstBoxEmploymentStatusGuestSimulation.selectedKey = "Select";
        this.placeCreditScorePointer("fair");

        this.view.simulationTemplate.lstLoanTypes.selectedKey = this.view.ListBoxLoanTypes.selectedKey;
        this.view.simulationTemplate.txtLoanAmount.text = null;
        this.view.simulationTemplate.lstEmploymentStatusSimulate.selectedKey = "Select";

      }
      if(context.CustomerBasicInfo){
        this.populateLeadInformation(context.CustomerBasicInfo);
      }
      if(context.action == "SaveSimulationResponseError"){
        this.view.simulationTemplate.segSimulationResults.setVisibility(false);
      }
      if(context.action=="createLead"){
        var id=context.response.Customer[0].id;
        kony.store.setItem("CustomerType_id", "Lead");
        kony.store.setItem("Customer_id", id);
        this.simulationFlag = true;
        this.view.toastMessage.showToastMessage("Customer details added successfully",this);    
        this.view.flxAddInfo.isVisible=true;
        this.view.lblAddInfoStatic.text="Edit Info";
        this.view.lblNameValue.text=this.view.txtName.text + " " + this.view.txtMiddleName.text+ " "+this.view.txtLastName.text; 
        this.view.lblEmailValue.text=this.view.txtEmailAddress.text;
        this.view.lblPhoneValue.text=this.view.txtPrimaryPhoneNumber.text;
        this.closeAddInfoPopUp();
        this.view.flxNoInformation.isVisible=false;
        this.view.flxContactInformation.isVisible=true;
        this.canWeApply=true;
        this.view.flxRegistrationWrapperKA.isVisible=true;
        this.view.lblSendLinkKA.text="SEND LINK VIA";
        this.view.HeaderGuest.lblUserType.text="Lead";
        if(this.fromAddInfo!=true){
          this.view.flxEligibilityCheck.isVisible=true;
          this.view.rbgResponse.selectedKey=null;
          this.view.FlxResponseMsg.isVisible=false;
          this.view.flxErrorMsgMEC.isVisible=false;
          this.view.flxDisabledBackground.isVisible=true;
        }
        this.view.forceLayout();
      }
      if(context.action=="UpdateUser"){
        this.view.flxAddInfo.isVisible=true;
        this.view.lblAddInfoStatic.text="Edit Info";
        this.view.lblNameValue.text=this.view.txtName.text + " " + this.view.txtMiddleName.text+ " "+this.view.txtLastName.text; 
        this.view.lblEmailValue.text=this.view.txtEmailAddress.text;
        this.view.lblPhoneValue.text=this.view.txtPrimaryPhoneNumber.text;
        this.closeAddInfoPopUp();
        this.view.flxNoInformation.isVisible=false;
        this.view.flxContactInformation.isVisible=true;
        this.view.flxRegistrationWrapperKA.isVisible=true;
        this.view.forceLayout();
      }
      if(context.action=="sendEmail"){
        if(context.response=="Sucess"){
          scopeObj.RegLinkResendCount=parseInt(scopeObj.RegLinkResendCount)+1;
          this.view.flxRegistrationLinkOptionsKA.isVisible=false;
          this.view.lblSendLinkKA.text="RESEND LINK VIA";
          this.view.lblRegistrationLinkKA.text = "Resend Registration Email";
          this.view.toastMessage.showToastMessage("Mail Sent Sucessfully", this);
        }
      }
      if(context.action == "SaveSimulationResponse") {
        this.populateSimulationResultIDs(context.response);
      }
      this.displayLoggedInStaffUser();
    }
  },
  // the below function updates the logged in staff user name on the top right portion of the screen ie beside the logout button
  displayLoggedInStaffUser : function(){
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
  },

  populateSimulationResultIDs:function(response){
    this.existingSimulationResults.QueryResponse_id = response.id;
    var questionResponse = [];
    questionResponse = response.QuestionResponse;
    for(var i=0;i<questionResponse.length;i++){
      if(questionResponse[i].QuestionDefinition_id == "QUESTION_SIMULATION_LOAN_AMOUNT"){
        this.existingSimulationResults.QuestionResponse_id.LoanAmount = questionResponse[i].id;
      }
      else if(questionResponse[i].QuestionDefinition_id == "QUESTION_SIMULATION_CREDIT_SCORE"){
        this.existingSimulationResults.QuestionResponse_id.EmploymentStatus = questionResponse[i].id;
      }
      else if(questionResponse[i].QuestionDefinition_id == "QUESTION_SIMULATION_EMPLOYMENT_TYPE"){
        this.existingSimulationResults.QuestionResponse_id.CreditScore = questionResponse[i].id;
      }
    }
  },

  populateLeadSimulationAnswers: function(response){
    var masterDataResponse=[];
    this.existingSimulationResults.QueryResponse_id = response[0].QueryResponse_id;
    this.view.simulationTemplate.lstLoanTypes.selectedKey=this.view.ListBoxLoanTypes.selectedKey;
    for(var i=0;i<response.length;i++){
      if(response[i].ResponseValue !== null) {
        if(response[i].QuestionDefinition_id == "QUESTION_SIMULATION_LOAN_AMOUNT"){
          this.view.simulationTemplate.txtLoanAmount.text = response[i].ResponseValue;
          this.view.txtLoanAmountGuestSimulation.text = response[i].ResponseValue;
          this.existingSimulationResults.QuestionResponse_id.LoanAmount = response[i].id;
          this.view.simulationTemplate.sliderSimulate.selectedValue = response[i].ResponseValue;
        }
        else if(response[i].QuestionDefinition_id == "QUESTION_SIMULATION_EMPLOYMENT_TYPE"){
          masterDataResponse=this.view.simulationTemplate.lstEmploymentStatusSimulate.masterData;      
          this.existingSimulationResults.QuestionResponse_id.EmploymentStatus = response[i].id;
          for(var k=0;k<masterDataResponse.length;k++){
            if(masterDataResponse[k][1]==response[i].ResponseValue){
              this.view.simulationTemplate.lstEmploymentStatusSimulate.selectedKey=masterDataResponse[k][0];
              this.view.forceLayout();
            }
          }
        }
        else if(response[i].QuestionDefinition_id == "QUESTION_SIMULATION_CREDIT_SCORE"){
          var creditScore = response[i].ResponseValue.toLowerCase();
          this.existingSimulationResults.QuestionResponse_id.CreditScore = response[i].id;
          this.selectCreditScore(creditScore);
        }
      }
      else {
        if(response[i].QuestionDefinition_id == "QUESTION_SIMULATION_EMPLOYMENT_TYPE") {
          this.view.lstBoxEmploymentStatusGuestSimulation.selectedKey = "Select";
        }
      }
    }
    this.view.forceLayout();
  },
  
  selectCreditScore: function(creditScore){
    var scopObj = this;
    if(creditScore.indexOf(scopObj.creditScoreLimitNames.limitName1) >=0 ){
      scopObj.resetTabs();
      scopObj.view.simulationTemplate.flxPoor.skin="sknlblSelTabRightBorder637290";
      scopObj.view.simulationTemplate.lblTagPoor.skin="sknTaglbl11abebBorderRadius12px";
      scopObj.creditScoreValues.value = "Just okay (639 or less)";
    }
    else if(creditScore.indexOf(scopObj.creditScoreLimitNames.limitName2) >=0 ){
      scopObj.resetTabs();
      scopObj.view.simulationTemplate.flxFair.skin="sknflxSelectedTab637290";
      scopObj.view.simulationTemplate.lblTagFair.skin="sknTaglbl11abebBorderRadius12px";
      scopObj.creditScoreValues.value = "Fair (640 - 679)";
    }
    else if(creditScore.indexOf(scopObj.creditScoreLimitNames.limitName3) >=0 ){
       scopObj.resetTabs();
      scopObj.view.simulationTemplate.flxTabGood.skin="sknflxSelectedTab637290";
      scopObj.view.simulationTemplate.lblTagGood.skin="sknTaglbl11abebBorderRadius12px";
      scopObj.creditScoreValues.value = "Good (680 - 719)";
    }
    else if(creditScore.indexOf(scopObj.creditScoreLimitNames.limitName4)>=0 ){
      scopObj.resetTabs();
      scopObj.view.simulationTemplate.flxTabExcellent.skin="flxSelTabLeftBrd6372901PX";
      scopObj.view.simulationTemplate.lblTagExcellent.skin="sknTaglbl11abebBorderRadius12px";
      scopObj.creditScoreValues.value = "Excellent (720 or Above)";
    }
  },

  populateLeadInformation: function(leadInfo){
    this.RegLinkResendCount=0;
    var scopeObj=this;
    scopeObj.simulationFlag = true;
    this.phoneId=null;
    this.EmailId=null;
    kony.store.setItem("Customer_id", leadInfo.Customer_id);
    kony.store.setItem("CustomerType_id", leadInfo.CustomerType_id);
    this.view.lblNameValue.text = leadInfo.Name;
    this.view.lblPhoneValue.text = leadInfo.Phone;
    this.view.lblEmailValue.text = leadInfo.Email;
    this.view.txtName.text=leadInfo.FirstName;
    this.view.txtMiddleName.text=leadInfo.MiddleName;
    this.view.txtLastName.text=leadInfo.LastName;
    this.view.txtPrimaryPhoneNumber.text=leadInfo.Phone;
    this.view.txtEmailAddress.text=leadInfo.Email;
    this.phoneId=leadInfo.PhoneId;
    this.EmailId=leadInfo.EmailId;
    this.canWeApply=true;
    this.view.flxRegistrationWrapperKA.isVisible=true;
    if(leadInfo.RegLinkResendCount==0){
      this.view.lblSendLinkKA.text="SEND LINK VIA";
      this.view.lblRegistrationLinkKA.text = "Send Registration Email";
    }
    else{
      this.RegLinkResendCount=leadInfo.RegLinkResendCount
      this.view.lblSendLinkKA.text="RESEND LINK VIA";
      this.view.lblRegistrationLinkKA.text = "Resend Registration Email";
    }
    if(leadInfo.Is_MemberEligibile=="true"){
      this.isMemberEligable=true;
      this.view.lblMembershipValue.text="Eligible";
      this.view.lblMembershipValue.onTouchEnd=function(){
        scopeObj.fromAddInfo=true;
        scopeObj.view.flxEligibilityCheck.isVisible=true;
        scopeObj.view.flxDisabledBackground.isVisible=true;
        scopeObj.view.rbgResponse.selectedKey="YES";
        scopeObj.view.FlxResponseMsg.isVisible=false;
        scopeObj.view.flxErrorMsgMEC.isVisible=false;
        scopeObj.view.forceLayout();
      };
    }
    else{
      this.view.lblMembershipValue.text="Check Eligibility";
      if(leadInfo.Is_MemberEligibile=="false"){		
        this.isMemberEligable=false;		
      }		
      else{		
        this.isMemberEligable=null;		
      }
      this.view.lblMembershipValue.onTouchEnd=function(){
        scopeObj.fromAddInfo=true;
        scopeObj.view.flxEligibilityCheck.isVisible=true;
        scopeObj.view.flxDisabledBackground.isVisible=true;
        if(leadInfo.Is_MemberEligibile=="false"){
          this.isMemberEligable=false;
          scopeObj.view.rbgResponse.selectedKey="NO";
          scopeObj.view.flxErrorMsgMEC.isVisible=true;
        }
        else{
          this.isMemberEligable=null;
          scopeObj.view.rbgResponse.selectedKey=null;
          scopeObj.view.flxErrorMsgMEC.isVisible=false;
        }
        scopeObj.view.FlxResponseMsg.isVisible=false;

        scopeObj.view.forceLayout();
      };
    }
    this.view.flxAddInfo.setVisibility(true);
    this.view.flxNoInformation.setVisibility(false);
    this.view.flxContactInformation.setVisibility(true);
    this.view.flxEligibilityCheck.setVisibility(false);
    this.view.flxDisabledBackground.isVisible=false;
    this.view.flxDisabledBackground.setVisibility(false);
    this.view.flxAddInformationPopup.setVisibility(false);
    this.view.HeaderGuest.lblUserName.text = leadInfo.Name;
    this.view.breadcrumbs.lblCurrentScreen.text = leadInfo.Name.toUpperCase();
    this.view.HeaderGuest.flxUserType.lblUserType.text = kony.store.getItem("CustomerType_id");
    this.view.flxAlertMessage.setVisibility(false);
    this.view.forceLayout();
  },

  logoutAction: function(){
    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
    authModule.presentationController.doLogout();
  },

  placeCreditScorePointer: function(creditScore){
    var scopeObj = this;
    var outerFlexWidth = (this.view.flxCreditRatingMeterGuestSimulation.width).slice(0, -2);
    var eachFlexWidth = outerFlexWidth/Object.keys(this.creditScoreLimitNames).length;
    var pos;
    if(creditScore.indexOf(this.creditScoreLimitNames.limitName1) >=0 ){
      pos = 0;
    }
    else if(creditScore.indexOf(this.creditScoreLimitNames.limitName2) >=0 ){
      pos = 1;
    }
    else if(creditScore.indexOf(this.creditScoreLimitNames.limitName3) >=0 ){
      pos = 2;
    }
    else if(creditScore.indexOf(this.creditScoreLimitNames.limitName4)>=0 ){
      pos = 3;
    }
    scopeObj.view.flxCreditScorePointerGuestSimulation.centerX = eachFlexWidth*pos + (eachFlexWidth/2) +35 + "dp";
    this.view.forceLayout();
  },

  closeGeneralInfoAndAddInfo: function(){
    this.view.flxGeneralInfo.isVisible=false;
    this.view.flxSelectLoanType.isVisible=false;
  },
  displayGeneralInfoAndAddInfo : function(){
    this.view.flxGeneralInfo.isVisible=true;
    this.view.flxSelectLoanType.isVisible=true;
  },
  openAddInfoPopUp : function(){
    this.view.flxDisabledBackground.isVisible=true;
    this.view.flxAddInformationPopup.isVisible=true;
    // this.view.flxMain.setEnabled=false;
  },
  closeAddInfoPopUp : function(){
    var scopeObj=this;
    this.view.flxAddInformationPopup.isVisible=false;
    this.view.flxRegistrationLinkOptions.isVisible=false;
    this.view.flxDisabledBackground.isVisible=false;
    this.view.flxMain.setEnabled=true;
    this.view.flxFirstNameError.isVisible=false;    
    this.view.flxLastNameError.isVisible=false;    
    this.view.flxPhoneNumberError.isVisible=false;    
    this.view.flxEmailError.isVisible=false;
  },
  displayContactInfoOnGuestDashboardAfterSaving: function(){
    this.view.flxAlertMessage.isVisible=false;
    this.view.flxFirstNameError.isVisible=false;    
    this.view.flxLastNameError.isVisible=false;    
    this.view.flxPhoneNumberError.isVisible=false;    
    this.view.flxEmailError.isVisible=false;
    var scopeObj=this;
    var addInfoCheck=true;    
    var firstName=this.view.txtName.text.trim();
    var lastName=this.view.txtLastName.text.trim();
    var phone=this.view.txtPrimaryPhoneNumber.text.trim();
    var email=this.view.txtEmailAddress.text.trim();
    var name=this.view.txtName.text + " " + this.view.txtMiddleName.text+ " "+this.view.txtLastName.text;  
    var middleName=this.view.txtMiddleName.text;
    // below two lines update the breadcrumb as well as the lead name
    this.view.HeaderGuest.lblUserName.text=name;
    this.view.breadcrumbs.lblCurrentScreen.text=name.toUpperCase();
    if(this.view.flxAddInfo.isVisible==true){
      var UpdateInput={
        "FirstName":firstName,
        "LastName":lastName,
        "MiddleName":middleName,
        "Phone":phone,
        "PhoneId":this.phoneId,
        "Email":email,
        "EmailId":this.EmailId,
        "id":kony.store.getItem("Customer_id")
      };
      this.presenter.updateUser(UpdateInput);
    }
    else{
      if(firstName == "" || firstName == undefined || firstName == null){
        this.view.flxFirstNameError.isVisible=true;   
        addInfoCheck=false;
      }
      if(lastName == "" || lastName == undefined || lastName == null){
        this.view.flxLastNameError.isVisible=true;  
        addInfoCheck=false;
      }

      if(phone == "" || phone == undefined || phone == null){      
        this.view.flxPhoneNumberError.isVisible=true;
         this.view.lblPhoneNumberError.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.PhoneNumberMissing");
        addInfoCheck=false;
      }
      else
      {
        var rex = /^[0-9]{10}$/;
        if(!rex.test(phone))
        {
           this.view.flxPhoneNumberError.isVisible = true;
          this.view.lblPhoneNumberError.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.PhoneNumberMissing1");
          addInfoCheck=false;
        }
      }
      if(email == "" || email == undefined || email == null){

        this.view.flxEmailError.isVisible=true;   
      this.view.lblEmailError.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.EmailMissing");
        addInfoCheck=false;

      }
      else
      {
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!reg.test(email))
        {
           this.view.flxEmailError.isVisible = true;
          this.view.lblEmailError.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.EmailMissing1");
          addInfoCheck=false;
        }
      }
      if(addInfoCheck == true){
        var createResponse={
          "FirstName":firstName,
          "LastName":lastName,
          "Phone":phone,
          "Email":email,
          "Username":email,
          "MiddleName":middleName,
          "CustomerType_id":"Lead"
        };
        this.presenter.createLead(createResponse);
      }
    }
  },
  applyAction: function(){
    var scopeObj=this;
    if(this.view.ListBoxLoanTypes.selectedKey.toLowerCase() == "select"){  
      this.view.ListBoxLoanTypes.skin = "sknLstBoxeb3017Bor3px";
      this.view.lblLoanTypeError.setVisibility(true);
    }
    else{
      this.fromAddInfo=false;
      if(this.canWeApply ==true && this.isMemberEligable==true){
        this.view.lblMembershipValue.text="Eligible";
        var customerType  = kony.store.getItem("CustomerType_id");
        var customerID = kony.store.getItem("Customer_id");
        if(customerType == "Lead"){
          kony.mvc.MDAApplication.getSharedInstance().appContext.searchCustomerName=this.view.txtName.text+" "+this.view.txtMiddleName.text+" "+this.view.txtLastName.text;
          this.presenter.updateLeadToApplicant(customerID); 
        }
        this.view.forceLayout();
      }
      else if(this.canWeApply ==true && this.isMemberEligable!=true){
        if(this.isMemberEligable==null){
          this.view.rbgResponse.selectedKey=null;
          this.view.flxErrorMsgMEC.isVisible=false;
        }
        else if(this.isMemberEligable==false){
          this.view.rbgResponse.selectedKey="NO";
          this.view.flxErrorMsgMEC.isVisible=true;
        }
        this.view.FlxResponseMsg.isVisible=false;
        this.view.flxEligibilityCheck.isVisible=true;
        this.view.flxDisabledBackground.isVisible=true;
      }
      else{
        this.openAddInfoPopUp();
      }
    }
  },
  registrationOnClick: function(){
    this.sendEmail();
    this.view.forceLayout();
  },
  populateGuestSimulationQuestions: function(response){
    this.view.lstBoxLoanTypeGuestSimulation.selectedKey=this.view.ListBoxLoanTypes.selectedKey;
    for(var i=0;i<response.length;i++){
      if(response[i].QuerySectionQuestion_Sequence == "1"){
        this.view.lblLoanAmountGuestSimulation.text = response[i].QuestionDefinition_OtherLabel;
        this.view.simulationTemplate.lblLoanAmount.text = response[i].QuestionDefinition_OtherLabel;
      }
      if(response[i].QuerySectionQuestion_Sequence == "2"){
        this.view.lblCreditScoreGuestSimulation.text = response[i].QuestionDefinition_OtherLabel;
        this.view.simulationTemplate.lblCreditScore.text = response[i].QuestionDefinition_OtherLabel;
      }
      if(response[i].QuerySectionQuestion_Sequence == "3"){
        this.view.lblEmploymentStatusGuestSimulation.text = response[i].QuestionDefinition_OtherLabel;
        this.view.simulationTemplate.lblEmploymentStatus.text = response[i].QuestionDefinition_OtherLabel;
      }
      this.view.forceLayout();
    }
  },  
  populateGuestEmploymentStatus: function(response){
    var masterData=[];
    for(var i=0;i<response.length;i++){
      if(response[i].QuestionDefinition_id == "QUESTION_SIMULATION_EMPLOYMENT_TYPE"){
        var row=[];
        row.push(response[i].Optionitem_id);
        row.push(response[i].Optionitem_DefaultValue);
        masterData.push(row);
      }
    }
    var defaultData=[];
    defaultData.push("Select");
    defaultData.push("Select");
    masterData.push(defaultData);
    this.view.lstBoxEmploymentStatusGuestSimulation.masterData=masterData;
    this.view.lstBoxEmploymentStatusGuestSimulation.selectedKey="Select";
    this.view.simulationTemplate.lstEmploymentStatusSimulate.masterData = masterData;
    this.view.simulationTemplate.lstEmploymentStatusSimulate.selectedKey = "Select"
  },

  setDataToLoanTypes:function(response){
    var masterData=[];
    for(var i=0;i<response.length;i++){
      var row=[];
      row.push(response[i].Code);
      row.push(response[i].Description);
      masterData.push(row);
    }
    this.view.ListBoxLoanTypes.masterData=masterData;
    this.view.ListBoxLoanTypes.selectedKey="1";
    var defaultData=[];
    defaultData.push("Select");
    defaultData.push("Select");
    masterData.push(defaultData);
    this.view.lstBoxLoanTypeGuestSimulation.masterData=masterData;
    this.view.simulationTemplate.lstLoanTypes.masterData = masterData;
    //this.setDefaultValuesForGuestDashboard();
  },

  setDefaultValuesForGuestDashboard: function(){
    var scopeObj=this;
    this.phoneId=null;
    this.EmailId=null;
    this.canWeApply=false;
    this.fromAddInfo=false;
    this.isMemberEligable=null;
    this.RegLinkResendCount=0;
    this.simulationFlag=false;
    this.view.lblNameValue.text = "";
    this.view.lblPhoneValue.text = "";
    this.view.lblEmailValue.text = "";
    this.view.txtName.text="";
    this.view.txtMiddleName.text="";
    this.view.txtLastName.text="";
    this.view.txtPrimaryPhoneNumber.text="";
    this.view.txtEmailAddress.text="";
    this.view.flxFirstNameError.isVisible=false;    
    this.view.flxLastNameError.isVisible=false;    
    this.view.flxPhoneNumberError.isVisible=false;    
    this.view.flxEmailError.isVisible=false;    
    this.view.flxAddInfo.setVisibility(false);
    this.view.flxNoInformation.setVisibility(true);
    this.view.flxContactInformation.setVisibility(false);
    this.view.HeaderGuest.flxUserType.lblUserType.text = "New Customer";
    this.view.flxEligibilityCheck.isVisible=false;
    this.view.flxDisabledBackground.isVisible=false;
    this.view.lblMembershipValue.text="Check Eligibility";
    this.view.lblRegistrationLinkKA.text = "Send Registration Email";
    this.view.flxAddInformationPopup.isVisible=false;
    this.view.flxDisabledBackground.setVisibility(false);
    this.view.flxRegistrationWrapperKA.isVisible=false;
    this.view.HeaderGuest.lblUserName.text ="Customer Name";
    this.view.breadcrumbs.lblCurrentScreen.text="NEW CUSTOMER";
    this.view.lblMembershipValue.onTouchEnd=function(){
      this.fromAddInfo=true;
      scopeObj.view.flxEligibilityCheck.isVisible=true;
      scopeObj.view.flxDisabledBackground.isVisible=true;     
      scopeObj.view.rbgResponse.selectedKey=null;
      scopeObj.view.FlxResponseMsg.isVisible=false;
      scopeObj.view.flxErrorMsgMEC.isVisible=false;
      scopeObj.view.forceLayout();
    };
    kony.store.setItem("CustomerType_id", null);
    this.view.forceLayout();
  },

  guestDashboardPreShow : function(){
    var scopeObj = this;
    scopeObj.view.flxHeaderAndMainContainer.setVisibility(true);
    scopeObj.navigateBackToDashboard();
    scopeObj.constructSliderForGuestSimulation(4, [640,680,720], ["sknFlxf04723BG100KA","sknFlxfecc06BG100KA","sknFlx7dbc42BG100KA","sknFlx0e9246BG100KA"],["POOR","FAIR","GOOD","EXCELLENT"]);
    scopeObj.view.flxMain.height=kony.os.deviceInfo().screenHeight+"px";
    scopeObj.setFlowActionsForCreditScore();
    scopeObj.resetTabs();
    scopeObj.view.simulationTemplate.segSimulationResults.onRowClick = function(){
      scopeObj.applyAction();
    };
  },

  
  resetTabs :function(){
         var scopObj=this;
        scopObj.view.simulationTemplate.flxTabExcellent.skin="flxTabLeftFFFFFFBrde5e8ef1Px";
        scopObj.view.simulationTemplate.flxTabGood.skin="flxTabFFFFFFBrde0eb919d90aac24d1Px";
        scopObj.view.simulationTemplate.flxFair.skin="flxTabFFFFFFBrde0eb919d90aac24d1Px";
        scopObj.view.simulationTemplate.flxPoor.skin="lblTabRightBorder1Px";
        scopObj.view.simulationTemplate.lblTagExcellent.skin="lblBorderdedede1pxRadius12px";
        scopObj.view.simulationTemplate.lblTagGood.skin="lblBorderdedede1pxRadius12px";
        scopObj.view.simulationTemplate.lblTagFair.skin="lblBorderdedede1pxRadius12px";
        scopObj.view.simulationTemplate.lblTagPoor.skin="lblBorderdedede1pxRadius12px";
   },
  
  setFlowActionsForCreditScore :function(){
        var scopObj=this;
        scopObj.view.simulationTemplate.flxTabExcellent.onClick =function(eventObject){
          scopObj.resetTabs();
          scopObj.view.simulationTemplate.flxTabExcellent.skin="flxSelTabLeftBrd6372901PX";
          scopObj.view.simulationTemplate.lblTagExcellent.skin="sknTaglbl11abebBorderRadius12px";
          scopObj.creditScoreValues.value = "Excellent (720 or Above)";
        };
        scopObj.view.simulationTemplate.flxTabGood.onClick =function(eventObject){
          scopObj.resetTabs();
          scopObj.view.simulationTemplate.flxTabGood.skin="sknflxSelectedTab637290";
          scopObj.view.simulationTemplate.lblTagGood.skin="sknTaglbl11abebBorderRadius12px";
          scopObj.creditScoreValues.value = "Good (680 - 719)";
        };
        scopObj.view.simulationTemplate.flxFair.onClick =function(eventObject){
          scopObj.resetTabs();
          scopObj.view.simulationTemplate.flxFair.skin="sknflxSelectedTab637290";
          scopObj.view.simulationTemplate.lblTagFair.skin="sknTaglbl11abebBorderRadius12px";
          scopObj.creditScoreValues.value = "Fair (640 - 679)";
        };
        scopObj.view.simulationTemplate.flxPoor.onClick =function(eventObject){
          scopObj.resetTabs();
          scopObj.view.simulationTemplate.flxPoor.skin="sknlblSelTabRightBorder637290";
          scopObj.view.simulationTemplate.lblTagPoor.skin="sknTaglbl11abebBorderRadius12px";
          scopObj.creditScoreValues.value = "Just okay (639 or less)";
        };
  },
  
  constructSliderForGuestSimulation : function(noOfBreaks,breakValuesArray,skinsArray,breakValuenames){
    var scopeObj = this;
    var outerFlexWidth = (this.view.flxCreditRatingMeterGuestSimulation.width).slice(0, -2);
    var eachFlexWidth = outerFlexWidth/noOfBreaks;
    //deleting the constructed flexes before creating them
    scopeObj.view.flxCreditRatingMeterGuestSimulation.removeAll();
    scopeObj.view.flxRatingNamesGuestSimulation.removeAll();
    scopeObj.view.flxRangesGuestSimulation.removeAll();
    for(var i=0;i<noOfBreaks;i++){
      var flxInnerBreak = new kony.ui.FlexContainer({
        "id": "flxInnerBreakGuest" + i,
        "skin": skinsArray[i],
        "left": (eachFlexWidth*i)+"dp",
        "top": "0%",
        "width": eachFlexWidth+"dp",
        "height": "100%",
        "zIndex": 1,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "onClick":function(){
          scopeObj.view.flxCreditScorePointerGuestSimulation.centerX = (parseInt(((this.left).slice(0, -2)),10)+(parseInt((this.width).slice(0, -2),10)/2) + 35)+"dp";
          var id = this.id;
          if(id == "flxInnerBreakGuest0"){
            scopeObj.creditScoreValues.value = "Just okay (639 or less)";
          }
          else if(id == "flxInnerBreakGuest1"){
            scopeObj.creditScoreValues.value = "Fair (640 - 679)";
          }
          else if(id == "flxInnerBreakGuest2"){
            scopeObj.creditScoreValues.value = "Good (680 - 719)";
          }
          else if(id == "flxInnerBreakGuest3"){
            scopeObj.creditScoreValues.value = "Excellent (720 or Above)";
          }
          scopeObj.view.forceLayout();
        }
      }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false
      }, {});
      this.view.flxCreditRatingMeterGuestSimulation.add(flxInnerBreak);
      var lblRangeNames = new kony.ui.Label({
        id: "lblRangeNamesGuest" + i,
        centerX: ((eachFlexWidth*i)+(eachFlexWidth/2))+"dp",
        centerY: "50%",
        skin: "sknLbl9ca9ba108PerKA",
        text: breakValuenames[i],
        isVisible: true
      }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        contentAlignment: constants.CONTENT_ALIGN_CENTER
      }, {});
      this.view.flxRatingNamesGuestSimulation.add(lblRangeNames);
    }
    for(var j=0;j<noOfBreaks-1;j++){
      var lblRange = new kony.ui.Label({
        id: "lblRangeGuest" + j,
        centerX: (eachFlexWidth*(j+1))+"dp",
        centerY: "50%",
        skin: "sknLbl9ca9ba108PerKA",
        text: breakValuesArray[j],
        isVisible: true
      }, {
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        contentAlignment: constants.CONTENT_ALIGN_CENTER
      }, {});
      this.view.flxRangesGuestSimulation.add(lblRange);
    }
    scopeObj.view.flxCreditScorePointerGuestSimulation.centerX = eachFlexWidth + (eachFlexWidth/2) +35 + "dp";
  },

  startLoansGuestSimulation : function(){
    var scopeObj = this;
    if(scopeObj.view.ListBoxLoanTypes.selectedKey.toLowerCase() == "select"){  
      scopeObj.view.ListBoxLoanTypes.skin = "sknLstBoxeb3017Bor3px";
      scopeObj.view.lblLoanTypeError.setVisibility(true);
    }
    else{
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.hideErrorLabels();
      scopeObj.closeGeneralInfoAndAddInfo();
      scopeObj.hideAllMainContainers();
      scopeObj.view.flxLoansGuestSimulation.setVisibility(true);
      scopeObj.view.flxAlertMessage.setVisibility(false);
      scopeObj.view.segSimulationResultsGuestSimulation.setVisibility(false);
      scopeObj.setDummyDataToGuestSimulationResults();
      var DetailsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("DetailsModule");
      DetailsModule.presentationController.getGuestSimulationQuestions(scopeObj.simulationFlag);
      scopeObj.view.forceLayout();
    }
  },

  hideErrorLabels: function(){
    var scopeObj = this;
    scopeObj.view.lblGuestSimulationLoanTypeError.setVisibility(false);
    scopeObj.view.lblGuestSimulationLoanAmountError.setVisibility(false);
    scopeObj.view.lblGuestSimulationEmploymentStatusError.setVisibility(false);
    scopeObj.view.lstBoxLoanTypeGuestSimulation.skin = "sknlstbx485c7513px";
    scopeObj.view.txtLoanAmountGuestSimulation.skin = "sknTbxFFFFFFBorDEDEDE13pxKA";
    scopeObj.view.lstBoxEmploymentStatusGuestSimulation.skin = "sknlstbx485c7513px";
  },

  navigateBackToDashboard : function(){
    var scopeObj = this;
    scopeObj.displayGeneralInfoAndAddInfo();
    scopeObj.hideAllMainContainers();
    scopeObj.view.flxGuestDashboard.setVisibility(true);
    scopeObj.view.forceLayout();
  },

  navigateToSearchCustomerScreen : function(){
    var CustomerManagement = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
    CustomerManagement.presentationController.showCustomerManagement();
  },

  hideAllMainContainers : function(){
    var scopeObj = this;
    scopeObj.view.flxGuestDashboard.setVisibility(false);
    scopeObj.view.flxLoansGuestSimulation.setVisibility(false);
  },

  getGuestSimulationResults : function(){
    var loanAmount = this.view.simulationTemplate.txtLoanAmount.text;
    var validateFieldsOfSimulation = true;
    var response = { 
      "loanamount": loanAmount.replace(",",""),
      "employmentStatus": null,
      "creditScore": this.creditScoreValues.value,
      "SimulationResults": this.existingSimulationResults
    };
    if(this.creditScoreValues.value === null){
      this.view.simulationTemplate.lblCreditScoreError.setVisibility(true);
      validateFieldsOfSimulation = false;
    }else{
      this.view.simulationTemplate.lblCreditScoreError.setVisibility(false);
      validateFieldsOfSimulation = true;
    }
    if(loanAmount){
      loanAmount = loanAmount.replace(",","");
      if(parseInt(loanAmount,10) >= 1000 && parseInt(loanAmount,10) <= 50000){
        this.view.simulationTemplate.lblLoanAmountError.setVisibility(false);
      }else{
        this.view.simulationTemplate.lblLoanAmountError.text = "Enter loan amount in the given range";
        this.view.simulationTemplate.lblLoanAmountError.setVisibility(true);
        validateFieldsOfSimulation = false;
      }
    }else{
      this.view.simulationTemplate.lblLoanAmountError.text = "Loan amount cannot be empty";
      this.view.simulationTemplate.lblLoanAmountError.setVisibility(false);
      validateFieldsOfSimulation = false;
    }
    if(this.view.simulationTemplate.lstEmploymentStatusSimulate.selectedKey.toLowerCase() !== "select"){
      this.view.simulationTemplate.lblEmploymentStatusError.setVisibility(false);
      response.employmentStatus = this.view.simulationTemplate.lstEmploymentStatusSimulate.selectedKeyValue;
    }else{
      this.view.simulationTemplate.lblEmploymentStatusError.setVisibility(true);
      validateFieldsOfSimulation = false;
    }
    if(this.view.lstBoxLoanTypeGuestSimulation.selectedKey.toLowerCase() == "select"){
      this.view.lstBoxLoanTypeGuestSimulation.skin = "sknLstBoxeb3017Bor3px";
      this.view.lblGuestSimulationLoanTypeError.setVisibility(true);
      validateFieldsOfSimulation = false;
    }
    else{
      this.view.lblGuestSimulationLoanTypeError.setVisibility(false);
    }
    if(validateFieldsOfSimulation === true){
      if(this.simulationFlag){
        this.presenter.saveSimulationResponse(response, this.simulationFlag);
        var selectedData=this.view.simulationTemplate.segSimulationResults.data;
        selectedData[0].flxRecommendedLoans = {"skin":"sknflxffffffBorder3ebaed7Radius4px"};
        selectedData[0].lblApply = {"text":kony.i18n.getLocalizedString("i18n.frmLoansDashboard.ApplyStaticMessage"),"isVisible":true};
        this.view.simulationTemplate.segSimulationResults.setData(selectedData);
      }
      this.view.simulationTemplate.segSimulationResults.setVisibility(true);
      this.view.simulationTemplate.lblSimulateToGetRes.setVisibility(false);
      this.view.simulationTemplate.lblSimulationResults.setVisibility(true);
    }
    else{
      this.view.simulationTemplate.segSimulationResults.setVisibility(false);
      this.view.simulationTemplate.lblSimulateToGetRes.setVisibility(true);
      this.view.simulationTemplate.lblSimulationResults.setVisibility(false);
    }
  },

  showApplyButtonOnHoveredResult : function(rowIndex){
    if(this.simulationFlag){
      var selectedIndex=rowIndex;
      var selectedData = this.view.simulationTemplate.segSimulationResults.data;
      for(var i = 0;i<selectedData.length;i++){
        if(selectedIndex == i){
          selectedData[i].flxRecommendedLoans = {"skin":"sknflxffffffBorder3ebaed7Radius4px"};
          selectedData[i].lblApply = {"text":kony.i18n.getLocalizedString("i18n.frmLoansDashboard.ApplyStaticMessage"),"isVisible":true};
        }else{
          selectedData[i].flxRecommendedLoans = {"skin":"sknflxffffffBorderd6dbe7Radius4px"};
          selectedData[i].lblApply = {"text":kony.i18n.getLocalizedString("i18n.frmLoansDashboard.ApplyStaticMessage"),"isVisible":false};
        }
      }
      this.view.simulationTemplate.segSimulationResults.setData(selectedData);
      this.view.forceLayout();
    }
  },

  setDummyDataToGuestSimulationResults : function(){
    var scopeObj = this;
    var simulationResults = [];
    scopeObj.view.simulationTemplate.segSimulationResults.widgetDataMap = {"lblLoanType":"loanType","lblRate":"Rate","lblRateValue":"RateValue","lblAPR":"APR","lblAPRValue":"APRValue","lblTerms":"Terms","lblTermsValue":"TermsValue","lblApply":"lblApply","flxRecommendedLoans":"flxRecommendedLoans","lblSeperator":"lblSeperator"};
    scopeObj.view.segSimulationResultsGuestSimulation.widgetDataMap = {"lblLoanType":"loanType","lblRate":"Rate","lblRateValue":"RateValue","lblAPR":"APR","lblAPRValue":"APRValue","lblTerms":"Terms","lblTermsValue":"TermsValue","lblApply":"lblApply","flxRecommendedLoans":"flxRecommendedLoans","lblSeperator":"lblSeperator"};
    simulationResults = [{"loanType":{"text":"Monthly Payment $300","isVisible":true},"Rate":"RATE","RateValue":"8%","APR":"APR","APRValue":"6%","Terms":"TERMS","TermsValue":"5 Yrs","lblApply":kony.i18n.getLocalizedString("i18n.frmLoansDashboard.ApplyStaticMessage"),"flxRecommendedLoans":{"skin":"sknflxffffffBorderd6dbe7Radius4px"},"lblSeperator":"."},
                         {"loanType":{"text":"Monthly Payment $300","isVisible":true},"Rate":"RATE","RateValue":"10%","APR":"APR","APRValue":"9.1%","Terms":"TERMS","TermsValue":"7 Yrs","lblApply":kony.i18n.getLocalizedString("i18n.frmLoansDashboard.ApplyStaticMessage"),"flxRecommendedLoans":{"skin":"sknflxffffffBorderd6dbe7Radius4px"},"lblSeperator":"."},
                         {"loanType":{"text":"Monthly Payment $500","isVisible":true},"Rate":"RATE","RateValue":"8%","APR":"APR","APRValue":"7.4%","Terms":"TERMS","TermsValue":"3 Yrs","lblApply":kony.i18n.getLocalizedString("i18n.frmLoansDashboard.ApplyStaticMessage"),"flxRecommendedLoans":{"skin":"sknflxffffffBorderd6dbe7Radius4px"},"lblSeperator":"."}];
    scopeObj.view.segSimulationResultsGuestSimulation.setData(simulationResults);
    scopeObj.view.simulationTemplate.segSimulationResults.setData(simulationResults);
  },

  sendEmail:function(){
    var emailValue=this.view.txtEmailAddress.text;
    var RegLinkResendCount=parseInt(this.RegLinkResendCount)+1;
    var payLoad={
      "copyToEmails": "",
      "sendToEmails": "konylogu@gmail.com,"+emailValue,
      "senderEmail": "logeswaran.rathinasamy@kony.com",
      "senderName": "Admin Console ",
      "subject": "Registration Link",
      "content": "<a href=\"https://empselfservice4.konycloud.com/ConsumerLending\">RegistrationLink<\/a>"  
    };
    this.presenter.sendEmail(payLoad,RegLinkResendCount,"true");
  }
});