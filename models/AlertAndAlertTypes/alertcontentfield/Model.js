define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "alertcontentfield", "objectService" : "AlertAndAlertTypes"};
	
	var setterFunctions = {
		Code : function(val, state){
			context["field"]  = "Code";
			context["metadata"] = (objectMetadata ? objectMetadata["Code"] : null);
			state['Code'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		Name : function(val, state){
			context["field"]  = "Name";
			context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
			state['Name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		DefaultValue : function(val, state){
			context["field"]  = "DefaultValue";
			context["metadata"] = (objectMetadata ? objectMetadata["DefaultValue"] : null);
			state['DefaultValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		createdby : function(val, state){
			context["field"]  = "createdby";
			context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
			state['createdby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		modifiedby : function(val, state){
			context["field"]  = "modifiedby";
			context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
			state['modifiedby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		createdts : function(val, state){
			context["field"]  = "createdts";
			context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
			state['createdts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		lastmodifiedts : function(val, state){
			context["field"]  = "lastmodifiedts";
			context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
			state['lastmodifiedts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		synctimestamp : function(val, state){
			context["field"]  = "synctimestamp";
			context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
			state['synctimestamp'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		softdeleteflag : function(val, state){
			context["field"]  = "softdeleteflag";
			context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
			state['softdeleteflag'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
	};
	
	
	//Create the Model Class
	function alertcontentfield(defaultValues){
		var privateState = {};
			context["field"]  = "Code";
			context["metadata"] = (objectMetadata ? objectMetadata["Code"] : null);
			privateState.Code = defaultValues?(defaultValues["Code"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Code"], context):null):null;
			context["field"]  = "Name";
			context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
			privateState.Name = defaultValues?(defaultValues["Name"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Name"], context):null):null;
			context["field"]  = "DefaultValue";
			context["metadata"] = (objectMetadata ? objectMetadata["DefaultValue"] : null);
			privateState.DefaultValue = defaultValues?(defaultValues["DefaultValue"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["DefaultValue"], context):null):null;
			context["field"]  = "createdby";
			context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
			privateState.createdby = defaultValues?(defaultValues["createdby"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdby"], context):null):null;
			context["field"]  = "modifiedby";
			context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
			privateState.modifiedby = defaultValues?(defaultValues["modifiedby"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["modifiedby"], context):null):null;
			context["field"]  = "createdts";
			context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
			privateState.createdts = defaultValues?(defaultValues["createdts"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdts"], context):null):null;
			context["field"]  = "lastmodifiedts";
			context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
			privateState.lastmodifiedts = defaultValues?(defaultValues["lastmodifiedts"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastmodifiedts"], context):null):null;
			context["field"]  = "synctimestamp";
			context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
			privateState.synctimestamp = defaultValues?(defaultValues["synctimestamp"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["synctimestamp"], context):null):null;
			context["field"]  = "softdeleteflag";
			context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
			privateState.softdeleteflag = defaultValues?(defaultValues["softdeleteflag"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["softdeleteflag"], context):null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"Code" : {
					get : function(){
						context["field"]  = "Code";
			        	context["metadata"] = (objectMetadata ? objectMetadata["Code"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Code, context);},
					set : function(val){
						setterFunctions['Code'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Name" : {
					get : function(){
						context["field"]  = "Name";
			        	context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Name, context);},
					set : function(val){
						setterFunctions['Name'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"DefaultValue" : {
					get : function(){
						context["field"]  = "DefaultValue";
			        	context["metadata"] = (objectMetadata ? objectMetadata["DefaultValue"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.DefaultValue, context);},
					set : function(val){
						setterFunctions['DefaultValue'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"createdby" : {
					get : function(){
						context["field"]  = "createdby";
			        	context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdby, context);},
					set : function(val){
						setterFunctions['createdby'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"modifiedby" : {
					get : function(){
						context["field"]  = "modifiedby";
			        	context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.modifiedby, context);},
					set : function(val){
						setterFunctions['modifiedby'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"createdts" : {
					get : function(){
						context["field"]  = "createdts";
			        	context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdts, context);},
					set : function(val){
						setterFunctions['createdts'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"lastmodifiedts" : {
					get : function(){
						context["field"]  = "lastmodifiedts";
			        	context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastmodifiedts, context);},
					set : function(val){
						setterFunctions['lastmodifiedts'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"synctimestamp" : {
					get : function(){
						context["field"]  = "synctimestamp";
			        	context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.synctimestamp, context);},
					set : function(val){
						setterFunctions['synctimestamp'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"softdeleteflag" : {
					get : function(){
						context["field"]  = "softdeleteflag";
			        	context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.softdeleteflag, context);},
					set : function(val){
						setterFunctions['softdeleteflag'].call(this,val,privateState);
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
									privateState.Code = value?(value["Code"]?value["Code"]:null):null;
					privateState.Name = value?(value["Name"]?value["Name"]:null):null;
					privateState.DefaultValue = value?(value["DefaultValue"]?value["DefaultValue"]:null):null;
					privateState.createdby = value?(value["createdby"]?value["createdby"]:null):null;
					privateState.modifiedby = value?(value["modifiedby"]?value["modifiedby"]:null):null;
					privateState.createdts = value?(value["createdts"]?value["createdts"]:null):null;
					privateState.lastmodifiedts = value?(value["lastmodifiedts"]?value["lastmodifiedts"]:null):null;
					privateState.synctimestamp = value?(value["synctimestamp"]?value["synctimestamp"]:null):null;
					privateState.softdeleteflag = value?(value["softdeleteflag"]?value["softdeleteflag"]:null):null;
			};

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(alertcontentfield);
	
	//Create new class level validator object
	BaseModel.Validator.call(alertcontentfield);
	
	var registerValidatorBackup = alertcontentfield.registerValidator;
	
	alertcontentfield.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( alertcontentfield.isValid(this, propName, val) ){
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
	//For Operation 'getAlertContentFields' with service id 'getAlertContentFields1951'
	alertcontentfield.getAlertContentFields = function(params, onCompletion){
		return alertcontentfield.customVerb('getAlertContentFields', params, onCompletion);
	};
	
	var relations = [
	];
	
	alertcontentfield.relations = relations;
	
	alertcontentfield.prototype.isValid = function(){
		return alertcontentfield.isValid(this);
	};
	
	alertcontentfield.prototype.objModelName = "alertcontentfield";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	alertcontentfield.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("AlertAndAlertTypes", "alertcontentfield", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	alertcontentfield.clone = function(objectToClone) {
		var clonedObj = new alertcontentfield();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return alertcontentfield;
});