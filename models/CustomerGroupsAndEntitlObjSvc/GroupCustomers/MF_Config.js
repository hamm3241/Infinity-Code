/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"Customer_id": "Customer_id",
		"Email": "Email",
		"FullName": "FullName",
		"Group_id": "Group_id",
		"Status_id": "Status_id",
		"UpdatedBy": "UpdatedBy",
		"UpdatedOn": "UpdatedOn",
		"Username": "Username",
	};

	Object.freeze(mappings);

	var typings = {
		"Customer_id": "string",
		"Email": "string",
		"FullName": "string",
		"Group_id": "string",
		"Status_id": "string",
		"UpdatedBy": "string",
		"UpdatedOn": "string",
		"Username": "string",
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
		tableName: "GroupCustomers"
	};

	Object.freeze(config);

	return config;
})