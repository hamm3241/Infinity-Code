define([],function(){
	var mappings = {
		"id" : "id",
		"QueryResponse_id" : "QueryResponse_id",
		"QueryDefinition_id" : "QueryDefinition_id",
		"QuestionDefinition_id" : "QuestionDefinition_id",
		"QuerySection_id" : "QuerySection_id",
		"ArrayIndex" : "ArrayIndex",
		"ResponseValue" : "ResponseValue",
		"Unit" : "Unit",
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
		"QueryResponse_id" : "string",
		"QueryDefinition_id" : "string",
		"QuestionDefinition_id" : "string",
		"QuerySection_id" : "string",
		"ArrayIndex" : "number",
		"ResponseValue" : "string",
		"Unit" : "string",
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
		tableName : "QuestionResponse"
	};
	Object.freeze(config);
	
	return config;
})
