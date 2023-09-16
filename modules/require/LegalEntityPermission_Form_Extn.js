define(function () {
  var formPermissionMapper ={
    frmContractSearch: {
      VIEW: {"name":"ViewContract"}
    },
    frmContractCreate:{
      CREATE:{"name":"CreateContract"}
    },
    frmCompanies:{
     UPDATE:{"name":"UpdateContract"}
    },
    frmUsers:{
      VIEW: {"name":"ViewUser"},
      CREATE: {"name":"CreateUser"},
      UPDATE: {"name":"UpdateUser"}
    },
    frmEnrollCustomer: {
      VIEW: {"name":"ViewEnrollCustomer"},
      UPDATE:{"name":"UpdateEnrollCustomer"},
      CREATE:{"name":"CreateEnrollCustomer"},
    },
    frmCustomerManagement: {
      VIEW: {"name":"ViewCustomer"},
      UPDATE:{"name":"UpdateCustomer"},
      CREATE:{"name":"CreateCustomer"},
      CSR_ASSIST:{"name":"CSRAssist"}
    }, 
    frmRoles:{
      VIEW: {"name":"ViewRoles"},
      CREATE: {"name":"CreateRoles"},
      UPDATE: {"name":"UpdateRoles"},
      UPDATE_STATUS:{"name":"ModifyRoleStatus"}
    },
    frmServiceManagement: {
      VIEW: {"name": "ViewFeatureConfig" },
      UPDATE: {"name": "UpdateFeatureConfig" },
    },
    frmGroups: {
      VIEW: { "name": "ViewGroup" },
      CREATE: { "name": "CreateGroup" },
      UPDATE: { "name": "UpdateGroup" },
      MODIFY: { "name": "ModifyGroupStatus" }
    },
    frmServiceDefinition: {
      VIEW: { "name": "ViewServiceDefinition" },
      UPDATE: { "name": "UpdateServiceDefinition" },
      CREATE: { "name": "CreateServiceDefinition" },
      DELETE:{"name":"DeleteServiceDefinition"}
    },
    frmAlertsManagement:{
      VIEW : {"name": "ViewAlerts"},
      CREATE: {"name": "CreateAlerts"},
      UPDATE: {"name": "UpdateAlerts"},
      VIEW_CONTENT: {"name":"ViewAppContent"}
    }
  };
  var legalEntityPermissions = {};
  var allLegalEntityArr = [];
  var allLegalEntityObj = {};
  /** set Legal entity-permissions mapping data **/
  function setAllLEPermissions(LEPermissions){
    legalEntityPermissions = LEPermissions;
  }
  function getAllLEPermissions(){
    return legalEntityPermissions;
  }
  /** set all legal entity master data **/
  function setAllLEList(LeList){
    var LEData = {};
    for(let i=0; i <LeList.length; i++){
      LEData[LeList[i].id] = LeList[i];
    }
    allLegalEntityArr = LeList;
    allLegalEntityObj = LEData;
    
  }
  function getAllLEListArr() {
    return allLegalEntityArr;
  }
  function getAllLEListObj() {
    return allLegalEntityObj;
  }
  /*
  * get permissions of specific legal entity
  * @param: legalentity id
  */
  function getPermissionsOfLE(LEId){
    if(LEId){
      return (legalEntityPermissions[LEId] || []);
    }else{
      return [];
    }

  }
  /*
  * get legalentity list based on action for access control
  * @param: form id, categroy(as defined in formPermissionMapper for respective form)
  */
  function getLEListForFormAction(formId, category){
    var currentFormConfig = formPermissionMapper[formId];
    var permissionToCheck = currentFormConfig[category] || "";
    var entityKey = Object.keys(legalEntityPermissions);
    var eligibleLEList = [];
    for(let i=0; i<entityKey.length; i++){
      var permissionsList = legalEntityPermissions[entityKey[i]];
      if(permissionsList.includes(permissionToCheck.name)){
        var currLeDataObj = allLegalEntityObj[entityKey[i]];
        if(currLeDataObj){
          eligibleLEList.push(currLeDataObj);
        }
      }
    }
    return eligibleLEList;
  }
  function getCurrentUserLEArr(){
    var userLEList =[];
     var userLEId = kony.mvc.MDAApplication.getSharedInstance().appContext.legalEntityId;
	      for(let i=0; i<userLEId.length; i++){
            if(userLEId[i]==='ALL'){
               userLEList = allLegalEntityArr;
              break;
            }
            else{
        if(allLegalEntityObj[userLEId[i]]){
        userLEList.push(allLegalEntityObj[userLEId[i]]);
        }
      }
     }
     return userLEList;
  }

  function getLEDesc(LEId){
    var userLEDesc =[];
     if(LEId==="ALL")
       {
         userLEDesc = allLegalEntityArr;
       }
    else{
      if(allLegalEntityObj[LEId]){
        userLEDesc.push(allLegalEntityObj[LEId]);
      }
    }
     return userLEDesc;
  }
  
  return {
    setAllLEList: setAllLEList,
    setAllLEPermissions: setAllLEPermissions,
    getAllLEPermissionsfunction :getAllLEPermissions,
    getPermissionsOfLE: getPermissionsOfLE,
    getLEListForFormAction: getLEListForFormAction,
    getAllLEListArr: getAllLEListArr,
    getAllLEListObj: getAllLEListObj,
    getCurrentUserLEArr: getCurrentUserLEArr,
    getLEDesc: getLEDesc
  };
});
