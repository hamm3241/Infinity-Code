define([],function(){
	var mappings = {
		"id" : "id",
		"Name" : "Name",
		"Description" : "Description",
		"createdby" : "createdby",
		"modifiedby" : "modifiedby",
		"lastmodifiedts" : "lastmodifiedts",
		"synctimestamp" : "synctimestamp",
		"softdeleteflag" : "softdeleteflag",
	};
	Object.freeze(mappings);
	
	var typings = {
		"id" : "string",
		"Name" : "string",
		"Description" : "string",
		"createdby" : "string",
		"modifiedby" : "string",
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
		serviceName : "AlertAndAlertTypes",
		tableName : "eventtype"
	};
	Object.freeze(config);
	
	return config;
})
