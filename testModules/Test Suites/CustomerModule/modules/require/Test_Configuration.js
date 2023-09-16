define([], function () {
    return {
        TEST_RESULTS_FORM: null,
        Test_Suite_Name : 'Customers Module Tests',
        configureCommandTests: function () {
            this.addTest('testcase.command.login.successflow', {
				testData: {
                    testId: "Verify Login with correct Credentials"
                }
			});
             this.addTest('testcase.presenter.getCustomerDevices_CH', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify Fetch Devices List command handler"
                }
            });
            this.addTest('testcase.presenter.customerUpdateDeviceInformation_CH', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify update Device status command handler"
                }
            });
            this.addTest('testcase.presenter.getCustomerDevices', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify Fetch Devices List"
                }
            });
            this.addTest('testcase.presenter.customerUpdateDeviceInformation', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify update Device status"
                }
            });
           this.addTest('testcase.presenter.getLastNCustomerSessions_CH', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify Fetch last n customer session List command handler"
                }
            });
             this.addTest('testcase.presenter.getLastNCustomerSessions', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify Fetch last n customer ssession List"
                }
            });
            this.addTest('testcase.presenter.getAllActivitiesInACustomerSession_CH', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch all activities in customer session command handler"
                }
            });
            this.addTest('testcase.presenter.getAllActivitiesInACustomerSession', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch all activities in customer session"
                }
            });
            this.addTest('testcase.presenter.customerSearch', {
                forms: ['frmCustomerManagement'],
                testData: [
                    {
                        testId : 'Search for a customer : Basic search',
                        forInput : {
                            "_searchType":"CUSTOMER_SEARCH",
                            "_id":null,
                            "_name":"Lenna",
                            "_username":null,
                            "_phone":null,
                            "_email":null,
                            "_group":null,
                            "_requestID":null,
                            "_SSN":null,
                            "_pageOffset":"0",
                            "_pageSize":20,
                            "_sortVariable":"name",
                            "_sortDirection":"ASC"
                        }
                    },
                    {
                        testId : 'Search for a customer : Advanced search',
                        forInput : {
                            "_searchType":"CUSTOMER_SEARCH",
                            "_id":null,
                            "_name":null,
                            "_username":null,
                            "_phone":null,
                            "_email":null,
                            "_group":"Testing",
                            "_requestID":"1",
                            "_SSN":null,
                            "_pageOffset":"0",
                            "_pageSize":20,
                            "_sortVariable":"name",
                            "_sortDirection":"ASC"
                        }
                    },
                    {
                        testId : 'Search for an applicant',
                        forInput : {
                            "_searchType":"APPLICANT_SEARCH",
                            "_id":null,
                            "_name":null,
                            "_username":null,
                            "_phone":null,
                            "_email":"@gmail",
                            "_pageOffset":"0",
                            "_pageSize":20,
                            "_sortVariable":"name",
                            "_sortDirection":"ASC"
                        }
                    }
                ]
            });
            this.addTest('testcase.presenter.getCustomerBasicInfo', {
                forms: ['frmCustomerManagement'],
                testData: [
                    {
                        testId : 'Get customer basic information',
                        forInput : {
                            "Customer_id":"1"
                        }
                    }
                ]
            });
            this.addTest('testcase.presenter.editCustomerBasicInfo', {
                forms: ['frmCustomerManagement'],
                testData: [
                    {
                        testId : 'Edit customer basic information',
                    }
                ]
            });
            this.addTest('testcase.presenter.enrollACustomer', {
                forms: ['frmCustomerManagement'],
                testData: [
                    {
                        testId : 'Enroll a customer',
                        forInput : {
                            "Customer_id":"1",
                            "Customer_name":"John Bailey",
                            "Customer_Email":"john.bailey@kony.com"
                        }
                    }
                ]
            });
            this.addTest('testcase.presenter.getStatus', {
                forms: ['frmCustomerManagement'],
                testData: [
                    {
                        testId : 'Get status information for customer devices',
                        forInput : {"$filter":"Type_id eq STID_CUSTOMERDEVICE"}
                    }
                ]
            });
            this.addTest('testcase.presenter.getCustomerNotes', {
                forms: ['frmCustomerManagement'],
                testData: [
                    {
                        testId : 'Get customer notes',
                        forInput : {"customerID":"1"}
                    }
                ]
            });
            this.addTest('testcase.presenter.getApplicantNotes', {
                forms: ['frmCustomerManagement'],
                testData: [
                    {
                        testId : 'Get applicant notes',
                        forInput : {"applicantID":"APPLICANT1"}
                    }
                ]
            });
            this.addTest('testcase.presenter.createCustomerOrApplicantNotes', {
                forms: ['frmCustomerManagement'],
                testData: [
                    {
                        testId : 'Create customer note',
                        forInput : {
                            "Customer_id": "1",
                            "Note": "Sample test note",
                            "Internal_username": "UID11"
                        }
                    },
                    {
                        testId : 'Create applicant note',
                        forInput : {
                            "Applicant_id": "APPLICANT1",
                            "Note": "Sample test note",
                            "Internal_username": "UID11"
                        }
                    }
                ]
            });
            this.addTest('testcase.presenter.getAllGroups_CH', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch all groups command handler"
                }
            });
            this.addTest('testcase.presenter.getAllGroups', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch all groups"
                }
            });
            this.addTest('testcase.presenter.getCustomerGroups_CH', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch customer group command handler"
                }
            });
            this.addTest('testcase.presenter.getCustomerGroups', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch customer group"
                }
            });
            this.addTest('testcase.presenter.editCustomerGroups_CH', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify edit customer group command handler"
                }
            });
            this.addTest('testcase.presenter.editCustomerGroups', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify edit customer group"
                }
            });
             this.addTest('testcase.presenter.getAllEntitlements_CH', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch Entitlements command handler"
                }
            });
             this.addTest('testcase.presenter.getCustomerEntitlement_CH', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch customer Entitlements command handler"
                }
            });
            this.addTest('testcase.presenter.getCustomerEntitlement', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch customer Entitlements "
                }
            });
             this.addTest('testcase.presenter.getIndirectEntitlements_CH', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch customer indirect Entitlements command handler"
                }
            });
            this.addTest('testcase.presenter.editCustomerEntitlements_CH', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify edit entitlements command handler"
                }
            });
            this.addTest('testcase.presenter.editCustomerEntitlements', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify edit entitlements "
                }
            });
            this.addTest('testcase.presenter.getCustomerProducts_CH', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch products command handler"
                }
            });
            this.addTest('testcase.presenter.getCustomerProducts', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch products entitlements "
                }
            });this.addTest('testcase.presenter.updateEstatementStatus_CH', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify edit estatement command handler"
                }
            });
            this.addTest('testcase.presenter.updateEstatementStatus', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify edit estatement "
                }
            });
          this.addTest('testcase.presenter.getTravelNotifications', {
                forms: ['frmCustomerManagement'],
            	maxWaitTime:120,
                testData: {
                    testId: "Verify fetch travel notifications "
                }
            });
			this.addTest('testcase.presenter.updateCustomerContactInfo', {
                forms: ['frmCustomerManagement'],
              maxWaitTime:120,
                testData: {
                    testId: "Verify edit customer contact information "
                }
            });
