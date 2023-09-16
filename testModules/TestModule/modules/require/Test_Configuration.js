define([], function () {
    return {
        TEST_RESULTS_FORM: null,
        AllowUI : false,
        Test_Suite_Name : 'Default Example Tests',
        configureCommandTests: function () {
            var loginSuccess = function (response) {
                expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
                expect(response.data,
                    'to get response token').to.include.keys("value");
                expect(kony.mvc.MDAApplication.getSharedInstance().appContext.session_token,
                    'to store response token in to appContext global').to.equal(response.data.value);
            };
            var loginFail = function (response) {
                expect(response.status, 'status to be failure').to.equal(kony.mvc.constants.STATUS_FAILURE);
                expect(response.data.details.errmsg).to.be.a("string");
                expect(JSON.parse(response.data.details.errmsg).loginErrorCode, 'to be correct error code').to.equal(-3);
            };
            this.addTest('testcase.command.login.datadriven', {
                testData: [
                    {
                        testId : 'Login with correct UserName Should Succeed',
                        forInput : {
                         },
                        expect : loginSuccess
                    },
                    {
                        testId : 'Login with inCorrect UserName Should Fail',
                        forInput : {
                        },
                        expect : loginFail
                    },
                ]
            });
            this.addTest('testcase.command.login.successflow', {
				testData: {
                    testId: "Verify Login with correct Credentials"
                }
			});
            this.addTest('testcase.presenter.getpermisions.successflow', {
                allowParrallel: true,
                forms: ['frmPermissions'],
                testData: {
                    testId: "Verify Fetch and Validate Permissions"
                }
            });
        },
        beforeAll: (...args) => console.log('Before All', args),
        beforeEach: (...args) => console.log('Before Each', args),
        afterEach: (...args) => console.log('After Each', args),
        afterAll: results => {
            console.log('After All', results);
        },
    };
});