define(['Promisify', 'ErrorInterceptor', 'ErrorIsNetworkDown'], function (Promisify, ErrorInterceptor, isNetworkDown) {

    function Dashboard_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(Dashboard_PresentationController, kony.mvc.Presentation.BasePresenter);

    Dashboard_PresentationController.prototype.initializePresentationController = function() {
      var self = this;
      ErrorInterceptor.wrap(this, 'businessController').match(function(on){
        return [
          on(isNetworkDown).do(function(){
            self.presentUserInterface('frmDashboard',{
              NetworkDownMessage : {}
            });
          })
        ];
      });
    };
    Dashboard_PresentationController.prototype.showProgressBar = function(){
      this.showDashboard({progressBar : {
        show : true
      }});
    };
    Dashboard_PresentationController.prototype.hideProgressBar = function(){
      this.showDashboard({progressBar : {
        show : false
      }});
    };
    Dashboard_PresentationController.prototype.toastMgs = function(){
      this.showDashboard({toast : {
        show : "success"
      }});
    };
    Dashboard_PresentationController.prototype.errorToastMgs = function(){
      this.showDashboard({toast : {
        show : "error"
      }});
    };
    Dashboard_PresentationController.prototype.showDashboard = function(context){
       this.presentUserInterface('frmDashboard',context);
    };
	
	/**
     * @name fetchDashBoardData
     * @member DashboardModule.presentationController
     * 
     */
  
  Dashboard_PresentationController.prototype.callingApprovalsData = function(){
    var viewModel = {
        count: {},
        alerts: {},
        alertsCount: "",
        action: ""
      };
      var self = this;
      var fetchApprovalsData = Promisify(self.businessController, 'fetchApprovalsData');
      Promise.all([
        fetchApprovalsData({})
      ]).then(function onSuccess(response){
        var approvalData = response[0];
        viewModel.approvalData = approvalData;
        viewModel.action = "fromBackend";
        this.presentUserInterface('frmRequests',viewModel);
      }).catch(function onError() {
        self.hideProgressBar();
        self.errorToastMgs();
      });
  };
  
    Dashboard_PresentationController.prototype.fetchDashBoardData = function () {
      this.showProgressBar();
      var viewModel = {
        count: {},
        alerts: {},
        alertsCount: "",
        action: ""
      };
      var self = this;
      var fetchDashBoardCounts = Promisify(self.businessController, 'fetchDashBoardCounts');
      var fetchDashBoardAlerts = Promisify(self.businessController, 'fetchDashBoardAlerts');
      //restricting Maker/Checker getCounts call in dashboard.
      //var fetchApprovalsCount = Promisify(self.businessController, 'fetchApprovalsCount');

      Promise.all([
        fetchDashBoardCounts({}),
        fetchDashBoardAlerts({}),
        //fetchApprovalsCount({})
      ]).then(function onSuccess(response){
        var countsData = response[0];
        var alertsData = response[1];
        //var approvalsCount = response[2];
        viewModel.count = countsData;
        viewModel.alertsCount = alertsData.length;
        //viewModel.approvalsCount = approvalsCount;
        var alerts = alertsData.reduce(function (result, alert) {
          var arr = result[alert.created] || [];
          result[alert.created] = arr.concat([alert]);
          return result;
        }, {});
        viewModel.alerts = alerts;
        viewModel.action = "fromBackend";
        self.showDashboard(viewModel);
        self.toastMgs();
        self.hideProgressBar();
      }).catch(function onError() {
        self.hideProgressBar();
        self.errorToastMgs();
      });
  };

  
  
  Dashboard_PresentationController.prototype.callingLeftMenu = function (param) {
    this.navigateTo('CSRModule', 'fetchAllCategories', param);
    };

  Dashboard_PresentationController.prototype.callingApprovals = function (param) {
    this.navigateTo('ApprovalsRequestModule', 'fetchAllApprovals', param);
  };
  Dashboard_PresentationController.prototype.callingHistory = function (param) {
    this.navigateTo('ApprovalsRequestModule', 'fetchAllHistory', param);
  };
    return Dashboard_PresentationController;
});