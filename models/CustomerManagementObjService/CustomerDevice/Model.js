define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
	};
	
	
	//Create the Model Class
	function CustomerDevice(defaultValues){
		var privateState = {};
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(CustomerDevice);
	
	//Create new class level validator object
	BaseModel.Validator.call(CustomerDevice);
	
	var registerValidatorBackup = CustomerDevice.registerValidator;
	
	CustomerDevice.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( CustomerDevice.isValid(this, propName, val) ){
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
	//For Operation 'RegisterCustomerDevice' with service id 'CustomerRegisterDevice4701'
	CustomerDevice.RegisterCustomerDevice = function(params, onCompletion){
		return CustomerDevice.customVerb('RegisterCustomerDevice', params, onCompletion);
	};
	//For Operation 'GetCustomerDevices' with service id 'GetCustomerDevices9602'
	CustomerDevice.GetCustomerDevices = function(params, onCompletion){
		return CustomerDevice.customVerb('GetCustomerDevices', params, onCompletion);
	};
	//For Operation 'CustomerUpdateDeviceInformation' with service id 'CustomerUpdateDeviceInformation7699'
	CustomerDevice.CustomerUpdateDeviceInformation = function(params, onCompletion){
		return CustomerDevice.customVerb('CustomerUpdateDeviceInformation', params, onCompletion);
	};
	//For Operation 'IsDeviceRegistered' with service id 'IsDeviceRegistered3238'
	CustomerDevice.IsDeviceRegistered = function(params, onCompletion){
		return CustomerDevice.customVerb('IsDeviceRegistered', params, onCompletion);
	};
	
	var relations = [
	];
	
	CustomerDevice.relations = relations;
	
	CustomerDevice.prototype.isValid = function(){
		return CustomerDevice.isValid(this);
	};
	
	CustomerDevice.prototype.objModelName = "CustomerDevice";
	
	return CustomerDevice;
});