define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function DMSUser(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(DMSUser);
	
	//Create new class level validator object
	BaseModel.Validator.call(DMSUser);
	
	var registerValidatorBackup = DMSUser.registerValidator;
	
	DMSUser.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( DMSUser.isValid(this, propName, val) ){
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
	//For Operation 'createUser' with service id 'createDMSUser3721'
	DMSUser.createUser = function(params, onCompletion){
		return DMSUser.customVerb('createUser', params, onCompletion);
	};
	
	var relations = [
	];
	
	DMSUser.relations = relations;
	
	DMSUser.prototype.isValid = function(){
		return DMSUser.isValid(this);
	};
	
	DMSUser.prototype.objModelName = "DMSUser";
	
	return DMSUser;
});