define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		id : function(val, state){
			state['id'] = val;
		},
		QueryType_id : function(val, state){
			state['QueryType_id'] = val;
		},
		Name : function(val, state){
			state['Name'] = val;
		},
		Code : function(val, state){
			state['Code'] = val;
		},
		Status_id : function(val, state){
			state['Status_id'] = val;
		},
		StartDate : function(val, state){
			state['StartDate'] = val;
		},
		EndDate : function(val, state){
			state['EndDate'] = val;
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
	function QueryDefinition(defaultValues){
		var privateState = {};
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.QueryType_id = defaultValues?(defaultValues["QueryType_id"]?defaultValues["QueryType_id"]:null):null;
			privateState.Name = defaultValues?(defaultValues["Name"]?defaultValues["Name"]:null):null;
			privateState.Code = defaultValues?(defaultValues["Code"]?defaultValues["Code"]:null):null;
			privateState.Status_id = defaultValues?(defaultValues["Status_id"]?defaultValues["Status_id"]:null):null;
			privateState.StartDate = defaultValues?(defaultValues["StartDate"]?defaultValues["StartDate"]:null):null;
			privateState.EndDate = defaultValues?(defaultValues["EndDate"]?defaultValues["EndDate"]:null):null;
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
				"QueryType_id" : {
					get : function(){return privateState.QueryType_id},
					set : function(val){
						setterFunctions['QueryType_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Name" : {
					get : function(){return privateState.Name},
					set : function(val){
						setterFunctions['Name'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Code" : {
					get : function(){return privateState.Code},
					set : function(val){
						setterFunctions['Code'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Status_id" : {
					get : function(){return privateState.Status_id},
					set : function(val){
						setterFunctions['Status_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"StartDate" : {
					get : function(){return privateState.StartDate},
					set : function(val){
						setterFunctions['StartDate'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"EndDate" : {
					get : function(){return privateState.EndDate},
					set : function(val){
						setterFunctions['EndDate'].call(this,val,privateState);
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
	BaseModel.isParentOf(QueryDefinition);
	
	//Create new class level validator object
	BaseModel.Validator.call(QueryDefinition);
	
	var registerValidatorBackup = QueryDefinition.registerValidator;
	
	QueryDefinition.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( QueryDefinition.isValid(this, propName, val) ){
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
	//For Operation 'getQuestionOptions' with service id 'GetQuestionOptionsJava5257'
	QueryDefinition.getQuestionOptions = function(params, onCompletion){
		return QueryDefinition.customVerb('getQuestionOptions', params, onCompletion);
	};
	
	var relations = [
	];
	
	QueryDefinition.relations = relations;
	
	QueryDefinition.prototype.isValid = function(){
		return QueryDefinition.isValid(this);
	};
	
	QueryDefinition.prototype.objModelName = "QueryDefinition";
	
	return QueryDefinition;
});