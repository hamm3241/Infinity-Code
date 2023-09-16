define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function periodLimitEndUser(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(periodLimitEndUser);
	
	//Create new class level validator object
	BaseModel.Validator.call(periodLimitEndUser);
	
	var registerValidatorBackup = periodLimitEndUser.registerValidator;
	
	periodLimitEndUser.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( periodLimitEndUser.isValid(this, propName, val) ){
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
	//For Operation 'fetchPeriodicLimitForEndUser' with service id 'getPeriodicLimitForEndUser1251'
	periodLimitEndUser.fetchPeriodicLimitForEndUser = function(params, onCompletion){
		return periodLimitEndUser.customVerb('fetchPeriodicLimitForEndUser', params, onCompletion);
	};
	
	var relations = [
	];
	
	periodLimitEndUser.relations = relations;
	
	periodLimitEndUser.prototype.isValid = function(){
		return periodLimitEndUser.isValid(this);
	};
	
	periodLimitEndUser.prototype.objModelName = "periodLimitEndUser";
	
	return periodLimitEndUser;
});