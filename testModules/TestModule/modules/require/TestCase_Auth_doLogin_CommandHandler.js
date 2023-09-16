define([], function () {

    function Test_Auth_doLogin_CommandHandler(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(Test_Auth_doLogin_CommandHandler, kony.mvc.Business.CommandHandler);

    Test_Auth_doLogin_CommandHandler.prototype.execute = function (command) {
        var expect = chai.expect;
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
        var testInput = {
            };
        authModule.businessController.execute(new kony.mvc.Business.Command("com.kony.auth.doLogin", testInput, onCompletion));

        function onCompletion(response) {
            try {
                expect(response.status,'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
                expect(response.data,
                    'to get response token').to.include.keys("value");
                expect(kony.mvc.MDAApplication.getSharedInstance().appContext.session_token,
                    'to store response token in to appContext global').to.equal(response.data.value);
                this.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
            } catch (e) {
                this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
    };

    Test_Auth_doLogin_CommandHandler.prototype.validate = function () {

    };

    return Test_Auth_doLogin_CommandHandler;

});