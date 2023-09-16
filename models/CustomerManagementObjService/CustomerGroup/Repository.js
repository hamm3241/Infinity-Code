define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function CustomerGroupRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	CustomerGroupRepository.prototype = Object.create(BaseRepository.prototype);
	CustomerGroupRepository.prototype.constructor = CustomerGroupRepository;

	//For Operation 'GetCustomerGroup' with service id 'GetCustomerGroup6154'
	CustomerGroupRepository.prototype.GetCustomerGroup = function(params,onCompletion){
		return CustomerGroupRepository.prototype.customVerb('GetCustomerGroup',params, onCompletion);
	};
	//For Operation 'createCustomerGroup' with service id 'createCustomerGroup7380'
	CustomerGroupRepository.prototype.createCustomerGroup = function(params,onCompletion){
		return CustomerGroupRepository.prototype.customVerb('createCustomerGroup',params, onCompletion);
	};
	//For Operation 'GetAllGroups' with service id 'GetAllGroups8267'
	CustomerGroupRepository.prototype.GetAllGroups = function(params,onCompletion){
		return CustomerGroupRepository.prototype.customVerb('GetAllGroups',params, onCompletion);
	};
	//For Operation 'EditCustomerGroup' with service id 'EditCustomerGroup1451'
	CustomerGroupRepository.prototype.EditCustomerGroup = function(params,onCompletion){
		return CustomerGroupRepository.prototype.customVerb('EditCustomerGroup',params, onCompletion);
	};
	
	
	return CustomerGroupRepository;
})