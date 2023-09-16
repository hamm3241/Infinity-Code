define([], function () {
    return {
        TEST_RESULTS_FORM: null,
        Test_Suite_Name : 'Privacy Policy Module Tests',
        configureCommandTests: function () {
            this.addTest('testcase.command.login.successflow', {
				testData: {
                    testId: "Verify Login with correct Credentials"
                }
			});
			this.addTest('testcase.presenter.getPrivacyPolicy', {
                allowParrallel: false,
                forms: ['frmPrivacyPolicy'],
                testData: {
                    testId: "Verify FETCH Privacy Policy"
                }
            });
           this.addTest('testcase.presenter.editPrivacyPolicy', {
                allowParrallel: false,
                forms: ['frmPrivacyPolicy'],
                testData: {
                    testId: "Verify UPDATE Privacy Policy"
                }
            });
            this.addTest('testcase.presenter.deletePrivacyPolicy', {
                allowParrallel: false,
                forms: ['frmPrivacyPolicy'],
                testData: {
                    testId: "Verify DELETE Privacy Policy"
                }
            });
           this.addTest('testcase.presenter.createPrivacyPolicy', {
                allowParrallel: false,
                forms: ['frmPrivacyPolicy'],
                testData: {
                    testId: "Verify CREATE Privacy Policy"
                }
            }); 
            //for command handlers
            this.addTest('testcase.command.fetchPrivacyPolicy', {
                allowParrallel: false,
                forms: ['frmPrivacyPolicy'],
                testData: {
                    testId: "Verify FETCH Privacy Policy commandHandler"
                }
            });
            this.addTest('testcase.command.editPrivacyPolicy', {
                allowParrallel: false,
                forms: ['frmPrivacyPolicy'],
                testData: {
                    testId: "Verify UPDATE Privacy Policy commandHandler"
                }
            });
             this.addTest('testcase.command.deletePrivacyPolicy', {
                allowParrallel: false,
                forms: ['frmPrivacyPolicy'],
                testData: {
                    testId: "Verify DELETE Privacy Policy commandHandler"
                }
            });
            this.addTest('testcase.command.createPrivacyPolicy', {
                allowParrallel: false,
                forms: ['frmPrivacyPolicy'],
                testData: {
                    testId: "Verify CREATE Privacy Policy commandHandler"
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