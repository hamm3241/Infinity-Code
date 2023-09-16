define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		createdby : function(val, state){
			state['createdby'] = val;
		},
		createdts : function(val, state){
			state['createdts'] = val;
		},
		Email : function(val, state){
			state['Email'] = val;
		},
		FirstName : function(val, state){
			state['FirstName'] = val;
		},
		LastName : function(val, state){
			state['LastName'] = val;
		},
		MiddleName : function(val, state){
			state['MiddleName'] = val;
		},
		Permission_Description : function(val, state){
			state['Permission_Description'] = val;
		},
		Permission_id : function(val, state){
			state['Permission_id'] = val;
		},
		Permission_Name : function(val, state){
			state['Permission_Name'] = val;
		},
		Permission_Status_id : function(val, state){
			state['Permission_Status_id'] = val;
		},
		softdeleteflag : function(val, state){
			state['softdeleteflag'] = val;
		},
		updatedby : function(val, state){
			state['updatedby'] = val;
		},
		updatedts : function(val, state){
			state['updatedts'] = val;
		},
		UserName : function(val, state){
			state['UserName'] = val;
		},
		User_id : function(val, state){
			state['User_id'] = val;
		},
		User_Status_id : function(val, state){
			state['User_Status_id'] = val;
		},
	};
	
	
	//Create the Model Class
	function userdirectpermission_view(defaultValues){
		var privateState = {};
			privateState.createdby = defaultValues?(defaultValues["createdby"]?defaultValues["createdby"]:null):null;
			privateState.createdts = defaultValues?(defaultValues["createdts"]?defaultValues["createdts"]:null):null;
			privateState.Email = defaultValues?(defaultValues["Email"]?defaultValues["Email"]:null):null;
			privateState.FirstName = defaultValues?(defaultValues["FirstName"]?defaultValues["FirstName"]:null):null;
			privateState.LastName = defaultValues?(defaultValues["LastName"]?defaultValues["LastName"]:null):null;
			privateState.MiddleName = defaultValues?(defaultValues["MiddleName"]?defaultValues["MiddleName"]:null):null;
			privateState.Permission_Description = defaultValues?(defaultValues["Permission_Description"]?defaultValues["Permission_Description"]:null):null;
			privateState.Permission_id = defaultValues?(defaultValues["Permission_id"]?defaultValues["Permission_id"]:null):null;
			privateState.Permission_Name = defaultValues?(defaultValues["Permission_Name"]?defaultValues["Permission_Name"]:null):null;
			privateState.Permission_Status_id = defaultValues?(defaultValues["Permission_Status_id"]?defaultValues["Permission_Status_id"]:null):null;
			privateState.softdeleteflag = defaultValues?(defaultValues["softdeleteflag"]?defaultValues["softdeleteflag"]:null):null;
			privateState.updatedby = defaultValues?(defaultValues["updatedby"]?defaultValues["updatedby"]:null):null;
			privateState.updatedts = defaultValues?(defaultValues["updatedts"]?defaultValues["updatedts"]:null):null;
			privateState.UserName = defaultValues?(defaultValues["UserName"]?defaultValues["UserName"]:null):null;
			privateState.User_id = defaultValues?(defaultValues["User_id"]?defaultValues["User_id"]:null):null;
			privateState.User_Status_id = defaultValues?(defaultValues["User_Status_id"]?defaultValues["User_Status_id"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
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
				"Email" : {
					get : function(){return privateState.Email},
					set : function(val){
						setterFunctions['Email'].call(this,val,privateState);
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
				"MiddleName" : {
					get : function(){return privateState.MiddleName},
					set : function(val){
						setterFunctions['MiddleName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Permission_Description" : {
					get : function(){return privateState.Permission_Description},
					set : function(val){
						setterFunctions['Permission_Description'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Permission_id" : {
					get : function(){return privateState.Permission_id},
					set : function(val){
						setterFunctions['Permission_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Permission_Name" : {
					get : function(){return privateState.Permission_Name},
					set : function(val){
						setterFunctions['Permission_Name'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Permission_Status_id" : {
					get : function(){return privateState.Permission_Status_id},
					set : function(val){
						setterFunctions['Permission_Status_id'].call(this,val,privateState);
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
				"updatedby" : {
					get : function(){return privateState.updatedby},
					set : function(val){
						setterFunctions['updatedby'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"updatedts" : {
					get : function(){return privateState.updatedts},
					set : function(val){
						setterFunctions['updatedts'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"UserName" : {
					get : function(){return privateState.UserName},
					set : function(val){
						setterFunctions['UserName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"User_id" : {
					get : function(){return privateState.User_id},
					set : function(val){
						setterFunctions['User_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"User_Status_id" : {
					get : function(){return privateState.User_Status_id},
					set : function(val){
						setterFunctions['User_Status_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(userdirectpermission_view);
	
	//Create new class level validator object
	BaseModel.Validator.call(userdirectpermission_view);
	
	var registerValidatorBackup = userdirectpermission_view.registerValidator;
	
	userdirectpermission_view.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( userdirectpermission_view.isValid(this, propName, val) ){
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
	
	userdirectpermission_view.relations = relations;
	
	userdirectpermission_view.prototype.isValid = function(){
		return userdirectpermission_view.isValid(this);
	};
	
	userdirectpermission_view.prototype.objModelName = "userdirectpermission_view";
	
	return userdirectpermission_view;
});