define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function RequestsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	RequestsRepository.prototype = Object.create(BaseRepository.prototype);
	RequestsRepository.prototype.constructor = RequestsRepository;

	//For Operation 'PendingApprovals' with service id 'FetchAllPendingApprovals5010'
	RequestsRepository.prototype.PendingApprovals = function(params, onCompletion){
		return RequestsRepository.prototype.customVerb('PendingApprovals', params, onCompletion);
	};

	//For Operation 'getCounts' with service id 'FetchDashboardCounts4953'
	RequestsRepository.prototype.getCounts = function(params, onCompletion){
		return RequestsRepository.prototype.customVerb('getCounts', params, onCompletion);
	};

	//For Operation 'ApprovalHistory' with service id 'FetchAllApprovalHistory8279'
	RequestsRepository.prototype.ApprovalHistory = function(params, onCompletion){
		return RequestsRepository.prototype.customVerb('ApprovalHistory', params, onCompletion);
	};

	return RequestsRepository;
})