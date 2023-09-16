define([],function(){
	var mappings = {
		"id" : "id",
		"policyDescription" : "policyDescription",
		"policyName" : "policyName",
	};
	Object.freeze(mappings);
	
	var typings = {
		"id" : "string",
		"policyDescription" : "string",
		"policyName" : "string",
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
		serviceName : "PoliciesObjService",
		tableName : "policies"
	};
	Object.freeze(config);
	
	return config;
})
