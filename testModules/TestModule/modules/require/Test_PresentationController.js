define([], function () {

    function Test_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);

        this.commandTests = [];
        this.runningTests = [];
        this.passedCommandTests = [];
        this.failedCommandTests = [];
        this.testResults = [];
        this.isCurrentlyRunning = false;
    }
    var presentFormBackup = kony.mvc.Presentation.BaseNavigator.prototype.presentForm;
    var RUN_ID = 0;
    var presentationHelper;
    var doesNotUseTheseForms = forms => test => test.mockForms.every(form => forms.indexOf(form) === -1);
    var Test = function (commandId, allowParrallel, mockForms, maxWaitTime) {
        this.commandId = commandId;
        this.testContext = {};
        this.allowedToRunParrallel = allowParrallel;
        this.mockForms = mockForms;
        this.maxWaitTime = maxWaitTime;
    };
    Test.prototype.ready = function isTestReady(passedTests, runningTests){
        if (!this.allowParrallel) {
            return runningTests.length === 0;
        } else {
            return (runningTests.every(otherTest => otherTest.allowedToRunParrallel) && 
            runningTests.every(doesNotUseTheseForms(this.mockForms)));
        }
    };
    var DataDrivenTest = function(commandId, testData, allowParrallel, mockForms, maxWaitTime){
        Test.call(this, commandId, allowParrallel, mockForms, maxWaitTime);
        this.testContext = testData;
    };
    inheritsFrom(DataDrivenTest, Test);
    var TestResult = function (test, isPass, message) {
        this.commandId = test.commandId;
        if (test instanceof DataDrivenTest &&
            test.testContext &&
            typeof test.testContext.testId === 'string') {
            this.commandId = test.testContext.testId;
        }
        this.isPass = isPass;
        this.message = message;
    };
    inheritsFrom(Test_PresentationController, kony.mvc.Presentation.BasePresenter);

    Test_PresentationController.prototype.initializePresentationController = function () {

    };

    Test_PresentationController.prototype.startNewTestRun = function () {
        if(this.isCurrentlyRunning){
            throw Error('Previous Test Run in progress');
        }
        this.beforeAll();
        var self = this;
        RUN_ID = RUN_ID + 1;
        kony.print('starting test run : ' + RUN_ID);
        this.runningTests = [];
        this.passedCommandTests = [];
        this.failedCommandTests = [];
        this.testResults = [];
        this.isCurrentlyRunning = true;
        presentationHelper = replacePresentForm();
        this.runTests(RUN_ID, function onComplete() {
            restorePresentForm();
            self.isCurrentlyRunning = false;
            self.afterAll(self.testResults);
        });
    };
    var inCurrentRun = function (runId) {
        return runId === RUN_ID;
    };
    Test_PresentationController.prototype.runTests = function (runId, onRunComplete) {
        if (!inCurrentRun(runId)) return;
        var self = this;
        var readyTests = [];
        this.commandTests.forEach(function (ct) {
            if (ct.ready(self.passedCommandTests, self.runningTests)) {
                readyTests.push(ct);
                self.runningTests.push(ct);
            }
        });
        if (readyTests.length > 0) {
            this.commandTests = this.commandTests.filter(function (cT) {
                return readyTests.indexOf(cT) === -1;
            });
            readyTests.forEach(function (commandTest) {
                self.runCommandTest(runId, commandTest,
                    function onSuccess(message) {
                        self.testResults.push(new TestResult(commandTest, true, message));
                        self.passedCommandTests.push(commandTest);
                        self.runningTests = self.runningTests.filter(function (runningTest) {
                            return runningTest !== commandTest;
                        });
                        self.runTests(runId, onRunComplete);
                        self.presentTestResults();
                    },
                    function onFailure(message) {
                        self.testResults.push(new TestResult(commandTest, false, message));
                        self.failedCommandTests.push(commandTest);
                        self.runningTests = self.runningTests.filter(function (runningTest) {
                            return runningTest !== commandTest;
                        });
                        self.runTests(runId, onRunComplete);
                        self.presentTestResults();
                    }
                );
            });
        }
        if (this.runningTests.length === 0 && this.isCurrentlyRunning) {
            onRunComplete();
        }
    };
    var replacePresentForm = function () {
        var presentationMockingHelper = {
            registry: {},
            afterUIUpdateRegistry : {},
            registerForms: function (formNames) {
                var self = this;
                var alreadyRegistered = formNames.filter(function (form) {
                    return self.registry[form];
                });
                if (alreadyRegistered.length > 0) {
                    throw 'Trying to register on an already registered form - ' + alreadyRegistered;
                }
                return {
                    onPresentForm : function onPresentForm(form, callback) {
                        if (typeof callback !== 'function') {
                            throw 'callback must be a function';
                        }
                        if (formNames.indexOf(form) === -1) {
                            throw 'callback for this test can only be registered on forms - ' + formNames;
                        }
                        self.registry[form] = callback;
                    },
                    afterUIUpdate : function afterUIUpdate(form, callback){
                        if (typeof callback !== 'function') {
                            throw 'callback must be a function';
                        }
                        if (formNames.indexOf(form) === -1) {
                            throw 'callback for this test can only be registered on forms - ' + formNames;
                        }
                        self.afterUIUpdateRegistry[form] = callback;
                    }
                };
            },
            deRegisterForms: function (formNames) {
                var self = this;
                formNames.forEach(function (form) {
                    delete self.registry[form];
                });
                formNames.forEach(function (form) {
                    delete self.afterUIUpdateRegistry[form];
                });
            },
            callForForm: function (formName, uiTag, context) {
                if (!this.registry[formName]) {
                    return;
                    //throw Error('Trying to present to an unregistered form :- ' + formName);
                }
                this.registry[formName].call(null, context);
            },
            afterUIUpdate : function(formName, uiTag, context, exception){
                if (!this.afterUIUpdateRegistry[formName]) {
                    return;
                    //throw Error('Trying to present to an unregistered form :- ' + formName);
                }
                this.afterUIUpdateRegistry[formName].call(null, kony.application.getCurrentForm(), exception);
            }
        };
        kony.mvc.Presentation.BaseNavigator.prototype.presentForm = function (form, uiTag, context) {
            if(Test_PresentationController.prototype.AllowUI === true){
                presentationMockingHelper.callForForm(form, uiTag, context);
                var exception = null;
                try{
                    presentFormBackup.call(this, form, uiTag, context);
                }catch(e){
                    exception = e;
                }
                presentationMockingHelper.afterUIUpdate(form, uiTag, context, exception);
            }else{
                if (Test_PresentationController.prototype.TEST_RESULTS_FORM === form) {
                    presentFormBackup.call(this, form, uiTag, context);
                } else {
                    presentationMockingHelper.callForForm(form, uiTag, context);
                }
            }
        };
        return presentationMockingHelper;
    };
    var restorePresentForm = function () {
        kony.mvc.Presentation.BaseNavigator.prototype.presentForm = presentFormBackup;
    };
    var shallowCopyOf = obj => {
        var  newObj = {};
        Object.keys(obj).forEach(key=>{
            newObj[key] = obj[key];
        });
        return newObj;
    };
    var checkForReservedKeys = function(context, keys){
        keys.forEach(key => {
            if(typeof context[key] !== 'undefined'){
                throw Error('"'+key+'" is a reserved keyword on the context object!!!');
            }
        });
    };
    Test_PresentationController.prototype.runCommandTest = function (runId, commandTest, onSuccess, onFailure) {
        this.beforeEach(commandTest);
        var self = this;
        kony.print('Started Test : ' + commandTest.commandId);
        var completed = false;
        var completionCallback = function (response) {
            if (completed) return;
            completed = true;
            if (!inCurrentRun(runId)) return;
            presentationHelper.deRegisterForms(commandTest.mockForms);
            self.afterEach(commandTest, response);
            if (response.status === kony.mvc.constants.STATUS_SUCCESS) {
                onSuccess(response.data);
            } else {
                onFailure(response.data);
            }
        };
        setTimeout(function onTimeout() {
            completionCallback({
                status: false, //kony.mvc.constants.STATUS_FAILURE
                data: 'Timed out!'
            });
        }, commandTest.maxWaitTime * 1000);
        var context = shallowCopyOf(commandTest.testContext);
        checkForReservedKeys(context, ['onPresentForm','']);
        if(Array.isArray(commandTest.mockForms) && commandTest.mockForms.length > 0){
            var presentationTestHelper = presentationHelper.registerForms(commandTest.mockForms);
            context.onPresentForm = presentationTestHelper.onPresentForm;
            if(Test_PresentationController.prototype.AllowUI === true){
                context.afterUIUpdate = presentationTestHelper.afterUIUpdate;
            }
        }
        try {
            this.businessController.execute(new kony.mvc.Business.Command(commandTest.commandId, context, completionCallback));
        } catch (e) {
            completionCallback({
                status: false, //kony.mvc.constants.STATUS_FAILURE
                data: {
                    exception: e,
                    toString: function () {
                        return e.toString();
                    }
                }
            });
        }
    };

    Test_PresentationController.prototype.DEFAULT_TIMEOUT = 30;
    Test_PresentationController.prototype.addCommandTest = function (commandId, allowParrallel, forms, maxWaitTime, testData) {
        allowParrallel = allowParrallel ? true : false;
        forms = forms || [];
        maxWaitTime = maxWaitTime || this.DEFAULT_TIMEOUT;
        if(testData){
            this.commandTests.push(new DataDrivenTest(commandId, testData, allowParrallel, forms, maxWaitTime));
        }else{
            this.commandTests.push(new Test(commandId, allowParrallel, forms, maxWaitTime));
        }
    };
    Test_PresentationController.prototype.addDataTest = function(commandId, testData, allowParrallel, forms, maxWaitTime){
        var self = this;
        if(Array.isArray(testData)){
            testData.forEach(tD => {
                self.addCommandTest(commandId, allowParrallel, forms, maxWaitTime, tD);
            });
        } else {
            self.addCommandTest(commandId, allowParrallel, forms, maxWaitTime, testData);
        }
    };
    Test_PresentationController.prototype.addTest = function (commandId, options) {
        if(options){
            var allowParrallel = options.allowParrallel;
            var forms = options.forms;
            var maxWaitTime = options.maxWaitTime;
            if(options.testData){
                this.addDataTest(commandId, options.testData, allowParrallel, forms, maxWaitTime);
            }else{
                this.addCommandTest(commandId, allowParrallel, forms, maxWaitTime);
            }
        }else{
            this.addCommandTest(commandId);
        }
    };

    //Override and Configure your tests in this method
    Test_PresentationController.prototype.configureCommandTests = function () {
        this.addCommandTest('testcase.command.login.successflow');
        this.addCommandTest('testcase.command.login.inCorrectUserName');
        this.addCommandTest('testcase.presenter.getpermisions.successflow', true, ['frmPermissions']);
        this.addCommandTest('testcase.presenter.updatePermissionStatus', false, ['frmPermissions']);
    };

    Test_PresentationController.prototype.AllowUI = true;
    Test_PresentationController.prototype.TEST_RESULTS_FORM = null;

    Test_PresentationController.prototype.presentTestResults = function () {
        if(typeof this.TEST_RESULTS_FORM === 'string' && 
        this.TEST_RESULTS_FORM.length > 0){
            this.presentUserInterface(this.TEST_RESULTS_FORM, {
                testResults: this.testResults,
                remainingTests: this.commandTests,
                runningTests: this.runningTests
            });
        }else{
            kony.print({
                testResults: this.testResults,
                remainingTests: this.commandTests,
                runningTests: this.runningTests
            });
        }
    };

    //override these methods if required
    Test_PresentationController.prototype.beforeAll = function(){};
    Test_PresentationController.prototype.beforeEach = function(){};
    Test_PresentationController.prototype.afterEach = function(){};
    Test_PresentationController.prototype.afterAll = function(){};

    return Test_PresentationController;
});