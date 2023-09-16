define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "app", "objectService" : "MasterDataObjService"};
	
	var setterFunctions = {
		lastmodifiedts : function(val, state){
			context["field"]  = "lastmodifiedts";
			context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
			state['lastmodifiedts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		Description : function(val, state){
			context["field"]  = "Description";
			context["metadata"] = (objectMetadata ? objectMetadata["Description"] : null);
			state['Description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		createdby : function(val, state){
			context["field"]  = "createdby";
			context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
			state['createdby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		Status_id : function(val, state){
			context["field"]  = "Status_id";
			context["metadata"] = (objectMetadata ? objectMetadata["Status_id"] : null);
			state['Status_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		modifiedby : function(val, state){
			context["field"]  = "modifiedby";
			context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
			state['modifiedby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		id : function(val, state){
			context["field"]  = "id";
			context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
			state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		synctimestamp : function(val, state){
			context["field"]  = "synctimestamp";
			context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
			state['synctimestamp'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		createdts : function(val, state){
			context["field"]  = "createdts";
			context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
			state['createdts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		softdeleteflag : function(val, state){
			context["field"]  = "softdeleteflag";
			context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
			state['softdeleteflag'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		Name : function(val, state){
			context["field"]  = "Name";
			context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
			state['Name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
	};
	
	
	//Create the Model Class
	function app(defaultValues){
		var privateState = {};
			context["field"]  = "lastmodifiedts";
			context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
			privateState.lastmodifiedts = defaultValues?(defaultValues["lastmodifiedts"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastmodifiedts"], context):null):null;
			context["field"]  = "Description";
			context["metadata"] = (objectMetadata ? objectMetadata["Description"] : null);
			privateState.Description = defaultValues?(defaultValues["Description"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Description"], context):null):null;
			context["field"]  = "createdby";
			context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
			privateState.createdby = defaultValues?(defaultValues["createdby"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdby"], context):null):null;
			context["field"]  = "Status_id";
			context["metadata"] = (objectMetadata ? objectMetadata["Status_id"] : null);
			privateState.Status_id = defaultValues?(defaultValues["Status_id"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Status_id"], context):null):null;
			context["field"]  = "modifiedby";
			context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
			privateState.modifiedby = defaultValues?(defaultValues["modifiedby"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["modifiedby"], context):null):null;
			context["field"]  = "id";
			context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
			privateState.id = defaultValues?(defaultValues["id"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context):null):null;
			context["field"]  = "synctimestamp";
			context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
			privateState.synctimestamp = defaultValues?(defaultValues["synctimestamp"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["synctimestamp"], context):null):null;
			context["field"]  = "createdts";
			context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
			privateState.createdts = defaultValues?(defaultValues["createdts"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdts"], context):null):null;
			context["field"]  = "softdeleteflag";
			context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
			privateState.softdeleteflag = defaultValues?(defaultValues["softdeleteflag"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["softdeleteflag"], context):null):null;
			context["field"]  = "Name";
			context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
			privateState.Name = defaultValues?(defaultValues["Name"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Name"], context):null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
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
				"Description" : {
					get : function(){
						context["field"]  = "Description";
			        	context["metadata"] = (objectMetadata ? objectMetadata["Description"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Description, context);},
					set : function(val){
						setterFunctions['Description'].call(this,val,privateState);
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
				"Status_id" : {
					get : function(){
						context["field"]  = "Status_id";
			        	context["metadata"] = (objectMetadata ? objectMetadata["Status_id"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Status_id, context);},
					set : function(val){
						setterFunctions['Status_id'].call(this,val,privateState);
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
				"id" : {
					get : function(){
						context["field"]  = "id";
			        	context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.id, context);},
					set : function(val){
						setterFunctions['id'].call(this,val,privateState);
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
			});
			
			//converts model object to json object.
			this.toJsonInternal = function() {
				return Object.assign({}, privateState);
			};

			//overwrites object state with provided json value in argument.
			this.fromJsonInternal = function(value) {
									privateState.lastmodifiedts = value?(value["lastmodifiedts"]?value["lastmodifiedts"]:null):null;
					privateState.Description = value?(value["Description"]?value["Description"]:null):null;
					privateState.createdby = value?(value["createdby"]?value["createdby"]:null):null;
					privateState.Status_id = value?(value["Status_id"]?value["Status_id"]:null):null;
					privateState.modifiedby = value?(value["modifiedby"]?value["modifiedby"]:null):null;
					privateState.id = value?(value["id"]?value["id"]:null):null;
					privateState.synctimestamp = value?(value["synctimestamp"]?value["synctimestamp"]:null):null;
					privateState.createdts = value?(value["createdts"]?value["createdts"]:null):null;
					privateState.softdeleteflag = value?(value["softdeleteflag"]?value["softdeleteflag"]:null):null;
					privateState.Name = value?(value["Name"]?value["Name"]:null):null;
			};

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(app);
	
	//Create new class level validator object
	BaseModel.Validator.call(app);
	
	var registerValidatorBackup = app.registerValidator;
	
	app.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( app.isValid(this, propName, val) ){
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
	//For Operation 'getApplications' with service id 'get_app8982'
	app.getApplications = function(params, onCompletion){
		return app.customVerb('getApplications', params, onCompletion);
	};
	
	var relations = [
	];
	
	app.relations = relations;
	
	app.prototype.isValid = function(){
		return app.isValid(this);
	};
	
	app.prototype.objModelName = "app";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	app.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("MasterDataObjService", "app", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	app.clone = function(objectToClone) {
		var clonedObj = new app();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return app;
});