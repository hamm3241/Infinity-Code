define([],function(){
	var mappings = {
		"id" : "id",
		"QueryResponse_id" : "QueryResponse_id",
		"CoBorrower_Type" : "CoBorrower_Type",
		"FirstName" : "FirstName",
		"LastName" : "LastName",
		"PhoneNumber" : "PhoneNumber",
		"Email" : "Email",
		"OTP" : "OTP",
		"OTPValidity" : "OTPValidity",
		"Is_CoBorrowerActive" : "Is_CoBorrowerActive",
		"Is_Verified" : "Is_Verified",
		"InvitationLink" : "InvitationLink",
		"InvitationLinkValidity" : "InvitationLinkValidity",
		"InvitationLinkStatus" : "InvitationLinkStatus",
		"createdby" : "createdby",
		"modifiedby" : "modifiedby",
		"createdts" : "createdts",
		"lastmodifiedts" : "lastmodifiedts",
		"synctimestamp" : "synctimestamp",
		"softdeleteflag" : "softdeleteflag",
		"QueryDefinition_id" : "QueryDefinition_id",
	};
	Object.freeze(mappings);
	
	var typings = {
		"id" : "string",
		"QueryResponse_id" : "string",
		"CoBorrower_Type" : "string",
		"FirstName" : "string",
		"LastName" : "string",
		"PhoneNumber" : "string",
		"Email" : "string",
		"OTP" : "string",
		"OTPValidity" : "date",
		"Is_CoBorrowerActive" : "boolean",
		"Is_Verified" : "boolean",
		"InvitationLink" : "string",
		"InvitationLinkValidity" : "date",
		"InvitationLinkStatus" : "string",
		"createdby" : "string",
		"modifiedby" : "string",
		"createdts" : "date",
		"lastmodifiedts" : "date",
		"synctimestamp" : "date",
		"softdeleteflag" : "boolean",
		"QueryDefinition_id" : "string",
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
		tableName : "QueryCoBorrower"
	};
	Object.freeze(config);
	
	return config;
})
