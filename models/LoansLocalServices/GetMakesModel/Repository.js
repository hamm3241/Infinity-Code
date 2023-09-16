define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function GetMakesModelRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	GetMakesModelRepository.prototype = Object.create(BaseRepository.prototype);
	GetMakesModelRepository.prototype.constructor = GetMakesModelRepository;

	//For Operation 'GetMakesByVehicleType' with service id 'GetMakesByVehicleType8892'
	GetMakesModelRepository.prototype.GetMakesByVehicleType = function(params,onCompletion){
		return GetMakesModelRepository.prototype.customVerb('GetMakesByVehicleType',params, onCompletion);
	};
	//For Operation 'GetModelByMakes' with service id 'GetModelByMakes9243'
	GetMakesModelRepository.prototype.GetModelByMakes = function(params,onCompletion){
		return GetMakesModelRepository.prototype.customVerb('GetModelByMakes',params, onCompletion);
	};
	
	
	return GetMakesModelRepository;
})