define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function QuestionResponseRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	QuestionResponseRepository.prototype = Object.create(BaseRepository.prototype);
	QuestionResponseRepository.prototype.constructor = QuestionResponseRepository;

	//For Operation 'getQuestionResponse' with service id 'getQuestionResponseJava5961'
	QuestionResponseRepository.prototype.getQuestionResponse = function(params,onCompletion){
		return QuestionResponseRepository.prototype.customVerb('getQuestionResponse',params, onCompletion);
	};
	//For Operation 'getQuestionResponseTemp' with service id 'getQuestionResponseJava9403'
	QuestionResponseRepository.prototype.getQuestionResponseTemp = function(params,onCompletion){
		return QuestionResponseRepository.prototype.customVerb('getQuestionResponseTemp',params, onCompletion);
	};
	
	
	return QuestionResponseRepository;
})