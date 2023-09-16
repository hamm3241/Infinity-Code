define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "mfaconfigandscenarios", "objectService" : "MFAObjService"};
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function mfaconfigandscenarios(defaultValues){
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
	BaseModel.isParentOf(mfaconfigandscenarios);
	
	//Create new class level validator object
	BaseModel.Validator.call(mfaconfigandscenarios);
	
	var registerValidatorBackup = mfaconfigandscenarios.registerValidator;
	
	mfaconfigandscenarios.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( mfaconfigandscenarios.isValid(this, propName, val) ){
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
	//For Operation 'getFrequencyType' with service id 'getFrequencyType8228'
	mfaconfigandscenarios.getFrequencyType = function(params, onCompletion){
		return mfaconfigandscenarios.customVerb('getFrequencyType', params, onCompletion);
	};
	//For Operation 'editMFAScenario' with service id 'editMFAScenario5138'
	mfaconfigandscenarios.editMFAScenario = function(params, onCompletion){
		return mfaconfigandscenarios.customVerb('editMFAScenario', params, onCompletion);
	};
	//For Operation 'deleteMFAScenario' with service id 'deleteMFAScenario6067'
	mfaconfigandscenarios.deleteMFAScenario = function(params, onCompletion){
		return mfaconfigandscenarios.customVerb('deleteMFAScenario', params, onCompletion);
	};
	//For Operation 'getApp' with service id 'getApp9669'
	mfaconfigandscenarios.getApp = function(params, onCompletion){
		return mfaconfigandscenarios.customVerb('getApp', params, onCompletion);
	};
	//For Operation 'getMFAFeature' with service id 'getMFAFeature2009'
	mfaconfigandscenarios.getMFAFeature = function(params, onCompletion){
		return mfaconfigandscenarios.customVerb('getMFAFeature', params, onCompletion);
	};
	//For Operation 'getMFAScenario' with service id 'getMFAScenario1426'
	mfaconfigandscenarios.getMFAScenario = function(params, onCompletion){
		return mfaconfigandscenarios.customVerb('getMFAScenario', params, onCompletion);
	};
	//For Operation 'getAction' with service id 'getAction3461'
	mfaconfigandscenarios.getAction = function(params, onCompletion){
		return mfaconfigandscenarios.customVerb('getAction', params, onCompletion);
	};
	//For Operation 'editMFAConfiguration' with service id 'editMFAConfiguration2937'
	mfaconfigandscenarios.editMFAConfiguration = function(params, onCompletion){
		return mfaconfigandscenarios.customVerb('editMFAConfiguration', params, onCompletion);
	};
	//For Operation 'getMFAType' with service id 'getMFAType9508'
	mfaconfigandscenarios.getMFAType = function(params, onCompletion){
		return mfaconfigandscenarios.customVerb('getMFAType', params, onCompletion);
	};
	//For Operation 'createMFAScenario' with service id 'createMFAScenario6177'
	mfaconfigandscenarios.createMFAScenario = function(params, onCompletion){
		return mfaconfigandscenarios.customVerb('createMFAScenario', params, onCompletion);
	};
	//For Operation 'getMFAConfiguration' with service id 'getMFAConfiguration6292'
	mfaconfigandscenarios.getMFAConfiguration = function(params, onCompletion){
		return mfaconfigandscenarios.customVerb('getMFAConfiguration', params, onCompletion);
	};
	//For Operation 'getMFAMode' with service id 'getMFAMode4765'
	mfaconfigandscenarios.getMFAMode = function(params, onCompletion){
		return mfaconfigandscenarios.customVerb('getMFAMode', params, onCompletion);
	};
	//For Operation 'getAllFeatures' with service id 'get_feature8349'
	mfaconfigandscenarios.getAllFeatures = function(params, onCompletion){
		return mfaconfigandscenarios.customVerb('getAllFeatures', params, onCompletion);
	};
	//For Operation 'getAllActions' with service id 'get_featureaction6495'
	mfaconfigandscenarios.getAllActions = function(params, onCompletion){
		return mfaconfigandscenarios.customVerb('getAllActions', params, onCompletion);
	};
	//For Operation 'getMFAVariableReference' with service id 'getMFAVariableReference3930'
	mfaconfigandscenarios.getMFAVariableReference = function(params, onCompletion){
		return mfaconfigandscenarios.customVerb('getMFAVariableReference', params, onCompletion);
	};
	
	var relations = [
	];
	
	mfaconfigandscenarios.relations = relations;
	
	mfaconfigandscenarios.prototype.isValid = function(){
		return mfaconfigandscenarios.isValid(this);
	};
	
	mfaconfigandscenarios.prototype.objModelName = "mfaconfigandscenarios";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	mfaconfigandscenarios.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("MFAObjService", "mfaconfigandscenarios", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	mfaconfigandscenarios.clone = function(objectToClone) {
		var clonedObj = new mfaconfigandscenarios();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return mfaconfigandscenarios;
});