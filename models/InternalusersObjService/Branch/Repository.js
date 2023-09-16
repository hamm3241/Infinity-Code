define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function BranchRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	BranchRepository.prototype = Object.create(BaseRepository.prototype);
	BranchRepository.prototype.constructor = BranchRepository;

	//For Operation 'getAllBranches' with service id 'get_branch_view7806'
	BranchRepository.prototype.getAllBranches = function(params,onCompletion){
		return BranchRepository.prototype.customVerb('getAllBranches',params, onCompletion);
	};
	
	
	return BranchRepository;
})