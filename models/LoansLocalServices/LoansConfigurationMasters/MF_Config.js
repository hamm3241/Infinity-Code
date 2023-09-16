define([],function(){
	var mappings = {
		"bundle_id" : "bundle_id",
		"app_id" : "app_id",
		"channels" : "channels",
		"user_id" : "user_id",
		"role" : "role",
		"device_id" : "device_id",
		"app_version" : "app_version",
	};
	Object.freeze(mappings);
	
	var typings = {
		"bundle_id" : "string",
		"app_id" : "string",
		"channels" : "string",
		"user_id" : "string",
		"role" : "string",
		"device_id" : "string",
		"app_version" : "string",
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
		tableName : "LoansConfigurationMasters"
	};
	Object.freeze(config);
	
	return config;
})
