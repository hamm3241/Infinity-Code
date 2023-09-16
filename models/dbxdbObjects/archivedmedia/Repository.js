define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function archivedmediaRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	archivedmediaRepository.prototype = Object.create(BaseRepository.prototype);
	archivedmediaRepository.prototype.constructor = archivedmediaRepository;

	//For Operation 'createBinary' with service id 'createBinaryarchivedmedia7513'
	archivedmediaRepository.prototype.createBinary = function(params, onCompletion){
		return archivedmediaRepository.prototype.customVerb('createBinary', params, onCompletion);
	};

	//For Operation 'getBinary' with service id 'queryBinaryarchivedmedia3830'
	archivedmediaRepository.prototype.getBinary = function(params, onCompletion){
		return archivedmediaRepository.prototype.customVerb('getBinary', params, onCompletion);
	};

	//For Operation 'updateBinary' with service id 'updateBinaryarchivedmedia7453'
	archivedmediaRepository.prototype.updateBinary = function(params, onCompletion){
		return archivedmediaRepository.prototype.customVerb('updateBinary', params, onCompletion);
	};

	//For Operation 'deleteBinary' with service id 'deleteBinaryarchivedmedia2872'
	archivedmediaRepository.prototype.deleteBinary = function(params, onCompletion){
		return archivedmediaRepository.prototype.customVerb('deleteBinary', params, onCompletion);
	};

	return archivedmediaRepository;
})