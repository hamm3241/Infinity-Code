/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"createdby": "createdby",
		"createdts": "createdts",
		"Description": "Description",
		"id": "id",
		"lastmodifiedts": "lastmodifiedts",
		"modifiedby": "modifiedby",
		"Name": "Name",
		"Parent_id": "Parent_id",
		"softdeleteflag": "softdeleteflag",
		"Status_id": "Status_id",
		"synctimestamp": "synctimestamp",
		"Type_id": "Type_id",
	};

	Object.freeze(mappings);

	var typings = {
		"createdby": "string",
		"createdts": "date",
		"Description": "string",
		"id": "string",
		"lastmodifiedts": "date",
		"modifiedby": "string",
		"Name": "string",
		"Parent_id": "string",
		"softdeleteflag": "boolean",
		"Status_id": "string",
		"synctimestamp": "date",
		"Type_id": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "RolesAndPermissionsObjService",
		tableName: "role"
	};

	Object.freeze(config);

	return config;
})