/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"PermissionType_id": "PermissionType_id",
		"Permission_Desc": "Permission_Desc",
		"Permission_id": "Permission_id",
		"Permission_Name": "Permission_Name",
		"Role_Count": "Role_Count",
		"Status_Desc": "Status_Desc",
		"Status_id": "Status_id",
		"Users_Count": "Users_Count",
	};

	Object.freeze(mappings);

	var typings = {
		"PermissionType_id": "string",
		"Permission_Desc": "string",
		"Permission_id": "string",
		"Permission_Name": "string",
		"Role_Count": "number",
		"Status_Desc": "string",
		"Status_id": "string",
		"Users_Count": "number",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"Permission_id",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "RolesAndPermissionsObjService",
		tableName: "permissions_view"
	};

	Object.freeze(config);

	return config;
})