define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "outageMessage", "objectService" : "StaticContentObjService"};
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function outageMessage(defaultValues){
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
	BaseModel.isParentOf(outageMessage);
	
	//Create new class level validator object
	BaseModel.Validator.call(outageMessage);
	
	var registerValidatorBackup = outageMessage.registerValidator;
	
	outageMessage.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( outageMessage.isValid(this, propName, val) ){
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
	//For Operation 'createOutageMessage' with service id 'createOutageMessage9933'
	outageMessage.createOutageMessage = function(params, onCompletion){
		return outageMessage.customVerb('createOutageMessage', params, onCompletion);
	};
	//For Operation 'getOutageMessage' with service id 'getOutageMessage4252'
	outageMessage.getOutageMessage = function(params, onCompletion){
		return outageMessage.customVerb('getOutageMessage', params, onCompletion);
	};
	//For Operation 'updateOutageMessage' with service id 'updateOutageMessage2772'
	outageMessage.updateOutageMessage = function(params, onCompletion){
		return outageMessage.customVerb('updateOutageMessage', params, onCompletion);
	};
	//For Operation 'bulkUpdateOutageMessage' with service id 'bulkUpdateOutageMessage7074'
	outageMessage.bulkUpdateOutageMessage = function(params, onCompletion){
		return outageMessage.customVerb('bulkUpdateOutageMessage', params, onCompletion);
	};
	//For Operation 'getOutageMessageOfInactiveServices' with service id 'getOutageMessageOfInactiveServices8541'
	outageMessage.getOutageMessageOfInactiveServices = function(params, onCompletion){
		return outageMessage.customVerb('getOutageMessageOfInactiveServices', params, onCompletion);
	};
	//For Operation 'deleteOutageMessage' with service id 'deleteOutageMessage9475'
	outageMessage.deleteOutageMessage = function(params, onCompletion){
		return outageMessage.customVerb('deleteOutageMessage', params, onCompletion);
	};
	
	var relations = [
	];
	
	outageMessage.relations = relations;
	
	outageMessage.prototype.isValid = function(){
		return outageMessage.isValid(this);
	};
	
	outageMessage.prototype.objModelName = "outageMessage";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	outageMessage.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("StaticContentObjService", "outageMessage", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	outageMessage.clone = function(objectToClone) {
		var clonedObj = new outageMessage();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return outageMessage;
});