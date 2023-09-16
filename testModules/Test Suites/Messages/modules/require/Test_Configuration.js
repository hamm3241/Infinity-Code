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
           this.addTest('testcase.presenter.fetchRequestsFirst',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify the fetch request first"
                }
            });
             this.addTest('testcase.presenter.fetchRequests',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify the fetch request"
                }
            });
			 this.addTest('testcase.presenter.fetchMyQueueRequests',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify the fetch my queue requests"
                }
            });
			this.addTest('testcase.presenter.fetchSearchRequests',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify the fetch search requests"
                }
            });
			 this.addTest('testcase.presenter.fetchQueueSearchMyRequests',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify the fetch queue search requests"
                }
            });
			this.addTest('testcase.presenter.fetchEmailMessages',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify the fetch email messages"
                }
            });
			this.addTest('testcase.presenter.fetchAssignedToUser',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify the fetch assigned to user"
                }
            });
			this.addTest('testcase.presenter.fetchAllCustomers',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify the fetch assigned to user"
                }
            });
			 this.addTest('testcase.presenter.fetchAllTemplates',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify the fetch all templates"
                }
            });
			this.addTest('testcase.presenter.fetchTemplateByID',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify the fetch template by id"
                }
            });
			 this.addTest('testcase.presenter.fetchAllEmailTemplates',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify the fetch all email templates"
                }
            });
			this.addTest('testcase.presenter.fetchEmailTemplates',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify the fetch email templates"
                }
            });
			 this.addTest('testcase.presenter.createNewMessage',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify create new message"
                }
            });
			 this.addTest('testcase.presenter.createNewTemplate',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify create new template"
                }
            });
			this.addTest('testcase.presenter.deleteTemplate',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify delete Template"
                }
            });   
			this.addTest('testcase.presenter.fetchAllCategories',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify fetch all categories"
                }
            });
            this.addTest('testcase.presenter.editTemplate',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify edit Template"
                }
            });
             this.addTest('testcase.presenter.updateRequestStatus',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify update request status"
                }
            });   
            this.addTest('testcase.presenter.updateAssignTo',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify update assign to"
                }
            }); 
            this.addTest('testcase.presenter.discardMessage',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify discard message"
                }
            }); 
            this.addTest('testcase.presenter.draftMessage',{
                allowParrallel: false,
                forms: ['frmCSR'],
                maxWaitTime: 120,
                testData: {
                    testId: "verify draft Message"
                }
            });   			
        },
        },
        beforeAll: () => kony.print('Before All'),
        beforeEach: () => kony.print('Before Each'),
        afterEach: () => kony.print('After Each'),
        afterAll: results => {
            console.log('After All', results);
        },
    };
});