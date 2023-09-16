define([], function () {
    return {
        TEST_RESULTS_FORM: null,
        Test_Suite_Name : 'Security Questions Module Tests',
        configureCommandTests: function () {
            this.addTest('testcase.command.login.successflow', {
				testData: {
                    testId: "Verify Login with correct Credentials"
                }
			});
             this.addTest('testcase.presenter.getSecurityQuestions', {
                forms: ['frmSecurityQuestions'],
                testData: {
                    testId: "Verify Fetch Security Questions"
                }
            });
            this.addTest('testcase.presenter.updateSecurityQuestionsStatus', {
                forms: ['frmSecurityQuestions'],
                testData: {
                    testId: "Verify Edit Security Questions Status"
                }
            });
            this.addTest('testcase.presenter.createSecurityQuestion', {
                forms: ['frmSecurityQuestions'],
                testData: {
                    testId: "Verify Create Security Questions "
                }
            });
            this.addTest('testcase.presenter.deleteSecurityQuestion', {
                forms: ['frmSecurityQuestions'],
                testData: {
                    testId: "Verify Delete Security Questions "
                }
            });
            this.addTest('testcase.presenter.getSecurityQuestions_CH', {
                forms: ['frmSecurityQuestions'],
                testData: {
                    testId: "Verify Fetch Security Questions CommandHandler"
                }
            });
            this.addTest('testcase.presenter.updateSecurityQuestionsStatus_CH', {
                forms: ['frmSecurityQuestions'],
                testData: {
                    testId: "Verify Edit Security Questions Status CommandHandler"
                }
            });
            this.addTest('testcase.presenter.createSecurityQuestion_CH', {
                forms: ['frmSecurityQuestions'],
                testData: {
                    testId: "Verify Create Security Questions CommandHandler"
                }
            });
            this.addTest('testcase.presenter.deleteSecurityQuestion_CH', {
                forms: ['frmSecurityQuestions'],
                testData: {
                    testId: "Verify Delete Security Questions CommandHandler"
                }
            });
        },
        beforeAll: () => kony.print('Before All'),
        beforeEach: () => kony.print('Before Each'),
        afterEach: () => kony.print('After Each'),
        afterAll: results => {
            console.log('After All', results);
        },
    };
});