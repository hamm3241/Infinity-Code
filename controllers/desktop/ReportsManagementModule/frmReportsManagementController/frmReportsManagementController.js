define({

  selectedCsrId : "",
  csrNameBeingTyped : false,
  dataSources :[],
  checkboxselected : "checkboxselected.png",
  checkboxnormal : "checkboxnormal.png",
  sAll : kony.i18n.getLocalizedString("i18n.frmAlertsManagement.All"),
  sSelected: kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Selected"),
  selectedUserIds :[],
  selectedRoleIds :[],
  users :[],
  roles :[],
  totalPages : -1,
  fabricReports:[],
  selectedDataSource:"",
  selectedReport:"",
  segment_ROW_FRAMES:{},
  willUpdateUI: function(context) {
    this.updateLeftMenu(context);
    if (context) {
      if(context.LoadingScreen){
        if(context.LoadingScreen.focus)
          kony.adminConsole.utils.showProgressBar(this.view);
        else
          kony.adminConsole.utils.hideProgressBar(this.view);
      }
      else if(context.messagesReport){
        this.setMessagesReport(context.messagesReport);
      }
      else if(context.transactionalReport){
        this.setTransactionalReport(context.transactionalReport);
      }else if(context.toast === "success"){
        this.view.toastMessage.showToastMessage(context.message, this);
      } 
      else if(context.toast === "error") {
        this.view.toastMessage.showErrorToastMessage(context.message, this);
      } 
      else if(context.fabricReports){
        this.fabricReports=context.fabricReports.reports;
        this.dataSources=context.fabricReports.dataSources;
        this.showCreateReports();
      }
      else if(context.initialUi){
        this.renderInitialReportsUi(context.initialUi);
      }
      else if(context.filters){
        this.totalPages=-1;
        this.showViewReports(context.filters);
      }
      else if(context.getReportResponse){
        if(this.totalPages===-1)
          this.totalPages= context.getReportResponse.totalPages;
        if(context.isFiltersAvailable==="no")
          this.showViewReports([], context.getReportResponse.html);
        else 
          this.generateReport(context.getReportResponse.html);        
        if(context.page){
          this.refreshPagination(this.totalPages,context.page);
        }
      }
      else if(context.userReports){
        this.reports=context.userReports;
        this.reports.push({
          "id" : "messages_report_0",
          "name" : "Messages",
          "description" : "View daily mesaages over the reporting period",
          "reportDataSourceId" : "N/A",
          "createdts" : "N/A"
        });
        this.showReportsList(this.reports);
        this.clearSearchField(true);
      }
      else if(context.downloadReport){
        this.downloadFile(context.downloadReport.xls);
      }
      else if(context.dataSources){
        this.dataSources=context.dataSources.reportdatasource;
        this.showDataSourceList(context.dataSources.reportdatasource);
      }
    }
  },
  reportManagementPreshow: function(){
    this.hideAll();
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.setDefaultWidgetsData();
    this.setFlowActions();
    //this.showReportTabs();
    this.view.forceLayout();
    this.view.flxMain.height=kony.os.deviceInfo().screenHeight+"px";
    this.view.usersReport.lblLog.text = "\ue914";
    this.view.usersReport.lblLog.skin = "sknIcon60px";
    this.view.transactionReport.lblLog.text = "\ue913";
    this.view.transactionReport.lblLog.skin = "sknIcon60px";
    this.view.messagesReport.lblLog.text = "\ue912";
    this.view.messagesReport.lblLog.skin = "sknIcon60px";
    this.assignAppropriateSkins();
  },
  
  assignAppropriateSkins : function(){
        this.view.search2.btnAdd.skin = "sknbtnf7f7faLatoRegular12Px485c75Border1px485C75Radius20px";
        this.view.search2.btnAdd.hoverSkin = "sknbtnffffffLatoRegular12Px485c75Border1px485C75Radius20px";
        this.view.search2.btnAdd.focusSkin = "sknbtnf7f7faLatoRegular12Px485c75Border1px485C75Radius20px";
  },
  setDefaultWidgetsData: function(){

    //Header
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmReportsManagement.titleReports");

    //Breadcrumb
    this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.frmReportsManagement.label.report_caps");

    //Users reports
    this.view.datePickerUsers.resetData = "Today";

    //Messages
    this.view.flxSuggestions.setVisibility(false);
  },
  hideAll: function() {

    //hide all function
    this.view.search2.flxSuggestionsClose.setVisibility(false);
    this.view.flxBreadCrumbs.setVisibility(false);
    this.view.flxMainReportsOuter.top="101px";
    this.view.flxReportsTabs.setVisibility(false);
    this.view.flxMainContainer.setVisibility(false);
    this.view.flxUsersReport.setVisibility(false);
    this.view.flxTransactionsReport.setVisibility(false);
    this.view.flxMessagesReport.setVisibility(false);
    this.view.search.flxCategory.setVisibility(false);
    this.view.search.flxCSR.setVisibility(false);
    this.view.search1.flxCategory.setVisibility(false);
    this.view.search1.flxCSR.setVisibility(false);
    this.view.flxListingCommon.setVisibility(false);
    this.view.flxViewReports.setVisibility(false);
  },
  setFlowActions: function(){
    var scopeObj = this;

    this.view.flxCloseCal1.onClick=function(){
      scopeObj.view.datePickerTransactions.resetData="Today";
      scopeObj.view.datePickerTransactions.rangeType="Today";
      scopeObj.view.datePickerTransactions.value=scopeObj.getTodaysFormattedDate()+" - "+scopeObj.getTodaysFormattedDate();
      scopeObj.view.flxCloseCal1.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.flxCloseCal2.onClick=function(){
      scopeObj.view.datePickerMessages.resetData="Today";
      scopeObj.view.datePickerMessages.rangeType="Today";
      scopeObj.view.datePickerMessages.value=scopeObj.getTodaysFormattedDate()+" - "+scopeObj.getTodaysFormattedDate();
      scopeObj.view.flxCloseCal2.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.flxCloseCal3.onClick=function(){
      scopeObj.view.datePickerUsers.resetData="Today";
      scopeObj.view.datePickerUsers.rangeType="Today";
      scopeObj.view.datePickerUsers.value=scopeObj.getTodaysFormattedDate()+" - "+scopeObj.getTodaysFormattedDate();
      scopeObj.view.flxCloseCal3.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.datePickerTransactions.event=function(){
      scopeObj.view.flxCloseCal1.setVisibility(true);
      scopeObj.view.forceLayout();
    };
    this.view.datePickerMessages.event=function(){
      scopeObj.view.flxCloseCal2.setVisibility(true);
      scopeObj.view.forceLayout();
    };
    this.view.datePickerUsers.event=function(){
      scopeObj.view.flxCloseCal3.setVisibility(true);
      scopeObj.view.forceLayout();
    };
    //Tabs onclick
    this.view.usersReport.onClick = function(){
      scopeObj.setDataForUsersReport();
      scopeObj.showUsersReport();
    };
    this.view.transactionReport.onClick = function(){
      scopeObj.showTransactionReport();
    };
    this.view.messagesReport.onClick = function(){
      scopeObj.showMessagesReport();
    };

    //Bread crumb onclick
    this.view.breadcrumbs.btnBackToMain.onClick = function(){
      scopeObj.showReportsList(scopeObj.reports);
      scopeObj.clearSearchField(true);
    };
    this.view.search2.tbxCSR.onBeginEditing = function(){
     scopeObj.AdminConsoleCommonUtils.restrictTextFieldToAlphaNumericWithSpace("frmReportsManagement_search2_tbxCSR");
    };
    //CSR tbx onkeyup
    this.view.search2.tbxCSR.onKeyUp = function(){
      scopeObj.loadPageData();
      scopeObj.searchCSR();
      scopeObj.view.forceLayout();
      scopeObj.csrNameBeingTyped = true;
      if(scopeObj.view.search2.tbxCSR.text.trim() == "") {
        scopeObj.assignAppropriateSkins();
      } else {
         scopeObj.view.search2.btnAdd.skin = "sknBtnAddDisabled";
      	scopeObj.view.search2.btnAdd.hoverSkin = "sknBtnAddDisabled";
        scopeObj.view.search2.btnAdd.focusSkin = "sknBtnAddDisabled";
      }
     
    };

    //Suggestions onhover
    this.view.flxSuggestions.onHover = function(widget,context){

      if (context.eventType === constants.ONHOVER_MOUSE_ENTER);
      else if (context.eventType === constants.ONHOVER_MOUSE_MOVE);
      else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE)
      { 
        widget.setVisibility(false);
      }
    };

    //suggestions onRowClick
    this.view.segUserSuggestion.onRowClick = function(){

      scopeObj.view.search2.tbxCSR.text = scopeObj.view.segUserSuggestion.selecteditems[0].lblName;
      scopeObj.selectedCsrId = scopeObj.view.segUserSuggestion.selecteditems[0].id;
      scopeObj.view.search2.flxSuggestionsClose.setVisibility(true);
      scopeObj.view.flxSuggestions.setVisibility(false);
      scopeObj.csrNameBeingTyped = false;
	  scopeObj.assignAppropriateSkins();
      scopeObj.view.forceLayout();
    };

    //Suggestions on img close
    this.view.search2.flxSuggestionsClose.onClick = function(){
      scopeObj.view.search2.tbxCSR.text = "";
      scopeObj.selectedCsrId = "";
      scopeObj.view.search2.flxSuggestionsClose.setVisibility(false);
      scopeObj.csrNameBeingTyped = false;
      scopeObj.assignAppropriateSkins();
      scopeObj.view.forceLayout();
    };

    this.view.search2.btnAdd.onClick = function() {
      scopeObj.getMessagesReport();
    }; 

    this.view.search1.btnAdd.onClick = function() {
      scopeObj.getTransactionalReport();
    };
    this.view.search2.flxDownload.onClick=function(){
      if(scopeObj.csrNameBeingTyped === false) {
        var mfURL = KNYMobileFabric.mainRef.config.reportingsvc.session.split("/services")[0];
        var downloadURL = mfURL + "/services/data/v1/ReportsObjService/operations/MessagesReport/exportMessagesReport" ;
        var startDate = "", endDate = "";
        var rangeType = scopeObj.view.datePickerMessages.value;
        startDate = rangeType.substring(0, rangeType.indexOf(" - "));
        endDate = rangeType.substring(rangeType.indexOf(" - ")+3);
        var category = scopeObj.view.search2.lstCategory.selectedKeyValue;
        downloadURL = downloadURL + "?startDate=" + startDate; //first param to append
        downloadURL = downloadURL + "&endDate=" + endDate ;
        downloadURL = downloadURL + "&categoryId=" + category[0] ;
        downloadURL = downloadURL + "&categoryName=" + category[1] ;
        downloadURL = downloadURL + "&csrid=" + scopeObj.selectedCsrId ;
        var searchText = scopeObj.view.search2.tbxCSR.text;
        searchText = searchText.replace("<","&lt").replace(">","&gt");
        downloadURL = downloadURL + "&csrName=" + searchText;
        downloadURL = downloadURL + "&offset=" + new Date().getTimezoneOffset() ;
        scopeObj.callDownloadCSVService(downloadURL,"MessageReports");
      }
    };
    this.view.search1.flxDownload.onClick=function(){
      var authToken = KNYMobileFabric.currentClaimToken;
      var mfURL = KNYMobileFabric.mainRef.config.reportingsvc.session.split("/services")[0];
      var downloadURL = mfURL + "/services/data/v1/ReportsObjService/operations/TransactionReport/exportTransactionReport?authToken=" + authToken ;
      var startDate = "", endDate = "";
      var rangeType = scopeObj.view.datePickerTransactions.value;
      startDate = rangeType.substring(0, rangeType.indexOf(" - ")); 
      endDate = rangeType.substring(rangeType.indexOf(" - ")+3);
      downloadURL = downloadURL + "&startDate=" + startDate ;
      downloadURL = downloadURL + "&endDate=" + endDate ;
      var encodedURI = encodeURI(downloadURL);
      var downloadLink = document.createElement("a");
      downloadLink.href = encodedURI;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    this.view.mainHeader.btnDropdownList.onClick = function(){
      scopeObj.clearSearchField(true);
      scopeObj.presenter.getDataSources();
    };
    this.view.mainHeader.btnAddNewOption.onClick = function(){
     if(scopeObj.view.flxNoReportsConfigured.isVisible){
       scopeObj.clearSearchField(true);
       scopeObj.presenter.getDataSources();
     }
     else if(scopeObj.view.flxReportsListContainer.isVisible){
       scopeObj.presenter.getFabricReports();      
     }
      //scopeObj.view.flxCreateReport.setVisibility(true);
    };
    this.view.popUp.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxConfirmationPopup.setVisibility(false);
    };
    this.view.popUp.btnPopUpDelete.onClick = function(){
      scopeObj.deleteReport();
    };
    this.view.popUp.flxPopUpClose.onClick = function(){
      scopeObj.view.flxConfirmationPopup.setVisibility(false);
    };
    this.view.tbxRecordsSearch.onTouchStart = function(){
      scopeObj.view.flxRecordsSearch.skin = "slFbox0ebc847fa67a243Search";
    };
    this.view.tbxRecordsSearch.onEndEditing = function(){
      scopeObj.view.flxRecordsSearch.skin = "sknflxd5d9ddop100";
    };
    this.view.tbxRecordsSearch.onKeyUp = function(){
      scopeObj.view.flxClearRecordsSearch.setVisibility(true);
      if(scopeObj.view.tbxRecordsSearch.text === ""){
        scopeObj.view.flxClearRecordsSearch.setVisibility(false);
      }else{
        scopeObj.view.flxRecordsSearch.skin = "slFbox0ebc847fa67a243Search";
        scopeObj.view.flxClearRecordsSearch.setVisibility(true);
      }
      scopeObj.performSearch();
    };    
    this.view.flxClearRecordsSearch.onClick = function(){
      scopeObj.clearSearchField(true);
      scopeObj.performSearch();
    };
    this.view.tbxSearchBox.onTouchStart = function(){
      scopeObj.view.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
    };
    this.view.tbxSearchBox.onEndEditing = function(){
      scopeObj.view.flxSearchContainer.skin = "sknflxd5d9ddop100";
    };
    this.view.tbxSearchBox.onKeyUp = function(){
      scopeObj.view.flxClearSearchImage.setVisibility(true);
      if(scopeObj.view.tbxSearchBox.text === ""){
        scopeObj.view.flxClearSearchImage.setVisibility(false);
      }else{
        scopeObj.view.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
        scopeObj.view.flxClearSearchImage.setVisibility(true);
      }
      scopeObj.performSearchCreatePopup();
    };
    this.view.flxClearSearchImage.onClick = function(){
      scopeObj.clearSearchField(false);
      scopeObj.performSearchCreatePopup();
    };
     this.view.flxDatasourceName.onClick = function(){
      var segData = scopeObj.view.segDatasource.segListing.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblDataSource.text");
      scopeObj.view.segDatasource.segListing.setData(sortedData); 
      scopeObj.view.forceLayout();
     };
    this.view.flxConnectedOn.onClick = function(){
      var segData = scopeObj.view.segDatasource.segListing.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblConnectedOn");
      scopeObj.view.segDatasource.segListing.setData(sortedData);
      scopeObj.view.forceLayout();
     };
    this.view.flxGeneratedReports.onClick = function(){
      var segData = scopeObj.view.segDatasource.segListing.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblGeneratedReports");
      scopeObj.view.segDatasource.segListing.setData(sortedData); 
      scopeObj.view.forceLayout();
    };
    this.view.flxNameReport.onClick = function(){
      var segData = scopeObj.view.segReports.segListing.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblReportName.text");
      scopeObj.view.segReports.segListing.setData(sortedData);
      scopeObj.view.forceLayout();
     };
    this.view.flxCreatedDate.onClick = function(){
      var segData = scopeObj.view.segReports.segListing.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblCreatedDate");
      scopeObj.view.segReports.segListing.setData(sortedData);
      scopeObj.view.forceLayout();
     };
    this.view.segReports.segListing.onHover = this.saveScreenY;
    this.view.segReports.segListing.onRowClick = function(){
      var currentIndex=scopeObj.view.segReports.segListing.selectedRowIndex[1];
      var row=scopeObj.view.segReports.segListing.data[currentIndex];
      if(row.id==="messages_report_0"){
        scopeObj.showMessagesReport();
      }
      else{
        scopeObj.getFilters();
      }
    };
    this.view.flxToggle.onClick = function(){
      scopeObj.toggleDescription();
    };
    this.view.verticalTabs.btnOption0.onClick = function () {
      scopeObj.showDataSourceInCreate();
    };
    this.view.verticalTabs.btnOption1.onClick = function () {
      if(scopeObj.selectedDataSource!==""){
        scopeObj.showReportsInCreate();
      }
    };
    this.view.segDatasourceCreate.segListing.onRowClick = function(){
      scopeObj.selectCurrentRow();
    };
    this.view.segReportsCreate.segListing.onRowClick = function(){
      scopeObj.selectCurrentRow();
    };
    this.view.commonButtons.btnSave.onClick = function(){
     if(scopeObj.view.flxDatasourcesAvailableSegment.isVisible===true){
       scopeObj.showReportsInCreate();
     }
      else{
        scopeObj.createReport();
      }
    };
    this.view.flxCreateClose.onClick = function(){
      scopeObj.view.flxCreateReport.setVisibility(false);
    };
     this.view.commonButtons.btnCancel.onClick = function(){
      scopeObj.view.flxCreateReport.setVisibility(false);
    };
     this.view.flxDatasourceNameCreate.onClick = function(){
      var segData = scopeObj.view.segDatasourceCreate.segListing.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblDataSource.text");
      scopeObj.view.segDatasourceCreate.segListing.setData(sortedData); 
      scopeObj.view.forceLayout();
     };
    this.view.flxConnectedOnCreate.onClick = function(){
      var segData = scopeObj.view.segDatasourceCreate.segListing.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblConnectedOn");
      scopeObj.view.segDatasourceCreate.segListing.setData(sortedData);
      scopeObj.view.forceLayout();
     };
    this.view.flxGeneratedReportsCreate.onClick = function(){
      var segData = scopeObj.view.segDatasourceCreate.segListing.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblGeneratedReports");
      scopeObj.view.segDatasourceCreate.segListing.setData(sortedData); 
      scopeObj.view.forceLayout();
    };
    this.view.flxReportName.onClick = function(){
      var segData = scopeObj.view.segReportsCreate.segListing.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblReportName.text");
      scopeObj.view.segReportsCreate.segListing.setData(sortedData);
      scopeObj.view.forceLayout();
     };
    this.view.flxBtnShare.onClick = function(){
      scopeObj.openShareReportPopup();
    };
    this.view.commonShareButtons.btnSave.onClick = function(){
      scopeObj.shareReport();
    };
    this.view.commonShareButtons.btnCancel.onClick = function(){
      scopeObj.view.flxShareReport.setVisibility(false);
    };
     this.view.flxShareReportClose.onClick = function(){
      scopeObj.view.flxShareReport.setVisibility(false);
    };
    this.view.tbxSearchBoxUsers.onBeginEditing = function () {
      scopeObj.view.tbxSearchBoxUsers.text = "";
      scopeObj.view.flxClearSearchImageUsers.isVisible = false;
      scopeObj.view.flxUsersDropdown.isVisible = false;
    };
    this.view.tbxSearchBoxUsers.onKeyUp = function () {
      if (scopeObj.view.tbxSearchBoxUsers.text.length >= 3){
        scopeObj.view.flxUsersDropdown.onHover = scopeObj.onHoverEventCallback;
        scopeObj.view.flxUsersDropdown.isVisible = true;
        scopeObj.view.flxClearSearchImageUsers.isVisible = true;
        scopeObj.sortBy2.column("Name");
        scopeObj.usersSegmentPopup((scopeObj.users).filter(scopeObj.searchFilterUsers).sort(scopeObj.sortBy2.sortData));
        scopeObj.view.forceLayout();
      }
      else{
        scopeObj.view.flxUsersDropdown.isVisible = false;
        scopeObj.view.flxClearSearchImageUsers.isVisible = false;
      }
    };
    this.view.flxClearSearchImageUsers.onClick = function () {
      scopeObj.view.tbxSearchBoxUsers.text = "";
      scopeObj.view.flxUsersDropdown.isVisible = false;
      scopeObj.view.flxClearSearchImageUsers.setVisibility(false);
    };
    this.view.segUsers.onRowClick = function(){
      var data=scopeObj.view.segUsers.data;
      var selectedRow = data[scopeObj.view.segUsers.selectedRowIndex[1]];
      scopeObj.selectedUserIds.push({"id":selectedRow.id,"name":selectedRow.lblViewFullName});
      scopeObj.view.lblSelectedCountText.text =  scopeObj.selectedUserIds.length +" Selected";
      scopeObj.populateTags(true,false);
      scopeObj.view.flxClearSearchImageUsers.onClick();
    };
    this.view.customListboxRoles.flxDropdown.onClick = function(){
      scopeObj.view.customListboxRoles.flxSegmentList.setVisibility(scopeObj.view.customListboxRoles.flxSegmentList.isVisible === false);
    }; 
    this.view.customListboxRoles.flxSelectedText.onClick = function(){
      scopeObj.view.customListboxRoles.flxSegmentList.setVisibility(scopeObj.view.customListboxRoles.flxSegmentList.isVisible === false);
    };
    this.view.customListboxRoles.btnOk.onClick = function(){
      scopeObj.view.customListboxRoles.flxSegmentList.setVisibility(scopeObj.view.customListboxRoles.flxSegmentList.isVisible === false);
      scopeObj.view.forceLayout();
    };
    this.view.customListboxRoles.flxCheckBox.onClick = function(){
      scopeObj.onClickOfSelectAll(scopeObj.view.customListboxRoles);
    };
    this.view.customListboxRoles.flxSelectAll.onClick = function() {
      scopeObj.onClickOfSelectAll(scopeObj.view.customListboxRoles);
    };
    this.view.customListboxRoles.segList.onRowClick = function(){
      scopeObj.onCustomListBoxRowClick(scopeObj.view.customListboxRoles);
    };
    this.view.flxDeleteOption.onHover=scopeObj.showDeleteTooltip;
    this.view.flxDeleteOption.onClick = function(){
      scopeObj.openConfirmationPopup();
    };
    this.view.btnGenerateReport.onClick = function(){
      scopeObj.totalPages=-1;
      if(scopeObj.validateParameters()===true)
        scopeObj.getHtmlString("1");
    };
    this.view.flxDownload.onClick = function(){
      scopeObj.downloadReport();
    };
    this.view.reportPagination.flxnext.onClick = function(){
      var currentValue=parseInt(scopeObj.view.reportPagination.lblNumber.text)+1;
      scopeObj.getHtmlString(currentValue);
    };
    this.view.reportPagination.flxPrevious.onClick = function(){
      var currentValue=scopeObj.view.reportPagination.lblNumber.text;
      scopeObj.getHtmlString(parseInt(currentValue)-1);
    };
    this.view.reportPagination.flxGo.onClick = function(){
      var currentValue= scopeObj.view.reportPagination.tbxPageNumber.text;
      if(currentValue && currentValue.toString().trim()!=="" && parseInt(currentValue)>0 && parseInt(currentValue)<=scopeObj.totalPages){
        currentValue=parseInt(currentValue);                                                                                                                          
        scopeObj.getHtmlString(currentValue);
      }
    };
    this.view.reportPagination.tbxPageNumber.onDone = function(){
      var currentValue= scopeObj.view.reportPagination.tbxPageNumber.text;
      if(currentValue && currentValue.toString().trim()!=="" && parseInt(currentValue)>0 && parseInt(currentValue)<=scopeObj.totalPages){
        currentValue=parseInt(currentValue);                                                                                                                          
        scopeObj.getHtmlString(currentValue);
      }
    };
  },
  showReportTabs:function(){   
    this.hideAll();
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmReportsManagement.titleReports");
    this.view.search2.tbxCSR.text="";
    this.view.richtextNoResult.setVisibility(false);
    this.view.segUserSuggestion.setVisibility(true);             
    //this.view.flxReportsTabs.setVisibility(true);
    this.view.forceLayout();
  },

  setReportsInfo : function(reportsInfoJSON){
    kony.print("Inside setReportsInfo() of frmReportsController");

    var scopeObj = this;
    scopeObj.sortBy = scopeObj.getObjectSorter("name");
    scopeObj.loadPageData = function() {
      var searchResult = reportsInfoJSON.csrNames.filter(scopeObj.searchFilter).sort(scopeObj.sortBy.sortData);
      scopeObj.records = reportsInfoJSON.csrNames.filter(scopeObj.searchFilter).length;
      if(scopeObj.records===0)
      {
        scopeObj.view.richtextNoResult.setVisibility(true);
        scopeObj.view.segUserSuggestion.setVisibility(false);
        var searchText=scopeObj.view.search2.tbxCSR.text;
        searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.search2.tbxCSR.text);
        scopeObj.view.richtextNoResult.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + searchText + kony.i18n.getLocalizedString("i18n.frmCSRController._Try_with_another_keyword");
      }
      else{
        scopeObj.view.richtextNoResult.setVisibility(false);
        scopeObj.view.segUserSuggestion.setVisibility(true);
        scopeObj.setCsrNames(searchResult);
      }
    };
    scopeObj.loadPageData();

    scopeObj.setCategory(reportsInfoJSON.category);
  },

  setCategory : function(categories) {
    kony.print("categories: "+JSON.stringify(categories));

    var category = [];
    category.push(["Select category", "Select All"]);

    for(var i=0 ; i<Object.keys(categories).length ; ++i) {
      category.push([categories[i].id, categories[i].name]);
    }
    this.view.search2.lstCategory.masterData = category;
    this.view.forceLayout();
  },

  setCsrNames : function(csrNames) {
    kony.print("csrNames: "+JSON.stringify(csrNames));
    var scopeObj = this;

    var dataMap={
      "flxReportsMangSuggestions": "flxReportsMangSuggestions",
      "lblName": "lblName",
      "id": "id"
    };
    this.view.segUserSuggestion.widgetDataMap=dataMap;
    this.view.segUserSuggestion.data = [];

    var segCsrNames = this.view.segUserSuggestion.data;

    for(var j=0 ; j<Object.keys(csrNames).length ; ++j) {
      var toAdd = {
        "flxReportsMangSuggestions" : csrNames[j].name,
        "lblName" : csrNames[j].name,
        "template": "flxReportsMangSuggestions",
        "id": csrNames[j].id
      };
      segCsrNames.push(toAdd);
    }

    this.view.segUserSuggestion.setData(segCsrNames);
    this.view.forceLayout();
  },

  setMessagesReport : function(messagesReportJSON){
    kony.print("Inside setMessagesReport() of frmReportsManagementController");
    var scopeObj = this;

    // Messages
    kony.print("messagesReportJSON.messages: "+JSON.stringify(messagesReportJSON.messages));

    var messagesDataMap = {
      "flxFirstColumn": "flxFirstColumn",
      "flxlastColoumn": "flxlastColoumn",
      "flxMessage": "flxMessage",
      "flxReportsMangMessages": "flxReportsMangMessages",
      "lblDescription": "lblDescription",
      "lblSeperator": "lblSeperator",
      "lblValue": "lblValue"
    };
    scopeObj.view.segMessages.widgetDataMap = messagesDataMap;
    scopeObj.view.segMessages.data = [];

    var messages = scopeObj.view.segMessages.data;

    for(var i=0 ; i<Object.keys(messagesReportJSON.messages).length ; ++i) {
      var message = {
        "flxFirstColumn": "flxFirstColumn",
        "flxlastColoumn": "flxlastColoumn",
        "flxMessage": "flxMessage",
        "flxReportsMangMessages": "flxReportsMangMessages",
        "lblDescription": messagesReportJSON.messages[i].name,
        "lblSeperator": "lblSeperator",
        "lblValue": messagesReportJSON.messages[i].value,
        "template": "flxReportsMangMessages"
      };
      messages.push(message);
    }
    scopeObj.view.segMessages.setData(messages);

    // Threads
    kony.print("messagesReportJSON.threads: "+JSON.stringify(messagesReportJSON.threads));

    var threadsDataMap = {
      "flxFirstColumn": "flxFirstColumn",
      "flxlastColoumn": "flxlastColoumn",
      "flxMessage": "flxMessage",
      "flxReportsMangMessages": "flxReportsMangMessages",
      "lblDescription": "lblDescription",
      "lblSeperator": "lblSeperator",
      "lblValue": "lblValue"
    };
    scopeObj.view.segThreads.widgetDataMap = threadsDataMap;
    scopeObj.view.segThreads.data = [];

    var threads = scopeObj.view.segThreads.data;

    for(var j=0 ; j<Object.keys(messagesReportJSON.threads).length ; ++j) {
      var thread = {
        "flxFirstColumn": "flxFirstColumn",
        "flxlastColoumn": "flxlastColoumn",
        "flxMessage": "flxMessage",
        "flxReportsMangMessages": "flxReportsMangMessages",
        "lblDescription": messagesReportJSON.threads[j].name,
        "lblSeperator": "lblSeperator",
        "lblValue": messagesReportJSON.threads[j].value,
        "template": "flxReportsMangMessages"
      };
      threads.push(thread);
    }
    scopeObj.view.segThreads.setData(threads);

    kony.adminConsole.utils.hideProgressBar(scopeObj.view);
    this.view.forceLayout();
  },

  setTransactionalReport : function(transactionalReportJSON){
    var scopeObj = this;
    kony.print("transactionalReportJSON.messages: "+JSON.stringify(transactionalReportJSON.messages));
    var data=scopeObj.modifyData(transactionalReportJSON);
    if(!(Object.keys(data).length))
    {
      this.view.flxNoResultsFound.setVisibility(true);
    }
    else
    {
      this.view.flxNoResultsFound.setVisibility(false); 
    }
    var transactionalDataMap = {
      //       "flxShadow":"flxShadow",
      "flxBottomSpace":"flxBottomSpace",
      "flxHeader": "flxHeader",
      "flxMobile": "flxMobile",
      "flxMobileValue": "flxMobileValue",
      "flxMobileVolume": "flxMobileVolume",
      "flxOnline": "flxOnline",
      "flxOnlineValue": "flxOnlineValue",
      "flxOnlineVolume": "flxOnlineVolume",
      "flxTotal": "flxTotal",
      "flxTotalValue": "flxTotalValue",
      "flxTotalVolume": "flxTotalVolume",
      "flxTransaction": "flxTransaction",
      "flxTransactionReports": "flxTransactionReports",
      "flxTransactionType": "flxTransactionType",
      "FlxTransactionValue": "FlxTransactionValue",
      "flxTransactionVolume": "flxTransactionVolume",
      "flxValue": "flxValue",
      "flxVolume": "flxVolume",
      "lblMobile": "lblMobile",
      "lblMobileSymbol": "lblMobileSymbol",
      "lblMobileValue": "lblMobileValue",
      "lblMobileVolume": "lblMobileVolume",
      "lblOnline": "lblOnline",
      "lblOnlineSymbol": "lblOnlineSymbol",
      "lblOnlineValue": "lblOnlineValue",
      "lblOnlineVolume": "lblOnlineVolume",
      "lblTotal": "lblTotal",
      "lblTotalSymbol": "lblTotalSymbol",
      "lblTotalValue": "lblTotalValue",
      "lblTotalVolume": "lblTotalVolume",
      "lblTransactionType": "lblTransactionType",
      "lblTransactionVolume": "lblTransactionVolume",
      "lblValue": "lblValue"
    };
    scopeObj.view.segTransactionReports.widgetDataMap = transactionalDataMap;
    scopeObj.view.segTransactionReports.data = [];

    var reportsList = scopeObj.view.segTransactionReports.data;

    for(var i=0 ; i<Object.keys(data).length ; ++i) {
      var totalValue=data[i].mobileValue===undefined?data[i].onlineValue:(data[i].onlineValue===undefined?data[i].mobileValue:(parseFloat(data[i].mobileValue)+parseFloat(data[i].onlineValue)).toFixed(2));
      var totalVolume=data[i].mobileVolume===undefined?data[i].onlineVolume:(data[i].onlineVolume===undefined?data[i].mobileVolume:parseInt(data[i].mobileVolume)+parseInt(data[i].onlineVolume));
      var report = {
        //         "flxShadow":"flxShadow",
        "flxBottomSpace":"flxBottomSpace",
        "flxHeader": "flxHeader",
        "flxMobile": "flxMobile",
        "flxMobileValue": "flxMobileValue",
        "flxMobileVolume": "flxMobileVolume",
        "flxOnline": "flxOnline",
        "flxOnlineValue": "flxOnlineValue",
        "flxOnlineVolume": "flxOnlineVolume",
        "flxTotal": "flxTotal",
        "flxTotalValue": "flxTotalValue",
        "flxTotalVolume": "flxTotalVolume",
        "flxTransaction": "flxTransaction",
        "flxTransactionReports": "flxTransactionReports",
        "flxTransactionType": "flxTransactionType",
        "FlxTransactionValue": "FlxTransactionValue",
        "flxTransactionVolume": "flxTransactionVolume",
        "flxValue": "flxValue",
        "flxVolume": "flxVolume",
        "lblMobile": "MOBILE",
        "lblMobileSymbol": this.defaultCurrencyCode(),
        "lblMobileValue": data[i].mobileValue ? data[i].mobileValue : "0",
        "lblMobileVolume": data[i].mobileVolume ? "# " + data[i].mobileVolume : "# 0",
        "lblOnline": "ONLINE",
        "lblOnlineSymbol": this.defaultCurrencyCode(),
        "lblOnlineValue": data[i].onlineValue ? data[i].onlineValue : "0",
        "lblOnlineVolume": data[i].onlineVolume ? "# " + data[i].onlineVolume : "# 0",
        "lblTotal": "TOTAL",
        "lblTotalSymbol": this.defaultCurrencyCode(),
        "lblTotalValue": totalValue ? totalValue : "0",
        "lblTotalVolume":"# "+totalVolume,
        "lblTransactionType": data[i].serviceName,
        "lblTransactionVolume": "VOLUME",
        "lblValue": "VALUE",
        "template": "flxTransactionReports"
      };
      reportsList.push(report);
    }
    scopeObj.view.segTransactionReports.setData(reportsList);
    kony.adminConsole.utils.hideProgressBar(scopeObj.view);
    this.view.forceLayout();
  },

  modifyData:function(reportsList){
    var reportsData = JSON.parse(JSON.stringify(reportsList));
    var data=[];
    var row={};
    var list=[];
    for(var i=0; i<reportsData.length; i++) {
      if(list.indexOf(i)!=-1)
        continue;
      row={};
      row.serviceName=reportsData[i].serviceName;
      if(!row.serviceName){
        continue;
      }
      if(reportsData[i].channel.toUpperCase()=="MOBILE APP"){
        row.mobileValue = reportsData[i].value;
        row.mobileVolume = reportsData[i].volume;
      }
      else if(reportsData[i].channel.toUpperCase()=="ONLINE BANKING"){
        row.onlineValue = reportsData[i].value;
        row.onlineVolume = reportsData[i].volume;
      }
      inner:  for(var j=i+1; j<reportsData.length; j++){
        if(reportsData[i].serviceName == reportsData[j].serviceName)
        {
          list.push(j);
          if(reportsData[j].channel.toUpperCase()=="MOBILE APP"){
            row.mobileValue = reportsData[j].value;
            row.mobileVolume = reportsData[j].volume;}
          else if(reportsData[j].channel.toUpperCase()=="ONLINE BANKING"){
            row.onlineValue = reportsData[j].value;
            row.onlineVolume = reportsData[j].volume;
          }
          break inner;
        }  
      }
      data.push(row);
    }
    return data;
  },

  showUsersReport: function(){
    this.hideAll();
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmReportsManagement.titleViewReports");
    this.view.breadcrumbs.lblCurrentScreen.text = "USERS REPORT";
    this.view.flxMainContainer.setVisibility(true);
    this.view.flxBreadCrumbs.setVisibility(true);
    this.view.flxMainReportsOuter.top="119px";
    this.view.flxUsersReport.setVisibility(true);
    this.view.flxCloseCal3.setVisibility(false);
    this.view.datePickerUsers.resetData="Today";
    this.view.datePickerUsers.rangeType="Today";
    this.view.datePickerUsers.value=this.getTodaysFormattedDate()+" - "+this.getTodaysFormattedDate();

    this.view.forceLayout();
  },
  showTransactionReport: function(){
    this.hideAll();
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmReportsManagement.titleViewReports");
    this.view.breadcrumbs.lblCurrentScreen.text = "TRANSACTIONS REPORT";
    this.view.flxMainContainer.setVisibility(true);
    this.view.flxBreadCrumbs.setVisibility(true);
    this.view.flxMainReportsOuter.top="119px";
    this.view.flxTransactionsReport.setVisibility(true);
    this.view.flxCloseCal1.setVisibility(false);
    this.view.datePickerTransactions.resetData="Today";
    this.view.datePickerTransactions.rangeType="Today";
    this.view.datePickerTransactions.value=this.getTodaysFormattedDate()+" - "+this.getTodaysFormattedDate();
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.getTransactionalReport({"startDate":this.getTodaysFormattedDate(), "endDate":this.getTodaysFormattedDate()});//{"startDate":startDate, "endDate":startDate}
    this.view.forceLayout();
  },
  showMessagesReport: function(){
    var scopeObj = this;
    this.view.mainHeader.flxButtons.setVisibility(false);
    this.hideAll();
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmReportsManagement.titleViewReports");
    this.view.breadcrumbs.lblCurrentScreen.text = "MESSAGES REPORT";
    this.view.flxMainContainer.setVisibility(true);
    this.view.flxBreadCrumbs.setVisibility(true);
    this.view.flxMainReportsOuter.top="119px";
    this.view.flxMessagesReport.setVisibility(true);
    this.view.flxCloseCal2.setVisibility(false);
    this.view.datePickerMessages.resetData="Today"; 
    this.view.datePickerMessages.rangeType="Today";
    this.view.datePickerMessages.value=this.getTodaysFormattedDate()+" - "+this.getTodaysFormattedDate();
    this.view.search2.lstCategory.selectedKey = "Select category";
    kony.adminConsole.utils.showProgressBar(this.view);

    var getMessagesReportJSON = {
      "user_ID" : kony.mvc.MDAApplication.getSharedInstance().appContext.userID, 
      "startDate" : scopeObj.getTodaysFormattedDate() + "00:00:00", 
      "endDate" : scopeObj.getTodaysFormattedDate() + "23:59:59", 
      "category" : "Select category", 
      "csrName" : ""
    };

    this.presenter.getMessagesReport(getMessagesReportJSON);
    this.view.forceLayout();
  },

  searchCSR: function(){
    this.view.flxSuggestions.setVisibility(true);
    this.view.forceLayout();
  },

  setDataForUsersReport: function(){

    this.view.segListing.widgetDataMap = {
      "flxFirstColumn": "flxFirstColumn",
      "flxlastColoumn": "flxlastColoumn",
      "flxOptions": "flxOptions",
      "flxUsersReport": "flxUsersReport",
      "flxUsersReportWrapper": "flxUsersReportWrapper",
      "imgOptions": "imgOptions",
      "lblDescription": "lblDescription",
      "lblMobile": "lblMobile",
      "lblOnline": "lblOnline",
      "lblSeperator": "lblSeperator",
      "lblTotal": "lblTotal"
    };

    this.view.segListing.setData([{
      "flxFirstColumn": "flxFirstColumn",
      "flxlastColoumn": "flxlastColoumn",
      "flxOptions": "flxOptions",
      "flxUsersReport": "flxUsersReport",
      "flxUsersReportWrapper": "flxUsersReportWrapper",
      "imgOptions": "imgOptions",
      "lblDescription": "Users enrolled",
      "lblMobile": "2000",
      "lblOnline": "3000",
      "lblSeperator": "lblSeperator",
      "lblTotal": "5000",
      "template": "flxUsersReport"
    },{
      "flxFirstColumn": "flxFirstColumn",
      "flxlastColoumn": "flxlastColoumn",
      "flxOptions": "flxOptions",
      "flxUsersReport": "flxUsersReport",
      "flxUsersReportWrapper": "flxUsersReportWrapper",
      "imgOptions": "imgOptions",
      "lblDescription": "Users with the app installed",
      "lblMobile": "2000",
      "lblOnline": "3000",
      "lblSeperator": "lblSeperator",
      "lblTotal": "5000",
      "template": "flxUsersReport"
    },{
      "flxFirstColumn": "flxFirstColumn",
      "flxlastColoumn": "flxlastColoumn",
      "flxOptions": "flxOptions",
      "flxUsersReport": "flxUsersReport",
      "flxUsersReportWrapper": "flxUsersReportWrapper",
      "imgOptions": "imgOptions",
      "lblDescription": "New enrolments",
      "lblMobile": "120",
      "lblOnline": "120",
      "lblSeperator": "lblSeperator",
      "lblTotal": "240",
      "template": "flxUsersReport"
    },{
      "flxFirstColumn": "flxFirstColumn",
      "flxlastColoumn": "flxlastColoumn",
      "flxOptions": "flxOptions",
      "flxUsersReport": "flxUsersReport",
      "flxUsersReportWrapper": "flxUsersReportWrapper",
      "imgOptions": "imgOptions",
      "lblDescription": "New installs",
      "lblMobile": "300",
      "lblOnline": "N/A",
      "lblSeperator": "lblSeperator",
      "lblTotal": "300",
      "template": "flxUsersReport"
    }]);
  },

  getMessagesReport : function() {
    kony.print("Inside getMessagesReport() of frmReportsManagementController");
    var scopeObj = this;

    if(scopeObj.csrNameBeingTyped === false) {
      var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;

      var rangeType = scopeObj.view.datePickerMessages.value;
      var startDate = rangeType.substring(0, rangeType.indexOf(" - ")) + " 00:00:00";
      var endDate = rangeType.substring(rangeType.indexOf(" - ") + 3) + " 23:59:59";

      var category = this.view.search2.lstCategory.selectedKey;
      var csrName = scopeObj.selectedCsrId;

      var getMessagesReportJSON = {
        "user_ID" : user_ID, 
        "startDate" : startDate, 
        "endDate" : endDate, 
        "category" : category, 
        "csrName" : csrName
      };

      kony.adminConsole.utils.showProgressBar(this.view);
      scopeObj.presenter.getMessagesReport(getMessagesReportJSON);
    }
  },

  getTransactionalReport : function() {
    kony.print("Inside getTransactionalReport() of frmReportsManagementController");
    var scopeObj = this;

    var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;

    var startDate = "", endDate = "";

    var rangeType = scopeObj.view.datePickerTransactions.value;
    startDate = rangeType.substring(0, rangeType.indexOf(" - "));
    endDate = rangeType.substring(rangeType.indexOf(" - ")+3);
    var getTransactionalReportJSON = {"startDate" : startDate, "endDate" : endDate};

    kony.adminConsole.utils.showProgressBar(this.view);
    scopeObj.presenter.getTransactionalReport(getTransactionalReportJSON);
  },
  searchFilter: function(serviceData) {
    var scopeObj = this;
    var searchText = scopeObj.view.search2.tbxCSR.text;
   
    searchText =this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.search2.tbxCSR.text);
   
    if (typeof searchText === "string" && searchText.length > 0) {
      return (serviceData.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    } else {
      return true;
    }
  },
  showDataSourceList : function(response){
    this.setButtonSkins(false);
    this.view.flxNoReportsConfigured.setVisibility(false);
    this.view.flxListingCommon.setVisibility(true);
    this.view.flxDatasourcesListContainer.setVisibility(true);
    this.view.flxReportsListContainer.setVisibility(false);
    this.view.lblAvailableHeader.text=this.dataSources.length +" "+kony.i18n.getLocalizedString("i18n.frmReportsManagement.label.datasourcesAvailable");
    this.view.tbxRecordsSearch.placeholder=kony.i18n.getLocalizedString("i18n.frmReportsManagement.placeholder.searchDatasource");
    this.populateDatasourceSegment(response);
  },
  populateDatasourceSegment(response){
    var path=this.view.flxCreateReport.isVisible?this.view.segDatasourceCreate:this.view.segDatasource;
    var data;
    var dataMap = {
      "lblDataSource" : "lblDataSource",
      "lblConnectedOn" : "lblConnectedOn",
      "lblGeneratedReports" : "lblGeneratedReports",
      "flxOptions": "flxOptions",
      "fontIconSelect": "fontIconSelect",
      "flxContent": "flxContent",
      "lblSeparator": "lblSeparator",
      "id":"id"
    };
    var self=this;
    if (typeof response !== 'undefined' || response !== null) {
      if(response.length > 0){
        data=response.map(function (row) {
          return {
            "id":row.id,
            "lblDataSource" : {"text":row.name,"left": self.view.flxCreateReport.isVisible?"30px":"0px"},
            "lblConnectedOn" : self.getLocaleDateAndTime(row.createdts),
            "lblGeneratedReports" : row.reportsCount,
            "flxOptions": {"visible":false},
            "lblSeparator": ".",
            "fontIconSelect": {"visible":(self.view.flxCreateReport.isVisible && self.selectedDataSource===row.id)?true:false,
                               "skin":(self.view.flxCreateReport.isVisible && self.selectedDataSource===row.id)?"sknfontIcon004F93size24px":"sknfontIcone1e5eesize24px"},
            "flxContent": {"onHover": self.onHoverSegmentRow,"hoverSkin": self.view.flxCreateReport.isVisible?"sknfbfcfc":"slFbox"},
            "template": "flxDataSources"
          };
        });
        path.segListing.setVisibility(true);
        path.rtxNoResultsFound.setVisibility(false);
        path.segListing.widgetDataMap = dataMap;
        this.sortBy2 = this.getObjectSorter("lblDataSource.text");
        this.resetSortImages();
        var sortedData = data.sort(this.sortBy2.sortData);
        path.segListing.setData(sortedData);
      }else{
        path.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmLogsController.No_results_found");
        path.rtxNoResultsFound.setVisibility(true);
        path.segListing.setVisibility(false);
      }
    }
    this.view.forceLayout();
  },
  showReportsList : function(reports){
    var self=this; 
    this.setButtonSkins(true);
      this.view.flxListingCommon.setVisibility(true);
      this.view.flxDatasourcesListContainer.setVisibility(false);
      this.view.flxReportsListContainer.setVisibility(true);
      var data;
      var dataMap = {
        "lblReportName" : "lblReportName",
        "lblDescription" : "lblDescription",
        "lblDataSource" : "lblDataSource",
        "lblCreatedDate" : "lblCreatedDate",
        "flxOptions": "flxOptions",
        "fontIconOptions" : "fontIconOptions",
        "lblSeparator": "lblSeparator",
        "id":"id",
        "externalId":"externalId",
        "users":"users",
        "roles": "roles",
        "createdBy" : "createdBy",
        "flxReportsContent" : "flxReportsContent",
        "flxReportsListing":"flxReportsListing"
      };
      self.segment_ROW_FRAMES = {};
      this.view.lblAvailableHeader.text=this.reports.length +" "+kony.i18n.getLocalizedString("i18n.frmReportsManagement.label.reportsAvailable");;
      if (typeof reports !== 'undefined' || reports !== null) {
        if(reports.length > 0){
          this.view.tbxRecordsSearch.placeholder=kony.i18n.getLocalizedString("i18n.frmReportsManagement.placeholder.searchReport");
          data=reports.map(function (row) {
            return {
              "lblReportName" : {"text":row.name},
              "lblDescription" : row.description||"N/A",
              "lblDataSource" : row.reportDataSourceId,
              "lblCreatedDate" : row.createdts !== "N/A" ? self.getLocaleDateAndTime(row.createdts) :  "N/A",
              "flxOptions": {"isVisible": (row.id === "messages_report_0") || (kony.mvc.MDAApplication.getSharedInstance().appContext.userID !== row.createdby)?false:true,
                             "onHover" : self.showDeleteTooltip,
                             "onClick": function () {
                               self.openConfirmationPopup();
                             }},
              "lblSeparator": ".",
              "fontIconOptions" : {"text":"\ue91b"},
              "id" :row.id,
              "externalId":row.externalId,
              "users":row.users,
              "roles":row.roles,
              "createdBy" : row.createdby,
              "flxReportsListing":{"doLayout": function(eventObj){
                self.segment_ROW_FRAMES[row.id] = eventObj.frame;
              }},
              "flxReportsContent" : {"hoverSkin": "sknfbfcfc"},
              "template": "flxReportsListing",
            };
          });
          this.view.segReports.segListing.setVisibility(true);
          this.view.segReports.rtxNoResultsFound.setVisibility(false);
          this.view.segReports.segListing.widgetDataMap = dataMap;
          this.sortBy2 = this.getObjectSorter("lblReportName.text");
          this.resetSortImages();
          var sortedData = data.sort(this.sortBy2.sortData);
          this.view.segReports.segListing.setData(sortedData);
        }else{
          this.view.segReports.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmLogsController.No_results_found");
          this.view.segReports.rtxNoResultsFound.setVisibility(true);
          this.view.segReports.segListing.setVisibility(false);
        }
    }
    this.view.forceLayout();
  },
  setButtonSkins : function(inReports){
    if(inReports===true){      
      this.view.flxBreadCrumbs.setVisibility(false);
      this.view.flxMainReportsOuter.top="101px";
      this.view.mainHeader.btnAddNewOption.text=this.reports.length===0?kony.i18n.getLocalizedString("i18n.frmReportsManagement.label.datasources_caps")
      :kony.i18n.getLocalizedString("i18n.frmReportsManagement.label.createNewReport_caps");
      this.view.mainHeader.btnDropdownList.skin = "sknBtn1F844DLatoRegular13pxFFFFFFRad20px";
      this.view.mainHeader.btnDropdownList.focusSkin = "sknBtn056F35LatoRegular13pxFFFFFFRad20px";
      this.view.mainHeader.btnDropdownList.hoverSkin = "sknBtn056F35LatoRegular13pxFFFFFFRad20px";
      this.view.mainHeader.btnAddNewOption.focusSkin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      this.view.mainHeader.btnAddNewOption.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      this.view.mainHeader.btnAddNewOption.hoverSkin = "sknBtn005198LatoRegular13pxFFFFFFRad20px";
      this.view.mainHeader.btnAddNewOption.setEnabled(true);
      this.view.mainHeader.btnDropdownList.setVisibility(this.reports.length===0?false:true);
    }
    else{
      this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmReportsManagement.label.datasources_caps");
      this.view.flxBreadCrumbs.setVisibility(true);
      this.view.flxMainReportsOuter.top="119px";
      this.view.mainHeader.btnAddNewOption.text=kony.i18n.getLocalizedString("i18n.frmReportsManagement.label.addDataSource")
      this.view.mainHeader.btnAddNewOption.skin="sknBtn7B7B7BRad20px";
      this.view.mainHeader.btnAddNewOption.setEnabled(false);
      this.view.mainHeader.btnAddNewOption.hoverSkin="sknBtn7B7B7BRad20px";
      this.view.mainHeader.btnDropdownList.setVisibility(false);
    }
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmReportsManagement.titleReports");
    this.view.flxViewReports.setVisibility(false);
    this.view.mainHeader.flxButtons.setVisibility(true);
    this.view.flxMainContainer.setVisibility(false);
  },
  openConfirmationPopup : function(){
    this.view.flxConfirmationPopup.setVisibility(true);
  },
  performSearch : function(){
    var self =this;
    var inReports = this.view.flxReportsListContainer.isVisible;
    var records = inReports===true? this.reports : this.dataSources;
    var searchResult = records.filter(self.searchRecordsFilter);
    if(inReports===true)
      self.showReportsList(searchResult);
    else 
      self.populateDatasourceSegment(searchResult);
  },
  searchRecordsFilter: function(record) {
    var searchText = this.view.tbxRecordsSearch.text
    searchText = searchText.replace("<","&lt").replace(">","&gt"); 
    var inReports = this.view.flxReportsListContainer.isVisible;
    if (typeof searchText === "string" && searchText.length > 0) {
      var searchBy=inReports===true?record.name:record.name;
      return (searchBy.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    } else {
      return true;
    }
  },  
  performSearchCreatePopup : function(){
    var self =this;
    var inReports = this.view.flxReportsAvailableSegment.isVisible;
    var records = inReports===true? this.fabricReports : this.dataSources;
    var searchResult = records.filter(self.searchRecordsFilterCreate);
    if(inReports===true)
      self.showReportsListCreate(searchResult);
    else 
      self.populateDatasourceSegment(searchResult);
  },
   searchRecordsFilterCreate: function(record) {
    var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.tbxSearchBox.text); 
    var inReports = this.view.flxReportsAvailableSegment.isVisible;
    if (typeof searchText === "string" && searchText.length > 0) {
      var searchBy=inReports===true?record.label:record.name;
      return (searchBy.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    } else {
      return true;
    }
  }, 
  sortIconFor: function(column,iconPath){
    var self =this;
    self.determineSortFontIcon(this.sortBy2,column,self.view[iconPath]);
  },
  resetSortImages : function() {
    var self = this;
    if(self.view.flxCreateReport.isVisible){
      if(self.view.flxReportsAvailableSegment.isVisible){ // Data source selection in create report scenario
        self.sortIconFor('lblReportName.text', 'fontIconSortReportName');
      }
      else if(self.view.flxDatasourcesAvailableSegment.isVisible){ // Report selection in create report scenario
        self.sortIconFor('lblDataSource.text', 'fontIconDatasourceNameCreate');
        self.sortIconFor('lblConnectedOn', 'fontIconConnectedOnCreate');
        self.sortIconFor('lblGeneratedReports', 'fontIconGeneratedReportsCreate');
      }
    }
    else{
      if(self.view.flxReportsListContainer.isVisible){  //Reports Listing
        self.sortIconFor('lblReportName.text', 'fontIconSortName');
        self.sortIconFor('lblCreatedDate', 'fontIconCreatedDate');
      }
      else if(self.view.flxDatasourcesListContainer.isVisible){  // Datasource Listing
        self.sortIconFor('lblDataSource.text', 'fontIconDatasourceName');
        self.sortIconFor('lblConnectedOn', 'fontIconConnectedOn');
        self.sortIconFor('lblGeneratedReports', 'fontIconGeneratedReports');
      }
    }
  },
  sortAndSetData : function(segData, sortColumn) {
    var self = this;
    self.sortBy2.column(sortColumn);
    self.resetSortImages();
    return segData.sort(self.sortBy2.sortData);
  },
  showDeleteTooltip : function(widget,context){
    var self=this;
    if (widget) { 
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER ) {
        var heightVal= 0;
        if(widget.id === "flxOptions"){ 
          for (var i = 0; i < context.rowIndex; i++) {
            var currRowDataId = this.view.segReports.segListing.data[i].id;
            heightVal = heightVal + self.segment_ROW_FRAMES[currRowDataId].height;
          }
          heightVal = heightVal + self.view.flxReportsListContainer.frame.y + self.view.flxReportsListHeader.frame.height + 42;
        }
        self.view.DeleteToolTip.top=widget.id==="flxOptions"? heightVal+"px" : "40px";
        if(self.view.DeleteToolTip.isVisible === false)
          self.view.DeleteToolTip.setVisibility(true);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        self.view.DeleteToolTip.setVisibility(false);
      }
    }
    self.view.forceLayout();
  },
  saveScreenY:function(widget,context){
    this.mouseYCoordinate=context.screenY;
  },
  clearSearchField : function(isListing){
    //clear search
    if(isListing){
      this.view.tbxRecordsSearch.text = "";
      this.view.flxRecordsSearch.skin = "sknflxd5d9ddop100";
      this.view.flxClearRecordsSearch.setVisibility(false);
    }
    else{
      this.view.tbxSearchBox.text = "";
      this.view.flxSearchContainer.skin = "sknflxd5d9ddop100";
      this.view.flxClearSearchImage.setVisibility(false);
    }
  },
  showViewReports : function(params,htmlString){
    var currentIndex=this.view.segReports.segListing.selectedRowIndex[1];
    var row=this.view.segReports.segListing.data[currentIndex];
    this.view.flxDeleteOption.setVisibility((kony.mvc.MDAApplication.getSharedInstance().appContext.userID !== row.createdBy)?false:true);
    this.view.flxListingCommon.setVisibility(false);
    this.view.mainHeader.flxButtons.setVisibility(false);
    this.view.flxPagination.setVisibility(false);
    this.view.flxViewContainer.bottom="0px";
    if(row.id==="messages_report_0"){
      this.showMessagesReport();
    }
    else{
      this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmReportsManagement.titleReports");
      this.view.flxBreadCrumbs.setVisibility(true);
      this.view.flxMainReportsOuter.top="119px";
      this.view.flxViewReports.setVisibility(true);
      this.view.lblToggleDescription.text = "\ue922";
      this.view.flxToggleContent.setVisibility(false);
      this.view.breadcrumbs.lblCurrentScreen.text = row.lblReportName.text.toUpperCase();
      this.view.lblDescriptionReport.text=row.lblReportName.text;
      this.view.lblDescriptionValue.text=row.lblDescription;
      this.view.lblDataSourceValue.text=row.lblDataSource;
      this.view.lblCreatedOnValue.text=row.lblCreatedDate;
      if(params.length>0){
        this.setParameters(params);
      }
      else{
        this.displayChart(htmlString);
      }
      this.view.flxChartDisplay.setVisibility(params.length>0===true?false:true);
      this.view.flxAddParametersMessage.setVisibility(params.length>0);
      this.view.flxChart.height=params.length>0===true?"300px":"850px";
      this.view.flxParameters.setVisibility(params.length>0);
    }
    this.view.forceLayout();
  },
  generateReport : function(htmlString){
    this.displayChart(htmlString);
    this.view.flxChartDisplay.setVisibility(true);
    this.view.flxAddParametersMessage.setVisibility(false);
    this.view.flxParameters.setVisibility(true);
    this.view.flxChart.height="850px";
    this.view.forceLayout();
  },
  setParameters: function(params) {
    var scopeObj = this;
    var leftOffset = (kony.os.deviceInfo().screenWidth - 305 - 70 -35)/2;
    var flxWidth = leftOffset + "px";
    scopeObj.view.flxParametersContent.removeAll();
    // If options is emoty for a multi select param then we ignore it hence retrieving actual length beforehand
    if (params && params.length > 0) {
      var paramsLength=params.length;
      for (var len = 0; len < params.length; len++) {
        if(params[len].type==="multiSelect" && params[len].state.options.length===0)
          paramsLength=paramsLength-1;
      }
      var count = 0, assignedCount=0;
      var noOfRows = Math.ceil(paramsLength / 2);
      var top = 0;
      for (var i = 0; i < noOfRows; i++) {
        //If current multi select options doesnt have a value skip it
        while(params[count].type==="multiSelect" && params[count].state.options.length===0)
          count=count+1;
        var noOfColumns = (assignedCount === paramsLength-1) ? 1 : 2;
        for (var j = 0; j < noOfColumns; j++) {
          var toAdd = new com.adminConsole.reports.dynamicParameters({
            "autogrowMode" : kony.flex.AUTOGROW_NONE,
            "clipBounds" : false,
            "id" : "param" + count,
            "isVisible" : true,
            "layoutType" : kony.flex.FREE_FORM,
            "masterType" : constants.MASTER_TYPE_DEFAULT,
            "width" : flxWidth,
            "top" : top + "px",
            "height" : "90px",
            "left" : leftOffset*j,
            "zIndex" : noOfRows-i+1,
            "paramId" : params[count].id,
            "paramType" : params[count].type,
            "isMandatory" : params[count].mandatory,
            "validationRules" : params[count].validationRules
          }, {}, {});          
          var flexChildrenlength = toAdd.flxInputComponents.children.length;
          for(var k = 0; k < flexChildrenlength; k++) {
            toAdd[toAdd.flxInputComponents.children[k]].setVisibility(false);
          }
          if(params[count].type==="singleValueDate"){
            toAdd.flxDatePicker.setVisibility(true);
            if(params[count].state.value && (params[count].state.value!=="")){
            var date= scopeObj.calculateDateBasedOnAlias(params[count].state.value);
            toAdd.flxSingleDate.date=date;  
            }
            scopeObj.view.flxParametersContent.add(toAdd);
          }
          else if(params[count].type==="multiSelect"){
            scopeObj.view.flxParametersContent.add(toAdd);
            toAdd.flxMultiListBox.setVisibility(true);
            scopeObj.populateList(toAdd.customListbox, params[count].state.options);
            toAdd.customListbox.flxSelectedText.skin="sknflxffffffop100Bordercbcdd1Radius3px";
          }
          else if(params[count].type==="singleValueDatetime"){
            toAdd.flxDateTimePicker.setVisibility(true);
            if(params[count].state.value && (params[count].state.value!=="")){
            var dateTS= scopeObj.calculateDateBasedOnAlias(params[count].state.value);
            var formatDateTS = dateTS.split("T");
            toAdd.CalDate.date=formatDateTS[0];  
            var timeStamp = formatDateTS[1] ? (formatDateTS[1].split(":")) : ["00","00","00"];
            toAdd.lstbxHours.selectedKey=timeStamp[0];
            toAdd.lstbxMinutes.selectedKey=(timeStamp[1]==="00"?"0":timeStamp[1]);
            toAdd.lstbxSeconds.selectedKey=(timeStamp[2]==="00"?"0":timeStamp[2]);
            }
            scopeObj.view.flxParametersContent.add(toAdd);
          }
          else if(params[count].type==="singleValueText" || params[count].type === "singleValueNumber"){
            toAdd.flxSingleText.setVisibility(true);
            toAdd.tbxEnterValue.textInputMode=params[count].type==="singleValueText"?"A":"N";
            toAdd.tbxEnterValue.placeholder=params[count].label;
            toAdd.tbxEnterValue.text=params[count].state.value;
            scopeObj.view.flxParametersContent.add(toAdd);
          }
          toAdd.lblHeadingText.text=params[count].label;
          ++count;
          ++assignedCount;
          scopeObj.setParameterActions(toAdd);
        }
        top = top + 110;
      }
    }
    this.view.forceLayout();
  },
  displayChart : function(htmlString){
    if(this.totalPages && this.totalPages!==-1 && parseInt(this.totalPages)>1){
      this.view.flxPagination.setVisibility(true);
      this.view.flxViewContainer.bottom="50px";
    }
    else{  
      this.view.flxPagination.setVisibility(false);
      this.view.flxViewContainer.bottom="0px";
    }
    this.view.flxChartView.removeAll();
    var iframe_src= 'data:text/html,' + encodeURIComponent(htmlString);
    var webBasic = {
      id: "browserID",
      isVisible: true,
      htmlString:"<iframe id=iframe_browser scrolling=no height=840 width=100% src="+iframe_src+" ></iframe>"
    };
    var webLayout = {
      containerHeight: "840",
      containerWidth: "100%"
    };
    var webPsp = {};
    var browserID = new kony.ui.Browser(webBasic, webLayout, webPsp);
    browserID.height="850";
    browserID.width="100%";
    this.view.flxChartView.add(browserID);
    browserID.screenLevelWidget=false;
    browserID.enableNativeCommunication=true;
    this.view.forceLayout();
  },
  toggleDescription : function(){
    if(this.view.flxToggleContent.isVisible){
      this.view.lblToggleDescription.text = "\ue922";
      this.view.flxToggleContent.setVisibility(false);
    }
    else{
      this.view.lblToggleDescription.text = "\ue915";
      this.view.flxToggleContent.setVisibility(true);
    }
  },
  showCreateReports : function(){
    this.view.flxCreateReport.setVisibility(true);
    this.handleTabsSkinAndArrow(this.view.verticalTabs.btnOption0, this.view.verticalTabs.lblSelected0);
    this.view.verticalTabs.lblOptional0.skin="skn003E75Lato12px";
    this.view.verticalTabs.lblOptional0.setVisibility(false);
    this.selectedDataSource="";
    this.selectedReport="";
    this.showDataSourceInCreate();
    this.clearSearchField(false);
    this.view.forceLayout();
  },
 handleTabsSkinAndArrow : function(btnOption, lblSelected){
    var self= this;
    var widgetArray = [this.view.verticalTabs.btnOption0,this.view.verticalTabs.btnOption1];
    self.tabUtilVerticleButtonFunction(widgetArray, btnOption);
    var widgetArray1 = [this.view.verticalTabs.lblSelected0,this.view.verticalTabs.lblSelected1];
    self.tabUtilVerticleArrowVisibilityFunction(widgetArray1,lblSelected);
  },
  showDataSourceInCreate : function(){    
    this.clearSearchField(false);
    this.populateDatasourceSegment(this.dataSources);
    this.view.lblAvailableReports.text=this.dataSources.length +" "+kony.i18n.getLocalizedString("i18n.frmReportsManagement.label.datasourcesAvailable");
    this.view.tbxSearchBox.placeholder=kony.i18n.getLocalizedString("i18n.frmReportsManagement.placeholder.searchDatasource");
    this.view.flxDatasourcesAvailableSegment.setVisibility(true);
    this.view.flxReportsAvailableSegment.setVisibility(false);
    this.handleTabsSkinAndArrow(this.view.verticalTabs.btnOption0, this.view.verticalTabs.lblSelected0);
    this.view.commonButtons.btnSave.skin= (this.selectedDataSource!=="")?"sknBtn003E75LatoRegular13pxFFFFFFRad20px": "sknBtn7B7B7BRad20px";
    this.view.commonButtons.btnSave.hoverSkin=(this.selectedDataSource!=="")?"sknBtn005198LatoRegular13pxFFFFFFRad20px":"sknBtn7B7B7BRad20px";
    this.view.commonButtons.btnSave.setEnabled((this.selectedDataSource!==""));
    this.view.commonButtons.btnSave.text=kony.i18n.getLocalizedString("i18n.frmAdManagement.Next");
    this.view.commonButtons.btnSave.width="94px";
    this.view.forceLayout();
  },
  showReportsInCreate : function(){    
    this.clearSearchField(false);
    this.view.lblAvailableReports.text=this.fabricReports.length +" "+kony.i18n.getLocalizedString("i18n.frmReportsManagement.label.reportsAvailable");
    this.view.tbxSearchBox.placeholder=kony.i18n.getLocalizedString("i18n.frmReportsManagement.placeholder.searchReport");
    this.view.flxDatasourcesAvailableSegment.setVisibility(false);
    this.view.flxReportsAvailableSegment.setVisibility(true);
    this.handleTabsSkinAndArrow(this.view.verticalTabs.btnOption1, this.view.verticalTabs.lblSelected1);
    var data=this.view.segDatasourceCreate.segListing.data;
    var selectedRow = data[this.view.segDatasourceCreate.segListing.selectedRowIndex[1]];
    this.view.verticalTabs.lblOptional0.setVisibility(true);
    this.view.verticalTabs.lblOptional0.text=selectedRow.lblDataSource.text.toUpperCase();
    this.showReportsListCreate(this.fabricReports);
    this.view.commonButtons.btnSave.skin= (this.selectedReport!=="")?"sknBtn003E75LatoRegular13pxFFFFFFRad20px": "sknBtn7B7B7BRad20px";
    this.view.commonButtons.btnSave.hoverSkin=(this.selectedReport!=="")?"sknBtn005198LatoRegular13pxFFFFFFRad20px":"sknBtn7B7B7BRad20px";
    this.view.commonButtons.btnSave.setEnabled((this.selectedReport!==""));
    this.view.commonButtons.btnSave.text=kony.i18n.getLocalizedString("i18n.frmReportsManagement.label.createReport_caps");
    this.view.commonButtons.btnSave.width="161px";
    this.view.forceLayout();
  },
  onHoverSegmentRow : function(widget, context) {
    var self = this;
    if(self.view.flxCreateReport.isVisible===true){
    var path=self.view.flxDatasourcesAvailableSegment.isVisible?self.view.segDatasourceCreate.segListing:self.view.segReportsCreate.segListing;
    var rowData = path.data[context.rowIndex];
      if(!path.selectedRowIndex || path.selectedRowIndex[1]!==context.rowIndex){
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        if (rowData.fontIconSelect.visible === false) {
          rowData.fontIconSelect.visible = true;
          path.setDataAt(rowData, context.rowIndex);
        }
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        if (rowData.fontIconSelect.visible === true) {
          rowData.fontIconSelect.visible = false;
          path.setDataAt(rowData, context.rowIndex);
        }
      }
      rowData.fontIconSelect.skin="sknfontIcone1e5eesize24px";
      }
    }
  },
  selectCurrentRow : function(){
    var self=this;
    if(self.view.flxCreateReport.isVisible===true){
      var path=self.view.flxDatasourcesAvailableSegment.isVisible?self.view.segDatasourceCreate.segListing:self.view.segReportsCreate.segListing;
      var data=path.data;
      var selectedIndex = path.selectedRowIndex[1];
      var selectedRow = data[selectedIndex];
      var prevSelectedRow;
      for(var i=0; i<data.length; i++){
        if(data[i].fontIconSelect.visible){
          prevSelectedRow = data[i];
          prevSelectedRow.fontIconSelect.visible = false;
          prevSelectedRow.fontIconSelect.skin="sknfontIcone1e5eesize24px";
          path.setDataAt(prevSelectedRow, i, 0);
        }
      }
      if(self.view.flxDatasourcesAvailableSegment.isVisible===true)
        self.selectedDataSource=selectedRow.id;
      else
        self.selectedReport=selectedRow.id;
      selectedRow.fontIconSelect.skin="sknfontIcon004F93size24px";
      selectedRow.fontIconSelect.visible=true;
      path.setDataAt(selectedRow, selectedIndex, 0);
      self.view.commonButtons.btnSave.skin="sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      self.view.commonButtons.btnSave.hoverSkin="sknBtn005198LatoRegular13pxFFFFFFRad20px";
      self.view.commonButtons.btnSave.setEnabled(true);
    }
    this.view.forceLayout();
  },
  showReportsListCreate : function(response){
    var self=this;
      var data;
      var dataMap = {
        "id":"id",
        "lblReportName" : "lblReportName",
        "lblDescription" : "lblDescription",
        "lblSeparator": "lblSeparator",
        "fontIconSelect":"fontIconSelect",
        "flxContent":"flxContent",
        "params": "params"
      };
      this.view.lblAvailableHeader.text=this.reports.length +" "+kony.i18n.getLocalizedString("i18n.frmReportsManagement.label.reportsAvailable");
      if (typeof response !== 'undefined' || response !== null) {
        if(response.length > 0){
          data=response.map(function (row) {
            return {
              "id": row.id,
              "lblReportName" : {"text":row.label},
              "lblDescription" : row.description||"N/A",
              "lblSeparator": ".",
              "fontIconSelect": {"visible": (self.selectedReport===row.id)?true:false,"skin":(self.selectedReport===row.id)?"sknfontIcon004F93size24px":"sknfontIcone1e5eesize24px"},
              "flxContent": {"onHover": self.onHoverSegmentRow,"hoverSkin": "sknfbfcfc"},
              "template": "flxSelectReport"
            };
          });
          this.view.segReportsCreate.segListing.setVisibility(true);
          this.view.segReportsCreate.rtxNoResultsFound.setVisibility(false);
          this.view.segReportsCreate.segListing.widgetDataMap = dataMap;
          this.sortBy2 = this.getObjectSorter("lblReportName.text");
          this.resetSortImages();
          var sortedData = data.sort(this.sortBy2.sortData);
          this.view.segReportsCreate.segListing.setData(sortedData);
        }else{
          this.view.segReportsCreate.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmLogsController.No_results_found");
          this.view.segReportsCreate.rtxNoResultsFound.setVisibility(true);
          this.view.segReportsCreate.segListing.setVisibility(false);
        }
      }
    this.view.forceLayout();
  },
   usersSegmentPopup: function (records) {
    if (records.length === 0) {
      var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.tbxSearchBoxUsers.text) ;
      this.view.richTextNoUsers.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + searchText + kony.i18n.getLocalizedString("i18n.frmCSRController._Try_with_another_keyword");
      this.view.richTextNoUsers.isVisible = true;
      this.view.segUsers.isVisible = false;
    } else {
      this.view.richTextNoUsers.isVisible = false;
      this.view.segUsers.isVisible = true;
      var dataMap = {
        "flxUsersDropDown": "flxUsersDropDown",
        "lblViewFullName": "lblViewFullName",
        "flxName" :"flxName",
        "id": "id"
      };
      var toSegment = function (assignedData) {
        return {
          "lblViewFullName": assignedData.Email,
          "flxUsersDropDown": {"hoverSkin": "sknCursor"},
          "flxName": {"hoverSkin": "sknFlxHoverEAF3FB"},
          "id": assignedData.User_id,
          "template": "flxUsersDropDown"
        };
      };
      this.view.flxUsersDropdown.setVisibility(true);
      var data = records.map(toSegment);
      this.view.segUsers.widgetDataMap = dataMap;
      this.view.segUsers.setData(data);
    }
     this.view.forceLayout();
  },
  searchFilterUsers: function (users) {
    this.sortBy2 = this.getObjectSorter('Email');
    var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.tbxSearchBoxUsers.text);
    if (typeof searchText === 'string' && searchText.length > 0) {
      var flag= users.Email.toLowerCase().indexOf(searchText.toLowerCase()) === 0;
      if(flag===true && this.checkIfUserAlreadyAdded(users.User_id)===false)
        return true;
      else return false;
    } else {
      return false;
    }
  },
  checkIfUserAlreadyAdded : function(userId){
    for(var i =0; i < this.selectedUserIds.length; i++){
      if(userId===this.selectedUserIds[i].id)
        return true;
    }
    return false;
  },
  populateTags : function(isUserTag,expandAll){
    var path=isUserTag?this.view.flxUserTagsContainer:this.view.flxRoleTagsContainer;
    var selectedTags=isUserTag?this.selectedUserIds:this.selectedRoleIds;
    var flxId=isUserTag?"u":"r";
    var count=selectedTags.length;
    path.removeAll();
    var left=0;
    var newTag;
    var self=this;
    var top=0;
    var row=1;
    var breakLoop=false;
    for(var i=0;i<count;i++){      
      newTag = this.view.flxTag.clone(flxId+i);
      newTag.isVisible = true;
      newTag.width=this.AdminConsoleCommonUtils.getLabelWidth(selectedTags[i].name)+20;
      var lblname = flxId+i+"lblName";
      if(expandAll===false && row===2 && this.view.flxShareReportContent.frame.width<=left+newTag.width+79){
        newTag.id=flxId+"more";
        newTag[lblname].text = "+"+count-i+" More";
        newTag[flxId+i+"lblIconCrossName"].setVisibility(false);
        newTag.width=this.AdminConsoleCommonUtils.getLabelWidth(newTag[lblname].text)+10;
        breakLoop=true;
      }
      else{   
        if(this.view.flxShareReportContent.frame.width<=left+newTag.width){
          row=row+1;
          top = top+30;
          left=0;
        }
        newTag.tagId=selectedTags[i].id;
        newTag[lblname].text = selectedTags[i].name;  
      }
      newTag.top = top+"px";
      newTag.left = left+"px";
      left=newTag.width+left+10;
      self.onTagActions(newTag, flxId+i, isUserTag);
      path.add(newTag);
      newTag[flxId+i+"lblIconCrossName"].hoverSkin="sknIcoMoon10pxCursor003E75";
      if(breakLoop===true){	
        newTag.hoverSkin="sknCursor";
        break;
      }
    }
    this.view.forceLayout();
  },
  onTagActions : function(comp, currentPrefix, isUserTag){
    var self=this;    
    comp[currentPrefix +"lblIconCrossName"].onTouchStart = function () {
      self.removeTag(comp.tagId,isUserTag);
    };
    comp.onClick = function () {
      if(comp.id===currentPrefix.substring(0, 1)+"more")
        self.populateTags(isUserTag,true);
    };
  },
  removeTag : function(id, isUserTag){    
    var selectedTags=isUserTag?this.selectedUserIds:this.selectedRoleIds;
    for(var i=0;i<selectedTags.length;i++){
      if(selectedTags[i].id===id){
        selectedTags.splice(i,1);
        break;
      }
    }
    this.populateTags(isUserTag,false);
    if(isUserTag===false){
      this.removeFromListBox(id);
    }else
      this.view.lblSelectedCountText.text =  this.selectedUserIds.length +" Selected";      
  },
  removeFromListBox: function(id){
    var self = this;
    var widgetPath =self.view.customListboxRoles;
    var selRows = widgetPath.segList.selectedRowItems;
    var selIndices = widgetPath.segList.selectedIndices[0][1];
    if (selRows) {
      for(var i = 0 ; i<selRows.length; i++){
        if(selRows[i].id===id){
          selIndices.splice(i,1);
          widgetPath.segList.selectedIndices=[[0,selIndices]];
          break;
        }
      }      
      self.onCustomListBoxRowClick();
    }    
  },
  populateList : function(widgetPath,list){
    var self = this;
    var data = self.mapList(widgetPath,list);
    widgetPath.segList.setData(data);
    //widgetPath.segList.selectedIndices =[[0,[0]]];
    widgetPath.lblSelectedValue.text = widgetPath===self.view.customListboxRoles?"Select Roles":"Select Values";
    widgetPath.imgCheckBox.src = self.checkboxnormal;
    var selectInd = [];
    var segData = widgetPath.segList.data;
    if(segData.length>0){
      for(var i=0;i<segData.length;i++){
        if(segData[i].imgCheckBox.src=== self.checkboxselected){
          selectInd.push(i);
        } 
      }
      if(selectInd.length>0){
        if(selectInd.length===segData.length){
          widgetPath.imgCheckBox.src = self.checkboxselected;
          widgetPath.lblSelectedValue.text = self.sAll;
        }
        else{
          widgetPath.lblSelectedValue.text = selectInd.length + " " + self.sSelected;
        }
          widgetPath.segList.selectedRowIndices = [[0,selectInd]];
      }
    }
  },
  mapList: function(widgetPath,data) {
    var self = this;
    var listBoxData = [];
    var isParamComp = widgetPath!==self.view.customListboxRoles?true:false;
    var widgetDataMap = {
      "id": "id",
      "lblDescription": "lblDescription",
      "imgCheckBox": "imgCheckBox",
      "flxCheckBox":"flxCheckBox",
      "flxSearchDropDown": "flxSearchDropDown"
    };
    widgetPath.segList.widgetDataMap = widgetDataMap;
    if (data) {
      if(isParamComp===true){
         data = data.filter(function(rec){
           if(rec.label!=="" && rec.value !=="")
             return rec;
         });
      }
      listBoxData = data.map(function(rec) {
        return {
            "id": isParamComp===true?rec.label:rec.role_id,
            "lblDescription": {"text":isParamComp ? rec.value : rec.role_Name || rec.legalEntitiesRoleInfo[0].role_Name },
            "imgCheckBox": {"src":isParamComp?(rec.selected===true?self.checkboxselected:self.checkboxnormal):self.isRoleSelected(rec.role_id)},
            "template": "flxSearchDropDown"
          };
      });
    }
    return listBoxData;
  },
  
  isRoleSelected : function(roleId){
    var currentIndex=this.view.segReports.segListing.selectedRowIndex[1];
    var row=this.view.segReports.segListing.data[currentIndex];
    if(row.roles){
    for(var i = 0; i < row.roles.length; i++){
      if(roleId === row.roles[i].id)
        return this.checkboxselected;
    }
    }
    return this.checkboxnormal;    
  },
  
  onCustomListBoxRowClick : function(widgetPath){
    var self = this;
    var segData ="";
    widgetPath = widgetPath? widgetPath:self.view.customListboxRoles;
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
      widgetPath.lblSelectedValue.text = widgetPath===self.view.customListboxRoles?"Select Roles":"Select Values";
    }
    if(widgetPath===self.view.customListboxRoles)
      self.populateRoleTags();
    self.view.forceLayout();
  },
  onClickOfSelectAll : function(widgetPath){
    var self = this;
    var segData ="";
    widgetPath = widgetPath? widgetPath:self.view.customListboxRoles;
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
      widgetPath.lblSelectedValue.text = widgetPath===self.view.customListboxRoles?"Select Roles":"Select Values";
	}
    if(widgetPath===self.view.customListboxRoles)
      self.populateRoleTags();
    self.view.forceLayout();
  },
  populateRoleTags : function(){
    var selectedList = [];
    var selRows = this.view.customListboxRoles.segList.selectedRowItems;
    if(selRows){
      selectedList= selRows.map(function(rec) {
        return {
          "id": rec.id,
          "name": rec.lblDescription.text
        };
      });
    }
    this.selectedRoleIds=selectedList;
    this.populateTags(false,false);
  },
  openShareReportPopup : function(){
    var currentIndex=this.view.segReports.segListing.selectedRowIndex[1];
    var row=this.view.segReports.segListing.data[currentIndex];
    this.view.flxShareReport.setVisibility(true);
    // disable share if current user has not created the report
    var currentUserId=kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
    this.view.commonShareButtons.btnSave.skin= (currentUserId === row.createdBy)?"sknBtn003E75LatoRegular13pxFFFFFFRad20px": "sknBtn7B7B7BRad20px";
    this.view.commonShareButtons.btnSave.hoverSkin=(currentUserId === row.createdBy)?"sknBtn005198LatoRegular13pxFFFFFFRad20px":"sknBtn7B7B7BRad20px";
    this.view.commonShareButtons.btnSave.setEnabled(currentUserId === row.createdBy);
    this.view.forceLayout();
    
    this.populateList(this.view.customListboxRoles,this.roles);
    this.selectedUserIds=this.getSavedUsers(row.users);
    this.selectedRoleIds=row.roles?JSON.parse(JSON.stringify(row.roles)):[];
    this.view.lblSelectedCountText.setVisibility(this.selectedUserIds.length>0);
    this.view.lblSelectedCountText.text =  this.selectedUserIds.length +" Selected";
    this.populateRoleTags();
    this.populateTags(true,false);
    if((currentUserId === row.createdBy) && this.selectedUserIds.length > 0 &&
       this.selectedRoleIds.length > 0){
      this.view.commonShareButtons.btnSave.skin=  "sknBtn7B7B7BRad20px";
      this.view.commonShareButtons.btnSave.hoverSkin= "sknBtn7B7B7BRad20px";
      this.view.commonShareButtons.btnSave.setEnabled(false);
    }
    this.view.customListboxRoles.setVisibility(true);
    this.view.customListboxRoles.flxSelectedText.skin="sknflxffffffop100Bordercbcdd1Radius3px";
    this.view.flxClearSearchImageUsers.onClick();
    this.view.customListboxRoles.flxSegmentList.setVisibility(false);
    this.view.forceLayout();
  },
  getSavedUsers : function(savedUsers){
    var users= [];
    if(savedUsers){
    for(var i=0; i<savedUsers.length; i++){
      for(var j=0; j<this.users.length;j++){
        if(savedUsers[i].id===this.users[j].User_id){
          users.push({"id":this.users[j].User_id,"name":this.users[j].Email});
          break;
        }
      }
    }
    }
    return users;    
  },
  setParameterActions : function(param) {
    var scopeObj = this;
     param.customListbox.flxDropdown.onClick = function(){
      param.customListbox.flxSegmentList.setVisibility(param.customListbox.flxSegmentList.isVisible === false);
    }; 
    param.customListbox.flxSelectedText.onClick = function(){
      param.customListbox.flxSegmentList.setVisibility(param.customListbox.flxSegmentList.isVisible === false);
    };
    param.customListbox.btnOk.onClick = function(){
      param.customListbox.flxSegmentList.setVisibility(param.customListbox.flxSegmentList.isVisible === false);
      scopeObj.view.forceLayout();
    };
    param.customListbox.flxCheckBox.onClick = function(){
      scopeObj.onClickOfSelectAll(param.customListbox);
    };
    param.customListbox.flxSelectAll.onClick = function() {
      scopeObj.onClickOfSelectAll(param.customListbox);
    };
    param.customListbox.segList.onRowClick = function(){
      scopeObj.onCustomListBoxRowClick(param.customListbox);
    };
     
  },
  renderInitialReportsUi : function(context){
    //resetAll
    this.dataSources=[];
    this.reports=[];
    
    if(context.reportsInfo)
      this.setReportsInfo(context.reportsInfo);
    if(context.dataSources)
      this.dataSources=context.dataSources.reportdatasource;
    if(context.reports)
      this.reports=context.reports.userReports;
    if(context.users)
      this.users=context.users.internalusers_view;
    if(context.roles)
      this.roles=context.roles.roles_view;
    this.reports.push({
          "id" : "messages_report_0",
          "name" : "Messages",
          "description" : "View daily mesaages over the reporting period",
          "reportDataSourceId" : "N/A",
          "createdts" : "N/A"
     });
     this.showReportsList(this.reports);    
     this.clearSearchField(true);
  },
  deleteReport : function(){
    var currentIndex=this.view.segReports.segListing.selectedRowIndex[1];
    var row=this.view.segReports.segListing.data[currentIndex];
    this.presenter.deleteReport({
       "reportId":row.id
    });
    this.view.flxConfirmationPopup.setVisibility(false);
  },
   createReport : function(){
      var selectedDataSourceIndex = this.view.segDatasourceCreate.segListing.selectedRowIndex[1];
      var dataSourceRow = this.view.segDatasourceCreate.segListing.data[selectedDataSourceIndex];
      var selectedReportIndex = this.view.segReportsCreate.segListing.selectedRowIndex[1];
      var reportRow = this.view.segReportsCreate.segListing.data[selectedReportIndex];
     this.presenter.createReport({
       "reportName":reportRow.lblReportName.text,
       "reportDescription":reportRow.lblDescription,
       "externalId":reportRow.id,
       "reportDataSourceId":dataSourceRow.id

     });
     this.view.flxCreateReport.setVisibility(false);
  },
  getFilters : function(){
    var currentIndex=this.view.segReports.segListing.selectedRowIndex[1];
    var row=this.view.segReports.segListing.data[currentIndex];
    var payload={
      "reportId":row.externalId
    };
    this.presenter.getFilters(payload);
  },
  getHtmlString : function(page){
    var currentIndex=this.view.segReports.segListing.selectedRowIndex[1];
    var row=this.view.segReports.segListing.data[currentIndex];
    var filters=this.getSelectedFilters();
    var payload={
      "reportId":row.externalId,
      "filters":filters,
      "page":page
    };
    this.presenter.getReport(payload,"yes");
  },
  shareReport : function(){
    var currentIndex=this.view.segReports.segListing.selectedRowIndex[1];
    var row=this.view.segReports.segListing.data[currentIndex];
    var addedRemovedUsers= this.getAddedRemovedItems(row.users,this.selectedUserIds);
    var addedRemovedRoles= this.getAddedRemovedItems(row.roles,this.selectedRoleIds);
    var payload = { "reportId":row.id,
                   "addedRoles": addedRemovedRoles.added,
                   "removedRoles": addedRemovedRoles.removed,
                   "addedUsers": addedRemovedUsers.added,
                   "removedUsers": addedRemovedUsers.removed};
    this.presenter.shareReport(payload);
    this.view.flxShareReport.setVisibility(false);
  },
  getAddedRemovedItems : function(originalList,newList){
    var self = this;
    originalList = originalList?originalList:[];
    var id = originalList.map(function(rec){
      return rec.id;
    });
    var newId = newList.map(function(rec){
      return rec.id;
    });
    var removed = self.getDiffOfArray(originalList, newId);
    var addList = newList.filter(function(rec){
      for(var i=0;i<id.length;i++){
        if(id[i] !== "" && id[i] === rec.id){
          return null;
        }
      }
      return rec;
    });
    return {"added":addList,"removed":removed};
  },
  getDiffOfArray: function (a1, a2) {
    return a1.filter(function(x) {
      if(a2.indexOf(x.id) >= 0) return false;
      else return true;
    });
  },
  downloadReport : function(){
    var currentIndex=this.view.segReports.segListing.selectedRowIndex[1];
    var row=this.view.segReports.segListing.data[currentIndex];
    var payload={
      "reportId":row.externalId,
      "filters": this.getSelectedFilters(),
      "fileType":"xls"
    };
    this.presenter.downloadReport(payload);
  },
  downloadFile : function(rb){
    var currentIndex=this.view.segReports.segListing.selectedRowIndex[1];
    var row=this.view.segReports.segListing.data[currentIndex];
    var a = window.document.createElement('a');

    a.href = window.URL.createObjectURL(new Blob([Uint8Array.from(rb, c => c.charCodeAt(0))], { type: 'application/xls' }));
    a.download = row.lblReportName.text+".xls";
// Append anchor to body.
    document.body.appendChild(a);
    a.click();
    // Remove anchor from body
    document.body.removeChild(a);
  },
  getSelectedFilters : function(){
    var children = this.view.flxParametersContent.children;
    var filters="";
    for(var i =0;i<children.length;i++){
      var path= this.view.flxParametersContent[children[i]];
      var paramId=path.paramId;
      var paramType=path.paramType;
      if(i!==0 )
        filters=(filters.charAt(filters.length-1)===",")?filters:filters+","; // if last char is , then dont append
      if(paramType==="singleValueDate"){
        var date1=path.flxSingleDate.date;   
        if(date1!==null){
        var formatDate1 = date1.replace(/\//g,"-");
        filters=filters+""+paramId+"="+formatDate1;
        }
      }
      else if(paramType==="multiSelect"){
        var selectedItems = path.customListbox.segList.selectedRowItems;
        if(selectedItems!==null){
        filters=filters+""+paramId+"=";
        for(var j=0;j<selectedItems.length;j++){
          if(j!==0 )
            filters=filters+"|";
          filters= filters+selectedItems[j].id;
        }       
        }
      }
      else if(paramType==="singleValueDatetime"){
        var date2=path.CalDate.date;             
        var formatDate2 = date2.replace(/\//g,"-");
        if(date2!==null && path.lstbxHours.selectedKey!== "HH" && path.lstbxMinutes.selectedKey!=="MM" && path.lstbxSeconds.selectedKey!=="SS"){
        filters=filters+""+paramId+"="+formatDate2+"T"
          +path.lstbxHours.selectedKey+":"+((path.lstbxMinutes.selectedKey==="0")?"00":path.lstbxMinutes.selectedKey)
          +":"+((path.lstbxSeconds.selectedKey==="0")?"00":path.lstbxSeconds.selectedKey);       
        }
      }
      else if(paramType==="singleValueText" || paramType === "singleValueNumber"){
        if(path.tbxEnterValue.text!==null && path.tbxEnterValue.text!==""){
        var filtertext=path.tbxEnterValue.text;
        filters=filters+""+paramId+"="+filtertext;
        }
      }
    }
    return filters;
  },
  validateParameters : function(){
    var children = this.view.flxParametersContent.children;
    var isValid=true;
    for(var i =0;i<children.length;i++){
      var path= this.view.flxParametersContent[children[i]];
      var paramType=path.paramType;
      var isMandatory=path.isMandatory;
      var validationRules=path.validationRules;
      path.flxInlineError.setVisibility(false);
      if(paramType==="singleValueDate"){        
        var date1=path.flxSingleDate.date;  
        if(isMandatory===true){
          if(date1===null){
            path.flxInlineError.setVisibility(true);
            path.lblErrorText.text=validationRules.dateTimeFormatValidationRule.errorMessage;
            isValid=false;
          }          
        }  
      }
      else if(paramType==="multiSelect"){
        var selectedItems = path.customListbox.segList.selectedRowItems;
        if(isMandatory===true && selectedItems.length===0){
          path.flxInlineError.setVisibility(true);
          path.lblErrorText.text="This field is mandatory";
          isValid=false;
        }
      }
      else if(paramType==="singleValueDatetime"){
        var date2=path.CalDate.date;        
        if(isMandatory===true){
          if(date2===null || path.lstbxHours.selectedKey ==="HH" || path.lstbxMinutes.selectedKey ==="MM" || path.lstbxSeconds.selectedKey ==="SS"){
            path.flxInlineError.setVisibility(true);
            path.lblErrorText.text=validationRules[0].dateTimeFormatValidationRule.errorMessage;
            isValid=false;
          }

        }
        else if(!(date2===null && path.lstbxHours.selectedKey ==="HH" && path.lstbxMinutes.selectedKey ==="MM" && path.lstbxSeconds.selectedKey ==="SS") 
                && !(date2!==null && path.lstbxHours.selectedKey !=="HH" && path.lstbxMinutes.selectedKey !=="MM" && path.lstbxSeconds.selectedKey !=="SS")){
          path.flxInlineError.setVisibility(true);
          path.lblErrorText.text=validationRules[0].dateTimeFormatValidationRule.errorMessage;
          isValid=false;
        }
      }
      else if(paramType==="singleValueText" || paramType === "singleValueNumber"){
        var filtertext=path.tbxEnterValue.text;              
        if(isMandatory===true && filtertext===""){
          path.flxInlineError.setVisibility(true);
          path.lblErrorText.text="This field is mandatory";     
          isValid=false;
        }
      }
    }   
    return isValid;
  },
  calculateDateBasedOnAlias : function(dateValue){
    dateValue= dateValue.replace(/\s/g, ""); // remove all whitespaces
    var splitDate = (dateValue.indexOf("+") >= 0) ?dateValue.split("+"):dateValue.split("-");
    var operation = (dateValue.indexOf("+") >= 0)?"+":"-";
    var date=new Date(); 
    if(splitDate.length>1){
      if(dateValue.indexOf("DAY") >= 0){
        if(operation==="+")
          date.setDate(date.getDate() + parseInt(splitDate[1]));
        else 
          date.setDate(date.getDate() - parseInt(splitDate[1]));
        date= this.formatDateYYYYMMDD(date);
      }
      else if(dateValue.indexOf("WEEK") >= 0){
        if(operation==="+")
          date.setDate(date.getDate() + parseInt(splitDate[1]*7));
        else 
          date.setDate(date.getDate() - parseInt(splitDate[1]*7));
        date= this.formatDateYYYYMMDD(date);
      }
      else if(dateValue.indexOf("MONTH") >= 0){
        date=this.addMonths(date, parseInt(splitDate[1]), operation);
      }
      else if(dateValue.indexOf("QUARTER") >= 0){
        date=this.addMonths(date, 3*parseInt(splitDate[1]), operation);
      }
      else if(dateValue.indexOf("SEMI") >= 0){
        date=this.addMonths(date, 6*parseInt(splitDate[1]), operation);
      }
      else if(dateValue.indexOf("YEAR") >= 0){
        date=this.addMonths(date, 12*parseInt(splitDate[1]), operation);
      }
      else{
        date = dateValue.replace(/-/g,"/");
      }
    }
    else
      date=this.formatDateYYYYMMDD(date);
    return date;
  },
  addMonths : function(date, months, operator) {
    var d = date.getDate();
    if(operator==="+")
      date.setMonth(date.getMonth() + +months);
    else
      date.setMonth(date.getMonth() - +months);
    if (date.getDate() !== d) {
      date.setDate(0);
    }
    return this.formatDateYYYYMMDD(date);
  },
  formatDateYYYYMMDD : function(caldate){
    var formattedDate="";
    var date=caldate.getDate();
    var month=caldate.getMonth()+1;
    var year= caldate.getFullYear();
    return formattedDate+year+"/"+month+"/"+date;
  },
  refreshPagination : function(totalPages,page){
      totalPages=parseInt(totalPages);
      page=parseInt(page);
    if(this.view.flxPagination.isVisible===true){
      this.view.reportPagination.lblNumber.text=page;
      this.view.reportPagination.tbxPageNumber.text=page;
      this.view.reportPagination.lblShowing.text="Showing "+page+" of "+totalPages+" pages";   
      this.view.reportPagination.flxnext.setVisibility(page>=totalPages?false:true);
      this.view.reportPagination.flxPrevious.setVisibility(page<=1?false:true);
      this.view.forceLayout();
    }
  }
});      