define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function systemconfiguration(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(systemconfiguration);
	
	//Create new class level validator object
	BaseModel.Validator.call(systemconfiguration);
	
	var registerValidatorBackup = systemconfiguration.registerValidator;
	
	systemconfiguration.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( systemconfiguration.isValid(this, propName, val) ){
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
	//For Operation 'getSystemConfiguration' with service id 'get_systemconfiguration7161'
	systemconfiguration.getSystemConfiguration = function(params, onCompletion){
		return systemconfiguration.customVerb('getSystemConfiguration', params, onCompletion);
	};
	//For Operation 'updateSystemConfiguration' with service id 'updateSystemConfigurationService1319'
	systemconfiguration.updateSystemConfiguration = function(params, onCompletion){
		return systemconfiguration.customVerb('updateSystemConfiguration', params, onCompletion);
	};
	
	var relations = [
	];
	
	systemconfiguration.relations = relations;
	
	systemconfiguration.prototype.isValid = function(){
		return systemconfiguration.isValid(this);
	};
	
	systemconfiguration.prototype.objModelName = "systemconfiguration";
	
	return systemconfiguration;
});