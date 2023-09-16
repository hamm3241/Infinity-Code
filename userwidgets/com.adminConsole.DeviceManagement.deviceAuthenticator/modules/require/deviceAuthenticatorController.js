define(['./deviceAuthenticatorDAO','Sorting_FormExtn','AdminConsoleCommonUtilities'],function(deviceAuthenticatorDAO, SortingFormExtn, AdminConsoleCommonUtilities) {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.deviceAuthenticatorDAO = new deviceAuthenticatorDAO();
      this._index;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
            defineGetter(this, 'getAuthenticatorsObjectServiceName', () => {
                return this._getAuthenticatorsObjectServiceName;
            });
            defineSetter(this, 'getAuthenticatorsObjectServiceName', value => {
                this._getAuthenticatorsObjectServiceName = value;
            });
            defineGetter(this, 'getAuthenticatorsObjectName', () => {
                return this._getAuthenticatorsObjectName;
            });
            defineSetter(this, 'getAuthenticatorsObjectName', value => {
                this._getAuthenticatorsObjectName = value;
            });
            defineGetter(this, 'getAuthenticatorsVerbName', () => {
                return this._getAuthenticatorsVerbName;
            });
            defineSetter(this, 'getAuthenticatorsVerbName', value => {
                this._getAuthenticatorsVerbName = value;
            });
    },

    deviceAuthenticatorPreShow: function() {
      this.setFlowActions();
      this.setPropertiesValueToWidget();
    },

    resetFieldsOnPreShow: function() {
      this.view.segDeviceAuth.setData([]);
      this.sortBy = SortingFormExtn.getObjectSorter("lblName.text");
    },

    setFlowActions: function() {
      var scopeObj = this;
/*
      scopeObj.view.fontIconFriendlyNameSort.onClick = function(){
        scopeObj.sortList("lblName.text", scopeObj.view.segDeviceAuth, scopeObj.resetSortIcons);
      };
      scopeObj.view.fontIconDeviceIdSort.onClick = function(){
        scopeObj.sortList("lblDeviceId.text", scopeObj.view.segDeviceAuth, scopeObj.resetSortIcons);
      };
*/
      scopeObj.view.segDeviceAuth.onRowClick = function(widget, sectionIndex, rowIndex){
        let segData = widget.data;
        let rowData = segData[rowIndex];
        let rawData = rowData.rawData;
        kony.print("Selected Authenticator: "+JSON.stringify(rawData))
        let info =
            "<b>Authenticator Id :</b> "+(rawData.id ? rawData.id : "Not Available")+"\n"+
            "<b>Authenticator Name :</b> "+(rawData.name ? rawData.name : "Not Available")+"\n"+
            "<b>Resource Type :</b> "+(rawData.resourceType ? rawData.resourceType : "Not Available")+"\n"+
            "<b>Status :</b> "+(rawData.status ? rawData.status : "Not Available")+"\n"+
            "<b>Is Active :</b> "+(rawData.isActive ? rawData.isActive : "Not Available")+"\n"+
            "<b>Successful Count :</b> "+(rawData.successfulCount ? rawData.successfulCount : "Not Available")+"\n"+
            "<b>Failure Count :</b> "+(rawData.failureCount ? rawData.failureCount : "Not Available")+"\n"+
            "<b>Maximum Number of Usages :</b> "+(rawData.maximumNumberOfUsages ? rawData.maximumNumberOfUsages : "Not Available")+"\n"+
            "<b>Last Successful Login :</b> "+(rawData.lastSuccessfulLogin ? rawData.lastSuccessfulLogin : "Not Available")+"\n"+
            "<b>Last Failed Login :</b> "+(rawData.lastFailedLogin ? rawData.lastFailedLogin : "Not Available")+"\n"+
            "<b>Start Date :</b> "+(rawData.startDate ? rawData.startDate : "Not Available")+"\n"+
            "<b>Expiry Date :</b> "+(rawData.expiryDate ? rawData.expiryDate : "Not Available");
        let context = {
          informationPopup : {
            model : {
              header : "AUTHENTICATOR DETAILS",
              message : info,
              confirmMsg : "Ok"
            }
          }
        }
        scopeObj.formUpdateUI(context);
      };
      
      scopeObj.view.selectOptions.flxOption1.onClick = function(){
        if(scopeObj.view.selectOptions.lblOption1.text==="Revoke"){
          scopeObj.revokeDevice();
        }
      };
      scopeObj.view.selectOptions.flxOption2.onClick =function(){
        if(scopeObj.view.selectOptions.lblOption2.text==="Suspend"){
          scopeObj.suspendDevice();
        }
         if(scopeObj.view.selectOptions.lblOption2.text==="Active"){
          scopeObj.activateDevice();
        }
          
      }
      this.view.selectOptions.onHover = scopeObj.onHoverEventCallback;
    },

    willUpdateUI: function(context) {
      kony.print(context+"");
      if(context){
        if(context.action){
          if(context.action===this._getAuthenticatorsVerbName)
          {
            this.formUpdateUI({ "LoadingScreen": { focus: false } });
            if(context.result === "Success"){
              if(context.authenticators.length){
                this.setAuthDevices(context.authenticators);
                this.view.flxNoResultFound.setVisibility(false);
                this.view.flxAuthContainer.setVisibility(true);
              }else{
                this.view.flxNoResultFound.setVisibility(true);
                this.view.flxAuthContainer.setVisibility(false);
              }
              this.formUpdateUI({"forceLayout" : true});
            } else{
              let toastMsgContext = { 
                "toastModel": { 
                  "message": "Failed to get Authenticators",
                  "status" : "Failed"
                } 
              };
              this.formUpdateUI(toastMsgContext);
            }
          }
          if(context.action==="UpdateDeviceStatus")
          {
            this.fetchAuthDevices();
            this.formUpdateUI({toastModel : {status : "SUCCESS", message: "Device Status Updated Successfully"}});
          }
          if(context.action==="DeleteDevice")
          {
            this.fetchAuthDevices();
            this.formUpdateUI({toastModel : {status : "SUCCESS", message: "Device Revoked Successfully"}});

          }
        }
      }
    },

    setAuthDevices: function(authDevices){
      var self = this, segData = [];
      segData = authDevices.map(function(data){
        return {
          rawData: data,
          lblName: {
            text: (data.name)!==""?data.name:"NA"
          },
          lblActive: {
            text: (data.isActive)!==""?data.isActive:"NA"
          },
          /*lblDeviceId: {
            text: data.id,
          },
          lblCopy: {
            text: "\ue907",
            onClick: self.copyText
          },*/
          lblSeparator: {
            text: "-",
          },
          lblStatus: {
            text: data.status !== "" ? data.status : "NA"
          },
          lblStartDate: {
            text: data.startDate !== ""? data.startDate : "NA"
          },
          lblExpiryDate: {
            text: (data.expiryDate !== "" && data.expiryDate !== undefined && data.expiryDate !== null) ? data.expiryDate : "NA"
          },
          flxOptions: {
          "skin": "sknFlxBorffffff1pxRound",
          "onclick": self.flxOptionsOnClick,
          "isVisible": true
        },
        lblOptions: {
          "text": "\ue91f",
          "skin" : "sknFontIconOptionMenu"
          }/*,


          flxDeviceId:{
            onHover: function(widget, context){
              var selItems = self.view.segDeviceAuth.data[context.rowIndex];
              if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
                // selItems.flxCopy.isVisible = true;
              } else if(context.eventType === constants.ONHOVER_MOUSE_LEAVE){
                selItems.flxCopy.isVisible = false;
              }
              self.view.segDeviceAuth.setDataAt(selItems, context.rowIndex);
              self.view.forceLayout();
            }
          },
          flxCopy: {
            isVisible: false,
            onClick: self.copyText
          }        
          */
        };
      });
      //this.sortBy = SortingFormExtn.getObjectSorter("lblName.text");
      this.view.segDeviceAuth.setData(segData);
    },
    
    copyText: function(){
      var selItems = this.view.segDeviceAuth.selectedItems[0];
      AdminConsoleCommonUtilities.AdminConsoleCommonUtils.copyTextToClipboard(selItems.lblDeviceId.text);
    },

    sortList : function (sortColumn, segment, resetIcon) {
      var segData = segment.data;
      this.sortBy.column(sortColumn);
      segData = segData.sort(this.sortBy.sortData);
      resetIcon();
      segment.setData(segData);
    },

    resetSortIcons : function() {
      SortingFormExtn.determineSortFontIcon(this.sortBy,'lblName.text',this.view.fontIconFriendlyNameSort);
      SortingFormExtn.determineSortFontIcon(this.sortBy,'lblDeviceId.text',this.view.fontIconDeviceIdSort);
    },


    fetchAuthenticators: function(userId){
      this.formUpdateUI({ "LoadingScreen": { focus: true } });
      let serviceDetails = {
        "objServiceName" : this._getAuthenticatorsObjectServiceName,
        "objName" : this._getAuthenticatorsObjectName,
        "operationName" : this._getAuthenticatorsVerbName,
        "payload" : {"userId": userId} 
      }
      this.deviceAuthenticatorDAO.deviceAuthenticatorOperations(serviceDetails,
                                                                this.willUpdateUI,);
    },
    
    flxOptionsOnClick:function(type)
    {
       var self = this;
      var top = 0;
      var left = 0;
      self.view.selectOptions.flxSelectOptionsInner.top = "-1px";
      self.view.selectOptions.flxArrowImage.setVisibility(true);
      self.view.selectOptions.flxDownArrowImage.setVisibility(false);
       this._index = self.view.segDeviceAuth.selectedRowIndex[1];
       var templateArray = self.view.segDeviceAuth.clonedTemplates;
      var contextualWidgetHeight = 96;
       for (var i = 0; i < this._index; i++) {
          top += templateArray[i].flxDeviceAuthenticator.frame.height-10;
        }
     if(this._index===0)
       {
         top=top-10;
       }
      var segmentWidget = this.view.segDeviceAuth;
      top = top  - segmentWidget.contentOffsetMeasured.y;
      if (top + contextualWidgetHeight > segmentWidget.frame.height) {
          //top - contextualWidgetHeight - height of 3 dots
          top = top - contextualWidgetHeight - 15;
          self.view.selectOptions.flxArrowImage.setVisibility(false);
          self.view.selectOptions.flxDownArrowImage.setVisibility(true);
          self.view.selectOptions.flxSelectOptionsInner.top = "0px";
        }
        //top + extra top height from select option widget - padding from bottom of option 3 dots
        top = top + 122 - 13 + "px";
        //left of option 3 dots + width of select option widget - extra padding arrow postion to option 3 dots
        //left = templateArray[this._index].flxOptions.frame.x - 140 + 35 + "px";
      	left = templateArray[this._index].flxOptions.frame.x - 140 + 35 + "px";
      if ((self.view.selectOptions.isVisible === false) || (self.view.selectOptions.isVisible === true && self.view.selectOptions.top !== top)) {
        self.view.selectOptions.top = top;
        self.view.selectOptions.left = left;
        self.view.selectOptions.setVisibility(true);
        self.view.selectOptions.onHover = self.onHoverEventCallback;
      }
      else {
        self.view.selectOptions.setVisibility(false);
      }
      self.view.forceLayout();
      
      
      var dataArray = self.view.segDeviceAuth.data;
      var selectedData = dataArray[this._index];
      if(selectedData.status ==="Active"||selectedData.status==="ACTIVE"){
        this.view.selectOptions.fontIconOption1.text="\ue961";
        this.view.selectOptions.lblOption1.text ="Revoke";
        this.view.selectOptions.fontIconOption2.text ="\ue91d";
        this.view.selectOptions.lblOption2.text="Suspend"
      }else {
        this.view.selectOptions.fontIconOption1.text="\ue961";
        this.view.selectOptions.lblOption1.text ="Revoke";
        this.view.selectOptions.fontIconOption2.text ="\ue96e";
        this.view.selectOptions.lblOption2.text="Active"
      }
      
    },
    
	revokeDevice:function(data){
      kony.print("Revoke Device");
      /*var self =this;
      var dataArray = self.view.segDeviceAuth.data;
      var selItems = dataArray[this._index];
      var Payload = {"id":selItems.id}
      var confirmAction = function(){
        self.deviceAuthenticatorDAO.deviceAuthenticatorOperations("CustomerManagementObjService","CustomerDevice","DeleteDevice",Payload,self.willUpdateUI,null);
      
      };
      var cancelAction = function(){};
       var formInstance = kony.application.getCurrentForm();
      AdminConsoleCommonUtilities.AdminConsoleCommonUtils.openConfirmforComponent({
        header: 'Revoke '+((selItems.friendlyName)?selItems.friendlyName:'NA'),
        message: 'Are you sure to revoke the device "'+ selItems.friendlyName +'"?.\nYou cannot perfom any online banking activities on this device.',
        confirmAction: confirmAction,
        cancelMsg: 'NO',
        cancelAction: cancelAction,
 		confirmMsg: 'REVOKE',

      }, formInstance);
      */
    },
    suspendDevice:function(){
      kony.print("Suspend Device");
      /*
 	  var self =this;
       var dataArray = self.view.segDeviceAuth.data;
      var selItems = dataArray[this._index];
       var Payload = {"id":selItems.id,"isActive":false}
      var confirmAction = function(){
        self.deviceAuthenticatorDAO.deviceAuthenticatorOperations("CustomerManagementObjService","CustomerDevice","UpdateDeviceStatus",Payload,self.willUpdateUI,null);
      
      };
      var cancelAction = function(){};
      var formInstance = kony.application.getCurrentForm();
      AdminConsoleCommonUtilities.AdminConsoleCommonUtils.openConfirmforComponent({
        header: 'Suspend '+((selItems.friendlyName)?selItems.friendlyName:'NA'),
        message: 'Are you sure to suspend the device "'+ selItems.friendlyName +'"?. You cannot perfom any online activities on this device.',
        confirmAction: confirmAction,
        cancelMsg: 'NO',
        cancelAction: cancelAction,
        confirmMsg: 'SUSPEND',

      }, formInstance);
      */
    },
    activateDevice:function(){
      kony.print("Activate Device");
      /*
      var self =this;
      var dataArray = self.view.segDeviceAuth.data;
      var selItems = dataArray[this._index];
       var Payload = {"id":selItems.id,"isActive":true}
      var confirmAction = function(){
        self.deviceAuthenticatorDAO.deviceAuthenticatorOperations("CustomerManagementObjService","CustomerDevice","UpdateDeviceStatus",Payload,self.willUpdateUI,null);
      
      };
      var cancelAction = function(){};
      var formInstance = kony.application.getCurrentForm();
      AdminConsoleCommonUtilities.AdminConsoleCommonUtils.openConfirmforComponent({
        header: 'Activate '+((selItems.friendlyName)?selItems.friendlyName:'NA'),
        message: 'Are you sure activate the device "'+ selItems.friendlyName +'"?. You can perfom all online activities on this device.',
        confirmAction: confirmAction,
        cancelMsg: 'NO',
        cancelAction: cancelAction,
        confirmMsg: 'ACTIVATE',

      }, formInstance);
      */
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
    setPropertiesValueToWidget: function() {
    },
  };
});