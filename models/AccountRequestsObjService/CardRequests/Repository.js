define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function CardRequestsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	CardRequestsRepository.prototype = Object.create(BaseRepository.prototype);
	CardRequestsRepository.prototype.constructor = CardRequestsRepository;

	//For Operation 'createCardRequest' with service id 'createCardRequest9983'
	CardRequestsRepository.prototype.createCardRequest = function(params,onCompletion){
		return CardRequestsRepository.prototype.customVerb('createCardRequest',params, onCompletion);
	};
	//For Operation 'getCardRequests' with service id 'getCardRequests7225'
	CardRequestsRepository.prototype.getCardRequests = function(params,onCompletion){
		return CardRequestsRepository.prototype.customVerb('getCardRequests',params, onCompletion);
	};
	
	
	return CardRequestsRepository;
})