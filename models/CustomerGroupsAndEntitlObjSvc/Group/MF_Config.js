/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"name": "name",
		"description": "description",
		"status": "status",
		"typeId": "typeId",
		"isEAgreementActive": "isEAgreementActive",
		"featureactions": "featureactions",
		"servicedefinitions": "servicedefinitions",
		"id": "id",
		"isApplicabletoAllServices": "isApplicabletoAllServices",
	};

	Object.freeze(mappings);

	var typings = {
		"name": "string",
		"description": "string",
		"status": "string",
		"typeId": "string",
		"isEAgreementActive": "string",
		"featureactions": "string",
		"servicedefinitions": "string",
		"id": "string",
		"isApplicabletoAllServices": "string",
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
		serviceName: "CustomerGroupsAndEntitlObjSvc",
		tableName: "Group"
	};

	Object.freeze(config);

	return config;
})