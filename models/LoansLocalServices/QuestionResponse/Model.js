define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		id : function(val, state){
			state['id'] = val;
		},
		QueryResponse_id : function(val, state){
			state['QueryResponse_id'] = val;
		},
		QueryDefinition_id : function(val, state){
			state['QueryDefinition_id'] = val;
		},
		QuestionDefinition_id : function(val, state){
			state['QuestionDefinition_id'] = val;
		},
		QuerySection_id : function(val, state){
			state['QuerySection_id'] = val;
		},
		ArrayIndex : function(val, state){
			state['ArrayIndex'] = val;
		},
		ResponseValue : function(val, state){
			state['ResponseValue'] = val;
		},
		Unit : function(val, state){
			state['Unit'] = val;
		},
		createdby : function(val, state){
			state['createdby'] = val;
		},
		modifiedby : function(val, state){
			state['modifiedby'] = val;
		},
		createdts : function(val, state){
			state['createdts'] = val;
		},
		lastmodifiedts : function(val, state){
			state['lastmodifiedts'] = val;
		},
		synctimestamp : function(val, state){
			state['synctimestamp'] = val;
		},
		softdeleteflag : function(val, state){
			state['softdeleteflag'] = val;
		},
	};
	
	
	//Create the Model Class
	function QuestionResponse(defaultValues){
		var privateState = {};
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.QueryResponse_id = defaultValues?(defaultValues["QueryResponse_id"]?defaultValues["QueryResponse_id"]:null):null;
			privateState.QueryDefinition_id = defaultValues?(defaultValues["QueryDefinition_id"]?defaultValues["QueryDefinition_id"]:null):null;
			privateState.QuestionDefinition_id = defaultValues?(defaultValues["QuestionDefinition_id"]?defaultValues["QuestionDefinition_id"]:null):null;
			privateState.QuerySection_id = defaultValues?(defaultValues["QuerySection_id"]?defaultValues["QuerySection_id"]:null):null;
			privateState.ArrayIndex = defaultValues?(defaultValues["ArrayIndex"]?defaultValues["ArrayIndex"]:null):null;
			privateState.ResponseValue = defaultValues?(defaultValues["ResponseValue"]?defaultValues["ResponseValue"]:null):null;
			privateState.Unit = defaultValues?(defaultValues["Unit"]?defaultValues["Unit"]:null):null;
			privateState.createdby = defaultValues?(defaultValues["createdby"]?defaultValues["createdby"]:null):null;
			privateState.modifiedby = defaultValues?(defaultValues["modifiedby"]?defaultValues["modifiedby"]:null):null;
			privateState.createdts = defaultValues?(defaultValues["createdts"]?defaultValues["createdts"]:null):null;
			privateState.lastmodifiedts = defaultValues?(defaultValues["lastmodifiedts"]?defaultValues["lastmodifiedts"]:null):null;
			privateState.synctimestamp = defaultValues?(defaultValues["synctimestamp"]?defaultValues["synctimestamp"]:null):null;
			privateState.softdeleteflag = defaultValues?(defaultValues["softdeleteflag"]?defaultValues["softdeleteflag"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"id" : {
					get : function(){return privateState.id},
					set : function(val){throw Error("id cannot be changed."); },
					enumerable : true,
				},
				"QueryResponse_id" : {
					get : function(){return privateState.QueryResponse_id},
					set : function(val){
						setterFunctions['QueryResponse_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"QueryDefinition_id" : {
					get : function(){return privateState.QueryDefinition_id},
					set : function(val){
						setterFunctions['QueryDefinition_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"QuestionDefinition_id" : {
					get : function(){return privateState.QuestionDefinition_id},
					set : function(val){
						setterFunctions['QuestionDefinition_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"QuerySection_id" : {
					get : function(){return privateState.QuerySection_id},
					set : function(val){
						setterFunctions['QuerySection_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ArrayIndex" : {
					get : function(){return privateState.ArrayIndex},
					set : function(val){
						setterFunctions['ArrayIndex'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ResponseValue" : {
					get : function(){return privateState.ResponseValue},
					set : function(val){
						setterFunctions['ResponseValue'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Unit" : {
					get : function(){return privateState.Unit},
					set : function(val){
						setterFunctions['Unit'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"createdby" : {
					get : function(){return privateState.createdby},
					set : function(val){
						setterFunctions['createdby'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"modifiedby" : {
					get : function(){return privateState.modifiedby},
					set : function(val){
						setterFunctions['modifiedby'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"createdts" : {
					get : function(){return privateState.createdts},
					set : function(val){
						setterFunctions['createdts'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"lastmodifiedts" : {
					get : function(){return privateState.lastmodifiedts},
					set : function(val){
						setterFunctions['lastmodifiedts'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"synctimestamp" : {
					get : function(){return privateState.synctimestamp},
					set : function(val){
						setterFunctions['synctimestamp'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"softdeleteflag" : {
					get : function(){return privateState.softdeleteflag},
					set : function(val){
						setterFunctions['softdeleteflag'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(QuestionResponse);
	
	//Create new class level validator object
	BaseModel.Validator.call(QuestionResponse);
	
	var registerValidatorBackup = QuestionResponse.registerValidator;
	
	QuestionResponse.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( QuestionResponse.isValid(this, propName, val) ){
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
	//For Operation 'getQuestionResponse' with service id 'getQuestionResponseJava5961'
	QuestionResponse.getQuestionResponse = function(params, onCompletion){
		return QuestionResponse.customVerb('getQuestionResponse', params, onCompletion);
	};
	//For Operation 'getQuestionResponseTemp' with service id 'getQuestionResponseJava9403'
	QuestionResponse.getQuestionResponseTemp = function(params, onCompletion){
		return QuestionResponse.customVerb('getQuestionResponseTemp', params, onCompletion);
	};
	
	var relations = [
	];
	
	QuestionResponse.relations = relations;
	
	QuestionResponse.prototype.isValid = function(){
		return QuestionResponse.isValid(this);
	};
	
	QuestionResponse.prototype.objModelName = "QuestionResponse";
	
	return QuestionResponse;
});