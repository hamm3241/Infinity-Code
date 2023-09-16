/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"id": "id",
		"friendlyName": "friendlyName",
		"deviceType": "deviceType",
		"registeredOn": "registeredOn",
		"resourceType": "resourceType",
		"expiryDate": "expiryDate",
		"isActive": "isActive",
		"startDate": "startDate",
		"status": "status",
		"userId": "userId",
	};

	Object.freeze(mappings);

	var typings = {
		"id": "string",
		"friendlyName": "string",
		"deviceType": "string",
		"registeredOn": "string",
		"resourceType": "string",
		"expiryDate": "string",
		"isActive": "string",
		"startDate": "string",
		"status": "string",
		"userId": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"id",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "SCAObjectServices",
		tableName: "UserDevice"
	};

	Object.freeze(config);

	return config;
})