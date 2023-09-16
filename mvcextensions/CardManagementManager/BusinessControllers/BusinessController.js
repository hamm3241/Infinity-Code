define(['ModelManager'], function (ModelManager) {
    /**
     * CardManagementManager manages models: card, cardSummary
     */
    function CardManagementManager() {
        kony.mvc.Business.Delegator.call(this);
    }
    
    inheritsFrom(CardManagementManager, kony.mvc.Business.Delegator);
    
    CardManagementManager.prototype.initializeBusinessController = function () {
    
    };

     /**
     * @name getCustomerRequestAndNotificationCount
     * @member CustomerManagementModule.businessController
     * @param {customerUsername : string} context
     * @param (response:{requestCount : string, notificationCount : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CardManagementManager.prototype.getCustomerRequestAndNotificationCount = function(context, onSuccess, onError){
        ModelManager.invoke('cardSummary','getCustomerCardRequestNotificationSummary', context, onSuccess, onError);
    };
    
    /**
     * @name getCardsInformation
     * @member CustomerManagementModule.businessController
     * @param {customerUsername : string} context
     * @param (response:{records : [{Action : object, accountName : object, currentDueAmount : object, currentDueDate : object, maskedCardNumber : object, issuedOn : object, expiryDate : object, withdrawlLimit : object, lastPaymentDate : object, cardStatus : object, interestRate : object, minimumDueAmount : object, requestCount : object, secondaryCardHolder : object, cardHolderName : object, notificationCount : object, currentBalance : object, rewardPointBalance : object, lastStatementPayment : object, cardType : object, accountNumber : object, userId : object, maskedAccountNumber : object, lastStatementBalance : object, cardProductName : object, cardId : object, serviceProvider : object, cardNumber : object, username : object}], opstatus : number, issuerImages : {Maestro : {lastmodifiedts : object, createdby : object, Status_id : object, issuerName : object, modifiedby : object, id : object, synctimestamp : object, Image : object, createdts : object, softdeleteflag : object}, AmericanExpress : {lastmodifiedts : object, createdby : object, Status_id : object, issuerName : object, modifiedby : object, id : object, synctimestamp : object, Image : object, createdts : object, softdeleteflag : object}, Visa : {lastmodifiedts : object, createdby : object, Status_id : object, issuerName : object, modifiedby : object, id : object, synctimestamp : object, Image : object, createdts : object, softdeleteflag : object}, MasterCard : {lastmodifiedts : object, createdby : object, Status_id : object, issuerName : object, modifiedby : object, id : object, synctimestamp : object, Image : object, createdts : object, softdeleteflag : object}}, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CardManagementManager.prototype.CardsInformation = function(context, onSuccess, onError){
        ModelManager.invoke('card','getCustomerCards', context, onSuccess, onError);
    };
        
     /**
     * @name updateCardsInformation
     * @member CustomerManagementModule.businessController
     * @param {customerUsername : string, cardNumber : string, cardAction : string, actionReason : string} context
     * @param (response:{opstatus : number, status : string, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CardManagementManager.prototype.UpdateCardsInformation = function(context, onSuccess, onError){
        ModelManager.invoke('card','updateCustomerCard', context, onSuccess, onError);
    };

    return CardManagementManager;
});