define([], function() {
  var iterator,
    command,
    reportTestFailure,
    expect = chai.expect;
  var authModule = kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager()
    .getModule("AuthModule");

  var setCommand = function(commandId, sendResponse) {
    command = commandId;
    reportTestFailure = testFailureFn(commandId, sendResponse);
  };

  var runTestCases = function(fns) {
    var params;

    var iterGenerator = function*() {
      for (var fn of fns) {
        params = processCodeinTryCatchBlock(fn, params);
        yield params;
      }
    };

    iterator = iterGenerator();
    iterator.next();
  };

  var isEmpty = function(viewModel) {
    return !viewModel || Object.keys(viewModel).length === 0 || Object.keys(viewModel).includes("leftMenuModel");
  };

  var isNotValid = function(viewModel) {
    return !viewModel || Object.keys(viewModel).length === 0 || Object.keys(viewModel).includes("leftMenuModel") || !Object.keys(viewModel).includes(command.context.dataKey);
  };

  var testFailureFn = function(command, sendResponse) {
    var self = this;
    return function(err) {
      sendResponse(command, kony.mvc.constants.STATUS_Failure, err);
    };
  };

  var doLogin = function(username, password) {
    var self = this;
    return function() {
      authModule.businessController.execute(
        new kony.mvc.Business.Command(
          "com.kony.auth.doLogin",
          {
            username: username,
            password: password
          },
          function(response) {
            iterator.next(response);
          }
        )
      );
    };
  };

  var loginByCredentials = function(credentials) {
    return function() {
      authModule.businessController.execute(
        new kony.mvc.Business.Command("com.kony.auth.doLogin", credentials, function(response) {
          iterator.next(response);
        })
      );
    };
  };

  var runGenerator = function(viewModel) {
    if (isEmpty(viewModel)) return;
    setTimeout(function() {
      iterator.next(viewModel);
    }, 0);
  };

  var unpauseGenerator = function(viewModel) {
    if (isNotValid(viewModel)) return;
    setTimeout(function() {
      iterator.next(viewModel);
    }, 0);
  };

  var processResponseAndExecuteFunction = function(response, fn) {
    if (response.status === kony.mvc.constants.STATUS_SUCCESS) {
      processCodeinTryCatchBlock(fn);
    } else {
      reportTestFailure(["Command handler says it failed because ", response.data]);
    }
  };

  var processCodeinTryCatchBlock = function(fn, params) {
    try {
      return fn.call(this, params);
    } catch (err) {
      reportTestFailure(err);
    }
  };

  return {
    doLogin: doLogin,
    isEmpty: isEmpty,
    setCommand: setCommand,
    runGenerator: runGenerator,
    runTestCases: runTestCases,
    unpauseGenerator: unpauseGenerator,
    loginByCredentials: loginByCredentials,
    processCodeinTryCatchBlock: processCodeinTryCatchBlock,
    processResponseAndExecuteFunction: processResponseAndExecuteFunction
  };
});
