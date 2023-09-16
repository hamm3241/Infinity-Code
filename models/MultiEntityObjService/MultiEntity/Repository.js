define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function MultiEntityRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	MultiEntityRepository.prototype = Object.create(BaseRepository.prototype);
	MultiEntityRepository.prototype.constructor = MultiEntityRepository;

	//For Operation 'getLegalEntities' with service id 'getCompanyLegalUnits9251'
	MultiEntityRepository.prototype.getLegalEntities = function(params, onCompletion){
		return MultiEntityRepository.prototype.customVerb('getLegalEntities', params, onCompletion);
	};

	return MultiEntityRepository;
})