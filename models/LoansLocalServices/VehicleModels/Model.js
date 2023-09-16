define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		id : function(val, state){
			state['id'] = val;
		},
		Make_ID : function(val, state){
			state['Make_ID'] = val;
		},
		Make_Name : function(val, state){
			state['Make_Name'] = val;
		},
		Model_ID : function(val, state){
			state['Model_ID'] = val;
		},
		Model_Name : function(val, state){
			state['Model_Name'] = val;
		},
		ParentVehicleTypeName : function(val, state){
			state['ParentVehicleTypeName'] = val;
		},
		VehicleTypeId : function(val, state){
			state['VehicleTypeId'] = val;
		},
		VehicleTypeName : function(val, state){
			state['VehicleTypeName'] = val;
		},
		Year : function(val, state){
			state['Year'] = val;
		},
	};
	
	
	//Create the Model Class
	function VehicleModels(defaultValues){
		var privateState = {};
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.Make_ID = defaultValues?(defaultValues["Make_ID"]?defaultValues["Make_ID"]:null):null;
			privateState.Make_Name = defaultValues?(defaultValues["Make_Name"]?defaultValues["Make_Name"]:null):null;
			privateState.Model_ID = defaultValues?(defaultValues["Model_ID"]?defaultValues["Model_ID"]:null):null;
			privateState.Model_Name = defaultValues?(defaultValues["Model_Name"]?defaultValues["Model_Name"]:null):null;
			privateState.ParentVehicleTypeName = defaultValues?(defaultValues["ParentVehicleTypeName"]?defaultValues["ParentVehicleTypeName"]:null):null;
			privateState.VehicleTypeId = defaultValues?(defaultValues["VehicleTypeId"]?defaultValues["VehicleTypeId"]:null):null;
			privateState.VehicleTypeName = defaultValues?(defaultValues["VehicleTypeName"]?defaultValues["VehicleTypeName"]:null):null;
			privateState.Year = defaultValues?(defaultValues["Year"]?defaultValues["Year"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"id" : {
					get : function(){return privateState.id},
					set : function(val){throw Error("id cannot be changed."); },
					enumerable : true,
				},
				"Make_ID" : {
					get : function(){return privateState.Make_ID},
					set : function(val){
						setterFunctions['Make_ID'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Make_Name" : {
					get : function(){return privateState.Make_Name},
					set : function(val){
						setterFunctions['Make_Name'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Model_ID" : {
					get : function(){return privateState.Model_ID},
					set : function(val){
						setterFunctions['Model_ID'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Model_Name" : {
					get : function(){return privateState.Model_Name},
					set : function(val){
						setterFunctions['Model_Name'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ParentVehicleTypeName" : {
					get : function(){return privateState.ParentVehicleTypeName},
					set : function(val){
						setterFunctions['ParentVehicleTypeName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"VehicleTypeId" : {
					get : function(){return privateState.VehicleTypeId},
					set : function(val){
						setterFunctions['VehicleTypeId'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"VehicleTypeName" : {
					get : function(){return privateState.VehicleTypeName},
					set : function(val){
						setterFunctions['VehicleTypeName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Year" : {
					get : function(){return privateState.Year},
					set : function(val){
						setterFunctions['Year'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(VehicleModels);
	
	//Create new class level validator object
	BaseModel.Validator.call(VehicleModels);
	
	var registerValidatorBackup = VehicleModels.registerValidator;
	
	VehicleModels.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( VehicleModels.isValid(this, propName, val) ){
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
	
	VehicleModels.relations = relations;
	
	VehicleModels.prototype.isValid = function(){
		return VehicleModels.isValid(this);
	};
	
	VehicleModels.prototype.objModelName = "VehicleModels";
	
	return VehicleModels;
});