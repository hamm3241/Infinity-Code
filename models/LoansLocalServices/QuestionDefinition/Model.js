define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		id : function(val, state){
			state['id'] = val;
		},
		QueryDefinition_id : function(val, state){
			state['QueryDefinition_id'] = val;
		},
		DataType_id : function(val, state){
			state['DataType_id'] = val;
		},
		OptionGroup_id : function(val, state){
			state['OptionGroup_id'] = val;
		},
		Unit : function(val, state){
			state['Unit'] = val;
		},
		Name : function(val, state){
			state['Name'] = val;
		},
		Label : function(val, state){
			state['Label'] = val;
		},
		IsRequired : function(val, state){
			state['IsRequired'] = val;
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
	function QuestionDefinition(defaultValues){
		var privateState = {};
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.QueryDefinition_id = defaultValues?(defaultValues["QueryDefinition_id"]?defaultValues["QueryDefinition_id"]:null):null;
			privateState.DataType_id = defaultValues?(defaultValues["DataType_id"]?defaultValues["DataType_id"]:null):null;
			privateState.OptionGroup_id = defaultValues?(defaultValues["OptionGroup_id"]?defaultValues["OptionGroup_id"]:null):null;
			privateState.Unit = defaultValues?(defaultValues["Unit"]?defaultValues["Unit"]:null):null;
			privateState.Name = defaultValues?(defaultValues["Name"]?defaultValues["Name"]:null):null;
			privateState.Label = defaultValues?(defaultValues["Label"]?defaultValues["Label"]:null):null;
			privateState.IsRequired = defaultValues?(defaultValues["IsRequired"]?defaultValues["IsRequired"]:null):null;
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
				"QueryDefinition_id" : {
					get : function(){return privateState.QueryDefinition_id},
					set : function(val){
						setterFunctions['QueryDefinition_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"DataType_id" : {
					get : function(){return privateState.DataType_id},
					set : function(val){
						setterFunctions['DataType_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"OptionGroup_id" : {
					get : function(){return privateState.OptionGroup_id},
					set : function(val){
						setterFunctions['OptionGroup_id'].call(this,val,privateState);
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
				"Name" : {
					get : function(){return privateState.Name},
					set : function(val){
						setterFunctions['Name'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Label" : {
					get : function(){return privateState.Label},
					set : function(val){
						setterFunctions['Label'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"IsRequired" : {
					get : function(){return privateState.IsRequired},
					set : function(val){
						setterFunctions['IsRequired'].call(this,val,privateState);
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
	BaseModel.isParentOf(QuestionDefinition);
	
	//Create new class level validator object
	BaseModel.Validator.call(QuestionDefinition);
	
	var registerValidatorBackup = QuestionDefinition.registerValidator;
	
	QuestionDefinition.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( QuestionDefinition.isValid(this, propName, val) ){
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
	
	QuestionDefinition.relations = relations;
	
	QuestionDefinition.prototype.isValid = function(){
		return QuestionDefinition.isValid(this);
	};
	
	QuestionDefinition.prototype.objModelName = "QuestionDefinition";
	
	return QuestionDefinition;
});