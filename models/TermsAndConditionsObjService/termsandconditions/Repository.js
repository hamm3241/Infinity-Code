define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function termsandconditionsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	termsandconditionsRepository.prototype = Object.create(BaseRepository.prototype);
	termsandconditionsRepository.prototype.constructor = termsandconditionsRepository;

	//For Operation 'editTermsAndConditions' with service id 'editTermsAndConditions3925'
	termsandconditionsRepository.prototype.editTermsAndConditions = function(params,onCompletion){
		return termsandconditionsRepository.prototype.customVerb('editTermsAndConditions',params, onCompletion);
	};
	//For Operation 'getAllTermsAndConditions' with service id 'getAllTermsAndConditions6441'
	termsandconditionsRepository.prototype.getAllTermsAndConditions = function(params,onCompletion){
		return termsandconditionsRepository.prototype.customVerb('getAllTermsAndConditions',params, onCompletion);
	};
	//For Operation 'createTermsAndConditionsVersion' with service id 'createTermsAndConditionsVersion2518'
	termsandconditionsRepository.prototype.createTermsAndConditionsVersion = function(params,onCompletion){
		return termsandconditionsRepository.prototype.customVerb('createTermsAndConditionsVersion',params, onCompletion);
	};
	//For Operation 'deleteTermsAndConditionsVersion' with service id 'deleteTermsAndConditionsVersion5140'
	termsandconditionsRepository.prototype.deleteTermsAndConditionsVersion = function(params,onCompletion){
		return termsandconditionsRepository.prototype.customVerb('deleteTermsAndConditionsVersion',params, onCompletion);
	};
	//For Operation 'getTermsAndConditions' with service id 'getTermsAndConditions4255'
	termsandconditionsRepository.prototype.getTermsAndConditions = function(params,onCompletion){
		return termsandconditionsRepository.prototype.customVerb('getTermsAndConditions',params, onCompletion);
	};
	
	
	return termsandconditionsRepository;
})