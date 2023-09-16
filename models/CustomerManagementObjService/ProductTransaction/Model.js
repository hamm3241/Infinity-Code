define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function ProductTransaction(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(ProductTransaction);
	
	//Create new class level validator object
	BaseModel.Validator.call(ProductTransaction);
	
	var registerValidatorBackup = ProductTransaction.registerValidator;
	
	ProductTransaction.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( ProductTransaction.isValid(this, propName, val) ){
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
	//For Operation 'GetCustomerTransactions' with service id 'GetCustomerTransactions3165'
	ProductTransaction.GetCustomerTransactions = function(params, onCompletion){
		return ProductTransaction.customVerb('GetCustomerTransactions', params, onCompletion);
	};
	
	var relations = [
	];
	
	ProductTransaction.relations = relations;
	
	ProductTransaction.prototype.isValid = function(){
		return ProductTransaction.isValid(this);
	};
	
	ProductTransaction.prototype.objModelName = "ProductTransaction";
	
	return ProductTransaction;
});