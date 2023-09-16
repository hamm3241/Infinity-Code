define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function dashboardalertsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	dashboardalertsRepository.prototype = Object.create(BaseRepository.prototype);
	dashboardalertsRepository.prototype.constructor = dashboardalertsRepository;

	//For Operation 'GetDashboardAlerts' with service id 'get_dashboardalerts7007'
	dashboardalertsRepository.prototype.GetDashboardAlerts = function(params,onCompletion){
		return dashboardalertsRepository.prototype.customVerb('GetDashboardAlerts',params, onCompletion);
	};
	
	
	return dashboardalertsRepository;
})