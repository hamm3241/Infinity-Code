define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function manageSecurityImagesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	manageSecurityImagesRepository.prototype = Object.create(BaseRepository.prototype);
	manageSecurityImagesRepository.prototype.constructor = manageSecurityImagesRepository;

	//For Operation 'insertSecurityImages' with service id 'insertSecurityImages7412'
	manageSecurityImagesRepository.prototype.insertSecurityImages = function(params,onCompletion){
		return manageSecurityImagesRepository.prototype.customVerb('insertSecurityImages',params, onCompletion);
	};
	//For Operation 'updateSecurityImages' with service id 'updateSecurityImages3083'
	manageSecurityImagesRepository.prototype.updateSecurityImages = function(params,onCompletion){
		return manageSecurityImagesRepository.prototype.customVerb('updateSecurityImages',params, onCompletion);
	};
	//For Operation 'getSecurityImages' with service id 'getSecurityImages2210'
	manageSecurityImagesRepository.prototype.getSecurityImages = function(params,onCompletion){
		return manageSecurityImagesRepository.prototype.customVerb('getSecurityImages',params, onCompletion);
	};
	//For Operation 'deleteSecurityImages' with service id 'deleteSecurityImages6654'
	manageSecurityImagesRepository.prototype.deleteSecurityImages = function(params,onCompletion){
		return manageSecurityImagesRepository.prototype.customVerb('deleteSecurityImages',params, onCompletion);
	};
	
	
	return manageSecurityImagesRepository;
})