define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "alertchannels", "objectService" : "AlertAndAlertTypes"};
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function alertchannels(defaultValues){
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
	BaseModel.isParentOf(alertchannels);
	
	//Create new class level validator object
	BaseModel.Validator.call(alertchannels);
	
	var registerValidatorBackup = alertchannels.registerValidator;
	
	alertchannels.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( alertchannels.isValid(this, propName, val) ){
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
	//For Operation 'getAlertChannels' with service id 'getAlertChannels9385'
	alertchannels.getAlertChannels = function(params, onCompletion){
		return alertchannels.customVerb('getAlertChannels', params, onCompletion);
	};
	
	var relations = [
	];
	
	alertchannels.relations = relations;
	
	alertchannels.prototype.isValid = function(){
		return alertchannels.isValid(this);
	};
	
	alertchannels.prototype.objModelName = "alertchannels";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	alertchannels.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("AlertAndAlertTypes", "alertchannels", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	alertchannels.clone = function(objectToClone) {
		var clonedObj = new alertchannels();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return alertchannels;
});