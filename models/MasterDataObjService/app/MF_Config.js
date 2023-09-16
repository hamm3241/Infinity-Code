define([],function(){
	var mappings = {
		"lastmodifiedts" : "lastmodifiedts",
		"Description" : "Description",
		"createdby" : "createdby",
		"Status_id" : "Status_id",
		"modifiedby" : "modifiedby",
		"id" : "id",
		"synctimestamp" : "synctimestamp",
		"createdts" : "createdts",
		"softdeleteflag" : "softdeleteflag",
		"Name" : "Name",
	};
	Object.freeze(mappings);
	
	var typings = {
		"lastmodifiedts" : "string",
		"Description" : "string",
		"createdby" : "string",
		"Status_id" : "string",
		"modifiedby" : "string",
		"id" : "string",
		"synctimestamp" : "string",
		"createdts" : "string",
		"softdeleteflag" : "string",
		"Name" : "string",
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
		serviceName : "MasterDataObjService",
		tableName : "app"
	};
	Object.freeze(config);
	
	return config;
})
