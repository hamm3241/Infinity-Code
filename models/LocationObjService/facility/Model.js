define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		id : function(val, state){
			state['id'] = val;
		},
		code : function(val, state){
			state['code'] = val;
		},
		name : function(val, state){
			state['name'] = val;
		},
		description : function(val, state){
			state['description'] = val;
		},
		facilitytype : function(val, state){
			state['facilitytype'] = val;
		},
	};
	
	
	//Create the Model Class
	function facility(defaultValues){
		var privateState = {};
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.code = defaultValues?(defaultValues["code"]?defaultValues["code"]:null):null;
			privateState.name = defaultValues?(defaultValues["name"]?defaultValues["name"]:null):null;
			privateState.description = defaultValues?(defaultValues["description"]?defaultValues["description"]:null):null;
			privateState.facilitytype = defaultValues?(defaultValues["facilitytype"]?defaultValues["facilitytype"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"id" : {
					get : function(){return privateState.id},
					set : function(val){throw Error("id cannot be changed."); },
					enumerable : true,
				},
				"code" : {
					get : function(){return privateState.code},
					set : function(val){
						setterFunctions['code'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"name" : {
					get : function(){return privateState.name},
					set : function(val){
						setterFunctions['name'].call(this,val,privateState);
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
				"facilitytype" : {
					get : function(){return privateState.facilitytype},
					set : function(val){
						setterFunctions['facilitytype'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(facility);
	
	//Create new class level validator object
	BaseModel.Validator.call(facility);
	
	var registerValidatorBackup = facility.registerValidator;
	
	facility.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( facility.isValid(this, propName, val) ){
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
	
	facility.relations = relations;
	
	facility.prototype.isValid = function(){
		return facility.isValid(this);
	};
	
	facility.prototype.objModelName = "facility";
	
	return facility;
});