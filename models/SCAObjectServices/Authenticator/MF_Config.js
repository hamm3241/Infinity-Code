/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"userId": "userId",
		"name": "name",
		"id": "id",
		"resourceType": "resourceType",
		"status": "status",
		"isActive": "isActive",
		"lastSuccessfulLogin": "lastSuccessfulLogin",
		"lastFailedLogin": "lastFailedLogin",
		"successfulCount": "successfulCount",
		"failureCount": "failureCount",
		"maximumNumberOfUsages": "maximumNumberOfUsages",
		"startDate": "startDate",
		"expiryDate": "expiryDate",
	};

	Object.freeze(mappings);

	var typings = {
		"userId": "string",
		"name": "string",
		"id": "string",
		"resourceType": "string",
		"status": "string",
		"isActive": "string",
		"lastSuccessfulLogin": "string",
		"lastFailedLogin": "string",
		"successfulCount": "string",
		"failureCount": "string",
		"maximumNumberOfUsages": "string",
		"startDate": "string",
		"expiryDate": "string",
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
		tableName: "Authenticator"
	};

	Object.freeze(config);

	return config;
})