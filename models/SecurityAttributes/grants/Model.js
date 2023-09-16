define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function grants(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(grants);
	
	//Create new class level validator object
	BaseModel.Validator.call(grants);
	
	var registerValidatorBackup = grants.registerValidator;
	
	grants.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( grants.isValid(this, propName, val) ){
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
	//For Operation 'getAllowedOperations' with service id 'getAllowedOperations1525'
	grants.getAllowedOperations = function(params, onCompletion){
		return grants.customVerb('getAllowedOperations', params, onCompletion);
	};
	
	var relations = [
	];
	
	grants.relations = relations;
	
	grants.prototype.isValid = function(){
		return grants.isValid(this);
	};
	
	grants.prototype.objModelName = "grants";
	
	return grants;
});