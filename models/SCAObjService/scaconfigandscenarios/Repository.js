define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function scaconfigandscenariosRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	scaconfigandscenariosRepository.prototype = Object.create(BaseRepository.prototype);
	scaconfigandscenariosRepository.prototype.constructor = scaconfigandscenariosRepository;

	//For Operation 'getSCAScenario' with service id 'getSCAScenario8902'
	scaconfigandscenariosRepository.prototype.getSCAScenario = function(params, onCompletion){
		return scaconfigandscenariosRepository.prototype.customVerb('getSCAScenario', params, onCompletion);
	};

	//For Operation 'getSCAAction' with service id 'getSCAAction2483'
	scaconfigandscenariosRepository.prototype.getSCAAction = function(params, onCompletion){
		return scaconfigandscenariosRepository.prototype.customVerb('getSCAAction', params, onCompletion);
	};

	//For Operation 'getSCAFeature' with service id 'getSCAFeature6144'
	scaconfigandscenariosRepository.prototype.getSCAFeature = function(params, onCompletion){
		return scaconfigandscenariosRepository.prototype.customVerb('getSCAFeature', params, onCompletion);
	};

	//For Operation 'createSCAScenario' with service id 'createSCAScenario6244'
	scaconfigandscenariosRepository.prototype.createSCAScenario = function(params, onCompletion){
		return scaconfigandscenariosRepository.prototype.customVerb('createSCAScenario', params, onCompletion);
	};

	//For Operation 'testSCAService' with service id 'testSCAScenario3572'
	scaconfigandscenariosRepository.prototype.testSCAService = function(params, onCompletion){
		return scaconfigandscenariosRepository.prototype.customVerb('testSCAService', params, onCompletion);
	};

	//For Operation 'editSCAScenario' with service id 'editSCAScenario1390'
	scaconfigandscenariosRepository.prototype.editSCAScenario = function(params, onCompletion){
		return scaconfigandscenariosRepository.prototype.customVerb('editSCAScenario', params, onCompletion);
	};

	//For Operation 'getSCAMode' with service id 'getSCAMode1306'
	scaconfigandscenariosRepository.prototype.getSCAMode = function(params, onCompletion){
		return scaconfigandscenariosRepository.prototype.customVerb('getSCAMode', params, onCompletion);
	};

	//For Operation 'deleteSCAScenario' with service id 'deleteSCAScenario8594'
	scaconfigandscenariosRepository.prototype.deleteSCAScenario = function(params, onCompletion){
		return scaconfigandscenariosRepository.prototype.customVerb('deleteSCAScenario', params, onCompletion);
	};

	return scaconfigandscenariosRepository;
})