define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function GroupEntitlementsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	GroupEntitlementsRepository.prototype = Object.create(BaseRepository.prototype);
	GroupEntitlementsRepository.prototype.constructor = GroupEntitlementsRepository;

	//For Operation 'getGroupEntitlements' with service id 'getGroupsEntitlements9371'
	GroupEntitlementsRepository.prototype.getGroupEntitlements = function(params, onCompletion){
		return GroupEntitlementsRepository.prototype.customVerb('getGroupEntitlements', params, onCompletion);
	};

	return GroupEntitlementsRepository;
})