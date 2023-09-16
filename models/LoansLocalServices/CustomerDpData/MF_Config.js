define([],function(){
	var mappings = {
		"AccountBalance" : "AccountBalance",
		"ActionProfile_id" : "ActionProfile_id",
		"Age" : "Age",
		"AnnualIncome" : "AnnualIncome",
		"createdby" : "createdby",
		"createdts" : "createdts",
		"CreditScore" : "CreditScore",
		"Customer_id" : "Customer_id",
		"DebtToIncomeRatio" : "DebtToIncomeRatio",
		"EmploymentType" : "EmploymentType",
		"id" : "id",
		"Input1" : "Input1",
		"Input2" : "Input2",
		"Input3" : "Input3",
		"Input4" : "Input4",
		"Input5" : "Input5",
		"lastmodifiedts" : "lastmodifiedts",
		"modifiedby" : "modifiedby",
		"PrequalifyScore" : "PrequalifyScore",
		"softdeleteflag" : "softdeleteflag",
		"State" : "State",
		"synctimestamp" : "synctimestamp",
		"TimeofEmployment" : "TimeofEmployment",
	};
	Object.freeze(mappings);
	
	var typings = {
		"AccountBalance" : "string",
		"ActionProfile_id" : "string",
		"Age" : "string",
		"AnnualIncome" : "string",
		"createdby" : "string",
		"createdts" : "date",
		"CreditScore" : "string",
		"Customer_id" : "string",
		"DebtToIncomeRatio" : "string",
		"EmploymentType" : "string",
		"id" : "string",
		"Input1" : "string",
		"Input2" : "string",
		"Input3" : "string",
		"Input4" : "string",
		"Input5" : "string",
		"lastmodifiedts" : "date",
		"modifiedby" : "string",
		"PrequalifyScore" : "string",
		"softdeleteflag" : "boolean",
		"State" : "string",
		"synctimestamp" : "date",
		"TimeofEmployment" : "string",
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
		tableName : "CustomerDpData"
	};
	Object.freeze(config);
	
	return config;
})
