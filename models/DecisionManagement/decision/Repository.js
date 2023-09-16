define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function decisionRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	decisionRepository.prototype = Object.create(BaseRepository.prototype);
	decisionRepository.prototype.constructor = decisionRepository;

	//For Operation 'createDecisionRule' with service id 'createDecisionRule9837'
	decisionRepository.prototype.createDecisionRule = function(params,onCompletion){
		return decisionRepository.prototype.customVerb('createDecisionRule',params, onCompletion);
	};
	//For Operation 'GetAllFilesofDecisionRule' with service id 'GetAllFilesofDecisionRule5126'
	decisionRepository.prototype.GetAllFilesofDecisionRule = function(params,onCompletion){
		return decisionRepository.prototype.customVerb('GetAllFilesofDecisionRule',params, onCompletion);
	};
	//For Operation 'getDecisionRules' with service id 'getDecisionRules9439'
	decisionRepository.prototype.getDecisionRules = function(params,onCompletion){
		return decisionRepository.prototype.customVerb('getDecisionRules',params, onCompletion);
	};
	//For Operation 'editDecisionRule' with service id 'editDecisionRule2839'
	decisionRepository.prototype.editDecisionRule = function(params,onCompletion){
		return decisionRepository.prototype.customVerb('editDecisionRule',params, onCompletion);
	};
	//For Operation 'UploadRulesFile' with service id 'uploadRuleFile9519'
	decisionRepository.prototype.UploadRulesFile = function(params,onCompletion){
		return decisionRepository.prototype.customVerb('UploadRulesFile',params, onCompletion);
	};
	//For Operation 'DownloadRulesFile' with service id 'DownloadRulesFile6514'
	decisionRepository.prototype.DownloadRulesFile = function(params,onCompletion){
		return decisionRepository.prototype.customVerb('DownloadRulesFile',params, onCompletion);
	};
	
	
	return decisionRepository;
})