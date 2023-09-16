define([],function(){
	var mappings = {
		"TypeID" : "TypeID",
		"features" : "features",
		"supportChecks" : "supportChecks",
		"displayName" : "displayName",
		"rates" : "rates",
		"TypeDescription" : "TypeDescription",
		"termsAndConditions" : "termsAndConditions",
		"info" : "info",
	};
	Object.freeze(mappings);
	
	var typings = {
		"TypeID" : "string",
		"features" : "string",
		"supportChecks" : "string",
		"displayName" : "string",
		"rates" : "string",
		"TypeDescription" : "string",
		"termsAndConditions" : "string",
		"info" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"TypeID",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "MasterDataObjService",
		tableName : "accounttype"
	};
	Object.freeze(config);
	
	return config;
})
