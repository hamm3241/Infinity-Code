define([], function() {
  /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */

  function PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    this.defaultFetchLeadsJSON = {
      "statusIds" : "SID_NEW",
      "pageNumber" : 1,
      "recordsPerPage" : 40,
      "sortCriteria" : "lastmodifiedts",
      "sortOrder" : "desc"
    };
  }

  inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);

  /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
  PresentationController.prototype.initializePresentationController = function() {

  };

  PresentationController.prototype.showLoadingScreen = function(){
    this.presentUserInterface('frmLeadManagement', {"LoadingScreen" : { focus : true } });
  };
  PresentationController.prototype.hideLoadingScreen = function(){
    this.presentUserInterface('frmLeadManagement', {"LoadingScreen" : { focus : false } });
  };

  PresentationController.prototype.fetchLeads = function(fetchLeadsJSON, currentPage, forwardScroll) {
    var self = this;
    self.showLoadingScreen();

    var searchFlag = false;
    function successCallback(response) {
      self.presentUserInterface('frmLeadManagement', {
        "fetchLeads" : "success", 
        "leads" : response.leads,
        "totalLeads" : response.MATCH_COUNT,
        "statusId" : fetchLeadsJSON.statusIds,
        "statusCount" : response.statusCount,
        "currentPage" : currentPage || parseInt(fetchLeadsJSON.pageNumber, 10),
        "forwardScroll" : forwardScroll !== undefined ? forwardScroll : true,
        "searchFlag" : searchFlag
      });

      self.hideLoadingScreen();
    }

    function failureCallback(error) {
      self.presentUserInterface('frmLeadManagement', {
        "fetchLeads" : "failure"
      });
      self.hideLoadingScreen();
    }

    if(!fetchLeadsJSON) {
      fetchLeadsJSON = self.defaultFetchLeadsJSON;
    }
    if(fetchLeadsJSON.search) {
      searchFlag = true;
      delete fetchLeadsJSON.search;
    }
    this.businessController.fetchLeads(fetchLeadsJSON, successCallback, failureCallback);
  };

  PresentationController.prototype.getDefaultFetchLeadsJSON = function() {
    return this.defaultFetchLeadsJSON;
  };

  PresentationController.prototype.fetchLeadDetails = function(fetchLeadDetailsJSON) {
    var self = this;
    self.showLoadingScreen();

    var searchFlag = false;
    function successCallback(response) {
      self.presentUserInterface('frmLeadManagement', {
        "fetchLeadDetails" : "success", 
        "leads" : response.leads,
      });

      self.hideLoadingScreen();
    }

    function failureCallback(error) {
      self.presentUserInterface('frmLeadManagement', {
        "fetchLeadDetails" : "failure"
      });
      self.hideLoadingScreen();
    }

    this.businessController.fetchLeads(fetchLeadDetailsJSON, successCallback, failureCallback);
  };

  PresentationController.prototype.fetchAllProducts = function(customers,payload){
    var self = this;
	var customerNavigatedFlag = false;
    function successCallback(response){
      self.presentUserInterface('frmLeadManagement', {
        "fetchAllProducts" : "success", 
        "records" : response.productTypes ,
      });

      self.presentUserInterface('frmLeadManagement', {
        "fetchSupportedProducts" : "success", 
        "records" : response.productTypes ,
      });
      if(customers === true && customerNavigatedFlag === false){
        var param = {
          "fromCustomer" : true,
          "action" : payload.action,
          "data" : payload.params,
          "navObj": payload.navObj
        };
        customerNavigatedFlag = true;
        self.presentUserInterface("frmLeadManagement",param);
      }
    } 

    function failureCallback(error){
      self.presentUserInterface('frmLeadManagement', {
        "fetchAllProducts" : "failure"
      });
      
      self.presentUserInterface('frmLeadManagement', {
        "fetchSupportedProducts" : "failure"
      });
      
    }

    this.businessController.fetchSupportedProducts({}, successCallback, failureCallback);
  };

  PresentationController.prototype.createLead = function(createLeadJSON){
    var self = this;
    self.showLoadingScreen();

    function successCallback(response){
      self.presentUserInterface('frmLeadManagement', {
        "createLead" : "success"
      });
      self.fetchLeads();
    }
    function failureCallback(error){
      self.presentUserInterface('frmLeadManagement', {
        "createLead" : "failure"
      });
      self.hideLoadingScreen();
    }
    this.businessController.createLead(createLeadJSON, successCallback, failureCallback);
  };

  PresentationController.prototype.fetchNotes = function(fetchNotesJSON) {
    var self = this;
    self.showLoadingScreen();

    function successCallback(response) {
      self.presentUserInterface('frmLeadManagement', {
        "fetchNotes" : "success", 
        "notes" : response.notes
      });
      self.hideLoadingScreen();
    }

    function failureCallback(error) {
      self.presentUserInterface('frmLeadManagement', {
        "fetchNotes" : "failure"
      });
      self.hideLoadingScreen();
    }

    this.businessController.fetchNotes(fetchNotesJSON, successCallback, failureCallback);
  };

  PresentationController.prototype.addNotes = function(addNotesJSON) {
    var self = this;
    self.showLoadingScreen();

    function successCallback(response) {
      var fetchNotesJSON = {
        "leadId": addNotesJSON.leadId,
        "isArchivedLead": false
      };
      self.fetchNotes(fetchNotesJSON);
    }

    function failureCallback(error) {
      self.presentUserInterface('frmLeadManagement', {
        "addNotes" : "failure"
      });
      self.hideLoadingScreen();
    }

    this.businessController.addNotes(addNotesJSON, successCallback, failureCallback);
  };

  PresentationController.prototype.updateLead = function(updateLeadJSON, updateStatusOnly, fetchLeads) {
    var self = this;
    self.showLoadingScreen();
    var action = updateStatusOnly ? "statusUpdate" : "completeUpdate";
    function successCallback(response) {
      if(updateStatusOnly) {
        if(fetchLeads) {
          self.presentUserInterface('frmLeadManagement', {
            "updateLeadStatusOnViewLeads" : "success",
            "statusId" : updateLeadJSON.statusId
          });
        }
        else {
          self.presentUserInterface('frmLeadManagement', {
            "updateLeadStatusOnViewLeadDetails" : "success",
            "statusId" : updateLeadJSON.statusId
          });
        }
      }
      else {
        self.presentUserInterface('frmLeadManagement', {
          "updateLead" : "success",
          "action" : action
        });
      }

      if(fetchLeads) {
        var fetchLeadsJSON = self.defaultFetchLeadsJSON;
        fetchLeadsJSON.statusIds = updateLeadJSON.statusId === "SID_NEW" ? "SID_INPROGRESS" : "SID_NEW";

        self.fetchLeads(fetchLeadsJSON);
      }
      else {
        self.fetchLeadStatusCount();
      }
    }

    function failureCallback(error) {
      if(updateStatusOnly) {
        self.presentUserInterface('frmLeadManagement', {
          "updateLeadStatus" : "failure",
          "action" : action
        });
      }
      else {
        self.presentUserInterface('frmLeadManagement', {
          "updateLead" : "failure",
          "action" : action
        });
      }
      self.hideLoadingScreen();
    }

    this.businessController.updateLead(updateLeadJSON, successCallback, failureCallback);
  };

  PresentationController.prototype.fetchLeadStatusCount = function() {
    var self = this;
    self.showLoadingScreen();

    function successCallback(response) {
      self.presentUserInterface('frmLeadManagement', {
        "fetchLeadStatusCount" : "success", 
        "statusCount" : response.statusCount
      });
      self.hideLoadingScreen();
    }

    function failureCallback(error) {
      self.presentUserInterface('frmLeadManagement', {
        "fetchLeadStatusCount" : "failure"
      });
      self.hideLoadingScreen();
    }

    this.businessController.fetchLeadStatusCount({}, successCallback, failureCallback);
  };

  PresentationController.prototype.showCustomerProfile = function (viewCustomerDetailsJSON, breadcrumbValue, statusId, leadId) {
    var formDetails = {
      "name" : "frmLeadManagement",
      "data" : {
        "breadcrumbValue" : breadcrumbValue,
      }
    };
    if(statusId) {
      formDetails.data.statusId = statusId;
    }
    if(leadId) {
      formDetails.data.leadId = leadId;
    }
    this.navigateTo('CustomerManagementModule', 'getCustomerBasicInfo', [viewCustomerDetailsJSON, "InfoScreenProfile", formDetails]);
  };
  /* @param: create payload for lead, action-create/edit,navObj - {formName:"",breadcrumbBack:""}*/
  PresentationController.prototype.createLeadFromCustomer = function (params,action,navObj) {
    var self = this;
    self.showLoadingScreen();
    var presenterPayload = {
      "params" : params,
      "action" : action,
      "navObj" : navObj,
    };
    self.fetchAllProducts(true,presenterPayload);
  };

  PresentationController.prototype.createLeadNavigateToCustomer = function (createLeadJSON,viewCustomerDetailsJSON,breadcrumbValue) {
    var self = this;
    self.showLoadingScreen();

    function successCallback(response){
      var formDetails = {
        "name" : "frmLeadManagement",
        "data" : {
          "breadcrumbValue" : breadcrumbValue
        },
        "toast" :{
          "status":"success",
          "message":"Create lead successfull"
        } 
      };
      self.navigateTo('CustomerManagementModule', 'getCustomerBasicInfo', [viewCustomerDetailsJSON, "InfoScreenProfile", formDetails]);
    }
    function failureCallback(error){
      self.hideLoadingScreen();
      var formDetails = {
        "name" : "frmLeadManagement",
        "data" : {
          "breadcrumbValue" : breadcrumbValue
        },
         "toast" :{
          "status":"failure",
          "message":"Create lead failed"
        } 
      };
      self.navigateTo('CustomerManagementModule', 'getCustomerBasicInfo', [viewCustomerDetailsJSON, "InfoScreenProfile", formDetails]);
    }
    this.businessController.createLead(createLeadJSON, successCallback, failureCallback);
  };
  PresentationController.prototype.updateLeadNavigateToCustomer = function (updateLeadJSON,viewCustomerDetailsJSON,breadcrumbValue) {
    var self = this;
    self.showLoadingScreen();

    function successCallback(response){
      var formDetails = {
        "name" : "frmLeadManagement",
        "data" : {
          "breadcrumbValue" : breadcrumbValue
        },
       "toast" :{
          "status":"success",
          "message":"Update lead successfull"
        } 
      };
      self.navigateTo('CustomerManagementModule', 'getCustomerBasicInfo', [viewCustomerDetailsJSON, "InfoScreenProfile", formDetails]);
    }
    function failureCallback(error){
       self.hideLoadingScreen();
       var formDetails = {
        "name" : "frmLeadManagement",
        "data" : {
          "breadcrumbValue" : breadcrumbValue
        },
        "toast" :{
          "status":"failure",
          "message":"Update lead failed"
        } 
      };
      self.navigateTo('CustomerManagementModule', 'getCustomerBasicInfo', [viewCustomerDetailsJSON, "InfoScreenProfile", formDetails]);
    
     
    }
    this.businessController.updateLead(updateLeadJSON, successCallback, failureCallback);
  };
  return PresentationController;
});