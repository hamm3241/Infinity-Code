define(['ErrorInterceptor', 'ErrorIsNetworkDown','Promisify'], function(ErrorInterceptor, isNetworkDown,Promisify) {
  /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
  function PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    this.moneyMovementScheduling = {
      jobsList: null
    };
    this.toastModel = {
      message : null,
      status : null
    };
  }

  inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);

  /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
  PresentationController.prototype.initializePresentationController = function() {
	var self = this;
    ErrorInterceptor.wrap(this, 'businessController').match(function(on){
      return [
        on(isNetworkDown).do(function(){
          self.presentUserInterface('frmTermsAndConditions',{
            NetworkDownMessage : {}
          });
        })
      ];
    });
  };
  PresentationController.prototype.initMoneyMovement = function(){
    var self = this;
    //self.fetchJobsList("fetch");
    this.presentUserInterface("frmMoneyMovementScheduling","showJobsList");
  };
  return PresentationController;
});