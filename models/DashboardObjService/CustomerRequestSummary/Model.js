define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function CustomerRequestSummary(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(CustomerRequestSummary);
	
	//Create new class level validator object
	BaseModel.Validator.call(CustomerRequestSummary);
	
	var registerValidatorBackup = CustomerRequestSummary.registerValidator;
	
	CustomerRequestSummary.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( CustomerRequestSummary.isValid(this, propName, val) ){
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
	//For Operation 'getRequestSummaryCount' with service id 'getRequestSummaryCount9974'
	CustomerRequestSummary.getRequestSummaryCount = function(params, onCompletion){
		return CustomerRequestSummary.customVerb('getRequestSummaryCount', params, onCompletion);
	};
	
	var relations = [
	];
	
	CustomerRequestSummary.relations = relations;
	
	CustomerRequestSummary.prototype.isValid = function(){
		return CustomerRequestSummary.isValid(this);
	};
	
	CustomerRequestSummary.prototype.objModelName = "CustomerRequestSummary";
	
	return CustomerRequestSummary;
});