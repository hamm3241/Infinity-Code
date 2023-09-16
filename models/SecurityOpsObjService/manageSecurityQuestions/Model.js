define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		createdby : function(val, state){
			state['createdby'] = val;
		},
		createdts : function(val, state){
			state['createdts'] = val;
		},
		id : function(val, state){
			state['id'] = val;
		},
		lastmodifiedts : function(val, state){
			state['lastmodifiedts'] = val;
		},
		modifiedby : function(val, state){
			state['modifiedby'] = val;
		},
		Question : function(val, state){
			state['Question'] = val;
		},
		softdeleteflag : function(val, state){
			state['softdeleteflag'] = val;
		},
		status_id : function(val, state){
			state['status_id'] = val;
		},
		synctimestamp : function(val, state){
			state['synctimestamp'] = val;
		},
		user_ID : function(val, state){
			state['user_ID'] = val;
		},
	};
	
	
	//Create the Model Class
	function manageSecurityQuestions(defaultValues){
		var privateState = {};
			privateState.createdby = defaultValues?(defaultValues["createdby"]?defaultValues["createdby"]:null):null;
			privateState.createdts = defaultValues?(defaultValues["createdts"]?defaultValues["createdts"]:null):null;
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.lastmodifiedts = defaultValues?(defaultValues["lastmodifiedts"]?defaultValues["lastmodifiedts"]:null):null;
			privateState.modifiedby = defaultValues?(defaultValues["modifiedby"]?defaultValues["modifiedby"]:null):null;
			privateState.Question = defaultValues?(defaultValues["Question"]?defaultValues["Question"]:null):null;
			privateState.softdeleteflag = defaultValues?(defaultValues["softdeleteflag"]?defaultValues["softdeleteflag"]:null):null;
			privateState.status_id = defaultValues?(defaultValues["status_id"]?defaultValues["status_id"]:null):null;
			privateState.synctimestamp = defaultValues?(defaultValues["synctimestamp"]?defaultValues["synctimestamp"]:null):null;
			privateState.user_ID = defaultValues?(defaultValues["user_ID"]?defaultValues["user_ID"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
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
				"id" : {
					get : function(){return privateState.id},
					set : function(val){throw Error("id cannot be changed."); },
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
				"Question" : {
					get : function(){return privateState.Question},
					set : function(val){
						setterFunctions['Question'].call(this,val,privateState);
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
				"status_id" : {
					get : function(){return privateState.status_id},
					set : function(val){
						setterFunctions['status_id'].call(this,val,privateState);
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
				"user_ID" : {
					get : function(){return privateState.user_ID},
					set : function(val){
						setterFunctions['user_ID'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(manageSecurityQuestions);
	
	//Create new class level validator object
	BaseModel.Validator.call(manageSecurityQuestions);
	
	var registerValidatorBackup = manageSecurityQuestions.registerValidator;
	
	manageSecurityQuestions.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( manageSecurityQuestions.isValid(this, propName, val) ){
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
	//For Operation 'insertSecurityQuestions' with service id 'insertSecurityQuestions6400'
	manageSecurityQuestions.insertSecurityQuestions = function(params, onCompletion){
		return manageSecurityQuestions.customVerb('insertSecurityQuestions', params, onCompletion);
	};
	//For Operation 'updateSecurityQuestion' with service id 'updateSecurityQuestion8060'
	manageSecurityQuestions.updateSecurityQuestion = function(params, onCompletion){
		return manageSecurityQuestions.customVerb('updateSecurityQuestion', params, onCompletion);
	};
	//For Operation 'deleteSecurityQuestion' with service id 'deleteSecurityQuestion5682'
	manageSecurityQuestions.deleteSecurityQuestion = function(params, onCompletion){
		return manageSecurityQuestions.customVerb('deleteSecurityQuestion', params, onCompletion);
	};
	//For Operation 'getSecurityQuestions' with service id 'getSecurityQuestions2051'
	manageSecurityQuestions.getSecurityQuestions = function(params, onCompletion){
		return manageSecurityQuestions.customVerb('getSecurityQuestions', params, onCompletion);
	};
	
	var relations = [
	];
	
	manageSecurityQuestions.relations = relations;
	
	manageSecurityQuestions.prototype.isValid = function(){
		return manageSecurityQuestions.isValid(this);
	};
	
	manageSecurityQuestions.prototype.objModelName = "manageSecurityQuestions";
	
	return manageSecurityQuestions;
});