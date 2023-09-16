define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "accounttype", "objectService" : "MasterDataObjService"};
	
	var setterFunctions = {
		TypeID : function(val, state){
			context["field"]  = "TypeID";
			context["metadata"] = (objectMetadata ? objectMetadata["TypeID"] : null);
			state['TypeID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		features : function(val, state){
			context["field"]  = "features";
			context["metadata"] = (objectMetadata ? objectMetadata["features"] : null);
			state['features'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		supportChecks : function(val, state){
			context["field"]  = "supportChecks";
			context["metadata"] = (objectMetadata ? objectMetadata["supportChecks"] : null);
			state['supportChecks'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		displayName : function(val, state){
			context["field"]  = "displayName";
			context["metadata"] = (objectMetadata ? objectMetadata["displayName"] : null);
			state['displayName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		rates : function(val, state){
			context["field"]  = "rates";
			context["metadata"] = (objectMetadata ? objectMetadata["rates"] : null);
			state['rates'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		TypeDescription : function(val, state){
			context["field"]  = "TypeDescription";
			context["metadata"] = (objectMetadata ? objectMetadata["TypeDescription"] : null);
			state['TypeDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		termsAndConditions : function(val, state){
			context["field"]  = "termsAndConditions";
			context["metadata"] = (objectMetadata ? objectMetadata["termsAndConditions"] : null);
			state['termsAndConditions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		info : function(val, state){
			context["field"]  = "info";
			context["metadata"] = (objectMetadata ? objectMetadata["info"] : null);
			state['info'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
	};
	
	
	//Create the Model Class
	function accounttype(defaultValues){
		var privateState = {};
			context["field"]  = "TypeID";
			context["metadata"] = (objectMetadata ? objectMetadata["TypeID"] : null);
			privateState.TypeID = defaultValues?(defaultValues["TypeID"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TypeID"], context):null):null;
			context["field"]  = "features";
			context["metadata"] = (objectMetadata ? objectMetadata["features"] : null);
			privateState.features = defaultValues?(defaultValues["features"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["features"], context):null):null;
			context["field"]  = "supportChecks";
			context["metadata"] = (objectMetadata ? objectMetadata["supportChecks"] : null);
			privateState.supportChecks = defaultValues?(defaultValues["supportChecks"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["supportChecks"], context):null):null;
			context["field"]  = "displayName";
			context["metadata"] = (objectMetadata ? objectMetadata["displayName"] : null);
			privateState.displayName = defaultValues?(defaultValues["displayName"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["displayName"], context):null):null;
			context["field"]  = "rates";
			context["metadata"] = (objectMetadata ? objectMetadata["rates"] : null);
			privateState.rates = defaultValues?(defaultValues["rates"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["rates"], context):null):null;
			context["field"]  = "TypeDescription";
			context["metadata"] = (objectMetadata ? objectMetadata["TypeDescription"] : null);
			privateState.TypeDescription = defaultValues?(defaultValues["TypeDescription"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TypeDescription"], context):null):null;
			context["field"]  = "termsAndConditions";
			context["metadata"] = (objectMetadata ? objectMetadata["termsAndConditions"] : null);
			privateState.termsAndConditions = defaultValues?(defaultValues["termsAndConditions"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["termsAndConditions"], context):null):null;
			context["field"]  = "info";
			context["metadata"] = (objectMetadata ? objectMetadata["info"] : null);
			privateState.info = defaultValues?(defaultValues["info"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["info"], context):null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"TypeID" : {
					get : function(){
						context["field"]  = "TypeID";
			        	context["metadata"] = (objectMetadata ? objectMetadata["TypeID"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TypeID, context);},
					set : function(val){
						setterFunctions['TypeID'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"features" : {
					get : function(){
						context["field"]  = "features";
			        	context["metadata"] = (objectMetadata ? objectMetadata["features"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.features, context);},
					set : function(val){
						setterFunctions['features'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"supportChecks" : {
					get : function(){
						context["field"]  = "supportChecks";
			        	context["metadata"] = (objectMetadata ? objectMetadata["supportChecks"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.supportChecks, context);},
					set : function(val){
						setterFunctions['supportChecks'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"displayName" : {
					get : function(){
						context["field"]  = "displayName";
			        	context["metadata"] = (objectMetadata ? objectMetadata["displayName"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.displayName, context);},
					set : function(val){
						setterFunctions['displayName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"rates" : {
					get : function(){
						context["field"]  = "rates";
			        	context["metadata"] = (objectMetadata ? objectMetadata["rates"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.rates, context);},
					set : function(val){
						setterFunctions['rates'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"TypeDescription" : {
					get : function(){
						context["field"]  = "TypeDescription";
			        	context["metadata"] = (objectMetadata ? objectMetadata["TypeDescription"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TypeDescription, context);},
					set : function(val){
						setterFunctions['TypeDescription'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"termsAndConditions" : {
					get : function(){
						context["field"]  = "termsAndConditions";
			        	context["metadata"] = (objectMetadata ? objectMetadata["termsAndConditions"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.termsAndConditions, context);},
					set : function(val){
						setterFunctions['termsAndConditions'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"info" : {
					get : function(){
						context["field"]  = "info";
			        	context["metadata"] = (objectMetadata ? objectMetadata["info"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.info, context);},
					set : function(val){
						setterFunctions['info'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});
			
			//converts model object to json object.
			this.toJsonInternal = function() {
				return Object.assign({}, privateState);
			};

			//overwrites object state with provided json value in argument.
			this.fromJsonInternal = function(value) {
									privateState.TypeID = value?(value["TypeID"]?value["TypeID"]:null):null;
					privateState.features = value?(value["features"]?value["features"]:null):null;
					privateState.supportChecks = value?(value["supportChecks"]?value["supportChecks"]:null):null;
					privateState.displayName = value?(value["displayName"]?value["displayName"]:null):null;
					privateState.rates = value?(value["rates"]?value["rates"]:null):null;
					privateState.TypeDescription = value?(value["TypeDescription"]?value["TypeDescription"]:null):null;
					privateState.termsAndConditions = value?(value["termsAndConditions"]?value["termsAndConditions"]:null):null;
					privateState.info = value?(value["info"]?value["info"]:null):null;
			};

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(accounttype);
	
	//Create new class level validator object
	BaseModel.Validator.call(accounttype);
	
	var registerValidatorBackup = accounttype.registerValidator;
	
	accounttype.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( accounttype.isValid(this, propName, val) ){
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
	//For Operation 'getAccountTypes' with service id 'get_accounttype2382'
	accounttype.getAccountTypes = function(params, onCompletion){
		return accounttype.customVerb('getAccountTypes', params, onCompletion);
	};
	
	var relations = [
	];
	
	accounttype.relations = relations;
	
	accounttype.prototype.isValid = function(){
		return accounttype.isValid(this);
	};
	
	accounttype.prototype.objModelName = "accounttype";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	accounttype.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("MasterDataObjService", "accounttype", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	accounttype.clone = function(objectToClone) {
		var clonedObj = new accounttype();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return accounttype;
});