define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		Email : function(val, state){
			state['Email'] = val;
		},
		FirstName : function(val, state){
			state['FirstName'] = val;
		},
		LastModifiedTimeStamp : function(val, state){
			state['LastModifiedTimeStamp'] = val;
		},
		LastName : function(val, state){
			state['LastName'] = val;
		},
		MiddleName : function(val, state){
			state['MiddleName'] = val;
		},
		Status_id : function(val, state){
			state['Status_id'] = val;
		},
		UpdatedBy : function(val, state){
			state['UpdatedBy'] = val;
		},
		UserID : function(val, state){
			state['UserID'] = val;
		},
		Username : function(val, state){
			state['Username'] = val;
		},
	};
	
	
	//Create the Model Class
	function systemuser_view(defaultValues){
		var privateState = {};
			privateState.Email = defaultValues?(defaultValues["Email"]?defaultValues["Email"]:null):null;
			privateState.FirstName = defaultValues?(defaultValues["FirstName"]?defaultValues["FirstName"]:null):null;
			privateState.LastModifiedTimeStamp = defaultValues?(defaultValues["LastModifiedTimeStamp"]?defaultValues["LastModifiedTimeStamp"]:null):null;
			privateState.LastName = defaultValues?(defaultValues["LastName"]?defaultValues["LastName"]:null):null;
			privateState.MiddleName = defaultValues?(defaultValues["MiddleName"]?defaultValues["MiddleName"]:null):null;
			privateState.Status_id = defaultValues?(defaultValues["Status_id"]?defaultValues["Status_id"]:null):null;
			privateState.UpdatedBy = defaultValues?(defaultValues["UpdatedBy"]?defaultValues["UpdatedBy"]:null):null;
			privateState.UserID = defaultValues?(defaultValues["UserID"]?defaultValues["UserID"]:null):null;
			privateState.Username = defaultValues?(defaultValues["Username"]?defaultValues["Username"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
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
				"LastModifiedTimeStamp" : {
					get : function(){return privateState.LastModifiedTimeStamp},
					set : function(val){
						setterFunctions['LastModifiedTimeStamp'].call(this,val,privateState);
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
				"Status_id" : {
					get : function(){return privateState.Status_id},
					set : function(val){
						setterFunctions['Status_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"UpdatedBy" : {
					get : function(){return privateState.UpdatedBy},
					set : function(val){
						setterFunctions['UpdatedBy'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"UserID" : {
					get : function(){return privateState.UserID},
					set : function(val){
						setterFunctions['UserID'].call(this,val,privateState);
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
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(systemuser_view);
	
	//Create new class level validator object
	BaseModel.Validator.call(systemuser_view);
	
	var registerValidatorBackup = systemuser_view.registerValidator;
	
	systemuser_view.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( systemuser_view.isValid(this, propName, val) ){
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
	
	systemuser_view.relations = relations;
	
	systemuser_view.prototype.isValid = function(){
		return systemuser_view.isValid(this);
	};
	
	systemuser_view.prototype.objModelName = "systemuser_view";
	
	return systemuser_view;
});