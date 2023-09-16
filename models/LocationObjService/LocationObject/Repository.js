define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function LocationObjectRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	LocationObjectRepository.prototype = Object.create(BaseRepository.prototype);
	LocationObjectRepository.prototype.constructor = LocationObjectRepository;

	//For Operation 'getLocationDetails' with service id 'GetLocationDetails4630'
	LocationObjectRepository.prototype.getLocationDetails = function(params, onCompletion){
		return LocationObjectRepository.prototype.customVerb('getLocationDetails', params, onCompletion);
	};

	//For Operation 'downloadLocationList' with service id 'downloadLocationList5410'
	LocationObjectRepository.prototype.downloadLocationList = function(params, onCompletion){
		return LocationObjectRepository.prototype.customVerb('downloadLocationList', params, onCompletion);
	};

	//For Operation 'getFilteredLocations' with service id 'FilteredLocationsGetService3799'
	LocationObjectRepository.prototype.getFilteredLocations = function(params, onCompletion){
		return LocationObjectRepository.prototype.customVerb('getFilteredLocations', params, onCompletion);
	};

	//For Operation 'getBranchDetails' with service id 'getBranchDetails4659'
	LocationObjectRepository.prototype.getBranchDetails = function(params, onCompletion){
		return LocationObjectRepository.prototype.customVerb('getBranchDetails', params, onCompletion);
	};

	//For Operation 'getAddressSuggestions' with service id 'getAddressSuggestions4994'
	LocationObjectRepository.prototype.getAddressSuggestions = function(params, onCompletion){
		return LocationObjectRepository.prototype.customVerb('getAddressSuggestions', params, onCompletion);
	};

	//For Operation 'generateLocationList' with service id 'generateLocationsList5769'
	LocationObjectRepository.prototype.generateLocationList = function(params, onCompletion){
		return LocationObjectRepository.prototype.customVerb('generateLocationList', params, onCompletion);
	};

	//For Operation 'getLocations' with service id 'getLocation7929'
	LocationObjectRepository.prototype.getLocations = function(params, onCompletion){
		return LocationObjectRepository.prototype.customVerb('getLocations', params, onCompletion);
	};

	//For Operation 'downloadLocationsList' with service id 'downloadLocationsList5500'
	LocationObjectRepository.prototype.downloadLocationsList = function(params, onCompletion){
		return LocationObjectRepository.prototype.customVerb('downloadLocationsList', params, onCompletion);
	};

	//For Operation 'getATMDetails' with service id 'getATMDetails6336'
	LocationObjectRepository.prototype.getATMDetails = function(params, onCompletion){
		return LocationObjectRepository.prototype.customVerb('getATMDetails', params, onCompletion);
	};

	//For Operation 'getLocationRange' with service id 'GetLocationRangeDetails5443'
	LocationObjectRepository.prototype.getLocationRange = function(params, onCompletion){
		return LocationObjectRepository.prototype.customVerb('getLocationRange', params, onCompletion);
	};

	//For Operation 'getSearchedLocation' with service id 'GetSearchedLocation2720'
	LocationObjectRepository.prototype.getSearchedLocation = function(params, onCompletion){
		return LocationObjectRepository.prototype.customVerb('getSearchedLocation', params, onCompletion);
	};

	//For Operation 'getLocationAddress' with service id 'GetLocationAddress2917'
	LocationObjectRepository.prototype.getLocationAddress = function(params, onCompletion){
		return LocationObjectRepository.prototype.customVerb('getLocationAddress', params, onCompletion);
	};

	return LocationObjectRepository;
})