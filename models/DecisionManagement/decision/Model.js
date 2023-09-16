define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "decision", "objectService" : "DecisionManagement"};
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function decision(defaultValues){
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
	BaseModel.isParentOf(decision);
	
	//Create new class level validator object
	BaseModel.Validator.call(decision);
	
	var registerValidatorBackup = decision.registerValidator;
	
	decision.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( decision.isValid(this, propName, val) ){
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
	//For Operation 'createDecisionRule' with service id 'createDecisionRule9837'
	decision.createDecisionRule = function(params, onCompletion){
		return decision.customVerb('createDecisionRule', params, onCompletion);
	};
	//For Operation 'GetAllFilesofDecisionRule' with service id 'GetAllFilesofDecisionRule5126'
	decision.GetAllFilesofDecisionRule = function(params, onCompletion){
		return decision.customVerb('GetAllFilesofDecisionRule', params, onCompletion);
	};
	//For Operation 'getDecisionRules' with service id 'getDecisionRules9439'
	decision.getDecisionRules = function(params, onCompletion){
		return decision.customVerb('getDecisionRules', params, onCompletion);
	};
	//For Operation 'editDecisionRule' with service id 'editDecisionRule2839'
	decision.editDecisionRule = function(params, onCompletion){
		return decision.customVerb('editDecisionRule', params, onCompletion);
	};
	//For Operation 'UploadRulesFile' with service id 'uploadRuleFile9519'
	decision.UploadRulesFile = function(params, onCompletion){
		return decision.customVerb('UploadRulesFile', params, onCompletion);
	};
	//For Operation 'DownloadRulesFile' with service id 'DownloadRulesFile6514'
	decision.DownloadRulesFile = function(params, onCompletion){
		return decision.customVerb('DownloadRulesFile', params, onCompletion);
	};
	
	var relations = [
	];
	
	decision.relations = relations;
	
	decision.prototype.isValid = function(){
		return decision.isValid(this);
	};
	
	decision.prototype.objModelName = "decision";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	decision.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("DecisionManagement", "decision", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	decision.clone = function(objectToClone) {
		var clonedObj = new decision();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return decision;
});