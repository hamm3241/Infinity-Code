define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function transferFeeService(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(transferFeeService);
	
	//Create new class level validator object
	BaseModel.Validator.call(transferFeeService);
	
	var registerValidatorBackup = transferFeeService.registerValidator;
	
	transferFeeService.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( transferFeeService.isValid(this, propName, val) ){
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
	//For Operation 'getTransferFeeService' with service id 'getTransferFeeService6859'
	transferFeeService.getTransferFeeService = function(params, onCompletion){
		return transferFeeService.customVerb('getTransferFeeService', params, onCompletion);
	};
	
	var relations = [
	];
	
	transferFeeService.relations = relations;
	
	transferFeeService.prototype.isValid = function(){
		return transferFeeService.isValid(this);
	};
	
	transferFeeService.prototype.objModelName = "transferFeeService";
	
	return transferFeeService;
});