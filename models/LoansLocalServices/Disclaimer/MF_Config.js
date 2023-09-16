define([],function(){
	var mappings = {
		"App_id" : "App_id",
		"ContentType" : "ContentType",
		"createdby" : "createdby",
		"createdts" : "createdts",
		"DisclaimerName" : "DisclaimerName",
		"DisclaimerText" : "DisclaimerText",
		"DisclaimerUrl" : "DisclaimerUrl",
		"id" : "id",
		"lastmodifiedts" : "lastmodifiedts",
		"modifiedby" : "modifiedby",
		"ModuleName" : "ModuleName",
		"softdeleteflag" : "softdeleteflag",
		"synctimestamp" : "synctimestamp",
	};
	Object.freeze(mappings);
	
	var typings = {
		"App_id" : "string",
		"ContentType" : "string",
		"createdby" : "string",
		"createdts" : "date",
		"DisclaimerName" : "string",
		"DisclaimerText" : "string",
		"DisclaimerUrl" : "string",
		"id" : "string",
		"lastmodifiedts" : "date",
		"modifiedby" : "string",
		"ModuleName" : "string",
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
		tableName : "Disclaimer"
	};
	Object.freeze(config);
	
	return config;
})
