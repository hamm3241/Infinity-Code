define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function featureRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	featureRepository.prototype = Object.create(BaseRepository.prototype);
	featureRepository.prototype.constructor = featureRepository;

	//For Operation 'getAccountLevelFeatureAction' with service id 'getAccountLevelFeatureAction9770'
	featureRepository.prototype.getAccountLevelFeatureAction = function(params, onCompletion){
		return featureRepository.prototype.customVerb('getAccountLevelFeatureAction', params, onCompletion);
	};

	//For Operation 'editFeatureAndActionLimits' with service id 'editFeatureAndActions6464'
	featureRepository.prototype.editFeatureAndActionLimits = function(params, onCompletion){
		return featureRepository.prototype.customVerb('editFeatureAndActionLimits', params, onCompletion);
	};

	//For Operation 'getAccessPolicies' with service id 'getAccessPolicies4064'
	featureRepository.prototype.getAccessPolicies = function(params, onCompletion){
		return featureRepository.prototype.customVerb('getAccessPolicies', params, onCompletion);
	};

	//For Operation 'editLimitGroup' with service id 'editLimitGroup9579'
	featureRepository.prototype.editLimitGroup = function(params, onCompletion){
		return featureRepository.prototype.customVerb('editLimitGroup', params, onCompletion);
	};

	//For Operation 'getAllFeaturesAndActions' with service id 'getFeatureActionsByType2070'
	featureRepository.prototype.getAllFeaturesAndActions = function(params, onCompletion){
		return featureRepository.prototype.customVerb('getAllFeaturesAndActions', params, onCompletion);
	};

	//For Operation 'getActionLevels' with service id 'getActionLevels1907'
	featureRepository.prototype.getActionLevels = function(params, onCompletion){
		return featureRepository.prototype.customVerb('getActionLevels', params, onCompletion);
	};

	//For Operation 'manageActionStatus' with service id 'manageActionStatus7035'
	featureRepository.prototype.manageActionStatus = function(params, onCompletion){
		return featureRepository.prototype.customVerb('manageActionStatus', params, onCompletion);
	};

	//For Operation 'getFeatureActions' with service id 'getFeatureActions4860'
	featureRepository.prototype.getFeatureActions = function(params, onCompletion){
		return featureRepository.prototype.customVerb('getFeatureActions', params, onCompletion);
	};

	//For Operation 'downloadFeaturesList' with service id 'downloadFeaturesList2993'
	featureRepository.prototype.downloadFeaturesList = function(params, onCompletion){
		return featureRepository.prototype.customVerb('downloadFeaturesList', params, onCompletion);
	};

	//For Operation 'getServiceFee' with service id 'getServiceFee1684'
	featureRepository.prototype.getServiceFee = function(params, onCompletion){
		return featureRepository.prototype.customVerb('getServiceFee', params, onCompletion);
	};

	//For Operation 'getAllFeatures' with service id 'getAllFeatures8005'
	featureRepository.prototype.getAllFeatures = function(params, onCompletion){
		return featureRepository.prototype.customVerb('getAllFeatures', params, onCompletion);
	};

	//For Operation 'getLimitGroups' with service id 'getAllLimitGroups4443'
	featureRepository.prototype.getLimitGroups = function(params, onCompletion){
		return featureRepository.prototype.customVerb('getLimitGroups', params, onCompletion);
	};

	//For Operation 'getAllMonetaryActions' with service id 'getAllMonetaryActions3686'
	featureRepository.prototype.getAllMonetaryActions = function(params, onCompletion){
		return featureRepository.prototype.customVerb('getAllMonetaryActions', params, onCompletion);
	};

	return featureRepository;
})