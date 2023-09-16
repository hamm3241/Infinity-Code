define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "alert", "objectService" : "AlertAndAlertTypes"};
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function alert(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});
			
			//converts model object to json object.
			this.toJsonInternal = function() {
				return Object.assign({}, privateState);
			};

			//overwrites object state with provided json value in argument.
			this.fromJsonInternal = function(value) {
							};

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(alert);
	
	//Create new class level validator object
	BaseModel.Validator.call(alert);
	
	var registerValidatorBackup = alert.registerValidator;
	
	alert.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( alert.isValid(this, propName, val) ){
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
	//For Operation 'updateAlert' with service id 'updateAlert6838'
	alert.updateAlert = function(params, onCompletion){
		return alert.customVerb('updateAlert', params, onCompletion);
	};
	//For Operation 'deleteAlert' with service id 'deleteAlert1017'
	alert.deleteAlert = function(params, onCompletion){
		return alert.customVerb('deleteAlert', params, onCompletion);
	};
	//For Operation 'getAlertAndAlertTypes' with service id 'getAlertTypesAndAlerts5216'
	alert.getAlertAndAlertTypes = function(params, onCompletion){
		return alert.customVerb('getAlertAndAlertTypes', params, onCompletion);
	};
	
	var relations = [
	];
	
	alert.relations = relations;
	
	alert.prototype.isValid = function(){
		return alert.isValid(this);
	};
	
	alert.prototype.objModelName = "alert";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	alert.registerProcessors = function(options, successCallback, failureCallback) {
	
		if(!options) {
			options = {};
		}
			
		if(options && ((options["preProcessor"] && typeof(options["preProcessor"]) === "function") || !options["preProcessor"])) {
			preProcessorCallback = options["preProcessor"];
		}
		
		if(options && ((options["postProcessor"] && typeof(options["postProcessor"]) === "function") || !options["postProcessor"])){
			postProcessorCallback = options["postProcessor"];
		}
		
		function metaDataSuccess(res) {
			objectMetadata = kony.mvc.util.ProcessorUtils.convertObjectMetadataToFieldMetadataMap(res);
			successCallback();
		}
		
		function metaDataFailure(err) {
			failureCallback(err);
		}
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("AlertAndAlertTypes", "alert", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	alert.clone = function(objectToClone) {
		var clonedObj = new alert();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return alert;
});