define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function EligibilityCriteriaRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	EligibilityCriteriaRepository.prototype = Object.create(BaseRepository.prototype);
	EligibilityCriteriaRepository.prototype.constructor = EligibilityCriteriaRepository;

	//For Operation 'getEligibilityCriteria' with service id 'get_eligibilitycriteria4800'
	EligibilityCriteriaRepository.prototype.getEligibilityCriteria = function(params,onCompletion){
		return EligibilityCriteriaRepository.prototype.customVerb('getEligibilityCriteria',params, onCompletion);
	};
	//For Operation 'addEligibilityCriteria' with service id 'addEligibilityCriteria5582'
	EligibilityCriteriaRepository.prototype.addEligibilityCriteria = function(params,onCompletion){
		return EligibilityCriteriaRepository.prototype.customVerb('addEligibilityCriteria',params, onCompletion);
	};
	//For Operation 'editEligibilityCriteria' with service id 'editEligibilityCriteria1276'
	EligibilityCriteriaRepository.prototype.editEligibilityCriteria = function(params,onCompletion){
		return EligibilityCriteriaRepository.prototype.customVerb('editEligibilityCriteria',params, onCompletion);
	};
	//For Operation 'deleteEligibilityCriteria' with service id 'deleteEligibilityCriteria7366'
	EligibilityCriteriaRepository.prototype.deleteEligibilityCriteria = function(params,onCompletion){
		return EligibilityCriteriaRepository.prototype.customVerb('deleteEligibilityCriteria',params, onCompletion);
	};
	
	
	return EligibilityCriteriaRepository;
})