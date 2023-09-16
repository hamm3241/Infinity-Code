define([], function () {

    function Test_Auth_doLogin_CommandHandler(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(Test_Auth_doLogin_CommandHandler, kony.mvc.Business.CommandHandler);

    Test_Auth_doLogin_CommandHandler.prototype.execute = function (command) {
        var expect = chai.expect;
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
        var testInput = {
            username: 'wrongUserName',
            password: 'wrongPassword'
        };
        authModule.businessController.execute(new kony.mvc.Business.Command("com.kony.auth.doLogin", testInput, onCompletion));

        function onCompletion(response) {
            try{
                expect(response.status,'status to be failure').to.equal(kony.mvc.constants.STATUS_FAILURE);
                expect(response.data.details.errmsg).to.be.a("string");
                expect(JSON.parse(response.data.details.errmsg).loginErrorCode,'to be correct error code').to.equal(-3);
                this.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
            }catch(e){
                this.sendResponse(command, kony.mvc.constants.STATUS_FAILURE, e);
            }
            
        }
    };

    Test_Auth_doLogin_CommandHandler.prototype.validate = function () {

    };

    return Test_Auth_doLogin_CommandHandler;

});