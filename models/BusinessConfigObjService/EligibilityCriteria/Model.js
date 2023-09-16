define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function EligibilityCriteria(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(EligibilityCriteria);
	
	//Create new class level validator object
	BaseModel.Validator.call(EligibilityCriteria);
	
	var registerValidatorBackup = EligibilityCriteria.registerValidator;
	
	EligibilityCriteria.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( EligibilityCriteria.isValid(this, propName, val) ){
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
	//For Operation 'getEligibilityCriteria' with service id 'get_eligibilitycriteria4800'
	EligibilityCriteria.getEligibilityCriteria = function(params, onCompletion){
		return EligibilityCriteria.customVerb('getEligibilityCriteria', params, onCompletion);
	};
	//For Operation 'addEligibilityCriteria' with service id 'addEligibilityCriteria5582'
	EligibilityCriteria.addEligibilityCriteria = function(params, onCompletion){
		return EligibilityCriteria.customVerb('addEligibilityCriteria', params, onCompletion);
	};
	//For Operation 'editEligibilityCriteria' with service id 'editEligibilityCriteria1276'
	EligibilityCriteria.editEligibilityCriteria = function(params, onCompletion){
		return EligibilityCriteria.customVerb('editEligibilityCriteria', params, onCompletion);
	};
	//For Operation 'deleteEligibilityCriteria' with service id 'deleteEligibilityCriteria7366'
	EligibilityCriteria.deleteEligibilityCriteria = function(params, onCompletion){
		return EligibilityCriteria.customVerb('deleteEligibilityCriteria', params, onCompletion);
	};
	
	var relations = [
	];
	
	EligibilityCriteria.relations = relations;
	
	EligibilityCriteria.prototype.isValid = function(){
		return EligibilityCriteria.isValid(this);
	};
	
	EligibilityCriteria.prototype.objModelName = "EligibilityCriteria";
	
	return EligibilityCriteria;
});