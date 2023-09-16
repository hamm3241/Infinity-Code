define([],function(){
	var mappings = {
		"Type" : "Type",
		"Description" : "Description",
		"created" : "created",
		"Priority" : "Priority",
		"Title" : "Title",
		"id" : "id",
	};
	Object.freeze(mappings);
	
	var typings = {
		"Type" : "string",
		"Description" : "string",
		"created" : "string",
		"Priority" : "string",
		"Title" : "string",
		"id" : "string",
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
		serviceName : "DashboardObjService",
		tableName : "dashboardalerts"
	};
	Object.freeze(config);
	
	return config;
})
