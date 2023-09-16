/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"name": "name",
		"description": "description",
		"serviceType": "serviceType",
		"featureactions": "featureactions",
		"serviceDefinitionId": "serviceDefinitionId",
		"status": "status",
		"id": "id",
		"defaultGroup": "defaultGroup",
		"groupId": "groupId",
		"defaultRole": "defaultRole",
	};

	Object.freeze(mappings);

	var typings = {
		"name": "string",
		"description": "string",
		"serviceType": "string",
		"featureactions": "string",
		"serviceDefinitionId": "string",
		"status": "string",
		"id": "string",
		"defaultGroup": "string",
		"groupId": "string",
		"defaultRole": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"serviceDefinitionId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "BusinessBankingObjService",
		tableName: "servicedefinition"
	};

	Object.freeze(config);

	return config;
})