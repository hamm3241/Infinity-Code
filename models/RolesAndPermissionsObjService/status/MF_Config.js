define([],function(){
	var mappings = {
		"Code" : "Code",
		"createdby" : "createdby",
		"createdts" : "createdts",
		"Description" : "Description",
		"id" : "id",
		"lastmodifiedts" : "lastmodifiedts",
		"modifiedby" : "modifiedby",
		"softdeleteflag" : "softdeleteflag",
		"synctimestamp" : "synctimestamp",
		"Type_id" : "Type_id",
	};
	Object.freeze(mappings);
	
	var typings = {
		"Code" : "string",
		"createdby" : "string",
		"createdts" : "date",
		"Description" : "string",
		"id" : "string",
		"lastmodifiedts" : "date",
		"modifiedby" : "string",
		"softdeleteflag" : "boolean",
		"synctimestamp" : "date",
		"Type_id" : "string",
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
		tableName : "status"
	};
	Object.freeze(config);
	
	return config;
})
