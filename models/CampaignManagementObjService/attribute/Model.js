define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "attribute", "objectService" : "CampaignManagementObjService"};
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function attribute(defaultValues){
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
	BaseModel.isParentOf(attribute);
	
	//Create new class level validator object
	BaseModel.Validator.call(attribute);
	
	var registerValidatorBackup = attribute.registerValidator;
	
	attribute.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( attribute.isValid(this, propName, val) ){
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
	//For Operation 'getAttributes' with service id 'getAttributes7221'
	attribute.getAttributes = function(params, onCompletion){
		return attribute.customVerb('getAttributes', params, onCompletion);
	};
	//For Operation 'getAttributeCriteriaTypes' with service id 'getAttributeCriteriaTypes2992'
	attribute.getAttributeCriteriaTypes = function(params, onCompletion){
		return attribute.customVerb('getAttributeCriteriaTypes', params, onCompletion);
	};
	var relations = [
	];
	
	attribute.relations = relations;
	
	attribute.prototype.isValid = function(){
		return attribute.isValid(this);
	};
	
	attribute.prototype.objModelName = "attribute";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	attribute.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("CampaignManagementObjService", "attribute", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	attribute.clone = function(objectToClone) {
		var clonedObj = new attribute();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return attribute;
});