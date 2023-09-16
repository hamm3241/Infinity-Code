define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "leadconfiguration", "objectService" : "LeadAndApplicant"};
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function leadconfiguration(defaultValues){
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
	BaseModel.isParentOf(leadconfiguration);
	
	//Create new class level validator object
	BaseModel.Validator.call(leadconfiguration);
	
	var registerValidatorBackup = leadconfiguration.registerValidator;
	
	leadconfiguration.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( leadconfiguration.isValid(this, propName, val) ){
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
	//For Operation 'setLeadConfiguration' with service id 'setLeadConfiguration5106'
	leadconfiguration.setLeadConfiguration = function(params, onCompletion){
		return leadconfiguration.customVerb('setLeadConfiguration', params, onCompletion);
	};
	//For Operation 'getLeadConfiguration' with service id 'getLeadConfiguration6827'
	leadconfiguration.getLeadConfiguration = function(params, onCompletion){
		return leadconfiguration.customVerb('getLeadConfiguration', params, onCompletion);
	};
	
	var relations = [
	];
	
	leadconfiguration.relations = relations;
	
	leadconfiguration.prototype.isValid = function(){
		return leadconfiguration.isValid(this);
	};
	
	leadconfiguration.prototype.objModelName = "leadconfiguration";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	leadconfiguration.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("LeadAndApplicant", "leadconfiguration", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	leadconfiguration.clone = function(objectToClone) {
		var clonedObj = new leadconfiguration();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return leadconfiguration;
});