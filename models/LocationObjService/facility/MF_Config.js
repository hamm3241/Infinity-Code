define([],function(){
	var mappings = {
		"id" : "id",
		"code" : "code",
		"name" : "name",
		"description" : "description",
		"facilitytype" : "facilitytype",
	};
	Object.freeze(mappings);
	
	var typings = {
		"id" : "string",
		"code" : "string",
		"name" : "string",
		"description" : "string",
		"facilitytype" : "string",
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
		serviceName : "LocationObjService",
		tableName : "facility"
	};
	Object.freeze(config);
	
	return config;
})
