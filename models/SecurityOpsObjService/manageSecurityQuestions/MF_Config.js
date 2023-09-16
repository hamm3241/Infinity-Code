define([],function(){
	var mappings = {
		"createdby" : "createdby",
		"createdts" : "createdts",
		"id" : "id",
		"lastmodifiedts" : "lastmodifiedts",
		"modifiedby" : "modifiedby",
		"Question" : "Question",
		"softdeleteflag" : "softdeleteflag",
		"status_id" : "status_id",
		"synctimestamp" : "synctimestamp",
		"user_ID" : "user_ID",
	};
	Object.freeze(mappings);
	
	var typings = {
		"createdby" : "string",
		"createdts" : "date",
		"id" : "string",
		"lastmodifiedts" : "date",
		"modifiedby" : "string",
		"Question" : "string",
		"softdeleteflag" : "boolean",
		"status_id" : "string",
		"synctimestamp" : "date",
		"user_ID" : "string",
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
		serviceName : "SecurityOpsObjService",
		tableName : "manageSecurityQuestions"
	};
	Object.freeze(config);
	
	return config;
})
