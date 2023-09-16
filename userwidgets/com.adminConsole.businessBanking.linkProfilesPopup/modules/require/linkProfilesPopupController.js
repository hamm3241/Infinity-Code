define(['AdminConsoleCommonUtilities', 'AdminConsoleDateTimeUtilities','DateTimeUtils_FormExtn'],function(adminUtils, AdminConsoleDateTimeUtilities, DateTimeUtils_FormExtn) {
  return {
    currentCustomerInfo:"",
    linkProfilePreshow : function(){
      this.showListProfilesScreen();   
    },
    initializeLinkProfileActions :function(formInstance){
      var scopeObj =this;
      this.currentCustomerInfo = formInstance.presenter.getCurrentCustomerDetails();
      
      this.view.btnPopUpNext.onClick = function(){
        if(scopeObj.view.btnPopUpNext.text === "NEXT"){
          var isValid = scopeObj.validateUserSelection(1);
          if(isValid){
            scopeObj.showUsernameSelectionScreen(formInstance);
            scopeObj.setDataForUsernameScreen(formInstance);
          } else{
            scopeObj.showError(1);
          }
        }else{
          var validCheck = scopeObj.validateUserSelection(2);
          if(validCheck){
            formInstance.view.flxLinkProfilesPopup.setVisibility(false);
            if(formInstance.viewId==="CustomerCreateModule/frmCustomerCreate")
              formInstance.view.flxPopUpConfirmation.setVisibility(true);
            else scopeObj.showConfirmPopup(formInstance);
          } else{
            scopeObj.showError(2);
          }
          
        }
      };
      this.view.btnPopUpCancel.onClick = function(){
        formInstance.view.flxLinkProfilesPopup.setVisibility(false);
      };
      this.view.flxPopUpClose.onClick = function(){
        scopeObj.view.btnPopUpCancel.onClick();
      };
      this.view.segProfilesList.onRowClick =function(){
        scopeObj.view.flxError.setVisibility(false);
        scopeObj.view.flxSegmentContainer.top ="80dp";
        scopeObj.view.forceLayout();
      };
      this.view.segSelectProfile.onRowClick = function(){
        scopeObj.view.flxErrorMessage.setVisibility(false);
        scopeObj.view.flxSelectSegment.top = "80dp";
        scopeObj.view.forceLayout();
      };
    }, 
    /*
     * set data to profile list segment
     * @param: profiles list to link, form instance
     */
    setSearchProfilesSegmentData: function (profilesList,formInstance) {
      var typeToFilter = this.currentCustomerInfo.CustomerType_id === adminUtils.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE ?
                  adminUtils.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE : adminUtils.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE;
      var filteredList = profilesList.filter(function(rec){
        if(typeToFilter === rec.CustomerTypeId && (typeToFilter === adminUtils.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)){
          if(rec.Status_id === adminUtils.AdminConsoleCommonUtils.constantConfig.CUST_ACTIVE || rec.Status_id === adminUtils.AdminConsoleCommonUtils.constantConfig.CUST_SUSPEND)
            return rec;
        } else if(typeToFilter === rec.CustomerTypeId && typeToFilter === adminUtils.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
          if(rec.isAuthSignatory=== "true" && (rec.Status_id === adminUtils.AdminConsoleCommonUtils.constantConfig.CUST_ACTIVE || rec.Status_id === adminUtils.AdminConsoleCommonUtils.constantConfig.CUST_SUSPEND))
            return rec;
        }    
      });
      if (filteredList.length > 0) { //set profiles list data
        var segData = filteredList.map(this.mapSegmentListData);
        this.view.segProfilesList.setData(segData);
        formInstance.view.flxLinkProfilesPopup.setVisibility(true);
        if(this.currentCustomerInfo.CustomerType_id === adminUtils.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE){
          this.view.lblSubHeading.text =kony.i18n.getLocalizedString("i18n.frmCustomerManagement.BusinessProfiles");
        } else{
          this.view.lblSubHeading.text =kony.i18n.getLocalizedString("i18n.frmCustomerManagement.RetailProfiles");
        }
      } else{ //show error popup if not profiles available  
        var popupMsg = "";
        if(this.currentCustomerInfo.CustomerType_id === adminUtils.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
          popupMsg = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.YouCannotLinkThisProfileAs") +this.currentCustomerInfo.Name +
            kony.i18n.getLocalizedString("i18n.frmCustomerManagement.DoesNotHaveRetailProfile");
        } else{
          popupMsg = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.YouCannotLinkThisProfileAs") +this.currentCustomerInfo.Name +
            kony.i18n.getLocalizedString("i18n.frmCustomerManagement.DoesNotHaveBusinessProfile");
        }
        var popupContext = {
          header: kony.i18n.getLocalizedString("i18n.frmCustomerManagement.LinkProfiles"),
          message: popupMsg,
          closeAction: function(){},
          closeMsg: 'CLOSE'
        };
        adminUtils.AdminConsoleCommonUtils.openErrorPopup(popupContext,formInstance);
      }
      formInstance.view.forceLayout();
    },
    /*
    * map customer data for segment
    * @param: customer data
    * @returns: mapped customer data
    */
    mapSegmentListData: function (customer) {
      var status = "",stautsSkin="",statusIcon = "",
          fontIconCircleStatus = kony.i18n.getLocalizedString("i18n.userwidgetmodel.lblFontIconStatus1"),
          dob = customer.DateOfBirth ;//? this.getFormattedDate(customer.DateOfBirth, "YYYY-MM-DD", "MM-DD-YYYY") : "N/A";
      dob = dob ? dob : "N/A";

      var dataMap = {
        "flxRadioButton": "flxRadioButton",
        "imgRadioBtn":"imgRadioBtn",
        "flxApplicantTag": "flxApplicantTag",
        "flxMicroBusinessTag": "flxMicroBusinessTag",
        "flxRetailTag": "flxRetailTag",
        "flxLeadTag": "flxLeadTag",
        "lblUsername": "lblUsername",
        "lblSearchSeparator2":  "lblSearchSeparator2",
        "flxRightContainer": "flxRightContainer",
        "flxCustomerResults": "flxCustomerResults",
        "flxDataContainer1": "flxDataContainer1",
        "flxDataContainer2": "flxDataContainer2",
        "flxDataContainer3": "flxDataContainer3",
        "flxDataContainer4": "flxDataContainer4",
        "flxDataContainer5": "flxDataContainer5",
        "flxDataContainer6": "flxDataContainer6",
        "flxDataContainer7": "flxDataContainer7",
        "flxInnerContainer": "flxInnerContainer",
        "flxLeftContainer": "flxLeftContainer",
        "flxLowerContainer": "flxLowerContainer",
        "flxUpperContainer": "flxUpperContainer",
        "fontIconCircle1": "fontIconCircle1",
        "fontIconCircle2": "fontIconCircle2",
        "fontIconCircle4": "fontIconCircle4",
        "fontIconCircle5": "fontIconCircle5",
        "lblContent1": "lblContent1",
        "lblContent2": "lblContent2",
        "lblContent4": "lblContent4",
        "lblContent5": "lblContent5",
        "lblCustomerName": "lblCustomerName",
        "lblData1": "lblData1",
        "lblData2": "lblData2",
        "lblData3": "lblData3",
        "lblData4": "lblData4",
        "lblData5": "lblData5",
        "lblData6": "lblData6",
        "lblData7": "lblData7",
        "lblHeading1": "lblHeading1",
        "lblHeading2": "lblHeading2",
        "lblHeading3": "lblHeading3",
        "lblHeading4": "lblHeading4",
        "lblHeading5": "lblHeading5",
        "lblHeading6": "lblHeading6",
        "lblHeading7": "lblHeading7",
        "lblStatusValue":"lblStatusValue",
        "lblIconStatus":"lblIconStatus",
        "statusId":"statusId",
        "CustomerType": "CustomerType",
        "CustomerId": "CustomerId",
        "partyId": "partyId",
      };
      this.view.segSelectProfile.widgetDataMap = dataMap;
      this.view.segProfilesList.widgetDataMap = dataMap;
      var custStatusVal = customer.Status_id || customer.CustomerStatus_id;
      //Set customer status
      switch (custStatusVal) {
        case "SID_APP_FAILED":
          status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Rejected");
          stautsSkin = "sknFontIconError";
          statusIcon = "\ue921";
          break;
        case "SID_APP_PENDING":
          status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Pending");
          stautsSkin = "sknFontIconSuspend";
          statusIcon = "\ue921";
          break;
        case "SID_APP_ACTIVE":
          status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Active");
          statusIcon = "\ue921";
          stautsSkin = "sknFontIconActivate";
          break;
        case "SID_CUS_SUSPENDED":
          status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Suspended");
          stautsSkin = "sknFontIconPause";
          statusIcon = "\ue91d";
          break;
        case "SID_CUS_LOCKED":
          status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Locked");
          stautsSkin = "sknfontIconInactive";
          statusIcon = "\ue921";
          break;
        case "SID_CUS_NEW":
          status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.New");
          stautsSkin = "sknIcon039dffBlue12px";
          statusIcon = "\ue921";
          break;

        default:
          status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Active");
          statusIcon = "\ue921";
          stautsSkin = "sknFontIconActivate";
      }

      //Initial response
      var response = {
        "flxRadioButton": {"isvisible":true},
        "imgRadioBtn":{"src":"radio_notselected.png"},
        "flxApplicantTag": { "isVisible": false },
        "flxMicroBusinessTag": { "isVisible": false },
        "flxRetailTag": { "isVisible": false },
        "flxLeadTag": { "isVisible": false },
        "lblContent1": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.RetailCustomer"),
        "lblContent2": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Applicant"),
        "lblContent4": kony.i18n.getLocalizedString("i18n.frmCustomerProfile.BusinessUser"),
        "fontIconCircle1": fontIconCircleStatus,
        "fontIconCircle2": fontIconCircleStatus,
        "fontIconCircle4": fontIconCircleStatus,
        "lblHeading1" : kony.i18n.getLocalizedString("i18n.permission.USERNAME"),
        "lblHeading2" : kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.RetailCustomerSSN"),
        "lblCustomerName" : customer.Name || customer.name,
        "CustomerType": customer.CustomerTypeId || customer.CustomerType_id,
        "CustomerId": customer.id || customer.Customer_id,
        "statusId" : customer.Status_id || customer.CustomerStatus_id,
        "partyId": customer.partyId,
        "lblData1": customer.Username,
        "lblData2": customer.Ssn || customer.SSN,
        "lblStatusValue":status,
        "lblIconStatus":{"skin":stautsSkin, "text":statusIcon},
        "template": "flxCustomerResults"
      };
      var customerType = customer.CustomerTypeId || customer.CustomerType_id;
      if (customerType === adminUtils.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE) {
        //Business user
        var orgName = customer.CompanyName ? customer.CompanyName : customer.organisation_name;
        response["flxMicroBusinessTag"] = { "isVisible": true };
        response["flxDataContainer7"] = { "isVisible": true };
        response["lblHeading3"] = kony.i18n.getLocalizedString("i18n.frmCompanies.COMPANY_ID");
        response["lblHeading4"] = kony.i18n.getLocalizedString("i18n.Companies.companyName_UC");
        response["lblHeading5"] = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.MobileNo_UC");
        response["lblHeading6"] = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.DATEOFBIRTH");
        response["lblHeading7"] = kony.i18n.getLocalizedString("i18n.permission.EMAILID");
        response["lblData3"]= (customer.CompanyId || customer.organisation_id) ? (customer.CompanyId || customer.organisation_id) : "N/A";
        response["lblData4"]= orgName ? {"text":adminUtils.AdminConsoleCommonUtils.getTruncatedString(orgName, 32, 30),
                                                            "tooltip":orgName} : {"text":"N/A"};
        response["lblData5"]= customer.PrimaryPhoneNumber ? customer.PrimaryPhoneNumber : "N/A";
        response["lblData6"]= dob;
        response["lblData7"]= customer.PrimaryEmailAddress ? customer.PrimaryEmailAddress : "N/A";
      } else{
        //Retail
        response["flxRetailTag"] = { "isVisible": true };
        response["flxDataContainer7"] = { "isVisible": false };
        response["lblHeading3"] = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID");
        response["lblHeading4"]= kony.i18n.getLocalizedString("i18n.frmCustomerManagement.MobileNo_UC");
        response["lblHeading5"] = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.DATEOFBIRTH");
        response["lblHeading6"] = kony.i18n.getLocalizedString("i18n.permission.EMAILID");
        response["lblData3"]= customer.id || customer.Customer_id;
        response["lblData4"]= customer.PrimaryPhoneNumber ? {"text":customer.PrimaryPhoneNumber} : {"text":"N/A"};
        response["lblData5"]= dob;
        response["lblData6"]= customer.PrimaryEmailAddress ? customer.PrimaryEmailAddress : "N/A";
      } 
      return response;
    },
    /*
    * show the list of available profiles screen
    */
    showListProfilesScreen : function(){
      this.view.flxProfilesListContainer.setVisibility(true);
      this.view.flxLinkProfileContainer.setVisibility(false);
      this.view.flxError.setVisibility(false);
      this.view.segProfilesList.selectedRowItem = "";
      this.view.flxSegmentContainer.top ="80dp";
      this.view.lblSubHeading.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.BusinessProfiles");
      this.view.btnPopUpNext.text = "NEXT";
      this.view.forceLayout();
    },
    /*
    * show the username selection screen
    */
    showUsernameSelectionScreen : function(){
      this.view.flxProfilesListContainer.setVisibility(false);
      this.view.flxLinkProfileContainer.setVisibility(true);
      this.view.flxErrorMessage.setVisibility(false);
      this.view.segSelectProfile.selectedRowItem = "";
      this.view.flxSelectSegment.top = "80dp";
      this.view.lblSubHeader.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.SelectUsernameToLinkProfile");
      this.view.btnPopUpNext.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.LinkProfiles_UC");
      this.view.forceLayout();
    },
    /*
    * show popup on click of link profiles
    */
    showConfirmPopup : function(formInstance){
      var self =this;
      var popupMsg = "";
      var selectedProfile = this.view.segSelectProfile.selectedRowItems[0];
      if(selectedProfile.CustomerType === adminUtils.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE){
        popupMsg = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.linkProfileConfirmationMessageRetail");
      } else{
        popupMsg = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.linkProfileConfirmationMessageBusiness");
      }
      var confirmAction = function () {
        var payLoad ={"combinedUser": "","otherUser": ""};
        var segData = self.view.segSelectProfile.data;
        for(var i=0;i<segData.length;i++){
          if(segData[i].CustomerId === selectedProfile.CustomerId){
            payLoad['combinedUser'] = segData[i].CustomerId;
          } else{
            payLoad['otherUser'] = segData[i].CustomerId;
          }
        }
        var inputParam = {"Name":selectedProfile.lblCustomerName,
                          "payLoad": payLoad};
        formInstance.presenter.linkProfileService(inputParam);
      };
      var cancelAction = function () {
        formInstance.view.flxLinkProfilesPopup.setVisibility(true);
        formInstance.view.forceLayout();
      };
      adminUtils.AdminConsoleCommonUtils.openConfirm({
        header: kony.i18n.getLocalizedString("i18n.frmCustomerManagement.LinkProfiles"),
        message: popupMsg,
        confirmAction: confirmAction,
        cancelMsg: kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS"),
        cancelAction: cancelAction,
        confirmMsg: 'YES',
      }, formInstance);
    },
    /*
    * set data for username selection segment
    */
    setDataForUsernameScreen : function(formInstance){
      var selectedCust = this.view.segProfilesList.selectedRowItems[0];
      var data = [];
      data.push(selectedCust);
      data.push(this.mapSegmentListData(this.currentCustomerInfo));
      this.view.segSelectProfile.setData(data);
      this.view.forceLayout();
    },
    /*
    * validate the status of selected user
    * @return : true/false
    */
    validateUserSelection : function(screen){
      var isValid = false,selInd;
      if(screen === 1){
        selInd = this.view.segProfilesList.selectedRowIndex;
        if(selInd && this.view.segProfilesList.selectedRowItems){
          var selectedUser = this.view.segProfilesList.selectedRowItems[0];
          isValid = (selectedUser.statusId !== adminUtils.AdminConsoleCommonUtils.constantConfig.CUST_ACTIVE) ? false : true;
          this.view.errorProfileList.lblErrorValue.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.CannotLinkThisProfileAsSuspended");
        } else{
          this.view.errorProfileList.lblErrorValue.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.PleaseSelectAProfile");
          isValid = false;
        }
      }else if(screen === 2){
        selInd = this.view.segSelectProfile.selectedRowIndex;
        isValid = selInd  ? true : false;
      }
      return isValid;
    },
    /*
    * show Error flex
    * @param: screen no
    */
    showError : function(screen){
      if(screen === 1){
        this.view.flxError.setVisibility(true);
        this.view.flxSegmentContainer.top ="130dp";
      } else if(screen === 2){
        this.view.flxErrorMessage.setVisibility(true);
        this.view.flxSelectSegment.top = "130dp";
        this.view.errorProfileList.lblErrorValue.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.PleaseSelectAProfile");
      }
      this.view.forceLayout();
    }
  };
});