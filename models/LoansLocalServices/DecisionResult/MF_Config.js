define([],function(){
	var mappings = {
		"baseAttributeName" : "baseAttributeName",
		"baseAttributeValue" : "baseAttributeValue",
		"createdby" : "createdby",
		"createdts" : "createdts",
		"decision_id" : "decision_id",
		"errmsg" : "errmsg",
		"exception" : "exception",
		"id" : "id",
		"job_id" : "job_id",
		"lastmodifiedts" : "lastmodifiedts",
		"modifiedby" : "modifiedby",
		"resultAttributeName" : "resultAttributeName",
		"resultAttributeValue" : "resultAttributeValue",
		"softdeleteflag" : "softdeleteflag",
		"synctimestamp" : "synctimestamp",
	};
	Object.freeze(mappings);
	
	var typings = {
		"baseAttributeName" : "string",
		"baseAttributeValue" : "string",
		"createdby" : "string",
		"createdts" : "date",
		"decision_id" : "string",
		"errmsg" : "string",
		"exception" : "string",
		"id" : "number",
		"job_id" : "string",
		"lastmodifiedts" : "date",
		"modifiedby" : "string",
		"resultAttributeName" : "string",
		"resultAttributeValue" : "string",
		"softdeleteflag" : "boolean",
		"synctimestamp" : "date",
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
		tableName : "DecisionResult"
	};
	Object.freeze(config);
	
	return config;
})
