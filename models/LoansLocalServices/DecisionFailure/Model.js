define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		baseAttributeName : function(val, state){
			state['baseAttributeName'] = val;
		},
		baseAttributeValue : function(val, state){
			state['baseAttributeValue'] = val;
		},
		createdby : function(val, state){
			state['createdby'] = val;
		},
		createdts : function(val, state){
			state['createdts'] = val;
		},
		decision_id : function(val, state){
			state['decision_id'] = val;
		},
		errmsg : function(val, state){
			state['errmsg'] = val;
		},
		exception : function(val, state){
			state['exception'] = val;
		},
		failureTriggerJob_id : function(val, state){
			state['failureTriggerJob_id'] = val;
		},
		id : function(val, state){
			state['id'] = val;
		},
		job_id : function(val, state){
			state['job_id'] = val;
		},
		lastmodifiedts : function(val, state){
			state['lastmodifiedts'] = val;
		},
		modifiedby : function(val, state){
			state['modifiedby'] = val;
		},
		resultAttributeName : function(val, state){
			state['resultAttributeName'] = val;
		},
		softdeleteflag : function(val, state){
			state['softdeleteflag'] = val;
		},
		synctimestamp : function(val, state){
			state['synctimestamp'] = val;
		},
	};
	
	
	//Create the Model Class
	function DecisionFailure(defaultValues){
		var privateState = {};
			privateState.baseAttributeName = defaultValues?(defaultValues["baseAttributeName"]?defaultValues["baseAttributeName"]:null):null;
			privateState.baseAttributeValue = defaultValues?(defaultValues["baseAttributeValue"]?defaultValues["baseAttributeValue"]:null):null;
			privateState.createdby = defaultValues?(defaultValues["createdby"]?defaultValues["createdby"]:null):null;
			privateState.createdts = defaultValues?(defaultValues["createdts"]?defaultValues["createdts"]:null):null;
			privateState.decision_id = defaultValues?(defaultValues["decision_id"]?defaultValues["decision_id"]:null):null;
			privateState.errmsg = defaultValues?(defaultValues["errmsg"]?defaultValues["errmsg"]:null):null;
			privateState.exception = defaultValues?(defaultValues["exception"]?defaultValues["exception"]:null):null;
			privateState.failureTriggerJob_id = defaultValues?(defaultValues["failureTriggerJob_id"]?defaultValues["failureTriggerJob_id"]:null):null;
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.job_id = defaultValues?(defaultValues["job_id"]?defaultValues["job_id"]:null):null;
			privateState.lastmodifiedts = defaultValues?(defaultValues["lastmodifiedts"]?defaultValues["lastmodifiedts"]:null):null;
			privateState.modifiedby = defaultValues?(defaultValues["modifiedby"]?defaultValues["modifiedby"]:null):null;
			privateState.resultAttributeName = defaultValues?(defaultValues["resultAttributeName"]?defaultValues["resultAttributeName"]:null):null;
			privateState.softdeleteflag = defaultValues?(defaultValues["softdeleteflag"]?defaultValues["softdeleteflag"]:null):null;
			privateState.synctimestamp = defaultValues?(defaultValues["synctimestamp"]?defaultValues["synctimestamp"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"baseAttributeName" : {
					get : function(){return privateState.baseAttributeName},
					set : function(val){
						setterFunctions['baseAttributeName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"baseAttributeValue" : {
					get : function(){return privateState.baseAttributeValue},
					set : function(val){
						setterFunctions['baseAttributeValue'].call(this,val,privateState);
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
				"createdts" : {
					get : function(){return privateState.createdts},
					set : function(val){
						setterFunctions['createdts'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"decision_id" : {
					get : function(){return privateState.decision_id},
					set : function(val){
						setterFunctions['decision_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"errmsg" : {
					get : function(){return privateState.errmsg},
					set : function(val){
						setterFunctions['errmsg'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"exception" : {
					get : function(){return privateState.exception},
					set : function(val){
						setterFunctions['exception'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"failureTriggerJob_id" : {
					get : function(){return privateState.failureTriggerJob_id},
					set : function(val){
						setterFunctions['failureTriggerJob_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"id" : {
					get : function(){return privateState.id},
					set : function(val){throw Error("id cannot be changed."); },
					enumerable : true,
				},
				"job_id" : {
					get : function(){return privateState.job_id},
					set : function(val){
						setterFunctions['job_id'].call(this,val,privateState);
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
				"modifiedby" : {
					get : function(){return privateState.modifiedby},
					set : function(val){
						setterFunctions['modifiedby'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"resultAttributeName" : {
					get : function(){return privateState.resultAttributeName},
					set : function(val){
						setterFunctions['resultAttributeName'].call(this,val,privateState);
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
				"synctimestamp" : {
					get : function(){return privateState.synctimestamp},
					set : function(val){
						setterFunctions['synctimestamp'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(DecisionFailure);
	
	//Create new class level validator object
	BaseModel.Validator.call(DecisionFailure);
	
	var registerValidatorBackup = DecisionFailure.registerValidator;
	
	DecisionFailure.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( DecisionFailure.isValid(this, propName, val) ){
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
	
	var relations = [
	];
	
	DecisionFailure.relations = relations;
	
	DecisionFailure.prototype.isValid = function(){
		return DecisionFailure.isValid(this);
	};
	
	DecisionFailure.prototype.objModelName = "DecisionFailure";
	
	return DecisionFailure;
});