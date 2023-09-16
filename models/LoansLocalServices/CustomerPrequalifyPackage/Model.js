define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		Customer_id : function(val, state){
			state['Customer_id'] = val;
		},
		id : function(val, state){
			state['id'] = val;
		},
		PrequalifyPackage_id : function(val, state){
			state['PrequalifyPackage_id'] = val;
		},
		PrequalifyPackage : function(val, state){
			state['PrequalifyPackage'] = val;
		},
	};
	
	
	//Create the Model Class
	function CustomerPrequalifyPackage(defaultValues){
		var privateState = {};
			privateState.Customer_id = defaultValues?(defaultValues["Customer_id"]?defaultValues["Customer_id"]:null):null;
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.PrequalifyPackage_id = defaultValues?(defaultValues["PrequalifyPackage_id"]?defaultValues["PrequalifyPackage_id"]:null):null;
			privateState.PrequalifyPackage = defaultValues?(defaultValues["PrequalifyPackage"]?defaultValues["PrequalifyPackage"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"Customer_id" : {
					get : function(){return privateState.Customer_id},
					set : function(val){
						setterFunctions['Customer_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"id" : {
					get : function(){return privateState.id},
					set : function(val){throw Error("id cannot be changed."); },
					enumerable : true,
				},
				"PrequalifyPackage_id" : {
					get : function(){return privateState.PrequalifyPackage_id},
					set : function(val){
						setterFunctions['PrequalifyPackage_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"PrequalifyPackage" : {
					get : function(){return privateState.PrequalifyPackage},
					set : function(val){
						setterFunctions['PrequalifyPackage'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(CustomerPrequalifyPackage);
	
	//Create new class level validator object
	BaseModel.Validator.call(CustomerPrequalifyPackage);
	
	var registerValidatorBackup = CustomerPrequalifyPackage.registerValidator;
	
	CustomerPrequalifyPackage.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( CustomerPrequalifyPackage.isValid(this, propName, val) ){
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
	//For Operation 'GetCustomerPrequalifyPackage' with service id 'dbxdb_sp_getCustomerPrequalifyPackage4425'
	CustomerPrequalifyPackage.GetCustomerPrequalifyPackage = function(params, onCompletion){
		return CustomerPrequalifyPackage.customVerb('GetCustomerPrequalifyPackage', params, onCompletion);
	};
	
	var relations = [
	];
	
	CustomerPrequalifyPackage.relations = relations;
	
	CustomerPrequalifyPackage.prototype.isValid = function(){
		return CustomerPrequalifyPackage.isValid(this);
	};
	
	CustomerPrequalifyPackage.prototype.objModelName = "CustomerPrequalifyPackage";
	
	return CustomerPrequalifyPackage;
});