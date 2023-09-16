/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"id": "id",
		"Code": "Code",
		"Name": "Name",
		"ISDCode": "ISDCode",
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
		"Code": "string",
		"Name": "string",
		"ISDCode": "string",
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
		serviceName: "MasterDataObjService",
		tableName: "countrycode"
	};

	Object.freeze(config);

	return config;
})