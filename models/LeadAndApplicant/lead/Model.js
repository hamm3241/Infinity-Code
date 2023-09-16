define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "lead", "objectService" : "LeadAndApplicant"};
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function lead(defaultValues){
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
	BaseModel.isParentOf(lead);
	
	//Create new class level validator object
	BaseModel.Validator.call(lead);
	
	var registerValidatorBackup = lead.registerValidator;
	
	lead.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( lead.isValid(this, propName, val) ){
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
	//For Operation 'createLead' with service id 'createLead2762'
	lead.createLead = function(params, onCompletion){
		return lead.customVerb('createLead', params, onCompletion);
	};
	//For Operation 'fetchLeads' with service id 'fetchLeads6477'
	lead.fetchLeads = function(params, onCompletion){
		return lead.customVerb('fetchLeads', params, onCompletion);
	};
	//For Operation 'assignLeads' with service id 'assignLeads1851'
	lead.assignLeads = function(params, onCompletion){
		return lead.customVerb('assignLeads', params, onCompletion);
	};
	//For Operation 'updateLead' with service id 'updateLead9865'
	lead.updateLead = function(params, onCompletion){
		return lead.customVerb('updateLead', params, onCompletion);
	};
	//For Operation 'closeLead' with service id 'closeLead4359'
	lead.closeLead = function(params, onCompletion){
		return lead.customVerb('closeLead', params, onCompletion);
	};
	
	var relations = [
	];
	
	lead.relations = relations;
	
	lead.prototype.isValid = function(){
		return lead.isValid(this);
	};
	
	lead.prototype.objModelName = "lead";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	lead.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("LeadAndApplicant", "lead", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	lead.clone = function(objectToClone) {
		var clonedObj = new lead();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return lead;
});