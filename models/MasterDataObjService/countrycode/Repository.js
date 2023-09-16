define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function countrycodeRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	countrycodeRepository.prototype = Object.create(BaseRepository.prototype);
	countrycodeRepository.prototype.constructor = countrycodeRepository;

	//For Operation 'getCountryCodes' with service id 'get_countrycode1364'
	countrycodeRepository.prototype.getCountryCodes = function(params, onCompletion){
		return countrycodeRepository.prototype.customVerb('getCountryCodes', params, onCompletion);
	};

	return countrycodeRepository;
})