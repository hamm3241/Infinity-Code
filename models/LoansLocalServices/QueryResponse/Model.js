define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		id : function(val, state){
			state['id'] = val;
		},
		QueryDefinition_id : function(val, state){
			state['QueryDefinition_id'] = val;
		},
		Customer_id : function(val, state){
			state['Customer_id'] = val;
		},
		Is_Applicant : function(val, state){
			state['Is_Applicant'] = val;
		},
		CoBorrower_id : function(val, state){
			state['CoBorrower_id'] = val;
		},
		LoanProduct_id : function(val, state){
			state['LoanProduct_id'] = val;
		},
		Status_id : function(val, state){
			state['Status_id'] = val;
		},
		SubmitDate : function(val, state){
			state['SubmitDate'] = val;
		},
		ClosingDate : function(val, state){
			state['ClosingDate'] = val;
		},
		createdby : function(val, state){
			state['createdby'] = val;
		},
		modifiedby : function(val, state){
			state['modifiedby'] = val;
		},
		createdts : function(val, state){
			state['createdts'] = val;
		},
		lastmodifiedts : function(val, state){
			state['lastmodifiedts'] = val;
		},
		synctimestamp : function(val, state){
			state['synctimestamp'] = val;
		},
		softdeleteflag : function(val, state){
			state['softdeleteflag'] = val;
		},
		OverallPercentageCompletion : function(val, state){
			state['OverallPercentageCompletion'] = val;
		},
		FirstName : function(val, state){
			state['FirstName'] = val;
		},
		LastName : function(val, state){
			state['LastName'] = val;
		},
		Email : function(val, state){
			state['Email'] = val;
		},
		PhoneNumber : function(val, state){
			state['PhoneNumber'] = val;
		},
	};
	
	
	//Create the Model Class
	function QueryResponse(defaultValues){
		var privateState = {};
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.QueryDefinition_id = defaultValues?(defaultValues["QueryDefinition_id"]?defaultValues["QueryDefinition_id"]:null):null;
			privateState.Customer_id = defaultValues?(defaultValues["Customer_id"]?defaultValues["Customer_id"]:null):null;
			privateState.Is_Applicant = defaultValues?(defaultValues["Is_Applicant"]?defaultValues["Is_Applicant"]:null):null;
			privateState.CoBorrower_id = defaultValues?(defaultValues["CoBorrower_id"]?defaultValues["CoBorrower_id"]:null):null;
			privateState.LoanProduct_id = defaultValues?(defaultValues["LoanProduct_id"]?defaultValues["LoanProduct_id"]:null):null;
			privateState.Status_id = defaultValues?(defaultValues["Status_id"]?defaultValues["Status_id"]:null):null;
			privateState.SubmitDate = defaultValues?(defaultValues["SubmitDate"]?defaultValues["SubmitDate"]:null):null;
			privateState.ClosingDate = defaultValues?(defaultValues["ClosingDate"]?defaultValues["ClosingDate"]:null):null;
			privateState.createdby = defaultValues?(defaultValues["createdby"]?defaultValues["createdby"]:null):null;
			privateState.modifiedby = defaultValues?(defaultValues["modifiedby"]?defaultValues["modifiedby"]:null):null;
			privateState.createdts = defaultValues?(defaultValues["createdts"]?defaultValues["createdts"]:null):null;
			privateState.lastmodifiedts = defaultValues?(defaultValues["lastmodifiedts"]?defaultValues["lastmodifiedts"]:null):null;
			privateState.synctimestamp = defaultValues?(defaultValues["synctimestamp"]?defaultValues["synctimestamp"]:null):null;
			privateState.softdeleteflag = defaultValues?(defaultValues["softdeleteflag"]?defaultValues["softdeleteflag"]:null):null;
			privateState.OverallPercentageCompletion = defaultValues?(defaultValues["OverallPercentageCompletion"]?defaultValues["OverallPercentageCompletion"]:null):null;
			privateState.FirstName = defaultValues?(defaultValues["FirstName"]?defaultValues["FirstName"]:null):null;
			privateState.LastName = defaultValues?(defaultValues["LastName"]?defaultValues["LastName"]:null):null;
			privateState.Email = defaultValues?(defaultValues["Email"]?defaultValues["Email"]:null):null;
			privateState.PhoneNumber = defaultValues?(defaultValues["PhoneNumber"]?defaultValues["PhoneNumber"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"id" : {
					get : function(){return privateState.id},
					set : function(val){throw Error("id cannot be changed."); },
					enumerable : true,
				},
				"QueryDefinition_id" : {
					get : function(){return privateState.QueryDefinition_id},
					set : function(val){
						setterFunctions['QueryDefinition_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Customer_id" : {
					get : function(){return privateState.Customer_id},
					set : function(val){
						setterFunctions['Customer_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Is_Applicant" : {
					get : function(){return privateState.Is_Applicant},
					set : function(val){
						setterFunctions['Is_Applicant'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"CoBorrower_id" : {
					get : function(){return privateState.CoBorrower_id},
					set : function(val){
						setterFunctions['CoBorrower_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"LoanProduct_id" : {
					get : function(){return privateState.LoanProduct_id},
					set : function(val){
						setterFunctions['LoanProduct_id'].call(this,val,privateState);
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
				"SubmitDate" : {
					get : function(){return privateState.SubmitDate},
					set : function(val){
						setterFunctions['SubmitDate'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ClosingDate" : {
					get : function(){return privateState.ClosingDate},
					set : function(val){
						setterFunctions['ClosingDate'].call(this,val,privateState);
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
				"modifiedby" : {
					get : function(){return privateState.modifiedby},
					set : function(val){
						setterFunctions['modifiedby'].call(this,val,privateState);
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
				"lastmodifiedts" : {
					get : function(){return privateState.lastmodifiedts},
					set : function(val){
						setterFunctions['lastmodifiedts'].call(this,val,privateState);
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
				"softdeleteflag" : {
					get : function(){return privateState.softdeleteflag},
					set : function(val){
						setterFunctions['softdeleteflag'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"OverallPercentageCompletion" : {
					get : function(){return privateState.OverallPercentageCompletion},
					set : function(val){
						setterFunctions['OverallPercentageCompletion'].call(this,val,privateState);
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
				"LastName" : {
					get : function(){return privateState.LastName},
					set : function(val){
						setterFunctions['LastName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Email" : {
					get : function(){return privateState.Email},
					set : function(val){
						setterFunctions['Email'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"PhoneNumber" : {
					get : function(){return privateState.PhoneNumber},
					set : function(val){
						setterFunctions['PhoneNumber'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(QueryResponse);
	
	//Create new class level validator object
	BaseModel.Validator.call(QueryResponse);
	
	var registerValidatorBackup = QueryResponse.registerValidator;
	
	QueryResponse.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( QueryResponse.isValid(this, propName, val) ){
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
	//For Operation 'createCreditCardLoan' with service id 'createCreditCardLoan9950'
	QueryResponse.createCreditCardLoan = function(params, onCompletion){
		return QueryResponse.customVerb('createCreditCardLoan', params, onCompletion);
	};
	//For Operation 'createPersonalLoan' with service id 'createPersonalLoan1961'
	QueryResponse.createPersonalLoan = function(params, onCompletion){
		return QueryResponse.customVerb('createPersonalLoan', params, onCompletion);
	};
	//For Operation 'SubmitVehicleLoan' with service id 'VehicleLoan9022'
	QueryResponse.SubmitVehicleLoan = function(params, onCompletion){
		return QueryResponse.customVerb('SubmitVehicleLoan', params, onCompletion);
	};
	//For Operation 'createQueryResponse' with service id 'createQueryResponsejava2245'
	QueryResponse.createQueryResponse = function(params, onCompletion){
		return QueryResponse.customVerb('createQueryResponse', params, onCompletion);
	};
	//For Operation 'VerifyCoborrower' with service id 'VerifyCoBorrower1516'
	QueryResponse.VerifyCoborrower = function(params, onCompletion){
		return QueryResponse.customVerb('VerifyCoborrower', params, onCompletion);
	};
	//For Operation 'getApplicationCustomer' with service id 'dbxdb_queryresponse_get1727'
	QueryResponse.getApplicationCustomer = function(params, onCompletion){
		return QueryResponse.customVerb('getApplicationCustomer', params, onCompletion);
	};
	//For Operation 'getRecentApplication' with service id 'dbxdb_sp_getRecentApplication8856'
	QueryResponse.getRecentApplication = function(params, onCompletion){
		return QueryResponse.customVerb('getRecentApplication', params, onCompletion);
	};
	//For Operation 'updateCreditCardApp' with service id 'updateCreditCardApp7028'
	QueryResponse.updateCreditCardApp = function(params, onCompletion){
		return QueryResponse.customVerb('updateCreditCardApp', params, onCompletion);
	};
	//For Operation 'GenerateInviteLink' with service id 'GenerateInviteLink2728'
	QueryResponse.GenerateInviteLink = function(params, onCompletion){
		return QueryResponse.customVerb('GenerateInviteLink', params, onCompletion);
	};
	//For Operation 'getAllApplications' with service id 'dbxdb_sp_getAllApplications5751'
	QueryResponse.getAllApplications = function(params, onCompletion){
		return QueryResponse.customVerb('getAllApplications', params, onCompletion);
	};
	//For Operation 'SubmitPersonalLoan' with service id 'PersonalLoan6082'
	QueryResponse.SubmitPersonalLoan = function(params, onCompletion){
		return QueryResponse.customVerb('SubmitPersonalLoan', params, onCompletion);
	};
	//For Operation 'getQueryResponseApplicationsList' with service id 'dbxdb_sp_getQueryResponseApplicationList6697'
	QueryResponse.getQueryResponseApplicationsList = function(params, onCompletion){
		return QueryResponse.customVerb('getQueryResponseApplicationsList', params, onCompletion);
	};
	//For Operation 'updatePersonalLoan' with service id 'updatePersonalLoan2520'
	QueryResponse.updatePersonalLoan = function(params, onCompletion){
		return QueryResponse.customVerb('updatePersonalLoan', params, onCompletion);
	};
	//For Operation 'SubmitCreditCardApp' with service id 'CreditCard2367'
	QueryResponse.SubmitCreditCardApp = function(params, onCompletion){
		return QueryResponse.customVerb('SubmitCreditCardApp', params, onCompletion);
	};
	//For Operation 'createVehicleLoan' with service id 'createVehicleLoan6672'
	QueryResponse.createVehicleLoan = function(params, onCompletion){
		return QueryResponse.customVerb('createVehicleLoan', params, onCompletion);
	};
	//For Operation 'updateVehicleLoan' with service id 'updateVehicleLoan1726'
	QueryResponse.updateVehicleLoan = function(params, onCompletion){
		return QueryResponse.customVerb('updateVehicleLoan', params, onCompletion);
	};
	//For Operation 'GetLoanAnswersTrack' with service id 'getLoanAnswersTrack2168'
	QueryResponse.GetLoanAnswersTrack = function(params, onCompletion){
		return QueryResponse.customVerb('GetLoanAnswersTrack', params, onCompletion);
	};
	//For Operation 'GetLoanAnswers' with service id 'getLoanAnswers6916'
	QueryResponse.GetLoanAnswers = function(params, onCompletion){
		return QueryResponse.customVerb('GetLoanAnswers', params, onCompletion);
	};
	//For Operation 'getQueryAnswers' with service id 'dbxdb_sp_getQueryAnswers2849'
	QueryResponse.getQueryAnswers = function(params, onCompletion){
		return QueryResponse.customVerb('getQueryAnswers', params, onCompletion);
	};
	
	var relations = [
	];
	
	QueryResponse.relations = relations;
	
	QueryResponse.prototype.isValid = function(){
		return QueryResponse.isValid(this);
	};
	
	QueryResponse.prototype.objModelName = "QueryResponse";
	
	return QueryResponse;
});