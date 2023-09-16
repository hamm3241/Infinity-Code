define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function IdType(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(IdType);
	
	//Create new class level validator object
	BaseModel.Validator.call(IdType);
	
	var registerValidatorBackup = IdType.registerValidator;
	
	IdType.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( IdType.isValid(this, propName, val) ){
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
	//For Operation 'getIdTypes' with service id 'get_idtype4093'
	IdType.getIdTypes = function(params, onCompletion){
		return IdType.customVerb('getIdTypes', params, onCompletion);
	};
	
	var relations = [
	];
	
	IdType.relations = relations;
	
	IdType.prototype.isValid = function(){
		return IdType.isValid(this);
	};
	
	IdType.prototype.objModelName = "IdType";
	
	return IdType;
});