define([],function(){
	var mappings = {
		"code" : "code",
		"name" : "name",
		"symbol" : "symbol",
	};
	Object.freeze(mappings);
	
	var typings = {
		"code" : "string",
		"name" : "string",
		"symbol" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"code",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "LocationObjService",
		tableName : "currency"
	};
	Object.freeze(config);
	
	return config;
})
