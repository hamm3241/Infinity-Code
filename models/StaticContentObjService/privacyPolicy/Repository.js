define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function privacyPolicyRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	privacyPolicyRepository.prototype = Object.create(BaseRepository.prototype);
	privacyPolicyRepository.prototype.constructor = privacyPolicyRepository;

	//For Operation 'createPrivacyPolicy' with service id 'createPrivacyPolicy5129'
	privacyPolicyRepository.prototype.createPrivacyPolicy = function(params,onCompletion){
		return privacyPolicyRepository.prototype.customVerb('createPrivacyPolicy',params, onCompletion);
	};
	//For Operation 'deletePrivacyPolicy' with service id 'deletePrivacyPolicy4492'
	privacyPolicyRepository.prototype.deletePrivacyPolicy = function(params,onCompletion){
		return privacyPolicyRepository.prototype.customVerb('deletePrivacyPolicy',params, onCompletion);
	};
	//For Operation 'getPrivacyPolicy' with service id 'get_privacypolicy5653'
	privacyPolicyRepository.prototype.getPrivacyPolicy = function(params,onCompletion){
		return privacyPolicyRepository.prototype.customVerb('getPrivacyPolicy',params, onCompletion);
	};
	//For Operation 'updatePrivacyPolicy' with service id 'updatePrivacyPolicy2300'
	privacyPolicyRepository.prototype.updatePrivacyPolicy = function(params,onCompletion){
		return privacyPolicyRepository.prototype.customVerb('updatePrivacyPolicy',params, onCompletion);
	};
	
	
	return privacyPolicyRepository;
})