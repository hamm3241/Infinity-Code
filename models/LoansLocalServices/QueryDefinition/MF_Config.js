define([],function(){
	var mappings = {
		"id" : "id",
		"QueryType_id" : "QueryType_id",
		"Name" : "Name",
		"Code" : "Code",
		"Status_id" : "Status_id",
		"StartDate" : "StartDate",
		"EndDate" : "EndDate",
		"createdby" : "createdby",
		"modifiedby" : "modifiedby",
		"createdts" : "createdts",
		"lastmodifiedts" : "lastmodifiedts",
		"synctimestamp" : "synctimestamp",
		"softdeleteflag" : "softdeleteflag",
	};
	Object.freeze(mappings);
	
	var typings = {
		"id" : "string",
		"QueryType_id" : "string",
		"Name" : "string",
		"Code" : "string",
		"Status_id" : "string",
		"StartDate" : "string",
		"EndDate" : "string",
		"createdby" : "string",
		"modifiedby" : "string",
		"createdts" : "string",
		"lastmodifiedts" : "string",
		"synctimestamp" : "string",
		"softdeleteflag" : "boolean",
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
		tableName : "QueryDefinition"
	};
	Object.freeze(config);
	
	return config;
})
