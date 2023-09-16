define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "alertPreference", "objectService" : "AlertAndAlertTypes"};
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function alertPreference(defaultValues){
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
	BaseModel.isParentOf(alertPreference);
	
	//Create new class level validator object
	BaseModel.Validator.call(alertPreference);
	
	var registerValidatorBackup = alertPreference.registerValidator;
	
	alertPreference.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( alertPreference.isValid(this, propName, val) ){
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
	//For Operation 'getAlerts' with service id 'fetchAlertPreferences6702'
	alertPreference.getAlerts = function(params, onCompletion){
		return alertPreference.customVerb('getAlerts', params, onCompletion);
	};
	//For Operation 'updateAlerts' with service id 'updateAlertPreferences4395'
	alertPreference.updateAlerts = function(params, onCompletion){
		return alertPreference.customVerb('updateAlerts', params, onCompletion);
	};
	//For Operation 'setAlertPreferences' with service id 'setAlertPreferences9883'
	alertPreference.setAlertPreferences = function(params, onCompletion){
		return alertPreference.customVerb('setAlertPreferences', params, onCompletion);
	};
	
	var relations = [
	];
	
	alertPreference.relations = relations;
	
	alertPreference.prototype.isValid = function(){
		return alertPreference.isValid(this);
	};
	
	alertPreference.prototype.objModelName = "alertPreference";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	alertPreference.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("AlertAndAlertTypes", "alertPreference", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	alertPreference.clone = function(objectToClone) {
		var clonedObj = new alertPreference();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return alertPreference;
});