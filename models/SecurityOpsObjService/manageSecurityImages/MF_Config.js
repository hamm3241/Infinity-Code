define([],function(){
	var mappings = {
		"createdby" : "createdby",
		"createdts" : "createdts",
		"Customer_id" : "Customer_id",
		"Image_id" : "Image_id",
		"lastmodifiedts" : "lastmodifiedts",
		"modifiedby" : "modifiedby",
		"softdeleteflag" : "softdeleteflag",
		"status_id" : "status_id",
		"synctimestamp" : "synctimestamp",
		"user_id" : "user_id",
	};
	Object.freeze(mappings);
	
	var typings = {
		"createdby" : "string",
		"createdts" : "date",
		"Customer_id" : "string",
		"Image_id" : "string",
		"lastmodifiedts" : "date",
		"modifiedby" : "string",
		"softdeleteflag" : "boolean",
		"status_id" : "string",
		"synctimestamp" : "date",
		"user_id" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"Image_id",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "SecurityOpsObjService",
		tableName : "manageSecurityImages"
	};
	Object.freeze(config);
	
	return config;
})
