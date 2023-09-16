define("CompaniesModule/userfrmContractSearchController", {
    viewContractServiceDef: [],
    count: 0,
    recentContractDetails: {
        "contractId": ""
    },
    formName: "frmContractSearch",
    toastModel: {},
    willUpdateUI: function(context) {
        this.updateLeftMenu(context);
        if (context) {
            if (context.action === "fetch" || context.action === "createCancel") {
                this.showSearchScreen(1);
                this.view.btnAdvSearch.text = kony.i18n.getLocalizedString("i18n.Group.AdvancedSearch");
                this.view.flxContractSpecificParams.setVisibility(false);
                this.view.flxSecondRow.setVisibility(false);
                this.view.flxThirdRow.setVisibility(false);
                this.view.fonticonrightarrow.text = "";
                kony.adminConsole.utils.hideProgressBar(this.view);
                this.presenter.getLegalEntities({}, "frmContractSearch");
            } else if (context.action === "breadCrumb") {
                this.showSearchScreen(2);
                kony.adminConsole.utils.hideProgressBar(this.view);
            } else if (context.loadingScreen) {
                if (context.loadingScreen.focus) kony.adminConsole.utils.showProgressBar(this.view);
                else kony.adminConsole.utils.hideProgressBar(this.view);
            } else if (context.serviceDefinitions) {
                if (context.option === 1) { // for contract landing screen
                    this.viewContractServiceDef = context.serviceDefinitions;
                    this.setServiceTypeStatusData(this.viewContractServiceDef);
                    this.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex = null;
                    this.view.flxDropDownDetailServType.setVisibility(true);
                    this.view.forceLayout();
                }
            } else if (context.searchData) {
                this.setDatatoSearchSegment(context.searchData.contracts);
             }
            else if (context.companyLegalUnits) {
             var LEData=this.getLEListForFormAction("frmContractSearch",'VIEW');  
            this.view.flxDropDownServType1.info=LEData;//context.companyLegalUnits;
	           //this.setDataToLegalEntities(context.companyLegalUnits);
               this.setDataToLegalEntities(LEData);
            }
          
          else if (context.createContractSuccess) {
                this.showSearchScreen(1);
                this.toastModel["message"] = context.createContractSuccess.message;
                this.toastModel["status"] = "SUCCESS";
            } else if (context.createContractError) {
                this.toastModel["message"] = context.createContractError.error;
                this.toastModel["status"] = "ERROR";
            } else if (context.toastMessage) {
                if (context.toastMessage.status === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success")) {
                    this.view.toastMessage.showToastMessage(context.toastMessage.message, this);
                } else if (context.toastMessage.status === kony.i18n.getLocalizedString("i18n.frmGroupsController.error")) {
                    this.view.toastMessage.showErrorToastMessage(context.toastMessage.message, this);
                }
            }
        }
    },
    contractSearchPreshow: function() {
      var self=this;
        this.initializeFormActions();
        this.setNormalSkinToAllFeilds();
        this.view.lblSearchError.isVisible = false;
        this.view.imgSearchError.isVisible = false;
        this.clearSearchFeilds();
      	this.setFlowActions();
        this.view.flxLegalEntityDropDown2.top = "-125px";
        this.view.flxLegalEntityDropDown2.bottom = "0px";
        this.presenter.getLegalEntities({}, "frmContractSearch");
        var selStatusInd = [];
        for (var j = 0; j < this.view.businessTypeFilterMenu.segStatusFilterDropdown.length; j++) {
            selStatusInd.push(j);
        }
        self.view.businessTypeFilterMenu.segStatusFilterDropdown.selectedIndices = [
            [1, selStatusInd]
        ];
      self.view.businessTypeFilterMenu.segStatusFilterDropdown.setData(this.view.businessTypeFilterMenu.segStatusFilterDropdown.data);
      
    },
    
  setDataToLegalEntities: function(response) {
    var self = this;
    var widgetMap = {
            "flxSearchDropDown": "flxSearchDropDown",
            "flxCheckBox": "flxCheckBox",
            "imgCheckBox": "imgCheckBox",
            "lblDescription": "lblDescription"
        };
    response.sort((a, b) => {
      let fa = a.companyName.toLowerCase(),
          fb = b.companyName.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    
    var data = response.map(function(res) {
            return {
                "flxSearchDropDown": "flxSearchDropDown",
                "flxCheckBox": "flxCheckBox",
                "lblDescription": {
                    "text": res.companyName,
                    "onTouchEnd": function() {
                      self.view.lblSelectedRowsServType1.text = res.companyName;
                      self.view.mainHeader.btnDropdownList.info=[{"id": res.id, "name": res.companyName}];
                      self.view.flxLegalEntityDropDown2.setVisibility(false);
                      var value = self.view.flxDropDownServType1.info;
                      self.setDataToLegalEntities(value);
                    }
                }
            };
        });
        this.view.mainHeader.flxDownloadList.info=[{"id": response[0].id, "name": response[0].companyName}];
        this.view.dropdownLegalEntity.segStatusFilterDropdown.widgetDataMap = widgetMap;
        this.view.dropdownLegalEntity.segStatusFilterDropdown.setData(data);
        if (data.length === 1) {
          this.view.lblSelectedRowsServType1.text = data[0].lblDescription.text;
          self.view.mainHeader.btnDropdownList.info=[{"id": response[0].id, "name": response[0].companyName}];
        }
    
  },
  
  visibilityOff: function() {
    this.view.lblSearchError.isVisible = false;
    this.view.imgSearchError.isVisible = false;
  },
  
  setFlowActions: function() {
    var scopeObj = this;

    this.view.btnReset.onClick = function() {
      scopeObj.clearSearchFeilds();
    };

  },
    contractSearchPostshow: function() {
        
        //showing toast message after form loaded
        if (this.toastModel.status && this.toastModel.status === "SUCCESS") {
            this.view.toastMessage.showToastMessage(this.toastModel.message, this);
        } else if (this.toastModel.status && this.toastModel.status === "ERROR") {
            this.view.toastMessage.showErrorToastMessage(this.toastModel.message, this);
        }
        this.toastModel = {};
    },
    initializeFormActions: function() {
        var scopeObj = this;
        /*search fields*/
        this.view.txtSearchParam1.onBeginEditing = function() {
            scopeObj.setNormalSkinToAllFeilds();
            scopeObj.visibilityOff();
        };
      
        this.view.txtSearchParam10.onBeginEditing = function() {
          scopeObj.setNormalSkinToAllFeilds();
           scopeObj.visibilityOff();
        };
        this.view.txtSearchParam2.onBeginEditing = function() {
            scopeObj.setNormalSkinToAllFeilds();
            scopeObj.visibilityOff();
        };
        this.view.txtSearchParam3.onBeginEditing = function() {
            scopeObj.setNormalSkinToAllFeilds();
            scopeObj.visibilityOff();
        };
        this.view.txtSearchParam4.onBeginEditing = function() {
            scopeObj.setNormalSkinToAllFeilds();
            scopeObj.visibilityOff();
        };
        this.view.txtSearchParam5.onBeginEditing = function() {
            scopeObj.setNormalSkinToAllFeilds();
             scopeObj.visibilityOff();
        };
        this.view.txtSearchParam6.onBeginEditing = function() {
            scopeObj.setNormalSkinToAllFeilds();
             scopeObj.visibilityOff();
        };
        this.view.textBoxSearchContactNumber.txtContactNumber.onBeginEditing = function() {
            scopeObj.setNormalSkinToAllFeilds();
            scopeObj.visibilityOff();
        };
        this.view.btnAdvSearch.onClick = function() {
            
            scopeObj.toggleAdvanceSearch();
        };
        this.view.flxDropDownServType.onClick = function() {
            scopeObj.setNormalSkinToAllFeilds();
             scopeObj.visibilityOff();
            if (scopeObj.view.flxDropDownDetailServType.isVisible)
              scopeObj.view.flxDropDownDetailServType.setVisibility(false);
          else {
            var legalEntityId="";
            if (scopeObj.viewContractServiceDef.length === 0 ) {
              if(scopeObj.view.lblSelectedRowsServType1.text.trim() !== "Select a Legal Entity"){
                legalEntityId = scopeObj.view.mainHeader.btnDropdownList.info[0].id;
                scopeObj.presenter.getServiceDefinitionsForContracts({"legalEntityId":legalEntityId}, 1, scopeObj.formName);	
              }
              else if(scopeObj.view.lblSelectedRowsServType1.text.trim() === "Select a Legal Entity"){
                var legalEntities = scopeObj.view.flxDropDownServType1.info; 
                legalEntityId = legalEntities[0].id;
                scopeObj.presenter.getServiceDefinitionsForContracts({"legalEntityId":legalEntityId}, 1, scopeObj.formName);
              }
            }  
            else {
              if(scopeObj.view.lblSelectedRowsServType1.text.trim() !== "Select a Legal Entity"){
                legalEntityId = scopeObj.view.mainHeader.btnDropdownList.info[0].id;
                scopeObj.presenter.getServiceDefinitionsForContracts({"legalEntityId":legalEntityId}, 1, scopeObj.formName);	
              }
                    scopeObj.view.AdvancedSearchDropDownServType.flxSearchCancel.onClick();
                    scopeObj.view.flxDropDownDetailServType.setVisibility(true);
                }
            }
        };
      
        this.view.AdvancedSearchDropDownServType.sgmentData.onRowClick = function() {
            var rowInd = scopeObj.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex[1];
            var segData = scopeObj.view.AdvancedSearchDropDownServType.sgmentData.data;
            scopeObj.view.lblSelectedRowsServType.text = segData[rowInd].lblDescription;
            scopeObj.view.flxDropDownDetailServType.setVisibility(false);
        };
        this.view.AdvancedSearchDropDownServType.flxSearchCancel.onClick = function() {
            scopeObj.view.AdvancedSearchDropDownServType.flxSearchCancel.setVisibility(false);
            scopeObj.view.AdvancedSearchDropDownServType.tbxSearchBox.text = "";
            var totalRecords = scopeObj.view.AdvancedSearchDropDownServType.sgmentData.info.data;
            scopeObj.view.AdvancedSearchDropDownServType.sgmentData.setData(totalRecords);
        };
        this.view.AdvancedSearchDropDownServType.tbxSearchBox.onKeyUp = function() {
            if (scopeObj.view.AdvancedSearchDropDownServType.tbxSearchBox.text.trim().length > 0) {
                scopeObj.view.AdvancedSearchDropDownServType.flxSearchCancel.setVisibility(true);
                var segData = scopeObj.view.AdvancedSearchDropDownServType.sgmentData.data;
                var searchText = scopeObj.view.AdvancedSearchDropDownServType.tbxSearchBox.text;
                var statusName = "";
                var filteredData = segData.filter(function(rec) {
                    statusName = rec.lblDescription.toLowerCase();
                    if (statusName.indexOf(searchText) >= 0) return rec;
                });
                if (filteredData.length === 0) {
                    scopeObj.view.AdvancedSearchDropDownServType.sgmentData.setVisibility(false);
                    scopeObj.view.AdvancedSearchDropDownServType.richTexNoResult.setVisibility(true);
                } else {
                    scopeObj.view.AdvancedSearchDropDownServType.sgmentData.setData(filteredData);
                    scopeObj.view.AdvancedSearchDropDownServType.sgmentData.setVisibility(true);
                    scopeObj.view.AdvancedSearchDropDownServType.richTexNoResult.setVisibility(false);
                }
            } else {
                scopeObj.view.AdvancedSearchDropDownServType.flxSearchCancel.setVisibility(false);
                var totalRecords = scopeObj.view.AdvancedSearchDropDownServType.sgmentData.info.data;
                scopeObj.view.AdvancedSearchDropDownServType.sgmentData.setData(totalRecords);
            }
            scopeObj.view.forceLayout();
        };
       this.view.flxLegalEntityDropDown2.setVisibility(false);
       this.view.dropdownLegalEntity.tbxSearchBox.onKeyUp = function() {
            if (scopeObj.view.dropdownLegalEntity.tbxSearchBox.text.trim().length > 0) {
                var segData = scopeObj.view.dropdownLegalEntity.segStatusFilterDropdown.data;
                var searchText = scopeObj.view.dropdownLegalEntity.tbxSearchBox.text;
                var statusName = "";
                var filteredData = segData.filter(function(rec) {
                    statusName = rec.lblDescription.text.toLowerCase();
                    if (statusName.indexOf(searchText) >= 0) return rec;
                });
                if (filteredData.length === 0) {
                    scopeObj.view.dropdownLegalEntity.segStatusFilterDropdown.setVisibility(false);
                    scopeObj.view.dropdownLegalEntity.flxNoResultFound.setVisibility(true);
                } else {
                    scopeObj.view.dropdownLegalEntity.segStatusFilterDropdown.setData(filteredData);
                    scopeObj.view.dropdownLegalEntity.segStatusFilterDropdown.setVisibility(true);
                    scopeObj.view.dropdownLegalEntity.flxNoResultFound.setVisibility(false);
                }
            } else {
                 scopeObj.view.dropdownLegalEntity.flxNoResultFound.setVisibility(false);
               scopeObj.view.dropdownLegalEntity.segStatusFilterDropdown.setVisibility(true);
               var value = scopeObj.view.flxDropDownServType1.info;  
              scopeObj.setDataToLegalEntities(value);
            }
            scopeObj.view.forceLayout();
        };
      
      
      this.view.AdvancedSearchDropDownServType.flxSearchCancel.onClick = function() {
            scopeObj.view.AdvancedSearchDropDownServType.flxSearchCancel.setVisibility(false);
            scopeObj.view.AdvancedSearchDropDownServType.tbxSearchBox.text = "";
            var totalRecords = scopeObj.view.AdvancedSearchDropDownServType.sgmentData.info.data;
            scopeObj.view.AdvancedSearchDropDownServType.sgmentData.setData(totalRecords);
            scopeObj.view.AdvancedSearchDropDownServType.sgmentData.setVisibility(true);
            scopeObj.view.AdvancedSearchDropDownServType.richTexNoResult.setVisibility(false);
        };
        this.view.btnSave.onClick = function() {
            scopeObj.searchForContracts();
        };
        /*Search header*/
        this.view.flxCompanyName.onClick = function() {
            var segData = scopeObj.view.segSearchResults.data;
            var sortedData = scopeObj.sortAndGetData(segData, "lblCompanyName.info.value", "searchList");
            scopeObj.view.segSearchResults.setData(sortedData);
        };
        this.view.flxCompanyId.onClick = function() {
            var segData = scopeObj.view.segSearchResults.data;
            var sortedData = scopeObj.sortAndGetData(segData, "lblCompanyId", "searchList");
            scopeObj.view.segSearchResults.setData(sortedData);
        };
        this.view.flxEmailHeader.onClick = function() {
            var segData = scopeObj.view.segSearchResults.data;
            var sortedData = scopeObj.sortAndGetData(segData, "lblEmail", "searchList");
            scopeObj.view.segSearchResults.setData(sortedData);
        };
        this.view.flxContactHeader.onClick = function() {
            var flxRight = scopeObj.view.flxWrapper.frame.width - scopeObj.view.flxContactHeader.frame.x - scopeObj.view.flxContactHeader.frame.width;
            var iconRight = scopeObj.view.flxContactHeader.frame.width - scopeObj.view.lblIconTypeFilter.frame.x;
            scopeObj.view.flxSearchBusinessTypeFilter.right = (flxRight + iconRight - 8) + "px";
            if (scopeObj.view.flxSearchBusinessTypeFilter.isVisible) {
                scopeObj.view.flxSearchBusinessTypeFilter.setVisibility(false);
            } else {
                scopeObj.view.flxSearchBusinessTypeFilter.setVisibility(true);
            }
        };
        this.view.businessTypeFilterMenu.segStatusFilterDropdown.onRowClick = function() {
            scopeObj.performBusinessTypeFilter();
        };
        this.view.segSearchResults.onRowClick = function() {
           scopeObj.view.mainHeader.btnAddNewOption.setVisibility(false);
           scopeObj.view.mainHeader.btnDropdownList.setVisibility(false);
           scopeObj.onSerchSegRowClick();
        };
        this.view.mainHeader.btnAddNewOption.onClick = function() {
            scopeObj.onCreateContractClick();
        };
        this.view.lblCreateCompanyLink.onClick = function() {
            scopeObj.onCreateContractClick();
        };
       this.view.dropDown.onClick = function(){
          if (scopeObj.count === 0) {
           scopeObj.presenter.getLegalEntities({}, "frmContractSearch");
         }
           scopeObj.view.flxDropDownServType1.skin = "sknflxffffffoptemplateop3px";
           if (scopeObj.view.flxLegalEntityDropDown2.isVisible){
             scopeObj.view.flxLegalEntityDropDown2.isVisible=false;
           }
           else{
             scopeObj.view.flxLegalEntityDropDown2.isVisible=true;
           }
         scopeObj.count +=1;
       };
      
      this.view.flxDropDownServType1.onClick = function(){
        if (scopeObj.count === 0) {
           scopeObj.presenter.getLegalEntities({}, "frmContractSearch");
         }
          
           scopeObj.setNormalSkinToAllFeilds();
           //scopeObj.setDataToLegalEntities();
            scopeObj.visibilityOff();
           if (scopeObj.view.flxLegalEntityDropDown2.isVisible){
             scopeObj.view.flxLegalEntityDropDown2.isVisible=false;
           }
           else{
             scopeObj.view.flxLegalEntityDropDown2.isVisible=true;
           }
        scopeObj.count += 1; 
       };
        this.view.mainHeader.btnDropdownList.onClick = function() {
          var legalEntityData;
          if(scopeObj.view.mainHeader.btnDropdownList.info[0]){
             legalEntityData = scopeObj.view.mainHeader.btnDropdownList.info;
          }
          else{
            legalEntityData = scopeObj.view.mainHeader.flxDownloadList.info;
          }
          scopeObj.presenter.setLegalEntityData(legalEntityData);
            scopeObj.presenter.getAllEnrollmentRequests(legalEntityData);
        };
        this.view.flxSearchBusinessTypeFilter.onHover = this.onHoverSettings;
    },
  
    showSearchScreen: function(option) {
        if (option === 1) {
            this.view.segSearchResults.setVisibility(false);
            this.view.lblNoResults.setVisibility(true);
            this.view.flxNoResultsFound.setVisibility(true);
            this.view.lblCreateCompanyLink.setVisibility(false);
            this.view.lblNoResults.text = kony.i18n.getLocalizedString("i18n.frmCompanies.NoSearchResultsFound");
        }
        var screenHeight = kony.os.deviceInfo().screenHeight;
        this.view.flxMainContent.height = (screenHeight - 90) + "px";
        this.view.flxSearchResults.height = (screenHeight - 290) + "px";
        this.view.mainHeader.btnAddNewOption.setVisibility(true);
        this.view.mainHeader.btnDropdownList.setVisibility(true);
        this.view.flxSettings.setVisibility(false);
        this.view.flxBreadcrumb.setVisibility(false);
        this.view.forceLayout();
    },
    clearSearchFeilds: function() {
        this.view.txtSearchParam1.text = "";
        this.view.txtSearchParam3.info = null;
        this.view.lblSelectedRowsServType1.text=kony.i18n.getLocalizedString("i18n.frmGroups.lblSelectLegalEntity");
        this.view.txtSearchParam2.text = "";
        this.view.txtSearchParam3.text = "";
        this.view.txtSearchParam4.text = "";
        this.view.txtSearchParam5.text = "";
        this.view.txtSearchParam6.text = "";
        this.view.textBoxSearchContactNumber.txtISDCode.text = "";
        this.view.textBoxSearchContactNumber.txtContactNumber.text = "";
        this.view.dropdownLegalEntity.tbxSearchBox.text = "";
        // this.view.lstbxSearchServiceDef.selectedKey = "SELECT";
        this.view.AdvancedSearchDropDownServType.sgmentData.setData([]);
        this.view.flxDropDownDetailServType.setVisibility(false);
        this.view.lblSelectedRowsServType.text = "Select";
        if (this.view.AdvancedSearchDropDownServType.sgmentData.info && this.view.AdvancedSearchDropDownServType.sgmentData.info.data) {
            let segData = this.view.AdvancedSearchDropDownServType.sgmentData.info.data;
            this.view.AdvancedSearchDropDownServType.sgmentData.setData(segData);
            this.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex = null;
        }
    },
    /*
     * to set error skin for all the search fields
     */
    setErrorSkinToAllFeilds: function() {
        this.view.txtSearchParam1.skin = "skntbxBordereb30173px";
        this.view.txtSearchParam2.skin = "skntbxBordereb30173px";
        this.view.txtSearchParam3.skin = "skntbxBordereb30173px";
        this.view.txtSearchParam4.skin = "skntbxBordereb30173px";
        this.view.txtSearchParam5.skin = "skntbxBordereb30173px";
        this.view.txtSearchParam6.skin = "skntbxBordereb30173px";
        this.view.txtSearchParam10.skin = "skntbxBordereb30173px";
        this.view.flxDropDownServType.skin = "sknflxffffffoptemplateop3pxBordee32416";
         //this.view.flxDropDownServType1.skin = "sknflxffffffoptemplateop3pxBordee32416";
        this.view.textBoxSearchContactNumber.txtISDCode.skin = "skntbxBordereb30173px";
        this.view.textBoxSearchContactNumber.txtContactNumber.skin = "skntbxBordereb30173px";
        this.view.lstbxSearchServiceDef.skin = "sknlbxError";
    },
    setNormalSkinToAllFeilds: function() {
        this.view.txtSearchParam1.skin = "skntxtbxDetails0bbf1235271384a";
        this.view.txtSearchParam2.skin = "skntxtbxDetails0bbf1235271384a";
        this.view.txtSearchParam3.skin = "skntxtbxDetails0bbf1235271384a";
        this.view.txtSearchParam4.skin = "skntxtbxDetails0bbf1235271384a";
        this.view.txtSearchParam5.skin = "sknTbx485c75Reg13pxBRe1e5edR1pxTBRSide";
        this.view.txtSearchParam6.skin = "skntxtbxDetails0bbf1235271384a";
        this.view.txtSearchParam10.skin = "skntxtbxDetails0bbf1235271384a";
        this.view.flxDropDownServType.skin = "sknflxffffffoptemplateop3px";
       this.view.flxDropDownServType1.skin = "sknflxffffffoptemplateop3px";
        this.view.textBoxSearchContactNumber.txtISDCode.skin = "skntxtbxDetails0bbf1235271384a";
        this.view.textBoxSearchContactNumber.txtContactNumber.skin = "skntxtbxDetails0bbf1235271384a";
        this.view.lstbxSearchServiceDef.skin = "sknLbxborderd7d9e03pxradius";
    },
    /*
     * to validate whether atleast one search parameter is entered or not
     */
    validateSearchFields: function() {
        if(this.view.lblSelectedRowsServType1.text.trim() === "Select a Legal Entity") return false;
      else {
         this.visibilityOff();
        if (this.view.txtSearchParam1.text.trim() !== "") return true;
        if (this.view.txtSearchParam3.text.trim() !== "") return true;
        if (this.view.txtSearchParam2.text.trim() !== "") return true;
        if (this.view.txtSearchParam6.text.trim() !== "") return true;
        if (this.view.txtSearchParam10.text.trim() !== "") return true;
        if (this.view.textBoxSearchContactNumber.txtContactNumber.text.trim() !== "" && this.view.textBoxSearchContactNumber.txtISDCode.text.trim() !== "") return true;
        if (this.view.txtSearchParam4.text.trim() !== "") return true;
        if (this.view.txtSearchParam5.text.trim() !== "") return true;
        var selectedInd = this.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex ? this.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex[1] : null;
        var status = "";
        if (selectedInd !== undefined && selectedInd !== null) status = this.view.AdvancedSearchDropDownServType.sgmentData.data[selectedInd].customerStatusId;
        if (status !== "") return true;
        
        
        return false;
      }
    },
    /*
     * on click of show/hide advance search option
     */
    toggleAdvanceSearch: function() {
        if (this.view.flxSecondRow.isVisible) {
            this.view.btnAdvSearch.text = kony.i18n.getLocalizedString("i18n.Group.AdvancedSearch");
            this.view.flxContractSpecificParams.setVisibility(false);
            this.view.flxSecondRow.setVisibility(false);
            this.view.flxThirdRow.setVisibility(false);
            this.view.fonticonrightarrow.text = "";
             this.view.flxLegalEntityDropDown2.top = "-125px";
            this.view.flxSearchParameters.height = "Preferred";
             this.view.flxLegalEntityDropDown2.bottom = "0px";
        } else {
            this.view.btnAdvSearch.text = "Hide Advanced Search";
            this.view.flxContractSpecificParams.setVisibility(true);
            this.view.flxSecondRow.setVisibility(true);
            this.view.flxThirdRow.setVisibility(true);
            this.view.fonticonrightarrow.text = "";
            this.view.flxLegalEntityDropDown2.top = "-360px";
            this.view.flxLegalEntityDropDown2.bottom = "200px";
        }
    },
    /*
     * set service types in search dropdown
     */
    setServiceTypeStatusData: function(records) {
        this.view.lblSelectedRowsServType.text = "Select";
        var statusData = [];
        var widgetMap = {
            "customerStatusId": "customerStatusId",
            "flxSearchDropDown": "flxSearchDropDown",
            "flxCheckBox": "flxCheckBox",
            "imgCheckBox": "imgCheckBox",
            "lblDescription": "lblDescription"
        };
        statusData = records.map(function(rec) {
            return {
                "customerStatusId": rec.id,
                "flxSearchDropDown": "flxSearchDropDown",
                "flxCheckBox": {
                    "isVisible": false
                },
                "lblDescription": rec.name
            };
        });
        this.view.AdvancedSearchDropDownServType.sgmentData.widgetDataMap = widgetMap;
        this.view.AdvancedSearchDropDownServType.sgmentData.setData(statusData);
        this.view.AdvancedSearchDropDownServType.sgmentData.info = {
            "data": statusData
        };
        this.view.AdvancedSearchDropDownServType.sgmentData.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
        this.view.forceLayout();
    },
    searchForContracts: function() {
        if (this.validateSearchFields()) {
            this.setContractSearchResults();
        }else {
              this.view.lblSearchError.setVisibility(false);
              this.view.imgSearchError.setVisibility(false);
              if (this.view.lblSelectedRowsServType1.text === kony.i18n.getLocalizedString("i18n.frmGroups.lblSelectLegalEntity")) {
                  this.view.flxDropDownServType1.skin = "sknflxffffffoptemplateop3pxBordee32416";
              } else {
                  this.view.lblSearchError.setVisibility(true);
                  this.view.imgSearchError.setVisibility(true);
                  this.view.lblSearchError.text = kony.i18n.getLocalizedString("i18n.userwidgetmodel.lblSearchError");
                  this.setErrorSkinToAllFeilds();
              }
          }
        this.view.forceLayout();
    },
    setContractSearchResults: function() {
        var selectedInd = this.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex ? this.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex[1] : null;
        var status = "",
            desc = "";
        if (selectedInd !== undefined && selectedInd !== null) {
            status = this.view.AdvancedSearchDropDownServType.sgmentData.data[selectedInd].customerStatusId;
            desc = this.view.AdvancedSearchDropDownServType.sgmentData.data[selectedInd].lblDescription;
        }
        let contractInfo = {
            "contractId": this.view.txtSearchParam2.text.trim(),
            "contractName": this.view.txtSearchParam1.text.trim(),
            "coreCustomerId": this.view.txtSearchParam4.text.trim(),
            "legalEntityId": this.view.mainHeader.btnDropdownList.info[0].id,
            "coreCustomerName": this.view.txtSearchParam10.text.trim(),
            "email": this.view.txtSearchParam5.text.trim(),
            "phoneCountryCode": this.view.textBoxSearchContactNumber.txtISDCode.text.trim(),
            "phoneNumber": this.view.textBoxSearchContactNumber.txtContactNumber.text.trim(),
            "country": this.view.txtSearchParam3.text.trim(),
            "serviceDefinitionId": desc.trim()
        };
        let srchTxt = '';
        let keys = Object.keys(contractInfo);
        keys.forEach(function(key) {
            // return in a forEach() callback is equivalent to continue
            if (contractInfo[key] === "") {
                return;
            }
            srchTxt += contractInfo[key] + ', ';
        });
        // removing the last , from the search string
        if (srchTxt.indexOf(',') >= 0) {
            srchTxt = srchTxt.substring(0, srchTxt.length - 2);
        }
        this.view.lblResultsFor.text = 'Showing Results for ';
        this.view.lblEnteredText.text = srchTxt;
        contractInfo["serviceDefinitionId"] = status.trim();
        this.presenter.getSearchContract(contractInfo, this.formName);
    },
    setDatatoSearchSegment: function(searchResult) {
        var self = this;
        self.view.flxHeaderPermissions.setVisibility(false);
        self.view.segSearchResults.setVisibility(false);
        if (searchResult && searchResult !== null && searchResult.length > 0) {
            var segData = self.mapResultsData(searchResult);
            self.view.flxHeaderPermissions.setVisibility(true);
            self.view.segSearchResults.setVisibility(true);
            self.view.lblNoResults.setVisibility(false);
            self.view.flxNoResultsFound.setVisibility(false);
            self.view.flxSearchResultsFor.setVisibility(true);
            self.view.flxNoFilterResults.setVisibility(false);
            self.view.segSearchResults.setVisibility((segData.length > 0));
            if (segData.length > 0) {
                /*if(segData.length === 1){
                  var id = segData[0].contractId;
                  self.view.segSearchResults.setData(segData);
                  self.showCreatedCompanyDetails(id, 1);
                }else{*/
                self.sortBy = self.getObjectSorter("lblCompanyName.info.value");
                self.resetSortImages("searchList");
                var sortedData = segData.sort(self.sortBy.sortData);
                self.view.segSearchResults.setData(sortedData);
                //}
                self.setDataToBusinessTypeFilter(searchResult);
                self.view.segSearchResults.info = {
                    "segData": segData
                };
            }
            self.view.segSearchResults.height = (self.view.flxSearchResults.frame.height - 100) + "px";
        } else {
            self.view.segSearchResults.info = {
                "segData": []
            };
            self.view.flxNoResultsFound.setVisibility(true);
            self.view.lblNoResults.text = kony.i18n.getLocalizedString("i18n.frmCompanies.searchNoResultFoundCompanies");
            self.view.lblNoResults.setVisibility(true);
            self.view.lblCreateCompanyLink.setVisibility(true);
        }
        self.view.forceLayout();
    },
    mapResultsData: function(data) {
        var self = this;
        var widgetMap = {
            "lblCompanyName": "lblCompanyName",
            "rtxContractCustomers": "rtxContractCustomers",
            "lblTIN": "lblTIN",
            "lblEmail": "lblEmail",
            "lblType": "lblType",
            "lblCompanyId": "lblCompanyId",
            "lblSeperator": "lblSeperator",
            "contractId": "contractId"
        };
      this.view.segSearchResults.widgetDataMap = widgetMap;
        var rtxContractCustomers = "";
        var result = data.map(function(record) {
            rtxContractCustomers = "";
            for (var i = 0; i < record.contractCustomers.length; i++) {
                rtxContractCustomers = rtxContractCustomers + "-" + record.contractCustomers[i].coreCustomerName + "<br/>";
            }
            return {
                "contractId": record.contractId,
                "lblCompanyName": {
                    "text": self.AdminConsoleCommonUtils.getTruncatedString(record.contractName, 30, 27),
                    "info": {
                        "value": record.contractName
                    },
                    "tooltip": record.contractName
                },
                "rtxContractCustomers": {
                    "text": rtxContractCustomers
                },
                "lblType": record.serviceDefinitionName || kony.i18n.getLocalizedString("i18n.Applications.NA"),
                "lblCompanyId": record.contractId,
                "lblEmail": record.email || kony.i18n.getLocalizedString("i18n.Applications.NA"),
                "lblSeperator": "-"
            };
        });
        return result;
    },
    returnEnteredText: function(name, email) {
        var enteredText = "";
        if (name !== null && name !== "") {
            if (email !== null && email !== "") {
                enteredText = name + " and " + email;
            } else {
                enteredText = name;
            }
        } else if (email !== null && email !== "") {
            enteredText = email;
        }
        return enteredText;
    },
    /*
     * set filter data in company details accounts tab
     * 2param: search result
     */
    setDataToBusinessTypeFilter: function(data) {
        var self = this;
        var statusList = [],
            maxLenText = "";
        for (var i = 0; i < data.length; i++) {
            if (!statusList.contains(data[i].serviceDefinitionName)) statusList.push(data[i].serviceDefinitionName);
        }
        var widgetMap = {
            "Status_id": "Status_id",
            "Type_id": "Type_id",
            "BusinessType_id": "BusinessType_id",
            "flxSearchDropDown": "flxSearchDropDown",
            "flxCheckBox": "flxCheckBox",
            "imgCheckBox": "imgCheckBox",
            "lblDescription": "lblDescription"
        };
        var statusData = statusList.map(function(rec) {
            maxLenText = (rec.length > maxLenText.length) ? rec : maxLenText;
            return {
                "Type_id": rec,
                "flxSearchDropDown": "flxSearchDropDown",
                "flxCheckBox": "flxCheckBox",
                "imgCheckBox": "checkbox.png",
                "lblDescription": rec
            };
        });
        self.view.businessTypeFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
        self.view.businessTypeFilterMenu.segStatusFilterDropdown.setData(statusData);
        var selStatusInd = [];
        for (var j = 0; j < statusList.length; j++) {
            selStatusInd.push(j);
        }
        self.view.businessTypeFilterMenu.segStatusFilterDropdown.selectedIndices = [
            [0, selStatusInd]
        ];
        //set filter width
        self.view.flxSearchBusinessTypeFilter.width = self.AdminConsoleCommonUtils.getLabelWidth(maxLenText) + 55 + "px";
        self.view.forceLayout();
    },
    /*
     * filter the company's list based on the business type selected
     */
    performBusinessTypeFilter: function() {
        var self = this;
        var selType = [];
        var selInd;
        var dataToShow = [];
        var allData = self.view.segSearchResults.info.segData;
        var segStatusData = self.view.businessTypeFilterMenu.segStatusFilterDropdown.data;
        var indices = self.view.businessTypeFilterMenu.segStatusFilterDropdown.selectedIndices;
        if (indices) {
            selInd = indices[0][1];
            for (var i = 0; i < selInd.length; i++) {
                selType.push(self.view.businessTypeFilterMenu.segStatusFilterDropdown.data[selInd[i]].Type_id);
            }
            if (selInd.length === segStatusData.length) { //all are selected
                self.view.segSearchResults.setData(allData);
                self.view.segSearchResults.setVisibility(true);
                self.view.flxNoFilterResults.setVisibility(false);
            } else {
                dataToShow = allData.filter(function(rec) {
                    if (selType.indexOf(rec.lblType) >= 0) {
                        return rec;
                    }
                });
                if (dataToShow.length > 0) {
                    self.view.segSearchResults.setData(dataToShow);
                    self.view.segSearchResults.setVisibility(true);
                    self.view.flxNoFilterResults.setVisibility(false);
                } else {
                    self.view.segSearchResults.setData([]);
                    self.view.flxHeaderPermissions.setVisibility(true);
                    self.view.segSearchResults.setVisibility(false);
                    self.view.flxNoFilterResults.setVisibility(true);
                }
            }
        } else {
            self.view.segSearchResults.setData([]);
            self.view.flxHeaderPermissions.setVisibility(true);
            self.view.segSearchResults.setVisibility(false);
            self.view.flxNoFilterResults.setVisibility(true);
        }
    },
    resetSortImages: function(context) {
        var self = this;
        if (context === "searchList") {
            self.sortIconFor('lblCompanyName.info.value', 'fontIconSortName');
            self.sortIconFor('lblEmail', 'fontIconSortRoles');
            self.sortIconFor('lblCompanyId', 'fontIconSortCompanyId');
        }
    },
    sortIconFor: function(column, iconPath) {
        var self = this;
        self.determineSortFontIcon(this.sortBy, column, self.view[iconPath]);
    },
    sortAndGetData: function(segData, sortColumn, context) {
        var self = this;
        self.sortBy.column(sortColumn);
        self.resetSortImages(context);
        return segData.sort(self.sortBy.sortData);
    },
    onHoverSettings: function(widget, context) {
        var scopeObj = this;
        if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
            widget.setVisibility(true);
        } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
            widget.setVisibility(false);
        }
    },
    onSerchSegRowClick: function() {
        var rowData = this.view.segSearchResults.selectedRowItems[0];
        var legalEntityId = this.view.mainHeader.btnDropdownList.info[0].id;
        this.recentContractDetails.contractId = rowData.contractId;
        this.presenter.getContractInformation(rowData.contractId,legalEntityId, this.formName);
    },
    onCreateContractClick: function() {
        this.presenter.navigateToContractCreateScreen({
            "action": "createContractClick"
        });
    },
    createContractSuccess: function() {
        this.presenter.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"), "Contract has been created successfully", this.formName);
    },
    createContractError: function(error) {
        this.presenter.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), error, this.formName);
    },
  
});

