define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		Code : function(val, state){
			state['Code'] = val;
		},
		Country_id : function(val, state){
			state['Country_id'] = val;
		},
		id : function(val, state){
			state['id'] = val;
		},
		Name : function(val, state){
			state['Name'] = val;
		},
	};
	
	
	//Create the Model Class
	function region(defaultValues){
		var privateState = {};
			privateState.Code = defaultValues?(defaultValues["Code"]?defaultValues["Code"]:null):null;
			privateState.Country_id = defaultValues?(defaultValues["Country_id"]?defaultValues["Country_id"]:null):null;
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.Name = defaultValues?(defaultValues["Name"]?defaultValues["Name"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"Code" : {
					get : function(){return privateState.Code},
					set : function(val){
						setterFunctions['Code'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Country_id" : {
					get : function(){return privateState.Country_id},
					set : function(val){
						setterFunctions['Country_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"id" : {
					get : function(){return privateState.id},
					set : function(val){throw Error("id cannot be changed."); },
					enumerable : true,
				},
				"Name" : {
					get : function(){return privateState.Name},
					set : function(val){
						setterFunctions['Name'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(region);
	
	//Create new class level validator object
	BaseModel.Validator.call(region);
	
	var registerValidatorBackup = region.registerValidator;
	
	region.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( region.isValid(this, propName, val) ){
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
	//For Operation 'getDetails' with service id 'get_region_details_view8077'
	region.getDetails = function(params, onCompletion){
		return region.customVerb('getDetails', params, onCompletion);
	};
	
	var relations = [
	];
	
	region.relations = relations;
	
	region.prototype.isValid = function(){
		return region.isValid(this);
	};
	
	region.prototype.objModelName = "region";
	
	return region;
});