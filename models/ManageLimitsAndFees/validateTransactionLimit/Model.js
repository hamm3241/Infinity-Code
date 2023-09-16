define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function validateTransactionLimit(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(validateTransactionLimit);
	
	//Create new class level validator object
	BaseModel.Validator.call(validateTransactionLimit);
	
	var registerValidatorBackup = validateTransactionLimit.registerValidator;
	
	validateTransactionLimit.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( validateTransactionLimit.isValid(this, propName, val) ){
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
	//For Operation 'validate' with service id 'validateTransactionLimits5266'
	validateTransactionLimit.validate = function(params, onCompletion){
		return validateTransactionLimit.customVerb('validate', params, onCompletion);
	};
	
	var relations = [
	];
	
	validateTransactionLimit.relations = relations;
	
	validateTransactionLimit.prototype.isValid = function(){
		return validateTransactionLimit.isValid(this);
	};
	
	validateTransactionLimit.prototype.objModelName = "validateTransactionLimit";
	
	return validateTransactionLimit;
});