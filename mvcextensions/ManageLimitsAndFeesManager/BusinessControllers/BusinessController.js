define(['ModelManager'], function (ModelManager) {
    /**
     * ManageLimitsAndFeesManager manages models: overallPaymentLimits, period, periodLimitEndUser, periodLimitService, periodLimitUserGroup, transactionFeesEndUser, transferFeeGroup, transferFeeService, validateTransactionLimit
     */
    function ManageLimitsAndFeesManager() {
        kony.mvc.Business.Delegator.call(this);
    }
    
    inheritsFrom(ManageLimitsAndFeesManager, kony.mvc.Business.Delegator);
    
    ManageLimitsAndFeesManager.prototype.initializeBusinessController = function () {
    
    };
    
    

    return ManageLimitsAndFeesManager;
});