define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function maplocationRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	maplocationRepository.prototype = Object.create(BaseRepository.prototype);
	maplocationRepository.prototype.constructor = maplocationRepository;

	//For Operation 'getSuggestions' with service id 'getSuggestions4238'
	maplocationRepository.prototype.getSuggestions = function(params,onCompletion){
		return maplocationRepository.prototype.customVerb('getSuggestions',params, onCompletion);
	};
	//For Operation 'getDetails' with service id 'getDetails5087'
	maplocationRepository.prototype.getDetails = function(params,onCompletion){
		return maplocationRepository.prototype.customVerb('getDetails',params, onCompletion);
	};
	
	
	return maplocationRepository;
})