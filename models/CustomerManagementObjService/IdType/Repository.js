define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function IdTypeRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	IdTypeRepository.prototype = Object.create(BaseRepository.prototype);
	IdTypeRepository.prototype.constructor = IdTypeRepository;

	//For Operation 'getIdTypes' with service id 'get_idtype4093'
	IdTypeRepository.prototype.getIdTypes = function(params,onCompletion){
		return IdTypeRepository.prototype.customVerb('getIdTypes',params, onCompletion);
	};
	
	
	return IdTypeRepository;
})