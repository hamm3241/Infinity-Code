define([],function(){
	var mappings = {
		"ADDRESS" : "ADDRESS",
		"Location_Address_id" : "Location_Address_id",
		"Location_Code" : "Location_Code",
		"Location_DeleteFlag" : "Location_DeleteFlag",
		"Location_Description" : "Location_Description",
		"Location_Display_Name" : "Location_Display_Name",
		"Location_EmailId" : "Location_EmailId",
		"Location_id" : "Location_id",
		"Location_IsMainBranch" : "Location_IsMainBranch",
		"Location_Latitude" : "Location_Latitude",
		"Location_Longitude" : "Location_Longitude",
		"Location_Name" : "Location_Name",
		"Location_Phone_Number" : "Location_Phone_Number",
		"Location_Status_id" : "Location_Status_id",
		"Location_Type_id" : "Location_Type_id",
		"Location_WorkScheduleId" : "Location_WorkScheduleId",
		"Saturday_EndTime" : "Saturday_EndTime",
		"Saturday_StartTime" : "Saturday_StartTime",
		"Service_Description" : "Service_Description",
		"Service_id" : "Service_id",
		"Service_Name" : "Service_Name",
		"Service_Status_id" : "Service_Status_id",
		"Service_Type_id" : "Service_Type_id",
		"Sunday_EndTime" : "Sunday_EndTime",
		"Sunday_StartTime" : "Sunday_StartTime",
		"Weekday_EndTime" : "Weekday_EndTime",
		"Weekday_StartTime" : "Weekday_StartTime",
	};
	Object.freeze(mappings);
	
	var typings = {
		"ADDRESS" : "string",
		"Location_Address_id" : "string",
		"Location_Code" : "string",
		"Location_DeleteFlag" : "boolean",
		"Location_Description" : "string",
		"Location_Display_Name" : "string",
		"Location_EmailId" : "string",
		"Location_id" : "string",
		"Location_IsMainBranch" : "boolean",
		"Location_Latitude" : "string",
		"Location_Longitude" : "string",
		"Location_Name" : "string",
		"Location_Phone_Number" : "string",
		"Location_Status_id" : "string",
		"Location_Type_id" : "string",
		"Location_WorkScheduleId" : "string",
		"Saturday_EndTime" : "date",
		"Saturday_StartTime" : "date",
		"Service_Description" : "string",
		"Service_id" : "string",
		"Service_Name" : "string",
		"Service_Status_id" : "string",
		"Service_Type_id" : "string",
		"Sunday_EndTime" : "date",
		"Sunday_StartTime" : "date",
		"Weekday_EndTime" : "date",
		"Weekday_StartTime" : "date",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "LocationObjService",
		tableName : "LocationServicesObject"
	};
	Object.freeze(config);
	
	return config;
})
