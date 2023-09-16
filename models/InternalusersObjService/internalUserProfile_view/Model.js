define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function internalUserProfile_view(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(internalUserProfile_view);
	
	//Create new class level validator object
	BaseModel.Validator.call(internalUserProfile_view);
	
	var registerValidatorBackup = internalUserProfile_view.registerValidator;
	
	internalUserProfile_view.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( internalUserProfile_view.isValid(this, propName, val) ){
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
	//For Operation 'GetUserProfile' with service id 'getUserProfile3307'
	internalUserProfile_view.GetUserProfile = function(params, onCompletion){
		return internalUserProfile_view.customVerb('GetUserProfile', params, onCompletion);
	};
	
	var relations = [
	];
	
	internalUserProfile_view.relations = relations;
	
	internalUserProfile_view.prototype.isValid = function(){
		return internalUserProfile_view.isValid(this);
	};
	
	internalUserProfile_view.prototype.objModelName = "internalUserProfile_view";
	
	return internalUserProfile_view;
});