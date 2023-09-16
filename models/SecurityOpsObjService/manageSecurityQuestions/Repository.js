define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function manageSecurityQuestionsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	manageSecurityQuestionsRepository.prototype = Object.create(BaseRepository.prototype);
	manageSecurityQuestionsRepository.prototype.constructor = manageSecurityQuestionsRepository;

	//For Operation 'insertSecurityQuestions' with service id 'insertSecurityQuestions6400'
	manageSecurityQuestionsRepository.prototype.insertSecurityQuestions = function(params,onCompletion){
		return manageSecurityQuestionsRepository.prototype.customVerb('insertSecurityQuestions',params, onCompletion);
	};
	//For Operation 'updateSecurityQuestion' with service id 'updateSecurityQuestion8060'
	manageSecurityQuestionsRepository.prototype.updateSecurityQuestion = function(params,onCompletion){
		return manageSecurityQuestionsRepository.prototype.customVerb('updateSecurityQuestion',params, onCompletion);
	};
	//For Operation 'deleteSecurityQuestion' with service id 'deleteSecurityQuestion5682'
	manageSecurityQuestionsRepository.prototype.deleteSecurityQuestion = function(params,onCompletion){
		return manageSecurityQuestionsRepository.prototype.customVerb('deleteSecurityQuestion',params, onCompletion);
	};
	//For Operation 'getSecurityQuestions' with service id 'getSecurityQuestions2051'
	manageSecurityQuestionsRepository.prototype.getSecurityQuestions = function(params,onCompletion){
		return manageSecurityQuestionsRepository.prototype.customVerb('getSecurityQuestions',params, onCompletion);
	};
	
	
	return manageSecurityQuestionsRepository;
})