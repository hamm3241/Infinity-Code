define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "termsandconditions", "objectService" : "TermsAndConditionsObjService"};
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function termsandconditions(defaultValues){
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
	BaseModel.isParentOf(termsandconditions);
	
	//Create new class level validator object
	BaseModel.Validator.call(termsandconditions);
	
	var registerValidatorBackup = termsandconditions.registerValidator;
	
	termsandconditions.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( termsandconditions.isValid(this, propName, val) ){
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
	//For Operation 'editTermsAndConditions' with service id 'editTermsAndConditions3925'
	termsandconditions.editTermsAndConditions = function(params, onCompletion){
		return termsandconditions.customVerb('editTermsAndConditions', params, onCompletion);
	};
	//For Operation 'getAllTermsAndConditions' with service id 'getAllTermsAndConditions6441'
	termsandconditions.getAllTermsAndConditions = function(params, onCompletion){
		return termsandconditions.customVerb('getAllTermsAndConditions', params, onCompletion);
	};
	//For Operation 'createTermsAndConditionsVersion' with service id 'createTermsAndConditionsVersion2518'
	termsandconditions.createTermsAndConditionsVersion = function(params, onCompletion){
		return termsandconditions.customVerb('createTermsAndConditionsVersion', params, onCompletion);
	};
	//For Operation 'deleteTermsAndConditionsVersion' with service id 'deleteTermsAndConditionsVersion5140'
	termsandconditions.deleteTermsAndConditionsVersion = function(params, onCompletion){
		return termsandconditions.customVerb('deleteTermsAndConditionsVersion', params, onCompletion);
	};
	//For Operation 'getTermsAndConditions' with service id 'getTermsAndConditions4255'
	termsandconditions.getTermsAndConditions = function(params, onCompletion){
		return termsandconditions.customVerb('getTermsAndConditions', params, onCompletion);
	};
	
	var relations = [
	];
	
	termsandconditions.relations = relations;
	
	termsandconditions.prototype.isValid = function(){
		return termsandconditions.isValid(this);
	};
	
	termsandconditions.prototype.objModelName = "termsandconditions";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	termsandconditions.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("TermsAndConditionsObjService", "termsandconditions", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	termsandconditions.clone = function(objectToClone) {
		var clonedObj = new termsandconditions();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return termsandconditions;
});