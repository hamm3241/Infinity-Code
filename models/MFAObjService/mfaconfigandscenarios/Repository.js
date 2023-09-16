define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function mfaconfigandscenariosRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	mfaconfigandscenariosRepository.prototype = Object.create(BaseRepository.prototype);
	mfaconfigandscenariosRepository.prototype.constructor = mfaconfigandscenariosRepository;

	//For Operation 'getFrequencyType' with service id 'getFrequencyType8228'
	mfaconfigandscenariosRepository.prototype.getFrequencyType = function(params,onCompletion){
		return mfaconfigandscenariosRepository.prototype.customVerb('getFrequencyType',params, onCompletion);
	};
	//For Operation 'editMFAScenario' with service id 'editMFAScenario5138'
	mfaconfigandscenariosRepository.prototype.editMFAScenario = function(params,onCompletion){
		return mfaconfigandscenariosRepository.prototype.customVerb('editMFAScenario',params, onCompletion);
	};
	//For Operation 'deleteMFAScenario' with service id 'deleteMFAScenario6067'
	mfaconfigandscenariosRepository.prototype.deleteMFAScenario = function(params,onCompletion){
		return mfaconfigandscenariosRepository.prototype.customVerb('deleteMFAScenario',params, onCompletion);
	};
	//For Operation 'getApp' with service id 'getApp9669'
	mfaconfigandscenariosRepository.prototype.getApp = function(params,onCompletion){
		return mfaconfigandscenariosRepository.prototype.customVerb('getApp',params, onCompletion);
	};
	//For Operation 'getMFAFeature' with service id 'getMFAFeature2009'
	mfaconfigandscenariosRepository.prototype.getMFAFeature = function(params,onCompletion){
		return mfaconfigandscenariosRepository.prototype.customVerb('getMFAFeature',params, onCompletion);
	};
	//For Operation 'getMFAScenario' with service id 'getMFAScenario1426'
	mfaconfigandscenariosRepository.prototype.getMFAScenario = function(params,onCompletion){
		return mfaconfigandscenariosRepository.prototype.customVerb('getMFAScenario',params, onCompletion);
	};
	//For Operation 'getAction' with service id 'getAction3461'
	mfaconfigandscenariosRepository.prototype.getAction = function(params,onCompletion){
		return mfaconfigandscenariosRepository.prototype.customVerb('getAction',params, onCompletion);
	};
	//For Operation 'editMFAConfiguration' with service id 'editMFAConfiguration2937'
	mfaconfigandscenariosRepository.prototype.editMFAConfiguration = function(params,onCompletion){
		return mfaconfigandscenariosRepository.prototype.customVerb('editMFAConfiguration',params, onCompletion);
	};
	//For Operation 'getMFAType' with service id 'getMFAType9508'
	mfaconfigandscenariosRepository.prototype.getMFAType = function(params,onCompletion){
		return mfaconfigandscenariosRepository.prototype.customVerb('getMFAType',params, onCompletion);
	};
	//For Operation 'createMFAScenario' with service id 'createMFAScenario6177'
	mfaconfigandscenariosRepository.prototype.createMFAScenario = function(params,onCompletion){
		return mfaconfigandscenariosRepository.prototype.customVerb('createMFAScenario',params, onCompletion);
	};
	//For Operation 'getMFAConfiguration' with service id 'getMFAConfiguration6292'
	mfaconfigandscenariosRepository.prototype.getMFAConfiguration = function(params,onCompletion){
		return mfaconfigandscenariosRepository.prototype.customVerb('getMFAConfiguration',params, onCompletion);
	};
	//For Operation 'getMFAMode' with service id 'getMFAMode4765'
	mfaconfigandscenariosRepository.prototype.getMFAMode = function(params,onCompletion){
		return mfaconfigandscenariosRepository.prototype.customVerb('getMFAMode',params, onCompletion);
	};
	//For Operation 'getAllFeatures' with service id 'get_feature8349'
	mfaconfigandscenariosRepository.prototype.getAllFeatures = function(params,onCompletion){
		return mfaconfigandscenariosRepository.prototype.customVerb('getAllFeatures',params, onCompletion);
	};
	//For Operation 'getAllActions' with service id 'get_featureaction6495'
	mfaconfigandscenariosRepository.prototype.getAllActions = function(params,onCompletion){
		return mfaconfigandscenariosRepository.prototype.customVerb('getAllActions',params, onCompletion);
	};
	//For Operation 'getMFAVariableReference' with service id 'getMFAVariableReference3930'
	mfaconfigandscenariosRepository.prototype.getMFAVariableReference = function(params,onCompletion){
		return mfaconfigandscenariosRepository.prototype.customVerb('getMFAVariableReference',params, onCompletion);
	};
	
	
	return mfaconfigandscenariosRepository;
})