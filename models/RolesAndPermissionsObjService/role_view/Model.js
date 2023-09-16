define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		permission_Count : function(val, state){
			state['permission_Count'] = val;
		},
		roleType_id : function(val, state){
			state['roleType_id'] = val;
		},
		role_Desc : function(val, state){
			state['role_Desc'] = val;
		},
		role_id : function(val, state){
			state['role_id'] = val;
		},
		role_Name : function(val, state){
			state['role_Name'] = val;
		},
		Status_Desc : function(val, state){
			state['Status_Desc'] = val;
		},
		Status_id : function(val, state){
			state['Status_id'] = val;
		},
		Users_Count : function(val, state){
			state['Users_Count'] = val;
		},
	};
	
	
	//Create the Model Class
	function role_view(defaultValues){
		var privateState = {};
			privateState.permission_Count = defaultValues?(defaultValues["permission_Count"]?defaultValues["permission_Count"]:null):null;
			privateState.roleType_id = defaultValues?(defaultValues["roleType_id"]?defaultValues["roleType_id"]:null):null;
			privateState.role_Desc = defaultValues?(defaultValues["role_Desc"]?defaultValues["role_Desc"]:null):null;
			privateState.role_id = defaultValues?(defaultValues["role_id"]?defaultValues["role_id"]:null):null;
			privateState.role_Name = defaultValues?(defaultValues["role_Name"]?defaultValues["role_Name"]:null):null;
			privateState.Status_Desc = defaultValues?(defaultValues["Status_Desc"]?defaultValues["Status_Desc"]:null):null;
			privateState.Status_id = defaultValues?(defaultValues["Status_id"]?defaultValues["Status_id"]:null):null;
			privateState.Users_Count = defaultValues?(defaultValues["Users_Count"]?defaultValues["Users_Count"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"permission_Count" : {
					get : function(){return privateState.permission_Count},
					set : function(val){
						setterFunctions['permission_Count'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"roleType_id" : {
					get : function(){return privateState.roleType_id},
					set : function(val){
						setterFunctions['roleType_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"role_Desc" : {
					get : function(){return privateState.role_Desc},
					set : function(val){
						setterFunctions['role_Desc'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"role_id" : {
					get : function(){return privateState.role_id},
					set : function(val){
						setterFunctions['role_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"role_Name" : {
					get : function(){return privateState.role_Name},
					set : function(val){
						setterFunctions['role_Name'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Status_Desc" : {
					get : function(){return privateState.Status_Desc},
					set : function(val){
						setterFunctions['Status_Desc'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Status_id" : {
					get : function(){return privateState.Status_id},
					set : function(val){
						setterFunctions['Status_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Users_Count" : {
					get : function(){return privateState.Users_Count},
					set : function(val){
						setterFunctions['Users_Count'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(role_view);
	
	//Create new class level validator object
	BaseModel.Validator.call(role_view);
	
	var registerValidatorBackup = role_view.registerValidator;
	
	role_view.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( role_view.isValid(this, propName, val) ){
					return setterBackup.apply(null, arguments);
				}else{
					throw Error("Validation failed for "+ propName +" : "+val);
				}
			}
			setterFunctions[arguments[0]].changed = true;
		}
		return registerValidatorBackup.apply(null, arguments);
	}
	
	//Extending Model for custom operations
	//For Operation 'downloadRolesList' with service id 'downloadRolesList4209'
	role_view.downloadRolesList = function(params, onCompletion){
		return role_view.customVerb('downloadRolesList', params, onCompletion);
	};
	//For Operation 'getRoleList' with service id 'get_roles_view2023'
	role_view.getRoleList = function(params, onCompletion){
		return role_view.customVerb('getRoleList', params, onCompletion);
	};
	
	var relations = [
	];
	
	role_view.relations = relations;
	
	role_view.prototype.isValid = function(){
		return role_view.isValid(this);
	};
	
	role_view.prototype.objModelName = "role_view";
	
	return role_view;
});