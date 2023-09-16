define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function accounttypeRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	accounttypeRepository.prototype = Object.create(BaseRepository.prototype);
	accounttypeRepository.prototype.constructor = accounttypeRepository;

	//For Operation 'getAccountTypes' with service id 'get_accounttype2382'
	accounttypeRepository.prototype.getAccountTypes = function(params,onCompletion){
		return accounttypeRepository.prototype.customVerb('getAccountTypes',params, onCompletion);
	};
	
	
	return accounttypeRepository;
})