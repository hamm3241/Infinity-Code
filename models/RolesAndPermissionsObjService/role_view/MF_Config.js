define([],function(){
	var mappings = {
		"permission_Count" : "permission_Count",
		"roleType_id" : "roleType_id",
		"role_Desc" : "role_Desc",
		"role_id" : "role_id",
		"role_Name" : "role_Name",
		"Status_Desc" : "Status_Desc",
		"Status_id" : "Status_id",
		"Users_Count" : "Users_Count",
	};
	Object.freeze(mappings);
	
	var typings = {
		"permission_Count" : "string",
		"roleType_id" : "string",
		"role_Desc" : "string",
		"role_id" : "string",
		"role_Name" : "string",
		"Status_Desc" : "string",
		"Status_id" : "string",
		"Users_Count" : "string",
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
		tableName : "role_view"
	};
	Object.freeze(config);
	
	return config;
})
