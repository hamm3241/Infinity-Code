define([],function(){
	var mappings = {
		"createdby" : "createdby",
		"createdts" : "createdts",
		"Customer_id" : "Customer_id",
		"Description" : "Description",
		"Extension" : "Extension",
		"id" : "id",
		"isPrimary" : "isPrimary",
		"lastmodifiedts" : "lastmodifiedts",
		"modifiedby" : "modifiedby",
		"softdeleteflag" : "softdeleteflag",
		"synctimestamp" : "synctimestamp",
		"Type_id" : "Type_id",
		"Value" : "Value",
	};
	Object.freeze(mappings);
	
	var typings = {
		"createdby" : "string",
		"createdts" : "date",
		"Customer_id" : "string",
		"Description" : "string",
		"Extension" : "string",
		"id" : "string",
		"isPrimary" : "boolean",
		"lastmodifiedts" : "date",
		"modifiedby" : "string",
		"softdeleteflag" : "boolean",
		"synctimestamp" : "date",
		"Type_id" : "string",
		"Value" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "LoansLocalServices",
		tableName : "CustomerCommunication"
	};
	Object.freeze(config);
	
	return config;
})
