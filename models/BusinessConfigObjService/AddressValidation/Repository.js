define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function AddressValidationRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	AddressValidationRepository.prototype = Object.create(BaseRepository.prototype);
	AddressValidationRepository.prototype.constructor = AddressValidationRepository;

	//For Operation 'validateAddress' with service id 'AddressValidation6557'
	AddressValidationRepository.prototype.validateAddress = function(params,onCompletion){
		return AddressValidationRepository.prototype.customVerb('validateAddress',params, onCompletion);
	};
	
	
	return AddressValidationRepository;
})