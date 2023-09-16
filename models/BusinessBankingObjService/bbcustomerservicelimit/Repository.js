define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function bbcustomerservicelimitRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	bbcustomerservicelimitRepository.prototype = Object.create(BaseRepository.prototype);
	bbcustomerservicelimitRepository.prototype.constructor = bbcustomerservicelimitRepository;

	//For Operation 'getBBCustomerServiceLimit' with service id 'getBBCustomerServiceLimit2363'
	bbcustomerservicelimitRepository.prototype.getBBCustomerServiceLimit = function(params, onCompletion){
		return bbcustomerservicelimitRepository.prototype.customVerb('getBBCustomerServiceLimit', params, onCompletion);
	};

	//For Operation 'createBBCustomerServiceLimit' with service id 'createBBCustomerServiceLimit3751'
	bbcustomerservicelimitRepository.prototype.createBBCustomerServiceLimit = function(params, onCompletion){
		return bbcustomerservicelimitRepository.prototype.customVerb('createBBCustomerServiceLimit', params, onCompletion);
	};

	//For Operation 'editBBCustomerServiceLimit' with service id 'editBBCustomerServiceLimit2384'
	bbcustomerservicelimitRepository.prototype.editBBCustomerServiceLimit = function(params, onCompletion){
		return bbcustomerservicelimitRepository.prototype.customVerb('editBBCustomerServiceLimit', params, onCompletion);
	};

	return bbcustomerservicelimitRepository;
})