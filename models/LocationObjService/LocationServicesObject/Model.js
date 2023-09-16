define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		ADDRESS : function(val, state){
			state['ADDRESS'] = val;
		},
		Location_Address_id : function(val, state){
			state['Location_Address_id'] = val;
		},
		Location_Code : function(val, state){
			state['Location_Code'] = val;
		},
		Location_DeleteFlag : function(val, state){
			state['Location_DeleteFlag'] = val;
		},
		Location_Description : function(val, state){
			state['Location_Description'] = val;
		},
		Location_Display_Name : function(val, state){
			state['Location_Display_Name'] = val;
		},
		Location_EmailId : function(val, state){
			state['Location_EmailId'] = val;
		},
		Location_id : function(val, state){
			state['Location_id'] = val;
		},
		Location_IsMainBranch : function(val, state){
			state['Location_IsMainBranch'] = val;
		},
		Location_Latitude : function(val, state){
			state['Location_Latitude'] = val;
		},
		Location_Longitude : function(val, state){
			state['Location_Longitude'] = val;
		},
		Location_Name : function(val, state){
			state['Location_Name'] = val;
		},
		Location_Phone_Number : function(val, state){
			state['Location_Phone_Number'] = val;
		},
		Location_Status_id : function(val, state){
			state['Location_Status_id'] = val;
		},
		Location_Type_id : function(val, state){
			state['Location_Type_id'] = val;
		},
		Location_WorkScheduleId : function(val, state){
			state['Location_WorkScheduleId'] = val;
		},
		Saturday_EndTime : function(val, state){
			state['Saturday_EndTime'] = val;
		},
		Saturday_StartTime : function(val, state){
			state['Saturday_StartTime'] = val;
		},
		Service_Description : function(val, state){
			state['Service_Description'] = val;
		},
		Service_id : function(val, state){
			state['Service_id'] = val;
		},
		Service_Name : function(val, state){
			state['Service_Name'] = val;
		},
		Service_Status_id : function(val, state){
			state['Service_Status_id'] = val;
		},
		Service_Type_id : function(val, state){
			state['Service_Type_id'] = val;
		},
		Sunday_EndTime : function(val, state){
			state['Sunday_EndTime'] = val;
		},
		Sunday_StartTime : function(val, state){
			state['Sunday_StartTime'] = val;
		},
		Weekday_EndTime : function(val, state){
			state['Weekday_EndTime'] = val;
		},
		Weekday_StartTime : function(val, state){
			state['Weekday_StartTime'] = val;
		},
	};
	
	
	//Create the Model Class
	function LocationServicesObject(defaultValues){
		var privateState = {};
			privateState.ADDRESS = defaultValues?(defaultValues["ADDRESS"]?defaultValues["ADDRESS"]:null):null;
			privateState.Location_Address_id = defaultValues?(defaultValues["Location_Address_id"]?defaultValues["Location_Address_id"]:null):null;
			privateState.Location_Code = defaultValues?(defaultValues["Location_Code"]?defaultValues["Location_Code"]:null):null;
			privateState.Location_DeleteFlag = defaultValues?(defaultValues["Location_DeleteFlag"]?defaultValues["Location_DeleteFlag"]:null):null;
			privateState.Location_Description = defaultValues?(defaultValues["Location_Description"]?defaultValues["Location_Description"]:null):null;
			privateState.Location_Display_Name = defaultValues?(defaultValues["Location_Display_Name"]?defaultValues["Location_Display_Name"]:null):null;
			privateState.Location_EmailId = defaultValues?(defaultValues["Location_EmailId"]?defaultValues["Location_EmailId"]:null):null;
			privateState.Location_id = defaultValues?(defaultValues["Location_id"]?defaultValues["Location_id"]:null):null;
			privateState.Location_IsMainBranch = defaultValues?(defaultValues["Location_IsMainBranch"]?defaultValues["Location_IsMainBranch"]:null):null;
			privateState.Location_Latitude = defaultValues?(defaultValues["Location_Latitude"]?defaultValues["Location_Latitude"]:null):null;
			privateState.Location_Longitude = defaultValues?(defaultValues["Location_Longitude"]?defaultValues["Location_Longitude"]:null):null;
			privateState.Location_Name = defaultValues?(defaultValues["Location_Name"]?defaultValues["Location_Name"]:null):null;
			privateState.Location_Phone_Number = defaultValues?(defaultValues["Location_Phone_Number"]?defaultValues["Location_Phone_Number"]:null):null;
			privateState.Location_Status_id = defaultValues?(defaultValues["Location_Status_id"]?defaultValues["Location_Status_id"]:null):null;
			privateState.Location_Type_id = defaultValues?(defaultValues["Location_Type_id"]?defaultValues["Location_Type_id"]:null):null;
			privateState.Location_WorkScheduleId = defaultValues?(defaultValues["Location_WorkScheduleId"]?defaultValues["Location_WorkScheduleId"]:null):null;
			privateState.Saturday_EndTime = defaultValues?(defaultValues["Saturday_EndTime"]?defaultValues["Saturday_EndTime"]:null):null;
			privateState.Saturday_StartTime = defaultValues?(defaultValues["Saturday_StartTime"]?defaultValues["Saturday_StartTime"]:null):null;
			privateState.Service_Description = defaultValues?(defaultValues["Service_Description"]?defaultValues["Service_Description"]:null):null;
			privateState.Service_id = defaultValues?(defaultValues["Service_id"]?defaultValues["Service_id"]:null):null;
			privateState.Service_Name = defaultValues?(defaultValues["Service_Name"]?defaultValues["Service_Name"]:null):null;
			privateState.Service_Status_id = defaultValues?(defaultValues["Service_Status_id"]?defaultValues["Service_Status_id"]:null):null;
			privateState.Service_Type_id = defaultValues?(defaultValues["Service_Type_id"]?defaultValues["Service_Type_id"]:null):null;
			privateState.Sunday_EndTime = defaultValues?(defaultValues["Sunday_EndTime"]?defaultValues["Sunday_EndTime"]:null):null;
			privateState.Sunday_StartTime = defaultValues?(defaultValues["Sunday_StartTime"]?defaultValues["Sunday_StartTime"]:null):null;
			privateState.Weekday_EndTime = defaultValues?(defaultValues["Weekday_EndTime"]?defaultValues["Weekday_EndTime"]:null):null;
			privateState.Weekday_StartTime = defaultValues?(defaultValues["Weekday_StartTime"]?defaultValues["Weekday_StartTime"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"ADDRESS" : {
					get : function(){return privateState.ADDRESS},
					set : function(val){
						setterFunctions['ADDRESS'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Location_Address_id" : {
					get : function(){return privateState.Location_Address_id},
					set : function(val){
						setterFunctions['Location_Address_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Location_Code" : {
					get : function(){return privateState.Location_Code},
					set : function(val){
						setterFunctions['Location_Code'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Location_DeleteFlag" : {
					get : function(){return privateState.Location_DeleteFlag},
					set : function(val){
						setterFunctions['Location_DeleteFlag'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Location_Description" : {
					get : function(){return privateState.Location_Description},
					set : function(val){
						setterFunctions['Location_Description'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Location_Display_Name" : {
					get : function(){return privateState.Location_Display_Name},
					set : function(val){
						setterFunctions['Location_Display_Name'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Location_EmailId" : {
					get : function(){return privateState.Location_EmailId},
					set : function(val){
						setterFunctions['Location_EmailId'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Location_id" : {
					get : function(){return privateState.Location_id},
					set : function(val){
						setterFunctions['Location_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Location_IsMainBranch" : {
					get : function(){return privateState.Location_IsMainBranch},
					set : function(val){
						setterFunctions['Location_IsMainBranch'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Location_Latitude" : {
					get : function(){return privateState.Location_Latitude},
					set : function(val){
						setterFunctions['Location_Latitude'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Location_Longitude" : {
					get : function(){return privateState.Location_Longitude},
					set : function(val){
						setterFunctions['Location_Longitude'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Location_Name" : {
					get : function(){return privateState.Location_Name},
					set : function(val){
						setterFunctions['Location_Name'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Location_Phone_Number" : {
					get : function(){return privateState.Location_Phone_Number},
					set : function(val){
						setterFunctions['Location_Phone_Number'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Location_Status_id" : {
					get : function(){return privateState.Location_Status_id},
					set : function(val){
						setterFunctions['Location_Status_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Location_Type_id" : {
					get : function(){return privateState.Location_Type_id},
					set : function(val){
						setterFunctions['Location_Type_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Location_WorkScheduleId" : {
					get : function(){return privateState.Location_WorkScheduleId},
					set : function(val){
						setterFunctions['Location_WorkScheduleId'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Saturday_EndTime" : {
					get : function(){return privateState.Saturday_EndTime},
					set : function(val){
						setterFunctions['Saturday_EndTime'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Saturday_StartTime" : {
					get : function(){return privateState.Saturday_StartTime},
					set : function(val){
						setterFunctions['Saturday_StartTime'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Service_Description" : {
					get : function(){return privateState.Service_Description},
					set : function(val){
						setterFunctions['Service_Description'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Service_id" : {
					get : function(){return privateState.Service_id},
					set : function(val){
						setterFunctions['Service_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Service_Name" : {
					get : function(){return privateState.Service_Name},
					set : function(val){
						setterFunctions['Service_Name'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Service_Status_id" : {
					get : function(){return privateState.Service_Status_id},
					set : function(val){
						setterFunctions['Service_Status_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Service_Type_id" : {
					get : function(){return privateState.Service_Type_id},
					set : function(val){
						setterFunctions['Service_Type_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Sunday_EndTime" : {
					get : function(){return privateState.Sunday_EndTime},
					set : function(val){
						setterFunctions['Sunday_EndTime'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Sunday_StartTime" : {
					get : function(){return privateState.Sunday_StartTime},
					set : function(val){
						setterFunctions['Sunday_StartTime'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Weekday_EndTime" : {
					get : function(){return privateState.Weekday_EndTime},
					set : function(val){
						setterFunctions['Weekday_EndTime'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Weekday_StartTime" : {
					get : function(){return privateState.Weekday_StartTime},
					set : function(val){
						setterFunctions['Weekday_StartTime'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(LocationServicesObject);
	
	//Create new class level validator object
	BaseModel.Validator.call(LocationServicesObject);
	
	var registerValidatorBackup = LocationServicesObject.registerValidator;
	
	LocationServicesObject.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( LocationServicesObject.isValid(this, propName, val) ){
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
	//For Operation 'deleteLocation' with service id 'DeleteLocation1668'
	LocationServicesObject.deleteLocation = function(params, onCompletion){
		return LocationServicesObject.customVerb('deleteLocation', params, onCompletion);
	};
	//For Operation 'updateLocationAndLocationServices' with service id 'UpdateLocationAndLocationServices5979'
	LocationServicesObject.updateLocationAndLocationServices = function(params, onCompletion){
		return LocationServicesObject.customVerb('updateLocationAndLocationServices', params, onCompletion);
	};
	//For Operation 'getLocationAndLocationServices' with service id 'GetLocationAndLocationServices4061'
	LocationServicesObject.getLocationAndLocationServices = function(params, onCompletion){
		return LocationServicesObject.customVerb('getLocationAndLocationServices', params, onCompletion);
	};
	//For Operation 'createLocationAndAssignServices' with service id 'CreateLocationAndLocationServices7821'
	LocationServicesObject.createLocationAndAssignServices = function(params, onCompletion){
		return LocationServicesObject.customVerb('createLocationAndAssignServices', params, onCompletion);
	};
	
	var relations = [
	];
	
	LocationServicesObject.relations = relations;
	
	LocationServicesObject.prototype.isValid = function(){
		return LocationServicesObject.isValid(this);
	};
	
	LocationServicesObject.prototype.objModelName = "LocationServicesObject";
	
	return LocationServicesObject;
});