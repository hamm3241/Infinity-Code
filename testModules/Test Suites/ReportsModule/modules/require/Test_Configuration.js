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
          this.addTest('testcase.presenter.getMessagesReport', {
				allowParrallel: false,
                forms: ['frmReportsManagement'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch and validate get message reports"
                }
			});         
          this.addTest('testcase.presenter.getTransactionalReport', {
				allowParrallel: false,
                forms: ['frmReportsManagement'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch and validate transactional reports"
                }
			});
          this.addTest('testcase.presenter.showReportTabs', {
				allowParrallel: false,
                forms: ['frmReportsManagement'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch and validate show report tabs"
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