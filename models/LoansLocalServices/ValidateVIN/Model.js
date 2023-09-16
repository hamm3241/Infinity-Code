define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		VIN : function(val, state){
			state['VIN'] = val;
		},
		trim : function(val, state){
			state['trim'] = val;
		},
		type : function(val, state){
			state['type'] = val;
		},
		year : function(val, state){
			state['year'] = val;
		},
		make : function(val, state){
			state['make'] = val;
		},
		model : function(val, state){
			state['model'] = val;
		},
	};
	
	
	//Create the Model Class
	function ValidateVIN(defaultValues){
		var privateState = {};
			privateState.VIN = defaultValues?(defaultValues["VIN"]?defaultValues["VIN"]:null):null;
			privateState.trim = defaultValues?(defaultValues["trim"]?defaultValues["trim"]:null):null;
			privateState.type = defaultValues?(defaultValues["type"]?defaultValues["type"]:null):null;
			privateState.year = defaultValues?(defaultValues["year"]?defaultValues["year"]:null):null;
			privateState.make = defaultValues?(defaultValues["make"]?defaultValues["make"]:null):null;
			privateState.model = defaultValues?(defaultValues["model"]?defaultValues["model"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"VIN" : {
					get : function(){return privateState.VIN},
					set : function(val){throw Error("VIN cannot be changed."); },
					enumerable : true,
				},
				"trim" : {
					get : function(){return privateState.trim},
					set : function(val){
						setterFunctions['trim'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"type" : {
					get : function(){return privateState.type},
					set : function(val){
						setterFunctions['type'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"year" : {
					get : function(){return privateState.year},
					set : function(val){
						setterFunctions['year'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"make" : {
					get : function(){return privateState.make},
					set : function(val){
						setterFunctions['make'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"model" : {
					get : function(){return privateState.model},
					set : function(val){
						setterFunctions['model'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(ValidateVIN);
	
	//Create new class level validator object
	BaseModel.Validator.call(ValidateVIN);
	
	var registerValidatorBackup = ValidateVIN.registerValidator;
	
	ValidateVIN.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( ValidateVIN.isValid(this, propName, val) ){
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
	//For Operation 'verifyVIN' with service id 'DecodeVinNumber1722'
	ValidateVIN.verifyVIN = function(params, onCompletion){
		return ValidateVIN.customVerb('verifyVIN', params, onCompletion);
	};
	
	var relations = [
	];
	
	ValidateVIN.relations = relations;
	
	ValidateVIN.prototype.isValid = function(){
		return ValidateVIN.isValid(this);
	};
	
	ValidateVIN.prototype.objModelName = "ValidateVIN";
	
	return ValidateVIN;
});