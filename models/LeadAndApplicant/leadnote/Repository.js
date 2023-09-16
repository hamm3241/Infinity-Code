define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function leadnoteRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	leadnoteRepository.prototype = Object.create(BaseRepository.prototype);
	leadnoteRepository.prototype.constructor = leadnoteRepository;

	//For Operation 'fetchLeadNotes' with service id 'fetchLeadNotes9746'
	leadnoteRepository.prototype.fetchLeadNotes = function(params,onCompletion){
		return leadnoteRepository.prototype.customVerb('fetchLeadNotes',params, onCompletion);
	};
	//For Operation 'createLeadNote' with service id 'createLeadNote7324'
	leadnoteRepository.prototype.createLeadNote = function(params,onCompletion){
		return leadnoteRepository.prototype.customVerb('createLeadNote',params, onCompletion);
	};
	
	
	return leadnoteRepository;
})