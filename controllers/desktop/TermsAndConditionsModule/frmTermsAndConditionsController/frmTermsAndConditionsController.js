define({ 

  //Type your controller code here 

  /**
    * Function preshow of actions
  **/
  TnCJSON: null,
  records: null,
  allRecords: null,
  editPage:0,
  termsAndConditions_id:null,
  inFilter:false,
  TnCList:[],
  allTnCList:[],
  urlRegex : /\b(https|ftp):(\/\/|\\\\)[^\s]+\b$/,
  supportedApps:[],
  checkboxselected : "checkboxselected.png",
  checkboxnormal : "checkboxnormal.png",
  checkbox :"checkbox.png",
  versionData : null,
  sAll : kony.i18n.getLocalizedString("i18n.frmAlertsManagement.All"),
  sSelected: kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Selected"),
  preShowActions :function(){
	//this.view.flxPhraseStatus.setVisibility(false);
  },
  hideHeaderButtons: function() {
    this.view.mainHeader.flxButtons.setVisibility(false);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
  },
  showHeaderButtons: function() {
    this.view.mainHeader.flxButtons.setVisibility(true);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
  },
  preShowTermsAndConditions: function(){
    this.view.flxBreadcrumb.setVisibility(false);
    this.view.flxDetailTermsAndConditions.setVisibility(false);
    this.view.flxMainSubHeader.setVisibility(true);
    this.view.mainHeader.lblUserName.text=kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.view.mainHeader.lblHeading.text =  kony.i18n.getLocalizedString("i18n.TermsAndConditions.addTnC");
    this.view.subHeader.tbxSearchBox.text = "";
    this.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100";
    this.view.subHeader.flxClearSearchImage.setVisibility(false);
    this.hideHeaderButtons();
    this.hideNoResultsFound();
    this.view.staticData.skin = "skntxtAreaLato0i538905e260549Stat"; 
    this.view.staticData.flxStaticContantData.height = kony.os.deviceInfo().screenHeight - 330 + "px";
    this.view.staticData.height = kony.os.deviceInfo().screenHeight - 330 + "px";
    this.view.flxMain.height=kony.os.deviceInfo().screenHeight+"px";
    this.view.flxDetailTermsAndConditions.height = kony.os.deviceInfo().screenHeight - 150 +"px";
    this.view.flxTermsAndConditionsList.height=kony.os.deviceInfo().screenHeight - 160 +"px";
    this.view.flxTermsAndConditionsList.setVisibility(true);
    this.view.flxDetailTermsAndConditions.setVisibility(false);
    this.view.flxNoTermsAndConditions.setVisibility(false);
	this.view.flxViewContent.setVisibility(false);
    this.view.flxContentPopUp.setVisibility(false);
    //this.view.flxPhraseStatus.setVisibility(false);
    this.setSegmentSelectionProperty();
    this.flowActions();
    this.view.forceLayout();

  },
  /*overwritting component widget level selection property
  */
  setSegmentSelectionProperty : function(){
    var selectionProp = {
      imageIdentifier: "imgCheckBox",
      selectedStateImage: "checkboxselected.png",
      unselectedStateImage: "checkboxnormal.png"
    };
    this.view.applicableAppsFilterMenu.segStatusFilterDropdown.selectionBehavior = constants.SEGUI_MULTI_SELECT_BEHAVIOR;
    this.view.applicableAppsFilterMenu.segStatusFilterDropdown.selectionBehaviorConfig = selectionProp;
    this.view.contentTypeFilter.segStatusFilterDropdown.selectionBehavior = constants.SEGUI_MULTI_SELECT_BEHAVIOR;
    this.view.contentTypeFilter.segStatusFilterDropdown.selectionBehaviorConfig = selectionProp;
    this.view.statusFilter.segStatusFilterDropdown.selectionBehavior = constants.SEGUI_MULTI_SELECT_BEHAVIOR;
    this.view.statusFilter.segStatusFilterDropdown.selectionBehaviorConfig = selectionProp;
    this.view.languages.segStatusFilterDropdown.selectionBehavior = constants.SEGUI_MULTI_SELECT_BEHAVIOR;
    this.view.languages.segStatusFilterDropdown.selectionBehaviorConfig = selectionProp;
  },
  hideAll: function(){
    this.view.flxTermsAndConditionsList.setVisibility(false);
    this.view.flxApplicableAppsFilter.setVisibility(false);
    this.view.flxDetailTermsAndConditions.setVisibility(false);
    this.view.customListboxApps.flxSegmentList.setVisibility(false);
    this.view.flxTandCPopUp.setVisibility(false);
    this.view.flxContentRichTxt.skin="sknflxffffffop100Bordercbcdd1Radius3px";
    this.view.tbxURLcontent.skin="skntxtbx484b5214px";
    this.view.tbxTitle.skin="skntxtbx484b5214px";
	this.view.flxTitleError.setVisibility(false);
	this.view.flxContentError.setVisibility(false);
    this.view.flxTitleError.setVisibility(false);
  },
  showListingScreen: function() {
    this.view.flxScrollMainContent.setVisibility(true);
    this.view.flxTandCList.setVisibility(true);
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.TermsAndConditions.addTnC");
  },
  toTnCSegment: function(tnc) {
    var self = this;
    var str = "";
    var pref = tnc.appPreferences;
    for(var i=0;i<pref.length;i++){
      if(pref[i].isSupported === "true"){
        str += pref[i].appName + ", ";
      } 
    }
    if (str.substr(str.length-2,2) == ", ") {
      str = str.substring(0,str.length-2);
    }
    return {
      "data":tnc,
      "lblTitle": tnc.title || "N/A",
      "lblCode": tnc.code || "N/A",
      "lblApplicableApps": tnc.code === "C360_CustomerOnboarding_TnC" ? kony.i18n.getLocalizedString("i18n.TermsAndConditions.customer360"): (str?str:kony.i18n.getLocalizedString("i18n.frmAlertsManagement.NA")),
      "fonticonActive":{"isVisible":false,"text":"",
                        "onClick":self.termsAndConditionsEditView},
      "lblSeparator1": "-",
      template: "flxTermsAndConditions",
      "info":pref
    };
  },
  setTnCSegmentData: function(resData,isFilter) {
    var self = this;
    var data = [];
    var dataMap = {
      "data":"data",
      "lblTitle": "lblTitle",
      "lblCode":"lblCode", 
      "lblApplicableApps": "lblApplicableApps",
      "fonticonActive": "fonticonActive",
      "lblSeparator1": "lblSeparator1",
      "flxTermsAndConditions":"flxTermsAndConditions"
    };
    if(isFilter && this.view.subHeader.tbxSearchBox.text!==""){
      resData=resData.filter(self.searchFilter);//.sort(this.sortBy.sortData);
    }
    if (resData) {
      data = resData.map(self.toTnCSegment.bind(self));
    }
    else if(resData==[])
      resData.map(this.toTnCSegment.bind(self));

//     if(!isFilter){
//       self.setDataForAppsFilter();
//       self.view.flxFilterStatus.skin = "slFbox";
//     }
//     else{
//       self.view.flxFilterStatus.skin = "sknflxCustomertagBlue";
//     }
    var data = resData.map(this.toTnCSegment.bind(self));
    this.resetSortImages();
    this.view.segTandC.widgetDataMap = dataMap;
    this.view.segTandC.setData(data);
    document.getElementById("frmTermsAndConditions_segTandC").onscroll = this.contextualMenuOff;
    this.view.forceLayout();
  },
  showNoRecordAddedYet: function() {
    this.hideAll();
    this.hideHeaderButtons();
  },
  searchFilter: function(tnc) {
    var searchText = this.view.subHeader.tbxSearchBox.text.replace("<","&lt").replace(">","&gt").replace("&","&amp").replace("=","&eq").replace("alert","").split(">").join("&gt").split("<").join("&lt");
    if (typeof searchText === "string" && searchText.length > 0) {
      return (tnc.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 || tnc.code.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    } else {
      return true;
    }
  },
  setDataForAppsFilter : function(){
    var self = this;
    var appsList=[], appListId =[],maxTypeText = "";
    var TnCData = self.TnCJSON;
    if(TnCData !== null){
      for(var j=0;j<TnCData.length;j++){
        var appPreferences = TnCData[j].appPreferences && TnCData[j].appPreferences.length > 0 ?
            TnCData[j].appPreferences[0] : "";
        if(appPreferences && !appListId.contains(appPreferences.appId)){
          appListId.push(appPreferences.appId);
          appsList.push({"id":appPreferences.appId,"desc":appPreferences.appName});
        }
      }
      this.setAppsData(appsList, "apps");
      appsList.push({"id":"NOT_APPLICABLE","desc": kony.i18n.getLocalizedString("i18n.frmAlertsManagement.NA")});

    }else{
      TnCData = [];
    }
    var widgetMap = {
      "id":"id",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var appsData = appsList.map(function(rec){
      maxTypeText = rec.desc.length > maxTypeText.length ? rec.desc : maxTypeText;
      return {
        "id":rec.id,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkboxnormal.png",
        "lblDescription": {"text":rec.desc}
      };
    });
    self.view.applicableAppsFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.applicableAppsFilterMenu.segStatusFilterDropdown.setData(appsData);
    var indices = [];
    for(var index = 0; index < appsData.length; index++){
      indices.push(index);
    }
    self.view.applicableAppsFilterMenu.segStatusFilterDropdown.selectedRowIndices = [[0,indices]];
    self.view.flxApplicableAppsFilter.width = self.AdminConsoleCommonUtils.getLabelWidth(maxTypeText)+55+"px";
    self.view.forceLayout();
  },
    performContentTypeFilter: function () {
    var self = this;
    var selFilter = [[]];
    var dataToShow = [];
    var allData = self.versionData.termsAndConditionsVersion;
    var typeIndices = self.view.contentTypeFilter.segStatusFilterDropdown.selectedIndices;
    var statusIndices = self.view.statusFilter.segStatusFilterDropdown.selectedIndices;
    selFilter[0][1] = [];
    selFilter[0][0] = [];
    var selStatusInd = null;
    var selTypeInd = null;
    var status;
    selTypeInd = typeIndices ? typeIndices[0][1] : [];
      for (var i = 0; i < selTypeInd.length; i++) {
        selFilter[0][0].push(self.view.contentTypeFilter.segStatusFilterDropdown.data[selTypeInd[i]].lblDescription);
      }
    //get selected status
      selStatusInd = statusIndices ? statusIndices[0][1] : [];
      for (var j = 0; j < selStatusInd.length; j++) {
        selFilter[0][1].push(self.view.statusFilter.segStatusFilterDropdown.data[selStatusInd[j]].lblDescription);
      }
    if (selFilter[0][0].length === 0 || selFilter[0][1].length === 0) { //none selected - show no results
      dataToShow = [];
    } else if (selFilter[0][0].length > 0 && selFilter[0][1].length > 0) {//both filters selected
      dataToShow = allData.filter(function (rec) {
        if(rec.statusId === "ARCHIVED")
          status = kony.i18n.getLocalizedString("i18n.frmdecisionManagement.archived");
        else if(rec.statusId === "ACTIVE")
          status = kony.i18n.getLocalizedString("i18n.permission.Active");
        else
          status = kony.i18n.getLocalizedString("i18n.frmCSRController.Draft");
        if (selFilter[0][0].indexOf(rec.contentTypeName) >= 0 && selFilter[0][1].indexOf(status) >= 0) {
          return rec;
        }
      });
    } else { //single filter selected
    }
    if (dataToShow.length > 0) {
          self.view.flxNoVersionsFound.setVisibility(false);
          self.view.rtxNoVersionsFound.setVisibility(false);
          self.view.segVersionList.setVisibility(true);
          self.setVersionList({"termsAndConditionsVersion": dataToShow},true);
        }
    else {
      self.view.rtxNoVersionsFound.text=kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
      self.view.rtxNoVersionsFound.setVisibility(true);
      self.view.flxNoVersionsFound.setVisibility(true);
      self.view.segVersionList.setVisibility(false);
      var data=self.view.segVersionList.data;
      data=[];
      self.view.segVersionList.setData(data);
    }
    self.view.forceLayout();
  },
  performAppsFilter: function () {
    var self = this;
    var selApps = [];
    var selInd;
    var dataToShow = [];
    var allData = self.TnCJSON;
    var segAppData = self.view.applicableAppsFilterMenu.segStatusFilterDropdown.data;
    var indices = self.view.applicableAppsFilterMenu.segStatusFilterDropdown.selectedRowIndices;
    self.inFilter=true;
    if (indices !== null) { //show selected indices data
      selInd = indices[0][1];
      for(var i=0;i<selInd.length;i++){
        selApps.push(self.view.applicableAppsFilterMenu.segStatusFilterDropdown.data[selInd[i]].lblDescription);
      }
      if (selInd.length === segAppData.length) {
        if(self.view.subHeader.tbxSearchBox.text===""){//all are selected
          self.inFilter=false;
          self.setTnCSegmentData(self.TnCJSON,false);
        }else
          self.loadPageData();
      } else {
        dataToShow = allData.filter(function(rec){
          var pref = rec.appPreferences;
          var flag = false;
          for(var i=0;i<selApps.length;i++){
            for(var j=0;j<pref.length;j++){
            if(pref[j].isSupported==="true")
              flag = true;
            if(selApps[i].text === pref[j].appName&&pref[j].isSupported==="true"){
              return rec;
            }
             
            } 
            if((selApps[i].text === kony.i18n.getLocalizedString("i18n.frmAlertsManagement.NA")) && flag === false){
                return rec;
              }
          }

        });
        if (dataToShow.length > 0) {
          self.view.rtxNoRecords.setVisibility(false);
          self.view.flxNoRecordsFound.setVisibility(false);
          self.view.segTandC.setVisibility(true);
          self.setTnCSegmentData(dataToShow,true);
        } else {
          self.view.segTandC.setData([]);
        }
      }
    } 
    else {
      self.view.rtxNoRecords.text=kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
      self.view.rtxNoRecords.setVisibility(true);
      self.view.flxNoRecordsFound.setVisibility(true);
      self.view.segTandC.setVisibility(false);
      var data=self.view.segTandC.data;
      data=[];
      self.view.segTandC.setData(data);
    }
    self.view.forceLayout();
  },
  
  showTnCUI: function(tncs) {
    //this.resetEditScreen();
    if (tncs.length !== 0) {
      this.showListingScreen();
    } else {
      if (this.records === 0) {
        this.showNoResultsFound();
        this.view.forceLayout();
      } else {
        this.showNoRecordAddedYet();
      }
    }
    this.view.segTandC.setVisibility(true);
    this.setTnCSegmentData(tncs,false);
    this.view.forceLayout();
  },
  willUpdateUI: function (context) {
    var self = this;
    //this.view.flxToastMessage.setVisibility(false);
    this.updateLeftMenu(context);
    if(!context){
      return;
    }
    if(context.toastModel){
      if(context.toastModel.status===kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SUCCESS"))
        this.view.toastMessage.showToastMessage(context.toastModel.message,this);
      else
        this.view.toastMessage.showErrorToastMessage(context.toastModel.message,this);
    }else if(context.tncs){
      self.preShowTermsAndConditions();
      self.TnCJSON = context.tncs;
      this.setDataForAppsFilter();
      this.sortBy = this.getObjectSorter('lblTitle');
      this.determineSortFontIcon(this.sortBy,"lblTitle",this.view.lblFontTitle);
      
      this.loadPageData = function() {
        var searchResult = context.tncs.filter(self.searchFilter);
        self.records = context.tncs.filter(self.searchFilter).length;
        self.allRecords = context.tncs;
        self.showTnCUI(searchResult);
      };
      this.loadPageData();
    }
    else if(context.languageList){
      this.setLanguages(context.languageList);
    }else if (context.action==="showContentVerList") {
      //       if(context.isEdit){
      //         this.setTnCSegmentData(context.tcData.termsAndConditions,false);
      //       }else{
      var selectedItem = this.view.segTandC.selecteditems[0];
      var selectedData;
      for(var i=0;i<context.tcData.length;i++){
        if(context.tcData[i].code===selectedItem.lblCode)
          selectedData=context.tcData[i];
      }
      var termsCondAppData = this.getTermsCondVersionBasedOnApp(selectedData.apps);
      this.setVersionList(termsCondAppData);
      this.versionData = termsCondAppData;
      //}
    }
    else if (context.code) {
      this.tabData = context.records;
      this.showTermsAndConditionDetailScreen();
    }else if(context.alertDetails && context.action === "edit"){
      this.showAddTermsAndConditionScreen();
      //this.view.flxAlertTypesContextualMenu.setVisibility(false);
      this.fillTermsAndConditionScreenForEdit(context.records);
    }else if(context.termsAndConditionsViewModel){
     // this.hideEditScreen();
      if(context.termsAndConditionsViewModel.termsAndConditions !== null){
        this.setTermsAndConditionsData(context.termsAndConditionsViewModel.termsAndConditions);
      }else{
        this.showAddTermsAndConditionsScreen();
      }
      //kony.adminConsole.utils.hideProgressBar(this.view);
    }
    
    else if(context.action === "showLoadingScreen"){
      kony.adminConsole.utils.showProgressBar(this.view);
    }else if(context.action === "hideLoadingScreen"){
      kony.adminConsole.utils.hideProgressBar(this.view);
    }
    this.view.forceLayout();
  },
  showAddTermsAndConditionsScreen : function(){
    this.view.flxDetailTermsAndConditions.setVisibility(false);
    this.view.flxNoTermsAndConditions.setVisibility(true);
  },
  hideEditScreen: function(){
    this.view.flxAddTermsAndCondition.setVisibility(false);
    this.view.flxBreadcrumb.setVisibility(false);
  },
   onHoverEventCallback:function(widget, context) {
    var scopeObj = this;
    var widGetId = widget.id;
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      scopeObj.view[widGetId].setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      scopeObj.view[widGetId].setVisibility(false);
    }
  },
  mapAppsListData: function(data) {
    var self = this;
    var listBoxData = [];
    var widgetDataMap = {
      "id": "id",
      "lblDescription": "lblDescription",
      "imgCheckBox": "imgCheckBox",
      "flxCheckBox":"flxCheckBox",
      "flxSearchDropDown": "flxSearchDropDown"
    };
    self.view.customListboxApps.segList.widgetDataMap = widgetDataMap;
    if (data) {
      listBoxData = data.map(function(rec) {
        return {
          "id": rec.id,
          "lblDescription": {"text":rec.desc},
          "imgCheckBox": {"src":self.checkboxnormal},
          "template": "flxSearchDropDown"
        };
      });
    }
    return listBoxData;
  },
  setAppsData : function(data,category){
    var self = this;
    var widgetPath ="";
    if(category === "apps"){
      widgetPath = self.view.customListboxApps;
    }
    var appData = self.mapAppsListData(data);
    widgetPath.segList.setData(appData);
    widgetPath.segList.selectedIndices =[[0,[0]]];
    widgetPath.lblSelectedValue.text = self.sAll;
  },
  setLanguages : function(data){
    var self = this;
    var dataMap = {
      "flxSearchDropDown":"flxSearchDropDown",
      "flxCheckBox":"flxCheckBox",
      "lblDescription":"lblDescription",
      "languageCode":"languageCode"
    };
    var tempData = [], maxSizeText = "";
    tempData = data.map(function(record){
      maxSizeText = record.Language.length > maxSizeText.length ? record.Language : maxSizeText;
      return {
        "template":"flxSearchDropDown",
        "flxSearchDropDown":{"skin":"sknflxffffffop100","hoverSkin":"sknContextualMenuEntryHover2"},
        "flxCheckBox":{isVisible:false},
        "lblDescription":{"text":record.Language,"left":"15dp"},
        "languageCode": record.Code
      };
    });
    var temp;
    for(var i = 0; i < tempData.length; i++){
      if(tempData[i].languageCode === "en-US"){
        temp = tempData[i];
        tempData[i] = tempData[0];
        tempData[0] = temp;
        self.view.lblSelectedLanguage.text = temp.lblDescription.text;
        self.view.lblSelectedLanguage.info = {"code":temp.languageCode, "mapData":temp};
      }
    }
    self.view.languages.segStatusFilterDropdown.widgetDataMap = dataMap;
    self.view.languages.segStatusFilterDropdown.setData(tempData.slice(1));
    self.view.flxLanguages.width=self.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+45+"px";
    self.termsAndCondtionsDetailView();
    self.view.forceLayout();
  },
  onClickOfSelectAll : function(category){
    var self = this;
    var widgetPath ="",segData ="";
    if(category === "apps"){
      widgetPath = self.view.customListboxApps;
    }
    segData = widgetPath.segList.data;
    var arr = [];
    for(var i= 0; i< segData.length; i++){
      arr.push(i);
    }
    if(widgetPath.imgCheckBox.src === self.checkboxnormal){
      widgetPath.imgCheckBox.src = self.checkboxselected;
      widgetPath.lblSelectedValue.text = self.sAll;
      widgetPath.segList.selectedIndices = [[0,arr]];
    }else if(widgetPath.imgCheckBox.src === self.checkboxselected){
      widgetPath.imgCheckBox.src = self.checkboxnormal;
      widgetPath.segList.selectedIndices = null;
    }
    self.view.forceLayout();
  },
  onCustomListBoxRowClick : function(category){
    var self = this;
    var widgetPath ="",segData ="";
    if(category === "apps"){
      widgetPath = self.view.customListboxApps;
    }
    segData = widgetPath.segList.data;
    var arr = [];
    for(var i= 0; i< segData.length; i++){
      arr.push(i);
    }
    var selRows = widgetPath.segList.selectedRowItems;
    if(selRows){
      if(selRows.length === segData.length){
        widgetPath.imgCheckBox.src = self.checkboxselected;
        widgetPath.lblSelectedValue.text = self.sAll;
        widgetPath.segList.selectedIndices = [[0,arr]];
      }else{
        widgetPath.lblSelectedValue.text = selRows.length +" "+self.sSelected;
        widgetPath.imgCheckBox.src = self.checkboxnormal;
      }
    } else{
      widgetPath.lblSelectedValue.text = "0 " +self.sSelected;
    }
    self.view.forceLayout();
  },
  /*
   * selects the apps exsisting for alert group
   * @param : app preferences list of alert group
   */
  selectAppsForEdit : function(appData){
    var selectInd = [];
    var segData = this.view.customListboxApps.segList.data;
    for(var i=0;i<segData.length;i++){
      for(var j=0;j<appData.length;j++){
        if(appData[j].isSupported === "true" && appData[j].appId === segData[i].id){
          selectInd.push(i);
        } 
      }
    }
    this.view.customListboxApps.segList.selectedRowIndices = [[0,selectInd]];
    if(segData.length === selectInd.length){
      this.view.customListboxApps.imgCheckBox.src = this.checkboxselected;
      this.view.customListboxApps.lblSelectedValue.text = this.sAll;
    }else{
      this.view.customListboxApps.imgCheckBox.src = this.checkboxnormal;
      this.view.customListboxApps.lblSelectedValue.text = selectInd.length+ " " +this.sSelected;
    }
  },
  createTnCRequestParam :  function(){
    var self = this;
    var reqParam = {};
    var tncText;
    var appList = self.view.customListboxApps.segList.selectedRowItems;
    var appPrefer ={};
    var attribute,condition,attrId;
    if(appList !== null){
      for (var i = 0; i < appList.length; i++) {
        appPrefer[appList[i].id] = true;
      }
    }
    if(self.view.imgYes.src === "radio_selected.png")
    {
      tncText = document.getElementById("iframe_rtxTnCEdit").contentWindow.document.getElementById("editor").innerHTML;
      if(tncText==="" || tncText === "<br>"){
        self.view.flxContentError.isVisible = true;
        return reqParam;
      }
      else{
        self.view.flxContentError.isVisible = false;
     }
    }else{
      tncText = this.view.tbxURLcontent.text;
    }
    reqParam = {
      "termsAndConditionsCode": self.view.segTandC.selecteditems[0].lblCode,
      "contentType": self.view.imgYes.src === "radio_selected.png"? kony.i18n.getLocalizedString("i18n.TermsAndConditions.TEXT"):kony.i18n.getLocalizedString("i18n.TermsAndConditions.URL"),
      "languageCode": this.view.lblSelectedLanguage.info.code,
      "termsAndConditionsTitle": self.view.tbxTitle.text,
      "termsAndConditionsDescription": self.view.txtAreaDescription.text,
      "termsAndConditionsContent": tncText,
      "appPreferences":appPrefer,
    };
    return reqParam;
  },
  editTnCRequestParam : function(){
    var self =this;
    var appPrefer ={};
    var selAppList=[];
	if(self.view.customListboxApps.segList.selectedRowIndices !== null)
         selAppList = self.view.customListboxApps.segList.selectedRowIndices[0][1];
    var appSegData = self.view.customListboxApps.segList.data;
    var initialParam = self.createTnCRequestParam();
    for(var i=0;i<appSegData.length;i++){
      if(selAppList.contains(i)){
        appPrefer[appSegData[i].id] = true;
      }else{
        appPrefer[appSegData[i].id] = false;
      }
    }
    initialParam.appPreferences = appPrefer;
    return initialParam;
  },
  editTnC : function(){
    var self =this;
    var reqParam = self.editTnCRequestParam();
    self.presenter.editTermsAndConditions(reqParam);
  },
  setEditViewData: function(){
    var selectedItem = this.view.segTandC.selecteditems[0];
    this.view.tbxTitle.text=selectedItem.lblTitle;
    var data = selectedItem.data;
    this.view.txtAreaDescription.text=data.description;
    this.selectAppsForEdit(data.appPreferences);
    this.view.flxBreadcrumb.setVisibility(true);
    this.view.flxContentError.setVisibility(false);
    //this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmTermsAndConditionsController.Edit")+ kony.i18n.getLocalizedString("i18n.TermsAndConditions.addTnC");		
    this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmTermsAndConditionsController.EDIT")+ " " +kony.i18n.getLocalizedString("i18n.TermsAndConditions.addTnC").toUpperCase();
    if(data.termsAndConditionsContent[this.view.lblSelectedLanguage.info.code].contentTypeId === kony.i18n.getLocalizedString("i18n.TermsAndConditions.TEXT"))
    {
      this.view.imgYes.src = "radio_selected.png";
      this.view.imgNo.src = "radio_notselected.png";
      var tncEditorDocument = document.getElementById("iframe_rtxTnCEdit").contentWindow.document;
      tncEditorDocument.getElementById("editor").innerHTML = data.termsAndConditionsContent[this.view.lblSelectedLanguage.info.code].content;
      this.view.flxURLTextBox.setVisibility(false);
      this.view.flxContentRichTxt.setVisibility(true);
    }else{
      this.view.imgYes.src = "radio_notselected.png";
      this.view.imgNo.src = "radio_selected.png";
      this.view.tbxURLcontent.text = data.termsAndConditionsContent[this.view.lblSelectedLanguage.info.code].content;
      this.view.flxContentRichTxt.setVisibility(false);
      this.view.flxURLTextBox.setVisibility(true);
   }
    this.view.forceLayout();
  },
  flowActions :function(){
    var scopeObj=this;
    scopeObj.view.flxApplicableAppsFilter.onHover = scopeObj.onHoverEventCallback;
    scopeObj.view.flxLanguages.onHover = scopeObj.onHoverEventCallback;
    scopeObj.view.flxContentTypeFilter.onHover = scopeObj.onHoverEventCallback;
    scopeObj.view.flxStatusFilter.onHover = scopeObj.onHoverEventCallback;
    // Add Static content
    this.view.flxYes.onTouchStart = function(){
     scopeObj.view.textToUrlPopup.rtxPopUpDisclaimer.text=kony.i18n.getLocalizedString("i18n.TermsAndConditions.UrlToTextMessage");
     scopeObj.view.flxTextToUrlPopup.isVisible = true;
     scopeObj.view.forceLayout();
    };
    this.view.lblFontTitle.onTouchStart = function(){
      scopeObj.sortBy.column("lblTitle");
     // var sortData =scopeObj.view.segTandC.data.sort(scopeObj.sortBy.sortData));
      scopeObj.view.segTandC.setData(scopeObj.view.segTandC.data.sort(scopeObj.sortBy.sortData));
      scopeObj.determineSortFontIcon(scopeObj.sortBy,"lblTitle",scopeObj.view.lblFontTitle);
    };
    this.view.lblFontCode.onTouchStart = function(){
      scopeObj.sortBy.column("lblCode");
      scopeObj.view.segTandC.setData(scopeObj.view.segTandC.data.sort(scopeObj.sortBy.sortData));
      scopeObj.determineSortFontIcon(scopeObj.sortBy,"lblCode",scopeObj.view.lblFontCode);
    };
    this.view.flxNo.onTouchStart = function(){
      scopeObj.view.textToUrlPopup.rtxPopUpDisclaimer.text=kony.i18n.getLocalizedString("i18n.TermsAndConditions.TextToUrlMessage");
      scopeObj.view.flxTextToUrlPopup.isVisible = true;
      scopeObj.view.forceLayout();
    };
     
    this.view.textToUrlPopup.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxTextToUrlPopup.isVisible = false;
    };
    this.view.textToUrlPopup.btnPopUpDelete.onClick = function(){
      scopeObj.toggleRadio();
      scopeObj.view.flxTextToUrlPopup.isVisible = false;
      scopeObj.view.forceLayout();
    };
    this.view.textToUrlPopup.flxPopUpClose.onClick = function(){
      scopeObj.view.flxTextToUrlPopup.isVisible = false;
    };
    this.view.customListboxApps.flxSelectedText.onClick = function(){
      scopeObj.view.customListboxApps.flxSegmentList.setVisibility(scopeObj.view.customListboxApps.flxSegmentList.isVisible === false);
    };
    this.view.customListboxApps.flxCheckBox.onClick = function(){
      scopeObj.onClickOfSelectAll("apps");
    };
    this.view.customListboxApps.segList.onRowClick = function(){
      scopeObj.onCustomListBoxRowClick("apps");
    };
    this.view.customListboxApps.flxDropdown.onClick = function(){
      scopeObj.view.customListboxApps.flxSegmentList.setVisibility(scopeObj.view.customListboxApps.flxSegmentList.isVisible === false);
    };
    this.view.customListboxApps.btnOk.onClick = function(){
      scopeObj.view.customListboxApps.flxSegmentList.setVisibility(scopeObj.view.customListboxApps.flxSegmentList.isVisible === false);
    };
    this.view.flxViewEditButton.onClick = function(){
      scopeObj.termsAndConditionsEditView();
    };
    this.view.segTandC.onRowClick=function(){
      scopeObj.view.mainHeader.flxHeaderSeperator.setVisibility(false);
      scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.TermsAndConditions.viewTandC");
      scopeObj.presenter.fetchLanguageList();
    };
    this.view.statusFilter.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.performContentTypeFilter();
    };
    this.view.contentTypeFilter.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.performContentTypeFilter();
    };
    this.view.applicableAppsFilterMenu.segStatusFilterDropdown.onRowClick=function(){
      scopeObj.currentPage=1;
      scopeObj.performAppsFilter();
    };
    this.view.noStaticData.btnAddStaticContent.onClick = function(){
      scopeObj.view.flxAddTermsAndCondition.isVisible =true;
      scopeObj.view.flxNoTermsAndConditions.isVisible = false;
      scopeObj.view.flxNoTnCError.isVisible = false;
      scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmTermsAndConditionsController.Add")+ kony.i18n.getLocalizedString("i18n.TermsAndConditions.addTnC");
      scopeObj.view.flxBreadcrumb.setVisibility(false);
      var tncEditorDocument = document.getElementById("iframe_rtxTnC").contentWindow.document;
      tncEditorDocument.getElementById("editor").innerHTML = "";
      tncEditorDocument.getElementsByClassName("table-palette")[0].style.marginLeft = "0px";
    };
    this.view.subHeader.tbxSearchBox.onKeyUp = function() {
      scopeObj.loadPageData();
      if(scopeObj.view.subHeader.tbxSearchBox.text === ""){
        scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100";
        scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
      	scopeObj.hideNoResultsFound();
      	scopeObj.view.forceLayout();
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
      scopeObj.view.forceLayout();
    };
    this.view.subHeader.flxClearSearchImage.onClick = function() {
      scopeObj.view.subHeader.tbxSearchBox.text = "";
      scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100";
      scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
      scopeObj.loadPageData();
      scopeObj.hideNoResultsFound();
      scopeObj.view.forceLayout();
    };
    //On Add T&C Cancel btn 
    this.view.flxVersionFilterStatus.onClick = function(){
      var flxRight = scopeObj.view.flxVersionListHeaderWrapper.frame.width - scopeObj.view.flxStatus.frame.x - scopeObj.view.flxStatus.frame.width;
      var iconRight = scopeObj.view.flxStatus.frame.width - scopeObj.view.flxVersionFilterStatus.frame.x;
      scopeObj.view.flxStatusFilter.right = (flxRight + iconRight - 10) +"px";
      scopeObj.view.flxStatusFilter.setVisibility(!scopeObj.view.flxStatusFilter.isVisible);
      scopeObj.view.forceLayout();
    };
    this.view.flxFilterContentType.onClick = function(){
      var flxRight = scopeObj.view.flxVersionListHeaderWrapper.frame.width - scopeObj.view.flxContentTyp.frame.x - scopeObj.view.flxContentTyp.frame.width;
      var iconRight = scopeObj.view.flxContentTyp.frame.width - scopeObj.view.flxFilterContentType.frame.x;
      scopeObj.view.flxContentTypeFilter.right = (flxRight + iconRight - 10) +"px";
      scopeObj.view.flxContentTypeFilter.setVisibility(!scopeObj.view.flxContentTypeFilter.isVisible);
      scopeObj.view.forceLayout();
    };
    this.view.flxFilterStatus.onClick = function(){
      var flxRight = scopeObj.view.flxTandCHeader.frame.width - scopeObj.view.flxApplicableApps.frame.x - scopeObj.view.flxApplicableApps.frame.width;
      var iconRight = scopeObj.view.flxApplicableApps.frame.width - scopeObj.view.flxFilterStatus.frame.x;
      scopeObj.view.flxApplicableAppsFilter.right = (flxRight + iconRight - 8) +"px";
       
      scopeObj.view.flxApplicableAppsFilter.setVisibility(!scopeObj.view.flxApplicableAppsFilter.isVisible);
      scopeObj.view.forceLayout();
    };
    this.view.commonButtons.btnCancel.onClick  = function(){
      scopeObj.view.flxTandCPopUp.setVisibility(true);
    };

    // On Add T&C Save btn 
    this.view.commonButtons.btnSave.onClick = function(){
      if(scopeObj.validateTnC())
      	scopeObj.editTnC();
    };
    this.view.tandCPopUp.flxPopUpClose.onTouchStart = function(){
      scopeObj.view.flxTandCPopUp.setVisibility(false);
    };
    // For Edit click
    this.view.staticData.flxEditOption.onTouchStart = function(){
      scopeObj.editPage=1;
      scopeObj.view.flxAddTermsAndCondition.isVisible =true;
      scopeObj.view.flxNoTermsAndConditions.isVisible = false;
      scopeObj.view.flxDetailTermsAndConditions.isVisible = false;
      scopeObj.view.flxNoTnCError.isVisible = false;
      scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmTermsAndConditionsController.Edit")+ kony.i18n.getLocalizedString("i18n.TermsAndConditions.addTnC");
      scopeObj.view.flxBreadcrumb.setVisibility(true);
      scopeObj.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.TermsAndConditions.addTnC").toUpperCase();
      scopeObj.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmTermsAndConditionsController.EDIT")+ " " +kony.i18n.getLocalizedString("i18n.TermsAndConditions.addTnC").toUpperCase();
      var tncEditorDocument = document.getElementById("iframe_rtxTnC").contentWindow.document;
      var tncViewerDocument = document.getElementById("iframe_rtxViewer").contentWindow.document;
      tncEditorDocument.getElementById("editor").innerHTML = tncViewerDocument.getElementById("viewer").innerHTML;
      tncEditorDocument.getElementsByClassName("table-palette")[0].style.marginLeft = "0px";
      if(scopeObj.view.flxDetailTermsAndConditions.staticData.flxStaticContantHeader.flxStatus.lblstaticContentStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Inactive")){
        scopeObj.view.SwitchToggleStatus.selectedindex = 1;
      }else{
        scopeObj.view.SwitchToggleStatus.selectedindex = 0;
      }
      scopeObj.view.forceLayout();
    };
    this.view.breadcrumbs.btnBackToMain.onClick = function(){
      scopeObj.hideAll();
      scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.TermsAndConditions.addTnC");
      scopeObj.view.flxMainSubHeader.setVisibility(true);
      scopeObj.view.flxTermsAndConditionsList.setVisibility(true);
      scopeObj.view.flxBreadcrumb.setVisibility(false);
      scopeObj.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    };
	this.view.tandCPopUp.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxTandCPopUp.isVisible =false;  
      scopeObj.view.forceLayout();
    };
    this.view.tandCPopUp.btnPopUpDelete.onClick = function(){
      scopeObj.view.flxTandCPopUp.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.staticData.flxSelectOptions.onHover = this.onDropDownsHoverCallback;
    this.view.tbxTitle.onBeginEditing = function(){
      scopeObj.view.lblHeadingCount.setVisibility(true);
      scopeObj.view.lblHeadingCount.text = scopeObj.view.tbxTitle.text.length + "/50";
      scopeObj.view.forceLayout();
    };
    this.view.tbxTitle.onKeyUp = function(){
      if(scopeObj.view.tbxTitle.text.trim().length!==0){
        scopeObj.view.tbxTitle.skin="skntxtbx484b5214px";
		scopeObj.view.flxTitleError.setVisibility(false);
      }
      scopeObj.view.lblHeadingCount.text = scopeObj.view.tbxTitle.text.length + "/50";
      scopeObj.view.forceLayout();
    };
    this.view.tbxTitle.onBeginEditing = function(){
      scopeObj.view.lblHeadingCount.setVisibility(true);
      scopeObj.view.lblHeadingCount.text = scopeObj.view.tbxTitle.text.length + "/50";
      scopeObj.view.forceLayout();
    };
    this.view.tbxTitle.onEndEditing = function(){
      scopeObj.view.lblHeadingCount.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.txtAreaDescription.onBeginEditing = function(){
      scopeObj.view.lblDescriptionCount.setVisibility(true);
      scopeObj.view.lblDescriptionCount.text = scopeObj.view.txtAreaDescription.text.length + "/250";
      scopeObj.view.forceLayout();
    };
    this.view.txtAreaDescription.onKeyUp = function(){
      scopeObj.view.lblDescriptionCount.text = scopeObj.view.txtAreaDescription.text.length + "/250";
      scopeObj.view.forceLayout();
    };
    this.view.txtAreaDescription.onEndEditing = function(){
      scopeObj.view.lblDescriptionCount.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.rtxTnCEdit.onKeyUp = function(){
      var tncEditorDocument = document.getElementById("iframe_rtxTnCEdit").contentWindow.document;
      if (tncEditorDocument.getElementById("editor").innerHTML.trim().length !== 0) {
        scopeObj.view.flxContentRichTxt.skin = "sknflxffffffop100Bordercbcdd1Radius3px";
        scopeObj.view.flxContentError.setVisibility(false);
      }
    };
    this.view.tbxURLcontent.onKeyUp = function(){
      if(scopeObj.view.tbxURLcontent.text.trim().length!==0){
        scopeObj.view.tbxURLcontent.skin="skntxtbx484b5214px";
        scopeObj.view.flxContentError.setVisibility(false);
      }
    };
    this.view.txtbxTCTitle.onBeginEditing = function(){
      scopeObj.view.lblTCTitleCount.setVisibility(true);
      scopeObj.view.lblTCTitleCount.text = scopeObj.view.txtbxTCTitle.text.length + "/50";
      scopeObj.view.forceLayout();
    };
    this.view.txtbxTCTitle.onKeyUp = function(){
      if(scopeObj.view.txtbxTCTitle.text.trim().length===0)
      {
        scopeObj.view.lblTCTitleCount.setVisibility(false);
      }
      else
      {
        scopeObj.view.lblTCTitleCount.text=scopeObj.view.txtbxTCTitle.text.trim().length+"/50";
        scopeObj.view.txtbxTCTitle.skin="skntxtbx484b5214px";
        scopeObj.view.flxErrorTCTitle.setVisibility(false);
      }
      scopeObj.view.forceLayout();
    };
    this.view.txtbxTCTitle.onEndEditing = function(){
      scopeObj.view.lblTCTitleCount.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.txtDescription.onBeginEditing = function(){
      scopeObj.view.lblTCDescriptionSize.setVisibility(true);
      scopeObj.view.lblTCDescriptionSize.text = scopeObj.view.txtDescription.text.length + "/250";
      scopeObj.view.forceLayout();
    };
    this.view.languages.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.view.flxLanguages.setVisibility(false);
      scopeObj.setVersionList(scopeObj.versionData);
    };
	this.view.flxVersion.onTouchStart = function(){
      var segData = (scopeObj.view.segVersionList.data);
      var row1 = [];
      if(segData[0].lblVersion === "N/A"){
        row1.push(segData[0]);
        segData = segData.slice(1);
      }
      scopeObj.sortBy.column("lblVersion");
      scopeObj.determineSortFontIcon(scopeObj.sortBy,"lblVersion",scopeObj.view.lblSortVersion);
      var sortData = segData.sort(scopeObj.sortBy.sortData);
      scopeObj.view.segVersionList.setData(row1.concat(sortData));
      scopeObj.view.forceLayout();
    };
    this.view.flxPublishedOn.onTouchStart = function(){
       var segData = (scopeObj.view.segVersionList.data);
      var row1 = [];
      if(segData[0].lblVersion === "N/A"){
        row1.push(segData[0]);
        segData = segData.slice(1);
      }
      scopeObj.sortBy.column('lblLastModifiedOn');
      scopeObj.determineSortFontIcon(scopeObj.sortBy,"lblLastModifiedOn",scopeObj.view.lblFontPublishedOn);
      var sortData = segData.sort(scopeObj.sortBy.sortData);
      scopeObj.view.segVersionList.setData(row1.concat(sortData));
      scopeObj.view.forceLayout();
    };
    this.view.flxPublishedBy.onTouchStart = function(){
      var segData = (scopeObj.view.segVersionList.data);
      var row1 = [];
      if(segData[0].lblVersion === "N/A"){
        row1.push(segData[0]);
        segData = segData.slice(1);
      }
      scopeObj.sortBy.column('lblLastModifiedBy');
      scopeObj.determineSortFontIcon(scopeObj.sortBy,"lblLastModifiedBy",scopeObj.view.lblFontPublishedBy);
      var sortData = segData.sort(scopeObj.sortBy.sortData);
      scopeObj.view.segVersionList.setData(row1.concat(sortData));
      scopeObj.view.forceLayout();
    };
    this.view.flxLanguageHeader.onTouchStart = function(){
      scopeObj.view.flxLanguages.setVisibility(true);
      var flxRight = scopeObj.view.flxVersionsList.frame.width - scopeObj.view.flxLanguageHeader.frame.x - scopeObj.view.flxLanguageHeader.frame.width;
      var iconRight = scopeObj.view.flxLanguageHeader.frame.width - scopeObj.view.lblSelectedLanguageIcon.frame.x;
      scopeObj.view.flxLanguages.right = (flxRight + iconRight -27) +"px";
      scopeObj.view.forceLayout();
    };
    this.view.txtDescription.onKeyUp = function(){
      if(scopeObj.view.txtDescription.text.trim().length===0)
      {
        scopeObj.view.lblTCDescriptionSize.setVisibility(false);
      }
      else
      {
        scopeObj.view.lblTCDescriptionSize.text=scopeObj.view.txtDescription.text.trim().length+"/250";
        scopeObj.view.txtDescription.skin="skntxtAreaLato35475f14Px";
        scopeObj.view.flxErrorTCTitle.setVisibility(false);
      }
      scopeObj.view.forceLayout();
    };
    this.view.txtDescription.onEndEditing = function(){
      scopeObj.view.lblTCDescriptionSize.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.txtContentDescription.onKeyUp = function(){
      if(scopeObj.view.txtContentDescription.text.trim().length===0)
      {
        scopeObj.view.lblContentDescriptionSize.setVisibility(false);
      }
      else
      {
        scopeObj.view.lblContentDescriptionSize.text=scopeObj.view.txtContentDescription.text.trim().length+"/250";
        scopeObj.view.lblContentDescriptionSize.setVisibility(true);
        scopeObj.view.txtContentDescription.skin="skntxtAreaLato35475f14Px";
        scopeObj.view.flxNoContentDescriptionError.setVisibility(false);
      }
      scopeObj.view.forceLayout();
    };
    this.view.txtContentDescription.onEndEditing = function(){
      scopeObj.view.lblContentDescriptionSize.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.btnsave.onClick = function(){
      var errFlag=0;
      if(scopeObj.view.txtbxTCTitle.text.trim().length===0||scopeObj.view.txtbxTCTitle.text.trim().length<3){
        errFlag=-1;
        scopeObj.view.txtbxTCTitle.skin="skinredbg";
        if(scopeObj.view.txtbxTCTitle.text.trim().length===0)
        	scopeObj.view.lblErrorTCTitle.text=kony.i18n.getLocalizedString("i18n.TermsAndConditions.titleEmpty");
       else if(scopeObj.view.txtbxTCTitle.text.trim().length<3)
        scopeObj.view.lblErrorTCTitle.text=kony.i18n.getLocalizedString("i18n.frmTermsAndConditionsController.titleMinchars");
        scopeObj.view.flxErrorTCTitle.setVisibility(true);
      }
      if(errFlag===0)
        scopeObj.editTAndC();
    };
    this.view.btnCancel.onClick = function(){
      scopeObj.view.flxEditTandCPopup.setVisibility(false);
    };
    this.view.flxTAndCClose.onClick = function(){
      scopeObj.view.flxEditTandCPopup.setVisibility(false);
    };
    this.view.flxRadioYes.onTouchStart = function(){
      if(scopeObj.view.flxURLTextBoxContainer.isVisible&&scopeObj.view.tbxURLTextbox.text.trim().length>0){
        scopeObj.view.imgUpArrow.left=scopeObj.view.flxRadioYes.frame.x+8+"px";
        scopeObj.view.rtxPopUpDisclaimer.text=kony.i18n.getLocalizedString("i18n.TermsAndConditions.URLtoTEXT");
        scopeObj.view.flxModifyType.setVisibility(true);
        scopeObj.view.flxDisableButtons.setVisibility(true);
        scopeObj.view.forceLayout();
      }
      else
        scopeObj.toggleRadio();
    };
    this.view.flxRadioNo.onTouchStart = function(){
      var contentEditorDocument=document.getElementById("iframe_rtxTnCAddEdit").contentWindow.document;
      if(scopeObj.view.flxContentRichTxtContainer.isVisible&&contentEditorDocument.getElementById("editor").innerHTML.trim().length>0){
        scopeObj.view.imgUpArrow.left=scopeObj.view.flxRadioNo.frame.x+8+"px";
        scopeObj.view.rtxPopUpDisclaimer.text=kony.i18n.getLocalizedString("i18n.TermsAndConditions.TEXTtoURL");
        scopeObj.view.flxModifyType.setVisibility(true);
        scopeObj.view.flxDisableButtons.setVisibility(true);
        scopeObj.view.forceLayout();
      }else
        scopeObj.toggleRadio();
    };
    this.view.btnAssignNo.onClick = function(){
      scopeObj.view.flxModifyType.isVisible = false;
      scopeObj.view.flxDisableButtons.setVisibility(false);
    };
    this.view.btnAssignYes.onClick = function(){
      scopeObj.toggleRadio();
      scopeObj.view.flxModifyType.isVisible = false;
      scopeObj.view.flxDisableButtons.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.btnContentCancel.onClick = function(){
      scopeObj.view.flxContentPopUp.setVisibility(false);
    };
    this.view.btnContentSavePublish.onClick = function(){
      var errFlag=scopeObj.checkFields();
      if(errFlag===0)
      	scopeObj.showSavePublishPopup();
    };
    this.view.btnContentSave.onClick = function(){
      var errFlag=scopeObj.checkFields();
      if(errFlag===0){
      	scopeObj.saveContentVersion(true);
      	scopeObj.view.flxContentPopUp.setVisibility(false);
      }
    };
    this.view.flxViewContentClose.onClick = function(){
      scopeObj.view.flxViewContent.setVisibility(false);
    };
    this.view.btnNewVersion.onClick = function(){
      scopeObj.showCreateVersion();
    };
    this.view.btnAddNewVersion.onClick = function(){
      scopeObj.showCreateVersion();
    };
    this.view.flxContentClose.onClick = function(){
      scopeObj.view.flxContentPopUp.setVisibility(false);
    };
    this.view.segVersionList.onRowClick = function(){
      scopeObj.showVersionDetails();
    };
	this.view.richtextURLValue.onClick = function(){
      var URL;
      var selItems=scopeObj.view.segVersionList.selectedItems[0];
      var link=selItems.info.split("\"");
      if(scopeObj.view.richtextURLValue.text.trim()!==""){
          URL=link[1];
      	kony.application.openURL(URL);
      }
    };
  },
   hideNoResultsFound: function() {
    this.view.flxTandCHeader.setVisibility(true);
    this.view.segTandC.setVisibility(true);
    this.view.flxNoRecordsFound.setVisibility(false);
  },
  checkFields:function(){
    var errFlag=0;
    var contentEditorDocument=document.getElementById("iframe_rtxTnCAddEdit").contentWindow.document;
    if(this.view.txtContentDescription.text.length===0){
      errFlag=-1;
      this.view.txtContentDescription.skin="sknTxtError";
      this.view.flxNoContentDescriptionError.setVisibility(true);
    }
      if(this.view.tbxURLTextbox.text.length===0&&contentEditorDocument.getElementById("editor").innerHTML.trim().length===0) {
        errFlag=-1;
        if(this.view.imgRadioYes.src=="radio_selected.png"){
          this.view.flxContentRichTxtContainer.skin="sknBorderRed";
        }else{
          this.view.tbxURLTextbox.skin="skinredbg";
        }
        this.view.lblContentErrorMessage.text=kony.i18n.getLocalizedString("i18n.TermsAndConditions.contentEmpty");
        this.view.flxContentMissingError.setVisibility(true);
      }else if(this.view.flxURLTextBoxContainer.isVisible){
        var targeturl = this.view.tbxURLTextbox.text.trim().toLowerCase();
          if (targeturl.indexOf("http:") === 0||!this.urlRegex.test(targeturl)) {
            if (targeturl.indexOf("http:") === 0) this.view.lblContentErrorMessage.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorTargetURLHttp");
            else this.view.lblContentErrorMessage.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorTargetURL");
            errFlag = false;
            this.view.tbxURLTextbox.skin="skinredbg";
            this.view.flxContentMissingError.setVisibility(true);            
          }
      }else{
        this.view.flxContentRichTxtContainer.skin="sknflxffffffop100Bordercbcdd1Radius3px";
        this.view.tbxURLTextbox.skin="skntxtbx484b5214px";
      }
    this.view.forceLayout();
    return errFlag;
  },
  showVersionDetails: function(){
    var selItems=this.view.segVersionList.selectedItems[0];
    this.view.lblViewContentHeader1.text=selItems.lblVersion!=="N/A"?"Content Version "+selItems.lblVersion+" - ":"New Content Version - ";
    this.view.lblViewContentHeader2.text=this.view.lblTitleValue.text+" -";
    this.view.lblViewContentHeader3.text=this.view.lblSelectedLanguage.text;
    this.view.fontIconActive.skin=selItems.fontIconGroupStatus.skin;
    this.view.lblViewContentDescriptionValue.text=selItems.desc;
    this.view.lblViewValue1.text=selItems.lblGroupStatus.text;
    this.view.lblViewValue1.skin=selItems.lblGroupStatus.skin;
    this.view.lblViewValue2.text=selItems.lblLastModifiedOn;
    this.view.lblViewValue3.text=selItems.lblLastModifiedBy.toolTip;
    this.view.lblViewContentTypeValue.text=selItems.lblContentType.toUpperCase();
    this.view.flxViewContent.setVisibility(true);
    if(selItems.lblContentType=="Text"){
      this.view.rtxContentViewer.setVisibility(true);
      var tncViewerDocument = document.getElementById("iframe_rtxContentViewer").contentWindow.document;
      tncViewerDocument.getElementById("viewer").innerHTML=selItems.info;
      this.view.lblURLValue.setVisibility(false);
    }else{
      this.view.lblURLValue.text=selItems.info;
      this.view.lblURLValue.setVisibility(true);
      this.view.rtxContentViewer.setVisibility(false);
    }
    this.view.forceLayout();
  },
  editTAndC: function(){
    var selItems=this.view.segTandC.selectedItems[0];
    var app;
    var inputPayload={
      "termsAndConditionsCode": this.view.txtbxTCCode.text,
      "languageCode": this.view.lblSelectedLanguage.info.code,
      "termsAndConditionsTitle": this.view.txtbxTCTitle.text,
      "termsAndConditionsDescription": this.view.txtDescription.text,
      "appPreferences":{}
    };
    for(var i=0;i<selItems.info.length;i++){
      app=selItems.info[i].appId;
      inputPayload.appPreferences[app]=selItems.info[i].isSupported;
    }
    this.presenter.editTermsAndConditions(inputPayload);
    this.view.flxEditTandCPopup.setVisibility(false);
    this.view.forceLayout();
  },
  saveContentVersion: function(isSave){
    var content;
    if(this.view.imgRadioNo.src === "radio_selected.png"){
      content=this.view.tbxURLTextbox.text;
    }else
      content=document.getElementById("iframe_rtxTnCAddEdit").contentWindow.document.getElementById("editor").innerHTML;
    var inputPayload={
      "termsAndConditionsCode": this.view.lblCodeValue.text,
      "languageCode": this.view.lblSelectedLanguage.info.code,
      "contentType": this.view.imgRadioNo.src === "radio_selected.png"?kony.i18n.getLocalizedString("i18n.TermsAndConditions.URL"):kony.i18n.getLocalizedString("i18n.TermsAndConditions.TEXT"),
      "termsAndConditionsContent":content,
      "isSave": isSave,
      "versionDescription":this.view.txtContentDescription.text
    };
    this.presenter.createTermsConditions(inputPayload);
  },
  deleteContentVer: function(){
    var deletePayload={
      "termsAndConditionsCode": this.view.lblCodeValue.text,
      "languageCode": this.view.lblSelectedLanguage.info.code
    };
    this.presenter.deleteTermsAndConditions(deletePayload);
  },
  showEditContentVersion: function(){
    var selItems=this.view.segVersionList.selectedItems[0];
    this.view.lblContentHeader2.text=this.view.lblTitleValue.text+"-";
    this.view.lblContentHeader3.text=this.view.lblSelectedLanguage.text;
    this.view.txtContentDescription.skin="skntxtAreaLato35475f14Px";
    this.view.flxNoContentDescriptionError.setVisibility(false);
    this.view.flxContentRichTxtContainer.skin="sknflxffffffop100Bordercbcdd1Radius3px";
    this.view.tbxURLTextbox.skin="skntxtbx484b5214px";
    this.view.txtContentDescription.text=selItems.desc;
    if(selItems.lblContentType=="Text"){
      this.view.imgRadioYes.src="radio_selected.png";
      this.view.imgRadioNo.src="radio_notselected.png";
      var tncEditorDocument = document.getElementById("iframe_rtxTnCAddEdit").contentWindow.document;
      tncEditorDocument.getElementById("editor").innerHTML = selItems.info;
      this.view.flxContentRichTxtContainer.setVisibility(true);
      this.view.flxURLTextBoxContainer.setVisibility(false);
    }else{
      this.view.imgRadioYes.src="radio_notselected.png";
      this.view.imgRadioNo.src="radio_selected.png";
      this.view.tbxURLTextbox.text=selItems.info;
      this.view.flxURLTextBoxContainer.setVisibility(true);
      this.view.flxContentRichTxtContainer.setVisibility(false);
    }
    this.view.flxModifyType.setVisibility(false);
    this.view.flxDisableButtons.setVisibility(false);
    this.view.flxContentMissingError.setVisibility(false);
    this.view.flxContentPopUp.setVisibility(true);
    this.view.forceLayout();
  },
  showDeleteContentPopup: function(){
    var self=this;
    this.view.tandCPopUp.lblPopUpMainMessage.text=kony.i18n.getLocalizedString("i18n.TermsAndConditions.deleteDraft");
    this.view.tandCPopUp.rtxPopUpDisclaimer.text=kony.i18n.getLocalizedString("i18n.TermsAndConditions.deleteDraftMsg");
    this.view.tandCPopUp.btnPopUpCancel.onClick = function(){
      self.view.flxTandCPopUp.isVisible =false;  
    };
    this.view.tandCPopUp.btnPopUpDelete.onClick = function(){
      self.deleteContentVer();
      self.view.flxTandCPopUp.setVisibility(false);
    };
    this.view.flxTandCPopUp.setVisibility(true);
    this.view.forceLayout();
  },
  showSavePublishPopup: function(){
    var self=this;
    this.view.tandCPopUp.lblPopUpMainMessage.text=kony.i18n.getLocalizedString("i18n.TermsAndConditions.publishContent")+" - "+this.view.lblSelectedLanguage.text;
    this.view.tandCPopUp.rtxPopUpDisclaimer.text=kony.i18n.getLocalizedString("i18n.TermsAndConditions.publishContentMsg");
    this.view.tandCPopUp.btnPopUpCancel.onClick = function(){
      self.view.flxContentPopUp.setVisibility(true);
      self.view.flxTandCPopUp.isVisible =false;  
    };
    this.view.tandCPopUp.btnPopUpDelete.onClick = function(){
      self.view.flxContentPopUp.setVisibility(false);
      self.saveContentVersion(false);
      self.view.flxTandCPopUp.setVisibility(false);
    };
    this.view.flxContentPopUp.setVisibility(false);
    this.view.flxTandCPopUp.setVisibility(true);
    this.view.forceLayout();
  },
  termsAndConditionsEditView: function(){
//     this.hideAll();
//     this.view.flxMainSubHeader.setVisibility(false);
//     this.view.flxDetailBody.setVisibility(false);
//     this.view.flxEditBody.setVisibility(true);
//     this.setEditViewData();
//     this.view.flxViewEditButton.setVisibility(false);
//     this.view.flxDetailTermsAndConditions.setVisibility(true);
//     this.view.flxEditBodyWrapper.setContentOffset({
//             y: 0,
//             x: 0
//         });
//    var selectedItem = this.view.segTandC.selecteditems[0];
//    this.view.lblTandCHeading.text=selectedItem.lblTitle;
    this.view.txtbxTCTitle.skin="skntbxLato35475f14px";
    this.view.txtDescription.skin="skntxtAreaLato35475f14Px";
    this.view.flxErrorTCTitle.setVisibility(false);
    this.view.flxNoDescriptionError.setVisibility(false);
    this.view.txtbxTCTitle.text=this.view.lblTitleValue.text;
    this.view.txtbxTCCode.text=this.view.lblCodeValue.text;
    this.view.lblAppsValue.text=this.view.lblApplicableAppsValue.text;
    this.view.flxEditTandCPopup.setVisibility(true);
    this.view.forceLayout();
    
  },
  showCreateVersion: function(){
    this.view.lblContentHeader2.text=this.view.lblTitleValue.text+"-";
    this.view.lblContentHeader3.text=this.view.lblSelectedLanguage.text;
    this.view.flxContentRichTxtContainer.skin="sknflxffffffop100Bordercbcdd1Radius3px";
    this.view.tbxURLTextbox.skin="skntxtbx484b5214px";
    this.view.imgRadioYes.src="radio_selected.png";
    this.view.imgRadioNo.src="radio_notselected.png";
    this.view.txtContentDescription.skin="skntxtAreaLato35475f14Px";
    this.view.flxNoContentDescriptionError.setVisibility(false);
    var tncEditorDocument = document.getElementById("iframe_rtxTnCAddEdit").contentWindow.document;
    tncEditorDocument.getElementById("editor").innerHTML = "";
    this.view.txtContentDescription.text="";
    this.view.flxContentRichTxtContainer.setVisibility(true);
    this.view.flxURLTextBoxContainer.setVisibility(false);
    this.view.flxModifyType.setVisibility(false);
    this.view.flxDisableButtons.setVisibility(false);
    this.view.flxContentPopUp.setVisibility(true);
    this.view.flxContentMissingError.setVisibility(false);
    this.view.flxAddEditContent.setContentOffset({y:0,x:0});
    this.view.forceLayout();
  },
  validateTnC: function() {
    var flag = true;
    var tncEditorDocument = document.getElementById("iframe_rtxTnCEdit").contentWindow.document;
    if (this.view.tbxTitle.text.trim().length === 0) {
      flag = false;
      this.view.tbxTitle.skin = "skinredbg";
      this.view.flxTitleError.setVisibility(true);
      this.view.scrollToWidget(this.view.tbxTitle);
    }
    if ((this.view.flxURLTextBox.isVisible && this.view.tbxURLcontent.text.trim().length === 0)) {
      flag = false;
      this.view.tbxURLcontent.skin = "skinredbg";
      this.view.lblContextErrorMessage.text = kony.i18n.getLocalizedString("i18n.frmTermsAndConditions.contentBlankMessage");
      this.view.flxContentError.setVisibility(true);
      this.view.scrollToWidget(this.view.tbxURLcontent);
    } else if (this.view.flxContentRichTxt.isVisible && tncEditorDocument.getElementById("editor").innerHTML.trim().length === 0) {
      flag = false;
      this.view.flxContentRichTxt.skin = "sknRedBorder";
      this.view.lblContextErrorMessage.text = kony.i18n.getLocalizedString("i18n.frmTermsAndConditions.contentBlankMessage");
      this.view.flxContentError.setVisibility(true);
      this.view.scrollToWidget(this.view.flxContentRichTxt);
    }
    return flag;
  },
  termsAndCondtionsDetailView: function(){
    var selectedItem = this.view.segTandC.selecteditems[0];
    this.hideAll();
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.TermsAndConditions.viewTandC");
    this.view.flxMainSubHeader.setVisibility(false);
    this.view.flxDetailTermsAndConditions.setVisibility(true);
    this.view.flxDetailBody.setVisibility(true);
    this.view.flxEditBody.setVisibility(false);
    this.view.flxViewEditButton.setVisibility(true);
    this.view.breadcrumbs.lblCurrentScreen.text=selectedItem.lblTitle.toUpperCase();
    this.view.flxBreadcrumb.setVisibility(true);
    this.view.lblTandCHeading.text=selectedItem.lblTitle;
    this.view.lblTitleValue.text=selectedItem.lblTitle;
    this.view.lblApplicableAppsValue.text=selectedItem.lblApplicableApps;
    this.view.lblCodeValue.text=selectedItem.lblCode;
    var data = selectedItem.data;
    this.view.forceLayout();
    this.view.flxLanguages.setVisibility(false);
    this.view.contentTypeFilter.segStatusFilterDropdown.selectedRowIndices = [[0,[0,1]]];
    this.view.statusFilter.segStatusFilterDropdown.selectedRowIndices = [[0,[0,1,2]]];
    var termsCondAppData = this.getTermsCondVersionBasedOnApp(data.apps);
    this.versionData = termsCondAppData;
    this.setVersionList(termsCondAppData);
    this.view.lblDescriptionValue.text = data.description.length===0?kony.i18n.getLocalizedString("i18n.common.NotAvailable"):data.description;
    this.view.txtDescription.text=data.description;
    this.view.flxContentTypeFilter.width = this.AdminConsoleCommonUtils.getLabelWidth("Text")+55+"px";
    this.view.flxStatusFilter.width = this.AdminConsoleCommonUtils.getLabelWidth("Archived")+55+"px";
    if(termsCondAppData && termsCondAppData.termsAndConditionsContent[this.view.lblSelectedLanguage.info.code].contentTypeId === "URL"){
      this.view.lblUrlContent.setVisibility(true);
      this.view.staticData.setVisibility(false);
      this.view.lblUrlContent.text = data.termsAndConditionsContent[this.view.lblSelectedLanguage.info.code].content; 
    }
    else{
      this.view.staticData.setVisibility(true);
      this.view.lblUrlContent.setVisibility(false);
    if(document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer")) {
      document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer").innerHTML = termsCondAppData.termsAndConditionsContent[this.view.lblSelectedLanguage.info.code].content;
    } else {
      if(!document.getElementById("iframe_rtxViewer").newOnload) {
        document.getElementById("iframe_rtxViewer").newOnload = document.getElementById("iframe_rtxViewer").onload;
      }
      document.getElementById("iframe_rtxViewer").onload = function() {
        document.getElementById("iframe_rtxViewer").newOnload();
        document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer").innerHTML ="";
      };
    }
    }
    this.view.forceLayout();
  },
  setVersionList: function(termsCondAppData){
    var res = [];
    var i;
    var temp;
    var isDraft = false;
    var lang, maxSizeText="";
    var prevLanguage = this.view.lblSelectedLanguage.info.mapData;
    if(this.view.languages.segStatusFilterDropdown.selectedRowItems){
      lang = this.view.languages.segStatusFilterDropdown.selectedRowItems[0].languageCode;
      this.view.lblSelectedLanguage.text = this.view.languages.segStatusFilterDropdown.selectedRowItems[0].lblDescription.text;
      this.view.lblSelectedLanguage.info.code = lang;
      this.view.lblSelectedLanguage.info.mapData = this.view.languages.segStatusFilterDropdown.selectedRowItems[0];
      var selectedIndex = this.view.languages.segStatusFilterDropdown.selectedRowIndex[1];
      var langSegData = this.view.languages.segStatusFilterDropdown.data;
      var updatedData = langSegData.splice(selectedIndex,1,prevLanguage);
      this.view.languages.segStatusFilterDropdown.setData(langSegData);
      for(var k=0;k<langSegData.length;k++){
        maxSizeText = langSegData[k].lblDescription.text.length > maxSizeText.length ? langSegData[k].lblDescription.text :maxSizeText;
      }
      this.view.flxLanguages.width=this.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+45+"px";
      this.view.forceLayout();
    }
    else{
      lang = this.view.lblSelectedLanguage.info.code;
    }
    if(termsCondAppData){
      for(i = 0; i < termsCondAppData.termsAndConditionsVersion.length;i++){
        if(termsCondAppData.termsAndConditionsVersion[i].languageCode === lang){
          res.push(termsCondAppData.termsAndConditionsVersion[i]);
        }
      }
      for(i = 0; i < res.length; i++){
        if(res[i].versionId === "N/A" || res[i].statusId === "DRAFT"){
          temp = res[i];
          res[i] = res[0];
          res[0] = temp;
          isDraft = true;
        }
      }
    }
    if(isDraft){
      this.view.btnNewVersion.skin = "sknbtnf7f7faLatoRegular12Px485c75Border1px485C75Radius20pxOp50";
      this.view.btnNewVersion.hoverSkin="sknbtnf7f7faLatoRegular12Px485c75Border1px485C75Radius20pxOp50";
      this.view.btnNewVersion.setEnabled(false);
    }
    else{
       this.view.btnNewVersion.skin = "sknbtnf7f7faLatoRegular12Px485c75Border1px485C75Radius20px";
      this.view.btnNewVersion.hoverSkin="sknbtnf7f7faLatoRegular12Px485c75Border1px485C75Radius20px";
      this.view.btnNewVersion.setEnabled(true);
    }
    if(res.length === 0){
      this.view.flxVersionListHeader.isVisible = false;
      this.view.segVersionList.isVisible = false;
      this.view.rtxNoVersionsFound.text = kony.i18n.getLocalizedString("i18n.TermsAndConditions.NoContentAdded") + this.view.lblSelectedLanguage.text;
      this.view.flxNoVersionsFound.isVisible = true;
      this.view.btnNewVersion.isVisible = false;
    }
    else{
      this.view.btnNewVersion.isVisible = true;
      this.view.flxVersionListHeader.isVisible = true;
      this.view.segVersionList.isVisible = true;
      this.view.flxNoVersionsFound.isVisible = false;
      var self = this;
    var dataMap = {
      "lblVersion": "lblVersion",
      "lblContentType":"lblContentType", 
      "lblLastModifiedOn": "lblLastModifiedOn",
      "lblLastModifiedBy": "lblLastModifiedBy",
      "flxStatus": "flxStatus",
      "lblGroupStatus": "lblGroupStatus",
      "fontIconGroupStatus":"fontIconGroupStatus",
      "flxEdit":"flxEdit",
      "flxDelete":"flxDelete",
      "lblEdit": "lblEdit",
      "lblDelete":"lblDelete",
      "lblSeparator": "lblSeperator",
      "flxTandCVersionList":"flxTandCVersionList"
    };
    var data1;
    var draftData = [];
    if (typeof res !== 'undefined') {
        data1 = res.map(function(versionViewData) {
          var mappedData = {
            "lblVersion": versionViewData.versionId,
            "lblContentType": versionViewData.contentTypeName,
            "lblLastModifiedOn": self.getLocaleDateAndTime(self.getDateInstanceFromDBDateTime(versionViewData.contentModifiedOn)),
            "lblLastModifiedBy": {"text":versionViewData.contentModifiedBy ? self.AdminConsoleCommonUtils.getTruncatedString(versionViewData.contentModifiedBy, 20, 17): "N/A" , "toolTip": versionViewData.contentModifiedBy},
            "lblEdit": {"text":""},
            "fontIconGroupStatus": versionViewData.statusId === "ACTIVE"? {"skin":"sknFontIconActivate"} : ((versionViewData.statusId === "DRAFT" || versionViewData.versionId === "N/A") ?{"skin":"sknFontIconSuspend"}:{"skin":"sknfontIconInactive"}),
            "lblDelete": {"text":""},
            "lblGroupStatus": versionViewData.statusId === "ACTIVE" ? {"text":"Active","skin":"sknlblLato5bc06cBold14px"}: ((versionViewData.versionId === "N/A" || versionViewData.statusId === "DRAFT")?{"text":"Draft","skin":"sknlblLato5bc06cBold14px"}:{"text":"Archived","skin":"sknlblLato5bc06cBold14px"}),                
            "lblSeperator": "-",
            "template":"flxTandCVersionList",
            "info":versionViewData.content,
            "desc":versionViewData.versionDescription || "N/A",
            "flxEdit": {
              "isVisible": (versionViewData.versionId === "N/A" || versionViewData.statusId === "DRAFT") ?true:false,
              "onClick": function () {
                self.showEditContentVersion();
              }
            },
            "flxDelete": {
              "isVisible": (versionViewData.versionId === "N/A" || versionViewData.statusId === "DRAFT") ?true:false,
              "onClick": function () {
                self.showDeleteContentPopup();
              }
            }
          };
         if(versionViewData.versionId === "N/A" || versionViewData.statusId === "DRAFT"){
           draftData.push(mappedData);
         }
         else{
           return mappedData;
         }
        });
      }
   this.resetSortImages();
   this.sortBy = this.getObjectSorter('lblVersion');
   this.sortBy.inAscendingOrder = false;
   this.determineSortFontIcon(this.sortBy,"lblVersion",this.view.lblSortVersion);
   this.view.segVersionList.widgetDataMap=dataMap;
   var filteredData = data1.filter(function(element){
     return element !== undefined;
	});
   var sortData = filteredData.sort(this.sortBy.sortData);
   this.view.segVersionList.setData(draftData.concat(sortData));
    }
   this.view.forceLayout(); 
  },
  getTermsCondVersionBasedOnApp : function(appsArr){
    var appTypeData ={},termCondObj = "";
    for(var i=0; i<appsArr.length; i++){
      appTypeData[appsArr[i].appId] = appsArr[i];
    }
    var appTypes = Object.keys(appTypeData);
    if(appTypes.indexOf("RETAIL_AND_BUSINESS_BANKING") >= 0){
      termCondObj = appTypeData["RETAIL_AND_BUSINESS_BANKING"];
    } else if(appTypes.indexOf("ONBOARDING") >= 0){
      termCondObj = appTypeData["ONBOARDING"];
    } else{
      termCondObj = appTypes.length > 0 ? appTypeData[appTypes[0]] : "";
    }
    return termCondObj;
  },
  showNoResultsFound: function() {
   this.view.flxTandCHeader.setVisibility(false);
   this.view.segTandC.setVisibility(false);
   this.view.rtxNoRecords.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + '"' + this.view.subHeader.tbxSearchBox.text.replace("<","&lt").replace(">","&gt").replace("&","&amp").replace("=","&eq").replace("alert","").split(">").join("&gt").split("<").join("&lt") + '"' + kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
   this.view.rtxNoRecords.setVisibility(true);
   this.view.flxNoRecordsFound.setVisibility(true);
  },
  resetSortImages: function(field) {
    var self = this;
    self.determineSortFontIcon(self.sortBy, 'lblTitle', this.view.lblFontTitle);
    self.determineSortFontIcon(self.sortBy, 'lblCode', this.view.lblFontCode);
    self.determineSortFontIcon(self.sortBy,"lblVersion",self.view.lblSortVersion);
    self.determineSortFontIcon(self.sortBy,"lblPublishedOn",self.view.lblFontPublishedOn);
    self.determineSortFontIcon(self.sortBy,"lblPublishedBy",self.view.lblFontPublishedBy);
  },
  onDropDownsHoverCallback:function(widget,context){
    var self=this;
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      self.view.staticData.flxSelectOptions.setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      self.view.staticData.flxSelectOptions.setVisibility(false);
    }
    self.view.forceLayout();
  },
  toggleRadio : function(){
   var scopeObj = this;
    if(scopeObj.view.flxURLTextBoxContainer.isVisible){
      scopeObj.view.tbxURLTextbox.text="";
      scopeObj.view.imgRadioYes.src = "radio_selected.png";
      scopeObj.view.imgRadioNo.src = "radio_notselected.png";
      scopeObj.view.flxURLTextBoxContainer.setVisibility(false);
      scopeObj.view.flxContentRichTxtContainer.setVisibility(true);
    }
  else {
      var tncEditorDocument = document.getElementById("iframe_rtxTnCAddEdit").contentWindow.document;
      tncEditorDocument.getElementById("editor").innerHTML = "";
	  scopeObj.view.tbxURLTextbox.text="";
      scopeObj.view.imgRadioNo.src = "radio_selected.png";
      scopeObj.view.imgRadioYes.src = "radio_notselected.png";
      scopeObj.view.flxContentRichTxtContainer.setVisibility(false);
      scopeObj.view.flxURLTextBoxContainer.setVisibility(true);
    this.view.forceLayout();
     }
    this.view.tbxURLTextbox.skin="skntxtbx484b5214px";
    this.view.flxContentRichTxtContainer.skin="sknflxffffffop100Bordercbcdd1Radius3px";
    this.view.flxContentMissingError.setVisibility(false);
    this.view.forceLayout();
  }
});
