define([],function(){
	var mappings = {
		"Classification_id" : "Classification_id",
		"CountryCode" : "CountryCode",
		"createdby" : "createdby",
		"createdts" : "createdts",
		"CurrentLoginTime" : "CurrentLoginTime",
		"Cvv" : "Cvv",
		"DateOfBirth" : "DateOfBirth",
		"DrivingLicenseNumber" : "DrivingLicenseNumber",
		"EmployementStatus_id" : "EmployementStatus_id",
		"FirstName" : "FirstName",
		"Gender" : "Gender",
		"id" : "id",
		"IsAssistConsented" : "IsAssistConsented",
		"IsEmailEnabled" : "IsEmailEnabled",
		"isEnrolled" : "isEnrolled",
		"IsEnrolledForOlb" : "IsEnrolledForOlb",
		"IsOlbAllowed" : "IsOlbAllowed",
		"IsPhoneEnabled" : "IsPhoneEnabled",
		"IsPinSet" : "IsPinSet",
		"IsStaffMember" : "IsStaffMember",
		"isSuperAdmin" : "isSuperAdmin",
		"isUserAccountLocked" : "isUserAccountLocked",
		"Lastlogintime" : "Lastlogintime",
		"lastmodifiedts" : "lastmodifiedts",
		"LastName" : "LastName",
		"Location_id" : "Location_id",
		"LockCount" : "LockCount",
		"MaritalStatus_id" : "MaritalStatus_id",
		"MiddleName" : "MiddleName",
		"modifiedby" : "modifiedby",
		"NoOfDependents" : "NoOfDependents",
		"OlbEnrollmentStatus_id" : "OlbEnrollmentStatus_id",
		"Otp" : "Otp",
		"OtpGenaratedts" : "OtpGenaratedts",
		"Password" : "Password",
		"Pin" : "Pin",
		"PreferedOtpMethod" : "PreferedOtpMethod",
		"PreferredContactMethod" : "PreferredContactMethod",
		"PreferredContactTime" : "PreferredContactTime",
		"Role" : "Role",
		"Salutation" : "Salutation",
		"SecurityImage_id" : "SecurityImage_id",
		"softdeleteflag" : "softdeleteflag",
		"SpouseName" : "SpouseName",
		"Ssn" : "Ssn",
		"Status_id" : "Status_id",
		"synctimestamp" : "synctimestamp",
		"Token" : "Token",
		"unsuccessfulLoginAttempts" : "unsuccessfulLoginAttempts",
		"UserCompany" : "UserCompany",
		"UserImage" : "UserImage",
		"UserImageURL" : "UserImageURL",
		"Username" : "Username",
		"ValidDate" : "ValidDate",
		"Is_MemberEligibile" : "Is_MemberEligibile",
		"CustomerType_id" : "CustomerType_id",
	};
	Object.freeze(mappings);
	
	var typings = {
		"Classification_id" : "string",
		"CountryCode" : "string",
		"createdby" : "string",
		"createdts" : "date",
		"CurrentLoginTime" : "date",
		"Cvv" : "string",
		"DateOfBirth" : "date",
		"DrivingLicenseNumber" : "string",
		"EmployementStatus_id" : "string",
		"FirstName" : "string",
		"Gender" : "string",
		"id" : "string",
		"IsAssistConsented" : "boolean",
		"IsEmailEnabled" : "boolean",
		"isEnrolled" : "boolean",
		"IsEnrolledForOlb" : "boolean",
		"IsOlbAllowed" : "boolean",
		"IsPhoneEnabled" : "boolean",
		"IsPinSet" : "boolean",
		"IsStaffMember" : "boolean",
		"isSuperAdmin" : "boolean",
		"isUserAccountLocked" : "boolean",
		"Lastlogintime" : "date",
		"lastmodifiedts" : "date",
		"LastName" : "string",
		"Location_id" : "string",
		"LockCount" : "string",
		"MaritalStatus_id" : "string",
		"MiddleName" : "string",
		"modifiedby" : "string",
		"NoOfDependents" : "string",
		"OlbEnrollmentStatus_id" : "string",
		"Otp" : "string",
		"OtpGenaratedts" : "date",
		"Password" : "string",
		"Pin" : "string",
		"PreferedOtpMethod" : "string",
		"PreferredContactMethod" : "string",
		"PreferredContactTime" : "string",
		"Role" : "string",
		"Salutation" : "string",
		"SecurityImage_id" : "string",
		"softdeleteflag" : "boolean",
		"SpouseName" : "string",
		"Ssn" : "string",
		"Status_id" : "string",
		"synctimestamp" : "date",
		"Token" : "string",
		"unsuccessfulLoginAttempts" : "number",
		"UserCompany" : "string",
		"UserImage" : "string",
		"UserImageURL" : "string",
		"Username" : "string",
		"ValidDate" : "date",
		"Is_MemberEligibile" : "boolean",
		"CustomerType_id" : "string",
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
		tableName : "LoansCustomer"
	};
	Object.freeze(config);
	
	return config;
})
