define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function cardSummaryRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	cardSummaryRepository.prototype = Object.create(BaseRepository.prototype);
	cardSummaryRepository.prototype.constructor = cardSummaryRepository;

	//For Operation 'getCustomerCardRequestNotificationSummary' with service id 'getCustomerCardRequestNotificationSummary9157'
	cardSummaryRepository.prototype.getCustomerCardRequestNotificationSummary = function(params,onCompletion){
		return cardSummaryRepository.prototype.customVerb('getCustomerCardRequestNotificationSummary',params, onCompletion);
	};
	
	
	return cardSummaryRepository;
})