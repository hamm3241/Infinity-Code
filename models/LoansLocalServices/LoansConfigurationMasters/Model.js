define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		bundle_id : function(val, state){
			state['bundle_id'] = val;
		},
		app_id : function(val, state){
			state['app_id'] = val;
		},
		channels : function(val, state){
			state['channels'] = val;
		},
		user_id : function(val, state){
			state['user_id'] = val;
		},
		role : function(val, state){
			state['role'] = val;
		},
		device_id : function(val, state){
			state['device_id'] = val;
		},
		app_version : function(val, state){
			state['app_version'] = val;
		},
	};
	
	
	//Create the Model Class
	function LoansConfigurationMasters(defaultValues){
		var privateState = {};
			privateState.bundle_id = defaultValues?(defaultValues["bundle_id"]?defaultValues["bundle_id"]:null):null;
			privateState.app_id = defaultValues?(defaultValues["app_id"]?defaultValues["app_id"]:null):null;
			privateState.channels = defaultValues?(defaultValues["channels"]?defaultValues["channels"]:null):null;
			privateState.user_id = defaultValues?(defaultValues["user_id"]?defaultValues["user_id"]:null):null;
			privateState.role = defaultValues?(defaultValues["role"]?defaultValues["role"]:null):null;
			privateState.device_id = defaultValues?(defaultValues["device_id"]?defaultValues["device_id"]:null):null;
			privateState.app_version = defaultValues?(defaultValues["app_version"]?defaultValues["app_version"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"bundle_id" : {
					get : function(){return privateState.bundle_id},
					set : function(val){throw Error("bundle_id cannot be changed."); },
					enumerable : true,
				},
				"app_id" : {
					get : function(){return privateState.app_id},
					set : function(val){
						setterFunctions['app_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"channels" : {
					get : function(){return privateState.channels},
					set : function(val){
						setterFunctions['channels'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"user_id" : {
					get : function(){return privateState.user_id},
					set : function(val){
						setterFunctions['user_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"role" : {
					get : function(){return privateState.role},
					set : function(val){
						setterFunctions['role'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"device_id" : {
					get : function(){return privateState.device_id},
					set : function(val){
						setterFunctions['device_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"app_version" : {
					get : function(){return privateState.app_version},
					set : function(val){
						setterFunctions['app_version'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(LoansConfigurationMasters);
	
	//Create new class level validator object
	BaseModel.Validator.call(LoansConfigurationMasters);
	
	var registerValidatorBackup = LoansConfigurationMasters.registerValidator;
	
	LoansConfigurationMasters.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( LoansConfigurationMasters.isValid(this, propName, val) ){
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
	//For Operation 'fetchConfigurations' with service id 'fetchConfigurations7587'
	LoansConfigurationMasters.fetchConfigurations = function(params, onCompletion){
		return LoansConfigurationMasters.customVerb('fetchConfigurations', params, onCompletion);
	};
	
	var relations = [
	];
	
	LoansConfigurationMasters.relations = relations;
	
	LoansConfigurationMasters.prototype.isValid = function(){
		return LoansConfigurationMasters.isValid(this);
	};
	
	LoansConfigurationMasters.prototype.objModelName = "LoansConfigurationMasters";
	
	return LoansConfigurationMasters;
});