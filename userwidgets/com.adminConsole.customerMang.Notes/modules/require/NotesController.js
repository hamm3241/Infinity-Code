define(function () {
  var CustomerManagementModulePresenter = null;

  function showSelectedSegment(self) {
    var index = self.view.segNotes.selectedsectionindex;
    var data = self.view.segNotes.data;
    if (data[[index][0]][0].fonticonArrow.text === "") {
      data[[index][0]][0].fonticonArrow.text = "";
      data[[index][0]][1] = data[[index][0]][1].map(function (element) {
        element.flxCustomerMangNotes.isVisible = false;
        return element;
      });
    } else {
      data[[index][0]][0].fonticonArrow.text = "";
      data[[index][0]][1] = data[[index][0]][1].map(function (element) {
        element.flxCustomerMangNotes.isVisible = true;
        return element;
      });
    }
    self.view.segNotes.setData(data);
    self.view.forceLayout();
  }

  function displayNotes(formInstance, CustomerNotes) {
    var self = this;
    var data = [];
    var previousDate;
    for (var i = 0, j = 0; i < CustomerNotes.length; i++) {

      var username = CustomerNotes[i].InternalUser_FirstName + " " + CustomerNotes[i].InternalUser_LastName;
      var text = CustomerNotes[i].Note.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/&/g,"&amp;").replace(/=/g,"&eq;").replace("alert","");
      var dateString = formInstance.getDateFromDBDateTime(CustomerNotes[i].createdts);
      var timeString = formInstance.getTimeFromDBDateTime(CustomerNotes[i].createdts);
      var toAdd = [{

        "fonticonArrow": {
          "text": "",
          "onClick": function () {
            showSelectedSegment(self);
          }
        },
        "lblDate": dateString
      },
      [{
        "imgUser": "option3.png",
        "lblTime": timeString,
        "lblUserName": username,
        "rtxNotesDescription": text,
        "flxCustomerMangNotes": {
          isVisible: true
        }
      }]
      ];
      var addToPrevious = {
        "imgUser": "option3.png",
        "lblTime": timeString,
        "lblUserName": username,
        "rtxNotesDescription": text,
        "flxCustomerMangNotes": {
          isVisible: true
        }
      };

      if (i === 0) {
        data.push(toAdd);
        j++;

      } else if (dateString === previousDate) {

        data[j - 1][1].push(addToPrevious);
      } else {

        data.push(toAdd);
        j++;
      }
      previousDate = dateString;
    }

    this.view.segNotes.setData(data);
    this.view.txtAreatext = "";
    formInstance.view.flxNote.setVisibility(true);
    formInstance.view.forceLayout();
    this.view.flxNotesSegment.scrollToEnd();
  }

  function setDefaultNotesData(formInstance) {

    CustomerManagementModulePresenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule").presentationController;
    this.view.lblNotesSize.setVisibility(false);
    this.view.rtxMsgNotes.setVisibility(false);
    this.view.txtAreaskin = "skntxtAreaLato9ca9ba12PxNoBorder";
    this.view.txtAreafocusSkin = "skntxtAreaLato9ca9ba12PxNoBorder";
    this.view.txtAreahoverSkin = "skntxtAreaLato9ca9ba12PxNoBorder";


    setFlowActions(formInstance, this);
  }

  function validateAddNotes(formInstance, scopeObj) {
    if (scopeObj.view.txtAreaNotes.text === "") {
      formInstance.showError(scopeObj.view.txtAreaNotes);
      return false;
    }
    formInstance.AdminConsoleCommonUtils.showNoError(scopeObj.view.txtAreaNotes);
    return true;
  }
  
  function setFlowActions(formInstance, scopeObj) {
    if(CustomerManagementModulePresenter.getCurrentCustomerDetails().Customer_id &&
       formInstance.view.flxGeneralInfoWrapper) {
      // Enrolled User
      formInstance.view.flxGeneralInfoWrapper.generalInfoHeader.flxAddNote.onClick  = function () {
        formInstance.AdminConsoleCommonUtils.showNoError(scopeObj.view.txtAreaNotes);
        scopeObj.view.txtAreaNotes.text = "";
        var id = CustomerManagementModulePresenter.getCurrentCustomerDetails().Customer_id;
        CustomerManagementModulePresenter.getCustomerNotes({
          "customerID": id
        });
      };
    } else {
      // Unenrolled user
      if(formInstance.view.flxGeneralInfoWrapper){
        formInstance.view.flxGeneralInfoWrapperUnEnrolled.generalInfoHeader.btnAddNote.onClick = function () {
          formInstance.AdminConsoleCommonUtils.showNoError(scopeObj.view.txtAreaNotes);
          scopeObj.view.txtAreaNotes.text = "";
          var id = CustomerManagementModulePresenter.getCurrentCustomerDetails().primaryCustomerId;
          CustomerManagementModulePresenter.getCustomerNotes({
            "customerID": id
          });
        };
      }
   }
    scopeObj.view.txtAreaNotes.onKeyUp = function () {
      formInstance.AdminConsoleCommonUtils.showNoError(scopeObj.view.txtAreaNotes);
      scopeObj.view.lblNotesSize.setVisibility(true);
      scopeObj.view.lblNotesSize.text = scopeObj.view.txtAreaNotes.text.length + "/1000";
      scopeObj.view.forceLayout();
    };
    scopeObj.view.txtAreaNotes.onEndEditing = function () {
      scopeObj.view.lblNotesSize.setVisibility(false);
      scopeObj.view.forceLayout();
    };

    scopeObj.view.flxCloseNotes.onClick = function () {
      formInstance.view.flxNote.setVisibility(false);
    };

    scopeObj.view.addBtn.onClick = function () {
      if (validateAddNotes(formInstance, scopeObj)) {
        var id = CustomerManagementModulePresenter.getCurrentCustomerDetails().Customer_id;
        CustomerManagementModulePresenter.createNote({
          "Customer_id": id,
          "Note": scopeObj.view.txtAreaNotes.text,
          "Internal_username": kony.mvc.MDAApplication.getSharedInstance().appContext.userID

        }, formInstance.customerLabel);
        scopeObj.view.txtAreaNotes.text = "";
      }
    };
  }

  function setCompFlowActions(){  }

  return {
    setDefaultNotesData: setDefaultNotesData,
    displayNotes: displayNotes,
    setCompFlowActions:setCompFlowActions
  };
});