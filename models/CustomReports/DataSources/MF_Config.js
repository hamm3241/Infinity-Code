/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"dataSourceId": "dataSourceId",
		"name": "name",
		"id": "id",
		"createdts": "createdts",
		"reportsCount": "reportsCount",
	};

	Object.freeze(mappings);

	var typings = {
		"dataSourceId": "string",
		"name": "string",
		"id": "string",
		"createdts": "string",
		"reportsCount": "string",
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
		serviceName: "CustomReports",
		tableName: "DataSources"
	};

	Object.freeze(config);

	return config;
})