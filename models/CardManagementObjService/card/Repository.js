define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function cardRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	cardRepository.prototype = Object.create(BaseRepository.prototype);
	cardRepository.prototype.constructor = cardRepository;

	//For Operation 'getCustomerCards' with service id 'getCustomerCards9045'
	cardRepository.prototype.getCustomerCards = function(params,onCompletion){
		return cardRepository.prototype.customVerb('getCustomerCards',params, onCompletion);
	};
	//For Operation 'updateCustomerCard' with service id 'updateCustomerCard4790'
	cardRepository.prototype.updateCustomerCard = function(params,onCompletion){
		return cardRepository.prototype.customVerb('updateCustomerCard',params, onCompletion);
	};
	
	
	return cardRepository;
})