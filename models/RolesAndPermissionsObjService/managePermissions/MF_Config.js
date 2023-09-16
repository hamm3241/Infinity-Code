define([],function(){
	var mappings = {
		"AssignedTo" : "AssignedTo",
		"Permission_Details" : "Permission_Details",
		"RemovedFrom" : "RemovedFrom",
		"User_id" : "User_id",
	};
	Object.freeze(mappings);
	
	var typings = {
		"AssignedTo" : "string",
		"Permission_Details" : "string",
		"RemovedFrom" : "string",
		"User_id" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "RolesAndPermissionsObjService",
		tableName : "managePermissions"
	};
	Object.freeze(config);
	
	return config;
})
