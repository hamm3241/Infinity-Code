define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function OnboardingTermsAndConditionsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	OnboardingTermsAndConditionsRepository.prototype = Object.create(BaseRepository.prototype);
	OnboardingTermsAndConditionsRepository.prototype.constructor = OnboardingTermsAndConditionsRepository;

	//For Operation 'getOnboardingTermsAndConditions' with service id 'get_onboardingtermsandconditions2929'
	OnboardingTermsAndConditionsRepository.prototype.getOnboardingTermsAndConditions = function(params,onCompletion){
		return OnboardingTermsAndConditionsRepository.prototype.customVerb('getOnboardingTermsAndConditions',params, onCompletion);
	};
	
	
	return OnboardingTermsAndConditionsRepository;
})