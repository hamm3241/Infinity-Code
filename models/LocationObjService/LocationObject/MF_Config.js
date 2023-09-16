/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"Address_id": "Address_id",
		"Code": "Code",
		"createdby": "createdby",
		"createdts": "createdts",
		"Description": "Description",
		"DisplayName": "DisplayName",
		"EmailId": "EmailId",
		"id": "id",
		"IsMainBranch": "IsMainBranch",
		"lastmodifiedts": "lastmodifiedts",
		"MainBranchCode": "MainBranchCode",
		"modifiedby": "modifiedby",
		"Name": "Name",
		"PhoneNumber": "PhoneNumber",
		"softdeleteflag": "softdeleteflag",
		"Status_id": "Status_id",
		"synctimestamp": "synctimestamp",
		"Type_id": "Type_id",
		"WebSiteUrl": "WebSiteUrl",
		"WorkingDays": "WorkingDays",
		"WorkSchedule_id": "WorkSchedule_id",
	};

	Object.freeze(mappings);

	var typings = {
		"Address_id": "string",
		"Code": "string",
		"createdby": "string",
		"createdts": "date",
		"Description": "string",
		"DisplayName": "string",
		"EmailId": "string",
		"id": "string",
		"IsMainBranch": "boolean",
		"lastmodifiedts": "date",
		"MainBranchCode": "string",
		"modifiedby": "string",
		"Name": "string",
		"PhoneNumber": "string",
		"softdeleteflag": "boolean",
		"Status_id": "string",
		"synctimestamp": "date",
		"Type_id": "string",
		"WebSiteUrl": "string",
		"WorkingDays": "string",
		"WorkSchedule_id": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "LocationObjService",
		tableName: "LocationObject"
	};

	Object.freeze(config);

	return config;
})