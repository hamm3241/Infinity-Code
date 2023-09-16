RUNTESTS = function () {
    require('Tests')(jasmine.getEnv());
    require('BusinessTests')(jasmine.getEnv());
    jasmine.getEnv().execute();
};
setTimeout(RUNTESTS, 60 * 1000);
