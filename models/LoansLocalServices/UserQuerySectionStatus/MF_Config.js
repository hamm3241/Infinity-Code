define([],function(){
	var mappings = {
		"createdby" : "createdby",
		"createdts" : "createdts",
		"id" : "id",
		"lastmodifiedts" : "lastmodifiedts",
		"modifiedby" : "modifiedby",
		"PercentageCompletion" : "PercentageCompletion",
		"QueryResponse_id" : "QueryResponse_id",
		"QuerySection_id" : "QuerySection_id",
		"softdeleteflag" : "softdeleteflag",
		"Status" : "Status",
		"synctimestamp" : "synctimestamp",
		"User_id" : "User_id",
	};
	Object.freeze(mappings);
	
	var typings = {
		"createdby" : "string",
		"createdts" : "date",
		"id" : "string",
		"lastmodifiedts" : "date",
		"modifiedby" : "string",
		"PercentageCompletion" : "string",
		"QueryResponse_id" : "string",
		"QuerySection_id" : "string",
		"softdeleteflag" : "string",
		"Status" : "string",
		"synctimestamp" : "date",
		"User_id" : "string",
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
		tableName : "UserQuerySectionStatus"
	};
	Object.freeze(config);
	
	return config;
})
