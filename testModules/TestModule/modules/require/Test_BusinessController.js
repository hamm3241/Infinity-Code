define([], function () {

    function Test_BusinessController() {
        kony.mvc.Business.Controller.call(this);
    }

    inheritsFrom(Test_BusinessController, kony.mvc.Business.Controller);

    Test_BusinessController.prototype.initializeBusinessController = function () {

    };

    Test_BusinessController.prototype.execute = function (command) {
        kony.mvc.Business.Controller.prototype.execute.call(this, command);
    };

    return Test_BusinessController;
});