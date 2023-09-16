define({
  formPreshow :  function(){
    var scope = this;
    this.requestsPageBreadCrumbs();
    this.view.flxLoading.isVisible=true;
    this.view.flxRejectPopup.setVisibility(false);
    this.view.FlxSelectModuleDropDown.setVisibility(false);
    this.view.lblApproveDateIcon.text=kony.i18n.getLocalizedString("i18n.userwidgetmodel.lblIconAssignedTo");
    this.view.FlexContainerForStatus.isVisible=false;
    this.view.lblApproveDateIcon.skin="sknFontIconSearchCross16px";
    this.view.flxStatus.onClick = function(){
      scope.view.FlexContainerForStatus.isVisible = !scope.view.FlexContainerForStatus.isVisible;
    };
    this.view.detailHeader.flxHeader1.onClick = function(){
      scope.setApprovalData();
    };
    this.view.detailHeader.flxHeader2.onClick = function(){
      scope.setHistoryData();
    };
    this.view.btnRejectNo.onClick = function(){
      scope.closePopup();
    };
    this.view.btnRejectYes.onClick = function(){
      scope.view.flxRejectPopup.setVisibility(false);
      scope.setHistoryData();
    };
     this.view.flxRepliedByTxtcont.onClick = function(){
      if(scope.view.flxRequestType.isVisible)
        scope.view.flxRequestType.setVisibility(false);
      else{
        //scope.view.AdvancedSearchDropDownServType.flxSearchCancel.onClick();
      scope.view.flxRequestType.setVisibility(true);
        scope.view.AdvancedSearchDropDown.tbxSearchBox.text="";
        scope.view.AdvancedSearchDropDown.flxSearchCancel.isVisible=false;
      }
     };
    
    this.view.flxSelectModule.onClick = function(){
      if(scope.view.FlxSelectModuleDropDown.isVisible)
        scope.view.FlxSelectModuleDropDown.setVisibility(false);
      else{
        //scope.view.AdvancedSearchDropDownServType.flxSearchCancel.onClick();
      scope.view.FlxSelectModuleDropDown.setVisibility(true);
        scope.view.AdvancedSearchDropDown1.tbxSearchBox.text="";
        scope.view.AdvancedSearchDropDown1.flxSearchCancel.isVisible=false;
      }
     };
   this.view.AdvancedSearchDropDown.sgmentData.onRowClick = function(){
      //if(scopeObj.view.lblCustomerSearchError.isVisible)
      //scopeObj.setNormalSkinToCoreSearch();
      var rowInd=scope.view.AdvancedSearchDropDown.sgmentData.selectedRowIndex[1];
      var segData=scope.view.AdvancedSearchDropDown.sgmentData.data;
      scope.view.txtfldRepliedby.text=segData[rowInd].lblDescription;
      scope.view.flxRequestType.setVisibility(false);
      scope.view.forceLayout();
    };

    this.view.AdvancedSearchDropDown.tbxSearchBox.onKeyUp = function(){
      if(scope.view.AdvancedSearchDropDown.tbxSearchBox.text.trim().length>0){
        scope.view.AdvancedSearchDropDown.flxSearchCancel.setVisibility(true);
        var segData=scope.view.AdvancedSearchDropDown.sgmentData.data;
        var searchText=scope.view.AdvancedSearchDropDown.tbxSearchBox.text;
        var statusName="";
        var filteredData=segData.filter(function(response){
          statusName=response.lblDescription.toLowerCase();
          if(statusName.indexOf(searchText)>=0)
            return response;
        });
        if(filteredData.length===0){
          scope.view.AdvancedSearchDropDown.sgmentData.setVisibility(false);
          scope.view.AdvancedSearchDropDown.richTexNoResult.setVisibility(true);
        }else{
          scope.view.AdvancedSearchDropDown.sgmentData.setData(filteredData);
          scope.view.AdvancedSearchDropDown.sgmentData.setVisibility(true);
          scope.view.AdvancedSearchDropDown.richTexNoResult.setVisibility(false);
        }
      }else{
        scope.view.AdvancedSearchDropDown.flxSearchCancel.setVisibility(false);
        var totalRecords=scope.view.AdvancedSearchDropDown.sgmentData.info.data;
        scope.view.AdvancedSearchDropDown.sgmentData.setData(totalRecords);
      }
      scope.view.forceLayout();
    };
     this.view.AdvancedSearchDropDown1.sgmentData.onRowClick = function(){
      //if(scopeObj.view.lblCustomerSearchError.isVisible)
      //scopeObj.setNormalSkinToCoreSearch();
      var rowInd=scope.view.AdvancedSearchDropDown1.sgmentData.selectedRowIndex[1];
      var segData=scope.view.AdvancedSearchDropDown1.sgmentData.data;
      scope.view.tbxSelectModule.text=segData[rowInd].lblDescription;
      scope.view.FlxSelectModuleDropDown.setVisibility(false);
      scope.view.forceLayout();
    };

    this.view.AdvancedSearchDropDown1.tbxSearchBox.onKeyUp = function(){
      if(scope.view.AdvancedSearchDropDown1.tbxSearchBox.text.trim().length>0){
        scope.view.AdvancedSearchDropDown1.flxSearchCancel.setVisibility(true);
        var segData=scope.view.AdvancedSearchDropDown1.sgmentData.data;
        var searchText=scope.view.AdvancedSearchDropDown1.tbxSearchBox.text;
        var statusName="";
        var filteredData=segData.filter(function(response){
          statusName=response.lblDescription.toLowerCase();
          if(statusName.indexOf(searchText)>=0)
            return response;
        });
        if(filteredData.length===0){
          scope.view.AdvancedSearchDropDown1.sgmentData.setVisibility(false);
          scope.view.AdvancedSearchDropDown1.richTexNoResult.setVisibility(true);
        }else{
          scope.view.AdvancedSearchDropDown1.sgmentData.setData(filteredData);
          scope.view.AdvancedSearchDropDown1.sgmentData.setVisibility(true);
          scope.view.AdvancedSearchDropDown1.richTexNoResult.setVisibility(false);
        }
      }else{
        scope.view.AdvancedSearchDropDown1.flxSearchCancel.setVisibility(false);
        var totalRecords=scope.view.AdvancedSearchDropDown1.sgmentData.info.data;
        scope.view.AdvancedSearchDropDown1.sgmentData.setData(totalRecords);
      }
      scope.view.forceLayout();
    };
     
     
    this.view.AdvancedSearchDropDown1.flxSearchCancel.onClick = function(){
      scope.view.AdvancedSearchDropDown1.flxSearchCancel.setVisibility(false);
      scope.view.AdvancedSearchDropDown1.tbxSearchBox.text="";
      var totalRecords=scope.view.AdvancedSearchDropDown1.sgmentData.info.data;
      scope.view.AdvancedSearchDropDown1.sgmentData.setData(totalRecords);
      scope.view.forceLayout();
    };
    this.view.AdvancedSearchDropDown.flxSearchCancel.onClick = function(){
      scope.view.AdvancedSearchDropDown.flxSearchCancel.setVisibility(false);
      scope.view.AdvancedSearchDropDown.tbxSearchBox.text="";
      var totalRecords=scope.view.AdvancedSearchDropDown.sgmentData.info.data;
      scope.view.AdvancedSearchDropDown.sgmentData.setData(totalRecords);
      scope.view.forceLayout();
    };



     this.view.lblPopUpClose.onTouchEnd = function(){
      scope.closePopup();
    };
     this.view.statusFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      scope.view.lblApproveDateIcon.text=kony.i18n.getLocalizedString("i18n.userwidgetmodel.lblIconAssignedTo");
      scope.view.lblApproveDateIcon.skin="sknFontIconSearchCross16px";
      var statusArr=[];
      var sortData;
      var selectedRowItems=[];
      var historyData=scope.view.flxRequestsHistory.info;
      selectedRowItems=scope.view.statusFilterMenu.segStatusFilterDropdown.selectedRowItems;
      if(selectedRowItems !== null){
         var selectedLen=selectedRowItems.length;
      if(selectedLen<2){
      var a= scope.view.statusFilterMenu.segStatusFilterDropdown.selectedRowItems[0].lblDescription;
      statusArr.push(a);
      	scope.statusFilter(statusArr);
      }
      else if(selectedLen === 0 || selectedLen >= 2){
        sortData=scope.sortingCheck(historyData,false);
     	scope.setHistoryValuesInList(sortData);
        scope.view.lblApproveDateIcon.text=kony.i18n.getLocalizedString("i18n.userwidgetmodel.lblIconAssignedTo");
        scope.view.lblApproveDateIcon.skin="sknFontIconSearchCross16px";
      }
      }
     else{
        sortData=scope.sortingCheck(historyData,false);
      	scope.setHistoryValuesInList(sortData);
       scope.view.lblApproveDateIcon.text=kony.i18n.getLocalizedString("i18n.userwidgetmodel.lblIconAssignedTo");
       scope.view.lblApproveDateIcon.skin="sknFontIconSearchCross16px";
     }
      
    },
	
     this.view.breadcrumbs.btnBackToMain.onClick = function(){
      scope.presenter.navToDashboard();
      scope.view.flxScrollMessages.isVisible = true;
      scope.view.flxScrollHistory.isVisible = false;
      scope.view.btnrequestHistory.isVisible = true;
      scope.view.breadcrumbs.btnPreviousPage.isVisible = false;
      scope.view.breadcrumbs.fontIconBreadcrumbsRight2.isVisible = false;
      scope.view.breadcrumbs.lblCurrentScreen.text = "REQUESTS";
    }
    this.view.breadcrumbs.btnPreviousPage.onClick = function(){
      scope.requestsPageBreadCrumbs();
    }
  },
  statusFilter : function(statusArr){
    var historyData=this.view.flxRequestsHistory.info;
    var sortData;
    if(statusArr.length!==0 || statusArr.length<2){
       var statusVal=statusArr[0];
      var statusData = this.statusFilterCheck(historyData,statusVal);
      this.setHistoryValuesInList(statusData);
    }
    else{
      sortData=this.sortingCheck(historyData,false)
      this.setHistoryValuesInList(sortData);
    }
  },
  statusFilterCheck : function(historyData,statusVal){
    var filteredData=[];
        for(var i=0;i<historyData.length;i++){
          if(historyData[i].status===statusVal){
            filteredData.push(historyData[i]);
          }
        }
    return filteredData;
      },
  closePopup : function(){
    this.view.flxRejectPopup.setVisibility(false);
  },
  
  postShow : function(){
    
  },
  requestsPageBreadCrumbs: function(){
    var ApprovalDetails= this.view.btnrequestHistory.info;
      this.view.flxMessagesHeader.setVisibility(true);
      this.view.FlexNoResult.setVisibility(false);
      this.setApprovalData(ApprovalDetails.split(":")[1],ApprovalDetails.split(":")[2]);
      this.view.flxScrollMessages.isVisible = true;
      this.view.flxScrollHistory.isVisible = false;
      this.view.btnrequestHistory.isVisible = true;
      this.view.FlxSelectModuleDropDown.setVisibility(false);
      this.view.flxRequestType.setVisibility(false);
      this.view.breadcrumbs.btnPreviousPage.isVisible = false;
      this.view.breadcrumbs.fontIconBreadcrumbsRight2.isVisible = false;
      this.view.breadcrumbs.lblCurrentScreen.text = "REQUESTS";
    },
  
  willUpdateUI : function(viewModel){
    this.view.flxLoading.isVisible=false;
    var scope = this;
    if(viewModel.split !== undefined){
      if(viewModel.split(":")[0] === "HistoryCount"){
        this.view.btnrequestHistory.info=viewModel;
       // scope.setApprovalData(viewModel.split(":")[1],viewModel.split(":")[2]);
        this.view.lblRowHeader1.text = ("Pending Approvals: "+viewModel.split(":")[1]);        
      }
      if(viewModel.split(":")[0] === "PendingCount"){
        scope.setHistoryData(viewModel.split(":")[1],viewModel.split(":")[2]);
      }
    }
    if(viewModel.action === "fromBackend"){
      if(viewModel.approvalData){
        scope.setApprovalValuesInList(viewModel.approvalData);
        scope.setDataForSearchFilters(viewModel.approvalData);
        this.view.lblRowHeader1.text = ("Pending Approvals: "+viewModel.approvalData.length);
      }
      if(viewModel.historyData){
        var isDescendingOrder=true;
        this.view.flxRequestsHistory.info=viewModel.historyData;
        this.view.flxApproveDate.info=viewModel.historyData;
        scope.setHistoryValuesInList(viewModel.historyData);
        scope.setDataForSearchFilters(viewModel.historyData);
        this.view.flxApproveDate.onTouchEnd = function(){
          var sortedResponse = scope.sortingCheck(scope.view.flxApproveDate.info,isDescendingOrder);
          scope.view.flxApproveDate.info = sortedResponse;
          isDescendingOrder=!isDescendingOrder;
          scope.setHistoryValuesInList(sortedResponse);
        };
      }
    }
    this.updateLeftMenu(viewModel);
  },
  
   sortingCheck: function(historyData,isDescendingOrder){
    var response;
    if(isDescendingOrder){
        response=historyData.sort((a,b) => 
        	{
          		const dateA = new Date(a.checkedts);
				const dateB = new Date(b.checkedts);
				return dateA-dateB;
        	});
      this.view.lblApproveDateIcon.text='\ue92a';
      this.view.lblApproveDateIcon.skin = "sknIcon12px";
    }
    else{
      response=historyData.sort((a,b) => 
        	{
          		const dateA = new Date(a.checkedts);
				const dateB = new Date(b.checkedts);
				return dateB-dateA;
        	});
      this.view.lblApproveDateIcon.text='\ue920';
      this.view.lblApproveDateIcon.skin = "sknIcon12px";
    }
    return response;
  },
  shouldUpdateUI: function (viewModel) {
    return viewModel !== undefined;
  },
  
  setApprovalValuesInList : function(response){
    var self = this;
    if(response.length > 0){
     var dataMap = {
      "flxSegMainValue" : "flxSegMainValue",
      "flxMsgSegMainValue" : "flxMsgSegMainValue",
      "lblModuleNameValue" : "lblModuleNameValue",
      "lblRequestTypeValue" : "lblRequestTypeValue",
      "lblRecievedDateValue" : "lblRecievedDateValue",
      "lblRecievedFromValue" : "lblRecievedFromValue",
      "lblMoreInfoValue" : "lblMoreInfoValue",
      "flxOptions" : "flxOptions",
      "lblDeny" : "lblDeny",
      "lblApprove" : "lblApprove",
      "lblSeperator" : "lblSeperator",
      "imgDeny" : "imgDeny",
      "imgApprove" : "imgApprove"
    };
    
    var data = [];
      var statusList=[];
      if (typeof response !== 'undefined') {
        data = response.map(function(roleViewData) {
          const selectedRowData = roleViewData;
          
          return {
            "lblModuleNameValue": roleViewData.feature,
            "lblRequestTypeValue":roleViewData.action,
            "lblRecievedDateValue": self.getLocaleDateAndTime(roleViewData.createdts),
            "lblRecievedFromValue": roleViewData.createdby,
            "lblMoreInfoValue": {"text":"View Details",
                                "skin": "sknBtnLato11abeb12px",
                                "onTouchEnd" : function(){
                                   self.viewRequestDetails(selectedRowData)
                                 }},
            "imgDeny" : {"src" : "close_red.png",
                         "onTouchEnd" : function(){
                           self.openRejectPopup();
                         }},
            "imgApprove" : {"src" : "selectedtick.png",
                            "onTouchEnd" : function(){
                              self.setHistoryData();
                            }},
            
			"onRowClick" : function(){
              self.viewRequestDetails(selectedRowData);
            },
            "lblSeperator" : kony.i18n.getLocalizedString("i18n.frmCSR.lblSeperator")
          };

        });
      }
      this.view.SegSearchResult.setVisibility(true);
      this.view.FlexNoResult.setVisibility(false);
    this.view.SegSearchResult.widgetDataMap=dataMap;
    this.view.SegSearchResult.rowTemplate = "flxRequestsResults";
    this.view.SegSearchResult.setData(data);

    }
    else{
      this.view.SegSearchResult.setVisibility(false);
      this.view.FlexNoResult.setVisibility(true);
    }
    
  },
  
  setTabCountData : function(){
    this.view.detailHeader.lblCount1.text = this.approvalCount;
    this.view.detailHeader.lblCount2.text = this.historyCount;
  },
  
  setApprovalData : function(approvalCount,historyCount){
    var self = this;
    self.view.detailHeader.flxHeader1.skin = "sknflxffffffop0i2986200ef4e48cursor";
    self.view.detailHeader.flxHeader2.skin = "sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.flxScrollMessages.setVisibility(true);
    this.view.flxScrollHistory.setVisibility(false);
    this.view.FlexNoResult.isVisible=(parseInt(approvalCount)>0?false:true);
    if(approvalCount !== undefined && historyCount !== undefined){
      this.approvalCount = approvalCount;
      this.historyCount = historyCount;
    }
    this.setTabCountData();
    this.presenter.callingApprovalsData();
  },
  
  openRejectPopup : function(){
    this.view.flxRejectPopup.setVisibility(true);
  },
  
  navigateToViewDetails :  function(roleViewData){
    this.presenter.navToViewDetails([roleViewData]);
  },
  
  setHistoryValuesInList : function(response){
    if(response.length > 0){
      var dataMap = {
        "flxSegMainValue" : "flxSegMainValue",
        "flxMsgSegMainValue" : "flxMsgSegMainValue",
        "lblModuleNameValue" : "lblModuleNameValue",
        "lblRequestTypeValue" : "lblRequestTypeValue",
        "lblRecievedDateValue" : "lblRecievedDateValue",
        "lblRecievedFromValue" : "lblRecievedFromValue",
        "flxStatus" : "flxStatus",
        "imgStatus" : "imgStatus",
        "lblStatusImage" : "lblStatusImage",
        "lblStatus" : "lblStatus",
        "imgComments" : "imgComments",
        "lblApprovedByValue" : "lblApprovedByValue",
        "flxApproveDate" : "flxApproveDate",
        "lblApproveDate" : "lblApproveDate",
        "lblApproveDateTime" : "lblApproveDateTime",
        "lblSeperator" : "lblSeperator"
      };

      var data = [];
      var statusList=[];
      var statusImage;
      var bool;
      var comments;
      var self = this;
      if (typeof response !== 'undefined') {
        data = response.map(function(roleViewData) {
          if(roleViewData.status === "Approved"){
            statusImage = "active_circle2x.png";
            bool = false;
            comments = "";
          }
          else{
            statusImage = "inactive_red.png";
            bool = true;
            comments = roleViewData.reason;
          }
          return {
            "lblModuleNameValue": roleViewData.feature,
            "lblRequestTypeValue":roleViewData.action,
            "lblRecievedDateValue": self.getLocaleDateAndTime(roleViewData.createdts),
            "lblRecievedFromValue": roleViewData.createdby,
            "imgStatus" : {"src" : statusImage},
            "lblStatus": roleViewData.status,
            "lblStatusImage" : roleViewData.ApprovalRequestId,
            "imgComments" : {"src" : "comments.png",
                             "isVisible" : bool,
                             "toolTip":comments},
            "lblApprovedByValue": roleViewData.checkedBy,
            "lblApproveDate" : self.getLocaleDateAndTime(roleViewData.checkedts),
            "lblSeperator" : kony.i18n.getLocalizedString("i18n.frmCSR.lblSeperator")
          };

        });
      }
      this.view.segResultHistory.setVisibility(true);
      this.view.FlexNoResult.setVisibility(false);
      this.view.segResultHistory.widgetDataMap=dataMap;
      this.view.segResultHistory.rowTemplate = "flxRequestHeader";
      this.view.segResultHistory.setData(data);
      this.view.flxLoading.isVisible=false;
    }
    else{
      this.view.segResultHistory.setVisibility(false);
      this.view.FlexNoResult.setVisibility(true);
    }
  },
  
  setHistoryData :  function(approvalCount,historyCount){
    var self = this;
    self.view.detailHeader.flxHeader2.skin = "sknflxffffffop0i2986200ef4e48cursor";
    self.view.detailHeader.flxHeader1.skin = "sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.flxScrollMessages.setVisibility(false);
    this.view.flxScrollHistory.setVisibility(true);
    if(approvalCount !== undefined && historyCount !== undefined){
      this.approvalCount = approvalCount;
      this.historyCount = historyCount;
    }
    if(historyCount === "0"){
      this.view.FlexNoResult.setVisibility(true);
    }
    else{
      this.view.FlexNoResult.setVisibility(false);
    }
    this.setTabCountData();
    this.presenter.callingHistoryData();
  },
  viewRequestDetails : function(rowData) {
    if(rowData.feature==="User"){
      this.presenter.fetchUserDetails(rowData);
    }
    else if(rowData.feature==="Roles"){
       this.presenter.fetchRoleDetails([rowData]);
    }
    else if(rowData.feature==="Permissions"){
      this.presenter.fetchPermissionDetails(rowData);
    }
  },
  
  navigateToRequest : function() {
    var historyDetails= this.view.btnrequestHistory.info;
    this.view.flxLoading.isVisible=true;
    this.view.flxMessagesHeader.setVisibility(false);
    this.view.FlexNoResult.setVisibility(false);
    this.view.flxScrollMessages.isVisible = false;
    this.view.FlxSelectModuleDropDown.setVisibility(false);
    this.view.flxRequestType.setVisibility(false);
    this.view.flxScrollHistory.isVisible = true;
    this.view.btnrequestHistory.isVisible = false;
    this.view.breadcrumbs.btnPreviousPage.isVisible = true;
    this.view.breadcrumbs.btnPreviousPage.text = "REQUESTS";
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.isVisible = true;
    this.view.breadcrumbs.lblCurrentScreen.text = "HISTORY";
    this.setHistoryData(historyDetails.split(":")[1],historyDetails.split(":")[2]);
  },
  setDataForSearchFilters: function(response){
    this.view.txtfldRepliedby.text="Select Request Type";
    this.view.tbxSelectModule.text="Select Module"
    var scope=this;
    var requestType=[];
    var selectModule=[];
    var widgetMap = {
      "customerStatusId": "customerStatusId",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var requestType = response.map(function(roleViewData){    
      return {
        "lblDescription": roleViewData.action,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": {"isVisible":false},
        //"lblDescription": rec.name
      };
    });
    var selectModule = response.map(function(roleViewData){    
      return {
        "lblDescription": roleViewData.feature,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": {"isVisible":false},
        //"lblDescription": rec.name
      };
    });
    var uniqRequestType = requestType.map(e => e.lblDescription).filter((v, i, a) => a.indexOf(v) == i).map(e => ({ 'lblDescription': e}));
    this.view.AdvancedSearchDropDown.sgmentData.widgetDataMap = widgetMap;
    this.view.AdvancedSearchDropDown.sgmentData.setData(uniqRequestType);
    this.view.AdvancedSearchDropDown.sgmentData.info={"data":uniqRequestType};
    var uniqSelectModule = selectModule.map(e => e.lblDescription).filter((v, i, a) => a.indexOf(v) == i).map(e => ({ 'lblDescription': e}));
    this.view.AdvancedSearchDropDown1.sgmentData.widgetDataMap = widgetMap;
    this.view.AdvancedSearchDropDown1.sgmentData.setData(uniqSelectModule);
    this.view.AdvancedSearchDropDown1.sgmentData.info={"data":uniqSelectModule};
    this.view.forceLayout();
  },

});