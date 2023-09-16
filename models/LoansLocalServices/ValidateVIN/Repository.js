define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function ValidateVINRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	ValidateVINRepository.prototype = Object.create(BaseRepository.prototype);
	ValidateVINRepository.prototype.constructor = ValidateVINRepository;

	//For Operation 'verifyVIN' with service id 'DecodeVinNumber1722'
	ValidateVINRepository.prototype.verifyVIN = function(params,onCompletion){
		return ValidateVINRepository.prototype.customVerb('verifyVIN',params, onCompletion);
	};
	
	
	return ValidateVINRepository;
})