define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function QueryCoBorrowerRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	QueryCoBorrowerRepository.prototype = Object.create(BaseRepository.prototype);
	QueryCoBorrowerRepository.prototype.constructor = QueryCoBorrowerRepository;

	//For Operation 'VerifyCoBorrower' with service id 'VerifyCoBorrower6971'
	QueryCoBorrowerRepository.prototype.VerifyCoBorrower = function(params,onCompletion){
		return QueryCoBorrowerRepository.prototype.customVerb('VerifyCoBorrower',params, onCompletion);
	};
	//For Operation 'expireInviteLink' with service id 'ExpireInviteLink7035'
	QueryCoBorrowerRepository.prototype.expireInviteLink = function(params,onCompletion){
		return QueryCoBorrowerRepository.prototype.customVerb('expireInviteLink',params, onCompletion);
	};
	//For Operation 'ReinviteCoBorrower' with service id 'ReinviteCoBorrower7788'
	QueryCoBorrowerRepository.prototype.ReinviteCoBorrower = function(params,onCompletion){
		return QueryCoBorrowerRepository.prototype.customVerb('ReinviteCoBorrower',params, onCompletion);
	};
	
	
	return QueryCoBorrowerRepository;
})