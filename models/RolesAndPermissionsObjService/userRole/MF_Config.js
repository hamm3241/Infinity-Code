define([],function(){
	var mappings = {
		"createdby" : "createdby",
		"createdts" : "createdts",
		"hasSuperAdminPrivilages" : "hasSuperAdminPrivilages",
		"lastmodifiedts" : "lastmodifiedts",
		"modifiedby" : "modifiedby",
		"Role_id" : "Role_id",
		"softdeleteflag" : "softdeleteflag",
		"synctimestamp" : "synctimestamp",
		"User_id" : "User_id",
	};
	Object.freeze(mappings);
	
	var typings = {
		"createdby" : "string",
		"createdts" : "date",
		"hasSuperAdminPrivilages" : "boolean",
		"lastmodifiedts" : "date",
		"modifiedby" : "string",
		"Role_id" : "string",
		"softdeleteflag" : "boolean",
		"synctimestamp" : "date",
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
		tableName : "userRole"
	};
	Object.freeze(config);
	
	return config;
})
