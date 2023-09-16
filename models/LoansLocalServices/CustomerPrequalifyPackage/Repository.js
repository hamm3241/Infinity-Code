define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function CustomerPrequalifyPackageRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	CustomerPrequalifyPackageRepository.prototype = Object.create(BaseRepository.prototype);
	CustomerPrequalifyPackageRepository.prototype.constructor = CustomerPrequalifyPackageRepository;

	//For Operation 'GetCustomerPrequalifyPackage' with service id 'dbxdb_sp_getCustomerPrequalifyPackage4425'
	CustomerPrequalifyPackageRepository.prototype.GetCustomerPrequalifyPackage = function(params,onCompletion){
		return CustomerPrequalifyPackageRepository.prototype.customVerb('GetCustomerPrequalifyPackage',params, onCompletion);
	};
	
	
	return CustomerPrequalifyPackageRepository;
})