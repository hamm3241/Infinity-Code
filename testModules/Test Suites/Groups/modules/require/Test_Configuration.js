define([], function () {
    return {
        TEST_RESULTS_FORM: null,
        Test_Suite_Name : 'Groups Module Tests',
        configureCommandTests: function () {
            this.addTest('testcase.command.login.successflow', {
				testData: {
                    testId: "Verify Login with correct Credentials"
                }
			});
			this.addTest('testcase.presenter.getGroups', {
                allowParrallel: false,
                forms: ['frmGroups'],
                testData: {
                    testId: "Verify FETCH groups"
                }
            });
			 this.addTest('testcase.presenter.fetchAllEntitlements', {
                allowParrallel: false,
                forms: ['frmGroups'],
                testData: {
                    testId: "Verify Fetch All Entitlements"
                }
            });
            this.addTest('testcase.presenter.fetchAllProducts', {
                allowParrallel: false,
                forms: ['frmGroups'],
                testData: {
                    testId: "Verify FETCH Products"
                }
            });
            this.addTest('testcase.presenter.fetchAllCities', {
                allowParrallel: false,
                forms: ['frmGroups'],
                testData: {
                    testId: "Verify FETCH Cities"
                }
            });
            this.addTest('testcase.presenter.fetchAllBranch', {
                allowParrallel: false,
                forms: ['frmGroups'],
                testData: {
                    testId: "Verify FETCH Branches"
                }
            });
			this.addTest('testcase.presenter.fetchEntitlementsOfGroup', {
                allowParrallel: false,
                forms: ['frmGroups'],
                testData: {
                    testId: "Verify FETCH Entitlements assigned to Group"
                }
            });
            this.addTest('testcase.presenter.fetchCustomersOfGroup', {
                allowParrallel: false,
                forms: ['frmGroups'],
                testData: {
                    testId: "Verify FETCH Customers assigned to Group"
                }
            });
		    this.addTest('testcase.presenter.createGroup', {
                allowParrallel: false,
                forms: ['frmGroups'],
                testData: {
                    testId: "Verify CREATE group"
                }
            });
		    this.addTest('testcase.presenter.editGroup', {
                allowParrallel: false,
                forms: ['frmGroups'],
                testData: {
                    testId: "Verify UPDATE group"
                }
            });  
		    this.addTest('testcase.presenter.editGroupStatus', {
                allowParrallel: false,
                forms: ['frmGroups'],
                testData: {
                    testId: "Verify deactivate/activate group"
                }
            });
			this.addTest('testcase.presenter.searchCustomers', {
                allowParrallel: false,
                forms: ['frmGroups'],
                testData: {
                    testId: "Verify customer's search"
                }
            });
			this.addTest('testcase.command.getGroupsView', {
                allowParrallel: false,
                forms: ['frmGroups'],
                testData: {
                    testId: "Verify FETCH groups commandHandler"
                }
            });
            this.addTest('testcase.command.fetchEntitlementsOfGroup', {
                allowParrallel: false,
                forms: ['frmGroups'],
                testData: {
                    testId: "Verify fetch entitlements assigned to group commandHandler"
                }
            }); 
           this.addTest('testcase.command.fetchCustomersOfGroup', {
                allowParrallel: false,
                forms: ['frmGroups'],
                testData: {
                    testId: "Verify fetch customers assigned to group commandHandler"
                }
            }); 
           this.addTest('testcase.command.getProductsList', {
                allowParrallel: false,
                forms: ['frmGroups'],
                testData: {
                    testId: "Verify fetch products commandHandler"
                }
            });
            this.addTest('testcase.command.createGroup', {
                allowParrallel: false,
                forms: ['frmGroups'],
                testData: {
                    testId: "Verify CREATE  new group commandHandler"
                }
            });
            this.addTest('testcase.command.editGroup', {
                allowParrallel: false,
                forms: ['frmGroups'],
                testData: {
                    testId: "Verify EDIT group commandHandler"
                }
            });
          this.addTest('testcase.command.editGroupStatus', {
                allowParrallel: false,
                forms: ['frmGroups'],
                testData: {
                    testId: "Verify UPDATE STATUS commandHandler"
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