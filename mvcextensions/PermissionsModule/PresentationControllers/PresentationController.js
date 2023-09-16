define(['Promisify','ErrorInterceptor', 'ErrorIsNetworkDown'], function (Promisify,ErrorInterceptor, isNetworkDown) {
  var PermissionStatusConstants = {
    active : 'SID_ACTIVE',
    inactive : 'SID_INACTIVE'
  };
  function Permissions_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    this.checkPermission = function(){return true;};
    this.isKeyCloakEnabled=null;
    kony.print("in");
  }

  inheritsFrom(Permissions_PresentationController, kony.mvc.Presentation.BasePresenter);

  Permissions_PresentationController.prototype.reqCSVObj = null;
/**
     * @name showPermissionsForm
     * @member PermissionsModule.presentationController
     * 
     */
  Permissions_PresentationController.prototype.showPermissionsForm = function() {
    this.viewPermissions();
  };
  Permissions_PresentationController.prototype.generatePermissionsList = function(params){
    var self = this;
    function successCallback(response){
      var fileId = response.fileId;
      self.viewModel.action= "fileId";
      self.viewModel.fileId = fileId;
      self.presentUserInterface("frmPermissions",self.viewModel );
    }
      function failureCallback(error) {
      kony.print("error");
      self.context.toast="Error";
      self.context.message= ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmPermissions",self.context);
    }
    this.businessController.generatePermissionsList(params, successCallback, failureCallback);
  };

  Permissions_PresentationController.prototype.initializePresentationController = function () {
    this.viewModel = {
      offset : 0,
      limit : 10,
      permissions : [],
    };
    var self = this;
    ErrorInterceptor.wrap(this, 'businessController').match(function(on){
      return [
        on(isNetworkDown).do(function(){
          self.presentUserInterface('frmPermissions',{
            NetworkDownMessage : {}
          });
        })
      ];
    });
  };


/**
     * @name fetchPermissions
     * @member PermissionsModule.presentationController
     * 
     */
  Permissions_PresentationController.prototype.fetchPermissions = function () {
    var self = this;
    self.showLoadingScreen();
    var promisePermissions = Promisify(this.businessController, 'fetchPermissions');
    var promiseList=[];
    promiseList.push(promisePermissions({}));
    if(self.isKeyCloakEnabled===null){
      var promiseLoginType = Promisify(this.businessController, 'getLoginTypeConfiguration');
      promiseList.push(promiseLoginType({}));
    }
    Promise.all(promiseList).then(function (responses) {
        self.isKeyCloakEnabled=(self.isKeyCloakEnabled===null)?responses[1].isKeyCloakEnabled:self.isKeyCloakEnabled;
        self.reqCSVObj = responses[0];
        self.presentUserInterface("frmPermissions",{permissions:responses[0],"isKeyCloakEnabled":self.isKeyCloakEnabled});
        self.hideLoadingScreen();
      }).catch(function (res) {
        self.showPermissionsUI({"toastMessage":{"message":ErrorInterceptor.errorMessage(res),"status":"error"}});
        kony.print('Not able to fetch permission records',ErrorInterceptor.errorMessage(res));
        self.hideLoadingScreen();
      });
  };

/**
     * @name viewPermissions
     * @member PermissionsModule.presentationController
     * 
     */
  Permissions_PresentationController.prototype.viewPermissions = function () {
    this.fetchPermissions();
  };
	/**
     * @name showPermissionsUI
     * @member PermissionsModule.presentationController
     * @param {LoadingScreen : {focus : boolean}} viewModel
     */
  Permissions_PresentationController.prototype.showPermissionsUI = function (viewModel) {
    this.presentUserInterface('frmPermissions', viewModel);
  };


  /*
     * function to call the command handler - changePermissionStatus
     * toggle activate/deactivate 
    */
  /**
     * @name changeStatusOfPermission
     * @member PermissionsModule.presentationController
     * @param {permissionId : string, statusId : string, lblIconOptions : {text : string}, fontIconStatusImg : {skin : string}, lblDescription : string, lblNoOfRoles : string, lblNoOfUsers : string, lblPermissionName : string, lblPermissionStatus : {text : string, skin : string}, lblSeperator : string, template : string, flxOptions : {isVisible : boolean}, metainfo : undefined} segmentData
     */
  Permissions_PresentationController.prototype.changeStatusOfPermission=function(segmentData){
    var self = this;

    var updateStatusTo = null;
    if(PermissionStatusConstants.active === segmentData.statusId) {
      updateStatusTo = PermissionStatusConstants.inactive;
    } else {
      updateStatusTo = PermissionStatusConstants.active;
    }

    var params={
      "Permission_id": segmentData.permissionId,
      "Status_id": updateStatusTo
    };
    self.showLoadingScreen();

    function successCallBack(response){
      self.hideLoadingScreen();
      self.viewPermissions();
      if(response.isPreviousApprovalPending === "1"){
        self.viewModel.successMessage="statusPendingApproval";
        self.presentUserInterface("frmPermissions",self.viewModel);
      }
      else{
        if(updateStatusTo===PermissionStatusConstants.inactive){
          if(response.requestId !== undefined){
            self.viewModel.successMessage="deactivatePermission";
            self.viewModel.message=kony.i18n.getLocalizedString("i18n.deactivatedPermissions.successMessage");
            self.viewModel.requestId=response.requestId;
            self.presentUserInterface("frmPermissions",self.viewModel);
          }
          else{
            self.viewModel.successMessage="deactivePermissionWithoutApproval";
            self.viewModel.message=kony.i18n.getLocalizedString("i18n.permissionsWithoutApproval.successMessage");
            self.presentUserInterface("frmPermissions",self.viewModel);
          }
        }
        else{
          if(response.requestId !== undefined){
            self.viewModel.successMessage="activatePermission";
            self.viewModel.message=kony.i18n.getLocalizedString("i18n.activatedPermissions.successMessage");
            self.viewModel.requestId=response.requestId;
            self.presentUserInterface("frmPermissions",self.viewModel);
            self.fetchRoleList();
          }
          else{
            self.viewModel.successMessage="activePermissionWithoutApproval";
            self.viewModel.message=kony.i18n.getLocalizedString("i18n.permissionsWithoutApproval.successMessage");
            self.presentUserInterface("frmPermissions",self.viewModel);
            self.fetchRoleList();
          }
        }
      }
    }

    function failureCallback(error) {

    }

    self.businessController.changePermissionStatus(params, successCallBack, failureCallback);
  };

/**
     * @name showLoadingScreen
     * @member PermissionsModule.presentationController
     * 
     */
  Permissions_PresentationController.prototype.showLoadingScreen = function(){
    this.showPermissionsUI({"LoadingScreen":{focus:true}});
  };
  /**
     * @name hideLoadingScreen
     * @member PermissionsModule.presentationController
     * 
     */
  Permissions_PresentationController.prototype.hideLoadingScreen = function(){
    this.showPermissionsUI({"LoadingScreen":{focus:false}});
  };

	/**
     * @name updatePermission
     * @member PermissionsModule.presentationController
     * @param {permissionDetail : {id : string, Name : string, Description : string, Status_id : string}, addedTo : {rolesList : [], usersList : []}, removedFrom : {rolesList : [], usersList : []}, User_id : string} dataSet
     */
  Permissions_PresentationController.prototype.updatePermission=function(dataSet){
    var self =this;
    var params = dataSet;

    function successCallBack(response) {
      self.fetchPermissions();
      if(response.isPreviousApprovalPending === "1"){
        self.viewModel.successMessage="statusPendingApproval";
        self.presentUserInterface("frmPermissions",self.viewModel);
      }
      else{
        if(response.requestId != null || response.requestId != undefined){
          self.viewModel.successMessage = "updatePermission";
          self.viewModel.requestId = response.requestId;
          self.presentUserInterface("frmPermissions",self.viewModel);
        }
        else{
          self.viewModel.successMessage = "updatePermissionWithoutApproval";
          self.presentUserInterface("frmPermissions",self.viewModel);
        }
      }
    }

    function failureCallback(error) {

    }

    self.businessController.updatePermissions(params, successCallBack, failureCallback);
    self.showLoadingScreen();
  };

	/**
     * @name getRolesDirectlyWithPermission
     * @member PermissionsModule.presentationController
     * @param string permission_id
     * @param (roles:[{DataType_id : null, PermissionValue : string, Permission_createdby : string, Permission_createdts : string, Permission_Description : string, Permission_id : string, Permission_lastmodifiedts : string, Permission_modifiedby : null, Permission_Name : string, Permission_softdeleteflag : string, Permission_Status_id : string, Permission_synctimestamp : string, Permission_Type_id : string, Role_Description : string, Role_id : string, Role_Name : string, Role_Status_id : string, Permission_isComposite : string}])=>any callBack
     */
  Permissions_PresentationController.prototype.getRolesDirectlyWithPermission=function(permission_id,callBack){
    var self =this;
    var params={
      "id" :permission_id
    };

    function successCallBack(response){
      var data = [];
      for(var i=0;i<response.length;i++){
        if(response[i].Permission_id === params.id){
          data.push(response[i]);
        }
      }
      callBack(data);
    }

    function failureCallback(error) {

    }

    self.businessController.getRolesDirectlyWithPermissions(params, successCallBack, failureCallback);
  };

	 /**
     * @name getActiveRoles
     * @member PermissionsModule.presentationController
     * @param (roles:[{Status : string, role_Name : string, Status_id : string, role_id : string, permission_Count : string, Users_Count : string, Status_Desc : string, role_Desc : string, roleType_id : string}])=>any callBack
     */
  Permissions_PresentationController.prototype.getActiveRoles=function(callBack,formName){
    var self =this;

    var params={
      "statusid" : "SID_ACTIVE"
    };

    function successCallBack(response){
      var data = [];
      for(var i=0;i<response.roles_view.length;i++){
        if(response.roles_view[i].legalEntitiesRoleInfo){
          if(response.roles_view[i].legalEntitiesRoleInfo[0].Status_id === params.statusid){
            data.push(response.roles_view[i]);
          }
        } else{
          if(response.roles_view[i].Status_id === params.statusid){
            data.push(response.roles_view[i]);
          }
        }
      }
      callBack(data);
    }

    function failureCallback(error) {

    }

    self.businessController.getActiveRoles({}, successCallBack, failureCallback);
  };

	 /**
     * @name getUsersDirectlyWithPermission
     * @member PermissionsModule.presentationController
     * @param string permission_id
     * @param (users:[{createdby : string, createdts : string, Email : string, FirstName : string, LastName : string, MiddleName : string, Permission_Description : string, Permission_id : string, Permission_Name : string, Permission_Status_id : string, softdeleteflag : string, updatedby : string, updatedts : string, UserName : string, User_id : string, User_Status_id : string}])=>any callBack
     */
  Permissions_PresentationController.prototype.getUsersDirectlyWithPermission=function(permission_id,callBack){
    var self =this;

    var params={
      "id" :permission_id
    };

    function successCallBack(response){
      callBack(response);
    }

    function failureCallback(error) {

    }

    self.businessController.getUsersDirectlyWithPermissions(params, successCallBack, failureCallback);
  };

	/**
     * @name getActiveUsers
     * @member PermissionsModule.presentationController
     * @param (users:[{Email : string, FirstName : string, LastModifiedTimeStamp : string, LastName : string, MiddleName : string, Status_id : string, UpdatedBy : string, UserID : string, Username : string}])=>any callBack
     */
  Permissions_PresentationController.prototype.getActiveUsers=function(callBack){
    var self =this;
    var params={
      "statusid" : "SID_ACTIVE"
    };

    function successCallBack(response){
      callBack(response);
    }

    function failureCallback(error) {

    }

    self.businessController.getActiveUsers({}, successCallBack, failureCallback);
  };


  Permissions_PresentationController.prototype.downloadCSV = function(){
    var self = this; 
    var json=self.reqCSVObj;
    var fields = Object.keys(json[0]);
    var replacer = function(key, value) { return value === null ? '' : value; }; 
    var csv = json.map(function(row){
      return fields.map(function(fieldName){
        return JSON.stringify(row[fieldName], replacer);
      }).join(',');
    });
    csv.unshift(fields.join(',')); 
    var csvcontent = "data:text/csv;charset=utf-8," + csv.join('\r\n');
    var encodedUri = encodeURI(csvcontent);

    var downloadLink = document.createElement("a");
    downloadLink.href = encodedUri;
    downloadLink.download = "data.csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  return Permissions_PresentationController;
});