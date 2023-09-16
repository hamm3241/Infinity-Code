define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		Type : function(val, state){
			state['Type'] = val;
		},
		Description : function(val, state){
			state['Description'] = val;
		},
		created : function(val, state){
			state['created'] = val;
		},
		Priority : function(val, state){
			state['Priority'] = val;
		},
		Title : function(val, state){
			state['Title'] = val;
		},
		id : function(val, state){
			state['id'] = val;
		},
	};
	
	
	//Create the Model Class
	function dashboardalerts(defaultValues){
		var privateState = {};
			privateState.Type = defaultValues?(defaultValues["Type"]?defaultValues["Type"]:null):null;
			privateState.Description = defaultValues?(defaultValues["Description"]?defaultValues["Description"]:null):null;
			privateState.created = defaultValues?(defaultValues["created"]?defaultValues["created"]:null):null;
			privateState.Priority = defaultValues?(defaultValues["Priority"]?defaultValues["Priority"]:null):null;
			privateState.Title = defaultValues?(defaultValues["Title"]?defaultValues["Title"]:null):null;
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"Type" : {
					get : function(){return privateState.Type},
					set : function(val){
						setterFunctions['Type'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Description" : {
					get : function(){return privateState.Description},
					set : function(val){
						setterFunctions['Description'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"created" : {
					get : function(){return privateState.created},
					set : function(val){
						setterFunctions['created'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Priority" : {
					get : function(){return privateState.Priority},
					set : function(val){
						setterFunctions['Priority'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Title" : {
					get : function(){return privateState.Title},
					set : function(val){
						setterFunctions['Title'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"id" : {
					get : function(){return privateState.id},
					set : function(val){throw Error("id cannot be changed."); },
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(dashboardalerts);
	
	//Create new class level validator object
	BaseModel.Validator.call(dashboardalerts);
	
	var registerValidatorBackup = dashboardalerts.registerValidator;
	
	dashboardalerts.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( dashboardalerts.isValid(this, propName, val) ){
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
	//For Operation 'GetDashboardAlerts' with service id 'get_dashboardalerts7007'
	dashboardalerts.GetDashboardAlerts = function(params, onCompletion){
		return dashboardalerts.customVerb('GetDashboardAlerts', params, onCompletion);
	};
	
	var relations = [
	];
	
	dashboardalerts.relations = relations;
	
	dashboardalerts.prototype.isValid = function(){
		return dashboardalerts.isValid(this);
	};
	
	dashboardalerts.prototype.objModelName = "dashboardalerts";
	
	return dashboardalerts;
});