define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		bundle_id : function(val, state){
			state['bundle_id'] = val;
		},
		config_type : function(val, state){
			state['config_type'] = val;
		},
		description : function(val, state){
			state['description'] = val;
		},
		config_key : function(val, state){
			state['config_key'] = val;
		},
		config_value : function(val, state){
			state['config_value'] = val;
		},
		lastUpdatedTime : function(val, state){
			state['lastUpdatedTime'] = val;
		},
		Sno : function(val, state){
			state['Sno'] = val;
		},
	};
	
	
	//Create the Model Class
	function LoansConfigurations(defaultValues){
		var privateState = {};
			privateState.bundle_id = defaultValues?(defaultValues["bundle_id"]?defaultValues["bundle_id"]:null):null;
			privateState.config_type = defaultValues?(defaultValues["config_type"]?defaultValues["config_type"]:null):null;
			privateState.description = defaultValues?(defaultValues["description"]?defaultValues["description"]:null):null;
			privateState.config_key = defaultValues?(defaultValues["config_key"]?defaultValues["config_key"]:null):null;
			privateState.config_value = defaultValues?(defaultValues["config_value"]?defaultValues["config_value"]:null):null;
			privateState.lastUpdatedTime = defaultValues?(defaultValues["lastUpdatedTime"]?defaultValues["lastUpdatedTime"]:null):null;
			privateState.Sno = defaultValues?(defaultValues["Sno"]?defaultValues["Sno"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"bundle_id" : {
					get : function(){return privateState.bundle_id},
					set : function(val){throw Error("bundle_id cannot be changed."); },
					enumerable : true,
				},
				"config_type" : {
					get : function(){return privateState.config_type},
					set : function(val){
						setterFunctions['config_type'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"description" : {
					get : function(){return privateState.description},
					set : function(val){
						setterFunctions['description'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"config_key" : {
					get : function(){return privateState.config_key},
					set : function(val){
						setterFunctions['config_key'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"config_value" : {
					get : function(){return privateState.config_value},
					set : function(val){
						setterFunctions['config_value'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"lastUpdatedTime" : {
					get : function(){return privateState.lastUpdatedTime},
					set : function(val){
						setterFunctions['lastUpdatedTime'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Sno" : {
					get : function(){return privateState.Sno},
					set : function(val){
						setterFunctions['Sno'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(LoansConfigurations);
	
	//Create new class level validator object
	BaseModel.Validator.call(LoansConfigurations);
	
	var registerValidatorBackup = LoansConfigurations.registerValidator;
	
	LoansConfigurations.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( LoansConfigurations.isValid(this, propName, val) ){
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
	
	LoansConfigurations.relations = relations;
	
	LoansConfigurations.prototype.isValid = function(){
		return LoansConfigurations.isValid(this);
	};
	
	LoansConfigurations.prototype.objModelName = "LoansConfigurations";
	
	return LoansConfigurations;
});