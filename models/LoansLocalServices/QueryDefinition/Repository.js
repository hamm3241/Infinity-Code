define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function QueryDefinitionRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	QueryDefinitionRepository.prototype = Object.create(BaseRepository.prototype);
	QueryDefinitionRepository.prototype.constructor = QueryDefinitionRepository;

	//For Operation 'getQuestionOptions' with service id 'GetQuestionOptionsJava5257'
	QueryDefinitionRepository.prototype.getQuestionOptions = function(params,onCompletion){
		return QueryDefinitionRepository.prototype.customVerb('getQuestionOptions',params, onCompletion);
	};
	
	
	return QueryDefinitionRepository;
})