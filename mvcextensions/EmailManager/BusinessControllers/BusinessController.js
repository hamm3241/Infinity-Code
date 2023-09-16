define(['ModelManager'], function (ModelManager) {
    /**
     * EmailManager manages models: email
     */
    function EmailManager() {
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(EmailManager, kony.mvc.Business.Delegator);

    EmailManager.prototype.initializeBusinessController = function () {

    };

    /**
     * @name sendEmail
     * @member EmailManager.businessController
     * @param {emailType : string, emailId : string} context
     * @param (response:{emailId : string})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    EmailManager.prototype.sendEmail = function (context, onSuccess, onError) {
        var self = this;
        var emailId = context.emailId;
        var emailType = context.emailType;
        var vizServerURL = window.location.href;

        try {
            var param = {
                "emailSubject": "Password reset",
                "senderEmailId": "",
                "recipientEmailId": emailId,
                "cc": "",
                "emailType": emailType,
                "vizServerURL": vizServerURL
            };
          
            // ** Sending email **
            var EmailModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("email");
            var emailModel = new EmailModel(param);
            emailModel.save(ModelManager.callBackFrom(function(data){
                if(context.emailType === "resetPassword") {
                    onSuccess({"resetPassword" : true});
                } else if (data.message === "Request Queued. ") {
                    var emailJSON = {
                        "emailId": emailId
                    };
                    onSuccess(emailJSON);
                } else {
                    if (data.emailPresentInDB === true) {
                        onError("emailFailure");
                    } else {
                        onError("emailNotPresentInDB");
                    }
                }
            }, function(err){
              var error = {"errMsg": "emailFailure"};
              if(err.dbpErrCode)
                onError(err);
              else
                onError(error);
            }));
        } catch (err) {
            kony.print(err);
            onError(err);
        }
    };

    return EmailManager;
});