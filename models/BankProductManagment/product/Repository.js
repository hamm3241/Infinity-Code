define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function productRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	productRepository.prototype = Object.create(BaseRepository.prototype);
	productRepository.prototype.constructor = productRepository;

	//For Operation 'GetFeatures' with service id 'GetFeatures7047'
	productRepository.prototype.GetFeatures = function(params, onCompletion){
		return productRepository.prototype.customVerb('GetFeatures', params, onCompletion);
	};

	//For Operation 'UpdateProduct' with service id 'UpdateProduct5588'
	productRepository.prototype.UpdateProduct = function(params, onCompletion){
		return productRepository.prototype.customVerb('UpdateProduct', params, onCompletion);
	};

	//For Operation 'importProduct' with service id 'importProductFromCSV5736'
	productRepository.prototype.importProduct = function(params, onCompletion){
		return productRepository.prototype.customVerb('importProduct', params, onCompletion);
	};

	//For Operation 'CreateProduct' with service id 'CreateProduct8732'
	productRepository.prototype.CreateProduct = function(params, onCompletion){
		return productRepository.prototype.customVerb('CreateProduct', params, onCompletion);
	};

	//For Operation 'CreateProductGroup' with service id 'CreateProductGroup6591'
	productRepository.prototype.CreateProductGroup = function(params, onCompletion){
		return productRepository.prototype.customVerb('CreateProductGroup', params, onCompletion);
	};

	//For Operation 'GetProductLines' with service id 'GetProductLines5577'
	productRepository.prototype.GetProductLines = function(params, onCompletion){
		return productRepository.prototype.customVerb('GetProductLines', params, onCompletion);
	};

	//For Operation 'getProductGroupsByProductLine' with service id 'getProductGroupsByProductLine5330'
	productRepository.prototype.getProductGroupsByProductLine = function(params, onCompletion){
		return productRepository.prototype.customVerb('getProductGroupsByProductLine', params, onCompletion);
	};

	//For Operation 'FetchBankDetailsBasedOnRoutingNumber' with service id 'FetchBankDetailsBasedOnRoutingNumber7370'
	productRepository.prototype.FetchBankDetailsBasedOnRoutingNumber = function(params, onCompletion){
		return productRepository.prototype.customVerb('FetchBankDetailsBasedOnRoutingNumber', params, onCompletion);
	};

	//For Operation 'CreateProductLine' with service id 'CreateProductLines2919'
	productRepository.prototype.CreateProductLine = function(params, onCompletion){
		return productRepository.prototype.customVerb('CreateProductLine', params, onCompletion);
	};

	//For Operation 'GetProductGroups' with service id 'GetProductGroups9523'
	productRepository.prototype.GetProductGroups = function(params, onCompletion){
		return productRepository.prototype.customVerb('GetProductGroups', params, onCompletion);
	};

	//For Operation 'CreateFeature' with service id 'CreateFeature6344'
	productRepository.prototype.CreateFeature = function(params, onCompletion){
		return productRepository.prototype.customVerb('CreateFeature', params, onCompletion);
	};

	//For Operation 'UpdateProductLine' with service id 'UpdateProductLines8392'
	productRepository.prototype.UpdateProductLine = function(params, onCompletion){
		return productRepository.prototype.customVerb('UpdateProductLine', params, onCompletion);
	};

	//For Operation 'GetAllProductGroups' with service id 'GetProductGroupsForCampaign1010'
	productRepository.prototype.GetAllProductGroups = function(params, onCompletion){
		return productRepository.prototype.customVerb('GetAllProductGroups', params, onCompletion);
	};

	//For Operation 'GetProducts' with service id 'GetProducts8873'
	productRepository.prototype.GetProducts = function(params, onCompletion){
		return productRepository.prototype.customVerb('GetProducts', params, onCompletion);
	};

	//For Operation 'UpdateProductGroup' with service id 'UpdateProductGroup1412'
	productRepository.prototype.UpdateProductGroup = function(params, onCompletion){
		return productRepository.prototype.customVerb('UpdateProductGroup', params, onCompletion);
	};

	//For Operation 'manageProductStatus' with service id 'manageStatus4738'
	productRepository.prototype.manageProductStatus = function(params, onCompletion){
		return productRepository.prototype.customVerb('manageProductStatus', params, onCompletion);
	};

	//For Operation 'getProductListFromMS' with service id 'fetchProductList7332'
	productRepository.prototype.getProductListFromMS = function(params, onCompletion){
		return productRepository.prototype.customVerb('getProductListFromMS', params, onCompletion);
	};

	//For Operation 'UpdateFeature' with service id 'UpdateFeature8900'
	productRepository.prototype.UpdateFeature = function(params, onCompletion){
		return productRepository.prototype.customVerb('UpdateFeature', params, onCompletion);
	};

	//For Operation 'getProductsByProductGroup' with service id 'GetProductsByProductGroupsForPurpose8420'
	productRepository.prototype.getProductsByProductGroup = function(params, onCompletion){
		return productRepository.prototype.customVerb('getProductsByProductGroup', params, onCompletion);
	};

	//For Operation 'getProductList' with service id 'GetProductsForPurprose4769'
	productRepository.prototype.getProductList = function(params, onCompletion){
		return productRepository.prototype.customVerb('getProductList', params, onCompletion);
	};

	return productRepository;
})