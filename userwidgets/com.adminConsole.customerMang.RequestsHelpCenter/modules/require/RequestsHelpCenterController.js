define(function() {
	return {
       setFlowActions:function(){
          var scopeObj = this;
          this.view.tbxSearchBox.onTouchStart = function(){
            scopeObj.view.flxSearchContainer.skin ="slFbox0ebc847fa67a243Search";
          };
         this.view.tbxSearchBox.onEndEditing = function(){
           scopeObj.view.flxSearchContainer.skin ="sknflxd5d9ddop100";
         };
         this.view.backToPageHeader.btnBack.onClick = function(){
           scopeObj.view.flxRequestsOnClick.setVisibility(false);
           scopeObj.view.flxSegmentData.setVisibility(true);
           scopeObj.view.flxHeadingFilters.setVisibility(true);
           kony.application.getCurrentForm().forceLayout();
           kony.application.getCurrentForm().flxMainContent.scrollToWidget(kony.application.getCurrentForm().flxOtherInfoWrapper);
         };
         this.view.flxRequestStatusFilter.onHover = function(widget, context){
           if (context.eventType == constants.ONHOVER_MOUSE_LEAVE) {
             scopeObj.view.flxRequestStatusFilter.setVisibility(false);
           }
         };
       },
       setUIForRequestAndNotification: function (tab) {
          var self = this;
          kony.application.getCurrentForm().flxMessageSegContainer.setVisibility(false);
          kony.application.getCurrentForm().flxRequestAndNotificationList.setVisibility(true);
          self.view.flxHeadingFilters.setVisibility(true);
          self.view.flxSegmentData.setVisibility(true);
          self.view.flxRequestsOnClick.setVisibility(false);
          self.view.flxRequestStatusFilter.setVisibility(false);
          self.enableTabButtons();
          if (tab === 1) {         //requests tab
              kony.application.getCurrentForm().btnRequestTab.setEnabled(false);
              kony.application.getCurrentForm().btnRequestTab.skin = "sknbtnBgffffffLato485c75Radius3Px12Px";
              self.view.lblHeadingFilter.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Customer_Requests");
              self.view.flxRequestSegHeader.setVisibility(true);
              self.view.flxRequestsSeg.setVisibility(true);
              self.view.flxnotificationSegHeader.setVisibility(false);
              self.view.flxNotificationSegHC.setVisibility(false);
            
              self.view.backToPageHeader.btnBack.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Back_to_Requests");
              self.view.lblIdHeading.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Request_Id");
              self.view.detailsRow1.lblHeading1.text = kony.i18n.getLocalizedString("i18n.Group.TYPE");
              self.view.detailsRow1.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CARD");
              self.view.detailsRow1.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CARD_NUMBER");
              self.view.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.DATE_REQUESTED");
              self.view.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.REASON_FOR_REPLACEMENT");
              self.view.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.DELIVERY_MODE");
              self.view.lblHeadingRow3Col1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.DELIVERY_DETAILS");
          } else if (tab === 2) {        //Notifications tab
              kony.application.getCurrentForm().btnNotificationsTab.setEnabled(false);
              kony.application.getCurrentForm().btnNotificationsTab.skin = "sknbtnBgffffffLato485c75Radius3Px12Px";
              self.view.lblHeadingFilter.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Customer_Notifications");
              self.view.flxnotificationSegHeader.setVisibility(true);
              self.view.flxNotificationSegHC.setVisibility(true);
              self.view.flxRequestSegHeader.setVisibility(false);
              self.view.flxRequestsSeg.setVisibility(false);
            
              self.view.backToPageHeader.btnBack.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Back_to_Notifications");
              self.view.lblIdHeading.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Request_Id");
              self.view.detailsRow1.lblHeading1.text = kony.i18n.getLocalizedString("i18n.Group.TYPE");
              self.view.detailsRow1.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.PLANNED_DEPARTURE_DATE");
              self.view.detailsRow1.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.PLANNED_RETURN_DATE");
              self.view.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CARDS");
              self.view.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.DESTINATIONS_TRAVELLING_TO");
              self.view.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CONTACT_NUMBER");
              self.view.lblHeadingRow3Col1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ADDITIONAL_NOTES");
          }
  },
      enableTabButtons : function(){
        kony.application.getCurrentForm().btnNotificationsTab.setEnabled(true);
        kony.application.getCurrentForm().btnRequestTab.setEnabled(true);
        kony.application.getCurrentForm().btnMessagesTab.setEnabled(true);
      },
       requestHelpCenterPreshow : function(){
         this.setFlowActions();
       }
	};
});