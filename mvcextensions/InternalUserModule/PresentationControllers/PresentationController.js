define(['Promisify', 'ErrorInterceptor', 'ErrorIsNetworkDown'], function(Promisify, ErrorInterceptor, isNetworkDown) {

  function InternalUser_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);

    this.userModel={
      usersList:null,
      userDetails:null,
      editDetails:null,
      addressDetails:{city:[],
                      country:[],
                      region:[]},
      allRoles:null,
      allPermissions:{permissions_view :null}

    };

    this.globalAddressDetails = {country:[], region:[], city:[]};

  }
  inheritsFrom(InternalUser_PresentationController, kony.mvc.Presentation.BasePresenter);

  InternalUser_PresentationController.prototype.initializePresentationController = function() {
    var self = this;
    ErrorInterceptor.wrap(this, 'businessController').match(function(on){
      return [
        on(isNetworkDown).do(function(){
          self.presentUserInterface('frmUsers',{
            NetworkDownMessage : {}
          });
        })
      ];
    });
  };

  /**
    * @name fetchMasterdataUsers
    * @member InternalUserModule.presentationController
    * @param {}
    */
   InternalUser_PresentationController.prototype.fetchMasterdataUsers = function() {
    var self = this;
    self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:true}});
    var promiseFetchUserType = Promisify(this.businessController, 'getUserTypeList');
    var promiseFetchLineOfBusiness = Promisify(this.businessController, 'getLineOfBusinessList');
    var promiseFetchBranch = Promisify(this.businessController, 'getBranchList');
     Promise.all([
      promiseFetchUserType({}),
      promiseFetchLineOfBusiness({}),
      promiseFetchBranch({}),
    ]).then(function (responses) {
      let context = {"action":"masterDataBusinessAttributes",
                       "userTypeList":responses[0].usertype,
                       "lineOfBusinessList":responses[1].lob_view,
                       "branchList":responses[2].branch_view,
                       };
      self.presentUserInterface('frmUsers',context);
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});
      }).catch(function (error) {
        self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});
        console.log("ERROR" + error);
      });
    };

  /**
     * @name fetchUsersList
     * @member InternalUserModule.presentationController
     * 
     */
  InternalUser_PresentationController.prototype.fetchUsersList = function(toCheck){
    var self = this; 
    self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:true}});
    function successCallback(response) {
      self.userModel.userDetails = null;
      self.userModel.editDetails = null;
      self.userModel.updatedUsersListCond=1;
      self.userModel.usersList = response.internalusers_view;
      if(toCheck!=1){
        self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});
		self.fetchAddressData();
        self.fetchAllBranches();
      }
      if(toCheck==1){
        self.presentUserInterface("frmUsers",{"updatedUsersList":response.internalusers_view,"updatedUsersListCond":1});
	    self.showToastMessage(kony.i18n.getLocalizedString("i18n.konybb.manageUser.UserUpdatedSuccess"), 'SUCCESS');
        }
      }

    function failureCallback(error) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});
      var context= {
        status : "Error",
        message : ErrorInterceptor.errorMessage(error)
      };
      self.presentUserInterface("frmUsers",context); 
      self.fetchAllBranches();
    }
    this.businessController.fetchInternalUsers({}, successCallback, failureCallback);
    this.presentUserInterface("frmUsers",{});
    if(toCheck===1){
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:true}});
      }
   };
	/**
     * @name updateUserStatus
     * @member InternalUserModule.presentationController
     * @param FormController fController
     * @param {Systemuser_id : string, Status_id : string} params
     */
  InternalUser_PresentationController.prototype.updateUserStatus= function(fController,params,flow,dologout){
    var self = this; 
    self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:true}});
    function successCallback(response) {
      kony.print("Status Updated successfully");
      if (flow === "view") {
        self.presentUserInterface('frmUsers',{"updateUserStatusInView":{"Status_id":params.Status_id,"userId" :params.Systemuser_id}});
        self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});
      }else {
        self.fetchUpdatedUsersList();
      }
      if (params.Status_id === "SID_INACTIVE" && dologout === true) {
        self.doLogout();
      }
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCSRController.Update_Successful"), 'SUCCESS');
    }

    function failureCallback(error) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});
      self.showToastMessage(ErrorInterceptor.errorMessage(error),'FAILURE');
    }

    this.businessController.updateUserStatus(params, successCallback, failureCallback);
  };
     /**
     * @name doLogout
     * @member InternalUserModule.presentationController
     **/
  InternalUser_PresentationController.prototype.doLogout = function() {
    var self = this;
    if(self.isKeyCloakEnabled===true)
      self.doKeyCloakLogout();
    else
      self.doRegularLogout();
  };
   /**
     * @name doRegularLogout
     * @member InternalUserModule.presentationController
     **/
  InternalUser_PresentationController.prototype.doRegularLogout = function() {
    var self = this;
    function onLogoutSuccess() {
      self.resetLocalStorage({}, function successfullyClearedData() {}, function failedToReload() {});
      self.deRegisterIdleTimeout();
    }
    function logoutErrorCallback(){} 
    self.businessController.doLogout({}, onLogoutSuccess, logoutErrorCallback);
  };
   /**
     * @name resetLocalStorage
     * @member InternalUserModule.presentationController
     **/
  InternalUser_PresentationController.prototype.resetLocalStorage = function (context, onSuccess, onError) {
    try {
      location.reload();
      onSuccess();
    } catch (e) {
      onError(e);
    }
  };
   /**
     * @name deRegisterIdleTimeout
     * @member InternalUserModule.presentationController
     **/
  InternalUser_PresentationController.prototype.deRegisterIdleTimeout = function() {
    var self = this;
    kony.application.unregisterForIdleTimeout();
  };

  /**
     * @name fetchUpdatedUsersList
     * @member InternalUserModule.presentationController
     * @param FormController fController
     */
    InternalUser_PresentationController.prototype.fetchUpdatedUsersList= function(){
    var self = this; 
    self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:true}});

    function successCallback(response) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});
      self.presentUserInterface("frmUsers",{"updatedUsersList":response.internalusers_view});
    }

    function failureCallback(error) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});
      var context="Error";
      self.presentUserInterface("frmUsers",context);
    }

    this.businessController.fetchInternalUsers({}, successCallback, failureCallback);
  };
    /**
     * @name fetchUserDetails
     * @member InternalUserModule.presentationController
     * @param FormController fController
     * @param {User_id : string, isEdit : boolean, target : string} params
     */
    
  InternalUser_PresentationController.prototype.fetchUserDetails= function(fController,params){
    var self = this; 
    self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:true}});

    function successCallback(response) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});
      self.userModel.userDetails = null;
      self.userModel.editDetails = null;
      self.userModel.usersList = null;
      if(params.isEdit){
        self.userModel.editDetails = response;
      }else{
        self.userModel.userDetails = response;
      }
      if(params.target){
        self.userModel.editDetails.target = params.target;
      }
      self.presentUserInterface("frmUsers",self.userModel);
    }

    function failureCallback(error) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});
      var context= {
        status : "Error",
        message : ErrorInterceptor.errorMessage(error)
      };
      self.presentUserInterface("frmUsers",context);
    }

    this.businessController.fetchUserProfile(params, successCallback, failureCallback);
  };

  /*
     * function to call multiple command handlers to get the city,country,region
     * @name fetchAddressData
     * @member InternalUserModule.presentationController
     */
  InternalUser_PresentationController.prototype.fetchAddressData = function () {
    var self = this;
    self.presentUserInterface('frmUsers', {
      "LoadingScreen": {
        focus: true
      }
    });
    var promiseCountryList = Promisify(this.businessController, 'fetchCountryList');
    var promiseRegionList = Promisify(this.businessController, 'fetchRegionList');
    var promiseCityList = Promisify(this.businessController, 'fetchCityList');
    Promise.all([
      promiseCountryList({}),
      promiseRegionList({}),
      promiseCityList({})
    ]).then(function successCallback(response) {
      self.userModel.addressDetails.country = response[0];
      self.globalAddressDetails.country = response[0];
      self.userModel.addressDetails.region = response[1];
      self.globalAddressDetails.region = response[1];
      self.userModel.addressDetails.city = response[2];
      self.globalAddressDetails.city = response[2];
      self.presentUserInterface("frmUsers", self.userModel);
      self.presentUserInterface('frmUsers', {
        "LoadingScreen": {
          focus: false
        }
      });
    }).catch(function failureCallback(error) {
      self.presentUserInterface('frmUsers', {
        "LoadingScreen": {
          focus: false
        }
      });
      var context= {
        status : "Error",
        message : ErrorInterceptor.errorMessage(error)
      };
      self.presentUserInterface("frmUsers", context);
    });
  };

  /*
     * function to call command handler to create New User
     * @param :  new user data
     */
  /**
     * @name onSaveBtnClick
     * @member InternalUserModule.presentationController
     * @param {userData : {firstName : string, lastName : string, middleName : string, userName : string, email : string}, homeAddrData : {addressLine1 : string, addressLine2 : string, city_id : string, region_id : string, country_id : string, zipcode : string}, workAddrData : {location : string, branch : string, workAddress : string, zipcode : string}, roleData : {user_id : string, role_id : string}, permissionList : [string]} createUserData
     */
  InternalUser_PresentationController.prototype.onSaveBtnClick = function (createUserData) {
    var self = this;
    self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:true}});

    kony.print(" New user data to save" + JSON.stringify(createUserData));

    function successCallback(response) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});  
      kony.print(response);
      self.showToastMessage('User created successfully','SUCCESS');
      self.fetchUsersList(2);
    }

    function failureCallback(error) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});  
      kony.print("ERROR in on save Button click" + error);
      self.showToastMessage(ErrorInterceptor.errorMessage(error),'FAILURE');
    }

    this.businessController.createInternalUser(createUserData, successCallback, failureCallback);
  };

  /*
     * function to call command handler to fetch all Roles
     */
  /**
     * @name fetchAllRoles
     * @member InternalUserModule.presentationController
     * 
     */
  InternalUser_PresentationController.prototype.fetchAllRoles = function () {
    var self = this;
    self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:true}});

    function successCallback(response) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});  
      kony.print(response);
      self.presentUserInterface("frmUsers", response);
    }

    function failureCallback(error) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});  
      kony.print("ERROR in fetchAllRoles" + error);
    }

    this.businessController.fetchAllRoles({}, successCallback, failureCallback);
  };

  InternalUser_PresentationController.prototype.generateUsersList= function(params){
    var self = this;
    
    function successCallback(response){
      self.presentUserInterface('frmUsers',{"fileId":response.fileId});
    }
    function failureCallback(error){
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});  
      kony.print("ERROR in fetchAllRoles" + error);
    }
    this.businessController.generateUsersList(params,successCallback,failureCallback);
  };
  /*
     * function to call command handler to fetch all the permissions
     */
  /**
     * @name fetchAllPermissions
     * @member InternalUserModule.presentationController
     * 
     */
  InternalUser_PresentationController.prototype.fetchAllPermissions = function () {
    var self = this;
    self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:true}});

    function successCallback(response) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});  
      self.presentUserInterface("frmUsers", {"permissions_view" : response});
    }

    function failureCallback(error) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});  
      kony.print('ERROR:Not able to fetch permission records', error);
    }

    this.businessController.fetchPermissions({}, successCallback, failureCallback);
  };

