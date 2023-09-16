define(['AdminConsoleDateTimeUtilities','DateTimeUtils_FormExtn','AdminConsoleCommonUtilities'],function (AdminConsoleDateTimeUtilities, DateTimeUtils_FormExtn,adminUtils){
return {
  NumberOfFlags: 3,
  customerType : "",
  isSCADisabled: true,
 
  setBasicInformation: function (CustomerBasicInfo, formInstance,successCallBack) {
     kony.store.setItem("Username", CustomerBasicInfo.customer.Username);
    adminUtils.AdminConsoleCommonUtils.isSCAEnable();
    if(CustomerBasicInfo===undefined || CustomerBasicInfo.target !== "EditScreen"){
    //reset
    this.resetGeneralInfo(formInstance);
    }
    this.view.row1.btnLink2.info = { "emailSentCtr": 0 };
    this.view.alertMessage.setVisibility(false);
    if (!this.view.flxGmInfoDetailWrapper.isVisible) {
      this.toggleGeneralInfoTab();
    }
    if(CustomerBasicInfo){
    if (CustomerBasicInfo.target === "EditScreen") {
      this.customerType = CustomerBasicInfo.customer.CustomerType_id;
      
      if(this.customerType.indexOf(adminUtils.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE) >= 0 &&
      this.customerType.indexOf(adminUtils.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE) >= 0){
        this.setDataForGeneralInfoCombinedEditScreen(CustomerBasicInfo, formInstance);
      } else{
        this.setDataForGeneralInformationEditScreen(CustomerBasicInfo, formInstance);
      }
      
    } else {
      if(CustomerBasicInfo.customer.CustomerType_id === adminUtils.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
        // We're not using the below service call after moving to contracts from companies
        // if(CustomerBasicInfo.customer.customerbusinesstype && CustomerBasicInfo.customer.customerbusinesstype.length > 0){
        //   //isAuthSignatory flag is available
        // }else{ //fetch userdetails to get isAuthSignatory
        //   var payload = {"Organization_id":CustomerBasicInfo.customer.organisation_id,
        //                  "userName":CustomerBasicInfo.customer.Username};
        //   formInstance.presenter.getCompanyCustomers(payload);
        // }
      }
      this.setDataForGeneralInformationScreen(CustomerBasicInfo, formInstance);
      this.view.alertMessage.setGeneralInformationAlertMessage(formInstance, formInstance.presenter.getCurrentCustomerLockedOnInfo(),
                                                               formInstance.presenter.getCurrentCustomerRequestAndNotificationCount());
    }
  }
    
    if(successCallBack){
    successCallBack();
    }
    
  },

  toggleGeneralInfoTab: function() {
    if (this.view.flxGmInfoDetailWrapper.isVisible) {
      this.view.flxGmInfoDetailWrapper.setVisibility(false);
      this.view.fonticonrightarrow.text = "";
      this.view.forceLayout();
    } else {
      this.view.flxGmInfoDetailWrapper.setVisibility(true);
      this.view.fonticonrightarrow.text = "";
      this.view.forceLayout();
    }
  },
  getMaritalEmployementId : function(basicInfo, option){
    var lstBoxWidgetPath = option === 1 ? this.view.EditGeneralInfo.lstboxDetails3 : this.view.EditGeneralInfo.lstboxDetails4;
    var selectedId ="lbl1";
    if(option === 1 ){ // get marital status id 
      if(basicInfo.customer.MaritalStatus_name){
        var lstboxData1 = lstBoxWidgetPath.masterData;
        var filterList1 = lstboxData1.filter(function(rec){
          return (rec[1].toLowerCase().indexOf(basicInfo.customer.MaritalStatus_name.toLowerCase()) >= 0);
        });
        selectedId = filterList1.length >0 ?filterList1[0][0]:"lbl1";
      } else if(basicInfo.customer.MaritalStatus_id){
        var lstboxData0 = lstBoxWidgetPath.masterData;
        var filterList0 = lstboxData0.filter(function(rec){
                return (rec[1].toLowerCase().indexOf(basicInfo.customer.MaritalStatus_id.toLowerCase()) >= 0);
        });
           selectedId = filterList0.length >0 ?filterList0[0][0]:"lbl1";
      }
    } else if(option === 2){ //get employement status id
      var employementStatus="";
      if(basicInfo.customer.EmployementStatus_name){
        var lstboxData2 = lstBoxWidgetPath.masterData;
        var filterList2 = lstboxData2.filter(function(rec){
          return (rec[1].toLowerCase().indexOf(basicInfo.customer.EmployementStatus_name.toLowerCase()) >= 0);
        });
        selectedId = filterList2.length >0 ?filterList2[0][0]:"lbl1";
      } 
      else if(basicInfo.customer.EmployementStatus_id){
          var lstboxData3 = lstBoxWidgetPath.masterData;
        var filterList3 = lstboxData3.filter(function(rec){
          return (rec[1].toLowerCase().indexOf(basicInfo.customer.EmployementStatus_id.toLowerCase()) >= 0);
        });
        selectedId = filterList3.length >0 ?filterList3[0][0]:"lbl1";
           
     
                                       
    }
    }
    return selectedId;
    
  },
  setDataForGeneralInformationEditScreen: function (basicInfo, formInstance) {
    this.fillSalutation();
    this.view.EditGeneralInfo.flxGeneralDetailsCombinedEdit.setVisibility(false);
    this.view.EditGeneralInfo.flxGeneralDetails.setVisibility(true);
    //set edit data
    this.clearEditProfileScreenFields(1);
    this.view.EditGeneralInfo.lstboxDetails1.selectedKey = basicInfo.customer.Salutation ? basicInfo.customer.Salutation : "lbl1";
    this.view.EditGeneralInfo.lstboxDetails2.selectedKey = basicInfo.customer.CustomerStatus_id ? basicInfo.customer.CustomerStatus_id : "lbl1";
    this.view.EditGeneralInfo.lstboxDetails3.selectedKey = this.getMaritalEmployementId(basicInfo,1);
    this.view.EditGeneralInfo.lstboxDetails4.selectedKey = this.getMaritalEmployementId(basicInfo,2);
    var statusKeys = basicInfo.customer.CustomerFlag_ids ? basicInfo.customer.CustomerFlag_ids.split(",") : basicInfo.customer.CustomerFlag_ids;
    var i;
    for (i = 1; i <= this.NumberOfFlags; i++) {
      this.view.EditGeneralInfo["imgFlag" + i].src = formInstance.AdminConsoleCommonUtils.checkbox;
    }
    this.view.EditGeneralInfo.flxSelectFlags.info = {};
    var initialFlagList = [];
    if (statusKeys) {
      for (i = 1; i <= this.NumberOfFlags; i++) {
        for (var j = 0; j < statusKeys.length; j++) {
          if (this.view.EditGeneralInfo["imgFlag" + i].info.Key === statusKeys[j].trim()) {
            this.view.EditGeneralInfo["imgFlag" + i].src = formInstance.AdminConsoleCommonUtils.checkboxSelected;
            initialFlagList.push(this.view.EditGeneralInfo["imgFlag" + i].info.Key);
          }
        }
      }
    }
    this.view.EditGeneralInfo.flxSelectFlags.info = {
      "initialFlagList": initialFlagList
    };

    // Turn of the switch if e-agreement is not required
    if (basicInfo.customer.isEAgreementRequired === "0" || basicInfo.customer.CustomerType_id === adminUtils.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE) {
      this.view.EditGeneralInfo.flxDetails7.setVisibility(false);
    } else {
      this.view.EditGeneralInfo.flxDetails7.setVisibility(true);
    }
    // Set e-agreement status
    if (basicInfo.customer.isEagreementSigned === "false") {
      this.view.EditGeneralInfo.switchToggle.selectedIndex = 1;
    } else {
      this.view.EditGeneralInfo.switchToggle.selectedIndex = 0;
    }
    //Turn off marital status edit if not a retail user
    if (basicInfo.customer.CustomerType_id === adminUtils.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE) {
      this.view.EditGeneralInfo.flxDetails3.setVisibility(true);
    } else {
      this.view.EditGeneralInfo.flxDetails3.setVisibility(false);
    }
    this.view.EditGeneralInfo.flxDetails3.info = {
      "CustomerType_id": basicInfo.customer.CustomerType_id
    };

    this.view.EditGeneralInfo.lblDetails9Name.text = basicInfo.customer.Name;
    this.showEditGeneralInformationScreen(formInstance);
    this.view.EditGeneralInfo.flxDetails2.setVisibility(false);
    this.view.forceLayout();
  },
  /*
  * fill details of edit screen for a combined type 
  */
    openConfirm: function(popupModel, formInstance) {
    //Opens a confirm popup 
    formInstance.view.SuspendUserpopUp.lblPopUpMainMessage.text = popupModel.header;
    formInstance.view.SuspendUserpopUp.rtxPopUpDisclaimer.text = popupModel.message;
    formInstance.view.SuspendUserpopUp.btnPopUpSuspend.text = popupModel.confirmMsg;
    formInstance.view.SuspendUserpopUp.btnPopUpNo.text = popupModel.cancelMsg;
    formInstance.view.SuspendUserpopUp.btnPopUpSuspend.onClick = function () {
      var selectedLEArr=[];
    for(var i=0 ; i< formInstance.view.SuspendUserpopUp.segSelectEntity.data.length ;i++)
    {
      if(formInstance.view.SuspendUserpopUp.segSelectEntity.data[i].fontIconSelectOption.skin==="sknIconBg0066CASz20pxCheckbox")
        {
          selectedLEArr.push(formInstance.view.SuspendUserpopUp.segSelectEntity.data[i].id);
        }
    }
      if(selectedLEArr.length > 0){
        popupModel.confirmAction(selectedLEArr);
        formInstance.view.flxPopUpConfirmation.setVisibility(false);
      }
    };
    formInstance.view.SuspendUserpopUp.btnPopUpNo.onClick = function () {
      popupModel.cancelAction();
      formInstance.view.flxPopUpConfirmation.setVisibility(false);
    };
    formInstance.view.SuspendUserpopUp.flxPopUpClose.onClick = function () {
      popupModel.cancelAction();
      formInstance.view.flxPopUpConfirmation.setVisibility(false);
    };
    formInstance.view.flxPopUpConfirmation.setVisibility(true);
  },

    suspendOptionOnclick: function (formInstance) {
      var locklbl = formInstance.view.flxSelectOptions.lblOption1.text;
      formInstance.view.flxPopUpConfirmation.setVisibility(true);
      var currentStatus = locklbl.toUpperCase();
      var primaryCustId=formInstance.presenter.getCurrentCustomerDetails().primaryCustomerId;
      var isAssociated=formInstance.presenter.getCurrentCustomerDetails().isAssociated;
      var rtxMsg="";//Using rtxMsg separatley as the mesg different in certain senarios
      var buttonText='YES, ' + (locklbl.toUpperCase());
      var cancelMsg = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
      var confirmAction = function (data) {
        var selectedLEArr = "[";
        for(var i = data.length-1;i>0;i--){
          selectedLEArr+="\\\""+data[i]+"\\\",";
        }
        selectedLEArr+="\\\""+data[0]+"\\\"]";
        formInstance.presenter.updateDBPUserStatus({
          
          "Customer_id":formInstance.presenter.getCurrentCustomerDetails().Customer_id,
          "customerUsername": formInstance.presenter.getCurrentCustomerDetails().Username,
          "status": locklbl === kony.i18n.getLocalizedString("i18n.permission.Activate") ? "ACTIVE" : "SUSPENDED",
          "legalEntityList": selectedLEArr,        
          
        });  
      };
      var cancelAction = function () { };
      var message = "", message2 = "";
      if (locklbl === kony.i18n.getLocalizedString("i18n.permission.Activate")&&isAssociated==="false") {
        message = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Are_you_sure_to_Activate_the_customer_NoContractMsg1");
        message2 = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Are_you_sure_to_Activate_the_customer_NoContractMsg2");
        rtxMsg=message + ' ' + formInstance.view.lblCustomerName.text +" " + message2;
        buttonText=kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.AddCustomer_UC");
        cancelMsg =kony.i18n.getLocalizedString("i18n.frmCustomers.CANCEL");
        confirmAction = function () {
          var customerDetails = formInstance.presenter.getCurrentCustomerDetails();
          var navigationParam = {"formName":kony.application.getCurrentForm().id,
                                 "isEnrollEditUser" : false,
                                 "tabName":"CONTACTS"};
          formInstance.presenter.getInfinityUserAllDetails({"id":customerDetails.Customer_id},navigationParam,true);
        };
      }else if (locklbl === kony.i18n.getLocalizedString("i18n.permission.Activate")) {
        message = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Are_you_sure_to_Activate_the_customer");
        message2 = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Customer_can_perform");
        rtxMsg=message + ' "' + this.view.generalInfoHeader.lblCustomerName.text + '"?<br><br>' + message2;
      } else if (locklbl === kony.i18n.getLocalizedString("i18n.permission.Suspend")) {
        message = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Are_you_sure_to_Suspend_the_customer");
        message2 = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Customer_can_not_perform");
        rtxMsg=message + ' "' + this.view.generalInfoHeader.lblCustomerName.text + '"?<br><br>' + message2;
      }
       this.openConfirm({
        header: locklbl + ' User',
        message: rtxMsg,
        confirmAction: confirmAction,
        cancelMsg: cancelMsg,
        cancelAction: cancelAction,
        confirmMsg: buttonText,

      }, formInstance);
      this.setDataForSuspendUserPopUp(formInstance);

    },
  
 setDataForSuspendUserPopUp: function(formInstance)
  {
    var self = this;
    var segData =[];
    formInstance.view.SuspendUserpopUp.segSelectEntity.setData([]);
    if(formInstance.view.flxSelectOptions.lblOption1.text === "Suspend") {
    var presentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule").presentationController;
    var entities = presentationController.getActiveLegalEntities();
    } else {
      var presentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule").presentationController;
      var entities = presentationController.getSuspendedLegalEntities();
    }
    var widMap={
      "flxEventsDataSet": "flxEventsDataSet",
      "flxSelectOption" : "flxSelectOption",
      "fontIconSelectOption" : "fontIconSelectOption",
      "lblName" : "lblName",
      "lblSeparator": "lblSeparator",
   //   "id" : "id",
      
  };   
    segData=entities.map(function(en){
      return {
        "flxEventsDataSet": {"isVisible": true},
        "flxSelectOption" : {"isVisible":true,"onClick":self.imagefun.bind(self,formInstance)},
        "fontIconSelectOption": {"text":adminUtils.AdminConsoleCommonUtils.checkboxnormallbl,"skin":"sknBgB7B7B7Sz20pxCheckbox"},
        "lblName" : en.description,
        "lblSeparator" :"-",
        "id" : en.legalEntity,
            };
    });
    
    formInstance.view.SuspendUserpopUp.segSelectEntity.widgetDataMap = widMap;
    formInstance.view.SuspendUserpopUp.segSelectEntity.setData(segData);
    formInstance.view.SuspendUserpopUp.segSelectEntity.info = {
      "data": segData
    };
    formInstance.view.SuspendUserpopUp.segSelectEntity.selectionBehavior=constants.SEGUI_DEFAULT_BEHAVIOR;
    formInstance.view.SuspendUserpopUp.setVisibility(true);
    formInstance.view.popUpConfirmation.setVisibility(false);
    formInstance.view.forceLayout();
  },
   imagefun:function(formInstance,eventObj,context)
  {
    var segData = formInstance.view.SuspendUserpopUp.segSelectEntity.data;
    var rowIndex = context.rowIndex;
    var img = (segData[rowIndex].fontIconSelectOption.text === adminUtils.AdminConsoleCommonUtils.checkboxnormallbl) ? adminUtils.AdminConsoleCommonUtils.checkboxSelectedlbl : adminUtils.AdminConsoleCommonUtils.checkboxnormallbl;
    segData[rowIndex].fontIconSelectOption.text = img;
    segData[rowIndex].fontIconSelectOption.skin = this.applyCheckboxSkin(segData[rowIndex].fontIconSelectOption);
    formInstance.view.SuspendUserpopUp.segSelectEntity.setDataAt(segData[rowIndex], rowIndex);
  },
  applyCheckboxSkin : function(lblPath){

    var skinVal = (lblPath.text == adminUtils.AdminConsoleCommonUtils.checkboxnormallbl)?"sknBgB7B7B7Sz20pxCheckbox": "sknIconBg0066CASz20pxCheckbox" ;
    return skinVal;
  },
  
  setDataForGeneralInfoCombinedEditScreen : function(basicInfo, formInstance){
    this.clearEditProfileScreenFields(2);
    this.view.EditGeneralInfo.flxGeneralDetailsCombinedEdit.setVisibility(true);
    this.view.EditGeneralInfo.flxGeneralDetails.setVisibility(false);
    this.fillSalutation();
    this.view.EditGeneralInfo.lstBoxEditDetails11.selectedKey = basicInfo.customer.Salutation ? basicInfo.customer.Salutation : "lbl1";
    this.view.EditGeneralInfo.lstBoxEditDetails31.selectedKey = this.getMaritalEmployementId(basicInfo,1);
    this.view.EditGeneralInfo.lstBoxEditDetails33.selectedKey = this.getMaritalEmployementId(basicInfo,2);
    var statusKeys = basicInfo.customer.CustomerFlag_ids ? basicInfo.customer.CustomerFlag_ids.split(",") : basicInfo.customer.CustomerFlag_ids;
    var i;
    for (i = 1; i <= this.NumberOfFlags; i++) {
      this.view.EditGeneralInfo["imgFlagCheckbox" + i].src = formInstance.AdminConsoleCommonUtils.checkbox;
    }
    this.view.EditGeneralInfo.flxSelectFlagContainer42.info = {};
    var initialFlagList = [];
    if (statusKeys) {
      for (i = 1; i <= this.NumberOfFlags; i++) {
        for (var j = 0; j < statusKeys.length; j++) {
          if (this.view.EditGeneralInfo["imgFlagCheckbox" + i].info.Key === statusKeys[j].trim()) {
            this.view.EditGeneralInfo["imgFlagCheckbox" + i].src = formInstance.AdminConsoleCommonUtils.checkboxSelected;
            initialFlagList.push(this.view.EditGeneralInfo["imgFlagCheckbox" + i].info.Key);
          }
        }
      }
    }
    this.view.EditGeneralInfo.flxSelectFlagContainer42.info = {
      "initialFlagList": initialFlagList
    };
    // Set e-agreement status
    this.view.EditGeneralInfo.switchEAgreement51.selectedIndex = (basicInfo.customer.isEagreementSigned === "false") ? 1 : 0;
    this.view.EditGeneralInfo.editDetails12.tbxEnterValue.text = basicInfo.customer.FirstName || "";
    this.view.EditGeneralInfo.editDetails13.tbxEnterValue.text = basicInfo.customer.MiddleName || "";
    this.view.EditGeneralInfo.editDetails21.tbxEnterValue.text = basicInfo.customer.LastName || "";
    this.view.EditGeneralInfo.editDetails22.tbxEnterValue.text = basicInfo.customer.Username || "";
    this.view.EditGeneralInfo.editDetails23.tbxEnterValue.text = basicInfo.customer.DateOfBirth || "";
    this.view.EditGeneralInfo.editDetails32.tbxEnterValue.text = basicInfo.customer.SSN || "";
    this.view.EditGeneralInfo.editDetails41.tbxEnterValue.text = basicInfo.customer.DrivingLicenseNumber||"";
    //non-editable fields
    this.view.EditGeneralInfo.editDetails12.tbxEnterValue.skin = "txtD7d9e0disabledf3f3f3NoBorder";
    this.view.EditGeneralInfo.editDetails21.tbxEnterValue.skin = "txtD7d9e0disabledf3f3f3NoBorder";
    this.view.EditGeneralInfo.editDetails22.tbxEnterValue.skin = "txtD7d9e0disabledf3f3f3NoBorder";
    this.view.EditGeneralInfo.editDetails23.tbxEnterValue.skin = "txtD7d9e0disabledf3f3f3NoBorder";
    this.view.EditGeneralInfo.editDetails32.tbxEnterValue.skin = "txtD7d9e0disabledf3f3f3NoBorder";
    this.view.EditGeneralInfo.editDetails12.tbxEnterValue.setEnabled(false);
    this.view.EditGeneralInfo.editDetails21.tbxEnterValue.setEnabled(false);
    this.view.EditGeneralInfo.editDetails22.tbxEnterValue.setEnabled(false);
    this.view.EditGeneralInfo.editDetails23.tbxEnterValue.setEnabled(false);
    this.view.EditGeneralInfo.editDetails32.tbxEnterValue.setEnabled(false);
    
    this.view.EditGeneralInfo.editDetails13.info={
      "CustomerType_id": basicInfo.customer.CustomerType_id
    };
    this.showEditGeneralInformationScreen(formInstance);
    this.view.forceLayout();
    
  },
  setDataForGeneralInformationScreen: function (basicInfo, formInstance) {
    var self=this;
    kony.store.setItem("Customer_id", basicInfo.customer.Customer_id);
    if (basicInfo.customer.CustomerType_id) {
      kony.store.setItem("CustomerType_id", basicInfo.customer.CustomerType_id);
    }

    var hasLoans = formInstance.presenter.getCurrentCustomerType() === adminUtils.AdminConsoleCommonUtils.constantConfig.PROSPECT_TYPE ||
        formInstance.presenter.getCurrentCustomerType() === adminUtils.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE;
    if(basicInfo.customer && basicInfo.customer.prospectStatus){
      this.view.dashboardCommonTab.btnCDP.setVisibility(true);
    }else{
      this.view.dashboardCommonTab.btnCDP.setVisibility(false);
    }
    this.view.dashboardCommonTab.btnLoans.setVisibility(false);
    this.view.dashboardCommonTab.btnDeposits.setVisibility(true);
    this.view.dashboardCommonTab.btnBanking.left = "150px";
    formInstance.view.CSRAssistToolTip.right = "130px";
    this.isAssistConsented = basicInfo.customer.IsAssistConsented;
   
    // Set enroll field

    //Set Customer risk status
    this.view.generalInfoHeader.setRiskStatus(basicInfo.customer.CustomerFlag);

    //OLB access and enrolment
    this.view.row1.lblData2.info = { "IsOlbAllowed": basicInfo.customer.IsOlbAllowed, "IsEnrolledForOlb": basicInfo.customer.IsEnrolledForOlb };
    this.view.generalInfoHeader.flxDefaultSearchHeader.info = { "CustomerType_id": basicInfo.customer.CustomerType_id };
    //Set customer status
    var customerStatus = basicInfo.customer.OLBCustomerFlags.Status;
    this.view.generalInfoHeader.lblStatus.info = { "value": customerStatus };
    this.setLockStatus(customerStatus.toUpperCase(), formInstance,basicInfo.linkDelinkConfig);

    if (customerStatus.toUpperCase() === "LOCKED") {
      var lockedOnDate = DateTimeUtils_FormExtn.getDateInstanceFromDBDateTime(basicInfo.customer.OLBCustomerFlags.LockedOn);
      var unlockedOnDate = new Date(lockedOnDate.getTime() + (parseInt(basicInfo.configuration.value) * 60 * 1000));
      formInstance.presenter.setCurrentCustomerLockedOnInfo({
        lockedOn: AdminConsoleDateTimeUtilities.getFormattedTimeFromDateInstance(lockedOnDate, AdminConsoleDateTimeUtilities.CLIENT_DATETIME_FORMAT1),
        unlockedOn: AdminConsoleDateTimeUtilities.getFormattedTimeFromDateInstance(unlockedOnDate, AdminConsoleDateTimeUtilities.CLIENT_DATETIME_FORMAT1)
      });
      this.view.alertMessage.setGeneralInformationAlertMessage(formInstance, formInstance.presenter.getCurrentCustomerLockedOnInfo(),
                                                               formInstance.presenter.getCurrentCustomerRequestAndNotificationCount());
    }else{
      formInstance.presenter.setCurrentCustomerLockedOnInfo(null);
    }
    
    this.computeandSetToolTipHeight(formInstance);
    //adding the customer name into appcontext to be retrieved in the loans page
    kony.mvc.MDAApplication.getSharedInstance().appContext.searchCustomerName = basicInfo.customer.Name;
    this.view.generalInfoHeader.setCustomerNameandTag(basicInfo.customer);
    this.view.generalInfoHeader.lblCustomerName.info =
      { "FirstName": basicInfo.customer.FirstName, "MiddleName": basicInfo.customer.MiddleName, "LastName": basicInfo.customer.LastName };

    this.view.row3.btnLink1.setVisibility(false);
    this.view.row3.lblData1.setVisibility(true);

    if (basicInfo.customer.CustomerType_id === adminUtils.AdminConsoleCommonUtils.constantConfig.PROSPECT_TYPE) {
      //Applicant flow
      var applicantAddrArr=basicInfo.customer.Addresses?basicInfo.customer.Addresses:[];
      var finalAddress = "";
      for(var i=0;i<applicantAddrArr.length;i++){
        if(applicantAddrArr[i].isPrimary){
          if (applicantAddrArr[i].AddressLine1) {
            finalAddress += applicantAddrArr[i].AddressLine1 + ", ";
          }
          if (applicantAddrArr[i].AddressLine2) {
            finalAddress += applicantAddrArr[i].AddressLine2 + "<br>";
          }
          finalAddress += applicantAddrArr[i].CityName + ", " + applicantAddrArr[i].RegionName + ", " +
            applicantAddrArr[i].CountryName + " " + applicantAddrArr[i].ZipCode;
        }
      }
      //Fill data for applicant
      //Row 1
      this.view.row1.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerCare.lblPhoneNumber");
      this.view.row1.lblData1.text = basicInfo.customer.Customer_id ? basicInfo.customer.PrimaryPhoneNumber : "Not Available";

      this.view.row1.lblHeading2.text = kony.i18n.getLocalizedString("i18n.LeadManagement.segmentheaderEmail");
      this.view.row1.lblData2.text = basicInfo.customer.Customer_id ? basicInfo.customer.PrimaryEmailAddress : "Not Available";

      this.view.row1.lblHeading3.text = kony.i18n.getLocalizedString("i18n.View.ADDRESS");
      this.view.row1.lblData3.text = finalAddress!=="" ? finalAddress : "Not Available";
      this.view.row1.lblData3.setVisibility(true);
      this.view.row1.btnLink3.setVisibility(false);
      this.view.row2.setVisibility(false);
      this.view.row3.setVisibility(false);
      this.view.row4.setVisibility(false);
      if(basicInfo.customer.isCustomerAccessiable === false){
        //this.view.dashboardCommonTab.btnLoans.setVisibility(false);
        //this.view.dashboardCommonTab.btnDeposits.setVisibility(false);
      }else{
        this.view.dashboardCommonTab.btnLoans.setVisibility(false);
        this.view.dashboardCommonTab.btnDeposits.setVisibility(true);
      }
      formInstance.view.tabs.btnTabName9.setVisibility(false);
    } else {
      // Customer flow
      this.view.row2.setVisibility(true);
      this.view.row3.setVisibility(true);
      this.view.row4.setVisibility(true);
      this.view.dashboardCommonTab.btnLoans.setVisibility(false);
      this.view.dashboardCommonTab.btnDeposits.setVisibility(true);
      //
      this.view.flxGeneralInfoEditButton.setVisibility(false);

      this.view.row1.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.User_ID_Cap");
      this.view.row1.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.MOBILE_ONLINE_BAKING_ACCESS");
      this.view.row1.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.RESET_PASSWORD");
      this.view.row1.lblData1.text = basicInfo.customer.Username ? basicInfo.customer.Username : "N/A";
      this.view.row1.btnLink3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SendLink");
      this.customerId = basicInfo.customer.Customer_id;
      
      if (basicInfo.customer.CustomerType_id === adminUtils.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE) {
        //Display Retail customer data
        this.displayRetailUserData(basicInfo, formInstance);
        if(formInstance.presenter.getSystemConfigurationsClient().length!==0)
          formInstance.view.tabs.btnTabName9.setVisibility(true);  
        else
          formInstance.view.tabs.btnTabName9.setVisibility(false);  
        formInstance.view.breadcrumbs.btnBackToMain.onClick = function () {
          var sourceFormDetails = formInstance.presenter.sourceFormNavigatedFrom();
           if(sourceFormDetails && sourceFormDetails.data && sourceFormDetails.name === 'frmLeadManagement') {
            if(sourceFormDetails.data.leadId) {
              var leadPayload = {
                "leadId": sourceFormDetails.data.leadId,
                "statusIds": sourceFormDetails.data.statusId
              };
              formInstance.presenter.navigateToLeadDetailsScreen(leadPayload);
            }
            else {
              formInstance.presenter.navigateToLeadScreen();
            }
          } //show customer search screen
          else {
            formInstance.presenter.displayCustomerMangementSearchForm();
          }         
        };
      } else if(basicInfo.customer.CustomerType_id === adminUtils.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE) {
        // Business user profile

        // After integrating with contracts the fields in retial user is similar to business user
        this.displayRetailUserData(basicInfo, formInstance);
        // this.displayBusinessUser(basicInfo, formInstance);
        
        formInstance.view.tabs.btnTabName9.setVisibility(false);
        formInstance.view.breadcrumbs.btnPreviousPage.onClick = function () {
          var sourceFormDetails = formInstance.presenter.sourceFormNavigatedFrom();
          
          if(sourceFormDetails ){
           
            var companyPayload = { "id": self.view.row3.btnLink1.info.id,
                                  "selectTab":1};
            formInstance.presenter.navigateToCompanyDetailsScreen(companyPayload);
          }
        };
      } else{
        //Combined user profile
        
        // After integrating with contracts the fields in retial user is similar to business user
        this.displayRetailUserData(basicInfo, formInstance);
        // this.displayCombinedUserData(basicInfo, formInstance);
        formInstance.view.tabs.btnTabName9.setVisibility(false);
      }
    }
    this.showGeneralInformationScreen(formInstance);

  },
  setClientProperties:function(successCallback,basicInfo,formInstance){
    const scopeObj = this;
      let configurationSvc = kony.sdk.getCurrentInstance().getConfigurationService();
      configurationSvc.getAllClientAppProperties(function(response) {
        if(response && response.SPOTLIGHT_DISABLE_SCA && response.SPOTLIGHT_DISABLE_SCA.toUpperCase()==="FALSE"){
          scopeObj.isSCADisabled = false;
        } else {
          scopeObj.isSCADisabled = true;
        }
        successCallback(basicInfo,formInstance);
      },function(){});
  },

  showScreenForSCAenabled:function(basicInfo,formInstance){
      this.view.row2.setVisibility(true);
      this.view.row3.setVisibility(true);
      this.view.row4.setVisibility(true);
      this.view.row4.lblOption1.setVisibility(false);
      this.view.row4.lblOption3.setVisibility(false);
      this.view.row1.lblData3.text = basicInfo.customer.Gender ? basicInfo.customer.Gender : "N/A"; 
      this.view.row2.lblData1.text = basicInfo.customer.DateOfBirth ? formInstance.getLocaleDate(basicInfo.customer.DateOfBirth) : "N/A";
      this.view.row2.lblData2.text = basicInfo.customer.MaritalStatus_name ? basicInfo.customer.MaritalStatus_name : "N/A";
      this.view.row2.lblData3.text = basicInfo.customer.SSN ? formInstance.AdminConsoleCommonUtils.maskSSN(basicInfo.customer.SSN) : "N/A";
      this.view.row3.lblData1.text = basicInfo.customer.EmployementStatus_name ? basicInfo.customer.EmployementStatus_name : "N/A";
      this.view.row3.lblData2.text = basicInfo.customer.IsStaffMember === "true" ?
      kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EMPLOYEE") :
      kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.NON_EMPLOYEE");
      this.view.row3.lblData3.text = basicInfo.customer.Customer_id;
      this.view.row4.lblData1.text = basicInfo.customer.CustomerSince ? formInstance.getLocaleDate(basicInfo.customer.CustomerSince) : "N/A";
      this.view.row4.lblData2.text = formInstance.AdminConsoleCommonUtils.getValidString(basicInfo.customer.Branch_code) + ", " + formInstance.AdminConsoleCommonUtils.getValidString(basicInfo.customer.Branch_name);
      //this.view.row4.lblData3.setVisibilty(false);
      this.view.row1.btnLink3.setVisibility(false);
      this.view.row1.lblData3.setVisibility(true);
      this.view.row1.lblHeading3.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.GENDER");
      this.view.row2.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.DATE_OF_BIRTH");
      this.view.row2.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.MARITAL_STATUS");
      this.view.row2.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SSN_HEADER");
      this.view.row3.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EMPLOYEMENT_STATUS");
      this.view.row3.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EMPLOYEE_NON_EMPLOYEE");
      this.view.row3.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID");
      this.view.row4.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_SINCE");
      this.view.row4.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.BRANCH_CODE_NAME");
      //this.view.row4.lblHeading3.setVisibilty(false);
    this.view.row4.flxColumn3.setVisibility(false);
      this.view.flxGeneralInfoCombinedDetail.setVisibility(false);
       if(basicInfo.customer.isProfileExist === "true" &&
         basicInfo.customer.CustomerStatus_id === formInstance.AdminConsoleCommonUtils.constantConfig.CUST_NEW){
        this.view.generalInfoHeader.flxNotification.setVisibility(true);
        this.view.generalInfoHeader.lblMessage.centerY="50%";
        this.view.generalInfoHeader.lblMessage.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ProfileIsNotYetActivated");
        this.view.generalInfoHeader.flxRightDetailsCont.setVisibility(false);
      } else{
        this.view.generalInfoHeader.flxNotification.setVisibility(false);
      }
  },
  displayRetailUserDatautility:function(basicInfo, formInstance){
    if(basicInfo.customer.isCustomerAccessiable === true){ 
	  // Has access
      //checking SCA Enabled or not 
      if(this.isSCADisabled===false&& basicInfo.customer.customerStatus==="SID_CUS_NEW"){
        this.showScreenForSCAenabled(basicInfo, formInstance);
       
      }
      else{
         if(this.isSCADisabled===false&& basicInfo.customer.customerStatus!=="SID_CUS_NEW"){
            this.view.row1.btnLink3.text ="Resend Activation Code";
        	this.view.row1.lblHeading3.text ="Resend Activation Code";
        	this.view.row1.btnLink3.setVisibility(true);
        	this.view.row1.lblData3.setVisibility(false);
         }
      var ssnVal = basicInfo.customer.SSN || basicInfo.customer.ssn;
      this.view.row2.setVisibility(true);
      this.view.row3.setVisibility(true);
      this.view.row4.setVisibility(true);
      this.view.row4.lblOption1.setVisibility(false);
      this.view.row4.lblOption3.setVisibility(false);
      this.view.row2.lblData1.text = basicInfo.customer.Gender ? basicInfo.customer.Gender : "N/A";
      this.view.row2.lblData2.text = basicInfo.customer.DateOfBirth ? formInstance.getLocaleDate(basicInfo.customer.DateOfBirth) : "N/A";
      this.view.row2.lblData3.text = basicInfo.customer.MaritalStatus_name ? basicInfo.customer.MaritalStatus_name : basicInfo.customer.MaritalStatus_id?basicInfo.customer.MaritalStatus_id:"N/A";
      this.view.row3.lblData1.text = ssnVal ? formInstance.AdminConsoleCommonUtils.maskSSN(ssnVal) : "N/A";
      this.view.row3.lblData2.text = basicInfo.customer.EmployementStatus_name ? basicInfo.customer.EmployementStatus_name : basicInfo.customer.EmployementStatus_id ?basicInfo.customer.EmployementStatus_id :"N/A" ;
      this.view.row3.lblData3.text = basicInfo.customer.IsStaffMember === "true" ?
      kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EMPLOYEE") :
      kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.NON_EMPLOYEE");
      this.view.row4.lblData1.text = basicInfo.customer.primaryCustomerId ? basicInfo.customer.primaryCustomerId : "N/A";
      this.view.row4.lblData2.text = basicInfo.customer.CustomerSince ? formInstance.getLocaleDate(basicInfo.customer.CustomerSince) : "N/A";
      this.view.row4.lblData3.text = formInstance.AdminConsoleCommonUtils.getValidString(basicInfo.customer.Branch_code) + ", " + formInstance.AdminConsoleCommonUtils.getValidString(basicInfo.customer.Branch_name);
      this.view.row2.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.GENDER");
      this.view.row2.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.DATE_OF_BIRTH");
      this.view.row2.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.MARITAL_STATUS");
      this.view.row3.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SSN_HEADER");
      this.view.row3.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EMPLOYEMENT_STATUS");
      this.view.row3.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EMPLOYEE_NON_EMPLOYEE");
      this.view.row4.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCompaniesController.primaryCustId");
      this.view.row4.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_SINCE");
      this.view.row4.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.BRANCH_CODE_NAME");
      this.view.row4.flxColumn3.setVisibility(true);
      this.view.flxGeneralInfoCombinedDetail.setVisibility(false);
    
	//show activation flag and link
      if(basicInfo.customer.isProfileExist === "true" &&
         basicInfo.customer.CustomerStatus_id === formInstance.AdminConsoleCommonUtils.constantConfig.CUST_NEW){
        this.view.generalInfoHeader.flxNotification.setVisibility(true);
        this.view.generalInfoHeader.lblMessage.centerY="50%";
        this.view.generalInfoHeader.lblMessage.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ProfileIsNotYetActivated");
        this.view.generalInfoHeader.flxRightDetailsCont.setVisibility(false);
      } else{
        this.view.generalInfoHeader.flxNotification.setVisibility(false);
      }
      }
	}else{
      //Does not have access
      this.setCustomerBasicDataForNoAccessProfile(basicInfo, formInstance);
    }
  },
  showScreenForSCAenabledforBusiness:function(basicInfo,formInstance,eagreementStatus){
      var ssnVal = basicInfo.customer.SSN || basicInfo.customer.ssn;
      this.view.row3.btnLink1.setVisibility(true);
      this.view.row3.lblData1.setVisibility(false);
      this.view.row3.btnLink1.skin = "sknBtnFont11ABEBSz13px";
      this.view.row4.lblOption1.setVisibility(false);
      this.view.row4.lblOption3.setVisibility(false);
      this.view.row1.btnLink3.setVisibility(false);
      this.view.row1.lblData3.setVisibility(true);
      this.view.row1.lblData3.text=basicInfo.customer.DateOfBirth ? formInstance.getLocaleDate(basicInfo.customer.DateOfBirth) : "N/A";
      this.view.row2.lblData1.text = ssnVal ? formInstance.AdminConsoleCommonUtils.maskSSN(ssnVal) : "N/A";
      this.view.row2.lblData2.text = basicInfo.customer.IsStaffMember === "true" ?
      kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EMPLOYEE") :
      kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.NON_EMPLOYEE");
      this.view.row2.lblData3.text = basicInfo.customer.organisation_name ? basicInfo.customer.organisation_name : "N/A";
      this.view.row3.btnLink1.text = basicInfo.customer.Customer_Role ? basicInfo.customer.Customer_Role : "N/A";
      this.view.row3.lblData2.text = formInstance.AdminConsoleCommonUtils.getValidString(basicInfo.customer.Branch_code) + ", " + formInstance.AdminConsoleCommonUtils.getValidString(basicInfo.customer.Branch_name);
      this.view.row3.lblData3.text = basicInfo.customer.Customer_id;
      this.view.row4.lblData1.text = basicInfo.customer.CustomerSince ? formInstance.getLocaleDate(basicInfo.customer.CustomerSince) : "N/A";
      this.view.row4.lblData2.text = eagreementStatus ? eagreementStatus : "N/A";
      this.view.row4.flxColumn3.setVisibility(false);
      this.view.row1.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.DATE_OF_BIRTH");
      this.view.row2.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SSN_HEADER");
      this.view.row2.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EMPLOYEE_NON_EMPLOYEE");
      this.view.row2.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Profile_COMPANY");
      this.view.row3.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Profile_ROLE");
      this.view.row3.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.BRANCH_CODE_NAME");
      this.view.row3.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID");
      this.view.row4.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_SINCE");
      this.view.row4.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Profile_Eagreement");
      this.view.flxGeneralInfoCombinedDetail.setVisibility(false);
  },
  displayRetailUserData: function(basicInfo, formInstance){
    // Check if the current logged-in interuser has access to the current customer
    this.setClientProperties(this.displayRetailUserDatautility.bind(this),basicInfo, formInstance);
    
  },
  displayBusinessUserDatautility: function(basicInfo,formInstance){
    var eagreementStatus = null;
    if (basicInfo.customer.isEAgreementRequired === "0") {
      eagreementStatus = kony.i18n.getLocalizedString("i18n.customermanagement.eSignNotRequired");
    } else if (basicInfo.customer.isEagreementSigned === "true") {
      eagreementStatus = kony.i18n.getLocalizedString("i18n.customermanagement.eSigned");
    } else if (basicInfo.customer.isEagreementSigned === "false") {
      eagreementStatus = kony.i18n.getLocalizedString("i18n.customermanagement.NotSigned");
    }
    
    var organizationName = basicInfo.customer.organisation_name ? basicInfo.customer.organisation_name.toUpperCase() : "N/A";
    this.setBreadCrumbsText([kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SEARCHCUSTOMERS"), 
    organizationName, this.view.generalInfoHeader.lblCustomerName.text.toUpperCase()], formInstance);
    this.view.row3.btnLink1.info = { "id": basicInfo.customer.organisation_id };
    if(basicInfo.customer.isCustomerAccessiable === true){
      //Has access
      if(this.isSCADisabled===false){
        this.showScreenForSCAenabledforBusiness(basicInfo, formInstance, eagreementStatus);
      }
      this.view.row3.btnLink1.setVisibility(true);
      this.view.row3.lblData1.setVisibility(false);
      this.view.row3.btnLink1.skin = "sknBtnFont11ABEBSz13px";
      this.view.row4.lblOption1.setVisibility(false);
      this.view.row4.lblOption3.setVisibility(false);

      this.view.row2.lblData1.text = basicInfo.customer.DateOfBirth ? formInstance.getLocaleDate(basicInfo.customer.DateOfBirth) : "N/A";
      this.view.row2.lblData2.text = basicInfo.customer.SSN ? formInstance.AdminConsoleCommonUtils.maskSSN(basicInfo.customer.SSN) : "N/A";
      this.view.row2.lblData3.text = basicInfo.customer.IsStaffMember === "true" ?
      kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EMPLOYEE") :
      kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.NON_EMPLOYEE");
      this.view.row3.btnLink1.text = basicInfo.customer.organisation_name ? basicInfo.customer.organisation_name : "N/A";
      this.view.row3.lblData2.text = basicInfo.customer.Customer_Role ? basicInfo.customer.Customer_Role : "N/A";
      this.view.row3.lblData3.text = formInstance.AdminConsoleCommonUtils.getValidString(basicInfo.customer.Branch_code) + ", " + formInstance.AdminConsoleCommonUtils.getValidString(basicInfo.customer.Branch_name);
      this.view.row4.lblData1.text = basicInfo.customer.primaryCustomerId ? basicInfo.customer.primaryCustomerId : "N/A";
      this.view.row4.lblData2.text = basicInfo.customer.CustomerSince ? formInstance.getLocaleDate(basicInfo.customer.CustomerSince) : "N/A";
      this.view.row4.lblData3.text = eagreementStatus ? eagreementStatus : "N/A";
      this.view.row2.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.DATE_OF_BIRTH");
      this.view.row2.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SSN_HEADER");
      this.view.row2.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EMPLOYEE_NON_EMPLOYEE");
      this.view.row3.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Profile_COMPANY");
      this.view.row3.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Profile_ROLE");
      this.view.row3.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.BRANCH_CODE_NAME");
      this.view.row4.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCompaniesController.primaryCustId");
      this.view.row4.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_SINCE");
      this.view.row4.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Profile_Eagreement");
      this.view.flxGeneralInfoCombinedDetail.setVisibility(false);
    }else{
      //Does not have access
      this.setCustomerBasicDataForNoAccessProfile(basicInfo, formInstance);
    }

  },
  displayBusinessUser: function(basicInfo, formInstance){
    this.setClientProperties(this.displayBusinessUserDatautility.bind(this),basicInfo, formInstance);
    
  },
  displayCombinedUserData: function(basicInfo, formInstance){
    // Check if the current logged-in interuser has access to the current customer
    if(basicInfo.customer.isCustomerAccessiable === true){
      // Has access
      this.view.row2.setVisibility(true);
      this.view.row3.setVisibility(true);
      this.view.row4.setVisibility(true);
      this.view.row4.lblOption1.setVisibility(true);
      this.view.row4.lblOption3.setVisibility(true);
      this.view.row4.lblOption1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementProfile.TypeRetail");
      this.view.row4.lblOption3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementProfile.TypeRetail");
      this.view.row2.lblData1.text = basicInfo.customer.Gender ? basicInfo.customer.Gender : "N/A";
      this.view.row2.lblData2.text = basicInfo.customer.DateOfBirth ? formInstance.getLocaleDate(basicInfo.customer.DateOfBirth) : "N/A";
      this.view.row2.lblData3.text = basicInfo.customer.MaritalStatus_name ? basicInfo.customer.MaritalStatus_name : basicInfo.customer.MaritalStatus_id?basicInfo.customer.MaritalStatus_id:"N/A";
      this.view.row3.lblData1.text = basicInfo.customer.SSN ? formInstance.AdminConsoleCommonUtils.maskSSN(basicInfo.customer.SSN) : "N/A";
      this.view.row3.lblData2.text = basicInfo.customer.EmployementStatus_name ? basicInfo.customer.EmployementStatus_name : basicInfo.customer.EmployementStatus_id ?basicInfo.customer.EmployementStatus_id :"N/A" ;
      this.view.row3.lblData3.text = basicInfo.customer.IsStaffMember === "true" ?
        kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EMPLOYEE") :
      kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.NON_EMPLOYEE");
      this.view.row4.lblData1.text = basicInfo.customer.primaryCustomerId ? basicInfo.customer.primaryCustomerId : "N/A";
      this.view.row4.lblData2.text = basicInfo.customer.CustomerSince ? formInstance.getLocaleDate(basicInfo.customer.CustomerSince) : "N/A";
      this.view.row4.lblData3.text = formInstance.AdminConsoleCommonUtils.getValidString(basicInfo.customer.Branch_code) + ", " + formInstance.AdminConsoleCommonUtils.getValidString(basicInfo.customer.Branch_name);
      this.view.row2.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.GENDER");
      this.view.row2.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.DATE_OF_BIRTH");
      this.view.row2.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.MARITAL_STATUS");
      this.view.row3.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SSN_HEADER");
      this.view.row3.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EMPLOYEMENT_STATUS");
      this.view.row3.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EMPLOYEE_NON_EMPLOYEE");
      this.view.row4.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCompaniesController.primaryCustId");
      this.view.row4.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_SINCE");
      this.view.row4.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.BRANCH_CODE_NAME");
      
      var eagreementStatus = null;
      if (basicInfo.customer.isEAgreementRequired === "0") {
        eagreementStatus = kony.i18n.getLocalizedString("i18n.customermanagement.eSignNotRequired");
      } else if (basicInfo.customer.isEagreementSigned === "true") {
        eagreementStatus = kony.i18n.getLocalizedString("i18n.customermanagement.eSigned");
      } else if (basicInfo.customer.isEagreementSigned === "false") {
        eagreementStatus = kony.i18n.getLocalizedString("i18n.customermanagement.NotSigned");
      }
      this.view.flxGeneralInfoCombinedDetail.setVisibility(true);
      this.view.companyRow1.btnLink2.skin = "sknBtnFont11ABEBSz13px";
      this.view.companyRow1.btnLink2.setVisibility(true);
      this.view.companyRow1.lblData2.setVisibility(false);
      this.view.companyRow1.lblHeading1.text = "COMPANY ID";
      this.view.companyRow1.lblHeading2.text = "COMPANY NAME";
      this.view.companyRow1.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Profile_Eagreement");
      this.view.companyRow1.lblData1.text = basicInfo.customer.organisation_id;
      this.view.companyRow1.btnLink2.text = basicInfo.customer.organisation_name;
      this.view.companyRow1.btnLink2.info = { "id": basicInfo.customer.organisation_id };
      this.view.companyRow1.lblData3.text = eagreementStatus ? eagreementStatus : "N/A";
    }else{
      //Does not have access
      this.setCustomerBasicDataForNoAccessProfile(basicInfo, formInstance);
    }
  },
  setCustomerBasicDataForNoAccessProfile: function(basicInfo, formInstance){
     //Hide last three rows
    this.view.row2.setVisibility(false);
    this.view.row3.setVisibility(false);
    this.view.row4.setVisibility(false);
    this.view.flxGeneralInfoCombinedDetail.setVisibility(false);
    
    //Hide Loans and Deposits tabs
    //this.view.dashboardCommonTab.btnLoans.setVisibility(false);
    //this.view.dashboardCommonTab.btnDeposits.setVisibility(false);
    
    this.view.row1.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EMPLOYEE_NON_EMPLOYEE");
    this.view.row1.lblData2.setVisibility(true);
    this.view.row1.btnLink2.setVisibility(false);
    this.view.row1.lblData2.text = basicInfo.customer.IsStaffMember === "true" ?
      kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EMPLOYEE") :
      kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.NON_EMPLOYEE");
    //show activation link flag for enrolled-not activated user
    if(basicInfo.customer.isProfileExist === "true" &&
       basicInfo.customer.CustomerStatus_id === formInstance.AdminConsoleCommonUtils.constantConfig.CUST_NEW){
      this.view.generalInfoHeader.flxNotification.setVisibility(true);
      this.view.generalInfoHeader.lblMessage.centerY="50%";
      this.view.generalInfoHeader.lblMessage.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ProfileIsNotYetActivated");
      this.view.generalInfoHeader.flxRightDetailsCont.setVisibility(false);
    } else{
      this.view.generalInfoHeader.flxNotification.setVisibility(false);
    }

  },
  setLockStatus: function (status, formInstance,linkDelinkConfig) {
    var customerType = null;
    this.view.generalInfoHeader.lblStatus.info = { "value": status };
    if (this.view.generalInfoHeader.flxDefaultSearchHeader.info && this.view.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id) {
      customerType = this.view.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id;
    }
    if (status === "LOCKED") {
      this.handleLockedUserLockStatus(customerType, formInstance);
    } else if (status === "SUSPENDED") {
      this.handleSuspendedUserLockStatus(customerType, formInstance);
    } else if (status === "NEW") {
      this.handleNewUserLockStatus(customerType, formInstance);
    } else if (status === "INACTIVE"){
      this.handleInactiveUserLockStatus(customerType, formInstance);
    } else {
      this.handleActiveUserLockStatus(customerType, formInstance);
    }
    this.setEnrollmentAccessandStatus(status, formInstance);
    formInstance.view.forceLayout();
  },
  setEnrollmentAccessandStatus: function (status, formInstance) {
    this.checkandHideResetPassword(status);
    if(formInstance.presenter.getCurrentCustomerDetails().isCustomerAccessiable === false){
      return;
    }
    if (this.view.row1.btnLink2.info) {
      this.view.row1.btnLink2.info.emailSentCtr++;
    } else {
      this.view.row1.btnLink2.info = { "emailSentCtr": 1 };
    }
    if (!status) {
      status = this.view.generalInfoHeader.lblStatus.info.value;
    }
    this.view.row1.lblData2.text = "";

    if (status === "ACTIVE") {
      this.view.row1.lblData2.text += kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Enrolled");
      this.view.row1.lblData2.setVisibility(true);
      this.view.row1.btnLink2.setVisibility(false);
      this.view.row1.lblData2.onHover = null;

    } else if (status === "LOCKED" || status === "SUSPENDED") {

      if (this.view.row1.btnLink2.info && this.view.row1.btnLink2.info.emailSentCtr > 0
          && this.view.row1.btnLink2.info.emailSentCtr < 3) {
        this.view.row1.lblData2.text += kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.resendEnrollmentLink");
      } else {
        this.view.row1.lblData2.text += kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.sendEnrollmentLink");
      }
      this.view.row1.lblData2.setVisibility(true);
      this.view.row1.btnLink2.setVisibility(false);

      this.view.row1.lblData2.onHover = function (widget, context) {
        if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
          formInstance.view.EnrolToolTip.setVisibility(true);
          formInstance.view.forceLayout();
        } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
          formInstance.view.EnrolToolTip.setVisibility(false);
          formInstance.view.forceLayout();
        }
      };
    } else if (status === "NEW") {
     /* if (this.view.row1.btnLink2.info && this.view.row1.btnLink2.info.emailSentCtr > 0
          && this.view.row1.btnLink2.info.emailSentCtr < 3) {
        this.view.row1.btnLink2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.resendEnrollmentLink");
        this.view.row1.lblData2.setVisibility(false);
        this.view.row1.btnLink2.setVisibility(true);

      } else {
        this.view.row1.btnLink2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.sendEnrollmentLink");
        this.view.row1.lblData2.setVisibility(false);
        this.view.row1.btnLink2.setVisibility(true);
      }*/
      this.view.row1.lblData2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Enrolled");
      this.view.row1.lblData2.setVisibility(true);
      this.view.row1.btnLink2.setVisibility(false);
      this.view.row1.lblData2.onHover = null;
    }
  },
  checkandHideResetPassword: function (status) {
    if (status === "NEW") {
      this.view.row1.flxColumn3.setVisibility(true);
      this.view.row1.lblData3.text = kony.i18n.getLocalizedString("i18n.Applications.NA");
      this.view.row1.btnLink3.setVisibility(false);
      this.view.row1.lblData3.setVisibility(true);
    } else {
      this.view.row1.flxColumn3.setVisibility(true);
    }
  },
  handleLockedUserLockStatus: function (customerType, formInstance) {
    this.view.generalInfoHeader.handleLockedUserStatus(customerType, formInstance);
    this.view.row1.btnLink3.setVisibility(true);
    this.view.row1.lblData3.setVisibility(false);
    this.view.row1.lblData3.onHover = null;
  },

  handleSuspendedUserLockStatus: function (customerType, formInstance) {
    this.view.generalInfoHeader.handleSuspendedUserStatus(customerType, formInstance);
    this.view.row1.lblData3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SendLink");
    this.view.row1.lblData3.setVisibility(true);
    this.view.row1.btnLink3.setVisibility(false);
    this.view.row1.lblData3.onHover = function (widget, context) {
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
        formInstance.view.ResetPasswordToolTip.setVisibility(true);
        formInstance.view.forceLayout();
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        formInstance.view.ResetPasswordToolTip.setVisibility(false);
        formInstance.view.forceLayout();
      }
    };
  },

  handleNewUserLockStatus: function (customerType, formInstance) {
    this.view.generalInfoHeader.handleNewUserStatus(customerType, formInstance);
    this.view.row1.lblData3.onHover = null;
    this.view.row1.lblData3.setVisibility(true);
    this.view.row1.btnLink3.setVisibility(false);
  },

  handleActiveUserLockStatus: function (customerType, formInstance) {
    this.view.generalInfoHeader.handleActiveUserStatus(customerType, this.isAssistConsented, formInstance);
    this.view.row1.btnLink3.setVisibility(true);
    this.view.row1.lblData3.setVisibility(false);
    this.view.row1.lblData3.onHover = null;
  },

  handleInactiveUserLockStatus: function (customerType, formInstance) {
    this.view.generalInfoHeader.handleInactiveUserStatus(customerType, formInstance);
  },

  fillSalutation: function () {
    var data = [];
    data.push(["lbl1", kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Select_Salutation")]);
    data.push(["Mr", kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Mr")]);
    data.push(["Mrs", "Mrs."]);
    data.push(["Dr", "Dr."]);
    data.push(["Ms", "Ms."]);
    this.view.EditGeneralInfo.lstboxDetails1.masterData = data; 
    this.view.EditGeneralInfo.lstboxDetails1.selectedKey = "lbl1";
    this.view.EditGeneralInfo.lstBoxEditDetails11.masterData = data;
    this.view.EditGeneralInfo.lstBoxEditDetails11.selectedKey = "lbl1";
  },
  computeandSetToolTipHeight: function (formInstance) {
    var defaultEnrolEmailHeight = 210;
    var defaultResetPasswordHeight = 210;
    var heightToAdd = 0;
    if (this.view.alertMessage.isVisible) {
      heightToAdd += parseInt(this.view.alertMessage.height.slice(0, 2)) + 15;
    } else {
      heightToAdd += 15;
    }
    if (this.view.generalInfoHeader.flxRiskStatus.isVisible) {
      heightToAdd += parseInt(this.view.generalInfoHeader.flxRiskStatus.height.slice(0, 2));
    }
    if (this.view.flxTabWrapper.isVisible) {
      heightToAdd += parseInt(this.view.flxTabWrapper.height.slice(0, 2));
    }

    formInstance.view.EnrolToolTip.top = defaultEnrolEmailHeight + heightToAdd + "px";
    formInstance.view.EnrolToolTip.right = "420px";
    formInstance.view.ResetPasswordToolTip.top = defaultResetPasswordHeight + heightToAdd + "px";
  },
  showGeneralInformationScreen: function (formInstance) {
    formInstance.view.flxMainContent.setVisibility(true);
    formInstance.view.flxGeneralInformationWrapper.setVisibility(true);
    formInstance.view.flxGeneralInfoWrapper.flxEditGeneralInformation.setVisibility(false);
    formInstance.view.flxGeneralInfoWrapper.flxViewGeneralInformation.setVisibility(true);
    formInstance.view.flxOtherInfoWrapper.setVisibility(true);
    formInstance.view.btnNotes.setVisibility(false); 
    var custType = formInstance.presenter.getCurrentCustomerType();
    if (custType === adminUtils.AdminConsoleCommonUtils.constantConfig.PROSPECT_TYPE) {
      formInstance.view.flxOtherInfoWrapper.setVisibility(false);
      this.view.flxGeneralInfoEditButton.setVisibility(false);
      this.view.generalInfoHeader.flxActionButtons.setVisibility(false);
    } else {
      formInstance.view.flxOtherInfoWrapper.setVisibility(true);
      this.view.generalInfoHeader.flxActionButtons.setVisibility(true);
      if(formInstance.presenter.getCurrentCustomerDetails().isCustomerAccessiable === true){
        this.view.flxGeneralInfoEditButton.setVisibility(true);
      }else{
        this.view.flxGeneralInfoEditButton.setVisibility(false);
      }      
    }

    var sourceFormDetails = formInstance.presenter.sourceFormNavigatedFrom();

    if(sourceFormDetails.data && sourceFormDetails.data.breadcrumbValue) {
      if(sourceFormDetails.data && sourceFormDetails.data.breadcrumbValue &&
         sourceFormDetails.data.breadcrumbValue.length == 2 && sourceFormDetails.data.previousPageCallBack ){
        this.setBreadCrumbsTextAndAction([sourceFormDetails.data.breadcrumbValue[0] ,sourceFormDetails.data.breadcrumbValue[1] , this.view.generalInfoHeader.lblCustomerName.text.toUpperCase()], formInstance , sourceFormDetails.data.previousPageCallBack);          
      }else{
        this.setBreadCrumbsText([sourceFormDetails.data.breadcrumbValue, this.view.generalInfoHeader.lblCustomerName.text.toUpperCase()], formInstance);          
      }      
    }
    else {
      // the below breadcrumb is used for retail and business and combined users
      this.setBreadCrumbsText([kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SEARCHCUSTOMERS"), this.view.generalInfoHeader.lblCustomerName.text.toUpperCase()], formInstance);
    }
  },
  setBreadCrumbsTextAndAction: function (textArray, formInstance , previousPageCallBack) {
    if (textArray.length === 2) {
      formInstance.view.breadcrumbs.btnBackToMain.text = textArray[0];
      formInstance.view.breadcrumbs.btnPreviousPage.setVisibility(false);
      formInstance.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
      formInstance.view.breadcrumbs.lblCurrentScreen.text = textArray[1];
    } else if (textArray.length === 3) {
      formInstance.view.breadcrumbs.btnBackToMain.text = textArray[0];
      formInstance.view.breadcrumbs.btnPreviousPage.setVisibility(true);
      formInstance.view.breadcrumbs.btnPreviousPage.onClick = previousPageCallBack;
      formInstance.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(true);
      formInstance.view.breadcrumbs.btnPreviousPage.text = textArray[1];
      formInstance.view.breadcrumbs.lblCurrentScreen.text = textArray[2];
    }
    formInstance.customNavigateBack = null;
    formInstance.view.flxBreadCrumbs.setVisibility(true);
  },
  setBreadCrumbsText: function (textArray, formInstance) {
    if (textArray.length === 2) {
      formInstance.view.breadcrumbs.btnBackToMain.text = textArray[0];
      formInstance.view.breadcrumbs.btnPreviousPage.setVisibility(false);
      formInstance.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
      formInstance.view.breadcrumbs.lblCurrentScreen.text = textArray[1];
    } else if (textArray.length === 3) {
      formInstance.view.breadcrumbs.btnBackToMain.text = textArray[0];
      formInstance.view.breadcrumbs.btnPreviousPage.setVisibility(true);
      formInstance.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(true);
      formInstance.view.breadcrumbs.btnPreviousPage.text = textArray[1];
      formInstance.view.breadcrumbs.lblCurrentScreen.text = textArray[2];
    }
    formInstance.customNavigateBack = null;
    formInstance.view.flxBreadCrumbs.setVisibility(true);
  },

  showEditGeneralInformationScreen: function (formInstance) {
    formInstance.view.flxBreadCrumbs.setVisibility(true);
    formInstance.view.flxMainContent.setVisibility(true);
    formInstance.view.flxGeneralInfoWrapper.flxEditGeneralInformation.setVisibility(true);
    formInstance.view.flxGeneralInfoWrapper.flxViewGeneralInformation.setVisibility(false);
    formInstance.view.flxOtherInfoWrapper.setVisibility(false);
  },
  setFlowActionsForGeneralInformationComponent: function (formInstance) {
    var scopeObj = this;
    formInstance.view.breadcrumbs.btnBackToMain.onClick = function () {
      formInstance.presenter.getSearchInputs();
    };
    this.view.row3.btnLink1.onClick = function () {
      var payload = { "id": scopeObj.view.row3.btnLink1.info.id,
                      "selectTab":1};
      formInstance.presenter.navigateToCompanyDetailsScreen(payload);
    };
    this.view.companyRow1.btnLink2.onClick = function () {
      var payload = { "id": scopeObj.view.companyRow1.btnLink2.info.id,
                      "selectTab":1};
      formInstance.presenter.navigateToCompanyDetailsScreen(payload);
    };
    this.view.flxGMHeader.onClick = function () {
      scopeObj.toggleGeneralInfoTab();
    };
    this.view.flxGeneralInfoEditButton.onClick = function (event) {
      var eventId = event ? event.id : "";
      // var customerTypeId=formInstance.presenter.getCurrentCustomerType();
      // retial and business user edit remains same
      formInstance.presenter.getStatusGroup();

      //show profile edit screen
      // if(eventId === "flxGeneralInfoEditButton" &&
      //    customerTypeId !== adminUtils.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
      //   formInstance.presenter.getStatusGroup();
      // }
      // //show business user edit screen
      // else if(customerTypeId.indexOf(adminUtils.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE) >= 0 || eventId === ""){
      //   var custBasicInfo=formInstance.presenter.getCurrentCustomerDetails();
      //   var statusKeys = custBasicInfo.CustomerFlag_ids ? custBasicInfo.CustomerFlag_ids.split(",") : custBasicInfo.CustomerFlag_ids;
      //   var isAuthSignatory = false;
      //   if(custBasicInfo.customerbusinesstype && (custBasicInfo.customerbusinesstype.length > 0)){
      //     isAuthSignatory = (custBasicInfo.customerbusinesstype[0].SignatoryType_id && custBasicInfo.customerbusinesstype[0].SignatoryType_id !== "") ? true : false;
      //   } else if(custBasicInfo.isAuthorizedSignatory){
      //     isAuthSignatory = custBasicInfo.isAuthorizedSignatory === "true" ? true : false;
      //   }
      //   var editCustomerInputs={
      //     "id": custBasicInfo.Customer_id || "",
      //     "DateOfBirth": custBasicInfo.DateOfBirth || "",
      //     "DrivingLicenseNumber": custBasicInfo.DrivingLicenseNumber || "",
      //     "FirstName":custBasicInfo.FirstName || "",
      //     "LastName": custBasicInfo.LastName || "",
      //     "MiddleName":custBasicInfo.MiddleName || "",
      //     "Ssn": custBasicInfo.SSN || "",
      //     "UserName": custBasicInfo.Username || "",
      //     "role_name": custBasicInfo.Customer_Role || "",
      //     "Group_id": custBasicInfo.Customer_RoleId || "",
      //     "status": custBasicInfo.CustomerStatus_id || "",
      //     "Email": (custBasicInfo.PrimaryEmailAddress || custBasicInfo.BusinessPrimaryEmailAddress) || "",
      //     "Phone": (custBasicInfo.PrimaryPhoneNumber || custBasicInfo.BusinessPrimaryPhoneNumber)|| "",
      //     "customerFlags":statusKeys || "",
      //     "employementStatus":custBasicInfo.EmployementStatus_id || "",
      //     "isEAgreementRequired":custBasicInfo.isEAgreementRequired || "",
      //     "isEagreementSigned":custBasicInfo.isEagreementSigned || "",
      //     "Salutation":custBasicInfo.Salutation || "",
      //     "inAuthorizedSignatoriesUi": isAuthSignatory,
      //     "isAccountCentricConfig":true,
      //     "company": {
      //       "UserName": custBasicInfo.Username || "",
      //       "id": custBasicInfo.organisation_id,
      //       "Name": custBasicInfo.organisation_name,
      //       "TypeId":customerTypeId,// "TYPE_ID_MICRO_BUSINESS",
      //       "businessTypeId": custBasicInfo.BusinessType_id || ""
      //     }
      //   };
      //   if(custBasicInfo.isCombinedUser === "true"){
      //     editCustomerInputs.inAuthorizedSignatoriesUi = true;
      //   }
      //   var formName = formInstance.view.id;
      //   if(formName === "frmCustomerProfileRoles"){
      //     formInstance.presenter.showCompaniesCustomerEdit(editCustomerInputs, {"selectTab":"ROLES"});
      //   } else if(formName === "frmCustomerProfileEntitlements"){
      //     //option to select features tab or other features tab
      //     var subTab = (formInstance.view.flxRoleFeatureAndActions.isVisible === true) ? 1 : 2;
      //     formInstance.presenter.showCompaniesCustomerEdit(editCustomerInputs, {"selectTab":"FEATURES",
      //                                                                           "subTab":subTab});
      //   } else if(formName === "frmCustomerProfileAccounts"){
      //     formInstance.presenter.showCompaniesCustomerEdit(editCustomerInputs, {"selectTab":"ACCOUNTS"});
      //   } else {
      //     formInstance.presenter.showCompaniesCustomerEdit(editCustomerInputs, {"selectTab":"DETAILS"});
      //   }
      // }   
    };
    this.view.editButtons.btnSave.onClick = function () {
      var custTypeArr = scopeObj.customerType.split(",");
      if (custTypeArr.length === 1 && scopeObj.validateBasicEditInfo()) {
        scopeObj.callEditCustomerBasicInfo(formInstance);
      } else if(custTypeArr.length > 1 && scopeObj.validDateEditBasicDetailsCombined()){
        scopeObj.callEditCustomerBasicInfoCombined(formInstance);
      }
    };
    this.view.EditGeneralInfo.lstboxDetails1.onSelection = function () {
      scopeObj.view.EditGeneralInfo.lstboxDetails1.skin = "sknlstbxNormal0f9abd8e88aa64a";
      scopeObj.view.EditGeneralInfo.lblError1.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.EditGeneralInfo.lstboxDetails2.onSelection = function () {
      scopeObj.view.EditGeneralInfo.lstboxDetails2.skin = "sknlstbxNormal0f9abd8e88aa64a";
      scopeObj.view.EditGeneralInfo.lblError2.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.EditGeneralInfo.lstboxDetails3.onSelection = function () {
      scopeObj.view.EditGeneralInfo.lstboxDetails3.skin = "sknlstbxNormal0f9abd8e88aa64a";
      scopeObj.view.EditGeneralInfo.lblError3.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.EditGeneralInfo.lstboxDetails4.onSelection = function () {
      scopeObj.view.EditGeneralInfo.lstboxDetails4.skin = "sknlstbxNormal0f9abd8e88aa64a";
      scopeObj.view.EditGeneralInfo.lblError4.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.EditGeneralInfo.lstBoxEditDetails11.onSelection = function(){
      if(scopeObj.view.EditGeneralInfo.lstBoxEditDetails11.selectedKey !== "lbl1"){
        scopeObj.view.EditGeneralInfo.lstBoxEditDetails11.skin = "sknLbxborderd7d9e03pxradius";
        scopeObj.view.EditGeneralInfo.flxInlineError11.setVisibility(false);
      }
    };
    this.view.EditGeneralInfo.lstBoxEditDetails31.onSelection = function(){
      if(scopeObj.view.EditGeneralInfo.lstBoxEditDetails31.selectedKey !== "lbl1"){
        scopeObj.view.EditGeneralInfo.lstBoxEditDetails31.skin = "sknLbxborderd7d9e03pxradius";
        scopeObj.view.EditGeneralInfo.flxInlineError31.setVisibility(false);
      }
    };
    this.view.EditGeneralInfo.lstBoxEditDetails33.onSelection = function(){
      if(scopeObj.view.EditGeneralInfo.lstBoxEditDetails33.selectedKey !== "lbl1"){
        scopeObj.view.EditGeneralInfo.lstBoxEditDetails33.skin = "sknLbxborderd7d9e03pxradius";
        scopeObj.view.EditGeneralInfo.flxInlineError33.setVisibility(false);
      }
    };
    this.view.backToGeneralInformation.btnBack.onClick = function () {
      scopeObj.showGeneralInformationScreen(formInstance);
      scopeObj.view.forceLayout();
    };
    this.view.editButtons.btnCancel.onClick = function () {
      scopeObj.showGeneralInformationScreen(formInstance);
      scopeObj.view.forceLayout();
    };
    this.view.backToGeneralInformation.flxBack.onClick = function () {
      scopeObj.showGeneralInformationScreen(formInstance);
      scopeObj.view.forceLayout();
    };
    this.view.EditGeneralInfo.flxFlag1.onClick = function () {
      if (scopeObj.view.EditGeneralInfo.imgFlag1.src === formInstance.AdminConsoleCommonUtils.checkbox) {
        scopeObj.view.EditGeneralInfo.imgFlag1.src = formInstance.AdminConsoleCommonUtils.checkboxSelected;
      } else {
        scopeObj.view.EditGeneralInfo.imgFlag1.src = formInstance.AdminConsoleCommonUtils.checkbox;
      }
    };
    this.view.EditGeneralInfo.flxFlag2.onClick = function () {
      if (scopeObj.view.EditGeneralInfo.imgFlag2.src === formInstance.AdminConsoleCommonUtils.checkbox) {
        scopeObj.view.EditGeneralInfo.imgFlag2.src = formInstance.AdminConsoleCommonUtils.checkboxSelected;
      } else {
        scopeObj.view.EditGeneralInfo.imgFlag2.src = formInstance.AdminConsoleCommonUtils.checkbox;
      }
    };
    this.view.EditGeneralInfo.flxFlag3.onClick = function () {
      if (scopeObj.view.EditGeneralInfo.imgFlag3.src === formInstance.AdminConsoleCommonUtils.checkbox) {
        scopeObj.view.EditGeneralInfo.imgFlag3.src = formInstance.AdminConsoleCommonUtils.checkboxSelected;
      } else {
        scopeObj.view.EditGeneralInfo.imgFlag3.src = formInstance.AdminConsoleCommonUtils.checkbox;
      }
    };
     this.view.EditGeneralInfo.flxFlagCheckbox1.onClick = function () {
      if (scopeObj.view.EditGeneralInfo.imgFlagCheckbox1.src === formInstance.AdminConsoleCommonUtils.checkbox) {
        scopeObj.view.EditGeneralInfo.imgFlagCheckbox1.src = formInstance.AdminConsoleCommonUtils.checkboxSelected;
      } else {
        scopeObj.view.EditGeneralInfo.imgFlagCheckbox1.src = formInstance.AdminConsoleCommonUtils.checkbox;
      }
    };
    this.view.EditGeneralInfo.flxFlagCheckbox2.onClick = function () {
      if (scopeObj.view.EditGeneralInfo.imgFlagCheckbox2.src === formInstance.AdminConsoleCommonUtils.checkbox) {
        scopeObj.view.EditGeneralInfo.imgFlagCheckbox2.src = formInstance.AdminConsoleCommonUtils.checkboxSelected;
      } else {
        scopeObj.view.EditGeneralInfo.imgFlagCheckbox2.src = formInstance.AdminConsoleCommonUtils.checkbox;
      }
    };
    this.view.EditGeneralInfo.flxFlagCheckbox3.onClick = function () {
      if (scopeObj.view.EditGeneralInfo.imgFlagCheckbox3.src === formInstance.AdminConsoleCommonUtils.checkbox) {
        scopeObj.view.EditGeneralInfo.imgFlagCheckbox3.src = formInstance.AdminConsoleCommonUtils.checkboxSelected;
      } else {
        scopeObj.view.EditGeneralInfo.imgFlagCheckbox3.src = formInstance.AdminConsoleCommonUtils.checkbox;
      }
    };
    this.view.row1.btnLink2.onClick = function () {
      //set emails
      var emails = (formInstance.presenter.getCurrentCustomerContactInfo()).Emails;
      var emailLst = [];
      for (var i = 0; i < emails.length; i++) {
        if (emails[i].isPrimary === "true") {
          emailLst.push([emails[i].id, emails[i].Value + "    (Primary email)"]);
        } else {
          emailLst.push([emails[i].id, emails[i].Value]);
        }
      }
      formInstance.view.lstboxEmails.masterData = emailLst;
      //open confirm
      var confirmAction = function () {
        var email = (formInstance.view.lstboxEmails.selectedKeyValue[1]);
        email = (email.replace("(Primary email)", " ")).trim();
        formInstance.presenter.enrollACustomer({
          "Customer_id": formInstance.presenter.getCurrentCustomerDetails().Customer_id,
          "Customer_username": formInstance.presenter.getCurrentCustomerDetails().Username,
          "Customer_Email": email
        });
      };
      var cancelAction = function () { };
      formInstance.AdminConsoleCommonUtils.openEmailConfirm({
        header: kony.i18n.getLocalizedString("i18n.frmCustomers.SendEnrollHeader"),
        message: kony.i18n.getLocalizedString("i18n.frmCustomers.Selectenroll"),
        confirmAction: confirmAction,
        cancelMsg: kony.i18n.getLocalizedString("i18n.frmCustomers.CANCEL"),
        cancelAction: cancelAction,
        confirmMsg: kony.i18n.getLocalizedString("i18n.frmCustomers.Send"),

      }, formInstance);
    };

    this.view.row1.btnLink3.onClick = function () {
      
      let configurationSvc = kony.sdk.getCurrentInstance().getConfigurationService();
      configurationSvc.getAllClientAppProperties(function(response) {
        if(response && response.SPOTLIGHT_DISABLE_SCA && response.SPOTLIGHT_DISABLE_SCA.toUpperCase()==="FALSE"){
          scopeObj.isSCADisabled = false;
        } else {
          scopeObj.isSCADisabled = true;
        }
      },function(){});
      var confirmAction = function () {
        if(scopeObj.isSCADisabled===false){
           formInstance.presenter.sendActivationCode({
            "customerID": formInstance.presenter.getCurrentCustomerDetails().Customer_id,
            "isSCADisabled" : scopeObj.isSCADisabled},
          "InfoScreen"
          );
        }
        else{
        formInstance.presenter.sendResetPasswordLink({
          "customerUsername": formInstance.presenter.getCurrentCustomerDetails().Username,
        });
        }
      };
      var cancelAction = function () { };
      if(scopeObj.isSCADisabled===false){
        formInstance.AdminConsoleCommonUtils.openConfirm({
        header: 'Confirmation',
        message: 'If you regenerate an activation code, the old code will be invalidated and the new code will be shared with the customer',
        confirmAction: confirmAction,
        cancelMsg: 'NO',
        cancelAction: cancelAction,
        confirmMsg: 'YES',

      }, formInstance);
      }else{
      formInstance.AdminConsoleCommonUtils.openConfirm({
        header: kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.resetPasswordConfirmationHeader"),
        message: kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.resetPasswordConfirmation"),
        confirmAction: confirmAction,
        cancelMsg: kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS"),
        cancelAction: cancelAction,
        confirmMsg: 'YES, RESET',
      }, formInstance);
      }
    };
    this.view.generalInfoHeader.flxLinkProfileButton.onClick = function(){
      var basicInfo = formInstance.presenter.getCurrentCustomerDetails();
      var input = {"Customer_username": basicInfo.Username,
                     "Customer_id":basicInfo.Customer_id ,
                   "Email":basicInfo.PrimaryEmailAddress,
                   "DateOfBirth":basicInfo.DateOfBirth};// {"Email":"dbxuser@infinity.com","DateOfBirth":"1985-05-05","Customer_username": "dbpolbuser","Customer_id": "1002496540"};
      formInstance.presenter.searchForCustomerLinkProfiles(input);
      formInstance.view.linkProfilesPopup.showListProfilesScreen();
    };
    this.view.generalInfoHeader.flxDelinkProfileButton.onClick = function(){
      var confirmAction = function () {
        formInstance.presenter.getUsernameRulesAndPolicy(2);
        formInstance.view.flxPopUpConfirmation.setVisibility(false);
        formInstance.view.delinkProfilePopup.usernameEntry.flxEnterValue.skin="sknflxEnterValueNormal";
        formInstance.view.delinkProfilePopup.usernameEntry.tbxEnterValue.text="";
        formInstance.view.delinkProfilePopup.userNameIsChecked=false;
        formInstance.view.delinkProfilePopup.usernameEntry.flxInlineError.setVisibility(false);
        formInstance.view.flxDelinkProfilePopup.setVisibility(true);
      };
      var cancelAction = function () { };
      formInstance.AdminConsoleCommonUtils.openConfirm({
        header: kony.i18n.getLocalizedString("i18n.frmCustomerManagement.DeLinkProfiles"),
        message: kony.i18n.getLocalizedString("i18n.frmCustomerManagement.DeLinkProfileConfirmationMessage"),
        confirmAction: confirmAction,
        cancelMsg: kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS"),
        cancelAction: cancelAction,
        confirmMsg: 'YES',
      }, formInstance);
    };
    this.view.generalInfoHeader.flxResendActivationCode.onClick = function(){
      var confirmAction = function () {
        var id = formInstance.presenter.getCurrentCustomerDetails().Customer_id || formInstance.presenter.getCurrentCustomerDetails().primaryCustomerId;
        scopeObj.sendActivationCode(formInstance,id);
      };
      var cancelAction = function () { };
      formInstance.AdminConsoleCommonUtils.openConfirm({
        header: 'Confirmation',
        message: 'If you regenerate an activation code, the old code will be invalidated and the new code will be shared with the customer',
        confirmAction: confirmAction,
        cancelMsg: 'NO',
        cancelAction: cancelAction,
        confirmMsg: 'YES',

      }, formInstance);
    };
       
     formInstance.view.flxSelectOptions.flxSuspend.onClick = function () 
   {  
     scopeObj.suspendOptionOnclick(formInstance);
             
   }; 
  },
 
  processAndFillStatusForEdit: function (StatusGroup, formInstance) {
    if (StatusGroup.length > 0) {

      this.fillEmploymentStatus(StatusGroup.filter(function (x) {
        return x.Type_id === "STID_EMPLOYMENTSTATUS";
      }));
      this.fillCustomerFlags(StatusGroup.filter(function (x) {
        return x.Type_id === "STID_CUSTOMERFLAGS";
      }));
      this.fillMaritalStatus(StatusGroup.filter(function (x) {
        return x.Type_id === "STID_MARITALSTATUS";
      }));
      this.fillCustomerStatus(StatusGroup.filter(function (x) {
        return x.Type_id === "STID_CUSTOMERSTATUS";
      }));
      var presentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule").presentationController;
      var basicInfo = presentationController.getCurrentCustomerBasicInfo();
      basicInfo.target = "EditScreen";
      this.setBasicInformation(basicInfo,formInstance);
    }
  },
  fillEmploymentStatus: function (StatusGroup) {
    var data = [];
    data.push(["lbl1", kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Select_a_Status")]);
    for (var i = 0; i < StatusGroup.length; i++) {
      data.push([StatusGroup[i].id, StatusGroup[i].Description]);
    }
    this.view.EditGeneralInfo.lstboxDetails4.masterData = data;
    this.view.EditGeneralInfo.lstBoxEditDetails33.masterData = data;
  },
  fillCustomerFlags: function (StatusGroup) {
    for (var i = 1; i <= this.NumberOfFlags; i++) {
      this.view.EditGeneralInfo["lblFlag" + i].text = StatusGroup[i - 1].Description;
      this.view.EditGeneralInfo["imgFlag" + i].info = {
        "Key": StatusGroup[i - 1].id
      };
    }
    for (var j = 1; j <= this.NumberOfFlags; j++) {
      this.view.EditGeneralInfo["lblFlagVal" + j].text = StatusGroup[j - 1].Description;
      this.view.EditGeneralInfo["imgFlagCheckbox" + j].info = {
        "Key": StatusGroup[j - 1].id
      };
    }
  },
  fillMaritalStatus: function (StatusGroup) {
    var data = [];
    data.push(["lbl1", kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Select_a_Status")]);
    for (var i = 0; i < StatusGroup.length; i++) {
      data.push([StatusGroup[i].id, StatusGroup[i].Description]);
    }
    this.view.EditGeneralInfo.lstboxDetails3.masterData = data;
    this.view.EditGeneralInfo.lstBoxEditDetails31.masterData = data;
  },
  fillCustomerStatus: function (StatusGroup) {
    var data = [];
    data.push(["lbl1", kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Select_a_Status")]);
    data.push(["SID_CUS_ACTIVE", kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Active")]);
    data.push(["SID_CUS_SUSPENDED", kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Suspended")]);
    this.view.EditGeneralInfo.lstboxDetails2.masterData = data;
  },
  validateBasicEditInfo: function () {
    var flag = 0;
    var ErrorSkin = "sknLstBoxeb3017Bor3px";
    var NormalSkin = "sknLbxborderd7d9e03pxradius";
    //Validation for marital status
    if (this.view.EditGeneralInfo.flxDetails3.info &&
        this.view.EditGeneralInfo.flxDetails3.info.CustomerType_id === adminUtils.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE) {
      if (this.view.EditGeneralInfo.lstboxDetails3.selectedKey === "lbl1") {
        flag += 1;
        this.view.EditGeneralInfo.lstboxDetails3.skin = ErrorSkin;
        this.view.EditGeneralInfo.lblError3.setVisibility(true);
      } else {
        this.view.EditGeneralInfo.lstboxDetails3.skin = NormalSkin;
        this.view.EditGeneralInfo.lblError3.setVisibility(false);
      }
    }
    if (flag === 0) {
      return true;
    }
    return false;
  },
  validDateEditBasicDetailsCombined : function(){
    var isValid  = true;
    if(this.view.EditGeneralInfo.lstBoxEditDetails11.selectedKey === "lbl1"){
      this.view.EditGeneralInfo.lstBoxEditDetails11.skin ="sknLstBoxeb3017Bor3px";
      this.view.EditGeneralInfo.flxInlineError11.setVisibility(true);
      this.view.EditGeneralInfo.lblErrorText11.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementProfile.PleaseSelectSalutation");
      isValid = false;
    }
    if(this.view.EditGeneralInfo.lstBoxEditDetails31.selectedKey === "lbl1"){
      this.view.EditGeneralInfo.lstBoxEditDetails31.skin ="sknLstBoxeb3017Bor3px";
      this.view.EditGeneralInfo.flxInlineError31.setVisibility(true);
      this.view.EditGeneralInfo.lblErrorText31.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementProfile.PleaseSelectMaritalStatus");
      isValid = false;
    }
    if(this.view.EditGeneralInfo.lstBoxEditDetails33.selectedKey === "lbl1"){
      this.view.EditGeneralInfo.lstBoxEditDetails33.skin ="sknLstBoxeb3017Bor3px";
      this.view.EditGeneralInfo.flxInlineError33.setVisibility(true);
      this.view.EditGeneralInfo.lblErrorText33.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementProfile.PleaseSelectEmploymentStatus");
      isValid = false;
    }
    return isValid;
  },
  changeSelectedTabColour: function (selectedWidget) {
    var normalSkin = "sknBtnBgD2D7E2Rou3pxLato485B7512px";
    var selectedSkin = "sknBord7d9e0Rounded3px485c75";
    var tabs = [
      this.view.dashboardCommonTab.btnProfile,
      this.view.dashboardCommonTab.btnLoans,
      this.view.dashboardCommonTab.btnDeposits,
      this.view.dashboardCommonTab.btnBanking,
      this.view.dashboardCommonTab.btnCDP
    ];
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].skin = normalSkin;
    }
    selectedWidget.skin = selectedSkin;
  },
  /*
  * show or hide buttons for linking or delinking the customer profils
  * @params: form instance, customer type, visibility  - true/false
  */
  showLinkDelinkButtons : function(formInstance,customerType,visibility){
    var customerInfo = formInstance.presenter.getCurrentCustomerDetails();
    var isAccessible = customerInfo.isCustomerAccessiable;
    var visiblityCheck = (visibility && isAccessible);
    if(customerType === adminUtils.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE){
      this.view.generalInfoHeader.flxLinkProfileButton.setVisibility(visiblityCheck);
      this.view.generalInfoHeader.flxDelinkProfileButton.setVisibility(false);
      this.view.generalInfoHeader.lblLinkProfile.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.LinkBusinessProfile");
      this.view.generalInfoHeader.flxLinkProfileButton.width = "172px";
    } else if(customerType === adminUtils.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
      var isAuthSignatory = false;
      if(customerInfo.customerbusinesstype && (customerInfo.customerbusinesstype.length > 0)){
        isAuthSignatory = (customerInfo.customerbusinesstype[0].SignatoryType_id && customerInfo.customerbusinesstype[0].SignatoryType_id !== "") ? true : false;
      } else if(customerInfo.isAuthorizedSignatory){
        isAuthSignatory= customerInfo.isAuthorizedSignatory === "true" ? true : false;
      }
      visiblityCheck = (visiblityCheck && isAuthSignatory);
      this.view.generalInfoHeader.flxLinkProfileButton.setVisibility(visiblityCheck);
      this.view.generalInfoHeader.flxDelinkProfileButton.setVisibility(false);
      this.view.generalInfoHeader.lblLinkProfile.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.LinkRetailProfile");
      this.view.generalInfoHeader.flxLinkProfileButton.width = "155px";
    } else{ //delink profiles
      this.view.generalInfoHeader.flxDelinkProfileButton.setVisibility(visiblityCheck);
      this.view.generalInfoHeader.flxLinkProfileButton.setVisibility(false);
      this.view.generalInfoHeader.lblDelinkProfile.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.DeLinkProfiles");
    }
    formInstance.view.forceLayout();
  },
  clearEditProfileScreenFields : function(opt){
    var NormalSkin = "sknLbxborderd7d9e03pxradius";
    if(opt === 1){
      //set edit data
      this.view.EditGeneralInfo.lblError1.setVisibility(false);
      this.view.EditGeneralInfo.lblError2.setVisibility(false);
      this.view.EditGeneralInfo.lblError3.setVisibility(false);
      this.view.EditGeneralInfo.lblError4.setVisibility(false);
      this.view.EditGeneralInfo.lstboxDetails1.skin = NormalSkin;
      this.view.EditGeneralInfo.lstboxDetails2.skin = NormalSkin;
      this.view.EditGeneralInfo.lstboxDetails3.skin = NormalSkin;
      this.view.EditGeneralInfo.lstboxDetails4.skin = NormalSkin;
    } else{
      this.view.EditGeneralInfo.lstBoxEditDetails11.skin = NormalSkin;
      this.view.EditGeneralInfo.lstBoxEditDetails31.skin = NormalSkin;
      this.view.EditGeneralInfo.lstBoxEditDetails33.skin = NormalSkin;
      this.view.EditGeneralInfo.flxInlineError11.setVisibility(false);
      this.view.EditGeneralInfo.flxInlineError31.setVisibility(false);
      this.view.EditGeneralInfo.flxInlineError33.setVisibility(false);
    }
  },
  callEditCustomerBasicInfo : function(formInstance){
    var scopeObj = this;
    var salutation = scopeObj.view.EditGeneralInfo.lstboxDetails1.selectedKeyValue[1];
    var MaritalStatusID = scopeObj.view.EditGeneralInfo.lstboxDetails3.selectedKey;
    var EmployementStatusID = scopeObj.view.EditGeneralInfo.lstboxDetails4.selectedKey;
    var eagreementStatus = scopeObj.view.EditGeneralInfo.switchToggle.selectedIndex === 1 ? "0" : "1";
    var listOfRemovedRisks = [],
        listOfAddedRisks = [],
        selectedFlags = [];

    for (var i = 1; i <= scopeObj.NumberOfFlags; i++) {
      if (scopeObj.view.EditGeneralInfo["imgFlag" + i].src === formInstance.AdminConsoleCommonUtils.checkboxSelected) {
        selectedFlags.push(scopeObj.view.EditGeneralInfo["imgFlag" + i].info.Key);
      }
    }
    var initialFlagList = scopeObj.view.EditGeneralInfo.flxSelectFlags.info.initialFlagList;

    var calculateList = function (a1, a2) {
      return a1.filter(function (x) {
        var result = false;
        if (a2.indexOf(x) < 0) result = true;
        return result;
      });
    };

    listOfAddedRisks = calculateList(selectedFlags, initialFlagList);
    listOfRemovedRisks = calculateList(initialFlagList, selectedFlags);
    var editParams = {
      "Customer_id": formInstance.presenter.getCurrentCustomerDetails().Customer_id,
      "employmentId":formInstance.presenter.getCurrentCustomerDetails().employmentId,
      "Salutation": scopeObj.view.EditGeneralInfo.lstboxDetails1.selectedKey === "lbl1" ? null : salutation,
      "EmployementStatus_id": EmployementStatusID === "lbl1" ? null : EmployementStatusID,
      "eagreementStatus": eagreementStatus,
      "listOfRemovedRisks": listOfRemovedRisks,
      "listOfAddedRisks": listOfAddedRisks,
      "MaritalStatus_id": MaritalStatusID
    };
    formInstance.presenter.editCustomerBasicInfo(editParams);
  },
  callEditCustomerBasicInfoCombined : function(formInstance){
    var scopeObj = this;
    var salutation = scopeObj.view.EditGeneralInfo.lstBoxEditDetails11.selectedKeyValue[1];
    var MaritalStatusID = scopeObj.view.EditGeneralInfo.lstBoxEditDetails31.selectedKey;
    var EmployementStatusID = scopeObj.view.EditGeneralInfo.lstBoxEditDetails33.selectedKey;
    var eagreementStatus = scopeObj.view.EditGeneralInfo.switchEAgreement51.selectedIndex === 1 ? "0" : "1";
    var middleName = scopeObj.view.EditGeneralInfo.editDetails13.tbxEnterValue.text;
    var driversLicense= scopeObj.view.EditGeneralInfo.editDetails41.tbxEnterValue.text;
    var listOfRemovedRisks = [],
        listOfAddedRisks = [],
        selectedFlags = [];

    for (var i = 1; i <= scopeObj.NumberOfFlags; i++) {
      if (scopeObj.view.EditGeneralInfo["imgFlagCheckbox" + i].src === formInstance.AdminConsoleCommonUtils.checkboxSelected) {
        selectedFlags.push(scopeObj.view.EditGeneralInfo["imgFlagCheckbox" + i].info.Key);
      }
    }
    var initialFlagList = scopeObj.view.EditGeneralInfo.flxSelectFlagContainer42.info.initialFlagList;

    var calculateList = function (a1, a2) {
      return a1.filter(function (x) {
        var result = false;
        if (a2.indexOf(x) < 0) result = true;
        return result;
      });
    };

    listOfAddedRisks = calculateList(selectedFlags, initialFlagList);
    listOfRemovedRisks = calculateList(initialFlagList, selectedFlags);
    var editParams = {
      "Customer_id": formInstance.presenter.getCurrentCustomerDetails().Customer_id,
      "Salutation": scopeObj.view.EditGeneralInfo.lstBoxEditDetails11.selectedKey === "lbl1" ? null : salutation,
      "EmployementStatus_id": EmployementStatusID === "lbl1" ? null : EmployementStatusID,
      "eagreementStatus": eagreementStatus,
      "listOfRemovedRisks": listOfRemovedRisks,
      "listOfAddedRisks": listOfAddedRisks,
      "DrivingLicenseNumber": driversLicense,
      "MiddleName": middleName,
      "MaritalStatus_id": MaritalStatusID
    };
    formInstance.presenter.editCustomerBasicInfo(editParams);
  },
  resetGeneralInfo : function(formInstance){
   this.view.row1.lblData1.text="N/A"; 
   this.view.row1.lblData2.text="N/A"; 
   this.view.row1.lblData3.text="N/A";
   this.view.row2.lblData1.text="N/A"; 
   this.view.row2.lblData2.text="N/A"; 
   this.view.row2.lblData3.text="N/A";
   this.view.row3.lblData1.text="N/A"; 
   this.view.row3.lblData2.text="N/A"; 
   this.view.row3.lblData3.text="N/A";
   this.view.row4.lblData1.text="N/A"; 
   this.view.row4.lblData2.text="N/A"; 
   this.view.row4.lblData3.text="N/A";
   this.view.companyRow1.lblData1.text="N/A";
   this.view.companyRow1.lblData2.text="N/A";
   this.view.companyRow1.lblData3.text="N/A";
   this.view.generalInfoHeader.lblCustomerName.text="N/A";
   this.view.generalInfoHeader.lblStatus.text="N/A";
   if(formInstance.view.breadcrumbs && formInstance.view.breadcrumbs.lblCurrentScreen)
    formInstance.view.breadcrumbs.lblCurrentScreen.text="N/A";
  this.view.forceLayout();
  },
  /*
  * sends activation code for newly enrolled customer
  * @param: form instance, current customer id
  */
  sendActivationCode : function(formInstance,custId){
    formInstance.presenter.sendActivationCode({ "customerID": custId, isSCADisabled : this.isSCADisabled }, "InfoScreen");
  },
};
});