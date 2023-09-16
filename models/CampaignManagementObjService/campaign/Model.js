define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "campaign", "objectService" : "CampaignManagementObjService"};
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function campaign(defaultValues){
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
	BaseModel.isParentOf(campaign);
	
	//Create new class level validator object
	BaseModel.Validator.call(campaign);
	
	var registerValidatorBackup = campaign.registerValidator;
	
	campaign.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( campaign.isValid(this, propName, val) ){
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
	//For Operation 'updateCampaignSettings' with service id 'updateCampaignSettings5434'
	campaign.updateCampaignSettings = function(params, onCompletion){
		return campaign.customVerb('updateCampaignSettings', params, onCompletion);
	};
	//For Operation 'getCampaignSpecificationsAndGroups' with service id 'getCampaignSpecificationsAndGroups7784'
	campaign.getCampaignSpecificationsAndGroups = function(params, onCompletion){
		return campaign.customVerb('getCampaignSpecificationsAndGroups', params, onCompletion);
	};
	//For Operation 'checkIfCampaignExists' with service id 'checkIfCampaignExists7085'
	campaign.checkIfCampaignExists = function(params, onCompletion){
		return campaign.customVerb('checkIfCampaignExists', params, onCompletion);
	};
	//For Operation 'getCampaigns' with service id 'getCampaigns5102'
	campaign.getCampaigns = function(params, onCompletion){
		return campaign.customVerb('getCampaigns', params, onCompletion);
	};
	//For Operation 'createCampaign' with service id 'createCampaign5609'
	campaign.createCampaign = function(params, onCompletion){
		return campaign.customVerb('createCampaign', params, onCompletion);
	};
	//For Operation 'updateCampaignStatus' with service id 'updateCampaignStatus5655'
	campaign.updateCampaignStatus = function(params, onCompletion){
		return campaign.customVerb('updateCampaignStatus', params, onCompletion);
	};
	//For Operation 'getCampaignSettings' with service id 'getCampaignSettings8043'
	campaign.getCampaignSettings = function(params, onCompletion){
		return campaign.customVerb('getCampaignSettings', params, onCompletion);
	};
	//For Operation 'getCampaignPriorityList' with service id 'getCampaignPriorityList9290'
	campaign.getCampaignPriorityList = function(params, onCompletion){
		return campaign.customVerb('getCampaignPriorityList', params, onCompletion);
	};
	//For Operation 'updateCampaign' with service id 'updateCampaign2196'
	campaign.updateCampaign = function(params, onCompletion){
		return campaign.customVerb('updateCampaign', params, onCompletion);
	};
	
	var relations = [
	];
	
	campaign.relations = relations;
	
	campaign.prototype.isValid = function(){
		return campaign.isValid(this);
	};
	
	campaign.prototype.objModelName = "campaign";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	campaign.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("CampaignManagementObjService", "campaign", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	campaign.clone = function(objectToClone) {
		var clonedObj = new campaign();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return campaign;
});