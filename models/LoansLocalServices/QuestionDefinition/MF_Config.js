define([],function(){
	var mappings = {
		"id" : "id",
		"QueryDefinition_id" : "QueryDefinition_id",
		"DataType_id" : "DataType_id",
		"OptionGroup_id" : "OptionGroup_id",
		"Unit" : "Unit",
		"Name" : "Name",
		"Label" : "Label",
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
		"DataType_id" : "string",
		"OptionGroup_id" : "string",
		"Unit" : "string",
		"Name" : "string",
		"Label" : "string",
		"IsRequired" : "boolean",
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
		tableName : "QuestionDefinition"
	};
	Object.freeze(config);
	
	return config;
})
