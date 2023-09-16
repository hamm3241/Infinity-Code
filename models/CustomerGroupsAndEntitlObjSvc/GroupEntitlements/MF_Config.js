/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"Description": "Description",
		"Group_id": "Group_id",
		"Name": "Name",
		"Service_id": "Service_id",
		"TransactionFee_id": "TransactionFee_id",
		"TransactionLimit_id": "TransactionLimit_id",
		"Type_id": "Type_id",
		"MaxDailyLimit": "MaxDailyLimit",
		"MaxTransferLimit": "MaxTransferLimit",
		"MinTransferLimit": "MinTransferLimit",
	};

	Object.freeze(mappings);

	var typings = {
		"Description": "string",
		"Group_id": "string",
		"Name": "string",
		"Service_id": "string",
		"TransactionFee_id": "string",
		"TransactionLimit_id": "string",
		"Type_id": "string",
		"MaxDailyLimit": "string",
		"MaxTransferLimit": "string",
		"MinTransferLimit": "string",
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
		tableName: "GroupEntitlements"
	};

	Object.freeze(config);

	return config;
})