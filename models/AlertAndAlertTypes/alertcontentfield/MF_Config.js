define([],function(){
	var mappings = {
		"Code" : "Code",
		"Name" : "Name",
		"DefaultValue" : "DefaultValue",
		"createdby" : "createdby",
		"modifiedby" : "modifiedby",
		"createdts" : "createdts",
		"lastmodifiedts" : "lastmodifiedts",
		"synctimestamp" : "synctimestamp",
		"softdeleteflag" : "softdeleteflag",
	};
	Object.freeze(mappings);
	
	var typings = {
		"Code" : "string",
		"Name" : "string",
		"DefaultValue" : "string",
		"createdby" : "string",
		"modifiedby" : "string",
		"createdts" : "string",
		"lastmodifiedts" : "string",
		"synctimestamp" : "string",
		"softdeleteflag" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"Code",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "AlertAndAlertTypes",
		tableName : "alertcontentfield"
	};
	Object.freeze(config);
	
	return config;
})
