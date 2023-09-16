define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function UserDeviceRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	UserDeviceRepository.prototype = Object.create(BaseRepository.prototype);
	UserDeviceRepository.prototype.constructor = UserDeviceRepository;

	//For Operation 'getUserDevices' with service id 'getUserDeviceDetails7358'
	UserDeviceRepository.prototype.getUserDevices = function(params, onCompletion){
		return UserDeviceRepository.prototype.customVerb('getUserDevices', params, onCompletion);
	};

	//For Operation 'updateDeviceStatus' with service id 'updateDeviceStatus6460'
	UserDeviceRepository.prototype.updateDeviceStatus = function(params, onCompletion){
		return UserDeviceRepository.prototype.customVerb('updateDeviceStatus', params, onCompletion);
	};

	return UserDeviceRepository;
})