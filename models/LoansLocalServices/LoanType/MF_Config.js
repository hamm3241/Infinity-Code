define([],function(){
	var mappings = {
		"id" : "id",
		"Description" : "Description",
		"Code" : "Code",
		"createdby" : "createdby",
		"modifiedby" : "modifiedby",
		"createdts" : "createdts",
		"lastmodifiedts" : "lastmodifiedts",
		"synctimestamp" : "synctimestamp",
		"softdeleteflag" : "softdeleteflag",
		"APRValue" : "APRValue",
	};
	Object.freeze(mappings);
	
	var typings = {
		"id" : "string",
		"Description" : "string",
		"Code" : "string",
		"createdby" : "string",
		"modifiedby" : "string",
		"createdts" : "string",
		"lastmodifiedts" : "string",
		"synctimestamp" : "string",
		"softdeleteflag" : "boolean",
		"APRValue" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"id",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "LoansLocalServices",
		tableName : "LoanType"
	};
	Object.freeze(config);
	
	return config;
})
