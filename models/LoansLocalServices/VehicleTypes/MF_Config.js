define([],function(){
	var mappings = {
		"ParentVehicleTypeName" : "ParentVehicleTypeName",
		"VehicleTypeId" : "VehicleTypeId",
		"VehicleTypeName" : "VehicleTypeName",
	};
	Object.freeze(mappings);
	
	var typings = {
		"ParentVehicleTypeName" : "string",
		"VehicleTypeId" : "number",
		"VehicleTypeName" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"VehicleTypeId",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "LoansLocalServices",
		tableName : "VehicleTypes"
	};
	Object.freeze(config);
	
	return config;
})
