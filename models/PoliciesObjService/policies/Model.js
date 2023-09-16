define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		id : function(val, state){
			state['id'] = val;
		},
		policyDescription : function(val, state){
			state['policyDescription'] = val;
		},
		policyName : function(val, state){
			state['policyName'] = val;
		},
	};
	
	
	//Create the Model Class
	function policies(defaultValues){
		var privateState = {};
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.policyDescription = defaultValues?(defaultValues["policyDescription"]?defaultValues["policyDescription"]:null):null;
			privateState.policyName = defaultValues?(defaultValues["policyName"]?defaultValues["policyName"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"id" : {
					get : function(){return privateState.id},
					set : function(val){throw Error("id cannot be changed."); },
					enumerable : true,
				},
				"policyDescription" : {
					get : function(){return privateState.policyDescription},
					set : function(val){
						setterFunctions['policyDescription'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"policyName" : {
					get : function(){return privateState.policyName},
					set : function(val){
						setterFunctions['policyName'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(policies);
	
	//Create new class level validator object
	BaseModel.Validator.call(policies);
	
	var registerValidatorBackup = policies.registerValidator;
	
	policies.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( policies.isValid(this, propName, val) ){
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
	
	policies.relations = relations;
	
	policies.prototype.isValid = function(){
		return policies.isValid(this);
	};
	
	policies.prototype.objModelName = "policies";
	
	return policies;
});