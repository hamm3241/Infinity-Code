define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ReportsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ReportsRepository.prototype = Object.create(BaseRepository.prototype);
	ReportsRepository.prototype.constructor = ReportsRepository;

	//For Operation 'createReport' with service id 'createReport9206'
	ReportsRepository.prototype.createReport = function(params, onCompletion){
		return ReportsRepository.prototype.customVerb('createReport', params, onCompletion);
	};

	//For Operation 'deleteReport' with service id 'deleteReport8897'
	ReportsRepository.prototype.deleteReport = function(params, onCompletion){
		return ReportsRepository.prototype.customVerb('deleteReport', params, onCompletion);
	};

	//For Operation 'downloadReport' with service id 'downloadReport5086'
	ReportsRepository.prototype.downloadReport = function(params, onCompletion){
		return ReportsRepository.prototype.customVerb('downloadReport', params, onCompletion);
	};

	//For Operation 'getReport' with service id 'viewReport3330'
	ReportsRepository.prototype.getReport = function(params, onCompletion){
		return ReportsRepository.prototype.customVerb('getReport', params, onCompletion);
	};

	//For Operation 'shareReport' with service id 'shareReport9424'
	ReportsRepository.prototype.shareReport = function(params, onCompletion){
		return ReportsRepository.prototype.customVerb('shareReport', params, onCompletion);
	};

	return ReportsRepository;
})