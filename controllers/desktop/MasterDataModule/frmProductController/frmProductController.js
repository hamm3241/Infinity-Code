define({
  
  productsList:[],
  allProductsList:[],
  inFilter:false,
  addProductComponentContext:{
    "isNewProduct":false,
    "isEdit":false,
    "editProductData":{}
  },
  
  preShowActions: function() {
    const scopeObj = this;
    this.setflowActions();
    let configurationSvc = kony.sdk.getCurrentInstance().getConfigurationService();
    configurationSvc.getAllClientAppProperties(function(response) {
      if(response && response.MARKETING_CATALOG_CONFIG && response.MARKETING_CATALOG_CONFIG.toUpperCase()==="FALSE"){
        scopeObj.view.mainHeader.flxButtons.setVisibility(false);
      } else {
        scopeObj.view.mainHeader.flxButtons.setVisibility(true);
      }
    },function(){});   
    this.view.mainHeader.flxButtons.right = this.view.flxSettings.isVisible? "100px" : "35px";
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.mainHeader.btnDropdownList.setVisibility(true);
    this.view.mainHeader.btnDropdownList.text = "ADD PRODUCT";
    this.view.mainHeader.btnDropdownList.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
    this.view.mainHeader.btnDropdownList.hoverSkin = "sknBtn005198LatoRegular13pxFFFFFFRad20px";
    this.setPreshowData();
    this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.frmProductController.BANKING_PRODUCT_MANAGEMENT");
    this.view.flxBreadCrumb.setVisibility(false);
    this.view.flxManageProducts.setVisibility(false);
    this.view.flxAddProducts.setVisibility(false); 
  },

  shouldUpdateUI: function(viewModel) {
    return viewModel !== undefined && viewModel !== null;
  },

  willUpdateUI: function(productsModel) {
    this.updateLeftMenu(productsModel);
    if(productsModel && productsModel.context === "error") {
      this.view.flxProductList.setVisibility(false);
      this.view.toastMessage.showErrorToastMessage(productsModel.message, this);
    }
    if(productsModel){
      if (productsModel.toastModel) {
        if (productsModel.toastModel.status === "success") {
          this.view.toastMessage.showToastMessage(productsModel.toastModel.message, this);
          kony.adminConsole.utils.hideProgressBar(this.view);
        } else {
          this.view.toastMessage.showErrorToastMessage(productsModel.toastModel.message, this);
          kony.adminConsole.utils.hideProgressBar(this.view);
        }
      }
      if(productsModel.progressBar && productsModel.progressBar.show) {
        if (productsModel.progressBar.show === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"))
          kony.adminConsole.utils.showProgressBar(this.view);
        else
          kony.adminConsole.utils.hideProgressBar(this.view);
      } 
      if(productsModel.action) {
        if(productsModel.action === "getProducts") {
          this.showViewProducts();
        }
        else if(productsModel.action === "setBreadCrumbText") {
          this.setBreadCrumbText(productsModel.text);
        }
        else if(productsModel.action === "alignProductPopup") {
          this.alignProductPopup(productsModel);
          this.adjustSignoutDropdown(productsModel.openPopup);
        }
        else if(productsModel.action === "showEditProduct") {
          this.showEditProduct(productsModel.payload);
        }
        else if(productsModel.action === "showProductDetails") {
          this.showProductDetails(productsModel);
        } 
        else if(productsModel.action === "adjustSignoutDropdown"){
          this.adjustSignoutDropdown(productsModel.isPopupOpen);
        }
      }
    }
    this.view.forceLayout();
  },

  setflowActions: function() {
    var scopeObj = this;
    this.view.flxSettings.onClick = function() {
      scopeObj.view.settingsMenu.setVisibility(!scopeObj.view.settingsMenu.isVisible);
    };
    this.view.settingsMenu.onHover = scopeObj.onHoverEventCallback;
    this.view.settingsMenuOptions.flxOption1.onClick = function() {
      scopeObj.showManageProduct();
    };
    this.view.breadcrumbs.btnBackToMain.onClick = function() {
      scopeObj.showViewProducts();
    };
    this.view.mainHeader.btnDropdownList.onClick = function(){
      scopeObj.showAddProduct();
    };
  },

  onHoverEventCallback:function(widget, context) {
    var scopeObj = this;
    var widGetId = widget.id;
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      scopeObj.view[widGetId].setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      scopeObj.view[widGetId].setVisibility(false);
    }
  },

  alignProductPopup: function(context){
    if(context.openPopup){
      this.view[context.flxProduct].left = "0px";
      this.view[context.flxProduct].right = "0px";
      this.view[context.flxProduct].top = "0px";
      this.view.flxLoading.left = "0px";
    }
    else{
      this.view[context.flxProduct].left = "340px";
      this.view[context.flxProduct].right = "35px";
      this.view[context.flxProduct].top = context.top || "146px";
      this.view.flxLoading.left = "305px";
    }
    this.view.forceLayout();
  },

  alignAddProductPopups: function(openPopup){
    // Method invoked by 'alignPopups' Event of 'addProduct' Component
    if(openPopup){
      this.view.flxAddProducts.left = "0px";
      this.view.flxAddProducts.right = "0px";
      this.view.flxAddProducts.top = "0px";
      this.view.flxLoading.left = "0px";
    }
    else{
      this.view.flxAddProducts.left = "340px";
      this.view.flxAddProducts.right = "35px";
      this.view.flxAddProducts.top = "151px";
      this.view.flxLoading.left = "305px";
    }
    this.view.forceLayout();
  },
  
  setBreadCrumbText: function(text) {
    this.view.flxBreadCrumb.setVisibility(true);
    this.view.breadcrumbs.lblCurrentScreen.text = this.AdminConsoleCommonUtils.getEncodedTextInput(text);
  },

  setPreshowData: function() {
    this.view.flxMainHeader.setVisibility(true);
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
  },

  hideAll: function(){
    this.view.flxViewProducts.setVisibility(false);
    this.view.flxManageProducts.setVisibility(false);
    this.view.flxAddProducts.setVisibility(false);
    this.view.mainHeader.btnDropdownList.setVisibility(false);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.flxSettings.setVisibility(false);
    this.view.settingsMenu.setVisibility(false);
    this.view.flxBreadCrumb.setVisibility(false);
  },

  closeAddProductComponent: function(){
    // Fetch Products data again and populate to segment.
    this.showViewProducts();
  },

  showViewProducts: function() {
    this.hideAll();
    this.view.mainHeader.btnDropdownList.setVisibility(true);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    this.view.flxSettings.setVisibility(true);
    this.view.viewProducts.getProducts();
    this.view.flxViewProducts.setVisibility(true);
    this.view.flxViewProducts.top = "101px";
    this.adjustSignoutDropdown(false);
  },
  
  showProductDetails: function(context) {
    this.hideAll();
    this.view.flxViewProducts.top = "121px";
    this.view.flxViewProducts.setVisibility(true);
    this.view.flxBreadCrumb.setVisibility(true);
    this.view.breadcrumbs.lblCurrentScreen.text = this.AdminConsoleCommonUtils.getEncodedTextInput(context.breadCrumbText);
    this.view.breadcrumbs.btnBackToMain.text = "PRODUCT LIST";
    this.adjustSignoutDropdown(false);
  },

  showManageProduct: function() {
    this.hideAll();
    this.view.flxManageProducts.setVisibility(true);
    this.view.flxBreadCrumb.setVisibility(true);
    this.view.breadcrumbs.btnBackToMain.text = "PRODUCT LIST";
    this.view.manageProducts.getProductLinesGroupsFeatures();
    this.adjustSignoutDropdown(false);
  },

  showAddProduct: function(){
    // ADD_PRODUCT
    this.hideAll();
    this.view.flxAddProducts.setVisibility(true);
    this.view.flxBreadCrumb.setVisibility(true);
    this.view.breadcrumbs.btnBackToMain.text = "PRODUCT LIST";
    this.view.breadcrumbs.lblCurrentScreen.text = "ADD PRODUCTS";
    this.addProductComponentContext = {
      "isNewProduct":true,
      "isEdit":false,
      "editProductData":{}
    };
    this.view.addProduct.setContext(this.addProductComponentContext);
    this.adjustSignoutDropdown(false);
    this.view.forceLayout();
  },
  
  showEditProduct: function(payload){
    // EDIT_PRODUCT
    this.hideAll();
    this.view.flxAddProducts.setVisibility(true);
    this.view.flxBreadCrumb.setVisibility(true);
    this.view.breadcrumbs.btnBackToMain.text = "PRODUCT LIST";
    this.view.breadcrumbs.lblCurrentScreen.text = "EDIT PRODUCTS";
    this.addProductComponentContext = {
      "isNewProduct": false,
      "isEdit": true,
      "editProductData": payload
    };
    this.view.addProduct.setContext(this.addProductComponentContext);
    this.adjustSignoutDropdown(false);
    this.view.forceLayout();
  },
  adjustSignoutDropdown: function(productsModel){
    if(productsModel){ //decreasing zindex to not show on popup screen
      this.view.flxHeaderDropdown.zIndex = 4;
    }else{ //increaseing zindex to show above view,addProduct components
      this.view.flxHeaderDropdown.zIndex = 10;
    }
    this.view.forceLayout();
  }

});