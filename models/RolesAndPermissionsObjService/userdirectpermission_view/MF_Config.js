define([],function(){
	var mappings = {
		"createdby" : "createdby",
		"createdts" : "createdts",
		"Email" : "Email",
		"FirstName" : "FirstName",
		"LastName" : "LastName",
		"MiddleName" : "MiddleName",
		"Permission_Description" : "Permission_Description",
		"Permission_id" : "Permission_id",
		"Permission_Name" : "Permission_Name",
		"Permission_Status_id" : "Permission_Status_id",
		"softdeleteflag" : "softdeleteflag",
		"updatedby" : "updatedby",
		"updatedts" : "updatedts",
		"UserName" : "UserName",
		"User_id" : "User_id",
		"User_Status_id" : "User_Status_id",
	};
	Object.freeze(mappings);
	
	var typings = {
		"createdby" : "string",
		"createdts" : "date",
		"Email" : "string",
		"FirstName" : "string",
		"LastName" : "string",
		"MiddleName" : "string",
		"Permission_Description" : "string",
		"Permission_id" : "string",
		"Permission_Name" : "string",
		"Permission_Status_id" : "string",
		"softdeleteflag" : "boolean",
		"updatedby" : "string",
		"updatedts" : "date",
		"UserName" : "string",
		"User_id" : "string",
		"User_Status_id" : "string",
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
		tableName : "userdirectpermission_view"
	};
	Object.freeze(config);
	
	return config;
})
