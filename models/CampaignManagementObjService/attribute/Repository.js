define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function attributeRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	attributeRepository.prototype = Object.create(BaseRepository.prototype);
	attributeRepository.prototype.constructor = attributeRepository;

	//For Operation 'getAttributes' with service id 'getAttributes7221'
	attributeRepository.prototype.getAttributes = function(params,onCompletion){
		return attributeRepository.prototype.customVerb('getAttributes',params, onCompletion);
	};
	//For Operation 'getAttributeCriteriaTypes' with service id 'getAttributeCriteriaTypes2992'
	attributeRepository.prototype.getAttributeCriteriaTypes = function(params,onCompletion){
		return attributeRepository.prototype.customVerb('getAttributeCriteriaTypes',params, onCompletion);
	};
	
	return attributeRepository;
})