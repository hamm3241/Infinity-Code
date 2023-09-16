define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function bankFacilityRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	bankFacilityRepository.prototype = Object.create(BaseRepository.prototype);
	bankFacilityRepository.prototype.constructor = bankFacilityRepository;

	//For Operation 'createFacility' with service id 'createFacility8259'
	bankFacilityRepository.prototype.createFacility = function(params, onCompletion){
		return bankFacilityRepository.prototype.customVerb('createFacility', params, onCompletion);
	};

	//For Operation 'getFacilities' with service id 'getFacilities8777'
	bankFacilityRepository.prototype.getFacilities = function(params, onCompletion){
		return bankFacilityRepository.prototype.customVerb('getFacilities', params, onCompletion);
	};

	//For Operation 'editFacility' with service id 'editFacility4939'
	bankFacilityRepository.prototype.editFacility = function(params, onCompletion){
		return bankFacilityRepository.prototype.customVerb('editFacility', params, onCompletion);
	};

	return bankFacilityRepository;
})