define([],function(){
	var mappings = {
		"Country_id" : "Country_id",
		"id" : "id",
		"Name" : "Name",
		"Region_id" : "Region_id",
	};
	Object.freeze(mappings);
	
	var typings = {
		"Country_id" : "string",
		"id" : "string",
		"Name" : "string",
		"Region_id" : "string",
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
		serviceName : "InternalusersObjService",
		tableName : "city"
	};
	Object.freeze(config);
	
	return config;
})
