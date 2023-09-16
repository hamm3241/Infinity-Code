define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function LogViewRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	LogViewRepository.prototype = Object.create(BaseRepository.prototype);
	LogViewRepository.prototype.constructor = LogViewRepository;

	//For Operation 'deleteFilter' with service id 'deleteFilter8127'
	LogViewRepository.prototype.deleteFilter = function(params,onCompletion){
		return LogViewRepository.prototype.customVerb('deleteFilter',params, onCompletion);
	};
	//For Operation 'getFilters' with service id 'getFilters7294'
	LogViewRepository.prototype.getFilters = function(params,onCompletion){
		return LogViewRepository.prototype.customVerb('getFilters',params, onCompletion);
	};
	//For Operation 'createFilter' with service id 'createFilter1418'
	LogViewRepository.prototype.createFilter = function(params,onCompletion){
		return LogViewRepository.prototype.customVerb('createFilter',params, onCompletion);
	};
	
	
	return LogViewRepository;
})