define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function TransactionAndAuditLogsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	TransactionAndAuditLogsRepository.prototype = Object.create(BaseRepository.prototype);
	TransactionAndAuditLogsRepository.prototype.constructor = TransactionAndAuditLogsRepository;

	//For Operation 'generateCustomerActivityLogs' with service id 'generateCustomerActivityLogs5367'
	TransactionAndAuditLogsRepository.prototype.generateCustomerActivityLogs = function(params, onCompletion){
		return TransactionAndAuditLogsRepository.prototype.customVerb('generateCustomerActivityLogs', params, onCompletion);
	};

	//For Operation 'getModules' with service id 'get_eventtype4000'
	TransactionAndAuditLogsRepository.prototype.getModules = function(params, onCompletion){
		return TransactionAndAuditLogsRepository.prototype.customVerb('getModules', params, onCompletion);
	};

	//For Operation 'SearchCustomerAuditLogs' with service id 'SearchCustomerAuditLogs9708'
	TransactionAndAuditLogsRepository.prototype.SearchCustomerAuditLogs = function(params, onCompletion){
		return TransactionAndAuditLogsRepository.prototype.customVerb('SearchCustomerAuditLogs', params, onCompletion);
	};

	//For Operation 'exportAdminConsoleLogs' with service id 'exportAdminConsoleLogs5235'
	TransactionAndAuditLogsRepository.prototype.exportAdminConsoleLogs = function(params, onCompletion){
		return TransactionAndAuditLogsRepository.prototype.customVerb('exportAdminConsoleLogs', params, onCompletion);
	};

	//For Operation 'getAdminActivityLogs' with service id 'getAdminActivityLogs8430'
	TransactionAndAuditLogsRepository.prototype.getAdminActivityLogs = function(params, onCompletion){
		return TransactionAndAuditLogsRepository.prototype.customVerb('getAdminActivityLogs', params, onCompletion);
	};

	//For Operation 'exportTransactionalLogs' with service id 'exportTransactionalLogs5367'
	TransactionAndAuditLogsRepository.prototype.exportTransactionalLogs = function(params, onCompletion){
		return TransactionAndAuditLogsRepository.prototype.customVerb('exportTransactionalLogs', params, onCompletion);
	};

	//For Operation 'getTransactionLogs' with service id 'getTransactionLogs2140'
	TransactionAndAuditLogsRepository.prototype.getTransactionLogs = function(params, onCompletion){
		return TransactionAndAuditLogsRepository.prototype.customVerb('getTransactionLogs', params, onCompletion);
	};

	//For Operation 'getTransactionMasterData' with service id 'getTransactionMasterData5224'
	TransactionAndAuditLogsRepository.prototype.getTransactionMasterData = function(params, onCompletion){
		return TransactionAndAuditLogsRepository.prototype.customVerb('getTransactionMasterData', params, onCompletion);
	};

	//For Operation 'getAdminActivityMasterData' with service id 'getAdminActivityMasterData6287'
	TransactionAndAuditLogsRepository.prototype.getAdminActivityMasterData = function(params, onCompletion){
		return TransactionAndAuditLogsRepository.prototype.customVerb('getAdminActivityMasterData', params, onCompletion);
	};

	//For Operation 'getActivityType' with service id 'get_eventsubtype8160'
	TransactionAndAuditLogsRepository.prototype.getActivityType = function(params, onCompletion){
		return TransactionAndAuditLogsRepository.prototype.customVerb('getActivityType', params, onCompletion);
	};

	//For Operation 'getCustomerLogs' with service id 'getCustomerLogs8714'
	TransactionAndAuditLogsRepository.prototype.getCustomerLogs = function(params, onCompletion){
		return TransactionAndAuditLogsRepository.prototype.customVerb('getCustomerLogs', params, onCompletion);
	};

	//For Operation 'exportCustomerActivityLogs' with service id 'exportCustomerActivityLogs1493'
	TransactionAndAuditLogsRepository.prototype.exportCustomerActivityLogs = function(params, onCompletion){
		return TransactionAndAuditLogsRepository.prototype.customVerb('exportCustomerActivityLogs', params, onCompletion);
	};

	//For Operation 'getCustomerActivityMasterData' with service id 'getCustomerActivityMasterData2489'
	TransactionAndAuditLogsRepository.prototype.getCustomerActivityMasterData = function(params, onCompletion){
		return TransactionAndAuditLogsRepository.prototype.customVerb('getCustomerActivityMasterData', params, onCompletion);
	};

	return TransactionAndAuditLogsRepository;
})