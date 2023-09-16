define([],function(){
	var mappings = {
		"baseAttributeName" : "baseAttributeName",
		"baseAttributeValue" : "baseAttributeValue",
		"createdby" : "createdby",
		"createdts" : "createdts",
		"decision_id" : "decision_id",
		"errmsg" : "errmsg",
		"exception" : "exception",
		"failureTriggerJob_id" : "failureTriggerJob_id",
		"id" : "id",
		"job_id" : "job_id",
		"lastmodifiedts" : "lastmodifiedts",
		"modifiedby" : "modifiedby",
		"resultAttributeName" : "resultAttributeName",
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
		"failureTriggerJob_id" : "string",
		"id" : "number",
		"job_id" : "string",
		"lastmodifiedts" : "date",
		"modifiedby" : "string",
		"resultAttributeName" : "string",
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
		tableName : "DecisionFailure"
	};
	Object.freeze(config);
	
	return config;
})
