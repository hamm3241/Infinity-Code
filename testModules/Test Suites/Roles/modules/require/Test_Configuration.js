define([], function () {
    return {
        TEST_RESULTS_FORM: null,
        Test_Suite_Name : 'Roles Module Tests',
        configureCommandTests: function () {
            this.addTest('testcase.command.login.successflow', {
				testData: {
                    testId: "Verify Login with correct Credentials"
                }
			});
         this.addTest('testcase.command.fetchAllRoles',{
                testData: {
                    testId: "verify  fetch all roles command handler"
                }
            });
           this.addTest('testcase.command.fetchRoleUsers',{
                testData: {
                    testId: "verify  fetch role related users command handler"
                }
            });
			 this.addTest('testcase.command.fetchActiveUsers',{
                testData: {
                    testId: "verify  fetch active users command handler"
                }
            });
           this.addTest('testcase.command.fetchRolePermissions',{
                testData: {
                    testId: "verify  fetch Role related Permissions command handler"
                }
            });
			this.addTest('testcase.command.fetchActivePermissions',{
                testData: {
                    testId: "verify  fetch active Permissions command handler"
                }
            });
			this.addTest('testcase.command.createRole',{
                testData: {
                    testId: "verify  create role command handler"
                }
            });
			 this.addTest('testcase.command.updateRole',{
                testData: {
                    testId: "verify  update role command handler"
                }
            });
			this.addTest('testcase.presenter.getRoles',{
                allowParrallel: false,
                forms: ['frmRoles'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify get Roles"
                }
            });
			this.addTest('testcase.presenter.fetchRoleDetails',{
                allowParrallel: false,
                forms: ['frmRoles'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify get Roles details"
                }
            });
			this.addTest('testcase.presenter.fetchRoleDetails',{
                allowParrallel: false,
                forms: ['frmRoles'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify fetch role details"
                }
            });
			this.addTest('testcase.presenter.fetchAllActiveUsersAndAllActivePermissions',{
                allowParrallel: false,
                forms: ['frmRoles'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify fetch all active users and permissions"
                }
            });
			 this.addTest('testcase.presenter.fetchUpdateRoleData',{
                allowParrallel: false,
                forms: ['frmRoles'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify fetch update role data"
                }
            });
			this.addTest('testcase.presenter.changeStatusOf',{
                allowParrallel: false,
                forms: ['frmRoles'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify change status of data"
                }
            });
			this.addTest('testcase.presenter.createRoles',{
                allowParrallel: false,
                forms: ['frmRoles'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify create Role"
                }
            });
			this.addTest('testcase.presenter.updateRoles',{
                allowParrallel: false,
                forms: ['frmRoles'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify update Role"
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