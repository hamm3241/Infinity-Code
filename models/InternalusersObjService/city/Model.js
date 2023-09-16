define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		Country_id : function(val, state){
			state['Country_id'] = val;
		},
		id : function(val, state){
			state['id'] = val;
		},
		Name : function(val, state){
			state['Name'] = val;
		},
		Region_id : function(val, state){
			state['Region_id'] = val;
		},
	};
	
	
	//Create the Model Class
	function city(defaultValues){
		var privateState = {};
			privateState.Country_id = defaultValues?(defaultValues["Country_id"]?defaultValues["Country_id"]:null):null;
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.Name = defaultValues?(defaultValues["Name"]?defaultValues["Name"]:null):null;
			privateState.Region_id = defaultValues?(defaultValues["Region_id"]?defaultValues["Region_id"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"Country_id" : {
					get : function(){return privateState.Country_id},
					set : function(val){
						setterFunctions['Country_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"id" : {
					get : function(){return privateState.id},
					set : function(val){throw Error("id cannot be changed."); },
					enumerable : true,
				},
				"Name" : {
					get : function(){return privateState.Name},
					set : function(val){
						setterFunctions['Name'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Region_id" : {
					get : function(){return privateState.Region_id},
					set : function(val){
						setterFunctions['Region_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(city);
	
	//Create new class level validator object
	BaseModel.Validator.call(city);
	
	var registerValidatorBackup = city.registerValidator;
	
	city.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( city.isValid(this, propName, val) ){
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
	
	city.relations = relations;
	
	city.prototype.isValid = function(){
		return city.isValid(this);
	};
	
	city.prototype.objModelName = "city";
	
	return city;
});