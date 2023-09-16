define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ApprovalMatrixRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ApprovalMatrixRepository.prototype = Object.create(BaseRepository.prototype);
	ApprovalMatrixRepository.prototype.constructor = ApprovalMatrixRepository;

	//For Operation 'getApproversInSignatoryGroup' with service id 'getApproversInSignatoryGroup6848'
	ApprovalMatrixRepository.prototype.getApproversInSignatoryGroup = function(params, onCompletion){
		return ApprovalMatrixRepository.prototype.customVerb('getApproversInSignatoryGroup', params, onCompletion);
	};

	//For Operation 'updateApprovalRuleSGLevel' with service id 'updateApprovalRuleSGLevel5349'
	ApprovalMatrixRepository.prototype.updateApprovalRuleSGLevel = function(params, onCompletion){
		return ApprovalMatrixRepository.prototype.customVerb('updateApprovalRuleSGLevel', params, onCompletion);
	};

	//For Operation 'updateApprovalMatrixStatus' with service id 'updateApprovalMatrixStatus2930'
	ApprovalMatrixRepository.prototype.updateApprovalMatrixStatus = function(params, onCompletion){
		return ApprovalMatrixRepository.prototype.customVerb('updateApprovalMatrixStatus', params, onCompletion);
	};

	//For Operation 'getApprovalMatrix' with service id 'getApprovalMatrix3487'
	ApprovalMatrixRepository.prototype.getApprovalMatrix = function(params, onCompletion){
		return ApprovalMatrixRepository.prototype.customVerb('getApprovalMatrix', params, onCompletion);
	};

	//For Operation 'getApprovalMatrixByContractId' with service id 'getApprovalMatrixByContractId5472'
	ApprovalMatrixRepository.prototype.getApprovalMatrixByContractId = function(params, onCompletion){
		return ApprovalMatrixRepository.prototype.customVerb('getApprovalMatrixByContractId', params, onCompletion);
	};

	//For Operation 'createApprovalRuleUserLevel' with service id 'createApprovalRuleUserLevel5632'
	ApprovalMatrixRepository.prototype.createApprovalRuleUserLevel = function(params, onCompletion){
		return ApprovalMatrixRepository.prototype.customVerb('createApprovalRuleUserLevel', params, onCompletion);
	};

	//For Operation 'getApprovalRules' with service id 'getApprovalRules3410'
	ApprovalMatrixRepository.prototype.getApprovalRules = function(params, onCompletion){
		return ApprovalMatrixRepository.prototype.customVerb('getApprovalRules', params, onCompletion);
	};

	//For Operation 'updateApprovalRuleUserLevel' with service id 'updateApprovalRuleUserLevel7170'
	ApprovalMatrixRepository.prototype.updateApprovalRuleUserLevel = function(params, onCompletion){
		return ApprovalMatrixRepository.prototype.customVerb('updateApprovalRuleUserLevel', params, onCompletion);
	};

	//For Operation 'isApprovalMatrixDisabled' with service id 'isApprovalMatrixDisabled1575'
	ApprovalMatrixRepository.prototype.isApprovalMatrixDisabled = function(params, onCompletion){
		return ApprovalMatrixRepository.prototype.customVerb('isApprovalMatrixDisabled', params, onCompletion);
	};

	//For Operation 'createApprovalRuleSGLevel' with service id 'createApprovalRuleSGLevel1638'
	ApprovalMatrixRepository.prototype.createApprovalRuleSGLevel = function(params, onCompletion){
		return ApprovalMatrixRepository.prototype.customVerb('createApprovalRuleSGLevel', params, onCompletion);
	};

	//For Operation 'getAccountActionCustomerApproverList' with service id 'getAccountActionCustomerApproverList4297'
	ApprovalMatrixRepository.prototype.getAccountActionCustomerApproverList = function(params, onCompletion){
		return ApprovalMatrixRepository.prototype.customVerb('getAccountActionCustomerApproverList', params, onCompletion);
	};

	return ApprovalMatrixRepository;
})