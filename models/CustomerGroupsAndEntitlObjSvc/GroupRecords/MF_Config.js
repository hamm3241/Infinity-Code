/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"Customers_Count": "Customers_Count",
		"Entitlements_Count": "Entitlements_Count",
		"Group_Desc": "Group_Desc",
		"Group_id": "Group_id",
		"Group_Name": "Group_Name",
		"Status_id": "Status_id",
		"id": "id",
		"Name": "Name",
		"Type_id": "Type_id",
		"isEAgreementActive": "isEAgreementActive",
		"Type_Name": "Type_Name",
	};

	Object.freeze(mappings);

	var typings = {
		"Customers_Count": "string",
		"Entitlements_Count": "string",
		"Group_Desc": "string",
		"Group_id": "string",
		"Group_Name": "string",
		"Status_id": "string",
		"id": "string",
		"Name": "string",
		"Type_id": "string",
		"isEAgreementActive": "string",
		"Type_Name": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"Group_id",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "CustomerGroupsAndEntitlObjSvc",
		tableName: "GroupRecords"
	};

	Object.freeze(config);

	return config;
})