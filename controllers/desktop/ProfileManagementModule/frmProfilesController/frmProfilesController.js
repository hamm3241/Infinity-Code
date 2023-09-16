define({ 

  //Type your controller code here 
  profileId: null,
  profilesData: [],
  allPossibleFilterData: [],
  statusfilterIndices: [],
  allDatasets: [],
  currentProfileData: [],

  willUpdateUI: function(context) {
    if(context){
      this.updateLeftMenu(context);
      if (context.LoadingScreen) {
        if (context.LoadingScreen.focus)
          kony.adminConsole.utils.showProgressBar(this.view);
        else
          kony.adminConsole.utils.hideProgressBar(this.view);
      }
      if (context.toastModel) {
        if (context.toastModel.status === "SUCCESS") {
          this.view.toastMessage.showToastMessage(context.toastModel.message, this);
          kony.adminConsole.utils.hideProgressBar(this.view);
        } else {
          this.view.toastMessage.showErrorToastMessage(context.toastModel.message, this);
          kony.adminConsole.utils.hideProgressBar(this.view);
        }
      }
      if(context.profiles){
        this.showProfiles(context.profiles);
      }
      else if(context.usercountSuccess){
        this.view.lblUsersAvailable.text = context.usercount;
      }
    }
    this.view.forceLayout();
  },

  profilesPreShow: function(){
    this.view.mainHeader.btnDropdownList.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
    this.view.mainHeader.btnDropdownList.hoverSkin = "sknBtn005198LatoRegular13pxFFFFFFRad20px";
    this.view.flxListing.setVisibility(true);
    this.view.flxViewDetails.setVisibility(false);
    this.view.segProfiles.setData([]);
    this.setFlowActions();
    this.presenter.fetchModelAttributes();
  },

  setFlowActions: function() {
    var scopeObj = this;

    this.view.mainHeader.btnDropdownList.onClick = function(){ 
      scopeObj.presenter.showCreateProfile();
    };

    this.view.breadcrumbs.btnBackToMain.onClick = function(){ 
      scopeObj.presenter.getProfiles();
    };

    this.view.subHeader.tbxSearchBox.onTouchStart = function(){
      scopeObj.view.subHeader.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
    };

    this.view.subHeader.tbxSearchBox.onEndEditing = function(){
      scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100"; 
      scopeObj.view.forceLayout();
    }; 

    this.view.subHeader.tbxSearchBox.onKeyUp = function() {
      scopeObj.searchProfiles(scopeObj.view.subHeader.tbxSearchBox.text);
    };

    this.view.subHeader.flxClearSearchImage.onClick=function(){
      scopeObj.searchProfiles("");
    };

    this.view.flxProfilesNameHeader.onClick = function(){
      scopeObj.sortProfileList("lblName.text");
    };

    this.view.flxUsersHeader.onClick = function(){
      scopeObj.sortProfileList("lblUsers.text");
    };

    this.view.flxCampaignsHeader.onClick = function(){
      scopeObj.sortProfileList("lblCampaigns.text");
    };

    this.view.flxProfilesStatusHeader.onClick = function() {
      scopeObj.showStatusFilterMenu();
    };

    this.view.statusFilterMenu.segStatusFilterDropdown.onRowClick = function() {
      var index = scopeObj.view.statusFilterMenu.segStatusFilterDropdown.selectedRowIndex[1];
      scopeObj.showFilterdProfilesList(index);
    };

    this.view.flxOptions.onClick = function() {
      scopeObj.showProfileOptions("viewDetails");
    };

    this.view.selectOptions.flxOption1.onClick = function() {
      scopeObj.showEditProfile(true);
    };

    this.view.selectOptions.flxOption2.onClick = function() {
      if(scopeObj.view.selectOptions.lblOption2.text === kony.i18n.getLocalizedString("i18n.common.activate"))
        scopeObj.updateProfile(false);
      else
        scopeObj.showPopup("deactivate");
    };

    this.view.selectOptions.flxOption3.onClick = function() {
      scopeObj.showPopup("delete");
    };

    this.view.selectOptions.flxOption4.onClick = function() {
      scopeObj.showEditProfile(false);
    };

    this.view.warningpopup.btnPopUpCancel.onClick = function() {
      scopeObj.view.flxPopup.setVisibility(false);
    };

    this.view.warningpopup.flxPopUpClose.onClick = function() {
      scopeObj.view.flxPopup.setVisibility(false);
    };

    this.view.warningpopup.btnPopUpDelete.onClick = function() {
      if(scopeObj.view.warningpopup.lblPopUpMainMessage.text ===  kony.i18n.getLocalizedString("i18n.ProfileManagement.popupHeaderDeleteSegment"))
        scopeObj.updateProfile(true);
      else if(scopeObj.view.warningpopup.lblPopUpMainMessage.text ===  kony.i18n.getLocalizedString("i18n.ProfileManagement.popupHeaderDeactivatingSegment"))
        scopeObj.updateProfile(false);
    };

    this.view.segProfiles.onRowClick = function(){ 
      scopeObj.showProfileDetails(scopeObj.view.segProfiles.selectedRowItems[0]);
    };

    this.view.flxTab1.onClick = function(){ 
      scopeObj.showAttributes();
    };

    this.view.flxTab2.onClick = function(){ 
      scopeObj.showCampaigns();
    };

    this.view.lblFilterDataset.onClick = function(){
      var isVisible = scopeObj.view.flxDatasetFilter.isVisible;
      scopeObj.view.flxDatasetFilter.setVisibility(!isVisible);
    };

    this.view.flxAttributeNameHeader.onClick = function(){
      scopeObj.sortAttributeList("lblAttribute");
    };
    
    this.view.flxUsersRefresh.onClick = function(){
      scopeObj.getAndUpdateUsersForSegment();
    };
    
    this.view.subHeader.tbxSearchBox.onDone = function() {
      kony.print("Function written to avoid opening a new Window in Browser");
    };

    this.view.forceLayout();
  },
  
  getAndUpdateUsersForSegment: function(){
    var payload = {
      "segment": {
        "profileId": this.currentProfileData.profileId,
        "profileConditions": this.currentProfileData.profileConditions
      }
    };
    this.presenter.getAndUpdateUsersForSegment(payload);
  },

  editProfile: function(){
    var payload = {};
    this.presenter.editProfile(payload);
  },

  showProfiles: function(profiles){
    this.resetProfileListPage();
    var segData = profiles.map(this.mappingProfilesdata);
    this.setProfilesSegmentData(segData);
    this.profilesData = this.view.segProfiles.data;
    this.sortBy = this.getObjectSorter("lblUsers.text");
    this.resetSortFontIcons();
    this.view.fontIconSortUsers.text = "\ue92b";
    this.view.fontIconSortUsers.skin = "sknIcon15px";
    this.setStatusFilterMenu();
    kony.adminConsole.utils.hideProgressBar(this.view);
  },

  resetProfileListPage: function(){
    this.view.flxListing.setVisibility(true);
    this.view.flxViewDetails.setVisibility(false);
    this.view.flxBreadCrumbs.setVisibility(false);
    this.view.mainHeader.btnDropdownList.setVisibility(true);
    this.view.subHeader.tbxSearchBox.text="";
    this.view.subHeader.flxClearSearchImage.setVisibility(false);
    this.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100"; 
    this.view.flxSelectOptions.setVisibility(false);
    this.view.flxPopup.setVisibility(false);
    this.view.forceLayout();
  },

  mappingProfilesdata: function(data){
    var self = this;
    var segName = this.AdminConsoleCommonUtils.getEncodedTextInput(data.profileName,true);
    return {
      id: data.profileId,
      startDate: data.profileCreationDate,
      endDate: data.profileDeactivatedDate,
      description: data.profileDescription,
      lblName: {
        text: this.AdminConsoleCommonUtils.getTruncatedString(segName, 43, 40),
        tooltip :segName
      },
      lblUsers:	{
        text: data.numberOfUsers || "N/A"
      },
      lblCampaigns:	{
        text: data.numberOfCampaigns || "N/A"
      },
      lblStatus: {
        text: data.profileStatus === "Active"? "Active" : "Inactive"
      },
      fontIconStatus: {
        text:  "\ue921",
        skin: data.profileStatus === "Active"? "sknFontIconActivate" : "sknfontIconInactive"
      },
      flxOptions:{
        onClick: self.showProfileOptions
      },
      lblOptions: {
        text : "",
      },
      lblSeparator: {
        text : ".",
        skin : "sknlblSeperatorD7D9E0"
      },
    };
  },

  setProfilesSegmentData: function(data){
    var self = this;
    if(data.length === 0){
      self.showNoResultsFound(kony.i18n.getLocalizedString("i18n.frmLogs.rtxNorecords"));
    }
    else{
      self.view.flxNoResultFound.setVisibility(false);
      self.view.flxSegProfiles.setVisibility(true);
      self.view.segProfiles.setData(data);
    }
    self.view.forceLayout();
  },

  showNoResultsFound: function(text){
    var self = this;
    self.view.flxNoResultFound.setVisibility(true);
    self.view.flxSegProfiles.setVisibility(false);
    self.view.rtxSearchMesg.text=text;
    self.view.forceLayout();
  },

  showProfileOptions: function(type){
    var self = this;
    var top = 0;
    var left = 0;
    if(type==="viewDetails"){
      //showing contextual menu for View details page
      self.setProfileOptions(this.view.lblStatus.text); 
      top = "164px";
      left = 35 + 13 + this.view.flxOptions.frame.x - 143 + "px";
      self.view.selectOptions.flxSelectOptionsInner.top = "-1px";
      self.view.selectOptions.flxArrowImage.setVisibility(true);
      self.view.selectOptions.flxDownArrowImage.setVisibility(false);
    }
    else {
      //showing contextual menu in segment of listing page 
      var index = self.view.segProfiles.selectedRowIndex[1];
      var templateArray = self.view.segProfiles.clonedTemplates;
      self.setProfileOptions(templateArray[index].flxStatus.lblStatus.text);
      var contextualWidgetHeight = 117;
      for (var i = 0; i < index; i++) {
        top += templateArray[i].flxProfiles.frame.height;
      }
      self.view.selectOptions.flxArrowImage.setVisibility(true);
      self.view.selectOptions.flxDownArrowImage.setVisibility(false);
      self.view.selectOptions.flxSelectOptionsInner.top = "-1px";
      var segmentWidget = this.view.segProfiles;
      top = top + 55 - segmentWidget.contentOffsetMeasured.y;
      if (top + contextualWidgetHeight > segmentWidget.frame.height) {
        top = top - contextualWidgetHeight - 25;
        self.view.selectOptions.flxArrowImage.setVisibility(false);
        self.view.selectOptions.flxDownArrowImage.setVisibility(true);
        self.view.selectOptions.flxSelectOptionsInner.top = "0px";
      }
      top = top + 216 + "px";
      left = 35 + 13 + templateArray[index].flxOptions.frame.x - 143 + "px";
    }
    if ((self.view.flxSelectOptions.isVisible === false) || (self.view.flxSelectOptions.isVisible === true && self.view.flxSelectOptions.top !== top)) {
      self.view.flxSelectOptions.top = top;
      self.view.flxSelectOptions.left = left;
      self.view.flxSelectOptions.setVisibility(true);
      self.view.flxSelectOptions.onHover = self.onHoverEventCallbackStatus;
    }
    else {
      self.view.flxSelectOptions.setVisibility(false);
    }
    self.view.forceLayout();
  },

  setProfileOptions: function(option){
    if(option === "Active") {
      this.view.selectOptions.fontIconOption2.text = "\ue96e";
      this.view.selectOptions.lblOption2.text = kony.i18n.getLocalizedString("i18n.common.deactivate");
      this.view.selectOptions.flxOption3.setVisibility(false);
    }
    else {
      this.view.selectOptions.fontIconOption2.text = kony.i18n.getLocalizedString("i18n.frmFAQ.fonticonDeactive");
      this.view.selectOptions.lblOption2.text = kony.i18n.getLocalizedString("i18n.common.activate");
      this.view.selectOptions.flxOption3.setVisibility(true);
    }
  },

  searchProfiles: function(text) {
    var self = this;
    if (text === "") {
      self.view.subHeader.tbxSearchBox.text="";
      self.view.subHeader.flxClearSearchImage.setVisibility(false);
      self.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100"; 
    }
    else {
      self.view.subHeader.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
      self.view.subHeader.flxClearSearchImage.setVisibility(true);
    }
    var segData = this.profilesData.filter(this.searchFilter);
    // to apply filter on searched Data
    segData = this.setStatusFilterOnSearch(segData);
    if(this.sortBy){
      this.setProfilesSegmentData(segData.sort(this.sortBy.sortData));
    }
    else{
      this.setProfilesSegmentData(segData);
    }
  },

  searchFilter : function (data) {
    var searchText = this.view.subHeader.tbxSearchBox.text;
    if(typeof searchText === 'string' && searchText.length > 0){
      return data.lblName.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    }else{
      return true;
    }
  },

  setStatusFilterOnSearch: function (segData) {
    var data=[];
    for(var i=0; i<this.allPossibleFilterData.length; i++){
      if(this.statusfilterIndices[this.allPossibleFilterData[i]]){
        var x=[];
        for(var j=0; j<segData.length; j++)
          if(segData[j].lblStatus.text === this.allPossibleFilterData[i])
            x.push(segData[j]);
        data=data.concat(x);
      }
    }
    return data;
  },

  sortProfileList : function (sortColumn) {
    var self = this;
    var segData = self.view.segProfiles.data;
    self.sortBy.column(sortColumn);
    segData = segData.sort(this.sortBy.sortData);
    self.resetSortFontIcons();
    self.view.segProfiles.setData(segData);
  },

  resetSortFontIcons : function() {
    this.determineSortFontIcon(this.sortBy,'lblName.text',this.view.fontIconSortProfilesName);
    this.determineSortFontIcon(this.sortBy,'lblUsers.text',this.view.fontIconSortUsers);
    this.determineSortFontIcon(this.sortBy,'lblCampaigns.text',this.view.fontIconSortCampaigns);
  },

  setStatusFilterMenu : function() {
    this.allPossibleFilterData = ["Active","Inactive"];
    this.statusfilterIndices = [];
    for(var i=0; i<this.allPossibleFilterData.length; i++){
      this.statusfilterIndices[this.allPossibleFilterData[i]] = true;
    }
  },

  showStatusFilterMenu : function() {
    var isVisible = this.view.flxProfilesStatusFilter.isVisible;
    if(!isVisible){
      var segProfilesData = this.profilesData.filter(this.searchFilter).sort(this.sortBy.sortData);
      var segStatusFilterData = [], indices = [];
      for(var i=0, k=0; i<this.allPossibleFilterData.length; i++){
        for(var j=0; j<segProfilesData.length; j++){
          if(segProfilesData[j].lblStatus.text === this.allPossibleFilterData[i]){
            segStatusFilterData.push({
              lblDescription : this.allPossibleFilterData[i],
              imgCheckBox:{
                "src":"checkboxselected.png"
              }
            });
            if(this.statusfilterIndices[this.allPossibleFilterData[i]])
              indices.push(k++);
            else
              k++;
            break;
          }
        }   
      }
      this.view.statusFilterMenu.segStatusFilterDropdown.setData(segStatusFilterData);
      this.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0, indices]];
      this.view.flxProfilesStatusFilter.onHover = this.onHoverEventCallbackStatus;
      //StatusHeader left + StatusHeader witdth - StatusFilter width
      this.view.flxProfilesStatusFilter.left=this.view.flxProfilesStatusHeader.frame.x + 76 - 130 + "px";
    }
    this.view.flxProfilesStatusFilter.setVisibility(!isVisible);
    this.view.forceLayout();
  },

  showFilterdProfilesList : function(index) {
    var segStatusFilterData = this.view.statusFilterMenu.segStatusFilterDropdown.data;
    var segProfileData = [], x = [], indices = [];
    var currentSegProfileData = this.profilesData.filter(this.searchFilter).sort(this.sortBy.sortData);
    for(var i=0; i<segStatusFilterData.length; i++){
      x = [];
      if(index !== i && this.statusfilterIndices[segStatusFilterData[i].lblDescription]){
        for(var j=0; j<currentSegProfileData.length; j++)
          if(currentSegProfileData[j].lblStatus.text === segStatusFilterData[i].lblDescription)
            x.push(currentSegProfileData[j]);
        indices.push(i);
      }
      else if(index == i && this.statusfilterIndices[segStatusFilterData[i].lblDescription] === false){
        for(var j=0; j<currentSegProfileData.length; j++)
          if(currentSegProfileData[j].lblStatus.text === segStatusFilterData[i].lblDescription)
            x.push(currentSegProfileData[j]);
        indices.push(i);
        this.statusfilterIndices[segStatusFilterData[i].lblDescription] = true;
      }
      else
        this.statusfilterIndices[segStatusFilterData[i].lblDescription] = false;
      segProfileData = segProfileData.concat(x);
    }
    this.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0, indices]];
    this.setProfilesSegmentData(segProfileData.sort(this.sortBy.sortData));
    this.view.forceLayout();
  },

  onHoverEventCallbackStatus : function(widget, context){
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      widget.setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      widget.setVisibility(false);
    }
  },

  // View details page code starts here...

  showProfileDetails: function(data){
    let text = data.lblName.tooltip || data.lblName.text;
    this.view.breadcrumbs.lblCurrentScreen.text = text.toUpperCase().replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/&/g,"&amp;").replace(/=/g,"&eq;").replace("alert","");
    this.view.lblProfileNameSelected.text = this.AdminConsoleCommonUtils.getEncodedTextInput(text);
    this.view.lblStatus.text = data.lblStatus.text;
    this.view.fontIconStatus.text = data.fontIconStatus.text;
    this.view.fontIconStatus.skin = data.fontIconStatus.skin;
    this.view.lblDescription.text = data.description ? this.AdminConsoleCommonUtils.getEncodedTextInput(data.description).replace(/&amp;/g,"&") : "N/A";
    this.view.lblProfileStartDate.text = data.startDate? data.startDate.substr(5,2) + "/" +  data.startDate.substr(8,2) + "/" + data.startDate.substr(0,4) : "N/A";
    this.view.lblProfileLastUsed.text = data.endDate? data.endDate.substr(5,2) + "/" +  data.endDate.substr(8,2) + "/" + data.endDate.substr(0,4) : "N/A";
    this.view.lblUsersAvailable.text = data.lblUsers.text;
    this.profileId = data.id;
    this.currentProfileData = this.presenter.getProfileData(data.id);
    this.setAttributesList();
    this.setCampaignsList();
    this.resetProfileDetailsPage();
    this.showAttributes();
  },

  resetProfileDetailsPage: function(){
    this.view.flxListing.setVisibility(false);
    this.view.flxViewDetails.setVisibility(true);
    this.view.flxBreadCrumbs.setVisibility(true);
    this.view.flxNoResultFoundAttributes.setVisibility(false);
    this.view.mainHeader.btnDropdownList.setVisibility(false);
    this.view.lblSortAttributeName.text = '';
  },

  showAttributes: function(){
    this.view.lblCampaignsTab.skin = "sknlblLatoRegular485c7512px";
    this.view.lblAttributesTab.skin = "sknLblTabUtilActive";
    var data = this.currentProfileData.profileConditions;
    this.view.flxAttributesData.setVisibility(true);
    this.view.segAttributes.setVisibility(Boolean(data.length));
    this.view.flxCampaignsData.setVisibility(false);
    this.view.flxNoResultFoundAttributes.setVisibility(Boolean(!data.length));
    this.view.flxNoResultFoundAttributes.top = "101dp";
  },

  showCampaigns: function(){
    this.view.lblCampaignsTab.skin = "sknLblTabUtilActive";
    this.view.lblAttributesTab.skin = "sknlblLatoRegular485c7512px";
    var data = this.currentProfileData.associatedCampaignDetails;
    this.view.flxAttributesData.setVisibility(false);
    this.view.flxCampaignsData.setVisibility(Boolean(data.length));
    this.view.flxNoResultFoundAttributes.setVisibility(Boolean(!data.length));
    this.view.flxNoResultFoundAttributes.top = "51dp";
  },

  setAttributesList: function(){
    var self = this;
    var attrList = [];
    let datasets = [];
    self.allDatasets = this.presenter.getModelAttributes();
    var profileConditions = this.currentProfileData.profileConditions;
    if(profileConditions.length){
      profileConditions.forEach(function(cond){
        let datasetDetails = self.allDatasets[cond.dataContextId.replace(/_/g,"")];
        if(datasetDetails) {
          let datasetName = datasetDetails.name;
          datasets.push({
            lblDescription : datasetName,
            imgCheckBox:{"src":"checkboxselected.png"}
          });
          let attributesMap = datasetDetails.attributes;
          let expressions = unescape(cond.conditionExpression).split(" and ");
          expressions.forEach(function(exp){
            let endIndex = exp.indexOf(" ");
            let attrId = exp.substring(0,endIndex);
            let attributeObj = attributesMap[attrId];
            exp = exp.replace(attrId, "").trim();
            endIndex = exp.indexOf(" ");
            let criteriaKey = exp.substring(0,endIndex);
            exp = exp.replace(criteriaKey, "").trim();
            let value = exp.substring(1,exp.length-1);
            attrList.push({
              "lblAttribute": attributeObj.name,
              "lblCriteria": kony.i18n.getLocalizedString(attributeObj.criterias[criteriaKey]) ? kony.i18n.getLocalizedString(attributeObj.criterias[criteriaKey]) : attributeObj.criterias[criteriaKey],
              "lblDataset": datasetName,
              "lblValue": attributeObj.type === "SELECT" ? (kony.i18n.getLocalizedString(attributeObj.options[value]) ? kony.i18n.getLocalizedString(attributeObj.options[value]) : attributeObj.options[value]) : value
            });
          });
        }
      });
      this.view.flxDatasetFilter.setVisibility(false);
      this.view.flxDatasetFilter.onHover = this.onHoverEventCallbackStatus;
      this.view.datasetFilter.segStatusFilterDropdown.setData(datasets);
      this.view.segAttributes.setData(attrList);
      this.view.flxNoResultFoundAttributes
    }
  },

  sortAttributeList : function (sortColumn) {
    var segData = this.view.segAttributes.data;
    this.sortBy.column(sortColumn);
    segData = segData.sort(this.sortBy.sortData);
    this.determineSortFontIcon(this.sortBy,sortColumn,this.view.lblSortAttributeName);
    this.view.segAttributes.setData(segData);
  },

  setCampaignsList: function(){
    var self = this;
    var data = this.currentProfileData.associatedCampaignDetails;
    if(data.length){
      var segData = data.map(function(campaign){
        var usercount = "IN App : " + (campaign.campaignInAppUsers || "N/A") + " \nOffline : " + (campaign.campaignOfflineUsers || "N/A");
        var status = self.getCampaignStatus(campaign.campaignStatus, campaign.startDate, campaign.endDate);
        return {
          campaignId: campaign.campaignId,
          fonticonArrow: {
            text : "\ue922",
            onClick: self.showExpandCollapseCampaign
          },
          lblName: {
            text: campaign.campaignName || "N/A"
          },
          lblStatus: {
            text: status
          },
          fontIconStatusImg: {
            text: self.getCampaignStatusIcon(status),
            skin: self.getCampaignStatusIconSkin(status)
          },
          lblStartDateTimeHeader: {
            text: kony.i18n.getLocalizedString("i18n.common.startDateCaps")
          },
          lblStartDateTime: {
            text: campaign.startDate? campaign.startDate.substr(5,2) + "/" +  campaign.startDate.substr(8,2) + "/" + campaign.startDate.substr(0,4): "N/A"
          },
          lblEndDateTimeHeader: {
            text: kony.i18n.getLocalizedString("i18n.common.endDateCaps")
          },
          lblEndDateTime: {
            text: campaign.endDate? campaign.endDate.substr(5,2) + "/" +  campaign.endDate.substr(8,2) + "/" + campaign.endDate.substr(0,4): "N/A"
          },
          lblUsersCountHeader:	{
            text: kony.i18n.getLocalizedString("i18n.ProfileManagement.reachedUsersCountCaps")
          },
          lblUsersCount: usercount,
          lblDescriptionHeader: {
            text: kony.i18n.getLocalizedString("i18n.ConfigurationBundles.descriptionInCaps")
          },
          lblDescription: {
            text: campaign.campaignDescription || "N/A"
          },
          flxExpand: {
            isVisible : false
          },
        };
      });
      this.view.segCampaignsData.setData(segData);
    }
    this.view.lblCampaignsTab.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.campaignsCaps") + " (" + data.length + ")";
    this.view.forceLayout();
  },

  getCampaignStatus: function(statusId, startDateTime, endDateTime) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var startDT = new Date(startDateTime.substring(0,10).replace(/-/g,"/"));
    startDT.setHours(0, 0, 0, 0);
    var endDT = new Date(endDateTime.substring(0,10).replace(/-/g,"/"));
    endDT.setHours(0, 0, 0, 0);
    if(statusId === "TERMINATED")
      return "Terminated";
    else if(statusId==="PAUSED") {
      if(today>endDT)
        return "Completed";
      else
        return "Paused";
    } 
    else if(today>=startDT && today<=endDT)
      return "Active";
    else if(today<startDT)
      return "Scheduled";
    else if(today>endDT)
      return "Completed";
  },

  getCampaignStatusIcon: function(status){
    if(status==="Active")
      return "\ue921";
    else if(status==="Scheduled")
      return "\ue94a";
    else if(status==="Completed")
      return "\ue904";
    else if(status === "Terminated")
      return "\ue905";
    else if(status ==="Paused")
      return "\ue91d";
  },

  getCampaignStatusIconSkin: function(status){
    if(status==="Active")
      return "sknFontIconActivate";
    else if(status==="Completed")
      return "sknFontIconCompleted";
    else if(status==="Scheduled")
      return "sknFontIconScheduled";
    else if(status === "Terminated")
      return "sknFontIconTerminate";
    else if(status ==="Paused")
      return "sknFontIconPause";
    else
      return "sknFontIconOptionMenuRow";
  },

  showExpandCollapseCampaign: function(){
    var self = this;
    var index = self.view.segCampaignsData.selectedRowIndex[1];
    var selItems = self.view.segCampaignsData.selectedItems[0];
    if(selItems.fonticonArrow.text==="\ue922"){
      selItems.fonticonArrow.text = "\ue915";
      selItems.fonticonArrow.skin = "sknfontIconDescDownArrow12px";
      selItems.flxExpand.isVisible=true;
      self.view.segCampaignsData.setDataAt(selItems, index);
    }
    else{
      selItems.fonticonArrow.text = "\ue922";
      selItems.fonticonArrow.skin = "sknfontIconDescRightArrow14px";
      selItems.flxExpand.isVisible=false;
      self.view.segCampaignsData.setDataAt(selItems, index);
    }
    self.view.forceLayout();
  },

  showEditProfile: function(isEdit){
    this.view.flxSelectOptions.setVisibility(false);
    var rowIndex = this.view.segProfiles.selectedRowIndex[1] ;
    var profileData = this.view.segProfiles.data[rowIndex];
    profileData = this.presenter.getProfileData(profileData.id);
    delete profileData["associatedCampaignDetails"];
    var payload = {
      "profileDetails": profileData,
      "isEdit": isEdit
    };
    this.presenter.showEditProfile(payload);
  },

  showPopup: function(popupType){
    if(popupType === "delete"){
      this.view.warningpopup.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.popupHeaderDeleteSegment");
      if(this.hasActiveScheduledCampaign()){
        this.view.warningpopup.flxPopUpTopColor.skin = "sknFlxBge61919";
        this.view.warningpopup.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.popupBody2DeleteSegment");
        this.view.warningpopup.btnPopUpDelete.setVisibility(false);
        this.view.warningpopup.btnPopUpCancel.text = kony.i18n.getLocalizedString("i8n.navigation.okButton");
      }
      else{
        this.view.warningpopup.flxPopUpTopColor.skin = "sknflxebb54cOp100";
        this.view.warningpopup.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.popupBodyDeleteSegment");
        this.view.warningpopup.btnPopUpDelete.setVisibility(true);
        this.view.warningpopup.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
      }
    }
    else if(popupType === "deactivate"){
      this.view.warningpopup.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.popupHeaderDeactivatingSegment");
      if(this.hasActiveScheduledCampaign()){
        this.view.warningpopup.flxPopUpTopColor.skin = "sknFlxBge61919";
        this.view.warningpopup.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.popupBodyDeactivatingSegment");
        this.view.warningpopup.btnPopUpDelete.setVisibility(false);
        this.view.warningpopup.btnPopUpCancel.text = kony.i18n.getLocalizedString("i8n.navigation.okButton");
      }
      else{
        this.view.warningpopup.flxPopUpTopColor.skin = "sknflxebb54cOp100";
        this.view.warningpopup.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.popupBody2DeactivatingSegment");
        this.view.warningpopup.btnPopUpDelete.setVisibility(true);
        this.view.warningpopup.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
      }
    }
    this.view.flxPopup.setVisibility(true);
    this.view.warningpopup.setVisibility(true);
    this.view.forceLayout();
  },
  
  hasActiveScheduledCampaign: function(){
    var self = this;
    var rowIndex = this.view.segProfiles.selectedRowIndex[1] ;
    var profileData = this.view.segProfiles.data[rowIndex];
    profileData = this.presenter.getProfileData(profileData.id);
    var campaigns = profileData.associatedCampaignDetails;
    if(campaigns.length){
      var activeScheduledStatus = campaigns.filter(function (campaign) {
        var status = self.getCampaignStatus(campaign.campaignStatus, campaign.startDate, campaign.endDate);
        if(status === "Active" || status === "Scheduled"){
          return status;
        }
      });
      if(activeScheduledStatus.length)
        return true;
      else return false;
    }
    return false;
  },

  updateProfile: function(toDelete){
    this.view.flxSelectOptions.setVisibility(false);
    this.view.flxPopup.setVisibility(false);
    var rowIndex = this.view.segProfiles.selectedRowIndex[1] ;
    var profileData = this.view.segProfiles.data[rowIndex];
    profileData = this.presenter.getProfileData(profileData.id);
    if(toDelete)
      profileData.profileStatus = "Deleted";
    else{
      profileData.profileStatus = profileData.profileStatus === "Active"? "Deactive": "Active"; 
    }
    var payload ={
      "profileId": profileData.profileId,
      "profileName": profileData.profileName,
      "profileDescription": profileData.profileDescription,
      "profileStatus": profileData.profileStatus,
      "profileConditions": profileData.profileConditions
    };
    this.presenter.updateProfile(payload);
  },

});