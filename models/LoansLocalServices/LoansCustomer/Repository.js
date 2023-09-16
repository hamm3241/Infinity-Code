define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function LoansCustomerRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	LoansCustomerRepository.prototype = Object.create(BaseRepository.prototype);
	LoansCustomerRepository.prototype.constructor = LoansCustomerRepository;

	//For Operation 'updateCustomerDetails' with service id 'updateCustomerDetails5710'
	LoansCustomerRepository.prototype.updateCustomerDetails = function(params,onCompletion){
		return LoansCustomerRepository.prototype.customVerb('updateCustomerDetails',params, onCompletion);
	};
	//For Operation 'getCustomerByDetails' with service id 'GetCustomerIdJava8675'
	LoansCustomerRepository.prototype.getCustomerByDetails = function(params,onCompletion){
		return LoansCustomerRepository.prototype.customVerb('getCustomerByDetails',params, onCompletion);
	};
	//For Operation 'GenerateOTP' with service id 'GenerateOTPJava8470'
	LoansCustomerRepository.prototype.GenerateOTP = function(params,onCompletion){
		return LoansCustomerRepository.prototype.customVerb('GenerateOTP',params, onCompletion);
	};
	//For Operation 'CreatePhoneNumberCommunication' with service id 'CreatePhoneNumberCommunication8102'
	LoansCustomerRepository.prototype.CreatePhoneNumberCommunication = function(params,onCompletion){
		return LoansCustomerRepository.prototype.customVerb('CreatePhoneNumberCommunication',params, onCompletion);
	};
	//For Operation 'SendEmailService' with service id 'SendEmailJava7463'
	LoansCustomerRepository.prototype.SendEmailService = function(params,onCompletion){
		return LoansCustomerRepository.prototype.customVerb('SendEmailService',params, onCompletion);
	};
	//For Operation 'getCustomerAddress' with service id 'dbxdb_address_get2086'
	LoansCustomerRepository.prototype.getCustomerAddress = function(params,onCompletion){
		return LoansCustomerRepository.prototype.customVerb('getCustomerAddress',params, onCompletion);
	};
	//For Operation 'getEmployementDetails' with service id 'dbxdb_employementdetails_get9276'
	LoansCustomerRepository.prototype.getEmployementDetails = function(params,onCompletion){
		return LoansCustomerRepository.prototype.customVerb('getEmployementDetails',params, onCompletion);
	};
	//For Operation 'SetPassword' with service id 'SetNewPasswordJava7425'
	LoansCustomerRepository.prototype.SetPassword = function(params,onCompletion){
		return LoansCustomerRepository.prototype.customVerb('SetPassword',params, onCompletion);
	};
	//For Operation 'ValidateOTP' with service id 'ValidateOTPJava5777'
	LoansCustomerRepository.prototype.ValidateOTP = function(params,onCompletion){
		return LoansCustomerRepository.prototype.customVerb('ValidateOTP',params, onCompletion);
	};
	//For Operation 'CreateNewCustomer' with service id 'LeadCreateJava3600'
	LoansCustomerRepository.prototype.CreateNewCustomer = function(params,onCompletion){
		return LoansCustomerRepository.prototype.customVerb('CreateNewCustomer',params, onCompletion);
	};
	
	
	return LoansCustomerRepository;
})