define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "customertype", "objectService" : "MasterDataObjService"};
	
	var setterFunctions = {
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
	function customertype(defaultValues){
		var privateState = {};
			context["field"]  = "Description";
			context["metadata"] = (objectMetadata ? objectMetadata["Description"] : null);
			privateState.Description = defaultValues?(defaultValues["Description"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Description"], context):null):null;
			context["field"]  = "createdby";
			context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
			privateState.createdby = defaultValues?(defaultValues["createdby"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdby"], context):null):null;
			context["field"]  = "modifiedby";
			context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
			privateState.modifiedby = defaultValues?(defaultValues["modifiedby"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["modifiedby"], context):null):null;
			context["field"]  = "id";
			context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
			privateState.id = defaultValues?(defaultValues["id"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context):null):null;
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
									privateState.Description = value?(value["Description"]?value["Description"]:null):null;
					privateState.createdby = value?(value["createdby"]?value["createdby"]:null):null;
					privateState.modifiedby = value?(value["modifiedby"]?value["modifiedby"]:null):null;
					privateState.id = value?(value["id"]?value["id"]:null):null;
					privateState.softdeleteflag = value?(value["softdeleteflag"]?value["softdeleteflag"]:null):null;
					privateState.Name = value?(value["Name"]?value["Name"]:null):null;
			};

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(customertype);
	
	//Create new class level validator object
	BaseModel.Validator.call(customertype);
	
	var registerValidatorBackup = customertype.registerValidator;
	
	customertype.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( customertype.isValid(this, propName, val) ){
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
	//For Operation 'getCustomerTypes' with service id 'get_customertype3952'
	customertype.getCustomerTypes = function(params, onCompletion){
		return customertype.customVerb('getCustomerTypes', params, onCompletion);
	};
	
	var relations = [
	];
	
	customertype.relations = relations;
	
	customertype.prototype.isValid = function(){
		return customertype.isValid(this);
	};
	
	customertype.prototype.objModelName = "customertype";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	customertype.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("MasterDataObjService", "customertype", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	customertype.clone = function(objectToClone) {
		var clonedObj = new customertype();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return customertype;
});