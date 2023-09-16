define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function permissions(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(permissions);
	
	//Create new class level validator object
	BaseModel.Validator.call(permissions);
	
	var registerValidatorBackup = permissions.registerValidator;
	
	permissions.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( permissions.isValid(this, propName, val) ){
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
	//For Operation 'getGrantedPermissions' with service id 'getGrantedPermissions3156'
	permissions.getGrantedPermissions = function(params, onCompletion){
		return permissions.customVerb('getGrantedPermissions', params, onCompletion);
	};
	
	var relations = [
	];
	
	permissions.relations = relations;
	
	permissions.prototype.isValid = function(){
		return permissions.isValid(this);
	};
	
	permissions.prototype.objModelName = "permissions";
	
	return permissions;
});