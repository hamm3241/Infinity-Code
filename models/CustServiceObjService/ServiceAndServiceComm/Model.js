define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		ServiceCommunication_createdby : function(val, state){
			state['ServiceCommunication_createdby'] = val;
		},
		ServiceCommunication_createdts : function(val, state){
			state['ServiceCommunication_createdts'] = val;
		},
		ServiceCommunication_Description : function(val, state){
			state['ServiceCommunication_Description'] = val;
		},
		ServiceCommunication_Extension : function(val, state){
			state['ServiceCommunication_Extension'] = val;
		},
		ServiceCommunication_id : function(val, state){
			state['ServiceCommunication_id'] = val;
		},
		ServiceCommunication_lastmodifiedts : function(val, state){
			state['ServiceCommunication_lastmodifiedts'] = val;
		},
		ServiceCommunication_modifiedby : function(val, state){
			state['ServiceCommunication_modifiedby'] = val;
		},
		ServiceCommunication_Priority : function(val, state){
			state['ServiceCommunication_Priority'] = val;
		},
		ServiceCommunication_SoftDeleteFlag : function(val, state){
			state['ServiceCommunication_SoftDeleteFlag'] = val;
		},
		ServiceCommunication_Status_id : function(val, state){
			state['ServiceCommunication_Status_id'] = val;
		},
		ServiceCommunication_synctimestamp : function(val, state){
			state['ServiceCommunication_synctimestamp'] = val;
		},
		ServiceCommunication_Typeid : function(val, state){
			state['ServiceCommunication_Typeid'] = val;
		},
		ServiceCommunication_Value : function(val, state){
			state['ServiceCommunication_Value'] = val;
		},
		Service_Channel_id : function(val, state){
			state['Service_Channel_id'] = val;
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
		Service_Notes : function(val, state){
			state['Service_Notes'] = val;
		},
		Service_SoftDeleteFlag : function(val, state){
			state['Service_SoftDeleteFlag'] = val;
		},
		Service_Status_id : function(val, state){
			state['Service_Status_id'] = val;
		},
	};
	
	
	//Create the Model Class
	function ServiceAndServiceComm(defaultValues){
		var privateState = {};
			privateState.ServiceCommunication_createdby = defaultValues?(defaultValues["ServiceCommunication_createdby"]?defaultValues["ServiceCommunication_createdby"]:null):null;
			privateState.ServiceCommunication_createdts = defaultValues?(defaultValues["ServiceCommunication_createdts"]?defaultValues["ServiceCommunication_createdts"]:null):null;
			privateState.ServiceCommunication_Description = defaultValues?(defaultValues["ServiceCommunication_Description"]?defaultValues["ServiceCommunication_Description"]:null):null;
			privateState.ServiceCommunication_Extension = defaultValues?(defaultValues["ServiceCommunication_Extension"]?defaultValues["ServiceCommunication_Extension"]:null):null;
			privateState.ServiceCommunication_id = defaultValues?(defaultValues["ServiceCommunication_id"]?defaultValues["ServiceCommunication_id"]:null):null;
			privateState.ServiceCommunication_lastmodifiedts = defaultValues?(defaultValues["ServiceCommunication_lastmodifiedts"]?defaultValues["ServiceCommunication_lastmodifiedts"]:null):null;
			privateState.ServiceCommunication_modifiedby = defaultValues?(defaultValues["ServiceCommunication_modifiedby"]?defaultValues["ServiceCommunication_modifiedby"]:null):null;
			privateState.ServiceCommunication_Priority = defaultValues?(defaultValues["ServiceCommunication_Priority"]?defaultValues["ServiceCommunication_Priority"]:null):null;
			privateState.ServiceCommunication_SoftDeleteFlag = defaultValues?(defaultValues["ServiceCommunication_SoftDeleteFlag"]?defaultValues["ServiceCommunication_SoftDeleteFlag"]:null):null;
			privateState.ServiceCommunication_Status_id = defaultValues?(defaultValues["ServiceCommunication_Status_id"]?defaultValues["ServiceCommunication_Status_id"]:null):null;
			privateState.ServiceCommunication_synctimestamp = defaultValues?(defaultValues["ServiceCommunication_synctimestamp"]?defaultValues["ServiceCommunication_synctimestamp"]:null):null;
			privateState.ServiceCommunication_Typeid = defaultValues?(defaultValues["ServiceCommunication_Typeid"]?defaultValues["ServiceCommunication_Typeid"]:null):null;
			privateState.ServiceCommunication_Value = defaultValues?(defaultValues["ServiceCommunication_Value"]?defaultValues["ServiceCommunication_Value"]:null):null;
			privateState.Service_Channel_id = defaultValues?(defaultValues["Service_Channel_id"]?defaultValues["Service_Channel_id"]:null):null;
			privateState.Service_Description = defaultValues?(defaultValues["Service_Description"]?defaultValues["Service_Description"]:null):null;
			privateState.Service_id = defaultValues?(defaultValues["Service_id"]?defaultValues["Service_id"]:null):null;
			privateState.Service_Name = defaultValues?(defaultValues["Service_Name"]?defaultValues["Service_Name"]:null):null;
			privateState.Service_Notes = defaultValues?(defaultValues["Service_Notes"]?defaultValues["Service_Notes"]:null):null;
			privateState.Service_SoftDeleteFlag = defaultValues?(defaultValues["Service_SoftDeleteFlag"]?defaultValues["Service_SoftDeleteFlag"]:null):null;
			privateState.Service_Status_id = defaultValues?(defaultValues["Service_Status_id"]?defaultValues["Service_Status_id"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"ServiceCommunication_createdby" : {
					get : function(){return privateState.ServiceCommunication_createdby},
					set : function(val){
						setterFunctions['ServiceCommunication_createdby'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ServiceCommunication_createdts" : {
					get : function(){return privateState.ServiceCommunication_createdts},
					set : function(val){
						setterFunctions['ServiceCommunication_createdts'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ServiceCommunication_Description" : {
					get : function(){return privateState.ServiceCommunication_Description},
					set : function(val){
						setterFunctions['ServiceCommunication_Description'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ServiceCommunication_Extension" : {
					get : function(){return privateState.ServiceCommunication_Extension},
					set : function(val){
						setterFunctions['ServiceCommunication_Extension'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ServiceCommunication_id" : {
					get : function(){return privateState.ServiceCommunication_id},
					set : function(val){
						setterFunctions['ServiceCommunication_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ServiceCommunication_lastmodifiedts" : {
					get : function(){return privateState.ServiceCommunication_lastmodifiedts},
					set : function(val){
						setterFunctions['ServiceCommunication_lastmodifiedts'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ServiceCommunication_modifiedby" : {
					get : function(){return privateState.ServiceCommunication_modifiedby},
					set : function(val){
						setterFunctions['ServiceCommunication_modifiedby'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ServiceCommunication_Priority" : {
					get : function(){return privateState.ServiceCommunication_Priority},
					set : function(val){
						setterFunctions['ServiceCommunication_Priority'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ServiceCommunication_SoftDeleteFlag" : {
					get : function(){return privateState.ServiceCommunication_SoftDeleteFlag},
					set : function(val){
						setterFunctions['ServiceCommunication_SoftDeleteFlag'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ServiceCommunication_Status_id" : {
					get : function(){return privateState.ServiceCommunication_Status_id},
					set : function(val){
						setterFunctions['ServiceCommunication_Status_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ServiceCommunication_synctimestamp" : {
					get : function(){return privateState.ServiceCommunication_synctimestamp},
					set : function(val){
						setterFunctions['ServiceCommunication_synctimestamp'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ServiceCommunication_Typeid" : {
					get : function(){return privateState.ServiceCommunication_Typeid},
					set : function(val){
						setterFunctions['ServiceCommunication_Typeid'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ServiceCommunication_Value" : {
					get : function(){return privateState.ServiceCommunication_Value},
					set : function(val){
						setterFunctions['ServiceCommunication_Value'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Service_Channel_id" : {
					get : function(){return privateState.Service_Channel_id},
					set : function(val){
						setterFunctions['Service_Channel_id'].call(this,val,privateState);
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
				"Service_Notes" : {
					get : function(){return privateState.Service_Notes},
					set : function(val){
						setterFunctions['Service_Notes'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Service_SoftDeleteFlag" : {
					get : function(){return privateState.Service_SoftDeleteFlag},
					set : function(val){
						setterFunctions['Service_SoftDeleteFlag'].call(this,val,privateState);
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
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(ServiceAndServiceComm);
	
	//Create new class level validator object
	BaseModel.Validator.call(ServiceAndServiceComm);
	
	var registerValidatorBackup = ServiceAndServiceComm.registerValidator;
	
	ServiceAndServiceComm.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( ServiceAndServiceComm.isValid(this, propName, val) ){
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
	//For Operation 'contactUs' with service id 'getCustomerServiceAndCommunicationRecords2226'
	ServiceAndServiceComm.contactUs = function(params, onCompletion){
		return ServiceAndServiceComm.customVerb('contactUs', params, onCompletion);
	};
	//For Operation 'editServiceAndServiceCommunicationRecords' with service id 'editServiceAndCommunicationRecords8919'
	ServiceAndServiceComm.editServiceAndServiceCommunicationRecords = function(params, onCompletion){
		return ServiceAndServiceComm.customVerb('editServiceAndServiceCommunicationRecords', params, onCompletion);
	};
	//For Operation 'deleteServiceAndServiceCommunicationRecords' with service id 'deleteServiceAndCommunicationRecords3776'
	ServiceAndServiceComm.deleteServiceAndServiceCommunicationRecords = function(params, onCompletion){
		return ServiceAndServiceComm.customVerb('deleteServiceAndServiceCommunicationRecords', params, onCompletion);
	};
	//For Operation 'createServiceAndServiceCommunicationRecords' with service id 'createServiceAndCommunicationRecords6537'
	ServiceAndServiceComm.createServiceAndServiceCommunicationRecords = function(params, onCompletion){
		return ServiceAndServiceComm.customVerb('createServiceAndServiceCommunicationRecords', params, onCompletion);
	};
	//For Operation 'getServiceAndServiceCommunicationRecords' with service id 'getCustomerServiceAndCommunicationRecords3348'
	ServiceAndServiceComm.getServiceAndServiceCommunicationRecords = function(params, onCompletion){
		return ServiceAndServiceComm.customVerb('getServiceAndServiceCommunicationRecords', params, onCompletion);
	};
	
	var relations = [
	];
	
	ServiceAndServiceComm.relations = relations;
	
	ServiceAndServiceComm.prototype.isValid = function(){
		return ServiceAndServiceComm.isValid(this);
	};
	
	ServiceAndServiceComm.prototype.objModelName = "ServiceAndServiceComm";
	
	return ServiceAndServiceComm;
});