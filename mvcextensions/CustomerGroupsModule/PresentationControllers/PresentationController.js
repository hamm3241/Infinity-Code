define(['ErrorInterceptor', 'ErrorIsNetworkDown','Promisify','LegalEntityPermission_Form_Extn'], function (ErrorInterceptor, isNetworkDown,Promisify,LegalEntityPermissionExtn) {

    function CustomerGroups_PresentationController() {
        this.custGroupsModel = {
        	context: null,
        	custGroupsList: null,
        	entitlements: null,
        	customers: null,
        	entitlementsOfGroup: null,
          	customersOfGroup: null,
            searchResult:null,
            cities:null,
            branches:null,
            products:null,
            roleTypes:null,
            importProgressId:null
        };
      this.custGroupsModelForCreate = {
        custGroupsListForCreate: null,
      };
      this.accessPolicyList = [];
      this.entityList = {
        context : null,
        entityValues : null
      };
        //kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(CustomerGroups_PresentationController, kony.mvc.Presentation.BasePresenter);

    CustomerGroups_PresentationController.prototype.initializePresentationController = function() {
      var self = this;
      ErrorInterceptor.wrap(this, 'businessController').match(function(on){
        return [
          on(isNetworkDown).do(function(){
            self.presentUserInterface('frmGroups', {
              NetworkDownMessage : {}
            });
          })
        ];
      });
    };
	
	/**
     * @name showGroups
     * @member CustomerGroupsModule.presentationController
     * 
     */
    CustomerGroups_PresentationController.prototype.showGroups = function(){
      var self = this;
      self.clearToDefault();
      this.fetchCustomerGroups();
      var promiseFetchRoleTypes = Promisify(this.businessController, 'getRoleTypes');
      var promiseFetchAllBranches = Promisify(this.businessController, 'fetchAllBranches');
      var promiseFetchAllCities = Promisify(this.businessController, 'fetchCityList');
      var promiseGetAllProducts = Promisify(this.businessController, 'getProductsList');
      Promise.all([
        promiseFetchRoleTypes({}),
        promiseFetchAllBranches({}),
        promiseFetchAllCities({}),
        promiseGetAllProducts({})
      ]).then(function (responses) {
        self.custGroupsModel.context = "masterData";
        self.custGroupsModel.roleTypes = responses[0].CustomerTypeRecords;
        self.custGroupsModel.branches = responses[1].branch_view;
        self.custGroupsModel.cities = responses[2];
        self.custGroupsModel.products = responses[3].product;
        self.showCustomerGroupsScreen(self.custGroupsModel);
        self.presentUserInterface('frmGroups', {
          "LoadingScreen": {
            focus: false
          }
        });
      }).catch(function (error) {
        self.presentUserInterface('frmGroups', {
          "LoadingScreen": {
            focus: false
          }
        });
        self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
      });
      
    };
     
	 /**
     * @name fetchCustomerGroups
     * @member CustomerGroupsModule.presentationController
     * @param undefined context
     */
    CustomerGroups_PresentationController.prototype.fetchCustomerGroups = function (context) {
      var self = this;
      self.presentUserInterface('frmGroups', {
        "LoadingScreen": {
          focus: true
        }
      });
      var promiseFetchGroups = Promisify(this.businessController, 'getCustomerGroupsView');
      //var promiseGetImportStatuId = Promisify(this.businessController, 'getImportStatusIdList');
      Promise.all([
        promiseFetchGroups({})
        //promiseGetImportStatuId({})
      ]).then(function (responses) {
        self.clearToDefault();
        if (context === "search") { //for adv.search
          self.custGroupsModel.context = "search";
          self.custGroupsModel.custGroupsList = responses[0].GroupRecords;
          self.showCustomerGroupsScreen(self.custGroupsModel);
        } else { //for list view
          self.custGroupsModel.context = "";
          if(responses[0].GroupRecords !== undefined){
          self.custGroupsModel.custGroupsList = responses[0].GroupRecords;
          }
          else{
            self.custGroupsModel.emptyCustGroupsList = responses;
          }
          self.custGroupsModel.importProgressId = responses[1];
          self.showCustomerGroupsScreen(self.custGroupsModel);
        }
        self.presentUserInterface('frmGroups', {
          "LoadingScreen": {
            focus: false
          }
        });
      }).catch(function (error) {
        if(error.dbpErrMsg !== undefined){
          self.custGroupsModel.emptyCustGroupsList = error;
          self.showCustomerGroupsScreen(self.custGroupsModel);
        }
        else{
        self.presentUserInterface('frmGroups', {
          "LoadingScreen": {
            focus: false
          }        
        });
        self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
        }
      });
    };
    
  CustomerGroups_PresentationController.prototype.fetchCustomerGroupsWithEntity = function (context) {
    var self = this;
    self.presentUserInterface('frmGroups', {
      "LoadingScreen": {
        focus: true
      }
    });
    function onCompletionCallBack(response) {
      self.presentUserInterface('frmGroups', {
        "LoadingScreen": {
          focus: false
        }
      });
      self.presentUserInterface('frmGroups', {
        "getGroupsResponse" :{
          list: response
        }
      });
    }
    function onError(response) {
      if(response.dbpErrMsg !== undefined){
        self.custGroupsModelForCreate.emptyCustGroupsListForCreate = response;
        self.showCustomerGroupsScreen(self.custGroupsModelForCreate);
      }
      else{
        self.presentUserInterface('frmGroups', {
          "LoadingScreen": {
            focus: false
          }
        });
      }
      

    }
    self.businessController.getCustomerGroupsWithEntity(context, onCompletionCallBack, onError);
  };
    
  CustomerGroups_PresentationController.prototype.fetchLegalEntity = function (context) {
      var self = this;
      self.presentUserInterface('frmGroups', {
        "LoadingScreen": {
          focus: true
        }
      });
    //var legalEntities = LegalEntityPermissionExtn.getCurrentUserLEArr();
    var legalEntities= LegalEntityPermissionExtn.getLEListForFormAction("frmGroups",'VIEW');
    self.presentUserInterface('frmGroups', {
        "entityValues": {
          list: legalEntities
        }
      });
     
    };
    
	 /**
     * @name createCustomerGroups
     * @member CustomerGroupsModule.presentationController
     * @param {Name : string, Description : string, Status_id : string, User_id : string, Entitlements : [{Service_id : string, TransactionFee_id : string, TransactionLimit_id : string}], Customers : [{Customer_id : string}]} createData
     */
    CustomerGroups_PresentationController.prototype.createCustomerGroups = function (createData,importReq) {
      var self = this;
      self.presentUserInterface('frmGroups', {
        "LoadingScreen": {
          focus: true
        }
      });
      function onCompletionCallBack(response) {
        self.presentUserInterface('frmGroups', {
          "LoadingScreen": {
            focus: false
          }
        });
        self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.Groups.successCreatingGroups"), "success");
        self.fetchCustomerGroupsWithEntity(createData.legalEntityId);
        /*if(importReq.isImport){
          importReq.fileVal.roleId = response.Group_id;
          self.importCustomers(importReq);
        }*/
      }
      function onError(response) {
        self.presentUserInterface('frmGroups', {
          "LoadingScreen": {
            focus: false
          }
        });
        self.showToastMessageFlex(ErrorInterceptor.errorMessage(response), "error");
        self.fetchCustomerGroupsWithEntity(createData.legalEntityId);
      }
      self.businessController.addCustomerGroups(createData, onCompletionCallBack, onError);
    };
     
	
    /**
     * @name fetchEntitlements
     * @member CustomerGroupsModule.presentationController
     * @param boolean getForEdit
     * @param string groupId
     * @param number assignFor
     */
     CustomerGroups_PresentationController.prototype.fetchEntitlements = function (getForEdit, param, assignFor) {
       var self = this;
       self.presentUserInterface('frmGroups', {
         "LoadingScreen": {
           focus: true
         }
       });

       function onCompletionCallBack(response) {
         var res = response.Services;
         self.clearToDefault();
         if (getForEdit) { //for edit
          
         } else { //for create
           self.custGroupsModel.entitlements = res;
           self.custGroupsModel.context = "createGroup";
           self.showCustomerGroupsScreen(self.custGroupsModel);
         }
         self.presentUserInterface('frmGroups', {
             "LoadingScreen": {
               focus: false
          }});
       }

       function onError(error) {
         self.presentUserInterface('frmGroups', {
             "LoadingScreen": {
               focus: false
          }});
         self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
       }
       self.businessController.getServices({}, onCompletionCallBack, onError);
     };
	 
   /**
     * @name fetchEntitlementsOfGroup
     * @member CustomerGroupsModule.presentationController
     * @param string groupId
     * @param boolean isEdit
     * @param number assignFor
     */
    CustomerGroups_PresentationController.prototype.fetchEntitlementsOfGroup = function (param, isEdit, assignFor) {
      var self = this;
      var reqParam = {
        "Group_id": param
      };
      self.presentUserInterface('frmGroups', {
        "LoadingScreen": {
          focus: true
        }
      });

      function onCompletionCallBack(response) {
        if (isEdit) { //for edit
        
        } else { //for group detailed view
          self.clearToDefault();
          self.custGroupsModel.entitlementsOfGroup = response;
          self.custGroupsModel.context = "";
          self.showCustomerGroupsScreen(self.custGroupsModel);
        }
        self.presentUserInterface('frmGroups', {
          "LoadingScreen": {
            focus: false
          }
        });
      }

      function onError(error) {
        self.presentUserInterface('frmGroups', {
          "LoadingScreen": {
            focus: false
          }
        });
        self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
      }
        self.businessController.getEntitlements(reqParam, onCompletionCallBack, onError);
    };
	
    /**
     * @name fetchCustomersOfGroup
     * @member CustomerGroupsModule.presentationController
     * @param json param
     * @param boolean isEdit
     * @param number/string assignFor
     */
    CustomerGroups_PresentationController.prototype.fetchCustomersOfGroup = function (param, isEdit, context) {
      var self = this;
      self.presentUserInterface('frmGroups', {
        "LoadingScreen": {
          focus: true
        }
      });

      function onCustomersCompletionCallBack(response) {
        self.clearToDefault();
        if (isEdit && context === "loadMore") { //for edit
          self.custGroupsModel.context = context;
          self.showCustomerGroupsScreen({"context":context,
                                         "custOfGroupLoadMore" :response});
        } else { //for group detailed view
          self.custGroupsModel.context = "";
          self.custGroupsModel.customersOfGroup = response;
          self.showCustomerGroupsScreen(self.custGroupsModel);
                  
        }
        self.presentUserInterface('frmGroups', {
          "LoadingScreen": {
            focus: false
          }
        });
      }

      function onError(error) {
        self.presentUserInterface('frmGroups', {
          "LoadingScreen": {
            focus: false
          }
        });
         self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
      }
      self.businessController.searchCustomers(param, onCustomersCompletionCallBack, onError);
    };
	
    /**
     * @name updateCustomerGroups
     * @member CustomerGroupsModule.presentationController
     * @param {Group_id : string, Status_id : string, Name : string, Description : string, User_id : string, removedEntitlementIds : [], addedEntitlementIds : [], removedCustomerIds : [], addedCustomerIds : []} editedParamReq
     */
     CustomerGroups_PresentationController.prototype.updateCustomerGroups = function (editedParamReq,importReq) {
       var self = this;
       self.presentUserInterface('frmGroups', {
         "LoadingScreen": {
           focus: true
         }
       });

       function onCompletionCallBack(response) {
         self.presentUserInterface('frmGroups', {
           "LoadingScreen": {
             focus: false
           }
         });
         self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.Groups.successEditingGroups"), "success");
         self.fetchCustomerGroupsWithEntity(editedParamReq.legalEntityId);
         /*if(importReq.isImport){
          self.importCustomers(importReq);
        }*/
       }

       function onError(error) {
         self.presentUserInterface('frmGroups', {
           "LoadingScreen": {
             focus: false
           }
         });
         self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
         self.fetchCustomerGroupsWithEntity(editedParamReq.legalEntityId);
       }
       self.businessController.updateCustomerGroups(editedParamReq, onCompletionCallBack, onError);
     };
	 
     /**
     * @name updateStatusOfCustomerGroups
     * @member CustomerGroupsModule.presentationController
     * @param {Group_id : string, Status_id : string, User_id : string} reqParam
     */
     CustomerGroups_PresentationController.prototype.updateStatusOfCustomerGroups = function (reqParam) {
       var self = this;
       var text = "";
       self.presentUserInterface('frmGroups', {
         "LoadingScreen": {
           focus: true
         }
       });
       if (reqParam.Status_id === "SID_ACTIVE") {
         text = kony.i18n.getLocalizedString("i18n.Groups.Activation");
       } else {
         text = kony.i18n.getLocalizedString("i18n.Groups.Deactivation");
       }

       function onCompletionCallBack(response) {
         self.presentUserInterface('frmGroups', {
           "LoadingScreen": {
             focus: false
           }
         });
         self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.frmCSRController.CustomerRole") + " " + text + " " + kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Successful"), "success");
         self.fetchCustomerGroupsWithEntity(reqParam.legalEntityId);

       }

       function onError(error) {
         self.presentUserInterface('frmGroups', {
           "LoadingScreen": {
             focus: false
           }
         });
         self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
         //self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.frmCSRController.CustomerRole") + " " + text + " " + kony.i18n.getLocalizedString("i18n.frmLogsController.failed"), "error");
         self.fetchCustomerGroupsWithEntity(reqParam.legalEntityId);
       }
       self.businessController.updateCustomerGroupStatus(reqParam, onCompletionCallBack, onError);
     };
	 
      /**
     * @name searchCustomers
     * @member CustomerGroupsModule.presentationController
     * @param {_searchType : string, _name : string, _id : string, _username : string, _branchIDS : null, _productIDS : null, _cityIDS : null, _entitlementIDS : null, _groupIDS : null, _customerStatus : null, _before : null, _after : null, _pageOffset : string, _pageSize : number, _sortVariable : string, _sortDirection : string} param
     */
     CustomerGroups_PresentationController.prototype.searchCustomers = function (param) {
       var self = this;
       self.presentUserInterface('frmGroups', {
         "LoadingScreen": {
           focus: true
         }
       });

       function onCompletionCallBack(response) {
         self.presentUserInterface('frmGroups', {
           "LoadingScreen": {
             focus: false
           }
         });
         self.clearToDefault();
         self.custGroupsModel.context = "";
         self.custGroupsModel.searchResult = response;
         self.showCustomerGroupsScreen(self.custGroupsModel);
       }

       function onError(error) {
         self.presentUserInterface('frmGroups', {
           "LoadingScreen": {
             focus: false
           }
         });
         self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
       }
       self.businessController.searchCustomers(param, onCompletionCallBack, onError);
     };
     /**
     * @name fetchEntitlementsForSearch
     * @member CustomerGroupsModule.presentationController
     * 
     */
     CustomerGroups_PresentationController.prototype.fetchEntitlementsForSearch = function () {
       var self = this;
       self.presentUserInterface('frmGroups', {
         "LoadingScreen": {
           focus: true
         }
       });

       function onSuccess(response) {
         self.presentUserInterface('frmGroups', {
           "LoadingScreen": {
             focus: false
           }
         });
         self.clearToDefault();
         self.custGroupsModel.context = "search";
         self.custGroupsModel.entitlements = response.Services;
         self.showCustomerGroupsScreen(self.custGroupsModel);
       }

       function onError(error) {
         self.presentUserInterface('frmGroups', {
           "LoadingScreen": {
             focus: false
           }
         });
         self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
       }
       self.businessController.getServices({}, onSuccess, onError);
     };
     /*
      * common function to present user interface with Toast message
      */
     CustomerGroups_PresentationController.prototype.showToastMessageFlex = function (msg, status) {
     	var self = this;
       var toast ={"toast": {
         message: msg,
         status: status
       }
                  };
     	self.presentUserInterface("frmGroups", toast);
        toast = {};

     };
     
    /**
     * @name showCustomerGroupsScreen
     * @member CustomerGroupsModule.presentationController
     * @param {context : string, custGroupsList : null, entitlements : null, customers : null, entitlementsOfGroup : null, customersOfGroup : null, searchResult : {statuscode : number, Status : string, SortVariable : string, SortDirection : string, PageSize : number, records : [object], opstatus : number, TotalResultsFound : number, PageOffset : number, httpStatusCode : number, httpresponse : {headers : object, url : object, responsecode : object}}, cities : null, branches : null, products : null} viewModel
     */
     CustomerGroups_PresentationController.prototype.showCustomerGroupsScreen = function (viewModel) {
     	var self = this;
     	if (viewModel) {
     		self.presentUserInterface("frmGroups", viewModel);
     	} else {
     		self.presentUserInterface("frmGroups");
     	}

     };
    /*
     * function to clear data to defaults
     */
    CustomerGroups_PresentationController.prototype.clearToDefault = function(){
        var self = this;
        self.custGroupsModel.context = null;
        self.custGroupsModel.custGroupsList = null;
        self.custGroupsModel.entitlements = null;
        self.custGroupsModel.customers = null;
        self.custGroupsModel.entitlementsOfGroup = null;
        self.custGroupsModel.customersOfGroup = null;
        self.custGroupsModel.searchResult = null;
        self.custGroupsModel.cities = null;
        self.custGroupsModel.branches = null;
        self.custGroupsModel.products = null;
        self.custGroupsModel.roleTypes = null;
        self.custGroupsModel.importProgressId = null;
    };
  /*
   * get all enttilements and entitlements,customers assigned to group for edit
   * @param: {features:{"group_id":""},customers:{}}
   * @context: "editGroup"/0/1
   */
  CustomerGroups_PresentationController.prototype.fetchGroupDataForEdit = function(param,context) {
    var self = this;
    self.presentUserInterface('frmGroups', {
           "LoadingScreen": {
             focus: true
           }
         });
    var promiseGetGroupFeatures = Promisify(this.businessController, 'getFeaturesAndActionsForEdit');
    var promiseGetAllFeatures = Promisify(this.businessController, 'getAllFeaturesAndActions');
    var promiseGetGroupCustomers = Promisify(this.businessController, 'searchCustomers');
    Promise.all([
      promiseGetGroupFeatures(param.features),
      promiseGetAllFeatures({}),
      promiseGetGroupCustomers(param.customers)
    ]).then(function (responses) {
      self.showCustomerGroupsScreen({"context":context,
                                     "featuresOfGroup":responses[0].features,
                                     "allFeatures": responses[1].groups,
                                     "customersOfGroup":responses[2],
                                    });
      self.presentUserInterface('frmGroups', {
           "LoadingScreen": {
             focus: false
           }
         });
    }).catch(function (error) {
      self.presentUserInterface('frmGroups', {
           "LoadingScreen": {
             focus: false
           }
         });
     self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
    });
  };
  CustomerGroups_PresentationController.prototype.fetchFeaturesForEdit = function (reqParam, tab) {
	var self = this;
    var viewModel={};
    var allFeaturesPayload = {"roleTypeId":reqParam.type};
    self.presentUserInterface('frmGroups', {
      "LoadingScreen": {
        focus: true
      }
    });
    var promiseFetchAllFeatures = Promisify(this.businessController, 'getAllFeaturesAndActions');
    var promiseFetchGroupFeatures = Promisify(this.businessController, 'getGroupFeaturesAndActions');
    Promise.all([
      promiseFetchAllFeatures({
        "roleTypeId":reqParam.type,
        "legalEntityId": reqParam.legalEntityId
      }),
      promiseFetchGroupFeatures({
        "group_id": reqParam.group_id,
        "legalEntityId": reqParam.legalEntityId
      })
    ]).then(function(responses) {
     /* var filtereddata = responses[0].groups.filter(function(rec) {
        if (rec.groupid === reqParam.type) return rec;
      });
      viewModel.features = filtereddata[0].features;*/
      viewModel.features = responses[0].groups && responses[0].groups.length > 0 ? responses[0].groups[0].features: [];
      viewModel.groupFeaturesForEdit = responses[1].features;
      viewModel["tab"] = tab;
      self.presentUserInterface("frmGroups", viewModel);
        /*self.presentUserInterface('frmGroups', {
          "LoadingScreen": {
            focus: true
          }
        });*/
      }).catch(function(error) {
      self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
    });

  };
  /*
   * import customers csv file
   * 
   */
  CustomerGroups_PresentationController.prototype.importCustomers = function(context){
    var self = this;
    self.presentUserInterface('frmGroups', {
           "LoadingScreen": {
             focus: true
           }
         });
    function onSuccess(response) {
         self.presentUserInterface('frmGroups', {
           "LoadingScreen": {
             focus: false
           }
         });
         self.clearToDefault();
         //self.custGroupsModel.roleTypes = response.CustomerTypeRecords;
         //self.showCustomerGroupsScreen(self.custGroupsModel);
       }

       function onError(error) {
         self.presentUserInterface('frmGroups', {
           "LoadingScreen": {
             focus: false
           }
         });
       }
       self.businessController.importCustomersForGroup(context.fileVal, onSuccess, onError);
  };
   /*
   *fetch list of customers who's import is still in progress
   * 
   */
  CustomerGroups_PresentationController.prototype.getImportStatusIdList = function(context){
    var self = this;
    self.presentUserInterface('frmGroups', {
           "LoadingScreen": {
             focus: true
           }
         });
    function onSuccess(response) {
         self.presentUserInterface('frmGroups', {
           "LoadingScreen": {
             focus: false
           }
         });
         //self.clearToDefault();
         self.showCustomerGroupsScreen({"importCustStatusId": response});
       }

       function onError(error) {
         self.presentUserInterface('frmGroups', {
           "LoadingScreen": {
             focus: false
           }
         });
       }
       self.businessController.getImportStatusIdList(context, onSuccess, onError);
  };
  CustomerGroups_PresentationController.prototype.fetchFeaturesAndActionsForGroup = function (context) {
      var self = this;
      self.presentUserInterface('frmGroups', {
        "LoadingScreen": {
          focus: true
        }
      });

      function onCustomersCompletionCallBack(response) {
        self.clearToDefault();
        self.showCustomerGroupsScreen({"fetchFeaturesAndActions":response});
        self.presentUserInterface('frmGroups', {
          "LoadingScreen": {
            focus: false
          }
        });
      }

      function onError(error) {
        self.presentUserInterface('frmGroups', {
          "LoadingScreen": {
            focus: false
          }
        });
         self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
      }
      self.businessController.getGroupFeaturesAndActions(context, onCustomersCompletionCallBack, onError);
    };
  /*
   * To fetch all features and actions while creating a new customer role
   */
  CustomerGroups_PresentationController.prototype.fetchAllFeaturesAndActions = function (typeId,allFeaturesAndActionsParam) {
    var self = this;
    var payload = {};
    if(typeId)
      payload = {"roleTypeId":typeId,
                "legalEntityId" : allFeaturesAndActionsParam};
    self.presentUserInterface('frmGroups', {
      "LoadingScreen": {
        focus: true
      }
    });

    function onCompletionCallBack(response) {
      self.showCustomerGroupsScreen({"allFeaturesAndActions":response.groups});
      /* self.presentUserInterface('frmGroups', {
        "LoadingScreen": {
          focus: false
        }
      }); */
    }

    function onError(error) {
      self.presentUserInterface('frmGroups', {
        "LoadingScreen": {
          focus: false
        }
      });
      self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
    }
    self.businessController.getAllFeaturesAndActions(payload, onCompletionCallBack, onError);
  };
  /* 
  * To fetch all and assigned features/actions for copying customer role
  */
  CustomerGroups_PresentationController.prototype.fetchFeaturesAndActionsForCopy = function (context,param) {
    var self = this;
    self.presentUserInterface('frmGroups', {
      "LoadingScreen": {
        focus: true
      }
    });
    var promiseGetGroupFeatures = Promisify(this.businessController, 'getFeaturesAndActionsForEdit');
    var promiseGetAllFeatures = Promisify(this.businessController, 'getAllFeaturesAndActions');
    Promise.all([
      promiseGetGroupFeatures(param.features),
      promiseGetAllFeatures({})
    ]).then(function (responses) {
      self.showCustomerGroupsScreen({"context":context,
                                     "featuresOfGroup":responses[0].features,
                                     "allFeatures": responses[1].groups,
                                    });
      self.presentUserInterface('frmGroups', {
        "LoadingScreen": {
          focus: false
        }
      });
    }).catch(function (error) {
      self.presentUserInterface('frmGroups', {
        "LoadingScreen": {
          focus: false
        }
      });
      self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
    });
  };
    /*
   * To fetch allbusiness types while creating a new customer role
   */
  CustomerGroups_PresentationController.prototype.fetchRoleBusinessTypes = function () {
    var self = this;
    self.presentUserInterface('frmGroups', {
      "LoadingScreen": {
        focus: true
      }
    });

    function onCompletionCallBack(response) {
      self.showCustomerGroupsScreen({"roleBusinessTypes":response.BusinessTypeRecords});
      self.presentUserInterface('frmGroups', {
        "LoadingScreen": {
          focus: false
        }
      });
    }

    function onError(error) {
      self.presentUserInterface('frmGroups', {
        "LoadingScreen": {
          focus: false
        }
      });
      self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
    }
    self.businessController.getBusinessTypes({}, onCompletionCallBack, onError);
  };
  
      /*
   * To fetch all service definitions while creating a new customer role
   */
  CustomerGroups_PresentationController.prototype.fetchRoleServiceDefinitions = function (roletype,legalEntity,typeValue) {
    var self = this;
    var payload = {};
    if(typeValue){
      if(typeValue === "edit"){
        payload = { 
          "typeId" : roletype,
          "legalEntityId":legalEntity
        };
      }
      if(typeValue === "create"){
        payload = {
          "legalEntityId":legalEntity
        };
      }
    }
    self.presentUserInterface('frmGroups', {
      "LoadingScreen": {
        focus: true
      }
    });

    function onCompletionCallBack(response) {
      self.showCustomerGroupsScreen({"roleServiceDefinitions": response.ServiceDefinitionRecords});
      /* self.presentUserInterface('frmGroups', {
        "LoadingScreen": {
          focus: false
        }
      }); */
    }

    function onError(error) {
      self.presentUserInterface('frmGroups', {
        "LoadingScreen": {
          focus: false
        }
      });
      self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
    }
    self.businessController.getServiceDefinitions(payload, onCompletionCallBack, onError);
  };
      /*
   * To fetch all group business types customers while editing a customer role
   */
  CustomerGroups_PresentationController.prototype.fetchGroupBusinessTypeCustomers = function () {
    var self = this;
    self.presentUserInterface('frmGroups', {
      "LoadingScreen": {
        focus: true
      }
    });

    function onCompletionCallBack(response) {
      self.showCustomerGroupsScreen({"groupBusinessTypeCustomersRecords":response.GroupBusinessTypeCustomersRecords});
      self.presentUserInterface('frmGroups', {
        "LoadingScreen": {
          focus: false
        }
      });
    }

    function onError(error) {
      self.presentUserInterface('frmGroups', {
        "LoadingScreen": {
          focus: false
        }
      });
      self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
    }
    self.businessController.getGroupBusinessTypeCustomers({}, onCompletionCallBack, onError);
  };
  
 CustomerGroups_PresentationController.prototype.getAccessPolicies = function() {
     var self = this;
    function onCompletionCallBack(response) {
     self.accessPolicyList = response.AccessPolicyRecords;
     self.presentUserInterface("frmGroups", {
       "accessPolicies": response.AccessPolicyRecords
     });
   }
   function onError(error) {
     self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
   }

   if(self.accessPolicyList.length === 0){
     self.businessController.getAccessPolicies({}, onCompletionCallBack, onError);
   }else{
     onCompletionCallBack({"AccessPolicyRecords":self.accessPolicyList});

   }
   };
     
    return CustomerGroups_PresentationController;
});