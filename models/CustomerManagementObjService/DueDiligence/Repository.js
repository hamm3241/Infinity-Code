define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function DueDiligenceRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	DueDiligenceRepository.prototype = Object.create(BaseRepository.prototype);
	DueDiligenceRepository.prototype.constructor = DueDiligenceRepository;

	//For Operation 'CreateEmploymentDetails' with service id 'CreateEmploymentDetails5545'
	DueDiligenceRepository.prototype.CreateEmploymentDetails = function(params, onCompletion){
		return DueDiligenceRepository.prototype.customVerb('CreateEmploymentDetails', params, onCompletion);
	};

	//For Operation 'CreateTaxDetails' with service id 'CreateTaxDetails5243'
	DueDiligenceRepository.prototype.CreateTaxDetails = function(params, onCompletion){
		return DueDiligenceRepository.prototype.customVerb('CreateTaxDetails', params, onCompletion);
	};

	//For Operation 'UpdateTaxDetails' with service id 'UpdateTaxDetails4792'
	DueDiligenceRepository.prototype.UpdateTaxDetails = function(params, onCompletion){
		return DueDiligenceRepository.prototype.customVerb('UpdateTaxDetails', params, onCompletion);
	};

	//For Operation 'GetDueDiligenceDetails' with service id 'GetDueDiligenceDetails5467'
	DueDiligenceRepository.prototype.GetDueDiligenceDetails = function(params, onCompletion){
		return DueDiligenceRepository.prototype.customVerb('GetDueDiligenceDetails', params, onCompletion);
	};

	//For Operation 'UpdateAccountUsage' with service id 'UpdateAccountUsage4660'
	DueDiligenceRepository.prototype.UpdateAccountUsage = function(params, onCompletion){
		return DueDiligenceRepository.prototype.customVerb('UpdateAccountUsage', params, onCompletion);
	};

	//For Operation 'UpdateEmploymentDetails' with service id 'UpdateEmploymentDetails2920'
	DueDiligenceRepository.prototype.UpdateEmploymentDetails = function(params, onCompletion){
		return DueDiligenceRepository.prototype.customVerb('UpdateEmploymentDetails', params, onCompletion);
	};

	//For Operation 'GetEmploymentDetails' with service id 'GetEmploymentDetails8939'
	DueDiligenceRepository.prototype.GetEmploymentDetails = function(params, onCompletion){
		return DueDiligenceRepository.prototype.customVerb('GetEmploymentDetails', params, onCompletion);
	};

	//For Operation 'UpdateCitizenshipDetails' with service id 'UpdateCitizenship4190'
	DueDiligenceRepository.prototype.UpdateCitizenshipDetails = function(params, onCompletion){
		return DueDiligenceRepository.prototype.customVerb('UpdateCitizenshipDetails', params, onCompletion);
	};

	//For Operation 'GetTaxDetails' with service id 'GetTaxDetails1679'
	DueDiligenceRepository.prototype.GetTaxDetails = function(params, onCompletion){
		return DueDiligenceRepository.prototype.customVerb('GetTaxDetails', params, onCompletion);
	};

	//For Operation 'GetAccountUsage' with service id 'GetAccountUsage7510'
	DueDiligenceRepository.prototype.GetAccountUsage = function(params, onCompletion){
		return DueDiligenceRepository.prototype.customVerb('GetAccountUsage', params, onCompletion);
	};

	//For Operation 'CreateAccountUsage' with service id 'CreateAccountUsage1909'
	DueDiligenceRepository.prototype.CreateAccountUsage = function(params, onCompletion){
		return DueDiligenceRepository.prototype.customVerb('CreateAccountUsage', params, onCompletion);
	};

	return DueDiligenceRepository;
})