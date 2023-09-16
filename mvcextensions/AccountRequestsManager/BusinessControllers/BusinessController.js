define(['ModelManager'], function (ModelManager) {
    /**
     * AccountRequestsManager manages models: CardRequests, TravelNotification
     */
    function AccountRequestsManager() {
        kony.mvc.Business.Delegator.call(this);
    }
    
    inheritsFrom(AccountRequestsManager, kony.mvc.Business.Delegator);
    
    AccountRequestsManager.prototype.initializeBusinessController = function () {
    
    };

    /**
     * @name getTravelNotifications
     * @member CustomerManagementModule.businessController
     * @param {Username : string} context
     * @param (response:{TravelRequests : [{date : object, Status_id : object, endDate : object, cardCount : object, destinations : object, customerId : object, contactNumber : object, notificationId : object, additionalNotes : object, cardNumber : object, startDate : object, status : object, notificationType : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AccountRequestsManager.prototype.GetTravelNotifications = function(context, onSuccess, onError){
        ModelManager.invoke('TravelNotification', 'getTravelNotification', context, onSuccess, onError);
    };

    /**
     * @name getCardRequests
     * @member CustomerManagementModule.businessController
     * @param {Username : string} context
     * @param (response:{opstatus : number, CardAccountRequests : [{Status : object, Type : object, Request_id : object, DeliveryDetails : object, DeliveryMode : object, CustomerId : object, CardAccountNumber : object, Date : object, Reason : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AccountRequestsManager.prototype.GetCardRequests = function(context, onSuccess, onError){
        ModelManager.invoke('CardRequests', 'getCardRequests', context, onSuccess, onError);
    };

    /**
     * @name cancelTravelNotification
     * @member CustomerManagementModule.businessController
     * @param {request_id : string, Username : string} context
     * @param (status:{opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AccountRequestsManager.prototype.CancelTravelNotification = function(context, onSuccess, onError){
        ModelManager.invoke('TravelNotification', 'cancelTravelNotification', context, onSuccess, onError);
    };

    return AccountRequestsManager;
});