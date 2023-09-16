define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CustomerRequestRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CustomerRequestRepository.prototype = Object.create(BaseRepository.prototype);
	CustomerRequestRepository.prototype.constructor = CustomerRequestRepository;

	//For Operation 'discardMessageAttachments' with service id 'discardMessageAttachments1974'
	CustomerRequestRepository.prototype.discardMessageAttachments = function(params, onCompletion){
		return CustomerRequestRepository.prototype.customVerb('discardMessageAttachments', params, onCompletion);
	};

	//For Operation 'getRequestCategory' with service id 'get_requestcategory1918'
	CustomerRequestRepository.prototype.getRequestCategory = function(params, onCompletion){
		return CustomerRequestRepository.prototype.customVerb('getRequestCategory', params, onCompletion);
	};

	//For Operation 'downloadMessageAttachment' with service id 'downloadMessageAttachment4024'
	CustomerRequestRepository.prototype.downloadMessageAttachment = function(params, onCompletion){
		return CustomerRequestRepository.prototype.customVerb('downloadMessageAttachment', params, onCompletion);
	};

	//For Operation 'getRequestMessages' with service id 'getRequestMessages9277'
	CustomerRequestRepository.prototype.getRequestMessages = function(params, onCompletion){
		return CustomerRequestRepository.prototype.customVerb('getRequestMessages', params, onCompletion);
	};

	//For Operation 'createNewCustomerRequestMessage' with service id 'createNewCustomerRequestMessage5809'
	CustomerRequestRepository.prototype.createNewCustomerRequestMessage = function(params, onCompletion){
		return CustomerRequestRepository.prototype.customVerb('createNewCustomerRequestMessage', params, onCompletion);
	};

	//For Operation 'assignRequests' with service id 'assignRequests2447'
	CustomerRequestRepository.prototype.assignRequests = function(params, onCompletion){
		return CustomerRequestRepository.prototype.customVerb('assignRequests', params, onCompletion);
	};

	//For Operation 'getRequestSummaryCount' with service id 'getRequestSummaryCount2641'
	CustomerRequestRepository.prototype.getRequestSummaryCount = function(params, onCompletion){
		return CustomerRequestRepository.prototype.customVerb('getRequestSummaryCount', params, onCompletion);
	};

	//For Operation 'createNewCustomerRequest' with service id 'createNewCustomerRequest1932'
	CustomerRequestRepository.prototype.createNewCustomerRequest = function(params, onCompletion){
		return CustomerRequestRepository.prototype.customVerb('createNewCustomerRequest', params, onCompletion);
	};

	//For Operation 'getRequests' with service id 'getRequests6674'
	CustomerRequestRepository.prototype.getRequests = function(params, onCompletion){
		return CustomerRequestRepository.prototype.customVerb('getRequests', params, onCompletion);
	};

	//For Operation 'getallmessages' with service id 'getAllMessagesOfARequest8993'
	CustomerRequestRepository.prototype.getallmessages = function(params, onCompletion){
		return CustomerRequestRepository.prototype.customVerb('getallmessages', params, onCompletion);
	};

	//For Operation 'getCustomerRequests' with service id 'getRequests3415'
	CustomerRequestRepository.prototype.getCustomerRequests = function(params, onCompletion){
		return CustomerRequestRepository.prototype.customVerb('getCustomerRequests', params, onCompletion);
	};

	//For Operation 'getMessageAttachments' with service id 'getMessageAttachment4027'
	CustomerRequestRepository.prototype.getMessageAttachments = function(params, onCompletion){
		return CustomerRequestRepository.prototype.customVerb('getMessageAttachments', params, onCompletion);
	};

	//For Operation 'getUnreadMessageCount' with service id 'getUnreadMessageCount1428'
	CustomerRequestRepository.prototype.getUnreadMessageCount = function(params, onCompletion){
		return CustomerRequestRepository.prototype.customVerb('getUnreadMessageCount', params, onCompletion);
	};

	//For Operation 'updateCustomerRequest' with service id 'updateCustomerRequest9014'
	CustomerRequestRepository.prototype.updateCustomerRequest = function(params, onCompletion){
		return CustomerRequestRepository.prototype.customVerb('updateCustomerRequest', params, onCompletion);
	};

	return CustomerRequestRepository;
})