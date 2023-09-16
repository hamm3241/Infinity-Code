define([],function(){
	var mappings = {
		"Code" : "Code",
		"id" : "id",
		"Name" : "Name",
	};
	Object.freeze(mappings);
	
	var typings = {
		"Code" : "string",
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
		tableName : "country"
	};
	Object.freeze(config);
	
	return config;
})
