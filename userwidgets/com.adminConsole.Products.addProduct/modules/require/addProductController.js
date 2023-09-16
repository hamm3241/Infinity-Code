define(['./AddProductDAO','AdminConsoleCommonUtilities','Sorting_FormExtn'],function(AddProductDAO, CommonUtilities,SortingFormExtn) {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.AddProductDAO = new AddProductDAO();
      this.imageValidationRegex = /\b(https|ftp):(\/\/|\\\\)[^\s]+\.(png|jpg|gif|jpeg|svg|bmp)\b$/i;
      this.currentScreen = 1;
      this.allFeatureType_NameGroupMap = new Map();
      this.maxScreenNumNavAllowed = 1;
      this.productLinesMasterData = [];
      this.productGroupsMasterData = [];
      this.featureTypeMasterData = [];
      this.sortColName = "";
      this.selRowFeatureData = {};
      this.prevIndex=-1;
      this.isFeatureEdit = false;
      this.isEditFlow = false;
      this.areProductLinesFetched = false;
      this.editDataGlobal = {};
      this.isScreenValidatedArr = [false,false,false,false,false,false];
      this.isConfig2 = true;
      this.productFeaturesData = "";
      // Value Assigned from Component Properties
      this.productPurposes = [];
      this.optionDisplayTypeMasterdata = [];
      this.imageTypesMasterdata = [];
      // Property Values for Backend Service Details
      this._objectServiceName1="";
      this._objectName1="";
      this._operationName1="";
      this._objectServiceName2="";
      this._objectName2="";
      this._operationName2="";
      this._objectServiceName3="";
      this._objectName3="";
      this._operationName3="";
      this._objectServiceName4="";
      this._objectName4="";
      this._operationName4="";
      this._objectServiceName5="";
      this._objectName5="";
      this._operationName5="";
      this._objectServiceName6="";
      this._objectName6="";
      this._operationName6="";
      // Property Values for Design Time Configs
      this._productPurposes="";
      this._optionDisplayType="";
      this._imageTypes="";
      this._maxAddAttrAllowed="";
      // Property Values for Product Details Screen Text Fields
      this._productLineLblTxt="";
      this._productLineDropdownPlaceholderTxt="";
      this._productLineErrorMsgTxt="";
      this._productGroupLblTxt="";
      this._productGroupDropdownPlaceholderTxt="";
      this._productGroupErrorMsgTxt="";
      this._productNameLblTxt="";
      this._productNamePlaceholderTxt="";
      this._productNameErrorMsgTxt="";
      this._productRefLblTxt="";
      this._productRefPlaceholderTxt="";
      this._productRefErrorMsgTxt="";
      this._startDateLblTxt="";
      this._startDateErrorMsgTxt="";
      this._endDateLblTxt="";
      this._endDateErrorMsgTxt="";
      this._purposeLblTxt="";
      this._purposeDropdownPlaceholderTxt="";
      this._purposeErrorMsgTxt="";
      // Property Values for Additional Fields - Product Details Screen
      this._label1Txt="";
      this._placeholder1Txt="";      
      this._label2Txt="";
      this._placeholder2Txt="";
      this._label3Txt="";
      this._placeholder3Txt="";
      this._label4Txt="";
      this._placeholder4Txt="";
      this._label5Txt="";
      this._placeholder5Txt="";
      this._label6Txt="";
      this._placeholder6Txt="";      
      this._label7Txt="";
      this._placeholder7Txt="";
      this._label8Txt="";
      this._placeholder8Txt="";
      this._label9Txt="";
      this._placeholder9Txt="";      
      this._label10Txt="";
      this._placeholder10Txt="";      
      this._label11Txt="";
      this._placeholder11Txt="";
      this._label12Txt="";
      this._placeholder12Txt="";
      this._label13Txt="";
      this._placeholder13Txt="";
      this._label14Txt="";
      this._placeholder14Txt="";
      this._label15Txt="";
      this._placeholder15Txt="";
      // Property Values for Product Description Screen Text Fields
      this._descLblTxt="";
      this._descPlaceholderTxt="";
      this._detailedDescLblTxt="";
      this._detailedDescPlaceholderTxt="";
      this._notesLblTxt="";
      this._notesPlaceholderTxt="";
      this._notesToolTipTxt="";
      this._disclosureLblTxt="";
      this._disclosurePlaceholderTxt="";
      this._tandCLblTxt="";
      this._tandCPlaceholderTxt="";
      // Property Values for Product Features Screen Text Fields
      this._featureHeadingLblTxt="";
      this._addFeatureBtnTxt="";
      this._noFeatureDescTxt="";
      this._featureNameLblSegTxt="";
      this._featureGroupLblSegTxt="";
      this._featureTypeLblSegTxt="";
      // Property Values for Popup Add Product Features Screen Text Fields
      this._facilityNameLblTxt="";
      this._facilityCodeLblTxt="";
      // Property Values for Popup View Product Features Screen Text Fields
      this._featureViewEditBtnTxt="";
      this._featureViewProductGroupLblTxt="";
      this._featureViewSequenceNumberLblTxt="";
      this._featureViewMandatoryLblTxt="";
      this._featureViewDefaultValueLblTxt="";
      this._featureViewDescValueLblTxt="";
      this._featureViewOptionDetailsLblTxt="";
      this._featureViewOptionDisplayTypeLblTxt="";
      this._featureViewValueLblTxt="";
      this._featureViewDescriptionLblTxt="";
      // Property Values for Image Details Screen Text Fields
      this._imageTypeLblTxt="";
      this._imageTypeDropdownPlaceholderTxt="";
      this._imageURLLblTxt="";
      this._imageURLPlaceholderTxt="";
      this._addImageBtnTxt="";
      // Property Values for Additioanl Attributes Screen Text Fields
      this._attributeKeyLblTxt="";
      this._attributeKeyPlaceholderTxt="";
      this._attributeValueLblTxt="";
      this._attributeValuePlaceholderTxt="";
      this._addAttributeBtnTxt="";
      // Property Values for Navigation Bar Text Fields
      this._option1LblTxt="";
      this._subOption1LblTxt="";
      this._subOption2LblTxt="";
      this._option2LblTxt="";
      this._option3LblTxt="";
      this._option4LblTxt="";
      this._option5LblTxt="";
      this._optionalFieldTxt="";
      this._cancelBtnTxt="";
      this._nextBtnTxt="";
      this._addProductBtnTxt="";
      this._updateProductBtnTxt="";
      // Property Values for Icon Texts
      this._deleteIcon="";
      this._editIcon="";
      this._selCheckboxIcon="";
      this._unselCheckboxIcon="";
      this._tooltipInfoIcon="";
      this._errorIcon="";
      this._sortUpDownIcon="";
      this._downArrowIcon="";
      this._upArrowIcon="";
      this._segMoreDetailsIcon="";
      this._menuRightArrowIcon="";
      // Property Values for Navigation Bar Skins
      this._leftVBarBgSkin="";
      this._leftVBarBtnUnselectedSkin="";
      this._leftVBarBtnSelectedSkin="";
      this._leftVBarBtnHoverSkin="";
      this._leftVBarOptionalLblSkin="";
      this._leftVBarSeparatorSkin="";
      this._leftVBarCollapseIconSkin="";
      this._leftVBarExpandIconSkin = "";
      this._leftVBarRightArrowIconSkin="";
      this._bottomBarBgSkin="";
      this._bottomBarCancelBtnSkin="";
      this._bottomBarCancelBtnHoverSkin="";
      this._bottomBarBtnLightSkin="";
      this._bottomBarBtnDarkSkin="";
      this._bottomBarBtnLightHoverSkin="";
      this._bottomBarBtnDarkHoverSkin="";
      // Property Values for Common Skins
      this._commonLabelSkin="";
      this._tbxNormalSkin="";
      this._tbxErrorSkin="";
      this._tbxDisabledSkin="";
      this._tbxAreaNormalSkin="";
      this._tbxAreaErrorSkin="";
      this._lstboxNormalSkin="";
      this._lstboxErrorSkin="";
      this._lstboxDisabledSkin="";
      this._calendarNormalSkin="";
      this._calendarErrorSkin="";
      this._commonRightBackgroundSkin="";
      this._errorMsgIconSkin="";
      this._errorMsgTextSkin="";
      this._txtCounterLabelSkin="";
      this._segmentOptionsIconSkin="";
      this._popupCloseCrossBtnSkin="";
      this._AddSegmentRowBtnSkin="";
      this._sortconsSkin="";
      this._deleteIconSkin="";
      this._checkboxSelIconSkin="";
      this._checkboxUnselIconSkin="";
      // Property Values for Product Details Screen Skins
      this._prodPurposeSkin="";
      this._prodPurposeDropdownIConSkin="";
      this._dateDisabledFlexSkin="";
      this._dateDisabledIconLblSkin="";
      this._dateDisabledLblTxtSkin="";
      // Property Values for Product Features Screen Skins
      this._screenHeaderLblSkin="";
      this._addFeatureBtnSkin="";
      this._noFeatureScreenDescSkin="";
      this._segHeaderLblTxtSkin="";
      // Property Values for Popup Common Skins
      this._popupCmnBgSkin="";
      this._popupCmnTopBarSkin="";
      this._popupCmnHeadingLblSkin="";
      // Property Values for Product Add Features Popup Skins
      this._optionDetailsSegBgSkin="";      
      this._bottomBarBgSkin="";
      // Property Values for Product View Features Popup Skins
      this._lblKeySkin="";
      // Property Values for Product Additional Attributes Skins
      this._addAttrTextBoxSkin="";
      this._externalIndicator="";
    },

    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, 'objectServiceName1', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectServiceName1 = val;
        }
      });
      defineGetter(this, 'objectServiceName1', function () {
        return this._objectServiceName1;
      });
      defineSetter(this, 'objectName1', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectName1 = val;
        }
      });
      defineGetter(this, 'objectName1', function () {
        return this._objectName1;
      });
      defineSetter(this, 'operationName1', function (val) {
        if (typeof val == 'string' && val != '') {
          this._operationName1 = val;
        }
      });
      defineGetter(this, 'operationName1', function () {
        return this._operationName1;
      });
      defineSetter(this, 'objectServiceName2', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectServiceName2 = val;
        }
      });
      defineGetter(this, 'objectServiceName2', function () {
        return this._objectServiceName2;
      });
      defineSetter(this, 'objectName2', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectName2 = val;
        }
      });
      defineGetter(this, 'objectName2', function () {
        return this._objectName2;
      });
      defineSetter(this, 'operationName2', function (val) {
        if (typeof val == 'string' && val != '') {
          this._operationName2 = val;
        }
      });
      defineGetter(this, 'operationName2', function () {
        return this._operationName2;
      });
      defineSetter(this, 'objectServiceName3', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectServiceName3 = val;
        }
      });
      defineGetter(this, 'objectServiceName3', function () {
        return this._objectServiceName3;
      });
      defineSetter(this, 'objectName3', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectName3 = val;
        }
      });
      defineGetter(this, 'objectName3', function () {
        return this._objectName3;
      });
      defineSetter(this, 'operationName3', function (val) {
        if (typeof val == 'string' && val != '') {
          this._operationName3 = val;
        }
      });
      defineGetter(this, 'operationName3', function () {
        return this._operationName3;
      });
      defineSetter(this, 'objectServiceName4', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectServiceName4 = val;
        }
      });
      defineGetter(this, 'objectServiceName4', function () {
        return this._objectServiceName4;
      });
      defineSetter(this, 'objectName4', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectName4 = val;
        }
      });
      defineGetter(this, 'objectName4', function () {
        return this._objectName4;
      });
      defineSetter(this, 'operationName4', function (val) {
        if (typeof val == 'string' && val != '') {
          this._operationName4 = val;
        }
      });
      defineGetter(this, 'operationName4', function () {
        return this._operationName4;
      });
      defineSetter(this, 'objectServiceName5', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectServiceName5 = val;
        }
      });
      defineGetter(this, 'objectServiceName5', function () {
        return this._objectServiceName5;
      });
      defineSetter(this, 'objectName5', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectName5 = val;
        }
      });
      defineGetter(this, 'objectName5', function () {
        return this._objectName5;
      });
      defineSetter(this, 'operationName5', function (val) {
        if (typeof val == 'string' && val != '') {
          this._operationName5 = val;
        }
      });
      defineGetter(this, 'operationName5', function () {
        return this._operationName5;
      });
      defineSetter(this, 'objectServiceName6', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectServiceName6 = val;
        }
      });
      defineGetter(this, 'objectServiceName6', function () {
        return this._objectServiceName6;
      });
      defineSetter(this, 'objectName6', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectName6 = val;
        }
      });
      defineGetter(this, 'objectName6', function () {
        return this._objectName6;
      });
      defineSetter(this, 'operationName6', function (val) {
        if (typeof val == 'string' && val != '') {
          this._operationName6 = val;
        }
      });
      defineGetter(this, 'operationName6', function () {
        return this._operationName6;
      });
      defineSetter(this, 'objectServiceName7', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectServiceName7 = val;
        }
      });
      defineGetter(this, 'objectServiceName7', function () {
        return this._objectServiceName7;
      });
      defineSetter(this, 'objectName7', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectName7 = val;
        }
      });
      defineGetter(this, 'objectName7', function () {
        return this._objectName7;
      });
      defineSetter(this, 'operationName7', function (val) {
        if (typeof val == 'string' && val != '') {
          this._operationName7 = val;
        }
      });
      defineGetter(this, 'operationName7', function () {
        return this._operationName7;
      });
      defineSetter(this, 'objectServiceName8', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectServiceName8 = val;
        }
      });
      defineGetter(this, 'objectServiceName8', function () {
        return this._objectServiceName8;
      });
      defineSetter(this, 'objectName8', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectName8 = val;
        }
      });
      defineGetter(this, 'objectName8', function () {
        return this._objectName8;
      });
      defineSetter(this, 'operationName8', function (val) {
        if (typeof val == 'string' && val != '') {
          this._operationName8 = val;
        }
      });
      defineGetter(this, 'operationName8', function () {
        return this._operationName8;
      });
      defineSetter(this, 'objectServiceName9', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectServiceName9 = val;
        }
      });
      defineGetter(this, 'objectServiceName9', function () {
        return this._objectServiceName9;
      });
      defineSetter(this, 'objectName9', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectName9 = val;
        }
      });
      defineGetter(this, 'objectName9', function () {
        return this._objectName9;
      });
      defineSetter(this, 'operationName9', function (val) {
        if (typeof val == 'string' && val != '') {
          this._operationName9 = val;
        }
      });
      defineGetter(this, 'operationName9', function () {
        return this._operationName9;
      });
      defineSetter(this, 'productPurposes', function (val) {
        if (typeof val == 'string' && val != '') {
          this._productPurposes = val;
        }
      });
      defineGetter(this, 'productPurposes', function () {
        return this._productPurposes;
      });
      defineSetter(this, 'optionDisplayType', function (val) {
        if (typeof val == 'string' && val != '') {
          this._optionDisplayType = val;
        }
      });
      defineGetter(this, 'optionDisplayType', function () {
        return this._optionDisplayType;
      });
      defineSetter(this, 'imageTypes', function (val) {
        if (typeof val == 'string' && val != '') {
          this._imageTypes = val;
        }
      });
      defineGetter(this, 'imageTypes', function () {
        return this._imageTypes;
      });
      defineSetter(this, 'maxAddAttrAllowed', function (val) {
        if (typeof val == 'string' && val != '') {
          this._maxAddAttrAllowed = val;
        }
      });
      defineGetter(this, 'maxAddAttrAllowed', function () {
        return this._maxAddAttrAllowed;
      });
      defineSetter(this, 'productLineLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._productLineLblTxt = val;
        }
      });
      defineGetter(this, 'productLineLblTxt', function () {
        return this._productLineLblTxt;
      });
      defineSetter(this, 'productLineDropdownPlaceholderTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._productLineDropdownPlaceholderTxt = val;
        }
      });
      defineGetter(this, 'productLineDropdownPlaceholderTxt', function () {
        return this._productLineDropdownPlaceholderTxt;
      });
      defineSetter(this, 'productLineErrorMsgTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._productLineErrorMsgTxt = val;
        }
      });
      defineGetter(this, 'productLineErrorMsgTxt', function () {
        return this._productLineErrorMsgTxt;
      });
      defineSetter(this, 'productGroupLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._productGroupLblTxt = val;
        }
      });
      defineGetter(this, 'productGroupLblTxt', function () {
        return this._productGroupLblTxt;
      });
      defineSetter(this, 'productGroupDropdownPlaceholderTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._productGroupDropdownPlaceholderTxt = val;
        }
      });
      defineGetter(this, 'productGroupDropdownPlaceholderTxt', function () {
        return this._productGroupDropdownPlaceholderTxt;
      });
      defineSetter(this, 'productGroupErrorMsgTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._productGroupErrorMsgTxt = val;
        }
      });
      defineGetter(this, 'productGroupErrorMsgTxt', function () {
        return this._productGroupErrorMsgTxt;
      });
      defineSetter(this, 'productNameLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._productNameLblTxt = val;
        }
      });
      defineGetter(this, 'productNameLblTxt', function () {
        return this._productNameLblTxt;
      });
      defineSetter(this, 'productNamePlaceholderTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._productNamePlaceholderTxt = val;
        }
      });
      defineGetter(this, 'productNamePlaceholderTxt', function () {
        return this._productNamePlaceholderTxt;
      });
      defineSetter(this, 'productNameErrorMsgTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._productNameErrorMsgTxt = val;
        }
      });
      defineGetter(this, 'productNameErrorMsgTxt', function () {
        return this._productNameErrorMsgTxt;
      });
      defineSetter(this, 'productRefLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._productRefLblTxt = val;
        }
      });
      defineGetter(this, 'productRefLblTxt', function () {
        return this._productRefLblTxt;
      });
      defineSetter(this, 'productRefPlaceholderTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._productRefPlaceholderTxt = val;
        }
      });
      defineGetter(this, 'productRefPlaceholderTxt', function () {
        return this._productRefPlaceholderTxt;
      });
      defineSetter(this, 'productRefErrorMsgTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._productRefErrorMsgTxt = val;
        }
      });
      defineGetter(this, 'productRefErrorMsgTxt', function () {
        return this._productRefErrorMsgTxt;
      });
      defineSetter(this, 'startDateLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._startDateLblTxt = val;
        }
      });
      defineGetter(this, 'startDateLblTxt', function () {
        return this._startDateLblTxt;
      });
      defineSetter(this, 'startDateErrorMsgTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._startDateErrorMsgTxt = val;
        }
      });
      defineGetter(this, 'startDateErrorMsgTxt', function () {
        return this._startDateErrorMsgTxt;
      });
      defineSetter(this, 'endDateLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._endDateLblTxt = val;
        }
      });
      defineGetter(this, 'endDateLblTxt', function () {
        return this._endDateLblTxt;
      });
      defineSetter(this, 'endDateErrorMsgTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._endDateErrorMsgTxt = val;
        }
      });
      defineGetter(this, 'endDateErrorMsgTxt', function () {
        return this._endDateErrorMsgTxt;
      });
      defineSetter(this, 'purposeLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._purposeLblTxt = val;
        }
      });
      defineGetter(this, 'purposeLblTxt', function () {
        return this._purposeLblTxt;
      });
      defineSetter(this, 'purposeDropdownPlaceholderTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._purposeDropdownPlaceholderTxt = val;
        }
      });
      defineGetter(this, 'purposeDropdownPlaceholderTxt', function () {
        return this._purposeDropdownPlaceholderTxt;
      });
      defineSetter(this, 'purposeErrorMsgTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._purposeErrorMsgTxt = val;
        }
      });
      defineGetter(this, 'purposeErrorMsgTxt', function () {
        return this._purposeErrorMsgTxt;
      });
      defineSetter(this, 'label1Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._label1Txt = val;
        }
      });
      defineGetter(this, 'label1Txt', function () {
        return this._label1Txt;
      });
      defineSetter(this, 'placeholder1Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._placeholder1Txt = val;
        }
      });
      defineGetter(this, 'placeholder1Txt', function () {
        return this._placeholder1Txt;
      });
      defineSetter(this, 'label2Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._label2Txt = val;
        }
      });
      defineGetter(this, 'label2Txt', function () {
        return this._label2Txt;
      });
      defineSetter(this, 'placeholder2Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._placeholder2Txt = val;
        }
      });
      defineGetter(this, 'placeholder2Txt', function () {
        return this._placeholder2Txt;
      });
      defineSetter(this, 'label3Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._label3Txt = val;
        }
      });
      defineGetter(this, 'label3Txt', function () {
        return this._label3Txt;
      });
      defineSetter(this, 'placeholder3Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._placeholder3Txt = val;
        }
      });
      defineGetter(this, 'placeholder3Txt', function () {
        return this._placeholder3Txt;
      });
      defineSetter(this, 'label4Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._label4Txt = val;
        }
      });
      defineGetter(this, 'label4Txt', function () {
        return this._label4Txt;
      });
      defineSetter(this, 'placeholder4Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._placeholder4Txt = val;
        }
      });
      defineGetter(this, 'placeholder4Txt', function () {
        return this._placeholder4Txt;
      });
      defineSetter(this, 'label5Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._label5Txt = val;
        }
      });
      defineGetter(this, 'label5Txt', function () {
        return this._label5Txt;
      });
      defineSetter(this, 'placeholder5Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._placeholder5Txt = val;
        }
      });
      defineGetter(this, 'placeholder5Txt', function () {
        return this._placeholder5Txt;
      });
      defineSetter(this, 'label6Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._label6Txt = val;
        }
      });
      defineGetter(this, 'label6Txt', function () {
        return this._label6Txt;
      });
      defineSetter(this, 'placeholder6Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._placeholder6Txt = val;
        }
      });
      defineGetter(this, 'placeholder6Txt', function () {
        return this._placeholder6Txt;
      });
      defineSetter(this, 'label7Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._label7Txt = val;
        }
      });
      defineGetter(this, 'label7Txt', function () {
        return this._label7Txt;
      });
      defineSetter(this, 'placeholder7Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._placeholder7Txt = val;
        }
      });
      defineGetter(this, 'placeholder7Txt', function () {
        return this._placeholder7Txt;
      });
      defineSetter(this, 'label8Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._label8Txt = val;
        }
      });
      defineGetter(this, 'label8Txt', function () {
        return this._label8Txt;
      });
      defineSetter(this, 'placeholder8Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._placeholder8Txt = val;
        }
      });
      defineGetter(this, 'placeholder8Txt', function () {
        return this._placeholder8Txt;
      });
      defineSetter(this, 'label9Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._label9Txt = val;
        }
      });
      defineGetter(this, 'label9Txt', function () {
        return this._label9Txt;
      });
      defineSetter(this, 'placeholder9Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._placeholder9Txt = val;
        }
      });
      defineGetter(this, 'placeholder9Txt', function () {
        return this._placeholder9Txt;
      });
      defineSetter(this, 'label10Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._label10Txt = val;
        }
      });
      defineGetter(this, 'label10Txt', function () {
        return this._label10Txt;
      });
      defineSetter(this, 'placeholder10Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._placeholder10Txt = val;
        }
      });
      defineGetter(this, 'placeholder10Txt', function () {
        return this._placeholder10Txt;
      });
      defineSetter(this, 'label11Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._label11Txt = val;
        }
      });
      defineGetter(this, 'label11Txt', function () {
        return this._label11Txt;
      });
      defineSetter(this, 'placeholder11Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._placeholder11Txt = val;
        }
      });
      defineGetter(this, 'placeholder11Txt', function () {
        return this._placeholder11Txt;
      });
      defineSetter(this, 'label12Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._label12Txt = val;
        }
      });
      defineGetter(this, 'label12Txt', function () {
        return this._label12Txt;
      });
      defineSetter(this, 'placeholder12Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._placeholder12Txt = val;
        }
      });
      defineGetter(this, 'placeholder12Txt', function () {
        return this._placeholder12Txt;
      });
      defineSetter(this, 'label13Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._label13Txt = val;
        }
      });
      defineGetter(this, 'label13Txt', function () {
        return this._label13Txt;
      });
      defineSetter(this, 'placeholder13Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._placeholder13Txt = val;
        }
      });
      defineGetter(this, 'placeholder13Txt', function () {
        return this._placeholder13Txt;
      });
      defineSetter(this, 'label14Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._label14Txt = val;
        }
      });
      defineGetter(this, 'label14Txt', function () {
        return this._label14Txt;
      });
      defineSetter(this, 'placeholder14Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._placeholder14Txt = val;
        }
      });
      defineGetter(this, 'placeholder14Txt', function () {
        return this._placeholder14Txt;
      });
      defineSetter(this, 'label15Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._label15Txt = val;
        }
      });
      defineGetter(this, 'label15Txt', function () {
        return this._label15Txt;
      });
      defineSetter(this, 'placeholder15Txt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._placeholder15Txt = val;
        }
      });
      defineGetter(this, 'placeholder15Txt', function () {
        return this._placeholder15Txt;
      });
      defineSetter(this, 'descLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._descLblTxt = val;
        }
      });
      defineGetter(this, 'descLblTxt', function () {
        return this._descLblTxt;
      });
      defineSetter(this, 'descPlaceholderTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._descPlaceholderTxt = val;
        }
      });
      defineGetter(this, 'descPlaceholderTxt', function () {
        return this._descPlaceholderTxt;
      });
      defineSetter(this, 'detailedDescLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._detailedDescLblTxt = val;
        }
      });
      defineGetter(this, 'detailedDescLblTxt', function () {
        return this._detailedDescLblTxt;
      });
      defineSetter(this, 'detailedDescPlaceholderTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._detailedDescPlaceholderTxt = val;
        }
      });
      defineGetter(this, 'detailedDescPlaceholderTxt', function () {
        return this._detailedDescPlaceholderTxt;
      });
      defineSetter(this, 'notesLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._notesLblTxt = val;
        }
      });
      defineGetter(this, 'notesLblTxt', function () {
        return this._notesLblTxt;
      });
      defineSetter(this, 'notesPlaceholderTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._notesPlaceholderTxt = val;
        }
      });
      defineGetter(this, 'notesPlaceholderTxt', function () {
        return this._notesPlaceholderTxt;
      });
      defineSetter(this, 'notesToolTipTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._notesToolTipTxt = val;
        }
      });
      defineGetter(this, 'notesToolTipTxt', function () {
        return this._notesToolTipTxt;
      });
      defineSetter(this, 'disclosureLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._disclosureLblTxt = val;
        }
      });
      defineGetter(this, 'disclosureLblTxt', function () {
        return this._disclosureLblTxt;
      });
      defineSetter(this, 'disclosurePlaceholderTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._disclosurePlaceholderTxt = val;
        }
      });
      defineGetter(this, 'disclosurePlaceholderTxt', function () {
        return this._disclosurePlaceholderTxt;
      });
      defineSetter(this, 'tandCLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._tandCLblTxt = val;
        }
      });
      defineGetter(this, 'tandCLblTxt', function () {
        return this._tandCLblTxt;
      });
      defineSetter(this, 'tandCPlaceholderTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._tandCPlaceholderTxt = val;
        }
      });
      defineGetter(this, 'tandCPlaceholderTxt', function () {
        return this._tandCPlaceholderTxt;
      });
      defineSetter(this, 'featureHeadingLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._featureHeadingLblTxt = val;
        }
      });
      defineGetter(this, 'featureHeadingLblTxt', function () {
        return this._featureHeadingLblTxt;
      });
      defineSetter(this, 'addFeatureBtnTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._addFeatureBtnTxt = val;
        }
      });
      defineGetter(this, 'addFeatureBtnTxt', function () {
        return this._addFeatureBtnTxt;
      });
      defineSetter(this, 'noFeatureDescTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._noFeatureDescTxt = val;
        }
      });
      defineGetter(this, 'noFeatureDescTxt', function () {
        return this._noFeatureDescTxt;
      });
      defineSetter(this, 'featureNameLblSegTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._featureNameLblSegTxt = val;
        }
      });
      defineGetter(this, 'featureNameLblSegTxt', function () {
        return this._featureNameLblSegTxt;
      });
      defineSetter(this, 'featureGroupLblSegTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._featureGroupLblSegTxt = val;
        }
      });
      defineGetter(this, 'featureGroupLblSegTxt', function () {
        return this._featureGroupLblSegTxt;
      });
      defineSetter(this, 'featureTypeLblSegTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._featureTypeLblSegTxt = val;
        }
      });
      defineGetter(this, 'featureTypeLblSegTxt', function () {
        return this._featureTypeLblSegTxt;
      });
      defineSetter(this, 'featureViewEditBtnTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._featureViewEditBtnTxt = val;
        }
      });
      defineGetter(this, 'featureViewEditBtnTxt', function () {
        return this._featureViewEditBtnTxt;
      });
      defineSetter(this, 'featureViewProductGroupLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._featureViewProductGroupLblTxt = val;
        }
      });
      defineGetter(this, 'featureViewProductGroupLblTxt', function () {
        return this._featureViewProductGroupLblTxt;
      });
      defineSetter(this, 'featureViewSequenceNumberLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._featureViewSequenceNumberLblTxt = val;
        }
      });
      defineGetter(this, 'featureViewSequenceNumberLblTxt', function () {
        return this._featureViewSequenceNumberLblTxt;
      });
      defineSetter(this, 'featureViewMandatoryLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._featureViewMandatoryLblTxt = val;
        }
      });
      defineGetter(this, 'featureViewMandatoryLblTxt', function () {
        return this._featureViewMandatoryLblTxt;
      });
      defineSetter(this, 'featureViewDefaultValueLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._featureViewDefaultValueLblTxt = val;
        }
      });
      defineGetter(this, 'featureViewDefaultValueLblTxt', function () {
        return this._featureViewDefaultValueLblTxt;
      });
      defineSetter(this, 'featureViewDescValueLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._featureViewDescValueLblTxt = val;
        }
      });
      defineGetter(this, 'featureViewDescValueLblTxt', function () {
        return this._featureViewDescValueLblTxt;
      });
      defineSetter(this, 'featureViewOptionDetailsLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._featureViewOptionDetailsLblTxt = val;
        }
      });
      defineGetter(this, 'featureViewOptionDetailsLblTxt', function () {
        return this._featureViewOptionDetailsLblTxt;
      });
      defineSetter(this, 'featureViewOptionDisplayTypeLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._featureViewOptionDisplayTypeLblTxt = val;
        }
      });
      defineGetter(this, 'featureViewOptionDisplayTypeLblTxt', function () {
        return this._featureViewOptionDisplayTypeLblTxt;
      });
      defineSetter(this, 'featureViewValueLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._featureViewValueLblTxt = val;
        }
      });
      defineGetter(this, 'featureViewValueLblTxt', function () {
        return this._featureViewValueLblTxt;
      });
      defineSetter(this, 'featureViewDescriptionLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._featureViewDescriptionLblTxt = val;
        }
      });
      defineGetter(this, 'featureViewDescriptionLblTxt', function () {
        return this._featureViewDescriptionLblTxt;
      });
      defineSetter(this, 'imageTypeLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._imageTypeLblTxt = val;
        }
      });
      defineGetter(this, 'imageTypeLblTxt', function () {
        return this._imageTypeLblTxt;
      });
      defineSetter(this, 'imageTypeDropdownPlaceholderTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._imageTypeDropdownPlaceholderTxt = val;
        }
      });
      defineGetter(this, 'imageTypeDropdownPlaceholderTxt', function () {
        return this._imageTypeDropdownPlaceholderTxt;
      });
      defineSetter(this, 'imageURLLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._imageURLLblTxt = val;
        }
      });
      defineGetter(this, 'imageURLLblTxt', function () {
        return this._imageURLLblTxt;
      });
      defineSetter(this, 'imageURLPlaceholderTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._imageURLPlaceholderTxt = val;
        }
      });
      defineGetter(this, 'imageURLPlaceholderTxt', function () {
        return this._imageURLPlaceholderTxt;
      });
      defineSetter(this, 'addImageBtnTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._addImageBtnTxt = val;
        }
      });
      defineGetter(this, 'addImageBtnTxt', function () {
        return this._addImageBtnTxt;
      });
      defineSetter(this, 'attributeKeyLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._attributeKeyLblTxt = val;
        }
      });
      defineGetter(this, 'attributeKeyLblTxt', function () {
        return this._attributeKeyLblTxt;
      });
      defineSetter(this, 'attributeKeyPlaceholderTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._attributeKeyPlaceholderTxt = val;
        }
      });
      defineGetter(this, 'attributeKeyPlaceholderTxt', function () {
        return this._attributeKeyPlaceholderTxt;
      });
      defineSetter(this, 'attributeValueLblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._attributeValueLblTxt = val;
        }
      });
      defineGetter(this, 'attributeValueLblTxt', function () {
        return this._attributeValueLblTxt;
      });
      defineSetter(this, 'attributeValuePlaceholderTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._attributeValuePlaceholderTxt = val;
        }
      });
      defineGetter(this, 'attributeValuePlaceholderTxt', function () {
        return this._attributeValuePlaceholderTxt;
      });
      defineSetter(this, 'addAttributeBtnTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._addAttributeBtnTxt = val;
        }
      });
      defineGetter(this, 'addAttributeBtnTxt', function () {
        return this._addAttributeBtnTxt;
      });
      defineSetter(this, 'option1LblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._option1LblTxt = val;
        }
      });
      defineGetter(this, 'option1LblTxt', function () {
        return this._option1LblTxt;
      });
      defineSetter(this, 'subOption1LblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._subOption1LblTxt = val;
        }
      });
      defineGetter(this, 'subOption1LblTxt', function () {
        return this._subOption1LblTxt;
      });
      defineSetter(this, 'subOption2LblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._subOption2LblTxt = val;
        }
      });
      defineGetter(this, 'subOption2LblTxt', function () {
        return this._subOption2LblTxt;
      });
      defineSetter(this, 'option2LblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._option2LblTxt = val;
        }
      });
      defineGetter(this, 'option2LblTxt', function () {
        return this._option2LblTxt;
      });
      defineSetter(this, 'option3LblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._option3LblTxt = val;
        }
      });
      defineGetter(this, 'option3LblTxt', function () {
        return this._option3LblTxt;
      });
      defineSetter(this, 'option4LblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._option4LblTxt = val;
        }
      });
      defineGetter(this, 'option4LblTxt', function () {
        return this._option4LblTxt;
      });
      defineSetter(this, 'option5LblTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._option5LblTxt = val;
        }
      });
      defineGetter(this, 'option5LblTxt', function () {
        return this._option5LblTxt;
      });
      defineSetter(this, 'optionalFieldTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._optionalFieldTxt = val;
        }
      });
      defineGetter(this, 'optionalFieldTxt', function () {
        return this._optionalFieldTxt;
      });
      defineSetter(this, 'cancelBtnTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._cancelBtnTxt = val;
        }
      });
      defineGetter(this, 'cancelBtnTxt', function () {
        return this._cancelBtnTxt;
      });
      defineSetter(this, 'nextBtnTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._nextBtnTxt = val;
        }
      });
      defineGetter(this, 'nextBtnTxt', function () {
        return this._nextBtnTxt;
      });
      defineSetter(this, 'addProductBtnTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._addProductBtnTxt = val;
        }
      });
      defineGetter(this, 'addProductBtnTxt', function () {
        return this._addProductBtnTxt;
      });
      defineSetter(this, 'updateProductBtnTxt', function (val) {
        if (typeof val == 'string' && val != '') {
          this._updateProductBtnTxt = val;
        }
      });
      defineGetter(this, 'updateProductBtnTxt', function () {
        return this._updateProductBtnTxt;
      });
      defineSetter(this, 'deleteIcon', function (val) {
        if (typeof val == 'string' && val != '') {
          this._deleteIcon = JSON.parse(val);
        }
      });
      defineGetter(this, 'deleteIcon', function () {
        return this._deleteIcon;
      });
      defineSetter(this, 'editIcon', function (val) {
        if (typeof val == 'string' && val != '') {
          this._editIcon = JSON.parse(val);
        }
      });
      defineGetter(this, 'editIcon', function () {
        return this._editIcon;
      });
      defineSetter(this, 'selCheckboxIcon', function (val) {
        if (typeof val == 'string' && val != '') {
          this._selCheckboxIcon = JSON.parse(val);
        }
      });
      defineGetter(this, 'selCheckboxIcon', function () {
        return this._selCheckboxIcon;
      });
      defineSetter(this, 'unselCheckboxIcon', function (val) {
        if (typeof val == 'string' && val != '') {
          this._unselCheckboxIcon = JSON.parse(val);
        }
      });
      defineGetter(this, 'unselCheckboxIcon', function () {
        return this._unselCheckboxIcon;
      });
      defineSetter(this, 'tooltipInfoIcon', function (val) {
        if (typeof val == 'string' && val != '') {
          this._tooltipInfoIcon = JSON.parse(val);
        }
      });
      defineGetter(this, 'tooltipInfoIcon', function () {
        return this._tooltipInfoIcon;
      });
      defineSetter(this, 'errorIcon', function (val) {
        if (typeof val == 'string' && val != '') {
          this._errorIcon = JSON.parse(val);
        }
      });
      defineGetter(this, 'errorIcon', function () {
        return this._errorIcon;
      });
      defineSetter(this, 'sortUpDownIcon', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sortUpDownIcon = JSON.parse(val);
        }
      });
      defineGetter(this, 'sortUpDownIcon', function () {
        return this._sortUpDownIcon;
      });
      defineSetter(this, 'downArrowIcon', function (val) {
        if (typeof val == 'string' && val != '') {
          this._downArrowIcon = JSON.parse(val);
        }
      });
      defineGetter(this, 'downArrowIcon', function () {
        return this._downArrowIcon;
      });
      defineSetter(this, 'upArrowIcon', function (val) {
        if (typeof val == 'string' && val != '') {
          this._upArrowIcon = JSON.parse(val);
        }
      });
      defineGetter(this, 'upArrowIcon', function () {
        return this._upArrowIcon;
      });
      defineSetter(this, 'segMoreDetailsIcon', function (val) {
        if (typeof val == 'string' && val != '') {
          this._segMoreDetailsIcon = JSON.parse(val);
        }
      });
      defineGetter(this, 'segMoreDetailsIcon', function () {
        return this._segMoreDetailsIcon;
      });
      defineSetter(this, 'menuRightArrowIcon', function (val) {
        if (typeof val == 'string' && val != '') {
          this._menuRightArrowIcon = JSON.parse(val);
        }
      });
      defineGetter(this, 'menuRightArrowIcon', function () {
        return this._menuRightArrowIcon;
      });
      defineSetter(this, 'leftVBarBgSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._leftVBarBgSkin = val;
        }
      });
      defineGetter(this, 'leftVBarBgSkin', function () {
        return this._leftVBarBgSkin;
      });
      defineSetter(this, 'leftVBarBtnUnselectedSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._leftVBarBtnUnselectedSkin = val;
        }
      });
      defineGetter(this, 'leftVBarBtnUnselectedSkin', function () {
        return this._leftVBarBtnUnselectedSkin;
      });
      defineSetter(this, 'leftVBarBtnSelectedSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._leftVBarBtnSelectedSkin = val;
        }
      });
      defineGetter(this, 'leftVBarBtnSelectedSkin', function () {
        return this._leftVBarBtnSelectedSkin;
      });
      defineSetter(this, 'leftVBarBtnHoverSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._leftVBarBtnHoverSkin = val;
        }
      });
      defineGetter(this, 'leftVBarBtnHoverSkin', function () {
        return this._leftVBarBtnHoverSkin;
      });
      defineSetter(this, 'leftVBarOptionalLblSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._leftVBarOptionalLblSkin = val;
        }
      });
      defineGetter(this, 'leftVBarOptionalLblSkin', function () {
        return this._leftVBarOptionalLblSkin;
      });
      defineSetter(this, 'leftVBarSeparatorSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._leftVBarSeparatorSkin = val;
        }
      });
      defineGetter(this, 'leftVBarSeparatorSkin', function () {
        return this._leftVBarSeparatorSkin;
      });
      defineSetter(this, 'leftVBarCollapseIconSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._leftVBarCollapseIconSkin = val;
        }
      });
      defineGetter(this, 'leftVBarCollapseIconSkin', function () {
        return this._leftVBarCollapseIconSkin;
      });
      defineSetter(this, 'leftVBarRightArrowIconSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._leftVBarRightArrowIconSkin = val;
        }
      });
      defineGetter(this, 'leftVBarRightArrowIconSkin', function () {
        return this._leftVBarRightArrowIconSkin;
      });
      defineSetter(this, 'bottomBarBgSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._bottomBarBgSkin = val;
        }
      });
      defineGetter(this, 'bottomBarBgSkin', function () {
        return this._bottomBarBgSkin;
      });
      defineSetter(this, 'bottomBarCancelBtnSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._bottomBarCancelBtnSkin = val;
        }
      });
      defineGetter(this, 'bottomBarCancelBtnSkin', function () {
        return this._bottomBarCancelBtnSkin;
      });
      defineSetter(this, 'bottomBarCancelBtnHoverSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._bottomBarCancelBtnHoverSkin = val;
        }
      });
      defineGetter(this, 'bottomBarCancelBtnHoverSkin', function () {
        return this._bottomBarCancelBtnHoverSkin;
      });
      defineSetter(this, 'bottomBarBtnLightSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._bottomBarBtnLightSkin = val;
        }
      });
      defineGetter(this, 'bottomBarBtnLightSkin', function () {
        return this._bottomBarBtnLightSkin;
      });
      defineSetter(this, 'bottomBarBtnDarkSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._bottomBarBtnDarkSkin = val;
        }
      });
      defineGetter(this, 'bottomBarBtnDarkSkin', function () {
        return this._bottomBarBtnDarkSkin;
      });
      defineSetter(this, 'commonLabelSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._commonLabelSkin = val;
        }
      });
      defineGetter(this, 'commonLabelSkin', function () {
        return this._commonLabelSkin;
      });
      defineSetter(this, 'tbxNormalSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._tbxNormalSkin = val;
        }
      });
      defineGetter(this, 'tbxNormalSkin', function () {
        return this._tbxNormalSkin;
      });
      defineSetter(this, 'tbxErrorSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._tbxErrorSkin = val;
        }
      });
      defineGetter(this, 'tbxErrorSkin', function () {
        return this._tbxErrorSkin;
      });
      defineSetter(this, 'tbxDisabledSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._tbxDisabledSkin = val;
        }
      });
      defineGetter(this, 'tbxDisabledSkin', function () {
        return this._tbxDisabledSkin;
      });
      defineSetter(this, 'tbxAreaNormalSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._tbxAreaNormalSkin = val;
        }
      });
      defineGetter(this, 'tbxAreaNormalSkin', function () {
        return this._tbxAreaNormalSkin;
      });
      defineSetter(this, 'tbxAreaErrorSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._tbxAreaErrorSkin = val;
        }
      });
      defineGetter(this, 'tbxAreaErrorSkin', function () {
        return this._tbxAreaErrorSkin;
      });
      defineSetter(this, 'lstboxNormalSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._lstboxNormalSkin = val;
        }
      });
      defineGetter(this, 'lstboxNormalSkin', function () {
        return this._lstboxNormalSkin;
      });
      defineSetter(this, 'lstboxErrorSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._lstboxErrorSkin = val;
        }
      });
      defineGetter(this, 'lstboxErrorSkin', function () {
        return this._lstboxErrorSkin;
      });
      defineSetter(this, 'lstboxDisabledSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._lstboxDisabledSkin = val;
        }
      });
      defineGetter(this, 'lstboxDisabledSkin', function () {
        return this._lstboxDisabledSkin;
      });
      defineSetter(this, 'calendarNormalSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._calendarNormalSkin = val;
        }
      });
      defineGetter(this, 'calendarNormalSkin', function () {
        return this._calendarNormalSkin;
      });
      defineSetter(this, 'calendarErrorSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._calendarErrorSkin = val;
        }
      });
      defineGetter(this, 'calendarErrorSkin', function () {
        return this._calendarErrorSkin;
      });
      defineSetter(this, 'commonRightBackgroundSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._commonRightBackgroundSkin = val;
        }
      });
      defineGetter(this, 'commonRightBackgroundSkin', function () {
        return this._commonRightBackgroundSkin;
      });
      defineSetter(this, 'errorMsgIconSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._errorMsgIconSkin = val;
        }
      });
      defineGetter(this, 'errorMsgIconSkin', function () {
        return this._errorMsgIconSkin;
      });
      defineSetter(this, 'errorMsgTextSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._errorMsgTextSkin = val;
        }
      });
      defineGetter(this, 'errorMsgTextSkin', function () {
        return this._errorMsgTextSkin;
      });
      defineSetter(this, 'txtCounterLabelSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._txtCounterLabelSkin = val;
        }
      });
      defineGetter(this, 'txtCounterLabelSkin', function () {
        return this._txtCounterLabelSkin;
      });
      defineSetter(this, 'segmentOptionsIconSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._segmentOptionsIconSkin = val;
        }
      });
      defineGetter(this, 'segmentOptionsIconSkin', function () {
        return this._segmentOptionsIconSkin;
      });
      defineSetter(this, 'popupCloseCrossBtnSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._popupCloseCrossBtnSkin = val;
        }
      });
      defineGetter(this, 'popupCloseCrossBtnSkin', function () {
        return this._popupCloseCrossBtnSkin;
      });
      defineSetter(this, 'AddSegmentRowBtnSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._AddSegmentRowBtnSkin = val;
        }
      });
      defineGetter(this, 'AddSegmentRowBtnSkin', function () {
        return this._AddSegmentRowBtnSkin;
      });
      defineSetter(this, 'sortconsSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sortconsSkin = val;
        }
      });
      defineGetter(this, 'sortconsSkin', function () {
        return this._sortconsSkin;
      });
      defineSetter(this, 'deleteIconSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._deleteIconSkin = val;
        }
      });
      defineGetter(this, 'deleteIconSkin', function () {
        return this._deleteIconSkin;
      });
      defineSetter(this, 'checkboxSelIconSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._checkboxSelIconSkin = val;
        }
      });
      defineGetter(this, 'checkboxSelIconSkin', function () {
        return this._checkboxSelIconSkin;
      });
      defineSetter(this, 'checkboxUnselIconSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._checkboxUnselIconSkin = val;
        }
      });
      defineGetter(this, 'checkboxUnselIconSkin', function () {
        return this._checkboxUnselIconSkin;
      });
      defineSetter(this, 'prodPurposeSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._prodPurposeSkin = val;
        }
      });
      defineGetter(this, 'prodPurposeSkin', function () {
        return this._prodPurposeSkin;
      });
      defineSetter(this, 'prodPurposeDropdownIConSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._prodPurposeDropdownIConSkin = val;
        }
      });
      defineGetter(this, 'prodPurposeDropdownIConSkin', function () {
        return this._prodPurposeDropdownIConSkin;
      });
      defineSetter(this, 'dateDisabledFlexSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._dateDisabledFlexSkin = val;
        }
      });
      defineGetter(this, 'dateDisabledFlexSkin', function () {
        return this._dateDisabledFlexSkin;
      });
      defineSetter(this, 'dateDisabledIconLblSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._dateDisabledIconLblSkin = val;
        }
      });
      defineGetter(this, 'dateDisabledIconLblSkin', function () {
        return this._dateDisabledIconLblSkin;
      });
      defineSetter(this, 'dateDisabledLblTxtSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._dateDisabledLblTxtSkin = val;
        }
      });
      defineGetter(this, 'dateDisabledLblTxtSkin', function () {
        return this._dateDisabledLblTxtSkin;
      });
      defineSetter(this, 'screenHeaderLblSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._screenHeaderLblSkin = val;
        }
      });
      defineGetter(this, 'screenHeaderLblSkin', function () {
        return this._screenHeaderLblSkin;
      });
      defineSetter(this, 'addFeatureBtnSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._addFeatureBtnSkin = val;
        }
      });
      defineGetter(this, 'addFeatureBtnSkin', function () {
        return this._addFeatureBtnSkin;
      });
      defineSetter(this, 'noFeatureScreenDescSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._noFeatureScreenDescSkin = val;
        }
      });
      defineGetter(this, 'noFeatureScreenDescSkin', function () {
        return this._noFeatureScreenDescSkin;
      });
      defineSetter(this, 'segHeaderLblTxtSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._segHeaderLblTxtSkin = val;
        }
      });
      defineGetter(this, 'segHeaderLblTxtSkin', function () {
        return this._segHeaderLblTxtSkin;
      });
      defineSetter(this, 'popupCmnBgSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._popupCmnBgSkin = val;
        }
      });
      defineGetter(this, 'popupCmnBgSkin', function () {
        return this._popupCmnBgSkin;
      });
      defineSetter(this, 'popupCmnTopBarSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._popupCmnTopBarSkin = val;
        }
      });
      defineGetter(this, 'popupCmnTopBarSkin', function () {
        return this._popupCmnTopBarSkin;
      });
      defineSetter(this, 'popupCmnHeadingLblSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._popupCmnHeadingLblSkin = val;
        }
      });
      defineGetter(this, 'popupCmnHeadingLblSkin', function () {
        return this._popupCmnHeadingLblSkin;
      });
      defineSetter(this, 'optionDetailsSegBgSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._optionDetailsSegBgSkin = val;
        }
      });
      defineGetter(this, 'optionDetailsSegBgSkin', function () {
        return this._optionDetailsSegBgSkin;
      });
      defineSetter(this, 'bottomBarBgSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._bottomBarBgSkin = val;
        }
      });
      defineGetter(this, 'bottomBarBgSkin', function () {
        return this._bottomBarBgSkin;
      });
      defineSetter(this, 'lblKeySkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._lblKeySkin = val;
        }
      });
      defineGetter(this, 'lblKeySkin', function () {
        return this._lblKeySkin;
      });
      defineSetter(this, 'addAttrTextBoxSkin', function (val) {
        if (typeof val == 'string' && val != '') {
          this._addAttrTextBoxSkin = val;
        }
      });
      defineGetter(this, 'addAttrTextBoxSkin', function () {
        return this._addAttrTextBoxSkin;
      });
      defineGetter(this, 'bottomBarBtnLightHoverSkin', () => {
        return this._bottomBarBtnLightHoverSkin;
      });
      defineSetter(this, 'bottomBarBtnLightHoverSkin', value => {
        this._bottomBarBtnLightHoverSkin = value;
      });
      defineGetter(this, 'bottomBarBtnDarkHoverSkin', () => {
        return this._bottomBarBtnDarkHoverSkin;
      });
      defineSetter(this, 'bottomBarBtnDarkHoverSkin', value => {
        this._bottomBarBtnDarkHoverSkin = value;
      });
      defineGetter(this, 'facilityNameLblTxt', () => {
        return this._facilityNameLblTxt;
      });
      defineSetter(this, 'facilityNameLblTxt', value => {
        this._facilityNameLblTxt = value;
      });
      defineGetter(this, 'facilityCodeLblTxt', () => {
        return this._facilityCodeLblTxt;
      });
      defineSetter(this, 'facilityCodeLblTxt', value => {
        this._facilityCodeLblTxt = value;
      });
      defineGetter(this, 'leftVBarExpandIconSkin', () => {
        return this._leftVBarExpandIconSkin;
      });
      defineSetter(this, 'leftVBarExpandIconSkin', value => {
        this._leftVBarExpandIconSkin = value;
      });
    },

    addProductPreShow: function(){
      this.setConfigChanges();
      this.setTextFromi18n();
      this.assignDefaultText();
      this.assignDefaultSkins();
      this.setDesginTimeConfigs();
      this.addCustomDateWidget();
      this.setFlowActions();
      this.view.flxAddProductPopups.setVisibility(false);
    },

    setConfigChanges:function(){
      const scopeObj = this;
      let configurationSvc = kony.sdk.getCurrentInstance().getConfigurationService();
      configurationSvc.getAllClientAppProperties(function(response) {
        if(response && response.MARKETING_CATALOG_CONFIG && response.MARKETING_CATALOG_CONFIG.toUpperCase()==="FALSE"){
          scopeObj.isConfig2 = false;
        } else {
          scopeObj.isConfig2 = true;
        }
      },function(){}); 
    },

    setTextFromi18n: function(){
      // Fetches i18n from Component Properties and saves to variable. In case i18n is not available uses Text Value given in Properties as it is.

      // Property Values for Product Details Screen Text Fields
      this._productLineLblTxt = this.getStringFromi18n(this._productLineLblTxt);
      this._productLineDropdownPlaceholderTxt = this.getStringFromi18n(this._productLineDropdownPlaceholderTxt);
      this._productLineErrorMsgTxt = this.getStringFromi18n(this._productLineErrorMsgTxt);
      this._productGroupLblTxt = this.getStringFromi18n(this._productGroupLblTxt);
      this._productGroupDropdownPlaceholderTxt = this.getStringFromi18n(this._productGroupDropdownPlaceholderTxt);
      this._productGroupErrorMsgTxt = this.getStringFromi18n(this._productGroupErrorMsgTxt);
      this._productNameLblTxt = this.getStringFromi18n(this._productNameLblTxt);
      this._productNamePlaceholderTxt = this.getStringFromi18n(this._productNamePlaceholderTxt);
      this._productNameErrorMsgTxt = this.getStringFromi18n(this._productNameErrorMsgTxt);
      this._productRefLblTxt = this.getStringFromi18n(this._productRefLblTxt);
      this._productRefPlaceholderTxt = this.getStringFromi18n(this._productRefPlaceholderTxt);
      this._productRefErrorMsgTxt = this.getStringFromi18n(this._productRefErrorMsgTxt);
      this._startDateLblTxt = this.getStringFromi18n(this._startDateLblTxt);
      this._startDateErrorMsgTxt = this.getStringFromi18n(this._startDateErrorMsgTxt);
      this._endDateLblTxt = this.getStringFromi18n(this._endDateLblTxt);
      this._endDateErrorMsgTxt = this.getStringFromi18n(this._endDateErrorMsgTxt);
      this._purposeLblTxt = this.getStringFromi18n(this._purposeLblTxt);
      this._purposeDropdownPlaceholderTxt = this.getStringFromi18n(this._purposeDropdownPlaceholderTxt);
      this._purposeErrorMsgTxt = this.getStringFromi18n(this._purposeErrorMsgTxt);
      // Property Values for Product Details Screen Additional Text Fields
      this._label1Txt = this.getStringFromi18n(this._label1Txt);
      this._placeholder1Txt = this.getStringFromi18n(this._placeholder1Txt);
      this._label2Txt = this.getStringFromi18n(this._label2Txt);
      this._placeholder2Txt = this.getStringFromi18n(this._placeholder2Txt);      
      this._label3Txt = this.getStringFromi18n(this._label3Txt);
      this._placeholder3Txt = this.getStringFromi18n(this._placeholder3Txt);
      this._label4Txt = this.getStringFromi18n(this._label4Txt);
      this._placeholder4Txt = this.getStringFromi18n(this._placeholder4Txt);
      this._label5Txt = this.getStringFromi18n(this._label5Txt);
      this._placeholder5Txt = this.getStringFromi18n(this._placeholder5Txt);
      this._label6Txt = this.getStringFromi18n(this._label6Txt);
      this._placeholder6Txt = this.getStringFromi18n(this._placeholder6Txt);
      this._label7Txt = this.getStringFromi18n(this._label7Txt);
      this._placeholder7Txt = this.getStringFromi18n(this._placeholder7Txt);
      this._label8Txt = this.getStringFromi18n(this._label8Txt);
      this._placeholder8Txt = this.getStringFromi18n(this._placeholder8Txt);
      this._label9Txt = this.getStringFromi18n(this._label9Txt);
      this._placeholder9Txt = this.getStringFromi18n(this._placeholder9Txt);
      this._label10Txt = this.getStringFromi18n(this._label10Txt);
      this._placeholder10Txt = this.getStringFromi18n(this._placeholder10Txt);
      this._label11Txt = this.getStringFromi18n(this._label11Txt);
      this._placeholder11Txt = this.getStringFromi18n(this._placeholder11Txt);
      this._label12Txt = this.getStringFromi18n(this._label12Txt);
      this._placeholder12Txt = this.getStringFromi18n(this._placeholder12Txt);      
      this._label13Txt = this.getStringFromi18n(this._label13Txt);
      this._placeholder13Txt = this.getStringFromi18n(this._placeholder13Txt);
      this._label14Txt = this.getStringFromi18n(this._label14Txt);
      this._placeholder14Txt = this.getStringFromi18n(this._placeholder14Txt);      
      this._label15Txt = this.getStringFromi18n(this._label15Txt);
      this._placeholder15Txt = this.getStringFromi18n(this._placeholder15Txt);
      // Property Values for Product Description Screen Text Fields
      this._descLblTxt = this.getStringFromi18n(this._descLblTxt);
      this._descPlaceholderTxt = this.getStringFromi18n(this._descPlaceholderTxt);
      this._detailedDescLblTxt = this.getStringFromi18n(this._detailedDescLblTxt);
      this._detailedDescPlaceholderTxt = this.getStringFromi18n(this._detailedDescPlaceholderTxt);
      this._notesLblTxt = this.getStringFromi18n(this._notesLblTxt);
      this._notesPlaceholderTxt = this.getStringFromi18n(this._notesPlaceholderTxt);
      this._notesToolTipTxt = this.getStringFromi18n(this._notesToolTipTxt);
      this._disclosureLblTxt = this.getStringFromi18n(this._disclosureLblTxt);
      this._disclosurePlaceholderTxt = this.getStringFromi18n(this._disclosurePlaceholderTxt);
      this._tandCLblTxt = this.getStringFromi18n(this._tandCLblTxt);
      this._tandCPlaceholderTxt = this.getStringFromi18n(this._tandCPlaceholderTxt);
      // Property Values for Product Features Screen Text Fields
      this._featureHeadingLblTxt = this.getStringFromi18n(this._featureHeadingLblTxt);
      this._addFeatureBtnTxt = this.getStringFromi18n(this._addFeatureBtnTxt);
      this._noFeatureDescTxt = this.getStringFromi18n(this._noFeatureDescTxt);
      this._featureNameLblSegTxt = this.getStringFromi18n(this._featureNameLblSegTxt);
      this._featureGroupLblSegTxt = this.getStringFromi18n(this._featureGroupLblSegTxt);
      this._featureTypeLblSegTxt = this.getStringFromi18n(this._featureTypeLblSegTxt);
      // Property Values for Popup Add Product Features Screen Text Fields
      this._facilityNameLblTxt = this.getStringFromi18n(this._facilityNameLblTxt);
      this._facilityCodeLblTxt = this.getStringFromi18n(this._facilityCodeLblTxt);
      // Property Values for Popup View Product Features Screen Text Fields
      /*this._featureViewEditBtnTxt = this.getStringFromi18n(this._featureViewEditBtnTxt);
      this._featureViewProductGroupLblTxt = this.getStringFromi18n(this._featureViewProductGroupLblTxt);
      this._featureViewSequenceNumberLblTxt = this.getStringFromi18n(this._featureViewSequenceNumberLblTxt);
      this._featureViewMandatoryLblTxt = this.getStringFromi18n(this._featureViewMandatoryLblTxt);
      this._featureViewDefaultValueLblTxt = this.getStringFromi18n(this._featureViewDefaultValueLblTxt);
      this._featureViewDescValueLblTxt = this.getStringFromi18n(this._featureViewDescValueLblTxt);
      this._featureViewOptionDetailsLblTxt = this.getStringFromi18n(this._featureViewOptionDetailsLblTxt);
      this._featureViewOptionDisplayTypeLblTxt = this.getStringFromi18n(this._featureViewOptionDisplayTypeLblTxt);
      this._featureViewValueLblTxt = this.getStringFromi18n(this._featureViewValueLblTxt);
      this._featureViewDescriptionLblTxt = this.getStringFromi18n(this._featureViewDescriptionLblTxt);*/
      // Property Values for Image Details Screen Text Fields
      this._imageTypeLblTxt = this.getStringFromi18n(this._imageTypeLblTxt);
      this._imageTypeDropdownPlaceholderTxt = this.getStringFromi18n(this._imageTypeDropdownPlaceholderTxt);
      this._imageURLLblTxt = this.getStringFromi18n(this._imageURLLblTxt);
      this._imageURLPlaceholderTxt = this.getStringFromi18n(this._imageURLPlaceholderTxt);
      this._addImageBtnTxt = this.getStringFromi18n(this._addImageBtnTxt);
      // Property Values for Additional Attributes Screen Text Fields
      this._attributeKeyLblTxt = this.getStringFromi18n(this._attributeKeyLblTxt);
      this._attributeKeyPlaceholderTxt = this.getStringFromi18n(this._attributeKeyPlaceholderTxt);
      this._attributeValueLblTxt = this.getStringFromi18n(this._attributeValueLblTxt);
      this._attributeValuePlaceholderTxt = this.getStringFromi18n(this._attributeValuePlaceholderTxt);
      this._addAttributeBtnTxt = this.getStringFromi18n(this._addAttributeBtnTxt);
      // Property Values for Navigation Bar Text Fields
      this._option1LblTxt = this.getStringFromi18n(this._option1LblTxt);
      this._subOption1LblTxt = this.getStringFromi18n(this._subOption1LblTxt);
      this._subOption2LblTxt = this.getStringFromi18n(this._subOption2LblTxt);
      this._option2LblTxt = this.getStringFromi18n(this._option2LblTxt);
      this._option3LblTxt = this.getStringFromi18n(this._option3LblTxt);
      this._option4LblTxt = this.getStringFromi18n(this._option4LblTxt);
      this._option5LblTxt = this.getStringFromi18n(this._option5LblTxt);
      this._optionalFieldTxt = this.getStringFromi18n(this._optionalFieldTxt);
      this._cancelBtnTxt = this.getStringFromi18n(this._cancelBtnTxt);
      this._nextBtnTxt = this.getStringFromi18n(this._nextBtnTxt);
      this._addProductBtnTxt = this.getStringFromi18n(this._addProductBtnTxt);
      this._updateProductBtnTxt = this.getStringFromi18n(this._updateProductBtnTxt);
      // Property Values for Icon Texts
      this._deleteIcon = this._deleteIcon.text ? this._deleteIcon.text : this._deleteIcon;
      this._editIcon= this._editIcon.text ? this._editIcon.text : this._editIcon;
      this._selCheckboxIcon= this._selCheckboxIcon.text ? this._selCheckboxIcon.text : this._selCheckboxIcon;
      this._unselCheckboxIcon= this._unselCheckboxIcon.text ? this._unselCheckboxIcon.text : this._unselCheckboxIcon;
      this._tooltipInfoIcon= this._tooltipInfoIcon.text ? this._tooltipInfoIcon.text : this._tooltipInfoIcon;
      this._errorIcon= this._errorIcon.text ? this._errorIcon.text : this._errorIcon;
      this._sortUpDownIcon= this._sortUpDownIcon.text ? this._sortUpDownIcon.text : this._sortUpDownIcon;
      this._downArrowIcon= this._downArrowIcon.text ? this._downArrowIcon.text : this._downArrowIcon;
      this._upArrowIcon= this._upArrowIcon.text ? this._upArrowIcon.text : this._upArrowIcon;
      this._segMoreDetailsIcon= this._segMoreDetailsIcon.text ? this._segMoreDetailsIcon.text : this._segMoreDetailsIcon;
      this._menuRightArrowIcon= this._menuRightArrowIcon.text ? this._menuRightArrowIcon.text : this._menuRightArrowIcon;
    },

    getStringFromi18n: function(stringValue){
      return  kony.i18n.getLocalizedString(stringValue) ? kony.i18n.getLocalizedString(stringValue) : stringValue;
    },

    assignDefaultText: function(){
      // Assigning Property Values for Product Details Screen Text Fields
      this.view.lblProductLine.text = this._productLineLblTxt;
      this.view.lblErrorText1.text = this._productLineErrorMsgTxt;
      this.view.lblProductGroup.text = this._productGroupLblTxt;
      this.view.lblErrorText2.text = this._productGroupErrorMsgTxt;
      this.view.lblProductName.text = this._productNameLblTxt;
      this.view.tbxProductName.placeholder = this._productNamePlaceholderTxt;
      this.view.lblErrorText3.text = this._productNameErrorMsgTxt;
      this.view.lblProductReference.text = this._productRefLblTxt;
      this.view.tbxProductReference.placeholder = this._productRefPlaceholderTxt;
      this.view.lblErrorText4.text = this._productRefErrorMsgTxt;
      this.view.lblAvailableFromDate.text = this._startDateLblTxt;
      this.view.blAvailableToDate.text = this._endDateLblTxt;
      this.view.lblProductPurpose.text = this._purposeLblTxt;
      this.view.lblSelectedValue.text = this._purposeDropdownPlaceholderTxt;
      // Assigning Property Values for Product Details Screen Additional Text Fields
      for(let widgetNum=1; widgetNum<=15; widgetNum++){
        this.view["lblAdditionalField"+widgetNum].text = this["_label"+ widgetNum +"Txt"];
        this.view["tbxAdditionalField"+widgetNum].placeholder = this["_placeholder"+ widgetNum +"Txt"];
      }
      // Assigning Property Values for Product Description Screen Text Fields
      this.view.lblDescription.text = this._descLblTxt;
      this.view.txtAreaDescription.placeholder = this._descPlaceholderTxt;
      this.view.lblDetailedDescription.text = this._detailedDescLblTxt;
      this.view.txtAreaDetailedDescription.placeholder = this._detailedDescPlaceholderTxt;
      this.view.lblNotes.text = this._notesLblTxt;
      this.view.txtAreaNotes.placeholder = this._notesPlaceholderTxt;
      this.view.lblFontIconNotesInfo.text = this._tooltipInfoIcon;
      this.view.lblFontIconNotesInfo.toolTip = this._notesToolTipTxt;
      this.view.lblDisclosure.text = this._disclosureLblTxt;
      this.view.txtAreaDisclosure.placeholder = this._disclosurePlaceholderTxt;
      this.view.lblTermsAndConditions.text = this._tandCLblTxt;
      this.view.txtAreaTermsAndConditions.placeholder = this._tandCPlaceholderTxt;
      // Assigning Property Values for Product Features Screen Text Fields
      this.view.lblFeaturesHeader.text = this._featureHeadingLblTxt + " (0)";
      this.view.btnAddFeature1.text = this._addFeatureBtnTxt;
      this.view.lblFeaturesCanBeAdded.text = this._noFeatureDescTxt;
      this.view.btnAddFeature2.text = this._addFeatureBtnTxt;
      this.view.lblFeatureName.text = this._featureNameLblSegTxt;
      this.view.lblFeatureGroup.text = this._featureGroupLblSegTxt;
      this.view.lblType.text = this._featureTypeLblSegTxt;
      // Assigning Property Values for Popup Add Product Features Screen Text Fields
      this.view.lblAddFacilityCode.text = this._facilityCodeLblTxt;
      this.view.lblAddFacilityName.text = this._facilityNameLblTxt;
      this.view.tbxAddFacilityCode.placeholder = this._facilityCodeLblTxt;
      // Assigning Property Values for Image Details Screen Text Fields
      this.view.btnAddImage.text = this._addImageBtnTxt;
      // Assigning Property Values for Additional Attributes Screen Text Fields
      this.view.lblAttribute.text = this._attributeKeyLblTxt;
      this.view.lblAttributeValue.text = this._attributeValueLblTxt;
      this.view.btnAddAttribute.text = this._addAttributeBtnTxt;
      // Assigning Property Values for Navigation Bar Text Fields
      this.view.lblOption1.text = this._option1LblTxt;
      this.view.lblSubOption1.text = this._subOption1LblTxt;
      this.view.lblSubOption2.text = this._subOption2LblTxt;
      this.view.lblOption2.text = this._option2LblTxt;
      this.view.lblOption3.text = this._option3LblTxt;
      this.view.lblOption4.text = this._option4LblTxt;
      this.view.lblOption5.text = this._option5LblTxt;
      this.view.lblOptionalIndicator2.text = this._optionalFieldTxt;
      this.view.lblOptionalIndicator5.text = this._optionalFieldTxt;
      this.view.btnCancelAddProduct.text = this._cancelBtnTxt;
      this.view.btnNext.text = this._nextBtnTxt;
      this.view.btnAddProduct.text = this._addProductBtnTxt;
      this.view.lblFontIconRightArrow1.text = this._menuRightArrowIcon;
      this.view.lblFontIconRightArrow2.text = this._menuRightArrowIcon;
      this.view.lblFontIconRightArrow3.text = this._menuRightArrowIcon;
      this.view.lblFontIconRightArrow4.text = this._menuRightArrowIcon;
      this.view.lblFontIconRightArrow5.text = this._menuRightArrowIcon;
    },

    assignDefaultSkins: function(){
      // Assigning Property Values for Navigation Bar Skins
      this.view.flxVerticalTabs.skin = this._leftVBarBgSkin;
      this.view.lblOption1.skin = this._leftVBarBtnSelectedSkin;
      this.view.lblSubOption1.skin = this._leftVBarBtnSelectedSkin;
      this.view.lblSubOption2.skin = this._leftVBarBtnUnselectedSkin;
      this.view.lblOption2.skin = this._leftVBarBtnUnselectedSkin;
      this.view.lblOption3.skin = this._leftVBarBtnUnselectedSkin;
      this.view.lblOption4.skin = this._leftVBarBtnUnselectedSkin;
      this.view.lblOption5.skin = this._leftVBarBtnUnselectedSkin;
      this.view.lblOptionalIndicator2.skin = this._leftVBarOptionalLblSkin;
      this.view.lblOptionalIndicator5.skin = this._leftVBarOptionalLblSkin;
      this.view.flxTabSeparator1.skin = this._leftVBarSeparatorSkin;
      this.view.flxTabSeparator2.skin = this._leftVBarSeparatorSkin;
      this.view.flxTabSeparator3.skin = this._leftVBarSeparatorSkin;
      this.view.lblFontIconArrow.skin = this._leftVBarExpandIconSkin;
      this.view.lblFontIconRightArrow1.skin = this._leftVBarRightArrowIconSkin;
      this.view.lblFontIconRightArrow2.skin = this._leftVBarRightArrowIconSkin;
      this.view.lblFontIconRightArrow3.skin = this._leftVBarRightArrowIconSkin;
      this.view.lblFontIconRightArrow4.skin = this._leftVBarRightArrowIconSkin;
      this.view.lblFontIconRightArrow5.skin = this._leftVBarRightArrowIconSkin;
      this.view.flxNavigationBarButtons.skin = this._bottomBarBgSkin;
      this.view.btnCancelAddProduct.skin = this._bottomBarCancelBtnSkin;
      this.view.btnCancelAddProduct.focusSkin = this._bottomBarCancelBtnSkin;
      this.view.btnCancelAddProduct.hoverSkin = this._bottomBarCancelBtnHoverSkin;
      this.view.btnNext.skin = this._bottomBarBtnLightSkin;
      this.view.btnNext.focusSkin = this._bottomBarBtnLightSkin;
      this.view.btnNext.hoverSkin = this._bottomBarBtnLightHoverSkin;
      this.view.btnAddProduct.skin = this._bottomBarBtnDarkSkin;
      this.view.btnAddProduct.focusSkin  = this._bottomBarBtnDarkSkin;
      this.view.btnAddProduct.hoverSkin = this._bottomBarBtnDarkHoverSkin;
      //Assigning Common Skins
      this.view.flxAddProductMain.skin = this._commonRightBackgroundSkin;
      // Assigning Property Values for Product Details Skins
      this.view.lblProductLine.skin = this._commonLabelSkin;
      this.view.lstboxProductLine.skin = this._lstboxNormalSkin;
      this.view.lblProductGroup.skin = this._commonLabelSkin;
      this.view.lstboxProductGroup.skin = this._lstboxNormalSkin;
      this.view.lblProductName.skin = this._commonLabelSkin;
      this.view.tbxProductName.skin = this._tbxNormalSkin;
      this.view.lblProductReference.skin = this._commonLabelSkin;
      this.view.tbxProductReference.skin = this._tbxNormalSkin;
      this.view.lblAvailableFromDate.skin = this._commonLabelSkin;
      this.view.flxShowStartDate.skin = this._dateDisabledFlexSkin;
      this.view.lblIconCalendar1.skin = this._dateDisabledIconLblSkin;
      this.view.lblStartDate.skin = this._dateDisabledLblTxtSkin;
      this.view.blAvailableToDate.skin = this._commonLabelSkin;
      this.view.flxShowEndDate.skin = this._dateDisabledFlexSkin;
      this.view.lblIconCalendar2.skin = this._dateDisabledIconLblSkin;
      this.view.lblEndDate.skin = this._dateDisabledLblTxtSkin;
      this.view.lblProductPurpose.skin = this._commonLabelSkin;
      this.view.lblSelectedValue.skin = this._commonLabelSkin;
      this.view.flxSelectedText.skin = this._prodPurposeSkin;
      this.view.lblIconDropdown.skin = this._prodPurposeDropdownIConSkin;
      this.view.lblErrorIcon1.skin = this._errorMsgIconSkin;
      this.view.lblErrorText1.skin = this._errorMsgTextSkin;
      for(let widgetNum=1; widgetNum<=7; widgetNum++){
        this.view["lblErrorIcon"+widgetNum].skin = this._errorMsgIconSkin;
        this.view["lblErrorText"+widgetNum].skin = this._errorMsgTextSkin;
      }
      for(let widgetNum=1; widgetNum<=15; widgetNum++){
        this.view["lblAdditionalField"+widgetNum].skin = this._commonLabelSkin;
        this.view["tbxAdditionalField"+widgetNum].skin = this._tbxNormalSkin;
      }
      // Assigning Property Values for Product Description Skins
      this.view.lblDescription.skin = this._commonLabelSkin;
      this.view.lblDescTextCounter.skin = this._txtCounterLabelSkin;
      this.view.txtAreaDescription.skin = this._tbxAreaNormalSkin;
      this.view.lblDetailedDescription.skin = this._commonLabelSkin;
      this.view.lblDetailedDescTextCounter.skin = this._txtCounterLabelSkin;
      this.view.txtAreaDetailedDescription.skin = this._tbxAreaNormalSkin;
      this.view.lblNotes.skin = this._commonLabelSkin;
      this.view.txtAreaNotes.skin = this._tbxAreaNormalSkin;
      this.view.lblDisclosure.skin = this._commonLabelSkin;
      this.view.txtAreaDisclosure.skin = this._tbxAreaNormalSkin;
      this.view.lblTermsAndConditions.skin = this._commonLabelSkin;
      this.view.txtAreaTermsAndConditions.skin = this._tbxAreaNormalSkin;
      // Assigning Property Values for Product Feature Skins
      this.view.lblFeaturesHeader.skin = this._screenHeaderLblSkin;
      this.view.btnAddFeature1.skin = this._addFeatureBtnSkin;
      this.view.lblFeaturesCanBeAdded.skin = this._noFeatureScreenDescSkin;
      this.view.btnAddFeature2.skin = this._addFeatureBtnSkin;
      this.view.lblFeatureName.skin = this._segHeaderLblTxtSkin;
      this.view.lblFeatureGroup.skin = this._segHeaderLblTxtSkin;
      this.view.lblType.skin = this._segHeaderLblTxtSkin;
      // Popup Common Skins
      this.view.flxAddProductPopups.skin = this._popupCmnBgSkin;
      // Add Feature Popup Skins
      this.view.flxAddFacilityHeader.skin = this._popupCmnTopBarSkin;
      this.view.lblCloseIcon.skin = this._popupCloseCrossBtnSkin;
      this.view.lblAddFeatureHeading.skin = this._popupCmnHeadingLblSkin;
      this.view.lblAddFacilityName.skin = this._commonLabelSkin;
      this.view.lstBoxAddFacilityName.skin = this._lstboxNormalSkin;
      this.view.lblErrorIconFacility1.skin = this._errorMsgIconSkin;
      this.view.lblErrorTextFacility1.skin = this._errorMsgTextSkin;
      this.view.lblAddFacilityCode.skin = this._commonLabelSkin;
      this.view.tbxAddFacilityCode.skin = this._tbxNormalSkin;
      this.view.lblErrorIconFacility2.skin = this._errorMsgIconSkin;
      this.view.lblErrorTextFacility2.skin = this._errorMsgTextSkin;
      this.view.lblAddFeatureGroup.skin = this._commonLabelSkin;
      this.view.tbxAddFeatureGroup.skin = this._tbxDisabledSkin;
      this.view.lblErrorIconFeature3.skin = this._errorMsgIconSkin;
      this.view.lblErrorTextFeature3.skin = this._errorMsgTextSkin;
      this.view.lblAddFacilityDescription.skin = this._commonLabelSkin;
      this.view.lblFacilityDescTextCounter.skin = this._txtCounterLabelSkin;
      this.view.txtAreaFacilityDescription.skin = this._tbxAreaNormalSkin;
      this.view.lblAddFeatureSequenceNumber.skin = this._commonLabelSkin;
      this.view.tbxAddFeatureSequenceNumber.skin = this._tbxNormalSkin;
      this.view.lblErrorIconFeature5.skin = this._errorMsgIconSkin;
      this.view.lblErrorTextFeature5.skin = this._errorMsgTextSkin;
      this.view.lblMandatorySequenceNumber.skin = this._commonLabelSkin;
      this.view.lblOptionDetails.skin = this._popupCmnHeadingLblSkin;
      this.view.lblOptionDisplayType.skin = this._commonLabelSkin;
      this.view.lstBoxOptionDisplayType.skin = this._lstboxNormalSkin;
      this.view.lblErrorIconFeature4.skin = this._errorMsgIconSkin;
      this.view.lblErrorTextFeature4.skin = this._errorMsgTextSkin;
      this.view.flxOptionContainer.skin = this._optionDetailsSegBgSkin;
      //this.view.lblOptionValue.skin = this._commonLabelSkin;
     // this.view.lblOptionDescription.skin = this._commonLabelSkin;
      this.view.btnAddValue.skin = this._AddSegmentRowBtnSkin;
      this.view.flxAddFacilityBottomBar.skin = this._bottomBarBgSkin;
      this.view.btnCancel.skin = this._bottomBarCancelBtnSkin;
      this.view.btnCancel.focusSkin = this._bottomBarCancelBtnSkin;
      this.view.btnCancel.hoverSkin = this._bottomBarCancelBtnHoverSkin;
      this.view.btnSaveAndClose.skin = this._bottomBarBtnDarkSkin;
      this.view.btnSaveAndClose.focusSkin = this._bottomBarBtnDarkSkin;
      this.view.btnSaveAndClose.hoverSkin = this._bottomBarBtnDarkHoverSkin;
      // Image Details Screen Skins
      this.view.btnAddImage.skin = this._AddSegmentRowBtnSkin;
      // Additional Attributes Screen Skins
      this.view.lblAttribute.skin = this._commonLabelSkin;
      this.view.lblAttributeValue.skin = this._commonLabelSkin;
      this.view.btnAddAttribute.skin = this._AddSegmentRowBtnSkin;
    },

    setDesginTimeConfigs: function(){
      // Design Time Values taken from Component Properties are set here
      /*
      	1. Product Purposes: [Onboarding, Campaigns]
        2. Option Display Type: [SingleSelection, CheckBox]
        3. Image Types: [Banner, Icon, Content, LargeBanner]
        4. Maxm Additional Attributes Allowed: 10 - Not used in this method.
      */
      if(!Array.isArray(this._productPurposes)){
        this._productPurposes = JSON.parse(this._productPurposes);
        this._productPurposes = this._productPurposes.values;
      }
      this.productPurposes = this._productPurposes;
      if(!Array.isArray(this._optionDisplayType)){
        this._optionDisplayType = JSON.parse(this._optionDisplayType);
        this._optionDisplayType = this._optionDisplayType.values;
      }            
      this.optionDisplayTypeMasterdata = this._optionDisplayType.map(item => [item.backendValue, item.displayValue]);
      this.optionDisplayTypeMasterdata.unshift(["SELECT", kony.i18n.getLocalizedString("i18n.products.Select_Option_Display_Type")]);
      if(!Array.isArray(this._imageTypes)){
        this._imageTypes = JSON.parse(this._imageTypes);
        this._imageTypes = this._imageTypes.values;
      }
      this.imageTypesMasterdata = this._imageTypes.map(item => [item.imageTypeBackend, item.imageTypeDisplay]);
      this.imageTypesMasterdata.unshift(["SELECT", this._imageTypeDropdownPlaceholderTxt]);
    },

    setContext: function(context){
      // METHOD_EXPOSED
      // This method should be called everytime the component is opened
      if(context.isNewProduct){
        this.resetUI(false, null);
        this.isEditFlow = false;
        this.editDataGlobal = {};
        this.fetchProductFeatures();
      } else if(context.isEdit){
        this.isEditFlow = true;
        this.editDataGlobal = context.editProductData;
      }
      this.view.segProductFacilities.info=[];
      this.initialFacilities=true;
      this.fetchFacilities("");
      this.fetchProductLines();
      this.resetGlobalVariables();
      this.view.btnAddProduct.text = this.isEditFlow?this._updateProductBtnTxt:this._addProductBtnTxt;
      //this.initializeProductFeaturesData();
    },

    resetGlobalVariables: function(){
      this.currentScreen = 1;
      this.maxScreenNumNavAllowed = 1;
      this.productLinesMasterData = [];
      this.productGroupsMasterData = [];
      this.featureTypeMasterData = [];
      this.sortColName = "";
      this.selRowFeatureData = {};
      this.prevIndex=-1;
      this.isFeatureEdit = false;
      this.areProductLinesFetched=false;
      this.isScreenValidatedArr = [false,false,false,false,false,false];
    },

    /* #################################### RESET UI #################################### START */
    resetUI: function(isEditFlow, editFlowData){
      this.prevIndex=-1;
      this.resetNavigationBarsUI();
      this.resetProductDetailsUI();
      this.resetProductFeaturesUI();
      this.resetProductFacilitiesUI();
      this.resetImageDetailsUI();
      this.resetAdditionalDetailsUI();
      this.view.flxProductDetails.setVisibility(true);
      this.view.flxProductDescription.setVisibility(false);
      this.view.flxProductFeatures.setVisibility(false);
      this.view.flxProductFacilities.setVisibility(false);
      this.view.flxImageDetails.setVisibility(false);
      this.view.flxAdditionalAttributes.setVisibility(false);
      if(isEditFlow){
        this.initializeProductFeaturesData(editFlowData.productFeatures,true)
        this.setDataForEditFlow(editFlowData);
      }      
    },

    resetNavigationBarsUI: function(){
      let activeSkin = this._leftVBarBtnSelectedSkin;
      let inactiveSkin = this._leftVBarBtnUnselectedSkin;
      let btnDarkSkin = this._bottomBarBtnDarkSkin;
      let btnLightSkin = this._bottomBarBtnLightSkin;
      let btnLightHoverSkin = this._bottomBarBtnLightHoverSkin;
      let btnDarkHoverSkin = this._bottomBarBtnDarkHoverSkin;
      this.view.lblFontIconArrow.text = this._downArrowIcon;//Down Arrow
      this.view.lblFontIconArrow.skin = this._leftVBarExpandIconSkin;
      this.view.lblOption1.skin = activeSkin;
      this.view.flxSubOptions.isVisible = true;
      this.view.lblSubOption1.skin = activeSkin;
      this.view.lblFontIconRightArrow1.isVisible = true;
      this.view.lblSubOption2.skin = inactiveSkin;
      this.view.lblFontIconRightArrow2.isVisible = false;
      this.view.lblOption2.skin = inactiveSkin;
      this.view.lblFontIconRightArrow3.isVisible = false;
      this.view.lblOption3.skin = inactiveSkin;
      this.view.lblFontIconRightArrow4.isVisible = false;
      this.view.lblOption4.skin = inactiveSkin;
      this.view.lblFontIconRightArrow5.isVisible = false;
      this.view.lblOption5.skin = inactiveSkin;
      this.view.lblFontIconRightArrow6.isVisible = false;
      this.view.btnNext.skin = btnDarkSkin;
      this.view.btnNext.focusSkin = btnDarkSkin;
      this.view.btnNext.hoverSkin = btnDarkHoverSkin;
      this.view.btnCancelAddProduct.isVisible = true;
      this.view.btnNext.isVisible = true;
      this.view.btnAddProduct.isVisible = true;
      CommonUtilities.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.btnNext,false,true);
      this.view.forceLayout();
    },

    resetProductDetailsUI: function(){
      this.resetSubScreen1UI();
      this.resetSubScreen2UI();
    },

    resetSubScreen1UI: function(){
      this.view.lstboxProductLine.setEnabled(true);
      this.view.lstboxProductLine.skin = this._lstboxNormalSkin;
      if(this.isEditFlow===false){
        this.view.lstboxProductLine.masterData = [["SELECT","Select Product Line"]];
        this.view.lstboxProductLine.selectedKey = "SELECT";
        this.view.lstboxProductGroup.masterData = [["SELECT", "Select Product Group"]];
        this.view.lstboxProductGroup.selectedKey = "SELECT";
      }
      this.view.lstboxProductGroup.setEnabled(true);
      this.view.lstboxProductGroup.skin = this._lstboxNormalSkin;
      this.view.tbxProductName.setEnabled(true);
      this.view.tbxProductName.skin = this._tbxNormalSkin;
      this.view.tbxProductName.text = "";
      this.view.tbxProductReference.setEnabled(true);
      this.view.tbxProductReference.skin = this._tbxNormalSkin;
      this.view.tbxProductReference.text = "";
      this.view.customDateField1.value = "";
      this.view.customDateField1.resetData = kony.i18n.getLocalizedString("i18n.frmLogsController.Select_date");
      this.view.customDateField2.value = "";
      this.view.customDateField2.resetData = kony.i18n.getLocalizedString("i18n.frmLogsController.Select_date");
      this.view.flxCustomProductDate1.isVisible = true;
      this.view.flxCustomProductDate1.skin = this._calendarNormalSkin;
      this.view.flxCustomProductDate2.isVisible = true;
      this.view.flxCustomProductDate2.skin = this._calendarNormalSkin;
      this.view.flxShowStartDate.isVisible = false;
      this.view.lblStartDate.text = "";
      this.view.flxShowEndDate.isVisible = false;
      this.view.lblEndDate.text = "";
      this.view.lblSelectedValue.text = "Select Product Purpose";
      let segProductPurposeData = this.productPurposes.map(this.mappingSegProductPurposeData);
      this.setDataToSegProductPurpose(segProductPurposeData);
      // Hiding Flexes from 15 Extra TextFields whose value is not given in component properties
      for(let widgetNum=1; widgetNum<=15; widgetNum++){
        let numUtility = Math.floor(widgetNum/3);
        if(this["_label"+widgetNum+"Txt"]==="" || this["_placeholder"+widgetNum+"Txt"]===""){
          if(widgetNum===1 || widgetNum%3===0){
            this.disableExtraAdditionalFields(3+numUtility);
          } else if(widgetNum===2){
            this.view.flxProductDetailsContainer9.isVisible = false;
            this.disableExtraAdditionalFields(4);
          } else if(widgetNum%3===1){
            this.view["flxProductDetailsContainer"+(widgetNum+7)].isVisible = false;
            this.view["flxProductDetailsContainer"+(widgetNum+8)].isVisible = false;            
            this.disableExtraAdditionalFields(4+numUtility);
          } else if(widgetNum%3===2){
            this.view["flxProductDetailsContainer"+(widgetNum+7)].isVisible = false;
            this.disableExtraAdditionalFields(4+numUtility);
          }
          break;
        }
      }
      for(let widgetNum=1; widgetNum<=15; widgetNum++){
        this.view["tbxAdditionalField"+widgetNum].text = "";
      }
      for(let widgetNum=1; widgetNum<=7; widgetNum++){        
        this.view["flxErrorMsg"+widgetNum].isVisible = false;
      }
    },

    disableExtraAdditionalFields: function(start){
      const scopeObj = this;
      for(let widgetNum=start; widgetNum<=8; widgetNum++){
        scopeObj.view["flxProductDetails"+widgetNum].isVisible = false;
      }
    },

    resetSubScreen2UI: function(){
      this.view.lblDescTextCounter.setVisibility(false);
      this.view.txtAreaDescription.text = "";
      this.view.lblDetailedDescTextCounter.setVisibility(false);
      this.view.txtAreaDetailedDescription.text = "";
      this.view.txtAreaNotes.text = "";
      this.view.txtAreaDisclosure.text = "";
      this.view.txtAreaTermsAndConditions.text = "";
    },

    resetProductFeaturesUI: function(){      
      this.view.lblFeaturesHeader.text = this._featureHeadingLblTxt + " (0)";
      this.view.flxFeaturesTopWrapper2.setVisibility(false);
      this.view.flxNoSelectedFeatures.setVisibility(true);
      this.view.flxViewSelectedFeatures.setVisibility(false);
      this.view.flxAddProductFeatures.setVisibility(false);
      this.view.flxAddProdFeaturesButtons.setVisibility(false);
      this.view.lblNoFilterFeatureResults.setVisibility(false);
      this.view.segAddedFeatures.data = [];
      this.resetDataFromAddFacilityPopup();
    },
    resetProductFacilitiesUI: function(){      
      this.view.lblFacilitiesHeading.text = kony.i18n.getLocalizedString("i18n.products.ProductFacilities") + " (0)";
      this.view.flxFacilitiesBtnRight.setVisibility(false);
      this.view.flxNoFacilitiesAdded.setVisibility(true);
      this.view.flxAddedFacilitiesList.setVisibility(false);
      this.view.segProductFacilities.data = [];
      this.resetDataFromAddFacilityPopup();
    },

    resetDataFromAddFacilityPopup: function(){
      this.resetTextFieldsAddFacilityPopup();
      this.view.lstBoxAddFacilityName.setEnabled(true);
      this.view.lstBoxAddFacilityName.skin = this._lstboxNormalSkin;
      this.view.flxErrorMessageFacility1.setVisibility(false);
      this.view.tbxAddFacilityCode.setEnabled(true);
      this.view.tbxAddFacilityCode.skin = this._tbxNormalSkin;
      this.view.flxErrorMessageFacility2.setVisibility(false);
      this.view.tbxAddFeatureGroup.setEnabled(false);
      this.view.tbxAddFeatureGroup.skin = this._tbxDisabledSkin;
      this.view.flxErrorMessageFeature3.setVisibility(false);
      this.view.lblFacilityDescTextCounter.isVisible = false;
      this.view.txtAreaFacilityDescription.skin = this._tbxAreaNormalSkin;
      this.view.tbxAddFeatureSequenceNumber.skin = this._tbxNormalSkin;
      this.view.flxErrorMessageFeature5.setVisibility(false);
      this.view.fontIconSmsChannelSelectOption.skin = this._checkboxSelIconSkin;
      this.view.lstBoxOptionDisplayType.skin = this._lstboxNormalSkin;
      this.view.flxErrorMessageFeature4.setVisibility(false);
      this.view.btnAddValue.setVisibility(true);
      this.view.lblAddFeatureHeading.text=kony.i18n.getLocalizedString("i18n.products.AddProductFacility");
      this.view.btnSaveAndClose.text = kony.i18n.getLocalizedString("i18n.products.Save_and_Close_CAPS");
    },

    resetTextFieldsAddFacilityPopup: function(){
      this.view.lstBoxAddFacilityName.selectedKey = "SELECT";
      this.view.tbxAddFacilityCode.text = "";
      this.view.tbxAddFacilityCode.skin = this._tbxNormalSkin;
      this.view.tbxAddFacilityCode.setEnabled(true);
      this.view.tbxAddFeatureGroup.text = "";
      this.view.txtAreaFacilityDescription.text = "";
      this.view.tbxAddFeatureSequenceNumber.text = "";
      this.view.fontIconSmsChannelSelectOption.text=this._selCheckboxIcon;
      this.view.lstBoxOptionDisplayType.masterData = this.optionDisplayTypeMasterdata;
      this.view.lstBoxOptionDisplayType.selectedKey = "SELECT";
      this.setSegFacilityOptionValuesData(); //Initialize single row in segment
    },

    resetImageDetailsUI: function(){
      //this.view.flxNoImageDetailsError.setVisibility(false);
      this.setSegImageDetailsData();
    },

    resetAdditionalDetailsUI: function(){      
      this.setSegAddAttributeData();
    },
    resetAddProductFeaturesUI : function(){
      this.view.flxAddProductFeatures.setVisibility(true);
      this.view.flxAddProdFeaturesButtons.setVisibility(true);
      this.view.flxNavigationBarButtons.setVisibility(false);
      this.view.searchBoxAddProdFeatures.tbxSearchBox.text = "";
      this.view.searchBoxAddProdFeatures.flxSearchCancel.setVisibility(false);
    },
    /* #################################### RESET UI #################################### END */

    /* #################################### SET EDIT DATA #################################### START */
    setDataForEditFlow: function(productData){
      this.setEditDataForProductDetails(productData);
      this.setEditDataForProductDescription(productData);
      this.setEditDataForProductFacilities(productData);
      this.setEditDataForProductFeatures(productData);
      this.setEditDataForImageDetails(productData);
      this.setEditDataForAdditionalAttributes(productData);
      this.view.btnAddProduct.text = this._updateProductBtnTxt;
      this.view.forceLayout();
    },

    setEditDataForProductDetails: function(productData){
      let startDate="";
      let endDate="";
      if(productData.externalIndicator){
        this._externalIndicator =productData.externalIndicator;
      }
      if(productData.availableFrom){
        startDate = productData.availableFrom;
        startDate = startDate.split("-");
        startDate = startDate[1]+"-"+startDate[2]+"-"+startDate[0];
      }
      if(productData.availableTo){
        endDate = productData.availableTo;
        endDate = endDate.split("-");
        endDate = endDate[1]+"-"+endDate[2]+"-"+endDate[0]; 
      }
      if(this.isConfig2===false){
        this.view.tbxProductName.setEnabled(false);
        this.view.tbxProductName.skin = this._tbxDisabledSkin;
        this.view.flxCustomProductDate1.isVisible = false;
        this.view.flxCustomProductDate2.isVisible = false;
        this.view.flxShowStartDate.isVisible = true;
        this.view.flxShowEndDate.isVisible = true;
        this.view.lblStartDate.text = startDate || "N/A";
        this.view.lblEndDate.text = endDate || "N/A";
      } else if(this.isConfig2){
        this.view.customDateField1.value = startDate;
        this.view.customDateField1.resetData = startDate ? startDate : kony.i18n.getLocalizedString("i18n.frmLogsController.Select_date");
        this.view.customDateField2.value = endDate;
        this.view.customDateField2.resetData = endDate ? endDate : kony.i18n.getLocalizedString("i18n.frmLogsController.Select_date");
      }
      this.view.lstboxProductLine.setEnabled(false);
      this.view.lstboxProductLine.skin = this._lstboxDisabledSkin;
      this.view.lstboxProductGroup.setEnabled(false);
      this.view.lstboxProductGroup.skin = this._lstboxDisabledSkin;
      this.view.tbxProductReference.setEnabled(false);
      this.view.tbxProductReference.skin = this._tbxDisabledSkin;
      //this.view.lstboxProductLine.selectedKey = productData.productLineRef;      
      this.view.lstboxProductGroup.selectedKey = productData.productGroupRef;
      this.view.tbxProductName.text =  CommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(productData.productName) ;
      this.view.tbxProductReference.text = CommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(productData.productRef);
      this.view.lblSelectedValue.text = productData.purposes.length + " Selected";
      let purposesSelectedIndices = [];
      var currentProductPurposes=productData.purposes.map((a)=>{return a.type;});//purposes: [{type: "Onboarding"}, {type: "Campaigns"}]
      for (let index = 0; index < this.productPurposes.length; index++) {
        if (currentProductPurposes.includes(this.productPurposes[index])){
          purposesSelectedIndices.push(index);
        }
      }
      this.view.segProductPurpose.selectedIndices = [[0,purposesSelectedIndices]];    
      this.view.forceLayout();      
      // TODO: Set Data for 15 Additional Fields if there are any.
    },

    setEditDataForProductDescription: function(productData){      
      this.view.txtAreaDescription.text =  CommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(productData.description).replace(/&amp;/g,"&");
      this.view.txtAreaDetailedDescription.text =  CommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(productData.detailedDesc);
      this.view.txtAreaNotes.text = CommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(productData.notes);
      this.view.txtAreaDisclosure.text = CommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(productData.disclosure);
      this.view.txtAreaTermsAndConditions.text = CommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(productData.termsConditions);
    },

    setEditDataForProductFeatures: function(productData){      
      let productFeatures = productData.productFeatures;
      this.view.lblFeaturesHeader.text = this._featureHeadingLblTxt + " (" + productFeatures.length + ")";
      if(productFeatures.length!==0){
        this.setViewSelectedFeaturesSegData(productFeatures);        
      } else {
        this.view.segAddedFeatures.data = [];
      }
      let areFeaturesPresent = productFeatures.length===0 ? false : true;
      this.view.flxFeaturesTopWrapper2.setVisibility(areFeaturesPresent);
      this.view.flxNoSelectedFeatures.setVisibility(!areFeaturesPresent);
      this.view.flxViewSelectedFeatures.setVisibility(areFeaturesPresent);      
      if(this.isConfig2===false){
        this.view.flxFeaturesTopWrapper2.setVisibility(false);
        this.view.btnAddFeature2.setVisibility(false);
        this.view.lstBoxAddFacilityName.setEnabled(false);
        this.view.lstBoxAddFacilityName.skin = this._lstboxDisabledSkin;
        this.view.fontIconSmsChannelSelectOption.skin = this._checkboxUnselIconSkin;
        this.view.btnAddValue.setVisibility(false);
      }
    },
    setEditDataForProductFacilities : function(productData){
      this.productId=productData.productId;
      let productFacilities = productData.productFacilities||[];
      this.view.lblFacilitiesHeading.text = kony.i18n.getLocalizedString("i18n.products.ProductFacilities") + " (" + productFacilities.length + ")";
      if(productFacilities.length!==0){
        this.addFacilityDataToSeg(productFacilities);        
      } else {
        this.view.segProductFacilities.data = [];
      }
      let areFeaturesPresent = productFacilities.length===0 ? false : true;
      this.view.flxNoFacilitiesAdded.setVisibility(!areFeaturesPresent);
      this.view.flxAddedFacilitiesList.setVisibility(areFeaturesPresent);
      this.view.flxFacilitiesBtnRight.isVisible = this.isConfig2 ? true : false;
    },

    setEditDataForImageDetails: function(productData){
      let imageDetails = productData.imageDetails;
      if(imageDetails.length===0)
        this.setSegImageDetailsData();
      else{
        let data = [];
        for(let index=0; index<imageDetails.length; index++){
          let imagedata = this.getNewRowDataSegImageDetails(imageDetails[index]);
          data.push(imagedata);
        }
        this.view.segImageDetails.widgetDataMap = this.getDataMapForSegImageDetails();
        this.view.segImageDetails.setData(data);
        this.view.forceLayout();
      }
    },

    setEditDataForAdditionalAttributes: function(productData){
      let additionalAttributes = productData.extensionData.additionalAttributes?productData.extensionData.additionalAttributes:productData.extensionData;
      let addAttrLength = Object.keys(additionalAttributes).length;
      if(addAttrLength===0){
        this.setSegAddAttributeData();
      } else {
        let data = [];
        for(let index = 0; index<addAttrLength; index++){
          let key = additionalAttributes[index]['key']?additionalAttributes[index]['key']:Object.keys(additionalAttributes)[index];
          let val = additionalAttributes[index].value?additionalAttributes[index].value:additionalAttributes[key];
          let attrData = {
            "key":key,
            "value":val
          };
          let addAttrData = this.getNewRowDataSegAddAttribute(attrData);
          data.push(addAttrData);
        }
        this.view.segAddAttribute.widgetDataMap = this.getDataMapForSegAddAttribute();
        this.view.segAddAttribute.setData(data);
        this.view.forceLayout();
      }
    },
    /* #################################### SET EDIT DATA #################################### END */

    /* #################################### SET FLOW ACTIONS #################################### START */
    setFlowActions: function(){
      this.setFlowActionsNavigationBars();
      this.setFlowActionsProductDetails();
      this.setFlowActionsProductFacilities();
      this.setFlowActionsProductFeatures();
      this.setFlowActionsImageDetails();
      this.setFlowActionsAdditionalAttributes();      
    },

    setFlowActionsNavigationBars: function(){
      const scopeObj = this;
      this.view.lblFontIconArrow.onTouchEnd = function(){
        let subscreenVisibility = scopeObj.view.flxSubOptions.isVisible===false;
        scopeObj.view.flxSubOptions.setVisibility(subscreenVisibility);
        scopeObj.view.lblFontIconArrow.text = subscreenVisibility ? scopeObj._downArrowIcon : scopeObj._upArrowIcon;
        scopeObj.view.lblFontIconArrow.skin = subscreenVisibility ? scopeObj._leftVBarExpandIconSkin : scopeObj._leftVBarCollapseIconSkin;
        scopeObj.view.forceLayout();
      };
      this.view.lblOption1.onTouchEnd = function(){
        let subscreenVisibility = scopeObj.view.flxSubOptions.isVisible===false;
        scopeObj.view.flxSubOptions.setVisibility(subscreenVisibility);
        scopeObj.view.lblFontIconArrow.text = subscreenVisibility ? scopeObj._downArrowIcon : scopeObj._upArrowIcon;
        scopeObj.view.lblFontIconArrow.skin = subscreenVisibility ? scopeObj._leftVBarExpandIconSkin : scopeObj._leftVBarCollapseIconSkin;
        scopeObj.view.forceLayout();
      };
      this.view.lblSubOption1.onTouchEnd = function(){
        let proceed = true;
          if(scopeObj.isValidationRequired(1)) proceed = scopeObj.validateFieldsWrapper(scopeObj.currentScreen);
          if(proceed) scopeObj.navigateToScreen(1);
      };
      this.view.lblSubOption2.onTouchEnd = function(){
        let proceed = true;         
          if(scopeObj.isValidationRequired(2)) proceed = scopeObj.validateFieldsWrapper(scopeObj.currentScreen);
          if(proceed) scopeObj.navigateToScreen(2);
      };
      this.view.lblOption2.onTouchEnd = function(){
        let proceed = true;
          if(scopeObj.isValidationRequired(3)) proceed = scopeObj.validateFieldsWrapper(scopeObj.currentScreen);
          if(proceed) scopeObj.navigateToScreen(3);
      };
      this.view.lblOption3.onTouchEnd = function(){
        let proceed = true;
          if(scopeObj.isValidationRequired(4)) proceed = scopeObj.validateFieldsWrapper(scopeObj.currentScreen);
          if(proceed) scopeObj.navigateToScreen(4);
      };
      this.view.lblOption4.onTouchEnd = function(){
        let proceed = true;          
          if(scopeObj.isValidationRequired(5)) proceed = scopeObj.validateFieldsWrapper(scopeObj.currentScreen);
          if(proceed) scopeObj.navigateToScreen(5);
      };
      this.view.lblOption5.onTouchEnd = function(){
        let proceed = true;         
        if(scopeObj.isValidationRequired(6)) proceed = scopeObj.validateFieldsWrapper(scopeObj.currentScreen);
        if(proceed) scopeObj.navigateToScreen(6);
      };
      scopeObj.view.lblSubOption2.hoverSkin = scopeObj._leftVBarBtnHoverSkin;    
      scopeObj.view.lblOption2.hoverSkin = scopeObj._leftVBarBtnHoverSkin;
      scopeObj.view.lblOption3.hoverSkin = scopeObj._leftVBarBtnHoverSkin;
      scopeObj.view.lblOption4.hoverSkin = scopeObj._leftVBarBtnHoverSkin;
      scopeObj.view.lblOption5.hoverSkin = scopeObj._leftVBarBtnHoverSkin;
      this.view.btnCancelAddProduct.onClick = function(){
        scopeObj.resetUI(false, null);
        if(scopeObj.closeAddProductComponent) scopeObj.closeAddProductComponent();
      };
      this.view.btnNext.onClick = function(){
        let proceed = scopeObj.validateFieldsWrapper(scopeObj.currentScreen);
        if(proceed) scopeObj.navigateToScreen(scopeObj.currentScreen+1);
      };
      this.view.btnAddProduct.onClick = function(){
        if(scopeObj.validateFieldsWrapper(scopeObj.currentScreen)){
          let createProductJSON = scopeObj.fetchFinalAddProductJSON();
          if (scopeObj.isEditFlow) scopeObj.editProduct(createProductJSON);
          else scopeObj.createProduct(createProductJSON);
        }
      };
    },

    setFlowActionsProductDetails: function(){
      const scopeObj = this;
      this.view.lstboxProductLine.onSelection = function(){
        if(scopeObj.view.lstboxProductLine.selectedKey!=="SELECT"){
          scopeObj.view.lstboxProductLine.skin = scopeObj._lstboxNormalSkin;
          scopeObj.view.flxErrorMsg1.setVisibility(false);
          scopeObj.fetchProductGroupsByProductLine();
        }
      };
      this.view.lstboxProductGroup.onSelection = function(){
        if(scopeObj.view.lstboxProductGroup.selectedKey!=="SELECT"){
          scopeObj.view.lstboxProductGroup.skin = scopeObj._lstboxNormalSkin;
          scopeObj.view.flxErrorMsg2.setVisibility(false);
        }
      };
      this.view.tbxProductName.onKeyUp = function(){
        if(scopeObj.view.tbxProductName.text!==""){
          scopeObj.view.tbxProductName.skin = scopeObj._tbxNormalSkin;
          scopeObj.view.flxErrorMsg3.setVisibility(false);
        }
      };
      this.view.tbxProductReference.onKeyUp = function(){
        if(scopeObj.view.tbxProductReference.text!==""){
          scopeObj.view.tbxProductReference.skin = scopeObj._tbxNormalSkin;
          scopeObj.view.flxErrorMsg4.setVisibility(false);
        }
      };
      this.view.flxCustomProductDate1.onTouchStart = function(){
        scopeObj.view.flxCustomProductDate1.skin = scopeObj._calendarNormalSkin;
        scopeObj.view.flxErrorMsg5.setVisibility(false);
        scopeObj.view.forceLayout();
      };
      this.view.flxCustomProductDate2.onTouchStart = function(){
        scopeObj.view.flxCustomProductDate2.skin = scopeObj._calendarNormalSkin;
        scopeObj.view.flxErrorMsg6.setVisibility(false);
        scopeObj.view.forceLayout();
      };
      this.view.flxSelectedText.onTouchEnd = function(){
        scopeObj.view.flxSegmentList.setVisibility(scopeObj.view.flxSegmentList.isVisible === false);
        scopeObj.view.flxSelectedText.skin = scopeObj._tbxNormalSkin;
        scopeObj.view.forceLayout();
      };
      this.view.segProductPurpose.onRowClick = function(){
        scopeObj.segProductPurposeOnRowClick();
        scopeObj.view.flxSelectedText.skin = scopeObj._tbxNormalSkin;
        scopeObj.view.forceLayout();
      };
      this.view.flxSegmentList.onHover = function(widget, context){
        if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
          scopeObj.view.flxSegmentList.setVisibility(true);
        } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE){
          scopeObj.view.flxSegmentList.setVisibility(false);
        }
        scopeObj.view.forceLayout();
      };
      this.view.txtAreaDescription.onKeyUp = function(){
        scopeObj.view.lblDescTextCounter.isVisible = true;
        let textLen = scopeObj.view.txtAreaDescription.text.length;
        let maxLen = scopeObj.view.txtAreaDescription.maxTextLength;
        scopeObj.view.lblDescTextCounter.text = textLen + "/" + maxLen;
        scopeObj.view.flxDescriptionContainer.forceLayout();
      };
      this.view.txtAreaDescription.onEndEditing = function(){
        scopeObj.view.lblDescTextCounter.isVisible = false;
      };
      this.view.txtAreaDetailedDescription.onKeyUp = function(){
        scopeObj.view.lblDetailedDescTextCounter.isVisible = true;
        let textLen = scopeObj.view.txtAreaDetailedDescription.text.length;
        let maxLen = scopeObj.view.txtAreaDetailedDescription.maxTextLength;
        scopeObj.view.lblDetailedDescTextCounter.text = textLen + "/" + maxLen;
        scopeObj.view.flxDetailedDescriptionContainer.forceLayout();
      };
      this.view.txtAreaDetailedDescription.onEndEditing = function(){
        scopeObj.view.lblDetailedDescTextCounter.isVisible = false;
      };
    },
    
    setFlowActionsProductFacilities : function(){
      var scopeObj =this;
      this.view.noResultsFacilities.btnAddRecord.onClick = function(){
        scopeObj.view.flxAddProductPopups.isVisible = true;
        scopeObj.view.flxAddFacilityPopup.isVisible = true;
        scopeObj.resetDataFromAddFacilityPopup();
        scopeObj.alignFlxManageProducts();  
      };
      this.view.btnAddFacilities.onClick = function(){
        scopeObj.view.flxAddProductPopups.isVisible = true;
        scopeObj.view.flxAddFacilityPopup.isVisible = true;
        scopeObj.resetDataFromAddFacilityPopup();
        scopeObj.isFeatureEdit = false;
        scopeObj.alignFlxManageProducts();
      };
      this.view.txtAreaFacilityDescription.onBeginEditing = function(){
        scopeObj.showFacilityDescTextCounter.call(scopeObj);
      };
      this.view.txtAreaFacilityDescription.onKeyUp = function() {
        scopeObj.showFacilityDescTextCounter.call(scopeObj);
      };
      this.view.txtAreaFacilityDescription.onEndEditing = function(){
        scopeObj.view.lblFacilityDescTextCounter.isVisible = false;
      };
      this.view.tbxAddFeatureSequenceNumber.onKeyUp = function() {
        let totalText = scopeObj.view.tbxAddFeatureSequenceNumber.text;
        scopeObj.view.tbxAddFeatureSequenceNumber.text = totalText.replace(/\D/g, "");
        let inputText = scopeObj.view.tbxAddFeatureSequenceNumber.text.trim();
        if(inputText!=="" && parseInt(inputText)!==0){
          scopeObj.view.flxErrorMessageFeature5.setVisibility(false);
          scopeObj.view.tbxAddFeatureSequenceNumber.skin = scopeObj._tbxNormalSkin;
        }
      };
      this.view.fontIconSmsChannelSelectOption.onTouchEnd = function(){
        if(scopeObj.isConfig2){
          let checkboxCode = scopeObj.view.fontIconSmsChannelSelectOption.text===scopeObj._selCheckboxIcon ? scopeObj._unselCheckboxIcon : scopeObj._selCheckboxIcon;
          scopeObj.view.fontIconSmsChannelSelectOption.text = checkboxCode;
        }
      };
      this.view.lblMandatorySequenceNumber.onTouchEnd = function(){
        if(scopeObj.isConfig2){
          let checkboxCode = scopeObj.view.fontIconSmsChannelSelectOption.text===scopeObj._selCheckboxIcon ? scopeObj._unselCheckboxIcon : scopeObj._selCheckboxIcon;
          scopeObj.view.fontIconSmsChannelSelectOption.text = checkboxCode;
        }
      };
      this.view.lstBoxOptionDisplayType.onSelection = function(){
        if(scopeObj.view.lstBoxOptionDisplayType.selectedKey!=="SELECT"){
          scopeObj.view.lstBoxOptionDisplayType.skin = scopeObj._lstboxNormalSkin;
        }
      };
      this.view.btnAddValue.onTouchEnd = function(){
        scopeObj.addOptionValueRow();
      };
      this.view.lstBoxAddFacilityName.onSelection = function(){
        if(scopeObj.view.lstBoxAddFacilityName.selectedKey!=="SELECT"){
          scopeObj.view.flxErrorMessageFacility1.setVisibility(false);
          scopeObj.view.lstBoxAddFacilityName.skin = scopeObj._lstboxNormalSkin;
          scopeObj.assignFeatureNameAndGroup();
        }
      };
      this.view.lstBoxOptionDisplayType.onSelection = function(){
        if(scopeObj.view.lstBoxOptionDisplayType.selectedKey!=="SELECT"){
          scopeObj.view.flxErrorMessageFeature4.setVisibility(false);
          scopeObj.view.lstBoxOptionDisplayType.skin = scopeObj._lstboxNormalSkin;
        }
      };
      this.view.btnCancel.onClick = function(){
        scopeObj.closePopup();
      };
      this.view.btnSaveAndClose.onClick = function(){        
        let proceed = scopeObj.validateDataAddFacilityPopup();
        if(proceed){
          //TODO: Check whether facility with existing facilityname is already present, if yes don't create facility.
          let data = scopeObj.getNewProductFacilityData();
          scopeObj.view.btnSaveAndClose.info={"facilityData":data};
          //call createProductFacility
          if(scopeObj.isEditFlow){
            //data.productId=[scopeObj.productId];
            if(scopeObj.isFeatureEdit === false)
            	scopeObj.createProductFacility({"productFacilities":data,"productId":scopeObj.productId});
            else{
              data[0].productFacilityId=scopeObj.view.tbxAddFacilityCode.info.productFacilityId;
              scopeObj.updateProductFacility({"productFacilities":data,"productId":scopeObj.productId});
            }
          }else
          	scopeObj.getFacilityDetails();
        }
      };
      this.view.flxOption1.onTouchEnd = function(){
        // Edit Product Feature
        let selRow = scopeObj.view.segProductFacilities.selectedRowIndex[1];
        scopeObj.selRowFeatureData = scopeObj.view.segProductFacilities.data[selRow];
        scopeObj.editProductFacility();
      };
      this.view.flxOption2.onTouchEnd = function(){
        scopeObj.setDeleteFacilityMessage();
        scopeObj.alignFlxManageProducts();
      };
      this.view.flxClose.onTouchEnd = function(){
        scopeObj.closePopup();
      };
      this.view.flxCloseFacility.onClick = function(){
        scopeObj.closePopup();
      };
      this.view.btnBasicDetails.onClick = function(){
        scopeObj.view.btnBasicDetails.skin="sknBtnBgffffffBrD7D9E0Rd3px485B75Bold12px";
        scopeObj.view.btnFacilityFA.skin="sknBtnBgD2D7E2Rou3pxLato485B7512px";
        scopeObj.view.flxFacilityContainer.setVisibility(true);
        scopeObj.view.flxFacilityFeaturedAction.setVisibility(false);
      };
      this.view.btnFacilityFA.onClick = function(){
        scopeObj.view.btnBasicDetails.skin="sknBtnBgD2D7E2Rou3pxLato485B7512px";
        scopeObj.view.btnFacilityFA.skin="sknBtnBgffffffBrD7D9E0Rd3px485B75Bold12px";
        scopeObj.view.flxFacilityContainer.setVisibility(false);
        scopeObj.view.flxFacilityFeaturedAction.setVisibility(true);
      };
      this.view.flxFacilityName.onClick = function(){
        var segData = scopeObj.view.segProductFacilities.data;
        scopeObj.sortBy.column("lblProductsValue1.text");
        var sortedSegData = segData.sort(scopeObj.sortBy.sortData);
        scopeObj.view.segProductFacilities.setData(sortedSegData);
        scopeObj.resetSortImages(1);
      };
      this.view.flxFacilityFeaturesCount.onClick = function(){
        var segData = scopeObj.view.segProductFacilities.data;
        scopeObj.sortBy.column("lblProductsValue3.text");
        var sortedSegData = segData.sort(scopeObj.sortBy.sortData);
        scopeObj.view.segProductFacilities.setData(sortedSegData);
        scopeObj.resetSortImages(1);
      };
    },
    
    setFlowActionsProductFeatures: function(){
      const scopeObj = this;
      this.view.btnAddFeature1.onClick = function(){  
        scopeObj.resetAddProductFeaturesUI(); 
        scopeObj.setAddFeaturesSegData();
      };
      this.view.btnAddFeature2.onClick = function(){
        scopeObj.resetAddProductFeaturesUI();
        scopeObj.setAddFeaturesSegData();
      };
      this.view.commonButtonsAddFeatures.btnCancel.onClick = function(){
        scopeObj.view.flxAddProdFeaturesButtons.setVisibility(false);
        scopeObj.view.flxNavigationBarButtons.setVisibility(true);
        scopeObj.view.flxAddProductFeatures.setVisibility(false);
      };
      this.view.commonButtonsAddFeatures.btnSave.onClick = function(){
        scopeObj.updateFeatureActionsAdded();
        scopeObj.view.flxAddProdFeaturesButtons.setVisibility(false);
        scopeObj.view.flxNavigationBarButtons.setVisibility(true);
        scopeObj.view.flxAddProductFeatures.setVisibility(false);
        scopeObj.setViewSelectedFeaturesSegData();
      };
      this.view.flxAddProdFeaturesBackBtn.onClick = function(){
        scopeObj.view.commonButtonsAddFeatures.btnCancel.onClick();
      };
      this.view.flxSelectAllFeatures.onClick = function(){
        scopeObj.selectAllFeatures();
      };
      this.view.flxFeatureName.onClick = function(){        
        var segData = scopeObj.view.segAddedFeatures.data;
        scopeObj.sortBy.column("lblProductsValue1.text");
        var sortedSegData = segData.sort(scopeObj.sortBy.sortData);
        scopeObj.view.segAddedFeatures.setData(sortedSegData);
        scopeObj.resetSortImages(2);
      };
      this.view.popUp.btnPopUpDelete.onClick = function(){
        // Delete Product facility
        if(scopeObj.isEditFlow){
          let rowIndex = scopeObj.view.segProductFacilities.selectedRowIndex[1];
          let segData = scopeObj.view.segProductFacilities.data;
          scopeObj.deleteProductFacility({"facilityId":segData[rowIndex].facilityData.facilityId,"productId":scopeObj.productId});
        }
        else{
          scopeObj.removeProductFacility();
        }
      };
      this.view.popUp.flxPopUpClose.onTouchEnd = function(){
        scopeObj.view.popUp.setVisibility(false);
        scopeObj.view.flxAddProductPopups.setVisibility(false);
      };
      this.view.popUp.btnPopUpCancel.onClick = function(){
        scopeObj.view.popUp.setVisibility(false);
        scopeObj.view.flxAddProductPopups.setVisibility(false);
      }; 
      this.view.searchBoxAddProdFeatures.tbxSearchBox.onTouchStart = function(){
        scopeObj.view.searchBoxAddProdFeatures.setSearchBoxFocus(true);
      };
      this.view.searchBoxAddProdFeatures.tbxSearchBox.onEndEditing = function(){
        scopeObj.view.searchBoxAddProdFeatures.setSearchBoxFocus(false);
      };
      this.view.searchBoxAddProdFeatures.tbxSearchBox.onKeyUp = function(){
        if(scopeObj.view.searchBoxAddProdFeatures.tbxSearchBox.text === ""){
          scopeObj.view.searchBoxAddProdFeatures.clearSearchBox();
        } else{
          scopeObj.view.searchBoxAddProdFeatures.setSearchBoxFocus(true);
          scopeObj.view.searchBoxAddProdFeatures.flxSearchCancel.setVisibility(true);
          scopeObj.view.searchBoxAddProdFeatures.forceLayout();
        }
        scopeObj.searchFeaturesActions();
      };
      this.view.searchBoxAddProdFeatures.flxSearchCancel.onClick = function(){
        scopeObj.view.searchBoxAddProdFeatures.clearSearchBox();
        scopeObj.searchFeaturesActions();
      };
      this.view.flxType.onClick = function(){
        var filterVisibility = scopeObj.view.flxFeaturesStatusFilter.isVisible;
        var flxRight = scopeObj.view.flxProductFeaturesSegHeader.frame.width - scopeObj.view.flxType.frame.x - scopeObj.view.flxType.frame.width;
        var iconRight = scopeObj.view.flxType.frame.width - scopeObj.view.fontIconSortType.frame.x;
        scopeObj.view.flxFeaturesStatusFilter.right = (flxRight + iconRight -30)+"dp";
        scopeObj.view.flxFeaturesStatusFilter.setVisibility(!filterVisibility);
      };
      this.view.statusFilterMenuFeatures.segStatusFilterDropdown.onRowClick = function(){
        scopeObj.performFeatureStatusFilter();
      };
      this.view.flxFeaturesStatusFilter.onHover = this.onHoverDropdownEventCallback;
    },

    setFlowActionsImageDetails: function(){
      const scopeObj = this;
      this.view.btnAddImage.onClick = function(){
        scopeObj.addImageDetailsRow();
      };
    },

    setFlowActionsAdditionalAttributes: function(){
      const scopeObj = this;
      this.view.btnAddAttribute.onClick = function(){
        scopeObj.addAdditionalAttributesRow();
      };
    },
    /* #################################### SET_FLOW_ACTIONS #################################### END */

    showFacilityDescTextCounter: function(){
      this.view.lblFacilityDescTextCounter.setVisibility(true);
      let textLength = this.view.txtAreaFacilityDescription.text.length;
      let maxLen = this.view.txtAreaFacilityDescription.maxTextLength;
      this.view.lblFacilityDescTextCounter.text = "" + textLength + "/" + maxLen;
      this.view.forceLayout();
    },

    isNavigationAllowed: function(targetScreenNum){
      if(this.isEditFlow) return true;
      return targetScreenNum <= this.maxScreenNumNavAllowed;
    },

    isValidationRequired: function(targetScreenNum){
      // If moving to screen grater than current screen, validation is required.
      // IF moving to screen less than current screen, validation for current screen will be required only if it has been previously validated,
      // to handle the case in which user deletes something from current screen.
      if(this.currentScreen < targetScreenNum)
        return true;
      else if((this.currentScreen > targetScreenNum) && this.isScreenValidatedArr[this.currentScreen]===true){
        return true;
      } else{
        return false;
      }
    },

    validateFieldsWrapper: function(screenNum){
      // When user is trying to navigate to a different screen, this method is called
      let proceed = false;      
      if(screenNum===1) proceed = this.validateFieldsScreen1();
      if(screenNum===2) proceed = true;
      if(screenNum===3) proceed = true;
      if(screenNum===4) proceed = true;//this.validateFieldsScreen4();
      if(screenNum===5) proceed = true;
      if(screenNum===6) proceed = true;
      this.isScreenValidatedArr[screenNum] = true;
      return proceed;
    },

    validateFieldsScreen1: function(){
      let proceed = true;
      if(this.view.lstboxProductLine.selectedKey==="SELECT"){
        this.view.lstboxProductLine.skin = this._lstboxErrorSkin;
        this.view.flxErrorMsg1.isVisible = true;
        proceed = false;
      }
      if(this.view.lstboxProductGroup.selectedKey==="SELECT"){
        this.view.lstboxProductGroup.skin = this._lstboxErrorSkin;
        this.view.flxErrorMsg2.isVisible = true;
        proceed = false;
      }
      if(this.view.tbxProductName.text===""){
        this.view.tbxProductName.skin = this._tbxErrorSkin;
        this.view.flxErrorMsg3.isVisible = true; 
        proceed = false;
      }
      if(this.view.tbxProductReference.text===""){
        this.view.tbxProductReference.skin = this._tbxErrorSkin;
        this.view.flxErrorMsg4.isVisible = true; 
        proceed = false;
      }
      let startDate = this.view.customDateField1.value.trim().replace(/-/g,"/");
      startDate = new Date(startDate);
      let endDate = this.view.customDateField2.value.trim().replace(/-/g,"/");
      endDate = new Date(endDate);
      // 1. Either both dates should be filled or none
      // 2. startDate<endDate
      if(isNaN(startDate) && !isNaN(endDate)){
        this.view.flxErrorMsg5.setVisibility(true);
        this.view.lblErrorText5.text = "Start date cannot be empty.";
        this.view.flxCustomProductDate1.skin = this._calendarErrorSkin;
        proceed = false;
      } else if(!isNaN(startDate) && isNaN(endDate)){
        this.view.flxErrorMsg6.setVisibility(true);
        this.view.lblErrorText6.text = "End date cannot be empty.";
        this.view.flxCustomProductDate2.skin = this._calendarErrorSkin;
        proceed = false;
      } else if(!isNaN(startDate) && !isNaN(endDate) && this.isInValidDate(startDate,endDate, true)){
        this.view.flxErrorMsg6.setVisibility(true);
        this.view.lblErrorText6.text = "End date cannot be less than or equal to start date.";
        this.view.flxCustomProductDate2.skin = this._calendarErrorSkin;
        proceed = false;
      }
      /* 
      // Validations for Start Date: Removed since not mentioned in story
      let maxStartDate = new Date(new Date().setDate(new Date().getDate()+90));
      if(this.isInValidDate(new Date(),startDate)){
        this.view.flxErrorMsg5.setVisibility(true);
        this.view.lblErrorText5.text = "Start date cannot be earlier than today.";
        this.view.flxCustomProductDate1.skin = this._calendarErrorSkin;
        proceed = false;
      } else if(this.isInValidDate(startDate,maxStartDate)){
        this.view.flxErrorMsg5.setVisibility(true);
        this.view.lblErrorText5.text = "Start date should not be more than 90 days from today.";
        this.view.flxCustomProductDate1.skin = this._calendarErrorSkin;
        proceed = false;
      }
      */
      /* 
      // Validations for End Date: Removed since not mentioned in story
       if(this.isInValidDate(endDate,new Date(startDate.setDate(startDate.getDate()+90)))){
        this.view.flxErrorMsg6.setVisibility(true);
        this.view.lblErrorText6.text = "End date should not be more than 90 days from the start date.";
        this.view.flxCustomProductDate2.skin = this._calendarErrorSkin;
        proceed = false;
      }
      */
      return proceed;
    },

    validateFieldsScreen4: function(){
      let proceed = true;      
      let imgSegData = this.view.segImageDetails.data;
      for(let row=0; row<imgSegData.length; row++){
        let imgURL = imgSegData[row].tbxImageURL.text;
        if(imgSegData[row].lstBoxImageType.selectedKey!=="SELECT"){
          if(imgURL.trim() === ""){
            imgSegData[row].tbxImageURL.skin = this._tbxErrorSkin;
            imgSegData[row].flxErrorMsgURL.isVisible = true;
            imgSegData[row].lblErrorText.text = "Image source URL cannot be empty.";
            proceed = false;
          } 
          else if(imgURL.indexOf("http:") === 0){
            imgSegData[row].tbxImageURL.skin = this._tbxErrorSkin;
            imgSegData[row].flxErrorMsgURL.isVisible = true;
            imgSegData[row].lblErrorText.text = "The URL should start with https:// or ftp://";
            proceed = false;   
          } 
          else if(!this.imageValidationRegex.test(imgURL)){
            imgSegData[row].tbxImageURL.skin = this._tbxErrorSkin;
            imgSegData[row].flxErrorMsgURL.isVisible = true;
            imgSegData[row].lblErrorText.text = "Invalid image URL format.";
            proceed = false;
          }
        }
      }
      this.view.segImageDetails.setData(imgSegData);
      return proceed;
    },

    validateDataAddFacilityPopup: function(){
      let proceed = true;
      if(this.view.lstBoxAddFacilityName.selectedKey==="SELECT"){
        this.view.lstBoxAddFacilityName.skin = this._lstboxErrorSkin;
        this.view.flxErrorMessageFacility1.isVisible = true;
        proceed = false;
      }
      if(this.view.lstBoxOptionDisplayType.selectedKey==="SELECT"){
        this.view.lstBoxOptionDisplayType.skin = this._lstboxErrorSkin;
        this.view.flxErrorMessageFeature4.isVisible = true;
        proceed = false;
      }
      if(typeof this.view.tbxAddFeatureSequenceNumber.text === "string"){
        let seqNumInputText = this.view.tbxAddFeatureSequenceNumber.text.trim();
        if(seqNumInputText==="" || parseInt(seqNumInputText)===0){
          this.view.tbxAddFeatureSequenceNumber.skin = this._tbxErrorSkin;
          this.view.flxErrorMessageFeature5.isVisible = true;
          proceed = false;
        }
      } else if(typeof this.view.tbxAddFeatureSequenceNumber.text === "number"){
        if(this.view.tbxAddFeatureSequenceNumber.text===0){
          this.view.tbxAddFeatureSequenceNumber.skin = this._tbxErrorSkin;
          this.view.flxErrorMessageFeature5.isVisible = true;
          proceed = false;
        }
      }
      let segData = this.view.segFeatureOptionValues.data;
      for(let segRow=0; segRow<segData.length; segRow++){
        if(segData[segRow].fontIconSelectOptionDefaultValue.text===this._selCheckboxIcon && segData[segRow].tbxValue.text.trim()===""){
          segData[segRow].tbxValue.skin = this._tbxErrorSkin;
          segData[segRow].flxErrorMessageFeature6.isVisible = true;
          proceed = false;
        } else {
          segData[segRow].tbxValue.skin = this._tbxNormalSkin;
          segData[segRow].flxErrorMessageFeature6.isVisible = false;
        }        
      }
      this.view.segFeatureOptionValues.setData(segData);
      return proceed;
    },

    isInValidDate: function(date1, date2, isEndDateValidation){
      let isInvalid = false;
      if(isNaN(date1.getDate()) || isNaN(date2.getDate())){
        isInvalid = true;
      }
      date1.setHours(0, 0, 0, 0);
      date2.setHours(0, 0, 0, 0);
      if(date1 - date2 > 0 || (isEndDateValidation && date1 - date2 === 0)) {
        isInvalid = true;
      }
      return isInvalid;
    },

    navigateToScreen: function(screenNumber){
      const scopeObj = this;
      this.currentScreen = screenNumber;
      this.changeNavigationBarSkins(screenNumber);
      this.maxScreenNumNavAllowed = this.maxScreenNumNavAllowed<this.currentScreen ? this.currentScreen : this.maxScreenNumNavAllowed;
      this.view.flxProductDetails.setVisibility(screenNumber===1);
      this.view.flxProductDescription.setVisibility(screenNumber===2);
      this.view.flxProductFacilities.setVisibility(screenNumber===3);
      this.view.flxProductFeatures.setVisibility(screenNumber===4);
      this.view.flxImageDetails.setVisibility(screenNumber===5);
      this.view.flxAdditionalAttributes.setVisibility(screenNumber===6);
      this.view.flxNavigationBarButtons.setVisibility(true);
      this.view.flxAddProdFeaturesButtons.setVisibility(false);
      if(screenNumber === 3){
        if(scopeObj.view.segProductFacilities.data.length === 0){
          scopeObj.view.flxNoFacilitiesAdded.setVisibility(true);
          scopeObj.view.flxAddedFacilitiesList.setVisibility(false);
          scopeObj.view.flxFacilitiesBtnRight.isVisible = false;
        } else {
          scopeObj.view.flxNoFacilitiesAdded.setVisibility(false);
          scopeObj.view.flxAddedFacilitiesList.setVisibility(true);
          scopeObj.view.flxFacilitiesBtnRight.isVisible = scopeObj.isConfig2 ? true : false;
        }
      }
      if(screenNumber===4){
        scopeObj.view.flxAddProdFeaturesButtons.setVisibility(false);
        scopeObj.view.flxNavigationBarButtons.setVisibility(true);
        scopeObj.view.flxAddProductFeatures.setVisibility(false);
        scopeObj.setViewSelectedFeaturesSegData();
        if(scopeObj.view.segAddedFeatures.data.length===0){
          scopeObj.view.flxNoSelectedFeatures.setVisibility(true);
          scopeObj.view.flxViewSelectedFeatures.setVisibility(false);
          scopeObj.view.flxFeaturesTopWrapper2.isVisible = false;
        } else {
          scopeObj.view.flxNoSelectedFeatures.setVisibility(false);
          scopeObj.view.flxViewSelectedFeatures.setVisibility(true);
          scopeObj.view.lblNoFilterFeatureResults.setVisibility(false);
          scopeObj.view.flxFeaturesTopWrapper2.isVisible = scopeObj.isConfig2 ? true : false;
        }
      }
      this.view.forceLayout();
    },

    changeNavigationBarSkins: function(screenNumber){
      let activeSkin = this._leftVBarBtnSelectedSkin;
      let inactiveSkin = this._leftVBarBtnUnselectedSkin;
      let btnDarkSkin = this._bottomBarBtnDarkSkin;
      let btnLightSkin = this._bottomBarBtnLightSkin;
      let btnLightHoverSkin = this._bottomBarBtnLightHoverSkin;
      let btnDarkHoverSkin = this._bottomBarBtnDarkHoverSkin;

      this.view.lblFontIconArrow.text = (screenNumber===1 || screenNumber===2) ? this._downArrowIcon : this._upArrowIcon;
      this.view.lblFontIconArrow.skin = (screenNumber===1 || screenNumber===2) ? this._leftVBarExpandIconSkin : this._leftVBarCollapseIconSkin;
      this.view.lblOption1.skin = (screenNumber===1 || screenNumber===2) ? activeSkin : inactiveSkin;
      this.view.flxSubOptions.isVisible = (screenNumber===1 || screenNumber===2) ? true : false;

      this.view.lblSubOption1.skin = (screenNumber===1) ? activeSkin : inactiveSkin;
      this.view.lblFontIconRightArrow1.isVisible = (screenNumber===1) ? true : false;
      this.view.lblSubOption2.skin = (screenNumber===2) ? activeSkin : inactiveSkin;
      this.view.lblFontIconRightArrow2.isVisible = (screenNumber===2) ? true: false;
      this.view.lblOption2.skin = (screenNumber===3) ? activeSkin : inactiveSkin;
      this.view.lblFontIconRightArrow3.isVisible = (screenNumber===3) ? true: false;      
      this.view.lblOption3.skin = (screenNumber===4) ? activeSkin : inactiveSkin;
      this.view.lblFontIconRightArrow4.isVisible = (screenNumber===4) ? true: false;
      this.view.lblOption4.skin = (screenNumber===5) ? activeSkin : inactiveSkin;
      this.view.lblFontIconRightArrow5.isVisible = (screenNumber===5) ? true: false;
      this.view.lblOption5.skin = (screenNumber===6) ? activeSkin : inactiveSkin;
      this.view.lblFontIconRightArrow6.isVisible = (screenNumber===6) ? true: false;
      
      this.view.btnNext.setEnabled(true);
      this.view.btnAddProduct.setEnabled(true);
      this.view.btnAddProduct.isVisible = true;
      if(screenNumber<=3){
        this.view.btnNext.skin = btnDarkSkin;
        this.view.btnNext.focusSkin = btnDarkSkin;
        this.view.btnNext.hoverSkin = btnDarkHoverSkin;
        this.view.btnNext.isVisible = true;
      } else if(screenNumber===4){
         CommonUtilities.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.btnNext,false,true);
        this.view.btnNext.isVisible = true;
      } else if(screenNumber===5){
        this.view.btnNext.skin = btnLightSkin;
        this.view.btnNext.focusSkin = btnLightSkin;
        this.view.btnNext.hoverSkin = btnLightHoverSkin;
        this.view.btnNext.isVisible = true;
      } else if(screenNumber===6){
        this.view.btnNext.isVisible = false;
      }
      this.view.forceLayout();
    },
    assignFeatureNameAndGroup: function(){
      const scopeObj = this;
      let featureType = scopeObj.view.lstBoxAddFacilityName.selectedKey;
      let featureName = scopeObj.allFeatureType_NameGroupMap.get(featureType)[0];
      let featureCode = scopeObj.allFeatureType_NameGroupMap.get(featureType)[3];
      scopeObj.view.tbxAddFacilityCode.text = featureCode||"N/A";
      scopeObj.view.tbxAddFacilityCode.skin = scopeObj._tbxDisabledSkin;
      scopeObj.view.tbxAddFacilityCode.setEnabled(false);
    },

    mappingSegProductPurposeData: function(data){
      // PRODUCT_DETAILS
      return{
        "purpose": data,
        "imgCheckBox": {
          "src": "checkboxnormal.png"
        },
        "lblDescription": {
          "text": data
        }
      };
    },

    getDataMapForProductPurpose: function(){
      // PRODUCT_DETAILS
      let dataMap = {
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "imgCheckBox",
        "lblDescription": "lblDescription"
      };
      return dataMap;
    },

    setDataToSegProductPurpose: function(data){
      // PRODUCT_DETAILS
      this.view.segProductPurpose.widgetDataMap = this.getDataMapForProductPurpose();
      this.view.segProductPurpose.setData(data);
    },

    segProductPurposeOnRowClick: function(){ 
      // PRODUCT_DETAILS
      let selRows = this.view.segProductPurpose.selectedRowItems;
      selRows = selRows ? selRows.length : 0;      
      this.view.lblSelectedValue.text = selRows + " Selected";
      this.view.forceLayout();
    },

    editProductFacility: function(){
      // PRODUCT_FACILITY
      this.view.flxAddProductPopups.isVisible = true;
      this.view.flxAddFacilityPopup.isVisible = true;
      this.alignFlxManageProducts();
      this.populateDataForFacilityEdit();
    },
    removeProductFacility: function(){
      // PRODUCT_FACILITIES
      let rowIndex = this.view.segProductFacilities.selectedRowIndex[1];
      let segData = this.view.segProductFacilities.data;
      delete this.view.segProductFacilities.info.facilityFeatureIds[segData[rowIndex].lblProductsValue2.text];
      this.view.segProductFacilities.removeAt(rowIndex);
      this.prevIndex = -1;
      this.view.lblFacilitiesHeading.text = kony.i18n.getLocalizedString("i18n.products.ProductFacilities") + " (" + segData.length + ")";
      if(segData.length===0){
        this.view.flxNoFacilitiesAdded.setVisibility(true);
        this.view.flxAddedFacilitiesList.setVisibility(false);
        this.view.flxContextualMenu.setVisibility(false);
        this.view.flxFacilitiesBtnRight.setVisibility(false);
        this.view.segProductFacilities.info.facilityFeatureIds={};
      }
      this.view.popUp.setVisibility(false);
      this.view.flxAddProductPopups.setVisibility(false);
      this.resetFacilityListBoxData();
      this.willUpdateUI({
        toastModel:{
          status : "success",
          message: "Facility has been removed successfully"
        }
      });
    },

    setDeleteFacilityMessage: function(){
      // PRODUCT_FACILITIES: Show Popup Message before Deleting Feature
      this.view.popUp.lblPopUpMainMessage.text =  kony.i18n.getLocalizedString("i18n.products.RemoveFacility");;
      let segData = this.view.segProductFacilities.data;
      let selRow = this.view.segProductFacilities.selectedRowIndex[1];
//       let line1 = kony.i18n.getLocalizedString("i18n.products.RemoveFacilityMessage1") + segData[selRow].lblProductsValue1.text + "?<br>";
//       let line2 = kony.i18n.getLocalizedString("i18n.products.RemoveFacilityMessage2");
      this.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.products.RemoveFacilityMessage1") + segData[selRow].lblProductsValue1.text + "?<br>" + kony.i18n.getLocalizedString("i18n.products.RemoveFacilityMessage2");
      this.view.popUp.btnPopUpCancel.text = "CANCEL";
      this.view.popUp.btnPopUpDelete.text = "REMOVE";
      this.view.popUp.setVisibility(true);
      this.view.flxAddProductPopups.setVisibility(true);
      this.view.forceLayout();
    },

    getNewProductFacilityData: function(){
      // PRODUCT_FACILTIY: Fetch Data from AddFacilities Popup and return it.
      const scopeObj = this;
      let segData = this.view.segFeatureOptionValues.data;
      let defaultValue="";
      let facilityDefaultValue="";
      let optionValues = [];
      let optionDispType = scopeObj.view.lstBoxOptionDisplayType.selectedKey==="SELECT" ? "" : scopeObj.view.lstBoxOptionDisplayType.selectedKey;
      for(let segRow=0; segRow<segData.length; segRow++){
        defaultValue="";
        if(defaultValue==="" && segData[segRow].fontIconSelectOptionDefaultValue.text===scopeObj._selCheckboxIcon){
          defaultValue = segData[segRow].tbxValue.text;
          facilityDefaultValue=defaultValue;
        }
        let optionValue = {
          "value": segData[segRow].tbxValue.text,
          "desc": segData[segRow].txtAreaFeatureDescription.text,
          "extensionData": defaultValue!==""?{"isDefault":"true"}:{}
        };
        if(optionValue.value!=="")
          optionValues.push(optionValue);
      }
      let sequenceNo = "";
      if(scopeObj.view.tbxAddFeatureSequenceNumber.text!==""){
        sequenceNo = parseInt(scopeObj.view.tbxAddFeatureSequenceNumber.text);
      }
      let facilityId = scopeObj.view.lstBoxAddFacilityName.selectedKey;
      let facilityType = scopeObj.allFeatureType_NameGroupMap.get(facilityId)[2];
      let facilityGroup = scopeObj.allFeatureType_NameGroupMap.get(facilityId)[1];
      let facilityCode = scopeObj.allFeatureType_NameGroupMap.get(facilityId)[3];
      let newFacilityData=[{
        "facilityName": scopeObj.view.lstBoxAddFacilityName.selectedKeyValue[1],
        "code": scopeObj.view.tbxAddFacilityCode.text,
        "facilityId": facilityId,
        "facilityGroup":facilityGroup,
        "type":facilityType,
        "description": scopeObj.view.txtAreaFacilityDescription.text,
        "sequenceNo": sequenceNo,
        "isMandatory": scopeObj.view.fontIconSmsChannelSelectOption.text===scopeObj._selCheckboxIcon,
        "defaultValue": facilityDefaultValue,
        "option": "",
        "optionDispType": optionDispType,
        "optionValues": optionValues,
        "extensionData": {}
      }];
      return newFacilityData;
    },

    mappingViewOptionValues: function(optionValue){
      let mappedOptionValue = {
        "lblOptionValue":{
          "text":optionValue.value,
          "skin": this._commonLabelSkin
        },
        "lblOptionDescription":{
          "text":optionValue.desc,
          "skin": this._commonLabelSkin
        }
      };
      return mappedOptionValue;
    },
    addFacilityDataToSeg: function(newFacilityData){
      // PRODUCT_FACILITIES: Add data fetched from addFacility Popup to 'segProductFacilities'
      let segData = this.view.segProductFacilities.data;
      newFacilityData = newFacilityData.map(this.mapDataForSegAddedFacilities);
      if(this.isFeatureEdit === true){
        let selRow = this.view.segProductFacilities.selectedRowIndex[1];
        segData[selRow] = newFacilityData[0];
      } else {
        Array.prototype.push.apply(segData,newFacilityData);
      }
      let dataMap = this.getWidgetMapForAddedFacilityFeatures();
      this.view.segProductFacilities.widgetDataMap = dataMap;
      this.sortBy = SortingFormExtn.getObjectSorter("lblProductsValue1.text");
      segData=segData.sort(this.sortBy.sortData);
      this.resetSortImages(1);
      this.view.segProductFacilities.setData(segData);
      this.setSelectedFacilityFeatures();
      this.resetFacilityListBoxData();
      this.view.forceLayout();
    },

    getWidgetMapForAddedFacilityFeatures: function(){
      // PRODUCT_FEATURES: Returns widgetDataMap for 'segAddedFeatures','segProductFacilities'
      let dataMap = {
        "flxProductAddedFeatures":"flxProductAddedFeatures",
        "lblProductsValue1":"lblProductsValue1",
        "lblProductsValue2":"lblProductsValue2",
        "lblProductsValue3":"lblProductsValue3",
        "flxOptions":"flxOptions",
        "lblIconOptions":"lblIconOptions",
        "flxStatus":"flxStatus",
        "lblIconStatus":"lblIconStatus",
        "lblStatus":"lblStatus",
        "lblSeperator":"lblSeperator"
      };
      return dataMap;
    },

    mapDataForSegAddedFacilities: function(data){
      // PRODUCT_FACILITY: Maps Data before being populated to 'segProductFacilities'
      const scopeObj = this;
      let onClickMethod = this.showContextualMenu;
      let optionsLabelText = this._segMoreDetailsIcon;
      let trimCharactersLength = this.view.flxViewSelectedFeatures.frame.width < 1000 ? 28 : 50;
      //in edit flow, features assigned to facilities
      if(data.features&&data.features.length>0){
        var facilityFeatures=data.features.filter(function(rec){
          return rec.isSelected=="true";
        });
        if(scopeObj.view.segProductFacilities.info.facilities[data.facilityId])
        scopeObj.view.segProductFacilities.info.facilities[data.facilityId].features=facilityFeatures;
        else{//this gets triggerred when that facility is actually deleted but present at product level
          scopeObj.view.segProductFacilities.info.facilities[data.facilityId]=data;
          scopeObj.view.segProductFacilities.info.facilities[data.facilityId].features=facilityFeatures;
        }
      }
      data.features=this.view.segProductFacilities.info.facilities[data.facilityId].features?this.view.segProductFacilities.info.facilities[data.facilityId].features:[];
      if(this.isConfig2===false){        
        onClickMethod = (widget, context)=>{
          scopeObj.selRowFeatureData = this.view.segProductFacilities.data[context.rowIndex].facilityData;
          scopeObj.editProductFacility();
        };
        optionsLabelText = this._editIcon;
      }
      var mappedRowData = {
        "lblProductsValue1":{"text":data.facilityName|| "N/A",
                             "skin":"sknLblLatoReg117eb013px",
                             "hoverSkin":"sknLbl117eb013pxHov",
                             "onTouchStart": this.showFacilityDetailsPopup.bind(this,"FACILITY")
                            },
        "lblProductsValue2":{"text":data.code|| "N/A",
                             "skin":"sknLbl485C75LatoRegular13Px",
                             "hoverSkin":"sknLbl485C75LatoRegular13Px"
                            },
        "facilityId":data.facilityId,
        "lblProductsValue3":{"isVisible":true, text:scopeObj.getTwoDigitNumber(data.features.length)},
        "flxStatus": {"isVisible" : false},
        "flxOptions": {"isVisible": true,
                       "hoverSkin":"sknflxffffffop100Border424242Radius100px",
                       "onClick":onClickMethod},
        "lblIconOptions":{"text":optionsLabelText},
        "lblSeperator":"-",
        "template":"flxProductAddedFeatures",
        "facilityData": data
      };
      mappedRowData = Object.assign(mappedRowData, data);
      return mappedRowData;
    },
    setSelectedFacilityFeatures : function(){
      var segData=this.view.segProductFacilities.data;
      var featureIds={};
      for(let i=0;i<segData.length;i++){
        var facilityFeatures=segData[i].facilityData.features;
        featureIds[segData[i].facilityData.facilityId]=[];
        for(let j=0;j<facilityFeatures.length;j++){
          featureIds[segData[i].facilityData.facilityId].push(facilityFeatures[j].featureId||facilityFeatures[j].id);
        }
      }
      this.view.segProductFacilities.info["facilityFeatureIds"]=featureIds;
    },
    getAddFeaturesSegWidgetMap : function(){
      var widgetMap = {
        //section template
        "flxEnrollSelectedAccountsSec":"flxEnrollSelectedAccountsSec",
        "flxAccountSectionCont":"flxAccountSectionCont",
        "flxLeftDetailsCont":"flxLeftDetailsCont",
        "lblFeatureName":"lblFeatureName",
        "flxToggleArrow":"flxToggleArrow",
        "lblIconToggleArrow":"lblIconToggleArrow",
        "flxHeadingCheckbox":"flxHeadingCheckbox",
        "imgTopCheckbox":"imgTopCheckbox",
        "flxRow2":"flxRow2",
        "lblAvailableActions":"lblAvailableActions",
        "lblCountActions":"lblCountActions",
        "lblTotalActions":"lblTotalActions",
        "lblSectionLine":"lblSectionLine",
        "lblStatusValue":"lblStatusValue",
        "lblIconStatus":"lblIconStatus",
        "flxHeaderContainer":"flxHeaderContainer",
        "flxActionsHeaderContainer":"flxActionsHeaderContainer",
        "flxCheckbox":"flxCheckbox",
        "flxActionNameHeading":"flxActionNameHeading",
        "flxActionCheckbox":"flxActionCheckbox",
        "lblActionName":"lblActionName",
        "flxActionStatusHeading":"flxActionStatusHeading",
        "lblActionStatus":"lblActionStatus",
        "lblActionSeperator":"lblActionSeperator",
        //row template
        "flxFeatureNameCont":"flxFeatureNameCont",
        "imgCheckbox":"imgCheckbox",
        "flxStatus":"flxStatus",
        "lblStatus":"lblStatus",
        "flxContractEnrollFeaturesEditRow":"flxContractEnrollFeaturesEditRow",
        "id":"id",
        "featureDetailsObj":"featureDetailsObj",
        "actionDetailsObj":"actionDetailsObj"
      };
      return widgetMap;
    },
    /*PRODUCT FEATURES: data initialization*/
    initializeProductFeaturesData : function(features,isEdit){
      var productFeaturesData=new Map();
      for(var i=0; i<features.length; i++){
        features[i]["isSelected"] =features[i]["isSelected"]?features[i]["isSelected"]:"false";
        var featureObj = {"featureDetails":features[i], "actions":JSON.stringify(features[i].actions)};
        productFeaturesData.set(features[i].featureId||features[i].id,featureObj);
      }
      this.productFeaturesData=JSON.stringify(Array.from(productFeaturesData));
    },
    /* PRODUCT FEATURES: set data to add product features */
    setAddFeaturesSegData: function(features){
      var self =this;
      var featuresMap = new Map(JSON.parse(this.productFeaturesData));
      var facilityFeatureIdsArray=this.view.segProductFacilities.info.facilityFeatureIds?Object.values(this.view.segProductFacilities.info.facilityFeatureIds):[];
      var facilityFeatureIds=[].concat.apply([],facilityFeatureIdsArray);
      var segData = [], selFeatureCount = 0, segDataJson = {};
      featuresMap.forEach(function(featureObj,key){
        if(!facilityFeatureIds.contains(featureObj.featureDetails.featureId||featureObj.featureDetails.id)){
        var rowsData = [], selRowCount = 0;
        var actions = JSON.parse(featureObj.actions) || [];
        for(var i=0 ;i<actions.length ; i++){
          var rowObj =  {
            "id": actions[i].actionId||actions[i].id,
            "actionDetailsObj":actions[i],
            "flxContractEnrollFeaturesEditRow": {"isVisible": false,
                                                 "skin":"sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight"},
            "lblFeatureName": {"text": actions[i].actionName||actions[i].name},
            "flxCheckbox": {"onClick": self.onClickAddFeaturesCheckbox.bind(self,self.view.segAddProductFeatures)},
            "imgCheckbox": {"src":(actions[i].isSelected === "true") ? CommonUtilities.AdminConsoleCommonUtils.checkboxSelected: CommonUtilities.AdminConsoleCommonUtils.checkboxnormal},
            "lblStatus": {"text": (actions[i].status||actions[i].actionStatus) === CommonUtilities.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ?
                          kony.i18n.getLocalizedString("i18n.permission.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")},
            "lblIconStatus": {"text":"\ue921",
                              "skin": (actions[i].status||actions[i].actionStatus) === CommonUtilities.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ?
                              "sknFontIconActivate" : "sknfontIconInactive"},
            "flxFeatureNameCont":{"left":"40dp"},
            "dependentActions": actions[i].dependentActions,
            "template":"flxContractEnrollFeaturesEditRow"
          };
          rowsData.push(rowObj);
          selRowCount = (actions[i].isSelected === "true") ? (selRowCount +1) : selRowCount;
        }
        
        var feature = featureObj.featureDetails;
        var secData = {
          "id": feature.featureId||feature.id,
          "featureDetailsObj":feature,
          "flxAccountSectionCont":{"skin":"sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px"},
          "lblFeatureName": {"text": feature.featureName||feature.name},
          "flxToggleArrow": {"onClick": self.toggleSelectFeatureArrow.bind(self,self.view.segAddProductFeatures)},
          "lblIconToggleArrow":{"text": "\ue922",
                                "skin": "sknIcon00000015px"},
          "flxHeadingCheckbox":{"isVisible": true,
                                "onClick":self.onClickAddFeaturesCheckbox.bind(self,self.view.segAddProductFeatures)},
          "imgTopCheckbox": {"src": self.getHeaderCheckboxImage(rowsData,true,true)},
          "lblAvailableActions": {"text": kony.i18n.getLocalizedString("i18n.products.SelectedAccountActionsColon")},
          "lblCountActions":{"text": self.getTwoDigitNumber(selRowCount)},
          "lblTotalActions": {"text": "of "+ self.getTwoDigitNumber(rowsData.length)},
          "lblSectionLine":"-",
          "lblStatusValue":{"text": (feature.featureStatus||feature.status) === CommonUtilities.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?
                            kony.i18n.getLocalizedString("i18n.permission.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")},
          "lblIconStatus":{"text": "\ue921",
                           "skin": (feature.featureStatus||feature.status) === CommonUtilities.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?
                           "sknFontIconActivate" : "sknfontIconInactive"},
          "flxHeaderContainer":{"isVisible":false},
          "flxActionsHeaderContainer": {"isVisible":false},
          "flxActionCheckbox": {"isVisible":false},
          "lblActionName":{"text": kony.i18n.getLocalizedString("i18n.products.Action_UC")},
          "lblActionStatus":{"text": kony.i18n.getLocalizedString("i18n.roles.STATUS")},
          "lblActionSeperator": {"skin": "sknlblSeperatorD7D9E0","text":"-"},
          "flxActionNameHeading": {"left": "55dp"},
          "template":"flxEnrollSelectedAccountsSec",
        };
        selFeatureCount = (secData.imgTopCheckbox.src === CommonUtilities.AdminConsoleCommonUtils.checkboxnormal) ?
          selFeatureCount : (selFeatureCount+1);
        segDataJson[feature.featureId||feature.id] = {"secData":secData,"rowData":rowsData};
        segData.push([secData,rowsData]);
        }
      });
      this.view.lblCountFeatures.text = this.getTwoDigitNumber(selFeatureCount);
      this.view.segAddProductFeatures.widgetDataMap = this.getAddFeaturesSegWidgetMap();
      this.view.segAddProductFeatures.setData(segData);
      this.view.segAddProductFeatures.info = {"segDataJson":segDataJson};
      this.view.lblselectAllFeatures.text=(selFeatureCount===segData.length)?kony.i18n.getLocalizedString("i18n.products.RemoveAllFeatures"):kony.i18n.getLocalizedString("i18n.products.SelectAllFeatures")
    },
    /* expand/collapse the feature card in add product features screen*/
    toggleSelectFeatureArrow : function(segmentPath,context){
      var selSecInd = context.rowContext.sectionIndex;
      var selRowInd = context.rowContext.rowIndex;
      var segData = segmentPath.data;
      var segCategory = segmentPath.id === "segAddProductFeatures" ? 1:2;
      for(var i=0; i<segData.length; i++){
        if(selSecInd !== i){
          segData[i][0] = this.getCollapsedSectionProperties(segData[i][0], segCategory);
          segData[i][1] = this.showHideSegRowFlex(segData[i][1],false);
        }
      }
      if((segData[selSecInd][0].lblIconToggleArrow && segData[selSecInd][0].lblIconToggleArrow.skin === "sknIcon00000015px") ||
        (segData[selSecInd][0].lblArrow && segData[selSecInd][0].lblArrow.skin === "sknfontIconDescRightArrow14px")){
        segData[selSecInd][0] = this.getExpandedSectionProperties(segData[selSecInd][0], segCategory);
        segData[selSecInd][1] = this.showHideSegRowFlex(segData[selSecInd][1],true);
      } else{
        segData[selSecInd][0] = this.getCollapsedSectionProperties(segData[selSecInd][0], segCategory);
        segData[selSecInd][1] = this.showHideSegRowFlex(segData[selSecInd][1],false);
      }
      segmentPath.setData(segData);
    },
    /* set collapsed section properties */
    getCollapsedSectionProperties : function(sectionData,segCategory){
      if(segCategory === 1){ //add product features
        sectionData.lblIconToggleArrow.text = "\ue922"; //right-arrow
        sectionData.lblIconToggleArrow.skin = "sknIcon00000015px";
        sectionData.flxActionsHeaderContainer.isVisible = false;
        sectionData.flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px"; 
      }else if(segCategory === 2){ //view features popup
        sectionData.flxViewActionHeader.isVisible = false;
        sectionData.lblFASeperator1.isVisible = false;
        sectionData.lblArrow.text = "\ue922";
        sectionData.lblArrow.skin = "sknfontIconDescRightArrow14px";
        sectionData.flxHeader.skin="sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px";
      }
      return sectionData;
    },
     /* set expanded section properties */
    getExpandedSectionProperties : function(sectionData,segCategory){
      if(segCategory === 1){ //add product features
        sectionData.lblIconToggleArrow.text = "\ue915"; //down-arrow
        sectionData.lblIconToggleArrow.skin = "sknIcon00000014px";
        sectionData.flxActionsHeaderContainer.isVisible = true;
        sectionData.flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound";
      } else if(segCategory === 2){ //view features popup
        sectionData.flxViewActionHeader.isVisible = true;
        sectionData.lblFASeperator1.isVisible = true;
        sectionData.lblArrow.text = "\ue915";
        sectionData.lblArrow.skin = "sknfontIconDescDownArrow12px";
        sectionData.flxHeader.skin="sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound";
      }
      return sectionData;
    },
    /* show/hide rows under a section */
    showHideSegRowFlex : function(rowsData,visibility){
      for(var i=0;i<rowsData.length;i++){
        if(rowsData[i].flxContractEnrollFeaturesEditRow){ //Add product features
          rowsData[i].isRowVisible =visibility;
          rowsData[i].flxContractEnrollFeaturesEditRow.isVisible = visibility;
          if(visibility === true && (i === rowsData.length-1)){
            rowsData[i].flxContractEnrollFeaturesEditRow.skin = "sknFlxBgFFFFFFbrD7D9E0r3pxBottomRound";
            rowsData[i].flxFeatureNameCont.bottom = "15dp";
          } else {
            rowsData[i].flxContractEnrollFeaturesEditRow.skin = "sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight";
            rowsData[i].flxFeatureNameCont.bottom = "0dp";
          }
        } else if(rowsData[i].flxContractsFABodyView){ //features details popup
          rowsData[i].isRowVisible =visibility;
          rowsData[i].flxContractsFABodyView.isVisible = visibility;
          if(visibility === true && (i === rowsData.length-1)){
            rowsData[i].flxContractsFABodyView.skin = "sknFlxBgFFFFFFbrD7D9E0r3pxBottomRound";
          } else {
            rowsData[i].flxContractsFABodyView.skin = "sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight";
          }
        } 
      }
      return rowsData;
    },
    /* get the image to be set in section header in add product features*/
    getHeaderCheckboxImage : function(data,isRowData,hasPartialSelection){
      var img = CommonUtilities.AdminConsoleCommonUtils.checkboxnormal;
      var currImg = (isRowData === true) ? "imgCheckbox" :"imgTopCheckbox";
      var selCount = 0, partialCount = 0;
      for(var i=0; i<data.length; i++){
        var list = (isRowData === true) ? data[i] : data[i][0];
        if(list[currImg].src === CommonUtilities.AdminConsoleCommonUtils.checkboxSelected || list[currImg].src === CommonUtilities.AdminConsoleCommonUtils.checkboxPartial){
          selCount  = selCount +1;
          partialCount = (list[currImg].src === CommonUtilities.AdminConsoleCommonUtils.checkboxPartial) ? partialCount +1 : partialCount;
        }
      }
      if(hasPartialSelection){
        if(selCount !== 0 && selCount === data.length)
          img = partialCount === 0 ? CommonUtilities.AdminConsoleCommonUtils.checkboxSelected: CommonUtilities.AdminConsoleCommonUtils.checkboxPartial;
        else if(selCount !== 0 && selCount < data.length)
          img = CommonUtilities.AdminConsoleCommonUtils.checkboxPartial;
      } else{
        if(selCount === data.length)
          img = CommonUtilities.AdminConsoleCommonUtils.checkboxSelected;
      }
      return img;    
    },
    /* PRODUCT FEATURES: check/uncheck feature/actions section in add product features */
    onClickAddFeaturesCheckbox : function(segmentPath,eventObj){
      var selSecInd = eventObj.rowContext.sectionIndex;
      var selRowInd = eventObj.rowContext.rowIndex;
      var segData = segmentPath.data;
      var segSecData = segData[selSecInd][0];
      var rowsData = segData[selSecInd][1];
      var selectedRowsCount = 0,selFeaturesCount = 0;
      var allFeaturesMap = new Map(JSON.parse(this.productFeaturesData));
      var featureToUpdate = allFeaturesMap.get(segSecData.id);
      var actionsToUpdate = JSON.parse(featureToUpdate.actions);
      var dependentActions=[];
      //on row selections
      if(selRowInd >= 0){
        rowsData[selRowInd].imgCheckbox.src = (rowsData[selRowInd].imgCheckbox.src === CommonUtilities.AdminConsoleCommonUtils.checkboxnormal) ?
          CommonUtilities.AdminConsoleCommonUtils.checkboxSelected : CommonUtilities.AdminConsoleCommonUtils.checkboxnormal;
        if(rowsData[selRowInd].dependentActions&&rowsData[selRowInd].dependentActions.length>0){
          dependentActions=rowsData[selRowInd].dependentActions;
          for(let x=0;x<dependentActions.length;x++){
            for(let y=0;y<rowsData.length;y++){
              if(rowsData[y].id===dependentActions[x].id){
                rowsData[y].imgCheckbox.src =rowsData[selRowInd].imgCheckbox.src;
              }
            }
          }
        }
        for(var i=0; i<actionsToUpdate.length; i++){
          if(actionsToUpdate[i].actionId===rowsData[selRowInd].id||actionsToUpdate[i].id===rowsData[selRowInd].id)
        actionsToUpdate[i].isSelected = rowsData[selRowInd].imgCheckbox.src === CommonUtilities.AdminConsoleCommonUtils.checkboxnormal?"false":"true";
      }
        segSecData.imgTopCheckbox.src = this.getHeaderCheckboxImage(rowsData,true,true);
      } //on section selections
      else{
        var sectionImg = (segSecData.imgTopCheckbox.src === CommonUtilities.AdminConsoleCommonUtils.checkboxnormal) ?
            CommonUtilities.AdminConsoleCommonUtils.checkboxSelected : CommonUtilities.AdminConsoleCommonUtils.checkboxnormal;
        segSecData.imgTopCheckbox.src = sectionImg;
        featureToUpdate.featureDetails.isSelected = sectionImg===CommonUtilities.AdminConsoleCommonUtils.checkboxnormal?"false":"true";
        for(var i=0; i<rowsData.length; i++){
          rowsData[i].imgCheckbox.src = sectionImg;
        }
      }
      selectedRowsCount = this.getSelectedFeatureActionCount(rowsData,"imgCheckbox",false);
      segSecData.lblCountActions.text = this.getTwoDigitNumber(selectedRowsCount);
      segmentPath.setSectionAt([segSecData,rowsData],selSecInd);
      this.view.segAddProductFeatures.info.segDataJson[segSecData.id] = {"secData":segSecData,"rowData":rowsData}
      var selFeaturesCount = this.getSelectedFeatureActionCount(segmentPath.data,"imgTopCheckbox",true);
      this.view.lblselectAllFeatures.text=(parseInt(selFeaturesCount)===segData.length)?kony.i18n.getLocalizedString("i18n.products.RemoveAllFeatures"):kony.i18n.getLocalizedString("i18n.products.SelectAllFeatures");
      this.view.lblCountFeatures.text = this.getTwoDigitNumber(selFeaturesCount);
    },
    /* PRODUCT FEATURES: updates the productFeatures map with selections */
    updateFeatureActionsAdded : function(segmentPath,eventObj){
      var featuresMap = new Map(JSON.parse(this.productFeaturesData));
      var segData = this.view.segAddProductFeatures.data;
      for(var m=0; m<segData.length; m++){
        var featureToUpdate = featuresMap.get(segData[m][0].id);
        var featureData = featureToUpdate.featureDetails;
        featureData.isSelected = segData[m][0].imgTopCheckbox.src === CommonUtilities.AdminConsoleCommonUtils.checkboxnormal ?
                                 "false":"true";
        var actions = JSON.parse(featureToUpdate.actions);
        var segRowsData = segData[m][1];
        for(var i=0; i<actions.length; i++){
          for(var j=0; j<segRowsData.length; j++){
            if(actions[i].actionId === segRowsData[j].id||actions[i].id === segRowsData[j].id){
              if(segRowsData[i].imgCheckbox.src === CommonUtilities.AdminConsoleCommonUtils.checkboxSelected){
                actions[i].isSelected = "true";
              }else{
                actions[i].isSelected = "false";
              }
            }
          }
        }
        featureToUpdate.actions = JSON.stringify(actions);
        featuresMap.set(segData[m][0].id,featureToUpdate);
        this.productFeaturesData=JSON.stringify(Array.from(featuresMap));
      }
    },
    /* get the selected features/actions count in add product features*/
    getSelectedFeatureActionCount : function(segData,imgCheckboxId,isSection){
      var selectedCount = 0;
      for(var i=0;i < segData.length; i++){
        var data = (isSection === true) ? segData[i][0] : segData[i];
        if(data[imgCheckboxId].src === CommonUtilities.AdminConsoleCommonUtils.checkboxSelected ||
           data[imgCheckboxId].src === CommonUtilities.AdminConsoleCommonUtils.checkboxPartial)
          selectedCount = selectedCount +1;
      }
      return (selectedCount+"");
    },
    /* get 2 digit string for number */
    getTwoDigitNumber : function(count){
      var updatedCount =0;
      count = parseInt(count,10);
      if(count > 9){
        updatedCount = count;
      } else{
        updatedCount = "0"+count;
      }
      return updatedCount+"";
    },
    /* PRODUCT FEATURES: set data to selected features segment in add product features */
    setViewSelectedFeaturesSegData : function(featuresList){
      var self =this;
      var featuresList = featuresList?featuresList:new Map(JSON.parse(this.productFeaturesData));
      var facilityFeatureIdsArray=this.view.segProductFacilities.info.facilityFeatureIds?Object.values(this.view.segProductFacilities.info.facilityFeatureIds):[];
      var facilityFeatureIds=[].concat.apply([],facilityFeatureIdsArray);
      var segData = [];
      if(featuresList.size > 0){
        featuresList.forEach(function(featureObj,key){
          if(featureObj.featureDetails.isSelected === "true"&&!facilityFeatureIds.contains(featureObj.featureDetails.featureId||featureObj.featureDetails.id)){
            var mappedData = self.selectedFeaturesDataMapping(featureObj);
            segData.push(mappedData);
          }
        });
      }
      if(segData.length > 0){
        this.setDataToFeatureStatusFilter(segData);
        this.view.segAddedFeatures.widgetDataMap = this.getWidgetMapForAddedFacilityFeatures();
        this.sortBy = SortingFormExtn.getObjectSorter("lblProductsValue1.text");
        segData=segData.sort(this.sortBy.sortData);
        this.resetSortImages(2);
        this.view.segAddedFeatures.setData(segData);
        this.view.segAddedFeatures.info ={"allData":segData};
        this.view.lblFeaturesHeader.text = this._featureHeadingLblTxt + " (" + segData.length +")";
        this.view.flxNoSelectedFeatures.setVisibility(false);
        this.view.flxViewSelectedFeatures.setVisibility(true);
        this.view.lblNoFilterFeatureResults.setVisibility(false);
        this.view.flxFeaturesTopWrapper2.isVisible = this.isConfig2 ? true : false;
      } else{
        this.view.lblFeaturesHeader.text=this._featureHeadingLblTxt + " (0)"
        this.view.flxNoSelectedFeatures.setVisibility(true);
        this.view.flxViewSelectedFeatures.setVisibility(false);
        this.view.flxFeaturesTopWrapper2.setVisibility(false);
      }
      
    },
    /* PRODUCT FEATURES: map data for view selected features segment in add feature products */
    selectedFeaturesDataMapping : function(featureObj){
      var self=this;
      var feature = featureObj.featureDetails;
      var actions = JSON.parse(featureObj.actions);
      var selActionsCount = 0;
      var allActionsCount = actions.length;
      for(var i=0; i<actions.length; i++){
        if(actions[i].isSelected === "true"){
          selActionsCount = selActionsCount + 1;
        }
      }
      feature["actions"] = actions;
      var mappedObj = {
        "lblProductsValue1":{"text":feature.featureName||feature.name,
                             "skin":"sknLbl485C75LatoRegular13Px",
                             "hoverSkin":"sknLbl485C75LatoRegular13Px"
                            },
        "lblProductsValue2":{"text":this.getTwoDigitNumber(selActionsCount) +" of "+ this.getTwoDigitNumber(allActionsCount) ,
                             "skin":"sknLblLatoReg117eb013px",
                             "hoverSkin":"sknLbl117eb013pxHov",
                             "onTouchStart": this.showFacilityDetailsPopup.bind(this,"FEATURES")
                            },
        "lblProductsValue3":{"isVisible":false},
        "flxStatus": {"isVisible" : true},
        "lblStatus": {"text": (feature.featureStatus||feature.status) === CommonUtilities.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?
                      kony.i18n.getLocalizedString("i18n.permission.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")},
        "lblIconStatus": {"text": "\ue921",
                          "skin": (feature.featureStatus||feature.status) === CommonUtilities.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?
                          "sknFontIconActivate" : "sknfontIconInactive"},
        "flxOptions": {"isVisible": true,
                       "hoverSkin":"sknCursor",
                       "onClick": this.removeProductFeature,
                      "onHover":function(widget,context){
                       self.showPrimaryDeleteHover(widget,context);
                      }},
        "lblIconOptions":{"text":"\ue929"},
        "lblSeperator":"-",
        "template":"flxProductAddedFeatures",
        "featureData":feature,
      };
      return mappedObj;
    },
    showPrimaryDeleteHover : function(widget,context){
      var scopeObj = this;
      var widGetId = widget.id;
      var topVal=0;
      if (widget) {
        if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
          topVal=context.screenY-200;
          scopeObj.view.ToolTipDelete.top=topVal+"px";
          scopeObj.view.ToolTipDelete.setVisibility(true)
        }else if (context.eventType === constants.ONHOVER_MOUSE_MOVE) {
          scopeObj.view.ToolTipDelete.setVisibility(true);
        } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
          scopeObj.view.ToolTipDelete.setVisibility(false);
        }
      }
      scopeObj.view.forceLayout();
    },
    /* PRODUCT FEATURES: search for feature/actions in add product features */
    searchFeaturesActions : function(){
      var searchText = this.view.searchBoxAddProdFeatures.tbxSearchBox.text;
      var searchResults = [];
      var actualData = this.view.segAddProductFeatures.info.segDataJson;
      var features = Object.keys(actualData);
      var filteredRows = [], featureHeader,featureRows, selActions;
      if(searchText.trim().length > 0){
        for(var i=0; i<features.length; i++){
          featureHeader = actualData[features[i]].secData;
          featureRows = actualData[features[i]].rowData;
          //search for features
          if(featureHeader.lblFeatureName.text.toLowerCase().indexOf(searchText.toLowerCase()) >= 0){
            featureRows = this.showHideSegRowFlex(featureRows,false);
            featureHeader = this.getCollapsedSectionProperties(featureHeader);
            featureHeader.lblTotalActions.text = "of "+ this.getTwoDigitNumber(featureRows.length);
            selActions = this.getSelectedFeatureActionCount(featureRows, "imgCheckbox", false);
            featureHeader.lblCountActions.text = this.getTwoDigitNumber(selActions);
            featureHeader.imgTopCheckbox.src = this.getHeaderCheckboxImage(featureRows,true,true);
            searchResults.push([featureHeader,featureRows])
          }//search for actions 
          else{ 
            filteredRows = this.searchActions(featureRows,searchText);
            if(filteredRows.length > 0){ 
              featureHeader = this.getCollapsedSectionProperties(featureHeader);
              featureHeader.lblTotalActions.text = "of "+ this.getTwoDigitNumber(filteredRows.length);
              selActions = this.getSelectedFeatureActionCount(filteredRows, "imgCheckbox", false);
              featureHeader.lblCountActions.text = this.getTwoDigitNumber(selActions);
              featureHeader.imgTopCheckbox.src = this.getHeaderCheckboxImage(filteredRows,true,true);
              searchResults.push([featureHeader,filteredRows]);
            }
          }
        }
      } else{
        for(var j=0; j<features.length; j++){
          featureHeader = actualData[features[j]].secData;
          featureRows = actualData[features[j]].rowData;
          featureRows = this.showHideSegRowFlex(featureRows,false);
          featureHeader = this.getCollapsedSectionProperties(featureHeader);
          featureHeader.lblTotalActions.text = "of " + this.getTwoDigitNumber(featureRows.length);
          selActions = this.getSelectedFeatureActionCount(featureRows, "imgCheckbox", false);
          featureHeader.lblCountActions.text = this.getTwoDigitNumber(selActions);
          featureHeader.imgTopCheckbox.src = this.getHeaderCheckboxImage(featureRows,true,true);
          searchResults.push([featureHeader,featureRows]);
        }
      }
      //this.view.lblCountFeatures.text = this.getTwoDigitNumber(searchResults.length);
      if(searchResults.length > 0){
        this.view.segAddProductFeatures.setData(searchResults);
        this.view.segAddProductFeatures.setVisibility(true);
        this.view.lblNoFeaturesResults.setVisibility(false);
      } else{
        this.view.segAddProductFeatures.setData([]);
        this.view.segAddProductFeatures.setVisibility(false);
        this.view.lblNoFeaturesResults.setVisibility(true);
        this.view.lblNoFeaturesResults.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + "" + searchText; 
      }
      this.view.forceLayout();
    },
    /* PRODUCT FEATURES : search for actions in add product features */
    searchActions : function(actions,searchText){
      var filteredActions = [];
      for(var j=0;j<actions.length;j++){
        if(actions[j].lblFeatureName.text.toLowerCase().indexOf(searchText.toLowerCase()) >= 0){
          actions[j].flxContractEnrollFeaturesEditRow.isVisible = false;
          filteredActions.push(actions[j]);
        }
      }
      return filteredActions;
    },
    /* PRODUCT FEATURES: select all the feature shown in list in add product features */
    selectAllFeatures : function(){
      var segData = this.view.segAddProductFeatures.data;
      var actualSegData = this.view.segAddProductFeatures.info.segDataJson;
      var isSelectAll=this.view.lblselectAllFeatures.text===kony.i18n.getLocalizedString("i18n.products.RemoveAllFeatures")?false:true;
       //update the isSelected field in the original features map also
      var allFeaturesMap = new Map(JSON.parse(this.productFeaturesData));
      
      for(var i=0; i< segData.length; i++){
        var featureToUpdate = allFeaturesMap.get(segData[i][0].id);
        featureToUpdate.featureDetails.isSelected = isSelectAll?"true":"false";
        segData[i][0].imgTopCheckbox.src = isSelectAll?CommonUtilities.AdminConsoleCommonUtils.checkboxSelected:CommonUtilities.AdminConsoleCommonUtils.checkboxnormal;
        var actionRows = segData[i][1];
        segData[i][0].lblCountActions.text = this.getTwoDigitNumber(actionRows.length);
        var actionsToUpdate = JSON.parse(featureToUpdate.actions);
        var actualFeatureObj = actualSegData[segData[i][0].id];
        actualFeatureObj.secData = segData[i][0];
        var actualActions = actualFeatureObj.rowData;
        for(var j=0; j<actionRows.length; j++){
          actionRows[j].imgCheckbox.src = isSelectAll?CommonUtilities.AdminConsoleCommonUtils.checkboxSelected:CommonUtilities.AdminConsoleCommonUtils.checkboxnormal;
          actionsToUpdate[j].isSelected = isSelectAll?"true":"false";
          for(var k=0; k<actualActions.length; k++){
            if(actionRows[j].id === actualActions[k].id)
              actualActions[k] = Object.assign({},actionRows[j]);
          }
        }
        this.view.segAddProductFeatures.setSectionAt(segData[i],i);
        //actualSegData[segData[i][0].id] = {"secData":}
        var updatedFeature = {"featureDetails":featureToUpdate.featureDetails, "actions":JSON.stringify(actionsToUpdate)};
      allFeaturesMap.set(segData[i][0].id, updatedFeature);
      }
      this.view.lblselectAllFeatures.text=isSelectAll?kony.i18n.getLocalizedString("i18n.products.RemoveAllFeatures"):kony.i18n.getLocalizedString("i18n.products.SelectAllFeatures");
      this.view.lblCountFeatures.text = this.getTwoDigitNumber(isSelectAll?segData.length:0);
    },
    /* PRODUCT FEATURES: remove a feature from added features list */
    removeProductFeature: function(eventObj){
      let rowIndex = eventObj.rowContext.rowIndex;
      var selectedRowData = this.view.segAddedFeatures.data[rowIndex];
      this.view.segAddedFeatures.removeAt(rowIndex);
      let segData = this.view.segAddedFeatures.data;
      //update the isSelected field in the original features map also
      var allFeaturesMap = new Map(JSON.parse(this.productFeaturesData));
      var featureToUpdate = allFeaturesMap.get(selectedRowData.featureData.featureId||selectedRowData.featureData.id);
      featureToUpdate.featureDetails.isSelected = "false";
      var actionsToUpdate = JSON.parse(featureToUpdate.actions);
      for(var i=0; i<actionsToUpdate.length; i++){
        actionsToUpdate[i].isSelected = "false";
      }
      var updatedFeature = {"featureDetails":featureToUpdate.featureDetails, "actions":JSON.stringify(actionsToUpdate)};
      allFeaturesMap.set(selectedRowData.featureData.featureId||selectedRowData.featureData.id, updatedFeature);
      this.productFeaturesData=JSON.stringify(Array.from(allFeaturesMap));
      this.view.lblFeaturesHeader.text = this._featureHeadingLblTxt + " (" + segData.length + ")";
      var segDataInfo = this.view.segAddedFeatures.info.allData;
      var updateSegInfo =[];
      var feature1,feature2;
      for(var j=0; j<segDataInfo.length; j++){
        feature1=segDataInfo[j].featureData.featureId||segDataInfo[j].featureData.id;
        feature2=selectedRowData.featureData.featureId||selectedRowData.featureData.id;
        if(feature1 !== feature2){
          updateSegInfo.push(segDataInfo[j]);
        }
      }
      this.view.segAddedFeatures.info = {"allData":updateSegInfo};
      if(updateSegInfo.length === 0){        
        this.view.flxNoSelectedFeatures.setVisibility(true);
        this.view.flxViewSelectedFeatures.setVisibility(false);
        this.view.flxContextualMenu.setVisibility(false);
        this.view.flxFeaturesTopWrapper2.setVisibility(false);
        this.view.lblNoFilterFeatureResults.setVisibility(false);
      } else if(segData.length === 0){
        this.view.lblNoFilterFeatureResults.setVisibility(true);
      }
    },
    onHoverDropdownEventCallback:function(widget, context) {
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        widget.setVisibility(true);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        widget.setVisibility(false);
      }
    },
    /* PRODUCT FACILTY: show facility details or feature details popups */
    showFacilityDetailsPopup : function(context,eventObj){
      var rowIndex = eventObj.rowContext.rowIndex;
      var facilityData= context ==="FEATURES" ? this.view.segAddedFeatures.data[rowIndex].featureData : this.view.segProductFacilities.data[rowIndex].facilityData;
      this.view.ViewProductFacilityDetails.flxProductFeatureDetails.skin="slFbox";
      if(context==="FEATURES"){
        this.setPopupViewFeaturesListData([facilityData],false);
        this.view.flxFacilityTabs.setVisibility(false);
        this.view.flxFacilityFeaturedAction.setVisibility(true);
        this.view.flxFacilityContainer.setVisibility(false);
        this.view.flxFacilityFeaturedAction.top="50px";
        this.view.lblFacilityPopupHeading.text = kony.i18n.getLocalizedString("i18n.products.ViewAccountActions");
        this.view.lblFacilityNamePopup.text ="";
      }else{
        this.setPopupViewFeaturesListData(facilityData.features,true);
        this.view.flxFacilityTabs.setVisibility(true);
        this.view.flxFacilityFeaturedAction.top="95px";
        this.view.flxFacilityContainer.setVisibility(true);
        this.view.flxFacilityFeaturedAction.setVisibility(true);
        this.view.lblFacilityPopupHeading.text = kony.i18n.getLocalizedString("i18n.products.ViewFacilityDetails")+" -";
        this.view.lblFacilityNamePopup.text = facilityData.facilityName || "N/A";
        this.view.ViewProductFacilityDetails.lbFeatureGrp.text = facilityData.code || "N/A";
        this.view.ViewProductFacilityDetails.lblSequenceNumber.text = facilityData.sequenceNo || "N/A";
        this.view.ViewProductFacilityDetails.lblMandatory.text = facilityData.isMandatory || "false";
        this.view.ViewProductFacilityDetails.lblDescription.text = facilityData.description || "N/A";
        this.view.ViewProductFacilityDetails.lblOptionDisplayType.text = facilityData.optionDispType || "N/A";
        this.setOptionValues(this.view.ViewProductFacilityDetails,facilityData);
        this.view.btnBasicDetails.onClick();
      }
      this.view.flxFacilityFeatureDetailsPopup.setVisibility(true);
      this.view.flxAddProductPopups.setVisibility(true);
      this.view.flxAddFacilityPopup.setVisibility(false);
      this.view.popUp.setVisibility(false);
      this.view.forceLayout();
      this.alignFlxManageProducts();
    },
    /* PRODUCT FACILTY: set facility options segment data in facility details popup*/
    setOptionValues: function(viewProductFeatureDetails, facility) {
      var segData = [];
      if(facility.optionValues){
        segData = facility.optionValues.map(function(data){
          return {
            lblValue: {
              text: data.value,
            },
            lblDefault:{
              isVisible: data.value === facility.defaultValue
            },
            lblDescription: {
              text: data.desc,
            },
            lblSeparator: {
              text: "-",
            },
          };
        });
      }
      viewProductFeatureDetails.segOptionValues.setData(segData);
      if(segData.length > 0){
        this.view.ViewProductFacilityDetails.segOptionValues.setVisibility(true);
        this.view.ViewProductFacilityDetails.flxNoResultFoundOptionValues.setVisibility(false);
      }else{
        this.view.ViewProductFacilityDetails.segOptionValues.setVisibility(false);
        this.view.ViewProductFacilityDetails.flxNoResultFoundOptionValues.setVisibility(true);
      }
    },
     /*PRODUCT FEATURES,FACILTY: widget map for features list in popup */
    getPopupViewFeaturesListWidgetMap : function(){
      var widgetMap = {
        "flxViewActionHeader":"flxViewActionHeader",
        "flxHeader":"flxHeader",
        "lblAvailableActions":"lblAvailableActions",
        "lblCountActions":"lblCountActions",
        "lblTotalActions":"lblTotalActions",
        "lblFeatureName":"lblFeatureName",
        "statusIcon":"statusIcon",
        "statusValue":"statusValue",
        "lblArrow":"lblArrow",
        "flxArrow":"flxArrow",
        "lblFASeperator1":"lblFASeperator1",
        "lblFASeperator3":"lblFASeperator3",
        "lblActionHeader":"lblActionHeader",
        "flxViewActionBody":"flxViewActionBody",
        "lblActionDescHeader":"lblActionDescHeader",
        "lblActionStatusHeader":"lblActionStatusHeader",
        "lblFASeperator2":"lblFASeperator2",
        "flxContractsFAHeaderView":"flxContractsFAHeaderView",
        "lblActionName":"lblActionName",
        "lblActionDesc":"lblActionDesc",
        "lblCustom":"lblCustom",
        "flxContractsFABodyView":"flxContractsFABodyView"   
      };
      return widgetMap;
    },
    /*PRODUCT FEATURES,FACILTY: set features segment data in view details popup */
    setPopupViewFeaturesListData : function(features,showToggleArrow){
      var segmentPath=this.view.segViewSegment;
      var self =this;
      var featuresSegData = features.map(function(rec){
        var segRowData = [];
        var selAction = rec.actions.filter(function(action){return action.isSelected === "true";});
        let totalLen = rec.actions.length;
        var segSecData = {
          "id":rec.id||rec.featureId,
          "flxViewActionHeader":{"isVisible":!showToggleArrow,"left":"0px","width":"100%","skin":"sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight","top":"74px"},
          "lblFASeperator3":{"isVisible":!showToggleArrow},
          "lblArrow":{"text":"\ue922","skin":"sknfontIconDescRightArrow14px"},
          "flxArrow":{"isVisible":showToggleArrow,"onClick": self.toggleSelectFeatureArrow.bind(self,segmentPath)},
          "lblFeatureName":rec.name||rec.featureName,
          "statusValue":{"text":rec.status||rec.featureStatus === "SID_FEATURE_ACTIVE" ?
                        kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive")},
          "statusIcon":{"skin": rec.status||rec.featureStatus  === "SID_FEATURE_ACTIVE"?"sknFontIconActivate" : "sknfontIconInactive",
                        'text':''},
          "lblCustom":{"isVisible":false},
          "lblFASeperator1":{"isVisible":!showToggleArrow,"text":"-","top":"74px"},
          "lblFASeperator2":"-",
          "lblAvailableActions": kony.i18n.getLocalizedString("i18n.products.AccountActionsColon")+" ",
          "lblCountActions": self.getTwoDigitNumber(selAction.length),
          "lblTotalActions":{"isVisible":true, text:"of "+ self.getTwoDigitNumber(rec.actions.length)},
          'flxSelectedActions' :{'width':"50%"},
          "lblActionHeader":{"text":kony.i18n.getLocalizedString("i18n.frmMfascenarios.ACTION_CAP"),"left":"27px"},
          "lblActionDescHeader":{"text":kony.i18n.getLocalizedString("i18n.permission.DESCRIPTION"),"left":"38%"},
          "lblActionStatusHeader":kony.i18n.getLocalizedString("i18n.permission.STATUS"),
          "flxHeader":{"skin":"sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px","left":"0px","width":"100%","top":"10px"},
          "template":"flxContractsFAHeaderView"
        };
        for(var i=0;i < selAction.length; i++){
          if(selAction[i].isSelected==="true"||showToggleArrow){
          var featureActionId = (rec.featureId||rec.id)+self.currencyValue+(selAction[i].id||selAction[i].actionId);
          segRowData.push({
            "id":selAction[i].id||selAction[i].actionId,
            "isRowVisible": !showToggleArrow,
            "flxViewActionBody":{"left":"0px","width":"100%"},
            "flxContractsFABodyView":{"isVisible":!showToggleArrow,"skin":"sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight"},
            "lblActionName":{"text":selAction[i].name||selAction[i].actionName,"left":"27px","width": "30%"},
            "lblActionDesc":{"text":selAction[i].description||selAction[i].actionDescription,
                             "width": "53%",
                            "left":"38%"},
            "statusValue":{"text":(selAction[i].status||selAction[i].actionStatus) === "SID_ACTION_ACTIVE" ?
                          kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive")},
            "statusIcon":{"skin":(selAction[i].status||selAction[i].actionStatus) === "SID_ACTION_ACTIVE" ?"sknFontIconActivate" : "sknfontIconInactive",
                          "text" :''},//"sknfontIconInactive",
            "lblCustom":{"isVisible": false},
            "template":"flxContractsFABodyView",
          });
        }
        }
        if( segRowData.length === 0){
          return [segSecData, [{"template": "flxContractsFAHeaderView"}]];
        }
        else {
          segRowData[segRowData.length-1].flxContractsFABodyView.skin="sknFlxBgFFFFFFbrD7D9E0r3pxBottomRound";
          return [segSecData, segRowData];
        }      
      });
      segmentPath.widgetDataMap = this.getPopupViewFeaturesListWidgetMap();
      segmentPath.setData(featuresSegData);
      segmentPath.setVisibility(featuresSegData.length > 0);
      this.view.lblNoFacilityFeatures.setVisibility(featuresSegData.length <= 0);
      this.view.forceLayout();
    },
    trimSegText: function(text,len) {
      let final_text = text ? text : "";
      if (final_text.length > len) final_text = final_text.substr(0, len) + "...";
      return final_text;
    },

    showContextualMenu: function(){
      let left = 0;
      let top = 0;
      let heightTillSegTop = 104;
      let contextualMenuHeight  = 98; // Height of ContextualMenuWidget
      let segmentWidget = this.view.segProductFacilities;
      let contextualWidget = this.view.flxContextualMenu;
      let segData = segmentWidget.data;
      let selectedIndex = segmentWidget.selectedRowIndex[1];
      let templateArray = segmentWidget.clonedTemplates;

      if (this.prevIndex === -1) {
        this.prevIndex = selectedIndex;
      } else if (this.prevIndex !== -1) {
        segData[this.prevIndex].flxOptions.skin = "sknFlxBorffffff1pxRound";
        segmentWidget.setDataAt(segData[this.prevIndex], this.prevIndex);
        this.prevIndex = selectedIndex;
      }

      for (let i = 0; i < selectedIndex; i++) {
        top += templateArray[i].flxProductAddedFeatures.frame.height;
      }
      this.view.flxArrowImage.setVisibility(true);
      this.view.flxDownArrowImage.setVisibility(false);
      this.view.flxSelectOptionsInner.top = "-1px";
      top = top + 45 - segmentWidget.contentOffsetMeasured.y;
      let maxHeight = this.view.flxProductContainer.frame.height - this.view.flxNavigationBarButtons.frame.height - heightTillSegTop;
      if (top - 10 + contextualMenuHeight > maxHeight) {
        top = top - contextualMenuHeight - 8;
        this.view.flxArrowImage.setVisibility(false);
        this.view.flxDownArrowImage.setVisibility(true);
        this.view.flxSelectOptionsInner.top = "0px"; 
      }
      top = top + heightTillSegTop + "px";
      left = templateArray[selectedIndex].flxOptions.frame.x + 60 - 125 + "px";
      if ((contextualWidget.isVisible === false) || (contextualWidget.isVisible === true && contextualWidget.top !== height)) {
        contextualWidget.top = top;
        contextualWidget.left = left;
        contextualWidget.setVisibility(true);
        contextualWidget.onHover = this.onHoverEventCallback;
      } else {
        contextualWidget.setVisibility(false);
      }
      this.view.forceLayout();
    },

    onHoverEventCallback : function(widget, context) {
      const scopeObj = this;
      let widGetId = widget.id;
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        scopeObj.view[widGetId].setVisibility(true);
      } else if(context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        let segData = this.view.segProductFacilities.data;
        scopeObj.view[widGetId].setVisibility(false);
        segData = scopeObj.view.segProductFacilities.data;
        segData[this.prevIndex].flxOptions.skin = "sknFlxBorffffff1pxRound";
      }
    },

    contextualMenuOff: function(context) {
      var scopeObj = this;
      if(scopeObj.view.flxContextualMenu.isVisible){
        scopeObj.view.flxContextualMenu.isVisible = false;
        var Segment =scopeObj.view.segProductFacilities;
        var segData = Segment.data;
        segData[this.prevIndex].flxOptions.skin = "sknFlxBorffffff1pxRound";
        Segment.setDataAt(segData[this.prevIndex],this.prevIndex);
      }
    },

    populateDataForFacilityEdit: function(){
      const scopeObj = this;
      this.isFeatureEdit = true;
      let featureData = this.selRowFeatureData;
      this.resetTextFieldsAddFacilityPopup();
      this.view.lblAddFeatureHeading.text=kony.i18n.getLocalizedString("i18n.products.EditProductFacility");
      this.view.lstBoxAddFacilityName.masterData=JSON.parse(JSON.stringify(this.featureTypeMasterData));
      this.view.lstBoxAddFacilityName.selectedKey = featureData.facilityId;
      this.view.tbxAddFacilityCode.text = featureData.code||"N/A";
      this.view.tbxAddFacilityCode.info = {"productFacilityId":featureData.productFacilityId};
      this.view.tbxAddFacilityCode.skin = this._tbxDisabledSkin;
      this.view.tbxAddFacilityCode.setEnabled(false);     
      this.view.txtAreaFacilityDescription.text = featureData.description;
      this.view.tbxAddFeatureSequenceNumber.text = featureData.sequenceNo;
      this.view.fontIconSmsChannelSelectOption.text = featureData.isMandatory ? scopeObj._selCheckboxIcon : scopeObj._unselCheckboxIcon;
      this.view.lstBoxOptionDisplayType.selectedKey = featureData.optionDispType ? featureData.optionDispType : "SELECT";
      this.view.btnSaveAndClose.text = kony.i18n.getLocalizedString("i18n.products.Save_and_Close_CAPS");
      let optionsData = featureData.optionValues;
      let optionsDataMappedData = [];
      for(let index=0; index<optionsData.length; index++){
        let isFirstRow = index===0 ? true : false;
        let data = this.getNewRowDataSegFacilityOptionValues(isFirstRow, optionsData[index]);
        if(optionsData[index].value===featureData.defaultValue){
          data.fontIconSelectOptionDefaultValue.text = scopeObj._selCheckboxIcon;
          data.fontIconSelectOptionDefaultValue.skin = scopeObj._checkboxSelIconSkin;
        }
        optionsDataMappedData.push(data);
      }
      this.view.segFeatureOptionValues.setData(optionsDataMappedData);
      if(scopeObj.isConfig2 && optionsDataMappedData.length===0){
        this.setSegFacilityOptionValuesData(); //Initialize single row in segment
      }
    },

    getNewRowDataSegFacilityOptionValues: function(isFirstRow, optionData){
      // PRODUCT_FACILITY: Return mapped row data to create a row in 'segFeatureOptionValues'.
      const scopeObj = this;      
      let value = (optionData && optionData.value) ? optionData.value : "";
      let desc = (optionData && optionData.desc) ? optionData.desc : "";
      let changeIconMethod = scopeObj.changeCheckboxIcon;
      if(scopeObj.isConfig2===false){
        changeIconMethod = null;
      }
      let data = {
        "fontIconSelectOptionDefaultValue":{
          "text": isFirstRow ? scopeObj._selCheckboxIcon : scopeObj._unselCheckboxIcon,
          "skin": isFirstRow ? scopeObj._checkboxSelIconSkin : scopeObj._checkboxUnselIconSkin,
          "onClick": changeIconMethod
        },
        "lblDefaultValue":{
          "text": kony.i18n.getLocalizedString("i18n.products.Default_Value"),
          "skin": scopeObj._commonLabelSkin,
          "onClick": changeIconMethod
        },
        "tbxValue":{
          "text": value,
          "placeholder": kony.i18n.getLocalizedString("i18n.products.Value"),
          "skin": scopeObj.isConfig2 ? scopeObj._tbxNormalSkin : scopeObj._tbxDisabledSkin,
          "onEndEditing": scopeObj.hideDefValErrorMsg,
          "enable": scopeObj.isConfig2 ? true : false,
        },
        "flxErrorMessageFeature6":{
          "isVisible": false
        },
        "lblErrorIconFeature6":{
          "text": scopeObj._errorIcon
        },
        "lblErrorTextFeature6":{
          "text": kony.i18n.getLocalizedString("i18n.products.Default_Value_cannot_be_empty")
        },
        "lblFeatureDescTextCounter":{
          "text": "0/100",
          "skin": scopeObj._txtCounterLabelSkin,
          "isVisible": false
        },
        "txtAreaFeatureDescription":{
          "text": desc,
          "placeholder": kony.i18n.getLocalizedString("i18n.products.Description"),
          "skin": scopeObj._tbxAreaNormalSkin,
          "onTextChange": scopeObj.updateTextCount,
          "onEndEditing": scopeObj.hideTextCount
        },        
        "flxDeleteIcon":{
          "onClick": scopeObj.deleteRowSegFeatureOptionValues,
          "isVisible": scopeObj.isConfig2 ? true : false
        },
        "lblIconDelete":{
          "text": scopeObj._deleteIcon,
          "skin": scopeObj._deleteIconSkin
        },
        "lblValueHeading":{
          "text":kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value")
        },
        "lblDescriptionHeading":{
          "text":kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Description")
        },
        "lblDescOptional":{
          "text": kony.i18n.getLocalizedString("i18n.frmPermissions.lblOptional")
        }
      };
      return data;
    },

    setSegFacilityOptionValuesData: function(){
      // PRODUCT_FACILITY: Add a row to 'segFeatureOptionValues' for the FIRST time onPreShow
      let dataMap = {
        "flxSegProductFeatureOption":"flxSegProductFeatureOption",
        "flxValueContainer":"flxValueContainer",
        "flxDescriptionContainer":"flxDescriptionContainer",
        "flxDeleteIcon":"flxDeleteIcon",
        "flxDefaultCheckbox":"flxDefaultCheckbox",
        "fontIconSelectOptionDefaultValue":"fontIconSelectOptionDefaultValue",
        "lblDefaultValue":"lblDefaultValue",
        "tbxValue":"tbxValue",
        "flxErrorMessageFeature6":"flxErrorMessageFeature6",
        "lblErrorIconFeature6":"lblErrorIconFeature6",
        "lblErrorTextFeature6":"lblErrorTextFeature6",
        "lblFeatureDescTextCounter":"lblFeatureDescTextCounter",
        "txtAreaFeatureDescription":"txtAreaFeatureDescription",
        "lblIconDelete":"lblIconDelete",
        "lblValueHeading":"lblValueHeading",
        "lblDescriptionHeading":"lblDescriptionHeading",
        "lblDescOptional":"lblDescOptional"
      };
      this.view.segFeatureOptionValues.data = [];
      let data = this.getNewRowDataSegFacilityOptionValues(true,null);
      this.view.segFeatureOptionValues.widgetDataMap = dataMap;
      this.view.segFeatureOptionValues.setData([data]);
      this.view.forceLayout();
    },

    addOptionValueRow: function(){
      // PRODUCT_FACILITY: Add row to 'segFeatureOptionValues' onClick of btnAddValue
      let segData = this.view.segFeatureOptionValues.data;
      let newRowData = this.getNewRowDataSegFacilityOptionValues(false,null);
      segData.push(newRowData);
      this.view.segFeatureOptionValues.setData(segData);
      this.view.forceLayout();
    },

    deleteRowSegFeatureOptionValues: function(widget){
      // PRODUCT_FACILITY: Delete Row in segFeatureOptionValues
      let data = this.view.segFeatureOptionValues.data;
      let rowIndex = this.view.segFeatureOptionValues.selectedRowIndex[1];
      if (data.length === 1) {
        data[0].tbxValue.text = "";
        data[0].txtAreaFeatureDescription.text = "";
        data[0].lblFeatureDescTextCounter.text = "0/100";
        data[0].fontIconSelectOptionDefaultValue.text = this._selCheckboxIcon;
        data[0].fontIconSelectOptionDefaultValue.skin = this._checkboxSelIconSkin;
        this.view.segFeatureOptionValues.setData(data);
      } else if(data.length === 2){
        this.view.segFeatureOptionValues.removeAt(rowIndex);
        let segData = this.view.segFeatureOptionValues.data;
        segData[0].fontIconSelectOptionDefaultValue.text = this._selCheckboxIcon;
        segData[0].fontIconSelectOptionDefaultValue.skin = this._checkboxSelIconSkin;
        this.view.segFeatureOptionValues.setData(segData);
      } else {
        this.view.segFeatureOptionValues.removeAt(rowIndex);
      }
      this.view.forceLayout();
    },

    changeCheckboxIcon: function(widget){
      // PRODUCT_FACILITY: Check or Uncheck checkbox for mandatory 
      let segData = this.view.segFeatureOptionValues.data;
      let rowIndex = this.view.segFeatureOptionValues.selectedRowIndex[1];
      for(let segRow=0; segRow<segData.length; segRow++){
        if(segRow===rowIndex){          
          segData[segRow].fontIconSelectOptionDefaultValue.text = this._selCheckboxIcon;
          segData[segRow].fontIconSelectOptionDefaultValue.skin = this._checkboxSelIconSkin;
        } else {
          segData[segRow].fontIconSelectOptionDefaultValue.text = this._unselCheckboxIcon;
          segData[segRow].fontIconSelectOptionDefaultValue.skin = this._checkboxUnselIconSkin;
        }
      }
      this.view.segFeatureOptionValues.setData(segData);
    },

    hideDefValErrorMsg: function(widget){
      // PRODUCT_FACILITY
      let segData = this.view.segFeatureOptionValues.data;
      let rowIndex = this.view.segFeatureOptionValues.selectedRowIndex[1];
      segData[rowIndex].tbxValue.skin = this._tbxNormalSkin;
      segData[rowIndex].flxErrorMessageFeature6.isVisible = false;
      this.view.segFeatureOptionValues.setData(segData);
    },

    updateTextCount: function(widget){
      // PRODUCT_FEATURES
      let segData = this.view.segFeatureOptionValues.data;
      let rowIndex = this.view.segFeatureOptionValues.selectedRowIndex[1];
      segData[rowIndex].lblFeatureDescTextCounter.text = segData[rowIndex].txtAreaFeatureDescription.text.length + "/100";
      segData[rowIndex].lblFeatureDescTextCounter.isVisible = true;
      this.view.segFeatureOptionValues.setData(segData);
      this.view.forceLayout();
    },

    hideTextCount: function(widget){
      // PRODUCT_FEATURES
      let segData = this.view.segFeatureOptionValues.data;
      let rowIndex = this.view.segFeatureOptionValues.selectedRowIndex[1];
      segData[rowIndex].lblFeatureDescTextCounter.isVisible = false;
      this.view.segFeatureOptionValues.setData(segData);
      this.view.forceLayout();
    },
    resetSortImages: function (category) {
      if(category === 1){  //product facilities list
        SortingFormExtn.determineSortFontIcon(this.sortBy,'lblProductsValue1.text',this.view.lblIconFacilityNameSort);
        SortingFormExtn.determineSortFontIcon(this.sortBy,'lblProductsValue3.text',this.view.lblIconFacilityFeatureSort);
      } else if(category === 2){ //product features list
        SortingFormExtn.determineSortFontIcon(this.sortBy,'lblProductsValue1.text',this.view.fontIconSortFeatureName); 
      }
    },
    /* PRODUCT FEATURES: set stauts filter data */
    setDataToFeatureStatusFilter : function(data){
      var statusList=[],maxLenText = "";
      for(var i=0;i<data.length;i++){
        if(!statusList.contains(data[i].lblStatus.text))
          statusList.push(data[i].lblStatus.text);
      }
      var widgetMap = {
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "imgCheckBox",
        "lblDescription": "lblDescription"
      };
      var statusData = statusList.map(function(rec){
        maxLenText = (rec.length > maxLenText.length) ? rec : maxLenText;     
        return {
          "flxSearchDropDown": "flxSearchDropDown",
          "flxCheckBox": "flxCheckBox",
          "imgCheckBox": "checkbox.png",
          "lblDescription": rec
        };
      });
      this.view.statusFilterMenuFeatures.segStatusFilterDropdown.widgetDataMap = widgetMap;
      this.view.statusFilterMenuFeatures.segStatusFilterDropdown.setData(statusData);
      var selStatusInd = [];
      for(var j=0;j<statusList.length;j++){
        selStatusInd.push(j);
      }
      this.view.statusFilterMenuFeatures.segStatusFilterDropdown.selectedIndices = [[0,selStatusInd]];
      //set filter width
      this.view.flxFeaturesStatusFilter.width = CommonUtilities.AdminConsoleCommonUtils.getLabelWidth(maxLenText)+55+"px";
      this.view.forceLayout();
    },
    /* PRODUCT FEATURES: filter features by status*/
    performFeatureStatusFilter : function(){
      var self = this;
      var selType = [];
      var selInd;
      var dataToShow = [];
      var allData = this.view.segAddedFeatures.info.allData;
      var segStatusData = this.view.statusFilterMenuFeatures.segStatusFilterDropdown.data;
      var indices = this.view.statusFilterMenuFeatures.segStatusFilterDropdown.selectedIndices;
      if(indices){
        selInd = indices[0][1];
        for(var i=0;i<selInd.length;i++){
          selType.push(this.view.statusFilterMenuFeatures.segStatusFilterDropdown.data[selInd[i]].lblDescription);
        }
        if (selInd.length === segStatusData.length) { //all are selected
          this.view.segAddedFeatures.setData(allData);
          this.view.lblNoFilterFeatureResults.setVisibility(false);
        } else {
          dataToShow = allData.filter(function(rec){
            if(selType.indexOf(rec.lblStatus.text) >= 0){
              return rec;
            }
          });
          if (dataToShow.length > 0) {
            this.view.segAddedFeatures.setData(dataToShow);
            this.view.lblNoFilterFeatureResults.setVisibility(false);
          } else {
            this.view.segAddedFeatures.setData([]);
            this.view.lblNoFilterFeatureResults.setVisibility(true);
          }
        }
      } else{
        this.view.segAddedFeatures.setData([]);
        this.view.lblNoFilterFeatureResults.setVisibility(true);
      }
    },
    getNewRowDataSegImageDetails: function(editFlowImageData){
      // IMAGE_DETAILS: Returns mapped row data for an Empty row in 'segImageDetails'.
      const scopeObj = this;
      let selectedImageType = editFlowImageData ? editFlowImageData.imageType : "SELECT";
      let imageURL = editFlowImageData ? editFlowImageData.imageUrl : "";
      let data = {
        "lblImgType":{
          "text": scopeObj._imageTypeLblTxt,
          "skin": scopeObj._commonLabelSkin
        }, 
        "lstBoxImageType":{
          "masterdata": scopeObj.imageTypesMasterdata,
          "selectedKey": selectedImageType,          
          "skin": scopeObj._lstboxNormalSkin      
        },
        "lblImgURL":{
          "text": scopeObj._imageURLLblTxt,
          "skin": scopeObj._commonLabelSkin
        },
        "lblFontIconInformation":{
          "text": scopeObj._tooltipInfoIcon,
          "onHover": scopeObj.adjustToolTip
        },
        "tbxImageURL":{
          "text": imageURL,
          "placeholder": scopeObj._imageURLPlaceholderTxt,
          "skin": scopeObj._tbxNormalSkin,
          "onEndEditing": scopeObj.hideImageURLErrorMsg
        },
        "flxErrorMsgURL":{
          "isVisible":false
        },
        "lblErrorIcon":{
          "isVisible":true,
          "text":scopeObj._errorIcon,
          "skin":scopeObj._errorMsgIconSkin
        },
        "lblErrorText":{
          "isVisible":true,
          "text": "Not a valid image URL.",
          "skin": scopeObj._errorMsgTextSkin
        },
        "flxDeleteIcon":{
          "isVisible": true,
          "onClick": scopeObj.deleteRowSegImageDetails
        },
        "lblIconDelete":{
          "text": scopeObj._deleteIcon,
          "skin":scopeObj._deleteIconSkin
        }
      };
      return data;
    },

    getDataMapForSegImageDetails: function(){
      // IMAGE_DETAILS: Returns widgetDataMap for 'segImageDetails'
      let dataMap = {
        "flxSegImageDetails": "flxSegImageDetails",
        "flxImageType": "flxImageType",
        "lblImgType": "lblImgType",
        "lstBoxImageType": "lstBoxImageType",
        "flxImageURL": "flxImageURL",
        "flxImageURLTop": "flxImageURLTop",
        "lblImgURL": "lblImgURL",
        "lblFontIconInformation": "lblFontIconInformation",
        "tbxImageURL": "tbxImageURL",
        "flxErrorMsgURL":"flxErrorMsgURL",
        "lblErrorIcon": "lblErrorIcon",
        "lblErrorText": "lblErrorText",
        "flxDeleteIcon": "flxDeleteIcon",
        "lblIconDelete": "lblIconDelete"
      };
      return dataMap;
    },

    setSegImageDetailsData: function(){
      // IMAGE_DETAILS: Add a row to 'segImageDetails' for the FIRST time during resetUI.
      this.view.segImageDetails.data = [];
      let data = this.getNewRowDataSegImageDetails(null);
      this.view.segImageDetails.widgetDataMap = this.getDataMapForSegImageDetails();
      this.view.segImageDetails.setData([data]);
      this.view.forceLayout();
    },

    hideImageURLErrorMsg: function(widget, context){
      let data = this.view.segImageDetails.data;
      let rowIndex = this.view.segImageDetails.selectedRowIndex[1];
      data[rowIndex].tbxImageURL.skin = this._tbxNormalSkin;
      data[rowIndex].flxErrorMsgURL.isVisible = false;
      this.view.segImageDetails.setData(data);
      this.view.forceLayout();
    },

    addImageDetailsRow: function(){
      // IMAGE_DETAILS: Add row to 'segImageDetails' onClick of btnAddImage
      let segData = this.view.segImageDetails.data;
      if(segData.length===1){
        segData[0].flxDeleteIcon.isVisible = true;
      }
      let newRowData = this.getNewRowDataSegImageDetails(null);
      segData.push(newRowData);
      this.view.segImageDetails.setData(segData);
      this.view.forceLayout();
    },

    deleteRowSegImageDetails: function(widget){
      // IMAGE_DETAILS: Delete Segment Row
      let data = this.view.segImageDetails.data;
      let rowIndex = this.view.segImageDetails.selectedRowIndex[1];
      if (data.length === 1) {
        data[0].flxDeleteIcon.isVisible = false;
        data[0].lstBoxImageType.selectedKey = "SELECT";
        data[0].tbxImageURL.text = "";
        this.view.segImageDetails.setData(data);
      } else if(data.length === 2){
        this.view.segImageDetails.removeAt(rowIndex);
        data = this.view.segImageDetails.data;
        data[0].flxDeleteIcon.isVisible = false;
        this.view.segImageDetails.setData(data);
      } else {
        this.view.segImageDetails.removeAt(rowIndex);
      }
      this.view.forceLayout();
    },

    adjustToolTip: function(widget, context){
      let segData = this.view.segImageDetails.data;
      let selRowIndex = context.rowIndex;
      let selectedImageType = segData[selRowIndex].lstBoxImageType.selectedKey;
      let toolTipWidget = this.view.ToolTip;
      let segmentWidget = this.view.segImageDetails;
      let tooltipText = "";
      let imgHeight=720;
      let imgwWidth=120;
      let reqImageType = this._imageTypes;
      if(selectedImageType==="SELECT"){
        toolTipWidget.setVisibility(false);
      } else {
        toolTipWidget.setVisibility(true);
        reqImageType = reqImageType.filter(item => item.imageTypeBackend===selectedImageType);
        imgwWidth = reqImageType[0].width;
        imgHeight = reqImageType[0].height;
        tooltipText = reqImageType[0].imageTypeDisplay + " Image should be " + imgwWidth + "x" + imgHeight + " Px";
        toolTipWidget.lblNoConcentToolTip.text = tooltipText!=="" ? tooltipText : "";
        let height = 20; //Height till segment top 
        let segRowHeight = 0;
        let templateArray = segmentWidget.clonedTemplates;
        for (let rowIndex = 0; rowIndex < selRowIndex; rowIndex++) {
          segRowHeight += templateArray[rowIndex].flxSegImageDetails.frame.height;
        }        
        height = height + segRowHeight - this.view.flxImgDetailsScrollContainer.contentOffsetMeasured.y;
        toolTipWidget.lblarrow.setVisibility(true);
        toolTipWidget.lblDownArrow.setVisibility(false);
        toolTipWidget.flxToolTipMessage.top = "9px";
        if(height + toolTipWidget.frame.height > this.view.flxAddProductMain.frame.height){
          height = height - toolTipWidget.frame.height - 5;
          toolTipWidget.lblarrow.setVisibility(false);
          toolTipWidget.lblDownArrow.setVisibility(true);
          toolTipWidget.flxToolTipMessage.top = "0px";
          toolTipWidget.lblDownArrow.top = "24px";
        }
        height = height + "px";
        if (tooltipText!=="") {
          toolTipWidget.top = height;
          toolTipWidget.left = templateArray[selRowIndex].flxSegImageDetails.frame.x - 361 + "px";;
          toolTipWidget.setVisibility(true);
          toolTipWidget.onHover = this.onHoverToolTipEventCallback;
        } else {
          toolTipWidget.setVisibility(false);
        }
      }
      this.view.forceLayout();
    },

    onHoverToolTipEventCallback: function(widget, context){
      const scopeObj = this;
      let widGetId = widget.id;
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        this.view.ToolTip.setVisibility(true);
      } else if(context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        this.view.ToolTip.setVisibility(false);       
      }
    },

    getNewRowDataSegAddAttribute: function(editFlowAddAttrData){
      // ADDITIONAL_ATTRIBUTES: Returns Mapped data for an Empty row in 'segAddAttribute'.
      const scopeObj = this;
      let key = editFlowAddAttrData ? editFlowAddAttrData.key : "";
      let val = editFlowAddAttrData ? editFlowAddAttrData.value : "";
      let data = {
        "tbxAttribute":{
          "text":  CommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(key),
          "placeholder": scopeObj._attributeKeyPlaceholderTxt,
          "skin": scopeObj._addAttrTextBoxSkin
        },
        "tbxAttributeValue":{
          "text": CommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(val),
          "placeholder": scopeObj._attributeValuePlaceholderTxt,
          "skin": scopeObj._addAttrTextBoxSkin
        },
        "flxDeleteIcon":{
          "isVisible": true,
          "onClick": scopeObj.deleteRowSegAdditionalAttributes
        },
        "lblIconDelete":{
          "isVisible": true,
          "text":scopeObj._deleteIcon,
          "skin":scopeObj._deleteIconSkin
        }
      };
      return data;
    },

    getDataMapForSegAddAttribute: function(){
      // ADDITIONAL_ATTRIBUTES: Returns widgetDataMap for 'segAddAttribute'.
      let dataMap = {
        "flxSegAddAttribute":"flxSegAddAttribute",
        "flxAttribute":"flxAttribute",
        "tbxAttribute":"tbxAttribute",
        "flxAttributeValue":"flxAttributeValue",
        "tbxAttributeValue":"tbxAttributeValue",
        "flxDeleteIcon":"flxDeleteIcon",
        "lblIconDelete":"lblIconDelete"
      };
      return dataMap;
    },

    setSegAddAttributeData: function(){
      // ADDITIONAL_ATTRIBUTES: Add a row to 'segAddAttribute' for the FIRST time during resetUI.
      let data = this.getNewRowDataSegAddAttribute(null);
      this.view.segAddAttribute.widgetDataMap = this.getDataMapForSegAddAttribute();
      this.view.segAddAttribute.setData([data]);
      this.view.forceLayout();
    },

    addAdditionalAttributesRow: function(){
      // ADDITIONAL_ATTRIBUTES: Add row to 'segAddAttribute' onClick of btnAddAttribute
      let segData = this.view.segAddAttribute.data;
      this._maxAddAttrAllowed = parseInt(this._maxAddAttrAllowed);
      if(segData.length<this._maxAddAttrAllowed){
        if(segData.length===1){
          segData[0].flxDeleteIcon.isVisible = true;
        }
        let newRowData = this.getNewRowDataSegAddAttribute(null);
        segData.push(newRowData);
        this.view.segAddAttribute.setData(segData);
      }
      if(this.view.segAddAttribute.data.length===this._maxAddAttrAllowed){
        this.view.btnAddAttribute.setVisibility(false);
      }
      this.view.forceLayout();
    },

    deleteRowSegAdditionalAttributes: function(){
      // ADDITIONAL_ATTRIBUTES: Delete Segment Row for 'segAddAttribute'
      let data = this.view.segAddAttribute.data;
      let rowIndex = this.view.segAddAttribute.selectedRowIndex[1];
      if (data.length === 1) {
        data[0].flxDeleteIcon.isVisible = false;
        data[0].tbxAttribute.text = "";
        data[0].tbxAttributeValue.text = "";
        this.view.segAddAttribute.setData(data);
      } else if(data.length === 2){
        this.view.segAddAttribute.removeAt(rowIndex);
        data = this.view.segAddAttribute.data;
        data[0].flxDeleteIcon.isVisible = false;
        this.view.segAddAttribute.setData(data);
      } else {
        this.view.segAddAttribute.removeAt(rowIndex);
      }
      if(data.length<10){
        this.view.btnAddAttribute.setVisibility(true);
      }
      this.view.forceLayout();
    },

    addCustomDateWidget: function(){
      // Functionality to add Custom Date Widget Dynamically, since custom widgets cannot be dropped in Component
      let startDateWidget = this.createDateField("customDateField", 1);
      let endDateWidget = this.createDateField("customDateField", 2);
      if(this.view.flxProductDetailsContainer5.children.includes('flxCustomProductDate1'))
        this.view.flxProductDetailsContainer5.remove(this.view.flxCustomProductDate1);
      if(this.view.flxProductDetailsContainer6.children.includes('flxCustomProductDate2'))
        this.view.flxProductDetailsContainer6.remove(this.view.flxCustomProductDate2);
      this.view.flxProductDetailsContainer5.addAt(startDateWidget, 1);
      this.view.flxProductDetailsContainer6.addAt(endDateWidget, 1);
      this.view.forceLayout();
    },

    createDateField: function(idString, id){
      // Returns dynamically created Custom Date Field Widget.
      var flxCustomProductDate = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "40dp",
        "id": "flxCustomProductDate"+id,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0dp",
        "isModalContainer": false,
        "skin": "sknFlxCalendar",
        "top": "15dp",
        "width": "100%"
      }, {}, {});
      flxCustomProductDate.setDefaultUnit(kony.flex.DP);
      var customProductDate = new kony.ui.CustomWidget({
        "id": idString+id,
        "isVisible": true,
        "left": "0px",
        "right": "0px",
        "bottom": "0px",
        "top": "5px",
        "width": "100%",
        "height": "40px",
        "zIndex": 10
      }, {
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "widgetName": "dateRangePicker",
        "drops": "up",
        "event": null,
        "rangeType": "",
        "resetData": null,
        "type": "single",
        "value": ""
      });
      flxCustomProductDate.add(customProductDate);
      this.view.forceLayout();
      return flxCustomProductDate;
    },

    alignFlxManageProducts: function() {
      // To be invoked when showing the popups on complete screen.
      if(this.alignPopups){        
        this.view.flxAddProductMainContainer.left = "340px";
        this.view.flxAddProductMainContainer.right = "35px";
        this.view.flxAddProductMainContainer.top = "150px";
        this.view.btnAddFeature1.right = "10px";
        this.formUpdateUI({action : "adjustSignoutDropdown", isPopupOpen: true});
        this.view.forceLayout();
        this.alignPopups(true);
      }
      this.view.forceLayout();
    },

    closePopup: function() {
      // To be invoked when hiding the popups.
      this.view.flxAddFacilityPopup.setVisibility(false);
      this.view.flxAddProductPopups.setVisibility(false);
      this.view.flxFacilityFeatureDetailsPopup.setVisibility(false);
      this.view.popUp.setVisibility(false);
      if(this.alignPopups)
        this.alignPopups(false);
      this.view.flxAddProductMainContainer.left = "0px";
      this.view.flxAddProductMainContainer.right = "0px";
      this.view.flxAddProductMainContainer.top = "0px";      
      this.view.btnAddFeature1.right = "10px";
      this.formUpdateUI({action : "adjustSignoutDropdown", isPopupOpen: false});
      this.view.forceLayout();
    },

    getMappedFeaturesData: function(featureJSON){
      let featureData=featureJSON.featureData;
      let mappedFeatureData = {
        "featureId": featureData.id||featureData.featureId,
        "actions": []
      };
      var actions=[];
      for(let a=0;a<featureData.actions.length;a++){
        if(featureData.actions[a].isSelected==="true"){
        actions.push({
          "actionId":featureData.actions[a].id||featureData.actions[a].actionId
        });
        }
      }
      mappedFeatureData.actions=actions;
      return mappedFeatureData;
    },
    getMappedFacilitiesData: function(facilityJSON){
      var facility=facilityJSON.facilityData;
      let mappedFeatureData = {
        "code":facility.code||"N/A",
        "facilityId":facility.facilityId,
         "type":facility.type,
         "facilityName":facility.facilityName,
         "facilityGroup":facility.facilityGroup,
         "description":facility.description,
         "sequenceNo":facility.sequenceNo,
         "isMandatory":facility.isMandatory,
         "features":facility.features,
         "extensionData":facility.extensionData,
         "optionValues":facility.optionValues,
         "defaultValue":facility.defaultValue,
         "option":facility.option,
         "optionDispType":facility.optionDispType,
      };
      return mappedFeatureData;
    },


    getMappedImageDetailsData: function(imageDetailsData){
      let imageType = imageDetailsData.lstBoxImageType.selectedKey;
      let height=720, width=120; // Giving Default values
      let reqImageType = this._imageTypes;
      reqImageType = reqImageType.filter(item => item.imageTypeBackend===imageType);
      height = parseInt(reqImageType[0].height);
      width = parseInt(reqImageType[0].width);
      let mappedImageDetailsData = {
        "imageType": imageType,
        "height": height,
        "width": width,
        "imageUrl": imageDetailsData.tbxImageURL.text,
        "extensionData": {}
      };
      return mappedImageDetailsData;
    },

    fetchFinalProductFeatures: function(){
      let productFeatures = [];
      let segProductFeaturesData = this.view.segAddedFeatures.data;
      if(segProductFeaturesData!==[] && segProductFeaturesData!=="" && segProductFeaturesData!==undefined && segProductFeaturesData!==null){
        productFeatures = segProductFeaturesData.map(this.getMappedFeaturesData);
      }
      return productFeatures;
    },
    fetchFinalProductFacilities:function(){
       let productFacilities = [];
      let segProductFeaturesData = this.view.segProductFacilities.data;
      if(segProductFeaturesData!==[] && segProductFeaturesData!=="" && segProductFeaturesData!==undefined && segProductFeaturesData!==null){
        productFacilities = segProductFeaturesData.map(this.getMappedFacilitiesData);
      }
      return productFacilities;
    },

    fetchFinalImageDetails: function(){
      let imageDetails = [];
      let segimageDetailsData = this.view.segImageDetails.data;
      // Filtering data for Rmpty Rows
      segimageDetailsData = segimageDetailsData.filter(item => {
        if(item.lstBoxImageType.selectedKey==="SELECT" || item.tbxImageURL.text==="") return false;
        else return true;
      });
      if(segimageDetailsData.length!==0 && segimageDetailsData!=="" && segimageDetailsData!==null && segimageDetailsData!==undefined){
        imageDetails = segimageDetailsData.map(this.getMappedImageDetailsData);
      }
      return imageDetails;
    },

    fetchFinalAdditionalAttributes: function(){
      let additionalAttributes = [];
      let additioanAttributesData = this.view.segAddAttribute.data;
      // Filtering Data for Empty Rows
      additioanAttributesData = additioanAttributesData.filter(item => {
        if(item.tbxAttribute.text==="" || item.tbxAttributeValue.text==="") return false;
        else return true;
      });
      if(additioanAttributesData.length!==0 && additioanAttributesData!=="" && additioanAttributesData!==null && additioanAttributesData!==undefined){
        additionalAttributes = additioanAttributesData.map(attribute => {
          return {"key":attribute.tbxAttribute.text, "value":attribute.tbxAttributeValue.text};
        });
      }
      return additionalAttributes;
    },

    fetchProductDetails: function(){
      // TODO: Need to be changed after Demo
      // Need to be configured according to requirements
      const scopeObj = this;
      let productDetails = [];
      if(scopeObj.view.tbxAdditionalField1.text==="" || scopeObj.view.tbxAdditionalField2.text==="" || scopeObj.view.tbxAdditionalField3.text===""){
        productDetails = [];
      } else {
        productDetails = [{
          "currency": scopeObj.view.tbxAdditionalField1.text,
          "debitInterests": [
            {
              "type": scopeObj.view.tbxAdditionalField2.text,
              "periodicIndex": scopeObj.view.tbxAdditionalField3.text
            }
          ],
          "creditInterests": [
            {
              "type": scopeObj.view.tbxAdditionalField2.text,
              "periodicIndex": scopeObj.view.tbxAdditionalField3.text
            }
          ]
        }];
      }
      return productDetails;
    },

    fetchFinalAddProductJSON: function(){
      // Returns final JSON to be sent as PAYLOAD for Creating a Product.
      const scopeObj = this;
      let startDate="";
      let endDate="";
      if(scopeObj.isConfig2===false){
        startDate = this.view.lblStartDate.text.replace(/\//g, "-").split("-");
        startDate = startDate[2] + "-" + startDate[0] + "-" + startDate[1];
        endDate = this.view.lblEndDate.text.replace(/\//g, "-").split("-");
        endDate = endDate[2] + "-" + endDate[0] + "-" + endDate[1];
      } else if(this.view.customDateField1.value!=="" || this.view.customDateField2.value!==""){
        startDate = startDate = this.view.customDateField1.value.replace(/\//g, "-").split("-");
        startDate = startDate[2] + "-" + startDate[0] + "-" + startDate[1];
        endDate = this.view.customDateField2.value.replace(/\//g, "-").split("-");
        endDate = endDate[2] + "-" + endDate[0] + "-" + endDate[1];
      }
      let segPurposesData = this.view.segProductPurpose.selectedRowItems;
      let purposes = [];
      if(segPurposesData!=="" && segPurposesData!==null && segPurposesData!==undefined && segPurposesData.length!==0){
        purposes = segPurposesData.map(purpose => {
          return {"type": purpose.lblDescription.text};
        });
      }
      let productFeatures = this.fetchFinalProductFeatures();
      let imageDetails = this.fetchFinalImageDetails();
      let additionalAttributes = this.fetchFinalAdditionalAttributes();
      
      let externalIndicator=scopeObj.view.lstboxProductLine.info.externalIndicator?scopeObj.view.lstboxProductLine.info.externalIndicator[scopeObj.view.lstboxProductLine.selectedKey]:"false";
      // let productDetails = this.fetchProductDetails();
      let finalObj = {
        "productName": scopeObj.view.tbxProductName.text,
        "productLine": scopeObj.view.lstboxProductLine.selectedKey,
        "productGroup": scopeObj.view.lstboxProductGroup.selectedKey,
        "productRef": scopeObj.view.tbxProductReference.text,
        "branchRef":"GB0010001",  
        "externalIndicator":this._externalIndicator.length>0?this._externalIndicator:externalIndicator,
        "availableFrom": startDate,
        "availableTo": endDate,
        "purposes": purposes,
        "description": scopeObj.view.txtAreaDescription.text,
        "detailedDesc": scopeObj.view.txtAreaDetailedDescription.text,
        "notes": scopeObj.view.txtAreaNotes.text,
        "termsConditions": scopeObj.view.txtAreaTermsAndConditions.text,
        "disclosure": scopeObj.view.txtAreaDisclosure.text,        
        "features": productFeatures,
        //"productFacilities": productFacilities,
        "imageDetails": imageDetails,
        "extensionData": {"additionalAttributes":additionalAttributes}
      };
      if(!scopeObj.isEditFlow){
        let productFacilities = this.fetchFinalProductFacilities();
        finalObj.productFacilities=productFacilities;
      }
      return finalObj;
    },

    willUpdateUI: function(context){
      const scopeObj = this;
      if(context){
        if(context.progressBar){
          scopeObj.formUpdateUI(context);
        }
        if(context.toastModel){
          scopeObj.formUpdateUI(context);
        }
        if(context.action){
          if(context.action === scopeObj._operationName1){
            scopeObj.fetchProductLinesSuccess(context);
          } 
          else if(context.action === scopeObj._operationName2){
            scopeObj.fetchProductGroupsSuccess(context);            
          } 
          else if(context.action === scopeObj._operationName3){
            scopeObj.initializeProductFeaturesData(context.features);
          }
          else if(context.action === scopeObj._operationName4 || context.action === scopeObj._operationName5){
            scopeObj.createEditProductSuccess(context);
          }
          else if(context.action === scopeObj._operationName6){
            scopeObj.fetchFacilitiesSuccess(context.facilities);
          }else if(context.action === scopeObj._operationName7){
            scopeObj.view.btnSaveAndClose.info.facilityData[0].productFacilityId=context.productFacilityId;
            scopeObj.getFacilityDetails();
        }else if(context.action === scopeObj._operationName8){
            scopeObj.addProductFacility();
        }else if(context.action === scopeObj._operationName9){
            scopeObj.removeProductFacility();
        }
        }
      }
    },

    fetchProductLinesSuccess: function(context){
      const scopeObj = this;
      let productLinesData = context.productLines;
      let proLineExIndicator={};
      for(let x=0;x<productLinesData.length;x++){
        proLineExIndicator[productLinesData[x].productLineRef]=productLinesData[x].externalIndicator || "false"
      }
      productLinesData = productLinesData.map(item => [item.productLineRef,item.productLineName || "N/A"]);
      productLinesData.unshift(["SELECT",scopeObj._productLineDropdownPlaceholderTxt]);
      scopeObj.productLinesMasterData = productLinesData;
      scopeObj.view.lstboxProductLine.masterData = scopeObj.productLinesMasterData;
      scopeObj.view.lstboxProductLine.selectedKey = this.isEditFlow ? this.editDataGlobal.productLineRef : "SELECT";
      scopeObj.view.lstboxProductLine.info={"externalIndicator":proLineExIndicator};
      if(this.isEditFlow && this.areProductLinesFetched===false) {
        this.areProductLinesFetched = true;
        this.fetchProductGroupsByProductLine();
      }
    },

    fetchProductGroupsSuccess: function(context){
      const scopeObj = this;
      let productGroupsData = context.productGroups ? context.productGroups : JSON.parse(context.rawResponse).productGroups;
      if(this.isEditFlow){
        let productLine = this.editDataGlobal.productLineRef;
        productGroupsData = productGroupsData.filter(item => item.productLineRef === productLine);
        productGroupsData = productGroupsData.map(item => [item.productGroupRef,item.productGroupName || "N/A"]);
        productGroupsData.unshift(["SELECT",scopeObj._productGroupDropdownPlaceholderTxt]);
        scopeObj.productGroupsMasterData = productGroupsData;
        scopeObj.view.lstboxProductGroup.masterData = scopeObj.productGroupsMasterData;
        scopeObj.view.lstboxProductGroup.selectedKey = this.editDataGlobal.productGroupRef;
      } else {
        let productLine = scopeObj.view.lstboxProductLine.selectedKey;
        productGroupsData = productGroupsData.filter(item => item.productLineRef === productLine);
        productGroupsData = productGroupsData.map(item => [item.productGroupRef,item.productGroupName || "N/A"]);
        productGroupsData.unshift(["SELECT",scopeObj._productGroupDropdownPlaceholderTxt]);
        scopeObj.productGroupsMasterData = productGroupsData;
        scopeObj.view.lstboxProductGroup.masterData = scopeObj.productGroupsMasterData;
        scopeObj.view.lstboxProductGroup.selectedKey = "SELECT";
      }
    },

    fetchProductFeaturesSuccess: function(context){
      const scopeObj = this;
      let featureTypeData = context.FeatureType;
      for(let feature of featureTypeData){
        let key = feature.featureType;
        let val = [feature.featureName, feature.featureGroup];
        scopeObj.allFeatureType_NameGroupMap.set(key, val);
      }
      let existingFeatureNames = featureTypeData.map(item => item.featureName);
      existingFeatureNames = [...new Set(existingFeatureNames)];
      let featureTypes = featureTypeData.map(item => item.featureType);
      featureTypes = [...new Set(featureTypes)];
      featureTypes = featureTypes.map(item => [item,item || "N/A"]);
      featureTypes.unshift(["SELECT",kony.i18n.getLocalizedString("i18n.products.FacilityName")]);
      scopeObj.featureTypeMasterData = featureTypes;
      scopeObj.view.lstBoxAddFacilityName.masterData = JSON.parse(JSON.stringify(scopeObj.featureTypeMasterData));
      scopeObj.view.lstBoxAddFacilityName.selectedKey = "SELECT";
    },
    fetchFacilitiesSuccess : function(context){
      const scopeObj = this;
      let facilities = context;
      let facilitiesJSON={};
      let facilityFeatures=[];
      //when get all facilities list is called
      if(this.initialFacilities){
        for(let facility of facilities){
          let key = facility.facilityId;
          let val = [facility.facilityName, facility.facilityGroup,facility.type,facility.code];
          scopeObj.allFeatureType_NameGroupMap.set(key, val);
          facilitiesJSON[facility.facilityId]=facility;
        }
        //       let existingFeatureNames = facilities.map(item => item.facilityName);
        //       existingFeatureNames = [...new Set(existingFeatureNames)];
        let featureTypes = facilities.map(item => [item.facilityId,item.facilityName]);
        featureTypes = [...new Set(featureTypes)];
        featureTypes = featureTypes.map(item => [item[0],item[1] || "N/A"]);
        featureTypes.unshift(["SELECT",kony.i18n.getLocalizedString("i18n.products.FacilityName")]);
        scopeObj.featureTypeMasterData = featureTypes;
        scopeObj.view.lstBoxAddFacilityName.masterData = JSON.parse(JSON.stringify(scopeObj.featureTypeMasterData));
        scopeObj.view.lstBoxAddFacilityName.selectedKey = "SELECT";
        scopeObj.view.segProductFacilities.info["facilities"]=facilitiesJSON;
        if(this.isEditFlow){
          let editProductData = this.editDataGlobal;
          this.resetUI(true, editProductData);
        }
      }else{//when only get particular facility details is called
        facilityFeatures=facilities[0].features.filter(function(rec){
          return rec.isSelected=="true";
        });
        scopeObj.view.segProductFacilities.info.facilities[facilities[0].facilityId].features=facilityFeatures;
        scopeObj.addProductFacility();
      }
    },
    resetFacilityListBoxData : function(){
       var listData=JSON.parse(JSON.stringify(this.featureTypeMasterData));
       let segData = this.view.segProductFacilities.data;
      var newListData=[];
       var selectedFacilities=[];
       for(let a=0;a<segData.length;a++){
         selectedFacilities.push(segData[a].facilityId);
       }
       listData.forEach(function(rec,i){
         if(!selectedFacilities.contains(rec[0])){
            newListData.push(rec);
         }
       });
     if(newListData.length>1){
       this.view.lstBoxAddFacilityName.masterData=newListData;
       this.view.lstBoxAddFacilityName.selectedKey = "SELECT";
       this.view.btnAddFacilities.setVisibility(true);
     }else{
       this.view.btnAddFacilities.setVisibility(false);
     }
     this.view.forceLayout();
    },
    addProductFacility : function(){
      var scopeObj=this;
      var data=scopeObj.view.btnSaveAndClose.info.facilityData;
      scopeObj.addFacilityDataToSeg(data);
          let dataLength = scopeObj.view.segProductFacilities.data.length;
          scopeObj.view.lblFacilitiesHeading.text = kony.i18n.getLocalizedString("i18n.products.ProductFacilities") + " (" + dataLength + ")";
          scopeObj.resetDataFromAddFacilityPopup();
          if(dataLength!==0){
            scopeObj.view.flxNoFacilitiesAdded.setVisibility(false);
            scopeObj.view.flxAddedFacilitiesList.setVisibility(true);
            scopeObj.view.flxFacilitiesBtnRight.isVisible = scopeObj.isConfig2 ? true : false;
          }          
          scopeObj.closePopup();
          let toastMsg = "";
          if(scopeObj.isFeatureEdit === false) toastMsg = "New Facility Added Successfully.";
          else toastMsg =data[0].facilityName+" Facility has been updated successfully.";
          scopeObj.isFeatureEdit = false;
          scopeObj.willUpdateUI({
            toastModel:{
              status : "success",
              message: toastMsg
            }
          });
    },
    getFacilityDetails : function(){
      var data=this.view.btnSaveAndClose.info.facilityData;
      this.initialFacilities=false;
      this.fetchFacilities({"facilityId":data[0].facilityId});
    },

    createEditProductSuccess: function(context){
      const scopeObj = this;
      scopeObj.resetUI(false, null);
      if(scopeObj.closeAddProductComponent) scopeObj.closeAddProductComponent();
    },

    fetchProductLines: function(){
      this.AddProductDAO.fetchProductInformation(this._objectServiceName1,this._objectName1,this._operationName1,"",this.willUpdateUI,null);
    },

    fetchProductGroupsByProductLine: function(){
      this.AddProductDAO.fetchProductInformation(this._objectServiceName2,this._objectName2,this._operationName2,"",this.willUpdateUI,null);
    },

    fetchProductFeatures: function(){
      this.AddProductDAO.fetchProductInformation(this._objectServiceName3,this._objectName3,this._operationName3,"",this.willUpdateUI,null);
    },
    
    fetchFacilities: function(payload){
      this.AddProductDAO.fetchProductInformation(this._objectServiceName6,this._objectName6,this._operationName6,payload,this.willUpdateUI,null);
    },

    createProduct: function(payload){
      let isCreateEditJSON = {"isCreateProduct":true,"isEditProduct":false};
      this.AddProductDAO.fetchProductInformation(this._objectServiceName4,this._objectName4,this._operationName4,payload,this.willUpdateUI,isCreateEditJSON);
    },

    editProduct: function(payload){
      let isCreateEditJSON = {"isCreateProduct":false,"isEditProduct":true};
      this.AddProductDAO.fetchProductInformation(this._objectServiceName5,this._objectName5,this._operationName5,payload,this.willUpdateUI, isCreateEditJSON);
    },
    
    createProductFacility: function(payload){
      this.AddProductDAO.fetchProductInformation(this._objectServiceName7,this._objectName7,this._operationName7,payload,this.willUpdateUI,null);
    },
    
    updateProductFacility: function(payload){
      this.AddProductDAO.fetchProductInformation(this._objectServiceName8,this._objectName8,this._operationName8,payload,this.willUpdateUI,null);
    },
    
    deleteProductFacility: function(payload){
      this.AddProductDAO.fetchProductInformation(this._objectServiceName9,this._objectName9,this._operationName9,payload,this.willUpdateUI,null);
    },

  };
});