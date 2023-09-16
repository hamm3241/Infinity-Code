define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function leadproductRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	leadproductRepository.prototype = Object.create(BaseRepository.prototype);
	leadproductRepository.prototype.constructor = leadproductRepository;

	//For Operation 'setSupportedProducts' with service id 'setSupportedProducts4864'
	leadproductRepository.prototype.setSupportedProducts = function(params,onCompletion){
		return leadproductRepository.prototype.customVerb('setSupportedProducts',params, onCompletion);
	};
	//For Operation 'getProducts' with service id 'getProducts2352'
	leadproductRepository.prototype.getProducts = function(params,onCompletion){
		return leadproductRepository.prototype.customVerb('getProducts',params, onCompletion);
	};
	
	
	return leadproductRepository;
})