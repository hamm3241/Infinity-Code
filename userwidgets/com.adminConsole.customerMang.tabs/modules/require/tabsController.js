define(['AdminConsoleCommonUtilities'],function(adminUtils){

  return{
    setSkinForInfoTabs: function(btnWidget) {
      var widgetArray = [this.view.btnTabName1,
                         this.view.btnTabName2,
                         this.view.btnTabName3,
                         this.view.btnTabName4,
                         this.view.btnTabName5,
                         this.view.btnTabName6,
                         this.view.btnTabName7,
                         this.view.btnTabName8,
                         this.view.btnTabName9,
                         this.view.btnTabName10];

      require('TabUtil_FormExtn').tabUtilButtonFunction(widgetArray, btnWidget);
    },
    setFlowActions: function(){
      var scopeObj = this;
      var CustomerManagementPresentation = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule").presentationController;
      this.view.btnTabName1.onClick = function(){
        scopeObj.setSkinForInfoTabs(scopeObj.view.btnTabName1);
        CustomerManagementPresentation.navigateToContactsTab();
      };
      this.view.btnTabName2.onClick = function(){
        scopeObj.setSkinForInfoTabs(scopeObj.view.btnTabName2);
        CustomerManagementPresentation.navigateToAccountsTab();
      };
      this.view.btnTabName3.onClick = function(){
        scopeObj.setSkinForInfoTabs(scopeObj.view.btnTabName3);
        CustomerManagementPresentation.navigateToHelpCenterTab();
      };
      this.view.btnTabName4.onClick = function(){
        scopeObj.setSkinForInfoTabs(scopeObj.view.btnTabName4);
        CustomerManagementPresentation.navigateToContractsTab();
      };
      this.view.btnTabName5.onClick = function(){
        scopeObj.setSkinForInfoTabs(scopeObj.view.btnTabName5);
        CustomerManagementPresentation.navigateToEntitlementsTab();
      };
      this.view.btnTabName6.onClick = function(){
        scopeObj.setSkinForInfoTabs(scopeObj.view.btnTabName6);
        CustomerManagementPresentation.navigateToActivityHistoryTab();
      };
      this.view.btnTabName7.onClick = function(){
        scopeObj.setSkinForInfoTabs(scopeObj.view.btnTabName7);
        CustomerManagementPresentation.navigateToAlertHistoryTab();
      };
      this.view.btnTabName8.onClick = function(){
        scopeObj.setSkinForInfoTabs(scopeObj.view.btnTabName8);          
        CustomerManagementPresentation.navigateToDeviceInfoTab();
      };
      this.view.btnTabName9.onClick = function(){
        scopeObj.setSkinForInfoTabs(scopeObj.view.btnTabName9);          
        CustomerManagementPresentation.navigateToDueDiligenceTab();
      };
      this.view.btnTabName10.onClick = function(){
        scopeObj.setSkinForInfoTabs(scopeObj.view.btnTabName10);          
        CustomerManagementPresentation.navigateToLimitsTab();
      };
      this.view.flxLeftArrow.onClick = function(){
        scopeObj.view.lblRightArrow.skin="sknIcon12px003E75";
        scopeObj.view.lblLeftArrow.skin="sknIcon70727912px";
        scopeObj.view.flxLeftArrow.setEnabled(false);
        scopeObj.view.flxRightArrow.setEnabled(true);
        var tabsDataToShow=scopeObj.view.flxLeftArrow.info.data;
        for(let x=0;x<tabsDataToShow.length;x++)
          scopeObj.view[tabsDataToShow[x]].setVisibility(true);
        var tabsDataToHide=scopeObj.view.flxRightArrow.info.data;
        for(let y=0;y<tabsDataToHide.length;y++)
          scopeObj.view[tabsDataToHide[y]].setVisibility(false);
        scopeObj.view.forceLayout();
      };
      this.view.flxRightArrow.onClick = function(){
        scopeObj.view.lblLeftArrow.skin="sknIcon12px003E75";
        scopeObj.view.flxLeftArrow.setEnabled(true);
        scopeObj.view.lblRightArrow.skin="sknIcon70727912px";
        scopeObj.view.flxRightArrow.setEnabled(false);
        var tabsDataToShow=scopeObj.view.flxRightArrow.info.data;
        for(let x=0;x<tabsDataToShow.length;x++)
          scopeObj.view[tabsDataToShow[x]].setVisibility(true);
        var tabsDataToHide=scopeObj.view.flxLeftArrow.info.data;
        for(let y=0;y<tabsDataToHide.length;y++)
          scopeObj.view[tabsDataToHide[y]].setVisibility(false);
        scopeObj.view.forceLayout();
      };
    },
    setCustomerProfileTabs: function(formInstance) {
      var tabsList = ["btnTabName1", "btnTabName2", "btnTabName6","btnTabName3", "btnTabName4", "btnTabName5", "btnTabName10", "btnTabName7", "btnTabName8"];
      var tabsToShow = [];
      var screenWidth = kony.os.deviceInfo().screenWidth;
      var parentWidth = screenWidth - 305 - 70 - 40; //screenwidth-leftmenu-main screen padding-inner tabs padding
      var tabsWidth = 0;
      var nextTabs = [];
      var isFirstTime = true;
      if (formInstance.view.tabs.btnTabName9.isVisible) tabsList.splice(1, 0, "btnTabName9"); //to insert tab9 at index 1
      for (let x = 0; x < tabsList.length; x++) {
        tabsWidth = tabsWidth + adminUtils.AdminConsoleCommonUtils.getLabelWidth(tabsList[x], "12px Lato-Semibold") + 20;
        if (tabsWidth < parentWidth) tabsToShow.push(tabsList[x]);
        else {
          if (isFirstTime) {
            isFirstTime = false;
            parentWidth = parentWidth - 100;
            x = x - 3;
            tabsToShow.splice(tabsToShow.length - 2, 2);
          } else nextTabs.push(tabsList[x]);
        }
      }
      if (nextTabs.length > 0) {
        this.view.flxTabs.width = parentWidth + "dp";
        this.view.flxTabs.left = "50px";
        this.view.flxLeftArrow.setVisibility(true);
        this.view.lblLeftArrow.skin = "sknIcon70727912px";
        this.view.flxLeftArrow.setEnabled(false);
        this.view.lblRightArrow.skin = "sknIcon12px003E75";
        this.view.flxRightArrow.setVisibility(true);
        this.view.flxRightArrow.info = {
          "data": nextTabs
        };
        this.view.flxLeftArrow.info = {
          "data": tabsToShow
        };
      } else {
        this.view.flxTabs.width = "100%";
        this.view.flxTabs.left = "0px";
        this.view.flxLeftArrow.setVisibility(false);
        this.view.flxRightArrow.setVisibility(false);
      }
      for (var y = 0; y < tabsToShow.length; y++) {
        this.view[tabsToShow[y]].setVisibility(true);
      }
      for (var z = 0; z < nextTabs.length; z++) {
        this.view[nextTabs[z]].setVisibility(false);
      }

      this.view.forceLayout();
    }
  };
});