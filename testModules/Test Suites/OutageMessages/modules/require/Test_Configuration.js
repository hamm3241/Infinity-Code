define([], function () {
    return {
        TEST_RESULTS_FORM: null,
        Test_Suite_Name : 'Outage Messages Module Tests',
        configureCommandTests: function () {
            this.addTest('testcase.command.login.successflow', {
				testData: {
                    testId: "Verify Login with correct Credentials"
                }
			});
            this.addTest('testcase.presenter.getOutageMessages', {
				allowParrallel: false,
                forms: ['frmOutageMessage'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch and validate outage messages list"
                }
			});
            this.addTest('testcase.presenter.getServicesView', {
				allowParrallel: false,
                forms: ['frmOutageMessage'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch and validate services view list"
                }
			});
			this.addTest('testcase.presenter.getAddedData', {
				allowParrallel: false,
                forms: ['frmOutageMessage'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch and validate added outage messages list"
                }
			});
          this.addTest('testcase.presenter.editOutageMessage', {
				allowParrallel: false,
                forms: ['frmOutageMessage'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch and validate update outage message"
                }
			});
          this.addTest('testcase.presenter.addOutageMessage', {
				allowParrallel: false,
                forms: ['frmOutageMessage'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch and validate add outage message"
                }
			});
          this.addTest('testcase.presenter.updateStatusOutageMessage', {
				allowParrallel: false,
                forms: ['frmOutageMessage'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch and validate update status of outage message"
                }
			});
//           this.addTest('testcase.presenter.deleteOutageMessage', {
// 				allowParrallel: false,
//                 forms: ['frmOutageMessage'],
//             	maxWaitTime:120,
// 				testData: {
//                     testId: "Verify fetch and validate delete outage message"
//                 }
// 			});
          
        },
        beforeAll: () => kony.print('Before All'),
        beforeEach: () => kony.print('Before Each'),
        afterEach: () => kony.print('After Each'),
        afterAll: results => {
            console.log('After All', results);
        },
    };
});