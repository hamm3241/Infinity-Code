define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function server(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(server);
	
	//Create new class level validator object
	BaseModel.Validator.call(server);
	
	var registerValidatorBackup = server.registerValidator;
	
	server.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( server.isValid(this, propName, val) ){
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
	//For Operation 'getServerTimeZoneOffset' with service id 'getServerTimeZoneOffset1538'
	server.getServerTimeZoneOffset = function(params, onCompletion){
		return server.customVerb('getServerTimeZoneOffset', params, onCompletion);
	};
	
	var relations = [
	];
	
	server.relations = relations;
	
	server.prototype.isValid = function(){
		return server.isValid(this);
	};
	
	server.prototype.objModelName = "server";
	
	return server;
});