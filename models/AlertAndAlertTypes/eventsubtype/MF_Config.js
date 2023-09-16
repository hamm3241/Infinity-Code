/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"id": "id",
		"eventtypeid": "eventtypeid",
		"Name": "Name",
		"Description": "Description",
		"createdby": "createdby",
		"modifiedby": "modifiedby",
		"createdts": "createdts",
		"lastmodifiedts": "lastmodifiedts",
		"synctimestamp": "synctimestamp",
		"softdeleteflag": "softdeleteflag",
	};

	Object.freeze(mappings);

	var typings = {
		"id": "string",
		"eventtypeid": "string",
		"Name": "string",
		"Description": "string",
		"createdby": "string",
		"modifiedby": "string",
		"createdts": "string",
		"lastmodifiedts": "string",
		"synctimestamp": "string",
		"softdeleteflag": "string",
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
		serviceName: "AlertAndAlertTypes",
		tableName: "eventsubtype"
	};

	Object.freeze(config);

	return config;
})