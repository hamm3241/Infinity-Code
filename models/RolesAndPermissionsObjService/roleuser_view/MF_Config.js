define([],function(){
	var mappings = {
		"Email" : "Email",
		"FirstName" : "FirstName",
		"LastModifiedTimeStamp" : "LastModifiedTimeStamp",
		"LastName" : "LastName",
		"MiddleName" : "MiddleName",
		"Role_id" : "Role_id",
		"Status_id" : "Status_id",
		"UpdatedBy" : "UpdatedBy",
		"Username" : "Username",
		"User_id" : "User_id",
	};
	Object.freeze(mappings);
	
	var typings = {
		"Email" : "string",
		"FirstName" : "string",
		"LastModifiedTimeStamp" : "date",
		"LastName" : "string",
		"MiddleName" : "string",
		"Role_id" : "string",
		"Status_id" : "string",
		"UpdatedBy" : "string",
		"Username" : "string",
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
		tableName : "roleuser_view"
	};
	Object.freeze(config);
	
	return config;
})
