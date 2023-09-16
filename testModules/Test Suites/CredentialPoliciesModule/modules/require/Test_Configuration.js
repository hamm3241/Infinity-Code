define([], function () {
    return {
        TEST_RESULTS_FORM: null,
        Test_Suite_Name : 'Credential Policies Module Tests',
        configureCommandTests: function () {
            this.addTest('testcase.command.login.successflow', {
				testData: {
                    testId: "Verify Login with correct Credentials"
                }
			});
          this.addTest('testcase.presenter.getCredentialPolicies', {
                allowParrallel: false,
                forms: ['frmPolicies'],
              	maxWaitTime:120,
                testData: {
                    testId: "Verify Fetch and Validate Policies"
                }
            });
			this.addTest('testcase.presenter.editCredentialPolicies', {
                allowParrallel: false,
                forms: ['frmPolicies'],
              	maxWaitTime:120,
                testData: {
                    testId: "Verify Update and Fetch Credential Policies"
                }
            });
          this.addTest('testcase.command.getCredentialPoliciesSuccess', {
            	maxWaitTime:120,
				testData: {
                    testId: "Verify get credential policies success command"
                }
			});
          this.addTest('testcase.command.editCredentialPoliciesSuccess', {
            	maxWaitTime:120,
				testData: {
                    testId: "Verify edit credential policies success command"
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