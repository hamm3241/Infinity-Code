/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"DataType_id": "DataType_id",
		"PermissionValue": "PermissionValue",
		"Permission_createdby": "Permission_createdby",
		"Permission_createdts": "Permission_createdts",
		"Permission_Description": "Permission_Description",
		"Permission_id": "Permission_id",
		"Permission_lastmodifiedts": "Permission_lastmodifiedts",
		"Permission_modifiedby": "Permission_modifiedby",
		"Permission_Name": "Permission_Name",
		"Permission_softdeleteflag": "Permission_softdeleteflag",
		"Permission_Status_id": "Permission_Status_id",
		"Permission_synctimestamp": "Permission_synctimestamp",
		"Permission_Type_id": "Permission_Type_id",
		"Role_Description": "Role_Description",
		"Role_id": "Role_id",
		"Role_Name": "Role_Name",
		"Role_Status_id": "Role_Status_id",
		"Permission_isComposite": "Permission_isComposite",
		"companyLegalUnit": "companyLegalUnit",
	};

	Object.freeze(mappings);

	var typings = {
		"DataType_id": "string",
		"PermissionValue": "string",
		"Permission_createdby": "string",
		"Permission_createdts": "date",
		"Permission_Description": "string",
		"Permission_id": "string",
		"Permission_lastmodifiedts": "date",
		"Permission_modifiedby": "string",
		"Permission_Name": "string",
		"Permission_softdeleteflag": "boolean",
		"Permission_Status_id": "string",
		"Permission_synctimestamp": "date",
		"Permission_Type_id": "string",
		"Role_Description": "string",
		"Role_id": "string",
		"Role_Name": "string",
		"Role_Status_id": "string",
		"Permission_isComposite": "boolean",
		"companyLegalUnit": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"Permission_id",
					"Role_id",
					"companyLegalUnit",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "RolesAndPermissionsObjService",
		tableName: "rolepermission_view"
	};

	Object.freeze(config);

	return config;
})