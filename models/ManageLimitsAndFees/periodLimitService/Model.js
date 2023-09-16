define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function periodLimitService(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(periodLimitService);
	
	//Create new class level validator object
	BaseModel.Validator.call(periodLimitService);
	
	var registerValidatorBackup = periodLimitService.registerValidator;
	
	periodLimitService.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( periodLimitService.isValid(this, propName, val) ){
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
	//For Operation 'fetchServicePeriodicLimitsView' with service id 'getPeriodicLimitsFromServiceView4955'
	periodLimitService.fetchServicePeriodicLimitsView = function(params, onCompletion){
		return periodLimitService.customVerb('fetchServicePeriodicLimitsView', params, onCompletion);
	};
	
	var relations = [
	];
	
	periodLimitService.relations = relations;
	
	periodLimitService.prototype.isValid = function(){
		return periodLimitService.isValid(this);
	};
	
	periodLimitService.prototype.objModelName = "periodLimitService";
	
	return periodLimitService;
});