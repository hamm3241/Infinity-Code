define([],function(){
	var mappings = {
		"Answer" : "Answer",
		"Channel_id" : "Channel_id",
		"createdby" : "createdby",
		"createdts" : "createdts",
		"id" : "id",
		"lastmodifiedts" : "lastmodifiedts",
		"modifiedby" : "modifiedby",
		"Question" : "Question",
		"QuestionCode" : "QuestionCode",
		"softdeleteflag" : "softdeleteflag",
		"Status_id" : "Status_id",
		"synctimestamp" : "synctimestamp",
	};
	Object.freeze(mappings);
	
	var typings = {
		"Answer" : "string",
		"Channel_id" : "string",
		"createdby" : "string",
		"createdts" : "date",
		"id" : "string",
		"lastmodifiedts" : "date",
		"modifiedby" : "string",
		"Question" : "string",
		"QuestionCode" : "string",
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
		tableName : "frequentlyAskedQuestions"
	};
	Object.freeze(config);
	
	return config;
})
