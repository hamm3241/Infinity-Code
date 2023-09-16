define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function CustomerEntitlementRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	CustomerEntitlementRepository.prototype = Object.create(BaseRepository.prototype);
	CustomerEntitlementRepository.prototype.constructor = CustomerEntitlementRepository;

	//For Operation 'GetAllEntitlements' with service id 'get_service8801'
	CustomerEntitlementRepository.prototype.GetAllEntitlements = function(params,onCompletion){
		return CustomerEntitlementRepository.prototype.customVerb('GetAllEntitlements',params, onCompletion);
	};
	//For Operation 'GetCustomerEntitlement' with service id 'GetCustomerEntitlement6638'
	CustomerEntitlementRepository.prototype.GetCustomerEntitlement = function(params,onCompletion){
		return CustomerEntitlementRepository.prototype.customVerb('GetCustomerEntitlement',params, onCompletion);
	};
	//For Operation 'GetIndirectEntitlements' with service id 'get_customer_indirect_permissions_view5446'
	CustomerEntitlementRepository.prototype.GetIndirectEntitlements = function(params,onCompletion){
		return CustomerEntitlementRepository.prototype.customVerb('GetIndirectEntitlements',params, onCompletion);
	};
	//For Operation 'EditCustomerEntitlement' with service id 'EditCustomerEntitlement7975'
	CustomerEntitlementRepository.prototype.EditCustomerEntitlement = function(params,onCompletion){
		return CustomerEntitlementRepository.prototype.customVerb('EditCustomerEntitlement',params, onCompletion);
	};
	
	
	return CustomerEntitlementRepository;
})