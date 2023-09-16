define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function periodLimitUserGroup(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(periodLimitUserGroup);
	
	//Create new class level validator object
	BaseModel.Validator.call(periodLimitUserGroup);
	
	var registerValidatorBackup = periodLimitUserGroup.registerValidator;
	
	periodLimitUserGroup.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( periodLimitUserGroup.isValid(this, propName, val) ){
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
	//For Operation 'read' with service id 'getPeriodicLimitForUserGroup6845'
	periodLimitUserGroup.read = function(params, onCompletion){
		return periodLimitUserGroup.customVerb('read', params, onCompletion);
	};
	
	var relations = [
	];
	
	periodLimitUserGroup.relations = relations;
	
	periodLimitUserGroup.prototype.isValid = function(){
		return periodLimitUserGroup.isValid(this);
	};
	
	periodLimitUserGroup.prototype.objModelName = "periodLimitUserGroup";
	
	return periodLimitUserGroup;
});