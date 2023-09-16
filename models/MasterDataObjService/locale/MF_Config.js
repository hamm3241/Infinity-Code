define([],function(){
	var mappings = {
		"lastmodifiedts" : "lastmodifiedts",
		"Language" : "Language",
		"createdby" : "createdby",
		"modifiedby" : "modifiedby",
		"synctimestamp" : "synctimestamp",
		"createdts" : "createdts",
		"Code" : "Code",
		"softdeleteflag" : "softdeleteflag",
	};
	Object.freeze(mappings);
	
	var typings = {
		"lastmodifiedts" : "string",
		"Language" : "string",
		"createdby" : "string",
		"modifiedby" : "string",
		"synctimestamp" : "string",
		"createdts" : "string",
		"Code" : "string",
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
		serviceName : "MasterDataObjService",
		tableName : "locale"
	};
	Object.freeze(config);
	
	return config;
})
