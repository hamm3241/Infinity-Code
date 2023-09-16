define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "group", "objectService" : "CampaignManagementObjService"};
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function group(defaultValues){
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
	BaseModel.isParentOf(group);
	
	//Create new class level validator object
	BaseModel.Validator.call(group);
	
	var registerValidatorBackup = group.registerValidator;
	
	group.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( group.isValid(this, propName, val) ){
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
	//For Operation 'getAttributesPerCampaignGroup' with service id 'getAttributesPerCampaignGroup3215'
	group.getAttributesPerCampaignGroup = function(params, onCompletion){
		return group.customVerb('getAttributesPerCampaignGroup', params, onCompletion);
	};
	//For Operation 'createCampaignGroup' with service id 'createCampaignGroup1338'
	group.createCampaignGroup = function(params, onCompletion){
		return group.customVerb('createCampaignGroup', params, onCompletion);
	};
	//For Operation 'getCampaignGroups' with service id 'getCampaignGroups6131'
	group.getCampaignGroups = function(params, onCompletion){
		return group.customVerb('getCampaignGroups', params, onCompletion);
	};
	//For Operation 'updateCampaignGroup' with service id 'updateCampaignGroup7028'
	group.updateCampaignGroup = function(params, onCompletion){
		return group.customVerb('updateCampaignGroup', params, onCompletion);
	};
	
	var relations = [
	];
	
	group.relations = relations;
	
	group.prototype.isValid = function(){
		return group.isValid(this);
	};
	
	group.prototype.objModelName = "group";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	group.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("CampaignManagementObjService", "group", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	group.clone = function(objectToClone) {
		var clonedObj = new group();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return group;
});