define([], function () {
    return {
        TEST_RESULTS_FORM: null,
        AllowUI : true,
        Test_Suite_Name : 'Terms And Conditions Module Tests',
        configureCommandTests: function () {
            this.addTest('testcase.command.login.datadriven', {
                testData: TestData_Login
            });
            this.addTest('testcase.command.login.successflow', {
				testData: {
                    testId: "Verify Login with correct Credentials"
                }
			});
  
            
            this.addTest('testcase.presenter.deleteTermAndCond.successflow', {
                allowParrallel: true,
                forms: ['frmTermsAndConditions'],
                testData: {
                    testId: "Delete Terms and condition"
                }
            });
            
             this.addTest('testcase.presenter.createTermAndCond.successflow', {
                allowParrallel: true,
                forms: ['frmTermsAndConditions'],
                testData: {
                    testId: "Create Terms and condition"
                }
            });
            
            this.addTest('testcase.presenter.editTermAndCond.successflow', {
                allowParrallel: true,
                forms: ['frmTermsAndConditions'],
                testData: {
                    testId: "Edit Terms and condition"
                }
            });
            
            
            this.addTest('testcase.presenter.getTermACond.successflow', {
                allowParrallel: true,
                forms: ['frmTermsAndConditions'],
                testData: {
                    testId: "Verify Fetch and Validate, Terms and condition"
                }
            });
            
            
            
        },
        beforeAll: (...args) => console.log('Before All', args),
        beforeEach: (...args) => console.log('Before Each', args),
        afterEach: (...args) => console.log('After Each', args),
        afterAll: results => {
            // kony.print('After All', results);
            console.log('After All', results);
        },
    };
});