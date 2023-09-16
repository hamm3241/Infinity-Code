define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		AddressLine1 : function(val, state){
			state['AddressLine1'] = val;
		},
		AddressLine2 : function(val, state){
			state['AddressLine2'] = val;
		},
		CityName : function(val, state){
			state['CityName'] = val;
		},
		City_id : function(val, state){
			state['City_id'] = val;
		},
		Country : function(val, state){
			state['Country'] = val;
		},
		Description : function(val, state){
			state['Description'] = val;
		},
		id : function(val, state){
			state['id'] = val;
		},
		PhoneNumber : function(val, state){
			state['PhoneNumber'] = val;
		},
		State : function(val, state){
			state['State'] = val;
		},
		Type_id : function(val, state){
			state['Type_id'] = val;
		},
		ZipCode : function(val, state){
			state['ZipCode'] = val;
		},
	};
	
	
	//Create the Model Class
	function location(defaultValues){
		var privateState = {};
			privateState.AddressLine1 = defaultValues?(defaultValues["AddressLine1"]?defaultValues["AddressLine1"]:null):null;
			privateState.AddressLine2 = defaultValues?(defaultValues["AddressLine2"]?defaultValues["AddressLine2"]:null):null;
			privateState.CityName = defaultValues?(defaultValues["CityName"]?defaultValues["CityName"]:null):null;
			privateState.City_id = defaultValues?(defaultValues["City_id"]?defaultValues["City_id"]:null):null;
			privateState.Country = defaultValues?(defaultValues["Country"]?defaultValues["Country"]:null):null;
			privateState.Description = defaultValues?(defaultValues["Description"]?defaultValues["Description"]:null):null;
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.PhoneNumber = defaultValues?(defaultValues["PhoneNumber"]?defaultValues["PhoneNumber"]:null):null;
			privateState.State = defaultValues?(defaultValues["State"]?defaultValues["State"]:null):null;
			privateState.Type_id = defaultValues?(defaultValues["Type_id"]?defaultValues["Type_id"]:null):null;
			privateState.ZipCode = defaultValues?(defaultValues["ZipCode"]?defaultValues["ZipCode"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"AddressLine1" : {
					get : function(){return privateState.AddressLine1},
					set : function(val){
						setterFunctions['AddressLine1'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"AddressLine2" : {
					get : function(){return privateState.AddressLine2},
					set : function(val){
						setterFunctions['AddressLine2'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"CityName" : {
					get : function(){return privateState.CityName},
					set : function(val){
						setterFunctions['CityName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"City_id" : {
					get : function(){return privateState.City_id},
					set : function(val){
						setterFunctions['City_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Country" : {
					get : function(){return privateState.Country},
					set : function(val){
						setterFunctions['Country'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Description" : {
					get : function(){return privateState.Description},
					set : function(val){
						setterFunctions['Description'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"id" : {
					get : function(){return privateState.id},
					set : function(val){throw Error("id cannot be changed."); },
					enumerable : true,
				},
				"PhoneNumber" : {
					get : function(){return privateState.PhoneNumber},
					set : function(val){
						setterFunctions['PhoneNumber'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"State" : {
					get : function(){return privateState.State},
					set : function(val){
						setterFunctions['State'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Type_id" : {
					get : function(){return privateState.Type_id},
					set : function(val){
						setterFunctions['Type_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ZipCode" : {
					get : function(){return privateState.ZipCode},
					set : function(val){
						setterFunctions['ZipCode'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(location);
	
	//Create new class level validator object
	BaseModel.Validator.call(location);
	
	var registerValidatorBackup = location.registerValidator;
	
	location.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( location.isValid(this, propName, val) ){
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
	
	location.relations = relations;
	
	location.prototype.isValid = function(){
		return location.isValid(this);
	};
	
	location.prototype.objModelName = "location";
	
	return location;
});