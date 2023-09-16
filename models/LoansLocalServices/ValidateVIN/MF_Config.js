define([],function(){
	var mappings = {
		"VIN" : "VIN",
		"trim" : "trim",
		"type" : "type",
		"year" : "year",
		"make" : "make",
		"model" : "model",
	};
	Object.freeze(mappings);
	
	var typings = {
		"VIN" : "string",
		"trim" : "string",
		"type" : "string",
		"year" : "string",
		"make" : "string",
		"model" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"VIN",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "LoansLocalServices",
		tableName : "ValidateVIN"
	};
	Object.freeze(config);
	
	return config;
})
