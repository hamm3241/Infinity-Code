define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function NoteRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	NoteRepository.prototype = Object.create(BaseRepository.prototype);
	NoteRepository.prototype.constructor = NoteRepository;

	//For Operation 'GetNotes' with service id 'GetNotes1395'
	NoteRepository.prototype.GetNotes = function(params,onCompletion){
		return NoteRepository.prototype.customVerb('GetNotes',params, onCompletion);
	};
	//For Operation 'CreateNote' with service id 'CreateCustomerNote2926'
	NoteRepository.prototype.CreateNote = function(params,onCompletion){
		return NoteRepository.prototype.customVerb('CreateNote',params, onCompletion);
	};
	//For Operation 'GetApplicantNotes' with service id 'GetApplicantNotes8121'
	NoteRepository.prototype.GetApplicantNotes = function(params,onCompletion){
		return NoteRepository.prototype.customVerb('GetApplicantNotes',params, onCompletion);
	};
	
	
	return NoteRepository;
})