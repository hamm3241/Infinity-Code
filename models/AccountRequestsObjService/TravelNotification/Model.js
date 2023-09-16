define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function TravelNotification(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(TravelNotification);
	
	//Create new class level validator object
	BaseModel.Validator.call(TravelNotification);
	
	var registerValidatorBackup = TravelNotification.registerValidator;
	
	TravelNotification.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( TravelNotification.isValid(this, propName, val) ){
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
	//For Operation 'deleteTravelNotification' with service id 'deleteTravelNotification1376'
	TravelNotification.deleteTravelNotification = function(params, onCompletion){
		return TravelNotification.customVerb('deleteTravelNotification', params, onCompletion);
	};
	//For Operation 'cancelTravelNotification' with service id 'cancelTravelNotification6424'
	TravelNotification.cancelTravelNotification = function(params, onCompletion){
		return TravelNotification.customVerb('cancelTravelNotification', params, onCompletion);
	};
	//For Operation 'getTravelNotification' with service id 'getTravelNotification1347'
	TravelNotification.getTravelNotification = function(params, onCompletion){
		return TravelNotification.customVerb('getTravelNotification', params, onCompletion);
	};
	//For Operation 'createTravelNotification' with service id 'createTravelNotification3601'
	TravelNotification.createTravelNotification = function(params, onCompletion){
		return TravelNotification.customVerb('createTravelNotification', params, onCompletion);
	};
	//For Operation 'updateTravelNotification' with service id 'updateTraveNotification4429'
	TravelNotification.updateTravelNotification = function(params, onCompletion){
		return TravelNotification.customVerb('updateTravelNotification', params, onCompletion);
	};
	//For Operation 'getTravelNotificationStatus' with service id 'getTravelNotificationStatus4726'
	TravelNotification.getTravelNotificationStatus = function(params, onCompletion){
		return TravelNotification.customVerb('getTravelNotificationStatus', params, onCompletion);
	};
	
	var relations = [
	];
	
	TravelNotification.relations = relations;
	
	TravelNotification.prototype.isValid = function(){
		return TravelNotification.isValid(this);
	};
	
	TravelNotification.prototype.objModelName = "TravelNotification";
	
	return TravelNotification;
});