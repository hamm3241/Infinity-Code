define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function SignatoryGroupRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	SignatoryGroupRepository.prototype = Object.create(BaseRepository.prototype);
	SignatoryGroupRepository.prototype.constructor = SignatoryGroupRepository;

	//For Operation 'getAllSignatoryGroupsbyCoreCustomerIds' with service id 'getAllSignatoryGroupsbyCoreCustomerIds8650'
	SignatoryGroupRepository.prototype.getAllSignatoryGroupsbyCoreCustomerIds = function(params, onCompletion){
		return SignatoryGroupRepository.prototype.customVerb('getAllSignatoryGroupsbyCoreCustomerIds', params, onCompletion);
	};

	//For Operation 'deleteSignatoryGroup' with service id 'deleteSignatoryGroup7918'
	SignatoryGroupRepository.prototype.deleteSignatoryGroup = function(params, onCompletion){
		return SignatoryGroupRepository.prototype.customVerb('deleteSignatoryGroup', params, onCompletion);
	};

	//For Operation 'getApprovalPermissionsForUser' with service id 'getApprovalPermissionsForUser6757'
	SignatoryGroupRepository.prototype.getApprovalPermissionsForUser = function(params, onCompletion){
		return SignatoryGroupRepository.prototype.customVerb('getApprovalPermissionsForUser', params, onCompletion);
	};

	//For Operation 'createSignatoryGroup' with service id 'createSignatoryGroup2393'
	SignatoryGroupRepository.prototype.createSignatoryGroup = function(params, onCompletion){
		return SignatoryGroupRepository.prototype.customVerb('createSignatoryGroup', params, onCompletion);
	};

	//For Operation 'getNoGroupUsers' with service id 'getNoGroupUsers8238'
	SignatoryGroupRepository.prototype.getNoGroupUsers = function(params, onCompletion){
		return SignatoryGroupRepository.prototype.customVerb('getNoGroupUsers', params, onCompletion);
	};

	//For Operation 'isSignatoryGroupEligibleForDelete' with service id 'isSignatoryGroupEligibleForDelete6985'
	SignatoryGroupRepository.prototype.isSignatoryGroupEligibleForDelete = function(params, onCompletion){
		return SignatoryGroupRepository.prototype.customVerb('isSignatoryGroupEligibleForDelete', params, onCompletion);
	};

	//For Operation 'getSignatoryGroupDetails' with service id 'getSignatoryGroupDetails1157'
	SignatoryGroupRepository.prototype.getSignatoryGroupDetails = function(params, onCompletion){
		return SignatoryGroupRepository.prototype.customVerb('getSignatoryGroupDetails', params, onCompletion);
	};

	//For Operation 'getAllSignatoryGroups' with service id 'getAllSignatoryGroups9481'
	SignatoryGroupRepository.prototype.getAllSignatoryGroups = function(params, onCompletion){
		return SignatoryGroupRepository.prototype.customVerb('getAllSignatoryGroups', params, onCompletion);
	};

	//For Operation 'updateSignatoryGroups' with service id 'updateSignatoryGroups6735'
	SignatoryGroupRepository.prototype.updateSignatoryGroups = function(params, onCompletion){
		return SignatoryGroupRepository.prototype.customVerb('updateSignatoryGroups', params, onCompletion);
	};

	return SignatoryGroupRepository;
})