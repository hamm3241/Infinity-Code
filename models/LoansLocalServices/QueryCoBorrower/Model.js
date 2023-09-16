define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		id : function(val, state){
			state['id'] = val;
		},
		QueryResponse_id : function(val, state){
			state['QueryResponse_id'] = val;
		},
		CoBorrower_Type : function(val, state){
			state['CoBorrower_Type'] = val;
		},
		FirstName : function(val, state){
			state['FirstName'] = val;
		},
		LastName : function(val, state){
			state['LastName'] = val;
		},
		PhoneNumber : function(val, state){
			state['PhoneNumber'] = val;
		},
		Email : function(val, state){
			state['Email'] = val;
		},
		OTP : function(val, state){
			state['OTP'] = val;
		},
		OTPValidity : function(val, state){
			state['OTPValidity'] = val;
		},
		Is_CoBorrowerActive : function(val, state){
			state['Is_CoBorrowerActive'] = val;
		},
		Is_Verified : function(val, state){
			state['Is_Verified'] = val;
		},
		InvitationLink : function(val, state){
			state['InvitationLink'] = val;
		},
		InvitationLinkValidity : function(val, state){
			state['InvitationLinkValidity'] = val;
		},
		InvitationLinkStatus : function(val, state){
			state['InvitationLinkStatus'] = val;
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
		QueryDefinition_id : function(val, state){
			state['QueryDefinition_id'] = val;
		},
	};
	
	
	//Create the Model Class
	function QueryCoBorrower(defaultValues){
		var privateState = {};
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.QueryResponse_id = defaultValues?(defaultValues["QueryResponse_id"]?defaultValues["QueryResponse_id"]:null):null;
			privateState.CoBorrower_Type = defaultValues?(defaultValues["CoBorrower_Type"]?defaultValues["CoBorrower_Type"]:null):null;
			privateState.FirstName = defaultValues?(defaultValues["FirstName"]?defaultValues["FirstName"]:null):null;
			privateState.LastName = defaultValues?(defaultValues["LastName"]?defaultValues["LastName"]:null):null;
			privateState.PhoneNumber = defaultValues?(defaultValues["PhoneNumber"]?defaultValues["PhoneNumber"]:null):null;
			privateState.Email = defaultValues?(defaultValues["Email"]?defaultValues["Email"]:null):null;
			privateState.OTP = defaultValues?(defaultValues["OTP"]?defaultValues["OTP"]:null):null;
			privateState.OTPValidity = defaultValues?(defaultValues["OTPValidity"]?defaultValues["OTPValidity"]:null):null;
			privateState.Is_CoBorrowerActive = defaultValues?(defaultValues["Is_CoBorrowerActive"]?defaultValues["Is_CoBorrowerActive"]:null):null;
			privateState.Is_Verified = defaultValues?(defaultValues["Is_Verified"]?defaultValues["Is_Verified"]:null):null;
			privateState.InvitationLink = defaultValues?(defaultValues["InvitationLink"]?defaultValues["InvitationLink"]:null):null;
			privateState.InvitationLinkValidity = defaultValues?(defaultValues["InvitationLinkValidity"]?defaultValues["InvitationLinkValidity"]:null):null;
			privateState.InvitationLinkStatus = defaultValues?(defaultValues["InvitationLinkStatus"]?defaultValues["InvitationLinkStatus"]:null):null;
			privateState.createdby = defaultValues?(defaultValues["createdby"]?defaultValues["createdby"]:null):null;
			privateState.modifiedby = defaultValues?(defaultValues["modifiedby"]?defaultValues["modifiedby"]:null):null;
			privateState.createdts = defaultValues?(defaultValues["createdts"]?defaultValues["createdts"]:null):null;
			privateState.lastmodifiedts = defaultValues?(defaultValues["lastmodifiedts"]?defaultValues["lastmodifiedts"]:null):null;
			privateState.synctimestamp = defaultValues?(defaultValues["synctimestamp"]?defaultValues["synctimestamp"]:null):null;
			privateState.softdeleteflag = defaultValues?(defaultValues["softdeleteflag"]?defaultValues["softdeleteflag"]:null):null;
			privateState.QueryDefinition_id = defaultValues?(defaultValues["QueryDefinition_id"]?defaultValues["QueryDefinition_id"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"id" : {
					get : function(){return privateState.id},
					set : function(val){throw Error("id cannot be changed."); },
					enumerable : true,
				},
				"QueryResponse_id" : {
					get : function(){return privateState.QueryResponse_id},
					set : function(val){
						setterFunctions['QueryResponse_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"CoBorrower_Type" : {
					get : function(){return privateState.CoBorrower_Type},
					set : function(val){
						setterFunctions['CoBorrower_Type'].call(this,val,privateState);
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
				"PhoneNumber" : {
					get : function(){return privateState.PhoneNumber},
					set : function(val){
						setterFunctions['PhoneNumber'].call(this,val,privateState);
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
				"OTP" : {
					get : function(){return privateState.OTP},
					set : function(val){
						setterFunctions['OTP'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"OTPValidity" : {
					get : function(){return privateState.OTPValidity},
					set : function(val){
						setterFunctions['OTPValidity'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Is_CoBorrowerActive" : {
					get : function(){return privateState.Is_CoBorrowerActive},
					set : function(val){
						setterFunctions['Is_CoBorrowerActive'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Is_Verified" : {
					get : function(){return privateState.Is_Verified},
					set : function(val){
						setterFunctions['Is_Verified'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"InvitationLink" : {
					get : function(){return privateState.InvitationLink},
					set : function(val){
						setterFunctions['InvitationLink'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"InvitationLinkValidity" : {
					get : function(){return privateState.InvitationLinkValidity},
					set : function(val){
						setterFunctions['InvitationLinkValidity'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"InvitationLinkStatus" : {
					get : function(){return privateState.InvitationLinkStatus},
					set : function(val){
						setterFunctions['InvitationLinkStatus'].call(this,val,privateState);
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
				"QueryDefinition_id" : {
					get : function(){return privateState.QueryDefinition_id},
					set : function(val){
						setterFunctions['QueryDefinition_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(QueryCoBorrower);
	
	//Create new class level validator object
	BaseModel.Validator.call(QueryCoBorrower);
	
	var registerValidatorBackup = QueryCoBorrower.registerValidator;
	
	QueryCoBorrower.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( QueryCoBorrower.isValid(this, propName, val) ){
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
	//For Operation 'VerifyCoBorrower' with service id 'VerifyCoBorrower6971'
	QueryCoBorrower.VerifyCoBorrower = function(params, onCompletion){
		return QueryCoBorrower.customVerb('VerifyCoBorrower', params, onCompletion);
	};
	//For Operation 'expireInviteLink' with service id 'ExpireInviteLink7035'
	QueryCoBorrower.expireInviteLink = function(params, onCompletion){
		return QueryCoBorrower.customVerb('expireInviteLink', params, onCompletion);
	};
	//For Operation 'ReinviteCoBorrower' with service id 'ReinviteCoBorrower7788'
	QueryCoBorrower.ReinviteCoBorrower = function(params, onCompletion){
		return QueryCoBorrower.customVerb('ReinviteCoBorrower', params, onCompletion);
	};
	
	var relations = [
	];
	
	QueryCoBorrower.relations = relations;
	
	QueryCoBorrower.prototype.isValid = function(){
		return QueryCoBorrower.isValid(this);
	};
	
	QueryCoBorrower.prototype.objModelName = "QueryCoBorrower";
	
	return QueryCoBorrower;
});