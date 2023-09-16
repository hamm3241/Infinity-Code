define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function leadconfigurationRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	leadconfigurationRepository.prototype = Object.create(BaseRepository.prototype);
	leadconfigurationRepository.prototype.constructor = leadconfigurationRepository;

	//For Operation 'setLeadConfiguration' with service id 'setLeadConfiguration5106'
	leadconfigurationRepository.prototype.setLeadConfiguration = function(params,onCompletion){
		return leadconfigurationRepository.prototype.customVerb('setLeadConfiguration',params, onCompletion);
	};
	//For Operation 'getLeadConfiguration' with service id 'getLeadConfiguration6827'
	leadconfigurationRepository.prototype.getLeadConfiguration = function(params,onCompletion){
		return leadconfigurationRepository.prototype.customVerb('getLeadConfiguration',params, onCompletion);
	};
	
	
	return leadconfigurationRepository;
})