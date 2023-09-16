define([], function () {
    return {
        TEST_RESULTS_FORM: null,
        AllowUI : true,
        Test_Suite_Name : 'Alerts Management Module Tests',
        configureCommandTests: function () {
//             this.addTest('testcase.command.login.datadriven', {
//                 testData: TestData_Login
//             });
            this.addTest('testcase.command.login.successflow', {
				testData: {
                    testId: "Verify Login with correct Credentials"
                }
			});
//             this.addTest('testcase.presenter.getpermisions.successflow', {
//                 allowParrallel: true,
//                 forms: ['frmPermissions'],
//                 testData: {
//                     testId: "Verify Fetch and Validate Permissions"
//                 }
//             });
            this.addTest('testcase.presenter.fetchAlerts', {
                allowParrallel: true,
                forms: ['frmAlertsManagement'],
                testData: {
                    testId: "Verify Fetch and Validate Alerts"
                }
            });
           this.addTest('testcase.presenter.editAlerts', {
                allowParrallel: true,
                forms: ['frmAlertsManagement'],
                testData: {
                    testId: "Edit Alert type",
                }
            });
           this.addTest('testcase.presenter.editAlertsList', {
                allowParrallel: true,
                forms: ['frmAlertsManagement'],
                testData: {
                    testId: "Edit Alert",
                }
            });
		   this.addTest('testcase.presenter.deleteAlert', {
                allowParrallel: true,
                forms: ['frmAlertsManagement'],
                testData: {
                    testId: "Delete Alert",
                }
            });
          this.addTest('testcase.presenter.fetchAlerts_CH', {
                allowParrallel: true,
                forms: ['frmAlertsManagement'],
                testData: {
                    testId: "Fetch Alert Command handler",
                }
            });
          this.addTest('testcase.presenter.editAlerts_CH', {
                allowParrallel: true,
                forms: ['frmAlertsManagement'],
                testData: {
                    testId: "Edit Alert type Command handler",
                }
            });
          this.addTest('testcase.presenter.editAlertsList_CH', {
                allowParrallel: true,
                forms: ['frmAlertsManagement'],
                testData: {
                    testId: "Edit Alert Command handler",
                }
            });
          this.addTest('testcase.presenter.deleteAlert_CH', {
                allowParrallel: true,
                forms: ['frmAlertsManagement'],
                testData: {
                    testId: "Delete Alert Command handler",
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