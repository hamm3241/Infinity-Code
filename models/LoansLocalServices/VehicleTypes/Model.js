define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
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
	function VehicleTypes(defaultValues){
		var privateState = {};
			privateState.ParentVehicleTypeName = defaultValues?(defaultValues["ParentVehicleTypeName"]?defaultValues["ParentVehicleTypeName"]:null):null;
			privateState.VehicleTypeId = defaultValues?(defaultValues["VehicleTypeId"]?defaultValues["VehicleTypeId"]:null):null;
			privateState.VehicleTypeName = defaultValues?(defaultValues["VehicleTypeName"]?defaultValues["VehicleTypeName"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"ParentVehicleTypeName" : {
					get : function(){return privateState.ParentVehicleTypeName},
					set : function(val){
						setterFunctions['ParentVehicleTypeName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"VehicleTypeId" : {
					get : function(){return privateState.VehicleTypeId},
					set : function(val){throw Error("VehicleTypeId cannot be changed."); },
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
	BaseModel.isParentOf(VehicleTypes);
	
	//Create new class level validator object
	BaseModel.Validator.call(VehicleTypes);
	
	var registerValidatorBackup = VehicleTypes.registerValidator;
	
	VehicleTypes.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( VehicleTypes.isValid(this, propName, val) ){
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
	
	VehicleTypes.relations = relations;
	
	VehicleTypes.prototype.isValid = function(){
		return VehicleTypes.isValid(this);
	};
	
	VehicleTypes.prototype.objModelName = "VehicleTypes";
	
	return VehicleTypes;
});