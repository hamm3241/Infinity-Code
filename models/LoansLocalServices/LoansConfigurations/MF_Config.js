define([],function(){
	var mappings = {
		"bundle_id" : "bundle_id",
		"config_type" : "config_type",
		"description" : "description",
		"config_key" : "config_key",
		"config_value" : "config_value",
		"lastUpdatedTime" : "lastUpdatedTime",
		"Sno" : "Sno",
	};
	Object.freeze(mappings);
	
	var typings = {
		"bundle_id" : "string",
		"config_type" : "string",
		"description" : "string",
		"config_key" : "string",
		"config_value" : "string",
		"lastUpdatedTime" : "string",
		"Sno" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"bundle_id",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "LoansLocalServices",
		tableName : "LoansConfigurations"
	};
	Object.freeze(config);
	
	return config;
})
