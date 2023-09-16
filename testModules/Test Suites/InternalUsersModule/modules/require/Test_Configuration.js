define([], function () {
    return {
        TEST_RESULTS_FORM: null,
        Test_Suite_Name : 'Users Module Tests',
        configureCommandTests: function () {
            this.addTest('testcase.command.login.successflow', {
				testData: {
                    testId: "Verify Login with correct Credentials"
                }
			});
            this.addTest('testcase.presenter.getInternalUsersList', {
				allowParrallel: false,
                forms: ['frmUsers'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch and validate internal users list"
                }
			});
            this.addTest('testcase.presenter.getAllRolePermissions', {
				allowParrallel: false,
                forms: ['frmUsers'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch and validate role permissions list"
                }
			});
			this.addTest('testcase.presenter.getAllBranches', {
				allowParrallel: false,
                forms: ['frmUsers'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch and validate branches list"
                }
			});
			this.addTest('testcase.presenter.getUserDetails', {
				allowParrallel: false,
                forms: ['frmUsers'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch user Details"
                }
			});
          this.addTest('testcase.presenter.updateUserStatus', {
				allowParrallel: false,
                forms: ['frmUsers'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify update user status"
                }
			});
          this.addTest('testcase.presenter.createInternalUser', {
				allowParrallel: false,
                forms: ['frmUsers'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify create user with correct data"
                }
			});
          this.addTest('testcase.presenter.editInternalUser', {
				allowParrallel: false,
                forms: ['frmUsers'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify edit user data"
                }
			});
          this.addTest('testcase.presenter.getAddressData', {
				allowParrallel: true,
                forms: ['frmUsers'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch address data"
                }
			});
//           this.addTest('testcase.presenter.sendResetPasswordEmail', {
// 				allowParrallel: false,
//                 forms: ['frmUsers'],
//             	maxWaitTime:120,
// 				testData: {
//                     testId: "Verify send reset password email to user"
//                 }
// 			});
          this.addTest('testcase.command.getInternalUsersList_CH', {
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch users list command"
                }
			});
          this.addTest('testcase.command.getAllRolePermissions_CH', {
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch role permissions list command"
                }
			});
          this.addTest('testcase.command.getAllBranches_CH', {
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch branches list command"
                }
			});
          	this.addTest('testcase.command.getCountryList_CH', {
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch country list command"
                }
			});
          this.addTest('testcase.command.getRegionList_CH', {
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch region list command"
                }
			});
          this.addTest('testcase.command.getCityList_CH', {
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch city list command"
                }
			});
          this.addTest('testcase.command.getUserDetails_CH', {
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch user details command"
                }
			});
          this.addTest('testcase.command.updateUserStatus_CH', {
            	maxWaitTime:120,
				testData: {
                    testId: "Verify update user status command"
                }
			});
          this.addTest('testcase.command.createInternalUser_CH', {
            	maxWaitTime:120,
				testData: {
                    testId: "Verify create internal user command"
                }
			});
          this.addTest('testcase.command.editInternalUser_CH', {
            	maxWaitTime:120,
				testData: {
                    testId: "Verify update internal user command"
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