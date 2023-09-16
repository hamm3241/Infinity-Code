define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function addressRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	addressRepository.prototype = Object.create(BaseRepository.prototype);
	addressRepository.prototype.constructor = addressRepository;

	//For Operation 'validateAddress' with service id 'validateAddress1311'
	addressRepository.prototype.validateAddress = function(params,onCompletion){
		return addressRepository.prototype.customVerb('validateAddress',params, onCompletion);
	};
	
	
	return addressRepository;
})