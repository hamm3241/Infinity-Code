define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function transferFeeGroup(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(transferFeeGroup);
	
	//Create new class level validator object
	BaseModel.Validator.call(transferFeeGroup);
	
	var registerValidatorBackup = transferFeeGroup.registerValidator;
	
	transferFeeGroup.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( transferFeeGroup.isValid(this, propName, val) ){
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
	//For Operation 'fetchTransferFeeUserGroup' with service id 'getTransferFeeUserGroup4167'
	transferFeeGroup.fetchTransferFeeUserGroup = function(params, onCompletion){
		return transferFeeGroup.customVerb('fetchTransferFeeUserGroup', params, onCompletion);
	};
	
	var relations = [
	];
	
	transferFeeGroup.relations = relations;
	
	transferFeeGroup.prototype.isValid = function(){
		return transferFeeGroup.isValid(this);
	};
	
	transferFeeGroup.prototype.objModelName = "transferFeeGroup";
	
	return transferFeeGroup;
});