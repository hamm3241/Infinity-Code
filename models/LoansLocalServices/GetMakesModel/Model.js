define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function GetMakesModel(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(GetMakesModel);
	
	//Create new class level validator object
	BaseModel.Validator.call(GetMakesModel);
	
	var registerValidatorBackup = GetMakesModel.registerValidator;
	
	GetMakesModel.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( GetMakesModel.isValid(this, propName, val) ){
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
	//For Operation 'GetMakesByVehicleType' with service id 'GetMakesByVehicleType8892'
	GetMakesModel.GetMakesByVehicleType = function(params, onCompletion){
		return GetMakesModel.customVerb('GetMakesByVehicleType', params, onCompletion);
	};
	//For Operation 'GetModelByMakes' with service id 'GetModelByMakes9243'
	GetMakesModel.GetModelByMakes = function(params, onCompletion){
		return GetMakesModel.customVerb('GetModelByMakes', params, onCompletion);
	};
	
	var relations = [
	];
	
	GetMakesModel.relations = relations;
	
	GetMakesModel.prototype.isValid = function(){
		return GetMakesModel.isValid(this);
	};
	
	GetMakesModel.prototype.objModelName = "GetMakesModel";
	
	return GetMakesModel;
});