define([],function(){
	var mappings = {
		"Email" : "Email",
		"FirstName" : "FirstName",
		"LastModifiedTimeStamp" : "LastModifiedTimeStamp",
		"LastName" : "LastName",
		"MiddleName" : "MiddleName",
		"Status_id" : "Status_id",
		"UpdatedBy" : "UpdatedBy",
		"UserID" : "UserID",
		"Username" : "Username",
	};
	Object.freeze(mappings);
	
	var typings = {
		"Email" : "string",
		"FirstName" : "string",
		"LastModifiedTimeStamp" : "date",
		"LastName" : "string",
		"MiddleName" : "string",
		"Status_id" : "string",
		"UpdatedBy" : "string",
		"UserID" : "string",
		"Username" : "string",
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
		tableName : "systemuser_view"
	};
	Object.freeze(config);
	
	return config;
})
