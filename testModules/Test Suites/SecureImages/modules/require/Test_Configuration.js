define([], function () {
    return {
        TEST_RESULTS_FORM: null,
        Test_Suite_Name : 'Secure Image Module Tests',
        configureCommandTests: function () {
            this.addTest('testcase.command.login.successflow', {
				testData: {
                    testId: "Verify Login with correct Credentials"
                }
			});
          
          	// ** SECURE IMAGE **
          	// CommandHandler checks
            this.addTest('testcase.command.securityImage.addImage_CH', {
				testData: {
                    testId: "Add Secure Image to backend_CH"
                }
			});
            this.addTest('testcase.command.securityImage.getImages_CH', {
				testData: {
                    testId: "Get Secure Images from backend_CH"
                }
			});
            this.addTest('testcase.command.securityImage.editImageStatus_CH', {
				testData: {
                    testId: "Edit Secure Image Status in backend_CH"
                }
			});
            this.addTest('testcase.command.securityImage.deleteImage_CH', {
				testData: {
                    testId: "Delete Secure Images from backend_CH"
                }
			});
			this.addTest('testcase.command.securityImage.getPhraseStatus_CH', {
				testData: {
                    testId: "Get Phrase Status from backend_CH"
                }
			});
            this.addTest('testcase.command.securityImage.editPhraseStatus_CH', {
				testData: {
                    testId: "Edit Phrase Status in backend_CH"
                }
			});
          	// PresentationController check
            this.addTest('testcase.command.securityImage.addImage_PC', {
              	forms: ['frmSecureImage'],
				testData: {
                    testId: "Add Secure Image to backend_PC"
                }
			});
            this.addTest('testcase.command.securityImage.getImages_PC', {
              	forms: ['frmSecureImage'],
				testData: {
                    testId: "Get Secure Images from backend_PC"
                }
			});
            this.addTest('testcase.command.securityImage.editImageStatus_PC', {
              	forms: ['frmSecureImage'],
				testData: {
                    testId: "Edit Secure Image Status in backend_PC"
                }
			});
            this.addTest('testcase.command.securityImage.deleteImage_PC', {
              	forms: ['frmSecureImage'],
				testData: {
                    testId: "Delete Secure Images from backend_PC"
                }
			});
			this.addTest('testcase.command.securityImage.getPhraseStatus_PC', {
              	forms: ['frmSecureImage'],
				testData: {
                    testId: "Get Phrase Status from backend_PC"
                }
			});
            this.addTest('testcase.command.securityImage.editPhraseStatus_PC', {
              	forms: ['frmSecureImage'],
				testData: {
                    testId: "Edit Phrase Status in backend_PC"
                }
			});
        },
        beforeAll: () => kony.print('Before All'),
        beforeEach: () => kony.print('Before Each'),
        afterEach: () => kony.print('After Each'),
        afterAll: results => {
            kony.print('After All', results);
        },
    };
});