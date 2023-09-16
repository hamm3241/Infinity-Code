define(['Promisify', 'ErrorInterceptor', 'ErrorIsNetworkDown'], function (Promisify, ErrorInterceptor, isNetworkDown)  {
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function ApprovalsRequest_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
      this.roleModel = {
        fetchRoleList: null,
        fetchRoleUpdates: {
          fetchActiveUsers: null,
          fetchRolePermissions: null,
          fetchRoleUsers: null,
          fetchActivePermissions: null,
          fetchAllServiceDef: null,
          fetchRoleServiceDef: null
        },
        fetchRoleDetails: {
          roleDetails: null,
          rolePermissions: null,
          roleUsers: null,
          roleServiceDefinition: null,
          allServiceDefinitions: null
        },
        fetchCompositeActions: null,
        context: null,
        usersList: null,
        userDetails: null,
        editDetails: null,
        addressDetails: {
          city: [],
          country: [],
          region: []
        },
        allRoles: null,
        allPermissions: { permissions_view: null }
      };
      this.permissionModel = {
        context: null,
        request: null,
        permissionId: null,
        responses: {
          fetchPermissionById: null,
          fetchRolesPermissions: [],
          fetchUsersPermissions: []
        },
        isKeyCloakEnabled: null
      }
      this.userModel = {
        context: null,
        request: null,
        responses: {},
        userDetails: [],
        isKeyCloakEnabled: null
      }
      this.isKeyCloakEnabled = null;
    }

    inheritsFrom(ApprovalsRequest_PresentationController, kony.mvc.Presentation.BasePresenter);

    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
  ApprovalsRequest_PresentationController.prototype.initializePresentationController = function() {
    var self = this;
    ErrorInterceptor.wrap(this, 'businessController').match(function(on){
      return [
        on(isNetworkDown).do(function(){
          self.presentUserInterface('frmRequests',{
            NetworkDownMessage : {}
          });
        })
      ];
    });
  };
  
  ApprovalsRequest_PresentationController.prototype.fetchAllApprovals = function(value){
    this.presentUserInterface("frmRequests", value);
  };
  
  ApprovalsRequest_PresentationController.prototype.fetchAllHistory = function(value){
    this.presentUserInterface("frmRequests", value);
  };
  ApprovalsRequest_PresentationController.prototype.fetchViewUserDetails = function(value){
    this.presentUserInterface("frmViewUsers", value);
  };
  ApprovalsRequest_PresentationController.prototype.fetchViewRolesDetails = function(value){
    this.presentUserInterface("frmViewRoles", value);
  };
  ApprovalsRequest_PresentationController.prototype.fetchViewPermissionDetails = function(value){
    this.presentUserInterface("frmViewPermissions", value);
  };
   ApprovalsRequest_PresentationController.prototype.navToViewDetails = function (param) {
    this.navigateTo('ApprovalsRequestModule', 'navigateViewDetails', param);
  };
  
   ApprovalsRequest_PresentationController.prototype.navigateViewDetails = function(value){
    this.presentUserInterface("frmViewUsers", value);
  };
     ApprovalsRequest_PresentationController.prototype.navToDashboard = function (param) {
    this.navigateTo('DashboardModule', 'fetchDashBoardData', param);
  };
  ApprovalsRequest_PresentationController.prototype.navToRequests = function(value){
    this.presentUserInterface("frmRequests", value);
  };
  
  ApprovalsRequest_PresentationController.prototype.callingApprovalsData = function(){
    var viewModel = {
        count: {},
        alerts: {},
        alertsCount: "",
        action: ""
      };
      var self = this;
     var promiseList =[];
      var fetchApprovalsData = Promisify(self.businessController, 'fetchApprovalsData');
    promiseList.push(fetchApprovalsData({}));
   
    if(self.isKeyCloakEnabled===null){
      var promiseLoginType = Promisify(this.businessController, 'getLoginTypeConfiguration');
      promiseList.push(promiseLoginType({}));
    }
      Promise.all(promiseList).then(function (responses) {  
        self.isKeyCloakEnabled=(self.isKeyCloakEnabled===null)?responses[1].isKeyCloakEnabled:self.isKeyCloakEnabled;
        //self.presentUserInterface("frmViewRoles",{"isKeyCloakEnabled":self.isKeyCloakEnabled});
        var approvalData = responses[0];
        var approvalDataSort = approvalData.sort((a,b) => 
        	{
          		const dateA = new Date(a.createdts);
				const dateB = new Date(b.createdts);
				return dateB-dateA
        	})
        viewModel.approvalData = approvalDataSort;
        viewModel.action = "fromBackend";
        self.presentUserInterface("frmRequests", viewModel);
      }).catch(function onError() {
        //self.hideProgressBar();
        //self.errorToastMgs();
      });
  };
  
  ApprovalsRequest_PresentationController.prototype.callingHistoryData = function(){
    var viewModel = {
        count: {},
        alerts: {},
        alertsCount: "",
        action: ""
      };
      var self = this;
      var fetchHistoryData = Promisify(self.businessController, 'fetchHistoryData');
      Promise.all([
        fetchHistoryData({})
      ]).then(function onSuccess(response){
        var historyData = response[0];
        var historyDataSort = historyData.sort((a,b) => 
        	{
          		const dateA = new Date(a.checkedts);
				const dateB = new Date(b.checkedts);
				return dateB-dateA
        	})
        viewModel.historyData = historyDataSort;
        viewModel.action = "fromBackend";
        self.presentUserInterface("frmRequests", viewModel);
      }).catch(function onError() {
        //self.hideProgressBar();
        //self.errorToastMgs();
      });
  };
  
  ApprovalsRequest_PresentationController.prototype.approveRole = function(param) {
      var viewModel = {};
      var requestId = param[0].requestId;
      var self = this;
      var approveRole = Promisify(self.businessController, 'approveRole');
      var promiseList =[];
      promiseList.push(approveRole(param[0])); 
     var fetchApprovalsData = Promisify(self.businessController, 'fetchApprovalsData');
     promiseList.push(fetchApprovalsData({}));
    
      Promise.all(promiseList).then(function onSuccess(response) {
        let approvalRequestResponse = response[0];
        if(approvalRequestResponse && approvalRequestResponse[0]){
           viewModel.approvalRequest = approvalRequestResponse[0];
        }
        viewModel.request = param[0];
        viewModel.action = "fromBackend";
        viewModel.roleToast = "Approved Already";
        viewModel.roleName = param[0].roleName;
        for(var i=0; i<response[1].length ;i++){
           if(response[1][i].ApprovalRequestId===requestId){
             viewModel.roleToast = "success";
           }
        }
       self.presentUserInterface("frmViewRoles", viewModel);
      }).catch(function onError() {
        //self.hideProgressBar();
        //self.errorToastMgs();
      });
  };

  ApprovalsRequest_PresentationController.prototype.updateUserRequestStatus = function (param) {
    var viewModel = {};
    var self = this;
    var promiseUpdateUserRequestStatus = Promisify(self.businessController, 'updateUserRequestStatus');
    var promiseList = [];
    promiseList.push(promiseUpdateUserRequestStatus(param));

    Promise.all(promiseList).then(function onSuccess(response) {
      let approvalRequestResponse = response[0];
      if(approvalRequestResponse && approvalRequestResponse[0]){
         viewModel.approvalRequest = approvalRequestResponse[0];
      }
      viewModel.request = param;
      viewModel.action = "fromBackend";
      viewModel.userToast = "success";
      self.presentUserInterface("frmViewUsers", viewModel);
    }).catch(function onError() {
      //self.hideProgressBar();
      //self.errorToastMgs();
    });
  };

  ApprovalsRequest_PresentationController.prototype.updatePermissionRequestStatus = function (param) {
    var viewModel = {};
    var self = this;
    var promiseupdatePermissionRequestStatus = Promisify(self.businessController, 'updatePermissionRequestStatus');
    var promiseList = [];
    promiseList.push(promiseupdatePermissionRequestStatus(param));

    Promise.all(promiseList).then(function onSuccess(response) {
      let approvalRequestResponse = response[0];
      if(approvalRequestResponse && approvalRequestResponse[0]){
         viewModel.approvalRequest = approvalRequestResponse[0];
      }
      viewModel.request = param;
      viewModel.action = "fromBackend";
      viewModel.permissionToast = "success";
      self.presentUserInterface("frmViewPermissions", viewModel);
    }).catch(function onError() {
      //self.hideProgressBar();
      //self.errorToastMgs();
    });
  };
  
  /**
   * @name fetchUserDetails
   * @param {User_id : string, isEdit : boolean, target : string} params
   */

  ApprovalsRequest_PresentationController.prototype.fetchUserDetails= function(params){
    var self = this; 
    self.userModel.context = "ApprovalRequest_ViewUser";
    self.userModel.request = params;
    self.userModel.responses = {};

    var userId = "";
    if (params.recordId) {
      userId = JSON.parse(params.recordId).id1;
    }

    self.userModel.userId = userId;

    var param = {
      "ExperienceAPIContext": "Approval",
      "requestId": params.ApprovalRequestId,
      "userId": userId,
    }

    function successCallback(response) {
      self.presentUserInterface('frmViewUsers',{"LoadingScreen":{focus:false}});
      self.userModel.isKeyCloakEnabled = self.isKeyCloakEnabled;
      self.userModel.userDetails = response;
      self.presentUserInterface("frmViewUsers",self.userModel);
    }

    function failureCallback(error) {
      self.presentUserInterface('frmViewUsers',{"LoadingScreen":{focus:false}});
      var context= {
        status : "Error",
        message : ErrorInterceptor.errorMessage(error)
      };
      self.presentUserInterface("frmViewUsers",context);
    }

    if(self.isKeyCloakEnabled === null){
      var promises = [];
      var promiseKeyCloak = Promisify(this.businessController, 'getLoginTypeConfiguration');
      promises.push(promiseKeyCloak({}));
      Promise.all(promises).then(function (responses) {
        self.isKeyCloakEnabled = responses[0].isKeyCloakEnabled;
      }).catch(function (error) {
        self.isKeyCloakEnabled = null;
      });
    }

    this.businessController.fetchUserProfile(param, successCallback, failureCallback);
  };

  ApprovalsRequest_PresentationController.prototype.getKeyCloakStatus = function(){
    var self=this;
    
    function onFetchSuccess(response){
      var isKeyCloakLogin = response.isKeyCloakEnabled;
      self.presentUserInterface('frmViewUsers',{"isKeyCloakLogin":{focus:isKeyCloakLogin}});
    }
    
    function onFetchError(error){ 
      console.log("----ERROR: fetching login type " +ErrorInterceptor.errorMessage(error));
    }    
    this.businessController.getLoginTypeConfiguration({}, onFetchSuccess, onFetchError);
  };
  ApprovalsRequest_PresentationController.prototype.fetchRoleDetails = function(param) {
    var self = this;
    var promiseRolePermissions = Promisify(this.businessController, 'fetchRolePermissions');
    var promiseRoleServiceDef = Promisify(this.businessController, 'getInternalRoleToCustomerRoleMapping');
    var promiseallServiceDef = Promisify(this.businessController, 'fetchAllServiceDefinitions');

    var promiseList =[];
    var roleId = "";
    if(param[0].recordId){
      roleId = JSON.parse(param[0].recordId).id1;
    }
    promiseList.push(promiseRolePermissions({"roleId": roleId, "requestId": param[0].ApprovalRequestId}),
                    promiseRoleServiceDef({"roleId": roleId,"ExperienceAPIContext": "Approval","requestId": param[0].ApprovalRequestId}));
    
    //if(self.isKeyCloakEnabled===false){
      var promiseRoleUsers = Promisify(this.businessController, 'fetchRoleUsers');
       promiseList.push(promiseRoleUsers({"roleId": roleId, "requestId": param[0].ApprovalRequestId}));      
    //}
    if(self.roleModel.fetchRoleDetails.allServiceDefinitions === null || self.roleModel.fetchRoleDetails.allServiceDefinitions === undefined){
      promiseList.push(promiseallServiceDef({}));
    }
    Promise.all(promiseList
               ).then(function onSuccess(responses) {
      self.roleModel.context = "fetchRoleDetails";
      var allServiceDef = self.roleModel.fetchRoleDetails.allServiceDefinitions;
      self.roleModel.fetchRoleDetails = {};
      self.roleModel.fetchRoleDetails.roleDetails = param;
      self.roleModel.fetchRoleDetails.rolePermissions = responses[0];
      self.roleModel.fetchRoleDetails.roleServiceDefinition = responses[1].internal_role_to_servicedefinition_mapping_approval;   
      if(self.isKeyCloakEnabled===false)    
        self.roleModel.fetchRoleDetails.roleUsers = responses[2];
      if(responses && responses.length === 3 && self.isKeyCloakEnabled===true){ // 3 promise call -if keycloak enabled contains 
        self.roleModel.fetchRoleDetails.allServiceDefinitions = responses[2].ServiceDefinitionRecords;
      }else if(responses && responses.length === 4 && self.isKeyCloakEnabled===false){ // 4 promise call - if keycloak disabled contains 
        self.roleModel.fetchRoleDetails.allServiceDefinitions = responses[3].ServiceDefinitionRecords;
      } else{
        self.roleModel.fetchRoleDetails.allServiceDefinitions = allServiceDef;
      }
      self.presentUserInterface("frmViewRoles",{"isKeyCloakEnabled":self.isKeyCloakEnabled});
      self.presentUserInterface("frmViewRoles", self.roleModel);
    }).catch(function failureCallback(error) {
      //assign only role details as data is always available
      self.roleModel.fetchRoleDetails = {};
      self.roleModel.context = "fetchRoleDetails";
      self.roleModel.fetchRoleDetails.roleDetails = param;
      self.presentUserInterface("frmRoles", self.roleModel);
      self.context.toast="Error";
      self.context.message= ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmRoles",self.context);
    });	
  };

  ApprovalsRequest_PresentationController.prototype.fetchPermissionDetails = function (params) {
    var self = this;
    if(self.isKeyCloakEnabled === null){
      var promises = [];
      var promiseKeyCloak = Promisify(this.businessController, 'getLoginTypeConfiguration');
      promises.push(promiseKeyCloak({}));
      Promise.all(promises).then(function (responses) {
        self.isKeyCloakEnabled = responses[0].isKeyCloakEnabled;
        self.fetchPermissionsInfo(params);
      }).catch(function (error) {
        self.isKeyCloakEnabled = null;
      });
    } else {
      this.fetchPermissionsInfo(params);
    }
  };

  ApprovalsRequest_PresentationController.prototype.fetchPermissionsInfo = function (params) {
    var self = this;
    self.permissionModel.context = "ApprovalRequest_ViewPermission";
    self.permissionModel.request = params;
    self.permissionModel.responses = {};

    var permissionId = "";
    if (params.recordId) {
      permissionId = JSON.parse(params.recordId).id1;
    }

    self.permissionModel.permissionId = permissionId;

    var param = {
      "ExperienceAPIContext": "Approval",
      "requestId": params.ApprovalRequestId,
      "permissionId": permissionId,
    }

    var promiseFetchPermissionById = Promisify(this.businessController, 'fetchPermissionById');
    var promiseFetchRolesPermissions = Promisify(this.businessController, 'getRolesDirectlyWithPermissions');
    var promiseFetchUsersPermissions = Promisify(this.businessController, 'getUsersDirectlyWithPermissions');

    var promiseList = [];
    promiseList.push(promiseFetchPermissionById(param));
    promiseList.push(promiseFetchRolesPermissions(param));

    self.permissionModel.isKeyCloakEnabled = self.isKeyCloakEnabled;
    if (self.isKeyCloakEnabled === false) {
      promiseList.push(promiseFetchUsersPermissions(param));
    }
    Promise.all(promiseList).then(function (responses) {
      self.permissionModel.responses.fetchPermissionById = responses[0];
      self.permissionModel.responses.fetchRolesPermissions = responses[1];
      if (self.isKeyCloakEnabled === false && responses.length === 3 && responses[2]) {
        self.permissionModel.responses.fetchUsersPermissions = responses[2];
      }
      self.presentUserInterface("frmViewPermissions", self.permissionModel);
    }).catch(function (error) {
      self.permissionModel.responses.fetchPermissionById = [];
      self.permissionModel.responses.fetchRolesPermissions = [];
      self.permissionModel.responses.fetchUsersPermissions = [];
      self.presentUserInterface("frmViewPermissions", self.permissionModel);
      if (!self.context) {
        self.context = {};
      }
      self.context.toast = "Error";
      self.context.message = ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmViewPermissions", self.context);
    });
  };

  ApprovalsRequest_PresentationController.prototype.fetchapprovalCount = function () {
      this.showProgressBar();
      var viewModel = {
        count: {},
        alerts: {},
        alertsCount: "",
        action: ""
      };
      var self = this;
      var fetchApprovalsCount = Promisify(self.businessController, 'fetchApprovalsCount');

      Promise.all([        
        fetchApprovalsCount({})
      ]).then(function onSuccess(response){
        var approvalsCount = response[0];
        viewModel.approvalsCount = approvalsCount;
        viewModel.action = "approvalCount";
        self.presentUserInterface("frmViewRoles", self.viewModel);
      }).catch(function onError() {
        self.hideProgressBar();
        self.errorToastMgs();
      });
  };

  /**
     * @name getUsersDirectlyWithPermission
     * @member PermissionsModule.presentationController
     * @param JSONObject
     * @param (users:[{createdby : string, createdts : string, Email : string, FirstName : string, LastName : string, MiddleName : string, Permission_Description : string, Permission_id : string, Permission_Name : string, Permission_Status_id : string, softdeleteflag : string, updatedby : string, updatedts : string, UserName : string, User_id : string, User_Status_id : string}])=>any callBack
     */
  ApprovalsRequest_PresentationController.prototype.getUsersDirectlyWithPermission=function(param, callBack){
    var self =this;
    var params = {
      "permissionId" : param.permissionId,
      "requestId": param.requestId
    };
    function successCallBack(response){
      callBack(response);
    }
    function failureCallback(error) {
    }
    self.businessController.getUsersDirectlyWithPermissions(params, successCallBack, failureCallback);
  };

  /**
     * @name getRolesDirectlyWithPermission
     * @member PermissionsModule.presentationController
     * @param JSONObject
     * @param (roles:[{DataType_id : null, PermissionValue : string, Permission_createdby : string, Permission_createdts : string, Permission_Description : string, Permission_id : string, Permission_lastmodifiedts : string, Permission_modifiedby : null, Permission_Name : string, Permission_softdeleteflag : string, Permission_Status_id : string, Permission_synctimestamp : string, Permission_Type_id : string, Role_Description : string, Role_id : string, Role_Name : string, Role_Status_id : string, Permission_isComposite : string}])=>any callBack
     */
  ApprovalsRequest_PresentationController.prototype.getRolesDirectlyWithPermission=function(param, callBack){
    var self =this;
    var params = {
      "permissionId" : param.permissionId,
      "requestId": param.requestId
    };
    
    function successCallBack(response){
      var data = [];
      for(var i=0;i<response.length;i++){
        if(response[i].Permission_id === params.permissionId){
          data.push(response[i]);
        }
      }
      callBack(data);
    }

    function failureCallback(error) {
    }

    self.businessController.getRolesDirectlyWithPermissions(params, successCallBack, failureCallback);
  };
  
  ApprovalsRequest_PresentationController.prototype.showProgressBar = function(){
    this.showApprovalRequests({progressBar : {
      show : true
    }});
  };
  ApprovalsRequest_PresentationController.prototype.hideProgressBar = function(){
    this.showApprovalRequests({progressBar : {
      show : false
    }});
  };
  ApprovalsRequest_PresentationController.prototype.toastMgs = function(){
    this.showApprovalRequests({toast : {
      show : "success"
    }});
  };
  ApprovalsRequest_PresentationController.prototype.errorToastMgs = function(){
    this.showApprovalRequests({toast : {
      show : "error"
    }});
  };
  ApprovalsRequest_PresentationController.prototype.showApprovalRequests = function(context) {
    this.presentUserInterface("frmRequests",context);
  };

  return ApprovalsRequest_PresentationController;
});