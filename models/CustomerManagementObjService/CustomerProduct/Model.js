define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function CustomerProduct(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(CustomerProduct);
	
	//Create new class level validator object
	BaseModel.Validator.call(CustomerProduct);
	
	var registerValidatorBackup = CustomerProduct.registerValidator;
	
	CustomerProduct.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( CustomerProduct.isValid(this, propName, val) ){
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
	//For Operation 'GetCustomerProducts' with service id 'GetCustomerProducts5310'
	CustomerProduct.GetCustomerProducts = function(params, onCompletion){
		return CustomerProduct.customVerb('GetCustomerProducts', params, onCompletion);
	};
	//For Operation 'GetAllProducts' with service id 'get_product3611'
	CustomerProduct.GetAllProducts = function(params, onCompletion){
		return CustomerProduct.customVerb('GetAllProducts', params, onCompletion);
	};
	//For Operation 'GetAccountSpecificAlerts' with service id 'GetAccountSpecificAlerts9991'
	CustomerProduct.GetAccountSpecificAlerts = function(params, onCompletion){
		return CustomerProduct.customVerb('GetAccountSpecificAlerts', params, onCompletion);
	};
	//For Operation 'updateEstatementStatus' with service id 'updateEstatementStatus1504'
	CustomerProduct.updateEstatementStatus = function(params, onCompletion){
		return CustomerProduct.customVerb('updateEstatementStatus', params, onCompletion);
	};
	
	var relations = [
	];
	
	CustomerProduct.relations = relations;
	
	CustomerProduct.prototype.isValid = function(){
		return CustomerProduct.isValid(this);
	};
	
	CustomerProduct.prototype.objModelName = "CustomerProduct";
	
	return CustomerProduct;
});