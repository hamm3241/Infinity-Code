define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		AdditionalContext : function(val, state){
			state['AdditionalContext'] = val;
		},
		cc : function(val, state){
			state['cc'] = val;
		},
		emailSubject : function(val, state){
			state['emailSubject'] = val;
		},
		emailType : function(val, state){
			state['emailType'] = val;
		},
		password : function(val, state){
			state['password'] = val;
		},
		recipientEmailId : function(val, state){
			state['recipientEmailId'] = val;
		},
		senderEmailId : function(val, state){
			state['senderEmailId'] = val;
		},
		userid : function(val, state){
			state['userid'] = val;
		},
		vizServerURL : function(val, state){
			state['vizServerURL'] = val;
		},
		XKonyAuthorization : function(val, state){
			state['XKonyAuthorization'] = val;
		},
	};
	
	
	//Create the Model Class
	function email(defaultValues){
		var privateState = {};
			privateState.AdditionalContext = defaultValues?(defaultValues["AdditionalContext"]?defaultValues["AdditionalContext"]:null):null;
			privateState.cc = defaultValues?(defaultValues["cc"]?defaultValues["cc"]:null):null;
			privateState.emailSubject = defaultValues?(defaultValues["emailSubject"]?defaultValues["emailSubject"]:null):null;
			privateState.emailType = defaultValues?(defaultValues["emailType"]?defaultValues["emailType"]:null):null;
			privateState.password = defaultValues?(defaultValues["password"]?defaultValues["password"]:null):null;
			privateState.recipientEmailId = defaultValues?(defaultValues["recipientEmailId"]?defaultValues["recipientEmailId"]:null):null;
			privateState.senderEmailId = defaultValues?(defaultValues["senderEmailId"]?defaultValues["senderEmailId"]:null):null;
			privateState.userid = defaultValues?(defaultValues["userid"]?defaultValues["userid"]:null):null;
			privateState.vizServerURL = defaultValues?(defaultValues["vizServerURL"]?defaultValues["vizServerURL"]:null):null;
			privateState.XKonyAuthorization = defaultValues?(defaultValues["XKonyAuthorization"]?defaultValues["XKonyAuthorization"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"AdditionalContext" : {
					get : function(){return privateState.AdditionalContext},
					set : function(val){
						setterFunctions['AdditionalContext'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"cc" : {
					get : function(){return privateState.cc},
					set : function(val){
						setterFunctions['cc'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"emailSubject" : {
					get : function(){return privateState.emailSubject},
					set : function(val){
						setterFunctions['emailSubject'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"emailType" : {
					get : function(){return privateState.emailType},
					set : function(val){throw Error("emailType cannot be changed."); },
					enumerable : true,
				},
				"password" : {
					get : function(){return privateState.password},
					set : function(val){
						setterFunctions['password'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"recipientEmailId" : {
					get : function(){return privateState.recipientEmailId},
					set : function(val){
						setterFunctions['recipientEmailId'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"senderEmailId" : {
					get : function(){return privateState.senderEmailId},
					set : function(val){
						setterFunctions['senderEmailId'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"userid" : {
					get : function(){return privateState.userid},
					set : function(val){
						setterFunctions['userid'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"vizServerURL" : {
					get : function(){return privateState.vizServerURL},
					set : function(val){
						setterFunctions['vizServerURL'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"XKonyAuthorization" : {
					get : function(){return privateState.XKonyAuthorization},
					set : function(val){
						setterFunctions['XKonyAuthorization'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(email);
	
	//Create new class level validator object
	BaseModel.Validator.call(email);
	
	var registerValidatorBackup = email.registerValidator;
	
	email.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( email.isValid(this, propName, val) ){
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
	
	var relations = [
	];
	
	email.relations = relations;
	
	email.prototype.isValid = function(){
		return email.isValid(this);
	};
	
	email.prototype.objModelName = "email";
	
	return email;
});