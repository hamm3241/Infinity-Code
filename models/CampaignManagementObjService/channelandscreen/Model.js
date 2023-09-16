define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "channelandscreen", "objectService" : "CampaignManagementObjService"};
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function channelandscreen(defaultValues){
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
	BaseModel.isParentOf(channelandscreen);
	
	//Create new class level validator object
	BaseModel.Validator.call(channelandscreen);
	
	var registerValidatorBackup = channelandscreen.registerValidator;
	
	channelandscreen.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( channelandscreen.isValid(this, propName, val) ){
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
	//For Operation 'getChannelsAndScreensInformation' with service id 'getChannelsAndScreenInformation6291'
	channelandscreen.getChannelsAndScreensInformation = function(params, onCompletion){
		return channelandscreen.customVerb('getChannelsAndScreensInformation', params, onCompletion);
	};
	
	var relations = [
	];
	
	channelandscreen.relations = relations;
	
	channelandscreen.prototype.isValid = function(){
		return channelandscreen.isValid(this);
	};
	
	channelandscreen.prototype.objModelName = "channelandscreen";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	channelandscreen.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("CampaignManagementObjService", "channelandscreen", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	channelandscreen.clone = function(objectToClone) {
		var clonedObj = new channelandscreen();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return channelandscreen;
});