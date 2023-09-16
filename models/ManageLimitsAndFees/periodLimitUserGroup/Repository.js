define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function periodLimitUserGroupRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	periodLimitUserGroupRepository.prototype = Object.create(BaseRepository.prototype);
	periodLimitUserGroupRepository.prototype.constructor = periodLimitUserGroupRepository;

	//For Operation 'read' with service id 'getPeriodicLimitForUserGroup6845'
	periodLimitUserGroupRepository.prototype.read = function(params,onCompletion){
		return periodLimitUserGroupRepository.prototype.customVerb('read',params, onCompletion);
	};
	
	
	return periodLimitUserGroupRepository;
})