define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function CustomerNotification(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(CustomerNotification);
	
	//Create new class level validator object
	BaseModel.Validator.call(CustomerNotification);
	
	var registerValidatorBackup = CustomerNotification.registerValidator;
	
	CustomerNotification.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( CustomerNotification.isValid(this, propName, val) ){
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
	//For Operation 'GetNotifications' with service id 'GetNotifications1005'
	CustomerNotification.GetNotifications = function(params, onCompletion){
		return CustomerNotification.customVerb('GetNotifications', params, onCompletion);
	};
	
	var relations = [
	];
	
	CustomerNotification.relations = relations;
	
	CustomerNotification.prototype.isValid = function(){
		return CustomerNotification.isValid(this);
	};
	
	CustomerNotification.prototype.objModelName = "CustomerNotification";
	
	return CustomerNotification;
});