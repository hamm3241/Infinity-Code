define([],function(){
	var mappings = {
		"AddressLine1" : "AddressLine1",
		"AddressLine2" : "AddressLine2",
		"CityName" : "CityName",
		"City_id" : "City_id",
		"Country" : "Country",
		"Description" : "Description",
		"id" : "id",
		"PhoneNumber" : "PhoneNumber",
		"State" : "State",
		"Type_id" : "Type_id",
		"ZipCode" : "ZipCode",
	};
	Object.freeze(mappings);
	
	var typings = {
		"AddressLine1" : "string",
		"AddressLine2" : "string",
		"CityName" : "string",
		"City_id" : "string",
		"Country" : "string",
		"Description" : "string",
		"id" : "string",
		"PhoneNumber" : "string",
		"State" : "string",
		"Type_id" : "string",
		"ZipCode" : "string",
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
		serviceName : "InternalusersObjService",
		tableName : "location"
	};
	Object.freeze(config);
	
	return config;
})
