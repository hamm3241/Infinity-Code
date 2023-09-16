define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function Applicant(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(Applicant);
	
	//Create new class level validator object
	BaseModel.Validator.call(Applicant);
	
	var registerValidatorBackup = Applicant.registerValidator;
	
	Applicant.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( Applicant.isValid(this, propName, val) ){
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
	//For Operation 'createApplicantAO' with service id 'createApplicantViaAssistedOnboarding4284'
	Applicant.createApplicantAO = function(params, onCompletion){
		return Applicant.customVerb('createApplicantAO', params, onCompletion);
	};
	//For Operation 'getApplicantStatus' with service id 'getApplicantStatus3171'
	Applicant.getApplicantStatus = function(params, onCompletion){
		return Applicant.customVerb('getApplicantStatus', params, onCompletion);
	};
	//For Operation 'deleteApplicant' with service id 'deleteApplicant6232'
	Applicant.deleteApplicant = function(params, onCompletion){
		return Applicant.customVerb('deleteApplicant', params, onCompletion);
	};
	//For Operation 'createApplicantViaAssistedOnboarding' with service id 'createApplicantViaAssistedOnboarding3503'
	Applicant.createApplicantViaAssistedOnboarding = function(params, onCompletion){
		return Applicant.customVerb('createApplicantViaAssistedOnboarding', params, onCompletion);
	};
	//For Operation 'createApplicant' with service id 'createApplicant9796'
	Applicant.createApplicant = function(params, onCompletion){
		return Applicant.customVerb('createApplicant', params, onCompletion);
	};
	
	var relations = [
	];
	
	Applicant.relations = relations;
	
	Applicant.prototype.isValid = function(){
		return Applicant.isValid(this);
	};
	
	Applicant.prototype.objModelName = "Applicant";
	
	return Applicant;
});