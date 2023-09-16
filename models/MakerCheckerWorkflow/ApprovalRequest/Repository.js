define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ApprovalRequestRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ApprovalRequestRepository.prototype = Object.create(BaseRepository.prototype);
	ApprovalRequestRepository.prototype.constructor = ApprovalRequestRepository;

	//For Operation 'invokeApprovalWorkflow' with service id 'checkApprovalWorkFlowService6531'
	ApprovalRequestRepository.prototype.invokeApprovalWorkflow = function(params, onCompletion){
		return ApprovalRequestRepository.prototype.customVerb('invokeApprovalWorkflow', params, onCompletion);
	};

	return ApprovalRequestRepository;
})