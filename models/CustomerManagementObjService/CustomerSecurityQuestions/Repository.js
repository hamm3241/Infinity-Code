define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function CustomerSecurityQuestionsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	CustomerSecurityQuestionsRepository.prototype = Object.create(BaseRepository.prototype);
	CustomerSecurityQuestionsRepository.prototype.constructor = CustomerSecurityQuestionsRepository;

	//For Operation 'verifyCustomerSecurityQuestions' with service id 'verifyCustomerSecurityQuestions9039'
	CustomerSecurityQuestionsRepository.prototype.verifyCustomerSecurityQuestions = function(params,onCompletion){
		return CustomerSecurityQuestionsRepository.prototype.customVerb('verifyCustomerSecurityQuestions',params, onCompletion);
	};
	//For Operation 'fetchRandomSecurityQuestions' with service id 'getRandomCustomerSecurityQuestion6014'
	CustomerSecurityQuestionsRepository.prototype.fetchRandomSecurityQuestions = function(params,onCompletion){
		return CustomerSecurityQuestionsRepository.prototype.customVerb('fetchRandomSecurityQuestions',params, onCompletion);
	};
	//For Operation 'createCustomerSecurityQuestions' with service id 'createCustomerSecurityQuestions9416'
	CustomerSecurityQuestionsRepository.prototype.createCustomerSecurityQuestions = function(params,onCompletion){
		return CustomerSecurityQuestionsRepository.prototype.customVerb('createCustomerSecurityQuestions',params, onCompletion);
	};
	
	
	return CustomerSecurityQuestionsRepository;
})