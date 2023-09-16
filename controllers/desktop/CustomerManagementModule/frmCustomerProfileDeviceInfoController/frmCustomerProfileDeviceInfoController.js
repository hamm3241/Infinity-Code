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
      } else if(context.progressBar && context.progressBar.show) {
        if (context.progressBar.show === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"))
          kony.adminConsole.utils.showProgressBar(this.view);
        else
          kony.adminConsole.utils.hideProgressBar(this.view);
      } else if (context.CustomerBasicInfo) {
        this.view.flxGeneralInfoWrapper.setBasicInformation(context.CustomerBasicInfo, this);
		    this.view.tabs.setCustomerProfileTabs(this);
      } else if (context.UpdateDBPUserStatus) {
        this.view.flxGeneralInfoWrapper.setLockStatus(context.UpdateDBPUserStatus.status.toUpperCase(), this);

      } else if (context.enrollACustomer) {
        this.view.flxGeneralInfoWrapper.setEnrollmentAccessandStatus();

      } else if (context.StatusGroup) {
        this.view.flxGeneralInfoWrapper.processAndFillStatusForEdit(context.StatusGroup, this);

      } else if (context.CustomerNotes) {
        this.view.Notes.displayNotes(this, context.CustomerNotes);

      } else if (context.OnlineBankingLogin) {
        this.view.CSRAssist.onlineBankingLogin(context.OnlineBankingLogin, this);
      } else if (context.CustomerDevices) {
        this.view.tabs.setSkinForInfoTabs(this.view.tabs.btnTabName8);
        this.showDeviceInfoScreen();
        if (context.CustomerDevices.length === 0) {
          this.view.rtxMsgDeviceInfo.setVisibility(true);
          this.view.flxDeviceMang.setVisibility(false);
          this.view.forceLayout();
        }
        else {
          this.view.rtxMsgDeviceInfo.setVisibility(false);
          this.view.flxDeviceMang.setVisibility(true);
          this.view.DeviceMang.segListing.setVisibility(true);
          this.view.forceLayout();
          this.setDataToDeviceManagementSegment(context.CustomerDevices);
          this.view.DeviceMang.flxStatusFilter.info = {
            "Target": "STATUS",
            "CHANNEL": "ALL",
            "STATUS": "ALL"
          };
          this.setDeviceFilterData();
          this.view.DeviceMang.flxChannelFilter.info = {
            "Target": "CHANNEL",
            "CHANNEL": "ALL",
            "STATUS": "ALL"
          };
          this.setDeviceChannelFilterData();
        }
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
      } else if(context.confirmationPopup){
        this.AdminConsoleCommonUtils.openConfirm(context.confirmationPopup.model, this);
      } else if(context.informationPopup){
		this.AdminConsoleCommonUtils.showInformationPopup(context.informationPopup.model, this);
      }else if(context.forceLayout){
        this.view.forceLayout();
      }
    }
  },
  CustomerProfileDeviceInfoPreshow: function () {
    this.view.tabs.setSkinForInfoTabs(this.view.tabs.btnTabName8);
    this.view.Notes.setDefaultNotesData(this);
    var screenHeight = kony.os.deviceInfo().screenHeight;
    this.view.flxMainContent.height = screenHeight - 115 + "px";
    this.view.flxGeneralInfoWrapper.changeSelectedTabColour(this.view.flxGeneralInfoWrapper.dashboardCommonTab.btnProfile);
    this.view.flxGeneralInfoWrapper.generalInfoHeader.setDefaultHeaderData(this);
    this.view.flxGeneralInfoWrapper.setFlowActionsForGeneralInformationComponent(this);
    this.view.linkProfilesPopup.initializeLinkProfileActions(this);
    this.view.delinkProfilePopup.delinkProfilePreshow(this);
    this.view.flxDeviceAuthenticator.setVisibility(false);
    this.view.flxDeviceDetails.setVisibility(false);
    this.view.flxMasterReset.setVisibility(false);
    this.view.flxDeviceActivity.setVisibility(true);
    this.view.dropdownEntity.flxSegEntity.setVisibility(false);
    var LEData = this.presenter.getDataLegalEntities();
    if(LEData) {
    this.setDataforLegalEntity(LEData);
    } else {
      var legalEntityId = this.presenter.getLegalEntity();
      var legalEntity = this.getLEDesc(legalEntityId);
      this.setDataforSingleLegalEntity(legalEntity);
    } 
    this.view.forceLayout();
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
    this.view.DeviceMang.flxTooltip.onHover = function (widget, context) {
      if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        scopeObj.view.DeviceMang.flxTooltip.setVisibility(false);
      }
    };
    this.view.DeviceMang.flxChannel.onClick = function () {
      scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
      scopeObj.view.DeviceMang.flxStatusFilter.setVisibility(false);
      if (scopeObj.view.DeviceMang.flxChannelFilter.isVisible) {
        scopeObj.view.DeviceMang.flxChannelFilter.setVisibility(false);
        scopeObj.view.forceLayout();
      } else {
        var flxRight = scopeObj.view.DeviceMang.flxHeader.frame.width - scopeObj.view.DeviceMang.flxChannel.frame.x - scopeObj.view.DeviceMang.flxChannel.frame.width;
        var iconRight = scopeObj.view.DeviceMang.flxChannel.frame.width - scopeObj.view.DeviceMang.fontIconSortChannel.frame.x;
        scopeObj.view.DeviceMang.flxChannelFilter.right = (flxRight + iconRight + 5) +"px";
        scopeObj.view.DeviceMang.flxChannelFilter.setVisibility(true);

        if (scopeObj.view.DeviceMang.flxChannelFilter.info && scopeObj.view.DeviceMang.flxChannelFilter.info.Target) {
          scopeObj.view.DeviceMang.flxChannelFilter.info.Target = "CHANNEL";
        } else {
          scopeObj.view.DeviceMang.flxChannelFilter.info = {
            "Target": "CHANNEL",
            "CHANNEL": "ALL",
            "STATUS": "ALL"
          };
        }
        scopeObj.setDeviceChannelFilterData();
        scopeObj.view.forceLayout();
      }
      scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
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
    this.view.DeviceMang.flxStatus.onClick = function () {
      scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
      scopeObj.view.DeviceMang.flxChannelFilter.setVisibility(false);
      if (scopeObj.view.DeviceMang.flxStatusFilter.isVisible) {
        scopeObj.view.DeviceMang.flxStatusFilter.setVisibility(false);
        scopeObj.view.forceLayout();
      } else {
        var flxRight = scopeObj.view.DeviceMang.flxHeader.frame.width - scopeObj.view.DeviceMang.flxStatus.frame.x - scopeObj.view.DeviceMang.flxChannel.frame.width;
        var iconRight = scopeObj.view.DeviceMang.flxStatus.frame.width - scopeObj.view.DeviceMang.fontIconFilterStatus.frame.x;
        scopeObj.view.DeviceMang.flxStatusFilter.right = (flxRight + iconRight - 66) +"px";
        scopeObj.view.DeviceMang.flxStatusFilter.setVisibility(true);

        if (scopeObj.view.DeviceMang.flxStatusFilter.info && scopeObj.view.DeviceMang.flxStatusFilter.info.Target) {
          scopeObj.view.DeviceMang.flxStatusFilter.info.Target = "STATUS";
        } else {
          scopeObj.view.DeviceMang.flxStatusFilter.info = {
            "Target": "STATUS",
            "CHANNEL": "ALL",
            "STATUS": "ALL"
          };
        }
        scopeObj.setDeviceFilterData();
        scopeObj.view.forceLayout();
      }
      scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
    };
    this.view.DeviceMang.flxLastUserIP.onClick = function () {
      scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
      scopeObj.resetAllSortImagesDevice();
      var finalData = scopeObj.AdminConsoleCommonUtils.getSortData(scopeObj.view.DeviceMang.segListing, "lblLastUserIP.text", scopeObj.view.DeviceMang.fontIconSortLastUserIP,scopeObj);
      scopeObj.view.DeviceMang.segListing.setData(finalData);
      scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
    };
    this.view.DeviceMang.flxLastAcessedOn.onClick = function () {
      scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
      scopeObj.resetAllSortImagesDevice();
      var finalData = scopeObj.AdminConsoleCommonUtils.getSortData(scopeObj.view.DeviceMang.segListing, "lastAccessedts", scopeObj.view.DeviceMang.fontIconSortLastAcessedOn,scopeObj);
      scopeObj.view.DeviceMang.segListing.setData(finalData);
      scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
    };
    this.view.DeviceMang.flxStatusFilter.onHover = function (widget, context) {
      if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
        scopeObj.view.DeviceMang.flxStatusFilter.setVisibility(false);
        scopeObj.view.forceLayout();
        scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
      }
    };
    this.view.DeviceMang.flxChannelFilter.onHover = function (widget, context) {
      if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
        scopeObj.view.DeviceMang.flxChannelFilter.setVisibility(false);
        scopeObj.view.forceLayout();
        scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
      }
    };
    this.view.DeviceMang.channelFilterMenu.segStatusFilterDropdown.onRowClick = function () {
      scopeObj.filterBasedOnChannel();
    };
    this.view.DeviceMang.statusFilterMenu.segStatusFilterDropdown.onRowClick = function () {
      scopeObj.filterBasedOnStatus();
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
    this.view.DeviceMang.flxDeviceInfo.onHover = function (widget, context) {
      if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
        scopeObj.view.DeviceMang.flxDeviceInfo.setVisibility(false);
        scopeObj.view.forceLayout();
        scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
      }
    };

    this.view.btnTab1.onClick = function () {
      scopeObj.presenter.getCustomerDevices({ "$filter": "Customer_id eq " + scopeObj.presenter.getCurrentCustomerDetails().Customer_id});
      scopeObj.view.flxDeviceAuthenticator.setVisibility(false);
      scopeObj.view.flxDeviceDetails.setVisibility(false);
      scopeObj.view.flxMasterReset.setVisibility(false);
    };
    
    this.configureSCADeviceManagement();
  },
  
  configureSCADeviceManagement : function(){
    let scopeObj = this;
	scopeObj.AdminConsoleCommonUtils.fetchClientProperties()
      .then((clientProps) => {
        if(scopeObj.AdminConsoleCommonUtils.isSCAEnable(clientProps)){
          showMasterResetTab();
          if(scopeObj.AdminConsoleCommonUtils.isSCADeviceManagementEnable(clientProps)){
            showDeviceDetailsTab();
            if(scopeObj.AdminConsoleCommonUtils.isSCAAuthenticatorManagementEnable(clientProps)){
              showAuthenticatorTab();
            }else{
              hideAuthenticatorTab();
            }
          }else{
            hideAuthenticatorTab();
            hideDeviceDetailsTab();
          }
        }else{
          hideAuthenticatorTab();
          hideDeviceDetailsTab();
          hideMasterResetTab();
        }
        scopeObj.view.forceLayout();
    }).catch((err) => {
        kony.print(err);
        hideAuthenticatorTab();
        hideDeviceDetailsTab();
        hideMasterResetTab();
      	scopeObj.view.forceLayout();
    });
    
    function hideDeviceDetailsTab(){
      scopeObj.view.btnTab3.isVisible = false;
    }
    
    function hideAuthenticatorTab(){
      scopeObj.view.btnTab2.isVisible = false;
    }
    
    function hideMasterResetTab(){
      scopeObj.view.btnTab4.isVisible = false;
    }
    
    function showDeviceDetailsTab(){
      scopeObj.view.btnTab3.isVisible = true;
      scopeObj.view.btnTab3.onClick = function () {
        scopeObj.showDeviceDetailsScreen();
      };
    }
    
    function showAuthenticatorTab(){
      scopeObj.view.btnTab2.isVisible = true;
      scopeObj.view.btnTab2.onClick = function () {
        scopeObj.showAuthenticatorsScreen();
      };
    }
    
    function showMasterResetTab(){
      scopeObj.view.btnTab4.isVisible = true;
      scopeObj.view.btnTab4.onClick = function () {
        scopeObj.showMasterResetScreen();
      };
    }    
  },
  /*
   * set devices info to segment
   *@param : devices list
   */
  setDataToDeviceManagementSegment: function (dataToAdd) {
    var scopeObj = this;

    var dataMap = {
      "flxDeviceManagement": "flxDeviceManagement",
      "flxRow": "flxRow",
      "flxDeviceNameValue": "flxDeviceNameValue",
      "lblSeperator": "lblSeperator",
      "flxDeviceName": "flxDeviceName",
      "lblDeviceName": "lblDeviceName",
      "lblVersion":"lblVersion",
      "flxDeviceInfo": "flxDeviceInfo",
      "fontIconDeviceInfo": "fontIconDeviceInfo",
      "lblChannel": "lblChannel",
      "lblLastUserIP": "lblLastUserIP",
      "lblLastAcessedOn": "lblLastAcessedOn",
      "lblStatus": "lblStatus",
      "flxStatusInfo": "flxStatusInfo",
      "fontIconStatusInfo": "fontIconStatusInfo"
    };

    var toSegment = function (dataToAdd) {
      var revisedDevicename = dataToAdd.DeviceName, deviceVersion = 'N/A';
      try{
        var knownDevicesList = ['Mobile Safari','Safari','Microsoft Edge','Firefox Mobile','Firefox','Chrome Mobile','Chrome'];
        
        for(var ctr=0; ctr < knownDevicesList.length; ctr++){
          if(dataToAdd.DeviceName.toLowerCase().indexOf(knownDevicesList[ctr].toLowerCase()) >= 0){
            deviceVersion = revisedDevicename.split(knownDevicesList[ctr])[1].trim();
            revisedDevicename = revisedDevicename.split(deviceVersion)[0].trim();
            if(revisedDevicename.toLowerCase() === "chrome")
               deviceVersion = deviceVersion.substring(deviceVersion.lastIndexOf(" "));
            break;
          }
        }
        if(deviceVersion ==='N/A' && dataToAdd.DeviceName.indexOf(' ') > 0){
          var deviceNamearray = revisedDevicename.split(' ');
          if(deviceNamearray.length >2){
            deviceVersion = deviceNamearray[deviceNamearray.length-2] + ' '+ deviceNamearray[deviceNamearray.length-1];
          }else{
            deviceVersion = deviceNamearray[deviceNamearray.length-1];
          }
          revisedDevicename = revisedDevicename.split(deviceVersion)[0].trim();
        }
      }catch(e){
        Kony.print('Error while parsing the device version');
      }

      return {
        "lblDeviceName": revisedDevicename === undefined ? "N/A" : (revisedDevicename.length > 13 ? { "text": revisedDevicename.substring(0, 11) + "... ", "tooltip": revisedDevicename } : { "text": (revisedDevicename+" ") }),
        "lblVersion":deviceVersion,
        "flxDeviceInfo": {
          "onClick": function () {
            var self = scopeObj;
            var popupInfoDefaultWidth = 250, popupCopyDefaultLeft = 205, popupCopyTooltipDefaultLeft=175, variableWidth = 0;
            scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
            scopeObj.view.DeviceMang.deviceInfo.lblRegisterdOnValue.text = dataToAdd.Registered_Date === undefined ? "N/A" : scopeObj.getLocaleDate(dataToAdd.Registered_Date);

            if (dataToAdd.Device_id) {              
              scopeObj.view.DeviceMang.deviceInfo.lblDeviceIdValue.text = dataToAdd.Device_id;
              scopeObj.view.DeviceMang.deviceInfo.lblDeviceIdValue.toolTip = dataToAdd.Device_id;
            } else {
              scopeObj.view.DeviceMang.deviceInfo.lblDeviceIdValue.text = "N/A";
            }
            scopeObj.view.DeviceMang.deviceInfo.lblOSValue.text = scopeObj.checkForNull(dataToAdd.OperatingSystem,"N/A");
            scopeObj.view.DeviceMang.flxDeviceInfo.left = "202px";
            var right = (scopeObj.view.DeviceMang.segListing.selectedIndex[1] * 51) + 58;
            scopeObj.view.DeviceMang.flxDeviceInfo.top = (right - scopeObj.view.DeviceMang.segListing.contentOffsetMeasured.y) + "px";
            scopeObj.view.DeviceMang.flxDeviceInfo.setVisibility(true);
            scopeObj.view.DeviceMang.deviceInfo.setVisibility(true);
            
            if(dataToAdd.Device_id && dataToAdd.Device_id.length > 11){
              variableWidth = ( dataToAdd.Device_id.length - 11 ) * 6;
            }
            scopeObj.view.DeviceMang.flxDeviceInfo.width = popupInfoDefaultWidth + variableWidth +"px";
            scopeObj.view.DeviceMang.deviceInfo.width = popupInfoDefaultWidth + variableWidth +"px";
            scopeObj.view.DeviceMang.deviceInfo.flxCopyTooltip.left = popupCopyTooltipDefaultLeft + variableWidth +"px";
            scopeObj.view.DeviceMang.deviceInfo.fonticonCopy.left = popupCopyDefaultLeft + variableWidth +"px";
            scopeObj.view.DeviceMang.deviceInfo.fonticonCopy.setVisibility(true);

            scopeObj.view.DeviceMang.deviceInfo.fonticonCopy.onTouchStart = function(){
              self.AdminConsoleCommonUtils.copyTextToClipboard(self.view.DeviceMang.deviceInfo.lblDeviceIdValue.text);
              self.view.DeviceMang.deviceInfo.lblToolTip.text = kony.i18n.getLocalizedString("i18n.customermanagement.Copied_lc");
              self.view.DeviceMang.deviceInfo.flxCopyTooltip.setVisibility(true);
              self.view.DeviceMang.deviceInfo.forceLayout();
            }
            
            scopeObj.view.DeviceMang.deviceInfo.fonticonCopy.onHover = function(widget, context){
              if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
                self.view.DeviceMang.deviceInfo.lblToolTip.text = kony.i18n.getLocalizedString("i18n.customermanagement.COPY");
                self.view.DeviceMang.deviceInfo.flxCopyTooltip.setVisibility(true);
              } else if(context.eventType === constants.ONHOVER_MOUSE_LEAVE){
                self.view.DeviceMang.deviceInfo.flxCopyTooltip.setVisibility(false);
              }
              self.view.DeviceMang.deviceInfo.forceLayout();
            }
            
            scopeObj.view.forceLayout();
            scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
          }
        },
        "fontIconStatusInfo": (dataToAdd.Status_name === "Registered" ? { "text": "\ue94e", "tooltip": "Deregister" } :
                               { "text": "" }),
        "flxStatusInfo": {
          "isVisible": false,//dataToAdd.Status_name === "Registered" ? true : false,
          "onClick": function () {
            scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
            scopeObj.setActionDeRegisterAndDeactivateOnDevice();
            scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
          }
        },
        "Device_id": scopeObj.checkForNull(dataToAdd.Device_id,"N/A"),
        "fontIconDeviceInfo": { "text": "\ue94d" },
        "lblChannel": scopeObj.checkForNull(dataToAdd.Channel_Description,"N/A"),
        "lblLastUserIP": {
          "text" : scopeObj.AdminConsoleCommonUtils.getTruncatedString(scopeObj.checkForNull(dataToAdd.LastUsedIp,"N/A"), 16, 15),
          "tooltip": scopeObj.checkForNull(dataToAdd.LastUsedIp,"").length > 15? dataToAdd.LastUsedIp : ""
        },
        "lblLastAcessedOn": dataToAdd.LastLoginTime === undefined ? "N/A" : scopeObj.getLocaleDateAndTime(scopeObj.getDateInstanceFromDBDateTime(dataToAdd.LastLoginTime)),
        "lastAccessedts": dataToAdd.LastLoginTime,
        "lblStatus":scopeObj.checkForNull(dataToAdd.Status_name,"N/A"),
        "lblSeperator": "-",
        "template": "flxDeviceManagement"
      };
    };
    var data = dataToAdd.map(toSegment);
    this.view.DeviceMang.segListing.info = {
      "data": data,
      "searchAndSortData": data
    };
    this.view.DeviceMang.segListing.widgetDataMap = dataMap;
    this.view.DeviceMang.segListing.setData(data);
    this.view.forceLayout();
    this.view.flxMainContent.scrollToWidget(this.view.flxOtherInfoWrapper);
  },
  /*
   * function to display deregister popup and deregister a device
   */
  setActionDeRegisterAndDeactivateOnDevice: function () {
    var scopeObj = this;
    var data = scopeObj.view.DeviceMang.segListing.data[scopeObj.view.DeviceMang.segListing.selectedIndex[1]];
    var status = data.lblStatus;
    var deviceName = data.lblDeviceName.text;

    if (status.toUpperCase() === "ACTIVE") {
      this.view.popUpConfirmation.lblPopUpMainMessage.text = "Deactivate Device";
      this.view.popUpConfirmation.rtxPopUpDisclaimer.text = "Are you sure to deactivate the device " + "\"" + deviceName + "\"?<br><br>The following device has been associated to this customer. Deactivating this may impact their ability to perform certain actions.";
      this.view.popUpConfirmation.btnPopUpDelete.text = "YES, DEACTIVATE";
      this.view.popUpConfirmation.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
      this.view.flxPopUpConfirmation.setVisibility(true);

      this.view.popUpConfirmation.flxPopUpClose.onClick = function () {
        scopeObj.view.flxPopUpConfirmation.setVisibility(false);
      };
      this.view.popUpConfirmation.btnPopUpCancel.onClick = function () {
        scopeObj.view.flxPopUpConfirmation.setVisibility(false);
      };

      this.view.popUpConfirmation.btnPopUpDelete.onClick = function () {
        var updatedData = {
          "Device_id": data.Device_id,
          "Customer_id": scopeObj.getCustomerId(),
          "Status_id": "SID_DEVICE_INACTIVE"
        }
        scopeObj.presenter.customerUpdateDeviceInformation(updatedData);
        scopeObj.view.flxPopUpConfirmation.setVisibility(false);
      };

    }
    else if (status.toUpperCase() === "REGISTERED") {
      this.view.popUpConfirmation.lblPopUpMainMessage.text = "Deregister Device";
      this.view.popUpConfirmation.rtxPopUpDisclaimer.text = "Are you sure to deregister the device " + "\"" + deviceName + "\"?<br><br>The following device has been associated to this customer. You will not be able to register the device once deregistered.";
      this.view.popUpConfirmation.btnPopUpDelete.text = "YES, DEREGISTER";
      this.view.popUpConfirmation.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
      this.view.flxPopUpConfirmation.setVisibility(true);

      this.view.popUpConfirmation.flxPopUpClose.onClick = function () {
        scopeObj.view.flxPopUpConfirmation.setVisibility(false);
      };
      this.view.popUpConfirmation.btnPopUpCancel.onClick = function () {
        scopeObj.view.flxPopUpConfirmation.setVisibility(false);
      };

      this.view.popUpConfirmation.btnPopUpDelete.onClick = function () {
        var updatedData = {
          "Device_id": data.Device_id,
          "Customer_id": scopeObj.presenter.getCurrentCustomerDetails().Customer_id,
          "Status_id": "SID_DEVICE_DE-REGISTERED"
        }
        scopeObj.presenter.customerUpdateDeviceInformation(updatedData);
        scopeObj.view.flxPopUpConfirmation.setVisibility(false);
      };
    }
  },
  /*
   * show UI for device info screen
   */
  showDeviceInfoScreen: function () {
    this.changeTabSkin(this.view.btnTab1);
    this.setTabVisibility(this.view.flxDeviceActivity);
    //this.view.flxDeviceAuthenticator.setVisibility(false);
    this.view.flxDeviceInfoWrapper.setVisibility(true);
    this.resetAllSortImagesDevice();
    this.view.forceLayout();
    this.view.flxMainContent.scrollToWidget(this.view.flxOtherInfoWrapper);
  },
  
  showDeviceDetailsScreen: function () {
    this.changeTabSkin(this.view.btnTab3);
    this.setTabVisibility(this.view.flxDeviceDetails);
    let userId = this.presenter.getCurrentCustomerDetails().Username;
    this.view.UserDeviceDetails.fetchUserDevices(userId);
    this.view.forceLayout();
    this.view.flxMainContent.scrollToWidget(this.view.flxOtherInfoWrapper);
  },
  
  showAuthenticatorsScreen: function(){
    this.changeTabSkin(this.view.btnTab2);
    this.setTabVisibility(this.view.flxDeviceAuthenticator);
    let userId = this.presenter.getCurrentCustomerDetails().Username;
    this.view.deviceAuthenticator.fetchAuthenticators(userId);
    this.view.forceLayout();
    this.view.flxMainContent.scrollToWidget(this.view.flxOtherInfoWrapper);
  },
  
  showMasterResetScreen : function(){
    this.view.MasterReset.setData({"userId" : this.presenter.getCurrentCustomerDetails().Username,
                                  "customerId" : this.presenter.getCurrentCustomerDetails().Customer_id});
    this.changeTabSkin(this.view.btnTab4);
    this.setTabVisibility(this.view.flxMasterReset);
  },
  /*
   * set data for status filter
   */
  setDeviceFilterData: function () {
    var dataMap = {
      flxCheckBox: "flxCheckBox",
      flxSearchDropDown: "flxSearchDropDown",
      imgCheckBox: "imgCheckBox",
      lblDescription: "lblDescription"
    };

    var data, selectedIndices;
    if (this.view.DeviceMang.flxStatusFilter.info.Target === "STATUS") {
      data = this.getUniqueList(this.view.DeviceMang.segListing, "lblStatus");
      selectedIndices = this.view.DeviceMang.flxStatusFilter.info.STATUS === "ALL" ? [[0, Array.from(Array(data.length).keys())]] : this.view.DeviceMang.flxStatusFilter.info.STATUS;
    }

    this.view.DeviceMang.statusFilterMenu.segStatusFilterDropdown.widgetDataMap = dataMap;
    this.view.DeviceMang.statusFilterMenu.segStatusFilterDropdown.data = data;
    this.view.DeviceMang.statusFilterMenu.segStatusFilterDropdown.selectedIndices = selectedIndices;
  },
  /*
   * set data for channel filter
   */
  setDeviceChannelFilterData: function () {
    var dataMap = {
      flxCheckBox: "flxCheckBox",
      flxSearchDropDown: "flxSearchDropDown",
      imgCheckBox: "imgCheckBox",
      lblDescription: "lblDescription"
    };

    var data, selectedIndices;
    if (this.view.DeviceMang.flxChannelFilter.info.Target === "CHANNEL") {
      data = this.getUniqueList(this.view.DeviceMang.segListing, "lblChannel");
      selectedIndices = this.view.DeviceMang.flxChannelFilter.info.CHANNEL === "ALL" ? [[0, Array.from(Array(data.length).keys())]] : this.view.DeviceMang.flxChannelFilter.info.CHANNEL;
    }
    this.view.DeviceMang.channelFilterMenu.segStatusFilterDropdown.widgetDataMap = dataMap;
    this.view.DeviceMang.channelFilterMenu.segStatusFilterDropdown.data = data;
    this.view.DeviceMang.channelFilterMenu.segStatusFilterDropdown.selectedIndices = selectedIndices;
  },
  resetAllSortImagesDevice: function () {
    if (this.view.DeviceMang.fontIconSortLastUserIP.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
      this.view.DeviceMang.fontIconSortLastUserIP.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
      this.view.DeviceMang.fontIconSortLastUserIP.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
    }
    if (this.view.DeviceMang.fontIconSortLastAcessedOn.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
      this.view.DeviceMang.fontIconSortLastAcessedOn.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
      this.view.DeviceMang.fontIconSortLastAcessedOn.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
    }
  },
  getUniqueList: function (segmentWidget, label) {
    var self =this;
    return (Array.from(new Set(segmentWidget.info.data.map(function (item) { return item[label]; }))))
      .map(function (item) {
      var maxLenText = "";
      maxLenText = item.length > maxLenText.length ? item : maxLenText;
      var width = self.AdminConsoleCommonUtils.getLabelWidth(maxLenText)+55+"px";
      if(label === "lblChannel"){
        self.view.DeviceMang.flxChannelFilter.width = width;
      }else{
        self.view.DeviceMang.flxStatusFilter.width = width;
      }
      return {
        "flxCheckBox": "flxCheckBox",
        "flxSearchDropDown": "flxSearchDropDown",
         lblDescription: item,
         imgCheckBox: { src: "checkboxselected.png" }
      };
    });
  },
  /*
   * filter segment based on selected status
   */
  filterBasedOnStatus : function(){
    var self = this;
    var data, finalData;
    var selectedDescriptionsStatus = [];
    var selectedDescriptionsChannel = [];
    var selectedIndicesChannel, selectedIndicesStatus;
    self.AdminConsoleCommonUtils.storeScrollHeight(self.view.flxMainContent);
    if (self.view.DeviceMang.channelFilterMenu.segStatusFilterDropdown.selectedIndices) {
      selectedIndicesChannel = self.view.DeviceMang.channelFilterMenu.segStatusFilterDropdown.selectedIndices;
      selectedIndicesChannel[0][1].forEach(function (index) {
        selectedDescriptionsChannel.push(self.view.DeviceMang.channelFilterMenu.segStatusFilterDropdown.data[index].lblDescription);
      });
    }
    if (self.view.DeviceMang.statusFilterMenu.segStatusFilterDropdown.selectedIndices) {
      selectedIndicesStatus = self.view.DeviceMang.statusFilterMenu.segStatusFilterDropdown.selectedIndices;
      selectedIndicesStatus[0][1].forEach(function (index) {
        selectedDescriptionsStatus.push(self.view.DeviceMang.statusFilterMenu.segStatusFilterDropdown.data[index].lblDescription);
      });
    }
    if (self.view.DeviceMang.flxStatusFilter.info.Target === "STATUS") {
      self.view.DeviceMang.flxStatusFilter.info.STATUS = selectedIndicesStatus;
      data = self.view.DeviceMang.segListing.info.data.filter(function (item) {
        if (selectedDescriptionsStatus.indexOf(item.lblStatus) >= 0) return true;
        else return false;
      });
      finalData = data.filter(function (item) {
        if (selectedDescriptionsChannel.indexOf(item.lblChannel) >= 0) return true;
        else return false;
      });
    }
    self.view.DeviceMang.segListing.info.searchAndSortData = finalData;
    if (finalData && finalData.length > 0) {
      self.view.DeviceMang.segListing.setData(finalData);
      self.view.DeviceMang.segListing.setVisibility(true);
      self.view.rtxMsgDeviceInfo.setVisibility(false);
    } else {
      self.view.DeviceMang.segListing.setVisibility(false);
      self.view.rtxMsgDeviceInfo.setVisibility(true);
    }
    self.AdminConsoleCommonUtils.scrollToDefaultHeight(self.view.flxMainContent);
  },
  /*
   * filter segment based on selected channels
   */
  filterBasedOnChannel: function(){
    var self = this;
    var data, finalData;
    var selectedDescriptionsStatus = [];
    var selectedDescriptionsChannel = [];
    var selectedIndicesChannel, selectedIndicesStatus;
    self.AdminConsoleCommonUtils.storeScrollHeight(self.view.flxMainContent);
    if (self.view.DeviceMang.channelFilterMenu.segStatusFilterDropdown.selectedIndices) {
      selectedIndicesChannel = self.view.DeviceMang.channelFilterMenu.segStatusFilterDropdown.selectedIndices;
      selectedIndicesChannel[0][1].forEach(function (index) {
        selectedDescriptionsChannel.push(self.view.DeviceMang.channelFilterMenu.segStatusFilterDropdown.data[index].lblDescription);
      });
    }
    if (self.view.DeviceMang.statusFilterMenu.segStatusFilterDropdown.selectedIndices) {
      selectedIndicesStatus = self.view.DeviceMang.statusFilterMenu.segStatusFilterDropdown.selectedIndices;
      selectedIndicesStatus[0][1].forEach(function (index) {
        selectedDescriptionsStatus.push(self.view.DeviceMang.statusFilterMenu.segStatusFilterDropdown.data[index].lblDescription);
      });
    }
    if (self.view.DeviceMang.flxChannelFilter.info.Target === "CHANNEL") {
      self.view.DeviceMang.flxChannelFilter.info.CHANNEL = selectedIndicesChannel;
      data = self.view.DeviceMang.segListing.info.data.filter(function (item) {
        if (selectedDescriptionsChannel.indexOf(item.lblChannel) >= 0) return true;
        else return false;
      });
      finalData = data.filter(function (item) {
        if (selectedDescriptionsStatus.indexOf(item.lblStatus) >= 0) return true;
        else return false;
      });
    }
    self.view.DeviceMang.segListing.info.searchAndSortData = finalData;
    if (finalData && finalData.length > 0) {
      self.view.DeviceMang.segListing.setData(finalData);
      self.view.DeviceMang.segListing.setVisibility(true);
      self.view.rtxMsgDeviceInfo.setVisibility(false);
    } else {
      self.view.DeviceMang.segListing.setVisibility(false);
      self.view.rtxMsgDeviceInfo.setVisibility(true);
    }
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
  
  changeTabSkin: function(widget) {
    this.view.btnTab1.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
    this.view.btnTab2.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
    this.view.btnTab3.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
    this.view.btnTab4.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
    widget.skin = "sknBtn485B75BgffffffBr3pxLato12px";
    this.view.forceLayout();
  },

  setTabVisibility: function(widget) {
    this.view.flxDeviceActivity.setVisibility(false);
    this.view.flxDeviceAuthenticator.setVisibility(false);
    this.view.flxDeviceDetails.setVisibility(false);
    this.view.flxMasterReset.setVisibility(false);
    widget.setVisibility(true);
    this.view.forceLayout();
  },
  
});