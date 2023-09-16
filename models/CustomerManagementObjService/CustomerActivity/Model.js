define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function CustomerActivity(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(CustomerActivity);
	
	//Create new class level validator object
	BaseModel.Validator.call(CustomerActivity);
	
	var registerValidatorBackup = CustomerActivity.registerValidator;
	
	CustomerActivity.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( CustomerActivity.isValid(this, propName, val) ){
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
	//For Operation 'getLastNCustomerSessions' with service id 'getLastNCustomerSessions3721'
	CustomerActivity.getLastNCustomerSessions = function(params, onCompletion){
		return CustomerActivity.customVerb('getLastNCustomerSessions', params, onCompletion);
	};
	//For Operation 'getAllActivitiesInACustomerSession' with service id 'getAllActivitiesInACustomerSession8287'
	CustomerActivity.getAllActivitiesInACustomerSession = function(params, onCompletion){
		return CustomerActivity.customVerb('getAllActivitiesInACustomerSession', params, onCompletion);
	};
	
	var relations = [
	];
	
	CustomerActivity.relations = relations;
	
	CustomerActivity.prototype.isValid = function(){
		return CustomerActivity.isValid(this);
	};
	
	CustomerActivity.prototype.objModelName = "CustomerActivity";
	
	return CustomerActivity;
});