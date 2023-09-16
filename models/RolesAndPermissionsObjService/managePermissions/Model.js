define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		AssignedTo : function(val, state){
			state['AssignedTo'] = val;
		},
		Permission_Details : function(val, state){
			state['Permission_Details'] = val;
		},
		RemovedFrom : function(val, state){
			state['RemovedFrom'] = val;
		},
		User_id : function(val, state){
			state['User_id'] = val;
		},
	};
	
	
	//Create the Model Class
	function managePermissions(defaultValues){
		var privateState = {};
			privateState.AssignedTo = defaultValues?(defaultValues["AssignedTo"]?defaultValues["AssignedTo"]:null):null;
			privateState.Permission_Details = defaultValues?(defaultValues["Permission_Details"]?defaultValues["Permission_Details"]:null):null;
			privateState.RemovedFrom = defaultValues?(defaultValues["RemovedFrom"]?defaultValues["RemovedFrom"]:null):null;
			privateState.User_id = defaultValues?(defaultValues["User_id"]?defaultValues["User_id"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"AssignedTo" : {
					get : function(){return privateState.AssignedTo},
					set : function(val){
						setterFunctions['AssignedTo'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Permission_Details" : {
					get : function(){return privateState.Permission_Details},
					set : function(val){
						setterFunctions['Permission_Details'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"RemovedFrom" : {
					get : function(){return privateState.RemovedFrom},
					set : function(val){
						setterFunctions['RemovedFrom'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"User_id" : {
					get : function(){return privateState.User_id},
					set : function(val){
						setterFunctions['User_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(managePermissions);
	
	//Create new class level validator object
	BaseModel.Validator.call(managePermissions);
	
	var registerValidatorBackup = managePermissions.registerValidator;
	
	managePermissions.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( managePermissions.isValid(this, propName, val) ){
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
	//For Operation 'updatePermission' with service id 'managePermission8225'
	managePermissions.updatePermission = function(params, onCompletion){
		return managePermissions.customVerb('updatePermission', params, onCompletion);
	};
	
	var relations = [
	];
	
	managePermissions.relations = relations;
	
	managePermissions.prototype.isValid = function(){
		return managePermissions.isValid(this);
	};
	
	managePermissions.prototype.objModelName = "managePermissions";
	
	return managePermissions;
});