/**
     * @name editInternalUser
     * @member InternalUserModule.presentationController
     * @param {User_id : string, ModifiedByID : string, ModifiedByName : string, FirstName : string, LastName : string, MiddleName : string, UserName : string, Email : string, addr1 : string, addr2 : string, City_id : string, State_id : string, Country_id : string, City_Name : string, State_Name : string, Country_Name : string, Zipcode : string, BranchLocation_Name : string, BranchLocation_id : string, zipcode : string, Role_id : string, Role_Name : string, listOfAddedPermissionsNames : [], listOfRemovedPermissionsNames : [], listOfAddedPermissions : [], listOfRemovedPermissions : []} editDetails
     */
  InternalUser_PresentationController.prototype.editInternalUser = function (editDetails) {
    var self = this;
    self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:true}});
	var userModal={};
    function successCallback(response) {
      kony.print("edit success");
      if(response.isPreviousApprovalPending === "1"){
        self.context.successMessage="statusPendingApproval";
        self.presentUserInterface("frmUsers",self.context);
      }
      else{
        if(response.requestId != null || response.requestId != undefined){
          userModal.successMessage = "updateUser";
          userModal.requestId = response.requestId;
          self.presentUserInterface("frmUsers",userModal);
        }
        else{
          userModal.successMessage = "updateUserWithoutApproval";
          self.presentUserInterface("frmUsers",userModal);
        }
      }
      self.fetchUsersList(1);
    }

    function failureCallback(error) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});  
      self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
      kony.print('ERROR:Not able to edit user details', error);
    }

    this.businessController.editInternalUser(editDetails, successCallback, failureCallback);
  };

