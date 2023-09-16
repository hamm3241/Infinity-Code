define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function overallPaymentLimits(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(overallPaymentLimits);
	
	//Create new class level validator object
	BaseModel.Validator.call(overallPaymentLimits);
	
	var registerValidatorBackup = overallPaymentLimits.registerValidator;
	
	overallPaymentLimits.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( overallPaymentLimits.isValid(this, propName, val) ){
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
	//For Operation 'read' with service id 'viewOverallPaymentLimits3834'
	overallPaymentLimits.read = function(params, onCompletion){
		return overallPaymentLimits.customVerb('read', params, onCompletion);
	};
	
	var relations = [
	];
	
	overallPaymentLimits.relations = relations;
	
	overallPaymentLimits.prototype.isValid = function(){
		return overallPaymentLimits.isValid(this);
	};
	
	overallPaymentLimits.prototype.objModelName = "overallPaymentLimits";
	
	return overallPaymentLimits;
});