define(['./userDeviceDetailsDAO','Sorting_FormExtn','AdminConsoleCommonUtilities'],function(userDeviceDetailsDAO, SortingFormExtn, AdminConsoleCommonUtilities) {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.userDevicesDAO = new userDeviceDetailsDAO();
      this._index;
      this._userId;
      this._selectedData;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
            defineGetter(this, 'getUserDevicesObjectServiceName', () => {
                return this._getUserDevicesObjectServiceName;
            });
            defineSetter(this, 'getUserDevicesObjectServiceName', value => {
                this._getUserDevicesObjectServiceName = value;
            });
            defineGetter(this, 'getUserDevicesObjectName', () => {
                return this._getUserDevicesObjectName;
            });
            defineSetter(this, 'getUserDevicesObjectName', value => {
                this._getUserDevicesObjectName = value;
            });
            defineGetter(this, 'getUserDevicesVerbName', () => {
                return this._getUserDevicesVerbName;
            });
            defineSetter(this, 'getUserDevicesVerbName', value => {
                this._getUserDevicesVerbName = value;
            });
            defineGetter(this, 'updateDeviceStatusObjectServiceName', () => {
                return this._updateDeviceStatusObjectServiceName;
            });
            defineSetter(this, 'updateDeviceStatusObjectServiceName', value => {
                this._updateDeviceStatusObjectServiceName = value;
            });
            defineGetter(this, 'updateDeviceStatusObjectName', () => {
                return this._updateDeviceStatusObjectName;
            });
            defineSetter(this, 'updateDeviceStatusObjectName', value => {
                this._updateDeviceStatusObjectName = value;
            });
            defineGetter(this, 'updateDeviceStatusVerbName', () => {
                return this._updateDeviceStatusVerbName;
            });
            defineSetter(this, 'updateDeviceStatusVerbName', value => {
                this._updateDeviceStatusVerbName = value;
            });
        },

    userDeviceDetailsPreShow: function() {
      this.setFlowActions();
    },

    resetFieldsOnPreShow: function() {
      this.view.segDeviceDetails.setData([]);
      this.sortBy = SortingFormExtn.getObjectSorter("lblName.text");
    },

    setFlowActions: function() {
      var scopeObj = this;
      /*
      scopeObj.view.fontIconFriendlyNameSort.onClick = function(){
        scopeObj.sortList("lblName.text", scopeObj.view.segDeviceDetails, scopeObj.resetSortIcons);
      };
      scopeObj.view.fontIconDeviceIdSort.onClick = function(){
        scopeObj.sortList("lblDeviceId.text", scopeObj.view.segDeviceDetails, scopeObj.resetSortIcons);
      };
*/    
      scopeObj.view.segDeviceDetails.onRowClick = function(widget, sectionIndex, rowIndex){
        let segData = widget.data;
        let rowData = segData[rowIndex];
        let rawData = rowData.rawData;
        kony.print("Selected Authenticator: "+JSON.stringify(rawData))
        let info =
            "<b>Device Id :</b> "+(rawData.id ? rawData.id : "Not Available")+"\n"+
            "<b>Device Friendly Name:</b> "+(rawData.friendlyName ? rawData.friendlyName : "Not Available")+"\n"+
			      "<b>Device Type :</b>"+(rawData.deviceType ? rawData.deviceType : "Not Available")+"\n"+
            "<b>Resource Type :</b> "+(rawData.resourceType ? rawData.resourceType : "Not Available")+"\n"+
            "<b>Status :</b> "+(rawData.status ? rawData.status : "Not Available")+"\n"+
            "<b>Is Active :</b> "+(rawData.isActive ? rawData.isActive : "Not Available")+"\n"+
            "<b>Registered On :</b> "+(rawData.registeredOn ? rawData.registeredOn : "Not Available")+"\n"+
            "<b>Start Date :</b> "+(rawData.startDate ? rawData.startDate : "Not Available")+"\n"+
            "<b>Expiry Date :</b> "+(rawData.expiryDate ? rawData.expiryDate : "Not Available");
        let context = {
          informationPopup : {
            model : {
              header : "USER DEVICE DETAILS",
              message : info,
              confirmMsg : "Ok"
            }
          }
        }
        scopeObj.formUpdateUI(context);
      }
      
      scopeObj.view.selectOptions.flxOption1.onClick = function(){
        if(scopeObj.view.selectOptions.lblOption1.text==="Revoke"){
          scopeObj.revokeDevice();
        }
      };
      scopeObj.view.selectOptions.flxOption2.onClick =function(){
        if(scopeObj.view.selectOptions.lblOption2.text==="Suspend"){
          scopeObj.suspendDevice();
        }
        if(scopeObj.view.selectOptions.lblOption2.text==="Unsuspend"){
          scopeObj.unsuspendDevice();
        }

      }
      this.view.selectOptions.onHover = scopeObj.onHoverEventCallback;
    },

    willUpdateUI: function(context) {
      kony.print(context+"");
      if(context){
        if(context.action){
          if(context.action===this._getUserDevicesVerbName)
          {
            this.formUpdateUI({ "LoadingScreen": { focus: false } });
            if(context.result === "Success"){
              if(context.userDevices.length){
                this.setDeviceDetails(context.userDevices);
                this.view.flxUserDeviceContainer.setVisibility(true);
      			this.view.flxNoResultFound.setVisibility(false);
              }else{
                this.view.flxNoResultFound.setVisibility(true);
                this.view.flxUserDeviceContainer.setVisibility(false);
              }
              this.formUpdateUI({"forceLayout" : true});
            } else{
              let toastMsgContext = { 
                "toastModel": { 
                  "message": "Failed to get User Devices",
                  "status" : "Failed"
                } 
              };
              this.formUpdateUI(toastMsgContext);
            }
          }
          if(context.action===this._updateDeviceStatusVerbName)
          {
            this.formUpdateUI({ "LoadingScreen": { focus: false } });
            this._selectedData = null;
            if(context.result === "Success"){
              let msg = "Sucessfully updated device status";
              if(context.payload.status == "SUSPEND")
                msg = "Successfully suspended device '"+context.payload.deviceName+"'";
              else if(context.payload.status == "UNSUSPEND")
                msg = "Successfully reactivated device '"+context.payload.deviceName+"'";
              else if(context.payload.status == "REVOKE")
                msg = "Successfully revoked device '"+context.payload.deviceName+"'";
              let toastMsgContext = { 
                "toastModel": { 
                  "message": msg,
                  "status" : "SUCCESS"
                }
              };
              this.formUpdateUI(toastMsgContext);
              this.fetchUserDevices(this._userId);
            }else{
              let msg = "Failed to update device status";
              if(context.payload.status == "SUSPEND")
                msg = "Failed to suspend device '"+context.payload.deviceName+"'";
              else if(context.payload.status == "UNSUSPEND")
                msg = "Failed to reactivate device '"+context.payload.deviceName+"'";
              else if(context.payload.status == "REVOKE")
                msg = "Failed to revoke device '"+context.payload.deviceName+"'";
              let toastMsgContext = { 
                "toastModel": { 
                  "message": msg,
                  "status" : "Failed"
                } 
              };
              this.formUpdateUI(toastMsgContext);
            }
          }
        }
      }
    },

    setDeviceDetails: function(userDevices){
      var self = this, segData = [];
      segData = userDevices.map(function(data){
        return {
          rawData: data,
          lblRegisteredOn: {
            text: (data.registeredOn)!==""?data.registeredOn:"NA"
          },
          lblFriendlyName: {
            text: (data.friendlyName)!==""?data.friendlyName:"NA"
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
          /*fontIconStatusInfo: {
            "text": "\ue921",
            "skin" : (data.status)==="ACTIVE"?"sknFontIconActivate":"sknfontIconInactive"
          },*/

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
              var selItems = self.view.segDeviceDetails.data[context.rowIndex];
              if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
                // selItems.flxCopy.isVisible = true;
              } else if(context.eventType === constants.ONHOVER_MOUSE_LEAVE){
                selItems.flxCopy.isVisible = false;
              }
              self.view.segDeviceDetails.setDataAt(selItems, context.rowIndex);
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
      this.view.segDeviceDetails.setData(segData);
    },

    /*    
    copyText: function(){
      var selItems = this.view.segDeviceDetails.selectedItems[0];
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
*/
    fetchUserDevices: function(userId){
      this._userId = userId;
      this.formUpdateUI({ "LoadingScreen": { focus: true } });
      let serviceDetails = {
        "objServiceName" : this._getUserDevicesObjectServiceName,
        "objName" : this._getUserDevicesObjectName,
        "operationName" : this._getUserDevicesVerbName,
        "payload" : {"userId": userId} 
      }
      this.userDevicesDAO.userDevicesOperations(serviceDetails,
                                                this.willUpdateUI);
    },

    flxOptionsOnClick:function()
    {
      var self = this;
      var top = 0;
      var left = 0;
      self.view.selectOptions.flxSelectOptionsInner.top = "-1px";
      self.view.selectOptions.flxArrowImage.setVisibility(true);
      self.view.selectOptions.flxDownArrowImage.setVisibility(false);
      let selectedRowIndex = self.view.segDeviceDetails.selectedRowIndex[1];
      var templateArray = self.view.segDeviceDetails.clonedTemplates;
      var contextualWidgetHeight = 96;
      for (var i = 0; i < selectedRowIndex; i++) {
        top += templateArray[i].flxDeviceDetails.frame.height-10;
      }
      if(selectedRowIndex===0)
      {
        top=top-10;
      }
      var segmentWidget = this.view.segDeviceDetails;
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
      //left = templateArray[this.selectedRowIndex].flxOptions.frame.x - 140 + 35 + "px";
      left = templateArray[selectedRowIndex].flxOptions.frame.x - 140 + 35 + "px";
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


      var dataArray = self.view.segDeviceDetails.data;
      var selectedData = dataArray[selectedRowIndex].rawData;
      this._selectedData = selectedData;
      if(selectedData.status.toUpperCase() === "ACTIVE"){
        this.view.selectOptions.fontIconOption1.text="\ue961";
        this.view.selectOptions.lblOption1.text ="Revoke";
        this.view.selectOptions.fontIconOption2.text ="\ue91d";
        this.view.selectOptions.lblOption2.text="Suspend"
      }else {
        this.view.selectOptions.fontIconOption1.text="\ue961";
        this.view.selectOptions.lblOption1.text ="Revoke";
        this.view.selectOptions.fontIconOption2.text ="\ue96e";
        this.view.selectOptions.lblOption2.text="Unsuspend"
      }

    },

    revokeDevice:function(){
      let selectedData = this._selectedData;
      let userId = this._userId;
      let context = {
        confirmationPopup : {
          model : {
            header : "Revoke Device",
            message : "Are you sure to revoke device with id "+selectedData.id+" and friendly name '"+selectedData.friendlyName+"?",
            confirmMsg : "Yes, Revoke",
            cancelMsg : "No",
            confirmAction : doRevoke.bind(this),
            cancelAction : cancelRevoke.bind(this)          
          }
        }
      }
      this.formUpdateUI(context);
      
      function cancelRevoke() {
        
      }
      
      function doRevoke(){
        this.updateDeviceStatus({"id": selectedData.id, "status" : "REVOKE", "userId" : userId, "deviceName" : selectedData.friendlyName});
        kony.print("Revoke Device");
      }
    },

    suspendDevice:function(){
      let selectedData = this._selectedData;
      let userId = this._userId;
      let context = {
        confirmationPopup : {
          model : {
            header : "Suspend Device",
            message : "Are you sure to suspend device with id "+selectedData.id+" and friendly name '"+selectedData.friendlyName+"?",
            confirmMsg : "Yes, Suspend",
            cancelMsg : "No",
            confirmAction : doSuspendDevice.bind(this),
            cancelAction : cancelSuspendDevice.bind(this)          
          }
        }
      }
      this.formUpdateUI(context);
      
      function cancelSuspendDevice() {
        
      }
      
      function doSuspendDevice(){
        this.updateDeviceStatus({"id": selectedData.id, "status" : "SUSPEND", "userId" : userId, "deviceName" : selectedData.friendlyName});
        kony.print("Suspend Device");
      }
    },

    unsuspendDevice:function(){
      let selectedData = this._selectedData;
      let userId = this._userId;
      let context = {
        confirmationPopup : {
          model : {
            header : "Reactivate Device",
            message : "Are you sure to reactivate device with id "+selectedData.id+" and friendly name '"+selectedData.friendlyName+"?",
            confirmMsg : "Yes, Reactivate",
            cancelMsg : "No",
            confirmAction : doActivateDevice.bind(this),
            cancelAction : cancelActivateDevice.bind(this)          
          }
        }
      }
      this.formUpdateUI(context);
      
      function cancelActivateDevice() {
        
      }
      
      function doActivateDevice(){
        this.updateDeviceStatus({"id": selectedData.id, "status" : "UNSUSPEND", "userId" : userId, "deviceName" : selectedData.friendlyName});
        kony.print("Reactivate Device");
      }
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
    
    updateDeviceStatus : function(payload){
      this.formUpdateUI({ "LoadingScreen": { focus: true } });
      let serviceDetails = {
        "objServiceName" : this._updateDeviceStatusObjectServiceName,
        "objName" : this._updateDeviceStatusObjectName,
        "operationName" : this._updateDeviceStatusVerbName,
        "payload" : payload 
      }
      this.userDevicesDAO.userDevicesOperations(serviceDetails,
                                                this.willUpdateUI);
    }
  };
});