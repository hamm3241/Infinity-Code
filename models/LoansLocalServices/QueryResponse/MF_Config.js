define([],function(){
	var mappings = {
		"id" : "id",
		"QueryDefinition_id" : "QueryDefinition_id",
		"Customer_id" : "Customer_id",
		"Is_Applicant" : "Is_Applicant",
		"CoBorrower_id" : "CoBorrower_id",
		"LoanProduct_id" : "LoanProduct_id",
		"Status_id" : "Status_id",
		"SubmitDate" : "SubmitDate",
		"ClosingDate" : "ClosingDate",
		"createdby" : "createdby",
		"modifiedby" : "modifiedby",
		"createdts" : "createdts",
		"lastmodifiedts" : "lastmodifiedts",
		"synctimestamp" : "synctimestamp",
		"softdeleteflag" : "softdeleteflag",
		"OverallPercentageCompletion" : "OverallPercentageCompletion",
		"FirstName" : "FirstName",
		"LastName" : "LastName",
		"Email" : "Email",
		"PhoneNumber" : "PhoneNumber",
	};
	Object.freeze(mappings);
	
	var typings = {
		"id" : "string",
		"QueryDefinition_id" : "string",
		"Customer_id" : "string",
		"Is_Applicant" : "boolean",
		"CoBorrower_id" : "string",
		"LoanProduct_id" : "string",
		"Status_id" : "string",
		"SubmitDate" : "string",
		"ClosingDate" : "string",
		"createdby" : "string",
		"modifiedby" : "string",
		"createdts" : "string",
		"lastmodifiedts" : "string",
		"synctimestamp" : "string",
		"softdeleteflag" : "boolean",
		"OverallPercentageCompletion" : "string",
		"FirstName" : "string",
		"LastName" : "string",
		"Email" : "string",
		"PhoneNumber" : "string",
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
		tableName : "QueryResponse"
	};
	Object.freeze(config);
	
	return config;
})
