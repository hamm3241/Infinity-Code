define([],function(){
	var mappings = {
		"ServiceCommunication_createdby" : "ServiceCommunication_createdby",
		"ServiceCommunication_createdts" : "ServiceCommunication_createdts",
		"ServiceCommunication_Description" : "ServiceCommunication_Description",
		"ServiceCommunication_Extension" : "ServiceCommunication_Extension",
		"ServiceCommunication_id" : "ServiceCommunication_id",
		"ServiceCommunication_lastmodifiedts" : "ServiceCommunication_lastmodifiedts",
		"ServiceCommunication_modifiedby" : "ServiceCommunication_modifiedby",
		"ServiceCommunication_Priority" : "ServiceCommunication_Priority",
		"ServiceCommunication_SoftDeleteFlag" : "ServiceCommunication_SoftDeleteFlag",
		"ServiceCommunication_Status_id" : "ServiceCommunication_Status_id",
		"ServiceCommunication_synctimestamp" : "ServiceCommunication_synctimestamp",
		"ServiceCommunication_Typeid" : "ServiceCommunication_Typeid",
		"ServiceCommunication_Value" : "ServiceCommunication_Value",
		"Service_Channel_id" : "Service_Channel_id",
		"Service_Description" : "Service_Description",
		"Service_id" : "Service_id",
		"Service_Name" : "Service_Name",
		"Service_Notes" : "Service_Notes",
		"Service_SoftDeleteFlag" : "Service_SoftDeleteFlag",
		"Service_Status_id" : "Service_Status_id",
	};
	Object.freeze(mappings);
	
	var typings = {
		"ServiceCommunication_createdby" : "string",
		"ServiceCommunication_createdts" : "date",
		"ServiceCommunication_Description" : "string",
		"ServiceCommunication_Extension" : "string",
		"ServiceCommunication_id" : "string",
		"ServiceCommunication_lastmodifiedts" : "date",
		"ServiceCommunication_modifiedby" : "string",
		"ServiceCommunication_Priority" : "number",
		"ServiceCommunication_SoftDeleteFlag" : "boolean",
		"ServiceCommunication_Status_id" : "string",
		"ServiceCommunication_synctimestamp" : "date",
		"ServiceCommunication_Typeid" : "string",
		"ServiceCommunication_Value" : "string",
		"Service_Channel_id" : "string",
		"Service_Description" : "string",
		"Service_id" : "string",
		"Service_Name" : "string",
		"Service_Notes" : "string",
		"Service_SoftDeleteFlag" : "boolean",
		"Service_Status_id" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "CustServiceObjService",
		tableName : "ServiceAndServiceComm"
	};
	Object.freeze(config);
	
	return config;
})
