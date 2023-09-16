define([], function () {

    function Test_dataDriven_Auth_doLogin_CommandHandler(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(Test_dataDriven_Auth_doLogin_CommandHandler, kony.mvc.Business.CommandHandler);

    Test_dataDriven_Auth_doLogin_CommandHandler.prototype.execute = function (command) {
        var expect = chai.expect;
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
        var testInput = command.context.forInput;
        authModule.businessController.execute(new kony.mvc.Business.Command("com.kony.auth.doLogin", testInput, onCompletion));

        function onCompletion(response) {
            try {
                command.context.expect(response);
                this.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
            } catch (e) {
                this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
    };

    Test_dataDriven_Auth_doLogin_CommandHandler.prototype.validate = function () {

    };

    return Test_dataDriven_Auth_doLogin_CommandHandler;

});