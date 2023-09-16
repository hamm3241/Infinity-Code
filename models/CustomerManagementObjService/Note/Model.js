define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function Note(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(Note);
	
	//Create new class level validator object
	BaseModel.Validator.call(Note);
	
	var registerValidatorBackup = Note.registerValidator;
	
	Note.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( Note.isValid(this, propName, val) ){
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
	//For Operation 'GetNotes' with service id 'GetNotes1395'
	Note.GetNotes = function(params, onCompletion){
		return Note.customVerb('GetNotes', params, onCompletion);
	};
	//For Operation 'CreateNote' with service id 'CreateCustomerNote2926'
	Note.CreateNote = function(params, onCompletion){
		return Note.customVerb('CreateNote', params, onCompletion);
	};
	//For Operation 'GetApplicantNotes' with service id 'GetApplicantNotes8121'
	Note.GetApplicantNotes = function(params, onCompletion){
		return Note.customVerb('GetApplicantNotes', params, onCompletion);
	};
	
	var relations = [
	];
	
	Note.relations = relations;
	
	Note.prototype.isValid = function(){
		return Note.isValid(this);
	};
	
	Note.prototype.objModelName = "Note";
	
	return Note;
});