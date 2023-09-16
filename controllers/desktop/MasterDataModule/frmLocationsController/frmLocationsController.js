define({
  rowIndex: 0,
  currentPage: 1,
  //   prevPageDisabled: true,
  //   nextPageDisabled: false,
  downloadFileId: null,
  locationsJSON: null,
  records: null,
  allRecords: null,
  filterIndiciesArray : {
    "type" : [0,1],
    "status" : [0,1]
  },
  sortBy : null,
  locationServicesSortBy : null,
  defaultCurrencyList : [],
  selectedCurrencyList : [],
  facilityList : [],
  currentLocation : [],
  getMoreDataModel:null,
  segmentRecordSize:50,
  prevIndex : -1,
  fileToUpload : null,
  /*
	methods to show 
		error toast message 	-	this.showErrorToastMessage();
		normal toast message 	-	this.showToastMessage();
		toast message with link -	this.showToastMessageWithLink();
		loading indicator 		-	this.showLoadingScreen();

	methods to hide
		normal toast message 	-	this.hideToastMessage();
		toast message with link -	this.hideToastMessageWithLink();
		loading indicator 		-	this.hideLoadingScreen();
	method to call before displaying edit screen - this.prefillDataInEditScreen();
	*/
  assignServiceData: {
    addedTo: [],
    removedFrom: []
  },
  locationsPreShow: function() {
    this.currentPage = 1;
  },

  preShowLocations: function() {
    var scopeObj = this;
    var screenHeight = kony.os.deviceInfo().screenHeight;
    this.view.flxScrollMainContent.height = screenHeight - 115 + "px";
    this.view.flxLocationsWrapper.height = screenHeight - 165 + "px";
    this.view.flxLocationsSegment.height=screenHeight - 265 + "px";
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    //this.view.listingSegment.segListing.maxHeight = screenHeight - 310 + "px";
    //this.view.flxLocationsSegment.maxHeight = screenHeight - 240 + "px";
    this.view.listingSegmentClient.flxContextualMenu.onHover = scopeObj.onDropdownHoverCallback;
    this.hideNoResultsFound();
    this.view.subHeader.tbxSearchBox.text = "";
    this.setWidgetsDataByDefault();
    this.hideHeaderButtons();
    this.setFlowActions();
    this.view.rtxMsgServices.setVisibility(false);
    this.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100";
    this.view.subHeader.flxClearSearchImage.setVisibility(false);
    this.filterIndiciesArray.type = [0,1];
    this.filterIndiciesArray.status = [0,1];    
    this.setSelectedOptionButtonStyle(this.view.verticalTabs.btnOption1);
    this.view.flxToastMessage.setVisibility(false);
  },


  clearLocationDefaults: function() {
    this.view.subHeader.tbxSearchBox.text = "";
    //this.view.listingSegmentClient.pagination.lbxPagination.selectedKey = this.currentPage;
  },

  shouldUpdateUI: function(viewModel) {
    return viewModel !== undefined && viewModel !== null;
  },

  searchFilter: function(Location) {
    var searchText = this.view.subHeader.tbxSearchBox.text;
    searchText=searchText.replace("<","&lt").replace(">","&gt").replace("=","&eq").replace("alert","").replace("marque","").replace("<","&lt").replace(">","&gt");
    if (typeof searchText === "string" && searchText.length > 0) {
      return Location.DisplayName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    } else {
      return true;
    }
  },

  resetSortImages: function() {
    var self = this;
    self.determineSortFontIcon(self.sortBy, 'lblBranchName', this.view.lblSortName);
    self.determineSortFontIcon(self.sortBy, 'lblCode',this.view.lblSortCode);
    self.determineSortFontIcon(self.sortBy, 'lblPhone',this.view.lblSortPhone);
  },

  showLocationsUI: function(locations) {
    this.resetEditScreen();
    if (locations.length !== 0) {
      this.showListingScreen();
    } else {
      if (this.records === 0 || locations.length === 0) {
        this.showNoResultsFound();
        this.view.forceLayout();
      } else {
        this.showNoRecordAddedYet();
      }
    }
    this.view.listingSegmentClient.segListing.setVisibility(true);
    this.setLocationsSegmentData(locations);
    this.setSelectedServicesSegmentData(); 
    this.view.forceLayout();
  },
  setWidgetsDataByDefault: function() {
    //add screen
    this.view.verticalTabs.flxOption3.setVisibility(false);
    this.view.verticalTabs.flxOption4.setVisibility(false);
    this.view.verticalTabs.btnOption1.text = kony.i18n.getLocalizedString("i18n.ManageLocations.LOCATIONDETAILS");
    this.view.verticalTabs.btnOption2.text = kony.i18n.getLocalizedString("i18n.ManageLocations.LISTOFSERVICES");
    this.view.flxLoading.setVisibility(false);
    this.view.AddAndRemoveServicesButtons.btnNext.setVisibility(false);
    this.view.addAndRemoveOptions.lblAvailableOptionsHeading.text = kony.i18n.getLocalizedString("i18n.ManageLocations.AvailableServices");
    this.view.addAndRemoveOptions.lblSelectedOption.text = kony.i18n.getLocalizedString("i18n.ManageLocations.SelectedServices");
    //listing page
    this.view.listingSegmentClient.contextualMenu.lblHeader.setVisibility(false);
    this.view.listingSegmentClient.contextualMenu.btnLink1.setVisibility(false);
    this.view.listingSegmentClient.contextualMenu.btnLink2.setVisibility(false);
    this.view.listingSegmentClient.contextualMenu.flxOptionsSeperator.setVisibility(false);
    this.view.listingSegmentClient.contextualMenu.flxOption4.setVisibility(false);
    this.view.listingSegmentClient.contextualMenu.lblIconOption1.text = "\ue91e";
    this.view.listingSegmentClient.contextualMenu.lblIconOption2.text = "\ue91c";
    this.view.listingSegmentClient.contextualMenu.lblIconOption3.text = "\ue91c";
    this.view.listingSegmentClient.contextualMenu.lblOption1.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
    this.view.listingSegmentClient.contextualMenu.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
    this.view.listingSegmentClient.contextualMenu.lblOption3.text = kony.i18n.getLocalizedString("i18n.ContextualMenu.SetOffline");
    //popups
    this.view.popUpStatusChange.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Deactivate_Branch");
    this.view.popUpSetOffline.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Set_the_Branch_Offline");
    this.view.popUpStatusChange.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDeactivate");
    this.view.popUpStatusChange.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
    this.view.popUpSetOffline.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
    this.view.popUpSetOffline.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.YES__OFFLINE");
    //breadcrumbs
    this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.MANAGE_LOCATIONS");
    //view page
    this.view.detailsRow1.lblHeading1.text = kony.i18n.getLocalizedString("i18n.View.LOCATIONNAME");
    this.view.detailsRow1.lblHeading2.text = kony.i18n.getLocalizedString("i18n.View.DISPLAYNAME");
    this.view.detailsRow1.lblHeading3.text = kony.i18n.getLocalizedString("i18n.View.LOCATIONCODE");
    this.view.detailsRow2.lblHeading1.text = kony.i18n.getLocalizedString("i18n.View.LOCATIONTYPE");
    this.view.detailsRow2.lblHeading2.text = kony.i18n.getLocalizedString("i18n.View.MAINBRANCH");

    this.view.detailsRow2.lblIconData2.setVisibility(true);
    this.view.detailsRow2.lblData2.skin = "sknlblLato5bc06cBold14px";
    this.view.detailsRow2.lblHeading3.text = kony.i18n.getLocalizedString("i18n.View.ONLINE");
    this.view.detailsRow2.lblData3.skin = "sknlblLato5bc06cBold14px";

    this.view.detailsRow2.lblIconData3.setVisibility(true);
    this.view.detailsMultiLine.lblHeading1.text = kony.i18n.getLocalizedString("i18n.View.ADDRESS");
    this.view.detailsMultiLine.lblHeading2.text = kony.i18n.getLocalizedString("i18n.View.EMAILID");
    this.view.detailsMultiLine.lblHeading3.text = kony.i18n.getLocalizedString("i18n.View.GEOLOCATION");
    this.view.operationDetails.lblHeading1.text = kony.i18n.getLocalizedString("i18n.View.MONDAYFRIDAY");
    this.view.operationDetails.lblHeading2.text = kony.i18n.getLocalizedString("i18n.View.SATURDAY");
    this.view.operationDetails.flxColumn3.setVisibility(false);

    this.view.lblFullNameCount.setVisibility(false);
    this.view.lblNameCountValue.setVisibility(false);
    this.view.lblCountDisplayName.setVisibility(false);
    this.view.lblDescriptionCount.setVisibility(false);
  },
  hideAll: function() {
    this.view.flxBreadCrumbs.setVisibility(false);
    this.view.flxImportDetails.setVisibility(false);
    this.view.flxImportMain.setVisibility(false);
    this.view.flxUploadingIndiacator.setVisibility(false);
    //     this.view.flxToastMessage.setVisibility(false);
    this.view.flxToastMessageWithLink.setVisibility(false);
    this.view.flxImportCancelPopup.setVisibility(false);
    this.view.flxImportcsv.setVisibility(false);
    this.view.flxStatusChangePopUp.setVisibility(false);
    this.view.flxSetOfflinePopUp.setVisibility(false);
    this.view.flxScrollMainContent.setVisibility(false);
    this.view.flxAdvancedSearch.setVisibility(false);
    this.view.flxListingPage.setVisibility(false);
    this.view.flxViewLocation.setVisibility(false);
    this.view.flxLocationDetailsAndServices.setVisibility(false);
    this.view.flxLocationDetailsWrapper.setVisibility(false);
    this.view.flxAddAndRemoveServicesWrapper.setVisibility(false);
    this.view.verticalTabs.lblSelected1.setVisibility(false);
  },
  hideHeaderButtons: function() {
    this.view.btnAddCase.setVisibility(false);
    this.view.mainHeader.flxButtons.setVisibility(false);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
  },
  showHeaderButtons: function() {
    this.view.btnAddCase.setVisibility(true);
    this.view.mainHeader.flxButtons.setVisibility(true);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
  },

  //toast message functions
  showToastMessage: function() {
    //     this.view.toastMessage.flxToastContainer.skin = "sknflxSuccessToast1F844D";
    //     this.view.toastMessage.imgLeft.src = "arrow2x.png";
    //     this.view.flxToastMessage.setVisibility(true);
    //     this.view.forceLayout();
    //     var self = this;
    //     var animationDefinition = {
    //       0: {
    //         bottom: "-70px"
    //       },
    //       100: {
    //         bottom: "0px"
    //       }
    //     };
    //     var animationConfiguration = {
    //       duration: 0.5,
    //       fillMode: kony.anim.FILL_MODE_FORWARDS
    //     };
    //     var callbacks = {
    //       animationEnd: function() {
    //         kony.timer.schedule(
    //           "toastMessageTimer",
    //           self.hideToastMessage,
    //           2,
    //           false
    //         );
    //       }
    //     };
    //     var animationDef = kony.ui.createAnimation(animationDefinition);
    //     this.view.flxToastMessage.animate(
    //       animationDef,
    //       animationConfiguration,
    //       callbacks
    //     );
  },
  showErrorToastMessage: function() {
    //     this.view.toastMessage.flxToastContainer.skin =
    //       "sknFlxErrorToastBgE61919";
    //     this.view.toastMessage.imgLeft.src = "alerticon_2x.png";
    //     this.view.flxToastMessage.setVisibility(true);
    //     var self = this;
    //     var animationDefinition = {
    //       0: {
    //         bottom: "-70px"
    //       },
    //       100: {
    //         bottom: "0px"
    //       }
    //     };
    //     var animationConfiguration = {
    //       duration: 0.5,
    //       fillMode: kony.anim.FILL_MODE_FORWARDS
    //     };
    //     var callbacks = {
    //       animationEnd: function() {}
    //     };
    //     var animationDef = kony.ui.createAnimation(animationDefinition);
    //     this.view.flxToastMessage.animate(
    //       animationDef,
    //       animationConfiguration,
    //       callbacks
    //     );
  },
  hideToastMessage: function() {
    //     var self = this;
    //     var animationDefinition = {
    //       0: {
    //         bottom: "0px"
    //       },
    //       100: {
    //         bottom: "-70px"
    //       }
    //     };
    //     var animationConfiguration = {
    //       duration: 0.5,
    //       fillMode: kony.anim.FILL_MODE_FORWARDS
    //     };
    //     var callbacks = {
    //       animationEnd: function() {
    //         self.view.flxToastMessage.setVisibility(false);
    //       }
    //     };
    //     var animationDef = kony.ui.createAnimation(animationDefinition);
    //     this.view.flxToastMessage.animate(
    //       animationDef,
    //       animationConfiguration,
    //       callbacks
    //     );
  },
  showToastMessageWithLink: function() {
    this.view.flxToastMessageWithLink.setVisibility(true);
    this.view.toastMessageWithLink.fontIconImgLeft.text = "\ue94b";
    this.view.forceLayout();
    var animationDefinition = {
      0: {
        bottom: "-70px"
      },
      100: {
        bottom: "0px"
      }
    };
    var animationConfiguration = {
      duration: 0.5,
      fillMode: kony.anim.FILL_MODE_FORWARDS
    };
    var callbacks = {
      animationEnd: function() {}
    };
    var animationDef = kony.ui.createAnimation(animationDefinition);
    this.view.flxToastMessageWithLink.animate(animationDef, animationConfiguration, callbacks);
  },
  hideToastMessageWithLink: function() {
    var self = this;
    var animationDefinition = {
      0: {
        bottom: "0px"
      },
      100: {
        bottom: "-70px"
      }
    };
    var animationConfiguration = {
      duration: 0.5,
      fillMode: kony.anim.FILL_MODE_FORWARDS
    };
    var callbacks = {
      animationEnd: function() {
        self.view.flxToastMessageWithLink.setVisibility(false);
      }
    };
    var animationDef = kony.ui.createAnimation(animationDefinition);
    this.view.flxToastMessageWithLink.animate(animationDef, animationConfiguration, callbacks);
  },
  showLoadingScreen: function() {
    this.view.flxLoading.setVisibility(true);
  },
  hideLoadingScreen: function() {
    this.view.flxLoading.setVisibility(false);
  },
  showSelectedOptionImage: function(imgWidget) {
    this.view.verticalTabs.lblSelected1.setVisibility(false);
    this.view.verticalTabs.lblSelected2.setVisibility(false);
    this.view.verticalTabs.lblSelected3.setVisibility(false);
    this.view.verticalTabs.lblSelected4.setVisibility(false);
    imgWidget.setVisibility(true);
  },
  setSelectedOptionButtonStyle: function(btnWidget) {
    var widgetArray = [this.view.verticalTabs.btnOption1,
                       this.view.verticalTabs.btnOption2,
                       this.view.verticalTabs.btnOption3,
                       this.view.verticalTabs.btnOption4];
    this.tabUtilVerticleButtonFunction(widgetArray,btnWidget);
  },
  showAddLocationDetails: function() {
    this.hideAll();
    this.view.flxBreadCrumbs.setVisibility(true);
    this.view.flxScrollMainContent.setVisibility(true);
    this.view.flxLocationDetailsAndServices.setVisibility(true);
    this.view.flxLocationDetailsWrapper.setVisibility(true);
    this.view.lblCountDisplayName.setVisibility(false);
    this.view.lblNameCountValue.setVisibility(false);
    this.view.lblFullNameCount.setVisibility(false);
    this.view.lblDescriptionCount.setVisibility(false);
    this.showSelectedOptionImage(this.view.verticalTabs.lblSelected1);
    this.setSelectedOptionButtonStyle(this.view.verticalTabs.btnOption1);
  },
  showAddAndRemoveServices: function() {
    this.hideAll();
    var availableFacilityList = this.facilityList.filter(this.filterFacilitiesBasedOnBranchATM);
    if(this.currentLocation && this.currentLocation.facilities) {
      var filteredFacilityList = this.facilityList.filter(this.filterFacilitiesBasedOnBranchATM);
      var currentFacilityIds = this.currentLocation.facilities.map(function(facility) {
        return facility.Facility_id;
      });
      availableFacilityList = filteredFacilityList.filter(function(s) {
        return !currentFacilityIds.contains(s.id);
      });
    }
    var segData = availableFacilityList.map(this.mappingAvailableServicesData);
    this.view.addAndRemoveOptions.segAddOptions.info = {"segDataForSearch" : segData};
    this.setAvailableServicesSegmentData(segData);
    this.view.flxBreadCrumbs.setVisibility(true);
    this.view.flxScrollMainContent.setVisibility(true);
    this.view.flxLocationDetailsAndServices.setVisibility(true);
    this.view.flxAddAndRemoveServicesWrapper.setVisibility(true);
    this.view.addAndRemoveOptions.rtxAvailableOptionsMessage.setVisibility(false);
    this.view.addAndRemoveOptions.rtxSelectedOptionsMessage.setVisibility(false);
    this.checkForMessagesInServices();
    this.showSelectedOptionImage(this.view.verticalTabs.lblSelected2);
    this.setSelectedOptionButtonStyle(this.view.verticalTabs.btnOption2);
    this.view.forceLayout();
  },
  showListingScreen: function() {
    this.hideAll();
    this.showHeaderButtons();
    this.view.flxScrollMainContent.setVisibility(true);
    this.view.flxListingPage.setVisibility(true);
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Heading_Manage_Locations");
    this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
  },
  showViewLocation: function() {
    this.hideAll();
    this.hideHeaderButtons();
    this.view.flxScrollMainContent.setVisibility(true);
    this.view.flxViewLocation.setVisibility(true);
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Heading_Manage_Locations");
  },
  checkForMessagesInServices: function() {
    if (this.view.addAndRemoveOptions.segAddOptions.data.length !== 0) {
      this.view.addAndRemoveOptions.btnSelectAll.setVisibility(true);
      this.view.addAndRemoveOptions.rtxAvailableOptionsMessage.setVisibility(false);
    } else {
      this.view.addAndRemoveOptions.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.No_Entitlements_Available");
      this.view.addAndRemoveOptions.rtxAvailableOptionsMessage.setVisibility(true);
      this.view.addAndRemoveOptions.btnSelectAll.setVisibility(false);
    }
    if (this.view.addAndRemoveOptions.segSelectedOptions.data.length !== 0) {
      this.view.addAndRemoveOptions.btnRemoveAll.setVisibility(true);
      this.view.addAndRemoveOptions.rtxSelectedOptionsMessage.setVisibility(false);
    } else {
      this.view.addAndRemoveOptions.rtxSelectedOptionsMessage.setVisibility(true);
      this.view.addAndRemoveOptions.btnRemoveAll.setVisibility(false);
    }
  },
  showNoRecordAddedYet: function() {
    this.hideAll();
    this.hideHeaderButtons();
    this.view.flxImportDetails.setVisibility(true);
    this.view.flxImportMain.setVisibility(true);
  },
  showUploadingIndicator: function(csvFile) {
    this.hideAll();
    this.view.flxScrollMainContent.setVisibility(false);
    this.view.flxImportDetails.setVisibility(true);
    this.view.flxUploadingIndiacator.setVisibility(true);
    this.hideHeaderButtons();
    this.getBase64(csvFile);
    this.view.forceLayout();
  },
  getBase64: function(file) {
    var scopeObj = this;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(event) {
      kony.print(reader.result);
      var csvJSON = {
csvFile: event.target.result.split('base64,')
      };
      var masterDataModule = kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager()
      .getModule("MasterDataModule");
      masterDataModule.presentationController.importLocationsCSVFile(csvJSON);
    };
    reader.onerror = function(error) {
      kony.print('Error: ', error);
    };
  },

  uploadingIndicatorCallBack: function() {
    //add data to listing segment
    this.view.flxImportDetails.setVisibility(false);
    this.view.flxUploadingIndiacator.setVisibility(false);
    this.showHeaderButtons();
    this.showListingScreen();
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.forceLayout();
  },

  toggleContextualMenu: function(rowHeight) {
    var scopeObj = this;
    var index = this.view.listingSegmentClient.segListing.selectedIndex;
    
    scopeObj.optionButtonStateChange(index[1], true);

    if (this.view.listingSegmentClient.flxContextualMenu.isVisible === false) {
      this.view.listingSegmentClient.flxContextualMenu.setVisibility(true);
      this.view.forceLayout();
      this.rowIndex = index[1];
      var templateArray = this.view.listingSegmentClient.segListing.clonedTemplates;
      //to caluclate top from preffered row heights
      var finalHeight = 0;
      for(var i = 0; i < this.rowIndex; i++){
        finalHeight = finalHeight + templateArray[i].flxsegLocations.frame.height;
      }
      var height = (finalHeight + 36);
      this.updateContextualMenu();
      if(((this.view.listingSegmentClient.flxContextualMenu.frame.height + height - this.view.flxLocationsSegment.contentOffsetMeasured.y) > (this.view.flxLocationsSegment.frame.height)) &&
         this.view.listingSegmentClient.flxContextualMenu.frame.height < this.view.flxLocationsSegment.frame.height) {
        height = height - this.view.listingSegmentClient.flxContextualMenu.frame.height - 26;
        scopeObj.view.listingSegmentClient.contextualMenu.flxUpArrowImage.setVisibility(false);
        scopeObj.view.listingSegmentClient.contextualMenu.flxDownArrowImage.setVisibility(true);
        scopeObj.view.listingSegmentClient.contextualMenu.contextualMenu1Inner.top = "0px";
      }
      else {
        scopeObj.view.listingSegmentClient.contextualMenu.flxUpArrowImage.setVisibility(true);
        scopeObj.view.listingSegmentClient.contextualMenu.flxDownArrowImage.setVisibility(false);
        scopeObj.view.listingSegmentClient.contextualMenu.contextualMenu1Inner.top = "-1px";
      }
      scopeObj.view.listingSegmentClient.flxContextualMenu.top = height + "px";
    } else {
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    }
  },

  optionButtonStateChange : function(selectedIndex,condition){
    var scopeObj = this;
    var data = scopeObj.view.listingSegmentClient.segListing.data;
    
    if(scopeObj.prevIndex !=-1 && (scopeObj.prevIndex < data.length)){
      var tempDataPrev = data[scopeObj.prevIndex];
      tempDataPrev.flxOptions.skin = "slFbox";
      scopeObj.view.listingSegmentClient.segListing.setDataAt(tempDataPrev, scopeObj.prevIndex, 0);
    }
    var tempDataCurrent = data[selectedIndex];
    tempDataCurrent.flxOptions.skin = condition === true ?"sknflxffffffop100Border424242Radius100px":"slFbox";
    scopeObj.view.listingSegmentClient.segListing.setDataAt(tempDataCurrent, selectedIndex, 0);
    scopeObj.prevIndex = selectedIndex;
  },

  updateContextualMenu: function() {
    var data = this.view.listingSegmentClient.segListing.data;
    if (data[this.rowIndex].lblStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
      this.view.listingSegmentClient.contextualMenu.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
      this.view.listingSegmentClient.contextualMenu.lblIconOption2.text = "\ue91c";
    } else {
      this.view.listingSegmentClient.contextualMenu.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
      this.view.listingSegmentClient.contextualMenu.lblIconOption2.text = "\ue931";
    }
    if (data[this.rowIndex].lblIconType.skin === "sknFontIconActivate") {
      this.view.listingSegmentClient.contextualMenu.lblOption3.text = kony.i18n.getLocalizedString("i18n.ContextualMenu.SetOffline");
      this.view.listingSegmentClient.contextualMenu.lblIconOption3.text = "\ue936";
    } else {
      this.view.listingSegmentClient.contextualMenu.lblOption3.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Set_Online");
      this.view.listingSegmentClient.contextualMenu.lblIconOption3.text = "\ue910";
    }
  },
  toggleLocationStatus: function() {
    var data = this.view.listingSegmentClient.segListing.data;
    if (data[this.rowIndex].lblStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
      data[this.rowIndex].lblStatus = {
        text: kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive"),
        skin: "sknlblLatoDeactive"
      };
      data[this.rowIndex].lblIconStatus.text = "\ue921";
      data[this.rowIndex].lblIconStatus.skin = "sknfontIconInactive";
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmLocationsController.Branch_deactivated_successfully"), this);
    } else {
      data[this.rowIndex].lblStatus = {
        text: kony.i18n.getLocalizedString("i18n.secureimage.Active"),
        skin: "sknlblLato5bc06cBold14px"
      };
      data[this.rowIndex].lblIconStatus.text = "\ue921";
      data[this.rowIndex].lblIconStatus.skin = "sknFontIconActivate";
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmLocationsController.Branch_activated_successfully"), this);
    }
    this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    this.view.listingSegmentClient.segListing.setData(data);
  },
  deleteLocation: function() {
    this.view.listingSegmentClient.segListing.removeAt(this.rowIndex);
    this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
  },
  toggleBranchStatus: function() {
    var data = this.view.listingSegmentClient.segListing.data;
    if (data[this.rowIndex].lblIconType.skin === "sknFontIconActivate") {
      data[this.rowIndex].lblIconType.skin = "sknfontIconInactive";
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmLocationsController.Branch_set_to_offline"), this);
    } else {
      data[this.rowIndex].lblIconType.skin = "sknFontIconActivate";
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmLocationsController.Branch_set_to_online"), this);
    }
    this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    this.view.listingSegmentClient.segListing.setData(data);
  },
  setBreadCrumbsText: function(textArray) {
    this.view.flxBreadCrumbs.setVisibility(true);
    if (textArray.length === 1) {
      this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
      this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
      this.view.breadcrumbs.lblCurrentScreen.text = textArray[0];
    } else if (textArray.length === 2) {
      this.view.breadcrumbs.btnPreviousPage.setVisibility(true);
      this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(true);
      this.view.breadcrumbs.btnPreviousPage.text = textArray[0];
      this.view.breadcrumbs.lblCurrentScreen.text = textArray[1];
    }
  },
  onDropdownHoverCallback:function(widget, context) {
    var scopeObj = this;
    var selectedIndex = scopeObj.view.listingSegmentClient.segListing.selectedrowindex[1];

    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(true);
      scopeObj.optionButtonStateChange(selectedIndex, true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      scopeObj.optionButtonStateChange(selectedIndex, false);
    }
  },
  downloadCSV: function(locationTemplate) {
    var self = this;

    var locationFileId = "";
    var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;

    var mfURL = KNYMobileFabric.mainRef.config.reportingsvc.session.split("/services")[0];
    var downloadURL = mfURL + "/services/data/v1/LocationObjService/operations/LocationsUsingCSV/downloadLocationsCSV?user_ID=" + user_ID;
    if (locationTemplate) {
      locationFileId = locationTemplate;
      downloadURL = downloadURL+ "&locationfileId=" +locationFileId;
    }
    this.callDownloadCSVService(downloadURL,"locationTemplate");
  },
  downloadCSVList :function(fileId){
    var mfURL = KNYMobileFabric.mainRef.config.reportingsvc.session.split("/services")[0];
    var downloadURL = mfURL + "/services/data/v1/LocationObjService/operations/LocationsUsingCSV/downloadLocationCSV";
    this.callDownloadCSVService(downloadURL,"branchAtmCSV" );
  },

  uploadFile: function() {
    var self = this;
    var config = {
      selectMultipleFiles: false,
      filter: ["text/csv"]
    };
    kony.io.FileSystem.browse(config, csvCallback);

    function csvCallback(event, filesList) {
      self.fileToUpload=null;
      var fileType = filesList[0].name;
      var fileSize = filesList[0].size;
      var fileName= fileType.substring(0,fileType.lastIndexOf("."));
      self.view.uploadfilePopup.errorMsg.setVisibility(false);
      self.view.uploadfilePopup.txtUploadFile.skin = "txtD7d9e0";
      self.view.flxImportcsv.forceLayout();
      self.view.uploadfilePopup.txtUploadFile.text = fileType;
      fileType = fileType.substring(fileType.lastIndexOf(".") + 1);

      if (fileType === "csv" && parseInt(fileSize, 10) <= 512000&&fileName.lastIndexOf(".")==-1) {
        self.fileToUpload = event.target.files[0];
      }
      else{
        if (fileType !== "csv"){
          self.view.uploadfilePopup.errorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Incorrect_file_format");
        }
        else if (fileName.lastIndexOf(".")!=-1){
          self.view.uploadfilePopup.errorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Invalid_file_name");
        }
        else {
          self.view.uploadfilePopup.errorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Incorrect_file_size");
        }
        self.view.uploadfilePopup.txtUploadFile.skin = "skinredbg";
        self.view.uploadfilePopup.errorMsg.setVisibility(true);
        self.view.flxImportcsv.forceLayout();
        return false;
      }
    }
  },
  /*
   * show popup for customers import
   */
  showImportProcessPopup : function(csvFile){
    var self =this;
    this.view.popUpImportCancel.btnPopUpCancel.setVisibility(false);
    this.view.popUpImportCancel.flxPopUpClose.setVisibility(false);
    this.view.popUpImportCancel.lblPopUpMainMessage.text = "Import Locations";//kony.i18n.getLocalizedString("i18n.frmGroups.ImportCustomer_LC");
    this.view.popUpImportCancel.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmGroups.ImportCustomerPopupMsg") +"\n";
    this.view.popUpImportCancel.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.OK");
    this.view.flxImportCancelPopup.setVisibility(true);
    this.view.popUpImportCancel.btnPopUpDelete.onClick = function(){
      self.view.flxImportCancelPopup.setVisibility(false); 
      kony.adminConsole.utils.showProgressBar(self.view);
      self.uploadingIndicatorCallBack();
    }
    this.view.forceLayout();
  },
  selectAllServices: function() {
    var self = this;
    var servicesToAddData = this.view.addAndRemoveOptions.segAddOptions.data;
    var data = this.view.addAndRemoveOptions.segSelectedOptions.data;
    this.view.addAndRemoveOptions.rtxAvailableOptionsMessage.setVisibility(true);
    for (var i = 0; i < servicesToAddData.length; i++) {
      var toAdd = {
        flxClose: {
          onClick: self.removeSelectedService
        },
        fontIconClose: {"text":"\ue929"},
        lblOption: "" + servicesToAddData[i].lblName,
        hiddenDescription: "" + servicesToAddData[i].rtxDescription,
        template: "flxOptionAdded",
        id: servicesToAddData[i].id
      };
      data.push(toAdd);
    }
    this.view.addAndRemoveOptions.segAddOptions.removeAll();
    this.view.addAndRemoveOptions.segSelectedOptions.setData(data);
    //updating data for search
    this.view.addAndRemoveOptions.segAddOptions.info.segDataForSearch = [];
    this.view.addAndRemoveOptions.rtxSelectedOptionsMessage.setVisibility(false);
    this.view.forceLayout();
  },
  toggleCheckBoxes: function(imgWidget) {
    if (imgWidget.src === "checkbox.png") {
      imgWidget.src = "checkboxselected.png";
    } else {
      imgWidget.src = "checkbox.png";
    }
  },

  prefillDataInEditScreen: function() {
    var currentLocation = this.presenter.getCurrentLocation();
    this.currentLocation = currentLocation;
    if (currentLocation) {
      this.view.txtbxCode.text = currentLocation.Location_Code || "";
      this.view.txtbxName.text = currentLocation.Location_Name || "";
      this.view.txtbxDisplayName.text = currentLocation.Location_Display_Name || "";
      this.view.txtbxEmailIDUser.text = currentLocation.Location_EmailId || "";

      if (currentLocation.Location_Type_id === kony.i18n.getLocalizedString("i18n.frmLocationsController.Branch")) {
        this.view.imgRadio1.src = "radio_selected.png";
        this.view.imgRadio2.src = "radio_notselected.png";
        this.view.flxATMBasedOptions.setVisibility(false);
        this.view.flxBankBasedOptions.setVisibility(true);
        this.setCustomerSegement(currentLocation.Location_CustomerSegement);
      } else {
        this.view.imgRadio2.src = "radio_selected.png";
        this.view.imgRadio1.src = "radio_notselected.png";
        this.view.flxBankBasedOptions.setVisibility(false);
        this.view.flxATMBasedOptions.setVisibility(true);
        this.setSupportedCurrency();
        this.setSelectedCurrency(currentLocation.currencies);
      }
      if (currentLocation.Location_Status_id === "SID_ACTIVE") {
        this.view.switchActiveBranch.selectedIndex = 0;
      } else {
        this.view.switchActiveBranch.selectedIndex = 1;
      }
      if (currentLocation.Location_IsMainBranch === "true") {
        this.view.switchMainBranch.selectedIndex = 0;
      } else {
        this.view.switchMainBranch.selectedIndex = 1;
      }
      if(currentLocation.Location_IsMobile && currentLocation.Location_IsMobile === "true"){
        this.view.imgRadioMobile.src = "radio_selected.png";
        this.view.imgRadioPhysical.src = "radio_notselected.png";
      }	else {
        this.view.imgRadioPhysical.src = "radio_selected.png";
        this.view.imgRadioMobile.src = "radio_notselected.png";
      }
      this.view.TxtAreaDescription.text = currentLocation.Location_Description || "";
      var delimeter = currentLocation.Location_Phone_Number.indexOf("-");
      var strLen = currentLocation.Location_Phone_Number.lenght;
      this.view.contactNumber.txtISDCode.text = currentLocation.Location_Phone_Number.substr(0,delimeter);
      this.view.contactNumber.txtContactNumber.text = currentLocation.Location_Phone_Number.substr(delimeter+1,strLen);
      this.view.txtbxLatitude.text = currentLocation.Location_Latitude || "";
      this.view.txtbxLongtitude.text = currentLocation.Location_Longitude || "";

      this.prefillAddress(currentLocation);
      this.prefillServicesData(currentLocation);
      this.prefillScheduleData(currentLocation);
      this.view.lblCountDisplayName.setVisibility(false);
      this.view.lblNameCountValue.setVisibility(false);
      this.view.lblFullNameCount.setVisibility(false);
      this.view.lblDescriptionCount.setVisibility(false);
    } else {
      this.resetEditScreen();
    }
    this.view.forceLayout();
  },

  prefillScheduleData: function(currentLocation) {    
    var Weekday_StartTime = this.timeValueObj(currentLocation.Weekday_StartTime);
    var Weekday_EndTime = this.timeValueObj(currentLocation.Weekday_EndTime);
    var Weekend_StartTime = currentLocation.Saturday_StartTime ? this.timeValueObj(currentLocation.Saturday_StartTime) : this.timeValueObj(currentLocation.Sunday_StartTime);
    var Weekend_EndTime = currentLocation.Saturday_EndTime ? this.timeValueObj(currentLocation.Saturday_EndTime) : this.timeValueObj(currentLocation.Sunday_EndTime);

    this.view.timePicker.setTime(Weekday_StartTime.hours, Weekday_StartTime.minutes, Weekday_StartTime.meridiem);
    this.view.timePicker1.setTime(Weekday_EndTime.hours, Weekday_EndTime.minutes, Weekday_EndTime.meridiem);

    if (Weekend_StartTime.hours || Weekend_EndTime.hours) {
      this.view.switchWeekendSchedule.selectedIndex = 0;
      this.view.flxWorkingTime.setVisibility(true);
      this.view.imgSaturdayCheckBox.src = currentLocation.Saturday_StartTime ? "checkboxselected.png" : "checkbox.png";
      this.view.imgSundayCheckBox.src = currentLocation.Sunday_StartTime ? "checkboxselected.png" : "checkbox.png";

      this.view.timePicker2.setTime(Weekend_StartTime.hours, Weekend_StartTime.minutes, Weekend_StartTime.meridiem);
      this.view.timePicker3.setTime(Weekend_EndTime.hours, Weekend_EndTime.minutes, Weekend_EndTime.meridiem);
    } else {
      this.view.switchWeekendSchedule.selectedIndex = 1;
      this.view.flxWorkingTime.setVisibility(false);
    }
  },

  prefillServicesData: function(currentLocation) {
    var self = this;
    var allServices = this.view.addAndRemoveOptions.segAddOptions.data;
    var locationServiceIds = currentLocation.facilities.map(function(facility) {
      return facility.Facility_id;
    });
    var availableServicesData = allServices.filter(function(s) {
      return !locationServiceIds.contains(s.id);
    });
    var assignedServicesData = allServices.filter(function(s) {
      return locationServiceIds.contains(s.id);
    })
    .map(function(facility) {
      return {
        flxClose: {
          onClick: function() {
            self.removeSelectedService();
          }
        },
        fontIconClose: {"text":"\ue929"},
        lblOption: "" + facility.lblName,
        hiddenDescription: "" + facility.rtxDescription,
        template: "flxOptionAdded",
        id: facility.id
      };
    });
    this.view.addAndRemoveOptions.segAddOptions.setData(availableServicesData);
    this.view.addAndRemoveOptions.segAddOptions.info.segDataForSearch = availableServicesData;
    this.view.addAndRemoveOptions.segSelectedOptions.setData(assignedServicesData);
  },

  resetEditScreen: function() {
    this.view.txtbxCode.text = "";
    this.view.txtbxName.text = "";
    this.view.txtbxDisplayName.text = "";
    this.view.txtbxEmailIDUser.text = "";

    this.view.txtbxAddressLine1User.text = "";
    this.view.txtbxPostalCodeUser.text = "";

    this.view.TxtAreaDescription.text = "";
    this.view.contactNumber.txtContactNumber.text = "";
    this.view.contactNumber.txtISDCode.text = "";
    this.view.txtbxLatitude.text = "";
    this.view.txtbxLongtitude.text = "";

    //Set time picker
    this.view.timePicker.lstbxHours.selectedKey = "hh";
    this.view.timePicker.lstbxMinutes.selectedKey = "mm";
    this.view.timePicker.lstbxAMPM.selectedKey = "AM";

    this.view.timePicker1.lstbxHours.selectedKey = "hh";
    this.view.timePicker1.lstbxMinutes.selectedKey = "mm";
    this.view.timePicker1.lstbxAMPM.selectedKey = "AM";

    this.view.timePicker2.lstbxHours.selectedKey = "hh";
    this.view.timePicker2.lstbxMinutes.selectedKey = "mm";
    this.view.timePicker2.lstbxAMPM.selectedKey = "AM";

    this.view.timePicker3.lstbxHours.selectedKey = "hh";
    this.view.timePicker3.lstbxMinutes.selectedKey = "mm";
    this.view.timePicker3.lstbxAMPM.selectedKey = "AM";

    //lbx
    this.view.lstbxStateUser.selectedKey = kony.i18n.getLocalizedString("i18n.frmLogsController.Select");
    this.view.lstbxCountryUser.selectedKey = kony.i18n.getLocalizedString("i18n.frmLogsController.Select");
    this.view.txtbxLocationCity.text = "";

    this.view.imgSaturdayCheckBox.src = "checkbox.png";
    this.view.imgSundayCheckBox.src = "checkbox.png";

    //radio
    this.view.imgRadio1.src = "radio_selected.png";
    this.view.imgRadio2.src = "radio_notselected.png";
    this.view.flxATMBasedOptions.setVisibility(false);
    this.view.flxBankBasedOptions.setVisibility(true);
    this.view.imgcbSmallBusinessUser.src = "checkboxnormal.png";
    this.view.imgcbMicroBusinessUser.src = "checkboxnormal.png";
    this.view.imgcbRetailCustomer.src = "checkboxnormal.png";
    this.view.imgRadioPhysical.src = "radio_selected.png";
    this.view.imgRadioMobile.src = "radio_notselected.png";
    
    //switch
    this.view.switchActiveBranch.selectedIndex = 0;
    this.view.switchMainBranch.selectedIndex = 1;
    this.view.switchWeekendSchedule.selectedIndex = 1;
  },

  prefillAddress: function(currentLocation) {
    var address = currentLocation.ADDRESS;
    if (address) {
      var zipCode = address.substring(address.lastIndexOf(",") + 2);
      var addressCityStateCountry = address.substring(0, address.lastIndexOf(","));
      var country = addressCityStateCountry.substring(addressCityStateCountry.lastIndexOf(",") + 2);
      var addressCityState = addressCityStateCountry.substring(0, addressCityStateCountry.lastIndexOf(","));
      var State = addressCityState.substring(addressCityState.lastIndexOf(",") + 2);
      var addressCity = addressCityState.substring(0, addressCityState.lastIndexOf(","));
      var city = addressCity.substring(addressCity.lastIndexOf(",") + 2).replace("<","&lt").replace(">","&gt").replace("&","&amp").replace("=","&eq").replace("alert","").replace("marque","").replace("<","&lt").replace(">","&gt");
      var addressLine1 = addressCity.substring(0, addressCity.lastIndexOf(","));
      this.view.txtbxAddressLine1User.text = addressLine1;
      this.view.txtbxPostalCodeUser.text = zipCode;
      var Region = this.view.lstbxStateUser.masterData.find(function(region) {
        return region[1] === State;
      });
      var Country = this.view.lstbxCountryUser.masterData.find(function(C) {
        return C[1] === country;
      });
      this.view.txtbxLocationCity.text = city;
      this.view.lstbxStateUser.selectedKey = Region ? Region[0] : kony.i18n.getLocalizedString("i18n.frmLogsController.Select");
      this.view.lstbxCountryUser.selectedKey = Country ? Country[0] : kony.i18n.getLocalizedString("i18n.frmLogsController.Select");
    } else {
      this.view.txtbxLocationCity.text = "";
      this.view.lstbxStateUser.selectedKey = kony.i18n.getLocalizedString("i18n.frmLogsController.Select");
      this.view.lstbxCountryUser.selectedKey = kony.i18n.getLocalizedString("i18n.frmLogsController.Select");
    }
  },

  setFlowActions: function() {
    var scopeObj = this;
    this.view.contactNumber.txtContactNumber.onKeyUp = function(){
      scopeObj.view.contactNumber.hideErrorMsg(2);
    };
    this.view.contactNumber.txtContactNumber.onTouchStart = function(){
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToPhoneNumber('frmLocations_contactNumber_txtContactNumber');
    };
    this.view.contactNumber.txtISDCode.onKeyUp = function(){
      scopeObj.view.contactNumber.hideErrorMsg(1);
    };
    this.view.contactNumber.txtISDCode.onTouchStart = function(){
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToISDCode('frmLocations_contactNumber_txtISDCode');
    };
    this.view.contactNumber.txtISDCode.onEndEditing = function(){
      scopeObj.view.contactNumber.txtISDCode.text = scopeObj.view.contactNumber.addingPlus(scopeObj.view.contactNumber.txtISDCode.text);
    };
    this.view.flxLocationsHeaderName.onClick = function() {
      var segData = scopeObj.view.listingSegmentClient.segListing.data;
      scopeObj.sortBy.column("lblBranchName");
      scopeObj.resetSortImages();
      scopeObj.view.listingSegmentClient.segListing.setData(segData.sort(scopeObj.sortBy.sortData));
    };
    this.view.flxLocationsHeaderCode.onClick = function() {
      var segData = scopeObj.view.listingSegmentClient.segListing.data;
      scopeObj.sortBy.column("lblCode");
      scopeObj.resetSortImages();
      scopeObj.view.listingSegmentClient.segListing.setData(segData.sort(scopeObj.sortBy.sortData));
    };
    this.view.flxLocationsHeaderType.onClick = function() {
      scopeObj.setDataForTypeFilter("filterClick");
      scopeObj.view.flxStatusFilter.setVisibility(false);
      var flxRight = scopeObj.view.flxLocationsHeader.frame.width - scopeObj.view.flxLocationsHeaderType.frame.x - scopeObj.view.flxLocationsHeaderType.frame.width;
      var iconRight = scopeObj.view.flxLocationsHeaderType.frame.width - scopeObj.view.lblFilterType.frame.x;
      scopeObj.view.flxTypeFilter.right = (flxRight + iconRight + 5) +"px";
      if(scopeObj.view.flxTypeFilter.isVisible){
        scopeObj.view.flxTypeFilter.setVisibility(false);
      }else{
        scopeObj.view.flxTypeFilter.setVisibility(true);
      }

    };
    this.view.flxLocationsHeaderPhone.onClick = function() {
      var segData = scopeObj.view.listingSegmentClient.segListing.data;
      scopeObj.sortBy.column("lblPhone");
      scopeObj.resetSortImages();
      scopeObj.view.listingSegmentClient.segListing.setData(segData.sort(scopeObj.sortBy.sortData));
    };
    this.view.flxStatus.onClick = function() {
      scopeObj.setDataForStatusFilter("filterClick");
      scopeObj.view.flxTypeFilter.setVisibility(false);
      var flxRight = scopeObj.view.flxLocationsHeader.frame.width - scopeObj.view.flxStatus.frame.x - scopeObj.view.flxStatus.frame.width;
      var iconRight = scopeObj.view.flxStatus.frame.width - scopeObj.view.lblSortStatus.frame.x;
      scopeObj.view.flxStatusFilter.right = (flxRight + iconRight + 5) +"px";
      if(scopeObj.view.flxStatusFilter.isVisible){
        scopeObj.view.flxStatusFilter.setVisibility(false);
      }else{
        scopeObj.view.flxStatusFilter.setVisibility(true);
      }
    };
    this.view.flxSaturdayCheckBox.onClick = function() {
      scopeObj.view.flxWeekendSchErrorMsg.setVisibility(false);
      scopeObj.toggleCheckBoxes(scopeObj.view.imgSaturdayCheckBox);
    };
    this.view.flxSundayCheckBox.onClick = function() {
      scopeObj.toggleCheckBoxes(scopeObj.view.imgSundayCheckBox);
      scopeObj.view.flxWeekendSchErrorMsg.setVisibility(false);
    };
    const getFilteredLocationsList = function (searchText) {
      scopeObj.presenter.getSearchedLocations(searchText);
    };
    const debounce = function(func, delay){
      var self = this;
      let timer;
      return function () {
        let context = self,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
          func.apply(context, args);
        }, delay);
      };
    };
    
    const showLocationsList = debounce(getFilteredLocationsList,300);
    
    
    this.view.subHeader.tbxSearchBox.onKeyUp = function() {
      var SearchText = scopeObj.view.subHeader.tbxSearchBox.text;
      SearchText=SearchText.replace("<","&lt").replace(">","&gt").replace("=","&eq").replace("alert","").replace("marque","").replace("<","&lt").replace(">","&gt");
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      //scopeObj.loadPageData();
      if(SearchText === ""){
        scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100";
        scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
        scopeObj.loadPageData();
      }else{
        scopeObj.view.subHeader.flxSearchContainer.skin ="slFbox0ebc847fa67a243Search";
        scopeObj.view.subHeader.flxClearSearchImage.setVisibility(true);
      }
      if (scopeObj.records === 0) {
        scopeObj.showNoResultsFound();
        scopeObj.view.forceLayout();
      } else {
        scopeObj.hideNoResultsFound();
        scopeObj.view.forceLayout();
      }
      if(SearchText !== "" )
        showLocationsList(SearchText);
        //scopeObj.presenter.getSearchedLocations(scopeObj.view.subHeader.tbxSearchBox.text);
    };
    this.view.subHeader.flxClearSearchImage.onClick = function() {
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.view.subHeader.tbxSearchBox.text = "";
      scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100";
      scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
      scopeObj.loadPageData();
      scopeObj.hideNoResultsFound();
      scopeObj.filterIndiciesArray.type = [0,1];
      scopeObj.filterIndiciesArray.status = [0,1];
      scopeObj.view.forceLayout();
    };

    this.view.addAndRemoveOptions.tbxSearchBox.onKeyUp = function() {
      var searchText = scopeObj.view.addAndRemoveOptions.tbxSearchBox.text;
      searchText = searchText
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("=", "&eq;")
        .replaceAll("alert", "")
        .replaceAll("marque", "")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#x27")
        .replaceAll("/", "&#x2F");
      if(searchText === ""){
        scopeObj.view.addAndRemoveOptions.flxSearchContainer.skin = "sknflxd5d9ddop100";
        scopeObj.view.addAndRemoveOptions.flxClearSearchImage.setVisibility(false);
      }else{
        scopeObj.view.addAndRemoveOptions.flxSearchContainer.skin ="slFbox0ebc847fa67a243Search";
        scopeObj.view.addAndRemoveOptions.flxClearSearchImage.setVisibility(true);
      }
      scopeObj.performEntitlementSearch(searchText);
      scopeObj.view.forceLayout();
    };
    this.view.addAndRemoveOptions.flxClearSearchImage.onClick = function() {
      scopeObj.view.addAndRemoveOptions.tbxSearchBox.text = "";
      scopeObj.performEntitlementSearch(scopeObj.view.addAndRemoveOptions.tbxSearchBox.text);
      scopeObj.view.addAndRemoveOptions.flxSearchContainer.skin = "sknflxd5d9ddop100";
      scopeObj.view.addAndRemoveOptions.flxClearSearchImage.setVisibility(false);
    };
    this.view.addAndRemoveOptions.btnSelectAll.onClick = function() {
      scopeObj.selectAllServices();
      scopeObj.view.addAndRemoveOptions.btnSelectAll.setVisibility(false);
      scopeObj.view.addAndRemoveOptions.btnRemoveAll.setVisibility(true);
    };
    this.view.addAndRemoveOptions.btnRemoveAll.onClick = function() {
      scopeObj.removeAllSelectedServices();
      scopeObj.view.addAndRemoveOptions.btnSelectAll.setVisibility(true);
      scopeObj.view.addAndRemoveOptions.btnRemoveAll.setVisibility(false);
    };

    this.view.btnClickHere.onClick = function() {
      scopeObj.downloadCSV("locationTemplate");
    };
    this.view.toastMessageWithLink.btnToastLink.onClick = function() {
      scopeObj.downloadCSV();
    };
    this.view.btnAdd.onClick = function() {
      scopeObj.showLoadingScreen();
      scopeObj.clearValidationErrors();
      scopeObj.addingPrefillData(false, function() {
        scopeObj.hideHeaderButtons();
        scopeObj.showAddLocationDetails();
        scopeObj.hideLoadingScreen();
        scopeObj.setBreadCrumbsText([kony.i18n.getLocalizedString("i18n.DragBox.ADD")]);
      });
      scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Add_Locations");

    };
    this.view.btnImport.onClick = function() {
      scopeObj.uploadFile();
    };
    this.view.btnCancel.onClick = function() {
      scopeObj.view.popUpImportCancel.btnPopUpCancel.setVisibility(true);
      scopeObj.view.popUpImportCancel.flxPopUpClose.setVisibility(true);
      scopeObj.view.popUpImportCancel.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Cancel_file_upload");
      scopeObj.view.popUpImportCancel.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Cancel_file_upload_MesssageContent");
      scopeObj.view.popUpImportCancel.btnPopUpDelete.text =  kony.i18n.getLocalizedString("i18n.secureimage.YesCancel");
      scopeObj.view.flxImportCancelPopup.setVisibility(true);
      scopeObj.view.popUpImportCancel.btnPopUpDelete.onClick = function() {
        scopeObj.showNoRecordAddedYet();
      };
    };
    this.view.btnAddCase.onClick = function() {
      scopeObj.hideAll();
      scopeObj.showLoadingScreen();
      scopeObj.presenter.resetLocationData();
      scopeObj.clearValidationErrors();
      scopeObj.addingPrefillData(false, function() {
        scopeObj.hideHeaderButtons();
        scopeObj.prefillDataInEditScreen();
        scopeObj.hideLoadingScreen();
        scopeObj.view.flxBreadCrumbs.setVisibility(true);
        scopeObj.view.flxScrollMainContent.setVisibility(true);
        scopeObj.view.flxLocationDetailsAndServices.setVisibility(true);
        scopeObj.view.flxLocationDetailsWrapper.setVisibility(true);
        scopeObj.view.forceLayout();
      });
      scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Add_Locations");
      scopeObj.showSelectedOptionImage(scopeObj.view.verticalTabs.lblSelected1);
      scopeObj.setBreadCrumbsText([kony.i18n.getLocalizedString("i18n.DragBox.ADD")]);

      scopeObj.view.forceLayout();
    };
    this.view.toastMessage.flxRightImage.onClick = function() {
      scopeObj.hideToastMessage();
    };
    this.view.toastMessageWithLink.flxRightImage.onClick = function() {
      scopeObj.hideToastMessageWithLink();
    };
    this.view.popUpImportCancel.flxPopUpClose.onClick = function() {
      scopeObj.view.flxImportCancelPopup.setVisibility(false);
    };
    this.view.popUpImportCancel.btnPopUpCancel.onClick = function() {
      scopeObj.view.flxImportCancelPopup.setVisibility(false);
    };
    this.view.popUpImportCancel.btnPopUpDelete.onClick = function() {
      scopeObj.showNoRecordAddedYet();
    };
    this.view.verticalTabs.btnOption1.onClick = function() {
      scopeObj.showAddLocationDetails();
    };
    this.view.verticalTabs.btnOption2.onClick = function() {
      scopeObj.clearErrors();
      var currentLocation = scopeObj.presenter.getCurrentLocation();
      var fieldsCorrect = scopeObj.locationFieldValidations(currentLocation);
      if(fieldsCorrect){
        scopeObj.showAddAndRemoveServices();
      }
    };
    this.view.AddAndRemoveServicesButtons.btnSave.onClick = function() {
      //functions for adding
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.addDataToListingSegment();
    };
    this.view.AddAndRemoveServicesButtons.btnCancel.onClick = function() {
      scopeObj.resetEditScreen();
      scopeObj.showListingScreen();
    };
    this.view.locationDetailsButtons.btnCancel.onClick = function() {
      scopeObj.resetEditScreen();
      scopeObj.showListingScreen();
    };
    this.view.locationDetailsButtons.btnNext.onClick = function() {
      scopeObj.clearErrors();
      var currentLocation = scopeObj.presenter.getCurrentLocation();
      var fieldsCorrect = scopeObj.locationFieldValidations(currentLocation);
      if(fieldsCorrect){
        scopeObj.showAddAndRemoveServices();
      }
    };
    this.view.locationDetailsButtons.btnSave.onClick = function() {
      // functions for adding
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.addDataToListingSegment();
    };
    this.view.breadcrumbs.btnBackToMain.onClick = function() {
      scopeObj.presenter.resetLocationData();
      scopeObj.showListingScreen();
    };
    this.view.listingSegmentClient.segListing.onRowClick = function() {
      scopeObj.rowIndex = scopeObj.view.listingSegmentClient.segListing.selectedIndex[1];
      var branchName = scopeObj.view.listingSegmentClient.segListing.data[scopeObj.rowIndex].lblBranchName;
      var LocationId = scopeObj.view.listingSegmentClient.segListing.data[scopeObj.rowIndex].lblLocation;
      scopeObj.showLoadingScreen();
      scopeObj.presenter.getLocationDetails(LocationId, function(locationDetails) {
        scopeObj.showViewLocation();
        scopeObj.setBreadCrumbsText(["" + branchName.toUpperCase()]);
        scopeObj.setLocationDetails(locationDetails);
        scopeObj.hideLoadingScreen();
        scopeObj.view.forceLayout();
      });
    };
    this.view.flxViewEditButton.onClick = function() {
      scopeObj.showLoadingScreen();
      try {
        scopeObj.showAddLocationDetails();
        scopeObj.clearValidationErrors();
        scopeObj.addingPrefillData(true, function() {
          scopeObj.hideHeaderButtons();
          scopeObj.prefillDataInEditScreen();
          scopeObj.hideLoadingScreen();
          scopeObj.rowIndex = scopeObj.view.listingSegmentClient.segListing.selectedIndex[1];
          var branchName = scopeObj.view.listingSegmentClient.segListing.data[scopeObj.rowIndex].lblBranchName;
          scopeObj.setBreadCrumbsText(["" + branchName.toUpperCase()]);
        });
        scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Edit_Locations");
      } catch (e) {
        scopeObj.hideLoadingScreen();
      }
    };
    this.view.listingSegmentClient.contextualMenu.flxOption1.onClick = function() {
      try {
        var LocationId = scopeObj.view.listingSegmentClient.segListing.data[scopeObj.rowIndex].lblLocation;
        scopeObj.presenter.getLocationDetails(LocationId, function(locationDetails) {
          if(locationDetails == "error") {
            scopeObj.showAddLocationDetails();
            scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Edit_Locations");
            scopeObj.view.toastMessage.showErrorToastMessage("unable to get Loaction details", scopeObj);
          } else {
            scopeObj.showAddLocationDetails();
            scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Edit_Locations");
            scopeObj.clearValidationErrors();
            scopeObj.addingPrefillData(true, function() {
              scopeObj.hideHeaderButtons();
              scopeObj.prefillDataInEditScreen();
              scopeObj.rowIndex = scopeObj.view.listingSegmentClient.segListing.selectedRowIndex[1];
              var branchName = scopeObj.view.listingSegmentClient.segListing.data[scopeObj.rowIndex].lblBranchName;
              scopeObj.setBreadCrumbsText(["" + branchName.toUpperCase()]);
              scopeObj.hideLoadingScreen();
              scopeObj.view.forceLayout();
            });
          }
        });
      } catch (e) {
        scopeObj.hideLoadingScreen();
      }
    };

    this.view.listingSegmentClient.contextualMenu.flxOption2.onClick = function() {
      var data = scopeObj.view.listingSegmentClient.segListing.data;
      if (data[scopeObj.rowIndex].lblStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
        if(data[scopeObj.rowIndex].lblType === "Branch") {
          scopeObj.view.popUpStatusChange.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.deactivateBranch");
          scopeObj.view.popUpStatusChange.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.deactivateBranchMessage");
        }
        else {
          scopeObj.view.popUpStatusChange.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.deactivateATM");
          scopeObj.view.popUpStatusChange.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.deactivateATMMessage");
        }
        scopeObj.view.flxStatusChangePopUp.setVisibility(true);
      } else {
        scopeObj.presenter.changeStatusOfLocation("SID_ACTIVE", data[scopeObj.rowIndex].lblLocation, function(status) {
          if(status == "success") {
            scopeObj.toggleLocationStatus();
          } else if(status == "error") {
            scopeObj.view.toastMessage.showErrorToastMessage("Unable to change Status Of location", scopeObj);
          }
        });
      }
    };
    this.view.popUpStatusChange.flxPopUpClose.onClick = function() {
      scopeObj.view.flxStatusChangePopUp.setVisibility(false);
    };
    this.view.popUpStatusChange.btnPopUpCancel.onClick = function() {
      scopeObj.view.flxStatusChangePopUp.setVisibility(false);
    };
    this.view.popUpStatusChange.btnPopUpDelete.onClick = function() {
      scopeObj.view.flxStatusChangePopUp.setVisibility(false);
      var data = scopeObj.view.listingSegmentClient.segListing.data;
      scopeObj.presenter.changeStatusOfLocation("SID_INACTIVE", data[scopeObj.rowIndex].lblLocation, function(status) {
        if(status == "success") {
          scopeObj.toggleLocationStatus();
          scopeObj.showToastMessage();
        } else if(status == "error") {
          scopeObj.view.toastMessage.showErrorToastMessage("Unable to change Status Of location", scopeObj);
        }
      });
    };
    this.view.listingSegmentClient.contextualMenu.flxOption3.onClick = function() {
      var data = scopeObj.view.listingSegmentClient.segListing.data;
      if (data[scopeObj.rowIndex].lblIconType.skin === "sknFontIconActivate") {
        scopeObj.view.flxSetOfflinePopUp.setVisibility(true);
      } else {
        scopeObj.presenter.changeConnectivityStatusOfLocation(kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate"), data[scopeObj.rowIndex].lblLocation, function(status) {
          if(status == "success") {
            scopeObj.toggleBranchStatus();
          } else if(status == "error") {
            scopeObj.view.toastMessage.showErrorToastMessage("Unable to change Status Of location", scopeObj);
          }
        });
      }
    };
    this.view.popUpSetOffline.flxPopUpClose.onClick = function() {
      scopeObj.view.flxSetOfflinePopUp.setVisibility(false);
    };
    this.view.popUpSetOffline.btnPopUpCancel.onClick = function() {
      scopeObj.view.flxSetOfflinePopUp.setVisibility(false);
    };
    this.view.popUpSetOffline.btnPopUpDelete.onClick = function() {
      var data = scopeObj.view.listingSegmentClient.segListing.data;
      scopeObj.presenter.changeConnectivityStatusOfLocation(kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate"), data[scopeObj.rowIndex].lblLocation, function(status) {
        if(status == "success") {
          scopeObj.view.flxSetOfflinePopUp.setVisibility(false);
          scopeObj.toggleBranchStatus();
          scopeObj.showToastMessage();
        }else if(status == "error") {
          scopeObj.view.toastMessage.showErrorToastMessage("Unable to change Status Of location", scopeObj);
        }
      });
    };

    this.view.switchWeekendSchedule.onSlide = function() {
      if (scopeObj.view.switchWeekendSchedule.selectedIndex === 0) {
        scopeObj.view.flxWorkingTime.setVisibility(true);
      } else if (scopeObj.view.switchWeekendSchedule.selectedIndex === 1) {
        scopeObj.view.flxWorkingTime.setVisibility(false);
      }
    };
    this.view.flxDetails1.onClick = function() {
      if (scopeObj.view.flxDetailsData1.isVisible === false) {
        scopeObj.view.flxDetailsData1.setVisibility(true);
        scopeObj.view.lblToggleDetails.text = "\ue915";
      } else {
        scopeObj.view.flxDetailsData1.setVisibility(false);
        scopeObj.view.lblToggleDetails.text = "\ue922";
      }
    };
    this.view.flxContactDetails.onClick = function() {
      if (scopeObj.view.flxContactDetailsData.isVisible === false) {
        scopeObj.view.flxContactDetailsData.setVisibility(true);
        scopeObj.view.lblToggleContact.text = "\ue915";
      } else {
        scopeObj.view.flxContactDetailsData.setVisibility(false);
        scopeObj.view.lblToggleContact.text = "\ue922";
      }
    };
    this.view.flxOperationDetails.onClick = function() {
      if (scopeObj.view.flxOperationDetailsDataWrapper.isVisible === false) {
        scopeObj.view.flxOperationDetailsDataWrapper.setVisibility(true);
        scopeObj.view.lblToggleIperationDetails.text = "\ue915";
      } else {
        scopeObj.view.flxOperationDetailsDataWrapper.setVisibility(false);
        scopeObj.view.lblToggleIperationDetails.text = "\ue922";
      }
    };
    //     this.view.flxImgArrow3.onClick = function() {
    //       if (scopeObj.view.flxDescriptionData.isVisible === false) {
    //         scopeObj.view.flxDescriptionData.setVisibility(true);
    //         scopeObj.view.imgToggleDescription.src = "img_down_arrow.png";
    //       } else {
    //         scopeObj.view.flxDescriptionData.setVisibility(false);
    //         scopeObj.view.imgToggleDescription.src = "img_desc_arrow.png";
    //       }
    //     };

    this.view.flxRadio1.onClick = function() {
      if (scopeObj.view.imgRadio1.src === "radio_notselected.png") {
        scopeObj.view.lblMainBranch.setVisibility(true);
        scopeObj.view.flxToggle1.setVisibility(true);
        scopeObj.view.imgRadio1.src = "radio_selected.png";
        scopeObj.view.imgRadio2.src = "radio_notselected.png";
        scopeObj.view.flxATMBasedOptions.setVisibility(false);
        scopeObj.view.flxBankBasedOptions.setVisibility(true);
        scopeObj.view.imgcbSmallBusinessUser.src = "checkboxnormal.png";
        scopeObj.view.imgcbMicroBusinessUser.src = "checkboxnormal.png";
        scopeObj.view.imgcbRetailCustomer.src = "checkboxnormal.png";
        scopeObj.view.imgRadioPhysical.src = "radio_selected.png";
        scopeObj.view.imgRadioMobile.src = "radio_notselected.png";
        scopeObj.view.lblMainBranch.setVisibility(true);
        scopeObj.view.flxToggle1.setVisibility(true);
        scopeObj.selectedCurrencyList = []
      }
    };
    this.view.flxRadio2.onClick = function() {
      if (scopeObj.view.imgRadio2.src === "radio_notselected.png") {
        scopeObj.view.lblMainBranch.setVisibility(false);
        scopeObj.view.flxToggle1.setVisibility(false);
        scopeObj.view.imgRadio2.src = "radio_selected.png";
        scopeObj.view.imgRadio1.src = "radio_notselected.png";
        scopeObj.view.flxBankBasedOptions.setVisibility(false);
        scopeObj.view.flxATMBasedOptions.setVisibility(true);
        scopeObj.view.lblMainBranch.setVisibility(false);
        scopeObj.view.flxToggle1.setVisibility(false);
        scopeObj.setSupportedCurrency();
      }
    };
    this.view.flxDetailsHeading.onClick = function() {
      if (scopeObj.view.lblIconToggle.text === "\ue915") {
        scopeObj.view.flxDetailsData.setVisibility(false);
        scopeObj.view.lblIconToggle.text = "\ue922";
      } else {
        scopeObj.view.flxDetailsData.setVisibility(true);
        scopeObj.view.lblIconToggle.text = "\ue915";
      }
    };
    this.view.flxAddressHeading.onClick = function() {
      if (scopeObj.view.lblIconToggle1.text === "\ue915") {
        scopeObj.view.flxAddressData.setVisibility(false);
        scopeObj.view.lblIconToggle1.text = "\ue922";
      } else {
        scopeObj.view.flxAddressData.setVisibility(true);
        scopeObj.view.lblIconToggle1.text = "\ue915";
      }
    };
    this.view.flxOperationDetailsHeading.onClick = function() {
      if (scopeObj.view.lblIconToggle2.text === "\ue915") {
        scopeObj.view.flxOperationDetailsData.setVisibility(false);
        scopeObj.view.lblIconToggle2.text = "\ue922";
      } else {
        scopeObj.view.flxOperationDetailsData.setVisibility(true);
        scopeObj.view.lblIconToggle2.text = "\ue915";
      }
    };
    this.view.mainHeader.btnAddNewOption.onClick = function() {
      scopeObj.view.flxImportcsv.uploadfilePopup.errorMsg.setVisibility(false);
      scopeObj.view.uploadfilePopup.txtUploadFile.text = "";
      scopeObj.view.uploadfilePopup.txtUploadFile.setEnabled(false);
      scopeObj.fileToUpload = null;
      scopeObj.view.flxImportcsv.setVisibility(true);
    };

    this.view.uploadfilePopup.flxPopUpClose.onClick = function() {
      scopeObj.fileToUpload = null;
      scopeObj.view.flxImportcsv.setVisibility(false);
    };

    this.view.uploadfilePopup.btnPopUpCancel.onClick = function() {
      scopeObj.fileToUpload = null;
      scopeObj.view.flxImportcsv.setVisibility(false);
    };

    this.view.uploadfilePopup.btnBrowse.onClick = function() {
      scopeObj.uploadFile();
    };
    
    this.view.uploadfilePopup.lblDownloadTemplate.onClick = function() {
      scopeObj.downloadCSV("locationTemplate");
    };
    
    this.view.uploadfilePopup.btnPopUpDelete.onClick = function() {
      if(scopeObj.fileToUpload && scopeObj.fileToUpload !== null) {
        scopeObj.showUploadingIndicator(scopeObj.fileToUpload);
      } else {
        scopeObj.view.uploadfilePopup.errorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.decisionManagement.selectFileError");
        scopeObj.view.uploadfilePopup.txtUploadFile.skin = "skinredbg";
        scopeObj.view.uploadfilePopup.errorMsg.setVisibility(true);
        scopeObj.view.flxImportcsv.forceLayout();
      }
    };

    this.view.mainHeader.flxDownload.onClick = function() {
      if(scopeObj.view.listingSegmentClient.rtxNoResultsFound.isVisible === false) {
        scopeObj.downloadLocationsList();
      }
    };

    //     this.view.subHeader.lbxPageNumbers.onSelection = function() {
    //       scopeObj.changeNumberOfRecordsPerPage();
    //     };
    //     this.view.listingSegmentClient.pagination.lbxPagination.onSelection = function() {
    //       scopeObj.gotoPage();
    //     };
    //     this.view.listingSegmentClient.pagination.lblIconPrevious.onTouchStart = function() {
    //       scopeObj.prevPage();
    //     };
    //     this.view.listingSegmentClient.pagination.lblIconNext.onTouchStart = function() {
    //       scopeObj.nextPage();
    //     };

    this.view.lstbxCountryUser.onSelection = function() {
      scopeObj.hideValidationError('lstbxCountryUser', 'flxNoCountryError', 'sknlstbxNormal0f9abd8e88aa64a');
      scopeObj.presenter.fetchGlobalAddressData(kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.country"), scopeObj.view.lstbxCountryUser.selectedKeyValue[0]);
    };
    this.view.lstbxStateUser.onSelection = function() {
      scopeObj.hideValidationError('lstbxStateUser', 'flxNoStateError', 'sknlstbxNormal0f9abd8e88aa64a');
      //scopeObj.presenter.fetchGlobalAddressData(kony.i18n.getLocalizedString("i18n.frmUsersController.region"), scopeObj.view.lstbxStateUser.selectedKeyValue[0]);
    };
    this.view.txtbxLocationCity.onKeyUp = function() {
      scopeObj.hideValidationError('txtbxLocationCity', 'flxNoCityError');
    };
    this.view.txtbxCode.onKeyUp = function() {
      scopeObj.hideValidationError('txtbxCode', 'flxNoCodeError');
      scopeObj.view.lblFullNameCount.setVisibility(true);
      scopeObj.view.lblFullNameCount.text = scopeObj.view.txtbxCode.text.length+"/10";
      scopeObj.view.forceLayout();
    };
    this.view.txtbxCode.onEndEditing = function(){
      scopeObj.view.lblFullNameCount.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.txtbxName.onKeyUp = function() {
      scopeObj.hideValidationError('txtbxName', 'flxNoNameError');
      scopeObj.view.lblNameCountValue.setVisibility(true);
      scopeObj.view.lblNameCountValue.text = scopeObj.view.txtbxName.text.length+"/100";
      scopeObj.view.forceLayout();
    };
    this.view.txtbxName.onEndEditing = function(){
      scopeObj.view.lblNameCountValue.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.txtbxDisplayName.onKeyUp = function() {
      scopeObj.hideValidationError('txtbxDisplayName', 'flxNoDisplayNameError');
      scopeObj.view.lblCountDisplayName.setVisibility(true);
      scopeObj.view.lblCountDisplayName.text = scopeObj.view.txtbxDisplayName.text.length+"/100";
      scopeObj.view.forceLayout();
    };
    this.view.txtbxDisplayName.onEndEditing = function(){
      scopeObj.view.lblCountDisplayName.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.txtbxEmailIDUser.onKeyUp = function() {
      scopeObj.hideValidationError('txtbxEmailIDUser', 'flxNoEmailError');
    };
    this.view.TxtAreaDescription.onKeyUp = function() {
      scopeObj.hideValidationError('TxtAreaDescription', 'flxNoDescriptionError', "sknTextAreaDescription");
      scopeObj.view.lblDescriptionCount.setVisibility(true);
      scopeObj.view.lblDescriptionCount.text = scopeObj.view.TxtAreaDescription.text.length+"/200";
      scopeObj.view.forceLayout();
    };
    this.view.TxtAreaDescription.onEndEditing = function(){
      scopeObj.view.lblDescriptionCount.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.txtbxAddressLine1User.onKeyUp = function() {
      scopeObj.hideValidationError('txtbxAddressLine1User', 'flxNoAddressError');
      scopeObj.view.lblLocationAddressCount.setVisibility(true);
      scopeObj.view.lblLocationAddressCount.text = scopeObj.view.txtbxAddressLine1User.text.length+"/80";
      scopeObj.view.forceLayout();
    };
    this.view.txtbxAddressLine1User.onEndEditing = function() {
      scopeObj.view.lblLocationAddressCount.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.txtbxPostalCodeUser.onKeyUp = function() {
      scopeObj.hideValidationError('txtbxPostalCodeUser', 'flxNoZipCodeError');
    };
    this.view.txtbxLatitude.onKeyUp = function() {
      scopeObj.hideValidationError('txtbxLatitude', 'flxNoLatitudeError');
    };
    this.view.txtbxLongtitude.onKeyUp = function() {
      scopeObj.hideValidationError('txtbxLongtitude', 'flxNoLongitudeError');
    };
    this.view.typeFilterMenu.segStatusFilterDropdown.onRowClick =  function(){
      scopeObj.performFilterOnSegment('type');
    };
    this.view.statusFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.performFilterOnSegment('status');
    };
    this.view.flxSortLocationServices.onClick = function() {

      var locationServicesData = scopeObj.view.segViewServiceSegment.data;

      scopeObj.view.segViewServiceSegment.setData(
        locationServicesData.sort(scopeObj.locationServicesSortBy.sortData).map(function(obj) {
          return {
            lblDescription: obj.lblDescription,
            lblFacilityName: obj.lblFacilityName,
            lblSeperator: "."
          };
        })
      );

      if(scopeObj.locationServicesSortBy.inAscendingOrder) {
        scopeObj.view.lblSortLocationServices.text = "\ue92a";
      }
      else {
        scopeObj.view.lblSortLocationServices.text = "\ue920";
      }

      scopeObj.locationServicesSortBy.column("lblFacilityName");

      scopeObj.view.forceLayout();
    };

    this.view.flxcbSmallBusinessUser.onClick = function() {
      if(scopeObj.view.imgcbSmallBusinessUser.src == "checkboxnormal.png") {
        scopeObj.view.imgcbSmallBusinessUser.src = "checkboxselected.png";
      }
      else {
        scopeObj.view.imgcbSmallBusinessUser.src = "checkboxnormal.png";
      }
    };

    this.view.flxcbMicroBusinessUser.onClick = function() {
      if(scopeObj.view.imgcbMicroBusinessUser.src == "checkboxnormal.png") {
        scopeObj.view.imgcbMicroBusinessUser.src = "checkboxselected.png";
      }
      else {
        scopeObj.view.imgcbMicroBusinessUser.src = "checkboxnormal.png";
      }
    };

    this.view.flxcbRetailCustomer.onClick = function() {
      if(scopeObj.view.imgcbRetailCustomer.src == "checkboxnormal.png") {
        scopeObj.view.imgcbRetailCustomer.src = "checkboxselected.png";
      }
      else {
        scopeObj.view.imgcbRetailCustomer.src = "checkboxnormal.png";
      }
    };

    this.view.flxRadioPhysical.onClick = function() {
      if(scopeObj.view.imgRadioPhysical.src == "radio_notselected.png") {
        scopeObj.view.imgRadioPhysical.src = "radio_selected.png";
        scopeObj.view.imgRadioMobile.src = "radio_notselected.png";
      }
    };
    this.view.flxRadioMobile.onClick = function() {
      if(scopeObj.view.imgRadioMobile.src == "radio_notselected.png") {
        scopeObj.view.imgRadioMobile.src = "radio_selected.png";
        scopeObj.view.imgRadioPhysical.src = "radio_notselected.png";
      }
    };
    this.view.timePicker.lstbxHours.onSelection = function() {
      scopeObj.view.flxErrorTextWeekday.setVisibility(false);
    };
    this.view.timePicker.lstbxMinutes.onSelection = function() {
      scopeObj.view.flxErrorTextWeekday.setVisibility(false);
    };
    this.view.timePicker.lstbxAMPM.onSelection = function() {
      scopeObj.view.flxErrorTextWeekday.setVisibility(false);
    };
    this.view.timePicker1.lstbxHours.onSelection = function() {
      scopeObj.view.flxErrorTextWeekday.setVisibility(false);
    };
    this.view.timePicker1.lstbxMinutes.onSelection = function() {
      scopeObj.view.flxErrorTextWeekday.setVisibility(false);
    };
    this.view.timePicker1.lstbxAMPM.onSelection = function() {
      scopeObj.view.flxErrorTextWeekday.setVisibility(false);
    };    
    this.view.timePicker2.lstbxHours.onSelection = function() {
      scopeObj.view.flxWeekendSchErrorMsg.setVisibility(false);
    };
    this.view.timePicker2.lstbxMinutes.onSelection = function() {
      scopeObj.view.flxWeekendSchErrorMsg.setVisibility(false);
    };
    this.view.timePicker2.lstbxAMPM.onSelection = function() {
      scopeObj.view.flxWeekendSchErrorMsg.setVisibility(false);
    };
    this.view.timePicker3.lstbxHours.onSelection = function() {
      scopeObj.view.flxWeekendSchErrorMsg.setVisibility(false);
    };
    this.view.timePicker3.lstbxMinutes.onSelection = function() {
      scopeObj.view.flxWeekendSchErrorMsg.setVisibility(false);
    };
    this.view.timePicker3.lstbxAMPM.onSelection = function() {
      scopeObj.view.flxWeekendSchErrorMsg.setVisibility(false);
    };


    this.view.flxTypeFilter.onHover = scopeObj.onHoverEventCallback;
    this.view.flxStatusFilter.onHover = scopeObj.onHoverEventCallback;
  },

  hideValidationError: function(tbxWidget, flxError, skinValue){
    this.view[tbxWidget].skin = skinValue || "skntxtbxDetails0bbf1235271384a";
    this.view[flxError].isVisible = false;
  },

  clearValidationErrors: function() {
    this.hideValidationError('lstbxCountryUser', 'flxNoCountryError', 'sknlstbxNormal0f9abd8e88aa64a');
    this.hideValidationError('lstbxStateUser', 'flxNoStateError', 'sknlstbxNormal0f9abd8e88aa64a');
    this.hideValidationError('txtbxLocationCity', 'flxNoCityError');
    this.hideValidationError('txtbxCode', 'flxNoCodeError');
    this.hideValidationError('txtbxName', 'flxNoNameError');
    this.hideValidationError('txtbxDisplayName', 'flxNoDisplayNameError');
    this.hideValidationError('txtbxEmailIDUser', 'flxNoEmailError');
    this.hideValidationError('TxtAreaDescription', 'flxNoDescriptionError', "sknTextAreaDescription");
    this.hideValidationError('txtbxAddressLine1User', 'flxNoAddressError');
    this.hideValidationError('txtbxPostalCodeUser', 'flxNoZipCodeError');
    this.hideValidationError('txtbxLatitude', 'flxNoLatitudeError');
    this.hideValidationError('txtbxLongtitude', 'flxNoLongitudeError');
    this.view.contactNumber.hideErrorMsg(1);
    this.view.contactNumber.hideErrorMsg(2);
    this.view.flxWeekendSchErrorMsg.setVisibility(false);
    this.view.flxErrorTextWeekday.setVisibility(false);
  },

  //   changeNumberOfRecordsPerPage: function() {
  //     this.currentPage = 1;
  //     this.loadPageData();
  //   },

  showNoResultsFound: function() {
    var searchText=this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.subHeader.tbxSearchBox.text);
    this.view.listingSegmentClient.segListing.setVisibility(false);
    this.view.listingSegmentClient.rtxNoResultsFound.setVisibility(true);
    this.view.listingSegmentClient.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + '"' + searchText + '"' + kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
    this.view.flxLocationsHeader.setVisibility(false);
    //this.view.listingSegmentClient.pagination.setVisibility(false);
  },
  hideNoResultsFound: function() {
    this.view.listingSegmentClient.segListing.setVisibility(true);
    this.view.listingSegmentClient.rtxNoResultsFound.setVisibility(false);
    this.view.flxLocationsHeader.setVisibility(true);
    //this.view.listingSegmentClient.pagination.setVisibility(true);
  },
  removeAllSelectedServices: function() {
    //add data to left seg
    var self = this;
    var selectedServicesData = this.view.addAndRemoveOptions.segSelectedOptions.data;
    var availableServicesData = this.view.addAndRemoveOptions.segAddOptions.data;
    this.view.addAndRemoveOptions.btnRemoveAll.setVisibility(false);
    for (var i = 0; i < selectedServicesData.length; i++) {
      var toAddData = {
        btnAdd: {
          text: kony.i18n.getLocalizedString("i18n.DragBox.ADD"),
          onClick: self.addServiceToSegment
        },
        template: "flxAddOption",
        lblName: "" + selectedServicesData[i].lblOption,
        rtxDescription: "" + selectedServicesData[i].hiddenDescription,
        id: selectedServicesData[i].id
      };
      availableServicesData.push(toAddData);
    }
    this.view.addAndRemoveOptions.segAddOptions.setData(availableServicesData);
    //remove data from right
    this.view.addAndRemoveOptions.segSelectedOptions.removeAll();
    //updating data for search
    this.view.addAndRemoveOptions.segAddOptions.info.segDataForSearch = availableServicesData;
    this.view.addAndRemoveOptions.rtxSelectedOptionsMessage.setVisibility(true);
    this.view.addAndRemoveOptions.rtxAvailableOptionsMessage.setVisibility(false);
  },
  removeSelectedService: function() {
    var rowIndex = this.view.addAndRemoveOptions.segSelectedOptions.selectedIndex[1];
    //add row to right
    var self = this;
    var selectedServicesData = this.view.addAndRemoveOptions.segSelectedOptions.data;
    var availableServicesData = this.view.addAndRemoveOptions.segAddOptions.data;
    var toAddData = {
      btnAdd: {
        text: kony.i18n.getLocalizedString("i18n.DragBox.ADD"),
        onClick: function() {
          self.addServiceToSegment();
        }
      },
      template: "flxAddOption",
      lblName: "" + selectedServicesData[rowIndex].lblOption,
      rtxDescription: "" + selectedServicesData[rowIndex].hiddenDescription,
      id: selectedServicesData[rowIndex].id
    };

    availableServicesData.push(toAddData);
    this.view.addAndRemoveOptions.segAddOptions.setData(availableServicesData);

    //check if right segment is empty and display rtx
    this.view.addAndRemoveOptions.segSelectedOptions.removeAt(rowIndex);
    //updating data for search
    this.view.addAndRemoveOptions.segAddOptions.info.segDataForSearch = availableServicesData;
    this.view.addAndRemoveOptions.btnSelectAll.setVisibility(true);
    if(this.view.addAndRemoveOptions.segSelectedOptions.data.length===0){
      this.view.addAndRemoveOptions.rtxSelectedOptionsMessage.text=kony.i18n.getLocalizedString("i18n.frmLocationsController.No_records_added");
      this.view.addAndRemoveOptions.rtxSelectedOptionsMessage.setVisibility(true);
      this.view.addAndRemoveOptions.btnRemoveAll.setVisibility(false);
    }
    else
      this.view.addAndRemoveOptions.rtxSelectedOptionsMessage.setVisibility(false);
    this.view.addAndRemoveOptions.rtxAvailableOptionsMessage.setVisibility(false);
    this.view.forceLayout();
  },
  addServiceToSegment: function() {
    var self = this;
    var selectedItemData = this.view.addAndRemoveOptions.segAddOptions.selectedItems[0];
    this.view.addAndRemoveOptions.rtxSelectedOptionsMessage.setVisibility(false);
    var toAdd = {
      flxClose: {
        onClick: function() {
          self.removeSelectedService();
        }
      },
      fontIconClose: {"text":"\ue929"},
      lblOption: "" + selectedItemData.lblName,
      hiddenDescription: "" + selectedItemData.rtxDescription,
      template: "flxOptionAdded",
      id: selectedItemData.id
    };

    var data = this.view.addAndRemoveOptions.segSelectedOptions.data;
    data.push(toAdd);

    var rowIndex = this.view.addAndRemoveOptions.segAddOptions.selectedIndex[1];
    this.view.addAndRemoveOptions.segAddOptions.removeAt(rowIndex);
    //updating data for search
    this.view.addAndRemoveOptions.segAddOptions.info.segDataForSearch = (this.view.addAndRemoveOptions.segAddOptions.info.segDataForSearch).filter(function (record) {
      if (record.id !== selectedItemData.id) {
        return record;
      }
    });
    this.view.addAndRemoveOptions.btnRemoveAll.setVisibility(true);
    if(this.view.addAndRemoveOptions.segAddOptions.data.length===0){
      this.view.addAndRemoveOptions.rtxAvailableOptionsMessage.text=kony.i18n.getLocalizedString("i18n.frmLocationsController.No_records_to_add");
      this.view.addAndRemoveOptions.rtxAvailableOptionsMessage.setVisibility(true);
      this.view.addAndRemoveOptions.btnSelectAll.setVisibility(false);
    }
    else
      this.view.addAndRemoveOptions.rtxAvailableOptionsMessage.setVisibility(false);
    this.view.addAndRemoveOptions.segSelectedOptions.setData(data);
    this.view.addAndRemoveOptions.rtxSelectedOptionsMessage.setVisibility(false);
    this.view.forceLayout();
  },
  filterFacilitiesBasedOnBranchATM : function(data) {
    var scopeObj = this;
    return data.facilitytype == (scopeObj.view.imgRadio1.src === "radio_selected.png" ? "Branch" : "ATM");
  },
  mappingAvailableServicesData: function(data) {
    var self = this;
    return {
      btnAdd: {
        text: kony.i18n.getLocalizedString("i18n.DragBox.ADD"),
        onClick: function() {
          self.addServiceToSegment();
        }
      },
      flxAdd: "flxAdd",
      flxAddOption: "flxAddOption",
      template: "flxAddOption",
      lblName: data.name,
      rtxDescription: data.description,
      id: data.id
    };
  },
  setAvailableServicesSegmentData: function(data) {
    var dataMap = {
      btnAdd: "btnAdd",
      flxAdd: "flxAdd",
      flxAddOption: "flxAddOption",
      lblName: "lblName",
      rtxDescription: "rtxDescription"
    };
    this.view.addAndRemoveOptions.segAddOptions.widgetDataMap = dataMap;
    this.view.addAndRemoveOptions.segAddOptions.setData(data);
    this.view.forceLayout();
  },
  setSelectedServicesSegmentData: function(assignedServices) {
    var dataMap = {
      flxAddOptionWrapper: "flxAddOptionWrapper",
      flxClose: "flxClose",
      flxOptionAdded: "flxOptionAdded",
      fontIconClose: "fontIconClose",
      lblOption: "lblOption"
    };
    var data = assignedServices || [];
    this.view.addAndRemoveOptions.segSelectedOptions.widgetDataMap = dataMap;
    this.view.addAndRemoveOptions.segSelectedOptions.setData(data);
    this.view.forceLayout();
  },
  getAllAssignedServices: function() {
    var data = this.view.addAndRemoveOptions.segSelectedOptions.data;
    return data.map(function(row) {
      return row.id;
    });
  },
  getAllRemovedServices: function() {
    var currentLocation = this.presenter.getCurrentLocation();
    var originalFacilityIds = currentLocation.facilities.map(function(f) {
      return f.Facility_id;
    });
    var Facility_ids = this.view.addAndRemoveOptions.segSelectedOptions.data.map(function(f) {
      return f.id;
    });
    return this.updatedCollection(originalFacilityIds, Facility_ids);
  },

  getAllAddedWeekends: function() {
    var originalWeekends = [];
    var currentLocation = this.presenter.getCurrentLocation();
    if (currentLocation.Saturday_StartTime) originalWeekends.push(kony.i18n.getLocalizedString("i18n.View.SATURDAY"));
    if (currentLocation.Sunday_StartTime) originalWeekends.push(kony.i18n.getLocalizedString("i18n.frmLocationsController.SUNDAY"));

    var weekendSet = [];
    if (this.view.imgSaturdayCheckBox.src === "checkboxselected.png") weekendSet.push(kony.i18n.getLocalizedString("i18n.View.SATURDAY"));
    if (this.view.imgSundayCheckBox.src === "checkboxselected.png") weekendSet.push(kony.i18n.getLocalizedString("i18n.frmLocationsController.SUNDAY"));

    return this.updatedCollection(weekendSet, originalWeekends);
  },

  getAllRemovedWeekends: function() {
    var originalWeekends = [];
    var currentLocation = this.presenter.getCurrentLocation();
    if (currentLocation.Saturday_StartTime) originalWeekends.push(kony.i18n.getLocalizedString("i18n.View.SATURDAY"));
    if (currentLocation.Sunday_StartTime) originalWeekends.push(kony.i18n.getLocalizedString("i18n.frmLocationsController.SUNDAY"));

    var weekendSet = [];
    if (this.view.imgSaturdayCheckBox.src === "checkboxselected.png") weekendSet.push(kony.i18n.getLocalizedString("i18n.View.SATURDAY"));
    if (this.view.imgSundayCheckBox.src === "checkboxselected.png") weekendSet.push(kony.i18n.getLocalizedString("i18n.frmLocationsController.SUNDAY"));

    return this.updatedCollection(originalWeekends, weekendSet);
  },

  getAllAddedServices: function() {
    var currentLocation = this.presenter.getCurrentLocation();
    var originalServiceIds = currentLocation.facilities.map(function(f) {
      return f.Facility_id;
    });
    var Facility_ids = this.view.addAndRemoveOptions.segSelectedOptions.data.map(function(f) {
      return f.id;
    });
    return this.updatedCollection(Facility_ids, originalServiceIds);
  },

  getSelectedCustomerSegments : function() {
    var scopeObj = this;
    var customerSegments = [];

    if(this.view.imgcbSmallBusinessUser.src === "checkboxselected.png") {
      customerSegments.push(scopeObj.view.lblSmallBusinessUser.text);
    }
    if(this.view.imgcbMicroBusinessUser.src === "checkboxselected.png") {
      customerSegments.push(scopeObj.view.lblMicroBusinessUser.text);
    }
    if(this.view.imgcbRetailCustomer.src === "checkboxselected.png") {
      customerSegments.push(scopeObj.view.lblRetailCustomer.text);
    }

    return customerSegments;
  },
  
  setCustomerSegement : function(customerSegement){
    var self = this;
    if(customerSegement){
      customerSegement = customerSegement.split(",");
      customerSegement.forEach(function(item){
        self.view["imgcb" + item.replace(/\s/g,'')].src = "checkboxselected.png"; 
      });
    }
    this.view.forceLayout();
  },

  updatedCollection: function(a1, a2) {
    return a1.filter(function(x) {
      if(a2.indexOf(x) >= 0) return false;
      else return true;
    });
  },
  setLocationsSegmentData: function(locations) {
    kony.print(locations);
    var self = this;
    var dataMap = {
      flxOptions: "flxOptions",
      flxStatus: "flxStatus",
      flxType: "flxType",
      flxsegLocations: "flxsegLocations",
      lblOptions: "lblOptions",
      lblIconStatus:"lblIconStatus", 
      lblIconType: "lblIconType",
      lblBranchName: "lblBranchName",
      lblCode: "lblCode",
      lblDescription: "lblDescription",
      lblPhone: "lblPhone",
      lblSeperator: "lblSeperator",
      lblStatus: "lblStatus",
      lblType: "lblType",
      lblLocation: "lblLocation",
      lblSortName: "lblSortName",
      lblSortCode: "lblSortCode",
      lblFilterType: "lblFilterType",
      lblSortPhone: "lblSortPhone",
      lblSortStatus: "lblSortStatus"
    };
    var data = locations.map(this.toLocationSegment.bind(self));
    this.view.listingSegmentClient.segListing.widgetDataMap = dataMap;
    this.view.listingSegmentClient.segListing.setData(data.sort(this.sortBy.sortData));
    document.getElementById("frmLocations_flxLocationsSegment").onscroll = this.getLocationsOnReachingend;
    this.view.forceLayout();
  },
  contextualMenuOff: function() {
    var scopeObj = this;
    scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    scopeObj.optionButtonStateChange(scopeObj.prevIndex, false);
    this.view.forceLayout();
  },
  sortIconFor: function(column){
    return this.determineSortIcon(this.sortBy,column);
  },

  toLocationSegment: function(location) {
    var self = this;
    return {
      flxOptions: {
        onClick: function() {
          self.toggleContextualMenu(50);
        },
        skin : "slFbox"
      },
      lblOptions: {
        text:"\ue91f",
        skin: "sknFontIconOptionMenu"
      },
      lblIconStatus: {
        text: "\ue921",
        skin : location.Status_id === "SID_ACTIVE" ? "sknFontIconActivate" : "sknfontIconInactive"
      },
      lblIconType: {
        text: "\ue921",
        skin : location.softdeleteflag === "true" ? "sknfontIconInactive" : "sknFontIconActivate"
      },
      lblBranchName: location.DisplayName || "",
      lblCode: location.Code || "",
      lblDescription: location.Description || "",
      lblPhone: location.PhoneNumber || "",
      lblSeperator: "-",
      lblStatus: {
        text: location.Status_id === "SID_ACTIVE" ? kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive"),
        skin: location.Status_id === "SID_ACTIVE" ? "sknlblLato5bc06cBold14px" : "sknlblLatocacacaBold12px"
      },
      lblType: location.Type_id || "",
      lblLocation: location.id,
      template: "flxsegLocations"
    };
  },
  addingPrefillData: function(isEdit, cb) {
    var self = this;
    self.presenter.fetchLocationPrefillData(function(res) {
      if(res != "error") {
        self.view.lstbxCountryUser.masterData = res.countries.reduce(
          function(list, country) {
            return list.concat([[country.id, country.Name]]);
          },
          [[kony.i18n.getLocalizedString("i18n.frmLogsController.Select"), kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Select_a_Country")]]
        );

        if (isEdit) {
          self.view.lstbxStateUser.masterData = res.regions.reduce(
            function(list, region) {
              return list.concat([[region.id, region.Name]]);
            },
            [[kony.i18n.getLocalizedString("i18n.frmLogsController.Select"), kony.i18n.getLocalizedString("i18n.frmLogsController.Select")]]
          );
        } else {
          self.view.lstbxStateUser.masterData = [[kony.i18n.getLocalizedString("i18n.frmLogsController.Select"),kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Select_a_State")]];
        }     

        self.facilityList = res.facilityList;
        var filteredFacilityList = self.facilityList.filter(self.filterFacilitiesBasedOnBranchATM);
        var segData = filteredFacilityList.map(self.mappingAvailableServicesData);
        //for entitlements search
        self.view.addAndRemoveOptions.segAddOptions.info = {"segDataForSearch":segData};
        self.setAvailableServicesSegmentData(segData);
        self.setSelectedServicesSegmentData();

        self.defaultCurrencyList = [];
        for(var i=0; i<res.currencyList.length; ++i) {
          self.defaultCurrencyList.push(res.currencyList[i].code);
        }

        if (typeof cb === "function") cb();
      } else {
        self.view.toastMessage.showErrorToastMessage("unable to fetch Location Prefill Data", self);
      }
    });
  },
  addDataToListingSegment: function() {
    var self = this;
    var weekendSet = [];
    var currentLocation = this.presenter.getCurrentLocation();
    if (this.view.imgSaturdayCheckBox.src === "checkboxselected.png") weekendSet.push(kony.i18n.getLocalizedString("i18n.View.SATURDAY"));
    if (this.view.imgSundayCheckBox.src === "checkboxselected.png") weekendSet.push(kony.i18n.getLocalizedString("i18n.frmLocationsController.SUNDAY"));
    self.clearErrors();
    var fieldsCorrect = self.locationFieldValidations(currentLocation);
    if (fieldsCorrect === false) {
      self.hideLoadingScreen();
      self.view.flxBreadCrumbs.setVisibility(true);
      self.view.flxScrollMainContent.setVisibility(true);
      self.view.flxLocationDetailsAndServices.setVisibility(true);
      self.view.flxLocationDetailsWrapper.setVisibility(true);
      self.view.forceLayout();
    } else {
      var param = {
        User_ID: kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
        Location_id: currentLocation ? currentLocation.Location_id : "NULL",
        Status_id: this.view.switchActiveBranch.selectedIndex === 0 ? "SID_ACTIVE" : "SID_INACTIVE",
        Location_Details: {
          Name: this.view.txtbxName.text.trim(),
          DisplayName: this.view.txtbxDisplayName.text.trim(),
          Description: this.view.TxtAreaDescription.text.trim(),
          Type_id: this.view.imgRadio1.src === "radio_selected.png" ? kony.i18n.getLocalizedString("i18n.frmLocationsController.Branch") : kony.i18n.getLocalizedString("i18n.frmLocationsController.ATM"),
          Code: this.view.txtbxCode.text.trim(),
          Email: this.view.txtbxEmailIDUser.text.trim(),
          IsMainBranch: this.view.imgRadio1.src === "radio_selected.png" ? (this.view.switchMainBranch.selectedIndex === 0 ? "true" : "false") : "false",
          PhoneNumber: this.view.contactNumber.txtISDCode.text+ "-" + this.view.contactNumber.txtContactNumber.text,
          BankType: this.view.imgRadioPhysical.src === "radio_selected.png" ? kony.i18n.getLocalizedString("i18n.frmLocations.lblPhysical") : kony.i18n.getLocalizedString("i18n.frmLocations.lblMobile"),
        },
        CustomerSegment_Details : self.getSelectedCustomerSegments(),
        SupportedCurrency_Details : self.selectedCurrencyList,
        Service_Details: {
          AddedServices: currentLocation ? self.getAllAddedServices() : self.getAllAssignedServices(),
          RemovedServices: currentLocation ? self.getAllRemovedServices() : []
        },
        Address_Details: {
          AddressID: currentLocation ? currentLocation.Location_Address_id : "NULL",
          cityName: this.view.txtbxLocationCity.text.replace("<","&lt").replace(">","&gt").replace("&","&amp").replace("=","&eq").replace("alert","").replace("marque","").replace("<","&lt").replace(">","&gt"),
          addressLine1: this.view.txtbxAddressLine1User.text.trim(),
          longitude: this.view.txtbxLongtitude.text,
          latitude: this.view.txtbxLatitude.text,
          zipCode: this.view.txtbxPostalCodeUser.text,
          Region_id: this.view.lstbxStateUser.selectedKeyValue[0],
          Country_id: this.view.lstbxCountryUser.selectedKeyValue[0]
        },
        Schedule_Details: {
          WorkScheduleID: currentLocation ? currentLocation.Location_WorkScheduleId : "NULL",
          WorkScheduleDescription: "",
          WeekendWorkingDays: {
            AddedDays: currentLocation ? self.getAllAddedWeekends() : weekendSet,
            RemovedDays: currentLocation ? self.getAllRemovedWeekends() : []
          },
          WeekDayStartTime: (this.view.timePicker.getTime().Hours === null) ? "" : this.getFormattedLocationsTime(this.view.timePicker.getTime(), "24"),
          WeekDayEndTime:(this.view.timePicker1.getTime().Hours === null) ? "" : this.getFormattedLocationsTime(this.view.timePicker1.getTime(), "24"),
          WeekEndStartTime: (this.view.timePicker2.getTime().Hours === null) ? "" : this.getFormattedLocationsTime(this.view.timePicker2.getTime(), "24"),
          WeekEndEndTime: (this.view.timePicker3.getTime().Hours === null) ? "" : this.getFormattedLocationsTime(this.view.timePicker3.getTime(), "24")
        }
      };
      var addCallBack = function(resStatus) {
        if (resStatus === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success")) {
          self.showListingScreen();
          var getLocation = {"$top":20,
                             "$skip":0};
          self.presenter.fetchAllLocationDetails(getLocation);
          self.hideLoadingScreen();
          self.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmLocationsController.Location_added_successfully"), self);
          self.resetEditScreen();
        } else {
          self.hideLoadingScreen();
          self.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.frmLocationsController.Failed_to_add_location"), self);
        }
        self.currentLocation = {};
        self.view.forceLayout();
      };
      var editCallBack = function(resStatus) {
        if (resStatus === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success")) {
          self.showListingScreen();
          self.hideLoadingScreen();
          self.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmLocationsController.Location_edited_successfully"), self);
          self.resetEditScreen();
        } else {
          self.hideLoadingScreen();
          self.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.frmLocationsController.Failed_to_edit_location"), self);
        }
        self.currentLocation = {};
        self.view.forceLayout();
      };
      if (currentLocation) {
        if(this.view.switchWeekendSchedule.selectedIndex===1){
          param.Schedule_Details.WeekendWorkingDays.AddedDays = [];
          param.Schedule_Details.WeekendWorkingDays.RemovedDays = [];
          if(this.view.imgSaturdayCheckBox.src === "checkboxselected.png" || currentLocation.Saturday_StartTime)
            param.Schedule_Details.WeekendWorkingDays.RemovedDays.push("SATURDAY");
          if(this.view.imgSundayCheckBox.src === "checkboxselected.png" || currentLocation.Sunday_StartTime)
            param.Schedule_Details.WeekendWorkingDays.RemovedDays.push("SUNDAY");
        }
        this.presenter.editLocationDetails(param, editCallBack);
        this.view.addAndRemoveOptions.segSelectedOptions.removeAll();
      } else {
        if(this.view.switchWeekendSchedule.selectedIndex===1){
          param.Schedule_Details.WeekendWorkingDays.AddedDays = [];
          param.Schedule_Details.WeekendWorkingDays.RemovedDays = [];
        }
        this.presenter.addNewLocation(param, addCallBack);
        this.view.addAndRemoveOptions.segSelectedOptions.removeAll();
      }
    }
  },
  willUpdateUI: function(context) {
    if (!context) return;
    this.updateLeftMenu(context);
    var self = this;
    if (context.action === "showImportLocationsFlex") {
      this.showImportLocationsFlex();
    } else if (context.action === "showImportLocationsResponseCount") {
      this.uploadingIndicatorCallBack();
      this.showCountInToastMessage(context.locationsResponse);
    } else if (context.action === "showDowntime") {
      this.showDowntimeToastMessage(kony.i18n.getLocalizedString("i18n.frmLocationsController.Error_while_processing"));
    } else if (context.globalAddress) {
      this.setAddressFromGlobal(context.globalAddress);
    } else if (context.action === "locationsList") {
      this.clearLocationDefaults();
      self.preShowLocations();
      self.locationsJSON = context.locations.data;
      this.sortBy = this.getObjectSorter("lblBranchName");
      this.resetSortImages();
      this.setDataForStatusFilter();
      this.setDataForTypeFilter();
      this.updatePaginationParam(context.locations);
      this.view.mainHeader.btnDropdownList.info = undefined;
      this.loadPageData = function() {
        var searchResult = this.filterArrayCustom(context.locations.data);
        self.records = context.locations.data.length;
        self.allRecords = context.locations.data;
      };
      this.loadPageData();
      this.locationServicesSortBy = this.getObjectSorter("lblFacilityName");
    }else if (context.action === "searchLocations"){
       
      
      self.locationsJSON = context.locations.data;
      self.showLocationsUI(context.locations.data);
      
      
    }else if(context.action === "showLoadingScreen"){
      kony.adminConsole.utils.showProgressBar(this.view);
    }else if(context.action === "fileId"){
      this.downloadCSVList(context.fileId);
    }else if(context.action === "hideLoadingScreen"){
      kony.adminConsole.utils.hideProgressBar(this.view);
    } else if(context.action === "error") {
      this.view.toastMessage.showErrorToastMessage(context.message, this);
    } else if(context.action === "importTimeout"){
      this.showImportProcessPopup();
    } else if( context.action === "importStatusCheck"){
      if(context.status === "success"){
        this.checkLocationsImportProgress(context.response);
      } else{
        this.showDowntimeToastMessage(context.response);
      }
    }
    this.view.forceLayout();
  },
  filterArrayCustom: function(array) {
        var i = 0;
        var resArr = [];
        var self = this;
        function myFunction() {
            var searchText = self.view.subHeader.tbxSearchBox.text;
          searchText = searchText.replace("<","&lt").replace(">","&gt").replace("=","&eq").replace("alert","").replace("marque","").replace("<","&lt").replace(">","&gt");
            if (typeof searchText === "string" && searchText.length > 0) {
                if (array[i].DisplayName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
                    resArr.push(array[i]);
                }
            }else{
				kony.adminConsole.utils.hideProgressBar(self.view);
				self.records = array.length;
				self.showLocationsUI(array);
				return array;
			}
            i++;
            if (i < array.length) {
				
                setTimeout(myFunction, 0);
            } else {
				kony.adminConsole.utils.hideProgressBar(self.view);
				self.records = resArr.length;
				self.showLocationsUI(resArr);
                return resArr;
            }
        }
        setTimeout(myFunction, 0);
    },
  showImportLocationsFlex: function() {
    this.view.flxScrollMainContent.setVisibility(false);
    this.view.flxImportDetails.setVisibility(true);
    this.view.forceLayout();
  },

  showCountInToastMessage: function(response) {
    kony.print("Inside showCountInToastMessage()");
    var self = this;

    self.locationsJSON = response.getLocationsResponse;

    this.sortBy = this.getObjectSorter("DisplayName");
    this.loadPageData = function() {
      var searchResult = response.getLocationsResponse.filter(self.searchFilter).sort(this.sortBy.sortData);
      self.showLocationsUI(searchResult);
    };
    this.loadPageData();

    if (response.importLocationsResponse.correctTemplate === true) {
      var successCount = response.importLocationsResponse.successCount;
      var failureCount = response.importLocationsResponse.failureCount;
      kony.print("successCount: " + successCount);
      kony.print("failureCount: " + failureCount);

      this.view.flxLoading.setVisibility(false);

      if (parseInt(failureCount, 10) > 0) {
        self.downloadFileId = response.importLocationsResponse.locationFileName;
        this.view.toastMessageWithLink.lblToastMessageLeft.text = successCount + "/" + (successCount + failureCount) + kony.i18n.getLocalizedString("i18n.frmLocationsController.records_uploaded");
        this.view.toastMessageWithLink.lblToastMessageRight.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.to_download_the_details");
        this.showToastMessageWithLink();
      } else {
        this.view.toastMessage.showToastMessage(successCount + kony.i18n.getLocalizedString("i18n.frmLocationsController.location_records_added"), this);
      }

      this.view.forceLayout();
    } else if(response.importLocationsResponse.correctTemplate === false) {
      self.showDowntimeToastMessage(kony.i18n.getLocalizedString("i18n.frmLocationsController.Incorrect_template"));
    } else{
      var errMessage= response.importLocationsResponse ? response.importLocationsResponse.dbpErrMsg : kony.i18n.getLocalizedString("i18n.frmLocations.ErrorImportingLocations"); 
      self.showDowntimeToastMessage(errMessage);
    }
  },

  showDowntimeToastMessage: function(errorMessage) {
    this.view.toastMessage.showErrorToastMessage(errorMessage, this);
    this.view.forceLayout();
  },

  setLocationDetails: function(locationDetails) {
    this.view.lblSpecialBranch.text = locationDetails.Location_Name;
    //row 0
    this.view.lblViewValue.text = locationDetails.Location_Status_id === "SID_ACTIVE" ? kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
    this.view.lblViewValue.skin = locationDetails.Location_Status_id === "SID_ACTIVE" ? "sknlblLato5bc06cBold14px" : "sknlblLatocacacaBold12px";
    this.view.lblViewKey.text = "\ue921";
    this.view.lblViewKey.skin = locationDetails.Location_Status_id === "SID_ACTIVE" ? "sknFontIconActivate" : "sknfontIconInactive";
    //row 1
    this.view.detailsRow1.lblData1.text = locationDetails.Location_Name || "-NA-";
    this.view.detailsRow1.lblData2.text = locationDetails.Location_Display_Name || "-NA-";
    this.view.detailsRow1.lblData3.text = locationDetails.Location_Code || "-NA-";

    //row 2
    this.view.detailsRow2.lblData1.text = locationDetails.Location_Type_id || "-NA-";
    this.view.detailsRow2.lblData2.text = locationDetails.Location_IsMainBranch === "true" ? kony.i18n.getLocalizedString("i18n.frmServiceManagementController.Yes") : "No";
    this.view.detailsRow2.lblData2.skin = locationDetails.Location_IsMainBranch === "true" ? "sknlblLato5bc06cBold14px" : "sknlblLatocacacaBold12px";
    this.view.detailsRow2.lblIconData2.text = "\ue921";
    this.view.detailsRow2.lblIconData2.skin = locationDetails.Location_IsMainBranch === "true" ? "sknFontIconActivate" : "sknfontIconInactive";
    this.view.detailsRow2.lblData3.text = locationDetails.Location_DeleteFlag === "true" ? "No" : kony.i18n.getLocalizedString("i18n.frmServiceManagementController.Yes");
    this.view.detailsRow2.lblData3.skin = locationDetails.Location_DeleteFlag === "true" ? "sknlblLatocacacaBold12px" : "sknlblLato5bc06cBold14px";
    this.view.detailsRow2.lblIconData3.text = "\ue921";
    this.view.detailsRow2.lblIconData3.skin = locationDetails.Location_DeleteFlag === "true" ? "sknfontIconInactive" : "sknFontIconActivate";
    //row3
    this.view.detailsMultiLine.rtxData1.text = locationDetails.ADDRESS.replace("<","&lt").replace(">","&gt").replace("=","&eq").replace("alert","").replace("marque","").replace("<","&lt").replace(">","&gt") || "-NA-";
    this.view.detailsMultiLine.rtxData2.text = locationDetails.Location_EmailId || "-NA-";
    var Longitude = locationDetails.Location_Longitude || "-NA-";
    var Latitude = locationDetails.Location_Latitude || "-NA-";
    this.view.detailsMultiLine.rtxData3.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Longitude") + Longitude + "<br><br>" + "Latitude: " + Latitude;
    this.view.Description.rtxDescription.text = locationDetails.Location_Description || "-NA-";

    var Weekday_StartTime = locationDetails.Weekday_StartTime || "";
    var Weekday_EndTime = locationDetails.Weekday_EndTime || "";
    var Weekend_StartTime = locationDetails.Saturday_StartTime || locationDetails.Sunday_StartTime || "";
    var Weekend_EndTime = locationDetails.Sunday_EndTime || locationDetails.Saturday_EndTime || "";
    var weekendHeading = kony.i18n.getLocalizedString("i18n.frmLocationsController.SATURDAY_SUNDAY");

    if (!locationDetails.Saturday_StartTime && locationDetails.Sunday_StartTime) {
      weekendHeading = kony.i18n.getLocalizedString("i18n.frmLocationsController.SUNDAY");
    } else if (!locationDetails.Sunday_StartTime && locationDetails.Saturday_StartTime) {
      weekendHeading = kony.i18n.getLocalizedString("i18n.View.SATURDAY");
    }
    var weekTimeRange = this.timeValidationString(Weekday_StartTime) + " - " + this.timeValidationString(Weekday_EndTime);
    var weekEndTimeRange = this.timeValidationString(Weekend_StartTime) + " - " + this.timeValidationString(Weekend_EndTime);
    this.view.operationDetails.lblData1.text = (weekTimeRange.length > 3) ? weekTimeRange : "-NA-";
    this.view.operationDetails.lblData2.text = (weekEndTimeRange.length > 3) ? weekEndTimeRange : "-NA-";
    this.view.operationDetails.lblHeading2.text = weekendHeading;


    var dataset = locationDetails.facilities.map(function(facility) {
      return {
        lblDescription: facility.Facility_Description,
        lblFacilityName: facility.Facility_Name,
        lblSeperator:{"isVisible":true,"text":"-"}
      };
    });
    if (locationDetails.facilities && locationDetails.facilities.length !== 0) {
      dataset[0].lblSeperator.isVisible = false;
      this.view.segViewServiceSegment.setData(dataset);
      this.view.forceLayout();
      this.view.flxSortLocationServices.onClick();
      this.view.rtxMsgServices.setVisibility(false);
      this.view.flxServicesHeader.setVisibility(true);
      this.view.segViewServiceSegment.setVisibility(true);
    } else {
      this.view.rtxMsgServices.setVisibility(true);
      this.view.flxServicesHeader.setVisibility(false);
      this.view.segViewServiceSegment.setVisibility(false);
    }
    this.view.forceLayout();
  },

  setAddressFromGlobal: function(globalAddress) {
    var self = this;

    if (globalAddress.regions) {
      self.view.lstbxStateUser.masterData = globalAddress.regions.filter(function(region) {
        return region.Country_id === globalAddress.addressCode;
      }).reduce(function(list, region) {
        return list.concat([[region.id, region.Name]]);
      }, [[kony.i18n.getLocalizedString("i18n.frmLogsController.Select"), kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Select_a_State")]]);
    } 

    this.view.forceLayout();
  },

  clearErrors: function() {
    this.view.flxNoCodeError.isVisible = false;
    this.view.flxNoNameError.isVisible = false;
    this.view.flxNoDisplayNameError.isVisible = false;
    this.view.flxNoEmailError.isVisible = false;
    this.view.flxNoDescriptionError.isVisible = false;
    this.view.flxNoAddressError.isVisible = false;
    this.view.flxNoCityError.isVisible = false;
    this.view.flxNoStateError.isVisible = false;
    this.view.flxNoCountryError.isVisible = false;
    this.view.flxNoZipCodeError.isVisible = false;
    this.view.flxNoPhnNumberError.isVisible = false;
    this.view.flxNoLatitudeError.isVisible = false;
    this.view.flxNoLongitudeError.isVisible = false;
  },
  compareCode: function(enteredValue) {
    return this.allRecords.some(function(loc) {
      return loc.Code === enteredValue;
    });
  },
  locationFieldValidations: function(currentLocation) {
    var fieldsCorrect = true;
    var self = this;
    if (this.view.txtbxCode.text.trim() === "") {
      this.view.lblNoCodeError.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Enter_Code");
      this.view.flxNoCodeError.isVisible = true;
      this.view.txtbxCode.skin = "skinredbg";
      fieldsCorrect = false;
    } else if(parseInt(this.view.txtbxCode.text) < 0){
      this.view.lblNoCodeError.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Code_cannot_be_negative");
      this.view.flxNoCodeError.isVisible = true;
      this.view.txtbxCode.skin = "skinredbg";
      fieldsCorrect = false;
    }  else if (/^(\d{1,10})$/.test(this.view.txtbxCode.text) === false){
      this.view.lblNoCodeError.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Code_cannot_exceed_digits");
      this.view.flxNoCodeError.isVisible = true;
      this.view.txtbxCode.skin = "skinredbg";
      fieldsCorrect = false;
    }  else if (this.view.txtbxCode.text.trim().length > 0 && !currentLocation) {
      var existence = self.compareCode(this.view.txtbxCode.text.trim());
      if (existence) {
        this.view.lblNoCodeError.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Code_Already_Exists");
        this.view.flxNoCodeError.isVisible = true;
        this.view.txtbxCode.skin = "skinredbg";
        fieldsCorrect = false;
      }
    }

    if (this.view.txtbxName.text.trim() === "") {
      this.view.lblNoNameError.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Enter_Name");
      this.view.flxNoNameError.isVisible = true;
      this.view.txtbxName.skin = "skinredbg";
      fieldsCorrect = false;
    } else if (/^([a-zA-Z0-9 ]+)$/.test(this.view.txtbxName.text.trim()) === false) {
      this.view.lblNoNameError.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Enter_Correct_Name");
      this.view.flxNoNameError.isVisible = true;
      this.view.txtbxName.skin = "skinredbg";
      fieldsCorrect = false;
    } else if (this.view.txtbxName.text.trim().length > 100) {
      this.view.lblNoNameError.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Location_Name_Max_Limit");
      this.view.flxNoNameError.isVisible = true;
      this.view.txtbxName.skin = "skinredbg";
      fieldsCorrect = false;
    }

    if (this.view.txtbxDisplayName.text.trim() === "") {
      this.view.lblNoDisplayNameError.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Enter_Display_Name");
      this.view.flxNoDisplayNameError.isVisible = true;
      this.view.txtbxDisplayName.skin = "skinredbg";
      fieldsCorrect = false;
    } else if (/^([a-zA-Z0-9 ]+)$/.test(this.view.txtbxDisplayName.text.trim()) === false) {
      this.view.lblNoDisplayNameError.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Enter_Correct_Display_Name");
      this.view.flxNoDisplayNameError.isVisible = true;
      this.view.txtbxDisplayName.skin = "skinredbg";
      fieldsCorrect = false;
    } else if (this.view.txtbxDisplayName.text.trim().length > 100) {
      this.view.lblNoDisplayNameError.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Display_Name_Max_Limit");
      this.view.flxNoDisplayNameError.isVisible = true;
      this.view.txtbxDisplayName.skin = "skinredbg";
      fieldsCorrect = false;
    }

    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.view.txtbxEmailIDUser.text.trim() === "") {
      this.view.lblNoEmailError.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Enter_a_Email-id");
      this.view.flxNoEmailError.isVisible = true;
      this.view.txtbxEmailIDUser.skin = "skinredbg";
      fieldsCorrect = false;
    } else if (emailRegex.test(this.view.txtbxEmailIDUser.text.trim()) === false) {
      this.view.lblNoEmailError.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Enter_a_valid_Email-id");
      this.view.flxNoEmailError.isVisible = true;
      this.view.txtbxEmailIDUser.skin = "skinredbg";
      fieldsCorrect = false;
    }

    if (this.view.TxtAreaDescription.text.trim() === "") {
      this.view.flxNoDescriptionError.isVisible = true;
      this.view.TxtAreaDescription.skin = "skinredbg";
      fieldsCorrect = false;
    }else if (/^([a-zA-Z0-9 ]+)$/.test(this.view.TxtAreaDescription.text.trim()) === false) {
      this.view.lblNoDescriptionError.text="Invalid Description";
      this.view.flxNoDescriptionError.isVisible = true;
      this.view.TxtAreaDescription.skin = "skinredbg";
      fieldsCorrect = false;
    }

    if (this.view.txtbxAddressLine1User.text.trim() === "") {
      this.view.lblNoAddressError.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Enter_Address");
      this.view.flxNoAddressError.isVisible = true;
      this.view.txtbxAddressLine1User.skin = "skinredbg";
      fieldsCorrect = false;
    }

    if(this.view.switchWeekendSchedule.selectedIndex === 0){
      if(this.view.timePicker2.lstbxHours.selectedKey !== "hh" && this.view.timePicker2.lstbxMinutes.selectedKey !== "mm"){
        if(this.view.imgSaturdayCheckBox.src === "checkbox.png" && this.view.imgSundayCheckBox.src === "checkbox.png"){
          this.view.lblWeekendSchErrorMsg.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Select_a_Day");
          this.view.flxWeekendSchErrorMsg.setVisibility(true);
          fieldsCorrect = false;
        }
      }
    }
    if(this.view.switchWeekendSchedule.selectedIndex === 0){
      if(this.view.timePicker3.lstbxHours.selectedKey !== "hh" && this.view.timePicker3.lstbxMinutes.selectedKey !== "mm"){
        if(this.view.imgSaturdayCheckBox.src === "checkbox.png" && this.view.imgSundayCheckBox.src === "checkbox.png"){
          this.view.lblWeekendSchErrorMsg.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Select_a_Day");
          this.view.flxWeekendSchErrorMsg.setVisibility(true);
          fieldsCorrect = false;
        }
      }
    }
    if(this.view.timePicker.getTime().Hours !== null && this.view.timePicker1.getTime().Hours !== null){
      var fromTime = this.getFormattedLocationsTime(this.view.timePicker.getTime(), "24");
      var toTime = this.getFormattedLocationsTime(this.view.timePicker1.getTime(), "24");
      var fromTimeArr = fromTime.split(":");
      var toTimeArr = toTime.split(":");
      
      if(parseInt(fromTimeArr[0]) >= parseInt(toTimeArr[0])){
        this.view.lblErrorTextWeekday.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Select_Valid_Time");
        this.view.flxErrorTextWeekday.setVisibility(true);
        fieldsCorrect = false;
      } else if(parseInt(fromTimeArr[0]) === parseInt(toTimeArr[0]) && (parseInt(fromTimeArr[1]) > parseInt(toTimeArr[1]))){
        this.view.lblErrorTextWeekday.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Select_Valid_Time");
        this.view.flxErrorTextWeekday.setVisibility(true);
        fieldsCorrect = false;
      }
    }
    if((this.view.timePicker.getTime().Error && this.view.timePicker.getTime().Error == "Either hour or minute not entered") || 
       (this.view.timePicker1.getTime().Error && this.view.timePicker1.getTime().Error == "Either hour or minute not entered")) {
      this.view.lblErrorTextWeekday.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Select_Valid_Time");
      this.view.flxErrorTextWeekday.setVisibility(true);
      fieldsCorrect = false;
    }
    if(this.view.timePicker2.getTime().Hours !== null && this.view.timePicker3.getTime().Hours !== null){
      var fromTimeWE = this.getFormattedLocationsTime(this.view.timePicker2.getTime(), "24");
      var toTimeWE = this.getFormattedLocationsTime(this.view.timePicker3.getTime(), "24");
      if(fromTimeWE >= toTimeWE){
        this.view.lblWeekendSchErrorMsg.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Select_Valid_Time");
        this.view.flxWeekendSchErrorMsg.setVisibility(true);
        fieldsCorrect = false;
      }
    }
    if((this.view.timePicker2.getTime().Error && this.view.timePicker2.getTime().Error == "Either hour or minute not entered") || 
       (this.view.timePicker3.getTime().Error && this.view.timePicker3.getTime().Error == "Either hour or minute not entered")) {
      this.view.lblWeekendSchErrorMsg.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Select_Valid_Time");
      this.view.flxWeekendSchErrorMsg.setVisibility(true);
      fieldsCorrect = false;
    }
    if (this.view.txtbxLocationCity.text.trim() === "") {
      this.view.flxNoCityError.isVisible = true;
      this.view.txtbxLocationCity.skin = "skinredbg";
      fieldsCorrect = false;
    }
    if (this.view.lstbxStateUser.selectedKeyValue[0] === kony.i18n.getLocalizedString("i18n.frmLogsController.Select")) {
      this.view.flxNoStateError.isVisible = true;
      this.view.lstbxStateUser.skin = "sknlbxError";
      fieldsCorrect = false;
    }
    if (this.view.lstbxCountryUser.selectedKeyValue[0] === kony.i18n.getLocalizedString("i18n.frmLogsController.Select")) {
      this.view.flxNoCountryError.isVisible = true;
      this.view.lstbxCountryUser.skin = "sknlbxError";
      fieldsCorrect = false;
    }

    if (/^([a-zA-Z0-9]+)$/.test(this.view.txtbxPostalCodeUser.text) === false) {
      this.view.lblNoZipCodeError.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.ErrorInvalidZipcode");
      this.view.flxNoZipCodeError.isVisible = true;
      this.view.txtbxPostalCodeUser.skin = "skinredbg";
      fieldsCorrect = false;
    }

    var phoneRegex=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (!this.view.contactNumber.txtContactNumber.text || !this.view.contactNumber.txtContactNumber.text.trim()) {
      this.view.contactNumber.flxError.isVisible = true;
      this.view.contactNumber.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmLocations.lblNoPhnNumberError");
      this.view.contactNumber.txtContactNumber.skin = "skinredbg";
      fieldsCorrect = false;
    } else if (this.view.contactNumber.txtContactNumber.text.trim().length > 15) {
      this.view.contactNumber.flxError.isVisible = true;
      this.view.contactNumber.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmLocations.lblNoPhnNumberExceedsLength");
      this.view.contactNumber.txtContactNumber.skin = "skinredbg";
      fieldsCorrect = false;
    } else if (phoneRegex.test(this.view.contactNumber.txtContactNumber.text) === false) {
      this.view.contactNumber.flxError.isVisible = true;
      this.view.contactNumber.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmLocations.lblInvalidPhnNumberError");
      this.view.contactNumber.txtContactNumber.skin = "skinredbg";
      fieldsCorrect = false;
    }

    var ISDRegex = /^\+(\d{1,3}|\d{1,3})$/;
    if((!this.view.contactNumber.txtISDCode.text) || (!this.view.contactNumber.txtISDCode.text.trim()) || 
       (this.view.contactNumber.txtISDCode.text.trim().length > 4) || (ISDRegex.test(this.view.contactNumber.txtISDCode.text) === false)) {
      this.view.contactNumber.flxError.isVisible = true;
      this.view.contactNumber.lblErrorText.text = "Enter a valid ISD code";
      this.view.contactNumber.txtISDCode.skin = "skinredbg";
      fieldsCorrect = false;
    }
    var validateInput = function(regex, textBox, errorFlx, errorLbl, errorMsgi18){
      if (regex.test(textBox.text) === false) {
        errorFlx.isVisible = true;
        errorLbl.text = kony.i18n.getLocalizedString(errorMsgi18);
        textBox.skin = "skinredbg";
        fieldsCorrect = false;
      }
    };
    validateInput(/^([0-9.-]+)$/, this.view.txtbxLatitude, this.view.flxNoLatitudeError, this.view.lblNoLatitudeError, "i18n.frmLocationsController.Enter_Latitude");
    validateInput(/^([-]?(\d+)((\.\d{1,6})?))$/,this.view.txtbxLatitude, this.view.flxNoLatitudeError, this.view.lblNoLatitudeError,"i18n.frmLocationsController.Latitude_cannot_exceed_decimals");
    validateInput(/^([0-9.-]+)$/,this.view.txtbxLongtitude,this.view.flxNoLongitudeError,this.view.lblNoLongitudeError,"i18n.frmLocationsController.Enter_Longitude");
    validateInput(/^([-]?(\d+)((\.\d{1,6})?))$/,this.view.txtbxLongtitude,this.view.flxNoLongitudeError,this.view.lblNoLongitudeError,"i18n.frmLocationsController.Longitude_cannot_exceed_decimals");
    var latitiude = parseFloat(this.view.txtbxLatitude.text);
    var longitude = parseFloat(this.view.txtbxLongtitude.text);
    var validateLongLat = function(value, check, flxError, lblError, tbxError, errorMsg){
      if(value < -check || value > check){
        flxError.isVisible = true;
        lblError.text =kony.i18n.getLocalizedString(errorMsg);
        tbxError.skin = "skinredbg";
        fieldsCorrect = false;
      }
    };
    validateLongLat(latitiude,90,this.view.flxNoLatitudeError,this.view.lblNoLatitudeError,this.view.txtbxLatitude,"i18n.frmLocationsController.Enter_Valid_Latitude");
    validateLongLat(longitude,180,this.view.flxNoLongitudeError,this.view.lblNoLongitudeError,this.view.txtbxLongtitude,"i18n.frmLocationsController.Enter_Valid_Longitude");
    return fieldsCorrect;
  },
  performEntitlementSearch : function(searchText){
    var self = this;
    var searchRes;

    var availableEnt = self.view.addAndRemoveOptions.segAddOptions.info.segDataForSearch;
    if(searchText === ""){
      if(availableEnt.length === 0){
        self.view.addAndRemoveOptions.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.No_Entitlements_Available");
        self.view.addAndRemoveOptions.rtxAvailableOptionsMessage.setVisibility(true);
      }else{
        self.view.addAndRemoveOptions.rtxAvailableOptionsMessage.setVisibility(false);
        self.setAvailableServicesSegmentData(availableEnt);
      }
    }else{
      var requiredData = function (entData) {
        return entData.lblName.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
      };
      searchRes = availableEnt.filter(requiredData);
      if(searchRes.length > 0){
        self.setAvailableServicesSegmentData(searchRes);
        self.view.addAndRemoveOptions.rtxAvailableOptionsMessage.setVisibility(false);
      }else{
        self.setAvailableServicesSegmentData([]);
        self.view.addAndRemoveOptions.rtxAvailableOptionsMessage.setVisibility(true);
        self.view.addAndRemoveOptions.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.No_results_found_with_parameters") +
          searchText + kony.i18n.getLocalizedString("i18n.frmGroupsController.Try_with_another_keyword");
      }
    }


  },
  onHoverEventCallback:function(widget, context) {
    var scopeObj = this;
    var widGetId = widget.id;
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      scopeObj.view[widGetId].setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      scopeObj.view[widGetId].setVisibility(false);
    }
  },

  setDataForTypeFilter : function(click){
    var self = this;
    var typeList = [], maxTypeText = "";
    var locationData = self.locationsJSON;
    //get the items to populate in filter segment
    if(locationData !== null){
      for(var i=0;i<locationData.length;i++){
        if(!typeList.contains(locationData[i].Type_id))
          typeList.push(locationData[i].Type_id);
      }
    }else{
      locationData = [];
    }
    //set data to filters
    var widgetMap = {
      "id":"id",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var typeData = typeList.map(function(rec){
      maxTypeText = rec.length > maxTypeText.length ? rec : maxTypeText;
      return {
        "id":rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": rec
      };
    });

    self.view.typeFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.typeFilterMenu.segStatusFilterDropdown.setData(typeData);
    self.view.typeFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,self.filterIndiciesArray.type]];
    self.view.flxTypeFilter.width = self.AdminConsoleCommonUtils.getLabelWidth(maxTypeText)+55+"px";
    if(click !== undefined && click === "filterClick") {
      self.setDataForStatusFilter();
    }
    self.view.forceLayout();
  },
  setDataForStatusFilter : function(click){
    var self = this;
    var statusList=[], maxLenText = "";
    var locationData = self.locationsJSON;
    //get the items to populate in filter segment
    if(locationData !== null){
      for(var i=0;i<locationData.length;i++){
        if(!statusList.contains(locationData[i].Status_id))
          statusList.push(locationData[i].Status_id);
      }
    }else{
      locationData = [];
    }
    var widgetMap = {
      "id":"id",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var statusData = statusList.map(function(rec){  
      var mapJson = {
        "id":rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": (rec === "SID_ACTIVE")? kony.i18n.getLocalizedString("i18n.secureimage.Active"):kony.i18n.getLocalizedString("i18n.secureimage.Inactive")
      };
      maxLenText = mapJson['lblDescription'].length > maxLenText.length ? mapJson['lblDescription'] : maxLenText;
      return mapJson;
    });
    self.view.statusFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.statusFilterMenu.segStatusFilterDropdown.setData(statusData);
    self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,self.filterIndiciesArray.status]];
    self.view.flxStatusFilter.width = self.AdminConsoleCommonUtils.getLabelWidth(maxLenText)+55+"px";
    if(click !== undefined && click === "filterClick") {
      self.setDataForTypeFilter();
    }
    self.view.forceLayout();
  },
  performFilterOnSegment: function (filterHeader) {
    var self = this;
    var selFilter = [[]];
    var dataToShow = [];
    var locationsData = self.allRecords;
    if(filterHeader === "type") {
      self.filterIndiciesArray.type = self.view.typeFilterMenu.segStatusFilterDropdown.selectedIndices !== null ?
        self.view.typeFilterMenu.segStatusFilterDropdown.selectedIndices[0][1] : [];

      var selectedTypes =  [];
      var types = "";
      if(self.view.typeFilterMenu.segStatusFilterDropdown.selecteditems !== null) {
        selectedTypes = self.view.typeFilterMenu.segStatusFilterDropdown.selecteditems;
        for(var t=0; t<selectedTypes.length-1; ++t) {
          types = types + selectedTypes[t].lblDescription + "_";
        }
        types = types + selectedTypes[selectedTypes.length-1].lblDescription;
        if(self.view.mainHeader.btnDropdownList.info === undefined) {
          self.view.mainHeader.btnDropdownList.info = {};
        }
        self.view.mainHeader.btnDropdownList.info.selectedTypeList = types;
      }
    } 
    else {
      self.filterIndiciesArray.status = self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices !== null ?
        self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices[0][1] : [];

      var selectedStatus =  [];
      var statuses = "";
      if(self.view.statusFilterMenu.segStatusFilterDropdown.selecteditems !== null)  {
        selectedStatus =  self.view.statusFilterMenu.segStatusFilterDropdown.selecteditems;

        for(var s=0; s<selectedStatus.length-1; ++s) {
          statuses = statuses + selectedStatus[s].lblDescription + "_";
        }
        statuses = statuses + selectedStatus[selectedStatus.length-1].lblDescription;
        if(self.view.mainHeader.btnDropdownList.info === undefined) {
          self.view.mainHeader.btnDropdownList.info = {};
        }
        self.view.mainHeader.btnDropdownList.info.selectedStatusList = statuses;
      }
    }
    var statusIndices = self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices;
    var typeIndices = self.view.typeFilterMenu.segStatusFilterDropdown.selectedIndices;
    selFilter[0][1] = [];
    selFilter[0][0] = [];
    var selStatusInd = null;
    var selTypeInd = null;
    //get selected types
    if (typeIndices !== null) {
      selTypeInd = typeIndices[0][1];
      for (var i = 0; i < selTypeInd.length; i++) {
        selFilter[0][0].push(self.view.typeFilterMenu.segStatusFilterDropdown.data[selTypeInd[i]].id);
      }
    }
    //get selected status
    if (statusIndices !== null) {
      selStatusInd = statusIndices[0][1];
      for (var j = 0; j < selStatusInd.length; j++) {
        selFilter[0][1].push(self.view.statusFilterMenu.segStatusFilterDropdown.data[selStatusInd[j]].id);
      }
    }
    if (selFilter[0][0].length === 0 || selFilter[0][1].length === 0) { //none selected-showAll
      dataToShow = [];
    } else if (selFilter[0][0].length > 0 && selFilter[0][1].length > 0) {//both filters selected
      dataToShow = locationsData.filter(function (rec) {
        if (selFilter[0][1].indexOf(rec.Status_id) >= 0 && selFilter[0][0].indexOf(rec.Type_id) >= 0) {
          return rec;
        }
      });
    } else { //single filter selected
      if (selFilter[0][0].length > 0) {
        dataToShow = locationsData.filter(function (rec) {
          if (selFilter[0][0].indexOf(rec.Type_id) >= 0) {
            return rec;
          }
        });
      }
      if (selFilter[0][1].length > 0) {
        dataToShow = locationsData.filter(function (rec) {
          if (selFilter[0][1].indexOf(rec.Status_id) >= 0) {
            return rec;
          }
        });
      }
    }
    if (dataToShow.length > 0) {
      self.view.listingSegmentClient.rtxNoResultsFound.setVisibility(false);
      self.view.listingSegmentClient.segListing.setVisibility(true);
      //self.view.listingSegmentClient.flxPagination.setVisibility(true);
      self.setLocationsSegmentData(dataToShow,true);
    }else{
      self.view.listingSegmentClient.segListing.setData([]);
      self.view.listingSegmentClient.segListing.setVisibility(false);
      self.view.listingSegmentClient.rtxNoResultsFound.setVisibility(true);
      self.view.listingSegmentClient.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
      //self.view.listingSegmentClient.flxPagination.setVisibility(false); 
    }
  },

  filterLocationData: function(locationsData) {
    var self = this;
    var selFilter = [[]];
    var dataToShow = [];
    var statusIndices = [[0,self.filterIndiciesArray.status]];
    var typeIndices = [[0,self.filterIndiciesArray.type]];
    selFilter[0][1] = [];
    selFilter[0][0] = [];
    var selStatusInd = null;
    var selTypeInd = null;
    //get selected types
    selTypeInd = typeIndices[0][1];
    for (var i = 0; i < selTypeInd.length; i++) {
      selFilter[0][0].push(self.view.typeFilterMenu.segStatusFilterDropdown.data[selTypeInd[i]].id);
    }
    //get selected status
    selStatusInd = statusIndices[0][1];
    for (var j = 0; j < selStatusInd.length; j++) {
      selFilter[0][1].push(self.view.statusFilterMenu.segStatusFilterDropdown.data[selStatusInd[j]].id);
    }
    if (selFilter[0][0].length === 0 && selFilter[0][1].length === 0) { //none selected-showAll
      dataToShow = [];
    } else if (selFilter[0][0].length > 0 && selFilter[0][1].length > 0) {//both filters selected
      dataToShow = locationsData.filter(function (rec) {
        if (selFilter[0][1].indexOf(rec.Status_id) >= 0 && selFilter[0][0].indexOf(rec.Type_id) >= 0) {
          return rec;
        }
      });
    } else { //single filter selected
      if (selFilter[0][0].length > 0) {
        dataToShow = locationsData.filter(function (rec) {
          if (selFilter[0][0].indexOf(rec.Type_id) >= 0) {
            return rec;
          }
        });
      }
      if (selFilter[0][1].length > 0) {
        dataToShow = locationsData.filter(function (rec) {
          if (selFilter[0][1].indexOf(rec.Status_id) >= 0) {
            return rec;
          }
        });
      }
    }
    return dataToShow;
  },

  downloadLocationsList : function() {
    kony.print("Inside downloadLocationsList() of frmLocationsController");
    var scopeObj = this;
    var mfURL = KNYMobileFabric.mainRef.config.reportingsvc.session.split("/services")[0];
    var downloadURL = mfURL + "/services/data/v1/LocationObjService/operations/LocationObject/downloadLocationsList";
	    var searchText = "";
    var type ="";
    var status ="";
    var paramCount = 0;
    searchText =   scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.subHeader.tbxSearchBox.text);
   
    if(searchText !== "") {
      downloadURL = downloadURL + "?searchText=" + searchText;
      paramCount = paramCount+1;
    }
    var downloadLocationsFilterJSON = scopeObj.view.mainHeader.btnDropdownList.info;

    if(downloadLocationsFilterJSON !== undefined && downloadLocationsFilterJSON.selectedTypeList !== undefined) {
      type = downloadLocationsFilterJSON.selectedTypeList;
       var typeParam = paramCount > 0 ? "&type=" : "?type=";
       downloadURL += typeParam + type;
       paramCount = paramCount + 1;
    }

    if(downloadLocationsFilterJSON !== undefined && downloadLocationsFilterJSON.selectedStatusList !== undefined) {
       status = downloadLocationsFilterJSON.selectedStatusList;
       var typeParam = paramCount > 0 ? "&status=" : "?status=";
       downloadURL += typeParam + status;
       paramCount = paramCount + 1;      
    }
   var params = {"searchText":searchText,"type":type,"status":status};
      scopeObj.callDownloadCSVService(downloadURL,"Locations");
  },

  setSupportedCurrency: function() {
    var scopeObj = this;

    var currencies = scopeObj.defaultCurrencyList;

    scopeObj.view.flxSupportedCurrencyEntries.removeAll();

    if (currencies) {
      for (var i=0; i<currencies.length; ++i) {

        var leftOffset = (i*100) + "px";

        var currencyToAdd = new com.adminConsole.location.supportedCurrency({
          "autogrowMode" : kony.flex.AUTOGROW_NONE,
          "clipBounds" : true,
          "id" : "currency" + currencies[i],
          "isVisible" : true,
          "layoutType" : kony.flex.FREE_FORM,
          "masterType" : constants.MASTER_TYPE_DEFAULT,
          "skin" : "sknflxLocationCurrency",
          "left" : leftOffset
        }, {}, {});

        currencyToAdd.imgcbSupportedCurrency.src = "checkboxnormal.png";
        currencyToAdd.lblSupportedCurrency.text = currencies[i];
        this.setOnClick(currencyToAdd);
        scopeObj.view.flxSupportedCurrencyEntries.add(currencyToAdd);
      }
    }

    this.view.forceLayout();
  },
  
  setSelectedCurrency : function(currencies){
    var self = this;
    if(currencies){
      this.selectedCurrencyList = currencies.split(",");
      this.selectedCurrencyList.forEach(function(item){
        self.view["currency" + item].imgcbSupportedCurrency.src = "checkboxselected.png"; 
      });
    }
    this.view.forceLayout();
  },
  
  setOnClick : function(currencyToAdd) {
    var scopeObj = this;

    currencyToAdd.flxcbSupportedCurrency.onClick = function() {
      if(currencyToAdd.imgcbSupportedCurrency.src == "checkboxnormal.png") {
        currencyToAdd.imgcbSupportedCurrency.src = "checkboxselected.png";
        scopeObj.selectedCurrencyList.push(currencyToAdd.lblSupportedCurrency.text);
      }
      else {
        currencyToAdd.imgcbSupportedCurrency.src = "checkboxnormal.png";
        var selectedCurrencyindex = scopeObj.selectedCurrencyList.indexOf(currencyToAdd.lblSupportedCurrency.text);
        if (selectedCurrencyindex > -1) {
          scopeObj.selectedCurrencyList.splice(selectedCurrencyindex, 1);
        }
      }
    };
  },
  
  checkLocationsImportProgress : function(data){
    var self = this;
    var response = data.locationFile;
    var datalen = Object.keys(response).length;
    self.view.mainHeader.btnAddNewOption.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
    self.view.mainHeader.btnAddNewOption.hoverSkin = "sknBtn005198LatoRegular13pxFFFFFFRad20px";
    self.view.mainHeader.btnAddNewOption.focusSkin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
    if(datalen >0){
      if(response.locationFileStatus === 0){ //in progress
        self.view.toastMessage.showWarningToastMessage(kony.i18n.getLocalizedString("i18n.frmLoactions.ImportLocationsInprogress"),this,false);
        //disable skin for import button
        self.view.mainHeader.btnAddNewOption.setEnabled(false);
        self.view.mainHeader.btnAddNewOption.skin = "sknBtnDisableBg999999LatoReg13px";
        self.view.mainHeader.btnAddNewOption.hoverSkin = "sknBtnDisableBg999999LatoReg13px";
        self.view.mainHeader.btnAddNewOption.focusSkin = "sknBtnDisableBg999999LatoReg13px";

      } else if(response.locationFileStatus === 1 && response.locationFileName){ //import failed for few
        self.view.mainHeader.btnAddNewOption.setEnabled(true);
        self.downloadFileId =response.locationFileName;
        var successCount = response.successCount;
        var failureCount = response.failureCount;
        self.view.toastMessageWithLink.lblToastMessageLeft.text =  successCount + "/" + (successCount + failureCount) +""+ kony.i18n.getLocalizedString("i18n.frmLocationsController.records_uploaded");
        self.view.toastMessageWithLink.lblToastMessageRight.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.to_download_the_details");
        self.showToastMessageWithLink();

      } else if(response.locationFileStatus === 1) { //import success
        self.view.mainHeader.btnAddNewOption.setEnabled(true);
        self.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmLocations.ImportLocationsCompleted"),this);
      }
    }
    else{
      self.view.mainHeader.btnAddNewOption.setEnabled(true);
    }
    self.view.forceLayout();
  },
  /*
   * fetch more records when scroll reaches to bottom/top
   */
  getLocationsOnReachingend: function (context) {
    var self = this;
    var segmentWidget;
    var searchParam = {"$top":self.segmentRecordSize,
                       "$skip":0};
    if(self.view.subHeader.tbxSearchBox.text===""){
    segmentWidget = self.view.listingSegmentClient.segListing;
    if ((Math.ceil(context.currentTarget.offsetHeight) + Math.ceil(context.currentTarget.scrollTop) === Math.ceil(context.currentTarget.scrollHeight))) {
      if (self.getMoreDataModel.isLastPage === "false") {
        self.currentPage = self.currentPage + 1;
        searchParam["$skip"] = (self.currentPage-1) * (self.segmentRecordSize/2) ;
        searchParam["$top"] =self.segmentRecordSize;

        self.presenter.fetchAllLocationDetails(searchParam);
      }
    } else if (Math.ceil(context.currentTarget.scrollTop) === 0) {
      if (self.currentPage > 1) {
        self.currentPage = self.currentPage - 1;
        searchParam["$skip"] = (self.currentPage-1) * (self.segmentRecordSize/2);
        searchParam["$top"] = self.segmentRecordSize;
        self.presenter.fetchAllLocationDetails(searchParam);
      }
    }
    self.contextualMenuOff();
    }
  },
  updatePaginationParam : function(response){
    var self =this;
    if (self.currentPage === 1) {
      self.view.flxLocationsSegment.setContentOffset({x: 0, y: 3 +"px"});
    } else {
      self.view.flxLocationsSegment.setContentOffset({x: 0, y: (self.segmentRecordSize * 15) +"px"});
    }
    self.getMoreDataModel = {
      "recordSize": self.segmentRecordSize,
      "isLastPage":response.isLastPage
    };
    self.view.forceLayout();
  }

});