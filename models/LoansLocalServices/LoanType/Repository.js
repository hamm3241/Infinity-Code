define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function LoanTypeRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	LoanTypeRepository.prototype = Object.create(BaseRepository.prototype);
	LoanTypeRepository.prototype.constructor = LoanTypeRepository;

	//For Operation 'GetAPRs' with service id 'dbxdb_sp_getAPRs5300'
	LoanTypeRepository.prototype.GetAPRs = function(params,onCompletion){
		return LoanTypeRepository.prototype.customVerb('GetAPRs',params, onCompletion);
	};
	//For Operation 'Ping' with service id 'dbxdb_loantype_get1636'
	LoanTypeRepository.prototype.Ping = function(params,onCompletion){
		return LoanTypeRepository.prototype.customVerb('Ping',params, onCompletion);
	};
	
	
	return LoanTypeRepository;
})