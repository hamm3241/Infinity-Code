define({ 

  //Type your controller code here 
  //customerId : null,

  willUpdateUI: function (context) {
    this.updateLeftMenu(context);
    if(context.value) {
      this.view.breadcrumbs.btnBackToMain.text = context.value;
       this.view.typeHeadCity.tbxSearchKey.info = {"isValid":false,"data":""};
      this.view.typeHeadCountry.tbxSearchKey.info = {"isValid":false,"data":""};
      this.view.typeHeadState.tbxSearchKey.info = {"isValid":false,"data":""};
  	 // this.customerId =  context.userId;
      this.clearAllAddressFields();
      this.getAddressSegmentData();
      this.clearDataForCreateCompanyDetails();
    } else if(context.LoadingScreen) {
      if(context.LoadingScreen.focus === true) 
        kony.adminConsole.utils.showProgressBar(this.view);
      else
        kony.adminConsole.utils.hideProgressBar(this.view);
    } else if(context.toastModel) {
      if (context.toastModel.status === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success")) {
          this.view.toastMessage.showToastMessage(context.toastModel.message, this);
        } else if (context.toastModel.status === kony.i18n.getLocalizedString("i18n.frmErrorLogin.lbltoastMessage")) {
          this.view.toastMessage.showErrorToastMessage(context.toastModel.message, this);
        }
    }
  },
  setFlowActions: function () {
    // Customer Management Personal setFlowActions
    var scopeObj = this;
    this.view.commonButtonsDetails.btnNext.onClick= function () {
      var isValid = scopeObj.validatingCompanyDetails();
      if(isValid) {
        scopeObj.presenter.upgradeUser(scopeObj.getCreateCompanyDetails());
      }
    };
    this.view.tbxSearch.onKeyUp = function(){
      scopeObj.getGoogleSuggestion(scopeObj.view.tbxSearch.text);
    };
    this.view.commonButtonsDetails.btnCancel.onClick = function(){
      scopeObj.presenter.navigateToContactsTab();
    };
    this.view.breadcrumbs.btnBackToMain.onClick = function(){
      scopeObj.presenter.navigateToContactsTab();
    };
     this.view.segSearch.onRowClick = function(){
      scopeObj.mappingRowToWidgets();
    };
    this.view.typeHeadCountry.tbxSearchKey.onKeyUp = function(){
      scopeObj.clearValidation(scopeObj.view.typeHeadCountry.tbxSearchKey, scopeObj.view.flxNoCountry, 1);
      scopeObj.view.typeHeadCountry.tbxSearchKey.info.isValid = false;
      scopeObj.hideAddressSegments(scopeObj.view.typeHeadCountry);
      scopeObj.view.flxCountry.zIndex = 2;
      scopeObj.searchForAddress(scopeObj.view.typeHeadCountry.tbxSearchKey, scopeObj.view.typeHeadCountry.segSearchResult, scopeObj.view.typeHeadCountry.flxNoResultFound, 1);
      if(scopeObj.view.typeHeadCountry.tbxSearchKey.text === ""){
        scopeObj.view.typeHeadState.tbxSearchKey.setEnabled(false);
        scopeObj.view.typeHeadCity.tbxSearchKey.setEnabled(false);
      }else{
        scopeObj.view.typeHeadState.tbxSearchKey.setEnabled(true);
      }
      scopeObj.view.typeHeadState.tbxSearchKey.text = "";
      scopeObj.view.typeHeadCity.tbxSearchKey.text = "";
      scopeObj.view.forceLayout();
    };
    this.view.typeHeadCity.tbxSearchKey.onKeyUp = function(){
      scopeObj.clearValidation(scopeObj.view.typeHeadCity.tbxSearchKey, scopeObj.view.flxNoCity, 1);
      scopeObj.view.typeHeadCity.tbxSearchKey.info.isValid = false;
      scopeObj.hideAddressSegments(scopeObj.view.typeHeadCity);
      scopeObj.searchForAddress(scopeObj.view.typeHeadCity.tbxSearchKey, scopeObj.view.typeHeadCity.segSearchResult, scopeObj.view.typeHeadCity.flxNoResultFound, 3);
      scopeObj.view.forceLayout();
    };
    this.view.typeHeadState.tbxSearchKey.onKeyUp = function(){
      scopeObj.clearValidation(scopeObj.view.typeHeadState.tbxSearchKey, scopeObj.view.flxNoState, 1);
      scopeObj.view.typeHeadState.tbxSearchKey.info.isValid = false;
      if(scopeObj.view.typeHeadState.tbxSearchKey.text === ""){
        scopeObj.view.typeHeadCity.tbxSearchKey.setEnabled(false);
      }else{
        scopeObj.view.typeHeadCity.tbxSearchKey.setEnabled(true);
      }
      scopeObj.hideAddressSegments(scopeObj.view.typeHeadState);
      scopeObj.searchForAddress(scopeObj.view.typeHeadState.tbxSearchKey, scopeObj.view.typeHeadState.segSearchResult, scopeObj.view.typeHeadState.flxNoResultFound, 2);
      scopeObj.view.typeHeadCity.tbxSearchKey.text = "";
      scopeObj.view.forceLayout();
    };
    this.view.typeHeadCountry.tbxSearchKey.onEndEditing = function(){
      if (scopeObj.view.typeHeadCountry.flxNoResultFound.isVisible) {
        scopeObj.view.typeHeadCountry.flxNoResultFound.setVisibility(false);
      }
    };
    this.view.typeHeadCity.tbxSearchKey.onEndEditing = function(){
      if (scopeObj.view.typeHeadCity.flxNoResultFound.isVisible) {
        scopeObj.view.typeHeadCity.flxNoResultFound.setVisibility(false);
      }
    };
    this.view.typeHeadState.tbxSearchKey.onEndEditing = function(){
      if (scopeObj.view.typeHeadState.flxNoResultFound.isVisible) {
        scopeObj.view.typeHeadState.flxNoResultFound.setVisibility(false);
      }
    };
    this.view.typeHeadCountry.segSearchResult.onRowClick = function(){
      scopeObj.assingText(scopeObj.view.typeHeadCountry.segSearchResult, scopeObj.view.typeHeadCountry.tbxSearchKey);
      scopeObj.clearValidation(scopeObj.view.typeHeadCountry.tbxSearchKey,scopeObj.view.flxNoCountry,1);
    };
    this.view.typeHeadCity.segSearchResult.onRowClick = function(){
      scopeObj.assingText(scopeObj.view.typeHeadCity.segSearchResult, scopeObj.view.typeHeadCity.tbxSearchKey);
      scopeObj.clearValidation(scopeObj.view.typeHeadCity.tbxSearchKey,scopeObj.view.flxNoCity,1);
    };
    this.view.typeHeadState.segSearchResult.onRowClick = function(){
      scopeObj.assingText(scopeObj.view.typeHeadState.segSearchResult, scopeObj.view.typeHeadState.tbxSearchKey);
      scopeObj.clearValidation(scopeObj.view.typeHeadState.tbxSearchKey,scopeObj.view.flxNoState,1);
    };
    this.view.tbxNameValue.onKeyUp = function(){
      scopeObj.clearValidation(scopeObj.view.tbxNameValue, scopeObj.view.flxNoNameError,1);
    };
    this.view.contactNumber.txtContactNumber.onKeyUp = function(){
      scopeObj.view.contactNumber.hideErrorMsg(2);
    };
    this.view.contactNumber.txtContactNumber.onTouchStart = function(){
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToPhoneNumber('frmUpgradeUser_contactNumber_txtContactNumber');
    };
    this.view.contactNumber.txtISDCode.onKeyUp = function(){
      scopeObj.view.contactNumber.hideErrorMsg(1);
    };
    this.view.contactNumber.txtISDCode.onTouchStart = function(){
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToISDCode('frmUpgradeUser_contactNumber_txtISDCode');
    };
    this.view.contactNumber.txtISDCode.onEndEditing = function(){
      scopeObj.view.contactNumber.txtISDCode.text = scopeObj.view.contactNumber.addingPlus(scopeObj.view.contactNumber.txtISDCode.text);
    };
    this.view.tbxEmailValue.onKeyUp = function(){
      scopeObj.clearValidation(scopeObj.view.tbxEmailValue, scopeObj.view.flxNoEmailError,1);
    };
    this.view.tbxStreetName.onKeyUp = function(){
      scopeObj.clearValidation(scopeObj.view.tbxStreetName, scopeObj.view.flxNoStreetName,1);
    };
    this.view.tbxZipCode.onKeyUp = function(){
      scopeObj.clearValidation(scopeObj.view.tbxZipCode, scopeObj.view.flxNoZipCode,1);
    };               
    this.view.textBoxEntryTin.tbxEnterValue.onKeyUp = function(){
      scopeObj.clearValidation(scopeObj.view.textBoxEntryTin.flxEnterValue, scopeObj.view.textBoxEntryTin.flxInlineError, 3);
      scopeObj.view.lblTinCheck.isValidTin = false;
      scopeObj.view.lblTinCheck.isTinValidated = false;
    };
  },
  validatingCompanyDetails : function(){
    // company name
    var validation = true;
    if(this.view.tbxNameValue.text.trim() === ""){
      this.view.flxNoNameError.setVisibility(true);
      this.view.lblNoNameError.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Enter_Company_Name");
      this.view.tbxNameValue.skin = "skinredbg";
      validation = false;
    }

    // contact number
    var phoneRegex=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (!this.view.contactNumber.txtContactNumber.text || !this.view.contactNumber.txtContactNumber.text.trim()) {
      this.view.contactNumber.flxError.width = "61%";
      this.view.contactNumber.flxError.isVisible = true;
      this.view.contactNumber.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ContactNo_cannot_be_empty");
      this.view.contactNumber.txtContactNumber.skin = "skinredbg";
      validation = false;
    } else if (this.view.contactNumber.txtContactNumber.text.trim().length > 15) {
      this.view.contactNumber.flxError.width = "61%";
      this.view.contactNumber.flxError.isVisible = true;
      this.view.contactNumber.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ContactNo_cannot_exceed");
      this.view.contactNumber.txtContactNumber.skin = "skinredbg";
      validation = false;
    } else if (phoneRegex.test(this.view.contactNumber.txtContactNumber.text) === false) {
      this.view.contactNumber.flxError.width = "61%";
      this.view.contactNumber.flxError.isVisible = true;
      this.view.contactNumber.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ContactNo_not_valid");
      this.view.contactNumber.txtContactNumber.skin = "skinredbg";
      validation = false;
    }

    //ISD code
    var ISDRegex = /^\+(\d{1,3}|\d{1,3})$/;
    if(!this.view.contactNumber.txtISDCode.text || !this.view.contactNumber.txtISDCode.text.trim() || this.view.contactNumber.txtISDCode.text.trim().length > 4 || ISDRegex.test(this.view.contactNumber.txtISDCode.text) === false){
      this.view.contactNumber.flxError.width = "100%";
      this.view.contactNumber.flxError.isVisible = true;
      this.view.contactNumber.lblErrorText.text = "Enter a valid ISD code";
      this.view.contactNumber.txtISDCode.skin = "skinredbg";
      validation = false;
    }


    // email id
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.view.tbxEmailValue.text.trim() === "") {
      this.view.lblNoEmailError.text = kony.i18n.getLocalizedString("i18n.frmCompanies.EmailId_cannot_be_empty");
      this.view.flxNoEmailError.isVisible = true;
      this.view.tbxEmailValue.skin = "skinredbg";
      validation = false;
    } else if (emailRegex.test(this.view.tbxEmailValue.text.trim()) === false) {
      this.view.lblNoEmailError.text = kony.i18n.getLocalizedString("i18n.frmCompanies.EmailID_not_valid");
      this.view.flxNoEmailError.isVisible = true;
      this.view.tbxEmailValue.skin = "skinredbg";
      validation = false;
    }

    //street name 
    if(this.view.tbxStreetName.text.trim() === ""){
      this.view.flxNoStreetName.setVisibility(true);
      this.view.lblNoStreetNameError.text = kony.i18n.getLocalizedString("i18n.common.enterstreetName");
      this.view.tbxStreetName.skin = "skinredbg";
      validation = false;
    }

    //ZipCode
    if (/^([a-zA-Z0-9_]+)$/.test(this.view.tbxZipCode.text) === false) {
      this.view.lblNoZipError.text = kony.i18n.getLocalizedString("i18n.common.enterValidZipcode");
      this.view.flxNoZipCode.isVisible = true;
      this.view.tbxZipCode.skin = "skinredbg";
      validation = false;
    }

    //City
    if (this.view.typeHeadCity.tbxSearchKey.text.trim() === "" || this.view.typeHeadCity.segSearchResult.isVisible || this.view.typeHeadCity.flxNoResultFound.isVisible) {
      this.view.lblNoCityError.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Select_a_City"); 
      this.view.flxNoCity.isVisible = true;
      this.view.typeHeadCity.tbxSearchKey.skin = "skinredbg";
      validation = false;
    } else if(this.view.typeHeadCity.tbxSearchKey.info.isValid === false){
      this.view.lblNoCityError.text = kony.i18n.getLocalizedString("i18n.frmCompanies.Select_valid_city");
      this.view.flxNoCity.isVisible = true;
      this.view.typeHeadCity.tbxSearchKey.skin = "skinredbg";
      validation = false;
    }

    //State
    if (this.view.typeHeadState.tbxSearchKey.text.trim() === "" || this.view.typeHeadState.segSearchResult.isVisible || this.view.typeHeadState.flxNoResultFound.isVisible) {
      this.view.lblNoStateError.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Select_a_State"); 
      this.view.flxNoState.isVisible = true;
      this.view.typeHeadState.tbxSearchKey.skin = "skinredbg";
      validation = false;
    } else if(this.view.typeHeadState.tbxSearchKey.info.isValid === false){
      this.view.lblNoStateError.text = kony.i18n.getLocalizedString("i18n.frmCompanies.Select_valid_state");
      this.view.flxNoState.isVisible = true;
      this.view.typeHeadState.tbxSearchKey.skin = "skinredbg";
      validation = false;
    }

    //Country
    if (this.view.typeHeadCountry.tbxSearchKey.text.trim() === "" || this.view.typeHeadCountry.segSearchResult.isVisible || this.view.typeHeadCountry.flxNoResultFound.isVisible) {
      this.view.lblNoCountryError.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Select_a_Country"); 
      this.view.flxNoCountry.isVisible = true;
      this.view.typeHeadCountry.tbxSearchKey.skin = "skinredbg";
      validation = false;
    } else if(this.view.typeHeadCountry.tbxSearchKey.info.isValid === false){
      this.view.lblNoCountryError.text = kony.i18n.getLocalizedString("i18n.frmCompanies.Select_valid_country");
      this.view.flxNoCountry.isVisible = true;
      this.view.typeHeadCountry.tbxSearchKey.skin = "skinredbg";
      validation = false;
    }
    return validation;
  },
  getGoogleSuggestion : function(text){
    var self = this;
    function onSuccess(response) {
      console.log(response);
      self.view.segSearch.setVisibility(true);
      self.setSerchSegmentData(response);
      self.view.forceLayout();
    }
    function onError(response) {
      kony.print("Error",response);
    }
    this.presenter.getAddressSuggestion(text, onSuccess, onError);

  },
  mapping : function(data){
    return{
      "lblId" : data.place_id,
      "lblAddress" : data.description,
      "lblPinIcon" : "",
      "lat" : "17.4947934",
      "long" : "78.3996441"
    };
  },
  setSerchSegmentData : function(data){
    var self = this;
    var finalData;
    if(data.predictions){
      finalData = data.predictions.map(self.mapping);
      var dataMap = {
        lblAddress : "lblAddress",
        lblPinIcon : "lblPinIcon"
      };
      this.view.segSearch.widgetDataMap = dataMap;
      this.view.segSearch.setData(finalData);
    }
  },
  mappingRowToWidgets : function(){
    var self = this;
    var data = this.view.segSearch.data;
    var index = this.view.segSearch.selectedRowIndex[1];
    var id = data[index].lblId;
    function onSuccess(response){
      self.fillingData(response,data[index]);
    }
    function onError(reponse){
      kony.print("Error",reponse);
    }
    this.presenter.getPlaceDetails(id, onSuccess, onError);

  },
  fillingData : function(response,rowData){
    this.clearAllAddressFields();
    var self = this;
    if(response.result){
      var finalresponse = response.result;
      self.view.tbxSearch.text = "";
      self.view.segSearch.setVisibility(false);
      var pin = {
        id: rowData.lblId,
        lat: finalresponse[0].latitude,
        lon: finalresponse[0].longitude,
        name: "",
        image: "pinb.png",
        focusImage: "pinb.png",
        desc: "",
        showCallout: false
      };
      var locationData = {
        lat: finalresponse[0].latitude,
        lon: finalresponse[0].longitude,
      };
      self.view.typeHeadState.tbxSearchKey.setEnabled(true);
      self.view.typeHeadCity.tbxSearchKey.setEnabled(true);
      self.view.map1.mapLocations.addPin(pin);
      self.view.map1.mapLocations.navigateToLocation(locationData,false,true);
      self.view.tbxStreetName.text = rowData.lblAddress;
      for(var i = 0;i<finalresponse[0].address_components.length ;i++){
        if (finalresponse[0].address_components[i].types.search("postal_code") !== -1) {
          self.view.tbxZipCode.text = finalresponse[0].address_components[i].long_name;
        }else if(finalresponse[0].address_components[i].types.search("country") !== -1) {
          if(self.checkAvailabilty(finalresponse[0].address_components[i].long_name,self.view.typeHeadCountry.segSearchResult.data)){
            self.view.typeHeadCountry.tbxSearchKey.text = finalresponse[0].address_components[i].long_name;
            self.view.typeHeadCountry.tbxSearchKey.info.isValid = true;
          }else{
            self.view.flxNoCountry.setVisibility(true);
            self.view.lblNoCountryError.text = "invalid country";
            self.view.forceLayout();
          }
        }else if(finalresponse[0].address_components[i].types.search("locality") !== -1){
          if(self.checkAvailabilty(finalresponse[0].address_components[i].long_name,self.view.typeHeadCity.segSearchResult.data)){
            self.view.typeHeadCity.tbxSearchKey.text = finalresponse[0].address_components[i].long_name;
            self.view.typeHeadCity.tbxSearchKey.info.isValid = true;
          }else{
            self.view.flxNoCity.setVisibility(true);
            self.view.lblNoCityError.text = "invalid city";
            self.view.forceLayout();
          }
        }else if(finalresponse[0].address_components[i].types.search("administrative_area_level_1") !== -1){
          if(self.checkAvailabilty(finalresponse[0].address_components[i].long_name,self.view.typeHeadState.segSearchResult.data)){
            self.view.typeHeadState.tbxSearchKey.text = finalresponse[0].address_components[i].long_name;
            self.view.typeHeadState.tbxSearchKey.info.isValid = true;
          }else{
            self.view.flxNoState.setVisibility(true);
            self.view.lblNoStateError.text = "invalid state";
            self.view.forceLayout();
          }
        }
      }
      self.getAddressCodes([self.view.typeHeadCountry.tbxSearchKey.text,
                            self.view.typeHeadState.tbxSearchKey.text,
                            self.view.typeHeadCity.tbxSearchKey.text]);
    }
  },
  checkAvailabilty : function(key,list){
    for(var i=0;i<list.length;i++){
      if((list[i].lblAddress.text).toLowerCase().indexOf(key.toLowerCase()))
        return true;
    }
    return false;
  },
  clearAllAddressFields : function(){
    this.view.tbxStreetName.text = "";
    this.view.tbxBuildingName.text = "";
    this.view.typeHeadCountry.tbxSearchKey.text = "";
    this.view.typeHeadCountry.tbxSearchKey.info.isValid = false;
    this.view.tbxZipCode.text = "";
    this.view.typeHeadCity.tbxSearchKey.text = "";
    this.view.typeHeadCity.tbxSearchKey.info.isValid = false;
    this.view.typeHeadState.tbxSearchKey.text = "";
    this.view.typeHeadState.tbxSearchKey.info.isValid = false;
    this.clearValidation(this.view.tbxStreetName, this.view.flxNoStreetName, 1);
    this.clearValidation(this.view.typeHeadCountry.tbxSearchKey, this.view.flxNoCountry, 1);
    this.clearValidation(this.view.tbxZipCode, this.view.flxNoZipCode, 1);
    this.clearValidation(this.view.typeHeadCity.tbxSearchKey, this.view.flxNoCity, 1);
    this.clearValidation(this.view.typeHeadState.tbxSearchKey, this.view.flxNoState, 1);
  },
  upgradeUserDisplay:function() {
    this.view.flxDetails.setVisibility(true);
    this.view.commonButtonsDetails.btnNext.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
    this.view.commonButtonsDetails.btnNext.hoverSkin= "sknBtn005198LatoRegular13pxFFFFFFRad20px";
    this.view.commonButtonsDetails.btnNext.focusSkin= "sknBtn003E75LatoRegular13pxFFFFFFRad20px"; 
    this.setFlowActions();
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
  },
  getCreateCompanyDetails:function(){
    var companyDetails = {};
    companyDetails.Username = this.presenter.getCurrentCustomerDetails().Username;
    var legalEntityId = this.presenter.getCurrentCustomerDetails().legalEntityId || this.presenter.custSearchLEId;
    companyDetails.legalEntityId= legalEntityId || ""
    companyDetails.Name = this.view.tbxNameValue.text;
    companyDetails.Communication = [{
      "Phone":this.view.contactNumber.txtISDCode.text+"-"+this.view.contactNumber.txtContactNumber.text,
      "Email":this.view.tbxEmailValue.text
    }];
    companyDetails.Address = [
      {
        "country": this.view.typeHeadCountry.tbxSearchKey.text,
        "cityName": this.view.typeHeadCity.tbxSearchKey.text,
        "state": this.view.typeHeadState.tbxSearchKey.text,
        "zipCode": this.view.tbxZipCode.text,
        "addressLine1": this.view.tbxStreetName.text,
        "addressLine2": this.view.tbxBuildingName.text
      }
    ];
    companyDetails.Membership = [
      {
        "Taxid": this.view.textBoxEntryTin.tbxEnterValue.text
      }
    ];
    return companyDetails;
  }, 
  hideAddressSegments : function(typeHeadPath){
    this.view.typeHeadCity.segSearchResult.setVisibility(false);
    this.view.typeHeadCountry.segSearchResult.setVisibility(false);
    this.view.typeHeadState.segSearchResult.setVisibility(false);
    if(typeHeadPath){
      typeHeadPath.segSearchResult.setVisibility(true);
    }
    this.view.forceLayout();
  }, /*
   * search on address fields while typing in textbox
   * @param: textbox path, sement path
   * @param: category ( 1-country, 2- state, 3-city)
   */
  searchForAddress : function(tbxPath,segPath,noResultFlex,category){
    var self = this;
    var searchText = tbxPath.text;
    var sourceData = [],dataToAssign = [];
    if(category === 1){
      sourceData =self.segCountry;
      dataToAssign = sourceData.filter(function(rec){
        var name = (rec.lblAddress.text).toLowerCase();
        return (name.indexOf(searchText.toLowerCase()) > -1);
      });
    }else if(category === 2){
      sourceData =self.segState;
      var country = self.view.typeHeadCountry.tbxSearchKey.info.data;
      dataToAssign = sourceData.filter(function(rec){
        var name = (rec.lblAddress.text).toLowerCase();
        return ((name.indexOf(searchText.toLowerCase()) > -1) && (rec.Country_id === country.id) );
      });

    }else if(category === 3){
      sourceData =self.segLocationCity;
      var state = self.view.typeHeadState.tbxSearchKey.info.data;
      dataToAssign = sourceData.filter(function(rec){
        var name = (rec.lblAddress.text).toLowerCase();
        return ((name.indexOf(searchText.toLowerCase()) > -1)&& (rec.Region_id === state.id));
      });
    }
    if(searchText === "") dataToAssign = [];
    segPath.setData(dataToAssign);
    if(dataToAssign.length > 0){
      segPath.setVisibility(true);
      noResultFlex.setVisibility(false);
      if(noResultFlex === this.view.typeHeadCountry.flxNoResultFound){
        this.view.flxCountry.zIndex = 2;
      }else{
        this.view.flxCountry.zIndex = 1;
      }
    }else{
      segPath.setVisibility(false);
      noResultFlex.setVisibility(true);
      if(noResultFlex === this.view.typeHeadCountry.flxNoResultFound){
        this.view.flxCountry.zIndex = 2;
      }else{
        this.view.flxCountry.zIndex = 1;
      }
    }
    self.view.forceLayout();
  },
  getAddressSegmentData : function(){
    var self = this;
    var callBack = function(response){
      kony.print("listboxreponse",response);
      if(response !== "error") {
        self.segCountry = response.countries.reduce(
          function(list, country) {
            return list.concat([{"id":country.id,
                                 "lblAddress":{"text":country.Name,
                                               "left" : "10dp"},
                                 "template":"flxSearchCompanyMap"}]);
          },[]);
        self.segState = response.regions.reduce(
          function(list, region) {
            return list.concat([{"id":region.id,
                                 "lblAddress":{"text":region.Name,
                                               "left" : "10dp"},
                                 "Country_id":region.Country_id,
                                 "template":"flxSearchCompanyMap"}]);
          },[]);
        self.segLocationCity = response.cities.reduce(
          function(list, city) {
            return list.concat([{"id":city.id,
                                 "lblAddress":{"text":city.Name,
                                               "left" : "10dp"},
                                 "Region_id":city.Region_id,
                                 "template":"flxSearchCompanyMap"}]);
          },[]);
      }
     /* if(self.action === self.actionConfig.edit){
        self.getAddressCodes([self.view.typeHeadCountry.tbxSearchKey.text,
                              self.view.typeHeadState.tbxSearchKey.text,
                              self.view.typeHeadCity.tbxSearchKey.text]);
      }*/
      self.setAddressSegmentData();
    };
    this.presenter.fetchLocationPrefillData(callBack);
  },
  setAddressSegmentData : function(){
    var widgetMap = {"flxSearchCompanyMap":"flxSearchCompanyMap",
                     "lblAddress":"lblAddress",
                     "id":"id",
                     "Region_id":"Region_id",
                     "Country_id":"Country_id"};
    this.view.typeHeadCountry.segSearchResult.widgetDataMap = widgetMap;
    this.view.typeHeadCity.segSearchResult.widgetDataMap = widgetMap;
    this.view.typeHeadState.segSearchResult.widgetDataMap = widgetMap;
    this.view.typeHeadCountry.segSearchResult.setData(this.segCountry);
    this.view.typeHeadCity.segSearchResult.setData(this.segLocationCity);
    this.view.typeHeadState.segSearchResult.setData(this.segState);
  },
  clearValidation : function(widget,errorFlex,type){
    if (type === 1)
      widget.skin = "skntxtbxDetails0bbf1235271384a";
    else if(type === 2)
      widget.skin = "sknlstbxNormal0f9abd8e88aa64a";
    else if(type === 3)
      widget.skin = "sknflxEnterValueNormal";
    errorFlex.setVisibility(false);
  },
  assingText : function(segment,textBox){
    var selectedRow = segment.data[segment.selectedRowIndex[1]];
    textBox.text =  selectedRow.lblAddress.text;
    textBox.info.isValid = true;
    textBox.info.data = selectedRow;
    segment.setVisibility(false);
    this.view.flxCountry.zIndex = 1;
    this.view.forceLayout();
  },
  /*
   * clears all fields in create company details
   */
  clearDataForCreateCompanyDetails : function(){
    this.view.tbxNameValue.text = "";
    this.view.tbxEmailValue.text = "";
    this.view.contactNumber.txtContactNumber.text = "";
    this.view.contactNumber.txtISDCode.text = "";
    this.view.textBoxEntryTin.tbxEnterValue.text = "";
    this.view.tbxStreetName.text = "";
    this.view.tbxBuildingName.text = "";
    this.view.typeHeadCountry.tbxSearchKey.text = "";
    this.view.tbxZipCode.text = "";
    this.view.typeHeadCity.tbxSearchKey.text = "";
    this.view.typeHeadState.tbxSearchKey.text = "";
    this.view.typeHeadCountry.tbxSearchKey.info.isValid = false;
    this.view.typeHeadCity.tbxSearchKey.info.isValid = false;
    this.view.typeHeadState.tbxSearchKey.info.isValid = false;

    this.view.lblTinCheck.setVisibility(false);
    this.view.lblTINErrorIcon.setVisibility(false);
    this.clearValidation(this.view.tbxNameValue, this.view.flxNoNameError, 1);
    this.clearValidation(this.view.tbxEmailValue, this.view.flxNoEmailError, 1);
    this.clearValidation(this.view.contactNumber.txtContactNumber, this.view.contactNumber.flxError, 1);
    this.clearValidation(this.view.contactNumber.txtISDCode, this.view.contactNumber.flxError, 1);
    this.clearValidation(this.view.textBoxEntryTin.flxEnterValue, this.view.textBoxEntryTin.flxInlineError, 1);

    this.clearAllAddressFields();
    this.view.forceLayout();
  }
  
});