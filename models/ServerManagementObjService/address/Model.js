define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function address(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(address);
	
	//Create new class level validator object
	BaseModel.Validator.call(address);
	
	var registerValidatorBackup = address.registerValidator;
	
	address.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( address.isValid(this, propName, val) ){
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
	//For Operation 'validateAddress' with service id 'validateAddress1311'
	address.validateAddress = function(params, onCompletion){
		return address.customVerb('validateAddress', params, onCompletion);
	};
	
	var relations = [
	];
	
	address.relations = relations;
	
	address.prototype.isValid = function(){
		return address.isValid(this);
	};
	
	address.prototype.objModelName = "address";
	
	return address;
});