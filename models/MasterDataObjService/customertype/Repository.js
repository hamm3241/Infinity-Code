define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function customertypeRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	customertypeRepository.prototype = Object.create(BaseRepository.prototype);
	customertypeRepository.prototype.constructor = customertypeRepository;

	//For Operation 'getCustomerTypes' with service id 'get_customertype3952'
	customertypeRepository.prototype.getCustomerTypes = function(params,onCompletion){
		return customertypeRepository.prototype.customVerb('getCustomerTypes',params, onCompletion);
	};
	
	
	return customertypeRepository;
})