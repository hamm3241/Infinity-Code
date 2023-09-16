define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function ApplicantRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	ApplicantRepository.prototype = Object.create(BaseRepository.prototype);
	ApplicantRepository.prototype.constructor = ApplicantRepository;

	//For Operation 'createApplicantAO' with service id 'createApplicantViaAssistedOnboarding4284'
	ApplicantRepository.prototype.createApplicantAO = function(params,onCompletion){
		return ApplicantRepository.prototype.customVerb('createApplicantAO',params, onCompletion);
	};
	//For Operation 'getApplicantStatus' with service id 'getApplicantStatus3171'
	ApplicantRepository.prototype.getApplicantStatus = function(params,onCompletion){
		return ApplicantRepository.prototype.customVerb('getApplicantStatus',params, onCompletion);
	};
	//For Operation 'deleteApplicant' with service id 'deleteApplicant6232'
	ApplicantRepository.prototype.deleteApplicant = function(params,onCompletion){
		return ApplicantRepository.prototype.customVerb('deleteApplicant',params, onCompletion);
	};
	//For Operation 'createApplicantViaAssistedOnboarding' with service id 'createApplicantViaAssistedOnboarding3503'
	ApplicantRepository.prototype.createApplicantViaAssistedOnboarding = function(params,onCompletion){
		return ApplicantRepository.prototype.customVerb('createApplicantViaAssistedOnboarding',params, onCompletion);
	};
	//For Operation 'createApplicant' with service id 'createApplicant9796'
	ApplicantRepository.prototype.createApplicant = function(params,onCompletion){
		return ApplicantRepository.prototype.customVerb('createApplicant',params, onCompletion);
	};
	
	
	return ApplicantRepository;
})