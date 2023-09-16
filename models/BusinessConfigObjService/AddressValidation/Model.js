define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function AddressValidation(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(AddressValidation);
	
	//Create new class level validator object
	BaseModel.Validator.call(AddressValidation);
	
	var registerValidatorBackup = AddressValidation.registerValidator;
	
	AddressValidation.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( AddressValidation.isValid(this, propName, val) ){
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
	//For Operation 'validateAddress' with service id 'AddressValidation6557'
	AddressValidation.validateAddress = function(params, onCompletion){
		return AddressValidation.customVerb('validateAddress', params, onCompletion);
	};
	
	var relations = [
	];
	
	AddressValidation.relations = relations;
	
	AddressValidation.prototype.isValid = function(){
		return AddressValidation.isValid(this);
	};
	
	AddressValidation.prototype.objModelName = "AddressValidation";
	
	return AddressValidation;
});