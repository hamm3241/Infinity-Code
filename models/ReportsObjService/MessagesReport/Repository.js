define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function MessagesReportRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	MessagesReportRepository.prototype = Object.create(BaseRepository.prototype);
	MessagesReportRepository.prototype.constructor = MessagesReportRepository;

	//For Operation 'exportMessagesReport' with service id 'exportMessagesReport5472'
	MessagesReportRepository.prototype.exportMessagesReport = function(params,onCompletion){
		return MessagesReportRepository.prototype.customVerb('exportMessagesReport',params, onCompletion);
	};
	//For Operation 'getMessagesReport' with service id 'getMessagesReport4917'
	MessagesReportRepository.prototype.getMessagesReport = function(params,onCompletion){
		return MessagesReportRepository.prototype.customVerb('getMessagesReport',params, onCompletion);
	};
	
	
	return MessagesReportRepository;
})