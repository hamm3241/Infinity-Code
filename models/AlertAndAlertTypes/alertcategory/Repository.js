define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function alertcategoryRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	alertcategoryRepository.prototype = Object.create(BaseRepository.prototype);
	alertcategoryRepository.prototype.constructor = alertcategoryRepository;

	//For Operation 'editAlertCategory' with service id 'editAlertCategory7741'
	alertcategoryRepository.prototype.editAlertCategory = function(params, onCompletion){
		return alertcategoryRepository.prototype.customVerb('editAlertCategory', params, onCompletion);
	};

	//For Operation 'getAlertCategoryDefinition' with service id 'getAlertCategoryDefinition6545'
	alertcategoryRepository.prototype.getAlertCategoryDefinition = function(params, onCompletion){
		return alertcategoryRepository.prototype.customVerb('getAlertCategoryDefinition', params, onCompletion);
	};

	//For Operation 'getCustomerAlertCategoryPreference' with service id 'getCustomerAlertCategoryPreference6925'
	alertcategoryRepository.prototype.getCustomerAlertCategoryPreference = function(params, onCompletion){
		return alertcategoryRepository.prototype.customVerb('getCustomerAlertCategoryPreference', params, onCompletion);
	};

	//For Operation 'getCustomerAlertCategoryChannelPreference' with service id 'getCustomerAlertCategoryChannelPreference2145'
	alertcategoryRepository.prototype.getCustomerAlertCategoryChannelPreference = function(params, onCompletion){
		return alertcategoryRepository.prototype.customVerb('getCustomerAlertCategoryChannelPreference', params, onCompletion);
	};

	//For Operation 'getCustomerAlertCategories' with service id 'getAlertCategories9032'
	alertcategoryRepository.prototype.getCustomerAlertCategories = function(params, onCompletion){
		return alertcategoryRepository.prototype.customVerb('getCustomerAlertCategories', params, onCompletion);
	};

	//For Operation 'reorderAlertCategory' with service id 'reorderAlertCategory5100'
	alertcategoryRepository.prototype.reorderAlertCategory = function(params, onCompletion){
		return alertcategoryRepository.prototype.customVerb('reorderAlertCategory', params, onCompletion);
	};

	//For Operation 'createAlertCategory' with service id 'createAlertCategory7106'
	alertcategoryRepository.prototype.createAlertCategory = function(params, onCompletion){
		return alertcategoryRepository.prototype.customVerb('createAlertCategory', params, onCompletion);
	};

	//For Operation 'getAlertCategories' with service id 'getAlertCategories_Prev7586'
	alertcategoryRepository.prototype.getAlertCategories = function(params, onCompletion){
		return alertcategoryRepository.prototype.customVerb('getAlertCategories', params, onCompletion);
	};

	return alertcategoryRepository;
})