define({ 
  CustomCount:0,
  totalFilters:11,
  savedFilter:"",
  deletedFilter:"",
  currentPage: 1,
  lastAppend:0,
  previousPage: 0,
  totalRecordPerPage: 20,
  idGiven:0,
  apply:true,
  searchApply:false,
  searchRecords:null,
  customFiltersData:{},
  customFilters:{},
  records:0,
  filterApplied:"",
  servicesList:null,
  sortColumn : "",
  sortDirection : "",
  totalFiltersCount : {},
  filtersSelected : {},
  transactionFilterData:{},
  adminConsoleFilterData:{},
  customerMasterData:null,
  customerObj : {},
  loadMoreModel : null,
  limitForPaginationSearch: 20,
  customersSegmentColumns : {
    "backendNames":["name","Username"],
    "frontendIcons":["lblSortExistingCustomerName","lblSortExistingCustomerUsername"]
  },
  newTransactionalLogSearch : 1,
  newAdminConsoleLogSearch : 1,
  newCustomerActivityLogSearch : 1,
  sAll : kony.i18n.getLocalizedString("i18n.frmAlertsManagement.All"),
  sSelected: kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Selected"),
  checkboxselected : "checkboxselected.png",
  checkboxnormal : "checkboxnormal.png",
  //listPrimaryFieldsNonTransactional : [["1","Event"],["2","Event Subtype"],["3","Customer ID"],["4","username"],["5","Status"],["6","Channel"],["7","Device/Browser"],["8","OS"],["9","DeviceID"],["10","IP Address"]],
  //listAddFieldsNonTransactional : [["1","Masked Card Number"],["2","Bank Name"],["3","Masked Account Number"],["4","Payee Name / Recipient Name"],["5","Account/Contact Detail"]],
  listPrimaryFieldsNonTransactional : [{id:"evt",value:"Module"},{id:"evt_subtype",value:"Activity Type"},{id:"date",value:"Date & Time"},{id:"payee_name",value:"Payee Name / Recipient Name"},{id:"acc_details",value:"Account/Relationship Number"},{id:"status",value:"Status"},{id:"mfaType",value:"MFA Type"},{id:"mfaServiceKey",value:"MFA Service Key"},{id:"mfa_state",value:"MFA State"},{id:"channel",value:"Channel"},{id:"device_browser",value:"Device/Browser"},{id:"os",value:"OS"},{id:"device_id",value:"DeviceID"},{id:"ip_address",value:"IP Address"},{id:"otherInfo",value:"Other Info"}],
  listPrimaryFieldsTransactional : [{id:"evt",value:"Module"},{id:"evt_subtype",value:"Activity Type"},{id:"date",value:"Date & Time"},{id:"from_account",value:"From Account"},{id:"to_account",value:"To Account"},{id:"amount",value:"Amount"},{id:"currency", value:"Currency"},{id:"ref_no", value:"Reference Number"},{id:"payee_name",value:"Payee Name / Recipient Name"},{id:"payee_id",value:"Payee ID"},{id:"person_id",value:"Person ID"},{id:"status",value:"Status"},{id:"mfaType",value:"MFA Type"},{id:"mfaServiceKey",value:"MFA Service Key"},{id:"mfa_state",value:"MFA State"},{id:"channel",value:"Channel"},{id:"device_browser",value:"Device/Browser"},{id:"os",value:"OS"},{id:"device_id",value:"DeviceID"},{id:"ip_address",value:"IP Address"},{id:"otherInfo",value:"Other Info"}],  
  listTransNonTrans : [{id:"evt",value:"Module"},{id:"evt_subtype",value:"Activity Type"},{id:"date",value:"Date & Time"},{id:"from_account",value:"From Account"},{id:"to_account",value:"To Account"},{id:"amount",value:"Amount"},{id:"currency", value:"Currency"},{id:"ref_no", value:"Reference Number"},{id:"payee_name",value:"Payee Name / Recipient Name"},{id:"payee_id",value:"Payee ID"},{id:"person_id",value:"Person ID"},{id:"acc_details",value:"Account/Relationship Number"},{id:"status",value:"Status"},{id:"mfaType",value:"MFA Type"},{id:"mfaServiceKey",value:"MFA Service Key"},{id:"mfa_state",value:"MFA State"},{id:"channel",value:"Channel"},{id:"device_browser",value:"Device/Browser"},{id:"os",value:"OS"},{id:"device_id",value:"DeviceID"},{id:"ip_address",value:"IP Address"},{id:"otherInfo",value:"Other Info"}],
  customerActivityModules : [],
  customerActivityTypes : " ", 
  selectedModule : "",
  selectedColumns : [],
  hasNextPage : true,
  secondaryFields : [],
  pageOffset : 0,
  transactionalSortColumn : "",
  transactionSortDirection : "",
  filterdata:[],
  filterdataemp:[],
  transactionalModules:new Map(),
  isSingleEntity: true,

  willUpdateUI : function(context){
    this.updateLeftMenu(context);
    //this.setOtherInfo({});
    var pages;
    if(context===undefined);
    else
    { 
      if (context.action === "getAllFiltersSuccess") {
        this.customFilters=context.filtersData.FilterData;
        this.customFiltersData=context.filtersData;
        if(context.showFiltersPage) {
          this.records=this.customFilters? this.customFilters.length:0;
          this.showFilteredLogs(this.customFilters,"",true);
        }
        kony.adminConsole.utils.hideProgressBar(this.view);
      }
      else if(context.action === "getAllFiltersFailure"){
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.toastMessage.showErrorToastMessage(this.errorMessage(context.filtersData),this);
      }
      else if (context.action === "getServicesList") {
        this.presenter.fetchTransactionFiltersMasterData();
        // kony.adminConsole.utils.hideProgressBar(this.view);
      }
      else if(context.action === "getServicesListFailure"){
        this.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.frmLogsController.Failed_to_fetch_SericesList"),this);
      }
      else if(context.action === "deletedFiltersSuccess"){
        this.customFilters=context.filtersData.FilterData;
        this.customFiltersData=context.filtersData;
        //this.view.flxPopUp.setVisibility(false);
        this.records=this.customFilters? this.customFilters.length:0;
        this.showFilteredLogs(this.customFilters,"",true);
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmLogsController.Deleted")+this.deletedFilter+" " +kony.i18n.getLocalizedString("i18n.frmLogsController.successfully"),this);
      }
      else if(context.action === "deletedFiltersFailure"){
        //this.view.flxPopUp.setVisibility(false);
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.frmLogsController.Delete")+this.deletedFilter+" " +this.errorMessage(context.filtersData),this);
      } 
      else if(context.action === "createFiltersSuccess"){
        //this.view.flxPopUpSaveFilter.setVisibility(false); 
        this.view.flxFiltersAndHeaders.setVisibility(false);
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.toastMessage.showToastMessage(this.savedFilter+" "+kony.i18n.getLocalizedString("i18n.frmLogsController.saved_successfully"),this);
      } 
      else if(context.action === "createFiltersFailure"){
        // this.view.flxPopUpSaveFilter.setVisibility(false); 
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.toastMessage.showErrorToastMessage(this.savedFilter+" "+this.errorMessage(context.filtersData),this);
      }
      else if(context.action === "getTransactionLogs"){
        /*kony.adminConsole.utils.hideProgressBar(this.view);
        if(context.transactionLogsData.count===0&&this.apply===true)
        {
          this.view.flxNoResultsFound.setVisibility(true);
          if(this.searchApply === true){
            this.view.flxNoResultsFound.top = "228px";}
          else
          { this.view.flxNoResultsFound.top = "165px"; }
          this.view.flxTransactionResults.setVisibility(false);
          //this.view.flxPaginationTransLog.setVisibility(false);
          this.view.forceLayout();
        }
        else
        {
          this.view.flxNoResultsFound.setVisibility(false);
          this.view.flxTransactionResults.setVisibility(true);
          //this.view.flxPaginationTransLog.setVisibility(true);
          pages = this.setPageNumbers(context.transactionLogsData.pageSize, context.transactionLogsData.count);
          this.view.forceLayout();
          if(context.transactionLogsData.logs.length < 18 && this.newTransactionalLogSearch === 0) {
            this.newTransactionalLogSearch = 1;
            this.lastAppend=1;
          }
          else {
            this.lastAppend=0;
          }
          //this.manageTransactionLogsResponse(context.transactionLogsData.logs);
        }*/
      }
      else if(context.action === "getCustomerLogsSuccess"){
        pages = this.setPageNumbers(context.pageSize, context.count);
        if(context.records.length < 8 && this.newCustomerActivityLogSearch === 0) {
          this.newCustomerActivityLogSearch = 1;
          this.lastAppend=1;
        }
        else {
          this.lastAppend=0;
        }
        this.displayCustomerActivityLogs(context) ;
        kony.adminConsole.utils.hideProgressBar(this.view);
      }
      else if(context.action === "getCustomerLogsFailure"){
        // populate master data
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.toastMessage.showErrorToastMessage(context.message,this);
        //TODO: tempotary
       /* this.view.flxCustomerDetailedResults.setVisibility(true);
        this.view.flxCustomerContent.setVisibility(true);
        this.view.forceLayout();*/
      }
      else if(context.action === "getAdminConsoleLogsSuccess"){
        kony.adminConsole.utils.hideProgressBar(this.view);
        if(context.adminConsoleLogsData.count===0&&this.apply===true)
        {
          this.view.rtxNorecords.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNoResultsFound");
          this.view.flxNoResultsFound.setVisibility(true);
          if(this.searchApply === true){
            this.view.flxNoResultsFound.top = "228px";}
          else
          { this.view.flxNoResultsFound.top = "165px"; }
          this.view.flxAdminConsoleResults.setVisibility(false);
          //this.view.flxPaginationAdminConsoleLog.setVisibility(false);
          this.view.forceLayout();
        }
        else
        {
          this.view.rtxNorecords.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNoResultsFound");
          this.view.flxNoResultsFound.setVisibility(false);
          this.view.flxAdminConsoleResults.setVisibility(true);
          //this.view.flxPaginationAdminConsoleLog.setVisibility(true);
          this.hasNextPage=context.adminConsoleLogsData.hasNextPage;
          pages = this.setPageNumbers(context.adminConsoleLogsData.pageSize,context.adminConsoleLogsData.count);
          if(context.adminConsoleLogsData.logs.length < 8 && this.newAdminConsoleLogSearch === 0) {
            this.newAdminConsoleLogSearch = 1;
            this.lastAppend=1;
          }
          else {
            this.lastAppend=0;
          }
          this.view.forceLayout();
          if(context.adminConsoleLogsData.count !== 0){
            this.setAdminConsoleLogResultSegmentData(context.adminConsoleLogsData);
          } else{
            this.view.segAdminConsoleResult.segListing.setData([]);
          }
        }
      }
      else if(context.action === "getAdminConsoleLogsFailure"){
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.toastMessage.showErrorToastMessage(context.message,this);
      }
      else if(context.action === "getTransactionFiltersMasterData"){
        this.transactionFilterData=context.filtersData;
        this.presenter.fetchAdminFiltersMasterData();
        kony.adminConsole.utils.hideProgressBar(this.view);
      }
      else if(context.action === "getAdminFiltersMasterData"){
        this.adminConsoleFilterData=context.filtersData;
        this.setModulesListBoxData(this.adminConsoleFilterData.ModuleNames);
        kony.adminConsole.utils.hideProgressBar(this.view);
        var requestFromcustomerManagement = this.presenter.getRequestFromcustomerManagement();
        if(requestFromcustomerManagement){
          this.presenter.setRequestFromcustomerManagement(null);
          this.showCustomerActivityLogs();
          this.view.searchCustomer.txtSearchParam3.text = requestFromcustomerManagement.Username;
          this.setSearchSegmentData(requestFromcustomerManagement.CustomerSegmentDetails.map(function(item){
            return {"name":item.lblName,"id":item.lblUserId,"Username":item.lblUserName};}));
            
          this.view.searchResults.segListing.selecteditems = [this.view.searchResults.segListing.data[0]];
          this.setSearchUI();
          this.customerSearchOnRowClick();
        }
      } else if(context.initialUIrender === true){
        this.initialUIrender();
      }
      else if (context.action === "getAllModulesSuccess") {         
        var modules = JSON.parse(JSON.stringify(context.modules));
        var modulesList = [];
        if(context.navigation === "TRANSACTION" || context.navigation ==="TRANSACTIONFILTER"){
        this.transactionalModules.clear();
        for (var a = 0; a < modules.length; a++) {
          	this.transactionalModules.set(modules[a].id,modules[a].Name);
        }
        this.presenter.getActivityType(context.navigation);
        }
        else{
        modulesList.push(["mAll", "All"]);
        for (var i = 0; i < modules.length; i++) {
          modulesList.push([modules[i].id, modules[i].Name]);
        }
        this.customerActivityModules = modules;
        var selectedKey=context.navigation == "CUSTOMERFROMFILTER"?this.view.listBoxSearchParamCustomer3.selectedKey :"mAll";
        this.view.listBoxSearchParamCustomer3.masterData = modulesList;
        this.view.listBoxSearchParamCustomer3.selectedKey = selectedKey;
        this.selectedModule = this.view.listBoxSearchParamCustomer3.selectedKeyValue[1];
        if (context.navigation == "CUSTOMERFROMFILTER")  this.presenter.getActivityType("CUSTOMERFROMFILTER");
        else this.presenter.getActivityType("CUSTOMER");
        }
      } else if (context.action === "getActivityTypeSuccess") {
        if (context.logType == "CUSTOMER" || context.logType == "CUSTOMERFROMFILTER") {
          var activityTypes = JSON.parse(JSON.stringify(context.activityTypes));
          var activityList = [];
          activityList.push(["sAll", "All"]);
          for (var j = 0; j < activityTypes.length; j++) {
            if (activityTypes[j].eventtypeid != "LOAN_APPLICATION") activityList.push([activityTypes[j].id, activityTypes[j].Name]);
          }
          this.customerActivityTypes = activityTypes;
          var selectedKey=context.logType == "CUSTOMERFROMFILTER"?this.view.listBoxSearchParam2.selectedKey :"sAll";
          this.view.listBoxSearchParam2.masterData = activityList;
          if(context.logType == "CUSTOMERFROMFILTER"){
            this.resetActivityTypeList();
            this.view.listBoxSearchParam2.selectedKey = selectedKey;
            this.pageOffset=0;
            this.fetchCustomerActivityLogs(true);
          }
          else{
            this.checkBoxMemberSelected();
            this.view.listBoxSearchParam2.selectedKey = selectedKey;
          }
        } else if (context.logType == "TRANSACTION") {
          var activityTypes = JSON.parse(JSON.stringify(context.activityTypes));
          var activityList = [];
          activityList.push(["ALL", "All"]);
          for (var j = 0; j < activityTypes.length; j++) {
            if (this.transactionalModules.has(activityTypes[j].eventtypeid)) activityList.push([activityTypes[j].id, activityTypes[j].Name]);
          }
          this.view.customListBoxTransactional.flxSegmentList.setVisibility(false);
          this.view.listBoxSearchParam1.masterData = activityList;
          this.view.listBoxSearchParam1.selectedKey = this.view.listBoxSearchParam1.masterData[0][0];
          this.returnColumnFieldsForTransactional();
          this.showTransactionalLogs();
          this.fetchTransactionLogs("");
        } else if(context.logType == "TRANSACTIONFILTER") {
          var selectedKey = this.view.listBoxSearchParam1.selectedKey;
          var activityTypes = JSON.parse(JSON.stringify(context.activityTypes));
          var activityList = [];
          activityList.push(["ALL", "All"]);
          for (var j = 0; j < activityTypes.length; j++) {
            if (this.transactionalModules.has(activityTypes[j].eventtypeid)) activityList.push([activityTypes[j].id, activityTypes[j].Name]);
          }
          this.view.listBoxSearchParam1.masterData = activityList;
          this.view.listBoxSearchParam1.selectedKey = selectedKey;
          var scopeObj = this;

		  var data = ["module","activity type","customer id","customer username","from account","to account","amount","currency","payee name","payee id","person id","status","channel","date and time" , "mfa type" , "mfa service type" ,
		  "mfa state","device","os","deviceid","ip address","reference number","other info"];
          var segdata = scopeObj.returnDataToMap(data);
          this.view.customListBoxTransactional.segList.setData(segdata);
          var selectedindices = [];
         // var labelText = [];
          scopeObj.view.customListBoxTransactional.imgCheckBox.src = "checkboxselected.png";
          var segdata = scopeObj.view.customListBoxTransactional.segList.data;
          for(var index = 0; index < segdata.length; index++) {
            selectedindices.push(index);
           // labelText = labelText + "," +segdata[index].lblDescription.text;
          }
          scopeObj.view.customListBoxTransactional.segList.selectedRowIndices = [[0, selectedindices]];
          //scopeObj.view.customListBoxTransactional.lblSelectedValue.tooltip = labelText;
          scopeObj.view.customListBoxTransactional.lblSelectedValue.text = segdata.length + " Selected";
          scopeObj.fetchTransactionLogs("");
        }
      } 
      else if (context.action === "searchCustomerAuditLogsResponse"){
        if(context.logType == "TRANSACTION") {
          var customerLogs = context.logs.logs;
          this.setDatatotransactionalSegment(customerLogs);
          this.hasNextPage=context.logs.hasNextPage;
        } else {
          var customerLogs = context.logs.logs;
          this.hasNextPage=context.logs.hasNextPage;
          if(customerLogs.length < 8 && this.newCustomerActivityLogSearch === 0) {
            this.newCustomerActivityLogSearch = 1;
            this.lastAppend=1;
          }
          else {
            this.lastAppend=0;
          }
          this.displayCustomerActivityLogs(context.logs) ;
          kony.adminConsole.utils.hideProgressBar(this.view);
        }
      } else if(context.action ===  "getActivityTypeFailure") {
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.toastMessage.showErrorToastMessage(context.message,this);
      } else if(context.action ===  "searchCustomerAuditLogsResponseFailure") {
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.toastMessage.showErrorToastMessage(context.message,this);
      } else if(context.action ===  "getAllModulesFailure") {
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.toastMessage.showErrorToastMessage(context.message,this);
      }
     
    }
  },

  //Type your controller code here 
  logsPreshow:function(){
    this.isSingleEntity = kony.mvc.MDAApplication.getSharedInstance().appContext.IS_SINGLE_ENTITY;
  /* if(this.isSingleEntity === false){
      this.view.flxLogDefaultTabs1.setVisibility(false);
      this.view.flxLogDefaultTabs3.setVisibility(false);
    }
    else{
      this.view.flxLogDefaultTabs1.setVisibility(true);
      this.view.flxLogDefaultTabs3.setVisibility(true);
    }*/
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.initialUIrender();
    this.setFlowActions();
    this.setTemplateDummyData();
    this.view.flxMain.height=kony.os.deviceInfo().screenHeight+"px";
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.fetchAllServicesList();
    this.pageOffset = 0;
    this.view.LogDefaultTabs.lblLog.text = "\ue947";
    this.view.LogDefaultTabs.lblLog.skin = "sknIcon90px";
    this.view.LogDefaultTabs2.lblLog.text = "\ue90e";
    this.view.LogDefaultTabs2.lblLog.skin = "sknIcon60px";
    this.view.LogDefaultTabs3.lblLog.text = "\ue924";
    this.view.LogDefaultTabs3.lblLog.skin = "sknIcon60px";
    //     this.presenter.fetchTransactionFiltersMasterData();
    //     this.presenter.fetchAdminFiltersMasterData();
    this.view.flxTransactionResults.width=kony.os.deviceInfo().screenWidth - 375 + "px";
    //this.view.flxInnerTransactionResults.width=kony.os.deviceInfo().screenWidth - 375 + "px";
    this.view.flxAdminConsoleResults.width=kony.os.deviceInfo().screenWidth - 375 + "px";
    //this.view.flxResults.width=kony.os.deviceInfo().screenWidth - 375 + "px";
    this.view.flxPaginationCustomerLog.width=kony.os.deviceInfo().screenWidth - 375 + "px";
    this.view.flxPaginationAdminConsoleLog.width = kony.os.deviceInfo().screenWidth - 375 + "px";
    //this.view.flxPaginationTransLog.width = kony.os.deviceInfo().screenWidth - 375 + "px";
    //this.view.flxInnerResults.width=kony.os.deviceInfo().screenWidth - 375 + "px";
    this.view.flxInnerAdminConsoleResults.width=kony.os.deviceInfo().screenWidth - 375 + "px";
    this.view.flxInnerAdminConsoleResults.height=kony.os.deviceInfo().screenHeight - 468 + "px";
    this.view.rtxNorecords.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNoResultsFound");
    this.view.flxNoResultsFound.width=kony.os.deviceInfo().screenWidth - 375 + "px";
    //this.view.flxTransactionResults.height= kony.os.deviceInfo().screenHeight - 418 + "px";
    //this.view.flxDetailedResultSegment.height=kony.os.deviceInfo().screenHeight - 418 + "px";
    this.view.flxSearchResultSegment.height= kony.os.deviceInfo().screenHeight - 290 +"px";
    //this.view.segTransactionResult.flxSegTransactionResults.height=kony.os.deviceInfo().screenHeight - 498 + "px";
    this.view.segAdminConsoleResult.flxSegTransactionResults.height = kony.os.deviceInfo().screenHeight - 325 + "px";
    this.view.searchResults.flxSegTransactionResults.height = kony.os.deviceInfo().screenHeight - 290 + "px";
    this.view.flxAdminConsoleResults.height = kony.os.deviceInfo().screenHeight - 250 + "px";
    //this.view.flxResults.height = kony.os.deviceInfo().screenHeight - 448 + "px";
    this.transactionalSortColumn = "";
    this.transactionSortDirection = "";
    this.view.flxTransactionLogsFilter.skin = "sknFlxBgF8F9FAbrD7D9E01pxRd3pxShd0D0D11";
    this.view.flxFilters3.skin = "sknFlxBgF8F9FAbrD7D9E01pxRd3pxShd0D0D11";
    this.view.flxAdminConsoleFilter.skin = "sknFlxBgF8F9FAbrD7D9E01pxRd3pxShd0D0D11";
    this.view.customListBoxTransactional.flxSelectedText.hoverSkin = "sknflxffffffBorderE1E5EERadius3pxPointer";
    this.view.customListboxApps.flxSelectedText.hoverSkin = "sknflxffffffBorderE1E5EERadius3pxPointer";
    this.view.flxTrasactionalFilter.setVisibility(false);
    this.view.flxAdminConsoleHeader.info=null;
  },      
  setTemplateDummyData : function(){
    var dataMap=   {
      "lblSeperator":"lblSeperator"};
    var data=
        [{"lblSeperator":"-","template" : "flxCustSearch"}];
    this.view.searchResults.segListing.widgetDataMap = dataMap;
    this.view.searchResults.segListing.setData(data);
    this.view.segAdminConsoleResult.segListing.widgetDataMap = dataMap;
    this.view.segAdminConsoleResult.segListing.setData(data);
    this.view.flxAdminConsoleResults.setContentOffset({
        x: 0,
        y: 0
      });
    this.view.forceLayout();
  },
  initialUIrender:function(){
    this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmLogsController.Logs");
    this.view.flxSystemLogsList.setVisibility(true);
    this.view.flxCustomLogsList.setVisibility(false);
    this.view.flxLogsList.setVisibility(true);
    this.view.flxCustomerActivityLog.setVisibility(false);
    this.view.flxBreadCrumbs.setVisibility(false);
    this.view.flxModifySearch.setVisibility(false);
    this.view.flxMainContent.setVisibility(false);
    this.view.flxAmountDropDown.setVisibility(false); 
    this.view.flxDropDownDetail1.setVisibility(false); 
    this.view.flxChequeImageDsplay.setVisibility(false);
    this.view.flxStatusFilter.setVisibility(false);
    this.tabUtilLabelFunction([this.view.lblTabName1,
                               this.view.lblTabName2],this.view.lblTabName1);
  },
  hideAll:function(){
    //this.view.search.tbxSearchBox.text="";
    this.view.flxSystemLogsList.setVisibility(false);
    this.view.flxBreadCrumbs.setVisibility(false);
    this.view.flxMainContent.setVisibility(false);
    this.view.flxLogsList.setVisibility(false);
    this.view.flxCustomerActivityLog.setVisibility(false);
    this.view.flxModifySearch.setVisibility(false);
    this.view.flxPopUpSaveFilter.setVisibility(false);
    this.view.flxbreadcrumbList.setVisibility(false);
    this.view.flxCustomerSearchResults.setVisibility(false);
    this.view.flxCustomerDetailedResults.setVisibility(false);
    this.view.mainHeader.btnDropdownList.setVisibility(false);
   // this.view.flxTransactionLog.setVisibility(false);
    this.view.flxAdminConsoleLog.setVisibility(false);
    this.view.flxAmountDropDown.setVisibility(false); 
    this.view.flxCustomLogsList.setVisibility(false);
    this.view.flxDropDownDetail1.setVisibility(false); 
    this.view.flxStatusFilter.setVisibility(false);
    this.view.flxStatusFilterAdmin.setVisibility(false);
    this.view.flxStatusFilterTransaction.setVisibility(false);
    this.view.flxFiltersAndHeaders.setVisibility(false);
    this.totalFiltersCount={};
    this.filtersSelected={};
  },
  hideBreadcrumbs:function(){
    var scopeObj= this;
    scopeObj.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    //     scopeObj.view.breadcrumbs.imgBreadcrumbsRight2.setVisibility(false);
    scopeObj.view.breadcrumbs.lblBreadcrumbsRight2.setVisibility(false);
    scopeObj.view.breadcrumbs.btnPreviousPage1.setVisibility(false);
    //     scopeObj.view.breadcrumbs.imgBreadcrumbsRight3.setVisibility(false);
    scopeObj.view.breadcrumbs.lblBreadcrumbsRight3.setVisibility(false);
  },
  setDeleteFunction:function(customLogTabb){
    var scopeObj=this;
    customLogTabb.flxImgCorner.onClick=function(){
      scopeObj.view.popUp.lblPopUpMainMessage.text=kony.i18n.getLocalizedString("i18n.frmLogsController.Delete")+customLogTabb.lblName.text;
      scopeObj.deletedFilter=customLogTabb.lblName.text;
      scopeObj.view.popUp.lblPopUpMainMessage.skin="sknlblLatoBold12px";
      scopeObj.view.popUp.rtxPopUpDisclaimer.text=kony.i18n.getLocalizedString("i18n.frmLogsController.delete_filtered");
      scopeObj.view.popUp.btnPopUpCancel.text=kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS"); 
      scopeObj.view.popUp.btnPopUpDelete.info={"id":customLogTabb.info.id};
      scopeObj.view.flxPopUp.setVisibility(true);
    };
  },
  setHoverSkin: function(customLogTabb) {
    customLogTabb.hoverSkin = "Copysknflxf0i3db3cb09e3745";
  },
  setOnClickFunction: function(customLogTabb) {
    var scopeObj=this;
    var StartDate, EndDate;
    customLogTabb.onClick = function(){
      if (customLogTabb.info.type.toUpperCase() === kony.i18n.getLocalizedString("i18n.frmLogsController.TRANSACTIONAL")) {
        scopeObj.showTransactionalLogs();
        if(scopeObj.transactionalModules.size===0){
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        var payLoad = {"$filter": "ActivityType eq 'TRANSACTIONAL'"};
      	scopeObj.presenter.getAllModules(payLoad,"TRANSACTIONFILTER"); 
        }
        else
          scopeObj.presenter.getActivityType("TRANSACTIONFILTER"); 
        scopeObj.view.lblSelectedAmount.text=customLogTabb.info.data.amount?customLogTabb.info.data.amount:kony.i18n.getLocalizedString("i18n.frmLogsController.Select_amount_range");
        scopeObj.view.datePickerTransaction.resetData=customLogTabb.info.data.range==="custom"?customLogTabb.info.data.date:customLogTabb.info.data.range;
        scopeObj.view.datePickerTransaction.value=customLogTabb.info.data.date;
        scopeObj.view.datePickerTransaction.rangeType=customLogTabb.info.data.range;
        scopeObj.view.listBoxSearchParam1.selectedKey=customLogTabb.info.data.type?customLogTabb.info.data.type:"all";
        var filterJSON={"FilterData":{}};
        //         if(scopeObj.view.datePickerTransaction.resetData !== kony.i18n.getLocalizedString("i18n.frmLogsController.Select_date")) {
        StartDate = customLogTabb.info.data.date.substring(0, customLogTabb.info.data.date.indexOf(" - "));
        filterJSON.FilterData.StartDate = StartDate;
        EndDate = customLogTabb.info.data.date.substring(customLogTabb.info.data.date.indexOf(" - ")+3);
        filterJSON.FilterData.EndDate = EndDate;
        // }
        var ServiceName = scopeObj.view.listBoxSearchParam1.selectedKeyValue[1];
        if(ServiceName != kony.i18n.getLocalizedString("i18n.frmLogsController.all")) {
          filterJSON.FilterData.ServiceName = ServiceName;
        }
        var selectedAmount = scopeObj.view.lblSelectedAmount.text;
        if(selectedAmount != kony.i18n.getLocalizedString("i18n.frmLogsController.Select_amount_range")) {
          var StartAmount = selectedAmount.substring(0, selectedAmount.indexOf("-"));
          filterJSON.FilterData.StartAmount = StartAmount;
          var EndAmount = selectedAmount.substring(selectedAmount.indexOf("-")+1);
          filterJSON.FilterData.EndAmount = EndAmount;
        }        
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
      } 
      else if(customLogTabb.info.type.toUpperCase()===kony.i18n.getLocalizedString("i18n.frmLogsController.ADMIN_CONSOLE"))
      {
        scopeObj.showAdminConsoleLogs();
        var filterDataJSON={"FilterData":{}};
        scopeObj.view.datePickerAdminConsole.resetData=customLogTabb.info.data.range==="custom"?customLogTabb.info.data.date:customLogTabb.info.data.range;
        scopeObj.view.datePickerAdminConsole.value=customLogTabb.info.data.date;
        scopeObj.view.datePickerAdminConsole.rangeType=customLogTabb.info.data.range;
        scopeObj.view.listBoxSearchParam1.selectedKey=customLogTabb.info.data.type?customLogTabb.info.data.type:kony.i18n.getLocalizedString("i18n.frmLogsController.Select");
        scopeObj.view.listBoxSearchParamAdmin1.selectedKey=customLogTabb.info.data.module?customLogTabb.info.data.module:"All";
        StartDate = customLogTabb.info.data.date.substring(0, customLogTabb.info.data.date.indexOf(" - "));
        filterDataJSON.FilterData.StartDate = StartDate;
        EndDate = customLogTabb.info.data.date.substring(customLogTabb.info.data.date.indexOf(" - ")+3);
        filterDataJSON.FilterData.EndDate = EndDate;
        var moduleName = scopeObj.view.listBoxSearchParamAdmin1.selectedKeyValue[1];
        if(moduleName != "All") {
          filterDataJSON.FilterData.ModuleName  = moduleName;
        }
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.presenter.fetchAdminConsoleLogs(filterDataJSON);
      }
      else if(customLogTabb.info.type.toUpperCase()===kony.i18n.getLocalizedString("i18n.frmLogsController.CUSTOMER_ACTIVITY"))
      {
        scopeObj.customerObj.username = customLogTabb.info.data.userName;
        scopeObj.customerObj.name = customLogTabb.info.data.name;
        scopeObj.customerObj.id = customLogTabb.info.data.id ;
        var isMemberActivity = customLogTabb.info.data.isMemberActivity ;
        scopeObj.view.datePickerCustomerLog.resetData=customLogTabb.info.data.date?(customLogTabb.info.data.range==="custom"?customLogTabb.info.data.date:customLogTabb.info.data.range):kony.i18n.getLocalizedString("i18n.frmLogsController.Select_date");
        scopeObj.view.datePickerCustomerLog.rangeType=customLogTabb.info.data.range;
        scopeObj.view.datePickerCustomerLog.value = customLogTabb.info.data.date ;
        if(customLogTabb.info.data.moduleName){
          scopeObj.view.listBoxSearchParamCustomer3.selectedKey = customLogTabb.info.data.moduleName ;
        }
        scopeObj.filtersSelected = {};
        scopeObj.view.tbxCustomerSearchBox.text = "" ;
        scopeObj.view.imgRadioApplicant.src = isMemberActivity ? "radio_notselected.png" : "radio_selected.png";
        scopeObj.view.imgRadioExistingCustomer.src = isMemberActivity ? "radio_selected.png" : "radio_notselected.png";
        scopeObj.hideAll();
        scopeObj.view.flxTransactionLog.setVisibility(false);
        scopeObj.view.flxTrasactionalFilter.setVisibility(false);
        scopeObj.view.breadcrumbs.btnPreviousPage.setVisibility(false);
        scopeObj.view.breadcrumbs.lblBreadcrumbsRight2.setVisibility(false);
        scopeObj.view.breadcrumbs.btnPreviousPage1.setVisibility(false);
        scopeObj.view.breadcrumbs.lblBreadcrumbsRight3.setVisibility(false); 
        scopeObj.view.flxLogsList.setVisibility(false);
        scopeObj.view.listBoxSearchParam2.selectedKey = customLogTabb.info.data.activityType ;
        var payLoad = {"$filter": "ActivityType eq 'CUSTOMER' or ActivityType eq 'TRANSACTIONAL'"};
      	scopeObj.presenter.getAllModules(payLoad,"CUSTOMERFROMFILTER"); 
      }
      scopeObj.view.breadcrumbs.btnBackToMain.text=kony.i18n.getLocalizedString("i18n.Logs.myFilteredLogs");
      scopeObj.view.flxCurrent.width=kony.flex.USE_PREFFERED_SIZE;
      scopeObj.view.flxCurrent.skin="slFbox";
      scopeObj.view.lblCurrentScreen.text=customLogTabb.lblName.text.toUpperCase();
      //       scopeObj.view.imgBreadcrumbsDown.setVisibility(false);
      scopeObj.view.lblBreadcrumbsDown.setVisibility(false);
    };
  },
  setCustomLogs:function(filters){
    if(filters)
    {
      this.totalFilters=filters.length;
      this.CustomCount=0;
      var width = kony.os.deviceInfo().screenWidth - 360 + "px";
      var widthOfFlex = kony.os.deviceInfo().screenWidth - 360;
      var widthPerLog = 290;
      this.view.flxMainList.width = width;
      var customLogTabb;
      var noOfSavedFilters = this.totalFilters;
      var count = noOfSavedFilters;
      var noOfColumns = Math.floor(widthOfFlex / widthPerLog);
      var noOfRows = Math.ceil(noOfSavedFilters / noOfColumns);
      var eachTabWidth = Math.floor(((widthOfFlex - ((widthPerLog+15) * noOfColumns)) / noOfColumns))+ widthPerLog;
      var top = 0;
      outer: for (var i = 0; i < noOfRows; i++) {
        var left = 15;
        for (var j = 0; j < noOfColumns; j++) {
          customLogTabb = new com.adminConsole.logs.LogCustomTabs({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "130px",
            "id": "customLogTab" + this.CustomCount,
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": j === 0 ? "15px" : left + "px",
            "masterType": constants.MASTER_TYPE_DEFAULT,
            "skin": "sknflxffffffop100dbdbe6Radius3px",
            "top": i === 0 ? "0px" : top + "px",
            "width": eachTabWidth + "px"
          }, {}, {});
          customLogTabb.lblLogHeading.text=filters[this.CustomCount].LogType;//kony.i18n.getLocalizedString("i18n.frmLogsController.Transactional") + this.CustomCount;
          customLogTabb.lblName.text = filters[this.CustomCount].Name;//kony.i18n.getLocalizedString("i18n.frmLogsController.Transaction_Log") + this.CustomCount;
          customLogTabb.lblLogDesc.text = filters[this.CustomCount].Description;//kony.i18n.getLocalizedString("i18n.frmLogsController.Transactional_Log_descriptions") + this.CustomCount;
          var date = filters[this.CustomCount].createdOn.substring(0,10).split("-");  
          customLogTabb.lblDate.text = date[1]+"-"+date[2]+"-"+date[0].substring(2,4); 
          //this.setHoverSkin(customLogTabb);
          customLogTabb.info = {"id":filters[this.CustomCount].id,"type":filters[this.CustomCount].LogType,"data":JSON.parse(filters[this.CustomCount].ViewData)}; 
          this.setOnClickFunction(customLogTabb);
          this.setDeleteFunction(customLogTabb);
          this.view.flxMainList.add(customLogTabb);
          this.view.flxMainList["customLogTab" + this.CustomCount].hoverSkin = "tabsHoverSkin";    
          this.CustomCount++;
          customLogTabb = {};
          left = left + eachTabWidth + 15;
          count--;
          if (!count) {
            break outer;
          }
        }
        top = top + 145;
      }
    }
  },
  clearSaveFilterPopUpData:function(){
    var scopeObj=this;
    scopeObj.view.popUpSaveFilter.lblNameSize.text="0/60";
    scopeObj.view.popUpSaveFilter.lbldescriptionSize.text="0/70";
    scopeObj.view.popUpSaveFilter.txtfldName.text="";
    scopeObj.view.popUpSaveFilter.txtareaDescription.text="";
    scopeObj.view.popUpSaveFilter.lblNameSize.setVisibility(false);
    scopeObj.view.popUpSaveFilter.lbldescriptionSize.setVisibility(false); 
    scopeObj.view.popUpSaveFilter.flxPopUp.top="150px";
    scopeObj.view.popUpSaveFilter.txtfldName.skin="skntxtbxDetails0bbf1235271384a";
    scopeObj.view.popUpSaveFilter.lblNoNameError.skin="sknErrorTransparent";
    scopeObj.view.popUpSaveFilter.lblNoNameError.text="";
    scopeObj.view.forceLayout();
    scopeObj.view.flxPopUpSaveFilter.setVisibility(true);
  },
  showFilteredLogs:function(filtersData,key,isAllSelected){
    var scopeObj=this;
    if(filtersData)
    {
      scopeObj.totalFilters=filtersData.length;
    }
    if(scopeObj.totalFilters>5|| key===kony.i18n.getLocalizedString("i18n.frmLogsController.search"))
    {
      scopeObj.view.flxScrollableList.height="355px";
      scopeObj.view.flxScrollableList.top="91px";
      scopeObj.view.flxAllTypes.setVisibility(true);
      scopeObj.view.search.setVisibility(true);
      scopeObj.view.flxNoRecords.setVisibility(false);
      scopeObj.view.flxScrollableList.setVisibility(true);   
    }
    else if(scopeObj.totalFilters===0)
    {
      scopeObj.view.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmLogsController.No_results_found");
      scopeObj.view.flxNoRecords.top = "45px";
      scopeObj.view.flxNoRecords.setVisibility(true);
      scopeObj.view.flxAllTypes.setVisibility(false);
      scopeObj.view.search.setVisibility(false);
      scopeObj.view.flxScrollableList.setVisibility(false);
    }
    else
    {
      scopeObj.view.flxNoRecords.setVisibility(false);
      scopeObj.view.flxScrollableList.height="400px";
      scopeObj.view.flxScrollableList.top="45px";         
      scopeObj.view.flxAllTypes.setVisibility(false);
      scopeObj.view.search.setVisibility(false);
      scopeObj.view.flxScrollableList.setVisibility(true);
    }
    scopeObj.view.flxMainList.removeAll();
    scopeObj.setCustomLogs(filtersData);
    scopeObj.view.flxLogsList.setVisibility(true);
    scopeObj.view.flxSystemLogsList.setVisibility(false);
    scopeObj.view.flxCustomLogsList.setVisibility(true);
    kony.adminConsole.utils.hideProgressBar(scopeObj.view);
    scopeObj.tabUtilLabelFunction([scopeObj.view.lblTabName1,
                                   scopeObj.view.lblTabName2],scopeObj.view.lblTabName2);
    if(isAllSelected){
      scopeObj.filterApplied="";
      scopeObj.selectFlxAllTypes();
    }

  },
  hideAllTransactionHeaders:function(){
    var scopeObj=this;
    scopeObj.view.flxTransactionResultHeader.setVisibility(false);
  },
  showTransactionalLogs:function(){
    var scopeObj=this;
    scopeObj.hideAll();
    scopeObj.view.flxTransactionLog.setVisibility(true);
    scopeObj.view.flxInnerTransactionResults.setVisibility(false);
    scopeObj.view.rtxNorecords.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNoResultsFound");
    scopeObj.view.flxNoResultsFound.setVisibility(false);
    scopeObj.view.flxFilters.setVisibility(true);
    scopeObj.view.flxMainContent.setVisibility(true);
    scopeObj.hideAllTransactionHeaders();
    scopeObj.view.flxTransactionResultHeader.setVisibility(true);
    scopeObj.view.lblSelectedAmount.text=kony.i18n.getLocalizedString("i18n.frmLogsController.Select_amount_range");
    scopeObj.view.datePickerTransaction.resetData="Today";
    scopeObj.view.datePickerTransaction.rangeType="Today";
    scopeObj.view.datePickerTransaction.value=scopeObj.getTodaysFormattedDate()+" - "+scopeObj.getTodaysFormattedDate();
    //scopeObj.view.flxInnerTransactionResult.setVisibility(true);
    scopeObj.view.flxMainContent.top="120px";
    scopeObj.view.flxBreadCrumbs.setVisibility(true);
    scopeObj.lastAppend=0;
    scopeObj.view.tbxTransactionSearch.text = "";
    scopeObj.sortColumn = "";
    scopeObj.sortDirection = "";
    scopeObj.transactionalSortColumn = "";
    scopeObj.transactionSortDirection = "";
    scopeObj.resetSortImages();
    scopeObj.totalFiltersCount = {};
    scopeObj.filtersSelected = {};
    scopeObj.hideBreadcrumbs();
    scopeObj.view.breadcrumbs.btnBackToMain.text=kony.i18n.getLocalizedString("i18n.frmLogsController.SYSTEM_LOGS");
    scopeObj.view.lblCurrentScreen.text=kony.i18n.getLocalizedString("i18n.frmLogsController.TRANSACTIONAL");
    scopeObj.view.flxCurrent.width="126px";
    scopeObj.view.flxCurrent.skin="CopyslFbox0efc73ba91cad4b";
    scopeObj.view.lblBreadcrumbsDown.setVisibility(true);
    scopeObj.view.flxCloseCal1.setVisibility(false);
    scopeObj.view.flxAmountClose.setVisibility(false);
    scopeObj.view.selectAmount.txtbxToAmount.text="";
    scopeObj.view.selectAmount.txtbxFromAmount.text="";
    scopeObj.view.selectAmount.flxSelect.hoverSkin="sknDisableCursor";
    scopeObj.apply=true;
    scopeObj.searchApply=false;
    scopeObj.view.lblAmountCurrencySymbol.text = scopeObj.defaultCurrencyCode();
    scopeObj.view.flxTrasactionalFilter.setVisibility(false);
    scopeObj.view.flxAminConsoleFilterContainer.setVisibility(false);
    scopeObj.view.flxFiltersAndHeaders.setVisibility(false);
    scopeObj.view.customListBoxTransactional.flxSegmentList.setVisibility(false);
    scopeObj.view.mainHeader.btnDropdownList.setVisibility(true);
    scopeObj.view.forceLayout();
  },
  showAdminConsoleLogs:function(){
    var scopeObj=this;
    scopeObj.hideAll();
    scopeObj.view.rtxNorecords.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNoResultsFound");
    scopeObj.view.flxNoResultsFound.setVisibility(false);
    scopeObj.view.flxAdminConsoleResults.setVisibility(false);
    //     scopeObj.view.imgStatus2.src="img_down_arrow.png";
    //scopeObj.view.lblIconStatus2.text = "\ue915";
    scopeObj.view.flxFilters2.setVisibility(true);
    scopeObj.view.flxMainContent.setVisibility(true);
    scopeObj.view.datePickerAdminConsole.resetData="Today";
    scopeObj.view.datePickerAdminConsole.rangeType="Today";
    scopeObj.view.datePickerAdminConsole.value=scopeObj.getTodaysFormattedDate()+" - "+scopeObj.getTodaysFormattedDate();
    scopeObj.view.listBoxSearchParamAdmin1.selectedKey = scopeObj.view.listBoxSearchParamAdmin1.selectedKeyValue[0];
    scopeObj.view.flxMainContent.top="120px";
    scopeObj.view.flxAdminConsoleLog.setVisibility(true);
    scopeObj.view.flxBreadCrumbs.setVisibility(true);
    scopeObj.view.tbxAdminConsoleSearch.text = "";
    scopeObj.sortColumn = "";
    scopeObj.sortDirection = "";
    scopeObj.totalFiltersCount = {};
    scopeObj.filtersSelected = {};
    scopeObj.resetSortImagesAdmin();
    scopeObj.hideBreadcrumbs();
    scopeObj.view.breadcrumbs.btnBackToMain.text=kony.i18n.getLocalizedString("i18n.frmLogsController.SYSTEM_LOGS");
    scopeObj.view.lblCurrentScreen.text=kony.i18n.getLocalizedString("i18n.frmLogsController.ADMIN_CONSOLE");
    scopeObj.view.flxCurrent.width="125px";
    scopeObj.view.flxCurrent.skin="CopyslFbox0efc73ba91cad4b";
    scopeObj.view.lblBreadcrumbsDown.setVisibility(true);
    scopeObj.apply=true;
    scopeObj.searchApply=false;
    scopeObj.view.flxCloseCal2.setVisibility(false);
    scopeObj.view.flxTrasactionalFilter.setVisibility(false);
    scopeObj.view.flxAminConsoleFilterContainer.setVisibility(false);
    scopeObj.view.flxFiltersAndHeaders.setVisibility(false);
    scopeObj.view.mainHeader.btnDropdownList.setVisibility(true);
    scopeObj.view.flxAminConsoleFilterContainer.setVisibility(false);
    scopeObj.view.forceLayout();
  },
  showCustomerActivityLogs:function(){
    var scopeObj=this;
    scopeObj.hideAll();
    scopeObj.view.rtxNorecords.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNoResultsFound");
    scopeObj.view.flxNoResultsFound.setVisibility(false);
    scopeObj.view.flxFilters3.setVisibility(true);
    scopeObj.view.flxCustomerActivityLog.setVisibility(true);
    scopeObj.view.flxBreadCrumbs.setVisibility(true);
    scopeObj.view.datePickerCustomerLog.resetData="Today"; 
    scopeObj.view.datePickerCustomerLog.rangeType="Today"; 
    scopeObj.view.datePickerCustomerLog.value = scopeObj.getTodaysFormattedDate()+" - "+scopeObj.getTodaysFormattedDate();
    scopeObj.view.listBoxSearchParamCustomer3.selectedKey="mAll";
    scopeObj.view.listBoxSearchParam2.selectedKey="sAll";
    scopeObj.view.breadcrumbs.btnBackToMain.text=kony.i18n.getLocalizedString("i18n.frmLogsController.SYSTEM_LOGS");
    scopeObj.view.lblCurrentScreen.text=kony.i18n.getLocalizedString("i18n.frmLogs.lblCustomerSpecificLogs").toUpperCase();
    scopeObj.hideBreadcrumbs();
    scopeObj.view.imgRadioApplicant.src = "radio_notselected.png";
    scopeObj.view.imgRadioExistingCustomer.src = "radio_selected.png";
    scopeObj.view.searchButtons.btnSave.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SEARCH");
    scopeObj.view.searchButtons.btnCancel.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.RESET");
    scopeObj.view.searchCustomer.txtSearchParam1.placeholder = kony.i18n.getLocalizedString("i18n.Logs.CustomerFirstname");
    scopeObj.view.searchCustomer.txtSearchParam1.text="";
    scopeObj.view.searchCustomer.txtSearchParam2.text="";
    scopeObj.view.searchCustomer.txtSearchParam3.text="";
    scopeObj.view.lblBreadcrumbsDown.setVisibility(true);
    scopeObj.view.flxCurrent.width=kony.flex.USE_PREFFERED_SIZE;
    scopeObj.view.flxCurrent.skin="CopyslFbox0efc73ba91cad4b";
    scopeObj.view.flxCloseCal3.setVisibility(false);
    scopeObj.view.searchCustomer.imgSearchError.setVisibility(false);
    scopeObj.view.searchCustomer.lblSearchError.setVisibility(false);
    scopeObj.apply=true;
    scopeObj.searchApply=false;
    scopeObj.view.forceLayout();
  },
  filterTransactionalLogsServices : function(service) {
    if (service.Type_id === "SER_TYPE_TRNS") {
      return true;
    } else {
      return false;
    }
  },
  setModulesListBoxData: function(data) {
    var category = [];
    var listData = data.sort();
    category.push([kony.i18n.getLocalizedString("i18n.frmLogsController.Select"),"All"]);
    for(var i=0 ; i<listData.length; i++) {
      category.push([""+i, listData[i]]);
    }
    this.view.listBoxSearchParamAdmin1.masterData = category;
    this.view.listBoxSearchParamAdmin1.selectedKey = kony.i18n.getLocalizedString("i18n.frmLogsController.Select");
    this.view.forceLayout();
  },
  showTransactionCheque:function()
  {
    var scopeObj=this;
    scopeObj.view.flxChequeImageDsplay.setVisibility(true);
  },
  setFilterAdminSegmentData:function(data, filterType)
  {
    var self = this;
    if(this.filterdata.length===0){
      this.filterdata=data;
      this.filterdataemp=data;
    }
    var widgetMap = {
      "Status_id": "Status_id",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };

    var filterSelectedIndex = [[0,[]]];
    var records = [];
    var maxSizeText="";
    var clickFunc = function(){
      self.optionsMenuAdminConsole(filterType);
    };
    for(var i=0;i<data.length;i++)
    {
      var filterDescription = data[i];
      if (self.totalFiltersCount[filterType] && !self.totalFiltersCount[filterType].contains(filterDescription)) {
        self.filtersSelected[filterType].push(filterDescription);
        self.totalFiltersCount[filterType].push(filterDescription);
      } else if (self.totalFiltersCount[filterType] === undefined) {
        self.filtersSelected[filterType] = [];
        self.filtersSelected[filterType].push(filterDescription);
        self.totalFiltersCount[filterType] = [];
        self.totalFiltersCount[filterType].push(filterDescription);
      }
      if (self.filtersSelected[filterType] && self.filtersSelected[filterType].contains(filterDescription)) {
        filterSelectedIndex[0][1].push(self.totalFiltersCount[filterType].indexOf(filterDescription));
      }
      maxSizeText= maxSizeText.length<filterDescription.length?filterDescription: maxSizeText;
      var row = {
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkboxselected.png",
        "lblDescription": filterDescription,
        "onClick": clickFunc,
      };
      records.push(row);
    }
    self.view.statusFilterMenuAdmin.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.statusFilterMenuAdmin.segStatusFilterDropdown.setData(records);
    self.view.statusFilterMenuAdmin.segStatusFilterDropdown.selectedIndices = filterSelectedIndex;
    self.view.flxStatusFilterAdmin.width=self.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+65+"px";

    self.view.forceLayout();
  }, 

  setFilterTransactionSegmentData:function(data, filterType)
  {
    var self = this;
    var widgetMap = {
      "Status_id": "Status_id",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var filterSelectedIndex = [
      [0, []]
    ];
    var records = [];
    var clickFunc = function(){
      self.optionsMenu(filterType);
    };
    for(i=0;i<data.length;i++)
    {
      var filterDescription = data[i];
      if (self.totalFiltersCount[filterType] && !self.totalFiltersCount[filterType].contains(filterDescription)) {
        self.filtersSelected[filterType].push(filterDescription);
        self.totalFiltersCount[filterType].push(filterDescription);
      } else if (self.totalFiltersCount[filterType] === undefined) {
        self.filtersSelected[filterType] = [];
        self.filtersSelected[filterType].push(filterDescription);
        self.totalFiltersCount[filterType] = [];
        self.totalFiltersCount[filterType].push(filterDescription);
      }
      if (self.filtersSelected[filterType] && self.filtersSelected[filterType].contains(filterDescription)) {
        filterSelectedIndex[0][1].push(self.totalFiltersCount[filterType].indexOf(filterDescription));
      }

      var row = {
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkboxselected.png",
        "lblDescription": filterDescription,
        "onClick": clickFunc
      }; 
      records.push(row);
    }
    self.view.statusFilterMenuTransaction.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.statusFilterMenuTransaction.segStatusFilterDropdown.setData(records);
    self.view.statusFilterMenuTransaction.segStatusFilterDropdown.selectedIndices = filterSelectedIndex;
    self.view.forceLayout();
  },
  onHoverEventCallback:function(widget, context) {
    var scopeObj = this;
    var path = null;
    if(widget.id === "flxTypesList")
      path = this.view.flxTypesList;
    else if(widget.id === "flxbreadcrumbList")
      path = this.view.flxbreadcrumbList;
    else if(widget.id === "flxAmountDropDown")
      path = this.view.flxAmountDropDown;
    if (path&&(context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE)) {
      path.setVisibility(true);
    } else if (path&&context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      path.setVisibility(false);
    }
  },

  onHoverEventCallbackAmountDropDown:function(widget, context) {
    var scopeObj = this;
    var path = null;
    path = this.view.flxAmountDropDown;
    if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      path.setVisibility(false);
    }
  },

  optionsCustomerFilterMenu : function(filterType) {
    kony.print("Inside optionsCustomerFilterMenu() of frmLogsController");
    var scopeObj = this;
    var selectedItems = this.view.statusFilterMenu.segStatusFilterDropdown.selectedItems;
    scopeObj.filtersSelected[filterType] = [];
    if(selectedItems !== null && selectedItems !== undefined) {
      for(var i=0; i<selectedItems.length; ++i) {
        var filterDescription = selectedItems[i].lblDescription;
        scopeObj.filtersSelected[filterType].push(filterDescription); 
      }
    }
  },

  optionsMenu : function(filterType) {
    kony.print("Inside optionsMenu() of frmLogsController");
    var scopeObj = this;

    var selectedItems = this.view.statusFilterMenuTransaction.segStatusFilterDropdown.selectedItems;

    scopeObj.filtersSelected[filterType] = [];
    if(selectedItems !== null && selectedItems !== undefined) {
      for(var i=0; i<selectedItems.length; ++i) {
        var filterDescription = selectedItems[i].lblDescription;
        scopeObj.filtersSelected[filterType].push(filterDescription); 
      }
    }

    kony.print("filtersSelected: "+JSON.stringify(scopeObj.filtersSelected));
  },

  optionsMenuAdminConsole : function(filterType) {
    kony.print("Inside optionsMenuAdminConsole() of frmLogsController");
    var scopeObj = this;

    var selectedItems = this.view.statusFilterMenuAdmin.segStatusFilterDropdown.selectedItems;

    scopeObj.filtersSelected[filterType] = [];
    if(selectedItems!==null&&selectedItems!==undefined)
    {
      for(var i=0; i<selectedItems.length; ++i) {
        var filterDescription = selectedItems[i].lblDescription;
        scopeObj.filtersSelected[filterType].push(filterDescription); 
      }
    }
    kony.print("filtersSelected: "+JSON.stringify(scopeObj.filtersSelected));
    scopeObj.filterdataemp = scopeObj.filtersSelected[filterType];
  },

  onFilterHoverEventAdminConsoleCallback : function(widget, context) {
    var scopeObj = this;

    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      scopeObj.view.flxStatusFilterAdmin.setVisibility(true);
    }
    else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      scopeObj.view.flxStatusFilterAdmin.setVisibility(false);
      if(JSON.stringify(scopeObj.filterdata)!==JSON.stringify(scopeObj.filterdataemp)){
        scopeObj.filterdata=scopeObj.filterdataemp;
        scopeObj.fetchAdminConsoleLogsByFilter();

      }
    }
  },
  onFilterHoverEventCallback : function(widget, context) {
    var scopeObj = this;

    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      scopeObj.view.flxStatusFilterTransaction.setVisibility(true);
    }
    else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      scopeObj.view.flxStatusFilterTransaction.setVisibility(false);
      scopeObj.fetchTransactionalLogsByFilter();
    }
  },

  checkBoxMemberSelected:function()
  {
    var scopeObj=this;
    scopeObj.view.imgRadioApplicant.src = "radio_notselected.png";
    scopeObj.view.imgRadioExistingCustomer.src = "radio_selected.png";
    scopeObj.view.tbxCustomerSearchBox.text = "";
    scopeObj.view.datePickerCustomerLog.value = "" ;
    scopeObj.view.listBoxSearchParamCustomer3.selectedKey="mAll";
    scopeObj.resetActivityTypeList();
    scopeObj.view.datePickerCustomerLog.resetData = "Today";
    scopeObj.view.datePickerCustomerLog.rangeType="Today"; 
    scopeObj.view.datePickerCustomerLog.value = scopeObj.getTodaysFormattedDate()+" - "+scopeObj.getTodaysFormattedDate() ;
    scopeObj.filtersSelected = {};
    scopeObj.totalFiltersCount = {};
    scopeObj.view.flxCloseCal3.setVisibility(false);
    scopeObj.pageOffset=0;
    scopeObj.fetchCustomerActivityLogs(true);
    scopeObj.view.flxFiltersAndHeaders.setVisibility(false);
    scopeObj.view.forceLayout();  
  },
  checkBoxAdminSelected:function()
  {
    var scopeObj=this;
    scopeObj.view.flxCloseCal3.setVisibility(false);
    scopeObj.view.imgRadioExistingCustomer.src = "radio_notselected.png";
    scopeObj.view.imgRadioApplicant.src = "radio_selected.png";
    scopeObj.view.tbxCustomerSearchBox.text = "";
    scopeObj.view.datePickerCustomerLog.value = "" ;
    scopeObj.view.listBoxSearchParamCustomer3.selectedKey="mAll";
    scopeObj.resetActivityTypeList();
    scopeObj.view.datePickerCustomerLog.resetData = "Today";
    scopeObj.view.datePickerCustomerLog.rangeType="Today"; 
    scopeObj.view.datePickerCustomerLog.value =scopeObj.getTodaysFormattedDate()+" - "+scopeObj.getTodaysFormattedDate() ;
    scopeObj.filtersSelected = {};
    scopeObj.totalFiltersCount = {};
    scopeObj.pageOffset=0;
    scopeObj.fetchCustomerActivityLogs(true);
    scopeObj.view.flxFiltersAndHeaders.setVisibility(false);
    scopeObj.view.forceLayout(); 
  },
  customerSearchOnRowClick: function(){
    var scopeObj=this;
    kony.adminConsole.utils.showProgressBar(scopeObj.view);
    scopeObj.customerObj.username = scopeObj.view.searchResults.segListing.selecteditems[0].lblUserName  ;
    scopeObj.customerObj.name = scopeObj.view.searchResults.segListing.selecteditems[0].lblName ;
    scopeObj.customerObj.id = scopeObj.view.searchResults.segListing.selecteditems[0].lblUserId ;
    scopeObj.filtersSelected = {};
    scopeObj.view.lblCustomerName3.text=scopeObj.customerObj.name;
    scopeObj.view.breadcrumbs.btnBackToMain.text=kony.i18n.getLocalizedString("i18n.frmLogsController.SYSTEM_LOGS");
    scopeObj.view.breadcrumbs.btnPreviousPage.text=kony.i18n.getLocalizedString("i18n.frmLogs.lblCustomerSpecificLogs").toUpperCase();
    scopeObj.view.breadcrumbs.btnPreviousPage1.text=kony.i18n.getLocalizedString("i18n.frmLogsController.RESULTS");   
    scopeObj.view.breadcrumbs.btnPreviousPage1.setVisibility(true);
    scopeObj.view.breadcrumbs.lblBreadcrumbsRight3.setVisibility(true);
    scopeObj.view.lblCurrentScreen.text=scopeObj.customerObj.name.toUpperCase() ;
    scopeObj.apply = true;
    scopeObj.searchApply = false;
    scopeObj.view.flxCustomerSearchResults.setVisibility(false);
    scopeObj.view.forceLayout();
  	var payLoad = {"$filter": "ActivityType eq 'CUSTOMER' or ActivityType eq 'TRANSACTIONAL'"};
    scopeObj.presenter.getAllModules(payLoad,{}); 
  },
  setFlowActions :function(){
    var scopeObj=this;
    
    this.view.tbxTransactionSearch.onTouchStart=function(){
      scopeObj.view.flxTransactionSearchContainer.skin = "sknflx0cc44f028949b4cradius30px";
      scopeObj.view.forceLayout();
    };
    this.view.tbxTransactionSearch.onKeyUp=function(){
      scopeObj.lastAppend=0;
      if(scopeObj.view.tbxTransactionSearch.text.trim().length===0)
      {scopeObj.view.flxClearTransactionSearch.setVisibility(false);}
      else
      {scopeObj.view.flxClearTransactionSearch.setVisibility(true);}
      scopeObj.view.forceLayout();
    };
    this.view.tbxTransactionSearch.onEndEditing=function(){
      scopeObj.view.flxTransactionSearchContainer.skin = "sknflxBgffffffBorderc1c9ceRadius30px";
      scopeObj.view.forceLayout();
    };
    this.view.tbxTransactionSearch.onDone=function(){
      var searchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.tbxTransactionSearch.text);
      if(searchText !== "" || searchText !== null) {
        scopeObj.pageOffset = 0;
        scopeObj.view.flxTrasactionalFilter.setVisibility(false);
        scopeObj.transactionalSortColumn = "";
        scopeObj.transactionSortDirection = "";
        scopeObj.resetSortImages();
        scopeObj.fetchTransactionLogs(searchText);
      }
    };
    this.view.fontIconTransactionSearch.onClick = function() {
      scopeObj.view.tbxTransactionSearch.onDone();
    }
    this.view.tbxAdminConsoleSearch.onTouchStart=function(){
      scopeObj.view.flxAdminConsoleSearchContainer.skin = "sknflx0cc44f028949b4cradius30px";
      scopeObj.view.forceLayout();
    };
    this.view.tbxAdminConsoleSearch.onKeyUp=function(){
      scopeObj.lastAppend=0;
      if(scopeObj.view.tbxAdminConsoleSearch.text.trim().length===0)
      {scopeObj.view.flxClearAdminConsoleSearch.setVisibility(false);}
      else
      {scopeObj.view.flxClearAdminConsoleSearch.setVisibility(true);}
      scopeObj.view.forceLayout();
    };
    this.view.tbxAdminConsoleSearch.onEndEditing=function(){
      scopeObj.view.flxAdminConsoleSearchContainer.skin = "sknflxBgffffffBorderc1c9ceRadius30px";
      scopeObj.view.forceLayout();
    };
    this.view.tbxCustomerSearchBox.onTouchStart=function(){
      scopeObj.view.flxSearchCustomerContainer.skin = "sknflx0cc44f028949b4cradius30px";
      scopeObj.view.forceLayout();
    };
    this.view.tbxCustomerSearchBox.onKeyUp=function(){
      scopeObj.lastAppend=0;
      if(scopeObj.view.tbxCustomerSearchBox.text.trim().length===0)
      {scopeObj.view.flxClearCustomerSearchImage.setVisibility(false);}
      else
      {scopeObj.view.flxClearCustomerSearchImage.setVisibility(true);}
      scopeObj.view.forceLayout();
    };
    this.view.tbxCustomerSearchBox.onEndEditing=function(){
      scopeObj.view.flxSearchCustomerContainer.skin = "sknflxBgffffffBorderc1c9ceRadius30px";
      scopeObj.view.forceLayout();
    };
    this.view.flxClearTransactionSearch.onClick=function(){
      scopeObj.view.flxClearTransactionSearch.setVisibility(false);
      scopeObj.view.tbxTransactionSearch.text="";
      scopeObj.view.forceLayout();
      scopeObj.transactionalSortColumn = "";
      scopeObj.transactionSortDirection = "";
      scopeObj.resetSortImages();
      var searchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.tbxTransactionSearch.text);
      scopeObj.fetchTransactionLogs(searchText);
      //scopeObj.fetchTransactionalLogsByFilter();
    };
    this.view.flxClearAdminConsoleSearch.onClick=function(){
      scopeObj.view.flxClearAdminConsoleSearch.setVisibility(false);
      scopeObj.view.tbxAdminConsoleSearch.text="";
      scopeObj.view.forceLayout();
      scopeObj.fetchAdminConsoleLogsByFilter();
    }; 
    this.view.flxClearCustomerSearchImage.onClick=function(){
      scopeObj.view.flxClearCustomerSearchImage.setVisibility(false);
      scopeObj.view.tbxCustomerSearchBox.text="";
      scopeObj.view.forceLayout();
    };
    this.view.flxCloseCal1.onClick=function(){
      scopeObj.view.datePickerTransaction.resetData="Today";
      scopeObj.view.datePickerTransaction.rangeType="Today";
      scopeObj.view.datePickerTransaction.value=scopeObj.getTodaysFormattedDate()+" - "+scopeObj.getTodaysFormattedDate();
      scopeObj.view.flxCloseCal1.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.flxCloseCal2.onClick=function(){
      scopeObj.view.datePickerAdminConsole.resetData="Today";
      scopeObj.view.datePickerAdminConsole.rangeType="Today";
      scopeObj.view.datePickerAdminConsole.value=scopeObj.getTodaysFormattedDate()+" - "+scopeObj.getTodaysFormattedDate();
      scopeObj.view.flxCloseCal2.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.flxCloseCal3.onClick=function(){
      scopeObj.view.datePickerCustomerLog.resetData="Today"; 
      scopeObj.view.datePickerCustomerLog.rangeType="Today"; 
      scopeObj.view.datePickerCustomerLog.value = scopeObj.getTodaysFormattedDate()+" - "+scopeObj.getTodaysFormattedDate();
      scopeObj.view.flxCloseCal3.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.datePickerTransaction.event=function(){
      scopeObj.view.flxCloseCal1.setVisibility(true);
      scopeObj.view.forceLayout();
    };
    this.view.datePickerAdminConsole.event=function(){
      scopeObj.view.flxCloseCal2.setVisibility(true);
      scopeObj.view.forceLayout();
    };
    this.view.datePickerCustomerLog.event=function(){
      scopeObj.view.flxCloseCal3.setVisibility(true);
      scopeObj.view.forceLayout();
    };
    this.view.flxCustomerFilterIcon.onClick = function(){
      if(!scopeObj.view.flxFiltersAndHeaders.isVisible){
        scopeObj.view.flxFiltersAndHeaders.setVisibility(true);
        scopeObj.view.customListboxApps.flxSegmentList.setVisibility(false);
      }
      else
        scopeObj.view.flxFiltersAndHeaders.setVisibility(false);
    };
    this.view.flxFontIconCustomerClose.onClick = function(){
      scopeObj.view.flxFiltersAndHeaders.setVisibility(false);
    };
    this.view.mainHeader.btnDropdownList.onClick=function(){
      if(scopeObj.view.lblCurrentScreen.text === kony.i18n.getLocalizedString("i18n.frmLogsController.TRANSACTIONAL")){
        scopeObj.onDownloadTransactionLogs();
      }
      else if(scopeObj.view.lblCurrentScreen.text===kony.i18n.getLocalizedString("i18n.frmLogsController.ADMIN_CONSOLE")){   
        scopeObj.onDownloadAdminConsoleLogs();                                                       
      }
      else if(scopeObj.view.breadcrumbs.btnPreviousPage.text===kony.i18n.getLocalizedString("i18n.frmLogs.lblCustomerSpecificLogs").toUpperCase()){
        scopeObj.onDownloadCustomerActivityLogs();
      }
    };
    this.view.search.tbxSearchBox.onKeyUp=function(){
      scopeObj.lastAppend=0;
      scopeObj.loadPageData("name",false);
      var searchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.search.tbxSearchBox.text);
      if(scopeObj.records===0)
      {
        scopeObj.view.flxNoRecords.top = "91px";
        scopeObj.view.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+searchText+"\""+kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
        scopeObj.view.flxNoRecords.setVisibility(true);
        scopeObj.view.flxScrollableList.setVisibility(false);
        scopeObj.view.forceLayout();
      }
      else
      {
        scopeObj.view.flxNoRecords.setVisibility(false);
        scopeObj.view.flxScrollableList.setVisibility(true);
        scopeObj.view.forceLayout();    
      }
      if(scopeObj.view.search.tbxSearchBox.text === "")
        scopeObj.view.search.flxSearchCancel.setVisibility(false);
      else
        scopeObj.view.search.flxSearchCancel.setVisibility(true);
    };
    this.view.search.flxSearchCancel.onClick = function() {
      scopeObj.view.search.tbxSearchBox.text = "";
      scopeObj.view.search.flxSearchCancel.setVisibility(false);
      scopeObj.view.flxNoRecords.setVisibility(false);
      scopeObj.view.flxScrollableList.setVisibility(true);
      scopeObj.records=scopeObj.customFilters? scopeObj.customFilters.length:0;
      scopeObj.showFilteredLogs(scopeObj.customFilters,"",true);
    };
    this.view.searchCustomer.txtSearchParam1.onKeyUp = function() {
      scopeObj.view.searchCustomer.imgSearchError.setVisibility(false);
      scopeObj.view.searchCustomer.lblSearchError.setVisibility(false);
    };
    this.view.searchCustomer.txtSearchParam1.onDone = function() {
      scopeObj.searchResults();
    };
    this.view.searchCustomer.txtSearchParam2.onKeyUp = function() {
      scopeObj.view.searchCustomer.imgSearchError.setVisibility(false);
      scopeObj.view.searchCustomer.lblSearchError.setVisibility(false);
    };
    this.view.searchCustomer.txtSearchParam2.onDone = function() {
      scopeObj.searchResults();
    };
    this.view.searchCustomer.txtSearchParam3.onKeyUp = function() {
      scopeObj.view.searchCustomer.imgSearchError.setVisibility(false);
      scopeObj.view.searchCustomer.lblSearchError.setVisibility(false);
    };
    this.view.searchCustomer.txtSearchParam3.onDone = function() {
      scopeObj.searchResults();
    };
    this.view.flxImageClose.onClick=function(){
      scopeObj.view.flxChequeImageDsplay.setVisibility(false);
    };
    this.view.flxViewTab1.onClick = function(){
      scopeObj.view.flxSystemLogsList.setVisibility(true);
      scopeObj.view.btnTransactionLogsSaveFilter.setVisibility(true);
      scopeObj.tabUtilLabelFunction([scopeObj.view.lblTabName1,
                                     scopeObj.view.lblTabName2],scopeObj.view.lblTabName1);
      scopeObj.view.flxCustomLogsList.setVisibility(false);
    };
    this.view.flxCurrent.onClick=function(){
      scopeObj.view.flxbreadcrumbList.onHover = scopeObj.onHoverEventCallback;
      if(scopeObj.view.lblCurrentScreen.text===kony.i18n.getLocalizedString("i18n.frmLogsController.TRANSACTIONAL"))
      {
        scopeObj.view.lblNo1.setVisibility(false); 
        scopeObj.view.lblNo2.setVisibility(true); 
        scopeObj.view.lblNo3.setVisibility(true); 
        scopeObj.view.flxbreadcrumbList.setVisibility(true); 
      }
      else if(scopeObj.view.lblCurrentScreen.text===kony.i18n.getLocalizedString("i18n.frmLogsController.ADMIN_CONSOLE"))
      {
        scopeObj.view.lblNo2.setVisibility(false); 
        scopeObj.view.lblNo1.setVisibility(true); 
        scopeObj.view.lblNo3.setVisibility(true); 
        scopeObj.view.flxbreadcrumbList.setVisibility(true); 
      }
      else if(scopeObj.view.lblCurrentScreen.text===kony.i18n.getLocalizedString("i18n.frmLogs.lblCustomerSpecificLogs").toUpperCase())
      {
        scopeObj.view.lblNo3.setVisibility(false); 
        scopeObj.view.lblNo1.setVisibility(true); 
        scopeObj.view.lblNo2.setVisibility(true); 
        scopeObj.view.flxbreadcrumbList.setVisibility(true); 
      }
    };
    this.view.flxNo1.onClick = function(){
      scopeObj.showTransactionalLogs();
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.presenter.getActivityType("TRANSACTION");
    };
    this.view.flxNo2.onClick = function(){
      scopeObj.showAdminConsoleLogs(); 
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.presenter.fetchAdminConsoleLogs({"FilterData": {"StartDate":scopeObj.getTodaysFormattedDate(),"EndDate":scopeObj.getTodaysFormattedDate()}});
    };
    this.view.flxNo3.onClick = function(){
      scopeObj.showCustomerActivityLogs();
    };
    this.view.popUp.flxPopUpClose.onClick = function(){
      scopeObj.view.flxPopUp.setVisibility(false);
    };
    this.view.popUp.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxPopUp.setVisibility(false);
    };
    this.view.popUp.btnPopUpDelete.onClick = function(){
      scopeObj.view.flxPopUp.setVisibility(false);
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.presenter.deleteFilter({"view_ID":scopeObj.view.popUp.btnPopUpDelete.info.id});
    };
    this.view.btnTransactionLogsSaveFilter.onClick = function(){
      scopeObj.presenter.fetchAllFilters();
      scopeObj.clearSaveFilterPopUpData();
    };
    this.view.btnAdminConsoleLogsSaveFilter.onClick = function(){
      scopeObj.presenter.fetchAllFilters();
      scopeObj.clearSaveFilterPopUpData();
    };
    this.view.btnCustomerActivityLogsSaveFilter.onClick = function(){
      scopeObj.presenter.fetchAllFilters();
      scopeObj.clearSaveFilterPopUpData();
    };
    this.view.popUpSaveFilter.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxPopUpSaveFilter.setVisibility(false); 
    };
    this.view.popUpSaveFilter.flxPopUpClose.onClick = function(){
      scopeObj.view.flxPopUpSaveFilter.setVisibility(false);   
    };
    this.view.popUpSaveFilter.btnPopUpDelete.onClick = function(){

      var filterName = scopeObj.view.popUpSaveFilter.txtfldName.text.trim();
      var existingFilters = [];
      for(var i=0; i<scopeObj.customFilters.length; ++i) {
        existingFilters.push(scopeObj.customFilters[i].Name);
      }

      if(existingFilters.includes(filterName)) {
        scopeObj.view.popUpSaveFilter.lblNoNameError.skin = "sknlblError";
        scopeObj.view.popUpSaveFilter.lblNoNameError.text = "Filter with the same name already exists";
        scopeObj.view.popUpSaveFilter.txtfldName.skin = "skinredbg";
      }
      else if(filterName.length===0) {
        scopeObj.view.popUpSaveFilter.lblNoNameError.skin="sknlblError";
        scopeObj.view.popUpSaveFilter.lblNoNameError.text = "Filter name cannot be empty";
        scopeObj.view.popUpSaveFilter.txtfldName.skin="skinredbg";
      }
      else {
        scopeObj.view.popUpSaveFilter.txtfldName.skin="skntxtbxDetails0bbf1235271384a";
        scopeObj.view.popUpSaveFilter.lblNoNameError.skin="sknErrorTransparent";
        scopeObj.view.popUpSaveFilter.lblNoNameError.text="";
        var type,viewData={};
        if(scopeObj.view.lblCurrentScreen.text===kony.i18n.getLocalizedString("i18n.frmLogsController.TRANSACTIONAL")){
          type=kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Transactional");
          viewData.type=kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Transactional");
          if(scopeObj.view.lblSelectedAmount.text!==kony.i18n.getLocalizedString("i18n.frmLogsController.Select_amount_range")) {
            viewData.amount=scopeObj.view.lblSelectedAmount.text;
          }

          viewData.date=scopeObj.view.datePickerTransaction.value;
          viewData.range=scopeObj.view.datePickerTransaction.rangeType;
          viewData.type=scopeObj.view.listBoxSearchParam1.selectedkey;
        }
        else if(scopeObj.view.lblCurrentScreen.text===kony.i18n.getLocalizedString("i18n.frmLogsController.ADMIN_CONSOLE")){
          type=kony.i18n.getLocalizedString("i18n.frmLogsController.Admin_Console");
          viewData.type=kony.i18n.getLocalizedString("i18n.frmLogsController.Admin_Console");
          viewData.date=scopeObj.view.datePickerAdminConsole.value;
          viewData.range=scopeObj.view.datePickerAdminConsole.rangeType;
          viewData.module=scopeObj.view.listBoxSearchParamAdmin1.selectedKey;
        }
        else if(scopeObj.view.breadcrumbs.btnPreviousPage.text===kony.i18n.getLocalizedString("i18n.frmLogs.lblCustomerSpecificLogs").toUpperCase()){
          type=kony.i18n.getLocalizedString("i18n.frmLogsController.Customer_Activity");
          viewData.userName=scopeObj.customerObj.username ;
          viewData.id=scopeObj.customerObj.id ;
          viewData.name=scopeObj.customerObj.name ;
          var isMemberActivity = (scopeObj.view.imgRadioExistingCustomer.src === "radio_selected.png");
          viewData.isMemberActivity = isMemberActivity ;
          viewData.activityType = scopeObj.view.listBoxSearchParam2.selectedKeyValue[0] ;
          viewData.moduleName = scopeObj.view.listBoxSearchParamCustomer3.selectedKeyValue[0] ;
          if(scopeObj.view.datePickerCustomerLog.value!=="")  {
            var ranges = scopeObj.view.datePickerCustomerLog.value.split("-") ;
            viewData.date=scopeObj.view.datePickerCustomerLog.value;
            viewData.range=scopeObj.view.datePickerCustomerLog.rangeType;
          }
        }
        var dataToSave={"FilterData":{
          "LogType": type,
          "ViewName": filterName,
          "Description": scopeObj.view.popUpSaveFilter.txtareaDescription.text.trim(),
          "ViewData":viewData
        }};
        scopeObj.savedFilter = filterName;
        scopeObj.view.flxPopUpSaveFilter.setVisibility(false);
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.presenter.saveFilter(dataToSave);
      }
    };

    this.view.searchResults.segListing.onRowClick = function(){
      scopeObj.customerSearchOnRowClick();
    }; 
    this.view.flxViewTab2.onClick = function(){
      scopeObj.view.search.tbxSearchBox.text = "";
      scopeObj.view.btnTransactionLogsSaveFilter.setVisibility(false);
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.presenter.fetchAllFilters("showFiltersPage");
      // scopeObj.showFilteredLogs();
    };
    this.view.flxAllTypes.onClick= function(){
      scopeObj.view.flxTypesList.onHover = scopeObj.onHoverEventCallback;
      scopeObj.view.flxTypesList.isVisible=true;
      scopeObj.view.search.tbxSearchBox.text = "";
    };
    this.view.flxOption1.onClick= function(){
      scopeObj.filterApplied=kony.i18n.getLocalizedString("i18n.frmLogsController.transactional");
      scopeObj.loadPageData("type",false);
      scopeObj.showNorecordsFound();
      scopeObj.view.lblName.text=kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Transactional");
      scopeObj.view.flxAllTypes.width="100px";
      scopeObj.view.flxTypesList.isVisible=false; 
      scopeObj.view.flxOption1.isVisible=false;
      scopeObj.view.flxOption2.isVisible=true;
      scopeObj.view.flxOption3.isVisible=true;
      scopeObj.view.flxOption4.isVisible=true;
    };
    this.view.flxOption2.onClick= function(){
      scopeObj.filterApplied="admin console";
      scopeObj.loadPageData("type",false);
      scopeObj.showNorecordsFound();
      scopeObj.view.lblName.text=kony.i18n.getLocalizedString("i18n.frmLogsController.Admin_Console");
      scopeObj.view.flxAllTypes.width="105px";
      scopeObj.view.flxTypesList.isVisible=false; 
      scopeObj.view.flxOption1.isVisible=true;
      scopeObj.view.flxOption2.isVisible=false;
      scopeObj.view.flxOption3.isVisible=true;
      scopeObj.view.flxOption4.isVisible=true;
    };
    this.view.flxOption3.onClick= function(){
      scopeObj.filterApplied=kony.i18n.getLocalizedString("i18n.frmLogsController.customer_activity");
      scopeObj.loadPageData("type",false);
      scopeObj.showNorecordsFound();
      scopeObj.view.flxTypesList.isVisible=false;
      scopeObj.view.lblName.text=kony.i18n.getLocalizedString("i18n.frmLogsController.Customer_Activity");
      scopeObj.view.flxAllTypes.width="122px";
      scopeObj.view.flxOption1.isVisible=true;
      scopeObj.view.flxOption2.isVisible=true;
      scopeObj.view.flxOption3.isVisible=false;
      scopeObj.view.flxOption4.isVisible=true;

    };
    this.view.flxOption4.onClick= function(){
      scopeObj.filterApplied="";
      scopeObj.loadPageData("type",true);
    };
    this.view.flxLogDefaultTabs1.onClick= function(){
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var payLoad = {"$filter": "ActivityType eq 'TRANSACTIONAL'"};
      scopeObj.presenter.getAllModules(payLoad,"TRANSACTION"); 
      //scopeObj.presenter.getActivityType("TRANSACTION"); 
    };
    this.view.flxLogDefaultTabs2.onClick= function(){
      scopeObj.showAdminConsoleLogs();
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.presenter.fetchAdminConsoleLogs({"FilterData": {"StartDate":scopeObj.getTodaysFormattedDate(),"EndDate":scopeObj.getTodaysFormattedDate()}});
    };
    this.view.flxLogDefaultTabs3.onClick= function(){
      scopeObj.showCustomerActivityLogs();
    };
    this.view.searchButtons.btnCancel.onClick= function(){
      scopeObj.view.searchCustomer.txtSearchParam1.text="";
      scopeObj.view.searchCustomer.txtSearchParam2.text="";
      scopeObj.view.searchCustomer.txtSearchParam3.text="";
    };
    this.view.searchButtons.btnSave.onClick= function(){   
      scopeObj.searchResults();
    };
    this.view.breadcrumbs.btnPreviousPage.onClick= function(){
      scopeObj.hideAll();
      scopeObj.view.flxCustomerActivityLog.setVisibility(true);
      scopeObj.view.flxBreadCrumbs.setVisibility(true);
      scopeObj.view.breadcrumbs.btnBackToMain.text=kony.i18n.getLocalizedString("i18n.frmLogsController.SYSTEM_LOGS");
      scopeObj.view.lblCurrentScreen.text=kony.i18n.getLocalizedString("i18n.frmLogs.lblCustomerSpecificLogs").toUpperCase();
      scopeObj.hideBreadcrumbs();
      //       scopeObj.view.imgBreadcrumbsDown.setVisibility(false);
      scopeObj.view.lblBreadcrumbsDown.setVisibility(false);
	  scopeObj.view.rtxNorecords.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNoResultsFound");
      scopeObj.view.flxNoResultsFound.setVisibility(false);
    };
    this.view.breadcrumbs.btnPreviousPage1.onClick= function(){
      scopeObj.hideAll();
      scopeObj.view.flxMainContent.top="120px";
      scopeObj.view.forceLayout();
      scopeObj.view.flxCustomerSearchResults.setVisibility(true);
      scopeObj.view.flxModifySearch.setVisibility(true);
      scopeObj.view.flxMainContent.setVisibility(true);
      scopeObj.view.flxBreadCrumbs.setVisibility(true);
      scopeObj.view.breadcrumbs.btnBackToMain.text=kony.i18n.getLocalizedString("i18n.frmLogsController.SYSTEM_LOGS");
      scopeObj.view.breadcrumbs.btnPreviousPage.text=kony.i18n.getLocalizedString("i18n.frmLogs.lblCustomerSpecificLogs").toUpperCase();
      scopeObj.view.lblCurrentScreen.text=kony.i18n.getLocalizedString("i18n.frmLogsController.RESULTS");   
      scopeObj.view.breadcrumbs.btnPreviousPage1.setVisibility(false);
      //       scopeObj.view.breadcrumbs.imgBreadcrumbsRight3.setVisibility(false);
      scopeObj.view.breadcrumbs.lblBreadcrumbsRight3.setVisibility(false);
      //       scopeObj.view.imgBreadcrumbsDown.setVisibility(false);
      scopeObj.view.lblBreadcrumbsDown.setVisibility(false);
      scopeObj.view.rtxNorecords.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNoResultsFound");
      scopeObj.view.flxNoResultsFound.setVisibility(false);
      scopeObj.view.flxAdminConsoleResultSegment.setVisibility(true);
    };
    this.view.breadcrumbs.btnBackToMain.onClick= function(){
      scopeObj.hideAll();
      if(scopeObj.view.breadcrumbs.btnBackToMain.text===kony.i18n.getLocalizedString("i18n.frmLogsController.SYSTEM_LOGS"))
      {
        scopeObj.view.flxLogsList.setVisibility(true);
        scopeObj.view.flxSystemLogsList.setVisibility(true);
        scopeObj.tabUtilLabelFunction([scopeObj.view.lblTabName1,
                                       scopeObj.view.lblTabName2],scopeObj.view.lblTabName1);
      }
      else
      {
        scopeObj.records=scopeObj.customFilters? scopeObj.customFilters.length:0;
        scopeObj.showFilteredLogs(scopeObj.customFilters,"",true);
      }
    };
    this.view.modifySearch.btnBackToMain.onClick= function(){
      scopeObj.hideAll();
      scopeObj.view.flxCustomerActivityLog.setVisibility(true);
      scopeObj.view.flxBreadCrumbs.setVisibility(true);
      scopeObj.view.breadcrumbs.btnBackToMain.text=kony.i18n.getLocalizedString("i18n.frmLogsController.SYSTEM_LOGS");
      scopeObj.view.lblCurrentScreen.text=kony.i18n.getLocalizedString("i18n.frmLogs.lblCustomerSpecificLogs").toUpperCase();
      scopeObj.view.breadcrumbs.btnPreviousPage.setVisibility(false);
      //       scopeObj.view.breadcrumbs.imgBreadcrumbsRight2.setVisibility(false);
      scopeObj.view.breadcrumbs.lblBreadcrumbsRight2.setVisibility(false);
      //       scopeObj.view.imgBreadcrumbsDown.setVisibility(false);
      scopeObj.view.lblBreadcrumbsDown.setVisibility(false);
      scopeObj.view.searchButtons.btnSave.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SEARCH");
      scopeObj.view.searchButtons.btnCancel.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.RESET");
    };
    this.view.selectAmount.flxList1.onClick=function(){
      scopeObj.view.lblSelectedAmount.text = scopeObj.view.selectAmount.lbll0To100.text;
      scopeObj.view.flxAmountClose.setVisibility(true);
      scopeObj.view.flxAmountDropDown.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.selectAmount.flxList2.onClick=function(){
      scopeObj.view.lblSelectedAmount.text = scopeObj.view.selectAmount.lbl100To500.text;
      scopeObj.view.flxAmountClose.setVisibility(true);
      scopeObj.view.flxAmountDropDown.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.selectAmount.flxList3.onClick=function(){
      scopeObj.view.lblSelectedAmount.text = scopeObj.view.selectAmount.lbl500To1000.text;
      scopeObj.view.flxAmountClose.setVisibility(true);
      scopeObj.view.flxAmountDropDown.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.selectAmount.flxList4.onClick=function(){
      scopeObj.view.lblSelectedAmount.text = scopeObj.view.selectAmount.lbl1000To5000.text;
      scopeObj.view.flxAmountClose.setVisibility(true);
      scopeObj.view.flxAmountDropDown.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.selectAmount.flxList5.onClick=function(){
      scopeObj.view.lblSelectedAmount.text = scopeObj.view.selectAmount.lbl5000To10000.text;
      scopeObj.view.flxAmountClose.setVisibility(true);
      scopeObj.view.flxAmountDropDown.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.selectAmount.flxSelect.onClick=function(){
      if(scopeObj.view.selectAmount.txtbxFromAmount.text!==""&&scopeObj.view.selectAmount.txtbxToAmount.text!=="")
      { 
        scopeObj.view.lblSelectedAmount.text = scopeObj.view.selectAmount.txtbxFromAmount.text+"-"+scopeObj.view.selectAmount.txtbxToAmount.text;
        scopeObj.view.flxAmountClose.setVisibility(true);
        scopeObj.view.flxAmountDropDown.setVisibility(false);
        scopeObj.view.forceLayout(); }
    };
    this.view.selectAmount.txtbxToAmount.onKeyUp=function(){
      if(scopeObj.view.selectAmount.txtbxFromAmount.text===""||scopeObj.view.selectAmount.txtbxToAmount.text==="")
      {
        scopeObj.view.selectAmount.flxSelect.hoverSkin="sknCursorDisabled";
      }
      else
      {
        scopeObj.view.selectAmount.flxSelect.hoverSkin="sknCursor";
      }
    };
    this.view.selectAmount.txtbxFromAmount.onKeyUp=function(){
      if(scopeObj.view.selectAmount.txtbxFromAmount.text===""||scopeObj.view.selectAmount.txtbxToAmount.text==="")
      {
        scopeObj.view.selectAmount.flxSelect.hoverSkin="sknCursorDisabled";
      }
      else
      {
        scopeObj.view.selectAmount.flxSelect.hoverSkin="sknCursor";
      }
    };
    this.view.selectAmount.txtbxToAmount.onKeyDown=function(){
      scopeObj.AdminConsoleCommonUtils.optimizeNumberField('frmLogs_selectAmount_txtbxToAmount');
    };
    this.view.selectAmount.txtbxFromAmount.onKeyDown=function(){
      scopeObj.AdminConsoleCommonUtils.optimizeNumberField('frmLogs_selectAmount_txtbxFromAmount');
    };
    this.view.flxDropDown01.onClick=function(){
      scopeObj.view.flxAmountDropDown.setVisibility(false);
    };
    this.view.listBoxSearchParam1.onSelection=function(){
      scopeObj.view.flxAmountDropDown.setVisibility(false);
    };
    this.view.flxAmountDropDown1.onClick=function(){
      scopeObj.view.flxAmountDropDown.onHover = scopeObj.onHoverEventCallback;
      scopeObj.view.flxAmountDropDown1.onHover = scopeObj.onHoverEventCallbackAmountDropDown;
     // scopeObj.view.flxAmountDropDown.top="121px";
      //scopeObj.view.flxAmountDropDown.left="551px";
      scopeObj.view.forceLayout();
      scopeObj.view.flxAmountDropDown.setVisibility(true);   
    };
    this.view.flxAmountClose.onClick=function(){
      scopeObj.view.flxAmountClose.setVisibility(false);
      scopeObj.view.selectAmount.txtbxToAmount.text="";
      scopeObj.view.selectAmount.txtbxFromAmount.text="";
      scopeObj.view.lblSelectedAmount.text=kony.i18n.getLocalizedString("i18n.frmLogsController.Select_amount_range");
    };
    this.view.flxImage.onClick = function() {
      scopeObj.view.flxTrasactionalFilter.setVisibility(false);
    };
    this.view.flxImage2.onClick = function() {
      scopeObj.view.flxAminConsoleFilterContainer.setVisibility(false);
    };
    this.view.flxRadioExistingCustomer.onClick = function() {
      scopeObj.checkBoxMemberSelected();
    };
    this.view.flxRadioApplicant.onClick = function() {
      scopeObj.checkBoxAdminSelected();
    };
    this.view.flxEvent.onClick=function(){
      scopeObj.view.flxStatusFilterAdmin.onHover = scopeObj.onFilterHoverEventAdminConsoleCallback;
      scopeObj.setFilterAdminSegmentData(scopeObj.adminConsoleFilterData.Events, "Event");
      scopeObj.view.flxStatusFilterAdmin.left = "35px";
//       var flxRight = scopeObj.view.flxAdminConsoleHeader.frame.width - scopeObj.view.flxEvent.frame.x - scopeObj.view.flxEvent.frame.width;
//       var iconRight = scopeObj.view.flxEvent.frame.width - scopeObj.view.fllxSortEvent.frame.x;
//       var arrowRight= (scopeObj.view.flxStatusFilterAdmin.width.substr(0,scopeObj.view.flxStatusFilterAdmin.width.length-2))/2;
//       scopeObj.view.statusFilterMenuAdmin.imgUpArrow.right=arrowRight+"px";
      scopeObj.view.flxStatusFilterAdmin.top = "112px";
      scopeObj.view.flxStatusFilterAdmin.setVisibility(true);
    };
    this.view.flxUserRole.onClick=function(){
      scopeObj.view.flxStatusFilterAdmin.onHover = scopeObj.onFilterHoverEventAdminConsoleCallback;
      scopeObj.setFilterAdminSegmentData(scopeObj.adminConsoleFilterData.Roles, "UserRole");
      scopeObj.view.flxStatusFilterAdmin.left = scopeObj.view.flxUserRole.frame.x+ scopeObj.view.flxSortUserRole.frame.x+105-scopeObj.view.flxStatusFilterAdmin.width.substr(0,scopeObj.view.flxStatusFilterAdmin.width.length-2)+"px";//"265px";
//       var flxRight = scopeObj.view.flxAdminConsoleHeader.frame.width - scopeObj.view.flxUserRole.frame.x - scopeObj.view.flxUserRole.frame.width;
//       var iconRight = scopeObj.view.flxUserRole.frame.width - scopeObj.view.flxSortUserRole.frame.x;
//       scopeObj.view.flxStatusFilterAdmin.right = (flxRight + iconRight +95) +"px";
      scopeObj.view.flxStatusFilterAdmin.top = "112px";
      scopeObj.view.flxStatusFilterAdmin.setVisibility(true);
    };
    this.view.flxAdminConsoleStatus.onClick=function(){
      scopeObj.view.flxStatusFilterAdmin.onHover = scopeObj.onFilterHoverEventAdminConsoleCallback;
      scopeObj.setFilterAdminSegmentData(scopeObj.adminConsoleFilterData.Status, "Status");
      scopeObj.view.flxStatusFilterAdmin.left =scopeObj.view.flxAdminConsoleStatus.frame.x+ scopeObj.view.flxSortAdminConsoleStatus.frame.x+105-scopeObj.view.flxStatusFilterAdmin.width.substr(0,scopeObj.view.flxStatusFilterAdmin.width.length-2)+"px";// "545px";
//       var flxRight = scopeObj.view.flxAdminConsoleHeader.frame.width - scopeObj.view.flxAdminConsoleStatus.frame.x - scopeObj.view.flxAdminConsoleStatus.frame.width;
//       var iconRight = scopeObj.view.flxAdminConsoleStatus.frame.width - scopeObj.view.flxSortAdminConsoleStatus.frame.x;
//       scopeObj.view.flxStatusFilterAdmin.right = (flxRight + iconRight -28) +"px";
      scopeObj.view.flxStatusFilterAdmin.top = "112px";
      scopeObj.view.flxStatusFilterAdmin.setVisibility(true);
    };
    this.view.flxCurrency.onClick=function(){
      scopeObj.view.flxStatusFilterTransaction.onHover = scopeObj.onFilterHoverEventCallback;
      scopeObj.setFilterTransactionSegmentData(scopeObj.transactionFilterData.currency, "Currency");
      scopeObj.view.flxStatusFilterTransaction.left = "1256px";
      scopeObj.view.flxStatusFilterTransaction.top = "32px";
      scopeObj.view.flxStatusFilterTransaction.setVisibility(true);     
    };
    this.view.flxTransactionStatus.onClick=function(){
      scopeObj.view.flxStatusFilterTransaction.onHover = scopeObj.onFilterHoverEventCallback;
      scopeObj.setFilterTransactionSegmentData(scopeObj.transactionFilterData.Status, "Status");
      scopeObj.view.flxStatusFilterTransaction.left = "1439px";
      scopeObj.view.flxStatusFilterTransaction.top = "32px";
      scopeObj.view.flxStatusFilterTransaction.setVisibility(true);
    };

    // TRANSACTIONAL LOGS
    this.view.btnAdd.onClick = function() {
      scopeObj.pageOffset = 0;
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.view.flxTrasactionalFilter.setVisibility(false);
      scopeObj.transactionalSortColumn = "";
      scopeObj.transactionSortDirection = "";
      scopeObj.resetSortImages();
      scopeObj.fetchTransactionLogs("");
    };
    this.view.flxExistingCustomerName.onClick =function(){
      scopeObj.loadMoreModel.SortVariable = scopeObj.customersSegmentColumns.backendNames[0];
      if (scopeObj.view[""+scopeObj.customersSegmentColumns.frontendIcons[0]].text === kony.adminConsole.utils.fonticons.ASCENDING_IMAGE) {
        scopeObj.loadMoreModel.SortDirection = "DESC";
      } else {
        scopeObj.loadMoreModel.SortDirection = "ASC";
      }

      var searchParam = scopeObj.getCustomerSerachParameters();
      searchParam._pageOffset = "0";
      searchParam._pageSize = scopeObj.loadMoreModel.RecordsOnPage;
      searchParam._sortVariable = scopeObj.loadMoreModel.SortVariable;
      searchParam._sortDirection = scopeObj.loadMoreModel.SortDirection;

      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var CustomerManagement = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
      CustomerManagement.businessController.logs_enrolledCustomerSearch(searchParam, scopeObj.onCustomerSearchCompletionCallBack.bind(scopeObj), scopeObj.onCustomerSearchFailure.bind(scopeObj));
    };
    this.view.flxExistingCustomerUsername.onClick =function(){
      scopeObj.loadMoreModel.SortVariable = scopeObj.customersSegmentColumns.backendNames[1];
      if (scopeObj.view[""+scopeObj.customersSegmentColumns.frontendIcons[1]].text === kony.adminConsole.utils.fonticons.ASCENDING_IMAGE) {
        scopeObj.loadMoreModel.SortDirection = "DESC";
      } else {
        scopeObj.loadMoreModel.SortDirection = "ASC";
      }

      var searchParam = scopeObj.getCustomerSerachParameters();
      searchParam._pageOffset = "0";
      searchParam._pageSize = scopeObj.loadMoreModel.RecordsOnPage;
      searchParam._sortVariable = scopeObj.loadMoreModel.SortVariable;
      searchParam._sortDirection = scopeObj.loadMoreModel.SortDirection;

      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var CustomerManagement = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
      CustomerManagement.businessController.logs_enrolledCustomerSearch(searchParam, scopeObj.onCustomerSearchCompletionCallBack.bind(scopeObj), scopeObj.onCustomerSearchFailure.bind(scopeObj));
    };
    this.view.flxUserName.onClick = function() {
      var usernameImg = scopeObj.view.lblSortUserName.text;
      scopeObj.resetSortImages();
		
      if(usernameImg == "\ue92b" || usernameImg == "\ue920") {
        scopeObj.view.lblSortUserName.text = "\ue92a";
        scopeObj.view.lblSortUserName.skin = "sknIcon12pxBlack";
        scopeObj.view.lblSortUserName.left="5px";
        scopeObj.pageOffset = 0;
        scopeObj.transactionalSortColumn = "userName";
        scopeObj.transactionSortDirection = "ASC";
        scopeObj.fetchTransactionLogs("");
      }
      else if(usernameImg == "\ue92a") {
        scopeObj.view.lblSortUserName.text = "\ue920";
        scopeObj.view.lblSortUserName.skin = "sknIcon12pxBlack";
        scopeObj.view.lblSortUserName.left="5px";
        scopeObj.pageOffset = 0;
        scopeObj.transactionalSortColumn = "userName";
        scopeObj.transactionSortDirection = "DESC";
        scopeObj.fetchTransactionLogs("");
      }
    };
    this.view.flxCustomerId.onClick = function() {
      var usernameImg = scopeObj.view.lblSortCustomerId.text;
      scopeObj.resetSortImages();
		
      if(usernameImg == "\ue92b" || usernameImg == "\ue920") {
        scopeObj.view.lblSortCustomerId.text = "\ue92a";
        scopeObj.view.lblSortCustomerId.skin = "sknIcon12pxBlack";
        scopeObj.view.lblSortCustomerId.left="5px";
        scopeObj.pageOffset = 0;
        scopeObj.transactionalSortColumn = "customer_Id";
        scopeObj.transactionSortDirection = "ASC";
        scopeObj.fetchTransactionLogs("");
      }
      else if(usernameImg == "\ue92a") {
        scopeObj.view.lblSortCustomerId.text = "\ue920";
        scopeObj.view.lblSortCustomerId.skin = "sknIcon12pxBlack";
        scopeObj.view.lblSortCustomerId.left="5px";
        scopeObj.pageOffset = 0;
        scopeObj.transactionalSortColumn = "customer_Id";
        scopeObj.transactionSortDirection = "DESC";
        scopeObj.fetchTransactionLogs("");
      }
    };
    this.view.flxAmount.onClick = function() {
      var amountImg = scopeObj.view.lblSortAmount.text;
      scopeObj.resetSortImages();

      if(amountImg == "\ue92b" || amountImg == "\ue920") {
        scopeObj.view.lblSortAmount.text = "\ue92a";
        scopeObj.view.lblSortAmount.skin = "sknIcon12pxBlack";
        scopeObj.view.lblSortAmount.left = "5px";
        scopeObj.pageOffset = 0;
        scopeObj.transactionalSortColumn = "amount";
		scopeObj.transactionSortDirection = "ASC";
        scopeObj.fetchTransactionLogs("");
      }
      else if(amountImg == "\ue92a") {
        scopeObj.view.lblSortAmount.text = "\ue920";
        scopeObj.view.lblSortAmount.skin = "sknIcon12pxBlack";
        scopeObj.view.lblSortAmount.left = "5px";
        scopeObj.pageOffset = 0;
        scopeObj.transactionalSortColumn = "amount";
		scopeObj.transactionSortDirection = "DESC";
        scopeObj.fetchTransactionLogs("");
      }
    };

    this.view.flxPayeeName.onClick = function() {
      var payeeNameImg = scopeObj.view.lblSortPayeeName.text;
      scopeObj.resetSortImages();

      if(payeeNameImg == "\ue92b" || payeeNameImg == "\ue920") {
        scopeObj.view.lblSortPayeeName.text = "\ue92a";
        scopeObj.view.lblSortPayeeName.skin = "sknIcon12pxBlack";
        scopeObj.view.lblSortPayeeName.left = "5px";
        scopeObj.pageOffset = 0;
        scopeObj.transactionalSortColumn = "payeeNickName";
		scopeObj.transactionSortDirection = "ASC";
        scopeObj.fetchTransactionLogs("");
      }
      else if(payeeNameImg == "\ue92a") {
        scopeObj.view.lblSortPayeeName.text = "\ue920";
        scopeObj.view.lblSortPayeeName.skin = "sknIcon12pxBlack";
        scopeObj.view.lblSortPayeeName.left = "5px";
        scopeObj.transactionalSortColumn = "payeeNickName";
        scopeObj.pageOffset = 0;
		scopeObj.transactionSortDirection = "DESC";
        scopeObj.fetchTransactionLogs("");
      }
    };
    
    // ADMIN CONSOLE LOGS
    this.view.flxAdminConsoleUserName.onClick=function(){
      var sortAdminConsoleUserName = scopeObj.view.lblSortAdminConsoleUserName.text;
      scopeObj.resetSortImagesAdmin();
      if(sortAdminConsoleUserName == "\ue92b" || sortAdminConsoleUserName == "\ue920") {
        scopeObj.view.lblSortAdminConsoleUserName.text = "\ue92a";
        scopeObj.view.lblSortAdminConsoleUserName.skin = "sknIcon12pxBlack";
        scopeObj.view.lblSortAdminConsoleUserName.left = "5px";
        scopeObj.sortColumn = "username";
        scopeObj.sortDirection = "ASC";
      }
      else if(sortAdminConsoleUserName == "\ue92a") {
        scopeObj.view.lblSortAdminConsoleUserName.text = "\ue920";
        scopeObj.view.lblSortAdminConsoleUserName.skin = "sknIcon12pxBlack";
        scopeObj.view.lblSortAdminConsoleUserName.left = "5px";
        scopeObj.sortColumn = "username";
        scopeObj.sortDirection = "DESC";
      }
      scopeObj.fetchAdminConsoleLogsByFilter();
    };
    this.view.flxAdminConsoleModuleName.onClick=function(){
      var sortAdminConsoleModuleName = scopeObj.view.lblSortAdminConsoleModuleName.text;
      scopeObj.resetSortImagesAdmin();
      if(sortAdminConsoleModuleName == "\ue92b" || sortAdminConsoleModuleName == "\ue920") {
        scopeObj.view.lblSortAdminConsoleModuleName.text = "\ue92a";
        scopeObj.view.lblSortAdminConsoleModuleName.skin = "sknIcon12pxBlack";
        scopeObj.view.lblSortAdminConsoleModuleName.left = "5px";
        scopeObj.sortColumn = "moduleName";
        scopeObj.sortDirection = "ASC";
      }
      else if(sortAdminConsoleModuleName == "\ue92a") {
        scopeObj.view.lblSortAdminConsoleModuleName.text = "\ue920";
        scopeObj.view.lblSortAdminConsoleModuleName.skin = "sknIcon12pxBlack";
        scopeObj.view.lblSortAdminConsoleModuleName.left = "5px";
        scopeObj.sortColumn = "moduleName";
        scopeObj.sortDirection = "DESC";
      }
      scopeObj.fetchAdminConsoleLogsByFilter();
    };
    this.view.flxAdminConsoleDateAndTime.onClick=function(){
      var sortAdminConsoleDateAndTime = scopeObj.view.lblSortAdminConsoleDateAndTime.text;
      scopeObj.resetSortImagesAdmin();
      if(sortAdminConsoleDateAndTime == "\ue92b" || sortAdminConsoleDateAndTime == "\ue920") {
        scopeObj.view.lblSortAdminConsoleDateAndTime.text = "\ue92a";
        scopeObj.view.lblSortAdminConsoleDateAndTime.skin = "sknIcon12pxBlack";
        scopeObj.view.lblSortAdminConsoleDateAndTime.left = "5px";
        scopeObj.sortColumn = "eventts";
        scopeObj.sortDirection = "ASC";
      }
      else if(sortAdminConsoleDateAndTime == "\ue92a") {
        scopeObj.view.lblSortAdminConsoleDateAndTime.text = "\ue920";
        scopeObj.view.lblSortAdminConsoleDateAndTime.skin = "sknIcon12pxBlack";
        scopeObj.view.lblSortAdminConsoleDateAndTime.left = "5px";
        scopeObj.sortColumn = "eventts";
        scopeObj.sortDirection = "DESC";
      }
      scopeObj.fetchAdminConsoleLogsByFilter();
    };
    this.view.tbxAdminConsoleSearch.onDone = function() {
      scopeObj.searchApply=true;
      scopeObj.fetchAdminConsoleLogsByFilter("","",true);
    };
//     this.view.adminConsoleSubHeader.lbxPageNumbers.onSelection = function() {
//       scopeObj.fetchAdminConsoleLogsByFilter();
//     };
    this.view.btnAdd2.onClick = function() {
      scopeObj.sortColumn = "";
      scopeObj.sortDirection = "";
      scopeObj.totalFiltersCount = {};
      scopeObj.filtersSelected = {};
      scopeObj.view.tbxAdminConsoleSearch.text = "";
      scopeObj.resetSortImagesAdmin();
      scopeObj.view.flxAminConsoleFilterContainer.setVisibility(false);
      scopeObj.fetchAdminConsoleLogsByFilter("","",true);
    };
    this.view.btnAdd3.onClick = function() {
      scopeObj.filtersSelected = {};
      scopeObj.totalFiltersCount = {};
      scopeObj.view.tbxCustomerSearchBox.text = "" ;
      scopeObj.pageOffset=0;
      scopeObj.fetchCustomerActivityLogs(true);
    };
    this.view.tbxCustomerSearchBox.onDone = function() {
      scopeObj.pageOffset=0;
      scopeObj.fetchCustomerActivityLogs(true);
    };
    this.view.fontIconSearchCustomerImg.onTouchStart = function(){
      scopeObj.pageOffset=0;
      scopeObj.fetchCustomerActivityLogs(true);
    };
    this.view.flxDate.onClick=function(){
       var sortDirection = "" ;
      if(scopeObj.view.lblFilterDateAndTime.text === "\ue920"){
        sortDirection = "desc" ;
        scopeObj.view.lblFilterDateAndTime.text = "\ue92a";
        scopeObj.view.lblFilterDateAndTime.skin = "sknIcon12pxBlack";
      }else{
        sortDirection = "asc" ;
        scopeObj.view.lblFilterDateAndTime.text = "\ue920";
        scopeObj.view.lblFilterDateAndTime.skin = "sknIcon12pxBlack";
      }
      scopeObj.sortColumn="createdts";
      scopeObj.sortDirection=sortDirection;
      scopeObj.fetchCustomerActivityLogs(true);
    };
    this.view.flxTransactionFilterIcon.onClick = function() {
      var isVisible = scopeObj.view.flxTrasactionalFilter.isVisible;
      scopeObj.view.flxTrasactionalFilter.setVisibility(!isVisible);
    };
    this.view.flxAdminConsoleFilterIcon.onClick = function() {
      var isVisible = scopeObj.view.flxAminConsoleFilterContainer.isVisible;
      scopeObj.view.flxAminConsoleFilterContainer.setVisibility(!isVisible);
    };
    this.view.flxPopUpClose.onClick = function(){
      scopeObj.view.flxOtherInfoPopup.setVisibility(false);
    };
//jsondata
  this.view.flxJsonDataPopUpClose.onClick = function(){
      scopeObj.view.flxJsonDataPopup.setVisibility(false);
    };
    this.view.customListBoxTransactional.flxSelectedText.onClick = function() {
      var isVisible = scopeObj.view.customListBoxTransactional.flxSegmentList.isVisible;
      scopeObj.view.customListBoxTransactional.flxSegmentList.setVisibility(!isVisible);
    };
	this.view.customListboxApps.flxSelectedText.onClick = function(){
      scopeObj.view.customListboxApps.flxSegmentList.setVisibility(scopeObj.view.customListboxApps.flxSegmentList.isVisible === false);
     };  
    this.view.customListboxApps.btnOk.onClick = function(){
      scopeObj.view.customListboxApps.flxSegmentList.setVisibility(scopeObj.view.customListboxApps.flxSegmentList.isVisible === false);
    };
    this.view.customListboxApps.flxCheckBox.onClick = function(){
      scopeObj.onClickOfSelectAll();
    };
   this.view.customListboxApps.segList.onRowClick = function(){
      scopeObj.onCustomListBoxRowClick();
    };
     this.view.listBoxSearchParamCustomer3.onSelection=function(){
      scopeObj.view.customListboxApps.flxSegmentList.setVisibility(false);
      scopeObj.resetActivityTypeList();
    };
    this.view.listBoxSearchParam2.onSelection=function(){
      scopeObj.view.customListboxApps.flxSegmentList.setVisibility(false);
      scopeObj.resetColumnsOnActivitySelection();
    };
    this.view.datePickerCustomerLog.event=function(){
      scopeObj.view.customListboxApps.flxSegmentList.setVisibility(false);
    };
    this.view.customListBoxTransactional.flxSelectAll.onClick = function() {
      if(scopeObj.view.customListBoxTransactional.imgCheckBox.src === "checkboxnormal.png") {
        var selectedindices = [];
        //var labelText = "";
        scopeObj.view.customListBoxTransactional.imgCheckBox.src = "checkboxselected.png";
        var segdata = scopeObj.view.customListBoxTransactional.segList.data;
        for(var index = 0; index < segdata.length; index++) {
          selectedindices.push(index);
         // labelText = labelText + "," +segdata[index].lblDescription.text
        }
        scopeObj.view.customListBoxTransactional.segList.selectedRowIndices = [[0, selectedindices]];
        //scopeObj.view.customListBoxTransactional.lblSelectedValue.tooltip = labelText;
        scopeObj.view.customListBoxTransactional.lblSelectedValue.text = segdata.length + " Selected"
      } else {
         scopeObj.view.customListBoxTransactional.imgCheckBox.src = "checkboxnormal.png";
        scopeObj.view.customListBoxTransactional.segList.selectedRowIndices = null;
        scopeObj.view.customListBoxTransactional.lblSelectedValue.text = "Select column items";
      }
      scopeObj.view.forceLayout();
    };
    this.view.customListBoxTransactional.segList.onRowClick = function() {
      var segData = scopeObj.view.customListBoxTransactional.segList.data;
      if(scopeObj.view.customListBoxTransactional.segList.selectedRowIndices) {
        var selectedRowIndices = scopeObj.view.customListBoxTransactional.segList.selectedRowIndices[0][1];
        if(segData.length == selectedRowIndices.length) {
        	scopeObj.view.customListBoxTransactional.flxSelectAll.onClick();
        } else {
          scopeObj.view.customListBoxTransactional.imgCheckBox.src = "checkboxnormal.png";
//           var labelText = ""
//           for(var index = 0; index < selectedRowIndices.length; index++) {
// 				labelText = labelText + "," + segData[selectedRowIndices[index]].lblDescription.text
//           }
         // scopeObj.view.customListBoxTransactional.lblSelectedValue.tooltip = labelText;
          scopeObj.view.customListBoxTransactional.lblSelectedValue.text = selectedRowIndices.length + " Selected";
        }
      }
    };
    this.view.customListBoxTransactional.btnOk.onClick = function() {
      scopeObj.view.customListBoxTransactional.flxSegmentList.setVisibility(false);
      //       if(scopeObj.view.customListBoxTransactional.segList.selectedRowItems) {

      //       }
      //       this.view.customListBoxTransactional.lblSelectedValue
    };
    this.view.tabs.btnTab1.onClick = function(){
      scopeObj.view.flxScrollOtherInfo.setVisibility(true);
      scopeObj.view.flxScrollViewJson.setVisibility(false);
      scopeObj.subTabsButtonUtilFunction([scopeObj.view.tabs.btnTab1,scopeObj.view.tabs.btnTab2],scopeObj.view.tabs.btnTab1);
      scopeObj.view.flxScrollOtherInfo.scrollToWidget(scopeObj.view.tabs)
     };
    this.view.tabs.btnTab2.onClick = function(){
      scopeObj.view.flxScrollViewJson.setVisibility(true);
      scopeObj.view.flxScrollOtherInfo.setVisibility(false);
      scopeObj.view.flxScrollViewJson.scrollToWidget(scopeObj.view.rtxViewJson)
      scopeObj.subTabsButtonUtilFunction([scopeObj.view.tabs.btnTab1,scopeObj.view.tabs.btnTab2],scopeObj.view.tabs.btnTab2);
    
     };
    
    this.view.customListBoxTransactional.flxSelectedText.onHover = scopeObj.onHoverCallback;
    
    this.view.customListBoxTransactional.flxSegmentList.onHover = scopeObj.onHoverCallback;

  },
  onHoverCallback:function(widget, context) {
    var scopeObj = this;

    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      if(widget.id != "flxSelectedText") {
        scopeObj.view.customListBoxTransactional.flxSegmentList.setVisibility(true);
      }
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      scopeObj.view.customListBoxTransactional.flxSegmentList.setVisibility(false);
    }
    scopeObj.view.forceLayout();
  },
  setSearchUI:function(){
    var scopeObj=this;
    scopeObj.hideAll();
    scopeObj.view.flxMainContent.setVisibility(true);
    scopeObj.view.rtxNorecords.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNoResultsFound");
    scopeObj.view.flxNoResultsFound.setVisibility(false);
    scopeObj.view.flxCustomerSearchResults.setVisibility(true);
    scopeObj.view.flxAdminConsoleResultSegment.setVisibility(true);
    scopeObj.view.flxMainContent.top="120px";
    scopeObj.view.forceLayout();
    scopeObj.view.flxModifySearch.setVisibility(true);
    if(scopeObj.view.searchCustomer.txtSearchParam1.text!=="")
    {scopeObj.view.modifySearch.lblName.text=scopeObj.view.searchCustomer.txtSearchParam1.text;}
    else if(scopeObj.view.searchCustomer.txtSearchParam2.text!=="")
    {scopeObj.view.modifySearch.lblName.text=scopeObj.view.searchCustomer.txtSearchParam2.text;}
    else if(scopeObj.view.searchCustomer.txtSearchParam3.text!=="")
    {scopeObj.view.modifySearch.lblName.text=scopeObj.view.searchCustomer.txtSearchParam3.text;}
    scopeObj.view.flxBreadCrumbs.setVisibility(true);
    scopeObj.view.breadcrumbs.btnBackToMain.text=kony.i18n.getLocalizedString("i18n.frmLogsController.SYSTEM_LOGS");
    scopeObj.view.breadcrumbs.btnPreviousPage.text=kony.i18n.getLocalizedString("i18n.frmLogs.lblCustomerSpecificLogs").toUpperCase();
    scopeObj.view.breadcrumbs.btnPreviousPage.setVisibility(true);
    //     scopeObj.view.breadcrumbs.imgBreadcrumbsRight2.setVisibility(true);
    scopeObj.view.breadcrumbs.lblBreadcrumbsRight2.setVisibility(true);
    //     scopeObj.view.imgBreadcrumbsDown.setVisibility(false);
    scopeObj.view.lblBreadcrumbsDown.setVisibility(false);
    scopeObj.view.lblCurrentScreen.text=kony.i18n.getLocalizedString("i18n.frmLogsController.RESULTS");
    scopeObj.view.forceLayout();   
  },
  resetSortImagesCustomerSearch: function(){
    if (this.view.lblSortExistingCustomerUsername.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
      this.view.lblSortExistingCustomerUsername.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
      this.view.lblSortExistingCustomerUsername.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
    }
    if (this.view.lblSortExistingCustomerName.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
      this.view.lblSortExistingCustomerName.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
      this.view.lblSortExistingCustomerName.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
    }
  },
  onCustomerSearchCompletionCallBack: function(response) {
    var scopeObj=this;
    if (response.opstatus === 0) {
      scopeObj.view.lblSortExistingCustomerName.text = "\ue92b";
      scopeObj.view.lblSortExistingCustomerName.left = "5px";
      scopeObj.view.lblSortExistingCustomerName.skin = "sknIcon15px";
      scopeObj.view.lblSortExistingCustomerUsername.text = "\ue92b";
      scopeObj.view.lblSortExistingCustomerUsername.skin = "sknIcon15px";
      scopeObj.view.lblSortExistingCustomerUsername.left = "5px";   

      //Set sort direction
      this.resetSortImagesCustomerSearch();
      var sortColumnIcon = this.customersSegmentColumns.frontendIcons[this.customersSegmentColumns.backendNames.indexOf(response.SortVariable)];
      if (response.SortDirection === "ASC") {
        this.view[""+sortColumnIcon].text = kony.adminConsole.utils.fonticons.ASCENDING_IMAGE;
      } else if (response.SortDirection === "DESC") {
        this.view[""+sortColumnIcon].text = kony.adminConsole.utils.fonticons.DESCENDING_IMAGE;
     }
     if(response.PageOffset === 0){
        this.loadMoreModel = {
          "visibilityCheckWidget": this.view.flxCustomerSearchResults,
          "TotalResultsFound":response.TotalResultsFound,
          "RecordsOnPage":response.PageSize,
          "SortVariable":response.SortVariable,
          "SortDirection":response.SortDirection
        };
        if(response.customers.length === 0) {
          scopeObj.view.flxNoRecords.setVisibility(false);

          scopeObj.view.flxSearchResultExistingCustomerHeader.setVisibility(false);
          scopeObj.view.searchResults.flxSegTransactionResults.setVisibility(false);
          scopeObj.view.searchResults.segListing.setVisibility(false);

          scopeObj.view.searchResults.rtxNoResultsFound.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.No_results_found");
          scopeObj.view.searchResults.rtxNoResultsFound.setVisibility(true);

          scopeObj.view.flxPaginationCustomerLog.setVisibility(false);
          scopeObj.setSearchUI();
        }
        else {
          scopeObj.view.flxNoRecords.setVisibility(false);

          scopeObj.view.searchResults.rtxNoResultsFound.setVisibility(false);

          scopeObj.view.flxSearchResultExistingCustomerHeader.setVisibility(true);
          scopeObj.view.searchResults.flxSegTransactionResults.setVisibility(true);
          scopeObj.view.searchResults.segListing.setVisibility(true);
		  var records=response.customers.length === 1?[response.customerbasicinfo_view]:response.customers;
          scopeObj.setSearchSegmentData(records);
          scopeObj.searchRecords=records;
          scopeObj.setSearchUI();
        }
      }else if (response.customers.length === 0) {
          scopeObj.view.flxNoRecords.setVisibility(false);

          scopeObj.view.flxSearchResultExistingCustomerHeader.setVisibility(false);
          scopeObj.view.searchResults.flxSegTransactionResults.setVisibility(false);
          scopeObj.view.searchResults.segListing.setVisibility(false);

          scopeObj.view.searchResults.rtxNoResultsFound.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.No_results_found");
          scopeObj.view.searchResults.rtxNoResultsFound.setVisibility(true);

          scopeObj.view.flxPaginationCustomerLog.setVisibility(false);
          scopeObj.setSearchUI(); 
      }

      else{
        for (var i = 0; i< response.customers.length; i++) {
          var toAdd = this.getformattedSegmentData(response.customers[i]);
          this.view.searchResults.segListing.addDataAt(toAdd, this.view.searchResults.segListing.data.length);
        }
        this.loadMoreModel.RecordsOnPage = this.view.searchResults.segListing.data.length;
      }
      document.getElementById("frmLogs_flxMainContent").onscroll = this.populateResultsOnReachingend;
      kony.adminConsole.utils.hideProgressBar(this.view);
    }
    else {
      scopeObj.onCustomerSearchFailure();
    }
    scopeObj.view.forceLayout();
  },
  onCustomerSearchFailure : function(){
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.frmLogsController.Failed_to_fetch_records"),this);
  },
  searchResults:function(){
    var scopeObj=this;

    if(scopeObj.view.searchCustomer.txtSearchParam1.text===""&&scopeObj.view.searchCustomer.txtSearchParam2.text===""&&scopeObj.view.searchCustomer.txtSearchParam3.text==="")
    {
      scopeObj.view.searchCustomer.imgSearchError.setVisibility(true);
      scopeObj.view.searchCustomer.lblSearchError.setVisibility(true);
    }
    else
    {
      var LEData = this.getCurrentUserLEArr();
      var searchParam = scopeObj.getCustomerSerachParameters();
      searchParam._pageOffset = "0";
      searchParam._pageSize = this.limitForPaginationSearch;
      searchParam._sortVariable = this.customersSegmentColumns.backendNames[0];
      searchParam._sortDirection = "ASC";
      //searchParam._legalEntityId = LEData[0].id;

      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var CustomerManagement = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
      CustomerManagement.businessController.logs_enrolledCustomerSearch(searchParam, scopeObj.onCustomerSearchCompletionCallBack.bind(scopeObj), scopeObj.onCustomerSearchFailure.bind(scopeObj));
    }
    scopeObj.view.flxTransactionLog.setVisibility(false);
	scopeObj.view.flxTrasactionalFilter.setVisibility(false);
	scopeObj.view.flxAminConsoleFilterContainer.setVisibility(false);
  },
  getCustomerSerachParameters: function(){
    return {
     // "_searchType": "CUSTOMER_SEARCH",
      "_name": this.view.searchCustomer.txtSearchParam1.text || "" ,
      "_id": this.view.searchCustomer.txtSearchParam2.text || "",
      "_username": this.view.searchCustomer.txtSearchParam3.text || "",
    };
  },
  populateResultsOnReachingend: function(context){
    var scopeObj = this;
    var visibilityCheckWidget = this.loadMoreModel.visibilityCheckWidget;
    if ((context.currentTarget.offsetHeight + context.currentTarget.scrollTop === context.currentTarget.scrollHeight) && (visibilityCheckWidget) && (visibilityCheckWidget.isVisible)) {

      var limit;
      if(this.loadMoreModel.TotalResultsFound > this.loadMoreModel.RecordsOnPage ){
        limit = this.loadMoreModel.TotalResultsFound - this.loadMoreModel.RecordsOnPage > this.limitForPaginationSearch?
          this.limitForPaginationSearch : this.loadMoreModel.TotalResultsFound - this.loadMoreModel.RecordsOnPage;

        var searchParam = this.getCustomerSerachParameters();
        searchParam._pageOffset = this.loadMoreModel.RecordsOnPage;
        searchParam._pageSize = limit;
        searchParam._sortVariable = this.loadMoreModel.SortVariable;
        searchParam._sortDirection = this.loadMoreModel.SortDirection;
        kony.adminConsole.utils.showProgressBar(this.view);
        var CustomerManagement = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        CustomerManagement.businessController.logs_enrolledCustomerSearch(searchParam, scopeObj.onCustomerSearchCompletionCallBack.bind(scopeObj), scopeObj.onCustomerSearchFailure.bind(scopeObj));

      }
    }
  },
  setDetailedResultUI:function(){
    var scopeObj=this;
    scopeObj.hideAll();
    scopeObj.view.flxMainContent.setVisibility(true);
    scopeObj.view.flxMainContent.top="120px";
    scopeObj.view.forceLayout();
    scopeObj.view.flxCustomerDetailedResults.setVisibility(true);
    //scopeObj.view.flxFiltersAndHeaders.setVisibility(true);
    scopeObj.view.flxBreadCrumbs.setVisibility(true);
    scopeObj.view.breadcrumbs.btnBackToMain.text=kony.i18n.getLocalizedString("i18n.frmLogsController.SYSTEM_LOGS");
    scopeObj.view.lblCustomerName3.text=scopeObj.customerObj.name;
    scopeObj.view.breadcrumbs.btnPreviousPage1.setVisibility(false);
    //     scopeObj.view.breadcrumbs.imgBreadcrumbsRight3.setVisibility(false);
    scopeObj.view.breadcrumbs.lblBreadcrumbsRight3.setVisibility(false);
    scopeObj.view.breadcrumbs.btnPreviousPage.setVisibility(true);
    //     scopeObj.view.breadcrumbs.imgBreadcrumbsRight2.setVisibility(true);
    scopeObj.view.breadcrumbs.lblBreadcrumbsRight2.setVisibility(true);
    scopeObj.checkBoxMemberSelected();
  },
//   getformattedSegmentData : function(dataToAdd){
//    var data=this.resultData.info.dataToAdd2;
//     return {
//       "lblName": dataToAdd.name || dataToAdd.Name || kony.i18n.getLocalizedString("i18n.Applications.NA"),
//       "lblContactNo": dataToAdd.PrimaryPhoneNumber|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
//       "lblEmailId": {
//         "text": this.AdminConsoleCommonUtils.getTruncatedString(dataToAdd.PrimaryEmailAddress, 25, 28) || kony.i18n.getLocalizedString("i18n.Applications.NA"),
//         "tooltip": dataToAdd.PrimaryEmailAddress || kony.i18n.getLocalizedString("i18n.Applications.NA")
//       },
//       "lblUserId": dataToAdd.id || kony.i18n.getLocalizedString("i18n.Applications.NA"),
//       "lblUserName":dataToAdd.Username || kony.i18n.getLocalizedString("i18n.Applications.NA"),
//       "lblSeperator": "-",
//       "template": "flxCustSearch",
//     };
//   },
  
  getformattedSegmentData : function(dataToAdd){
    return {
      "lblName": dataToAdd.FirstName+" "+ dataToAdd.LastName|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
      //"lblContactNo": dataToAdd.PrimaryPhoneNumber|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
//       "lblEmailId": {
//         "text": this.AdminConsoleCommonUtils.getTruncatedString(dataToAdd.PrimaryEmailAddress, 25, 28) || kony.i18n.getLocalizedString("i18n.Applications.NA"),
//         "tooltip": dataToAdd.PrimaryEmailAddress || kony.i18n.getLocalizedString("i18n.Applications.NA")
//       },
      "lblUserId": dataToAdd.id || kony.i18n.getLocalizedString("i18n.Applications.NA"),

      "lblUserName":dataToAdd.UserName || kony.i18n.getLocalizedString("i18n.Applications.NA"),

     // "lblUserName":dataToAdd.Username || kony.i18n.getLocalizedString("i18n.Applications.NA"),

      "lblSeperator": "-",
      "template": "flxCustSearch",
    };
  },
  setSearchSegmentData:function(dataToAdd) {
   // var arr=[];
    var dataMap = {
      "flxCustSearch": "flxCustSearch",
      "flxCustSearchWrapper": "flxCustSearchWrapper",
      //"lblContactNo": "lblContactNo",
     // "lblEmailId": "lblEmailId",
      "lblName": "lblName",
      "lblSeperator": "lblSeperator",
      "lblUserId": "lblUserId",
      "lblUserName": "lblUserName"
    };
   var a=JSON.parse(dataToAdd);
  //  var b=a.customers;
    //var c=JSON.parse(b);
   // arr.push(c);
    var data = a.map(this.getformattedSegmentData);
    this.view.searchResults.segListing.widgetDataMap = dataMap;
    this.view.searchResults.segListing.setData(data);
    
    this.view.forceLayout();
  },
  populateResultsOnReachingendCustomerLogs: function(context) {
    var scopeObj = this;
    var pageNo;
    if ((Math.ceil(context.currentTarget.offsetHeight) + Math.ceil(context.currentTarget.scrollTop) === Math.ceil(context.currentTarget.scrollHeight))) {
      pageNo = parseInt(scopeObj.currentPage);
      if (scopeObj.hasNextPage) {
        if (scopeObj.lastAppend === 1) {
          pageNo = pageNo + 1;
        }
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.currentPage = pageNo + 1;
        scopeObj.pageOffset = scopeObj.pageOffset +25;
        scopeObj.newCustomerActivityLogSearch = 0;
        scopeObj.fetchCustomerActivityLogs(false);
      }
    } else if (context.currentTarget.scrollTop === 0) {
      var pageNum = parseInt(scopeObj.currentPage);
      if (pageNum - 1 > 0) {
        if (scopeObj.lastAppend) {
          pageNum = pageNum - 1;
          scopeObj.currentPage = pageNo - 1;
          scopeObj.lastAppend = 0;
        }
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.currentPage = pageNum - 1;
        scopeObj.pageOffset = scopeObj.pageOffset -25;
        scopeObj.newCustomerActivityLogSearch = 0;
        scopeObj.fetchCustomerActivityLogs(false);
      }
    }
  },
  setAdminConsoleLogResultSegmentData:function(logsJSON) {
    var scopeObj=this;
    var dataMap = {
      "flxAdminConsoleLogList": "flxAdminConsoleLogList",
      "flxAdminConsoleLogListMain":"flxAdminConsoleLogListMain",
      "flxAdminConsoleLogWrapper": "flxAdminConsoleLogWrapper",
      "lblEvent": "lblEvent",
      "flxStatus": "flxStatus",
      "lblStatus": "lblStatus",
      "lblIconStatus":"lblIconStatus",
      "lblUserRole": "lblUserRole",
      "lblUserName": "lblUserName",
      "lblModuleName": "lblModuleName",
      "lblSeperator": "lblSeperator",
      "lblDateAndTime": "lblDateAndTime",
      "lblDescription": "lblDescription",
      "flxGroupDesc":"flxGroupDesc",
      "lblJSONData":"lblJSONData",
      "lblDescriptionHeader":   "lblDescriptionHeader",
      "fonticonArrow":"fonticonArrow",
      "flxDropdown": "flxDropdown"

    };
    var logs = [];
        var records = logsJSON.logs;
     if(records) {
      var data = records.map(function(row) {
     // var recordJson = logsJSON.logs[i];
      if(typeof(row.eventts) === "string"){
        row.eventts = parseInt(row.eventts);
      }
       return {
        "lblEvent": row.event || kony.i18n.getLocalizedString("i18n.Applications.NA"),
        "lblUserRole": {
          "text": scopeObj.AdminConsoleCommonUtils.getTruncatedString(row.userRole, 13, 10) || kony.i18n.getLocalizedString("i18n.Applications.NA"),
          "tooltip": row.userRole || kony.i18n.getLocalizedString("i18n.Applications.NA")
        },
        "lblModuleName": {
          "text": scopeObj.AdminConsoleCommonUtils.getTruncatedString(row.moduleName, 26, 23) || kony.i18n.getLocalizedString("i18n.Applications.NA"),
          "tooltip": row.moduleName || kony.i18n.getLocalizedString("i18n.Applications.NA")
        },
        "lblUserName": {
          "text": scopeObj.AdminConsoleCommonUtils.getTruncatedString(row.username, 12, 9) || kony.i18n.getLocalizedString("i18n.Applications.NA"),
          "tooltip": row.username || kony.i18n.getLocalizedString("i18n.Applications.NA")
        },
        
        "lblDescriptionHeader": kony.i18n.getLocalizedString("i18n.View.DESCRIPTION"),
        
        "lblSeperator": "-",
        "flxStatus": "flxStatus",
        "lblIconStatus": (row.status === undefined || row.status === "") ? ({
          "text": ""
        }) : (row.status === "Successful" ? {
          "text": "\ue921",
          "skin": "sknFontIconActivate"
        } : {
          "text": "\ue921",
          "skin": "sknfontIconInactive"
        }),
        "fonticonArrow": {
              "text": "\ue922",
              "skin": "sknfontIconDescRightArrow14px"
              },
         "lblJSONData": {
           "text": row.eventData?"View" : "N/A",
           "isVisible":true,
           "skin": row.eventData?"sknLblLato13px117eb0":"sknlblLatoRegular484b5213px",
           "isVisible":true,
           "onClick": function() {
             scopeObj.populateJsonDataAdminConsole(row);
           },
         },
         
        "flxDropdown": {
              "onClick":scopeObj.expandGroupRowClick
           },

        "lblStatus": row.status || kony.i18n.getLocalizedString("i18n.Applications.NA"),
        "lblDateAndTime": scopeObj.getLocaleDateAndTime(row.eventts) || kony.i18n.getLocalizedString("i18n.Applications.NA"),
        "lblDescription": row.description || kony.i18n.getLocalizedString("i18n.Applications.NA"),
        "template": "flxAdminConsoleLogListMain"
      };  
      //logs.push(data);
         });
    }
    
    this.view.segAdminConsoleResult.segListing.widgetDataMap = dataMap;
    if (logsJSON.page === 1) {
      scopeObj.view.segAdminConsoleResult.flxSegTransactionResults.setContentOffset({
        x: 0,
        y: 5 + "px"
      });
    } else {
      scopeObj.view.segAdminConsoleResult.flxSegTransactionResults.setContentOffset({
        x: 0,
        y: (50 * 20) + "px"
      });
    }
    this.view.flxAdminConsoleResults.setContentOffset({
        x: 0,
        y: 0
      });
    if (this.lastAppend && this.view.segAdminConsoleResult.segListing.data.length > 1) {
      this.lastAppend = 0;
      var segData = this.view.segAdminConsoleResult.segListing.data;
      segData = segData.concat(data);
      this.view.segAdminConsoleResult.segListing.setData(segData);
    } else {
      this.view.segAdminConsoleResult.segListing.setData(data);
    }
    this.view.flxAdminConsoleResultSegment.setVisibility(true);
    document.getElementById("frmLogs_segAdminConsoleResult_flxSegTransactionResults").onscroll = this.populateResultsOnReachingendAdminLogs;
    this.view.forceLayout();
    if(scopeObj.view.segAdminConsoleResult.flxSegTransactionResults.frame.height<this.view.segAdminConsoleResult.segListing.frame.height&&this.view.flxAdminConsoleHeader.info===null){
      this.view.flxAdminConsoleHeader.width=this.view.flxAdminConsoleHeader.frame.width-15+"px";
      this.view.flxAdminConsoleHeader.info=true;
      this.view.forceLayout();
    }
  },
  
  expandGroupRowClick : function(){
    var index = this.view.segAdminConsoleResult.segListing.selectedRowIndex[1];
    var data = this.view.segAdminConsoleResult.segListing.data;
    var selIndices = this.view.segAdminConsoleResult.segListing.selectedRowIndices;
    for(var i=0;i<data.length;i++) {
      if(i === index  &&  data[i].template === "flxAdminConsoleLogListMain") {
        data[i].fonticonArrow.text = "\ue915";
        data[i].fonticonArrow.skin = "sknfontIconDescDownArrow12px";
        data[i].template = "flxAdminConsoleLogList";
        this.view.segAdminConsoleResult.segListing.setDataAt(data[i], i);
      }
      else if(data[i].template === "flxAdminConsoleLogList") {
        data[i].fonticonArrow.text = "\ue922";
        data[i].fonticonArrow.skin = "sknfontIconDescRightArrow14px";
        data[i].template = "flxAdminConsoleLogListMain";
        this.view.segAdminConsoleResult.segListing.setDataAt(data[i], i);
      }
    }
  },

  populateJsonDataAdminConsole: function(row) {
    if(row.eventData)
    {
      var data = [];
      var jsonData = row.eventData;
      this.view.rtxViewJsonData.text = this.encodeHtml(JSON.stringify(JSON.parse(jsonData), null, '\t'));
      // this.view.rtxViewJsonData.text=this.encodeHtml(JSON.stringify((jsonData),null,'\t')); // TODO: add parse
      // this.view.rtxViewJsonData.text=JSON.stringify(jsonData);
      this.view.flxJsonDataPopup.setVisibility(true);
      this.view.flxScrollJsonData.setVisibility(true);
    }
  },

  populateResultsOnReachingendAdminLogs: function(context) {
    var scopeObj = this;
    var pageNo;
    if ((Math.ceil(context.currentTarget.offsetHeight) + Math.ceil(context.currentTarget.scrollTop) === Math.ceil(context.currentTarget.scrollHeight))) {
      pageNo = parseInt(scopeObj.currentPage);
      if (pageNo + 1 <= scopeObj.totalPage) {
        if (this.lastAppend === 1) {
          pageNo = pageNo + 1;
          scopeObj.currentPage = pageNo + 1;
        }
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.currentPage = pageNo + 1;
        scopeObj.newAdminConsoleLogSearch = 0;
        scopeObj.fetchAdminConsoleLogsByFilter("nextPage", scopeObj.currentPage);
      }
    } else if (context.currentTarget.scrollTop === 0) {
      var pageNum = parseInt(scopeObj.currentPage);
      if (pageNum - 1 > 0) {
        if (this.lastAppend) {
          pageNum = pageNum - 1;
          scopeObj.currentPage = pageNo - 1;
          this.lastAppend = 0;

        }
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.currentPage = pageNum - 1;
        scopeObj.newAdminConsoleLogSearch = 0;
        scopeObj.fetchAdminConsoleLogsByFilter("prevPage", scopeObj.currentPage);
      }
    }

  },
  showNorecordsFound:function(){
    var scopeObj=this;
    if(scopeObj.records===0)
    {
      scopeObj.view.flxNoRecords.top = "91px";
      scopeObj.view.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmLogsController.No_results_found")+scopeObj.filterApplied+kony.i18n.getLocalizedString("i18n.frmLogsController.logs");
      scopeObj.view.flxNoRecords.setVisibility(true);
      scopeObj.view.flxScrollableList.setVisibility(false);
      scopeObj.view.forceLayout();
    }
    else
    {
      scopeObj.view.flxNoRecords.setVisibility(false);
      scopeObj.view.flxScrollableList.setVisibility(true);
      scopeObj.view.forceLayout();    
    }
  },
  loadPageData:function(key,isAllSelected){
    var data=this.customFilters;
    var searchResult;
    if(key==="name")
    {
      if(this.filterApplied!=="")//if all not selected then first filter using type
        data = data.filter(this.searchFilterByType);
      searchResult = data.filter(this.searchFilter);
      this.records = data.filter(this.searchFilter).length;
    }
    else if(key==="type")
    {
      searchResult = data.filter(this.searchFilterByType);
      this.records = data.filter(this.searchFilterByType).length;
    }
    this.showFilteredLogs(searchResult,kony.i18n.getLocalizedString("i18n.frmLogsController.search"), isAllSelected);
  },
  searchFilter: function(filterData) {
    var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.search.tbxSearchBox.text);
    if (typeof searchText === "string" && searchText.length > 0) {
      return (
        filterData.Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      );
    } else {
      return true;
    }
  },
  searchFilterByType: function(filterData) {
    var searchText = this.filterApplied;
    if (typeof searchText === "string" && searchText.length > 0) {
      return (
        filterData.LogType.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      );
    } else {
      return true;
    }
  },

  fetchAdminConsoleLogsByFilter: function(paginationType, pageNumber,apply) {
    kony.print("Inside fetchAdminConsoleLogsByFilter() of frmLogsController");
    var scopeObj = this;
    var isFiltersApplied = true;
    if(scopeObj.filtersSelected["Status"] !== undefined) {
      if(scopeObj.filtersSelected["Status"].length === 0) {
        isFiltersApplied = false;
      }
    }
    if(scopeObj.filtersSelected["UserRole"] !== undefined) {
      if(scopeObj.filtersSelected["UserRole"].length === 0) {
        isFiltersApplied = false;
      }
    }
    if(scopeObj.filtersSelected["Event"] !== undefined) {
      if(scopeObj.filtersSelected["Event"].length === 0) {
        isFiltersApplied = false;
      }
    }
    if(isFiltersApplied === false) {
      scopeObj.view.rtxNorecords.text=kony.i18n.getLocalizedString("i18n.frmLogs.rtxNoResultsFound");
      scopeObj.view.flxNoResultsFound.setVisibility(true);
      scopeObj.view.flxNoResultsFound.skin="slFbox";
      scopeObj.view.flxNoResultsFound.top = "160px"; 
      scopeObj.view.flxAdminConsoleResultSegment.setVisibility(false);
    }
    else {
      if(apply===true)
      {
        scopeObj.apply = true;   
      }
      else{
        scopeObj.apply = false;
      }
      var filterDataJSON = {"FilterData" : {} };

      var moduleName = scopeObj.view.listBoxSearchParamAdmin1.selectedKeyValue[1];
      if(moduleName != "All") {
        filterDataJSON.FilterData.ModuleName  = moduleName;
      }
      var rangeType = scopeObj.view.datePickerAdminConsole.value;  
      if(rangeType !== "") {
        var StartDate = rangeType.substring(0, rangeType.indexOf(" - "));
        filterDataJSON.FilterData.StartDate = StartDate;
        var EndDate = rangeType.substring(rangeType.indexOf(" - ")+3);
            filterDataJSON.FilterData.EndDate = EndDate;
          }

          // ** PAGINATION **
          if(paginationType === "nextPage" || paginationType === "prevPage" || paginationType === "pageChange") {
            filterDataJSON.FilterData.PageNumber = pageNumber;
          }


          // *SEARCH*
          var adminSearchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.tbxAdminConsoleSearch.text);
          if(adminSearchText !== "") {
            filterDataJSON.FilterData.SearchText = adminSearchText;
          }

          // *SORT*
          if(scopeObj.sortColumn !== "") {
            filterDataJSON.FilterData.SortBy = scopeObj.sortColumn;
            filterDataJSON.FilterData.SortDirection = scopeObj.sortDirection;
          }

          // *FILTER*
          var noFiltersSelected = false;
          for(var key in scopeObj.filtersSelected) {
            if(scopeObj.filtersSelected[key].length === 0) {
              noFiltersSelected = true;
              // scopeObj.view.segTransactionResult.segListing.removeAll();
            }
            else if(scopeObj.filtersSelected[key].length !== 0 && scopeObj.filtersSelected[key].length != scopeObj.totalFiltersCount[key].length) {
              filterDataJSON.FilterData[key] = scopeObj.filtersSelected[key];
            }
          }
          kony.print("filterAdminConsoleDataJSON: "+JSON.stringify(filterDataJSON));
          kony.adminConsole.utils.showProgressBar(scopeObj.view);
      if(scopeObj.view.flxAdminConsoleHeader.info===true){
      	  scopeObj.view.flxAdminConsoleHeader.width=scopeObj.view.flxAdminConsoleHeader.frame.width+15+"px";
      }
      scopeObj.view.flxAdminConsoleHeader.info=null;
          scopeObj.presenter.fetchAdminConsoleLogs(filterDataJSON);
         }
    scopeObj.view.forceLayout();
  }, 

  fetchCustomerActivityLogs : function(apply){
    var scopeObj = this;
    if(apply===true)
    {
      scopeObj.apply = true;   
    }
    else{
      scopeObj.apply = false;
    }
    var selectedModule = scopeObj.view.listBoxSearchParamCustomer3.selectedKey;
    selectedModule = selectedModule === "mAll" ? "" :selectedModule;
    var selectedActivity = scopeObj.view.listBoxSearchParam2.selectedKey;
    selectedActivity = (selectedActivity === "sAll") ? "" : selectedActivity;
    var isMemberActivity = (scopeObj.view.imgRadioExistingCustomer.src === "radio_selected.png");
    var searchText = "";
    var startDate = "";
    var endDate="";
    var custSearchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.tbxCustomerSearchBox.text);
    if(custSearchText !== ""){
      searchText = custSearchText ;
    }
    var ranges = scopeObj.view.datePickerCustomerLog.value;
    if(ranges !== "") {
      var dates = scopeObj.returnDateFormat(ranges);
      startDate= dates[0];
      endDate = dates[1];
    }
    var payload ={
                "username":scopeObj.customerObj.username,
                "customerid":scopeObj.customerObj.id,
                "searchText":searchText,  
      			"isCSRAssist":!isMemberActivity,
                "module":selectedModule,
                "activityType":selectedActivity,
                "startDate":startDate,
                "endDate":endDate,
      			"sortVariable":scopeObj.sortColumn||"",
                "sortDirection":scopeObj.sortDirection||"DESC",
                "pageSize":"50",
                "pageOffset":scopeObj.pageOffset
    };
    scopeObj.view.rtxNorecords.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNoResultsFound");
    scopeObj.view.flxNoResultsFound.setVisibility(false);
    scopeObj.view.flxAdminConsoleResultSegment.setVisibility(true);
    scopeObj.view.forceLayout();
    kony.adminConsole.utils.showProgressBar(scopeObj.view); 
    this.presenter.searchCustomerAuditLogs(payload,"CUSTOMER");
  },
  resetSortImages: function() {
    var scopeObj = this;
    scopeObj.filtersSelected = {};
    scopeObj.view.lblSortModule.text = "\ue92b";
    scopeObj.view.lblSortModule.skin = "sknIcon15px";
    scopeObj.view.lblSortUserName.text = "\ue92b";
    scopeObj.view.lblSortUserName.skin = "sknIcon15px";
    scopeObj.view.lblSortAmount.text = "\ue92b";
    scopeObj.view.lblSortAmount.skin = "sknIcon15px";
    scopeObj.view.lblSortPayeeName.text = "\ue92b";
    scopeObj.view.lblSortPayeeName.skin = "sknIcon15px";
    scopeObj.view.lblSortCustomerId.text = "\ue92b";
    scopeObj.view.lblSortCustomerId.skin = "sknIcon15px";
  },
  resetSortImagesAdmin: function() {
    var scopeObj = this;
    scopeObj.view.lblSortAdminConsoleModuleName.text = "\ue92b";
    scopeObj.view.lblSortAdminConsoleModuleName.skin = "sknIcon15px";
    scopeObj.view.lblSortAdminConsoleDateAndTime.text = "\ue92b";
    scopeObj.view.lblSortAdminConsoleDateAndTime.skin = "sknIcon15px";
    scopeObj.view.lblSortAdminConsoleUserName.text = "\ue92b";
    scopeObj.view.lblSortAdminConsoleUserName.skin = "sknIcon15px";
  },
  onDownloadTransactionLogs :function(){
   var scopeObj =this;
    if(!scopeObj.view.flxNoResultsFound.isVisible){
      var mfURL = KNYMobileFabric.mainRef.config.reportingsvc.session.split("/services")[0];
      var reportGeneratedBy=kony.mvc.MDAApplication.getSharedInstance().appContext.userFullName;
      var downloadURL = mfURL + "/services/data/v1/AuditLogsObjSvc/operations/TransactionAndAuditLogs/exportTransactionalLogs?generatedBy=" + reportGeneratedBy;
      var ServiceName = scopeObj.view.listBoxSearchParam1.selectedKey;
      downloadURL = downloadURL + "&module=" + Array.from(scopeObj.transactionalModules.keys()).join(",");
      if(ServiceName.toLowerCase() != "all") {
        downloadURL = downloadURL + "&activityType=" + ServiceName;
      }
      var rangeType = scopeObj.view.datePickerTransaction.value;  
      if(rangeType !== "") {
        var dates = scopeObj.returnDateFormat(rangeType);
        downloadURL = downloadURL + "&startDate=" + dates[0];
        downloadURL = downloadURL + "&endDate=" + dates[1];
      }
      var searchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.tbxTransactionSearch.text);
      if(searchText !== "") {
        downloadURL = downloadURL + "&searchText=" + searchText ;
      }
      var selectedAmount = scopeObj.view.lblSelectedAmount.text;
      if(selectedAmount != "Select amount Range") {
        var StartAmount = selectedAmount.substring(0, selectedAmount.indexOf("-"));
        var EndAmount = selectedAmount.substring(selectedAmount.indexOf("-")+1);
        downloadURL = downloadURL + "&startAmount=" + StartAmount ;
        downloadURL = downloadURL + "&endAmount=" + EndAmount ;
      }
      if(scopeObj.sortColumn !== "") {
        downloadURL = downloadURL + "&sortVariable=" + scopeObj.sortColumn;
        downloadURL = downloadURL + "&sortDirection=" + scopeObj.sortDirection;
      }
      for (var key in scopeObj.filtersSelected) {
        if (scopeObj.filtersSelected[key].length !== 0 && scopeObj.filtersSelected[key].length != scopeObj.totalFiltersCount[key].length) {
          downloadURL = downloadURL + "&" + key + "=" + JSON.stringify(scopeObj.filtersSelected[key]) ;
        }
      }
      scopeObj.callDownloadCSVService(downloadURL,"TransactionLogs");
    }
  },
  
  onDownloadCustomerActivityLogs: function() {
    var scopeObj = this;
    if (!scopeObj.view.flxNoResultsFound.isVisible) {
     // var authToken = KNYMobileFabric.currentClaimToken;
      var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
      var mfURL = KNYMobileFabric.mainRef.config.reportingsvc.session.split("/services")[0];
      var startDate = "";
      var endDate="";
      var activityType="";
      var module="";
      var reportGeneratedBy=kony.mvc.MDAApplication.getSharedInstance().appContext.userFullName;
      var downloadURL = mfURL + "/services/data/v1/AuditLogsObjSvc/operations/TransactionAndAuditLogs/exportCustomerActivityLogs" + "?generatedBy=" + reportGeneratedBy;
      //downloadURL = downloadURL + "&name=" + scopeObj.customerObj.name;
      downloadURL = downloadURL + "&username=" + scopeObj.customerObj.username;
      downloadURL = downloadURL + "&customerid=" + scopeObj.customerObj.id;
      var isMemberActivity="";
      if(scopeObj.view.imgRadioExistingCustomer.src === "radio_selected.png"){
      isMemberActivity = true;  
      }
      else{
        isMemberActivity=false;
      }
      downloadURL = downloadURL + "&isCSRAssist=" + !isMemberActivity;
      if (scopeObj.view.listBoxSearchParam2.selectedKeyValue[1] !== "All") {
        downloadURL = downloadURL + "&activityType=" +  scopeObj.view.listBoxSearchParam2.selectedKey;
        activityType=scopeObj.view.listBoxSearchParam2.selectedKey;
      }
      else{
        activityType="All";
      }
      if (isMemberActivity && scopeObj.view.listBoxSearchParamCustomer3.selectedKeyValue[1].trim() !== "All") {
        downloadURL = downloadURL + "&module=" +  scopeObj.view.listBoxSearchParamCustomer3.selectedKey;
        module=scopeObj.view.listBoxSearchParamCustomer3.selectedKey;
      }
      else{
        module="All";
      }
      var custSearchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.tbxCustomerSearchBox.text);
      if (custSearchText !== "") {
        downloadURL = downloadURL + "&searchText=" + custSearchText;
      }
      var ranges = scopeObj.view.datePickerCustomerLog.value;
      if(ranges !== "") {
        var dates = scopeObj.returnDateFormat(ranges);
        startDate= dates[0];
        endDate = dates[1];
        downloadURL = downloadURL + "&startDate=" + startDate;
        downloadURL = downloadURL + "&endDate=" + endDate;
      }
      for (var key in scopeObj.filtersSelected) {
        if (scopeObj.filtersSelected[key].length !== 0 && scopeObj.filtersSelected[key].length != scopeObj.totalFiltersCount[key].length) {
          downloadURL = downloadURL + "&" + key + "=" + JSON.stringify(scopeObj.filtersSelected[key]);
        }
      }
        var downloadLink = document.createElement("a");
      downloadURL = downloadURL + "&sortDirection=" + scopeObj.sortDirection||"desc";
      downloadURL = downloadURL + "&sortVariable=" + scopeObj.sortColumn||"";
      downloadURL = downloadURL + "&offset=" + new Date().getTimezoneOffset();
      
      scopeObj.callDownloadCSVService(downloadURL, "CustomerSpecificLogs");
    }
  },
  
  
  onDownloadAdminConsoleLogs : function(){
    var scopeObj = this;
    if(!scopeObj.view.flxNoResultsFound.isVisible){
      var reportGeneratedBy=kony.mvc.MDAApplication.getSharedInstance().appContext.userFullName;
      var mfURL = KNYMobileFabric.mainRef.config.reportingsvc.session.split("/services")[0]; 
      var downloadURL = mfURL + "/services/data/v1/AuditLogsObjSvc/operations/TransactionAndAuditLogs/exportAdminConsoleLogs?generatedBy=" + reportGeneratedBy;
      var moduleName = scopeObj.view.listBoxSearchParamAdmin1.selectedKeyValue[1];
      if (moduleName != "All") {
        downloadURL = downloadURL + "&ModuleName=" + moduleName ;
      }
      var rangeType = scopeObj.view.datePickerAdminConsole.value;
      if (rangeType !== "") {
        var StartDate = rangeType.substring(0, rangeType.indexOf(" - "));
        downloadURL = downloadURL + "&StartDate=" + StartDate ;
        var EndDate = rangeType.substring(rangeType.indexOf(" - ") + 3);
        downloadURL = downloadURL + "&EndDate=" + EndDate ;
      }
      var adminSearchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.tbxAdminConsoleSearch.text);
      if (adminSearchText !== "") {
        downloadURL = downloadURL + "&SearchText=" + adminSearchText;
      }
      if (scopeObj.sortColumn !== "") {
        downloadURL = downloadURL + "&SortBy=" + scopeObj.sortColumn;
        downloadURL = downloadURL + "&SortDirection=" + scopeObj.sortDirection;
      }
      for (var key in scopeObj.filtersSelected) {
        if (scopeObj.filtersSelected[key].length !== 0 && scopeObj.filtersSelected[key].length != scopeObj.totalFiltersCount[key].length) {
          downloadURL = downloadURL + "&" + key + "=" + JSON.stringify(scopeObj.filtersSelected[key]) ;
        }
      }
      downloadURL = downloadURL + "&offset=" + new Date().getTimezoneOffset() ;
      scopeObj.callDownloadCSVService(downloadURL,"AdminConsoleLogs");
    }
  },
  setOtherInfo: function(otherInfo) {
    otherInfo=Object.entries(otherInfo);
    var scopeObj = this;
    var flxWidth = 946;
    scopeObj.view.flxScrollOtherInfo.removeAll();
    if (otherInfo && otherInfo.length > 0) {
      var count = 0;
      var screenWidth = 986;
      var maxNoOfColumns = 3;
      var noOfRows = Math.ceil(otherInfo.length / maxNoOfColumns);
      var top = 0;
      scopeObj.view.flxOtherInfoPopup.setVisibility(true);
      for (var i = 0; i < noOfRows; i++) {
        var noOfColumns = (i == (noOfRows - 1)) ? (otherInfo.length - count) : maxNoOfColumns;
        var leftOffset = 0;
        var otherInfoToAdd = new com.adminConsole.view.details({
          "autogrowMode": kony.flex.AUTOGROW_NONE,
          "id": "otherInfo" + count,
          "isVisible": true,
          "layoutType": kony.flex.FREE_FORM,
          "masterType": constants.MASTER_TYPE_DEFAULT,
          "width": flxWidth + "px",
          "top": top + "px",
          "left": leftOffset + "px"
        }, {}, {});
        var j = 0;
        otherInfoToAdd.lblHeading1.text = otherInfo[count][0].toUpperCase();
        var lblData = scopeObj.encodeHtml(otherInfo[count][1]) || "N/A";
        otherInfoToAdd.lblData1.text = scopeObj.AdminConsoleCommonUtils.getTruncatedString(lblData, 33, 30);
		otherInfoToAdd.lblData1.tooltip = lblData;
        j++;
        if (j === 1 && j >= noOfColumns) {
          otherInfoToAdd.flxColumn2.setVisibility(false);
          otherInfoToAdd.flxColumn3.setVisibility(false);
        } else {
          lblData = scopeObj.encodeHtml(otherInfo[count+1][1]) || "N/A";
          otherInfoToAdd.lblHeading2.text = otherInfo[count + 1][0].toUpperCase();
          otherInfoToAdd.lblData2.text = scopeObj.AdminConsoleCommonUtils.getTruncatedString(lblData, 33, 30);
		  otherInfoToAdd.lblData2.tooltip = lblData;
          
          j++;
          if (j === 2 && j >= noOfColumns) {
            otherInfoToAdd.flxColumn3.setVisibility(false);
          } else {
            lblData = scopeObj.encodeHtml(otherInfo[count+2][1]) || "N/A";
            otherInfoToAdd.lblHeading3.text = otherInfo[count + 2][0].toUpperCase();
            otherInfoToAdd.lblData3.text = scopeObj.AdminConsoleCommonUtils.getTruncatedString(lblData, 33, 30);
		    otherInfoToAdd.lblData3.tooltip = lblData;
          }
        }
        scopeObj.view.flxScrollOtherInfo.add(otherInfoToAdd);
        top = top + 60;
        count = count + 3;
      }
    }
    this.view.flxOtherInfoPopup.setVisibility(true);
    this.view.tabs.flxTabsContainer.skin = "slFbox";
    this.subTabsButtonUtilFunction([this.view.tabs.btnTab1, this.view.tabs.btnTab2], this.view.tabs.btnTab1);
    this.view.tabs.btnTab1.height="48px";
    this.view.tabs.btnTab1.bottom="-3px";
    this.view.tabs.btnTab2.height="48px";
    this.view.tabs.btnTab2.bottom="-3px";
    this.view.flxScrollOtherInfo.setVisibility(true);
    this.view.flxScrollViewJson.setVisibility(false);
    this.view.forceLayout();
  },
  returnColumnFieldsForTransactional : function() {
    var scopeObj = this;
	var data = ["module","activity type","customer id","customer username","from account","to account","amount","currency","payee name","payee id","person id","status","channel","date and time" , "mfa type" , "mfa service type" ,
	"mfa state","device","os","deviceid","ip address","reference number","other info"];
    var segdata = scopeObj.returnDataToMap(data);
    this.view.customListBoxTransactional.segList.setData(segdata);
    var selectedindices = [];
   // var labelText = "";
    scopeObj.view.customListBoxTransactional.imgCheckBox.src = "checkboxselected.png";
    var segdata = scopeObj.view.customListBoxTransactional.segList.data;
    for(var index = 0; index < segdata.length; index++) {
      selectedindices.push(index);
     // labelText = labelText + "," +segdata[index].lblDescription.text
    }
    scopeObj.view.customListBoxTransactional.segList.selectedRowIndices = [[0, selectedindices]];
    //scopeObj.view.customListBoxTransactional.lblSelectedValue.tooltip = labelText;
    scopeObj.view.customListBoxTransactional.lblSelectedValue.text = segdata.length + " selected";
  },
  returnDataToMap : function(data) {
    var widgetMappedData = [];
    for (var index = 0; index < data.length; index++) { 
      var temp = {
        "id": data[index],
        "lblDescription": {"text":data[index].toUpperCase()},
        "imgCheckBox": {"src":"checkboxnormal"},
        "template": "flxSearchDropDown"
      };
      widgetMappedData.push(temp);
    } 
    return widgetMappedData;
  },
   populateColumnListCustomerActivity : function(list){
    var isMemberActivity = (this.view.imgRadioExistingCustomer.src === "radio_selected.png");
    var tempList=JSON.parse(JSON.stringify(list));
     if(!isMemberActivity){
       tempList.splice(2,0,{
         id: "admin_name",
         value: "Employee Username"
       }, {
         id: "admin_role",
         value: "Employee Role"
       });
     }
    var self = this;
    var widgetPath = self.view.customListboxApps;
    var data = self.mapCustomerColumnsList(tempList);
    widgetPath.segList.setData(data);
    widgetPath.segList.selectedIndices =[[0,[0]]];
    widgetPath.lblSelectedValue.text = "All";
    widgetPath.imgCheckBox.src = self.checkboxnormal;
    self.onClickOfSelectAll();
  },
  mapCustomerColumnsList: function(data) {
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
          "lblDescription": {"text":rec.value},
          "imgCheckBox": {"src":self.checkboxnormal},
          "template": "flxSearchDropDown"
        };
      });
    }
    return listBoxData;
  },
  resetActivityTypeList : function(){
     var moduleKey = this.view.listBoxSearchParamCustomer3.selectedKey;
    var activityTypes = this.customerActivityTypes;
    var modules = this.customerActivityModules;
    var activitiesToConsider=[];
    var selectedModule="";
	activitiesToConsider.push(["sAll","All"]);
    for(var j=0; j<activityTypes.length; j++) {
      if(moduleKey === activityTypes[j].eventtypeid || moduleKey === "mAll")
        activitiesToConsider.push([activityTypes[j].id,activityTypes[j].Name]);
    }
    this.view.listBoxSearchParam2.masterData = activitiesToConsider;
    for(var k=0; k<modules.length; k++) {
      if(moduleKey === modules[k].id)
        selectedModule = modules[k].ActivityType;
      else if(moduleKey === "mAll")
        selectedModule = "ALL";
    }
    this.selectedModule=selectedModule;
    this.populateColumnListCustomerActivity(selectedModule==="ALL"?this.listTransNonTrans:(selectedModule === "TRANSACTIONAL"?this.listPrimaryFieldsTransactional:this.listPrimaryFieldsNonTransactional));
    this.view.forceLayout(); 
  },
  resetColumnsOnActivitySelection : function(){
    var selectedActivityId=this.view.listBoxSearchParam2.selectedKey;
    var selectedModule = this.selectedModule;
    var modules = this.customerActivityModules;
    var activities = this.customerActivityTypes;
    var selectedEventTypeId="";
    if (selectedModule === "ALL"){
      if(selectedActivityId === "sAll")
        selectedModule = "ALL";
      else{
        for(var j=0; j<activities.length; j++) {
          if(selectedActivityId === activities[j].id)
            selectedEventTypeId = activities[j].eventtypeid;
        }
        for(var k=0; k<modules.length; k++) {
        if(selectedEventTypeId === modules[k].id)
          selectedModule = modules[k].ActivityType;
      }
     }
    }
    this.populateColumnListCustomerActivity(selectedModule==="ALL"?this.listTransNonTrans:(selectedModule === "TRANSACTIONAL"?this.listPrimaryFieldsTransactional:this.listPrimaryFieldsNonTransactional));
    this.view.forceLayout(); 
  },
  displayCustomerActivityLogs:function(context){
    var scopeObj=this;
    var count = context.logs.length;
    scopeObj.view.flxModifySearch.setVisibility(false);
    scopeObj.view.lblCustomerName3.text = scopeObj.customerObj.name ;
    scopeObj.view.flxMainContent.setVisibility(true);
    scopeObj.view.flxMainContent.top="120px";
    scopeObj.view.flxCustomerDetailedResults.setVisibility(true);
    scopeObj.view.flxCustomerContent.setVisibility(true);
    scopeObj.setCustomerSelectedColumns();
	scopeObj.view.mainHeader.btnDropdownList.setVisibility(true);
    scopeObj.view.flxBreadCrumbs.setVisibility(true);
    scopeObj.view.lblUserData.text = scopeObj.customerObj.username;
    scopeObj.view.lblCustomerIDData.text = scopeObj.customerObj.id;
    if(count === 0 || scopeObj.selectedColumns.length === 0){
      scopeObj.view.rtxNorecords.text=(count === 0)?kony.i18n.getLocalizedString("i18n.frmLogs.rtxNoResultsFound"):"No columns were selected for displaying the result.";
      scopeObj.view.flxNoResultsFound.setVisibility(true);
      scopeObj.view.flxNoResultsFound.skin="slFbox";
      scopeObj.view.flxNoResultsFound.top = "160px"; 
      scopeObj.view.flxPaginationCustomerLog.setVisibility(false);
      scopeObj.view.flxResults.setVisibility(false);
    }
    else{
      scopeObj.view.flxResults.setVisibility(true);
      scopeObj.setSearchDetailedResultAllSegmentData(context);
    }
    scopeObj.view.forceLayout(); 
  },
  setSearchDetailedResultAllSegmentData: function(context) {
    var records = context.logs;
    var scopeObj = this;
    scopeObj.pageOffset = context.pageOffset;
    scopeObj.resetHeaderColumnsCustomer();
    var count = this.selectedColumns.length;
    var width = (count * 120) + 40;
    var calSegWidth = kony.os.deviceInfo().screenWidth - 412;
    var lblWidth = 120;
    if (width < calSegWidth) lblWidth = Math.ceil((calSegWidth - 40) / count);
    width = width <= calSegWidth ? calSegWidth + "px" : width + "px";
    this.view.flxDetailedResultSegment.width = width;
    this.view.flxCustomerLogsHeader.width = width;
    this.view.segDynamicCustomerLogs.height = ((context.logs.length) * 50) + 24 + "px";
    this.view.flxResults.height = kony.os.deviceInfo().screenHeight - 336 + "px";
    this.view.flxDynamicLogsScroll.height = kony.os.deviceInfo().screenHeight - 401 + "px";
    var modulesMap = new Map(scopeObj.view.listBoxSearchParamCustomer3.masterData);
    var activityMap = new Map(scopeObj.view.listBoxSearchParam2.masterData);
    var columnsToDisplay = scopeObj.setVisibilityOffColumns(lblWidth + "px");
    var statusWidth = lblWidth;
    var noOfChars = Math.floor(((lblWidth - 20) * 8) / 100);
    lblWidth = (lblWidth - 20) + "px";
    var dataMap = {
      "lblEvent": "lblEvent",
      "lblEventSubType": "lblEventSubType",
      "lblAdminName": "lblAdminName",
      "lblAdminRole": "lblAdminRole",
      "lblStatus": "lblStatus",
      "lblIconStatus": "lblIconStatus",
      "lblChannel": "lblChannel",
      "lblDeviceBrowser": "lblDeviceBrowser",
      "lblOs": "lblOs",
      "lblIPAddress": "lblIPAddress",
      "lblDeviceId": "lblDeviceId",
      "lblPayeeName": "lblPayeeName",
      "lblPayeeId": "lblPayeeId",
      "lblPersonId": "lblPersonId",
      "lblAccount": "lblAccount",
      "lblDate": "lblDate","lblFromAccount": "lblFromAccount",
      "lblToAccount": "lblToAccount",
      "lblAmount": "lblAmount",
      "lblRefNumber": "lblRefNumber",
      "lblCurrency": "lblCurrency",
      "lblCheckNum": "lblCheckNum",
      "lblMFAType": "lblMFAType",
      "lblMFAServiceKey": "lblMFAServiceKey",
      "lblMFAState": "lblMFAState",
      "lblOtherInfo": "lblOtherInfo",
      "flxLogs" : "flxLogs",
      "flxOtherInfo" : "flxOtherInfo",
      "lblSeperator" : "lblSeperator",
      "flxStatus":"flxStatus"
    };
    var data = [];
    if(records) {
      data = records.map(function(row) {
		if(typeof(row.createdts) === "string"){
          row.createdts= parseInt(row.createdts);
        }
        return {
          "lblEvent": {
            "text": scopeObj.AdminConsoleCommonUtils.getTruncatedString(modulesMap.get(row.eventType), noOfChars+3, noOfChars) || scopeObj.AdminConsoleCommonUtils.getTruncatedString(row.eventType, noOfChars+3, noOfChars) || kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "tooltip": modulesMap.get(row.eventType) || row.eventType || kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "isVisible": columnsToDisplay.includes("evt"),
            "width": lblWidth
          },
          "lblEventSubType": {
            "text": scopeObj.AdminConsoleCommonUtils.getTruncatedString(activityMap.get(row.eventSubType), noOfChars+3, noOfChars) || scopeObj.AdminConsoleCommonUtils.getTruncatedString(row.eventSubType, noOfChars+3, noOfChars) || kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "tooltip": activityMap.get(row.eventSubType) || row.eventSubType || kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "isVisible": columnsToDisplay.includes("evt_subtype"),
            "width": lblWidth
          },"lblAdminName":{
            "text": scopeObj.AdminConsoleCommonUtils.getTruncatedString(row.adminUserName, noOfChars+3, noOfChars)|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "tooltip": row.adminUserName || kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "isVisible":columnsToDisplay.includes("admin_name"),"width" : lblWidth
          },
          "lblAdminRole":{
            "text": scopeObj.AdminConsoleCommonUtils.getTruncatedString(row.adminUserRole, noOfChars+3, noOfChars)|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "tooltip": row.adminUserRole || kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "isVisible":columnsToDisplay.includes("admin_role"),"width" : lblWidth
          },
           "flxStatus":{
             "isVisible":columnsToDisplay.includes("status"),"width" : statusWidth+"px"
           },
          "lblStatus": {
            "text": row.status_Id=="SID_EVENT_SUCCESS"?"Success":"Failure"|| "N/A",
            "isVisible":columnsToDisplay.includes("status")
          }, 
          "lblIconStatus": {
            "text":"\ue921",
            "skin":row.status_Id === "SID_EVENT_SUCCESS" ? "sknFontIconActivate": "sknfontIconInactive",
            "isVisible": columnsToDisplay.includes("status")
          },
          "lblChannel": {
            "text": row.channel|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "isVisible":columnsToDisplay.includes("channel"),"width" : lblWidth
          }, 
          "lblDeviceBrowser": {
            "text":  scopeObj.AdminConsoleCommonUtils.getTruncatedString(row.deviceModel, noOfChars+3, noOfChars)|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "tooltip": row.deviceModel|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "isVisible":columnsToDisplay.includes("device_browser"),"width" : lblWidth
          },
          "lblOs": {
            "text": row.operatingSystem|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "isVisible":columnsToDisplay.includes("os"),"width" : lblWidth
          }, 
          "lblIPAddress": {
            "text": row.ipAddress|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "isVisible":columnsToDisplay.includes("ip_address"),"width" : lblWidth
          }, 
          "lblDeviceId": {
            "text":  scopeObj.AdminConsoleCommonUtils.getTruncatedString(row.deviceId, noOfChars+3, noOfChars)|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "tooltip": row.deviceId|| "N/A",
            "isVisible":columnsToDisplay.includes("device_id"),"width" : lblWidth
          },
          "lblPayeeName": {
            "text": row.payeeNickName || kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "isVisible":columnsToDisplay.includes("payee_name"),"width" : lblWidth
          }, 
          "lblPayeeId" : {
            "text" :  (row.payee_id === "0" ? kony.i18n.getLocalizedString("i18n.Applications.NA") : row.payee_id)||kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "isVisible" : columnsToDisplay.includes("payee_id"),"width" : lblWidth
          },
        "lblPersonId" : {
          "text" : (row.person_Id === "0" ? kony.i18n.getLocalizedString("i18n.Applications.NA") : row.person_Id)||kony.i18n.getLocalizedString("i18n.Applications.NA"),
          "isVisible" : columnsToDisplay.includes("person_id"),"width" : lblWidth
          },        
          "lblAccount": {
            "text": row.relationshipNumber || kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "isVisible":columnsToDisplay.includes("acc_details"),"width" : lblWidth
          }, 
          "lblDate": {
            "text": scopeObj.getLocaleDateAndTime(row.createdts)|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "isVisible":columnsToDisplay.includes("date"),"width" : lblWidth,
            "tooltip":scopeObj.getLocaleDateAndTime(row.createdts)|| kony.i18n.getLocalizedString("i18n.Applications.NA")
          }, 
          "lblFromAccount": {
            "text": scopeObj.AdminConsoleCommonUtils.getTruncatedString(row.fromAccountNumber, noOfChars+3, noOfChars)|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "tooltip": row.fromAccountNumber|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "isVisible":columnsToDisplay.includes("from_account"),"width" : lblWidth
          }, 
          "lblToAccount": {
            "text": scopeObj.AdminConsoleCommonUtils.getTruncatedString(row.toAccountNumber, noOfChars+3, noOfChars)|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "tooltip": row.toAccountNumber|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "isVisible":columnsToDisplay.includes("to_account"),"width" : lblWidth
          }, 
          "lblAmount": {
            "text": row.amount|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "isVisible":columnsToDisplay.includes("amount"),"width" : lblWidth
          }, 
          "lblRefNumber": {
            "text": row.reference_id|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "isVisible":columnsToDisplay.includes("ref_no"),"width" : lblWidth
          }, 
          "lblCurrency": {
            "text": row.transactionCurrency|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "isVisible":columnsToDisplay.includes("currency"),"width" : lblWidth
          }, 
          "lblMFAType": {
            "text": scopeObj.AdminConsoleCommonUtils.getTruncatedString(row.mfa_Type, noOfChars+3, noOfChars)|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "tooltip": row.mfa_Type|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "isVisible":columnsToDisplay.includes("mfaType"),"width" : lblWidth
          }, 
          "lblMFAServiceKey": {
            "text": scopeObj.AdminConsoleCommonUtils.getTruncatedString(row.mfa_ServiceKey, noOfChars+3, noOfChars)|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "tooltip": row.mfa_ServiceKey|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "isVisible":columnsToDisplay.includes("mfaServiceKey"),"width" : lblWidth
          }, 
          "lblMFAState": {
            "text":  row.mfa_State|| kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "isVisible":columnsToDisplay.includes("mfa_state"),"width" : lblWidth
          },
          "lblOtherInfo": {
            "text": "View",
            "isVisible":columnsToDisplay.includes("otherInfo"),"width" : lblWidth
          }, 
          "flxLogs":{
            "width":width
          },
          "flxOtherInfo": {
            "onClick": function(){
             scopeObj.setOtherInfo(scopeObj.populateSecondaryInfoCustomer(row));
            },"width" : lblWidth
          },
          "lblSeperator":"-",
          "template": "flxDynamicLogs"
        };
      });
    }
    this.view.segDynamicCustomerLogs.widgetDataMap = dataMap;
    if (context.pageOffset === 0 || this.apply === true) {
      scopeObj.view.flxDynamicLogsScroll.setContentOffset({
        x: 0,
        y: 5 + "px"
      });
    } else {
      scopeObj.view.flxDynamicLogsScroll.setContentOffset({
        x: 0,
        y: (50 * 20) + "px"
      });
    }
    if (this.lastAppend && this.view.segDynamicCustomerLogs.data.length > 1) {
      this.lastAppend = 0;
      var segData = this.view.segDynamicCustomerLogs.data;
      segData = segData.concat(data);
      this.view.segDynamicCustomerLogs.setData(segData);
    } else {
      this.view.segDynamicCustomerLogs.setData(data);
    }
    if (this.apply === true) {
      scopeObj.view.flxResults.setContentOffset({
        x: 5,
        y: 0 + "px"
      });
    }
    this.view.segDynamicCustomerLogs.setData(data);
    document.getElementById("frmLogs_flxDynamicLogsScroll").onscroll = this.populateResultsOnReachingendCustomerLogs;
    this.view.flxFiltersAndHeaders.setVisibility(false);
    this.view.forceLayout();
  },
  resetHeaderColumnsCustomer : function() {
    var self =  this;
    var flexChildrenlength = self.view.flxLogs.children.length;
    for(var i = 0; i < flexChildrenlength; i++) {
      self.view[self.view.flxLogs.children[i]].setVisibility(false);
    }
  },
  populateSecondaryInfoCustomer: function(row) {
    var data = [];
    this.view.rtxViewJson.text=this.encodeHtml(JSON.stringify(JSON.parse(row.eventData),null,'\t'));
    var primaryFields = ["eventType", "eventSubType", "customer_Id", "userName","adminUserName","adminUserRole","fromAccountNumber", "toAccountNumber", "amount", "transactionCurrency", "payeeNickName","relationshipNumber","payee_id","person_Id","status_Id", "channel", "deviceModel",
                         "operatingSystem", "deviceId", "ipAddress", "reference_id","createdts","mfa_Type","mfa_ServiceKey","mfa_State","transactionCurrency","eventData"];
    var temp = JSON.parse(JSON.stringify(row));
    for (var index = 0; index < primaryFields.length; index++) {
      delete temp[primaryFields[index]];
    }
    return temp;
  },
  populateSecondaryInfoTransactional : function(row){
    var self =this;
    this.view.rtxViewJson.text=self.encodeHtml(JSON.stringify(JSON.parse(row.eventData),null,'\t'));
    var primaryFields = ["eventType","eventSubType","customer_Id","userName","fromAccountNumber","toAccountNumber","amount","transactionCurrency","payeeNickName","relationshipNumber","payee_id","person_Id","status_Id","channel","transactionDate" , "mfa_Type" , "mfa_ServiceKey" ,
                         "mfa_State",
                         "deviceModel","operatingSystem","deviceId","ipAddress","reference_id","eventData"];
    var temp = JSON.parse(JSON.stringify(row));
    for(var index = 0; index < primaryFields.length;index++) {
      delete temp[primaryFields[index]];
    }
    return temp;
  },
  fetchTransactionLogs : function(searchText) {
    var scopeObj = this;
    kony.adminConsole.utils.showProgressBar(scopeObj.view);
    var rangeType = scopeObj.view.datePickerTransaction.value;  
    var modules=Array.from(scopeObj.transactionalModules.keys()).join(",");
    var payload = {
      "module":modules,
      "sortVariable":scopeObj.transactionalSortColumn,
      "sortDirection":scopeObj.transactionSortDirection,
      "pageSize":"50",
      "pageOffset": scopeObj.pageOffset
    }
    var subactivityType = scopeObj.view.listBoxSearchParam1.selectedKey;
    if(subactivityType != "ALL") 
      payload["activityType"] = subactivityType
      var trnasSearchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.tbxTransactionSearch.text);
      if(searchText != ""||trnasSearchText.trim().length!=0)
        payload["searchText"] = searchText||trnasSearchText;

    var rangeType = scopeObj.view.datePickerTransaction.value; 
    if(rangeType !== "") {
      var dates = scopeObj.returnDateFormat(rangeType);
      payload["startDate"] = dates[0];
      payload["endDate"] = dates[1];;
    }

    var selectedAmount = scopeObj.view.lblSelectedAmount.text;
    if(selectedAmount !== "Select amount Range") {
      var StartAmount = selectedAmount.substring(0, selectedAmount.indexOf("-"));
      var EndAmount = selectedAmount.substring(selectedAmount.indexOf("-")+1);
      payload["startAmount"] = StartAmount;
      payload["endAmount"] = EndAmount;
    }
    this.presenter.searchCustomerAuditLogs(payload,"TRANSACTION");
  },
    setDatatotransactionalSegment: function(data) {
      var self = this;
      if(data.length == 0) {
		self.view.flxInnerTransactionResults.setVisibility(false);
        self.view.rtxNorecords.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNoResultsFound");
        self.view.flxNoResultsFound.setVisibility(true);
        self.view.flxNoResultsFound.skin="slFbox";
      	self.view.flxNoResultsFound.top = "100px"; 
        self.view.segTransactionresult.setData([]);
      } else if(self.view.customListBoxTransactional.segList.selectedItems === null){
        self.view.flxInnerTransactionResults.setVisibility(false);
        self.view.rtxNorecords.text = "No columns were selected for displaying the result.";
        self.view.flxNoResultsFound.setVisibility(true);
        self.view.flxNoResultsFound.skin="slFbox";
      	self.view.flxNoResultsFound.top = "100px"; 
      }
      else {
        self.view.flxInnerTransactionResults.setVisibility(true);
        self.view.rtxNorecords.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNoResultsFound");
        self.view.flxNoResultsFound.setVisibility(false);
        self.resetHeaderColumns();
        self.view.flxTrasactionalFilter.setVisibility(false);
        self.view.flxTransactionResults.setContentOffset({
          x: 0,
          y: 0
        });
        var noOfColumnSelected = self.view.customListBoxTransactional.segList.selectedItems.length;
        var width = noOfColumnSelected * 100 + noOfColumnSelected * 10;
        var lblWidth;
        if (width > 905) {
          self.view.flxSegResults.width = width + "px";
          self.view.segTransactionresult.width = width + "px";
          self.view.flxTransactionResultHeader.width = width + "px";
          lblWidth=100;
        } else {
          var newWidth = self.view.flxTransactionLog.frame.width - 35;
          self.view.flxSegResults.width = newWidth + "px";
          self.view.segTransactionresult.width = newWidth + "px";
          self.view.flxTransactionResultHeader.width = newWidth + "px";
          lblWidth = (newWidth-(10*noOfColumnSelected)) / noOfColumnSelected;
        }
        var segmentColumns = self.hideHeaderAndReturnSegemntColumns(lblWidth);
        var segdata = self.mappDataToTransactionSegment(data, segmentColumns, lblWidth);
        var widgetdataMap = {
          "lblModule" : "lblModule",
          "lblLogType" : "lblLogType",
          "lblCustomerId" : "lblCustomerId",
          "lblUserName" : "lblUserName",
          "lblFromAccount" : "lblFromAccount",
          "lblToAccount" : "lblToAccount",
          "lblAmount" : "lblAmount",
          "lblCurrency":"lblCurrency",
          "lblPayeeName":"lblPayeeName",
          "lblPayeeId" : "lblPayeeId",
          "lblPersonId" : "lblPersonId",
          "lblIconStatus":"lblIconStatus",
          "lblStatus"  : "lblStatus",
          "flxStatus": "flxStatus",
          "lblTransactionDate": "lblTransactionDate",
          "lblMFAType" : "lblMFAType",
          "lblMFAServiceType": "lblMFAServiceType",
          "lblMFAState": "lblMFAState",
          "lblChannel" :"lblChannel",
          "lblDevice" : "lblDevice",
          "lblOS" : "lblOS",
          "lblDeviceId" : "lblDeviceId",
          "lblIPAddress" : "lblIPAddress",
          "lblReferenceNumber" : "lblReferenceNumber",
          "lblErrorCode" : "lblErrorCode",
          "lblSeperator" : "lblSeperator",
          "flxTransactionLogs" : "flxTransactionLogs"

        };
        if(self.pageOffset === 0) {
          self.view.flxSegResults.setContentOffset({x: 0, y: 3 +"px"});
        } else {
          self.view.flxSegResults.setContentOffset({x: 0, y: 1000 +"px"});
        }
        self.view.segTransactionresult.widgetDataMap = widgetdataMap;
        self.view.segTransactionresult.setData(segdata);
        document.getElementById("frmLogs_flxSegResults").onscroll = self.getResultsOnReachingend;
        
        self.view.forceLayout();
      }
      self.view.forceLayout();
	kony.adminConsole.utils.hideProgressBar(self.view);
  },
  mappDataToTransactionSegment : function(data, segmentColumns, width) {
    var noOfChars = Math.floor(((width) * 8) / 100);
    width = width + "px";	
    var self = this;
    var segdata = data.map(function(record) {
      var statusText =  kony.i18n.getLocalizedString("i18n.Applications.NA");
      var iconStstus = ""
      if(record.status_Id == "SID_EVENT_SUCCESS") {
        statusText = "SUCCESS";
        iconStstus = "";
      }
      if(typeof(record.eventts) === "string"){
        record.eventts = parseInt(record.eventts);
      }
      return {
        "lblModule" : {"text" : self.AdminConsoleCommonUtils.getTruncatedString(self.transactionalModules.get(record.eventType), noOfChars+3, noOfChars) || kony.i18n.getLocalizedString("i18n.Applications.NA") , "isVisible" : (segmentColumns.indexOf("lblModule") >= 0) , "width" : width,
                      "tooltip" : self.transactionalModules.get(record.eventType)|| kony.i18n.getLocalizedString("i18n.Applications.NA")},
        "lblLogType" : {"text" : self.AdminConsoleCommonUtils.getTruncatedString(self.getSubTypeNameById(record.eventSubType), noOfChars+3, noOfChars) || kony.i18n.getLocalizedString("i18n.Applications.NA") , "isVisible" : (segmentColumns.indexOf("lblLogType") >= 0) ,"width" : width, "tooltip": self.getSubTypeNameById(record.eventSubType)|| kony.i18n.getLocalizedString("i18n.Applications.NA")},
        "lblCustomerId" : {"text" : self.AdminConsoleCommonUtils.getTruncatedString(record.customer_Id, noOfChars+3, noOfChars) || kony.i18n.getLocalizedString("i18n.Applications.NA") , "isVisible" : (segmentColumns.indexOf("lblCustomerId") >= 0),"width" : width,"tooltip": record.customer_Id || kony.i18n.getLocalizedString("i18n.Applications.NA")},
        "lblUserName" : {"text" : record.userName || kony.i18n.getLocalizedString("i18n.Applications.NA") , "isVisible" : (segmentColumns.indexOf("lblUserName") >= 0),"width" : width},
        "lblFromAccount" : {"text" : record.fromAccountNumber || kony.i18n.getLocalizedString("i18n.Applications.NA") , "isVisible" : (segmentColumns.indexOf("lblFromAccount") >= 0),"width" : width},
        "lblToAccount" : {"text" : record.toAccountNumber || kony.i18n.getLocalizedString("i18n.Applications.NA") , "isVisible" : (segmentColumns.indexOf("lblToAccount") >= 0),"width" : width},
        "lblAmount" : {"text" : record.amount || kony.i18n.getLocalizedString("i18n.Applications.NA") , "isVisible" : (segmentColumns.indexOf("lblAmount") >= 0),"width" : width},
        "lblCurrency" : {"text" : record.transactionCurrency || kony.i18n.getLocalizedString("i18n.Applications.NA") , "isVisible" : (segmentColumns.indexOf("lblCurrency") >= 0),"width" : width},
        "lblPayeeName" : {"text" :  record.payeeNickName  || kony.i18n.getLocalizedString("i18n.Applications.NA") , "isVisible" : (segmentColumns.indexOf("lblPayeeName") >= 0),"width" : width},
        "lblPayeeId" : {"text" :   (record.payee_id === "0" ? kony.i18n.getLocalizedString("i18n.Applications.NA") : record.payee_id)||kony.i18n.getLocalizedString("i18n.Applications.NA"), "isVisible" : (segmentColumns.indexOf("lblPayeeId") >= 0),"width" : width},
        "lblPersonId" : {"text" :  (record.person_Id === "0" ? kony.i18n.getLocalizedString("i18n.Applications.NA") : record.person_Id)||kony.i18n.getLocalizedString("i18n.Applications.NA"), "isVisible" : (segmentColumns.indexOf("lblPersonId") >= 0),"width" : width},
        "lblIconStatus" : {"text" : iconStstus,
                           "skin" :  statusText === "SUCCESS" ?"sknFontIconActivate": "sknfontIconInactive"},
        "lblStatus"  : {"text" : statusText} , 
        "flxStatus" : { "isVisible" : (segmentColumns.indexOf("flxStatus") >= 0),"width" : width},
        "lblTransactionDate" : {"text" : record.eventts?self.getLocaleDateAndTime(record.eventts): kony.i18n.getLocalizedString("i18n.Applications.NA") , "isVisible" : (segmentColumns.indexOf("lblTransactionDate") >= 0),"width" : width,"tooltip": record.eventts?self.getLocaleDateAndTime(record.eventts):kony.i18n.getLocalizedString("i18n.Applications.NA")},
        "lblMFAType" : {"text" : self.AdminConsoleCommonUtils.getTruncatedString(record.mfa_Type, noOfChars+3, noOfChars) || kony.i18n.getLocalizedString("i18n.Applications.NA") , "isVisible" : (segmentColumns.indexOf("lblMFAType") >= 0),"width" : width,"tooltip": record.mfa_Type|| kony.i18n.getLocalizedString("i18n.Applications.NA")},
        "lblMFAServiceType" : {"text" : record.mfa_ServiceKey || kony.i18n.getLocalizedString("i18n.Applications.NA") , "isVisible" : (segmentColumns.indexOf("lblMFAServiceType") >= 0),"width" : width},
        "lblMFAState" : {"text" : record.mfa_State || kony.i18n.getLocalizedString("i18n.Applications.NA") , "isVisible" : (segmentColumns.indexOf("lblMFAState") >= 0),"width" : width},
        "lblChannel" : {"text" : record.channel || kony.i18n.getLocalizedString("i18n.Applications.NA") , "isVisible" : (segmentColumns.indexOf("lblChannel") >= 0),"width" : width},
        "lblDevice" : {"text" : self.AdminConsoleCommonUtils.getTruncatedString(record.deviceModel, noOfChars+3, noOfChars) || kony.i18n.getLocalizedString("i18n.Applications.NA") , "isVisible" : (segmentColumns.indexOf("lblDevice") >= 0),"width" : width, "tooltip": record.deviceModel || kony.i18n.getLocalizedString("i18n.Applications.NA")},
        "lblOS" : {"text" : self.AdminConsoleCommonUtils.getTruncatedString(record.operatingSystem, noOfChars+3, noOfChars) || kony.i18n.getLocalizedString("i18n.Applications.NA") , "isVisible" : (segmentColumns.indexOf("lblOS") >= 0), "tooltip": record.operatingSystem|| kony.i18n.getLocalizedString("i18n.Applications.NA"),"width" : width},
        "lblDeviceId" : {"text" : self.AdminConsoleCommonUtils.getTruncatedString(record.deviceId, noOfChars+3, noOfChars) || kony.i18n.getLocalizedString("i18n.Applications.NA") , "isVisible" : (segmentColumns.indexOf("lblDeviceId") >= 0), "tooltip": record.deviceId|| kony.i18n.getLocalizedString("i18n.Applications.NA"),"width" : width},
        "lblIPAddress" : {"text" : record.ipAddress || kony.i18n.getLocalizedString("i18n.Applications.NA") , "isVisible" : (segmentColumns.indexOf("lblIPAddress") >= 0),"width" : width},
        "lblReferenceNumber" : {"text" : record.reference_id || kony.i18n.getLocalizedString("i18n.Applications.NA") , "isVisible" : (segmentColumns.indexOf("lblReferenceNumber") >= 0),"width" : width},
        "lblErrorCode" : {"text" : "View", "isVisible" : (segmentColumns.indexOf("lblErrorCode") >= 0),
                          "onClick": function() {
                            self.setOtherInfo(self.populateSecondaryInfoTransactional(record));
                          },"width" : width},
        "lblSeperator" : {"text" : "-"},
        "template" : "flxTransactionLogs"
      }
    });
    return segdata;
  },
  getSubTypeNameById : function(id) {
    var self = this;
    var data = self.view.listBoxSearchParam1.masterData;
    for(var i = 0; i < data.length; i++) {
      if(data[i][0] === id) {
        return data[i][1];
      }
    }
    return kony.i18n.getLocalizedString("i18n.Applications.NA");
  },
  getResultsOnReachingend : function(context) {
    var self = this;
    var segmentWidget = self.view.segTransactionresult;
    if ((Math.ceil(context.currentTarget.offsetHeight) + Math.floor(context.currentTarget.scrollTop) === Math.ceil(context.currentTarget.scrollHeight))) {
      if(self.hasNextPage  === true) {
        self.pageOffset = self.pageOffset  + 25;
        kony.adminConsole.utils.showProgressBar(self.view);
        self.fetchTransactionLogs("");
      }
    } else if (Math.ceil(context.currentTarget.scrollTop) === 0) {
      if(self.pageOffset !== 0) {
        self.pageOffset = self.pageOffset  - 25;
        kony.adminConsole.utils.showProgressBar(self.view);
        self.fetchTransactionLogs("");
      }
      
    } 
  },
  resetHeaderColumns : function() {
    var self =  this;
    var flexChildrenlength = self.view.flxTransactionHeader.children.length;
    for(var i = 0; i < flexChildrenlength; i++) {
      self.view[self.view.flxTransactionHeader.children[i]].setVisibility(false);
    }
  },
  hideHeaderAndReturnSegemntColumns : function(width) {
    var self =  this;
    if(self.view.customListBoxTransactional.segList.selectedItems != null) {
      var selectedItemsLength = self.view.customListBoxTransactional.segList.selectedItems.length;
        var dataMapToHeaderFlex = {
          "module" : ["flxModule", "lblModule"],
          "activity type" : ["flxTransactionLogType","lblLogType"],
          "customer id" : ["flxCustomerId","lblCustomerId"],
          "customer username" : ["flxUserName","lblUserName"],
          "from account" : ["flxFromAccount","lblFromAccount"],
          "to account" : ["flxToAccount","lblToAccount"],
          "amount" : ["flxAmount","lblAmount"],
          "currency" : ["flxCurrency","lblCurrency"],
          "payee name" : ["flxPayeeName","lblPayeeName"],
          "payee id" : ["flxPayeeId","lblPayeeId"],
          "person id" : ["flxPersonId","lblPersonId"],
          "status" : ["flxTransactionStatus","flxStatus"],
          "channel" : ["flxChannel","lblChannel"],
          "date and time" : ["flxTransactionDate","lblTransactionDate"],
          "mfa type" : ["flxTransactionMFAType","lblMFAType"],
          "mfa service type" : ["flxTransactionMFAServiceKey","lblMFAServiceType"],
          "mfa state" : ["flxTransactionMFAState","lblMFAState"],
          "device" : ["flxTransactionDevice","lblDevice"],
          "os" : ["flxTransactionOS","lblOS"],
          "deviceid" : ["flxTransactionDeviceId","lblDeviceId"],
          "ip address" : ["flxTransactionIPAddress","lblIPAddress"],
          "reference number" : ["flxReferenceNumber","lblReferenceNumber"],
          "other info" : ["flxTransactionErrorCode","lblErrorCode"]
        };
      var segmentColumns = [];
      for(var index = 0; index < selectedItemsLength ; index++) {
        var id = self.view.customListBoxTransactional.segList.selectedItems[index].id;
        self.view[dataMapToHeaderFlex[id][0]].setVisibility(true);
        self.view[dataMapToHeaderFlex[id][0]].width=width+"px";
        segmentColumns.push(dataMapToHeaderFlex[id][1]);
      } 
      return segmentColumns;
    }
  },
  setVisibilityOffColumns: function(width) {
   var self =  this;
    var segmentColumns = [];
    if(self.selectedColumns !== null) {
      var selectedItemsLength = self.selectedColumns.length;
       var dataMap ={
      "evt":"flxcusEvent",
      "evt_subtype":"flxCusEventSubType",
      "admin_name":"flxAdminsName",
      "admin_role":"flxAdminsRole",
      "status":"flxLogStatus",
      "channel":"flxLogChannel",
      "device_browser":"flxDeviceBrowser",
      "os":"flxLogOS",
      "device_id":"flxDeviceID",
      "ip_address":"flxLogIPAddress",
      "payee_name":"flxPayeesName",
      "payee_id":"flxPayeesId",
      "person_id":"flxPersonsId",
      "acc_details":"flxAccount",
      "date":"flxDate",
      "otherInfo":"flxOtherInfo",
      "from_account":"flxFromAccountNum",
      "to_account":"flxToAccountNum",
      "amount":"flxAmt",
      "ref_no":"flxRefNumber",
      "currency":"flxCustCurrency",
      "mfaType":"flxLogMFAType",
      "mfaServiceKey":"flxLogMFAKey",
      "mfa_state":"flxMFAState"

    };
      for(var index = 0; index < selectedItemsLength ; index++) {
          var id = self.selectedColumns[index];
        self.view[dataMap[id]].setVisibility(true);
        self.view[dataMap[id]].width=width;
        segmentColumns.push(id);
      } 
    }return segmentColumns;
    },
  /*
   * on row click of custom listbox of apps/users-list
   * @param : category - apps or users
   */
  onCustomListBoxRowClick : function(){
    var self = this;
    var widgetPath ="",segData ="";
    widgetPath = self.view.customListboxApps;
    segData = widgetPath.segList.data;
    var arr = [];
    for(var i= 0; i< segData.length; i++){
      arr.push(i);
    }
    var selRows = widgetPath.segList.selectedRowItems;
    if (selRows) {
      if (selRows.length === segData.length) {
        widgetPath.imgCheckBox.src = self.checkboxselected;
        widgetPath.lblSelectedValue.text = self.sAll;
        widgetPath.segList.selectedIndices = [
          [0, arr]
        ];
      } else {
        widgetPath.lblSelectedValue.text = selRows.length + " " + self.sSelected;
        widgetPath.imgCheckBox.src = self.checkboxnormal;}
    }else{
      widgetPath.lblSelectedValue.text = kony.i18n.getLocalizedString("i18n.frmLogs.selectColumnItems");
    }
    self.view.forceLayout();

  },
  /*
   * select all/unselect all of custom listbox
   * @param : category - apps or users
   */
  onClickOfSelectAll : function(){
    var self = this;
    var widgetPath ="",segData ="";
    widgetPath = self.view.customListboxApps;
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
      widgetPath.lblSelectedValue.text = kony.i18n.getLocalizedString("i18n.frmLogs.selectColumnItems");
	 }
    self.view.forceLayout();
  },
  setCustomerSelectedColumns: function() {
    var self = this;
	var selectedColumns = [];
    var segData = self.view.customListboxApps.segList.selecteditems;
    if(segData !== null){
      for (var i = 0; i < segData.length; i++) {
        selectedColumns.push(segData[i].id);
      }
    }
    this.selectedColumns =selectedColumns;
  },
  
    setPageNumbers: function(recordsPerPage, totalRecords) {
    var scopeObj = this;
    var totalPages = Math.ceil(totalRecords/recordsPerPage);
    var pages = [];
    for(var i=1; i<=totalPages; ++i) {
      var page = "Page "+i+" of "+totalPages;
      scopeObj.totalPage=totalPages;
      pages.push([i, page]);
    }
    return pages;
  },
  returnDateFormat : function(rangeType) {
    var dates = [];
    var startDateArray = rangeType.split(" - ")[0].split("/");
    var endDateArray = rangeType.split(" - ")[1].split("/");
    var startDate = startDateArray[2] + "-" + startDateArray[0] + "-" + startDateArray[1];
    var endDate = endDateArray[2] + "-" + endDateArray[0] + "-" + endDateArray[1];
    dates.push(startDate, endDate);
    return dates;
  },
  selectFlxAllTypes: function(){
    var scopeObj=this;
    scopeObj.showNorecordsFound();
    scopeObj.view.flxTypesList.isVisible=false;
    scopeObj.view.lblName.text=kony.i18n.getLocalizedString("i18n.frmLogsController.All_Types");
    scopeObj.view.flxAllTypes.width="85px";
    scopeObj.view.flxOption1.isVisible=true;
    scopeObj.view.flxOption2.isVisible=true;
    scopeObj.view.flxOption3.isVisible=true;
    scopeObj.view.flxOption4.isVisible=false;
  },
  encodeHtml : function(text){
    if(text){
      text=text.toString();
    var encodedStr = text.replace(/[#$%&'()*+,-.\/:;<>=?@\"]/gim, function(i) {
      return '&#'+i.charCodeAt(0)+';';
    });
    return encodedStr;
    }
    return text;
  }
});