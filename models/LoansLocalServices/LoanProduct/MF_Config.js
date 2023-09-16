define([],function(){
	var mappings = {
		"AnnualFee" : "AnnualFee",
		"APR" : "APR",
		"AtAGlance" : "AtAGlance",
		"Code" : "Code",
		"createdby" : "createdby",
		"createdts" : "createdts",
		"Description" : "Description",
		"id" : "id",
		"Image" : "Image",
		"lastmodifiedts" : "lastmodifiedts",
		"LoanType_id" : "LoanType_id",
		"MaxLimitAmount" : "MaxLimitAmount",
		"MinLimitAmount" : "MinLimitAmount",
		"modifiedby" : "modifiedby",
		"Name" : "Name",
		"Rewards" : "Rewards",
		"softdeleteflag" : "softdeleteflag",
		"synctimestamp" : "synctimestamp",
	};
	Object.freeze(mappings);
	
	var typings = {
		"AnnualFee" : "number",
		"APR" : "string",
		"AtAGlance" : "string",
		"Code" : "string",
		"createdby" : "string",
		"createdts" : "date",
		"Description" : "string",
		"id" : "string",
		"Image" : "string",
		"lastmodifiedts" : "date",
		"LoanType_id" : "string",
		"MaxLimitAmount" : "number",
		"MinLimitAmount" : "number",
		"modifiedby" : "string",
		"Name" : "string",
		"Rewards" : "string",
		"softdeleteflag" : "boolean",
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
		serviceName : "LoansLocalServices",
		tableName : "LoanProduct"
	};
	Object.freeze(config);
	
	return config;
})
