define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function localeRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	localeRepository.prototype = Object.create(BaseRepository.prototype);
	localeRepository.prototype.constructor = localeRepository;

	//For Operation 'getLocales' with service id 'get_locale3312'
	localeRepository.prototype.getLocales = function(params,onCompletion){
		return localeRepository.prototype.customVerb('getLocales',params, onCompletion);
	};
	
	
	return localeRepository;
})