define([],function(){
	var mappings = {
		"id" : "id",
		"QueryDefinition_id" : "QueryDefinition_id",
		"QuerySection_id" : "QuerySection_id",
		"QuestionDefinition_id" : "QuestionDefinition_id",
		"Sequence" : "Sequence",
		"IsRequired" : "IsRequired",
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
		"QueryDefinition_id" : "string",
		"QuerySection_id" : "string",
		"QuestionDefinition_id" : "string",
		"Sequence" : "string",
		"IsRequired" : "boolean",
		"createdby" : "string",
		"modifiedby" : "string",
		"createdts" : "string",
		"lastmodifiedts" : "string",
		"synctimestamp" : "string",
		"softdeleteflag" : "string",
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
		tableName : "QuerySectionQuestion"
	};
	Object.freeze(config);
	
	return config;
})
