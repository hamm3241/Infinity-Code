define([],function(){
	var mappings = {
		"createdby" : "createdby",
		"createdts" : "createdts",
		"Description" : "Description",
		"id" : "id",
		"lastmodifiedts" : "lastmodifiedts",
		"modifiedby" : "modifiedby",
		"Service_id" : "Service_id",
		"softdeleteflag" : "softdeleteflag",
		"Status_id" : "Status_id",
		"synctimestamp" : "synctimestamp",
	};
	Object.freeze(mappings);
	
	var typings = {
		"createdby" : "string",
		"createdts" : "date",
		"Description" : "string",
		"id" : "string",
		"lastmodifiedts" : "date",
		"modifiedby" : "string",
		"Service_id" : "string",
		"softdeleteflag" : "string",
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
		tableName : "termsAndConditions"
	};
	Object.freeze(config);
	
	return config;
})
