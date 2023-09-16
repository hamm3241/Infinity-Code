define(['Promisify', 'ErrorInterceptor', 'ErrorIsNetworkDown', 'LegalEntityPermission_Form_Extn'], function(Promisify, ErrorInterceptor, isNetworkDown, LegalEntityPermissionExtn) {

  var RoleStatusConstants = {
    active : 'SID_ACTIVE',
    inactive : 'SID_INACTIVE'
  };
  function Role_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    this.isSingleEntity = kony.mvc.MDAApplication.getSharedInstance().appContext.IS_SINGLE_ENTITY;
    this.roleModel = {
      fetchRoleList: null,
      fetchRoleUpdates:{
        fetchActiveUsers:null,
        fetchRolePermissions:null,
        fetchRoleUsers:null,
        fetchActivePermissions:null,
        fetchAllServiceDef:null,
        fetchRoleServiceDef:null
      },
      fetchRoleDetails : {
        roleDetails : null ,
        rolePermissions : null,
        roleUsers : null,
        roleServiceDefinition : null,
        allServiceDefinitions : null
      },
      fetchCompositeActions: null,
      context:null,
      legalEntityList:[],
      currUserLegalEntityList:[]
    };
    this.context={
      toast:null,
      message:null
    };
    this.isKeyCloakEnabled=null;
  }

  inheritsFrom(Role_PresentationController, kony.mvc.Presentation.BasePresenter);

  Role_PresentationController.prototype.reqCSVObj = null;

  Role_PresentationController.prototype.initializePresentationController = function() {
    var self = this;
    ErrorInterceptor.wrap(this, 'businessController').match(function(on){
      return [
        on(isNetworkDown).do(function(){
          self.presentUserInterface("frmRoles",{
            NetworkDownMessage : {}
          });
        })
      ];
    });
  };

  Role_PresentationController.prototype.showErrorToastMessage = function(message){
    var self= this;
    self.context.toast="Error";
    self.context.message = message;
    self.presentUserInterface("frmRoles",self.context);
  };

  /**
   * Opening Method for the Roles module fetches and presents the Roles List
   * @name fetchRoleList
   * @member RoleModule.presentationController
   */
  Role_PresentationController.prototype.fetchRoleList = function(){
    var self = this;
    // this.presentUserInterface("frmRoles",{});
    let legalEntityList = this.fetchAllLegalEntityList();
    let currUserLegalEntityList = this.getCurrUserLegalEntityList();
    let legalEntityId =  "";
    let fetchAllRolesPayload = {};
    if(this.isSingleEntity){
      legalEntityId = currUserLegalEntityList[0].id;
      fetchAllRolesPayload = {
        "legalEntityId" : legalEntityId
      };
    }
    var promiseFetchAllRoles = Promisify(this.businessController, 'fetchAllRoles');
    var promiseList=[];
    promiseList.push(promiseFetchAllRoles(fetchAllRolesPayload));
    if(self.isKeyCloakEnabled===null){
      var promiseLoginType = Promisify(this.businessController, 'getLoginTypeConfiguration');
      promiseList.push(promiseLoginType({}));
    }
    Promise.all(promiseList).then(function (responses) {      
      self.isKeyCloakEnabled=(self.isKeyCloakEnabled===null)?responses[1].isKeyCloakEnabled:self.isKeyCloakEnabled;
      self.presentUserInterface("frmRoles",{"isKeyCloakEnabled":self.isKeyCloakEnabled});
      self.roleModel.context = "viewRoles";
      self.reqCSVObj = responses[1];
      self.roleModel.fetchRoleList = responses[0].roles_view;
      self.presentUserInterface("frmRoles",self.roleModel);
      self.presentUserInterface('frmRoles',{"LoadingScreen":{focus:false}});
    }).catch(function (res) {
      self.context.toast="Error";
      self.context.message=ErrorInterceptor.errorMessage(res);
      self.presentUserInterface("frmRoles",self.context);
      self.presentUserInterface('frmRoles',{"LoadingScreen":{focus:false}});
    });
  };


  /**
   * @name createRoleDetails
   * @member RoleModule.presentationController
   * @param FormController fController
   * @param {Role_Name : string, Role_Desc : string, Status_id : string, system_user : string, Permission_ids : [string], User_ids : [string]} param
   */
  Role_PresentationController.prototype.createRoleDetails = function(fController,param) {
    var self = this;

    function successCallback(response) {
      self.fetchRoleList();
      if(response.requestId != null || response.requestId != undefined){
        self.context.successMessage = "createRole";
        self.context.requestId = response.requestId;
        self.presentUserInterface("frmRoles",self.context); 
      }
      else{
        self.context.successMessage = "createRoleWithoutApproval";    
        self.presentUserInterface("frmRoles",self.context);
      }   
    }

    function failureCallback(error) {
      kony.print("error" );
      self.context.toast="Error";
      self.context.message=ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmRoles",self.context);
    }

    this.businessController.createRole(param, successCallback.bind(this), failureCallback.bind(this));
  };

  /**
   * @name UpdateRoleDetails
   * @member RoleModule.presentationController
   * @param {User_id : string, Role_Details : {id : string, Name : string, Description : string, Status_id : string}, AssignedTo : {permissionsList : [string], usersList : []}, RemovedFrom : {permissionsList : [], usersList : []}} param
   */
  Role_PresentationController.prototype.UpdateRoleDetails = function(param) {
    var self = this;

    function successCallback(response) {
      self.fetchRoleList();
      if(response.isPreviousApprovalPending === "1"){
        self.context.successMessage="updateRolePendingApproval";
        self.presentUserInterface("frmRoles",self.context);
      }
      else{
        if(response.requestId === null || response.requestId === undefined){
          self.context.successMessage = "updateRoleWithoutApproval";
          self.presentUserInterface("frmRoles",self.context);
        }
        else{
          self.context.successMessage = "updateRole";
          self.context.requestId = response.requestId;
          self.presentUserInterface("frmRoles",self.context);
        }
      }
    }
    

    function failureCallback(error) {
      self.context.toast="Error";
      self.context.message = ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmRoles",self.context);
      self.fetchRoleList();
    }

    this.businessController.updateRole(param, successCallback.bind(this), failureCallback.bind(this));
  };


  /**
   * @name fetchAllActiveUsersAndAllActivePermissions
   * @member RoleModule.presentationController
   * @param FormController fController
   */
  Role_PresentationController.prototype.fetchAllActiveUsersAndAllActivePermissions = function(fController, params) {
    var self = this;
    var promiseActivePermissions = Promisify(this.businessController, 'fetchActivePermissions');
    var promiseAllServiceDefinitions = Promisify(this.businessController, 'fetchAllServiceDefinitions');
    
	  var promiseList =[];
    promiseList.push(promiseActivePermissions({}));
    if(this.isSingleEntity){
      let legalEntityId = params.legalEntityId.split(",")[0];
      promiseList.push(promiseAllServiceDefinitions({"legalEntityId": legalEntityId}));
    } else {
      promiseList.push(promiseAllServiceDefinitions({"isGetAllServiceDefinitions": "true"}));
    }
	  if(self.isKeyCloakEnabled===false){
      var promiseActiveUsers = Promisify(this.businessController, 'fetchActiveUsers');
      promiseList.push(promiseActiveUsers({}));      
    }
    Promise.all(promiseList).then(function(response){
      self.roleModel.context = "createRole";
      if(self.isKeyCloakEnabled===false){
      self.roleModel.fetchRoleUpdates.fetchActiveUsers = response[2];
      }
      self.roleModel.fetchRoleUpdates.fetchRoleUsers = [];
      self.roleModel.fetchRoleUpdates.fetchActivePermissions = response[0];
      self.roleModel.fetchRoleUpdates.fetchRolePermissions = [];
      self.roleModel.fetchRoleUpdates.fetchAllServiceDef = response[1].ServiceDefinitionRecords;
      self.roleModel.fetchRoleUpdates.fetchRoleServiceDef = [];
      self.presentUserInterface("frmRoles", self.roleModel);
    }).catch(function failureCallback(error) {
      self.context.toast="Error";
      self.context.message= ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmRoles",self.context);
    });
  };


  /**
   * @name fetchUpdateRoleData
   * @member RoleModule.presentationController
   * @param FormController fController
   * @param {role_id : string} param
   */
  Role_PresentationController.prototype.fetchUpdateRoleData = function (fController, param) {
    var self = this;
    var promiseRolePermissions = Promisify(this.businessController, 'fetchRolePermissions');
    var promiseActivePermissions = Promisify(this.businessController, 'fetchActivePermissions');
    var promiseCustomerRoleForUserRole =  Promisify(this.businessController, 'getInternalRoleToCustomerRoleMapping');
    var promiseAllServiceDefinitions = Promisify(this.businessController, 'fetchAllServiceDefinitions');
    var promiseList =[];
    if(this.isSingleEntity) {
      let legalEntityId = param.legalEntityId.split(",")[0];
      promiseList.push(
        promiseRolePermissions({"roleId" : param.role_id, "legalEntityId" : legalEntityId}),
        promiseActivePermissions({}),
        promiseCustomerRoleForUserRole({"InternalRole_id":param.role_id, "legalEntityId" : legalEntityId}),
        promiseAllServiceDefinitions({"legalEntityId": legalEntityId})
      );   
    } else {
      promiseList.push(
        promiseRolePermissions({"roleId" : param.role_id}),
        promiseActivePermissions({}),
        promiseCustomerRoleForUserRole({"InternalRole_id":param.role_id}),
        promiseAllServiceDefinitions({"isGetAllServiceDefinitions": "true"})
      );
    }
	  if(self.isKeyCloakEnabled===false){
      var promiseActiveUsers = Promisify(this.businessController, 'fetchActiveUsers');
      var promiseRoleUsers = Promisify(this.businessController, 'fetchRoleUsers');
      promiseList.push(promiseActiveUsers({}),promiseRoleUsers(param.role_id));      
    }
    Promise.all(promiseList).then(function onSuccess(responses) {
      self.roleModel.context = "updateRole";
      self.roleModel.fetchRoleUpdates.fetchRolePermissions = responses[0];
      self.roleModel.fetchRoleUpdates.fetchActivePermissions = responses[1];
      self.roleModel.fetchRoleUpdates.fetchRoleServiceDef = responses[2].internal_role_to_servicedefinition_mapping;
      self.roleModel.fetchRoleUpdates.fetchAllServiceDef = responses[3].ServiceDefinitionRecords;  
      if(self.isKeyCloakEnabled===false){
      self.roleModel.fetchRoleUpdates.fetchActiveUsers = responses[4];
      self.roleModel.fetchRoleUpdates.fetchRoleUsers = responses[5];
      }
      self.presentUserInterface("frmRoles", self.roleModel);
    }).catch(function failureCallback(error) {
      self.context.toast="Error";
      self.context.message= ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmRoles",self.context);
    });
  };

  /**
   * @name changeStatusOf
   * @member RoleModule.presentationController
   * @param string roleId
   * @param string statusId
   * @param string user_id
   */
  Role_PresentationController.prototype.changeStatusOf = function(roleId, statusId,user_id){
    var self = this;
    var updateStatusTo = null;

    if(RoleStatusConstants.active === statusId) {
      updateStatusTo = RoleStatusConstants.inactive;
    } else {
      updateStatusTo = RoleStatusConstants.active;
    }

    var params={
      "User_id":user_id,
      "Role_Details": {
        "id": roleId,
        "Status_id": updateStatusTo
      }
    };

    function successCallback(response) {
      self.context.toast="Success";
      if(response.isPreviousApprovalPending === "1"){
        self.context.successMessage="statusPendingApproval";
        self.presentUserInterface("frmRoles",self.context);
      }
      else{
        if(updateStatusTo === RoleStatusConstants.inactive){
          if (response.requestId === null || response.requestId === undefined) {
            self.context.successMessage = "deactiveWithoutApproval";
            self.context.message = kony.i18n.getLocalizedString("i18n.deactivatedWithoutApproval.successMessage");
            self.presentUserInterface("frmRoles", self.context);
          } else {
            self.context.successMessage = "deactivate";
            self.context.message = kony.i18n.getLocalizedString("i18n.deactivated.successMessage");
            self.context.requestId = response.requestId;
            self.presentUserInterface("frmRoles", self.context);
          }
        }
        else{
          if (response.requestId === null || response.requestId === undefined) {
            self.context.successMessage = "activeWithoutApproval";
            self.context.message = kony.i18n.getLocalizedString("i18n.activatedWithoutApproval.successMessage");
            self.presentUserInterface("frmRoles", self.context);
            self.fetchRoleList();
          } else {
            self.context.successMessage = "activate";
            self.context.message = kony.i18n.getLocalizedString("i18n.activated.successMessage");
            self.context.requestId = response.requestId;
            self.presentUserInterface("frmRoles", self.context);
            self.fetchRoleList();
          }
        }
      }
    }

    function failureCallback(error) {
      self.context.toast="Error";
      self.context.message= ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmRoles",self.context);
    }

    self.businessController.updateRoleStatus(params, successCallback, failureCallback);
  };
  /**
   * @name changeStatus
   * @member RoleModule.presentationController
   * @param string legalEntitiesRoleInfo
   * @param string statusId
   * @param string user_id
   */

  Role_PresentationController.prototype.onRoleUpdateChangeStatus = function (roleId, user_id, legalEntitiesRoleInfo, updateStatusTo) {
    var self = this;

    var params = {
      "User_id": user_id,
      "legalEntitiesRoleInfo": legalEntitiesRoleInfo
    };

    function successCallback(response) {
      self.context.toast = "Success";
      if (updateStatusTo && self.isSingleEntity) {
        if (response.isPreviousApprovalPending === "1") {
          self.context.successMessage = "statusPendingApproval";
          self.presentUserInterface("frmRoles", self.context);
        }
        else {
          if (updateStatusTo === RoleStatusConstants.inactive) {
            if (response.requestId === null || response.requestId === undefined) {
              self.context.successMessage = "deactiveWithoutApproval";
              self.context.message = kony.i18n.getLocalizedString("i18n.deactivatedWithoutApproval.successMessage");
              self.presentUserInterface("frmRoles", self.context);
              self.fetchRoleList();
            } else {
              self.context.successMessage = "deactivate";
              self.context.message = kony.i18n.getLocalizedString("i18n.deactivated.successMessage");
              self.context.requestId = response.requestId;
              self.presentUserInterface("frmRoles", self.context);
              self.fetchRoleList();
            }
          }
          else {
            if (response.requestId === null || response.requestId === undefined) {
              self.context.successMessage = "activeWithoutApproval";
              self.context.message = kony.i18n.getLocalizedString("i18n.activatedWithoutApproval.successMessage");
              self.presentUserInterface("frmRoles", self.context);
              self.fetchRoleList();
            } else {
              self.context.successMessage = "activate";
              self.context.message = kony.i18n.getLocalizedString("i18n.activated.successMessage");
              self.context.requestId = response.requestId;
              self.presentUserInterface("frmRoles", self.context);
              self.fetchRoleList();
            }
          }
        }
      } else {
        if (response.isPreviousApprovalPending === "1") {
          self.context.successMessage = "statusPendingApproval";
          self.presentUserInterface("frmRoles", self.context);
        }
        else {
          if (response.requestId === null || response.requestId === undefined) {
            self.context.successMessage = "updateRoleWithoutApproval";
            self.presentUserInterface("frmRoles", self.context);
            self.fetchRoleList();
          }
          else {
            self.context.successMessage = "updateRole";
            self.context.requestId = response.requestId;
            self.presentUserInterface("frmRoles", self.context);
            self.fetchRoleList();
          }
        }
      }
    } function failureCallback(error) {
      self.context.toast = "Error";
      self.context.message = ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmRoles", self.context);
    }

    self.businessController.updateRoleStatus(params, successCallback, failureCallback);
  };



  /**
   * @name fetchRoleDetails
   * @member RoleModule.presentationController
   * @param FormController fController
   * @param {roleId : string, roleName : string, roleDesc : string, roleStatus : string} param
   */
  Role_PresentationController.prototype.fetchRoleDetails = function(fController, param) {
    var self = this;
    var promiseRolePermissions = Promisify(this.businessController, 'fetchRolePermissions');
    var promiseRoleServiceDef = Promisify(this.businessController, 'getInternalRoleToCustomerRoleMapping');
    var promiseallServiceDef = Promisify(this.businessController, 'fetchAllServiceDefinitions');
    
    var promiseList = [];
    let promiseRolePermissionsPayload = {};
    let promiseRoleServiceDefPayload = {};
    let promiseallServiceDefPayload = {};
    if(this.isSingleEntity){
      let legalEntityId = param.legalEntityId.split(",")[0];
      promiseRolePermissionsPayload = { "roleId": param.roleId, "legalEntityId": legalEntityId };
      promiseRoleServiceDefPayload = { "InternalRole_id": param.roleId, "legalEntityId": legalEntityId };
      promiseallServiceDefPayload = { "legalEntityId": legalEntityId };
    } else {
      promiseRolePermissionsPayload = { "roleId": param.roleId };
      promiseRoleServiceDefPayload = { "InternalRole_id": param.roleId };
      promiseallServiceDefPayload = { "isGetAllServiceDefinitions": "true" };
    }
    promiseList.push(promiseRolePermissions(promiseRolePermissionsPayload));
    promiseList.push(promiseRoleServiceDef(promiseRoleServiceDefPayload));
    if(self.isKeyCloakEnabled===false){
      var promiseRoleUsers = Promisify(this.businessController, 'fetchRoleUsers');
      promiseList.push(promiseRoleUsers(param.roleId));     
    }
    promiseList.push(promiseallServiceDef(promiseallServiceDefPayload));
    Promise.all(promiseList
    ).then(function onSuccess(responses) {
      self.roleModel.context = "fetchRoleDetails";
      var allServiceDef = self.roleModel.fetchRoleDetails.allServiceDefinitions;
      self.roleModel.fetchRoleDetails = {};
      self.roleModel.fetchRoleDetails.roleDetails = param;
      self.roleModel.fetchRoleDetails.rolePermissions = responses[0];
      self.roleModel.fetchRoleDetails.roleServiceDefinition = responses[1].internal_role_to_servicedefinition_mapping;   
      if(self.isKeyCloakEnabled===false)    
        self.roleModel.fetchRoleDetails.roleUsers = responses[2];
      if(responses && responses.length === 3 && self.isKeyCloakEnabled===true){ // 3 promise call -if keycloak enabled contains 
        self.roleModel.fetchRoleDetails.allServiceDefinitions = responses[2].ServiceDefinitionRecords;
      }else if(responses && responses.length === 4 && self.isKeyCloakEnabled===false){ // 4 promise call - if keycloak disabled contains 
        self.roleModel.fetchRoleDetails.allServiceDefinitions = responses[3].ServiceDefinitionRecords;
      } else{
        self.roleModel.fetchRoleDetails.allServiceDefinitions = allServiceDef;
      }
      self.presentUserInterface("frmRoles", self.roleModel);
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

  /**
   * @name fetchCompositeActions
   * @member RoleModule.presentationController
   * @param {Role_id : string, Permission_id : string} params
   */
  Role_PresentationController.prototype.generateRolesList = function(params){
    var self = this;
    function successCallback(response){
      var fileId = response.fileId;
      self.roleModel.context= "fileId";
      self.roleModel.fileId = fileId;
      self.presentUserInterface("frmRoles",self.roleModel );
    }
      function failureCallback(error) {
      kony.print("error");
      self.context.toast="Error";
      self.context.message= ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmRoles",self.context);
    }
    this.businessController.generateRolesList(params, successCallback, failureCallback);
  };
  Role_PresentationController.prototype.fetchCompositeActions = function(params){
    var self = this;

    function successCallback(response) {
      self.roleModel.fetchCompositeActions = response;
      self.roleModel.context = "fetchCompositeActions";
      self.presentUserInterface("frmRoles", self.roleModel);
    }

    function failureCallback(error) {
      kony.print("error");
      self.context.toast="Error";
      self.context.message= ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmRoles",self.context);
    }

    this.businessController.getUserOrRoleCompositeActions(params, successCallback, failureCallback);
  };

  /**
   * @name updateRoleCompositeActions
   * @member RoleModule.presentationController
   * @param {roleId : string, addedCompositeActions : [string], removedCompositeActions : [string]} params
   * @param string opt
   */
  Role_PresentationController.prototype.updateRoleCompositeActions = function(params,opt){
    var self = this;
    var operation = "";
    self.presentUserInterface('frmRoles',{"LoadingScreen":{focus:true}});
    if(opt === kony.i18n.getLocalizedString("i18n.frmPermissionsController.Add")) {
      operation ="addCompositeActions";
    } else if(opt === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Remove")) {
      operation = "removedCompositeActions";
    }

    function successCallback(response) {
      self.context.toast="Success";
      self.context.message="CSR assist action successfully configured";
      self.context.LoadingScreen = {focus:false};
      self.presentUserInterface("frmRoles",self.context);
      
    }

    function failureCallback(error) {
      self.context.toast="Error";
      self.context.message= ErrorInterceptor.errorMessage(error);
      self.context.LoadingScreen = {focus:false};
      self.presentUserInterface("frmRoles",self.context);
    }

    this.businessController.updateRoleCompositeActions(params, successCallback, failureCallback);
  };
  /**
   * @name fetchAllServiceDefinitions
   * @member RoleModule.presentationController
   */
  Role_PresentationController.prototype.fetchAllServiceDefinitions = function() {
    var self = this;
    self.presentUserInterface('frmRoles',{"LoadingScreen":{focus:true}});

    function onSuccess(response) {
      self.presentUserInterface('frmRoles', {
        "allServiceDefinitions": response.ServiceDefinitionRecords
      });
      self.presentUserInterface('frmRoles',{"LoadingScreen":{focus:true}});

    }
    function onError(error) {
      self.presentUserInterface('frmRoles',{"LoadingScreen":{focus:false}});
      self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
    }
    self.businessController.fetchAllServiceDefinitions({}, onSuccess, onError);
  };

  /**
     * @name fetchAllLegalEntityList
     * @member RoleModule.presentationController
     *
     */
  Role_PresentationController.prototype.fetchAllLegalEntityList = function () {
    let self = this;
    let LEList = LegalEntityPermissionExtn.getAllLEListArr();
    self.roleModel.legalEntityList = LEList && LEList.length > 0 ? LEList : [];
    return self.roleModel.legalEntityList;
  };

  /**
     * @name fetchAllLegalEntityList
     * @member RoleModule.presentationController
     *
     */
   Role_PresentationController.prototype.getCurrUserLegalEntityList = function () {
    let self = this;
    let LEList = LegalEntityPermissionExtn.getCurrentUserLEArr();
    self.roleModel.currUserLegalEntityList = LEList && LEList.length > 0 ? LEList : [];
    return self.roleModel.currUserLegalEntityList;
  };

  Role_PresentationController.prototype.getCSVLegalEntityIds = function (legalEntityList) {
    let self = this;
    let legalEntityId = "";
    if (legalEntityList && legalEntityList.length > 0) {
      legalEntityList.forEach((legalEntityObj, index, list) => {
        legalEntityId += legalEntityObj.id;
        if (index !== list.length - 1) {
          legalEntityId += ", ";
        }
      });
    }
    return legalEntityId;
  };

  return Role_PresentationController;
});