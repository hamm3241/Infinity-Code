define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function OnboardingTermsAndConditions(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(OnboardingTermsAndConditions);
	
	//Create new class level validator object
	BaseModel.Validator.call(OnboardingTermsAndConditions);
	
	var registerValidatorBackup = OnboardingTermsAndConditions.registerValidator;
	
	OnboardingTermsAndConditions.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( OnboardingTermsAndConditions.isValid(this, propName, val) ){
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
	//For Operation 'getOnboardingTermsAndConditions' with service id 'get_onboardingtermsandconditions2929'
	OnboardingTermsAndConditions.getOnboardingTermsAndConditions = function(params, onCompletion){
		return OnboardingTermsAndConditions.customVerb('getOnboardingTermsAndConditions', params, onCompletion);
	};
	
	var relations = [
	];
	
	OnboardingTermsAndConditions.relations = relations;
	
	OnboardingTermsAndConditions.prototype.isValid = function(){
		return OnboardingTermsAndConditions.isValid(this);
	};
	
	OnboardingTermsAndConditions.prototype.objModelName = "OnboardingTermsAndConditions";
	
	return OnboardingTermsAndConditions;
});