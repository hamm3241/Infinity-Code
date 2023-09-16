define([],function(){
	var mappings = {
		"id" : "id",
		"MakeId" : "MakeId",
		"MakeName" : "MakeName",
		"ParentVehicleTypeName" : "ParentVehicleTypeName",
		"VehicleTypeId" : "VehicleTypeId",
		"VehicleTypeName" : "VehicleTypeName",
	};
	Object.freeze(mappings);
	
	var typings = {
		"id" : "string",
		"MakeId" : "number",
		"MakeName" : "string",
		"ParentVehicleTypeName" : "string",
		"VehicleTypeId" : "number",
		"VehicleTypeName" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"id",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "LoansLocalServices",
		tableName : "VehicleMakes"
	};
	Object.freeze(config);
	
	return config;
})
