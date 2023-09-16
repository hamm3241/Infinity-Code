define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function QueryResponseRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	QueryResponseRepository.prototype = Object.create(BaseRepository.prototype);
	QueryResponseRepository.prototype.constructor = QueryResponseRepository;

	//For Operation 'createCreditCardLoan' with service id 'createCreditCardLoan9950'
	QueryResponseRepository.prototype.createCreditCardLoan = function(params,onCompletion){
		return QueryResponseRepository.prototype.customVerb('createCreditCardLoan',params, onCompletion);
	};
	//For Operation 'createPersonalLoan' with service id 'createPersonalLoan1961'
	QueryResponseRepository.prototype.createPersonalLoan = function(params,onCompletion){
		return QueryResponseRepository.prototype.customVerb('createPersonalLoan',params, onCompletion);
	};
	//For Operation 'SubmitVehicleLoan' with service id 'VehicleLoan9022'
	QueryResponseRepository.prototype.SubmitVehicleLoan = function(params,onCompletion){
		return QueryResponseRepository.prototype.customVerb('SubmitVehicleLoan',params, onCompletion);
	};
	//For Operation 'createQueryResponse' with service id 'createQueryResponsejava2245'
	QueryResponseRepository.prototype.createQueryResponse = function(params,onCompletion){
		return QueryResponseRepository.prototype.customVerb('createQueryResponse',params, onCompletion);
	};
	//For Operation 'VerifyCoborrower' with service id 'VerifyCoBorrower1516'
	QueryResponseRepository.prototype.VerifyCoborrower = function(params,onCompletion){
		return QueryResponseRepository.prototype.customVerb('VerifyCoborrower',params, onCompletion);
	};
	//For Operation 'getApplicationCustomer' with service id 'dbxdb_queryresponse_get1727'
	QueryResponseRepository.prototype.getApplicationCustomer = function(params,onCompletion){
		return QueryResponseRepository.prototype.customVerb('getApplicationCustomer',params, onCompletion);
	};
	//For Operation 'getRecentApplication' with service id 'dbxdb_sp_getRecentApplication8856'
	QueryResponseRepository.prototype.getRecentApplication = function(params,onCompletion){
		return QueryResponseRepository.prototype.customVerb('getRecentApplication',params, onCompletion);
	};
	//For Operation 'updateCreditCardApp' with service id 'updateCreditCardApp7028'
	QueryResponseRepository.prototype.updateCreditCardApp = function(params,onCompletion){
		return QueryResponseRepository.prototype.customVerb('updateCreditCardApp',params, onCompletion);
	};
	//For Operation 'GenerateInviteLink' with service id 'GenerateInviteLink2728'
	QueryResponseRepository.prototype.GenerateInviteLink = function(params,onCompletion){
		return QueryResponseRepository.prototype.customVerb('GenerateInviteLink',params, onCompletion);
	};
	//For Operation 'getAllApplications' with service id 'dbxdb_sp_getAllApplications5751'
	QueryResponseRepository.prototype.getAllApplications = function(params,onCompletion){
		return QueryResponseRepository.prototype.customVerb('getAllApplications',params, onCompletion);
	};
	//For Operation 'SubmitPersonalLoan' with service id 'PersonalLoan6082'
	QueryResponseRepository.prototype.SubmitPersonalLoan = function(params,onCompletion){
		return QueryResponseRepository.prototype.customVerb('SubmitPersonalLoan',params, onCompletion);
	};
	//For Operation 'getQueryResponseApplicationsList' with service id 'dbxdb_sp_getQueryResponseApplicationList6697'
	QueryResponseRepository.prototype.getQueryResponseApplicationsList = function(params,onCompletion){
		return QueryResponseRepository.prototype.customVerb('getQueryResponseApplicationsList',params, onCompletion);
	};
	//For Operation 'updatePersonalLoan' with service id 'updatePersonalLoan2520'
	QueryResponseRepository.prototype.updatePersonalLoan = function(params,onCompletion){
		return QueryResponseRepository.prototype.customVerb('updatePersonalLoan',params, onCompletion);
	};
	//For Operation 'SubmitCreditCardApp' with service id 'CreditCard2367'
	QueryResponseRepository.prototype.SubmitCreditCardApp = function(params,onCompletion){
		return QueryResponseRepository.prototype.customVerb('SubmitCreditCardApp',params, onCompletion);
	};
	//For Operation 'createVehicleLoan' with service id 'createVehicleLoan6672'
	QueryResponseRepository.prototype.createVehicleLoan = function(params,onCompletion){
		return QueryResponseRepository.prototype.customVerb('createVehicleLoan',params, onCompletion);
	};
	//For Operation 'updateVehicleLoan' with service id 'updateVehicleLoan1726'
	QueryResponseRepository.prototype.updateVehicleLoan = function(params,onCompletion){
		return QueryResponseRepository.prototype.customVerb('updateVehicleLoan',params, onCompletion);
	};
	//For Operation 'GetLoanAnswersTrack' with service id 'getLoanAnswersTrack2168'
	QueryResponseRepository.prototype.GetLoanAnswersTrack = function(params,onCompletion){
		return QueryResponseRepository.prototype.customVerb('GetLoanAnswersTrack',params, onCompletion);
	};
	//For Operation 'GetLoanAnswers' with service id 'getLoanAnswers6916'
	QueryResponseRepository.prototype.GetLoanAnswers = function(params,onCompletion){
		return QueryResponseRepository.prototype.customVerb('GetLoanAnswers',params, onCompletion);
	};
	//For Operation 'getQueryAnswers' with service id 'dbxdb_sp_getQueryAnswers2849'
	QueryResponseRepository.prototype.getQueryAnswers = function(params,onCompletion){
		return QueryResponseRepository.prototype.customVerb('getQueryAnswers',params, onCompletion);
	};
	
	
	return QueryResponseRepository;
})