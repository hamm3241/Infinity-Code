define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function termsAndConditionsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	termsAndConditionsRepository.prototype = Object.create(BaseRepository.prototype);
	termsAndConditionsRepository.prototype.constructor = termsAndConditionsRepository;

	//For Operation 'updateTermsAndConditions' with service id 'updateTermsAndConditions3660'
	termsAndConditionsRepository.prototype.updateTermsAndConditions = function(params,onCompletion){
		return termsAndConditionsRepository.prototype.customVerb('updateTermsAndConditions',params, onCompletion);
	};
	//For Operation 'createTermsAndConditions' with service id 'createTermsAndConditions6309'
	termsAndConditionsRepository.prototype.createTermsAndConditions = function(params,onCompletion){
		return termsAndConditionsRepository.prototype.customVerb('createTermsAndConditions',params, onCompletion);
	};
	//For Operation 'deleteTermsAndConditions' with service id 'deleteTermsAndConditions1953'
	termsAndConditionsRepository.prototype.deleteTermsAndConditions = function(params,onCompletion){
		return termsAndConditionsRepository.prototype.customVerb('deleteTermsAndConditions',params, onCompletion);
	};
	//For Operation 'getTermsAndConditions' with service id 'getTermsAndConditions2999'
	termsAndConditionsRepository.prototype.getTermsAndConditions = function(params,onCompletion){
		return termsAndConditionsRepository.prototype.customVerb('getTermsAndConditions',params, onCompletion);
	};
	
	
	return termsAndConditionsRepository;
})