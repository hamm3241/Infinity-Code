define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		id : function(val, state){
			state['id'] = val;
		},
		MakeId : function(val, state){
			state['MakeId'] = val;
		},
		MakeName : function(val, state){
			state['MakeName'] = val;
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
	};
	
	
	//Create the Model Class
	function VehicleMakes(defaultValues){
		var privateState = {};
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.MakeId = defaultValues?(defaultValues["MakeId"]?defaultValues["MakeId"]:null):null;
			privateState.MakeName = defaultValues?(defaultValues["MakeName"]?defaultValues["MakeName"]:null):null;
			privateState.ParentVehicleTypeName = defaultValues?(defaultValues["ParentVehicleTypeName"]?defaultValues["ParentVehicleTypeName"]:null):null;
			privateState.VehicleTypeId = defaultValues?(defaultValues["VehicleTypeId"]?defaultValues["VehicleTypeId"]:null):null;
			privateState.VehicleTypeName = defaultValues?(defaultValues["VehicleTypeName"]?defaultValues["VehicleTypeName"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"id" : {
					get : function(){return privateState.id},
					set : function(val){throw Error("id cannot be changed."); },
					enumerable : true,
				},
				"MakeId" : {
					get : function(){return privateState.MakeId},
					set : function(val){
						setterFunctions['MakeId'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"MakeName" : {
					get : function(){return privateState.MakeName},
					set : function(val){
						setterFunctions['MakeName'].call(this,val,privateState);
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
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(VehicleMakes);
	
	//Create new class level validator object
	BaseModel.Validator.call(VehicleMakes);
	
	var registerValidatorBackup = VehicleMakes.registerValidator;
	
	VehicleMakes.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( VehicleMakes.isValid(this, propName, val) ){
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
	
	VehicleMakes.relations = relations;
	
	VehicleMakes.prototype.isValid = function(){
		return VehicleMakes.isValid(this);
	};
	
	VehicleMakes.prototype.objModelName = "VehicleMakes";
	
	return VehicleMakes;
});