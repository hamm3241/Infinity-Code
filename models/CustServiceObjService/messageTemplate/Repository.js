define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function messageTemplateRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	messageTemplateRepository.prototype = Object.create(BaseRepository.prototype);
	messageTemplateRepository.prototype.constructor = messageTemplateRepository;

	//For Operation 'deleteMessageTemplate' with service id 'deleteMessageTemplate1285'
	messageTemplateRepository.prototype.deleteMessageTemplate = function(params,onCompletion){
		return messageTemplateRepository.prototype.customVerb('deleteMessageTemplate',params, onCompletion);
	};
	//For Operation 'updateMessageTemplate' with service id 'updateMessageTemplate3193'
	messageTemplateRepository.prototype.updateMessageTemplate = function(params,onCompletion){
		return messageTemplateRepository.prototype.customVerb('updateMessageTemplate',params, onCompletion);
	};
	//For Operation 'getMessageTemplate' with service id 'get_messagetemplate2807'
	messageTemplateRepository.prototype.getMessageTemplate = function(params,onCompletion){
		return messageTemplateRepository.prototype.customVerb('getMessageTemplate',params, onCompletion);
	};
	//For Operation 'createMessageTemplate' with service id 'createMessageTemplate7858'
	messageTemplateRepository.prototype.createMessageTemplate = function(params,onCompletion){
		return messageTemplateRepository.prototype.customVerb('createMessageTemplate',params, onCompletion);
	};
	
	
	return messageTemplateRepository;
})