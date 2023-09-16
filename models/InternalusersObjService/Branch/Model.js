define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		Address_id : function(val, state){
			state['Address_id'] = val;
		},
		Branch_Complete_Addr : function(val, state){
			state['Branch_Complete_Addr'] = val;
		},
		Branch_id : function(val, state){
			state['Branch_id'] = val;
		},
		Branch_Name : function(val, state){
			state['Branch_Name'] = val;
		},
		City_id : function(val, state){
			state['City_id'] = val;
		},
		City_Name : function(val, state){
			state['City_Name'] = val;
		},
	};
	
	
	//Create the Model Class
	function Branch(defaultValues){
		var privateState = {};
			privateState.Address_id = defaultValues?(defaultValues["Address_id"]?defaultValues["Address_id"]:null):null;
			privateState.Branch_Complete_Addr = defaultValues?(defaultValues["Branch_Complete_Addr"]?defaultValues["Branch_Complete_Addr"]:null):null;
			privateState.Branch_id = defaultValues?(defaultValues["Branch_id"]?defaultValues["Branch_id"]:null):null;
			privateState.Branch_Name = defaultValues?(defaultValues["Branch_Name"]?defaultValues["Branch_Name"]:null):null;
			privateState.City_id = defaultValues?(defaultValues["City_id"]?defaultValues["City_id"]:null):null;
			privateState.City_Name = defaultValues?(defaultValues["City_Name"]?defaultValues["City_Name"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"Address_id" : {
					get : function(){return privateState.Address_id},
					set : function(val){
						setterFunctions['Address_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Branch_Complete_Addr" : {
					get : function(){return privateState.Branch_Complete_Addr},
					set : function(val){
						setterFunctions['Branch_Complete_Addr'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Branch_id" : {
					get : function(){return privateState.Branch_id},
					set : function(val){
						setterFunctions['Branch_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Branch_Name" : {
					get : function(){return privateState.Branch_Name},
					set : function(val){
						setterFunctions['Branch_Name'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"City_id" : {
					get : function(){return privateState.City_id},
					set : function(val){
						setterFunctions['City_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"City_Name" : {
					get : function(){return privateState.City_Name},
					set : function(val){
						setterFunctions['City_Name'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(Branch);
	
	//Create new class level validator object
	BaseModel.Validator.call(Branch);
	
	var registerValidatorBackup = Branch.registerValidator;
	
	Branch.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( Branch.isValid(this, propName, val) ){
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
	//For Operation 'getAllBranches' with service id 'get_branch_view7806'
	Branch.getAllBranches = function(params, onCompletion){
		return Branch.customVerb('getAllBranches', params, onCompletion);
	};
	
	var relations = [
	];
	
	Branch.relations = relations;
	
	Branch.prototype.isValid = function(){
		return Branch.isValid(this);
	};
	
	Branch.prototype.objModelName = "Branch";
	
	return Branch;
});