/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"userId": "userId",
		"status": "status",
	};

	Object.freeze(mappings);

	var typings = {
		"userId": "string",
		"status": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"userId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "SCAObjectServices",
		tableName: "User"
	};

	Object.freeze(config);

	return config;
})