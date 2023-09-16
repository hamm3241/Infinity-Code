define([],function(){
	var mappings = {
		"createdby" : "createdby",
		"createdts" : "createdts",
		"DataType_id" : "DataType_id",
		"Description" : "Description",
		"id" : "id",
		"lastmodifiedts" : "lastmodifiedts",
		"modifiedby" : "modifiedby",
		"Name" : "Name",
		"PermissionValue" : "PermissionValue",
		"Role_id" : "Role_id",
		"softdeleteflag" : "softdeleteflag",
		"Status_id" : "Status_id",
		"synctimestamp" : "synctimestamp",
		"Type_id" : "Type_id",
	};
	Object.freeze(mappings);
	
	var typings = {
		"createdby" : "string",
		"createdts" : "string",
		"DataType_id" : "string",
		"Description" : "string",
		"id" : "string",
		"lastmodifiedts" : "string",
		"modifiedby" : "string",
		"Name" : "string",
		"PermissionValue" : "string",
		"Role_id" : "string",
		"softdeleteflag" : "boolean",
		"Status_id" : "string",
		"synctimestamp" : "string",
		"Type_id" : "string",
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
		serviceName : "RolesAndPermissionsObjService",
		tableName : "PermissionObject"
	};
	Object.freeze(config);
	
	return config;
})
