define([],function(){
	var mappings = {
		"Address_id" : "Address_id",
		"Branch_Complete_Addr" : "Branch_Complete_Addr",
		"Branch_id" : "Branch_id",
		"Branch_Name" : "Branch_Name",
		"City_id" : "City_id",
		"City_Name" : "City_Name",
	};
	Object.freeze(mappings);
	
	var typings = {
		"Address_id" : "string",
		"Branch_Complete_Addr" : "string",
		"Branch_id" : "string",
		"Branch_Name" : "string",
		"City_id" : "string",
		"City_Name" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "InternalusersObjService",
		tableName : "Branch"
	};
	Object.freeze(config);
	
	return config;
})
