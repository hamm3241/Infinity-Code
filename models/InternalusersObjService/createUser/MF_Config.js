/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"currUser": "currUser",
		"Email": "Email",
		"FirstName": "FirstName",
		"LastName": "LastName",
		"MiddleName": "MiddleName",
		"permission_ids": "permission_ids",
		"role_id": "role_id",
		"Status_id": "Status_id",
		"Username": "Username",
		"vizServerURL": "vizServerURL",
		"WorkID": "WorkID",
		"lineOfBusiness": "lineOfBusiness",
		"userType": "userType",
		"reportingManager": "reportingManager",
	};

	Object.freeze(mappings);

	var typings = {
		"currUser": "string",
		"Email": "string",
		"FirstName": "string",
		"LastName": "string",
		"MiddleName": "string",
		"permission_ids": "string",
		"role_id": "string",
		"Status_id": "string",
		"Username": "string",
		"vizServerURL": "string",
		"WorkID": "string",
		"lineOfBusiness": "string",
		"userType": "string",
		"reportingManager": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"Username",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "InternalusersObjService",
		tableName: "createUser"
	};

	Object.freeze(config);

	return config;
})