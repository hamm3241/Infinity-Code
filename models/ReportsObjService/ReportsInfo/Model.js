define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function ReportsInfo(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(ReportsInfo);
	
	//Create new class level validator object
	BaseModel.Validator.call(ReportsInfo);
	
	var registerValidatorBackup = ReportsInfo.registerValidator;
	
	ReportsInfo.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( ReportsInfo.isValid(this, propName, val) ){
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
	//For Operation 'getReportsInfo' with service id 'getReportsInfo6516'
	ReportsInfo.getReportsInfo = function(params, onCompletion){
		return ReportsInfo.customVerb('getReportsInfo', params, onCompletion);
	};
	
	var relations = [
	];
	
	ReportsInfo.relations = relations;
	
	ReportsInfo.prototype.isValid = function(){
		return ReportsInfo.isValid(this);
	};
	
	ReportsInfo.prototype.objModelName = "ReportsInfo";
	
	return ReportsInfo;
});