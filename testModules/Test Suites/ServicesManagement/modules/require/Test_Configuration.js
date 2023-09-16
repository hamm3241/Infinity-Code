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
            this.addTest('testcase.presenter.getAllServices', {
				allowParrallel: false,
                forms: ['frmServiceManagement'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch and validate services list"
                }
			});
            this.addTest('testcase.presenter.getAllServiceMasterData', {
				allowParrallel: false,
                forms: ['frmServiceManagement'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch and validate services types"
                }
			});
			this.addTest('testcase.presenter.getAllServiceChannelData', {
				allowParrallel: false,
                forms: ['frmServiceManagement'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch and validate get servcie channel"
                }
			});
          this.addTest('testcase.presenter.getAllServiceCatData', {
				allowParrallel: false,
                forms: ['frmServiceManagement'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch and validate get service categories"
                }
			});         
          this.addTest('testcase.presenter.updateStatusOfService', {
				allowParrallel: false,
                forms: ['frmServiceManagement'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch and validate update service status"
                }
			});
          this.addTest('testcase.presenter.createService', {
				allowParrallel: false,
                forms: ['frmServiceManagement'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch and validate create service"
                }
			});
          this.addTest('testcase.presenter.updateService', {
				allowParrallel: false,
                forms: ['frmServiceManagement'],
            	maxWaitTime:120,
				testData: {
                    testId: "Verify fetch and validate update service"
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