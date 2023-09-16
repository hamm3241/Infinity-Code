define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function CustomerAndCustomerGroupRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	CustomerAndCustomerGroupRepository.prototype = Object.create(BaseRepository.prototype);
	CustomerAndCustomerGroupRepository.prototype.constructor = CustomerAndCustomerGroupRepository;

	//For Operation 'getSuggestions' with service id 'getSuggestions3745'
	CustomerAndCustomerGroupRepository.prototype.getSuggestions = function(params,onCompletion){
		return CustomerAndCustomerGroupRepository.prototype.customVerb('getSuggestions',params, onCompletion);
	};
	
	
	return CustomerAndCustomerGroupRepository;
})