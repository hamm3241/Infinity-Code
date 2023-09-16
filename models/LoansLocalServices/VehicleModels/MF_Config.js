define([],function(){
	var mappings = {
		"id" : "id",
		"Make_ID" : "Make_ID",
		"Make_Name" : "Make_Name",
		"Model_ID" : "Model_ID",
		"Model_Name" : "Model_Name",
		"ParentVehicleTypeName" : "ParentVehicleTypeName",
		"VehicleTypeId" : "VehicleTypeId",
		"VehicleTypeName" : "VehicleTypeName",
		"Year" : "Year",
	};
	Object.freeze(mappings);
	
	var typings = {
		"id" : "string",
		"Make_ID" : "number",
		"Make_Name" : "string",
		"Model_ID" : "number",
		"Model_Name" : "string",
		"ParentVehicleTypeName" : "string",
		"VehicleTypeId" : "number",
		"VehicleTypeName" : "string",
		"Year" : "string",
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
		tableName : "VehicleModels"
	};
	Object.freeze(config);
	
	return config;
})
