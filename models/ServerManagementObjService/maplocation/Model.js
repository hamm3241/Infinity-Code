define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function maplocation(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(maplocation);
	
	//Create new class level validator object
	BaseModel.Validator.call(maplocation);
	
	var registerValidatorBackup = maplocation.registerValidator;
	
	maplocation.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( maplocation.isValid(this, propName, val) ){
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
	//For Operation 'getSuggestions' with service id 'getSuggestions4238'
	maplocation.getSuggestions = function(params, onCompletion){
		return maplocation.customVerb('getSuggestions', params, onCompletion);
	};
	//For Operation 'getDetails' with service id 'getDetails5087'
	maplocation.getDetails = function(params, onCompletion){
		return maplocation.customVerb('getDetails', params, onCompletion);
	};
	
	var relations = [
	];
	
	maplocation.relations = relations;
	
	maplocation.prototype.isValid = function(){
		return maplocation.isValid(this);
	};
	
	maplocation.prototype.objModelName = "maplocation";
	
	return maplocation;
});