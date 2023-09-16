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
		PercentageCompletion : function(val, state){
			state['PercentageCompletion'] = val;
		},
		QueryResponse_id : function(val, state){
			state['QueryResponse_id'] = val;
		},
		QuerySection_id : function(val, state){
			state['QuerySection_id'] = val;
		},
		softdeleteflag : function(val, state){
			state['softdeleteflag'] = val;
		},
		Status : function(val, state){
			state['Status'] = val;
		},
		synctimestamp : function(val, state){
			state['synctimestamp'] = val;
		},
		User_id : function(val, state){
			state['User_id'] = val;
		},
	};
	
	
	//Create the Model Class
	function UserQuerySectionStatus(defaultValues){
		var privateState = {};
			privateState.createdby = defaultValues?(defaultValues["createdby"]?defaultValues["createdby"]:null):null;
			privateState.createdts = defaultValues?(defaultValues["createdts"]?defaultValues["createdts"]:null):null;
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.lastmodifiedts = defaultValues?(defaultValues["lastmodifiedts"]?defaultValues["lastmodifiedts"]:null):null;
			privateState.modifiedby = defaultValues?(defaultValues["modifiedby"]?defaultValues["modifiedby"]:null):null;
			privateState.PercentageCompletion = defaultValues?(defaultValues["PercentageCompletion"]?defaultValues["PercentageCompletion"]:null):null;
			privateState.QueryResponse_id = defaultValues?(defaultValues["QueryResponse_id"]?defaultValues["QueryResponse_id"]:null):null;
			privateState.QuerySection_id = defaultValues?(defaultValues["QuerySection_id"]?defaultValues["QuerySection_id"]:null):null;
			privateState.softdeleteflag = defaultValues?(defaultValues["softdeleteflag"]?defaultValues["softdeleteflag"]:null):null;
			privateState.Status = defaultValues?(defaultValues["Status"]?defaultValues["Status"]:null):null;
			privateState.synctimestamp = defaultValues?(defaultValues["synctimestamp"]?defaultValues["synctimestamp"]:null):null;
			privateState.User_id = defaultValues?(defaultValues["User_id"]?defaultValues["User_id"]:null):null;
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
				"PercentageCompletion" : {
					get : function(){return privateState.PercentageCompletion},
					set : function(val){
						setterFunctions['PercentageCompletion'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"QueryResponse_id" : {
					get : function(){return privateState.QueryResponse_id},
					set : function(val){
						setterFunctions['QueryResponse_id'].call(this,val,privateState);
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
				"softdeleteflag" : {
					get : function(){return privateState.softdeleteflag},
					set : function(val){
						setterFunctions['softdeleteflag'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Status" : {
					get : function(){return privateState.Status},
					set : function(val){
						setterFunctions['Status'].call(this,val,privateState);
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
				"User_id" : {
					get : function(){return privateState.User_id},
					set : function(val){
						setterFunctions['User_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(UserQuerySectionStatus);
	
	//Create new class level validator object
	BaseModel.Validator.call(UserQuerySectionStatus);
	
	var registerValidatorBackup = UserQuerySectionStatus.registerValidator;
	
	UserQuerySectionStatus.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( UserQuerySectionStatus.isValid(this, propName, val) ){
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
	
	UserQuerySectionStatus.relations = relations;
	
	UserQuerySectionStatus.prototype.isValid = function(){
		return UserQuerySectionStatus.isValid(this);
	};
	
	UserQuerySectionStatus.prototype.objModelName = "UserQuerySectionStatus";
	
	return UserQuerySectionStatus;
});