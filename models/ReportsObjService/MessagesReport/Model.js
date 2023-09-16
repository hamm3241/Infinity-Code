define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function MessagesReport(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(MessagesReport);
	
	//Create new class level validator object
	BaseModel.Validator.call(MessagesReport);
	
	var registerValidatorBackup = MessagesReport.registerValidator;
	
	MessagesReport.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( MessagesReport.isValid(this, propName, val) ){
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
	//For Operation 'exportMessagesReport' with service id 'exportMessagesReport5472'
	MessagesReport.exportMessagesReport = function(params, onCompletion){
		return MessagesReport.customVerb('exportMessagesReport', params, onCompletion);
	};
	//For Operation 'getMessagesReport' with service id 'getMessagesReport4917'
	MessagesReport.getMessagesReport = function(params, onCompletion){
		return MessagesReport.customVerb('getMessagesReport', params, onCompletion);
	};
	
	var relations = [
	];
	
	MessagesReport.relations = relations;
	
	MessagesReport.prototype.isValid = function(){
		return MessagesReport.isValid(this);
	};
	
	MessagesReport.prototype.objModelName = "MessagesReport";
	
	return MessagesReport;
});