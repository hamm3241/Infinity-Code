define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CustomerActionsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CustomerActionsRepository.prototype = Object.create(BaseRepository.prototype);
	CustomerActionsRepository.prototype.constructor = CustomerActionsRepository;

	//For Operation 'getCustomerFeaturesAndActionsByRole' with service id 'getCustomerFeaturesAndActionsByRole2185'
	CustomerActionsRepository.prototype.getCustomerFeaturesAndActionsByRole = function(params, onCompletion){
		return CustomerActionsRepository.prototype.customVerb('getCustomerFeaturesAndActionsByRole', params, onCompletion);
	};

	//For Operation 'updateCustomerActions' with service id 'updateCustomerActions4004'
	CustomerActionsRepository.prototype.updateCustomerActions = function(params, onCompletion){
		return CustomerActionsRepository.prototype.customVerb('updateCustomerActions', params, onCompletion);
	};

	//For Operation 'getCoreCustomerRoleFeatureActionLimits' with service id 'getCoreCustomerRoleFeatureActionLimits5398'
	CustomerActionsRepository.prototype.getCoreCustomerRoleFeatureActionLimits = function(params, onCompletion){
		return CustomerActionsRepository.prototype.customVerb('getCoreCustomerRoleFeatureActionLimits', params, onCompletion);
	};

	//For Operation 'getCustomerRetailDirectFeaturesAndActions' with service id 'getCustomerRetailDirectFeaturesAndActions3306'
	CustomerActionsRepository.prototype.getCustomerRetailDirectFeaturesAndActions = function(params, onCompletion){
		return CustomerActionsRepository.prototype.customVerb('getCustomerRetailDirectFeaturesAndActions', params, onCompletion);
	};

	//For Operation 'getCoreCustomerProductRolesFeatureActionLimits' with service id 'getCoreCustomerProductRolesFeatureActionLimits6181'
	CustomerActionsRepository.prototype.getCoreCustomerProductRolesFeatureActionLimits = function(params, onCompletion){
		return CustomerActionsRepository.prototype.customVerb('getCoreCustomerProductRolesFeatureActionLimits', params, onCompletion);
	};

	//For Operation 'getCustomerFeaturesAndActionsCombined' with service id 'getCustomerFeaturesAndActionsCombined8692'
	CustomerActionsRepository.prototype.getCustomerFeaturesAndActionsCombined = function(params, onCompletion){
		return CustomerActionsRepository.prototype.customVerb('getCustomerFeaturesAndActionsCombined', params, onCompletion);
	};

	//For Operation 'getCustomerFeaturesAndActions' with service id 'getCustomerFeaturesAndActions3460'
	CustomerActionsRepository.prototype.getCustomerFeaturesAndActions = function(params, onCompletion){
		return CustomerActionsRepository.prototype.customVerb('getCustomerFeaturesAndActions', params, onCompletion);
	};

	return CustomerActionsRepository;
})