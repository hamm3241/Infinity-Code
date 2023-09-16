define([], function () {

    function TestCase_Permissions_GetPermissions(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_Permissions_GetPermissions, kony.mvc.Business.CommandHandler);

    TestCase_Permissions_GetPermissions.prototype.execute = function (command) {
        var permissionsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager()
        .getModule("PermissionsModule");
        var self = this;
        var expect = chai.expect;

        function onCompletion(viewModel) {
            if(viewModel.permissions){
                try {
                    expect(viewModel, 'to get permissions').to.include.keys("permissions");
                    expect(viewModel.permissions, 'to get more than zero').to.have.length.above(0);
                    expect(viewModel.permissions[0], 'for permission to have fields').to.include.keys(['Permission_id', 'Status_id', 'Status_Desc']);
                    command.context.afterUIUpdate('frmPermissions', function(form, exception){
                        //this will be called after the WillUpdateUI is finished and the UI was updated
                        //asserting on UI changes
                        try{
                            expect(exception).to.be.a('null');//if there was any exception during UI updates you will get it here
                            expect(form.mainHeader.lblHeading.text).to.equal('Permissions');//should use i18n ideally
                            self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS);
                        } catch (e) {
                            self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                        }
                    });
                } catch (e) {
                    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                }
            }
        }
        try {
            command.context.onPresentForm('frmPermissions', onCompletion);
            permissionsModule.presentationController.navigateTo('PermissionsModule','fetchPermissions');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }

    };

    TestCase_Permissions_GetPermissions.prototype.validate = function () {

    };

    return TestCase_Permissions_GetPermissions;

});