define(['./manageProductsDAO','Sorting_FormExtn','AdminConsoleCommonUtilities'],function(manageProductsDAO, SortingFormExtn, AdminConsoleCommonUtilities) {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.config2 = true;
      this.productLineSegList = [];
      this.productGroupSegList = [];
      this.featureSegList = [];
      this.imageValidationRegex = /\b(https|ftp):(\/\/|\\\\)[^\s|<|>|&]+\.(png|jpg|gif)\b$/;
      this.imageTypeDetailsJsonArray = [];
      this.isEdit = false;
      this.manageProductsDAO = new manageProductsDAO();
      this.sortBy = SortingFormExtn.getObjectSorter("lblProductLine.text");
      this._MainPageBgSkin = "";
      this._objSeviceName = "";
      this._objName = "";
      this._operationName = "";
      this._objSeviceName1 = "";
      this._objName1 = "";
      this._operationName1 = "";
      this._objSeviceNam2 = "";
      this._objName2 = "";
      this._operationName2 = "";
      this._objSeviceName3 = "";
      this._objName3 = "";
      this._operationName3 = "";
      this._objSeviceName4 = "";
      this._objName4 = "";
      this._operationName4 = "";
      this._objSeviceNam5 = "";
      this._objName5 = "";
      this._operationName5 = "";
      this._objSeviceName6 = "";
      this._objName6 = "";
      this._operationName6 = "";
      this._objSeviceName7 = "";
      this._objName7 = "";
      this._operationName7 = "";
      this._objSeviceNam8 = "";
      this._objName8 = "";
      this._operationName8 = "";
      this._ProductTabSkinOnSelect = "";
      this._ProductTabSkinUnSelect = "";
      this._ProductTabLblNameSkin = "";
      this._ProductTabLblCountSkin = "";
      this._ProductLineTabLblNameTxt = "";
      this._ProductGroupTabLblNameTxt = "";
      this._ProductFeatureTabLblNameTxt = "";
      this._ProductLineTopHeaderTxt = "";
      this._ProductGroupTopHeaderTxt = "";
      this._ProductFeatureTopHeaderTxt = "";
      this._ProductTopHeaderSkin = "";
      this._AddLineProductBtnTxt = "";
      this._AddGroupProductBtnTxt = "";
      this._AddFeatureProductBtnTxt = "";
      this._AddProductBtnSkin = "";
      this._AddLineProductBtnWidth = "";
      this._AddGroupProductBtnWidth = "";
      this._AddFeatureProductBtnWidth = "";
      this._flxSearchBoxSkin = "";
      this._flxSearchBoxOnFocusSkin = "";
      this._SeachTxtBoxSkin = "";
      this._IconSearchTxt = "";
      this._IconSearchClearTxt = "";
      this._IconSearchSkin = "";
      this._SeachTxtBoxPlaceholder1Txt = "";
      this._SeachTxtBoxPlaceholder2Txt = "";
      this._SeachTxtBoxPlaceholder3Txt = "";
      this._LblSegmentHeaderSkin = "";
      this._IconSortSkin = "";
      this._IconSortTxt = "";
      this._LblSegmentHeader1Txt = "";
      this._LblSegmentHeader2Txt = "";
      this._LblSegmentHeader3Txt = "";
      this._LblSegmentHeader4Txt = "";
      this._LblSegmentHeader5Txt = "";
      this._LblSegmentHeader6Txt = "";
      this._LblSegmentHeader7Txt = "";
      this._LblSegmentHeader8Txt = "";
      this._LblSegmentSkin = "";
      this._HeaderSeparatorSkin = "";
      this._SegmentSeparatorSkin = "";
      this._SegmentEditIconSkin = "";
      this._SegmentEditIconTxt = "";
      this._PopupContinerTranslucentBgSkin = "";
      this._PopupMainBgSkin = "";  
      this._ImgDetailsViewBgSkin = "";
      this._ImageTypeDetailsJsonData = "";
      this._PopupTopBarSkin = "";
      this._PopupCloseIconSkin = "";
      this._PopupCloseIconTxt = "";
      this._PopupCancelBtnSkin = "";
      this._PopupCancelBtnSkinHover = "";
      this._PopupCancelBtnWidth = "";
      this._PopupCancelBtnTxt = "";
      this._PopupSaveBtnSkin = "";
      this._PopupSaveBtnSkinHover = "";
      this._PopupTopHeaderSkin = "";
      this._PopupTextFieldCountSkin = "";
      this._PopupFieldHeaderSkin = "";
      this._PopupTextBoxSkin = "";
      this._PopupTextBoxDisabledSkin = "";
      this._PopupListBoxDisabledSkin = "";
      this._PopupTextAreaSkin = "";
      this._PopupListBoxSkin = "";
      this._PopupTextBoxErrSkin = "";
      this._PopupTextAreaErrSkin = "";
      this._PopupListBoxErrSkin = "";
      this._ErrMsgTextSkin = "";
      this._ErrMsgIconSkin = "";
      this._ErrMsgIconTxt = "";
      this._PopupViewTopHeaderSkin = "";
      this._PopupViewTopHeaderSeparatorSkin = "";
      this._PopupViewDetailsHeaderSkin = "";
      this._PopupViewDetailsSkin = "";
      this._PopupDetailsEditBtnSkin = "";
      this._PopupDetailsEditBtnTxt = "";
      this._PopupAddProductLineTopHeaderTxt = "";
      this._PopupEditProductLineTopHeaderTxt = "";
      this._PopupLblProductLineNameTxt = "";
      this._PopupLblProductLineRefTxt = "";
      this._PopupTextBoxProductLineNamePlaceholderTxt = "";
      this._PopupTextBoxProductLineRefPlaceholderTxt = "";
      this._PopupErrMsgProductLineNameTxt = "";
      this._PopupErrMsgProductLineRefTxt = "";
      this._PopupAddProductLineBtnTxt = "";
      this._PopupEditProductLineBtnTxt = "";
      this._PopupAddProductLineBtnWidth = "";
      this._PopupEditProductLineBtnWidth = "";
      this._PopupAddProductGrpTopHeaderTxt = "";
      this._PopupEditProductGrpTopHeaderTxt = "";
      this._PopupLblProductGrpNameTxt = "";
      this._PopupLblAssociatedProductLineNameTxt = "";
      this._PopupLblProductGrpRefTxt = "";
      this._PopupLblProductGrpDescTxt = "";
      this._PopupLblProductGrpDetailedDescTxt = "";
      this._PopupLblImgTypeTxt = "";
      this._PopupLblImgUrlTxt = "";
      this._PopupTextBoxProductGrpNamePlaceholderTxt = "";
      this._PopupListBoxProductLinePlaceholderTxt = "";
      this._PopupTextBoxProductGrpRefPlaceholderTxt = "";
      this._PopupTextBoxProductGrpDescPlaceholderTxt = "";
      this._PopupTextBoxProductGrpDetailedDescPlaceholderTxt = "";
      this._PopupListBoxImgTypePlaceholderTxt = "";
      this._PopupTextBoxImgUrlPlaceholderTxt = "";
      this._PopupLblAddImgFieldTxt = "";
      this._PopupLblAddImgFieldSkin = "";
      this._PopupErrMsgProductGrpNameTxt = "";
      this._PopupErrMsgAssociatedProductLineNameTxt = "";
      this._PopupErrMsgProductGrpRefTxt = "";
      this._PopupErrMsgProductGrpDescTxt = "";
      this._PopupErrMsgProductGrpDetailedDescTxt = "";
      this._PopupErrMsgImgTypeTxt = "";
      this._PopupErrMsgImgUrlTxt = "";
      this._AddImgFieldDeleteIconTxt = "";
      this._AddImgFieldDeleteIconSkin = "";
      this._PopupAddProductGrpBtnTxt = "";
      this._PopupEditProductGrpBtnTxt = "";
      this._PopupAddProductGrpBtnWidth = "";
      this._PopupEditProductGrpBtnWidth = "";
      this._PopupAddFeatureTopHeaderTxt = "";
      this._PopupEditFeatureTopHeaderTxt = "";
      this._PopupLblFeatureNameTxt = "";
      this._PopupLblFeatureGrpTxt = "";
      this._PopupLblFeatureTypeTxt = "";
      this._PopupLblFeatureDescTxt = "";
      this._PopupTextBoxFeatureNamePlaceholderTxt = "";
      this._PopupTextBoxFeatureGrpPlaceholderTxt = "";
      this._PopupTextBoxFeatureTypePlaceholderTxt = "";
      this._PopupTextBoxFeatureDescPlaceholderTxt = "";
      this._PopupErrMsgFeatureNameTxt = "";
      this._PopupErrMsgFeatureGrpTxt = "";
      this._PopupErrMsgFeatureTypeTxt = "";
      this._PopupErrMsgFeatureDescTxt = "";
      this._PopupAddFeatureBtnTxt = "";
      this._PopupEditFeatureBtnTxt = "";
      this._PopupAddFeatureBtnWidth = "";
      this._PopupEditFeatureBtnWidth = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, "MainPageBgSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._MainPageBgSkin=val;
        }
      });
      defineGetter(this, "MainPageBgSkin", function() {
        return this._MainPageBgSkin;
      });
      defineSetter(this, "objSeviceName", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._objSeviceName=val;
        }
      });
      defineGetter(this, "objSeviceName", function() {
        return this._objSeviceName;
      });
      defineSetter(this, "objName", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._objName=val;
        }
      });
      defineGetter(this, "objName", function() {
        return this._objName;
      });
      defineSetter(this, "operationName", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._operationName=val;
        }
      });
      defineGetter(this, "operationName", function() {
        return this._operationName;
      });
      defineSetter(this, "objSeviceName1", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._objSeviceName1=val;
        }
      });
      defineGetter(this, "objSeviceName1", function() {
        return this._objSeviceName1;
      });
      defineSetter(this, "objName1", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._objName1=val;
        }
      });
      defineGetter(this, "objName1", function() {
        return this._objName1;
      });
      defineSetter(this, "operationName1", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._operationName1=val;
        }
      });
      defineGetter(this, "operationName1", function() {
        return this._operationName1;
      });
      defineSetter(this, "objSeviceName2", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._objSeviceName2=val;
        }
      });
      defineGetter(this, "objSeviceName2", function() {
        return this._objSeviceName2;
      });
      defineSetter(this, "objName2", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._objName2=val;
        }
      });
      defineGetter(this, "objName2", function() {
        return this._objName2;
      });
      defineSetter(this, "operationName2", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._operationName2=val;
        }
      });
      defineGetter(this, "operationName2", function() {
        return this._operationName2;
      });

      defineSetter(this, "objSeviceName3", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._objSeviceName3=val;
        }
      });
      defineGetter(this, "objSeviceName3", function() {
        return this._objSeviceName3;
      });
      defineSetter(this, "objName3", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._objName3=val;
        }
      });
      defineGetter(this, "objName3", function() {
        return this._objName3;
      });
      defineSetter(this, "operationName3", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._operationName3=val;
        }
      });
      defineGetter(this, "operationName3", function() {
        return this._operationName3;
      });
      defineSetter(this, "objSeviceName4", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._objSeviceName4=val;
        }
      });
      defineGetter(this, "objSeviceName4", function() {
        return this._objSeviceName4;
      });
      defineSetter(this, "objName4", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._objName4=val;
        }
      });
      defineGetter(this, "objName4", function() {
        return this._objName4;
      });
      defineSetter(this, "operationName4", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._operationName4=val;
        }
      });
      defineGetter(this, "operationName4", function() {
        return this._operationName4;
      });
      defineSetter(this, "objSeviceName5", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._objSeviceName5=val;
        }
      });
      defineGetter(this, "objSeviceName5", function() {
        return this._objSeviceName5;
      });
      defineSetter(this, "objName5", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._objName5=val;
        }
      });
      defineGetter(this, "objName5", function() {
        return this._objName5;
      });
      defineSetter(this, "operationName5", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._operationName5=val;
        }
      });
      defineGetter(this, "operationName5", function() {
        return this._operationName5;
      });
      defineSetter(this, "objSeviceName6", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._objSeviceName6=val;
        }
      });
      defineGetter(this, "objSeviceName6", function() {
        return this._objSeviceName6;
      });
      defineSetter(this, "objName6", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._objName6=val;
        }
      });
      defineGetter(this, "objName6", function() {
        return this._objName6;
      });
      defineSetter(this, "operationName6", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._operationName6=val;
        }
      });
      defineGetter(this, "operationName6", function() {
        return this._operationName6;
      });
      defineSetter(this, "objSeviceName7", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._objSeviceName7=val;
        }
      });
      defineGetter(this, "objSeviceName7", function() {
        return this._objSeviceName7;
      });
      defineSetter(this, "objName7", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._objName7=val;
        }
      });
      defineGetter(this, "objName7", function() {
        return this._objName7;
      });
      defineSetter(this, "operationName7", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._operationName7=val;
        }
      });
      defineGetter(this, "operationName7", function() {
        return this._operationName7;
      });
      defineSetter(this, "objSeviceName8", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._objSeviceName8=val;
        }
      });
      defineGetter(this, "objSeviceName8", function() {
        return this._objSeviceName8;
      });
      defineSetter(this, "objName8", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._objName8=val;
        }
      });
      defineGetter(this, "objName8", function() {
        return this._objName8;
      });
      defineSetter(this, "operationName8", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._operationName8=val;
        }
      });
      defineGetter(this, "operationName8", function() {
        return this._operationName8;
      });
      defineSetter(this, "ProductTabSkinOnSelect", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ProductTabSkinOnSelect=val;
        }
      });
      defineGetter(this, "ProductTabSkinOnSelect", function() {
        return this._ProductTabSkinOnSelect;
      });
      defineSetter(this, "ProductTabSkinUnSelect", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ProductTabSkinUnSelect=val;
        }
      });
      defineGetter(this, "ProductTabSkinUnSelect", function() {
        return this._ProductTabSkinUnSelect;
      });
      defineSetter(this, "ProductTabLblNameSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ProductTabLblNameSkin=val;
        }
      });
      defineGetter(this, "ProductTabLblNameSkin", function() {
        return this._ProductTabLblNameSkin;
      });
      defineSetter(this, "ProductTabLblCountSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ProductTabLblCountSkin=val;
        }
      });
      defineGetter(this, "ProductTabLblCountSkin", function() {
        return this._ProductTabLblCountSkin;
      });
      defineSetter(this, "ProductLineTabLblNameTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ProductLineTabLblNameTxt=val;
        }
      });
      defineGetter(this, "ProductLineTabLblNameTxt", function() {
        return this._ProductLineTabLblNameTxt;
      });
      defineSetter(this, "ProductGroupTabLblNameTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ProductGroupTabLblNameTxt=val;
        }
      });
      defineGetter(this, "ProductGroupTabLblNameTxt", function() {
        return this._ProductGroupTabLblNameTxt;
      });
      defineSetter(this, "ProductFeatureTabLblNameTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ProductFeatureTabLblNameTxt=val;
        }
      });
      defineGetter(this, "ProductFeatureTabLblNameTxt", function() {
        return this._ProductFeatureTabLblNameTxt;
      });
      defineSetter(this, "ProductLineTopHeaderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ProductLineTopHeaderTxt=val;
        }
      });
      defineGetter(this, "ProductLineTopHeaderTxt", function() {
        return this._ProductLineTopHeaderTxt;
      });
      defineSetter(this, "ProductGroupTopHeaderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ProductGroupTopHeaderTxt=val;
        }
      });
      defineGetter(this, "ProductGroupTopHeaderTxt", function() {
        return this._ProductGroupTopHeaderTxt;
      });
      defineSetter(this, "ProductFeatureTopHeaderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ProductFeatureTopHeaderTxt=val;
        }
      });
      defineGetter(this, "ProductFeatureTopHeaderTxt", function() {
        return this._ProductFeatureTopHeaderTxt;
      });
      defineSetter(this, "ProductTopHeaderSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ProductTopHeaderSkin=val;
        }
      });
      defineGetter(this, "ProductTopHeaderSkin", function() {
        return this._ProductTopHeaderSkin;
      });
      defineSetter(this, "AddLineProductBtnTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._AddLineProductBtnTxt=val;
        }
      });
      defineGetter(this, "AddLineProductBtnTxt", function() {
        return this._AddLineProductBtnTxt;
      });
      defineSetter(this, "AddGroupProductBtnTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._AddGroupProductBtnTxt=val;
        }
      });
      defineGetter(this, "AddGroupProductBtnTxt", function() {
        return this._AddGroupProductBtnTxt;
      });
      defineSetter(this, "AddFeatureProductBtnTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._AddFeatureProductBtnTxt=val;
        }
      });
      defineGetter(this, "AddFeatureProductBtnTxt", function() {
        return this._AddFeatureProductBtnTxt;
      });
      defineSetter(this, "AddProductBtnSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._AddProductBtnSkin=val;
        }
      });
      defineGetter(this, "AddProductBtnSkin", function() {
        return this._AddProductBtnSkin;
      });
      defineSetter(this, "AddLineProductBtnWidth", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._AddLineProductBtnWidth=val;
        }
      });
      defineGetter(this, "AddLineProductBtnWidth", function() {
        return this._AddLineProductBtnWidth;
      });
      defineSetter(this, "AddGroupProductBtnWidth", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._AddGroupProductBtnWidth=val;
        }
      });
      defineGetter(this, "AddGroupProductBtnWidth", function() {
        return this._AddGroupProductBtnWidth;
      });
      defineSetter(this, "AddFeatureProductBtnWidth", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._AddFeatureProductBtnWidth=val;
        }
      });
      defineGetter(this, "AddFeatureProductBtnWidth", function() {
        return this._AddFeatureProductBtnWidth;
      });
      defineSetter(this, "flxSearchBoxSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._flxSearchBoxSkin=val;
        }
      });
      defineGetter(this, "flxSearchBoxSkin", function() {
        return this._flxSearchBoxSkin;
      });
      defineSetter(this, "flxSearchBoxOnFocusSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._flxSearchBoxOnFocusSkin=val;
        }
      });
      defineGetter(this, "flxSearchBoxOnFocusSkin", function() {
        return this._flxSearchBoxOnFocusSkin;
      });
      defineSetter(this, "SeachTxtBoxSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SeachTxtBoxSkin=val;
        }
      });
      defineGetter(this, "SeachTxtBoxSkin", function() {
        return this._SeachTxtBoxSkin;
      });
      defineSetter(this, "IconSearchTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconSearchTxt=JSON.parse(val);
        }
      });
      defineGetter(this, "IconSearchTxt", function() {
        return this._IconSearchTxt;
      });
      defineSetter(this, "IconSearchClearTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconSearchClearTxt=JSON.parse(val);
        }
      });
      defineGetter(this, "IconSearchClearTxt", function() {
        return this._IconSearchClearTxt;
      });
      defineSetter(this, "IconSearchSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconSearchSkin=val;
        }
      });
      defineGetter(this, "IconSearchSkin", function() {
        return this._IconSearchSkin;
      });
      defineSetter(this, "SeachTxtBoxPlaceholder1Txt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SeachTxtBoxPlaceholder1Txt=val;
        }
      });
      defineGetter(this, "SeachTxtBoxPlaceholder1Txt", function() {
        return this._SeachTxtBoxPlaceholder1Txt;
      });
      defineSetter(this, "SeachTxtBoxPlaceholder2Txt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SeachTxtBoxPlaceholder2Txt=val;
        }
      });
      defineGetter(this, "SeachTxtBoxPlaceholder2Txt", function() {
        return this._SeachTxtBoxPlaceholder2Txt;
      });
      defineSetter(this, "SeachTxtBoxPlaceholder3Txt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SeachTxtBoxPlaceholder3Txt=val;
        }
      });
      defineGetter(this, "SeachTxtBoxPlaceholder3Txt", function() {
        return this._SeachTxtBoxPlaceholder3Txt;
      });
      defineSetter(this, "LblSegmentHeaderSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblSegmentHeaderSkin=val;
        }
      });
      defineGetter(this, "LblSegmentHeaderSkin", function() {
        return this._LblSegmentHeaderSkin;
      });
      defineSetter(this, "IconSortSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconSortSkin=val;
        }
      });
      defineGetter(this, "IconSortSkin", function() {
        return this._IconSortSkin;
      });
      defineSetter(this, "IconSortTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconSortTxt=JSON.parse(val);
        }
      });
      defineGetter(this, "IconSortTxt", function() {
        return this._IconSortTxt;
      });
      defineSetter(this, "LblSegmentHeader1Txt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblSegmentHeader1Txt=val;
        }
      });
      defineGetter(this, "LblSegmentHeader1Txt", function() {
        return this._LblSegmentHeader1Txt;
      });
      defineSetter(this, "LblSegmentHeader2Txt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblSegmentHeader2Txt=val;
        }
      });
      defineGetter(this, "LblSegmentHeader2Txt", function() {
        return this._LblSegmentHeader2Txt;
      });
      defineSetter(this, "LblSegmentHeader3Txt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblSegmentHeader3Txt=val;
        }
      });
      defineGetter(this, "LblSegmentHeader3Txt", function() {
        return this._LblSegmentHeader3Txt;
      });
      defineSetter(this, "LblSegmentHeader4Txt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblSegmentHeader4Txt=val;
        }
      });
      defineGetter(this, "LblSegmentHeader4Txt", function() {
        return this._LblSegmentHeader4Txt;
      });
      defineSetter(this, "LblSegmentHeader5Txt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblSegmentHeader5Txt=val;
        }
      });
      defineGetter(this, "LblSegmentHeader5Txt", function() {
        return this._LblSegmentHeader5Txt;
      });
      defineSetter(this, "LblSegmentHeader6Txt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblSegmentHeader6Txt=val;
        }
      });
      defineGetter(this, "LblSegmentHeader6Txt", function() {
        return this._LblSegmentHeader6Txt;
      });
      defineSetter(this, "LblSegmentHeader7Txt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblSegmentHeader7Txt=val;
        }
      });
      defineGetter(this, "LblSegmentHeader7Txt", function() {
        return this._LblSegmentHeader7Txt;
      });
      defineSetter(this, "LblSegmentHeader8Txt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblSegmentHeader8Txt=val;
        }
      });
      defineGetter(this, "LblSegmentHeader8Txt", function() {
        return this._LblSegmentHeader8Txt;
      });
      defineSetter(this, "LblSegmentSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblSegmentSkin=val;
        }
      });
      defineGetter(this, "LblSegmentSkin", function() {
        return this._LblSegmentSkin;
      });
      defineSetter(this, "HeaderSeparatorSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._HeaderSeparatorSkin=val;
        }
      });
      defineGetter(this, "HeaderSeparatorSkin", function() {
        return this._HeaderSeparatorSkin;
      });
      defineSetter(this, "SegmentSeparatorSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SegmentSeparatorSkin=val;
        }
      });
      defineGetter(this, "SegmentSeparatorSkin", function() {
        return this._SegmentSeparatorSkin;
      });
      defineSetter(this, "SegmentEditIconSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SegmentEditIconSkin=val;
        }
      });
      defineGetter(this, "SegmentEditIconSkin", function() {
        return this._SegmentEditIconSkin;
      });
      defineSetter(this, "SegmentEditIconTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SegmentEditIconTxt=JSON.parse(val);
        }
      });
      defineGetter(this, "SegmentEditIconTxt", function() {
        return this._SegmentEditIconTxt;
      });
      defineSetter(this, "PopupContinerTranslucentBgSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupContinerTranslucentBgSkin=val;
        }
      });
      defineGetter(this, "PopupContinerTranslucentBgSkin", function() {
        return this._PopupContinerTranslucentBgSkin;
      });
      defineSetter(this, "PopupMainBgSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupMainBgSkin=val;
        }
      });
      defineGetter(this, "PopupMainBgSkin", function() {
        return this._PopupMainBgSkin;
      });
      defineSetter(this, "ImgDetailsViewBgSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ImgDetailsViewBgSkin=val;
        }
      });
      defineGetter(this, "ImgDetailsViewBgSkin", function() {
        return this._ImgDetailsViewBgSkin;
      });

      defineSetter(this, "ImageTypeDetailsJsonData", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ImageTypeDetailsJsonData=JSON.parse(val);
        }
      });
      defineGetter(this, "ImageTypeDetailsJsonData", function() {
        return this._ImageTypeDetailsJsonData;
      });
      defineSetter(this, "PopupTopBarSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTopBarSkin=val;
        }
      });
      defineGetter(this, "PopupTopBarSkin", function() {
        return this._PopupTopBarSkin;
      });
      defineSetter(this, "PopupCloseIconSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupCloseIconSkin=val;
        }
      });
      defineGetter(this, "PopupCloseIconSkin", function() {
        return this._PopupCloseIconSkin;
      });
      defineSetter(this, "PopupCloseIconTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupCloseIconTxt=JSON.parse(val);
        }
      });
      defineGetter(this, "PopupCloseIconTxt", function() {
        return this._PopupCloseIconTxt;
      });
      defineSetter(this, "PopupCancelBtnSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupCancelBtnSkin=val;
        }
      });
      defineGetter(this, "PopupCancelBtnSkin", function() {
        return this._PopupCancelBtnSkin;
      });
      defineSetter(this, "PopupCancelBtnSkinHover", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupCancelBtnSkinHover=val;
        }
      });
      defineGetter(this, "PopupCancelBtnSkinHover", function() {
        return this._PopupCancelBtnSkinHover;
      });
      defineSetter(this, "PopupCancelBtnWidth", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupCancelBtnWidth=val;
        }
      });
      defineGetter(this, "PopupCancelBtnWidth", function() {
        return this._PopupCancelBtnWidth;
      });
      defineSetter(this, "PopupCancelBtnTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupCancelBtnTxt=val;
        }
      });
      defineGetter(this, "PopupCancelBtnTxt", function() {
        return this._PopupCancelBtnTxt;
      });
      defineSetter(this, "PopupSaveBtnSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupSaveBtnSkin=val;
        }
      });
      defineGetter(this, "PopupSaveBtnSkin", function() {
        return this._PopupSaveBtnSkin;
      });
      defineSetter(this, "PopupSaveBtnSkinHover", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupSaveBtnSkinHover=val;
        }
      });
      defineGetter(this, "PopupSaveBtnSkinHover", function() {
        return this._PopupSaveBtnSkinHover;
      });
      defineSetter(this, "PopupTopHeaderSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTopHeaderSkin=val;
        }
      });
      defineGetter(this, "PopupTopHeaderSkin", function() {
        return this._PopupTopHeaderSkin;
      });
      defineSetter(this, "PopupTextFieldCountSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTextFieldCountSkin=val;
        }
      });
      defineGetter(this, "PopupTextFieldCountSkin", function() {
        return this._PopupTextFieldCountSkin;
      });
      defineSetter(this, "PopupFieldHeaderSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupFieldHeaderSkin=val;
        }
      });
      defineGetter(this, "PopupFieldHeaderSkin", function() {
        return this._PopupFieldHeaderSkin;
      });
      defineSetter(this, "PopupTextBoxSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTextBoxSkin=val;
        }
      });
      defineGetter(this, "PopupTextBoxSkin", function() {
        return this._PopupTextBoxSkin;
      });     
      defineSetter(this, "PopupTextBoxDisabledSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTextBoxDisabledSkin=val;
        }
      });
      defineGetter(this, "PopupTextBoxDisabledSkin", function() {
        return this._PopupTextBoxDisabledSkin;
      });
      defineSetter(this, "PopupListBoxDisabledSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupListBoxDisabledSkin=val;
        }
      });
      defineGetter(this, "PopupListBoxDisabledSkin", function() {
        return this._PopupListBoxDisabledSkin;
      });
      defineSetter(this, "PopupTextAreaSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTextAreaSkin=val;
        }
      });
      defineGetter(this, "PopupTextAreaSkin", function() {
        return this._PopupTextAreaSkin;
      });
      defineSetter(this, "PopupListBoxSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupListBoxSkin=val;
        }
      });
      defineGetter(this, "PopupListBoxSkin", function() {
        return this._PopupListBoxSkin;
      });
      defineSetter(this, "PopupTextBoxErrSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTextBoxErrSkin=val;
        }
      });
      defineGetter(this, "PopupTextBoxErrSkin", function() {
        return this._PopupTextBoxErrSkin;
      });
      defineSetter(this, "PopupTextAreaErrSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTextAreaErrSkin=val;
        }
      });
      defineGetter(this, "PopupTextAreaErrSkin", function() {
        return this._PopupTextAreaErrSkin;
      });
      defineSetter(this, "PopupListBoxErrSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupListBoxErrSkin=val;
        }
      });
      defineGetter(this, "PopupListBoxErrSkin", function() {
        return this._PopupListBoxErrSkin;
      });
      defineSetter(this, "ErrMsgTextSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ErrMsgTextSkin=val;
        }
      });
      defineGetter(this, "ErrMsgTextSkin", function() {
        return this._ErrMsgTextSkin;
      });
      defineSetter(this, "ErrMsgIconSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ErrMsgIconSkin=val;
        }
      });
      defineGetter(this, "ErrMsgIconSkin", function() {
        return this._ErrMsgIconSkin;
      });
      defineSetter(this, "ErrMsgIconTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ErrMsgIconTxt=JSON.parse(val);
        }
      });
      defineGetter(this, "ErrMsgIconTxt", function() {
        return this._ErrMsgIconTxt;
      });
      defineSetter(this, "PopupViewTopHeaderSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupViewTopHeaderSkin=val;
        }
      });
      defineGetter(this, "PopupViewTopHeaderSkin", function() {
        return this._PopupViewTopHeaderSkin;
      });
      defineSetter(this, "PopupViewTopHeaderSeparatorSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupViewTopHeaderSeparatorSkin=val;
        }
      });
      defineGetter(this, "PopupViewTopHeaderSeparatorSkin", function() {
        return this._PopupViewTopHeaderSeparatorSkin;
      });
      defineSetter(this, "PopupViewDetailsHeaderSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupViewDetailsHeaderSkin=val;
        }
      });
      defineGetter(this, "PopupViewDetailsHeaderSkin", function() {
        return this._PopupViewDetailsHeaderSkin;
      });
      defineSetter(this, "PopupViewDetailsSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupViewDetailsSkin=val;
        }
      });
      defineGetter(this, "PopupViewDetailsSkin", function() {
        return this._PopupViewDetailsSkin;
      });
      defineSetter(this, "PopupDetailsEditBtnSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupDetailsEditBtnSkin=val;
        }
      });
      defineGetter(this, "PopupDetailsEditBtnSkin", function() {
        return this._PopupDetailsEditBtnSkin;
      });
      defineSetter(this, "PopupDetailsEditBtnTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupDetailsEditBtnTxt=val;
        }
      });
      defineGetter(this, "PopupDetailsEditBtnTxt", function() {
        return this._PopupDetailsEditBtnTxt;
      });
      defineSetter(this, "PopupAddProductLineTopHeaderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupAddProductLineTopHeaderTxt=val;
        }
      });
      defineGetter(this, "PopupAddProductLineTopHeaderTxt", function() {
        return this._PopupAddProductLineTopHeaderTxt;
      });
      defineSetter(this, "PopupEditProductLineTopHeaderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupEditProductLineTopHeaderTxt=val;
        }
      });
      defineGetter(this, "PopupEditProductLineTopHeaderTxt", function() {
        return this._PopupEditProductLineTopHeaderTxt;
      });
      defineSetter(this, "PopupLblProductLineNameTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupLblProductLineNameTxt=val;
        }
      });
      defineGetter(this, "PopupLblProductLineNameTxt", function() {
        return this._PopupLblProductLineNameTxt;
      });
      defineSetter(this, "PopupLblProductLineRefTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupLblProductLineRefTxt=val;
        }
      });
      defineGetter(this, "PopupLblProductLineRefTxt", function() {
        return this._PopupLblProductLineRefTxt;
      });
      defineSetter(this, "PopupTextBoxProductLineNamePlaceholderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTextBoxProductLineNamePlaceholderTxt=val;
        }
      });
      defineGetter(this, "PopupTextBoxProductLineNamePlaceholderTxt", function() {
        return this._PopupTextBoxProductLineNamePlaceholderTxt;
      });
      defineSetter(this, "PopupTextBoxProductLineRefPlaceholderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTextBoxProductLineRefPlaceholderTxt=val;
        }
      });
      defineGetter(this, "PopupTextBoxProductLineRefPlaceholderTxt", function() {
        return this._PopupTextBoxProductLineRefPlaceholderTxt;
      });
      defineSetter(this, "PopupErrMsgProductLineNameTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupErrMsgProductLineNameTxt=val;
        }
      });
      defineGetter(this, "PopupErrMsgProductLineNameTxt", function() {
        return this._PopupErrMsgProductLineNameTxt;
      });
      defineSetter(this, "PopupErrMsgProductLineRefTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupErrMsgProductLineRefTxt=val;
        }
      });
      defineGetter(this, "PopupErrMsgProductLineRefTxt", function() {
        return this._PopupErrMsgProductLineRefTxt;
      });
      defineSetter(this, "PopupAddProductLineBtnTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupAddProductLineBtnTxt=val;
        }
      });
      defineGetter(this, "PopupAddProductLineBtnTxt", function() {
        return this._PopupAddProductLineBtnTxt;
      });
      defineSetter(this, "PopupEditProductLineBtnTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupEditProductLineBtnTxt=val;
        }
      });
      defineGetter(this, "PopupEditProductLineBtnTxt", function() {
        return this._PopupEditProductLineBtnTxt;
      });
      defineSetter(this, "PopupAddProductLineBtnWidth", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupAddProductLineBtnWidth=val;
        }
      });
      defineGetter(this, "PopupAddProductLineBtnWidth", function() {
        return this._PopupAddProductLineBtnWidth;
      });
      defineSetter(this, "PopupEditProductLineBtnWidth", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupEditProductLineBtnWidth=val;
        }
      });
      defineGetter(this, "PopupEditProductLineBtnWidth", function() {
        return this._PopupEditProductLineBtnWidth;
      });
      defineSetter(this, "PopupAddProductGrpTopHeaderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupAddProductGrpTopHeaderTxt=val;
        }
      });
      defineGetter(this, "PopupAddProductGrpTopHeaderTxt", function() {
        return this._PopupAddProductGrpTopHeaderTxt;
      });
      defineSetter(this, "PopupEditProductGrpTopHeaderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupEditProductGrpTopHeaderTxt=val;
        }
      });
      defineGetter(this, "PopupEditProductGrpTopHeaderTxt", function() {
        return this._PopupEditProductGrpTopHeaderTxt;
      });
      defineSetter(this, "PopupLblProductGrpNameTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupLblProductGrpNameTxt=val;
        }
      });
      defineGetter(this, "PopupLblProductGrpNameTxt", function() {
        return this._PopupLblProductGrpNameTxt;
      });
      defineSetter(this, "PopupLblAssociatedProductLineNameTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupLblAssociatedProductLineNameTxt=val;
        }
      });
      defineGetter(this, "PopupLblAssociatedProductLineNameTxt", function() {
        return this._PopupLblAssociatedProductLineNameTxt;
      });
      defineSetter(this, "PopupLblProductGrpRefTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupLblProductGrpRefTxt=val;
        }
      });
      defineGetter(this, "PopupLblProductGrpRefTxt", function() {
        return this._PopupLblProductGrpRefTxt;
      });
      defineSetter(this, "PopupLblProductGrpDescTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupLblProductGrpDescTxt=val;
        }
      });
      defineGetter(this, "PopupLblProductGrpDescTxt", function() {
        return this._PopupLblProductGrpDescTxt;
      });
      defineSetter(this, "PopupLblProductGrpDetailedDescTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupLblProductGrpDetailedDescTxt=val;
        }
      });
      defineGetter(this, "PopupLblProductGrpDetailedDescTxt", function() {
        return this._PopupLblProductGrpDetailedDescTxt;
      });
      defineSetter(this, "PopupLblImgTypeTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupLblImgTypeTxt=val;
        }
      });
      defineGetter(this, "PopupLblImgTypeTxt", function() {
        return this._PopupLblImgTypeTxt;
      });
      defineSetter(this, "PopupLblImgUrlTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupLblImgUrlTxt=val;
        }
      });
      defineGetter(this, "PopupLblImgUrlTxt", function() {
        return this._PopupLblImgUrlTxt;
      });
      defineSetter(this, "PopupTextBoxProductGrpNamePlaceholderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTextBoxProductGrpNamePlaceholderTxt=val;
        }
      });
      defineGetter(this, "PopupTextBoxProductGrpNamePlaceholderTxt", function() {
        return this._PopupTextBoxProductGrpNamePlaceholderTxt;
      });
      defineSetter(this, "PopupListBoxProductLinePlaceholderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupListBoxProductLinePlaceholderTxt=val;
        }
      });
      defineGetter(this, "PopupListBoxProductLinePlaceholderTxt", function() {
        return this._PopupListBoxProductLinePlaceholderTxt;
      });
      defineSetter(this, "PopupTextBoxProductGrpRefPlaceholderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTextBoxProductGrpRefPlaceholderTxt=val;
        }
      });
      defineGetter(this, "PopupTextBoxProductGrpRefPlaceholderTxt", function() {
        return this._PopupTextBoxProductGrpRefPlaceholderTxt;
      });
      defineSetter(this, "PopupTextBoxProductGrpDescPlaceholderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTextBoxProductGrpDescPlaceholderTxt=val;
        }
      });
      defineGetter(this, "PopupTextBoxProductGrpDescPlaceholderTxt", function() {
        return this._PopupTextBoxProductGrpDescPlaceholderTxt;
      });
      defineSetter(this, "PopupTextBoxProductGrpDetailedDescPlaceholderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTextBoxProductGrpDetailedDescPlaceholderTxt=val;
        }
      });
      defineGetter(this, "PopupTextBoxProductGrpDetailedDescPlaceholderTxt", function() {
        return this._PopupTextBoxProductGrpDetailedDescPlaceholderTxt;
      });
      defineSetter(this, "PopupListBoxImgTypePlaceholderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupListBoxImgTypePlaceholderTxt=val;
        }
      });
      defineGetter(this, "PopupListBoxImgTypePlaceholderTxt", function() {
        return this._PopupListBoxImgTypePlaceholderTxt;
      });
      defineSetter(this, "PopupTextBoxImgUrlPlaceholderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTextBoxImgUrlPlaceholderTxt=val;
        }
      });
      defineGetter(this, "PopupTextBoxImgUrlPlaceholderTxt", function() {
        return this._PopupTextBoxImgUrlPlaceholderTxt;
      });
      defineSetter(this, "PopupLblAddImgFieldTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupLblAddImgFieldTxt=val;
        }
      });
      defineGetter(this, "PopupLblAddImgFieldTxt", function() {
        return this._PopupLblAddImgFieldTxt;
      });
      defineSetter(this, "PopupLblAddImgFieldSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupLblAddImgFieldSkin=val;
        }
      });
      defineGetter(this, "PopupLblAddImgFieldSkin", function() {
        return this._PopupLblAddImgFieldSkin;
      });
      defineSetter(this, "PopupErrMsgProductGrpNameTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupErrMsgProductGrpNameTxt=val;
        }
      });
      defineGetter(this, "PopupErrMsgProductGrpNameTxt", function() {
        return this._PopupErrMsgProductGrpNameTxt;
      });
      defineSetter(this, "PopupErrMsgAssociatedProductLineNameTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupErrMsgAssociatedProductLineNameTxt=val;
        }
      });
      defineGetter(this, "PopupErrMsgAssociatedProductLineNameTxt", function() {
        return this._PopupErrMsgAssociatedProductLineNameTxt;
      });
      defineSetter(this, "PopupErrMsgProductGrpRefTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupErrMsgProductGrpRefTxt=val;
        }
      });
      defineGetter(this, "PopupErrMsgProductGrpRefTxt", function() {
        return this._PopupErrMsgProductGrpRefTxt;
      });
      defineSetter(this, "PopupErrMsgProductGrpDescTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupErrMsgProductGrpDescTxt=val;
        }
      });
      defineGetter(this, "PopupErrMsgProductGrpDescTxt", function() {
        return this._PopupErrMsgProductGrpDescTxt;
      });
      defineSetter(this, "PopupErrMsgProductGrpDetailedDescTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupErrMsgProductGrpDetailedDescTxt=val;
        }
      });
      defineGetter(this, "PopupErrMsgProductGrpDetailedDescTxt", function() {
        return this._PopupErrMsgProductGrpDetailedDescTxt;
      });
      defineSetter(this, "PopupErrMsgImgTypeTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupErrMsgImgTypeTxt=val;
        }
      });
      defineGetter(this, "PopupErrMsgImgTypeTxt", function() {
        return this._PopupErrMsgImgTypeTxt;
      });
      defineSetter(this, "PopupErrMsgImgUrlTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupErrMsgImgUrlTxt=val;
        }
      });
      defineGetter(this, "PopupErrMsgImgUrlTxt", function() {
        return this._PopupErrMsgImgUrlTxt;
      });
      defineSetter(this, "AddImgFieldDeleteIconTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._AddImgFieldDeleteIconTxt=JSON.parse(val);
        }
      });
      defineGetter(this, "AddImgFieldDeleteIconTxt", function() {
        return this._AddImgFieldDeleteIconTxt;
      });
      defineSetter(this, "AddImgFieldDeleteIconSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._AddImgFieldDeleteIconSkin=val;
        }
      });
      defineGetter(this, "AddImgFieldDeleteIconSkin", function() {
        return this._AddImgFieldDeleteIconSkin;
      });
      defineSetter(this, "PopupAddProductGrpBtnTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupAddProductGrpBtnTxt=val;
        }
      });
      defineGetter(this, "PopupAddProductGrpBtnTxt", function() {
        return this._PopupAddProductGrpBtnTxt;
      });
      defineSetter(this, "PopupEditProductGrpBtnTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupEditProductGrpBtnTxt=val;
        }
      });
      defineGetter(this, "PopupEditProductGrpBtnTxt", function() {
        return this._PopupEditProductGrpBtnTxt;
      });
      defineSetter(this, "PopupAddProductGrpBtnWidth", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupAddProductGrpBtnWidth=val;
        }
      });
      defineGetter(this, "PopupAddProductGrpBtnWidth", function() {
        return this._PopupAddProductGrpBtnWidth;
      });
      defineSetter(this, "PopupEditProductGrpBtnWidth", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupEditProductGrpBtnWidth=val;
        }
      });
      defineGetter(this, "PopupEditProductGrpBtnWidth", function() {
        return this._PopupEditProductGrpBtnWidth;
      });
      defineSetter(this, "PopupAddFeatureTopHeaderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupAddFeatureTopHeaderTxt=val;
        }
      });
      defineGetter(this, "PopupAddFeatureTopHeaderTxt", function() {
        return this._PopupAddFeatureTopHeaderTxt;
      });
      defineSetter(this, "PopupEditFeatureTopHeaderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupEditFeatureTopHeaderTxt=val;
        }
      });
      defineGetter(this, "PopupEditFeatureTopHeaderTxt", function() {
        return this._PopupEditFeatureTopHeaderTxt;
      });
      defineSetter(this, "PopupLblFeatureNameTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupLblFeatureNameTxt=val;
        }
      });
      defineGetter(this, "PopupLblFeatureNameTxt", function() {
        return this._PopupLblFeatureNameTxt;
      });
      defineSetter(this, "PopupLblFeatureGrpTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupLblFeatureGrpTxt=val;
        }
      });
      defineGetter(this, "PopupLblFeatureGrpTxt", function() {
        return this._PopupLblFeatureGrpTxt;
      });
      defineSetter(this, "PopupLblFeatureTypeTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupLblFeatureTypeTxt=val;
        }
      });
      defineGetter(this, "PopupLblFeatureTypeTxt", function() {
        return this._PopupLblFeatureTypeTxt;
      });
      defineSetter(this, "PopupLblFeatureDescTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupLblFeatureDescTxt=val;
        }
      });
      defineGetter(this, "PopupLblFeatureDescTxt", function() {
        return this._PopupLblFeatureDescTxt;
      });
      defineSetter(this, "PopupTextBoxFeatureNamePlaceholderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTextBoxFeatureNamePlaceholderTxt=val;
        }
      });
      defineGetter(this, "PopupTextBoxFeatureNamePlaceholderTxt", function() {
        return this._PopupTextBoxFeatureNamePlaceholderTxt;
      });
      defineSetter(this, "PopupTextBoxFeatureGrpPlaceholderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTextBoxFeatureGrpPlaceholderTxt=val;
        }
      });
      defineGetter(this, "PopupTextBoxFeatureGrpPlaceholderTxt", function() {
        return this._PopupTextBoxFeatureGrpPlaceholderTxt;
      });
      defineSetter(this, "PopupTextBoxFeatureTypePlaceholderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTextBoxFeatureTypePlaceholderTxt=val;
        }
      });
      defineGetter(this, "PopupTextBoxFeatureTypePlaceholderTxt", function() {
        return this._PopupTextBoxFeatureTypePlaceholderTxt;
      });
      defineSetter(this, "PopupTextBoxFeatureDescPlaceholderTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTextBoxFeatureDescPlaceholderTxt=val;
        }
      });
      defineGetter(this, "PopupTextBoxFeatureDescPlaceholderTxt", function() {
        return this._PopupTextBoxFeatureDescPlaceholderTxt;
      });
      defineSetter(this, "PopupErrMsgFeatureNameTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupErrMsgFeatureNameTxt=val;
        }
      });
      defineGetter(this, "PopupErrMsgFeatureNameTxt", function() {
        return this._PopupErrMsgFeatureNameTxt;
      });
      defineSetter(this, "PopupErrMsgFeatureGrpTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupErrMsgFeatureGrpTxt=val;
        }
      });
      defineGetter(this, "PopupErrMsgFeatureGrpTxt", function() {
        return this._PopupErrMsgFeatureGrpTxt;
      });
      defineSetter(this, "PopupErrMsgFeatureTypeTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupErrMsgFeatureTypeTxt=val;
        }
      });
      defineGetter(this, "PopupErrMsgFeatureTypeTxt", function() {
        return this._PopupErrMsgFeatureTypeTxt;
      });
      defineSetter(this, "PopupErrMsgFeatureDescTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupErrMsgFeatureDescTxt=val;
        }
      });
      defineGetter(this, "PopupErrMsgFeatureDescTxt", function() {
        return this._PopupErrMsgFeatureDescTxt;
      });
      defineSetter(this, "PopupAddFeatureBtnTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupAddFeatureBtnTxt=val;
        }
      });
      defineGetter(this, "PopupAddFeatureBtnTxt", function() {
        return this._PopupAddFeatureBtnTxt;
      });
      defineSetter(this, "PopupEditFeatureBtnTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupEditFeatureBtnTxt=val;
        }
      });
      defineGetter(this, "PopupEditFeatureBtnTxt", function() {
        return this._PopupEditFeatureBtnTxt;
      });
      defineSetter(this, "PopupAddFeatureBtnWidth", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupAddFeatureBtnWidth=val;
        }
      });
      defineGetter(this, "PopupAddFeatureBtnWidth", function() {
        return this._PopupAddFeatureBtnWidth;
      });
      defineSetter(this, "PopupEditFeatureBtnWidth", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupEditFeatureBtnWidth=val;
        }
      });
      defineGetter(this, "PopupEditFeatureBtnWidth", function() {
        return this._PopupEditFeatureBtnWidth;
      });
    },

    manageProductsPreShow: function() {
      this.setConfigChanges();
      this.setFlowActions();
      this.resetFieldsOnPreShow();
      this.setPropertiesValueToWidget();
    },

    setConfigChanges:function(){
      const scopeObj = this;
      let configurationSvc = kony.sdk.getCurrentInstance().getConfigurationService();
      configurationSvc.getAllClientAppProperties(function(response) {
        if(response && response.MARKETING_CATALOG_CONFIG && response.MARKETING_CATALOG_CONFIG.toUpperCase()==="FALSE"){
          scopeObj.config2 = false;
        } else {
          scopeObj.config2 = true;
        }
        scopeObj.view.btnAddProductLines.setVisibility(scopeObj.config2);
        scopeObj.view.btnAddProductGroups.setVisibility(scopeObj.config2);
        scopeObj.view.btnAddProductFeatures.setVisibility(scopeObj.config2);
      },function(){}); 
    },

    setFlowActions: function() {
      var scopeObj = this;

      // tabs onclick events
      this.view.flxTabProductLine.onClick = function(){
        scopeObj.showProductLines();
      };

      this.view.flxTabProductGroup.onClick = function(){
        scopeObj.showProductGroups();
      };

      // btn add new product line/group/feature onclick events  
      this.view.btnAddProductLines.onClick = function(){
        scopeObj.showAddProductLine();
      };

      this.view.btnAddProductGroups.onClick = function(){
        scopeObj.showAddProductGroup();
      };

      this.view.btnEditProductGroup.onClick = function(){
        scopeObj.view.flxViewProductGroup.setVisibility(false);
        scopeObj.showEditProductGroup();
      };

      this.view.btnAddProductFeatures.onClick = function(){
        scopeObj.showAddFeature();
      };

      this.view.btnEditFeature.onClick = function(){
        scopeObj.view.flxViewFeature.setVisibility(false);
        scopeObj.showEditFeature();
      };

      // segment rowclick show details events
      this.view.segProductGroup.onRowClick = function(){
        scopeObj.populateGroupDetailsPopup();
      };

      this.view.segProductFeature.onRowClick = function(){
        scopeObj.populateFeatureDeatilsPopup();
      };
      this.view.txtProductLineName.onTouchStart = function(){
        AdminConsoleCommonUtilities.AdminConsoleCommonUtils.restrictTextFieldToAlphaNumericWithSpace("frmProduct_manageProducts_txtProductLineName");
      };
      // on text field change
      this.view.txtProductLineName.onKeyUp = function(){
        scopeObj.view.ProductLineNameError.setVisibility(false);
        scopeObj.view.txtProductLineName.skin = scopeObj._PopupTextBoxSkin;
        var textLen = scopeObj.view.txtProductLineName.text.length ;
        scopeObj.view.lblProductLineNameSize.text = textLen + "/" + scopeObj.view.txtProductLineName.maxtextlength;
        scopeObj.view.lblProductLineNameSize.setVisibility(true);
        scopeObj.view.forceLayout();
      };

      this.view.txtProductLineName.onEndEditing = function(){
        scopeObj.view.lblProductLineNameSize.setVisibility(false);
      };
      this.view.txtProductLineReference.onTouchStart = function(){
        AdminConsoleCommonUtilities.AdminConsoleCommonUtils.restrictTextFieldToAlphaNumericWithSpace("frmProduct_manageProducts_txtProductLineReference");
      };
      this.view.txtProductLineReference.onKeyUp = function(){
        scopeObj.view.ProductLineRefError.setVisibility(false);
        scopeObj.view.txtProductLineReference.skin = scopeObj._PopupTextBoxSkin;
        var textLen = scopeObj.view.txtProductLineReference.text.length ;
        scopeObj.view.lblProductLineRefSize.text = textLen + "/" + scopeObj.view.txtProductLineReference.maxtextlength;
        scopeObj.view.lblProductLineRefSize.setVisibility(true);
        scopeObj.view.forceLayout();
      };


      this.view.txtProductLineReference.onEndEditing = function(){
        scopeObj.view.lblProductLineRefSize.setVisibility(false);
      };
      this.view.txtProductGroupName.onTouchStart = function(){
        AdminConsoleCommonUtilities.AdminConsoleCommonUtils.restrictTextFieldToAlphaNumericWithSpace("frmProduct_manageProducts_txtProductGroupName");
      },
      this.view.txtProductGroupName.onKeyUp = function(){
        scopeObj.view.ProductGroupNameError.setVisibility(false);
        scopeObj.view.txtProductGroupName.skin = scopeObj._PopupTextBoxSkin;
        var textLen = scopeObj.view.txtProductGroupName.text.length ;
        scopeObj.view.lblProductGroupNameSize.text = textLen + "/" + scopeObj.view.txtProductGroupName.maxtextlength;
        scopeObj.view.lblProductGroupNameSize.setVisibility(true);
        scopeObj.view.forceLayout();
      };

      this.view.txtProductGroupName.onEndEditing = function(){
        scopeObj.view.lblProductGroupNameSize.setVisibility(false);
      };
       this.view.txtProductGroupRef.onTouchStart = function(){
          AdminConsoleCommonUtilities.AdminConsoleCommonUtils.restrictTextFieldToAlphaNumericWithSpace("frmProduct_manageProducts_txtProductGroupRef");
       };
      this.view.txtProductGroupRef.onKeyUp = function(){
        scopeObj.view.ProductGroupRefError.setVisibility(false);
        scopeObj.view.txtProductGroupRef.skin = scopeObj._PopupTextBoxSkin;
        var textLen = scopeObj.view.txtProductGroupRef.text.length ;
        scopeObj.view.lblProductGroupRefSize.text = textLen + "/" + scopeObj.view.txtProductGroupRef.maxtextlength;
        scopeObj.view.lblProductGroupRefSize.setVisibility(true);
        scopeObj.view.forceLayout();
      };

      this.view.txtProductGroupRef.onEndEditing = function(){
        scopeObj.view.lblProductGroupRefSize.setVisibility(false);
      };
      this.view.txtProductGroupDesc.onTouchStart = function(){
        AdminConsoleCommonUtilities.AdminConsoleCommonUtils.restrictTextFieldToAlphaNumericWithSpace("frmProduct_manageProducts_txtProductGroupDesc");
      },
        this.view.txtProductGroupDesc.onKeyUp = function(){
        scopeObj.view.ProductGroupDescError.setVisibility(false);
        scopeObj.view.txtProductGroupDesc.skin = scopeObj._PopupTextAreaSkin;
        var textLen = scopeObj.view.txtProductGroupDesc.text.length ;
        scopeObj.view.lblProductGroupDescSize.text = textLen + "/" + scopeObj.view.txtProductGroupDesc.maxtextlength;
        scopeObj.view.lblProductGroupDescSize.setVisibility(true);
        scopeObj.view.forceLayout();
      };

      this.view.txtProductGroupDesc.onEndEditing = function(){
        scopeObj.view.lblProductGroupDescSize.setVisibility(false);
      };
      this.view.txtProductGroupDetailedDesc.onTouchStart = function(){
        AdminConsoleCommonUtilities.AdminConsoleCommonUtils.restrictTextFieldToAlphaNumericWithSpace("frmProduct_manageProducts_txtProductGroupDetailedDesc");
      },
      this.view.txtProductGroupDetailedDesc.onKeyUp = function(){
        scopeObj.view.ProductGroupDetailedDescError.setVisibility(false);
        scopeObj.view.txtProductGroupDetailedDesc.skin = scopeObj._PopupTextAreaSkin;
        var textLen = scopeObj.view.txtProductGroupDetailedDesc.text.length ;
        scopeObj.view.lblProductGroupDetailedDescSize.text = textLen + "/" + scopeObj.view.txtProductGroupDetailedDesc.maxtextlength;
        scopeObj.view.lblProductGroupDetailedDescSize.setVisibility(true);
        scopeObj.view.forceLayout();
      };

      this.view.txtProductGroupDetailedDesc.onEndEditing = function(){
        scopeObj.view.lblProductGroupDetailedDescSize.setVisibility(false);
      };

      this.view.lstbxAssociatedProductLine.onSelection=function(){
        scopeObj.view.AssociatedProductLineError.setVisibility(false);
        scopeObj.view.lstbxAssociatedProductLine.skin = scopeObj._PopupListBoxSkin;
      };

      this.view.txtFeatureName.onKeyUp = function(){
        scopeObj.view.FeatureNameError.setVisibility(false);
        scopeObj.view.txtFeatureName.skin = scopeObj._PopupTextBoxSkin;
        var textLen = scopeObj.view.txtFeatureName.text.length ;
        scopeObj.view.lblFeatureNameSize.text = textLen + "/" + scopeObj.view.txtFeatureName.maxtextlength;
        scopeObj.view.lblFeatureNameSize.setVisibility(true);
        scopeObj.view.forceLayout();
      };

      this.view.txtFeatureName.onEndEditing = function(){
        scopeObj.view.lblFeatureNameSize.setVisibility(false);
      };

      this.view.txtFeatureGroup.onKeyUp = function(){
        scopeObj.view.FeatureGroupError.setVisibility(false);
        scopeObj.view.txtFeatureGroup.skin = scopeObj._PopupTextBoxSkin;
        var textLen = scopeObj.view.txtFeatureGroup.text.length ;
        scopeObj.view.lblFeatureGroupSize.text = textLen + "/" + scopeObj.view.txtFeatureGroup.maxtextlength;
        scopeObj.view.lblFeatureGroupSize.setVisibility(true);
        scopeObj.view.forceLayout();
      };

      this.view.txtFeatureGroup.onEndEditing = function(){
        scopeObj.view.lblFeatureGroupSize.setVisibility(false);
      };

      this.view.txtFeatureType.onKeyUp = function(){
        scopeObj.view.FeatureTypeError.setVisibility(false);
        scopeObj.view.txtFeatureType.skin = scopeObj._PopupTextBoxSkin;
        var textLen = scopeObj.view.txtFeatureType.text.length ;
        scopeObj.view.lblFeatureTypeSize.text = textLen + "/" + scopeObj.view.txtFeatureType.maxtextlength;
        scopeObj.view.lblFeatureTypeSize.setVisibility(true);
        scopeObj.view.forceLayout();
      };

      this.view.txtFeatureType.onEndEditing = function(){
        scopeObj.view.lblFeatureTypeSize.setVisibility(false);
      };

      this.view.txtFeatureDescription.onKeyUp = function(){
        scopeObj.view.FeatureDescError.setVisibility(false);
        scopeObj.view.txtFeatureDescription.skin = scopeObj._PopupTextAreaSkin;
        var textLen = scopeObj.view.txtFeatureDescription.text.length ;
        scopeObj.view.lblFeatureDescSize.text = textLen + "/" + scopeObj.view.txtFeatureDescription.maxtextlength;
        scopeObj.view.lblFeatureDescSize.setVisibility(true);
        scopeObj.view.forceLayout();
      };

      this.view.txtFeatureDescription.onEndEditing = function(){
        scopeObj.view.lblFeatureDescSize.setVisibility(false);
      };

      //close popup events
      this.view.flxAddProductLinePopupClose.onClick = function(){
        scopeObj.closePopup();
      };

      this.view.btnAddProductLineCancel.onClick = function(){
        scopeObj.closePopup();
      };

      this.view.flxAddProductGroupPopupClose.onClick = function(){
        scopeObj.closePopup();
      };

      this.view.btnAddProductGroupCancel.onClick = function(){
        scopeObj.closePopup();
      };

      this.view.flxViewProductGroupPopupClose.onClick = function(){
        scopeObj.closePopup();
      };

      this.view.flxAddFeaturePopupClose.onClick = function(){
        scopeObj.closePopup();
      };

      this.view.btnAddFeatureCancel.onClick = function(){
        scopeObj.closePopup();
      };

      this.view.flxViewFeaturePopupClose.onClick = function(){
        scopeObj.closePopup();
      };

      // edit and create products
      this.view.btnAddProductLine.onClick = function(){
        scopeObj.createEditProductLines();
      };

      this.view.btnAddProductGroup.onClick = function(){
        scopeObj.createEditProductGroups();
      };

      this.view.btnAddFeature.onClick = function(){
        scopeObj.createEditFeatures();
      };

      this.view.flxAddImgDetail.onClick = function(){
        scopeObj.addImgTypeURLField("Banner", "");
      };

      // search in segment
      this.view.searchBoxProductLine.tbxSearchBox.onKeyUp = function(){
        var data = scopeObj.searchProduct(scopeObj.view.searchBoxProductLine.tbxSearchBox.text, "lblProductLine", scopeObj.productLineSegList, scopeObj.view.searchBoxProductLine);
        scopeObj.setSegmentData(data, scopeObj.view.segProductLine, scopeObj.view.flxNoResultFoundPL);
      };

      this.view.searchBoxProductLine.flxSearchCancel.onClick = function(){
        var data = scopeObj.searchProduct("", "lblProductLine", scopeObj.productLineSegList, scopeObj.view.searchBoxProductLine);
        scopeObj.setSegmentData(data, scopeObj.view.segProductLine, scopeObj.view.flxNoResultFoundPL);
      };

      this.view.searchBoxProductGroup.tbxSearchBox.onKeyUp = function(){
        var data = scopeObj.searchProduct(scopeObj.view.searchBoxProductGroup.tbxSearchBox.text, "lblProductGroup", scopeObj.productGroupSegList, scopeObj.view.searchBoxProductGroup);
        scopeObj.setSegmentData(data, scopeObj.view.segProductGroup, scopeObj.view.flxNoResultFoundPG);
      };

      this.view.searchBoxProductGroup.flxSearchCancel.onClick = function(){
        var data = scopeObj.searchProduct("", "lblProductGroup", scopeObj.productGroupSegList, scopeObj.view.searchBoxProductGroup);
        scopeObj.setSegmentData(data, scopeObj.view.segProductGroup, scopeObj.view.flxNoResultFoundPG);
      };

      this.view.searchBoxProductFeature.tbxSearchBox.onKeyUp = function(){
        var data = scopeObj.searchProduct(scopeObj.view.searchBoxProductFeature.tbxSearchBox.text, "lblName", scopeObj.featureSegList, scopeObj.view.searchBoxProductFeature);
        scopeObj.setSegmentData(data, scopeObj.view.segProductFeature, scopeObj.view.flxNoResultFoundPF);
      };

      this.view.searchBoxProductFeature.flxSearchCancel.onClick = function(){
        var data = scopeObj.searchProduct("", "lblName", scopeObj.featureSegList, scopeObj.view.searchBoxProductFeature);
        scopeObj.setSegmentData(data, scopeObj.view.segProductFeature, scopeObj.view.flxNoResultFoundPF);
      };

      //sort segment column
      this.view.fontIconOptionsProductLine.onClick = function(){
        scopeObj.sortProductList("lblProductLine.text", scopeObj.view.segProductLine, scopeObj.resetSortIconsProductLine);
      };
      this.view.fontIconOptionsProductReference.onClick = function(){
        scopeObj.sortProductList("lblProductReference.text", scopeObj.view.segProductLine, scopeObj.resetSortIconsProductLine);
      };
      this.view.fontIconOptionsProductGroup.onClick = function(){
        scopeObj.sortProductList("lblProductGroup.text", scopeObj.view.segProductGroup, scopeObj.resetSortIconsProductGroup);
      };
      this.view.fontIconOptionsGroupReference.onClick = function(){
        scopeObj.sortProductList("lblProductLine.text", scopeObj.view.segProductGroup, scopeObj.resetSortIconsProductGroup);
      };
      this.view.fontIconOptionsProductLinePG.onClick = function(){
        scopeObj.sortProductList("lblGroupReference.text", scopeObj.view.segProductGroup, scopeObj.resetSortIconsProductGroup);
      };
      this.view.fontIconOptionsFeatureName.onClick = function(){
        scopeObj.sortProductList("lblName.text", scopeObj.view.segProductFeature, scopeObj.resetSortIconsFeature);
      };
      this.view.fontIconOptionsFeatureGroup.onClick = function(){
        scopeObj.sortProductList("lblGroup.text", scopeObj.view.segProductFeature, scopeObj.resetSortIconsFeature);
      };
      this.view.fontIconOptionsFeatureType.onClick = function(){
        scopeObj.sortProductList("lblType.text", scopeObj.view.segProductFeature, scopeObj.resetSortIconsFeature);
      };

      this.view.forceLayout();
    },

    willUpdateUI: function(context) {
      kony.print(context+"");
      if(context){
        if (context.progressBar) {
          if (context.progressBar.show === "success")
            this.formUpdateUI(context);
          else
            this.formUpdateUI(context);
        }
        if (context.toastModel) {
          if (context.toastModel.status === "success") {
            this.formUpdateUI(context);
          } else {
            this.formUpdateUI(context);
          }
        }
        if(context.action){
          if(context.action === this._operationName1){
            this.formUpdateUI({toastModel : {status : "success", message: "New Product Line Added Successfully"}});
            this.fetchProductLines();
            this.closePopup();
          }
          else if(context.action === this._operationName2){
            this.formUpdateUI({toastModel : {status : "success", message: "Product Line Updated Successfully"}});
            this.closePopup();
            this.fetchProductLines();
          }
          else if(context.action === this._operationName4){
            this.formUpdateUI({toastModel : {status : "success", message: "New Product Group Added Successfully"}});
            this.closePopup();
            this.fetchProductGroups();
          }
          else if(context.action === this._operationName5){
            this.formUpdateUI({toastModel : {status : "success", message: "Product Group Updated Successfully"}});
            this.closePopup();
            this.fetchProductGroups();
          }
          else if(context.action === this._operationName7){
            this.formUpdateUI({toastModel : {status : "success", message: "New Product Feature Added Successfully"}});
            this.closePopup();
            this.fetchFeatures();
          }
          else if(context.action === this._operationName8){
            this.formUpdateUI({toastModel : {status : "success", message: "Product Feature Updated Successfully"}});
            this.closePopup();
            this.fetchFeatures();
          }
        }
        if(context.productLines){
          this.setProductLines(context.productLines);
        }
        else if(context.rawResponse){
          var response = JSON.parse(context.rawResponse);
          if(response.productGroups){
            this.setProductGroups(response.productGroups);
          }
        } else if(context.productGroups){
           this.setProductGroups(context.productGroups);
        }
        else if(context.FeatureType){
          this.setFeatures(context.FeatureType);
        }
      }
    },

    resetFieldsOnPreShow: function() {
      this.view.searchBoxProductLine.tbxSearchBox.text = "";
      this.view.searchBoxProductLine.flxSearchCancel.setVisibility(false);
      this.view.searchBoxProductGroup.fonticonSearch.text = "";
      this.view.searchBoxProductGroup.flxSearchCancel.setVisibility(false);
      this.view.searchBoxProductFeature.tbxSearchBox.text = "";
      this.view.searchBoxProductFeature.flxSearchCancel.setVisibility(false);
      this.view.segProductLine.setData([]);
      this.view.flxNoResultFoundPL.setVisibility(true);
      this.view.segProductGroup.setData([]);
      this.view.flxNoResultFoundPG.setVisibility(true);
      this.view.segProductFeature.setData([]);
      this.view.flxNoResultFoundPF.setVisibility(true);      
    },

    showProductLines: function(){
      this.setProductTabVisibility(this.view.flxManageProductLine);
      this.changeTabSkin(this.view.flxTabProductLine);
      this.formUpdateUI({action : "setBreadCrumbText", text : "MANAGE PRODUCT LINES"});
      this.fetchProductLines();
    },

    showProductGroups: function(){
      this.setProductTabVisibility(this.view.flxManageProductGroup);
      this.changeTabSkin(this.view.flxTabProductGroup);
      this.formUpdateUI({action : "setBreadCrumbText", text : "MANAGE PRODUCT GROUPS"});
      this.setProductLineDropDown();
      this.fetchProductGroups();
    },

    setProductLines: function(productLines){
      var self = this, segData = [];
      segData = productLines.map(function(data){
        return {
          productLineId: data.productLineId,
          lblProductLine: {
            text: AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(data.productLineName).replace(/&/g,"&amp;"),
            skin: self._LblSegmentSkin
          },
          lblProductReference: {
            text: AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(data.productLineRef).replace(/&/g,"&amp;"),
            skin: self._LblSegmentSkin
          },
          lblEdit: {
            text: self.getStringFromi18n(self._SegmentEditIconTxt.text),
            skin: self._SegmentEditIconSkin
          },
          lblSeparator: {
            text: "-",
            skin: self._SegmentSeparatorSkin
          },
          flxEdit: {
            isVisible: self.config2,
            onClick: self.showEditProfileLine
          }
        };
      });
      this.view.lblProductLineCount.text = segData.length + " ";
      this.productLineSegList = segData;
      this.sortBy = SortingFormExtn.getObjectSorter("lblProductLine.text");
      segData = this.searchProduct(this.view.searchBoxProductLine.tbxSearchBox.text, "lblProductLine", this.productLineSegList, this.view.searchBoxProductLine);
      this.setSegmentData(segData, this.view.segProductLine, this.view.flxNoResultFoundPL);
      this.resetSortIconsProductLine();
      this.view.forceLayout();
    },

    resetProductLineFieldsSkin: function(){
      this.view.txtProductLineName.skin = this._PopupTextBoxSkin;
      this.view.ProductLineNameError.setVisibility(false);
      this.view.txtProductLineReference.skin = this._PopupTextBoxSkin;
      this.view.txtProductLineReference.setEnabled(true);
      this.view.ProductLineRefError.setVisibility(false);
    },

    showAddProductLine: function(){
      this.resetProductLineFieldsSkin();
      this.view.flxPopup.setVisibility(true);
      this.view.flxAddProductLine.setVisibility(true);
      this.view.lblAddProductLinePopupTopHeader.text = this.getStringFromi18n(this._PopupAddProductLineTopHeaderTxt);
      this.view.txtProductLineName.text = "";
      this.view.txtProductLineReference.text = "";
      this.view.btnAddProductLine.text = this.getStringFromi18n(this._PopupAddProductLineBtnTxt);
      this.view.btnAddProductLine.width = this.getStringFromi18n(this._PopupAddProductLineBtnWidth);
      this.isEdit = false;
      this.alignProductPopup();
    },

    showEditProfileLine: function(){
      this.resetProductLineFieldsSkin();
      this.view.lblAddProductLinePopupTopHeader.text = this.getStringFromi18n(this._PopupEditProductLineTopHeaderTxt);
      var selItems = this.view.segProductLine.selectedItems[0];
      this.view.txtProductLineName.text = selItems.lblProductLine.text.replace(/&amp;/g,"&");
      this.view.txtProductLineReference.text = selItems.lblProductReference.text.replace(/&amp;/g,"&");
      this.view.btnAddProductLine.text = this.getStringFromi18n(this._PopupEditProductLineBtnTxt);
      this.view.btnAddProductLine.width = this.getStringFromi18n(this._PopupEditProductLineBtnWidth);
      this.view.txtProductLineReference.skin = this._PopupTextBoxDisabledSkin;
      this.view.txtProductLineReference.setEnabled(false);
      this.isEdit = true;
      this.view.flxPopup.setVisibility(true);
      this.view.flxAddProductLine.setVisibility(true);
      this.alignProductPopup();
    },

    createEditProductLines: function(){
      if(this.validateProductLinesFields()){
        var payload = {
          "productLineName" : this.view.txtProductLineName.text,
          "productLineRef" : this.view.txtProductLineReference.text
        };
        if(this.isEdit)
          this.manageProductsDAO.productOperations(this._objSeviceName2, this._objName2, this._operationName2, payload, this.willUpdateUI);
        else
          this.manageProductsDAO.productOperations(this._objSeviceName1, this._objName1, this._operationName1, payload, this.willUpdateUI);
      }
    },

    validateProductLinesFields: function(){
      var hasValidFields = true;
      if(this.view.txtProductLineName.text.trim() === ""){
        this.view.txtProductLineName.skin = this._PopupTextBoxErrSkin;
        this.view.ProductLineNameError.setVisibility(true);
        hasValidFields = false;
      }
      if(this.view.txtProductLineReference.text.trim() === ""){
        this.view.txtProductLineReference.skin = this._PopupTextBoxErrSkin;
        this.view.ProductLineRefError.setVisibility(true);
        hasValidFields = false;
      }
      return hasValidFields;
    },

    setProductLineDropDown: function(){
      this.view.lstbxAssociatedProductLine.skin = this._PopupListBoxSkin;
      var productLineMasterData = [["lb0", this.getStringFromi18n(this._PopupListBoxProductLinePlaceholderTxt)]];
      for(var i = 0; i < this.productLineSegList.length; i++){
        productLineMasterData.push([this.productLineSegList[i].lblProductReference.text, this.productLineSegList[i].lblProductLine.text]);
      }
      this.view.lstbxAssociatedProductLine.masterData = productLineMasterData;
      this.view.lstbxAssociatedProductLine.selectedKey = "lb0";
    },

    setProductGroups: function(productGroups){
      var self = this, segData = [];
      segData = productGroups.map(function(data){
        var productLineName = AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(self.getProdLineNameFrmLineID(data.productLineId));
        var prodGroupName = AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(data.productGroupName).replace(/&/g,"&amp;");
        var prodGroupRef = AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(data.productGroupRef).replace(/&/g,"&amp;");
        return {
          flxProductGroup:{
            skin: "hoverhandSkin"
          },
          lblProductGroup: {
            tooltip: prodGroupName,
            text: AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getTruncatedString(prodGroupName, 25, 25),
            skin: self._LblSegmentSkin
          },
          lblProductLine: {
            tooltip: productLineName,
            text: AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getTruncatedString(productLineName, 25, 25),
            skin: self._LblSegmentSkin
          },
          lblGroupReference: {
            tooltip: prodGroupRef,
            text: AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getTruncatedString(prodGroupRef, 25, 25),
            skin: self._LblSegmentSkin
          },
          lblEdit: {
            text: self.getStringFromi18n(self._SegmentEditIconTxt.text),
            skin: self._SegmentEditIconSkin
          },
          lblSeparator: {
            text: "-",
            skin: self._SegmentSeparatorSkin
          },
          flxEdit: {
            isVisible: true,
            onClick: self.showEditProductGroup
          },
          productGroupId: data.productGroupId,
          productLineId: data.productLineId,
          productLineRef: data. productLineRef,
          description: AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(data.description),
          detailedDesc: AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(data.detailedDesc),
          imageDetails: data.imageDetails,
        };
      });
      this.view.lblProductGroupCount.text = segData.length + " ";
      this.productGroupSegList = segData;
      this.sortBy = SortingFormExtn.getObjectSorter("lblProductGroup.text");
      segData = this.searchProduct(this.view.searchBoxProductGroup.tbxSearchBox.text, "lblProductGroup", this.productGroupSegList, this.view.searchBoxProductGroup);
      this.setSegmentData(segData, this.view.segProductGroup, this.view.flxNoResultFoundPG);
      this.resetSortIconsProductGroup();
      this.view.forceLayout();
    },

    getProdLineNameFrmLineID: function(id){
      var productLine = this.productLineSegList.filter(function (data) {
        if(data.productLineId === id){
          return data;
        }
      });
      if(productLine.length > 0)
        return productLine[0].lblProductLine.text;
      else
        return "N/A";
    },

    populateGroupDetailsPopup: function() {
      var self = this;
      var selItems = this.view.segProductGroup.selectedItems[0];
      this.view.lbViewProductGroupPopupHeader.text = selItems.lblProductGroup.text;
      this.view.lblViewAssociatedProductLine.text = selItems.lblProductLine.text;
      this.view.lblViewProductGroupRef.text = selItems.lblGroupReference.text;
      this.view.lblViewProductGroupDesc.text = selItems.description || "N/A";
      this.view.lblViewProductGroupDetailedDesc.text = selItems.detailedDesc || "N/A";
      var segData = [];
      if(selItems.imageDetails){
        segData = selItems.imageDetails.map(function(data){
          return {
            lblImgType: {
              left : "12px",
              text: data.imageType,
              skin: self._LblSegmentSkin
            },
            lblImgUrl: {
              left : "26%",
              text: data.imageUrl,
              skin: self._LblSegmentSkin
            },
            lblSeparator: {
              text: "-",
              skin: self._SegmentSeparatorSkin
            },
          };
        });
      }
      this.setSegmentData(segData, this.view.segViewImgDetails, this.view.flxNoResultFoundImgDetails);
      this.view.flxPopup.setVisibility(true);
      this.view.flxViewProductGroup.setVisibility(true);
      this.alignProductPopup();
    },

    resetProductGroupFieldsSkin: function(){
      this.view.txtProductGroupName.skin = this._PopupTextBoxSkin;
      this.view.ProductGroupNameError.setVisibility(false);
      this.view.lstbxAssociatedProductLine.skin = this._PopupListBoxSkin;
      this.view.lstbxAssociatedProductLine.setEnabled(true);
      this.view.AssociatedProductLineError.setVisibility(false);
      this.view.txtProductGroupRef.skin = this._PopupTextBoxSkin;
      this.view.txtProductGroupRef.setEnabled(true);
      this.view.ProductGroupRefError.setVisibility(false);
    },

    showAddProductGroup: function(){
      this.isEdit = false;
      this.resetProductGroupFieldsSkin();
      this.view.lblAddProductGroupPopupHeader.text = this.getStringFromi18n(this._PopupAddProductGrpTopHeaderTxt);
      this.view.txtProductGroupName.text = "";
      this.view.lstbxAssociatedProductLine.selectedKey = "lb0";
      this.view.txtProductGroupRef.text = "";
      this.view.txtProductGroupDesc.text = "";
      this.view.txtProductGroupDetailedDesc.text = "";
      this.view.segImgDetails.setData([]);
      this.addImgTypeURLField("Banner", "");
      this.view.btnAddProductGroup.text = this.getStringFromi18n(this._PopupAddProductGrpBtnTxt);
      this.view.btnAddProductGroup.width = this.getStringFromi18n(this._PopupAddProductGrpBtnWidth);
      this.view.flxPopup.setVisibility(true);
      this.view.flxAddProductGroup.setVisibility(true);
      this.alignProductPopup();
    },

    showEditProductGroup: function(){
      this.isEdit = true;
      this.resetProductGroupFieldsSkin();
      var selItems = this.view.segProductGroup.selectedItems[0];
      this.view.lblAddProductGroupPopupHeader.text = this.getStringFromi18n(this._PopupEditProductGrpTopHeaderTxt);
      this.view.txtProductGroupName.text = selItems.lblProductGroup.tooltip.replace(/&amp;/g,"&") || selItems.lblProductGroup.text.replace(/&amp;/g,"&");
      this.view.lstbxAssociatedProductLine.selectedKey = selItems.productLineRef;
      this.view.txtProductGroupRef.text = selItems.lblGroupReference.tooltip.replace(/&amp;/g,"&") || selItems.lblGroupReference.text.replace(/&amp;/g,"&");
      this.view.txtProductGroupDesc.text = selItems.description;
      this.view.txtProductGroupDetailedDesc.text = selItems.detailedDesc;
      this.view.segImgDetails.setData([]);
      for(var i = 0; i<selItems.imageDetails.length; i++)
        this.addImgTypeURLField(selItems.imageDetails[i].imageType, selItems.imageDetails[i].imageUrl);
      this.view.lstbxAssociatedProductLine.skin = this._PopupListBoxDisabledSkin;
      this.view.lstbxAssociatedProductLine.setEnabled(false);
      this.view.txtProductGroupRef.skin = this._PopupTextBoxDisabledSkin;
      this.view.txtProductGroupRef.setEnabled(false);
      this.view.btnAddProductGroup.text = this.getStringFromi18n(this._PopupEditProductGrpBtnTxt);
      this.view.btnAddProductGroup.width = this.getStringFromi18n(this._PopupEditProductGrpBtnWidth);
      this.view.flxPopup.setVisibility(true);
      this.view.flxAddProductGroup.setVisibility(true);
      this.alignProductPopup();
    },

    addImgTypeURLField: function(imageType, imageURL){
      var self = this;
      var data = {
        lstbxImgType: {
          masterData: this.getImgTypeMasterData(),
          selectedKey: imageType,
          skin: self._PopupListBoxSkin,
        },
        flxImgTypeError: {
          isVisible: false
        },
        txtImgURL: {
          text: imageURL,
          skin: self._PopupTextBoxSkin,
          placeholder: this.getStringFromi18n(this._PopupTextBoxImgUrlPlaceholderTxt),
          onKeyUp: function(){
            var index = self.view.segImgDetails.selectedRowIndex[1];
            var selItems = self.view.segImgDetails.selectedItems[0];
            if(selItems.flxImgURLError.isVisible){
              selItems.txtImgURL.skin = self._PopupTextBoxSkin;
              selItems.flxImgURLError.isVisible = false;
              self.view.segImgDetails.setDataAt(selItems, index);
              self.view.forceLayout();
            }
          }
        },
        flxImgURLError: {
          isVisible: false
        },
        lblImgURLErrorText: {
          text: "error message"
        },
        flxDelete: {
          isVisible: true,
          onClick: function(){
            var index = self.view.segImgDetails.selectedIndex[1];
            var segData = self.view.segImgDetails.data;
            segData.splice(index,1);
            self.view.segImgDetails.setData(segData);
            self.view.forceLayout();
          }
        },
        lblDelete: {
          text: self.getStringFromi18n(self._AddImgFieldDeleteIconTxt.text),
          skin: self._AddImgFieldDeleteIconSkin
        }
      };
      this.view.segImgDetails.addDataAt(data, this.view.segImgDetails.data.length);
      this.view.forceLayout();
    },

    getImgTypeMasterData: function() {
      return this.imageTypeDetailsJsonArray.map(function(data){
        return [data.imageType, data.lstBoxText];
      });
    },

    getImgDetails: function() {
      var self = this, imgList = [];
      this.view.segImgDetails.data.forEach(function(data){
        var imageDetail = JSON.parse(JSON.stringify(self.imageTypeDetailsJsonArray.filter(function(data1) {
          if (data1.imageType === data.lstbxImgType.selectedKey) {
            return data1;
          }
        })[0]));
        delete imageDetail['lstBoxText']; 
        if(data.txtImgURL.text.trim() !== ""){
          imageDetail.imageUrl = data.txtImgURL.text;
          imgList.push(imageDetail);
        }
      });
      return imgList;
    },

    validateImgUrls: function(){
      var self = this;
      var hasValidImgUrls = true;
      var segData = this.view.segImgDetails.data;
      segData.forEach(function(data){
        var imgUrl = data.txtImgURL.text.trim();
        if(imgUrl.indexOf("http:") === 0){
          data.txtImgURL.skin = "skinredbg";
          data.flxImgURLError.isVisible = true;
          data.lblImgURLErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorTargetURLHttp");
          hasValidImgUrls = false;   
        } else if(!self.imageValidationRegex.test(imgUrl)){
          data.txtImgURL.skin = "skinredbg";
          data.flxImgURLError.isVisible = true;
          data.lblImgURLErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorImageExtension");
          hasValidImgUrls = false;
        }
      });
      this.view.segImgDetails.setData(segData);
      return hasValidImgUrls;
    },

    validateProductGroupFields: function(){
      var hasValidFields = true;
      if(this.view.lstbxAssociatedProductLine.selectedKey === "lb0"){
        this.view.lstbxAssociatedProductLine.skin = this._PopupListBoxErrSkin;
        this.view.AssociatedProductLineError.setVisibility(true);
        hasValidFields = false;
      }
      if(this.view.txtProductGroupRef.text.trim() === ""){
        this.view.txtProductGroupRef.skin = this._PopupTextBoxErrSkin;
        this.view.ProductGroupRefError.setVisibility(true);
        hasValidFields = false;
      }
      if(this.view.txtProductGroupName.text.trim() === ""){
        this.view.txtProductGroupName.skin = this._PopupTextBoxErrSkin;
        this.view.ProductGroupNameError.setVisibility(true);
        hasValidFields = false;
      }
      //hasValidFields = this.validateImgUrls();
      return hasValidFields;
    },

    createEditProductGroups: function(){
      if(this.validateProductGroupFields()){
        var payload = {
          "productLineRef": this.view.lstbxAssociatedProductLine.selectedKey,
          "productGroupRef": this.view.txtProductGroupRef.text,
          "productGroupName": this.view.txtProductGroupName.text,
          "detailedDesc": this.view.txtProductGroupDetailedDesc.text,
          "description": this.view.txtProductGroupDesc.text,
          "imageDetails": this.getImgDetails()
        };
        if(this.isEdit)
          this.manageProductsDAO.productOperations(this._objSeviceName5, this._objName5, this._operationName5, payload, this.willUpdateUI);
        else
          this.manageProductsDAO.productOperations(this._objSeviceName4, this._objName4, this._operationName4, payload, this.willUpdateUI);
      }
    },

    setFeatures: function(features){
      var self = this, segData = [];
      segData = features.map(function(data){
        return {
          flxProductFeature:{
            skin: "hoverhandSkin"
          },
          lblName: {
            left: "10px",
            tooltip: data.featureName,
            text: AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getTruncatedString(data.featureName, 25, 25),
            skin: self._LblSegmentSkin
          },
          lblGroup: {
            left: "30%",
            tooltip: data.featureGroup,
            text: AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getTruncatedString(data.featureGroup, 25, 25),
            skin: self._LblSegmentSkin
          },
          lblType: {
            left: "66%",
            tooltip: data.featureType,
            text: AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getTruncatedString(data.featureType, 25, 25),
            skin: self._LblSegmentSkin
          },
          lblEdit: {
            text: self.getStringFromi18n(self._SegmentEditIconTxt.text),
            skin: self._SegmentEditIconSkin
          },
          lblSeparator: {
            text: "-",
            skin: self._SegmentSeparatorSkin
          },
          flxEdit: {
            isVisible: true,
            onClick: self.showEditFeature
          },
          description: data.detailedDesc,
        };
      });
      this.view.lblProductFeatureCount.text = segData.length + " ";
      this.featureSegList = segData;
      this.sortBy = SortingFormExtn.getObjectSorter("lblName.text");
      segData = this.searchProduct(this.view.searchBoxProductFeature.tbxSearchBox.text, "lblName", this.featureSegList, this.view.searchBoxProductFeature);
      this.setSegmentData(segData, this.view.segProductFeature, this.view.flxNoResultFoundPF);
      this.resetSortIconsFeature();
      this.view.forceLayout();
    },

    populateFeatureDeatilsPopup: function() {
      var selItems = this.view.segProductFeature.selectedItems[0];
      this.view.lblFeatureName.text = this.view.lblSeparatorViewFeatureHeader.text = selItems.lblName.text; 
      this.view.lblFeatureGroup.text = selItems.lblGroup.text;
      this.view.lblFeatureType.text = selItems.lblType.text;
      this.view.lblFeatureDescription.text = selItems.description || "N/A";
      this.view.flxPopup.setVisibility(true);
      this.view.flxViewFeature.setVisibility(true);
      this.alignProductPopup();
    },

    resetFeatureFieldsSkin: function(){
      this.view.txtFeatureName.skin = this._PopupTextBoxSkin;
      this.view.FeatureNameError.setVisibility(false);
      this.view.txtFeatureGroup.skin = this._PopupTextBoxSkin;
      this.view.FeatureGroupError.setVisibility(false);
      this.view.txtFeatureType.skin = this._PopupTextBoxSkin;
      this.view.txtFeatureType.setEnabled(true);
      this.view.FeatureTypeError.setVisibility(false);
    },

    showAddFeature: function(){
      this.isEdit = false;
      this.resetFeatureFieldsSkin();
      this.view.lblAddFeaturePopupHeader.text = this.getStringFromi18n(this._PopupAddFeatureTopHeaderTxt);
      this.view.txtFeatureName.text = "";
      this.view.txtFeatureGroup.text = "";
      this.view.txtFeatureType.text = "";
      this.view.txtFeatureDescription.text = "";
      this.view.btnAddFeature.text = this.getStringFromi18n(this._PopupAddFeatureBtnTxt);
      this.view.btnAddFeature.width = this.getStringFromi18n(this._PopupAddFeatureBtnWidth);
      this.view.flxPopup.setVisibility(true);
      this.view.flxAddFeature.setVisibility(true);
      this.alignProductPopup();
    },

    showEditFeature: function(){
      this.isEdit = true;
      this.resetFeatureFieldsSkin();
      this.view.lblAddFeaturePopupHeader.text = this.getStringFromi18n(this._PopupEditFeatureTopHeaderTxt);
      var selItems = this.view.segProductFeature.selectedItems[0];
      this.view.txtFeatureName.text = selItems.lblName.tooltip || selItems.lblName.text; 
      this.view.txtFeatureGroup.text = selItems.lblGroup.tooltip || selItems.lblGroup.text;
      this.view.txtFeatureType.text = selItems.lblType.tooltip || selItems.lblType.text;
      this.view.txtFeatureDescription.text = selItems.description;
      this.view.txtFeatureType.skin = this._PopupTextBoxDisabledSkin;
      this.view.txtFeatureType.setEnabled(false);
      this.view.btnAddFeature.text = this.getStringFromi18n(this._PopupEditFeatureBtnTxt);
      this.view.btnAddFeature.width = this.getStringFromi18n(this._PopupEditFeatureBtnWidth);
      this.view.flxPopup.setVisibility(true);
      this.view.flxAddFeature.setVisibility(true);
      this.alignProductPopup();
    },

    createEditFeatures: function(){
      if(this.validateFeatursFields()){
        var payload = {
          "featureType" : this.view.txtFeatureType.text,
          "featureName" : this.view.txtFeatureName.text,
          "featureGroup" : this.view.txtFeatureGroup.text,
          "detailedDesc" : this.view.txtFeatureDescription.text
        };
        if(this.isEdit)
          this.manageProductsDAO.productOperations(this._objSeviceName8, this._objName8, this._operationName8, payload, this.willUpdateUI);
        else
          this.manageProductsDAO.productOperations(this._objSeviceName7, this._objName7, this._operationName7, payload, this.willUpdateUI);
      }
    },

    validateFeatursFields: function(){
      var hasValidFields = true;
      if(this.view.txtFeatureName.text.trim() === ""){
        this.view.txtFeatureName.skin = this._PopupTextBoxErrSkin;
        this.view.FeatureNameError.setVisibility(true);
        hasValidFields = false;
      }
      if(this.view.txtFeatureGroup.text.trim() === ""){
        this.view.txtFeatureGroup.skin = this._PopupTextBoxErrSkin;
        this.view.FeatureGroupError.setVisibility(true);
        hasValidFields = false;
      }
      if(this.view.txtFeatureType.text.trim() === ""){
        this.view.txtFeatureType.skin = this._PopupTextBoxErrSkin;
        this.view.FeatureTypeError.setVisibility(true);
        hasValidFields = false;
      }
      return hasValidFields;
    },

    changeTabSkin: function(widget) {
      this.view.flxTabProductLine.skin = this._ProductTabSkinUnSelect;
      this.view.flxTabProductGroup.skin = this._ProductTabSkinUnSelect;
      widget.skin = this._ProductTabSkinOnSelect;
      this.view.forceLayout();
    },

    setProductTabVisibility: function(widget) {
      this.view.flxManageProductLine.setVisibility(false);
      this.view.flxManageProductGroup.setVisibility(false);
      this.view.flxManageProductFeature.setVisibility(false);
      widget.setVisibility(true);
      this.view.forceLayout();
    },

    alignProductPopup: function() {
      if(this.formUpdateUI){
        this.view.flxManageProducts.left = "340px";
        this.view.flxManageProducts.right = "35px";
        this.view.flxManageProducts.top = "146px";
        this.view.forceLayout();
        this.formUpdateUI({action : "alignProductPopup", openPopup : true, flxProduct : "flxManageProducts"});
      }
    },

    closePopup: function() {
      this.view.flxAddProductLine.setVisibility(false);
      this.view.flxAddProductGroup.setVisibility(false);
      this.view.flxAddFeature.setVisibility(false);
      this.view.flxViewProductGroup.setVisibility(false);
      this.view.flxViewFeature.setVisibility(false);
      this.view.flxPopup.setVisibility(false);
      if(this.formUpdateUI)
        this.formUpdateUI({action : "alignProductPopup", openPopup : false, flxProduct : "flxManageProducts"});
      this.view.flxManageProducts.left = "0px";
      this.view.flxManageProducts.right = "0px";
      this.view.flxManageProducts.top = "0px";
      this.view.forceLayout();
    },

    setSegmentData: function(data, segment, flxNoResult){
      flxNoResult.setVisibility(data.length === 0);
      segment.setVisibility(data.length > 0);
      segment.setData(data);
      this.view.forceLayout();
    },

    searchProduct: function(text, column, segList, searchBox) {
      if (text === "") {
        searchBox.tbxSearchBox.text="";
        searchBox.flxSearchCancel.setVisibility(false);
        searchBox.flxSearchContainer.skin = this._flxSearchBoxSkin; 
      }
      else {
        searchBox.flxSearchContainer.skin = this._flxSearchBoxOnFocusSkin;
        searchBox.flxSearchCancel.setVisibility(true);
      }
      var segData = segList.filter(function(data) {
        var searchText = searchBox.tbxSearchBox.text;
        if(typeof searchText === 'string' && searchText.length > 0){
          return data[column].text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
        } else{
          return true;
        }
      });
      if(this.sortBy){
        return segData.sort(this.sortBy.sortData);
      }
      else{
        return segData;
      }
    },

    sortProductList : function (sortColumn, segment, resetIcon) {
      var segData = segment.data;
      this.sortBy.column(sortColumn);
      segData = segData.sort(this.sortBy.sortData);
      resetIcon();
      segment.setData(segData);
    },

    resetSortIconsProductLine : function() {
      SortingFormExtn.determineSortFontIcon(this.sortBy,'lblProductLine.text',this.view.fontIconOptionsProductLine);
      SortingFormExtn.determineSortFontIcon(this.sortBy,'lblProductReference.text',this.view.fontIconOptionsProductReference);
    },

    resetSortIconsProductGroup : function() {
      SortingFormExtn.determineSortFontIcon(this.sortBy,'lblProductGroup.text',this.view.fontIconOptionsProductGroup);
      SortingFormExtn.determineSortFontIcon(this.sortBy,'lblProductLine.text',this.view.fontIconOptionsGroupReference);
      SortingFormExtn.determineSortFontIcon(this.sortBy,'lblGroupReference.text',this.view.fontIconOptionsProductLinePG);
    },

    resetSortIconsFeature : function() {
      SortingFormExtn.determineSortFontIcon(this.sortBy,'lblName.text',this.view.fontIconOptionsFeatureName);
      SortingFormExtn.determineSortFontIcon(this.sortBy,'lblGroup.text',this.view.fontIconOptionsFeatureGroup);
      SortingFormExtn.determineSortFontIcon(this.sortBy,'lblType.text',this.view.fontIconOptionsFeatureType);
    },

    getProductLinesGroupsFeatures: function() {
      this.showProductLines();
      this.fetchProductGroups();
      //this.fetchFeatures(); 
    },

    fetchProductLines: function() {
      this.manageProductsDAO.productOperations(this._objSeviceName, this._objName, this._operationName, "", this.willUpdateUI);
    },

    fetchProductGroups: function() {
      this.manageProductsDAO.productOperations(this._objSeviceName3, this._objName3, this._operationName3, "", this.willUpdateUI);
    },

    fetchFeatures: function() {
      this.manageProductsDAO.productOperations(this._objSeviceName6, this._objName6, this._operationName6, "", this.willUpdateUI);
    },

    getStringFromi18n: function(value){
      return  kony.i18n.getLocalizedString(value) ? kony.i18n.getLocalizedString(value) : value;
    },

    setPropertiesValueToWidget: function(){
      this.view.flxManageProducts.skin = this._MainPageBgSkin;
      //Product Tab Properties Initialize
      this.view.flxTabProductLine.skin = this._ProductTabSkinOnSelect;  
      this.view.flxTabProductGroup.skin = this._ProductTabSkinUnSelect;
      this.view.lblProductLineTab.skin = this._ProductTabLblNameSkin;
      this.view.lblProductGroupTab.skin = this._ProductTabLblNameSkin;
      this.view.lblProductLineCount.skin = this._ProductTabLblCountSkin;
      this.view.lblProductGroupCount.skin = this._ProductTabLblCountSkin;
      this.view.lblProductLineTab.text = this.getStringFromi18n(this._ProductLineTabLblNameTxt);
      this.view.lblProductGroupTab.text = this.getStringFromi18n(this._ProductGroupTabLblNameTxt);
      //Product Header Properties Initialize
      this.view.lblProductLineTopHeader.text = this.getStringFromi18n(this._ProductLineTopHeaderTxt);
      this.view.lblProductGroupTopHeader.text = this.getStringFromi18n(this._ProductGroupTopHeaderTxt);
      this.view.lblProductFeaureTopHeader.text = this.getStringFromi18n(this._ProductFeatureTopHeaderTxt);
      this.view.lblProductLineTopHeader.skin = this._ProductTopHeaderSkin;
      this.view.lblProductGroupTopHeader.skin = this._ProductTopHeaderSkin;
      this.view.lblProductFeaureTopHeader.skin = this._ProductTopHeaderSkin;
      //Add Product Button Properties Initialize
      this.view.btnAddProductLines.text = this.getStringFromi18n(this._AddLineProductBtnTxt);
      this.view.btnAddProductGroups.text = this.getStringFromi18n(this._AddGroupProductBtnTxt);
      this.view.btnAddProductFeatures.text = this.getStringFromi18n(this._AddFeatureProductBtnTxt);
      this.view.btnAddProductLines.skin = this._AddProductBtnSkin;
      this.view.btnAddProductGroups.skin = this._AddProductBtnSkin;
      this.view.btnAddProductFeatures.skin = this._AddProductBtnSkin;
      this.view.btnAddProductLines.width = this.getStringFromi18n(this._AddLineProductBtnWidth);
      this.view.btnAddProductGroups.width = this.getStringFromi18n(this._AddGroupProductBtnWidth);
      this.view.btnAddProductFeatures.width = this.getStringFromi18n(this._AddFeatureProductBtnWidth);
      //Product Search Properties Initialize
      this.view.searchBoxProductLine.flxSearchContainer.skin = this._flxSearchBoxSkin;
      this.view.searchBoxProductGroup.flxSearchContainer.skin = this._flxSearchBoxSkin;
      this.view.searchBoxProductFeature.flxSearchContainer.skin = this._flxSearchBoxSkin;
      this.view.searchBoxProductLine.tbxSearchBox.skin = this._SeachTxtBoxSkin;
      this.view.searchBoxProductGroup.tbxSearchBox.skin = this._SeachTxtBoxSkin;
      this.view.searchBoxProductFeature.tbxSearchBox.skin = this._SeachTxtBoxSkin;
      this.view.searchBoxProductLine.fonticonSearch.text = this.getStringFromi18n(this._IconSearchTxt.text);
      this.view.searchBoxProductGroup.fonticonSearch.text = this.getStringFromi18n(this._IconSearchTxt.text);
      this.view.searchBoxProductFeature.fonticonSearch.text = this.getStringFromi18n(this._IconSearchTxt.text);
      this.view.searchBoxProductLine.fonticonClose.text = this.getStringFromi18n(this._IconSearchClearTxt.text);
      this.view.searchBoxProductGroup.fonticonClose.text = this.getStringFromi18n(this._IconSearchClearTxt.text);
      this.view.searchBoxProductFeature.fonticonClose.text = this.getStringFromi18n(this._IconSearchClearTxt.text);
      this.view.searchBoxProductLine.fonticonSearch.skin = this._IconSearchSkin;
      this.view.searchBoxProductGroup.fonticonSearch.skin = this._IconSearchSkin;
      this.view.searchBoxProductFeature.fonticonSearch.skin = this._IconSearchSkin;
      this.view.searchBoxProductLine.fonticonClose.skin = this._IconSearchSkin;
      this.view.searchBoxProductGroup.fonticonClose.skin = this._IconSearchSkin;
      this.view.searchBoxProductFeature.fonticonClose.skin = this._IconSearchSkin;
      this.view.searchBoxProductLine.tbxSearchBox.placeholder = this.getStringFromi18n(this._SeachTxtBoxPlaceholder1Txt);
      this.view.searchBoxProductGroup.tbxSearchBox.placeholder = this.getStringFromi18n(this._SeachTxtBoxPlaceholder2Txt);
      this.view.searchBoxProductFeature.tbxSearchBox.placeholder = this.getStringFromi18n(this._SeachTxtBoxPlaceholder3Txt);
      //Product Segment Header Properties Initialize
      this.view.lblProductLineHeader.skin = this._LblSegmentHeaderSkin;
      this.view.lblProductReferenceHeader.skin = this._LblSegmentHeaderSkin;
      this.view.lblProductGroupHeader.skin = this._LblSegmentHeaderSkin;
      this.view.lblProductGroupReferenceHeader.skin = this._LblSegmentHeaderSkin;
      this.view.lblProductLineHeaderPG.skin = this._LblSegmentHeaderSkin;
      this.view.lblFeatureNameHeader.skin = this._LblSegmentHeaderSkin;
      this.view.lblFeatureGroupHeader.skin = this._LblSegmentHeaderSkin;
      this.view.lblFeatureTypeHeader.skin = this._LblSegmentHeaderSkin;
      this.view.fontIconOptionsProductLine.skin = this._IconSortSkin;
      this.view.fontIconOptionsProductReference.skin = this._IconSortSkin;
      this.view.fontIconOptionsProductGroup.skin = this._IconSortSkin;
      this.view.fontIconOptionsGroupReference.skin = this._IconSortSkin;
      this.view.fontIconOptionsProductLinePG.skin = this._IconSortSkin;
      this.view.fontIconOptionsFeatureName.skin = this._IconSortSkin;
      this.view.fontIconOptionsFeatureGroup.skin = this._IconSortSkin;
      this.view.fontIconOptionsFeatureType.skin = this._IconSortSkin;
      this.view.fontIconOptionsProductLine.text = this.getStringFromi18n(this._IconSortTxt.text);
      this.view.fontIconOptionsProductReference.text = this.getStringFromi18n(this._IconSortTxt.text);
      this.view.fontIconOptionsProductGroup.text = this.getStringFromi18n(this._IconSortTxt.text);
      this.view.fontIconOptionsGroupReference.text = this.getStringFromi18n(this._IconSortTxt.text);
      this.view.fontIconOptionsProductLinePG.text = this.getStringFromi18n(this._IconSortTxt.text);
      this.view.fontIconOptionsFeatureName.text = this.getStringFromi18n(this._IconSortTxt.text);
      this.view.fontIconOptionsFeatureGroup.text = this.getStringFromi18n(this._IconSortTxt.text);
      this.view.fontIconOptionsFeatureType.text = this.getStringFromi18n(this._IconSortTxt.text);
      this.view.lblProductLineHeader.text = this.getStringFromi18n(this._LblSegmentHeader1Txt);
      this.view.lblProductReferenceHeader.text = this.getStringFromi18n(this._LblSegmentHeader2Txt);
      this.view.lblProductGroupHeader.text = this.getStringFromi18n(this._LblSegmentHeader3Txt);
      this.view.lblProductGroupReferenceHeader.text = this.getStringFromi18n(this._LblSegmentHeader4Txt);
      this.view.lblProductLineHeaderPG.text = this.getStringFromi18n(this._LblSegmentHeader5Txt);
      this.view.lblFeatureNameHeader.text = this.getStringFromi18n(this._LblSegmentHeader6Txt);
      this.view.lblFeatureGroupHeader.text = this.getStringFromi18n(this._LblSegmentHeader7Txt);
      this.view.lblFeatureTypeHeader.text = this.getStringFromi18n(this._LblSegmentHeader8Txt);
      this.view.lblSeparatorSearchPL.skin = this._SegmentSeparatorSkin;
      this.view.lblSeparatorHeaderPL.skin = this._HeaderSeparatorSkin;
      this.view.lblSeparatorSearchPG.skin = this._SegmentSeparatorSkin;
      this.view.lblSeparatorHeaderPG.skin = this._HeaderSeparatorSkin;
      this.view.lblSeparatorSearchPF.skin = this._SegmentSeparatorSkin;
      this.view.lblSeparatorHeaderPF.skin = this._HeaderSeparatorSkin;
      //Product Popup Properties Initialize
      this.view.flxPopup.skin = this._PopupContinerTranslucentBgSkin;
      this.view.flxAddProductLine.skin = this._PopupMainBgSkin;
      this.view.flxAddProductGroup.skin = this._PopupMainBgSkin;
      this.view.flxViewProductGroup.skin = this._PopupMainBgSkin;
      this.view.flxAddFeature.skin = this._PopupMainBgSkin;
      this.view.flxViewFeature.skin = this._PopupMainBgSkin;
      this.view.flxAddProductLinePopupTopBar.skin = this._PopupTopBarSkin;
      this.view.flxAddProductGroupPopupTopBar.skin = this._PopupTopBarSkin;
      this.view.flxViewProductGroupTopBar.skin = this._PopupTopBarSkin;
      this.view.flxAddFeaturePopupTopBar.skin = this._PopupTopBarSkin;
      this.view.flxViewFeaturePopupTopBar.skin = this._PopupTopBarSkin;
      this.view.lblAddProductLinePopupClose.skin = this._PopupCloseIconSkin;
      this.view.lblAddProductGroupPopupClose.skin = this._PopupCloseIconSkin;
      this.view.lblViewPGPopupClose.skin = this._PopupCloseIconSkin;
      this.view.lblAddFeaturePopupClose.skin = this._PopupCloseIconSkin;
      this.view.lblViewFeaturePopupClose.skin = this._PopupCloseIconSkin;
      this.view.lblAddProductLinePopupClose.text = this.getStringFromi18n(this._PopupCloseIconTxt.text);
      this.view.lblAddProductGroupPopupClose.text = this.getStringFromi18n(this._PopupCloseIconTxt.text);
      this.view.lblViewPGPopupClose.text = this.getStringFromi18n(this._PopupCloseIconTxt.text);
      this.view.lblAddFeaturePopupClose.text = this.getStringFromi18n(this._PopupCloseIconTxt.text);
      this.view.lblViewFeaturePopupClose.text = this.getStringFromi18n(this._PopupCloseIconTxt.text);
      //Product Popup Button Properties Initialize
      this.view.btnAddProductLineCancel.skin = this._PopupCancelBtnSkin;
      this.view.btnAddProductLineCancel.hoverSkin = this._PopupCancelBtnSkinHover;
      this.view.btnAddProductGroupCancel.skin = this._PopupCancelBtnSkin;
      this.view.btnAddProductGroupCancel.hoverSkin = this._PopupCancelBtnSkinHover;
      this.view.btnAddFeatureCancel.skin = this._PopupCancelBtnSkin;
      this.view.btnAddFeatureCancel.hoverSkin = this._PopupCancelBtnSkinHover;
      this.view.btnAddProductLineCancel.width = this.getStringFromi18n(this._PopupCancelBtnWidth);
      this.view.btnAddProductGroupCancel.width = this.getStringFromi18n(this._PopupCancelBtnWidth);
      this.view.btnAddFeatureCancel.width = this.getStringFromi18n(this._PopupCancelBtnWidth);
      this.view.btnAddProductLineCancel.text = this.getStringFromi18n(this._PopupCancelBtnTxt);
      this.view.btnAddProductGroupCancel.text = this.getStringFromi18n(this._PopupCancelBtnTxt);
      this.view.btnAddFeatureCancel.text = this.getStringFromi18n(this._PopupCancelBtnTxt);
      this.view.btnAddProductLine.skin = this._PopupSaveBtnSkin;
      this.view.btnAddProductLine.hoverSkin = this._PopupSaveBtnSkinHover;
      this.view.btnAddProductGroup.skin = this._PopupSaveBtnSkin;
      this.view.btnAddProductGroup.hoverSkin = this._PopupSaveBtnSkinHover;
      this.view.btnAddFeature.skin = this._PopupSaveBtnSkin;
      this.view.btnAddFeature.hoverSkin = this._PopupSaveBtnSkinHover;
      //Product Popup Header Properties Initialize
      this.view.lblAddProductLinePopupTopHeader.skin = this._PopupTopHeaderSkin;
      this.view.lblAddProductGroupPopupHeader.skin = this._PopupTopHeaderSkin;
      this.view.lbViewProductGroupPopupHeader.skin = this._PopupViewTopHeaderSkin;
      this.view.lblAddFeaturePopupHeader.skin = this._PopupTopHeaderSkin;
      this.view.lbViewFeaturePopupHeader.skin = this._PopupViewTopHeaderSkin;
      this.view.lblSeparatorViewPGHeader.skin = this._PopupViewTopHeaderSeparatorSkin;
      this.view.lblSeparatorViewFeatureHeader.skin = this._PopupViewTopHeaderSeparatorSkin;
      //Product Popup Field count Properties Initialize
      this.view.lblProductLineNameSize.skin = this._PopupTextFieldCountSkin;
      this.view.lblProductLineRefSize.skin = this._PopupTextFieldCountSkin;
      this.view.lblProductGroupNameSize.skin = this._PopupTextFieldCountSkin;
      this.view.lblProductGroupRefSize.skin = this._PopupTextFieldCountSkin;
      this.view.lblProductGroupDescSize.skin = this._PopupTextFieldCountSkin;
      this.view.lblProductGroupDetailedDescSize.skin = this._PopupTextFieldCountSkin;
      this.view.lblFeatureNameSize.skin = this._PopupTextFieldCountSkin;
      this.view.lblFeatureGroupSize.skin = this._PopupTextFieldCountSkin;
      this.view.lblFeatureTypeSize.skin = this._PopupTextFieldCountSkin;
      this.view.lblFeatureDescSize.skin = this._PopupTextFieldCountSkin;
      //Product Popup Field Header Properties Initialize
      this.view.lblProductNameHeader.skin = this._PopupFieldHeaderSkin;
      this.view.lblProductLineRefHeader.skin = this._PopupFieldHeaderSkin;
      this.view.lblAddProductGroupNameHeader.skin = this._PopupFieldHeaderSkin;
      this.view.lblAssociatedProductLineHeader.skin = this._PopupFieldHeaderSkin;
      this.view.lblProductGroupRefHeader.skin = this._PopupFieldHeaderSkin;
      this.view.lblProductGroupDescHeader.skin = this._PopupFieldHeaderSkin;
      this.view.lblProductGroupDetailedDescHeader.skin = this._PopupFieldHeaderSkin;
      this.view.lblImgType.skin = this._PopupFieldHeaderSkin;
      this.view.lblImgURL.skin = this._PopupFieldHeaderSkin;
      this.view.lblAddFeatureNameHeader.skin = this._PopupFieldHeaderSkin;
      this.view.lblAddFeatureGroupHeader.skin = this._PopupFieldHeaderSkin;
      this.view.lblAddFeatureTypeHeader.skin = this._PopupFieldHeaderSkin;
      this.view.lblFeatureDescHeader.skin = this._PopupFieldHeaderSkin;
      this.view.txtProductLineName.skin = this._PopupTextBoxSkin;
      this.view.txtProductLineReference.skin = this._PopupTextBoxSkin;
      this.view.txtProductGroupName.skin = this._PopupTextBoxSkin;
      this.view.txtProductGroupRef.skin = this._PopupTextBoxSkin;
      this.view.txtFeatureName.skin = this._PopupTextBoxSkin;
      this.view.txtFeatureGroup.skin = this._PopupTextBoxSkin;
      this.view.txtFeatureType.skin = this._PopupTextBoxSkin;
      this.view.txtProductGroupDesc.skin = this._PopupTextAreaSkin;
      this.view.txtProductGroupDetailedDesc.skin = this._PopupTextAreaSkin;
      this.view.txtFeatureDescription.skin = this._PopupTextAreaSkin;
      this.view.lstbxAssociatedProductLine.skin = this._PopupListBoxSkin;
      //Product Popup Errmsg Properties Initialize
      this.view.ProductLineNameError.lblErrorText.skin = this._ErrMsgTextSkin;
      this.view.ProductLineRefError.lblErrorText.skin = this._ErrMsgTextSkin;
      this.view.ProductGroupNameError.lblErrorText.skin = this._ErrMsgTextSkin;
      this.view.AssociatedProductLineError.lblErrorText.skin = this._ErrMsgTextSkin;
      this.view.ProductGroupRefError.lblErrorText.skin = this._ErrMsgTextSkin;
      this.view.ProductGroupDescError.lblErrorText.skin = this._ErrMsgTextSkin;
      this.view.ProductGroupDetailedDescError.lblErrorText.skin = this._ErrMsgTextSkin;
      this.view.FeatureNameError.lblErrorText.skin = this._ErrMsgTextSkin;
      this.view.FeatureGroupError.lblErrorText.skin = this._ErrMsgTextSkin;
      this.view.FeatureTypeError.lblErrorText.skin = this._ErrMsgTextSkin;
      this.view.FeatureDescError.lblErrorText.skin = this._ErrMsgTextSkin;
      this.view.ProductLineNameError.lblErrorIcon.skin = this._ErrMsgIconSkin;
      this.view.ProductLineRefError.lblErrorIcon.skin = this._ErrMsgIconSkin;
      this.view.ProductGroupNameError.lblErrorIcon.skin = this._ErrMsgIconSkin;
      this.view.AssociatedProductLineError.lblErrorIcon.skin = this._ErrMsgIconSkin;
      this.view.ProductGroupRefError.lblErrorIcon.skin = this._ErrMsgIconSkin;
      this.view.ProductGroupDescError.lblErrorIcon.skin = this._ErrMsgIconSkin;
      this.view.ProductGroupDetailedDescError.lblErrorIcon.skin = this._ErrMsgIconSkin;
      this.view.FeatureNameError.lblErrorIcon.skin = this._ErrMsgIconSkin;
      this.view.FeatureGroupError.lblErrorIcon.skin = this._ErrMsgIconSkin;
      this.view.FeatureTypeError.lblErrorIcon.skin = this._ErrMsgIconSkin;
      this.view.FeatureDescError.lblErrorIcon.skin = this._ErrMsgIconSkin;
      this.view.ProductLineNameError.lblErrorIcon.text = this.getStringFromi18n(this._ErrMsgIconTxt.text);
      this.view.ProductLineRefError.lblErrorIcon.text = this.getStringFromi18n(this._ErrMsgIconTxt.text);
      this.view.ProductGroupNameError.lblErrorIcon.text = this.getStringFromi18n(this._ErrMsgIconTxt.text);
      this.view.AssociatedProductLineError.lblErrorIcon.text = this.getStringFromi18n(this._ErrMsgIconTxt.text);
      this.view.ProductGroupRefError.lblErrorIcon.text = this.getStringFromi18n(this._ErrMsgIconTxt.text);
      this.view.ProductGroupDescError.lblErrorIcon.text = this.getStringFromi18n(this._ErrMsgIconTxt.text);
      this.view.ProductGroupDetailedDescError.lblErrorIcon.text = this.getStringFromi18n(this._ErrMsgIconTxt.text);
      this.view.FeatureNameError.lblErrorIcon.text = this.getStringFromi18n(this._ErrMsgIconTxt.text);
      this.view.FeatureGroupError.lblErrorIcon.text = this.getStringFromi18n(this._ErrMsgIconTxt.text);
      this.view.FeatureTypeError.lblErrorIcon.text = this.getStringFromi18n(this._ErrMsgIconTxt.text);
      this.view.FeatureDescError.lblErrorIcon.text = this.getStringFromi18n(this._ErrMsgIconTxt.text);
      //Product View Details Popup Skin Properties Initialize
      this.view.lblViewAssociatedProductLineHeader.skin = this._PopupViewDetailsHeaderSkin;
      this.view.lblViewProductGroupRefHeader.skin = this._PopupViewDetailsHeaderSkin;
      this.view.lblViewProductGroupDescHeader.skin = this._PopupViewDetailsHeaderSkin;
      this.view.lblViewProductGroupDetailedDescHeader.skin = this._PopupViewDetailsHeaderSkin;
      this.view.lblImgTypeHeader.skin = this._PopupViewDetailsHeaderSkin;
      this.view.lblImgURLHeader.skin = this._PopupViewDetailsHeaderSkin;
      this.view.lblSeparatorImgDetails.skin = this._SegmentSeparatorSkin;
      this.view.lblViewFeatureNameHeader.skin = this._PopupViewDetailsHeaderSkin;
      this.view.lblViewFeatureGroupHeader.skin = this._PopupViewDetailsHeaderSkin;
      this.view.lblViewFeatureTypeHeader.skin = this._PopupViewDetailsHeaderSkin;
      this.view.lblFeatureDescriptionHeader.skin = this._PopupFieldHeaderSkin;
      this.view.lblViewAssociatedProductLine.skin = this._PopupViewDetailsSkin;
      this.view.lblViewProductGroupRef.skin = this._PopupViewDetailsSkin;
      this.view.lblViewProductGroupDesc.skin = this._PopupViewDetailsSkin;
      this.view.lblViewProductGroupDetailedDesc.skin = this._PopupViewDetailsSkin;
      this.view.lblFeatureName.skin = this._PopupViewDetailsSkin;
      this.view.lblFeatureGroup.skin = this._PopupViewDetailsSkin;
      this.view.lblFeatureType.skin = this._PopupViewDetailsSkin;
      this.view.lblFeatureDescription.skin = this._PopupViewDetailsSkin;
      this.view.btnEditProductGroup.skin = this._PopupDetailsEditBtnSkin;
      this.view.btnEditFeature.skin = this._PopupDetailsEditBtnSkin;
      this.view.btnEditProductGroup.text = this.getStringFromi18n(this._PopupDetailsEditBtnTxt);
      this.view.btnEditFeature.text = this.getStringFromi18n(this._PopupDetailsEditBtnTxt);
      //Product Add Details Popup Text Properties Initialize
      this.view.lblProductNameHeader.text = this.getStringFromi18n(this._PopupLblProductLineNameTxt);
      this.view.lblProductLineRefHeader.text = this.getStringFromi18n(this._PopupLblProductLineRefTxt);
      this.view.txtProductLineName.placeholder = this.getStringFromi18n(this._PopupTextBoxProductLineNamePlaceholderTxt);
      this.view.txtProductLineReference.placeholder = this.getStringFromi18n(this._PopupTextBoxProductLineRefPlaceholderTxt);
      this.view.ProductLineNameError.lblErrorText.text = this.getStringFromi18n(this._PopupErrMsgProductLineNameTxt);
      this.view.ProductLineRefError.lblErrorText.text = this.getStringFromi18n(this._PopupErrMsgProductLineRefTxt);
      this.view.lblAddProductGroupNameHeader.text = this.getStringFromi18n(this._PopupLblProductGrpNameTxt);
      this.view.lblAssociatedProductLineHeader.text = this.getStringFromi18n(this._PopupLblAssociatedProductLineNameTxt);
      this.view.lblProductGroupRefHeader.text = this.getStringFromi18n(this._PopupLblProductGrpRefTxt);
      this.view.lblProductGroupDescHeader.text = this.getStringFromi18n(this._PopupLblProductGrpDescTxt);
      this.view.lblProductGroupDetailedDescHeader.text = this.getStringFromi18n(this._PopupLblProductGrpDetailedDescTxt);
      this.view.lblImgType.text = this.getStringFromi18n(this._PopupLblImgTypeTxt);
      this.view.lblImgURL.text = this.getStringFromi18n(this._PopupLblImgUrlTxt);
      this.view.flxViewImgDetails.skin = this._ImgDetailsViewBgSkin;
      this.imageTypeDetailsJsonArray = this._ImageTypeDetailsJsonData.data;
      this.view.txtProductGroupName.placeholder = this.getStringFromi18n(this._PopupTextBoxProductGrpNamePlaceholderTxt);
      this.view.txtProductGroupRef.placeholder = this.getStringFromi18n(this._PopupTextBoxProductGrpRefPlaceholderTxt);
      this.view.txtProductGroupDesc.placeholder = this.getStringFromi18n(this._PopupTextBoxProductGrpDescPlaceholderTxt);
      this.view.txtProductGroupDetailedDesc.placeholder = this.getStringFromi18n(this._PopupTextBoxProductGrpDetailedDescPlaceholderTxt);
      this.view.lblAddImgDetail.text = this.getStringFromi18n(this._PopupLblAddImgFieldTxt);
      this.view.lblAddImgDetail.skin = this._PopupLblAddImgFieldSkin;
      this.view.ProductGroupNameError.lblErrorText.text = this.getStringFromi18n(this._PopupErrMsgProductGrpNameTxt);
      this.view.AssociatedProductLineError.lblErrorText.text = this.getStringFromi18n(this._PopupErrMsgAssociatedProductLineNameTxt);
      this.view.ProductGroupRefError.lblErrorText.text = this.getStringFromi18n(this._PopupErrMsgProductGrpRefTxt);
      this.view.ProductGroupDescError.lblErrorText.text = this.getStringFromi18n(this._PopupErrMsgProductGrpDescTxt);
      this.view.ProductGroupDetailedDescError.lblErrorText.text = this.getStringFromi18n(this._PopupErrMsgProductGrpDetailedDescTxt)
      this.view.lblAddFeatureNameHeader.text = this.getStringFromi18n(this._PopupLblFeatureNameTxt);
      this.view.lblAddFeatureGroupHeader.text = this.getStringFromi18n(this._PopupLblFeatureGrpTxt);
      this.view.lblAddFeatureTypeHeader.text = this.getStringFromi18n(this._PopupLblFeatureTypeTxt);
      this.view.lblFeatureDescHeader.text = this.getStringFromi18n(this._PopupLblFeatureDescTxt);
      this.view.txtFeatureName.placeholder = this.getStringFromi18n(this._PopupTextBoxFeatureNamePlaceholderTxt);
      this.view.txtFeatureGroup.placeholder = this.getStringFromi18n(this._PopupTextBoxFeatureGrpPlaceholderTxt);
      this.view.txtFeatureType.placeholder = this.getStringFromi18n(this._PopupTextBoxFeatureTypePlaceholderTxt);
      this.view.txtFeatureDescription.placeholder = this.getStringFromi18n(this._PopupTextBoxFeatureDescPlaceholderTxt);
      this.view.FeatureNameError.lblErrorText.text = this.getStringFromi18n(this._PopupErrMsgFeatureNameTxt);
      this.view.FeatureGroupError.lblErrorText.text = this.getStringFromi18n(this._PopupErrMsgFeatureGrpTxt);
      this.view.FeatureTypeError.lblErrorText.text = this.getStringFromi18n(this._PopupErrMsgFeatureTypeTxt);
      this.view.FeatureDescError.lblErrorText.text = this.getStringFromi18n(this._PopupErrMsgFeatureDescTxt);
      //Product View Details Popup Text Properties Initialize
      this.view.lblViewAssociatedProductLineHeader.text = this.getStringFromi18n(this._PopupLblAssociatedProductLineNameTxt);
      this.view.lblViewProductGroupRefHeader.text = this.getStringFromi18n(this._PopupLblProductGrpRefTxt);
      this.view.lblViewProductGroupDescHeader.text = this.getStringFromi18n(this._PopupLblProductGrpDescTxt);
      this.view.lblViewProductGroupDetailedDescHeader.text = this.getStringFromi18n(this._PopupLblProductGrpDetailedDescTxt);
      this.view.lblImgTypeHeader.text = this.getStringFromi18n(this._PopupLblImgTypeTxt);
      this.view.lblImgURLHeader.text = this.getStringFromi18n(this._PopupLblImgUrlTxt);
      this.view.lblViewFeatureNameHeader.text = this.getStringFromi18n(this._PopupLblFeatureNameTxt);
      this.view.lblViewFeatureGroupHeader.text = this.getStringFromi18n(this._PopupLblFeatureGrpTxt);
      this.view.lblViewFeatureTypeHeader.text = this.getStringFromi18n(this._PopupLblFeatureTypeTxt);
      this.view.lblFeatureDescriptionHeader.text = this.getStringFromi18n(this._PopupLblFeatureDescTxt);
      this.view.forceLayout();
    },
  };
});