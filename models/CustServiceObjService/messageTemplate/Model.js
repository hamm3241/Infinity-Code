define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function messageTemplate(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(messageTemplate);
	
	//Create new class level validator object
	BaseModel.Validator.call(messageTemplate);
	
	var registerValidatorBackup = messageTemplate.registerValidator;
	
	messageTemplate.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( messageTemplate.isValid(this, propName, val) ){
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
	//For Operation 'deleteMessageTemplate' with service id 'deleteMessageTemplate1285'
	messageTemplate.deleteMessageTemplate = function(params, onCompletion){
		return messageTemplate.customVerb('deleteMessageTemplate', params, onCompletion);
	};
	//For Operation 'updateMessageTemplate' with service id 'updateMessageTemplate3193'
	messageTemplate.updateMessageTemplate = function(params, onCompletion){
		return messageTemplate.customVerb('updateMessageTemplate', params, onCompletion);
	};
	//For Operation 'getMessageTemplate' with service id 'get_messagetemplate2807'
	messageTemplate.getMessageTemplate = function(params, onCompletion){
		return messageTemplate.customVerb('getMessageTemplate', params, onCompletion);
	};
	//For Operation 'createMessageTemplate' with service id 'createMessageTemplate7858'
	messageTemplate.createMessageTemplate = function(params, onCompletion){
		return messageTemplate.customVerb('createMessageTemplate', params, onCompletion);
	};
	
	var relations = [
	];
	
	messageTemplate.relations = relations;
	
	messageTemplate.prototype.isValid = function(){
		return messageTemplate.isValid(this);
	};
	
	messageTemplate.prototype.objModelName = "messageTemplate";
	
	return messageTemplate;
});