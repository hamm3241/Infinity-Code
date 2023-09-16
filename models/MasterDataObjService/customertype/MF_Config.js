define([],function(){
	var mappings = {
		"Description" : "Description",
		"createdby" : "createdby",
		"modifiedby" : "modifiedby",
		"id" : "id",
		"softdeleteflag" : "softdeleteflag",
		"Name" : "Name",
	};
	Object.freeze(mappings);
	
	var typings = {
		"Description" : "string",
		"createdby" : "string",
		"modifiedby" : "string",
		"id" : "string",
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
		tableName : "customertype"
	};
	Object.freeze(config);
	
	return config;
})
