define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		Classification_id : function(val, state){
			state['Classification_id'] = val;
		},
		CountryCode : function(val, state){
			state['CountryCode'] = val;
		},
		createdby : function(val, state){
			state['createdby'] = val;
		},
		createdts : function(val, state){
			state['createdts'] = val;
		},
		CurrentLoginTime : function(val, state){
			state['CurrentLoginTime'] = val;
		},
		Cvv : function(val, state){
			state['Cvv'] = val;
		},
		DateOfBirth : function(val, state){
			state['DateOfBirth'] = val;
		},
		DrivingLicenseNumber : function(val, state){
			state['DrivingLicenseNumber'] = val;
		},
		EmployementStatus_id : function(val, state){
			state['EmployementStatus_id'] = val;
		},
		FirstName : function(val, state){
			state['FirstName'] = val;
		},
		Gender : function(val, state){
			state['Gender'] = val;
		},
		id : function(val, state){
			state['id'] = val;
		},
		IsAssistConsented : function(val, state){
			state['IsAssistConsented'] = val;
		},
		IsEmailEnabled : function(val, state){
			state['IsEmailEnabled'] = val;
		},
		isEnrolled : function(val, state){
			state['isEnrolled'] = val;
		},
		IsEnrolledForOlb : function(val, state){
			state['IsEnrolledForOlb'] = val;
		},
		IsOlbAllowed : function(val, state){
			state['IsOlbAllowed'] = val;
		},
		IsPhoneEnabled : function(val, state){
			state['IsPhoneEnabled'] = val;
		},
		IsPinSet : function(val, state){
			state['IsPinSet'] = val;
		},
		IsStaffMember : function(val, state){
			state['IsStaffMember'] = val;
		},
		isSuperAdmin : function(val, state){
			state['isSuperAdmin'] = val;
		},
		isUserAccountLocked : function(val, state){
			state['isUserAccountLocked'] = val;
		},
		Lastlogintime : function(val, state){
			state['Lastlogintime'] = val;
		},
		lastmodifiedts : function(val, state){
			state['lastmodifiedts'] = val;
		},
		LastName : function(val, state){
			state['LastName'] = val;
		},
		Location_id : function(val, state){
			state['Location_id'] = val;
		},
		LockCount : function(val, state){
			state['LockCount'] = val;
		},
		MaritalStatus_id : function(val, state){
			state['MaritalStatus_id'] = val;
		},
		MiddleName : function(val, state){
			state['MiddleName'] = val;
		},
		modifiedby : function(val, state){
			state['modifiedby'] = val;
		},
		NoOfDependents : function(val, state){
			state['NoOfDependents'] = val;
		},
		OlbEnrollmentStatus_id : function(val, state){
			state['OlbEnrollmentStatus_id'] = val;
		},
		Otp : function(val, state){
			state['Otp'] = val;
		},
		OtpGenaratedts : function(val, state){
			state['OtpGenaratedts'] = val;
		},
		Password : function(val, state){
			state['Password'] = val;
		},
		Pin : function(val, state){
			state['Pin'] = val;
		},
		PreferedOtpMethod : function(val, state){
			state['PreferedOtpMethod'] = val;
		},
		PreferredContactMethod : function(val, state){
			state['PreferredContactMethod'] = val;
		},
		PreferredContactTime : function(val, state){
			state['PreferredContactTime'] = val;
		},
		Role : function(val, state){
			state['Role'] = val;
		},
		Salutation : function(val, state){
			state['Salutation'] = val;
		},
		SecurityImage_id : function(val, state){
			state['SecurityImage_id'] = val;
		},
		softdeleteflag : function(val, state){
			state['softdeleteflag'] = val;
		},
		SpouseName : function(val, state){
			state['SpouseName'] = val;
		},
		Ssn : function(val, state){
			state['Ssn'] = val;
		},
		Status_id : function(val, state){
			state['Status_id'] = val;
		},
		synctimestamp : function(val, state){
			state['synctimestamp'] = val;
		},
		Token : function(val, state){
			state['Token'] = val;
		},
		unsuccessfulLoginAttempts : function(val, state){
			state['unsuccessfulLoginAttempts'] = val;
		},
		UserCompany : function(val, state){
			state['UserCompany'] = val;
		},
		UserImage : function(val, state){
			state['UserImage'] = val;
		},
		UserImageURL : function(val, state){
			state['UserImageURL'] = val;
		},
		Username : function(val, state){
			state['Username'] = val;
		},
		ValidDate : function(val, state){
			state['ValidDate'] = val;
		},
		Is_MemberEligibile : function(val, state){
			state['Is_MemberEligibile'] = val;
		},
		CustomerType_id : function(val, state){
			state['CustomerType_id'] = val;
		},
	};
	
	
	//Create the Model Class
	function LoansCustomer(defaultValues){
		var privateState = {};
			privateState.Classification_id = defaultValues?(defaultValues["Classification_id"]?defaultValues["Classification_id"]:null):null;
			privateState.CountryCode = defaultValues?(defaultValues["CountryCode"]?defaultValues["CountryCode"]:null):null;
			privateState.createdby = defaultValues?(defaultValues["createdby"]?defaultValues["createdby"]:null):null;
			privateState.createdts = defaultValues?(defaultValues["createdts"]?defaultValues["createdts"]:null):null;
			privateState.CurrentLoginTime = defaultValues?(defaultValues["CurrentLoginTime"]?defaultValues["CurrentLoginTime"]:null):null;
			privateState.Cvv = defaultValues?(defaultValues["Cvv"]?defaultValues["Cvv"]:null):null;
			privateState.DateOfBirth = defaultValues?(defaultValues["DateOfBirth"]?defaultValues["DateOfBirth"]:null):null;
			privateState.DrivingLicenseNumber = defaultValues?(defaultValues["DrivingLicenseNumber"]?defaultValues["DrivingLicenseNumber"]:null):null;
			privateState.EmployementStatus_id = defaultValues?(defaultValues["EmployementStatus_id"]?defaultValues["EmployementStatus_id"]:null):null;
			privateState.FirstName = defaultValues?(defaultValues["FirstName"]?defaultValues["FirstName"]:null):null;
			privateState.Gender = defaultValues?(defaultValues["Gender"]?defaultValues["Gender"]:null):null;
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.IsAssistConsented = defaultValues?(defaultValues["IsAssistConsented"]?defaultValues["IsAssistConsented"]:null):null;
			privateState.IsEmailEnabled = defaultValues?(defaultValues["IsEmailEnabled"]?defaultValues["IsEmailEnabled"]:null):null;
			privateState.isEnrolled = defaultValues?(defaultValues["isEnrolled"]?defaultValues["isEnrolled"]:null):null;
			privateState.IsEnrolledForOlb = defaultValues?(defaultValues["IsEnrolledForOlb"]?defaultValues["IsEnrolledForOlb"]:null):null;
			privateState.IsOlbAllowed = defaultValues?(defaultValues["IsOlbAllowed"]?defaultValues["IsOlbAllowed"]:null):null;
			privateState.IsPhoneEnabled = defaultValues?(defaultValues["IsPhoneEnabled"]?defaultValues["IsPhoneEnabled"]:null):null;
			privateState.IsPinSet = defaultValues?(defaultValues["IsPinSet"]?defaultValues["IsPinSet"]:null):null;
			privateState.IsStaffMember = defaultValues?(defaultValues["IsStaffMember"]?defaultValues["IsStaffMember"]:null):null;
			privateState.isSuperAdmin = defaultValues?(defaultValues["isSuperAdmin"]?defaultValues["isSuperAdmin"]:null):null;
			privateState.isUserAccountLocked = defaultValues?(defaultValues["isUserAccountLocked"]?defaultValues["isUserAccountLocked"]:null):null;
			privateState.Lastlogintime = defaultValues?(defaultValues["Lastlogintime"]?defaultValues["Lastlogintime"]:null):null;
			privateState.lastmodifiedts = defaultValues?(defaultValues["lastmodifiedts"]?defaultValues["lastmodifiedts"]:null):null;
			privateState.LastName = defaultValues?(defaultValues["LastName"]?defaultValues["LastName"]:null):null;
			privateState.Location_id = defaultValues?(defaultValues["Location_id"]?defaultValues["Location_id"]:null):null;
			privateState.LockCount = defaultValues?(defaultValues["LockCount"]?defaultValues["LockCount"]:null):null;
			privateState.MaritalStatus_id = defaultValues?(defaultValues["MaritalStatus_id"]?defaultValues["MaritalStatus_id"]:null):null;
			privateState.MiddleName = defaultValues?(defaultValues["MiddleName"]?defaultValues["MiddleName"]:null):null;
			privateState.modifiedby = defaultValues?(defaultValues["modifiedby"]?defaultValues["modifiedby"]:null):null;
			privateState.NoOfDependents = defaultValues?(defaultValues["NoOfDependents"]?defaultValues["NoOfDependents"]:null):null;
			privateState.OlbEnrollmentStatus_id = defaultValues?(defaultValues["OlbEnrollmentStatus_id"]?defaultValues["OlbEnrollmentStatus_id"]:null):null;
			privateState.Otp = defaultValues?(defaultValues["Otp"]?defaultValues["Otp"]:null):null;
			privateState.OtpGenaratedts = defaultValues?(defaultValues["OtpGenaratedts"]?defaultValues["OtpGenaratedts"]:null):null;
			privateState.Password = defaultValues?(defaultValues["Password"]?defaultValues["Password"]:null):null;
			privateState.Pin = defaultValues?(defaultValues["Pin"]?defaultValues["Pin"]:null):null;
			privateState.PreferedOtpMethod = defaultValues?(defaultValues["PreferedOtpMethod"]?defaultValues["PreferedOtpMethod"]:null):null;
			privateState.PreferredContactMethod = defaultValues?(defaultValues["PreferredContactMethod"]?defaultValues["PreferredContactMethod"]:null):null;
			privateState.PreferredContactTime = defaultValues?(defaultValues["PreferredContactTime"]?defaultValues["PreferredContactTime"]:null):null;
			privateState.Role = defaultValues?(defaultValues["Role"]?defaultValues["Role"]:null):null;
			privateState.Salutation = defaultValues?(defaultValues["Salutation"]?defaultValues["Salutation"]:null):null;
			privateState.SecurityImage_id = defaultValues?(defaultValues["SecurityImage_id"]?defaultValues["SecurityImage_id"]:null):null;
			privateState.softdeleteflag = defaultValues?(defaultValues["softdeleteflag"]?defaultValues["softdeleteflag"]:null):null;
			privateState.SpouseName = defaultValues?(defaultValues["SpouseName"]?defaultValues["SpouseName"]:null):null;
			privateState.Ssn = defaultValues?(defaultValues["Ssn"]?defaultValues["Ssn"]:null):null;
			privateState.Status_id = defaultValues?(defaultValues["Status_id"]?defaultValues["Status_id"]:null):null;
			privateState.synctimestamp = defaultValues?(defaultValues["synctimestamp"]?defaultValues["synctimestamp"]:null):null;
			privateState.Token = defaultValues?(defaultValues["Token"]?defaultValues["Token"]:null):null;
			privateState.unsuccessfulLoginAttempts = defaultValues?(defaultValues["unsuccessfulLoginAttempts"]?defaultValues["unsuccessfulLoginAttempts"]:null):null;
			privateState.UserCompany = defaultValues?(defaultValues["UserCompany"]?defaultValues["UserCompany"]:null):null;
			privateState.UserImage = defaultValues?(defaultValues["UserImage"]?defaultValues["UserImage"]:null):null;
			privateState.UserImageURL = defaultValues?(defaultValues["UserImageURL"]?defaultValues["UserImageURL"]:null):null;
			privateState.Username = defaultValues?(defaultValues["Username"]?defaultValues["Username"]:null):null;
			privateState.ValidDate = defaultValues?(defaultValues["ValidDate"]?defaultValues["ValidDate"]:null):null;
			privateState.Is_MemberEligibile = defaultValues?(defaultValues["Is_MemberEligibile"]?defaultValues["Is_MemberEligibile"]:null):null;
			privateState.CustomerType_id = defaultValues?(defaultValues["CustomerType_id"]?defaultValues["CustomerType_id"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"Classification_id" : {
					get : function(){return privateState.Classification_id},
					set : function(val){
						setterFunctions['Classification_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"CountryCode" : {
					get : function(){return privateState.CountryCode},
					set : function(val){
						setterFunctions['CountryCode'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"createdby" : {
					get : function(){return privateState.createdby},
					set : function(val){
						setterFunctions['createdby'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"createdts" : {
					get : function(){return privateState.createdts},
					set : function(val){
						setterFunctions['createdts'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"CurrentLoginTime" : {
					get : function(){return privateState.CurrentLoginTime},
					set : function(val){
						setterFunctions['CurrentLoginTime'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Cvv" : {
					get : function(){return privateState.Cvv},
					set : function(val){
						setterFunctions['Cvv'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"DateOfBirth" : {
					get : function(){return privateState.DateOfBirth},
					set : function(val){
						setterFunctions['DateOfBirth'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"DrivingLicenseNumber" : {
					get : function(){return privateState.DrivingLicenseNumber},
					set : function(val){
						setterFunctions['DrivingLicenseNumber'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"EmployementStatus_id" : {
					get : function(){return privateState.EmployementStatus_id},
					set : function(val){
						setterFunctions['EmployementStatus_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"FirstName" : {
					get : function(){return privateState.FirstName},
					set : function(val){
						setterFunctions['FirstName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Gender" : {
					get : function(){return privateState.Gender},
					set : function(val){
						setterFunctions['Gender'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"id" : {
					get : function(){return privateState.id},
					set : function(val){throw Error("id cannot be changed."); },
					enumerable : true,
				},
				"IsAssistConsented" : {
					get : function(){return privateState.IsAssistConsented},
					set : function(val){
						setterFunctions['IsAssistConsented'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"IsEmailEnabled" : {
					get : function(){return privateState.IsEmailEnabled},
					set : function(val){
						setterFunctions['IsEmailEnabled'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"isEnrolled" : {
					get : function(){return privateState.isEnrolled},
					set : function(val){
						setterFunctions['isEnrolled'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"IsEnrolledForOlb" : {
					get : function(){return privateState.IsEnrolledForOlb},
					set : function(val){
						setterFunctions['IsEnrolledForOlb'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"IsOlbAllowed" : {
					get : function(){return privateState.IsOlbAllowed},
					set : function(val){
						setterFunctions['IsOlbAllowed'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"IsPhoneEnabled" : {
					get : function(){return privateState.IsPhoneEnabled},
					set : function(val){
						setterFunctions['IsPhoneEnabled'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"IsPinSet" : {
					get : function(){return privateState.IsPinSet},
					set : function(val){
						setterFunctions['IsPinSet'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"IsStaffMember" : {
					get : function(){return privateState.IsStaffMember},
					set : function(val){
						setterFunctions['IsStaffMember'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"isSuperAdmin" : {
					get : function(){return privateState.isSuperAdmin},
					set : function(val){
						setterFunctions['isSuperAdmin'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"isUserAccountLocked" : {
					get : function(){return privateState.isUserAccountLocked},
					set : function(val){
						setterFunctions['isUserAccountLocked'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Lastlogintime" : {
					get : function(){return privateState.Lastlogintime},
					set : function(val){
						setterFunctions['Lastlogintime'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"lastmodifiedts" : {
					get : function(){return privateState.lastmodifiedts},
					set : function(val){
						setterFunctions['lastmodifiedts'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"LastName" : {
					get : function(){return privateState.LastName},
					set : function(val){
						setterFunctions['LastName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Location_id" : {
					get : function(){return privateState.Location_id},
					set : function(val){
						setterFunctions['Location_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"LockCount" : {
					get : function(){return privateState.LockCount},
					set : function(val){
						setterFunctions['LockCount'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"MaritalStatus_id" : {
					get : function(){return privateState.MaritalStatus_id},
					set : function(val){
						setterFunctions['MaritalStatus_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"MiddleName" : {
					get : function(){return privateState.MiddleName},
					set : function(val){
						setterFunctions['MiddleName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"modifiedby" : {
					get : function(){return privateState.modifiedby},
					set : function(val){
						setterFunctions['modifiedby'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"NoOfDependents" : {
					get : function(){return privateState.NoOfDependents},
					set : function(val){
						setterFunctions['NoOfDependents'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"OlbEnrollmentStatus_id" : {
					get : function(){return privateState.OlbEnrollmentStatus_id},
					set : function(val){
						setterFunctions['OlbEnrollmentStatus_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Otp" : {
					get : function(){return privateState.Otp},
					set : function(val){
						setterFunctions['Otp'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"OtpGenaratedts" : {
					get : function(){return privateState.OtpGenaratedts},
					set : function(val){
						setterFunctions['OtpGenaratedts'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Password" : {
					get : function(){return privateState.Password},
					set : function(val){
						setterFunctions['Password'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Pin" : {
					get : function(){return privateState.Pin},
					set : function(val){
						setterFunctions['Pin'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"PreferedOtpMethod" : {
					get : function(){return privateState.PreferedOtpMethod},
					set : function(val){
						setterFunctions['PreferedOtpMethod'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"PreferredContactMethod" : {
					get : function(){return privateState.PreferredContactMethod},
					set : function(val){
						setterFunctions['PreferredContactMethod'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"PreferredContactTime" : {
					get : function(){return privateState.PreferredContactTime},
					set : function(val){
						setterFunctions['PreferredContactTime'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Role" : {
					get : function(){return privateState.Role},
					set : function(val){
						setterFunctions['Role'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Salutation" : {
					get : function(){return privateState.Salutation},
					set : function(val){
						setterFunctions['Salutation'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"SecurityImage_id" : {
					get : function(){return privateState.SecurityImage_id},
					set : function(val){
						setterFunctions['SecurityImage_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"softdeleteflag" : {
					get : function(){return privateState.softdeleteflag},
					set : function(val){
						setterFunctions['softdeleteflag'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"SpouseName" : {
					get : function(){return privateState.SpouseName},
					set : function(val){
						setterFunctions['SpouseName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Ssn" : {
					get : function(){return privateState.Ssn},
					set : function(val){
						setterFunctions['Ssn'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Status_id" : {
					get : function(){return privateState.Status_id},
					set : function(val){
						setterFunctions['Status_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"synctimestamp" : {
					get : function(){return privateState.synctimestamp},
					set : function(val){
						setterFunctions['synctimestamp'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Token" : {
					get : function(){return privateState.Token},
					set : function(val){
						setterFunctions['Token'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"unsuccessfulLoginAttempts" : {
					get : function(){return privateState.unsuccessfulLoginAttempts},
					set : function(val){
						setterFunctions['unsuccessfulLoginAttempts'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"UserCompany" : {
					get : function(){return privateState.UserCompany},
					set : function(val){
						setterFunctions['UserCompany'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"UserImage" : {
					get : function(){return privateState.UserImage},
					set : function(val){
						setterFunctions['UserImage'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"UserImageURL" : {
					get : function(){return privateState.UserImageURL},
					set : function(val){
						setterFunctions['UserImageURL'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Username" : {
					get : function(){return privateState.Username},
					set : function(val){
						setterFunctions['Username'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ValidDate" : {
					get : function(){return privateState.ValidDate},
					set : function(val){
						setterFunctions['ValidDate'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Is_MemberEligibile" : {
					get : function(){return privateState.Is_MemberEligibile},
					set : function(val){
						setterFunctions['Is_MemberEligibile'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"CustomerType_id" : {
					get : function(){return privateState.CustomerType_id},
					set : function(val){
						setterFunctions['CustomerType_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(LoansCustomer);
	
	//Create new class level validator object
	BaseModel.Validator.call(LoansCustomer);
	
	var registerValidatorBackup = LoansCustomer.registerValidator;
	
	LoansCustomer.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( LoansCustomer.isValid(this, propName, val) ){
					return setterBackup.apply(null, arguments);
				}else{
					throw Error("Validation failed for "+ propName +" : "+val);
				}
			}
			setterFunctions[arguments[0]].changed = true;
		}
		return registerValidatorBackup.apply(null, arguments);
	}
	
	//Extending Model for custom operations
	//For Operation 'updateCustomerDetails' with service id 'updateCustomerDetails5710'
	LoansCustomer.updateCustomerDetails = function(params, onCompletion){
		return LoansCustomer.customVerb('updateCustomerDetails', params, onCompletion);
	};
	//For Operation 'getCustomerByDetails' with service id 'GetCustomerIdJava8675'
	LoansCustomer.getCustomerByDetails = function(params, onCompletion){
		return LoansCustomer.customVerb('getCustomerByDetails', params, onCompletion);
	};
	//For Operation 'GenerateOTP' with service id 'GenerateOTPJava8470'
	LoansCustomer.GenerateOTP = function(params, onCompletion){
		return LoansCustomer.customVerb('GenerateOTP', params, onCompletion);
	};
	//For Operation 'CreatePhoneNumberCommunication' with service id 'CreatePhoneNumberCommunication8102'
	LoansCustomer.CreatePhoneNumberCommunication = function(params, onCompletion){
		return LoansCustomer.customVerb('CreatePhoneNumberCommunication', params, onCompletion);
	};
	//For Operation 'SendEmailService' with service id 'SendEmailJava7463'
	LoansCustomer.SendEmailService = function(params, onCompletion){
		return LoansCustomer.customVerb('SendEmailService', params, onCompletion);
	};
	//For Operation 'getCustomerAddress' with service id 'dbxdb_address_get2086'
	LoansCustomer.getCustomerAddress = function(params, onCompletion){
		return LoansCustomer.customVerb('getCustomerAddress', params, onCompletion);
	};
	//For Operation 'getEmployementDetails' with service id 'dbxdb_employementdetails_get9276'
	LoansCustomer.getEmployementDetails = function(params, onCompletion){
		return LoansCustomer.customVerb('getEmployementDetails', params, onCompletion);
	};
	//For Operation 'SetPassword' with service id 'SetNewPasswordJava7425'
	LoansCustomer.SetPassword = function(params, onCompletion){
		return LoansCustomer.customVerb('SetPassword', params, onCompletion);
	};
	//For Operation 'ValidateOTP' with service id 'ValidateOTPJava5777'
	LoansCustomer.ValidateOTP = function(params, onCompletion){
		return LoansCustomer.customVerb('ValidateOTP', params, onCompletion);
	};
	//For Operation 'CreateNewCustomer' with service id 'LeadCreateJava3600'
	LoansCustomer.CreateNewCustomer = function(params, onCompletion){
		return LoansCustomer.customVerb('CreateNewCustomer', params, onCompletion);
	};
	
	var relations = [
	];
	
	LoansCustomer.relations = relations;
	
	LoansCustomer.prototype.isValid = function(){
		return LoansCustomer.isValid(this);
	};
	
	LoansCustomer.prototype.objModelName = "LoansCustomer";
	
	return LoansCustomer;
});