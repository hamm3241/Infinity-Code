define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function TransactionReport(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(TransactionReport);
	
	//Create new class level validator object
	BaseModel.Validator.call(TransactionReport);
	
	var registerValidatorBackup = TransactionReport.registerValidator;
	
	TransactionReport.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( TransactionReport.isValid(this, propName, val) ){
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
	//For Operation 'getTransactionValueVolumeByService' with service id 'getTransactionValueVolumeByType3114'
	TransactionReport.getTransactionValueVolumeByService = function(params, onCompletion){
		return TransactionReport.customVerb('getTransactionValueVolumeByService', params, onCompletion);
	};
	//For Operation 'exportTransactionReport' with service id 'exportTransactionReport1610'
	TransactionReport.exportTransactionReport = function(params, onCompletion){
		return TransactionReport.customVerb('exportTransactionReport', params, onCompletion);
	};
	
	var relations = [
	];
	
	TransactionReport.relations = relations;
	
	TransactionReport.prototype.isValid = function(){
		return TransactionReport.isValid(this);
	};
	
	TransactionReport.prototype.objModelName = "TransactionReport";
	
	return TransactionReport;
});