define({

  //Type your controller code here
  newMgsIDArr : [],
  selectedFilterIndices : [0,1,2],
  resentData : [],
  willUpdateUI : function(viewModel){
    kony.print("in form controller");
    if(viewModel.action === "fromBackend"){
      this.realocateData(viewModel);
      this.view.flxRightPanel.setVisibility(true);
      this.selectedFilterIndices = [0,1,2];
    }else if(viewModel && viewModel.progressBar){
      if(viewModel.progressBar.show){
        kony.adminConsole.utils.showProgressBar(this.view);
      }else{
        kony.adminConsole.utils.hideProgressBar(this.view);
      }
    }
    else if(viewModel && viewModel.toast){
      if(viewModel.toast.show !== "success"){
        this.view.toastMessage.showErrorToastMessage("Unable to load dashboard data",this);
      }
    }else{
      this.updateLeftMenu(viewModel);
    }
  },
  formPreshow : function(){
    this.setFlowActions();
    this.view.flxAlertSegment.setVisibility(false);
    this.view.statusFilterMenu.isVisible = false;
    this.view.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.view.lblHeading.text =  this.greetingcontext()+", " + kony.mvc.MDAApplication.getSharedInstance().appContext.userFirstName;
    this.view.lblDate.text = this.convertDate();
    this.view.flxDashboard.height=kony.os.deviceInfo().screenHeight+"px";
    this.checkMakerCheckerAvailability();
    this.view.forceLayout();
  },
  greetingcontext : function(){
    var date = new Date();
    var time = date.getHours();
    if(time>=0 && time<11) {
      return kony.i18n.getLocalizedString("i18n.dashBoard.goodMorning");
    } else if(time>=11 && time<16) {
      return kony.i18n.getLocalizedString("i18n.dashBoard.goodAfternoon");
    } else {
      return kony.i18n.getLocalizedString("i18n.dashBoard.goodEvening");
    }
  },
  checkMakerCheckerAvailability : function(){
    if(kony.adminConsole.utils.clientProperties.IS_MAKER_CHECKER_AVAILABLE && kony.adminConsole.utils.clientProperties.IS_MAKER_CHECKER_AVAILABLE.toLowerCase() === "true"){
      this.view.flxRequestsTab.setVisibility(true);
    } else {
      this.view.flxRequestsTab.setVisibility(false);
    }
  },
  realocateData : function(viewModel){
    if(this.view.flxTabs.isVisible === false)
      this.view.flxAlertSegment.left = "35px";
    else
      if(viewModel.count)
        this.assigningSkins(viewModel.count);
    if(viewModel.alerts)
      this.generateDataSet(viewModel.alerts,viewModel.alertsCount);
    if(this.view.flxRightPanel.isVisible === false)
      this.view.flxRightPanel.setVisibility(true);
    if(viewModel.approvalsCount){
      this.setApprovalsHistoryCount(viewModel.approvalsCount);
    }
    this.view.forceLayout();
  },
  assigningSkins : function(viewModel){
    this.newMgsIDArr = [];
    var flagOpen = true;
    var flagInProgress = true;
    this.view.dashBoardTabAssignNew.skin = "sknFlx627cddRad5px";
    this.view.dashBoardTabAssignNew.lblImage.skin = "sknLblIcomoon28px485c75";
    this.view.dashBoardTabAssignNew.lblImage.text = ""; //icon-assign-new
    this.view.dashBoardTabAssignNew.lblCategory.skin = "sknLbl293276Bold12px";
    this.view.dashBoardTabAssignNew.lblCategory.text = "ASSIGNED NEW" ;
    this.view.dashBoardTabAssignNew.lblCount.skin = "sknLbl293276Bold26px";
    this.view.dashBoardTabInProgress.skin = "sknFlxWhiteBg";
    this.view.dashBoardTabInProgress.lblImage.skin = "sknLblIcomoon28px485c75";
    this.view.dashBoardTabInProgress.lblImage.text = ""; //icon-in-progress
    this.view.dashBoardTabInProgress.lblCategory.skin = "sknLbl485c75Bold";
    this.view.dashBoardTabInProgress.lblCategory.text = "IN PROGRESS";
    this.view.dashBoardTabInProgress.lblCount.skin = "sknLbl293276Bold26px";
    for(var i=0;i<viewModel.csrSummary.length;i++){
      if(flagOpen && viewModel.csrSummary[i].status_Description === "Open"){
        flagOpen = false;
        this.view.dashBoardTabAssignNew.lblCount.text = this.appendZero(viewModel.csrSummary[i].request_count);
      }

      if(flagInProgress && viewModel.csrSummary[i].status_Description === "In Progress"){
        flagInProgress = false;
        this.view.dashBoardTabInProgress.lblCount.text = this.appendZero(viewModel.csrSummary[i].request_count);
      }
    }
    if(flagOpen)
      this.view.dashBoardTabAssignNew.lblCount.text = this.appendZero("00");
    if(flagInProgress)
      this.view.dashBoardTabInProgress.lblCount.text = this.appendZero("00");
    this.view.lblMyQueueCount.text = this.appendZero(JSON.stringify(parseInt(this.view.dashBoardTabAssignNew.lblCount.text)+
                                                                    parseInt(this.view.dashBoardTabInProgress.lblCount.text)));

    var MgsCount = 0;
    for(var counter = 0; counter < viewModel.categorySummary.length ; counter++)
      MgsCount = MgsCount + parseInt(viewModel.categorySummary[counter].request_count);
    this.view.lblNewMessageCount.text = this.appendZero(JSON.stringify(MgsCount));

    this.view.newMessageTab1.skin = "sknFlxWhiteBg";
    this.view.newMessageTab1.lblImage.skin = "sknLblIcomoon28px485c75";
    this.view.newMessageTab1.lblImage.text = this.getTabsImages(viewModel.categorySummary[0].requestcategory_id);
    this.view.newMessageTab1.lblCategory.skin = "sknLbl485c75Bold";
    this.view.newMessageTab1.lblCategory.text = this.trimmingCategory(this.view.newMessageTab1.lblCategory , viewModel.categorySummary[0].requestcategory_Name.toUpperCase());
    this.view.newMessageTab1.lblCount.skin = "sknLbl293276Bold26px";
    this.view.newMessageTab1.lblCount.text = this.appendZero(viewModel.categorySummary[0].request_count);
    this.newMgsIDArr.push(viewModel.categorySummary[0].requestcategory_id);

    this.view.newMessageTab2.skin = "sknFlxWhiteBg";
    this.view.newMessageTab2.lblImage.skin = "sknLblIcomoon28px485c75";
    this.view.newMessageTab2.lblImage.text = this.getTabsImages(viewModel.categorySummary[1].requestcategory_id);
    this.view.newMessageTab2.lblCategory.skin = "sknLbl485c75Bold";
    this.view.newMessageTab2.lblCategory.text = this.trimmingCategory(this.view.newMessageTab2.lblCategory , viewModel.categorySummary[1].requestcategory_Name.toUpperCase());
    this.view.newMessageTab2.lblCount.skin = "sknLbl293276Bold26px";
    this.view.newMessageTab2.lblCount.text = this.appendZero(viewModel.categorySummary[1].request_count);
    this.newMgsIDArr.push(viewModel.categorySummary[1].requestcategory_id);

    this.view.newMessageTab3.skin = "sknFlxWhiteBg";
    this.view.newMessageTab3.lblImage.skin = "sknLblIcomoon28px485c75";
    this.view.newMessageTab3.lblImage.text = this.getTabsImages(viewModel.categorySummary[2].requestcategory_id);
    this.view.newMessageTab3.lblCategory.skin = "sknLbl485c75Bold";
    this.view.newMessageTab3.lblCategory.text = this.trimmingCategory(this.view.newMessageTab3.lblCategory , viewModel.categorySummary[2].requestcategory_Name.toUpperCase());
    this.view.newMessageTab3.lblCount.skin = "sknLbl293276Bold26px";
    this.view.newMessageTab3.lblCount.text = this.appendZero(viewModel.categorySummary[2].request_count);
    this.newMgsIDArr.push(viewModel.categorySummary[2].requestcategory_id);

    this.view.newMessageTab4.skin = "sknFlxWhiteBg";
    this.view.newMessageTab4.lblImage.skin = "sknLblIcomoon28px485c75";
    this.view.newMessageTab4.lblImage.text = this.getTabsImages(viewModel.categorySummary[3].requestcategory_id);
    this.view.newMessageTab4.lblCategory.skin = "sknLbl485c75Bold";
    this.view.newMessageTab4.lblCategory.text = this.trimmingCategory(this.view.newMessageTab4.lblCategory , viewModel.categorySummary[3].requestcategory_Name.toUpperCase());
    this.view.newMessageTab4.lblCount.skin = "sknLbl293276Bold26px";
    this.view.newMessageTab4.lblCount.text = this.appendZero(viewModel.categorySummary[3].request_count);
    this.newMgsIDArr.push(viewModel.categorySummary[3].requestcategory_id);
    this.view.requestsTab1.lblCategory.skin="sknLbl485c75Bold";
  },
  appendZero : function(count){
    return count.length === 1 ? "0"+count : count;
  },
  trimmingCategory: function(widget, text) {
    var final_text = text;
    if (text.length > 16) final_text = text.substr(0, 16) + "...";
    widget.toolTip = text;
    return final_text;
  },
  getTabsImages : function(text){
    var image;
    switch (text){
      case "RCID_DEPOSITS":
        image = "\ue90b";
        break;
      case "RCID_CUSTOMERSERVICE":
        image = "\ue937";
        break;
      case "RCID_LOANS":
        image = "\ue93f";
        break;
      case "RCID_CREDITCARD":
        image = "\ue938";
        break;
      case "RCID_ACCOUNTS":
        image = "\ue90d";
        break;
      case "RCID_MOBILEBANKING":
        image = "\ue943";
        break;
      case "RCID_GENERALBANKING":
        image = "\ue90c";
        break;
      case "RCID_ONLINEBANKING":
        image = "\ue909";
        break;
      case "RCID_ATM":
        image = "\ue942";
        break;
      case "RCID_DEBITCARD":
        image = "\ue942";
        break;
      case "RCID_INCORRECTDEBITORCREDITCHARGES":
        image = "\ue940";
        break;
      case "RCID_DISPUTETRANSACTION":
        image = "\ue940";
        break;
    }
    return image;
  },
  generateDataSet : function(alerts,totalAlerts){
    this.view.lblAlertCount.text = this.appendZero(JSON.stringify(totalAlerts));
    var scopeObj = this;
    var finalArr = [];
    var keyArr = Object.keys(alerts);
    for (var i = 0; i < keyArr.length; i++) {
      var tempArr = [];
      var alertsArr = alerts[keyArr[i]].map(scopeObj.mappingAlertSegment);
      tempArr = [
        {
          "sectionName" : keyArr[i],
          "sectionTemplate" : "flxHeaderDashBoardAlert"
        },
        alertsArr];
      finalArr.push(tempArr);
    }
    scopeObj.setdataToAlertSegment(finalArr);
    scopeObj.resentData = finalArr;
  },
  mappingAlertSegment : function(data){
    var priorityText = function(priority){
      var priorityText;
      if(priority === "High")
        priorityText = "";
      else if(priority === "Medium")
        priorityText = "";
      else if(priority === "Low")
        priorityText = "";
      return priorityText;
    };
    var prioritySkin = function(priority){
      var prioritySkin;
      if(priority === "High")
        prioritySkin = "sknLblIcomoonHigh";
      else if(priority === "Medium")
        prioritySkin = "sknLblIcomoonMed";
      else if(priority === "Low")
        prioritySkin = "sknLblIcomoonLow"; 
      return prioritySkin;
    };
    return{
      "lblTitle" : data.Title,
      "lblPriority" :{
        "text" : priorityText(data.Priority),
        "skin" : prioritySkin(data.Priority)
      },
      "lblCategory" : {
        "text" : data.Type.toUpperCase(),
        "skin" : data.Type === "Employee"? "sknLblLatoReg12px8080dfRad3px" : "sknLblLatoReg5cb9af12px"
      },
      "lblSubTitle" : data.Description,
      "rowTemplate" : "flxDashBoardAlert"
    };
  },
  setdataToAlertSegment : function(data){
    var dataMap = {
      "lblRecivedOn" : "sectionName",
      "lblTitle" : "lblTitle",
      "lblPriority" : "lblPriority",
      "lblCategory" : "lblCategory",
      "lblSubTitle" : "lblSubTitle",
      "flxSeprator" : "flxSeprator",
      "flxHeaderDashBoardAlert" : "sectionTemplate",
      "flxDashBoardAlert" : "rowTemplate"
    };
    this.view.segDashBoard.widgetDataMap = dataMap;
    this.view.segDashBoard.setData(data);
  },
  
  setApprovalsHistoryCount : function(countVal){
    var Response = countVal;
    this.count = countVal;
    this.pendingCount = this.appendZero(Response.pendingApprovals?Response.pendingApprovals:"0");
    this.historyCount = parseInt(Response.pendingApprovals?Response.approvalHistory:"0");
    this.view.lblRequestsCount.text = this.pendingCount+this.historyCount;
    this.view.requestsTab1.lblCount.text = this.pendingCount;
    this.view.requestsTab2.lblCount.text = this.historyCount;
  },
  
  setFlowActions : function(){
    var scopeObj = this;
    var userId = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
    this.view.lblMyQueueViewAll.onClick = function(){
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var param = [{
        "csrRepID" : userId,
        "requestAssignedTo" : userId,
        "requestStatusID" : ["SID_OPEN","SID_INPROGRESS"],
        "recordsPerPage" : 10,
        "currPageIndex" : "1",
      }];
      scopeObj.presenter.callingLeftMenu(param);
    };
    this.view.dashBoardTabAssignNew.flxClick.onClick = function(){
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var param = [{
        "csrRepID" : userId,
        "requestAssignedTo" : userId,
        "requestStatusID" : ["SID_OPEN"],
        "recordsPerPage" : 10,
        "currPageIndex" : "1",
      }];
      scopeObj.presenter.callingLeftMenu(param);
    };
    this.view.dashBoardTabInProgress.flxClick.onClick = function(){
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var param = [{
        "csrRepID" : userId,
        "requestAssignedTo" : userId,
        "requestStatusID" : ["SID_INPROGRESS"],
        "recordsPerPage" : 10,
        "currPageIndex" : "1",
      }];
      scopeObj.presenter.callingLeftMenu(param);
    };
    this.view.lblNewMeaasgeViewAll.onClick = function(){
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.presenter.callingLeftMenu("");
    };
    this.view.newMessageTab1.flxClick.onClick = function(){
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.presenter.callingLeftMenu(scopeObj.getParam(0));
    };
    this.view.newMessageTab2.flxClick.onClick = function(){
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.presenter.callingLeftMenu(scopeObj.getParam(1));
    };
    this.view.newMessageTab3.flxClick.onClick = function(){
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.presenter.callingLeftMenu(scopeObj.getParam(2));
    };
    this.view.newMessageTab4.flxClick.onClick = function(){
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.presenter.callingLeftMenu(scopeObj.getParam(3));
    };
    this.view.requestsTab1.flxClick.onClick = function(){
      scopeObj.presenter.callingApprovals(["HistoryCount:" +scopeObj.pendingCount + ":" + scopeObj.historyCount]);
    };
    this.view.requestsTab2.flxClick.onClick = function(){
      scopeObj.presenter.callingHistory(["PendingCount:"+scopeObj.pendingCount + ":" + scopeObj.historyCount]);
    };
    this.view.lblViewAll.onClick = function(){
      scopeObj.presenter.callingApprovals(["HistoryCount:" +scopeObj.pendingCount + ":" + scopeObj.historyCount]);
    };
    this.view.lblAlertFilter.onClick = function(){
      scopeObj.setDatafilterMenu();
      scopeObj.view.statusFilterMenu.onHover = scopeObj.onHoverEventCallback;
      if(scopeObj.view.statusFilterMenu.isVisible === false) {
        scopeObj.view.statusFilterMenu.setVisibility(true);
      }
    };
  },
  getParam : function(index){
    var scopeObj = this;
    return [{
      "csrRepID" : kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
      "requestStatusID" : ["SID_OPEN"],
      "recordsPerPage" : 10,
      "currPageIndex" : "1",
      "requestCategory" : scopeObj.newMgsIDArr[index]
    }];
  },
  onHoverEventCallback:function(widget, context) {
    var path = this.view.statusFilterMenu;
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      path.setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      path.setVisibility(false);
    }
  },
  setDatafilterMenu : function(){
    var data = [];
    var self = this;
    var checkBoxImage = "checkbox.png";
    data = [
      {
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": checkBoxImage,
        "lblDescription": "High"
      },
      {
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": checkBoxImage,
        "lblDescription": "Medium"
      },
      {
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": checkBoxImage,
        "lblDescription": "Low"
      }
    ];
    var widgetMap = {
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    this.view.statusFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    this.view.statusFilterMenu.segStatusFilterDropdown.setData(data);
    var finalindiciesArray = [[0,self.selectedFilterIndices]];
    this.view.statusFilterMenu.segStatusFilterDropdown.selectedRowIndices = finalindiciesArray;
    this.view.statusFilterMenu.segStatusFilterDropdown.onRowClick = function() {
      self.selectedFilterIndices = self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices !== null ?
        self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices[0][1] : [];
      self.filterData();
    };
  },
  filterData : function(){
    var targetSegmentData = this.resentData;
    var scopeObj = this;
    var filterSegmentIndexArray = this.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices !== null ? 
        						  this.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices[0][1] : 
    							  [];
    var filteredArr = [];
    var alertCount = 0;
    if (filterSegmentIndexArray.length > 0) {
      for (var i = 0; i < targetSegmentData.length; i++) {
        var subSection = targetSegmentData[i][0];
        var subArr = targetSegmentData[i][1];
        var tempArr = [];
        for (var j = 0; j < subArr.length; j++) {
          if ((filterSegmentIndexArray.indexOf(0) >= 0 && (subArr[j].lblPriority.skin === "sknLblIcomoonHigh") === (filterSegmentIndexArray.indexOf(0) >= 0)) || 
              (filterSegmentIndexArray.indexOf(1) >= 0 && (subArr[j].lblPriority.skin === "sknLblIcomoonMed") === (filterSegmentIndexArray.indexOf(1) >= 0)) || 
              (filterSegmentIndexArray.indexOf(2) >= 0 && (subArr[j].lblPriority.skin === "sknLblIcomoonLow") === (filterSegmentIndexArray.indexOf(2) >= 0))) {
            tempArr.push(subArr[j]);
            alertCount++;
          }
        }
        if(tempArr.length>0)
          filteredArr.push([subSection, tempArr]);
        scopeObj.hideNoResultFound();
      }
    }else
      scopeObj.showNoResultFound();

    this.view.lblAlertCount.text = scopeObj.appendZero(JSON.stringify(alertCount));
    this.setdataToAlertSegment(filteredArr);
  },
  showNoResultFound : function(){
    this.view.flxNoResultsFound.isVisible = true;
    this.view.segDashBoard.isVisible = false;
    this.view.rtxSearchMesg.text = "No result found";
  },
  hideNoResultFound : function(){
    this.view.flxNoResultsFound.isVisible = false;
    this.view.segDashBoard.isVisible = true;
  }
});
