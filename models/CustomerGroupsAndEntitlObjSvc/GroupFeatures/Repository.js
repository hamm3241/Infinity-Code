define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function GroupFeaturesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	GroupFeaturesRepository.prototype = Object.create(BaseRepository.prototype);
	GroupFeaturesRepository.prototype.constructor = GroupFeaturesRepository;

	//For Operation 'getGroupFeaturesAndActionsForEdit' with service id 'getGroupFeaturesAndActionsForEdit8219'
	GroupFeaturesRepository.prototype.getGroupFeaturesAndActionsForEdit = function(params, onCompletion){
		return GroupFeaturesRepository.prototype.customVerb('getGroupFeaturesAndActionsForEdit', params, onCompletion);
	};

	//For Operation 'getGroupFeaturesAndActions' with service id 'getGroupFeaturesAndActions4865'
	GroupFeaturesRepository.prototype.getGroupFeaturesAndActions = function(params, onCompletion){
		return GroupFeaturesRepository.prototype.customVerb('getGroupFeaturesAndActions', params, onCompletion);
	};

	//For Operation 'getGroupFeatureActionsByType' with service id 'getGroupFeatureActionsByType7857'
	GroupFeaturesRepository.prototype.getGroupFeatureActionsByType = function(params, onCompletion){
		return GroupFeaturesRepository.prototype.customVerb('getGroupFeatureActionsByType', params, onCompletion);
	};

	return GroupFeaturesRepository;
})