define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function LogView(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(LogView);
	
	//Create new class level validator object
	BaseModel.Validator.call(LogView);
	
	var registerValidatorBackup = LogView.registerValidator;
	
	LogView.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( LogView.isValid(this, propName, val) ){
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
	//For Operation 'deleteFilter' with service id 'deleteFilter8127'
	LogView.deleteFilter = function(params, onCompletion){
		return LogView.customVerb('deleteFilter', params, onCompletion);
	};
	//For Operation 'getFilters' with service id 'getFilters7294'
	LogView.getFilters = function(params, onCompletion){
		return LogView.customVerb('getFilters', params, onCompletion);
	};
	//For Operation 'createFilter' with service id 'createFilter1418'
	LogView.createFilter = function(params, onCompletion){
		return LogView.customVerb('createFilter', params, onCompletion);
	};
	
	var relations = [
	];
	
	LogView.relations = relations;
	
	LogView.prototype.isValid = function(){
		return LogView.isValid(this);
	};
	
	LogView.prototype.objModelName = "LogView";
	
	return LogView;
});