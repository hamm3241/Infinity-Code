define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function frequentlyAskedQuestionsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	frequentlyAskedQuestionsRepository.prototype = Object.create(BaseRepository.prototype);
	frequentlyAskedQuestionsRepository.prototype.constructor = frequentlyAskedQuestionsRepository;

	//For Operation 'updateFAQs' with service id 'updateFrequentlyAskedQuestions4366'
	frequentlyAskedQuestionsRepository.prototype.updateFAQs = function(params,onCompletion){
		return frequentlyAskedQuestionsRepository.prototype.customVerb('updateFAQs',params, onCompletion);
	};
	//For Operation 'getCategories' with service id 'get_faqcategory6175'
	frequentlyAskedQuestionsRepository.prototype.getCategories = function(params,onCompletion){
		return frequentlyAskedQuestionsRepository.prototype.customVerb('getCategories',params, onCompletion);
	};
	//For Operation 'createFAQs' with service id 'createFrequentlyAskedQuestions8097'
	frequentlyAskedQuestionsRepository.prototype.createFAQs = function(params,onCompletion){
		return frequentlyAskedQuestionsRepository.prototype.customVerb('createFAQs',params, onCompletion);
	};
	//For Operation 'getFAQs' with service id 'getFrequentlyAskedQuestions6812'
	frequentlyAskedQuestionsRepository.prototype.getFAQs = function(params,onCompletion){
		return frequentlyAskedQuestionsRepository.prototype.customVerb('getFAQs',params, onCompletion);
	};
	//For Operation 'deleteFAQs' with service id 'deleteFrequentlyAskedQuestions7591'
	frequentlyAskedQuestionsRepository.prototype.deleteFAQs = function(params,onCompletion){
		return frequentlyAskedQuestionsRepository.prototype.customVerb('deleteFAQs',params, onCompletion);
	};
	//For Operation 'getOlbFaqs' with service id 'getOlbFaqs2866'
	frequentlyAskedQuestionsRepository.prototype.getOlbFaqs = function(params,onCompletion){
		return frequentlyAskedQuestionsRepository.prototype.customVerb('getOlbFaqs',params, onCompletion);
	};
	
	
	return frequentlyAskedQuestionsRepository;
})