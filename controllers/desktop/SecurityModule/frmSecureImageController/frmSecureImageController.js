define({ 
  gblSelIndex :0,
  gblSelItem:null,
  gblsegRoles:0,
  imgUploadVal:0,
  imgBase64 : [],
  deactivateBelow5 : 0,
  noOfActiveImages : 0,
  gblImageData : [],
  gblImageTab :[],
  filterIndiciesArray: [0, 1],

  imagePreShow:function(){
    kony.adminConsole.utils.showProgressBar(this.view);
    this.view.flxMainKA.height=kony.os.deviceInfo().screenHeight+"px";
    this.view.mainHeader.lblUserName.text=kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
  },
  
  SecureImageInitial:function(images){
    kony.print("Inside SecureImageInitial()");
    this.view.flxSelectOptions.isVisible = false;
    this.view.flxStatusFilter.isVisible = false;
    this.setFlowActions();
    this.setHeaderButtonsVisibility();
    this.setHeaderText();
    this.view.rtxNoResultsFound.setVisibility(false);
    this.setImageSegmentData(images);
  },

  setStatusFilterData:function() {
    
    var self = this;
    var statusList = [];
    for(var i=0 ; i<this.gblImageData[0][1].length ; i++){
      if(!statusList.contains(this.gblImageData[0][1][i].lblImageStatus.text)) {
        statusList.push(this.gblImageData[0][1][i].lblImageStatus.text);
      }
    }

    var widgetMap = {
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription",
      "id":"id"
    };
    var data = statusList.map(function(record){
      return {
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "id":"SID_ACTIVE",
        "lblDescription": record,
        "imgCheckBox":{
          "src":"checkbox.png"
        },};
    });

    self.view.statusFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.statusFilterMenu.segStatusFilterDropdown.setData(data);
    var indices = [];
    for (var index = 0 ; index < data.length ; index++) {
      indices.push(index);
    }
    self.filterIndiciesArray = indices;
  },

  setImageSegmentData : function(images){
    kony.print("Inside setImageSegmentData() of frmSecureImageController");
    // kony.print("images: "+JSON.stringify(images));

    var self = this;
    this.gblImageData = [
      [
        {
          "imgSortName": {
            "src": kony.adminConsole.utils.constants.SORTABLE_IMAGE,
            'visible' : false
          },
          "imgSortStatus": {
            "src": kony.adminConsole.utils.constants.SORTABLE_IMAGE,
            'visible' : false
          },
          "lblHeaderSeperator": {
            "text": "."
          },
          "lblName": {
            "text": kony.i18n.getLocalizedString("i18n.secureimage.IMAGE")
          },
          "flxHeaderStatus": {
            "onClick": function () {
              self.view.flxStatusFilter.setVisibility(!self.view.flxStatusFilter.isVisible);
              self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0, self.filterIndiciesArray]];
            }
          },
          "lblStatus": {
            "text": kony.i18n.getLocalizedString("i18n.roles.STATUS")
          },
          "fontIconFilterStatus":{
            "text":""
          }
        },
        this.gblImageTab
      ]
    ];

    //}
    //this.view.segPermissions.widgetDataMap=dataMap;

    if(images === undefined){
      this.view.segUploadedImageListKA.setData(this.gblImageData);
      this.view.flxUploadImageKA.setVisibility(true);
      this.view.flxBrowseOrDrag.setVisibility(true);
      this.view.flxShowAddedImagesStatus.setVisibility(false) ;
      kony.adminConsole.utils.hideProgressBar(this.view);
      this.view.forceLayout();
    }

    else{
      var records = images.records;
      kony.print("records.length: "+records.length);

      self.noOfActiveImages = 0;

      if(records.length === 0){ // No images in DB
        this.view.segUploadedImageListKA.setData(this.gblImageData);
        this.view.flxUploadImageKA.setVisibility(true);
        this.view.flxBrowseOrDrag.setVisibility(true);
        this.view.flxShowAddedImagesStatus.setVisibility(false) ;
        this.view.forceLayout();
      }
      else{
        this.gblImageTab.length = 0;

        for(var i=0; i<records.length; ++i){
          var img = records[i].SecurityImageBase64String;
          img = img.substring(img.indexOf(";base64")+8);

          var activeStatus = records[i].SecurityImage_Status;
          var imgId = records[i].SecurityImage_id;
          var userCount = records[i].UserCount;

          if(activeStatus === "SID_ACTIVE"){
            ++self.noOfActiveImages;
          }

          this.gblImageTab[i] = {
            "lblOptions":{
              "text":"\ue91f",
              "skin":"sknFontIconOptionMenu"
            },
            "lblIconStatus": {
              "text":"\ue921",
              "skin": activeStatus === "SID_ACTIVE" ? "sknIcon13pxGreen" : "sknIcon13pxGray"
            },
            "imgUpload":{"base64": img},
            "lblImageStatus": {
              "text": activeStatus === "SID_ACTIVE" ? kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive"),
              "skin": activeStatus === "SID_ACTIVE" ? "sknlblLato5bc06cBold14px" : "sknlblLatoDeactive"
            },
            "lblSeperator": {"text": "."},
            "flxOptions": {
              "onClick": self.optionsMenu
            },
            "imgId": imgId,
            "userCount": userCount
          };
        }

        kony.print("self.noOfActiveImages: "+self.noOfActiveImages);

        this.view.segUploadedImageListKA.setData(this.gblImageData);
        this.view.flxUploadImageKA.setVisibility(false);
        this.view.flxShowAddedImagesStatus.setVisibility(true) ;
        kony.timer.schedule("flexSizeTimer", this.flexSizeTimer.bind(this), 0.3, false);
        this.view.forceLayout();
      }
    }
    this.setStatusFilterData();
    kony.adminConsole.utils.hideProgressBar(this.view);

    var secureModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");
    secureModule.presentationController.getPhraseStatus();

  },

  flexSizeTimer:function() {
    kony.print("Inside imageFlexSizeTimer");
    var self = this;
    kony.timer.cancel("flexSizeTimer");
    if (this.view.flxUploadImage2KA.isVisible === false) {
      self.view.flxuploadedImageList.left = "35dp";
      //self.view.flxuploadedImageList.width = "93%";
    } else {
      self.view.flxuploadedImageList.left = "400dp";
      // self.view.flxuploadedImageList.width = "60%";
    }
    this.view.forceLayout();
  },

  setHeaderButtonsVisibility:function(){
    this.view.mainHeader.flxButtons.setVisibility(false);
  },
  setHeaderText:function(){
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.leftmenu.SecureImage");
  },
  setFlowActions:function(){
    var scopeObj=this;
    this.view.btnBrowseKA.onClick=function(){
      scopeObj.uploadSecureImages(1);
    };
    this.view.btnBrowseKA2.onClick=function(){
      scopeObj.uploadSecureImages(2);
    };
    this.view.btnCancelKA.onClick=function(){
      scopeObj.showCancelPopuUp();
    };
    this.view.btnCancel2KA.onClick=function(){
      scopeObj.showCancelPopuUp2();
    };
    this.view.btnLeaveAsItIs.onClick=function(){
      scopeObj.dismissCancelPopup();
    };
    this.view.btnDeactivate.onClick=function(){
      scopeObj.showBrowseflx();
    };
    this.view.flxOption2.onClick=function(){
      scopeObj.onClickActiveDeactive();
    };
    this.view.flxOption4.onClick=function(){
      scopeObj.onClickDeleteOption();
    };
    this.view.btnLeaveAsItIs1.onClick=function(){
      scopeObj.onClickLeaveAsIsDeleteImage();
    };
    this.view.btnOk.onClick=function(){
      scopeObj.onClickWarningOK();
    };
    this.view.flxPopUpWarningClose.onClick=function(){
      scopeObj.view.flxPopUpWarning.setVisibility(false);
    };
    this.view.flxPopUpClose.onClick=function(){
      scopeObj.view.flxPopUpDeleteImage.setVisibility(false);
    };
    this.view.flxPopUpCancelClose.onClick=function(){
      scopeObj.view.flxPopUpCancelImageUpload.setVisibility(false);
    };
    this.view.btnYesDelete.onClick=function(){
      scopeObj.onClickYesDeleteImage();
    };
    this.view.statusFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.performStatusFilter();
    }; 
    this.view.flxSelectOptions.onHover = this.onDropDownsHoverCallback;
    this.view.flxStatusFilter.onHover = this.onDropDownsHoverCallback;
    this.view.SwitchToggleStatus.onSlide=function(){
      scopeObj.onClickSwitchToggle();
    };
  },


  uploadSecureImages : function(c){
    kony.print("Inside uploadSecureImages() of frmSecureImageController");

    var scopeObj = this;
    scopeObj.imgBase64 = [];

    function getImg_base64(file){
      var reader  = new FileReader();

      reader.addEventListener(kony.i18n.getLocalizedString("i18n.frmSecureImageController.load"), function () {
        scopeObj.imgBase64.push(reader.result);
      }, false);

      if(file) {
        reader.readAsDataURL(file);
      }
    }

    var config = {
      selectMultipleFiles: true,        
      filter: ["image/png", "image/jpeg", "image/tiff"]
    };
    kony.io.FileSystem.browse(config, imageCallback);

    function imageCallback(event, filesList) {
      var flag=true;

      for(var i=0; i<filesList.length; ++i){
        var fileType = filesList[i].name;
        var fileSize = filesList[i].size;
        fileType = fileType.substring(fileType.lastIndexOf(".")+1);
        
        var validFileTypes = ['jpeg', 'jpg', 'png', 'img', 'tiff', 'JPEG', 'JPG', 'PNG', 'IMG', 'TIFF'];

        if(validFileTypes.indexOf(fileType) === -1){ // Invalid file type
          scopeObj.view.flxPopUpWarning.setVisibility(true);
          scopeObj.view.lblCanntDelete.text = kony.i18n.getLocalizedString("i18n.frmSecureImageController.Cannot_upload_the_image");
          scopeObj.view.RichTextDisclaimer2.text = kony.i18n.getLocalizedString("i18n.frmSecureImageController.Valid_Image_formats");
          scopeObj.view.forceLayout();
          flag=false;
          break;
        }
        if(parseInt(fileSize, 10)>56320){ // Invalid file size
          scopeObj.view.flxPopUpWarning.setVisibility(true);
          scopeObj.view.lblCanntDelete.text = kony.i18n.getLocalizedString("i18n.frmSecureImageController.Cannot_upload_the_image");
          scopeObj.view.RichTextDisclaimer2.text = kony.i18n.getLocalizedString("i18n.frmSecureImageController.Image_Size_limit");
          scopeObj.view.forceLayout();
          flag=false;
          break;
        }
      }

      if(flag===true){
        if(c===1){
          scopeObj.showUploadingIndicator();
        }
        else{
          scopeObj.showUploadingIndicator2();
        }
        for(var ii=0; ii<event.target.files.length; ++ii){
          getImg_base64(event.target.files[ii]);
        }
      }
      else{
        return false;
      }
    }
  },
  
  performStatusFilter: function () {
    var self = this;
    var selStatus = [];
    var selInd;
    var dataToShow = [[]];
    var segStatusData = self.view.statusFilterMenu.segStatusFilterDropdown.data;
    var indices = self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices;
    self.filterIndiciesArray = indices ? indices[0][1] : [];
    
    if (indices !== null) {
      selInd = indices[0][1];
      for(var i=0;i<selInd.length;i++) {
        selStatus.push((self.view.statusFilterMenu.segStatusFilterDropdown.data[selInd[i]].lblDescription).toLowerCase());
      }
      if (selInd.length === segStatusData.length) {
        self.view.rtxNoResultsFound.setVisibility(false);
        self.view.segUploadedImageListKA.setData(self.gblImageData);
      } 
      else {
        dataToShow[0][0] = self.gblImageData[0][0];
        dataToShow[0][1] = self.gblImageData[0][1].filter(function(rec){
          if(selStatus.indexOf(rec.lblImageStatus.text.toLowerCase()) >= 0){
            return rec;
          }
        });
        if (dataToShow[0][1].length > 0) {
          self.view.rtxNoResultsFound.setVisibility(false);
          self.view.segUploadedImageListKA.setData(dataToShow);
        } 
        else {
          self.view.segUploadedImageListKA.setData(dataToShow);
          self.view.rtxNoResultsFound.setVisibility(true);
          self.view.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
        }
      }
    } 
    else {
      dataToShow[0][0] = self.gblImageData[0][0];
      dataToShow[0][1] = [];
      self.view.segUploadedImageListKA.setData(dataToShow);
      self.view.rtxNoResultsFound.setVisibility(true);
      self.view.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
    }
    self.view.forceLayout();
  },
  
  onDropDownsHoverCallback:function(widget,context){
    var self=this;
    var widgetId = widget.id;

    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      self.view[widgetId].setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      self.view[widgetId].setVisibility(false);
    }
    self.view.forceLayout();
  },
  showUploadingIndicator:function(){
    kony.print("Inside showUploadingIndicator() of frmSecureImageController");
    this.imgUploadVal=0;
    kony.timer.schedule("mytimer1", this.callBackTimer2.bind(this), 3, false);
    this.view.flxUploadingIndiacatorKA.setVisibility(true);
    this.view.flxBrowseOrDrag.setVisibility(false);
    this.view.forceLayout();
  },
  showUploadingIndicator2:function(){
    kony.print("Inside showUploadingIndicator2() of frmSecureImageController");
    this.imgUploadVal=1;
    kony.timer.schedule("mytimer1", this.callBackTimer2.bind(this), 3, false);
    this.view.flxUploadingIndiacator2KA.setVisibility(true);
    this.view.flxBrowseOrDrag2.setVisibility(false);
    this.view.forceLayout();
  },
  showCancelPopuUp:function(){
    kony.timer.cancel("mytimer1");
    this.view.flxPopUpCancelImageUpload.setVisibility(true);
  },
  showCancelPopuUp2:function(){
    kony.timer.cancel("mytimer1");
    this.view.flxPopUpCancelImageUpload.setVisibility(true);
  },
  dismissCancelPopup:function(){
    var scopeObj = this;
    this.view.flxPopUpCancelImageUpload.setVisibility(false);
    scopeObj.callBackTimer2();
  },
  showBrowseflx:function(){
    kony.print("Inside showBrowseflx() of frmSecureImageController");
    if(this.imgUploadVal === 1){
      this.view.flxPopUpCancelImageUpload.setVisibility(false);
      this.view.flxUploadingIndiacator2KA.setVisibility(false);
      this.view.flxBrowseOrDrag2.setVisibility(true);
    }else{
      this.view.flxPopUpCancelImageUpload.setVisibility(false);
      this.view.flxUploadingIndiacatorKA.setVisibility(false);
      this.view.flxBrowseOrDrag.setVisibility(true);
    }

  },

  optionsMenu : function()
  {
    kony.print("Inside optionsMenu() of frmSecureImageController");
    var selItems = this.view.segUploadedImageListKA.selectedItems[0];
    this.gblSelItem = this.view.segUploadedImageListKA.selectedItems[0];
    this.gblSelIndex = this.view.segUploadedImageListKA.selectedIndex[1];
    var clckd_selectedRowIndex = this.view.segUploadedImageListKA.selectedRowIndex[1];
    kony.print("clckd_selectedRowIndex: "+JSON.stringify(clckd_selectedRowIndex));		

    if(selItems.lblImageStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active"))
    {
      var hgtValue = ((clckd_selectedRowIndex*80)+130);
      this.view.flxSelectOptions.top = hgtValue+"px";
      this.view.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
      this.view.lblIconOption2.text = "\ue91c";
      this.view.lblIconOption2.skin = "sknIcon20px";
    }
    else{
      var hgtValuee = ((clckd_selectedRowIndex*80)+130);
      this.view.flxSelectOptions.top = hgtValuee+"px";

      this.view.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
      this.view.lblIconOption2.text = "\ue931";
      this.view.lblIconOption2.skin = "sknIcon20px";
    }  

    if (this.view.flxSelectOptions.isVisible===false) {
      this.view.flxSelectOptions.setVisibility(true);
    }
    else
    {
      this.view.flxSelectOptions.setVisibility(false);
    }
  },

  onClickActiveDeactive:function(){
    var self = this;
    kony.print("Inside onClickActiveDeactive()");

    if(this.view.lblOption2.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate") && self.noOfActiveImages<=5){
      self.deactivateBelow5=1;
      this.view.flxPopUpDeleteImage.setVisibility(true);
      this.view.lblDeleteImage.text = kony.i18n.getLocalizedString("i18n.frmSecureImageController.Deactivate_Image");
      this.view.RichTextDisclaimer1.text = kony.i18n.getLocalizedString("i18n.frmSecureImageController.Minimum_images");
      this.view.btnYesDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDeactivate");
    }

    else{
      if(this.view.lblOption2.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate")){
        this.view.segUploadedImageListKA.setDataAt({
          "lblOptions":  {"text":"\ue91f",
                          "skin":"sknFontIconOptionMenu"},
          "lblIconStatus": {
            "text":"\ue921",
            "skin":"sknIcon13pxGray"
          },
          "imgUpload": this.gblSelItem.imgUpload,
          "lblImageStatus": {"text":kony.i18n.getLocalizedString("i18n.secureimage.Inactive"),"skin":"sknlblLatoDeactive"},
          "lblSeperator": this.gblSelItem.lblSeperator,
          "flxOptions" : {"skin" : "flxTranspSknNormal","hoverSkin":"sknflxffffffop100Border424242Radius100px"},    
        },this.gblSelIndex);

        --self.noOfActiveImages;
        this.view.flxSelectOptions.isVisible = false;
        this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmSecureImageController.Deactivated_security_image_successfully"), this);
      }

      else{
        this.view.segUploadedImageListKA.setDataAt({
          "lblOptions":{"text":"\ue91f",
                        "skin":"sknFontIconOptionMenu"},
          "lblIconStatus": {
            "text":"\ue921",
            "skin":"sknIcon13pxGreen"
          },
          "imgUpload": this.gblSelItem.imgUpload,
          "lblImageStatus": { "text":kony.i18n.getLocalizedString("i18n.secureimage.Active"),"skin":"sknlblLato5bc06cBold14px"},
          "lblSeperator": this.gblSelItem.lblSeperator,
          "flxOptions" : {"skin" : "flxTranspSknNormal","hoverSkin":"sknflxffffffop100Border424242Radius100px"},
        },this.gblSelIndex);

        ++self.noOfActiveImages;
        this.view.flxSelectOptions.isVisible = false;
        this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmSecureImageController.Activated_security_image_successfully"), this);
      }

      var editImageStatusJSON = {"id" : this.gblSelItem.imgId , "status" : this.view.lblOption2.text};
      var secureModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");
      kony.adminConsole.utils.showProgressBar(this.view);
      secureModule.presentationController.editImage(editImageStatusJSON);
    }

    this.view.forceLayout();
  },

  onClickDeleteOption:function(){
    var self = this;
    kony.print("Inside onClickDeleteOption()");

    var userCount = this.gblSelItem.userCount;

    if(parseInt(userCount, 10) === 0){
      this.view.flxPopUpDeleteImage.setVisibility(true);
      this.view.lblDeleteImage.text = kony.i18n.getLocalizedString("i18n.frmSecureImageController.Delete_Image");

      if(this.view.lblOption2.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate") && self.noOfActiveImages<=5){
        this.view.RichTextDisclaimer1.text = kony.i18n.getLocalizedString("i18n.frmSecureImageController.Minimum_images_requirement");
      }
      else{
        this.view.RichTextDisclaimer1.text = kony.i18n.getLocalizedString("i18n.frmSecureImageController.delete_image_popup");
      }

      this.view.btnYesDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDelete");

      this.view.flxSelectOptions.setVisibility(false);
      this.view.segUploadedImageListKA.setDataAt({
        "lblOptions": {"text":"\ue91f",
                       "skin":"sknFontIconOptionMenu"},
        "lblIconStatus": this.gblSelItem.lblIconStatus,
        "imgUpload": this.gblSelItem.imgUpload,
        "lblImageStatus": this.gblSelItem.lblImageStatus,
        "lblSeperator": this.gblSelItem.lblSeperator,
        "flxOptions" : {"skin" : "flxTranspSknNormal","hoverSkin":"sknflxffffffop100Border424242Radius100px"},

      },this.gblSelIndex);
      this.view.forceLayout();
    }
    else
    {
      this.view.flxPopUpWarning.setVisibility(true);
      this.view.lblCanntDelete.text = kony.i18n.getLocalizedString("i18n.frmSecureImageController.Cannot_delete_the_image");
      this.view.RichTextDisclaimer2.text = kony.i18n.getLocalizedString("i18n.frmSecureImageController.delete_image_popupcontent");
      this.view.flxSelectOptions.setVisibility(false);
      this.view.segUploadedImageListKA.setDataAt({
        "lblOptions": {"text":"\ue91f",
                       "skin":"sknFontIconOptionMenu"},
        "lblIconStatus": this.gblSelItem.lblIconStatus,
        "imgUpload": this.gblSelItem.imgUpload,
        "lblImageStatus": this.gblSelItem.lblImageStatus,
        "lblSeperator": this.gblSelItem.lblSeperator,
        "flxOptions" : {"skin" : "flxTranspSknNormal","hoverSkin":"sknflxffffffop100Border424242Radius100px"},

      },this.gblSelIndex);
      this.view.forceLayout();
    }
  },
  onClickWarningOK:function()
  {
    this.view.flxPopUpWarning.setVisibility(false);

    var secureModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");
    secureModule.presentationController.fetchAllImages();
  },

  onClickYesDeleteImage:function(){
    var self=this;
    kony.print("Inside onClickYesDeleteImage()");

    var secureModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");
    this.view.flxSelectOptions.isVisible = false;
    --self.noOfActiveImages;

    if(self.deactivateBelow5===1){
      this.view.segUploadedImageListKA.setDataAt({
        "lblOptions": {"text":"\ue91f",
                       "skin":"sknFontIconOptionMenu"},
        "lblIconStatus": {
          "text":"\ue921",
          "skin":"sknIcon13pxGray"
        },
        "imgUpload": this.gblSelItem.imgUpload,
        "lblImageStatus": {"text":kony.i18n.getLocalizedString("i18n.secureimage.Inactive"),"skin":"sknlblLatoDeactive"},
        "lblSeperator": this.gblSelItem.lblSeperator,
        "flxOptions" : {"skin" : "flxTranspSknNormal","hoverSkin":"sknflxffffffop100Border424242Radius100px"},    
      },this.gblSelIndex);

      self.deactivateBelow5=0;
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmSecureImageController.Deactivated_security_image_successfully"), this);

      var editImageStatusJSON = {"id" : this.gblSelItem.imgId , "status" : this.view.lblOption2.text};
      kony.adminConsole.utils.showProgressBar(this.view);
      secureModule.presentationController.editImage(editImageStatusJSON);
    }
    else{
      this.view.segUploadedImageListKA.setDataAt({
        //         "lblIconStatus": this.gblSelItem.lblIconStatus,
        "lblIconStatus": {
          "text":"\ue921",
          "skin":"sknIcon13pxGray"
        },
        "imgUpload": this.gblSelItem.imgUpload,
        "lblImageStatus": {"text":kony.i18n.getLocalizedString("i18n.secureimage.Inactive"),"skin":"sknlblLatoDeactive"},
        "lblSeperator": this.gblSelItem.lblSeperator,
        "flxOptions" : {"skin" : "flxTranspSknNormal","hoverSkin":"sknflxffffffop100Border424242Radius100px"},    
      },this.gblSelIndex);

      this.view.segUploadedImageListKA.removeAt(this.gblSelIndex);
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmSecureImageController.Deleted_security_image_successfully"), this);

      var deleteImageJSON = {"id" : this.gblSelItem.imgId};
      kony.adminConsole.utils.showProgressBar(this.view);
      secureModule.presentationController.deleteImage(deleteImageJSON);
    }

    this.view.flxPopUpDeleteImage.setVisibility(false);

    if(parseInt(this.gblImageTab.length, 10) === 0) {
      this.view.flxShowAddedImagesStatus.setVisibility(false) ;
      this.view.flxUploadImageKA.setVisibility(true);
      this.view.flxBrowseOrDrag.setVisibility(true);
    }
    this.view.forceLayout();
  },
  onClickLeaveAsIsDeleteImage:function(){
    self.deactivateBelow5=0;
    this.view.flxPopUpDeleteImage.setVisibility(false);

    var secureModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");
    secureModule.presentationController.fetchAllImages();
  },

  callBackTimer2:function()
  {
    kony.print("Inside callBackTimer2()");
    kony.print("imgBase64.length: "+this.imgBase64.length);
    var self = this;

    kony.timer.cancel("mytimer1");
    this.gblImageTab.push({
      "lblOptions": {
        "text":"\ue91f",
        "skin":"sknFontIconOptionMenu"
      },
      "lblIconStatus": {
        "text":"\ue921",
        "skin":"sknIcon13pxGreen"
      },
      "imgUpload": {
        "src": "imgplaceholder.png"
      },
      "lblImageStatus": {
        "text":kony.i18n.getLocalizedString("i18n.secureimage.Active"),"skin":"sknlblLato5bc06cBold14px",
      },
      "lblSeperator": {
        "text": "."
      }
    });
    this.view.segUploadedImageListKA.setData(this.gblImageData);
    if(this.imgUploadVal === 1){
      this.view.flxPopUpCancelImageUpload.setVisibility(false);
      this.view.flxUploadingIndiacator2KA.setVisibility(false);
      this.view.flxBrowseOrDrag2.setVisibility(true);
      this.view.flxUploadImageKA.setVisibility(false);
      this.view.flxShowAddedImagesStatus.setVisibility(false);
    }else{
      this.view.flxPopUpCancelImageUpload.setVisibility(false);
      this.view.flxUploadingIndiacatorKA.setVisibility(false);
      this.view.flxUploadImageKA.setVisibility(false);
      this.view.flxShowAddedImagesStatus.setVisibility(true);
      if(this.view.flxUploadImage2KA.isVisible === false) {
        self.view.flxuploadedImageList.left = "35dp"; 
        //self.view.flxuploadedImageList.width = "93%";
      }
      else {
        self.view.flxuploadedImageList.left = "400dp";
        // self.view.flxuploadedImageList.width = "60%";
      }
    }
    var secureModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");
    kony.adminConsole.utils.showProgressBar(this.view);
    secureModule.presentationController.addNewImage(this.imgBase64);
  },

  willUpdateUI: function (context) {
    this.updateLeftMenu(context);
    if(context !== undefined) {
      if (context.action === "showImages") {
        this.SecureImageInitial(context.images);
        kony.adminConsole.utils.hideProgressBar(this.view);
      }
      else if (context.action === "showPhrase") {
        this.showToggle(context.phrase);
        kony.adminConsole.utils.hideProgressBar(this.view);
      }
    }
    this.view.forceLayout();
  },

  onClickSwitchToggle : function(){
    kony.print("Inside onClickSwitchToggle()");

    var phraseStatus = this.view.SwitchToggleStatus.selectedIndex;

    var phraseJSON = {"phraseStatus" : phraseStatus};

    var secureModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");
    //  kony.adminConsole.utils.showProgressBar(this.view);
    secureModule.presentationController.editPhraseStatus(phraseJSON);
  },

  showToggle : function(phraseStatus){
    kony.print("Inside showToggle()");
    this.view.SwitchToggleStatus.selectedIndex = phraseStatus;
  }

});
