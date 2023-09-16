define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function cardSummary(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(cardSummary);
	
	//Create new class level validator object
	BaseModel.Validator.call(cardSummary);
	
	var registerValidatorBackup = cardSummary.registerValidator;
	
	cardSummary.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( cardSummary.isValid(this, propName, val) ){
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
	//For Operation 'getCustomerCardRequestNotificationSummary' with service id 'getCustomerCardRequestNotificationSummary9157'
	cardSummary.getCustomerCardRequestNotificationSummary = function(params, onCompletion){
		return cardSummary.customVerb('getCustomerCardRequestNotificationSummary', params, onCompletion);
	};
	
	var relations = [
	];
	
	cardSummary.relations = relations;
	
	cardSummary.prototype.isValid = function(){
		return cardSummary.isValid(this);
	};
	
	cardSummary.prototype.objModelName = "cardSummary";
	
	return cardSummary;
});