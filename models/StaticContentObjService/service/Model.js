define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "service", "objectService" : "StaticContentObjService"};
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function service(defaultValues){
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
	BaseModel.isParentOf(service);
	
	//Create new class level validator object
	BaseModel.Validator.call(service);
	
	var registerValidatorBackup = service.registerValidator;
	
	service.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( service.isValid(this, propName, val) ){
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
	//For Operation 'createService' with service id 'createService8182'
	service.createService = function(params, onCompletion){
		return service.customVerb('createService', params, onCompletion);
	};
	//For Operation 'updateService' with service id 'updateService8793'
	service.updateService = function(params, onCompletion){
		return service.customVerb('updateService', params, onCompletion);
	};
	//For Operation 'getServicesForLogs' with service id 'getServicesForLogs7292'
	service.getServicesForLogs = function(params, onCompletion){
		return service.customVerb('getServicesForLogs', params, onCompletion);
	};
	//For Operation 'downloadServicesList' with service id 'downloadServicesList9069'
	service.downloadServicesList = function(params, onCompletion){
		return service.customVerb('downloadServicesList', params, onCompletion);
	};
	//For Operation 'getCategory' with service id 'getCategory3861'
	service.getCategory = function(params, onCompletion){
		return service.customVerb('getCategory', params, onCompletion);
	};
	//For Operation 'getServiceTypes' with service id 'get_serviceTypes8132'
	service.getServiceTypes = function(params, onCompletion){
		return service.customVerb('getServiceTypes', params, onCompletion);
	};
	//For Operation 'manageServiceStatus' with service id 'manageStatus1328'
	service.manageServiceStatus = function(params, onCompletion){
		return service.customVerb('manageServiceStatus', params, onCompletion);
	};
	//For Operation 'getService' with service id 'getServiceView9025'
	service.getService = function(params, onCompletion){
		return service.customVerb('getService', params, onCompletion);
	};
	//For Operation 'getServiceChannels' with service id 'getServiceChannels3590'
	service.getServiceChannels = function(params, onCompletion){
		return service.customVerb('getServiceChannels', params, onCompletion);
	};
	
	var relations = [
	];
	
	service.relations = relations;
	
	service.prototype.isValid = function(){
		return service.isValid(this);
	};
	
	service.prototype.objModelName = "service";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	service.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("StaticContentObjService", "service", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	service.clone = function(objectToClone) {
		var clonedObj = new service();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return service;
});