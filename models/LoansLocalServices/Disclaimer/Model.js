define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		App_id : function(val, state){
			state['App_id'] = val;
		},
		ContentType : function(val, state){
			state['ContentType'] = val;
		},
		createdby : function(val, state){
			state['createdby'] = val;
		},
		createdts : function(val, state){
			state['createdts'] = val;
		},
		DisclaimerName : function(val, state){
			state['DisclaimerName'] = val;
		},
		DisclaimerText : function(val, state){
			state['DisclaimerText'] = val;
		},
		DisclaimerUrl : function(val, state){
			state['DisclaimerUrl'] = val;
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
		ModuleName : function(val, state){
			state['ModuleName'] = val;
		},
		softdeleteflag : function(val, state){
			state['softdeleteflag'] = val;
		},
		synctimestamp : function(val, state){
			state['synctimestamp'] = val;
		},
	};
	
	
	//Create the Model Class
	function Disclaimer(defaultValues){
		var privateState = {};
			privateState.App_id = defaultValues?(defaultValues["App_id"]?defaultValues["App_id"]:null):null;
			privateState.ContentType = defaultValues?(defaultValues["ContentType"]?defaultValues["ContentType"]:null):null;
			privateState.createdby = defaultValues?(defaultValues["createdby"]?defaultValues["createdby"]:null):null;
			privateState.createdts = defaultValues?(defaultValues["createdts"]?defaultValues["createdts"]:null):null;
			privateState.DisclaimerName = defaultValues?(defaultValues["DisclaimerName"]?defaultValues["DisclaimerName"]:null):null;
			privateState.DisclaimerText = defaultValues?(defaultValues["DisclaimerText"]?defaultValues["DisclaimerText"]:null):null;
			privateState.DisclaimerUrl = defaultValues?(defaultValues["DisclaimerUrl"]?defaultValues["DisclaimerUrl"]:null):null;
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.lastmodifiedts = defaultValues?(defaultValues["lastmodifiedts"]?defaultValues["lastmodifiedts"]:null):null;
			privateState.modifiedby = defaultValues?(defaultValues["modifiedby"]?defaultValues["modifiedby"]:null):null;
			privateState.ModuleName = defaultValues?(defaultValues["ModuleName"]?defaultValues["ModuleName"]:null):null;
			privateState.softdeleteflag = defaultValues?(defaultValues["softdeleteflag"]?defaultValues["softdeleteflag"]:null):null;
			privateState.synctimestamp = defaultValues?(defaultValues["synctimestamp"]?defaultValues["synctimestamp"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"App_id" : {
					get : function(){return privateState.App_id},
					set : function(val){
						setterFunctions['App_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ContentType" : {
					get : function(){return privateState.ContentType},
					set : function(val){
						setterFunctions['ContentType'].call(this,val,privateState);
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
				"DisclaimerName" : {
					get : function(){return privateState.DisclaimerName},
					set : function(val){
						setterFunctions['DisclaimerName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"DisclaimerText" : {
					get : function(){return privateState.DisclaimerText},
					set : function(val){
						setterFunctions['DisclaimerText'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"DisclaimerUrl" : {
					get : function(){return privateState.DisclaimerUrl},
					set : function(val){
						setterFunctions['DisclaimerUrl'].call(this,val,privateState);
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
				"ModuleName" : {
					get : function(){return privateState.ModuleName},
					set : function(val){
						setterFunctions['ModuleName'].call(this,val,privateState);
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
	BaseModel.isParentOf(Disclaimer);
	
	//Create new class level validator object
	BaseModel.Validator.call(Disclaimer);
	
	var registerValidatorBackup = Disclaimer.registerValidator;
	
	Disclaimer.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( Disclaimer.isValid(this, propName, val) ){
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
	
	Disclaimer.relations = relations;
	
	Disclaimer.prototype.isValid = function(){
		return Disclaimer.isValid(this);
	};
	
	Disclaimer.prototype.objModelName = "Disclaimer";
	
	return Disclaimer;
});