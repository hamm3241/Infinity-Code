define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function DirectAndIndirectPermissionUsers(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(DirectAndIndirectPermissionUsers);
	
	//Create new class level validator object
	BaseModel.Validator.call(DirectAndIndirectPermissionUsers);
	
	var registerValidatorBackup = DirectAndIndirectPermissionUsers.registerValidator;
	
	DirectAndIndirectPermissionUsers.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( DirectAndIndirectPermissionUsers.isValid(this, propName, val) ){
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
	//For Operation 'getAllUsers' with service id 'get_systemuser_permissions_view8163'
	DirectAndIndirectPermissionUsers.getAllUsers = function(params, onCompletion){
		return DirectAndIndirectPermissionUsers.customVerb('getAllUsers', params, onCompletion);
	};
	
	var relations = [
	];
	
	DirectAndIndirectPermissionUsers.relations = relations;
	
	DirectAndIndirectPermissionUsers.prototype.isValid = function(){
		return DirectAndIndirectPermissionUsers.isValid(this);
	};
	
	DirectAndIndirectPermissionUsers.prototype.objModelName = "DirectAndIndirectPermissionUsers";
	
	return DirectAndIndirectPermissionUsers;
});