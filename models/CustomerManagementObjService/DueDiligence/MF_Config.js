/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"id": "id",
		"productNature": "productNature",
		"transactionType": "transactionType",
		"source": "source",
		"sourceDate": "sourceDate",
		"intendedTransactionCountry": "intendedTransactionCountry",
		"estimatedVolume": "estimatedVolume",
		"estimatedTransactionNumber": "estimatedTransactionNumber",
		"frequency": "frequency",
		"intentionsReference": "intentionsReference",
		"comments": "comments",
	};

	Object.freeze(mappings);

	var typings = {
		"id": "string",
		"productNature": "string",
		"transactionType": "string",
		"source": "string",
		"sourceDate": "string",
		"intendedTransactionCountry": "string",
		"estimatedVolume": "string",
		"estimatedTransactionNumber": "number",
		"frequency": "string",
		"intentionsReference": "string",
		"comments": "string",
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
		serviceName: "CustomerManagementObjService",
		tableName: "DueDiligence"
	};

	Object.freeze(config);

	return config;
})