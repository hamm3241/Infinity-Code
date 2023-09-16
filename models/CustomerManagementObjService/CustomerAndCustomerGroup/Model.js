define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "CustomerAndCustomerGroup", "objectService" : "CustomerManagementObjService"};
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function CustomerAndCustomerGroup(defaultValues){
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
	BaseModel.isParentOf(CustomerAndCustomerGroup);
	
	//Create new class level validator object
	BaseModel.Validator.call(CustomerAndCustomerGroup);
	
	var registerValidatorBackup = CustomerAndCustomerGroup.registerValidator;
	
	CustomerAndCustomerGroup.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( CustomerAndCustomerGroup.isValid(this, propName, val) ){
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
	//For Operation 'getSuggestions' with service id 'getSuggestions3745'
	CustomerAndCustomerGroup.getSuggestions = function(params, onCompletion){
		return CustomerAndCustomerGroup.customVerb('getSuggestions', params, onCompletion);
	};
	
	var relations = [
	];
	
	CustomerAndCustomerGroup.relations = relations;
	
	CustomerAndCustomerGroup.prototype.isValid = function(){
		return CustomerAndCustomerGroup.isValid(this);
	};
	
	CustomerAndCustomerGroup.prototype.objModelName = "CustomerAndCustomerGroup";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	CustomerAndCustomerGroup.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("CustomerManagementObjService", "CustomerAndCustomerGroup", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	CustomerAndCustomerGroup.clone = function(objectToClone) {
		var clonedObj = new CustomerAndCustomerGroup();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return CustomerAndCustomerGroup;
});