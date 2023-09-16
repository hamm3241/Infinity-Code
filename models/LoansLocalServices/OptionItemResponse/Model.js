define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		id : function(val, state){
			state['id'] = val;
		},
		QuestionResponse_id : function(val, state){
			state['QuestionResponse_id'] = val;
		},
		OptionItem_id : function(val, state){
			state['OptionItem_id'] = val;
		},
		ItemValue : function(val, state){
			state['ItemValue'] = val;
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
	function OptionItemResponse(defaultValues){
		var privateState = {};
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.QuestionResponse_id = defaultValues?(defaultValues["QuestionResponse_id"]?defaultValues["QuestionResponse_id"]:null):null;
			privateState.OptionItem_id = defaultValues?(defaultValues["OptionItem_id"]?defaultValues["OptionItem_id"]:null):null;
			privateState.ItemValue = defaultValues?(defaultValues["ItemValue"]?defaultValues["ItemValue"]:null):null;
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
				"QuestionResponse_id" : {
					get : function(){return privateState.QuestionResponse_id},
					set : function(val){
						setterFunctions['QuestionResponse_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"OptionItem_id" : {
					get : function(){return privateState.OptionItem_id},
					set : function(val){
						setterFunctions['OptionItem_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ItemValue" : {
					get : function(){return privateState.ItemValue},
					set : function(val){
						setterFunctions['ItemValue'].call(this,val,privateState);
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
	BaseModel.isParentOf(OptionItemResponse);
	
	//Create new class level validator object
	BaseModel.Validator.call(OptionItemResponse);
	
	var registerValidatorBackup = OptionItemResponse.registerValidator;
	
	OptionItemResponse.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( OptionItemResponse.isValid(this, propName, val) ){
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
	
	OptionItemResponse.relations = relations;
	
	OptionItemResponse.prototype.isValid = function(){
		return OptionItemResponse.isValid(this);
	};
	
	OptionItemResponse.prototype.objModelName = "OptionItemResponse";
	
	return OptionItemResponse;
});