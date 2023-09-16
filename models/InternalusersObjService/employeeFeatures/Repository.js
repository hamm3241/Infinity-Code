define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function employeeFeaturesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	employeeFeaturesRepository.prototype = Object.create(BaseRepository.prototype);
	employeeFeaturesRepository.prototype.constructor = employeeFeaturesRepository;

	//For Operation 'getInternalUserFeatureActions' with service id 'getInternalUserFeatureActions6786'
	employeeFeaturesRepository.prototype.getInternalUserFeatureActions = function(params, onCompletion){
		return employeeFeaturesRepository.prototype.customVerb('getInternalUserFeatureActions', params, onCompletion);
	};

	//For Operation 'updateInternalUserFeatureActions' with service id 'updateInternalUserFeatureActions7369'
	employeeFeaturesRepository.prototype.updateInternalUserFeatureActions = function(params, onCompletion){
		return employeeFeaturesRepository.prototype.customVerb('updateInternalUserFeatureActions', params, onCompletion);
	};

	//For Operation 'updateInternalUserActionStatus' with service id 'updateInternalUserActionStatus7618'
	employeeFeaturesRepository.prototype.updateInternalUserActionStatus = function(params, onCompletion){
		return employeeFeaturesRepository.prototype.customVerb('updateInternalUserActionStatus', params, onCompletion);
	};

	//For Operation 'getInternalUserFeatures' with service id 'getInternalUserFeatures7587'
	employeeFeaturesRepository.prototype.getInternalUserFeatures = function(params, onCompletion){
		return employeeFeaturesRepository.prototype.customVerb('getInternalUserFeatures', params, onCompletion);
	};

	//For Operation 'downloadEmployeeFeaturesList' with service id 'downloadEmployeeFeaturesList5349'
	employeeFeaturesRepository.prototype.downloadEmployeeFeaturesList = function(params, onCompletion){
		return employeeFeaturesRepository.prototype.customVerb('downloadEmployeeFeaturesList', params, onCompletion);
	};

	return employeeFeaturesRepository;
})