// 			this.addTest('testcase.presenter.cancelTravelNotifications', {
//                 forms: ['frmCustomerManagement'],
//               	maxWaitTime:120,
//                 testData: {
//                     testId: "Verify cancel travel notifications "
//                 }
//             });
			this.addTest('testcase.presenter.getAlertPrefrences', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch alert preferences of customer "
                }
            });
            this.addTest('testcase.presenter.getCustomerNotifications', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch customer notifications "
                }
            });
			this.addTest('testcase.command.getAlertPrefrences', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch alert preferences of customer commandHandler"
                }
            });
			this.addTest('testcase.command.getCustomerNotifications', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch customer notifications commandHandler"
                }
            });	
			this.addTest('testcase.presenter.getCustomerCards', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch cards customer"
                }
            });
            this.addTest('testcase.command.getCustomerCards', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch of cards for customer commandHandler"
                }
            });
			this.addTest('testcase.presenter.getCardRequests', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch card-requests of customer "
                }
            });
            this.addTest('testcase.command.getCardRequests', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch card-requests of customer commandHandler "
                }
            });
			this.addTest('testcase.presenter.getRequests', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch customer requests"
                }
            });
            this.addTest('testcase.command.getRequests', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch customer requests commandHandler "
                }
            });
			this.addTest('testcase.presenter.getCustomerRequestAndNotificationCount', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch request and notifications count"
                }
            });
            this.addTest('testcase.command.getCustomerRequestAndNotificationCount', {
                forms: ['frmCustomerManagement'],
                testData: {
                    testId: "Verify fetch request and notifications count commandHandler"
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