/**
     * @name showToastMessage
     * @member InternalUserModule.presentationController
     * @param string message
     * @param string status
     */
  InternalUser_PresentationController.prototype.showToastMessage = function(message, status){
    this.presentUserInterface("frmUsers", {toast : {
      message : message,
      status : status
    }});
  };

/**
     * @name sendResetPasswordEmail
     * @member InternalUserModule.presentationController
     * @param {emailId : string, emailType : string} data
     */
  InternalUser_PresentationController.prototype.sendResetPasswordEmail = function(data){
    var self = this;
    self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:true}});

    function successCallback(response) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});  
      self.showToastMessage('Email sent successfully','SUCCESS');
    }

    function failureCallback(error) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});  
      self.showToastMessage(ErrorInterceptor.errorMessage(error),'FAILURE');
      kony.print('ERROR:Not able to send email', error);
    }

    this.businessController.sendEmail(data, successCallback, failureCallback);
  };

/**
     * @name fetchAllRolePermissions
     * @member InternalUserModule.presentationController
     * 
     */
  InternalUser_PresentationController.prototype.fetchAllRolePermissions = function(){
    var self = this;
    self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:true}});

    function successCallback(response) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});  
      kony.print("get RolePermissions successful");
      self.presentUserInterface("frmUsers", {"RolePermissions":response});
    }

    function failureCallback(error) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});  
      kony.print('get RolePermissions failed', error);
    }

    this.businessController.fetchAllRolePermissions({}, successCallback, failureCallback);
  };

	/**
     * @name fetchAllBranches
     * @member InternalUserModule.presentationController
     * 
     */
  InternalUser_PresentationController.prototype.fetchAllBranches = function(){
    var self = this;
    self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:true}});

    function successCallback(response) {
      //self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});  
      kony.print("get Branches successful");
      self.presentUserInterface("frmUsers", {"Branches":response});
    }

    function failureCallback(error) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});  
      kony.print('get Branches failed', error);
    }

    this.businessController.fetchAllBranches({}, successCallback, failureCallback);
  };

  /*
     * function to call global city,country,region
     */
  /**
     * @name fetchGlobalAddressData
     * @member InternalUserModule.presentationController
     * @param string addressString
     * @param string addressCode
     */
  InternalUser_PresentationController.prototype.fetchGlobalAddressData = function (addressString, addressCode) {
    kony.print("Inside fetchGlobalAddressData() of InternalUser_PresentationController");
    var self = this;
    if(addressString === "country") {
      var globalRegion = [];
      var globalCity = [];
      globalCity.push(["lb1", "Select a City"]);
      globalRegion.push(["lb1", "Select a State"]);

      for(var i=0 ; i<Object.keys(self.globalAddressDetails.region).length ; ++i) {
        if(self.globalAddressDetails.region[i].Country_id === addressCode) {
          globalRegion.push([self.globalAddressDetails.region[i].id, self.globalAddressDetails.region[i].Name]);
        }
      }
      for(var j=0 ; j<Object.keys(self.globalAddressDetails.city).length ; ++j) {
        if(self.globalAddressDetails.city[j].Region_id === addressCode) {
          globalCity.push([self.globalAddressDetails.city[j].id, self.globalAddressDetails.city[j].Name]);
        }
      }
      self.presentUserInterface("frmUsers", {"globalAddress" : {"globalRegion" : globalRegion,"globalCity" : globalCity} });
    }

    else if(addressString === "region") {
      var globalCity = [];
      globalCity.push(["lb1", "Select a City"]);

      for(var k=0 ; k<Object.keys(self.globalAddressDetails.city).length ; ++k) {
        if(self.globalAddressDetails.city[k].Region_id === addressCode) {
          globalCity.push([self.globalAddressDetails.city[k].id, self.globalAddressDetails.city[k].Name]);
        }
      }
      self.presentUserInterface("frmUsers", {"globalAddress" : {"globalCity" : globalCity} });
    }
  };

  /**
     * @name fetchCompositeActions
     * @member InternalUserModule.presentationController
     * @param {User_id : string, Role_id : string, Permission_id : string} params
     */
  InternalUser_PresentationController.prototype.fetchCompositeActions = function(params){
    var self = this;
    self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:true}});

    function successCallback(response) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});
      self.presentUserInterface("frmUsers", {"compositePermissionsCSR":response});
    }

    function failureCallback(error) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});
      kony.print("error in fetch composite permissions");
    }

    this.businessController.getUserOrRoleCompositeActions(params, successCallback, failureCallback);
  };

  /*
  * function to update the role compositeAction
  * @params:JSON{roleId,addedCompositeActions:[],removedCompositeActions:[]}
  */
  InternalUser_PresentationController.prototype.updateUserCompositeActions = function(params){
    var self = this;
    self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:true}});

    function successCallback(response) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});
      self.showToastMessage('CSR assist action successfully configured','SUCCESS');
    }

    function failureCallback(error) {
      self.presentUserInterface('frmUsers',{"LoadingScreen":{focus:false}});
      self.showToastMessage(ErrorInterceptor.errorMessage(error),'FAILURE');
    }

    this.businessController.updateUserCompositeActions(params, successCallback, failureCallback);
  };

  InternalUser_PresentationController.prototype.openKeyCloakConsole = function(){
    // this.dismissLoadingIndicatorForKeyCloak();
    var hostUrl= kony.adminConsole.utils.clientProperties.KEYCLOAK_HOST_URL;      
    var realm= kony.adminConsole.utils.clientProperties.SPOTLIGHT_REALM;  
    window.open(hostUrl+"/auth/admin/"+realm+"/console/#/realms/"+realm+"/users",replace="true");
  };
  InternalUser_PresentationController.prototype.dismissLoadingIndicatorForKeyCloak = function(){
    var flxLoading=kony.application.getCurrentForm().flxLoading;
    if(flxLoading!==undefined)
      flxLoading.setVisibility(false);
    else
      kony.application.dismissLoadingScreen();
  };

  InternalUser_PresentationController.prototype.getKeyCloakStatus = function(){
    var self=this;
    
    function onFetchSuccess(response){
      var isKeyCloakLogin = response.isKeyCloakEnabled;
      self.presentUserInterface('frmUsers',{"isKeyCloakLogin":{focus:isKeyCloakLogin}});
    }
    
    function onFetchError(error){   
    //   self.dismissLoadingIndicatorForKeyCloak();
    //   var toastMessageComp=kony.application.getCurrentForm().toastMessage;
    //   var flxToastMessage=kony.application.getCurrentForm().flxToastMessage;
    //   if(toastMessageComp && flxToastMessage){         
    //     toastMessageComp.flxRightImage.onClick = function(){
    //       flxToastMessage.setVisibility(false);
    //     };
    //     toastMessageComp.lbltoastMessage.text = ErrorInterceptor.errorMessage(error);
    //     toastMessageComp.flxToastContainer.skin = "sknFlxErrorToastBgE61919";
    //     toastMessageComp.fontIconImgLeft.text ="\ue94b";
    //     flxToastMessage.setVisibility(true);
    //     kony.application.getCurrentForm().forceLayout();
    //   }
      console.log("----ERROR: fetching login type " +ErrorInterceptor.errorMessage(error));
    }    
    this.businessController.getLoginTypeConfiguration({}, onFetchSuccess, onFetchError);
  };

  return InternalUser_PresentationController;
});