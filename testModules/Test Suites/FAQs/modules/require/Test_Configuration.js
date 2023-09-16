define([], function () {
    return {
        TEST_RESULTS_FORM: null,
        Test_Suite_Name : 'FAQs Module Tests',
        configureCommandTests: function () {
            this.addTest('testcase.command.login.successflow', {
				testData: {
                    testId: "Verify Login with correct Credentials"
                }
			});
          this.addTest('testcase.presenter.getFAQs', {
                allowParrallel: false,
                forms: ['frmFAQ'],
                maxWaitTime:120,
                testData: {
                    testId: "verify get FAQ's"
                }
            });
          this.addTest('testcase.presenter.editFAQs',{
                allowParrallel: false,
                forms: ['frmFAQ'],
                testData: {
                    testId: "verify edit FAQ's"
                }
            });
		  this.addTest('testcase.presenter.getFAQCategories',{
                allowParrallel: false,
                forms: ['frmFAQ'],
                testData: {
                    testId: "verify get FAQ categories"
                }
            });
          this.addTest('testcase.command.fetchFAQCategories',{
                testData: {
                    testId: "verify fetch FAQ Categories command handler"
                }
            });
           this.addTest('testcase.command.fetchAllFAQ',{
                 testData: {
                     testId: "verify fetch All FAQ command handler"
                 }
              });
         this.addTest('testcase.command.updateFAQ',{
                testData: {
                    testId: "verify update FAQ command handler"
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