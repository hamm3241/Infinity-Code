define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function CardRequests(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(CardRequests);
	
	//Create new class level validator object
	BaseModel.Validator.call(CardRequests);
	
	var registerValidatorBackup = CardRequests.registerValidator;
	
	CardRequests.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( CardRequests.isValid(this, propName, val) ){
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
	//For Operation 'createCardRequest' with service id 'createCardRequest9983'
	CardRequests.createCardRequest = function(params, onCompletion){
		return CardRequests.customVerb('createCardRequest', params, onCompletion);
	};
	//For Operation 'getCardRequests' with service id 'getCardRequests7225'
	CardRequests.getCardRequests = function(params, onCompletion){
		return CardRequests.customVerb('getCardRequests', params, onCompletion);
	};
	
	var relations = [
	];
	
	CardRequests.relations = relations;
	
	CardRequests.prototype.isValid = function(){
		return CardRequests.isValid(this);
	};
	
	CardRequests.prototype.objModelName = "CardRequests";
	
	return CardRequests;
});