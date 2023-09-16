define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "identitymanagement", "objectService" : "IdentityManagementObjService"};
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function identitymanagement(defaultValues){
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
	BaseModel.isParentOf(identitymanagement);
	
	//Create new class level validator object
	BaseModel.Validator.call(identitymanagement);
	
	var registerValidatorBackup = identitymanagement.registerValidator;
	
	identitymanagement.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( identitymanagement.isValid(this, propName, val) ){
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
	//For Operation 'updatePasswordRules' with service id 'updatePasswordRules2289'
	identitymanagement.updatePasswordRules = function(params, onCompletion){
		return identitymanagement.customVerb('updatePasswordRules', params, onCompletion);
	};
	//For Operation 'getPasswordPolicy' with service id 'getPasswordPolicy3902'
	identitymanagement.getPasswordPolicy = function(params, onCompletion){
		return identitymanagement.customVerb('getPasswordPolicy', params, onCompletion);
	};
	//For Operation 'getUsernameAndPasswordRulesAndPolicies' with service id 'getUsernameAndPasswordRulesAndPolicies3186'
	identitymanagement.getUsernameAndPasswordRulesAndPolicies = function(params, onCompletion){
		return identitymanagement.customVerb('getUsernameAndPasswordRulesAndPolicies', params, onCompletion);
	};
	//For Operation 'updateUsernamePolicy' with service id 'updateUsernamePolicy4591'
	identitymanagement.updateUsernamePolicy = function(params, onCompletion){
		return identitymanagement.customVerb('updateUsernamePolicy', params, onCompletion);
	};
	//For Operation 'deletePasswordPolicy' with service id 'deletePasswordPolicy5226'
	identitymanagement.deletePasswordPolicy = function(params, onCompletion){
		return identitymanagement.customVerb('deletePasswordPolicy', params, onCompletion);
	};
	//For Operation 'updateUsernameRules' with service id 'updateUsernameRules4313'
	identitymanagement.updateUsernameRules = function(params, onCompletion){
		return identitymanagement.customVerb('updateUsernameRules', params, onCompletion);
	};
	//For Operation 'updatePasswordPolicy' with service id 'updatePasswordPolicy1663'
	identitymanagement.updatePasswordPolicy = function(params, onCompletion){
		return identitymanagement.customVerb('updatePasswordPolicy', params, onCompletion);
	};
	//For Operation 'getUsernameAndPasswordPolicies' with service id 'getUsernameAndPasswordPolicies4162'
	identitymanagement.getUsernameAndPasswordPolicies = function(params, onCompletion){
		return identitymanagement.customVerb('getUsernameAndPasswordPolicies', params, onCompletion);
	};
	//For Operation 'deleteUsernamePolicy' with service id 'deleteUsernamePolicy2561'
	identitymanagement.deleteUsernamePolicy = function(params, onCompletion){
		return identitymanagement.customVerb('deleteUsernamePolicy', params, onCompletion);
	};
	//For Operation 'getUsernameRulesAndPolicy' with service id 'getUsernameRulesAndPolicy4250'
	identitymanagement.getUsernameRulesAndPolicy = function(params, onCompletion){
		return identitymanagement.customVerb('getUsernameRulesAndPolicy', params, onCompletion);
	};
	//For Operation 'updatePasswordLockoutSettings' with service id 'updatePasswordLockoutSettings7539'
	identitymanagement.updatePasswordLockoutSettings = function(params, onCompletion){
		return identitymanagement.customVerb('updatePasswordLockoutSettings', params, onCompletion);
	};
	//For Operation 'getPasswordRules' with service id 'getPasswordRules9975'
	identitymanagement.getPasswordRules = function(params, onCompletion){
		return identitymanagement.customVerb('getPasswordRules', params, onCompletion);
	};
	//For Operation 'getLocaleList' with service id 'getLocaleList1033'
	identitymanagement.getLocaleList = function(params, onCompletion){
		return identitymanagement.customVerb('getLocaleList', params, onCompletion);
	};
	//For Operation 'createPasswordPolicy' with service id 'createPasswordPolicy8943'
	identitymanagement.createPasswordPolicy = function(params, onCompletion){
		return identitymanagement.customVerb('createPasswordPolicy', params, onCompletion);
	};
	//For Operation 'createUsernamePolicy' with service id 'createUsernamePolicy7868'
	identitymanagement.createUsernamePolicy = function(params, onCompletion){
		return identitymanagement.customVerb('createUsernamePolicy', params, onCompletion);
	};
	//For Operation 'getUsernameRules' with service id 'getUsernameRules6205'
	identitymanagement.getUsernameRules = function(params, onCompletion){
		return identitymanagement.customVerb('getUsernameRules', params, onCompletion);
	};
	//For Operation 'getPasswordLockoutSettings' with service id 'getPasswordLockoutSettings2370'
	identitymanagement.getPasswordLockoutSettings = function(params, onCompletion){
		return identitymanagement.customVerb('getPasswordLockoutSettings', params, onCompletion);
	};
	//For Operation 'getUsernameAndPasswordRules' with service id 'getUsernameAndPasswordRules8047'
	identitymanagement.getUsernameAndPasswordRules = function(params, onCompletion){
		return identitymanagement.customVerb('getUsernameAndPasswordRules', params, onCompletion);
	};
	//For Operation 'getUsernamePolicy' with service id 'getUsernamePolicy3548'
	identitymanagement.getUsernamePolicy = function(params, onCompletion){
		return identitymanagement.customVerb('getUsernamePolicy', params, onCompletion);
	};
	//For Operation 'getPasswordRulesAndPolicy' with service id 'getPasswordRulesAndPolicy8735'
	identitymanagement.getPasswordRulesAndPolicy = function(params, onCompletion){
		return identitymanagement.customVerb('getPasswordRulesAndPolicy', params, onCompletion);
	};
	
	var relations = [
	];
	
	identitymanagement.relations = relations;
	
	identitymanagement.prototype.isValid = function(){
		return identitymanagement.isValid(this);
	};
	
	identitymanagement.prototype.objModelName = "identitymanagement";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	identitymanagement.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("IdentityManagementObjService", "identitymanagement", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	identitymanagement.clone = function(objectToClone) {
		var clonedObj = new identitymanagement();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return identitymanagement;
});