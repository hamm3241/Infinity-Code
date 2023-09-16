define([],function(){
	var mappings = {
		"Code" : "Code",
		"Country_id" : "Country_id",
		"id" : "id",
		"Name" : "Name",
	};
	Object.freeze(mappings);
	
	var typings = {
		"Code" : "string",
		"Country_id" : "string",
		"id" : "string",
		"Name" : "string",
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
		tableName : "region"
	};
	Object.freeze(config);
	
	return config;
})
