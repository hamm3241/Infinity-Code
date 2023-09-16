/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"requestId": "requestId",
		"expAPIOperationName": "expAPIOperationName",
		"context": "context",
		"recordId": "recordId",
		"status": "status",
		"hasPermission": "hasPermission",
		"reason": "reason",
		"statusMessage": "statusMessage",
		"userId": "userId",
	};

	Object.freeze(mappings);

	var typings = {
		"requestId": "string",
		"expAPIOperationName": "string",
		"context": "string",
		"recordId": "string",
		"status": "string",
		"hasPermission": "string",
		"reason": "string",
		"statusMessage": "string",
		"userId": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"requestId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "MakerCheckerWorkflow",
		tableName: "ApprovalRequest"
	};

	Object.freeze(config);

	return config;
})