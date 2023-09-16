define({
  sortBy: null,
  recordsSize: 20,
  scrollHeight: 0,
  mouseYCoordinate: 0,
  willUpdateUI: function (context) {
    if (context) {
      this.updateLeftMenu(context);

      if (context.LoadingScreen) {
        if (context.LoadingScreen.focus) {
          kony.adminConsole.utils.showProgressBar(this.view);
        } else {
          kony.adminConsole.utils.hideProgressBar(this.view);
        }
      } else if (context.toastModel) {
        if (context.toastModel.status === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SUCCESS")) {
          this.view.toastMessage.showToastMessage(context.toastModel.message, this);
        } else {
          this.view.toastMessage.showErrorToastMessage(context.toastModel.message, this);
        }
      } else if (context.CustomerBasicInfo) {
        this.view.flxGeneralInfoWrapper.setBasicInformation(context.CustomerBasicInfo, this);
        this.view.tabs.setCustomerProfileTabs(this);
      } else if (context.enrollACustomer) {
        this.view.flxGeneralInfoWrapper.setEnrollmentAccessandStatus();

      } else if (context.UpdateDBPUserStatus) {
        this.view.flxGeneralInfoWrapper.setLockStatus(context.UpdateDBPUserStatus.status.toUpperCase(), this);

      } else if (context.StatusGroup) {
        this.view.flxGeneralInfoWrapper.processAndFillStatusForEdit(context.StatusGroup, this);

      } else if (context.CustomerNotes) {
        this.view.Notes.displayNotes(this, context.CustomerNotes);

      } else if (context.OnlineBankingLogin) {
        this.view.CSRAssist.onlineBankingLogin(context.OnlineBankingLogin, this);

      } else if (context.CustomerSessions) {
        this.view.tabs.setSkinForInfoTabs(this.view.tabs.btnTabName6);
        this.view.flxFilter.setVisibility(false);
        //this.unloadOnScrollEvent();
        this.resetAllSortImagesHistory();
        this.setDataForActivitySegment(context.CustomerSessions);

      } else if (context.CustomerSessionActivities) {
        this.setDataForActivityDetailsSegment(context.CustomerSessionActivities);
      } else if(context.userNameRulesPolicy){
         this.view.delinkProfilePopup.setUsernameRules(context.userNameRulesPolicy);
      } else if(context.linkProfilesList){
        this.view.linkProfilesPopup.setSearchProfilesSegmentData(context.linkProfilesList,this);
      } else if(context.userNameIsAvailable){
        this.view.delinkProfilePopup.checkUserNameAvailability(context.userNameIsAvailable);
      } else if(context.checkAuthSignatory){ 
        //for business user,to get isauthSignatory flag in case not available in basicInfo
        var customerType = context.checkAuthSignatory.customer.CustomerType_id;
        var status = context.checkAuthSignatory.customer.CustomerStatus_id;
         //hiding link/delink profile buttons
        /*if (status === "LOCKED" || status === "SUSPENDED" || status === "NEW") {
          this.view.flxGeneralInfoWrapper.showLinkDelinkButtons(this,customerType,false);
        }  else {
          this.view.flxGeneralInfoWrapper.showLinkDelinkButtons(this,customerType,true);
        }*/
      }
    }
  },
  CustomerProfileActivityHistoryPreshow: function () {
    this.view.tabs.setSkinForInfoTabs(this.view.tabs.btnTabName6);
    this.view.Notes.setDefaultNotesData(this);
    var screenHeight = kony.os.deviceInfo().screenHeight;
    this.view.flxMainContent.height = screenHeight - 115 + "px";
    this.view.flxGeneralInfoWrapper.changeSelectedTabColour(this.view.flxGeneralInfoWrapper.dashboardCommonTab.btnProfile);
    this.view.flxGeneralInfoWrapper.generalInfoHeader.setDefaultHeaderData(this);
    this.view.flxGeneralInfoWrapper.setFlowActionsForGeneralInformationComponent(this);
    this.view.linkProfilesPopup.initializeLinkProfileActions(this);
    this.view.delinkProfilePopup.delinkProfilePreshow(this);
    this.view.dropdownEntity.flxSegEntity.setVisibility(false);
    var LEData = this.presenter.getDataLegalEntities();
    if(LEData) {
    this.setDataforLegalEntity(LEData);
    } else {
      var legalEntityId = this.presenter.getLegalEntity();
      var legalEntity = this.getLEDesc(legalEntityId);
      this.setDataforSingleLegalEntity(legalEntity);
    } 
    this.setFlowActions();
  },
  
  setDataforLegalEntity: function(segData)
    {
      var heading = [      {
        "id":"LEGAL ENTITY",
        "companyName":"LEGAL ENTITY",
        "region":"LEGAL ENTITY",
        "description":"LEGAL ENTITY"
      },
                    ];
      var widMap={
        "flxSearchDropDown":"flxSearchDropDown",
        "lblDescription":"lblDescription",
        "id":"id"
      };
      var data=heading.concat(segData);
      var LegalEntityData = data.map(function(en){
        return {
          "flxSearchDropDown": {"isVisible": true,"hoverSkin":"sknFlxBgd7effa"},
          "lblDescription": en.description,
          "id":en.legalEntity,
        };
      });
      
      
       if(data.length>1){
       var presentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule").presentationController;
        var legalEntity = presentationController.getLegalEntity();
        for(var i=1;i<data.length;i++)
        {
          if(data[i].legalEntity==legalEntity){
            this.view.dropdownEntity.lblSelectLegalEntity.text = data[i].description;
          }
        }  
        this.view.dropdownEntity.lblSelectLegalEntity.info = legalEntity;
        this.view.dropdownEntity.lblSelectLegalEntity.skin = "sknlblLatoBold35475f14px";
      }
      else if(this.view.dropdownEntity.lblSelectLegalEntity.text === kony.i18n.getLocalizedString("i18n.frmGroups.lblSelectLegalEntity")){
      }
      this.view.dropdownEntity.segEntity.widgetDataMap = widMap;
      this.view.dropdownEntity.segEntity.setData(LegalEntityData);
      this.view.dropdownEntity.segEntity.info = {
        "data": LegalEntityData
      };
      this.view.dropdownEntity.segEntity.setVisibility(LegalEntityData.length > 1);
      this.view.dropdownEntity.segEntity.selectedRowIndex = [0,1];
      this.view.dropdownEntity.segEntity.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
      this.view.forceLayout();
    },

    setDataforSingleLegalEntity: function(segData) {
      var widMap={
       "lblDescription":"lblDescription",
       "id":"id"
     };
     var LegalEntityData = segData.map(function(en){
       return {
         "lblDescription": en.companyName,
         "id":en.id,
       };
      });
     this.view.dropdownEntity.lblSelectLegalEntity.text = segData[0].companyName;
     this.view.dropdownEntity.segEntity.widgetDataMap = widMap;
     this.view.dropdownEntity.segEntity.setData(LegalEntityData);
     this.view.dropdownEntity.segEntity.info = {
       "data": LegalEntityData
     };  
     this.view.dropdownEntity.lblSelectLegalEntity.skin = "sknlblLatoBold35475f14px";
     this.view.dropdownEntity.segEntity.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
     this.view.forceLayout();
   },

  setFlowActions: function () {
    var scopeObj = this;
    this.view.btnViewAll.onClick = function () {
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.presenter.navigateToCustomerLogs({
        "CustomerManagementRequest":
        {
          "Username": scopeObj.presenter.getCurrentCustomerDetails().Username,
          "CustomerSegmentDetails": null
        }
      });
    };
    this.view.segActivityHistory.onRowClick = function () {
      scopeObj.view.flxFilterActivityDetails.setVisibility(false);
      scopeObj.resetAllSortImagesHistoryDetails();
      scopeObj.view.flxFilterActivityDetails.info = null;
      scopeObj.presenter.getAllActivitiesInACustomerSession({
        "sessionId": scopeObj.view.segActivityHistory.selecteditems[0].lblSessionID
      });
    };
    this.view.backToActivitySessions.btnBack.onClick = function () {
      scopeObj.showActivityHistoryScreen();
    };
    //sorting on Activity history
    this.view.flxDevice.onClick = function () {
      scopeObj.resetAllSortImagesHistory();
      scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segActivityHistory, "lblDevice", scopeObj.view.fonticonSortDevice, "NONE", "ALL", null,scopeObj);
    };
    this.view.dropdownEntity.flxSelectLegalEntity.onClick = function () {
      var segmntData = scopeObj.view.dropdownEntity.segEntity.data;
      if (segmntData.length === 1) { // dropdown not required if only one LE available
        scopeObj.this.view.dropdownEntity.flxSegEntity.setVisibility(false);
      }
      else {
        if (scopeObj.view.dropdownEntity.flxSegEntity.isVisible === false) {
          scopeObj.view.dropdownEntity.flxSegEntity.setVisibility(true);
        } else {
          scopeObj.view.dropdownEntity.flxSegEntity.setVisibility(false);
        }
      }
    };
    this.view.flxIPAddress.onClick = function () {
      scopeObj.resetAllSortImagesHistory();
      scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segActivityHistory, "lblIpaddress", scopeObj.view.fonticonSortIPAddress, "NONE", "ALL", null,scopeObj);
    };

    this.view.flxChannel.onClick = function () {
      if (scopeObj.view.flxFilter.isVisible) {
        scopeObj.view.flxFilter.setVisibility(false);
        scopeObj.view.forceLayout();
      } else {

        var flxRight = scopeObj.view.flxActivityHistorySegmentHeader.frame.width - scopeObj.view.flxChannel.frame.x - scopeObj.view.flxChannel.frame.width;
        var iconRight = scopeObj.view.flxChannel.frame.width - scopeObj.view.flxFilterChannel.frame.x;
        scopeObj.view.flxFilter.right = (flxRight + iconRight +3) +"px";
        scopeObj.view.flxFilter.setVisibility(true);
        if (scopeObj.view.flxFilter.info && scopeObj.view.flxFilter.info.Target) {
          scopeObj.view.flxFilter.info.Target = "CHANNEL";
        } else {
          scopeObj.view.flxFilter.info = {
            "Target": "CHANNEL",
            "CHANNEL": "ALL",
            "OS": "ALL"
          };
        }

        scopeObj.setListingFilterData();
        scopeObj.view.forceLayout();
      }
    };
    this.view.flxos.onClick = function () {
      if (scopeObj.view.flxFilter.isVisible) {
        scopeObj.view.flxFilter.setVisibility(false);
        scopeObj.view.forceLayout();
      } else {
        var flxRight = scopeObj.view.flxActivityHistorySegmentHeader.frame.width - scopeObj.view.flxos.frame.x - scopeObj.view.flxos.frame.width;
        var iconRight = scopeObj.view.flxos.frame.width - scopeObj.view.flxFilteros.frame.x;
        scopeObj.view.flxFilter.right = (flxRight + iconRight +3) +"px";
        scopeObj.view.flxFilter.setVisibility(true);
        if (scopeObj.view.flxFilter.info && scopeObj.view.flxFilter.info.Target) {
          scopeObj.view.flxFilter.info.Target = "OS";
        } else {
          scopeObj.view.flxFilter.info = {
            "Target": "CHANNEL",
            "CHANNEL": "ALL",
            "OS": "ALL"
          };
        }
        scopeObj.setListingFilterData();
        scopeObj.view.forceLayout();
      }
    };
    this.view.flxFilter.onHover = function (widget, context) {
      if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        scopeObj.view.flxFilter.setVisibility(false);
        scopeObj.view.forceLayout();
      }
    };
    this.view.statusFilterMenu.segStatusFilterDropdown.onRowClick = function () {
      scopeObj.filterBasedOnStatus();
    };
    this.view.flxActivityType.onClick = function () {
      if (scopeObj.view.flxFilterActivityDetails.isVisible) {
        scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
        scopeObj.view.flxFilterActivityDetails.setVisibility(false);
        scopeObj.view.forceLayout();
        scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
      } else {
        scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
        var flxRight = scopeObj.view.flxActivityHistorySelection.frame.width - scopeObj.view.flxActivityType.frame.x - scopeObj.view.flxActivityType.frame.width;
        var iconRight = scopeObj.view.flxActivityType.frame.width - scopeObj.view.flxFilterActivityType.frame.x;
        scopeObj.view.flxFilterActivityDetails.right = (flxRight + iconRight - 43) +"px";
        scopeObj.view.flxFilterActivityDetails.setVisibility(true);
        if (scopeObj.view.flxFilterActivityDetails.info && scopeObj.view.flxFilterActivityDetails.info.Target) {
          scopeObj.view.flxFilterActivityDetails.info.Target = "ACTIVITY_TYPE";
        } else {
          scopeObj.view.flxFilterActivityDetails.info = {
            "Target": "ACTIVITY_TYPE",
            "ACTIVITY_TYPE": "ALL",
            "ACTIVITY_STATUS": "ALL"
          };
        }
        scopeObj.setDetailsFilterData();
        scopeObj.view.forceLayout();
        scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
      }
    };
    this.view.flxActvityStatus.onClick = function () {
      if (scopeObj.view.flxFilterActivityDetails.isVisible) {
        scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
        scopeObj.view.flxFilterActivityDetails.setVisibility(false);
        scopeObj.view.forceLayout();
        scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
      } else {
        scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
        var flxRight = scopeObj.view.flxActivityHistorySelection.frame.width - scopeObj.view.flxActvityStatus.frame.x - scopeObj.view.flxActvityStatus.frame.width;
        var iconRight = scopeObj.view.flxActvityStatus.frame.width - scopeObj.view.flxFilterActvityStatus.frame.x;
        scopeObj.view.flxFilterActivityDetails.right = (flxRight + iconRight - 43) +"px";
        scopeObj.view.flxFilterActivityDetails.setVisibility(true);
        if (scopeObj.view.flxFilterActivityDetails.info && scopeObj.view.flxFilterActivityDetails.info.Target) {
          scopeObj.view.flxFilterActivityDetails.info.Target = "ACTIVITY_STATUS";
        } else {
          scopeObj.view.flxFilterActivityDetails.info = {
            "Target": "ACTIVITY_STATUS",
            "ACTIVITY_TYPE": "ALL",
            "ACTIVITY_STATUS": "ALL"
          };
        }
        scopeObj.setDetailsFilterData();
        scopeObj.view.forceLayout();
        scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
      }
    };
    this.view.flxFilterActivityDetails.onHover = function (widget, context) {
      if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
        scopeObj.view.flxFilterActivityDetails.setVisibility(false);
        scopeObj.view.forceLayout();
        scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
      }
    };
     this.view.dropdownEntity.tbxSearchBox.onKeyUp = function() {
            if (scopeObj.view.dropdownEntity.tbxSearchBox.text.trim().length > 0) {
                scopeObj.view.dropdownEntity.flxSearchCancel.setVisibility(true);
                var segData = scopeObj.view.dropdownEntity.segEntity.data;
                var searchText = scopeObj.view.dropdownEntity.tbxSearchBox.text;
                var statusName = "";
                var filteredData = segData.filter(function(rec) {
                    statusName = rec.lblDescription.toLowerCase();
                    if (statusName.indexOf(searchText) >= 0)
                    { 
                      scopeObj.view.dropdownEntity.flxSearchCancel.setVisibility(true);
                      return rec;
                    }
                });
                if (filteredData.length === 0) {
                    scopeObj.view.dropdownEntity.segEntity.setVisibility(false);
                    scopeObj.view.dropdownEntity.flxNoResultFound.setVisibility(true);
                } else {
                    scopeObj.view.dropdownEntity.segEntity.setData(filteredData);
                    scopeObj.view.dropdownEntity.segEntity.setVisibility(true);
                    scopeObj.view.dropdownEntity.flxNoResultFound.setVisibility(false);
                    
                }
            } else {
               scopeObj.view.dropdownEntity.flxSearchCancel.setVisibility(false);
                var totalRecords = scopeObj.view.dropdownEntity.segEntity.info.data;
                scopeObj.view.dropdownEntity.segEntity.setData(totalRecords);
            }
            scopeObj.view.forceLayout();
        },
        this.view.dropdownEntity.flxSearchCancel.onClick = function() {
            scopeObj.view.dropdownEntity.flxSearchCancel.setVisibility(false);
            scopeObj.view.dropdownEntity.tbxSearchBox.text = "";
            var totalRecords = scopeObj.view.dropdownEntity.segEntity.info.data;
            scopeObj.view.dropdownEntity.segEntity.setData(totalRecords);
            scopeObj.view.dropdownEntity.segEntity.setVisibility(true);
            scopeObj.view.dropdownEntity.flxNoResultFound.setVisibility(false);
        },
        this.view.dropdownEntity.flxSegEntity.flxSegData.segEntity.onRowClick = function() {
         var rowInd = scopeObj.view.dropdownEntity.segEntity.selectedRowIndex[1];
         var segData = scopeObj.view.dropdownEntity.segEntity.data;
          if(segData[rowInd].lblDescription !== "LEGAL ENTITY")
           {
            scopeObj.view.dropdownEntity.lblSelectLegalEntity.text = segData[rowInd].lblDescription;
            scopeObj.view.dropdownEntity.lblSelectLegalEntity.info={"id":segData[rowInd].id};
            scopeObj.view.dropdownEntity.flxSegEntity.setVisibility(false);
            scopeObj.view.dropdownEntity.lblSelectLegalEntity.skin = "sknlblLatoBold35475f14px";
            var presentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule").presentationController;
            var Id = presentationController.getCustomerId();
            scopeObj.presenter.getCustomerBasicInfo({
             "Customer_id":Id,
             "legalEntityId": segData[rowInd].id, 
            }
            );
           }
        };
    this.view.statusFilterMenuDetails.segStatusFilterDropdown.onRowClick = function () {
      scopeObj.filterBasedOnActivityType();
    };
    this.view.flxModuleName.onClick = function () {
      scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
      scopeObj.resetAllSortImagesHistoryDetails();
      scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segActivityHistoryDetails, "lblModuleName", scopeObj.view.fonticonModuleName, "NONE", "ALL", null,scopeObj);
      scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
    };
    this.view.flxDateAndTime.onClick = function () {
      scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
      scopeObj.resetAllSortImagesHistoryDetails();
      scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segActivityHistoryDetails, "lblDateAndTime", scopeObj.view.fonticonSortDateAndTime, "NONE", "ALL", null,scopeObj);
      scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
    };

  },
  /*
   * display activity history list screen
   */
  showActivityHistoryScreen: function () {
    //Hide toast msg (if any)
    if (this.view.toastMessage.flxToastContainer.skin === "sknFlxErrorToastBgE61919") {
      this.AdminConsoleCommonUtils.setVisibility(this.view.flxToastMessage, false);
    }
    this.view.flxActivityHistoryWrapper.setVisibility(true);
    this.view.flxActivityHistoryListing.setVisibility(true);
    this.view.flxActivityHistorySessionDetails.setVisibility(false);
    this.view.forceLayout();
    this.view.flxMainContent.scrollToWidget(this.view.flxOtherInfoWrapper);
  },
  /*
   * display activity history details screen on row click
   */
  showActivityHistoryDetailsScreen: function () {
    this.view.flxActivityHistoryWrapper.setVisibility(true);
    this.view.flxActivityHistoryListing.setVisibility(false);
    this.view.flxActivityHistorySessionDetails.setVisibility(true);
    this.view.forceLayout();
    this.view.flxMainContent.scrollToWidget(this.view.flxOtherInfoWrapper);
  },
  /*
   * set activity History to segment
   * @param : customer sessions list
   */
  setDataForActivitySegment: function (CustomerSessions) {
    var scopeObj = this;
    var dataMap = {
      "flxCloumns": "flxCloumns",
      "flxCustMangActivityHistory": "flxCustMangActivityHistory",
      "flxFirstRow": "flxFirstRow",
      "flxSecondRow": "flxSecondRow",
      "flxSession": "flxSession",
      "lblChannel": "lblChannel",
      "lblDevice": "lblDevice",
      "lblIpaddress": "lblIpaddress",
      "lblDuration": "lblDuration",
      "lblHorizontalSeperator": "lblHorizontalSeperator",
      "lblNumberOfActivities": "lblNumberOfActivities",
      "lblOS": "lblOS",
      "lblSeperator": "lblSeperator",
      "lblSessionStart": "lblSessionStart"
    };

    if (CustomerSessions.length > 0) {
      var data = [];
      CustomerSessions.forEach(function (session) {
        if(typeof(session.endDate) === "string"){
          session.endDate = parseInt(session.endDate);
        }
        if(typeof(session.startDate) === "string"){
          session.startDate = parseInt(session.startDate);
        }
        if(typeof(session.createdOn) === "string"){
          session.createdOn = parseInt(session.createdOn);
        }
        var duration = "-";
        if (session.endDate && session.startDate) {
          var dif = (new Date(session.endDate)).getTime() - (new Date(session.startDate)).getTime();
          var Seconds_Between_Dates = Math.abs(dif / 1000);
          var minutes = Math.floor(Seconds_Between_Dates / 60);
          if (minutes < 10) { minutes = "0" + minutes; }
          duration = minutes + " Mins";
        }
        data.push({
          "flxCloumns": "flxCloumns",
          "flxCustMangActivityHistory": "flxCustMangActivityHistory",
          "flxFirstRow": "flxFirstRow",
          "flxSecondRow": "flxSecondRow",
          "flxSession": "flxSession",
          "lblSessionID": session.sessionId,
          "lblIpaddress": session.ipAddress,
          "DeviceID": session.deviceId,
          "lblChannel": {"text":session.channel && session.channel !== "" ? session.channel :  scopeObj.checkForNull(session.browser,"N/A"),
                        "info":session.channel && session.channel !== "" ? session.channel :  scopeObj.checkForNull(session.browser,"N/A")},
          "lblDevice":  scopeObj.checkForNull(session.device,"N/A"),
          "lblDuration": duration,
          "lblHorizontalSeperator": "lblHorizontalSeperator",
          "lblNumberOfActivities": session.numberOfActivities + " Activities",
          "lblOS":  {"text":scopeObj.checkForNull(session.operatingSystem,"N/A"),
                     "info":scopeObj.checkForNull(session.operatingSystem,"N/A")},
          "lblSeperator": "lblSeperator",
          "lblSessionStart": session.startDate && session.startDate !== "" ? scopeObj.getLocaleDateAndTime(session.startDate) : "N/A",
          "template": "flxCustMangActivityHistory"
        });
      });

      this.view.segActivityHistory.widgetDataMap = dataMap;
      this.view.segActivityHistory.setData(data);
      this.view.flxActivityHistorySegment.height = parseInt(this.view.flxActivityHistorySegmentHeader.height.slice(0, -2)) + 80 * (data.length + 1) + "px";
      this.view.flxActivityHistorySegment.height = "320px";
      this.view.segActivityHistory.info = {
        "data": data,
        "searchAndSortData": data
      };

      this.view.flxActivityHistorySegmentHeader.setVisibility(true);
      this.view.lblActivityHistoryHeaderSeperator.setVisibility(true);
      this.view.segActivityHistory.setVisibility(true);
      this.view.rtxMsgActivityHistory.setVisibility(false);
      this.view.flxRecentActivity.setVisibility(true);
    } else {
      this.view.flxRecentActivity.setVisibility(false);
      this.view.flxActivityHistorySegment.height = parseInt(this.view.flxActivityHistorySegmentHeader.height.slice(0, -2)) + 80 * 5 + "px";
      this.view.flxActivityHistorySegmentHeader.setVisibility(false);
      this.view.lblActivityHistoryHeaderSeperator.setVisibility(false);
      this.view.segActivityHistory.setVisibility(false);
      this.view.rtxMsgActivityHistory.setVisibility(true);
    }
    this.showActivityHistoryScreen();
    this.view.forceLayout();
  },
  /*
   * set activity history details for selected session
   * @param : selected seesion's activities
   * 
   */
  setDataForActivityDetailsSegment: function (CustomerSessionActivities) {

    var scopeObj = this;
    this.view.lblSessionData.text = this.view.segActivityHistory.selecteditems[0].lblSessionStart;
    this.view.lblDeviceIDData.text = this.view.segActivityHistory.selecteditems[0].DeviceID;
    this.view.lblIpAddressData.text = this.view.segActivityHistory.selecteditems[0].lblIpaddress;
    this.view.lblChannelData.text = this.view.segActivityHistory.selecteditems[0].lblChannel.text;
    this.view.lblOSData.text = this.view.segActivityHistory.selecteditems[0].lblOS.text;
    this.view.lblDeviceData.text = this.view.segActivityHistory.selecteditems[0].lblDevice;

    var dataMap = {
      "flxCloumns": "flxCloumns",
      "flxCustMangActivityHistoryDetails": "flxCustMangActivityHistoryDetails",
      "lblActivityType": "lblActivityType",
      "lblDateAndTime": "lblDateAndTime",
      "lblErrorCode": "lblErrorCode",
      "lblModuleName": "lblModuleName",
      "lblReferenceID": "lblReferenceID",
      "lblSeperator": "lblSeperator",
      "lblStatus": "lblStatus",
      "fontIconStatus": "fontIconStatus",
      "lblActivityDescription": "lblActivityDescription",
      "flxStatus": "flxStatus"
    };
    var data = [];
    if (CustomerSessionActivities.length > 0) {
      CustomerSessionActivities.forEach(function (activity) {
        var statusText = "";
        if(typeof(activity.eventts) === "string"){
          activity.eventts = parseInt(activity.eventts);
        }
        if(activity.status === "SID_EVENT_SUCCESS"){
          statusText = kony.i18n.getLocalizedString("i18n.CustomerManagement.ActivitySuccess");
        }else if(activity.status === "SID_EVENT_FAILURE"){
          statusText = kony.i18n.getLocalizedString("i18n.CustomerManagement.ActivityFailed");
        }

        var fontIconStatus;
        if (activity.status === undefined) {
          fontIconStatus = { "text": "" };
        } else if (activity.status.toUpperCase() === "SID_EVENT_SUCCESS") {
          fontIconStatus = { "text": "\ue921", "skin": "sknIcon13pxGreen" };
        } else if (activity.status.toUpperCase() === "SID_EVENT_FAILURE") {
          fontIconStatus = { "text": "\ue921", "skin": "sknIcon13pxRed" };
        } else {
          fontIconStatus = { "text": "\ue921", "skin": "sknIconOrange" };
        }
        var activityName = scopeObj.checkForNull(scopeObj.presenter.getActivityNameFromActivityID(activity.activityType),"N/A");
        var activityToolTip = activityName;
        if(activityName.length > 18){
          activityName = activityName.slice(0,18)+"...";
        }
        data.push({
          "flxCloumns": "flxCloumns",
          "flxCustMangActivityHistoryDetails": "flxCustMangActivityHistoryDetails",
          "lblActivityType":{"text":activityName,"toolTip":activityToolTip,"info":activityToolTip},
          "lblDateAndTime": activity.eventts && activity.eventts !== "" ? scopeObj.getLocaleDateAndTime(activity.eventts) : "N/A",
          "lblErrorCode": scopeObj.checkForNull(activity.errorCode,"N/A"),
          "lblModuleName": scopeObj.checkForNull(scopeObj.presenter.getModuleNameFromModuleID(activity.moduleName),"N/A"),
          "lblReferenceID": scopeObj.checkForNull(activity.referenceId,"N/A"),
          "lblSeperator": "lblSeperator",
          "lblStatus": {"text":scopeObj.checkForNull(statusText,"N/A"),
                        "info":scopeObj.checkForNull(statusText,"N/A") },
          "fontIconStatus": fontIconStatus,
          "lblActivityDescription": scopeObj.checkForNull(activity.description,"N/A"),
          "flxStatus": "flxStatus",
          "template": "flxCustMangActivityHistoryDetails"
        });
      });

      this.view.segActivityHistoryDetails.widgetDataMap = dataMap;
      this.view.segActivityHistoryDetails.setData(data);
      this.view.segActivityHistoryDetails.info = {
        "data": data,
        "searchAndSortData": data
      };

      this.view.flxActivityHistoryDetailsHeader.setVisibility(true);
      this.view.lblActivityHistoryDetailsHeaderSeperator.setVisibility(true);
      this.view.segActivityHistoryDetails.setVisibility(true);
      this.view.rtxMsgActivityHistoryDetails.setVisibility(false);
      this.view.flxActivityHistorySelection.height = parseInt(this.view.flxActivityHistoryDetailsHeader.height.slice(0, -2)) + 52 * (data.length + 1) + "px";
    } else {
      this.view.flxActivityHistoryDetailsHeader.setVisibility(false);
      this.view.lblActivityHistoryDetailsHeaderSeperator.setVisibility(false);
      this.view.segActivityHistoryDetails.setVisibility(false);
      this.view.rtxMsgActivityHistoryDetails.setVisibility(true);
      this.view.flxActivityHistorySelection.height = parseInt(this.view.flxActivityHistoryDetailsHeader.height.slice(0, -2)) + 52 * (data.length + 1) + "px";
    }
    this.view.flxActivityHistorySelection.bottom = "30px";
    this.showActivityHistoryDetailsScreen();
    this.view.forceLayout();
  },
  /*
   *set scroll heigths/positions
   */
  unloadOnScrollEvent: function () {
    document.getElementById("frmCustomerProfileActivityHistory_flxMainContent").onscroll = function () { };
  },
  /*
   * reset sort images for history list
   */
  resetAllSortImagesHistory: function () {
    if (this.view.fonticonSortDevice.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
      this.view.fonticonSortDevice.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
      this.view.fonticonSortDevice.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
    }
    if (this.view.fonticonSortIPAddress.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
      this.view.fonticonSortIPAddress.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
      this.view.fonticonSortIPAddress.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
    }
  },
  /*
   * reset sort images for activities list in detail screen
   */
  resetAllSortImagesHistoryDetails: function () {
    if (this.view.fonticonModuleName.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
      this.view.fonticonModuleName.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
      this.view.fonticonModuleName.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
    }
    if (this.view.fonticonSortDateAndTime.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
      this.view.fonticonSortDateAndTime.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
      this.view.fonticonSortDateAndTime.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
    }
  },
  /*
   * function to perform filter on based on channel and Os in activity history list
   */
  setListingFilterData: function () {

    var dataMap = {
      flxCheckBox: "flxCheckBox",
      flxSearchDropDown: "flxSearchDropDown",
      imgCheckBox: "imgCheckBox",
      lblDescription: "lblDescription"
    };

    var data, selectedIndices;
    if (this.view.flxFilter.info.Target === "CHANNEL") {
      data = this.getUniqueList(this.view.segActivityHistory, "lblChannel");
      selectedIndices = this.view.flxFilter.info.CHANNEL === "ALL" ? [[0, Array.from(Array(data.length).keys())]] : this.view.flxFilter.info.CHANNEL;
    } else {
      data = this.getUniqueList(this.view.segActivityHistory, "lblOS");
      selectedIndices = this.view.flxFilter.info.OS === "ALL" ? [[0, Array.from(Array(data.length).keys())]] : this.view.flxFilter.info.OS;
    }

    this.view.statusFilterMenu.segStatusFilterDropdown.widgetDataMap = dataMap;
    this.view.statusFilterMenu.segStatusFilterDropdown.data = data;
    this.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices = selectedIndices;
  },
  /*
   * function to filter activity type and status column
   */
  setDetailsFilterData: function () {
    var dataMap = {
      flxCheckBox: "flxCheckBox",
      flxSearchDropDown: "flxSearchDropDown",
      imgCheckBox: "imgCheckBox",
      lblDescription: "lblDescription"
    };
    var data, selectedIndices;
    if (this.view.flxFilterActivityDetails.info.Target === "ACTIVITY_TYPE") {
      data = this.getUniqueList(this.view.segActivityHistoryDetails, "lblActivityType");
      selectedIndices = this.view.flxFilterActivityDetails.info.ACTIVITY_TYPE === "ALL" ? [[0, Array.from(Array(data.length).keys())]] : this.view.flxFilterActivityDetails.info.ACTIVITY_TYPE;
    } else {
      data = this.getUniqueList(this.view.segActivityHistoryDetails, "lblStatus");
      selectedIndices = this.view.flxFilterActivityDetails.info.ACTIVITY_STATUS === "ALL" ? [[0, Array.from(Array(data.length).keys())]] : this.view.flxFilterActivityDetails.info.ACTIVITY_STATUS;
    }
    this.view.statusFilterMenuDetails.segStatusFilterDropdown.widgetDataMap = dataMap;
    this.view.statusFilterMenuDetails.segStatusFilterDropdown.data = data;
    this.view.statusFilterMenuDetails.segStatusFilterDropdown.selectedIndices = selectedIndices;
  },
  getUniqueList: function (segmentWidget, label) {
    var self =this;
    return (Array.from(new Set(segmentWidget.info.data.map(function (item) { return item[label].info ;}))))
      .map(function (item) {
      var maxLenText = "";
      maxLenText = item.length > maxLenText.length ? item : maxLenText;
      var width = self.AdminConsoleCommonUtils.getLabelWidth(maxLenText)+55+"px";
      if(label === "lblChannel" || label === "lblOS"){
        self.view.flxFilter.width = width;
      }else{
        self.view.flxFilterActivityDetails.width = width;
      }
      return {
        "flxCheckBox": "flxCheckBox", "flxSearchDropDown"
        : "flxSearchDropDown", lblDescription: item, imgCheckBox: { src: "checkboxselected.png" }
      };
    });
  },
  /*
   * filter the segment data based on selected status
   */
  filterBasedOnStatus : function(){
    var self = this;
      var data;
      var selectedDescriptions = [];
      var selectedIndices = "";

      if (self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices) {
        selectedIndices = self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices;
        selectedIndices[0][1].forEach(function (index) {
          selectedDescriptions.push(self.view.statusFilterMenu.segStatusFilterDropdown.data[index].lblDescription);
        });
      }
      if (self.view.flxFilter.info.Target === "CHANNEL") {
        self.view.flxFilter.info.CHANNEL = selectedIndices;
        self.view.flxFilter.info.OS = "ALL";
        data = self.view.segActivityHistory.info.data.filter(function (item) {
          if (selectedDescriptions.indexOf(item.lblChannel.text) >= 0) return true;
          else return false;
        });
      } else {
        self.view.flxFilter.info.OS = selectedIndices;
        self.view.flxFilter.info.CHANNEL = "ALL";
        data = self.view.segActivityHistory.info.data.filter(function (item) {
          if (selectedDescriptions.indexOf(item.lblOS) >= 0) return true;
          else return false;
        });
      }
      if (data.length > 0) {
        self.view.segActivityHistory.setData(data);
        self.view.segActivityHistory.setVisibility(true);
        self.view.rtxMsgActivityHistory.setVisibility(false);
      } else {
        self.view.segActivityHistory.setVisibility(false);
        self.view.rtxMsgActivityHistory.setVisibility(true);
      }
      self.view.forceLayout();
  },
  /*
   * filter the segment data based on selected activity type
   */
  filterBasedOnActivityType : function(){
    var self = this;
      var data;
      var selectedDescriptions = [];
      var selectedIndices = "";

      if (self.view.statusFilterMenuDetails.segStatusFilterDropdown.selectedIndices) {
        selectedIndices = self.view.statusFilterMenuDetails.segStatusFilterDropdown.selectedIndices;
        selectedIndices[0][1].forEach(function (index) {
          selectedDescriptions.push(self.view.statusFilterMenuDetails.segStatusFilterDropdown.data[index].lblDescription);
        });
      }
      if (self.view.flxFilterActivityDetails.info.Target === "ACTIVITY_TYPE") {
        self.view.flxFilterActivityDetails.info.ACTIVITY_TYPE = selectedIndices;
        self.view.flxFilterActivityDetails.info.ACTIVITY_STATUS = "ALL";
        data = self.view.segActivityHistoryDetails.info.data.filter(function (item) {
          if (selectedDescriptions.indexOf(item.lblActivityType) >= 0) return true;
          else return false;
        });
      } else {
        self.view.flxFilterActivityDetails.info.ACTIVITY_STATUS = selectedIndices;
        self.view.flxFilterActivityDetails.info.ACTIVITY_TYPE = "ALL";
        data = self.view.segActivityHistoryDetails.info.data.filter(function (item) {
          if (selectedDescriptions.indexOf(item.lblStatus.text) >= 0) return true;
          else return false;
        });
      }
      if (data.length > 0) {
        self.view.segActivityHistoryDetails.setData(data);
        self.view.segActivityHistoryDetails.setVisibility(true);
        self.view.rtxMsgActivityHistoryDetails.setVisibility(false);
      } else {
        self.view.segActivityHistoryDetails.setVisibility(false);
        self.view.rtxMsgActivityHistoryDetails.setVisibility(true);
      }
      self.AdminConsoleCommonUtils.storeScrollHeight(self.view.flxMainContent);
      self.view.forceLayout();
      self.AdminConsoleCommonUtils.scrollToDefaultHeight(self.view.flxMainContent);
  },
  /*
   * function to check  for null,undefined
   * @param: value to check,return value if its null
   * @return: value/return value/""
   */
  checkForNull : function(value,returnValue){
   if(value){
     return value;
   } else{
     if(returnValue)
       return returnValue;
     else
       return "";
   }
  },
});