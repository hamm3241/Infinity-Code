define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "frequentlyAskedQuestions", "objectService" : "StaticContentObjService"};
	
	var setterFunctions = {
		Answer : function(val, state){
			context["field"]  = "Answer";
			context["metadata"] = (objectMetadata ? objectMetadata["Answer"] : null);
			state['Answer'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		Channel_id : function(val, state){
			context["field"]  = "Channel_id";
			context["metadata"] = (objectMetadata ? objectMetadata["Channel_id"] : null);
			state['Channel_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		createdby : function(val, state){
			context["field"]  = "createdby";
			context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
			state['createdby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		createdts : function(val, state){
			context["field"]  = "createdts";
			context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
			state['createdts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		id : function(val, state){
			context["field"]  = "id";
			context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
			state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		lastmodifiedts : function(val, state){
			context["field"]  = "lastmodifiedts";
			context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
			state['lastmodifiedts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		modifiedby : function(val, state){
			context["field"]  = "modifiedby";
			context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
			state['modifiedby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		Question : function(val, state){
			context["field"]  = "Question";
			context["metadata"] = (objectMetadata ? objectMetadata["Question"] : null);
			state['Question'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		QuestionCode : function(val, state){
			context["field"]  = "QuestionCode";
			context["metadata"] = (objectMetadata ? objectMetadata["QuestionCode"] : null);
			state['QuestionCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		softdeleteflag : function(val, state){
			context["field"]  = "softdeleteflag";
			context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
			state['softdeleteflag'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		Status_id : function(val, state){
			context["field"]  = "Status_id";
			context["metadata"] = (objectMetadata ? objectMetadata["Status_id"] : null);
			state['Status_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
		synctimestamp : function(val, state){
			context["field"]  = "synctimestamp";
			context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
			state['synctimestamp'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
		},
	};
	
	
	//Create the Model Class
	function frequentlyAskedQuestions(defaultValues){
		var privateState = {};
			context["field"]  = "Answer";
			context["metadata"] = (objectMetadata ? objectMetadata["Answer"] : null);
			privateState.Answer = defaultValues?(defaultValues["Answer"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Answer"], context):null):null;
			context["field"]  = "Channel_id";
			context["metadata"] = (objectMetadata ? objectMetadata["Channel_id"] : null);
			privateState.Channel_id = defaultValues?(defaultValues["Channel_id"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Channel_id"], context):null):null;
			context["field"]  = "createdby";
			context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
			privateState.createdby = defaultValues?(defaultValues["createdby"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdby"], context):null):null;
			context["field"]  = "createdts";
			context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
			privateState.createdts = defaultValues?(defaultValues["createdts"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdts"], context):null):null;
			context["field"]  = "id";
			context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
			privateState.id = defaultValues?(defaultValues["id"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context):null):null;
			context["field"]  = "lastmodifiedts";
			context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
			privateState.lastmodifiedts = defaultValues?(defaultValues["lastmodifiedts"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastmodifiedts"], context):null):null;
			context["field"]  = "modifiedby";
			context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
			privateState.modifiedby = defaultValues?(defaultValues["modifiedby"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["modifiedby"], context):null):null;
			context["field"]  = "Question";
			context["metadata"] = (objectMetadata ? objectMetadata["Question"] : null);
			privateState.Question = defaultValues?(defaultValues["Question"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Question"], context):null):null;
			context["field"]  = "QuestionCode";
			context["metadata"] = (objectMetadata ? objectMetadata["QuestionCode"] : null);
			privateState.QuestionCode = defaultValues?(defaultValues["QuestionCode"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["QuestionCode"], context):null):null;
			context["field"]  = "softdeleteflag";
			context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
			privateState.softdeleteflag = defaultValues?(defaultValues["softdeleteflag"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["softdeleteflag"], context):null):null;
			context["field"]  = "Status_id";
			context["metadata"] = (objectMetadata ? objectMetadata["Status_id"] : null);
			privateState.Status_id = defaultValues?(defaultValues["Status_id"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Status_id"], context):null):null;
			context["field"]  = "synctimestamp";
			context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
			privateState.synctimestamp = defaultValues?(defaultValues["synctimestamp"]?kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["synctimestamp"], context):null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"Answer" : {
					get : function(){
						context["field"]  = "Answer";
			        	context["metadata"] = (objectMetadata ? objectMetadata["Answer"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Answer, context);},
					set : function(val){
						setterFunctions['Answer'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Channel_id" : {
					get : function(){
						context["field"]  = "Channel_id";
			        	context["metadata"] = (objectMetadata ? objectMetadata["Channel_id"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Channel_id, context);},
					set : function(val){
						setterFunctions['Channel_id'].call(this,val,privateState);
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
				"Question" : {
					get : function(){
						context["field"]  = "Question";
			        	context["metadata"] = (objectMetadata ? objectMetadata["Question"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Question, context);},
					set : function(val){
						setterFunctions['Question'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"QuestionCode" : {
					get : function(){
						context["field"]  = "QuestionCode";
			        	context["metadata"] = (objectMetadata ? objectMetadata["QuestionCode"] : null);
						return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.QuestionCode, context);},
					set : function(val){
						setterFunctions['QuestionCode'].call(this,val,privateState);
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
			});
			
			//converts model object to json object.
			this.toJsonInternal = function() {
				return Object.assign({}, privateState);
			};

			//overwrites object state with provided json value in argument.
			this.fromJsonInternal = function(value) {
									privateState.Answer = value?(value["Answer"]?value["Answer"]:null):null;
					privateState.Channel_id = value?(value["Channel_id"]?value["Channel_id"]:null):null;
					privateState.createdby = value?(value["createdby"]?value["createdby"]:null):null;
					privateState.createdts = value?(value["createdts"]?value["createdts"]:null):null;
					privateState.id = value?(value["id"]?value["id"]:null):null;
					privateState.lastmodifiedts = value?(value["lastmodifiedts"]?value["lastmodifiedts"]:null):null;
					privateState.modifiedby = value?(value["modifiedby"]?value["modifiedby"]:null):null;
					privateState.Question = value?(value["Question"]?value["Question"]:null):null;
					privateState.QuestionCode = value?(value["QuestionCode"]?value["QuestionCode"]:null):null;
					privateState.softdeleteflag = value?(value["softdeleteflag"]?value["softdeleteflag"]:null):null;
					privateState.Status_id = value?(value["Status_id"]?value["Status_id"]:null):null;
					privateState.synctimestamp = value?(value["synctimestamp"]?value["synctimestamp"]:null):null;
			};

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(frequentlyAskedQuestions);
	
	//Create new class level validator object
	BaseModel.Validator.call(frequentlyAskedQuestions);
	
	var registerValidatorBackup = frequentlyAskedQuestions.registerValidator;
	
	frequentlyAskedQuestions.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( frequentlyAskedQuestions.isValid(this, propName, val) ){
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
	//For Operation 'updateFAQs' with service id 'updateFrequentlyAskedQuestions4366'
	frequentlyAskedQuestions.updateFAQs = function(params, onCompletion){
		return frequentlyAskedQuestions.customVerb('updateFAQs', params, onCompletion);
	};
	//For Operation 'getCategories' with service id 'get_faqcategory6175'
	frequentlyAskedQuestions.getCategories = function(params, onCompletion){
		return frequentlyAskedQuestions.customVerb('getCategories', params, onCompletion);
	};
	//For Operation 'createFAQs' with service id 'createFrequentlyAskedQuestions8097'
	frequentlyAskedQuestions.createFAQs = function(params, onCompletion){
		return frequentlyAskedQuestions.customVerb('createFAQs', params, onCompletion);
	};
	//For Operation 'getFAQs' with service id 'getFrequentlyAskedQuestions6812'
	frequentlyAskedQuestions.getFAQs = function(params, onCompletion){
		return frequentlyAskedQuestions.customVerb('getFAQs', params, onCompletion);
	};
	//For Operation 'deleteFAQs' with service id 'deleteFrequentlyAskedQuestions7591'
	frequentlyAskedQuestions.deleteFAQs = function(params, onCompletion){
		return frequentlyAskedQuestions.customVerb('deleteFAQs', params, onCompletion);
	};
	//For Operation 'getOlbFaqs' with service id 'getOlbFaqs2866'
	frequentlyAskedQuestions.getOlbFaqs = function(params, onCompletion){
		return frequentlyAskedQuestions.customVerb('getOlbFaqs', params, onCompletion);
	};
	
	var relations = [
	];
	
	frequentlyAskedQuestions.relations = relations;
	
	frequentlyAskedQuestions.prototype.isValid = function(){
		return frequentlyAskedQuestions.isValid(this);
	};
	
	frequentlyAskedQuestions.prototype.objModelName = "frequentlyAskedQuestions";
	
	/*This API allows registration of preprocessors and postprocessors for model.
	 *It also fetches object metadata for object. 
	 *Options Supported
	 *preProcessor  - preprocessor function for use with setters.
	 *postProcessor - post processor callback for use with getters.
	 *getFromServer - value set to true will fetch metadata from network else from cache.
	 */
	frequentlyAskedQuestions.registerProcessors = function(options, successCallback, failureCallback) {
	
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
		
		kony.mvc.util.ProcessorUtils.getMetadataForObject("StaticContentObjService", "frequentlyAskedQuestions", options, metaDataSuccess, metaDataFailure);
	};
	
	//clone the object provided in argument.
	frequentlyAskedQuestions.clone = function(objectToClone) {
		var clonedObj = new frequentlyAskedQuestions();
		clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
		return clonedObj;
	};
	
	return frequentlyAskedQuestions;
});