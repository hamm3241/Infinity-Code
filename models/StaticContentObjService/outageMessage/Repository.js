define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function outageMessageRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	outageMessageRepository.prototype = Object.create(BaseRepository.prototype);
	outageMessageRepository.prototype.constructor = outageMessageRepository;

	//For Operation 'createOutageMessage' with service id 'createOutageMessage9933'
	outageMessageRepository.prototype.createOutageMessage = function(params,onCompletion){
		return outageMessageRepository.prototype.customVerb('createOutageMessage',params, onCompletion);
	};
	//For Operation 'getOutageMessage' with service id 'getOutageMessage4252'
	outageMessageRepository.prototype.getOutageMessage = function(params,onCompletion){
		return outageMessageRepository.prototype.customVerb('getOutageMessage',params, onCompletion);
	};
	//For Operation 'updateOutageMessage' with service id 'updateOutageMessage2772'
	outageMessageRepository.prototype.updateOutageMessage = function(params,onCompletion){
		return outageMessageRepository.prototype.customVerb('updateOutageMessage',params, onCompletion);
	};
	//For Operation 'bulkUpdateOutageMessage' with service id 'bulkUpdateOutageMessage7074'
	outageMessageRepository.prototype.bulkUpdateOutageMessage = function(params,onCompletion){
		return outageMessageRepository.prototype.customVerb('bulkUpdateOutageMessage',params, onCompletion);
	};
	//For Operation 'getOutageMessageOfInactiveServices' with service id 'getOutageMessageOfInactiveServices8541'
	outageMessageRepository.prototype.getOutageMessageOfInactiveServices = function(params,onCompletion){
		return outageMessageRepository.prototype.customVerb('getOutageMessageOfInactiveServices',params, onCompletion);
	};
	//For Operation 'deleteOutageMessage' with service id 'deleteOutageMessage9475'
	outageMessageRepository.prototype.deleteOutageMessage = function(params,onCompletion){
		return outageMessageRepository.prototype.customVerb('deleteOutageMessage',params, onCompletion);
	};
	
	
	return outageMessageRepository;
})