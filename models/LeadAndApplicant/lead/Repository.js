define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function leadRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	leadRepository.prototype = Object.create(BaseRepository.prototype);
	leadRepository.prototype.constructor = leadRepository;

	//For Operation 'createLead' with service id 'createLead2762'
	leadRepository.prototype.createLead = function(params,onCompletion){
		return leadRepository.prototype.customVerb('createLead',params, onCompletion);
	};
	//For Operation 'fetchLeads' with service id 'fetchLeads6477'
	leadRepository.prototype.fetchLeads = function(params,onCompletion){
		return leadRepository.prototype.customVerb('fetchLeads',params, onCompletion);
	};
	//For Operation 'assignLeads' with service id 'assignLeads1851'
	leadRepository.prototype.assignLeads = function(params,onCompletion){
		return leadRepository.prototype.customVerb('assignLeads',params, onCompletion);
	};
	//For Operation 'updateLead' with service id 'updateLead9865'
	leadRepository.prototype.updateLead = function(params,onCompletion){
		return leadRepository.prototype.customVerb('updateLead',params, onCompletion);
	};
	//For Operation 'closeLead' with service id 'closeLead4359'
	leadRepository.prototype.closeLead = function(params,onCompletion){
		return leadRepository.prototype.customVerb('closeLead',params, onCompletion);
	};
	
	
	return leadRepository;
})