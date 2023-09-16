define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function LoansConfigurationMastersRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	LoansConfigurationMastersRepository.prototype = Object.create(BaseRepository.prototype);
	LoansConfigurationMastersRepository.prototype.constructor = LoansConfigurationMastersRepository;

	//For Operation 'fetchConfigurations' with service id 'fetchConfigurations7587'
	LoansConfigurationMastersRepository.prototype.fetchConfigurations = function(params,onCompletion){
		return LoansConfigurationMastersRepository.prototype.customVerb('fetchConfigurations',params, onCompletion);
	};
	
	
	return LoansConfigurationMastersRepository;
})