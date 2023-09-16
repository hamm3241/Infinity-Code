define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function CustomerDeviceRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	CustomerDeviceRepository.prototype = Object.create(BaseRepository.prototype);
	CustomerDeviceRepository.prototype.constructor = CustomerDeviceRepository;

	//For Operation 'RegisterCustomerDevice' with service id 'CustomerRegisterDevice4701'
	CustomerDeviceRepository.prototype.RegisterCustomerDevice = function(params,onCompletion){
		return CustomerDeviceRepository.prototype.customVerb('RegisterCustomerDevice',params, onCompletion);
	};
	//For Operation 'GetCustomerDevices' with service id 'GetCustomerDevices9602'
	CustomerDeviceRepository.prototype.GetCustomerDevices = function(params,onCompletion){
		return CustomerDeviceRepository.prototype.customVerb('GetCustomerDevices',params, onCompletion);
	};
	//For Operation 'CustomerUpdateDeviceInformation' with service id 'CustomerUpdateDeviceInformation7699'
	CustomerDeviceRepository.prototype.CustomerUpdateDeviceInformation = function(params,onCompletion){
		return CustomerDeviceRepository.prototype.customVerb('CustomerUpdateDeviceInformation',params, onCompletion);
	};
	//For Operation 'IsDeviceRegistered' with service id 'IsDeviceRegistered3238'
	CustomerDeviceRepository.prototype.IsDeviceRegistered = function(params,onCompletion){
		return CustomerDeviceRepository.prototype.customVerb('IsDeviceRegistered',params, onCompletion);
	};
	
	
	return CustomerDeviceRepository;
})