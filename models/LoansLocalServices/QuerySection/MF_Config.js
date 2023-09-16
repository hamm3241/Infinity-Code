define([],function(){
	var mappings = {
		"id" : "id",
		"QueryDefinition_id" : "QueryDefinition_id",
		"Name" : "Name",
		"Parent_id" : "Parent_id",
		"Sequence" : "Sequence",
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
		"Name" : "string",
		"Parent_id" : "string",
		"Sequence" : "string",
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
		tableName : "QuerySection"
	};
	Object.freeze(config);
	
	return config;
})
