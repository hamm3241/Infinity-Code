define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function TransactionReportRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	TransactionReportRepository.prototype = Object.create(BaseRepository.prototype);
	TransactionReportRepository.prototype.constructor = TransactionReportRepository;

	//For Operation 'getTransactionValueVolumeByService' with service id 'getTransactionValueVolumeByType3114'
	TransactionReportRepository.prototype.getTransactionValueVolumeByService = function(params,onCompletion){
		return TransactionReportRepository.prototype.customVerb('getTransactionValueVolumeByService',params, onCompletion);
	};
	//For Operation 'exportTransactionReport' with service id 'exportTransactionReport1610'
	TransactionReportRepository.prototype.exportTransactionReport = function(params,onCompletion){
		return TransactionReportRepository.prototype.customVerb('exportTransactionReport',params, onCompletion);
	};
	
	
	return TransactionReportRepository;
})