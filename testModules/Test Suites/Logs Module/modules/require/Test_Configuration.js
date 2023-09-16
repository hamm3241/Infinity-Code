define([], function () {
    var stripFunctions = function(obj){
        //- removes functions in object, replaces with string 'function', mutates object in place 
        if(typeof obj === 'object'){
            Object.keys(obj).forEach(function(key){
                if(typeof obj[key] === 'object'){
                    stripFunctions(obj[key]);
                }else if(typeof obj[key] === 'function'){
                    obj[key] = 'function';
                }
            });
        }
        return obj;
    };
    return {
        TEST_RESULTS_FORM: null,
        configureCommandTests: function () {
            this.addTest('testcase.command.login.successflow', {
				testData: {
                    testId: "Verify Login with correct Credentials"
                }
			});
          this.addTest('testcase.presenter.getAllFilters', {
				allowParrallel: false,
                forms: ['frmLogs'],
				testData: {
                    testId: "Verify fetch and validate get all log filters"
                }
			});
          this.addTest('testcase.presenter.getTransactionFiltersMasterData', {
				allowParrallel: false,
                forms: ['frmLogs'],
				testData: {
                    testId: "Verify fetch and validate get transaction filter master data"
                }
			});       
          this.addTest('testcase.presenter.getAllServicesList', {
				allowParrallel: false,
                forms: ['frmLogs'],
				testData: {
                    testId: "Verify fetch and validate get all services list"
                }
			});
          this.addTest('testcase.presenter.getCustomerActivityMasterData', {
				allowParrallel: false,
                forms: ['frmLogs'],
				testData: {
                    testId: "Verify fetch and validate get customer activity master data"
                }
			});
          this.addTest('testcase.presenter.getCustomerActivityLogs', {
				allowParrallel: false,
             forms: ['frmLogs'],
            	maxWaitTime:60,
				testData: {
                    testId: "Verify fetch and validate get all customer activity logs"
                }
			});
          this.addTest('testcase.presenter.getAdminConsoleLogs', {
				allowParrallel: false,
                forms: ['frmLogs'],
				testData: {
                    testId: "Verify fetch and validate get admin console logs"
                }
			});
           this.addTest('testcase.presenter.getTransactionLogs', {
				allowParrallel: false,
                forms: ['frmLogs'],
				testData: {
                    testId: "Verify fetch and validate get transaction logs"
                }
			});
           this.addTest('testcase.presenter.getAdminFiltersMasterData', {
				allowParrallel: false,
                forms: ['frmLogs'],
				testData: {
                    testId: "Verify fetch and validate get admin filters master data"
                }
			});
          this.addTest('testcase.presenter.createFilter', {
				allowParrallel: false,
                forms: ['frmLogs'],
				testData: {
                    testId: "Verify create filter"
                }
			});
          this.addTest('testcase.presenter.deleteFilter', {
				allowParrallel: false,
                forms: ['frmLogs'],
				testData: {
                    testId: "Verify delete filter"
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