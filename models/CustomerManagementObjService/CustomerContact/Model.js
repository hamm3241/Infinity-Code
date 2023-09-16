define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function CustomerContact(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(CustomerContact);
	
	//Create new class level validator object
	BaseModel.Validator.call(CustomerContact);
	
	var registerValidatorBackup = CustomerContact.registerValidator;
	
	CustomerContact.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( CustomerContact.isValid(this, propName, val) ){
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
	//For Operation 'GetCustomerContact' with service id 'GetCustomerContactInfo2579'
	CustomerContact.GetCustomerContact = function(params, onCompletion){
		return CustomerContact.customVerb('GetCustomerContact', params, onCompletion);
	};
	//For Operation 'EditCustomerContact' with service id 'EditCustomerContactInfo4251'
	CustomerContact.EditCustomerContact = function(params, onCompletion){
		return CustomerContact.customVerb('EditCustomerContact', params, onCompletion);
	};
	
	var relations = [
	];
	
	CustomerContact.relations = relations;
	
	CustomerContact.prototype.isValid = function(){
		return CustomerContact.isValid(this);
	};
	
	CustomerContact.prototype.objModelName = "CustomerContact";
	
	return CustomerContact;
});