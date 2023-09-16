define({
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
            } else if (context.UpdateDBPUserStatus) {
                this.view.flxGeneralInfoWrapper.setLockStatus(context.UpdateDBPUserStatus.status.toUpperCase(), this);

            } else if (context.StatusGroup) {
                this.view.flxGeneralInfoWrapper.processAndFillStatusForEdit(context.StatusGroup, this);

            } else if (context.enrollACustomer) {
                this.view.flxGeneralInfoWrapper.setEnrollmentAccessandStatus();

            } else if (context.CustomerNotes) {
                this.view.Notes.displayNotes(this, context.CustomerNotes);

            } else if (context.OnlineBankingLogin) {
                this.view.CSRAssist.onlineBankingLogin(context.OnlineBankingLogin, this);

            } else if (context.CustomerRequests) {
                this.view.flxRequestAndNotificationList.setVisibility(false);
                this.view.flxMessageSegContainer.setVisibility(true);
                this.resetSkinForHelpCenterTabs();
                this.view.btnMessagesTab.skin = "sknbtnBgffffffLato485c75Radius3Px12Px";
                this.view.btnMessagesTab.setEnabled(false);
                this.sortBy = this.getObjectSorter("id");
                this.resetAllSortImagesRequests();
                this.setDataForRequestsSegment(context.CustomerRequests.sort(this.sortBy.sortData));

            } else if (context.alertMessageRequestOnclick) {
                this.requestTabOnClick();
            } else if (context.alertMessageNotoficationOnclick) {
                this.notificationTabOnClick();

            } else if (context.TravelNotifications) {
                this.resetSkinForHelpCenterTabs();
                this.view.RequestsHelpCenter.setUIForRequestAndNotification(2);
                this.sortBy = this.getObjectSorter("notificationId");
                this.notificationsData = context.TravelNotifications.TravelRequests;
                this.setDataToFilter(this.notificationsData);
                this.resetNotificationSortImages();
                this.loadNotificationPageData = function () {
                    var notificationsList = this.notificationsData.filter(this.searchFilterHelpcenter).sort(this.sortBy.sortData);
                    var filteredNotifList = notificationsList.filter(this.filterBasedOnStatus);
                    this.setDataToNotificationHCSegment(filteredNotifList, false);
                };
                this.loadNotificationPageData();
            } else if (context.CardRequests) {
                this.resetSkinForHelpCenterTabs();
                this.view.RequestsHelpCenter.setUIForRequestAndNotification(1);
                this.sortBy = this.getObjectSorter("Request_id");
                this.requestsData = context.CardRequests.CardAccountRequests;
                this.setDataToFilter(this.requestsData);
                this.resetRequestSortImages();
                this.loadRequestsPageData = function () {
                    var requestsList = this.requestsData.filter(this.searchFilterHelpcenter).sort(this.sortBy.sortData);
                    var filteredReqList = requestsList.filter(this.filterBasedOnStatus);
                    this.setDataToRequestHCSegment(filteredReqList, false);
                };
                this.loadRequestsPageData();
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
    CustomerProfileHelpCenterPreshow: function () {
        this.view.tabs.setSkinForInfoTabs(this.view.tabs.btnTabName3);
        this.view.Notes.setDefaultNotesData(this);
        var screenHeight = kony.os.deviceInfo().screenHeight;
        this.view.flxMainContent.height = screenHeight - 115 + "px";
        this.view.flxGeneralInfoWrapper.changeSelectedTabColour(this.view.flxGeneralInfoWrapper.dashboardCommonTab.btnProfile);
        this.view.flxGeneralInfoWrapper.generalInfoHeader.setDefaultHeaderData(this);
        this.view.flxGeneralInfoWrapper.setFlowActionsForGeneralInformationComponent(this);
        this.view.linkProfilesPopup.initializeLinkProfileActions(this);
        this.view.delinkProfilePopup.delinkProfilePreshow(this);
        this.view.RequestsHelpCenter.enableTabButtons();
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
          if(data[i].legalEntity===legalEntity){
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
        //Requests search skin
        this.view.tbxSearchBoxReq.onBeginEditing = function () {
            scopeObj.view.flxReqSearchContainer.skin = "sknflx0cc44f028949b4cradius30px";
        };
        this.view.tbxSearchBoxReq.onEndEditing = function () {
            scopeObj.view.flxReqSearchContainer.skin = "sknflxBgffffffBorderc1c9ceRadius30px";
        };
        this.view.tbxSearchBoxReq.onKeyUp = function () {
          var searchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.tbxSearchBoxReq.text);
            if (searchText === "") {
                scopeObj.view.flxClearSearchImage.setVisibility(false);
            } else {
                scopeObj.view.flxClearSearchImage.setVisibility(true);
            }
            var searchParameters = [{
                "searchKey": "lblRequestNumber",
                "searchValue": searchText
            },
            {
                "searchKey": "lblCategory",
                "searchValue": searchText
            },
            {
                "searchKey": "lblSubject",
                "searchValue": searchText
            },
            {
                "searchKey": "lblStatus",
                "searchValue": searchText
            }
            ];
            var listOfWidgetsToHide = [scopeObj.view.flxRequestsSegmentHeader, scopeObj.view.lblSeperator6];
            scopeObj.search(scopeObj.view.segRequests, searchParameters, scopeObj.view.rtxMsgRequests, scopeObj.view.flxOtherInfoWrapper, kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ALL"), null, listOfWidgetsToHide);
        };
        this.view.flxClearSearchImage.onClick = function () {
            scopeObj.view.tbxSearchBoxReq.text = "";
            var listOfWidgetsToHide = [scopeObj.view.flxRequestsSegmentHeader, scopeObj.view.lblSeperator6];
            scopeObj.clearSearch(scopeObj.view.segRequests, scopeObj.view.rtxMsgRequests, scopeObj.view.flxOtherInfoWrapper, kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ALL"), null, listOfWidgetsToHide);
            scopeObj.view.flxClearSearchImage.setVisibility(false);
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
        this.view.btnMessagesTab.onClick = function () {
            scopeObj.view.flxRequestAndNotificationList.setVisibility(false);
            scopeObj.view.flxMessageSegContainer.setVisibility(true);
            scopeObj.resetSkinForHelpCenterTabs();
            scopeObj.view.RequestsHelpCenter.enableTabButtons();
            scopeObj.view.btnMessagesTab.setEnabled(false);
            scopeObj.view.btnMessagesTab.skin = "sknbtnBgffffffLato485c75Radius3Px12Px";

            scopeObj.resetAllSortImagesRequests();
            var username = scopeObj.presenter.getCurrentCustomerDetails().Username;
            scopeObj.presenter.getCustomerRequests({
                "username": username
            });
        };
        this.view.btnRequestTab.onClick = function () {
            scopeObj.requestTabOnClick();
        };
        this.view.btnNotificationsTab.onClick = function () {
            scopeObj.notificationTabOnClick();
        };
        this.view.segRequests.onRowClick = function () {
            kony.adminConsole.utils.showProgressBar(scopeObj.view);
            var requestId = scopeObj.view.segRequests.selecteditems[0].lblRequestNumber;
            var currentRequest = scopeObj.presenter.getCurrentCustomerRequest(requestId);
            var requestIdParam = {
              "requestID": requestId
            };
            var customPayload = {
              "currentStatus": currentRequest.statusIdentifier,
              "customerrequest_id": currentRequest.id,
              "customer_Username": currentRequest.username,
              "customerrequest_Customer_id": currentRequest.customer_id,
              "customerrequest_RequestSubject": currentRequest.requestsubject,
              "customerrequest_RequestCategory_id": currentRequest.requestcategory_id,
              "customerrequest_Status_id": currentRequest.status_id,
              "assignTo":currentRequest.assignTo
            }
            scopeObj.presenter.showMessageModule(requestIdParam, customPayload);
        };
        //sorting on requests
        this.view.flxRequestNumber.onClick = function () {
            scopeObj.resetAllSortImagesRequests();
            scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segRequests, "lblRequestNumber", scopeObj.view.fonticonSortRequestNumber, scopeObj.view.flxOtherInfoWrapper, "ALL", null, scopeObj);
        };
        this.view.flxCategory.onClick = function () {
            scopeObj.resetAllSortImagesRequests();
            scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segRequests, "lblCategory", scopeObj.view.fonticonSortCategory, scopeObj.view.flxOtherInfoWrapper, "ALL", null, scopeObj);
        };
        this.view.flxSubject.onClick = function () {
            scopeObj.resetAllSortImagesRequests();
            scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segRequests, "lblSubject", scopeObj.view.fonticonSortSubject, scopeObj.view.flxOtherInfoWrapper, "ALL", null, scopeObj);
        };
        this.view.flxRequestStatus.onClick = function () {
            scopeObj.resetAllSortImagesRequests();
            scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segRequests, "lblStatus", scopeObj.view.fonticonSortRequestStatus, scopeObj.view.flxOtherInfoWrapper, "ALL", null, scopeObj);
        };
        this.view.flxRequestDate.onClick = function () {
            scopeObj.resetAllSortImagesRequests();
            scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segRequests, "lblDate", scopeObj.view.fonticonSortRequestDate, scopeObj.view.flxOtherInfoWrapper, "ALL", null, scopeObj);
        };
        this.view.RequestsHelpCenter.segRequestsHelpCenter.onRowClick = function () {
            scopeObj.view.RequestsHelpCenter.flxHeadingFilters.setVisibility(false);
            scopeObj.view.RequestsHelpCenter.flxSegmentData.setVisibility(false);
            scopeObj.view.RequestsHelpCenter.flxRequestsOnClick.setVisibility(true);
            scopeObj.setDataToRequestsDetailsPage();
        };
        this.view.RequestsHelpCenter.segNotificationsHC.onRowClick = function () {
            scopeObj.view.RequestsHelpCenter.flxHeadingFilters.setVisibility(false);
            scopeObj.view.RequestsHelpCenter.flxSegmentData.setVisibility(false);
            scopeObj.view.RequestsHelpCenter.flxRequestsOnClick.setVisibility(true);
            scopeObj.setDataToNotificationDetailsPage();
        };
        this.view.RequestsHelpCenter.tbxSearchBox.onKeyUp = function () {
            var flag = 0;
            var searchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.RequestsHelpCenter.tbxSearchBox.text);
            if (searchText === "") {
                scopeObj.view.RequestsHelpCenter.flxClearSearchImage.setVisibility(false);
            } else {
                scopeObj.view.RequestsHelpCenter.flxClearSearchImage.setVisibility(true);
                scopeObj.view.RequestsHelpCenter.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
            }
            if (scopeObj.view.RequestsHelpCenter.lblHeadingFilter.text === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Customer_Requests")) {
                scopeObj.loadRequestsPageData();
                flag = 0;
            } else if (scopeObj.view.RequestsHelpCenter.lblHeadingFilter.text === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Customer_Notifications")) {
                scopeObj.loadNotificationPageData();
                flag = 1;
            }
            scopeObj.setHeaderVisibilityWhileFilterSearch(flag);
        };
        this.view.RequestsHelpCenter.flxClearSearchImage.onClick = function () {
            var flag = 0;
            scopeObj.view.RequestsHelpCenter.tbxSearchBox.text = "";
            scopeObj.view.RequestsHelpCenter.flxClearSearchImage.setVisibility(false);
            scopeObj.view.RequestsHelpCenter.flxSearchContainer.skin = "sknflxd5d9ddop100";
            if (scopeObj.view.RequestsHelpCenter.lblHeadingFilter.text === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Customer_Requests")) {
                scopeObj.loadRequestsPageData()
                flag = 0;
            } else if (scopeObj.view.RequestsHelpCenter.lblHeadingFilter.text === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Customer_Notifications")) {
                scopeObj.loadNotificationPageData();
                flag = 1;
            }
            scopeObj.setHeaderVisibilityWhileFilterSearch(flag);
        };
        this.view.RequestsHelpCenter.flxNotificationId.onClick = function () {
            scopeObj.sortBy.column("notificationId");
            scopeObj.loadNotificationPageData();
            scopeObj.resetNotificationSortImages();
        };
        this.view.RequestsHelpCenter.flxDetails.onClick = function () {
            scopeObj.sortBy.column("notificationType");
            scopeObj.loadNotificationPageData();
            scopeObj.resetNotificationSortImages();
        };
        this.view.RequestsHelpCenter.flxRequestId.onClick = function () {
            scopeObj.sortBy.column("Request_id");
            scopeObj.loadRequestsPageData();
            scopeObj.resetRequestSortImages();
        };
        this.view.RequestsHelpCenter.flxDate.onClick = function () {
            scopeObj.sortBy.column("Date");
            scopeObj.loadRequestsPageData();
            scopeObj.resetRequestSortImages();
        };
        this.view.RequestsHelpCenter.flxType.onClick = function () {
            scopeObj.sortBy.column("Type");
            scopeObj.loadRequestsPageData();
            scopeObj.resetRequestSortImages();
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
        this.view.RequestsHelpCenter.flxNotificationStatus.onClick = function () {
            if (scopeObj.view.RequestsHelpCenter.flxRequestStatusFilter.isVisible) {
                scopeObj.view.RequestsHelpCenter.flxRequestStatusFilter.setVisibility(false);
            } else {
                scopeObj.view.RequestsHelpCenter.flxRequestStatusFilter.setVisibility(true);
            }
            var flxLeft = scopeObj.view.RequestsHelpCenter.flxNotificationStatus.frame.x;
            scopeObj.view.RequestsHelpCenter.flxRequestStatusFilter.left = (flxLeft - 17) + "px";
            scopeObj.view.forceLayout();
            scopeObj.view.flxMainContent.scrollToWidget(scopeObj.view.flxOtherInfoWrapper);
        };
        this.view.RequestsHelpCenter.flxStatusHeader.onClick = function () {
            if (scopeObj.view.RequestsHelpCenter.flxRequestStatusFilter.isVisible) {
                scopeObj.view.RequestsHelpCenter.flxRequestStatusFilter.setVisibility(false);
            } else {
                scopeObj.view.RequestsHelpCenter.flxRequestStatusFilter.setVisibility(true);
            }
            var flxLeft = scopeObj.view.RequestsHelpCenter.flxStatusHeader.frame.x;
            scopeObj.view.RequestsHelpCenter.flxRequestStatusFilter.left = (flxLeft - 17) + "px";
            scopeObj.view.forceLayout();
            scopeObj.view.flxMainContent.scrollToWidget(scopeObj.view.flxOtherInfoWrapper);
        };
        this.view.RequestsHelpCenter.statusFilterMenu.segStatusFilterDropdown.onRowClick = function () {
            var dataToFilter = [];
            var flag = 0;
            if (scopeObj.view.RequestsHelpCenter.lblHeadingFilter.text === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Customer_Requests")) {
                dataToFilter = scopeObj.view.RequestsHelpCenter.segRequestsHelpCenter.info.unMappedData;
                flag = 0;
            } else if (scopeObj.view.RequestsHelpCenter.lblHeadingFilter.text === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Customer_Notifications")) {
                dataToFilter = scopeObj.view.RequestsHelpCenter.segNotificationsHC.info.unMappedData;
                flag = 1;
            } else { }
            var filteredData = dataToFilter.filter(scopeObj.filterBasedOnStatus);
            if (filteredData.length > 0) { //display segment
                if (flag === 1)
                    scopeObj.setDataToNotificationHCSegment(filteredData);
                else
                    scopeObj.setDataToRequestHCSegment(filteredData);
            } else { //display no results
                if (flag === 1) {
                    scopeObj.setDataToNotificationHCSegment([]);
                } else {
                    scopeObj.setDataToRequestHCSegment([]);
                }
                scopeObj.setHeaderVisibilityWhileFilterSearch(flag);
            }
            scopeObj.view.forceLayout();
            scopeObj.view.flxMainContent.scrollToWidget(scopeObj.view.flxOtherInfoWrapper);

        };
    },
    requestTabOnClick: function () {
        var scopeObj = this;
        var username = scopeObj.presenter.getCurrentCustomerDetails().Username;
        scopeObj.presenter.getCardRequests({ "Username": username });
    },
    notificationTabOnClick: function () {
        var scopeObj = this;
        var username = scopeObj.presenter.getCurrentCustomerDetails().Username;
        scopeObj.presenter.getTravelNotifications({ "Username": username });
    },
    resetSkinForHelpCenterTabs: function () {
        var self = this;
        self.view.btnMessagesTab.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
        self.view.btnRequestTab.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
        self.view.btnNotificationsTab.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
    },
    resetAllSortImagesRequests: function () {
        if (this.view.fonticonSortRequestNumber.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fonticonSortRequestNumber.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fonticonSortRequestNumber.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
        if (this.view.fonticonSortCategory.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fonticonSortCategory.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fonticonSortCategory.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
        if (this.view.fonticonSortSubject.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fonticonSortSubject.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fonticonSortSubject.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
        if (this.view.fonticonSortRequestStatus.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fonticonSortRequestStatus.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fonticonSortRequestStatus.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
        if (this.view.fonticonSortRequestDate.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fonticonSortRequestDate.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fonticonSortRequestDate.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
    },
    resetNotificationSortImages: function () {
        var self = this;
        self.determineSortFontIcon(this.sortBy, 'notificationId', this.view.RequestsHelpCenter.lblIconNotificationIdSort);
        self.determineSortFontIcon(this.sortBy, 'notificationType', this.view.RequestsHelpCenter.lblIconDetailsSort);
    },
    resetRequestSortImages: function () {
        var self = this;
        self.determineSortFontIcon(this.sortBy, 'Request_id', self.view.RequestsHelpCenter.lblIconIdSort);
        self.determineSortFontIcon(this.sortBy, 'Date', self.view.RequestsHelpCenter.lblIconDateSort);
        self.determineSortFontIcon(this.sortBy, 'Type', self.view.RequestsHelpCenter.lblIconTypeSort);
    },
    setDataForRequestsSegment: function (CustomerRequests) {
        var dataMap = {
            "fonticonArrow": "fonticonArrow",
            "flxArrow": "flxArrow",
            "flxCustMangRequestDesc": "flxCustMangRequestDesc",
            "flxCustMangRequestHeader": "flxCustMangRequestHeader",
            "flxCustMangRequest": "flxCustMangRequest",
            "flxCustMangRequestSelected": "flxCustMangRequestSelected",
            "flxFirstColoum": "flxFirstColoum",
            "flxSeperator": "flxSeperator",
            "lblCategory": "lblCategory",
            "lblDate": "lblDate",
            "lblAssignTo": "lblAssignTo",
            "lblSubject": "lblSubject",
            "lblRequestNumber": "lblRequestNumber",
            "lblSeperator": "lblSeperator",
            "lblStatus": "lblStatus",
            "rtxDescription": "rtxDescription"
        };
        var data = [];
        var toAdd;
        if (CustomerRequests.length > 0) {
            for (var i = 0; i < CustomerRequests.length; i++) {
                var subject = (CustomerRequests[i].requestsubject.length > 25) ? CustomerRequests[i].requestsubject.substr(0, 24) + ".." : CustomerRequests[i].requestsubject;
                toAdd = {
                    "fonticonArrow": {
                        "text": "",
                        "isVisible": false
                    },
                    "flxArrow": "flxArrow",
                    "flxCustMangRequestDesc": "flxCustMangRequestDesc",
                    "flxCustMangRequestHeader": "flxCustMangRequestHeader",
                    "flxCustMangRequest": "flxCustMangRequest",
                    "flxCustMangRequestSelected": "flxCustMangRequestSelected",
                    "flxFirstColoum": "flxFirstColoum",
                    "flxSeperator": "flxSeperator",

                    "lblCategory": CustomerRequests[i].requestcategory_id,
                    "lblDate": this.getLocaleDate(CustomerRequests[i].requestCreatedDate),
                    "lblSubject": subject + " (" + CustomerRequests[i].unreadmsgs + ").",
                    "lblRequestNumber": CustomerRequests[i].id,
                    "lblSeperator": ".",
                    "lblStatus": CustomerRequests[i].status_id,
                    "lblAssignTo": CustomerRequests[i].assignTo,
                    "rtxDescription": subject + " (" + CustomerRequests[i].unreadmsgs + ").",
                    "FullSubject": CustomerRequests[i].requestsubject,
                    "StatusIdentifier": CustomerRequests[i].statusIdentifier,
                    "template": "flxCustMangRequest"
                };

                data.push(toAdd);
            }
            this.view.segRequests.widgetDataMap = dataMap;
            this.view.segRequests.setData(data);
            this.view.flxRequestsSegmentHeader.setVisibility(true);
            this.view.lblSeperator6.setVisibility(true);
            this.view.rtxMsgRequests.setVisibility(false);
            this.view.segRequests.setVisibility(true);
            this.view.segRequests.info = {
                "data": data,
                "searchAndSortData": data
            };
            this.view.flxRequestsSearch.setVisibility(true);
        } else {
            this.view.flxRequestsSegmentHeader.setVisibility(false);
            this.view.lblSeperator6.setVisibility(false);
            this.view.rtxMsgRequests.setVisibility(true);
            this.view.segRequests.setVisibility(false);
            this.view.flxRequestsSearch.setVisibility(false);
        }
        this.view.tbxSearchBoxReq.text = "";
        this.showRequestsScreen();
    },
    showRequestsScreen: function () {
        this.view.flxRequestsWrapper.setVisibility(true);
        this.view.forceLayout();
        this.view.flxMainContent.scrollToWidget(this.view.flxOtherInfoWrapper);
    },
    setDataToFilter: function (data) {
        var self = this;
        var statusList = [];
        for (var i = 0; i < data.length; i++) {
            if ("status" in data[i]) {  // for notifications
                if (!statusList.contains(data[i].status)) {
                    statusList.push(data[i].status);
                }
            } else { // for requests
                if (!statusList.contains(data[i].Status)) {
                    statusList.push(data[i].Status);
                }
            }
        }
        var widgetMap = {
            "Status_id": "Status_id",
            "flxSearchDropDown": "flxSearchDropDown",
            "flxCheckBox": "flxCheckBox",
            "imgCheckBox": "imgCheckBox",
            "lblDescription": "lblDescription"
        };
        var statusData = statusList.map(function (rec) {
            return {
                "flxSearchDropDown": "flxSearchDropDown",
                "flxCheckBox": "flxCheckBox",
                "imgCheckBox": "checkbox.png",
                "lblDescription": rec
            };
        });
        self.view.RequestsHelpCenter.statusFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
        self.view.RequestsHelpCenter.statusFilterMenu.segStatusFilterDropdown.setData(statusData);

        var selInd = [];
        for (var j = 0; j < statusList.length; j++) {
            selInd.push(j);
        }
        self.view.RequestsHelpCenter.statusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0, selInd]];
        self.view.forceLayout();
    },
    searchFilterHelpcenter: function (record) {
        var scopeObj = this;
        var searchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.RequestsHelpCenter.tbxSearchBox.text);
        if (typeof searchText === 'string' && searchText.length > 0) {
            if (scopeObj.view.RequestsHelpCenter.lblHeadingFilter.text === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Customer_Requests")) {
                return record.Request_id.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
            } else if (scopeObj.view.RequestsHelpCenter.lblHeadingFilter.text === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Customer_Notifications")) {
                return record.notificationId.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
            }
        } else {
            return true;
        }
    },
    setDataToNotificationHCSegment: function (data, isFilter) {
        var self = this;
        var widgetMap = {
            "endDate": "endDate",
            "cardCount": "cardCount",
            "destinations": "destinations",
            "additionalNotes": "additionalNotes",
            "startDate": "startDate",
            "cards": "cards",
            "contactNo": "contactNo",
            "cardsCount": "cardsCount",
            "notificationType": "notificationType",
            "lblNotificationId": "lblNotificationId",
            "lblDetails": "lblDetails",
            "lblSelectedCards": "lblSelectedCards",
            "lblIconStatus": "lblIconStatus",
            "lblStatus": "lblStatus",
            "lblIconAction": "lblIconAction",
            "flxIconCont": "flxIconCont",
            "flxNotificationsOuter": "flxNotificationsOuter"
        };
        if (data.length > 0) {
            var segData = data.map(function (record) {
                var status = record.status;
                var statusSkin = "";
                if (status === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
                    statusSkin = "sknIcon13pxGreen";
                } else if (status === "Cancelled") {
                    statusSkin = "sknIcon13pxGray";
                } else if (status === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Expired")) {
                    statusSkin = "sknIcon13pxRed";
                }
                var isShown = false;
                if (status === "Active") {
                    isShown = true;
                }
                return {
                    "endDate": self.getLocaleDate(record.endDate),
                    "cardCount": record.cardCount,
                    "destinations": record.destinations.replace(/-/g, "\n"),
                    "additionalNotes": record.additionalNotes,
                    "startDate": self.getLocaleDate(record.startDate),
                    "cards": record.cardNumber,
                    "contactNo": record.contactNumber,
                    "cardsCount": record.cardCount,
                    "notificationType": record.notificationType,
                    "lblNotificationId": record.notificationId,
                    "lblDetails": record.notificationType,
                    "lblSelectedCards": record.cardNumber.replace(/,/g, "\n"),
                    "lblIconStatus": {
                        "skin": statusSkin,
                        "text": kony.i18n.getLocalizedString("i18n.userwidgetmodel.lblFontIconStatus1")
                    },
                    "lblStatus": record.status,
                    "lblIconAction": {
                        "skin": "sknIconCancelNotification28px",
                        "text": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.lblFontIconCancelNotification"),
                        "tooltip": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Cancel_Notification")
                    },
                    "flxIconCont": {
                        "isVisible": isShown,
                        "onClick": self.cancelNotification
                    },
                    "template": "flxNotificationsOuter"
                }
            });
            self.view.RequestsHelpCenter.segNotificationsHC.widgetDataMap = widgetMap;
            self.view.RequestsHelpCenter.segNotificationsHC.setData(segData);
            if (isFilter === false) {
                self.view.RequestsHelpCenter.segNotificationsHC.info = {
                    "unMappedData": data,
                    "mappedData": segData
                };
            }
            self.view.RequestsHelpCenter.flxNotificationNoResults.setVisibility(false);
            self.view.RequestsHelpCenter.flxHeadingFilters.setVisibility(true);
            self.view.RequestsHelpCenter.flxnotificationSegHeader.setVisibility(true);
            self.view.RequestsHelpCenter.segNotificationsHC.setVisibility(true);
        } else {
            self.view.RequestsHelpCenter.segNotificationsHC.setData([]);
            self.view.RequestsHelpCenter.segNotificationsHC.setVisibility(false);
            self.view.RequestsHelpCenter.flxHeadingFilters.setVisibility(false);
            self.view.RequestsHelpCenter.flxnotificationSegHeader.setVisibility(false);
            self.view.RequestsHelpCenter.flxNotificationNoResults.setVisibility(true);
        }

        self.view.flxRequestsWrapper.setVisibility(true);
        self.view.forceLayout();
        self.view.flxMainContent.scrollToWidget(self.view.flxOtherInfoWrapper);
    },
    setDataToNotificationDetailsPage: function () {
        var self = this;
        var index = self.view.RequestsHelpCenter.segNotificationsHC.selectedRowIndex;
        var rowIndex,
            rowData;
        if (index) {
            rowIndex = index[1];
            rowData = self.view.RequestsHelpCenter.segNotificationsHC.data[rowIndex];
            var cards = rowData.cards.replace(/,/g, "\n");
            var departDate = self.getLocaleDate(rowData.startDate);
            var returnDate = self.getLocaleDate(rowData.endDate);
            self.view.RequestsHelpCenter.lblIdValue.text = rowData.lblNotificationId;
            self.view.RequestsHelpCenter.lblStatus.text = rowData.lblStatus;
            self.view.RequestsHelpCenter.lblIconStatus.skin = rowData.lblIconStatus.skin;
            self.view.RequestsHelpCenter.lblIconStatus.text = rowData.lblIconStatus.text;
            self.view.RequestsHelpCenter.detailsRow1.lblData1.text = rowData.lblDetails;
            self.view.RequestsHelpCenter.detailsRow1.lblData2.text = departDate;
            self.view.RequestsHelpCenter.detailsRow1.lblData3.text = returnDate;
            self.view.RequestsHelpCenter.lblData1.text = cards;
            self.view.RequestsHelpCenter.lblData2.text = rowData.destinations;
            self.view.RequestsHelpCenter.lblData3.text = rowData.contactNo;
            self.view.RequestsHelpCenter.lblDataRow3Col1.text = rowData.additionalNotes;
        }
        self.view.forceLayout();
        self.view.flxMainContent.scrollToWidget(self.view.flxOtherInfoWrapper);
    },
    cancelNotification: function () {
        var self = this;
        var rowSelected = self.view.RequestsHelpCenter.segNotificationsHC.selectedRowIndex;
        self.view.popUpConfirmation.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Cancel_travel_notification");
        self.view.popUpConfirmation.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Are_you_sure_to_Cancel_travel_notification");
        self.view.popUpConfirmation.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
        self.view.popUpConfirmation.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.secureimage.YesCancel");
        if (rowSelected) {
            var rowData = self.view.RequestsHelpCenter.segNotificationsHC.data[rowSelected[1]];

            var param = {
                "notificationId": rowData.lblNotificationId,
                "username": self.presenter.getCurrentCustomerDetails().Username
            };
            self.view.flxPopUpConfirmation.setVisibility(true);
            self.view.popUpConfirmation.flxPopUpClose.onClick = function () {
                self.view.flxPopUpConfirmation.setVisibility(false);
            };
            self.view.popUpConfirmation.btnPopUpCancel.onClick = function () {
                self.view.flxPopUpConfirmation.setVisibility(false);
            };
            self.view.popUpConfirmation.btnPopUpDelete.onClick = function () {
                self.presenter.cancelNotification(param);
                self.view.flxPopUpConfirmation.setVisibility(false);
            };
        }

    },
    onHoverNotificationSeg: function (widget, context) {
        var self = this;
        var rowData = self.view.RequestsHelpCenter.segNotificationsHC.data[context.rowIndex];

        if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
            if (rowData.flxIconCont.isVisible === false) {
                rowData.flxIconCont.isVisible = true;
                rowData.flxIconCont.onClick = self.cancelNotification;
                self.view.RequestsHelpCenter.segNotificationsHC.setDataAt(rowData, context.rowIndex);
            }
        } else if (context.eventType === constants.ONHOVER_MOUSE_MOVE) {
            if (rowData.flxIconCont.isVisible === false) {
                rowData.flxIconCont.isVisible = true;
                rowData.flxIconCont.onClick = self.cancelNotification;
                self.view.RequestsHelpCenter.segNotificationsHC.setDataAt(rowData, context.rowIndex);
            }
        } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
            if (rowData.flxIconCont.isVisible === true) {
                rowData.flxIconCont.isVisible = false;
                //rowData.flxIconCont.onClick = self.unSelectedOption;
                self.view.RequestsHelpCenter.segNotificationsHC.setDataAt(rowData, context.rowIndex);
            }
        }
    },

    filterBasedOnStatus: function (data) {
        var selInd = this.view.RequestsHelpCenter.statusFilterMenu.segStatusFilterDropdown.selectedIndices;
        var selectedItems = [];
        var filteredData = [];
        if (selInd) {
            selectedItems = this.view.RequestsHelpCenter.statusFilterMenu.segStatusFilterDropdown.selectedItems;
        }
        var selectedStatus = selectedItems.map(function (rec) {
            return rec.lblDescription;
        });
        if ("status" in data) {
            if (selectedStatus.indexOf(data.status) >= 0) {
                return data;
            }
        } else {
            if (selectedStatus.indexOf(data.Status) >= 0) {
                return data;
            }
        }
    },
    setDataToRequestHCSegment: function (data, isFilter) {
        var self = this;
        var widgetMap = {
            "reason": "reason",
            "deliveryMode": "deliveryMode",
            "deliveryDetails": "deliveryDetails",
            "cardName": "cardName",
            "cardNumber": "cardNumber",
            "lblRequestId": "lblRequestId",
            "lblDate": "lblDate",
            "lblRequestType": "lblRequestType",
            "lblCardAccount": "lblCardAccount",
            "lblIconStatus": "lblIconStatus",
            "lblStatus": "lblStatus",
            "flxRequestsOuter": "flxRequestsOuter"
        };
        if (data.length > 0) {
            var segData = data.map(function (record) {
                var status = record.Status;
                var statusSkin = "";
                if (status === "New" || status === "Active") {
                    statusSkin = "sknIcon13pxBlue";
                } else if (status === "Cancelled") {
                    statusSkin = "sknIcon13pxGray";
                } else if (status === "In Progress") {
                    statusSkin = "sknIconOrange";
                } else if (status === "Completed") {
                    statusSkin = "sknIcon13pxGreen"
                }
                return {
                    "reason": record.Reason,
                    "deliveryMode": record.DeliveryMode,
                    "deliveryDetails": record.DeliveryDetails,
                    "cardName": record.CardAccountName === undefined ? "" : record.CardAccountName,
                    "cardNumber": record.CardAccountNumber === undefined ? "" : record.CardAccountNumber,
                    "lblRequestId": record.Request_id,
                    "lblDate": self.getLocaleDateAndTime(self.getDateInstanceFromDBDateTime(record.Date)),
                    "lblRequestType": record.Type,
                    "lblCardAccount": (record.CardAccountName === undefined ? "" : record.CardAccountName) + " " + (record.CardAccountNumber === undefined ? "" : record.CardAccountNumber),
                    "lblIconStatus": {
                        "skin": statusSkin,
                        "text": kony.i18n.getLocalizedString("i18n.userwidgetmodel.lblFontIconStatus1")
                    },
                    "lblStatus": record.Status,
                    "template": "flxRequestsOuter"
                }
            });
            self.view.RequestsHelpCenter.segRequestsHelpCenter.widgetDataMap = widgetMap;
            self.view.RequestsHelpCenter.segRequestsHelpCenter.setData(segData);
            if (isFilter === false) {
                self.view.RequestsHelpCenter.segRequestsHelpCenter.info = {
                    "unMappedData": data,
                    "mappedData": segData
                };
            }
            self.view.RequestsHelpCenter.segRequestsHelpCenter.setVisibility(true);
            self.view.RequestsHelpCenter.flxHeadingFilters.setVisibility(true);
            self.view.RequestsHelpCenter.flxRequestSegHeader.setVisibility(true);
            self.view.RequestsHelpCenter.flxNoResults.setVisibility(false);
        } else {
            self.view.RequestsHelpCenter.segRequestsHelpCenter.setData([]);
            self.view.RequestsHelpCenter.flxHeadingFilters.setVisibility(false);
            self.view.RequestsHelpCenter.flxRequestSegHeader.setVisibility(false);
            self.view.RequestsHelpCenter.segRequestsHelpCenter.setVisibility(false);
            self.view.RequestsHelpCenter.flxNoResults.setVisibility(true);
        }


        self.view.flxRequestsWrapper.setVisibility(true);
        self.view.forceLayout();
        self.view.flxMainContent.scrollToWidget(self.view.flxOtherInfoWrapper);
    },
    setDataToRequestsDetailsPage: function () {
        var self = this;
        var index = self.view.RequestsHelpCenter.segRequestsHelpCenter.selectedRowIndex;
        var rowIndex,
            rowData;
        if (index) {
            rowIndex = index[1];
            rowData = self.view.RequestsHelpCenter.segRequestsHelpCenter.data[rowIndex];
            //var accSubStr = rowData.lblCardAccount.replace(/\*|[0-9]/i,"-").split("-");
            self.view.RequestsHelpCenter.lblIdValue.text = rowData.lblRequestId;
            self.view.RequestsHelpCenter.lblStatus.text = rowData.lblStatus;
            self.view.RequestsHelpCenter.lblIconStatus.skin = rowData.lblIconStatus.skin;
            self.view.RequestsHelpCenter.lblIconStatus.text = rowData.lblIconStatus.text;
            self.view.RequestsHelpCenter.detailsRow1.lblData1.text = rowData.lblRequestType;
            self.view.RequestsHelpCenter.detailsRow1.lblData2.text = rowData.cardName === "" ? kony.i18n.getLocalizedString("i18n.frmCustomers.NA") : rowData.cardName;
            self.view.RequestsHelpCenter.detailsRow1.lblData3.text = rowData.cardNumber === "" ? kony.i18n.getLocalizedString("i18n.frmCustomers.NA") : rowData.cardNumber;
            self.view.RequestsHelpCenter.lblData1.text = rowData.lblDate;
            self.view.RequestsHelpCenter.lblData2.text = rowData.reason;
            self.view.RequestsHelpCenter.lblData3.text = rowData.deliveryMode;
            self.view.RequestsHelpCenter.lblDataRow3Col1.text = rowData.deliveryDetails;
        }
        self.view.forceLayout();
        self.view.flxMainContent.scrollToWidget(self.view.flxOtherInfoWrapper);
    },
    setHeaderVisibilityWhileFilterSearch: function (flag) {
        var scopeObj = this;
        scopeObj.view.RequestsHelpCenter.flxHeadingFilters.setVisibility(true);
        if (scopeObj.view.RequestsHelpCenter.statusFilterMenu.segStatusFilterDropdown.selectedIndices === null && flag === 0) {
            scopeObj.view.RequestsHelpCenter.flxRequestSegHeader.setVisibility(true);
        } else if (scopeObj.view.RequestsHelpCenter.statusFilterMenu.segStatusFilterDropdown.selectedIndices === null && flag === 1) {
            scopeObj.view.RequestsHelpCenter.flxnotificationSegHeader.setVisibility(true);
        }
        scopeObj.view.forceLayout();
        scopeObj.view.flxMainContent.scrollToWidget(scopeObj.view.flxOtherInfoWrapper);
    },
});