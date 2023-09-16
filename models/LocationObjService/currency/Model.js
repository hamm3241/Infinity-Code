define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		code : function(val, state){
			state['code'] = val;
		},
		name : function(val, state){
			state['name'] = val;
		},
		symbol : function(val, state){
			state['symbol'] = val;
		},
	};
	
	
	//Create the Model Class
	function currency(defaultValues){
		var privateState = {};
			privateState.code = defaultValues?(defaultValues["code"]?defaultValues["code"]:null):null;
			privateState.name = defaultValues?(defaultValues["name"]?defaultValues["name"]:null):null;
			privateState.symbol = defaultValues?(defaultValues["symbol"]?defaultValues["symbol"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"code" : {
					get : function(){return privateState.code},
					set : function(val){throw Error("code cannot be changed."); },
					enumerable : true,
				},
				"name" : {
					get : function(){return privateState.name},
					set : function(val){
						setterFunctions['name'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"symbol" : {
					get : function(){return privateState.symbol},
					set : function(val){
						setterFunctions['symbol'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(currency);
	
	//Create new class level validator object
	BaseModel.Validator.call(currency);
	
	var registerValidatorBackup = currency.registerValidator;
	
	currency.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( currency.isValid(this, propName, val) ){
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
	
	currency.relations = relations;
	
	currency.prototype.isValid = function(){
		return currency.isValid(this);
	};
	
	currency.prototype.objModelName = "currency";
	
	return currency;
});