define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function card(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(card);
	
	//Create new class level validator object
	BaseModel.Validator.call(card);
	
	var registerValidatorBackup = card.registerValidator;
	
	card.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( card.isValid(this, propName, val) ){
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
	//For Operation 'getCustomerCards' with service id 'getCustomerCards9045'
	card.getCustomerCards = function(params, onCompletion){
		return card.customVerb('getCustomerCards', params, onCompletion);
	};
	//For Operation 'updateCustomerCard' with service id 'updateCustomerCard4790'
	card.updateCustomerCard = function(params, onCompletion){
		return card.customVerb('updateCustomerCard', params, onCompletion);
	};
	
	var relations = [
	];
	
	card.relations = relations;
	
	card.prototype.isValid = function(){
		return card.isValid(this);
	};
	
	card.prototype.objModelName = "card";
	
	return card;
});