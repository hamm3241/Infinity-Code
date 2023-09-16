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

      // ** LOCATIONS **
      // PresentationController check
      this.addTest('testcase.command.location.fetchAllLocations_PC', {
        forms: ['frmLocations'],
        testData: {
          testId: "Fetching all locations from backend_PC"
        }
      });
      this.addTest('testcase.command.location.getLocationDetails_PC', {
        forms: ['frmLocations'],
        testData: {
          testId: "Get location details from backend_PC"
        }
      });
      this.addTest('testcase.command.location.addNewLocation_PC', {
        forms: ['frmLocations'],
        testData: {
          testId: "Adding new locations to backend_PC"
        }
      });
      this.addTest('testcase.command.location.changeLocationStatus_PC', {
        forms: ['frmLocations'],
        testData: {
          testId: "Changing location status in backend_PC"
        }
      });
      this.addTest('testcase.command.location.editLocationDetails_PC', {
        forms: ['frmLocations'],
        testData: {
          testId: "Editing location details in backend_PC"
        }
      });
      this.addTest('testcase.command.location.importLocations_PC', {
        forms: ['frmLocations'],
        testData: {
          testId: "Import locations in backend_PC"
        }
      });

      // CommandHandler checks
      this.addTest('testcase.command.location.fetchAllLocations_CH', {
        testData: {
          testId: "Fetching all locations from backend_CH"
        }
      });
      this.addTest('testcase.command.location.getLocationDetails_CH', {
        testData: {
          testId: "Get location details from backend_CH"
        }
      });
      this.addTest('testcase.command.location.addNewLocation_CH', {
        testData: {
          testId: "Adding new locations to backend_CH"
        }
      });
      this.addTest('testcase.command.location.changeLocationStatus_CH', {
        testData: {
          testId: "Changing location status in backend_CH"
        }
      });
      this.addTest('testcase.command.location.editLocationDetails_CH', {
        testData: {
          testId: "Editing location details in backend_CH"
        }
      });
      this.addTest('testcase.command.location.importLocations_CH', {
        testData: {
          testId: "Import locations in backend_CH"
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