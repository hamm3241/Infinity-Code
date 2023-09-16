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
           this.addTest('testcase.presenter.fetchAllCustomerCareDetails',{
                allowParrallel: false,
                forms: ['frmCustomerCare'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify fetch all customer care details"
                }
            });
			 this.addTest('testcase.presenter.addNewCustomerCareInfo',{
                allowParrallel: false,
                forms: ['frmCustomerCare'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify add customer care details"
                }
            });
			   this.addTest('testcase.presenter.editCustomerCareInfo',{
                allowParrallel: false,
                forms: ['frmCustomerCare'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify edit customer care details"
                }
            });
			 this.addTest('testcase.presenter.updateCustomerCareStatus',{
                allowParrallel: false,
                forms: ['frmCustomerCare'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify update Customer Care Status"
                }
            });
			this.addTest('testcase.presenter.deleteCustomerCareInfo',{
                allowParrallel: false,
                forms: ['frmCustomerCare'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify delete Customer Care Status"
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