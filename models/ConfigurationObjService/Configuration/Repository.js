define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function ConfigurationRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	ConfigurationRepository.prototype = Object.create(BaseRepository.prototype);
	ConfigurationRepository.prototype.constructor = ConfigurationRepository;

	//For Operation 'fetchConfigurations' with service id 'fetchConfigurations1827'
	ConfigurationRepository.prototype.fetchConfigurations = function(params,onCompletion){
		return ConfigurationRepository.prototype.customVerb('fetchConfigurations',params, onCompletion);
	};
	//For Operation 'getConfigurations' with service id 'getConfigurations5823'
	ConfigurationRepository.prototype.getConfigurations = function(params,onCompletion){
		return ConfigurationRepository.prototype.customVerb('getConfigurations',params, onCompletion);
	};
	//For Operation 'fetchBundleAndConfigurations' with service id 'fetchBundleAndConfigurations6196'
	ConfigurationRepository.prototype.fetchBundleAndConfigurations = function(params,onCompletion){
		return ConfigurationRepository.prototype.customVerb('fetchBundleAndConfigurations',params, onCompletion);
	};
	//For Operation 'deleteBundleAndConfigurations' with service id 'deleteBundleAndConfigurations7390'
	ConfigurationRepository.prototype.deleteBundleAndConfigurations = function(params,onCompletion){
		return ConfigurationRepository.prototype.customVerb('deleteBundleAndConfigurations',params, onCompletion);
	};
	//For Operation 'manageBundleAndConfigurations' with service id 'manageBundleAndConfigurations5935'
	ConfigurationRepository.prototype.manageBundleAndConfigurations = function(params,onCompletion){
		return ConfigurationRepository.prototype.customVerb('manageBundleAndConfigurations',params, onCompletion);
	};
	//For Operation 'fetchBundles' with service id 'fetchBundles4076'
	ConfigurationRepository.prototype.fetchBundles = function(params,onCompletion){
		return ConfigurationRepository.prototype.customVerb('fetchBundles',params, onCompletion);
	};
	
	
	return ConfigurationRepository;
})