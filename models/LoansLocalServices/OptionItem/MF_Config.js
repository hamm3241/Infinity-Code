define([],function(){
	var mappings = {
		"id" : "id",
		"OptionGroup_id" : "OptionGroup_id",
		"Label" : "Label",
		"Code" : "Code",
		"DefaultValue" : "DefaultValue",
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
		"OptionGroup_id" : "string",
		"Label" : "string",
		"Code" : "string",
		"DefaultValue" : "string",
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
		tableName : "OptionItem"
	};
	Object.freeze(config);
	
	return config;
})
