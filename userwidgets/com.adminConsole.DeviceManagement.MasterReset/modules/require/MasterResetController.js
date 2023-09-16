define(['./MasterResetBusinessController', 'AdminConsoleCommonUtilities'], 
function(MasterResetBusinessController, AdminConsoleCommonUtilities) {
  kony.print("MasterReset: Module Definition");
  let masterResetBusinessController = new MasterResetBusinessController();
  let adminConsoleCommonUtils = AdminConsoleCommonUtilities.AdminConsoleCommonUtils;
  
  function confirmReset(){
    let context = {
      confirmationPopup : {
        model : {
          header : "Confirm Master Reset",
          message : "Are you sure to do master reset? This will reset customer profile and regenerates activation code.",
          confirmMsg : "Yes, Reset",
          cancelMsg : "No",
          confirmAction : doReset.bind(this),
          cancelAction : cancelReset.bind(this)          
        }
      }
    }
    this.formUpdateUI(context);
  }
  
  function doReset(){
    kony.print("MasterReset: Resetting...");
    let userId = kony.store.getItem("Username");
    let context = { "LoadingScreen": { focus: true } };
    this.formUpdateUI(context);
    let serviceDetails = {
      "objServiceName" : this._resetObjectServiceName,
      "objName" : this._resetObjectName,
      "operationName" : this._resetVerbName,
      "payload" : {"userId": this._data.userId, "customerId" : this._data.customerId}
    }
    masterResetBusinessController.doMasterReset(serviceDetails, this.willUpdateUI);
  }
  
  function cancelReset(){
    kony.print("MasterReset: Cancelling master reset");
  }
  
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      kony.print("MasterReset: Constructor");
      this._data;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
            kony.print('MasterReset: initGettersSetters');
            defineGetter(this, 'resetObjectServiceName', () => {
                return this._resetObjectServiceName;
            });
            defineSetter(this, 'resetObjectServiceName', value => {
                this._resetObjectServiceName = value;
            });
            defineGetter(this, 'resetObjectName', () => {
                return this._resetObjectName;
            });
            defineSetter(this, 'resetObjectName', value => {
                this._resetObjectName = value;
            });
            defineGetter(this, 'resetVerbName', () => {
                return this._resetVerbName;
            });
            defineSetter(this, 'resetVerbName', value => {
                this._resetVerbName = value;
            });
        },

    onMasterResetPreshow(){
      this.view.btnReset.onClick = confirmReset.bind(this);
    },
    
    willUpdateUI(context) {
      kony.print(context+"");
      if(context.action === this._resetVerbName)
      {
        this.formUpdateUI({ "LoadingScreen": { focus: false } });
        if(context.result === "Success"){
          kony.print("Master Reset Success");
          let toastMsgContext = { 
            "toastModel": { 
              "message": "Master Reset Success",
              "status" : "SUCCESS"
            } 
          };
          this.formUpdateUI(toastMsgContext);
          adminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.btnReset, true, false);
        }else{
          kony.print("Master Reset Failed");
          let toastMsgContext = { 
            "toastModel": { 
              "message": "Failed to do Master Reset",
              "status" : "FAILED"
            } 
          };
          this.formUpdateUI(toastMsgContext);
        }
      }
    },
    
    setData(data){
      this._data = data;
    }
  };
});