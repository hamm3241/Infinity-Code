define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function regionRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	regionRepository.prototype = Object.create(BaseRepository.prototype);
	regionRepository.prototype.constructor = regionRepository;

	//For Operation 'getDetails' with service id 'get_region_details_view8077'
	regionRepository.prototype.getDetails = function(params,onCompletion){
		return regionRepository.prototype.customVerb('getDetails',params, onCompletion);
	};
	
	
	return regionRepository;
})