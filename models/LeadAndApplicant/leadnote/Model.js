define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "leadnote", "objectService" : "LeadAndApplicant"};
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function leadnote(defaultValues){
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
	BaseModel.isParentOf(leadnote);
	
	//Create new class level validator object
	BaseModel.Validator.call(leadnote);
	
	var registerValidatorBackup = leadnote.registerValidator;
	
	leadnote.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( leadnote.isValid(this, propName, val) ){
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
	//For Operation 'fetchLeadNotes' with service id 'fetchLeadNotes9746'
	leadnote.fetchLeadNotes = function(params, onCompletion){
		return leadnote.customVerb('fetchLeadNotes', params, onCompletion);
	};
	//For Operation 'createLeadNote' with service id 'createLeadNote7324'
	leadnote.createLeadNote = function(params, onCompletion){
		return leadnote.customVerb('createLeadNote', params, onCompletion);
	};
	
	var relations = [
	];
	
	leadnote.relations = relations;
	
	leadnote.prototype.isValid = function(){
		return leadnote.isValid(this);
	};
	
	leadnote.prototype.objModelName = "leadnote";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	leadnote.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("LeadAndApplicant", "leadnote", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	leadnote.clone = function(objectToClone) {
		var clonedObj = new leadnote();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return leadnote;
});