define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function CustomerEntitlement(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(CustomerEntitlement);
	
	//Create new class level validator object
	BaseModel.Validator.call(CustomerEntitlement);
	
	var registerValidatorBackup = CustomerEntitlement.registerValidator;
	
	CustomerEntitlement.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( CustomerEntitlement.isValid(this, propName, val) ){
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
	//For Operation 'GetAllEntitlements' with service id 'get_service8801'
	CustomerEntitlement.GetAllEntitlements = function(params, onCompletion){
		return CustomerEntitlement.customVerb('GetAllEntitlements', params, onCompletion);
	};
	//For Operation 'GetCustomerEntitlement' with service id 'GetCustomerEntitlement6638'
	CustomerEntitlement.GetCustomerEntitlement = function(params, onCompletion){
		return CustomerEntitlement.customVerb('GetCustomerEntitlement', params, onCompletion);
	};
	//For Operation 'GetIndirectEntitlements' with service id 'get_customer_indirect_permissions_view5446'
	CustomerEntitlement.GetIndirectEntitlements = function(params, onCompletion){
		return CustomerEntitlement.customVerb('GetIndirectEntitlements', params, onCompletion);
	};
	//For Operation 'EditCustomerEntitlement' with service id 'EditCustomerEntitlement7975'
	CustomerEntitlement.EditCustomerEntitlement = function(params, onCompletion){
		return CustomerEntitlement.customVerb('EditCustomerEntitlement', params, onCompletion);
	};
	
	var relations = [
	];
	
	CustomerEntitlement.relations = relations;
	
	CustomerEntitlement.prototype.isValid = function(){
		return CustomerEntitlement.isValid(this);
	};
	
	CustomerEntitlement.prototype.objModelName = "CustomerEntitlement";
	
	return CustomerEntitlement;
});