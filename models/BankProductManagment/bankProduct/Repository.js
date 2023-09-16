define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function bankProductRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	bankProductRepository.prototype = Object.create(BaseRepository.prototype);
	bankProductRepository.prototype.constructor = bankProductRepository;

	//For Operation 'updateProduct' with service id 'updateProduct8770'
	bankProductRepository.prototype.updateProduct = function(params, onCompletion){
		return bankProductRepository.prototype.customVerb('updateProduct', params, onCompletion);
	};

	//For Operation 'createProduct' with service id 'createProduct5776'
	bankProductRepository.prototype.createProduct = function(params, onCompletion){
		return bankProductRepository.prototype.customVerb('createProduct', params, onCompletion);
	};

	//For Operation 'deleteProductFacility' with service id 'deleteProductFacility9286'
	bankProductRepository.prototype.deleteProductFacility = function(params, onCompletion){
		return bankProductRepository.prototype.customVerb('deleteProductFacility', params, onCompletion);
	};

	//For Operation 'updateProductFacility' with service id 'updateProductFacility3566'
	bankProductRepository.prototype.updateProductFacility = function(params, onCompletion){
		return bankProductRepository.prototype.customVerb('updateProductFacility', params, onCompletion);
	};

	//For Operation 'createProductFacility' with service id 'createProductFacility7435'
	bankProductRepository.prototype.createProductFacility = function(params, onCompletion){
		return bankProductRepository.prototype.customVerb('createProductFacility', params, onCompletion);
	};

	//For Operation 'getProducts' with service id 'getProducts7684'
	bankProductRepository.prototype.getProducts = function(params, onCompletion){
		return bankProductRepository.prototype.customVerb('getProducts', params, onCompletion);
	};

	return bankProductRepository;
})