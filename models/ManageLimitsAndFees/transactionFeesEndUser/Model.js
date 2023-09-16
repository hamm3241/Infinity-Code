define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function transactionFeesEndUser(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(transactionFeesEndUser);
	
	//Create new class level validator object
	BaseModel.Validator.call(transactionFeesEndUser);
	
	var registerValidatorBackup = transactionFeesEndUser.registerValidator;
	
	transactionFeesEndUser.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( transactionFeesEndUser.isValid(this, propName, val) ){
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
	//For Operation 'fetchTransactionFeesForEndUser' with service id 'getTransactionFeesForEndUser4206'
	transactionFeesEndUser.fetchTransactionFeesForEndUser = function(params, onCompletion){
		return transactionFeesEndUser.customVerb('fetchTransactionFeesForEndUser', params, onCompletion);
	};
	
	var relations = [
	];
	
	transactionFeesEndUser.relations = relations;
	
	transactionFeesEndUser.prototype.isValid = function(){
		return transactionFeesEndUser.isValid(this);
	};
	
	transactionFeesEndUser.prototype.objModelName = "transactionFeesEndUser";
	
	return transactionFeesEndUser;
});