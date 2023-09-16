define([],function(){
	var mappings = {
		"AdditionalContext" : "AdditionalContext",
		"cc" : "cc",
		"emailSubject" : "emailSubject",
		"emailType" : "emailType",
		"password" : "password",
		"recipientEmailId" : "recipientEmailId",
		"senderEmailId" : "senderEmailId",
		"userid" : "userid",
		"vizServerURL" : "vizServerURL",
		"XKonyAuthorization" : "XKonyAuthorization",
	};
	Object.freeze(mappings);
	
	var typings = {
		"AdditionalContext" : "string",
		"cc" : "string",
		"emailSubject" : "string",
		"emailType" : "string",
		"password" : "string",
		"recipientEmailId" : "string",
		"senderEmailId" : "string",
		"userid" : "string",
		"vizServerURL" : "string",
		"XKonyAuthorization" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"emailType",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "EmailObjService",
		tableName : "email"
	};
	Object.freeze(config);
	
	return config;
})
