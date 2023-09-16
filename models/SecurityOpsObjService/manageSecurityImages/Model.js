define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		createdby : function(val, state){
			state['createdby'] = val;
		},
		createdts : function(val, state){
			state['createdts'] = val;
		},
		Customer_id : function(val, state){
			state['Customer_id'] = val;
		},
		Image_id : function(val, state){
			state['Image_id'] = val;
		},
		lastmodifiedts : function(val, state){
			state['lastmodifiedts'] = val;
		},
		modifiedby : function(val, state){
			state['modifiedby'] = val;
		},
		softdeleteflag : function(val, state){
			state['softdeleteflag'] = val;
		},
		status_id : function(val, state){
			state['status_id'] = val;
		},
		synctimestamp : function(val, state){
			state['synctimestamp'] = val;
		},
		user_id : function(val, state){
			state['user_id'] = val;
		},
	};
	
	
	//Create the Model Class
	function manageSecurityImages(defaultValues){
		var privateState = {};
			privateState.createdby = defaultValues?(defaultValues["createdby"]?defaultValues["createdby"]:null):null;
			privateState.createdts = defaultValues?(defaultValues["createdts"]?defaultValues["createdts"]:null):null;
			privateState.Customer_id = defaultValues?(defaultValues["Customer_id"]?defaultValues["Customer_id"]:null):null;
			privateState.Image_id = defaultValues?(defaultValues["Image_id"]?defaultValues["Image_id"]:null):null;
			privateState.lastmodifiedts = defaultValues?(defaultValues["lastmodifiedts"]?defaultValues["lastmodifiedts"]:null):null;
			privateState.modifiedby = defaultValues?(defaultValues["modifiedby"]?defaultValues["modifiedby"]:null):null;
			privateState.softdeleteflag = defaultValues?(defaultValues["softdeleteflag"]?defaultValues["softdeleteflag"]:null):null;
			privateState.status_id = defaultValues?(defaultValues["status_id"]?defaultValues["status_id"]:null):null;
			privateState.synctimestamp = defaultValues?(defaultValues["synctimestamp"]?defaultValues["synctimestamp"]:null):null;
			privateState.user_id = defaultValues?(defaultValues["user_id"]?defaultValues["user_id"]:null):null;
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
				"Customer_id" : {
					get : function(){return privateState.Customer_id},
					set : function(val){
						setterFunctions['Customer_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Image_id" : {
					get : function(){return privateState.Image_id},
					set : function(val){throw Error("Image_id cannot be changed."); },
					enumerable : true,
				},
				"lastmodifiedts" : {
					get : function(){return privateState.lastmodifiedts},
					set : function(val){
						setterFunctions['lastmodifiedts'].call(this,val,privateState);
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
				"softdeleteflag" : {
					get : function(){return privateState.softdeleteflag},
					set : function(val){
						setterFunctions['softdeleteflag'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"status_id" : {
					get : function(){return privateState.status_id},
					set : function(val){
						setterFunctions['status_id'].call(this,val,privateState);
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
				"user_id" : {
					get : function(){return privateState.user_id},
					set : function(val){
						setterFunctions['user_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(manageSecurityImages);
	
	//Create new class level validator object
	BaseModel.Validator.call(manageSecurityImages);
	
	var registerValidatorBackup = manageSecurityImages.registerValidator;
	
	manageSecurityImages.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( manageSecurityImages.isValid(this, propName, val) ){
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
	//For Operation 'insertSecurityImages' with service id 'insertSecurityImages7412'
	manageSecurityImages.insertSecurityImages = function(params, onCompletion){
		return manageSecurityImages.customVerb('insertSecurityImages', params, onCompletion);
	};
	//For Operation 'updateSecurityImages' with service id 'updateSecurityImages3083'
	manageSecurityImages.updateSecurityImages = function(params, onCompletion){
		return manageSecurityImages.customVerb('updateSecurityImages', params, onCompletion);
	};
	//For Operation 'getSecurityImages' with service id 'getSecurityImages2210'
	manageSecurityImages.getSecurityImages = function(params, onCompletion){
		return manageSecurityImages.customVerb('getSecurityImages', params, onCompletion);
	};
	//For Operation 'deleteSecurityImages' with service id 'deleteSecurityImages6654'
	manageSecurityImages.deleteSecurityImages = function(params, onCompletion){
		return manageSecurityImages.customVerb('deleteSecurityImages', params, onCompletion);
	};
	
	var relations = [
	];
	
	manageSecurityImages.relations = relations;
	
	manageSecurityImages.prototype.isValid = function(){
		return manageSecurityImages.isValid(this);
	};
	
	manageSecurityImages.prototype.objModelName = "manageSecurityImages";
	
	return manageSecurityImages;
});