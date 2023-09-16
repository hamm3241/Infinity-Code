define([],function(){
	var mappings = {
		"Customer_id" : "Customer_id",
		"id" : "id",
		"PrequalifyPackage_id" : "PrequalifyPackage_id",
		"PrequalifyPackage" : "PrequalifyPackage",
	};
	Object.freeze(mappings);
	
	var typings = {
		"Customer_id" : "string",
		"id" : "string",
		"PrequalifyPackage_id" : "string",
		"PrequalifyPackage" : "string",
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
		tableName : "CustomerPrequalifyPackage"
	};
	Object.freeze(config);
	
	return config;
})
