define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function CustomerSecurityQuestions(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(CustomerSecurityQuestions);
	
	//Create new class level validator object
	BaseModel.Validator.call(CustomerSecurityQuestions);
	
	var registerValidatorBackup = CustomerSecurityQuestions.registerValidator;
	
	CustomerSecurityQuestions.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( CustomerSecurityQuestions.isValid(this, propName, val) ){
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
	//For Operation 'verifyCustomerSecurityQuestions' with service id 'verifyCustomerSecurityQuestions9039'
	CustomerSecurityQuestions.verifyCustomerSecurityQuestions = function(params, onCompletion){
		return CustomerSecurityQuestions.customVerb('verifyCustomerSecurityQuestions', params, onCompletion);
	};
	//For Operation 'fetchRandomSecurityQuestions' with service id 'getRandomCustomerSecurityQuestion6014'
	CustomerSecurityQuestions.fetchRandomSecurityQuestions = function(params, onCompletion){
		return CustomerSecurityQuestions.customVerb('fetchRandomSecurityQuestions', params, onCompletion);
	};
	//For Operation 'createCustomerSecurityQuestions' with service id 'createCustomerSecurityQuestions9416'
	CustomerSecurityQuestions.createCustomerSecurityQuestions = function(params, onCompletion){
		return CustomerSecurityQuestions.customVerb('createCustomerSecurityQuestions', params, onCompletion);
	};
	
	var relations = [
	];
	
	CustomerSecurityQuestions.relations = relations;
	
	CustomerSecurityQuestions.prototype.isValid = function(){
		return CustomerSecurityQuestions.isValid(this);
	};
	
	CustomerSecurityQuestions.prototype.objModelName = "CustomerSecurityQuestions";
	
	return CustomerSecurityQuestions;
});