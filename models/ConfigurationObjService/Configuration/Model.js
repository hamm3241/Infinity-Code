define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Configuration", "objectService" : "ConfigurationObjService"};
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function Configuration(defaultValues){
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
	BaseModel.isParentOf(Configuration);
	
	//Create new class level validator object
	BaseModel.Validator.call(Configuration);
	
	var registerValidatorBackup = Configuration.registerValidator;
	
	Configuration.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( Configuration.isValid(this, propName, val) ){
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
	//For Operation 'fetchConfigurations' with service id 'fetchConfigurations1827'
	Configuration.fetchConfigurations = function(params, onCompletion){
		return Configuration.customVerb('fetchConfigurations', params, onCompletion);
	};
	//For Operation 'getConfigurations' with service id 'getConfigurations5823'
	Configuration.getConfigurations = function(params, onCompletion){
		return Configuration.customVerb('getConfigurations', params, onCompletion);
	};
	//For Operation 'fetchBundleAndConfigurations' with service id 'fetchBundleAndConfigurations6196'
	Configuration.fetchBundleAndConfigurations = function(params, onCompletion){
		return Configuration.customVerb('fetchBundleAndConfigurations', params, onCompletion);
	};
	//For Operation 'deleteBundleAndConfigurations' with service id 'deleteBundleAndConfigurations7390'
	Configuration.deleteBundleAndConfigurations = function(params, onCompletion){
		return Configuration.customVerb('deleteBundleAndConfigurations', params, onCompletion);
	};
	//For Operation 'manageBundleAndConfigurations' with service id 'manageBundleAndConfigurations5935'
	Configuration.manageBundleAndConfigurations = function(params, onCompletion){
		return Configuration.customVerb('manageBundleAndConfigurations', params, onCompletion);
	};
	//For Operation 'fetchBundles' with service id 'fetchBundles4076'
	Configuration.fetchBundles = function(params, onCompletion){
		return Configuration.customVerb('fetchBundles', params, onCompletion);
	};
	
	var relations = [
	];
	
	Configuration.relations = relations;
	
	Configuration.prototype.isValid = function(){
		return Configuration.isValid(this);
	};
	
	Configuration.prototype.objModelName = "Configuration";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	Configuration.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("ConfigurationObjService", "Configuration", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	Configuration.clone = function(objectToClone) {
		var clonedObj = new Configuration();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return Configuration;
});