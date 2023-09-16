define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function LOBRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	LOBRepository.prototype = Object.create(BaseRepository.prototype);
	LOBRepository.prototype.constructor = LOBRepository;

	//For Operation 'getLOB' with service id 'get_lob_view7133'
	LOBRepository.prototype.getLOB = function(params, onCompletion){
		return LOBRepository.prototype.customVerb('getLOB', params, onCompletion);
	};

	return LOBRepository;
})