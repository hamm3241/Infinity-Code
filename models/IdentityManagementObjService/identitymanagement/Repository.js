define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function identitymanagementRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	identitymanagementRepository.prototype = Object.create(BaseRepository.prototype);
	identitymanagementRepository.prototype.constructor = identitymanagementRepository;

	//For Operation 'updatePasswordRules' with service id 'updatePasswordRules2289'
	identitymanagementRepository.prototype.updatePasswordRules = function(params,onCompletion){
		return identitymanagementRepository.prototype.customVerb('updatePasswordRules',params, onCompletion);
	};
	//For Operation 'getPasswordPolicy' with service id 'getPasswordPolicy3902'
	identitymanagementRepository.prototype.getPasswordPolicy = function(params,onCompletion){
		return identitymanagementRepository.prototype.customVerb('getPasswordPolicy',params, onCompletion);
	};
	//For Operation 'getUsernameAndPasswordRulesAndPolicies' with service id 'getUsernameAndPasswordRulesAndPolicies3186'
	identitymanagementRepository.prototype.getUsernameAndPasswordRulesAndPolicies = function(params,onCompletion){
		return identitymanagementRepository.prototype.customVerb('getUsernameAndPasswordRulesAndPolicies',params, onCompletion);
	};
	//For Operation 'updateUsernamePolicy' with service id 'updateUsernamePolicy4591'
	identitymanagementRepository.prototype.updateUsernamePolicy = function(params,onCompletion){
		return identitymanagementRepository.prototype.customVerb('updateUsernamePolicy',params, onCompletion);
	};
	//For Operation 'deletePasswordPolicy' with service id 'deletePasswordPolicy5226'
	identitymanagementRepository.prototype.deletePasswordPolicy = function(params,onCompletion){
		return identitymanagementRepository.prototype.customVerb('deletePasswordPolicy',params, onCompletion);
	};
	//For Operation 'updateUsernameRules' with service id 'updateUsernameRules4313'
	identitymanagementRepository.prototype.updateUsernameRules = function(params,onCompletion){
		return identitymanagementRepository.prototype.customVerb('updateUsernameRules',params, onCompletion);
	};
	//For Operation 'updatePasswordPolicy' with service id 'updatePasswordPolicy1663'
	identitymanagementRepository.prototype.updatePasswordPolicy = function(params,onCompletion){
		return identitymanagementRepository.prototype.customVerb('updatePasswordPolicy',params, onCompletion);
	};
	//For Operation 'getUsernameAndPasswordPolicies' with service id 'getUsernameAndPasswordPolicies4162'
	identitymanagementRepository.prototype.getUsernameAndPasswordPolicies = function(params,onCompletion){
		return identitymanagementRepository.prototype.customVerb('getUsernameAndPasswordPolicies',params, onCompletion);
	};
	//For Operation 'deleteUsernamePolicy' with service id 'deleteUsernamePolicy2561'
	identitymanagementRepository.prototype.deleteUsernamePolicy = function(params,onCompletion){
		return identitymanagementRepository.prototype.customVerb('deleteUsernamePolicy',params, onCompletion);
	};
	//For Operation 'getUsernameRulesAndPolicy' with service id 'getUsernameRulesAndPolicy4250'
	identitymanagementRepository.prototype.getUsernameRulesAndPolicy = function(params,onCompletion){
		return identitymanagementRepository.prototype.customVerb('getUsernameRulesAndPolicy',params, onCompletion);
	};
	//For Operation 'updatePasswordLockoutSettings' with service id 'updatePasswordLockoutSettings7539'
	identitymanagementRepository.prototype.updatePasswordLockoutSettings = function(params,onCompletion){
		return identitymanagementRepository.prototype.customVerb('updatePasswordLockoutSettings',params, onCompletion);
	};
	//For Operation 'getPasswordRules' with service id 'getPasswordRules9975'
	identitymanagementRepository.prototype.getPasswordRules = function(params,onCompletion){
		return identitymanagementRepository.prototype.customVerb('getPasswordRules',params, onCompletion);
	};
	//For Operation 'getLocaleList' with service id 'getLocaleList1033'
	identitymanagementRepository.prototype.getLocaleList = function(params,onCompletion){
		return identitymanagementRepository.prototype.customVerb('getLocaleList',params, onCompletion);
	};
	//For Operation 'createPasswordPolicy' with service id 'createPasswordPolicy8943'
	identitymanagementRepository.prototype.createPasswordPolicy = function(params,onCompletion){
		return identitymanagementRepository.prototype.customVerb('createPasswordPolicy',params, onCompletion);
	};
	//For Operation 'createUsernamePolicy' with service id 'createUsernamePolicy7868'
	identitymanagementRepository.prototype.createUsernamePolicy = function(params,onCompletion){
		return identitymanagementRepository.prototype.customVerb('createUsernamePolicy',params, onCompletion);
	};
	//For Operation 'getUsernameRules' with service id 'getUsernameRules6205'
	identitymanagementRepository.prototype.getUsernameRules = function(params,onCompletion){
		return identitymanagementRepository.prototype.customVerb('getUsernameRules',params, onCompletion);
	};
	//For Operation 'getPasswordLockoutSettings' with service id 'getPasswordLockoutSettings2370'
	identitymanagementRepository.prototype.getPasswordLockoutSettings = function(params,onCompletion){
		return identitymanagementRepository.prototype.customVerb('getPasswordLockoutSettings',params, onCompletion);
	};
	//For Operation 'getUsernameAndPasswordRules' with service id 'getUsernameAndPasswordRules8047'
	identitymanagementRepository.prototype.getUsernameAndPasswordRules = function(params,onCompletion){
		return identitymanagementRepository.prototype.customVerb('getUsernameAndPasswordRules',params, onCompletion);
	};
	//For Operation 'getUsernamePolicy' with service id 'getUsernamePolicy3548'
	identitymanagementRepository.prototype.getUsernamePolicy = function(params,onCompletion){
		return identitymanagementRepository.prototype.customVerb('getUsernamePolicy',params, onCompletion);
	};
	//For Operation 'getPasswordRulesAndPolicy' with service id 'getPasswordRulesAndPolicy8735'
	identitymanagementRepository.prototype.getPasswordRulesAndPolicy = function(params,onCompletion){
		return identitymanagementRepository.prototype.customVerb('getPasswordRulesAndPolicy',params, onCompletion);
	};
	
	
	return identitymanagementRepository;
})