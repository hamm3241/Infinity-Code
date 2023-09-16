define([],function(){
	var mappings = {
		"id" : "id",
		"QuestionResponse_id" : "QuestionResponse_id",
		"OptionItem_id" : "OptionItem_id",
		"ItemValue" : "ItemValue",
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
		"QuestionResponse_id" : "string",
		"OptionItem_id" : "string",
		"ItemValue" : "string",
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
		tableName : "OptionItemResponse"
	};
	Object.freeze(config);
	
	return config;
})
