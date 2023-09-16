define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function CustomerGroup(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(CustomerGroup);
	
	//Create new class level validator object
	BaseModel.Validator.call(CustomerGroup);
	
	var registerValidatorBackup = CustomerGroup.registerValidator;
	
	CustomerGroup.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( CustomerGroup.isValid(this, propName, val) ){
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
	//For Operation 'GetCustomerGroup' with service id 'GetCustomerGroup6154'
	CustomerGroup.GetCustomerGroup = function(params, onCompletion){
		return CustomerGroup.customVerb('GetCustomerGroup', params, onCompletion);
	};
	//For Operation 'createCustomerGroup' with service id 'createCustomerGroup7380'
	CustomerGroup.createCustomerGroup = function(params, onCompletion){
		return CustomerGroup.customVerb('createCustomerGroup', params, onCompletion);
	};
	//For Operation 'GetAllGroups' with service id 'GetAllGroups8267'
	CustomerGroup.GetAllGroups = function(params, onCompletion){
		return CustomerGroup.customVerb('GetAllGroups', params, onCompletion);
	};
	//For Operation 'EditCustomerGroup' with service id 'EditCustomerGroup1451'
	CustomerGroup.EditCustomerGroup = function(params, onCompletion){
		return CustomerGroup.customVerb('EditCustomerGroup', params, onCompletion);
	};
	
	var relations = [
	];
	
	CustomerGroup.relations = relations;
	
	CustomerGroup.prototype.isValid = function(){
		return CustomerGroup.isValid(this);
	};
	
	CustomerGroup.prototype.objModelName = "CustomerGroup";
	
	return CustomerGroup;
});