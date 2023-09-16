define([],function(){
	var mappings = {
		"Channel_id" : "Channel_id",
		"createdby" : "createdby",
		"createdts" : "createdts",
		"Description" : "Description",
		"id" : "id",
		"lastmodifiedts" : "lastmodifiedts",
		"modifiedby" : "modifiedby",
		"softdeleteflag" : "softdeleteflag",
		"Status_id" : "Status_id",
		"synctimestamp" : "synctimestamp",
	};
	Object.freeze(mappings);
	
	var typings = {
		"Channel_id" : "string",
		"createdby" : "string",
		"createdts" : "date",
		"Description" : "string",
		"id" : "string",
		"lastmodifiedts" : "date",
		"modifiedby" : "string",
		"softdeleteflag" : "boolean",
		"Status_id" : "string",
		"synctimestamp" : "date",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "StaticContentObjService",
		tableName : "privacyPolicy"
	};
	Object.freeze(config);
	
	return config;
})
