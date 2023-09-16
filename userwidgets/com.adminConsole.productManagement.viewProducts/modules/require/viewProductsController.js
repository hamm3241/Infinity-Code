define(['./viewProductsDAO','Sorting_FormExtn','AdminConsoleCommonUtilities'],function(viewProductsDAO, SortingFormExtn, AdminConsoleCommonUtilities) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.config2 = true;
      this.productsList = [];
      this.productGrpFilterList = [];
      this.productLineFilterList = [];
      this.selFilter = [[]];
      this.noDataMsg = "";
      this.getProductsAction = 1;
      this.sortBy = SortingFormExtn.getObjectSorter("productName");
      this.viewProductsDAO = new viewProductsDAO();
      this._ProductListBgSkin = "";
      this._objSeviceName = "";
      this._objName = "";
      this._operationName = "";
      this._objSeviceName1 = "";
      this._objName1 = "";
      this._operationName1 = "";
      this._objSeviceName2 = "";
      this._objName2 = "";
      this._operationName2 = "";
      this._Label1 = "";
      this._Label2 = "";
      this._Label3 = "";
      this._Label4 = "";
      this._Label5 = "";
      this._Label6 = "";
      this._Label7 = "";
      this._Label8 = "";
      this._Label9 = "";
      this._Label10 = "";
      this._Label11 = "";
      this._Label12 = "";
      this._Label13 = "";
      this._Label14 = "";
      this._Label15 = "";
      this._SubHeaderSkin = "";
      this._SearchContainerSkin = "";
      this._SearchIconSkin = "";
      this._SearchIconText = "";
      this._CrossIconSkin = "";
      this._CrossIconText = "";
      this._SearchTextBoxSkin = "";
      this._SearchTextBoxPlaceholder = "";
      this._ProductListHeaderSkin = "";
      this._LblProductNameTxt = "";
      this._LblProductGroupTxt = "";
      this._IconProductGroup = "";
      this._LblProductLineTxt = "";
      this._IconProductLine = "";
      this._LblProductStatusTxt = "";
      this._IconProductStatus = "";
      this._HeaderSeparatorSkin = "";
      this._LblProductSegmentSkin = "";
      this._IconStatusActiveSkin = "";
      this._IconStatusDeactiveSkin = "";
      this._IconStatusActiveDeactive = "";
      this._IconOptionSkin = "";
      this._IconOption = "";
      this._SegRowSeparatorSkin = "";
      this._SegNoResultLblSkin = "";
      this._OptionMenuSkin = "";
      this._IconOptionMenuSkin = "";
      this._IconEdit = "";
      this._IconDelete = "";
      this._IconActivate = "";
      this._IconDeactivate = "";
      this._IconCopy = "";
      this._FilterMenuSkin = "";
      this._FilterMenuSearchBoxSkin = "";
      this._FilterMenuSearchIconSkin = "";
      this._FilterMenuCrossIconSkin = "";
      this._FilterMenuSearchSeparatorSkin = "";
      this._FilterMenuSegLblSkin = "";
      this._FilterMenuNoResultLblSkin = "";
      this._TopDetailsBgSkin = "";
      this._ProductNameSkin = "";
      this._ProductDetailHeaderSkin = "";
      this._ProductDetailSkin = "";
      this._LblProductLineHeader = "";
      this._LblProductGroupHeader = "";
      this._LblProductRefHeader = "";
      this._LblPurposeHeader = "";
      this._LblAvailableFromDateHeader = "";
      this._LblAvailableToDateHeader = "";
      this._ProductDescriptionHeaderSkin = "";
      this._LblProductDescriptionHeader = "";
      this._IconDropdownSkin = "";
      this._IconDropdownCollapse = "";
      this._IconDropdownExpand = "";
      this._LblDescriptionHeader = "";
      this._LblDetailedDescHeader = "";
      this._LblNotesHeader = "";
      this._LblDisclosureHeader = "";
      this._LblTermsAndConditionsHeader = "";
      this._ReadMoreSkin = "";
      this._LblReadMore = "";
      this._BottomDetailsBgSkin = "";
      this._TabSelectedSkin = "";
      this._TabUnselectedSkin = "";
      this._Tab1Text = "";
      this._Tab2Text = "";
      this._Tab3Text = "";
      this._SeparatorBottomDetailsSkin = "";
      this._LblNoResultSkin = "";
      this._NofeaturesText = "";
      this._ImgHeaderSkin = "";
      this._LblImgTypeHeader = "";
      this._LblImgUrlHeader = "";
      this._SegImgLabelSkin = "";
      this._NoImagesText = "";
      this._AttributeHeaderSkin = "";
      this._LblAttribute1Header = "";
      this._LblAttribute2Header = "";
      this._SegAttributeLabelSkin = "";
      this._NoAttributesText = "";
      this._PopupOuterShadowBgSkin = "";
      this._PopupBgSkin = "";
      this._PopupTopBarSkin = "";
      this._PopupTopHeaderSeparatorSkin = "";
      this._PopupCloseIconSkin = "";
      this._LblPopupReadMoreHeaderSkin = "";
      this._LblAgreementTermsSkin = "";
      this._LblAgreementTermsText = "";
      this._LblReadMoreDetailsSkin = "";
      this._PopupButtonConatinerBgSkin = "";
      this._PopupButtonCloseSkin = "";
      this._PopupButtonCloseHoverSkin = "";
      this._PopupWarningTopBarSkin = "";
      this._PopupAlertTopBarSkin = "";
      this._PopupMainHeaderSkin = "";
      this._PopupDisclaimerSkin = "";
      this._PopupButtonNoSkin = "";
      this._PopupButtonNoHoverSkin = "";
      this._PopupButtonYesSkin = "";
      this._PopupButtonYesHoverSkin = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, "ProductListBgSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ProductListBgSkin=val;
        }
      });
      defineGetter(this, "ProductListBgSkin", function() {
        return this._ProductListBgSkin;
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
        if((typeof val === 'string') && (val !== "")){
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
        if((typeof val === 'string') && (val !== "")){
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
      defineSetter(this, "Label1", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._Label1=val;
        }
      });
      defineGetter(this, "Label1", function() {
        return this._Label1;
      });
      defineSetter(this, "Label2", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._Label2=val;
        }
      });
      defineGetter(this, "Label2", function() {
        return this._Label2;
      });
      defineSetter(this, "Label3", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._Label3=val;
        }
      });
      defineGetter(this, "Label3", function() {
        return this._Label3;
      });
      defineSetter(this, "Label4", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._Label4=val;
        }
      });
      defineGetter(this, "Label4", function() {
        return this._Label4;
      });
      defineSetter(this, "Label5", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._Label5=val;
        }
      });
      defineGetter(this, "Label5", function() {
        return this._Label5;
      });
      defineSetter(this, "Label6", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._Label6=val;
        }
      });
      defineGetter(this, "Label6", function() {
        return this._Label6;
      });
      defineSetter(this, "Label7", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._Label7=val;
        }
      });
      defineGetter(this, "Label7", function() {
        return this._Label7;
      });
      defineSetter(this, "Label8", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._Label8=val;
        }
      });
      defineGetter(this, "Label8", function() {
        return this._Label8;
      });
      defineSetter(this, "Label9", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._Label9=val;
        }
      });
      defineGetter(this, "Label9", function() {
        return this._Label9;
      });
      defineSetter(this, "Label10", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._Label10=val;
        }
      });
      defineGetter(this, "Label10", function() {
        return this._Label10;
      });
      defineSetter(this, "Label11", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._Label11=val;
        }
      });
      defineGetter(this, "Label11", function() {
        return this._Label11;
      });
      defineSetter(this, "Label12", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._Label12=val;
        }
      });
      defineGetter(this, "Label12", function() {
        return this._Label12;
      });
      defineSetter(this, "Label13", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._Label13=val;
        }
      });
      defineGetter(this, "Label13", function() {
        return this._Label13;
      });
      defineSetter(this, "Label14", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._Label14=val;
        }
      });
      defineGetter(this, "Label14", function() {
        return this._Label14;
      });
      defineSetter(this, "Label15", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._Label15=val;
        }
      });
      defineGetter(this, "Label15", function() {
        return this._Label15;
      });
      defineSetter(this, "SubHeaderSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SubHeaderSkin=val;
        }
      });
      defineGetter(this, "SubHeaderSkin", function() {
        return this._SubHeaderSkin;
      });
      defineSetter(this, "SearchContainerSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SearchContainerSkin=val;
        }
      });
      defineGetter(this, "SearchContainerSkin", function() {
        return this._SearchContainerSkin;
      });
      defineSetter(this, "SearchIconSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SearchIconSkin=val;
        }
      });
      defineGetter(this, "SearchIconSkin", function() {
        return this._SearchIconSkin;
      });
      defineSetter(this, "SearchIconText", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SearchIconText=JSON.parse(val);
        }
      });
      defineGetter(this, "SearchIconText", function() {
        return this._SearchIconText;
      });
      defineSetter(this, "CrossIconSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._CrossIconSkin=val;
        }
      });
      defineGetter(this, "CrossIconSkin", function() {
        return this._CrossIconSkin;
      });
      defineSetter(this, "CrossIconText", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._CrossIconText=JSON.parse(val);
        }
      });
      defineGetter(this, "CrossIconText", function() {
        return this._CrossIconText;
      });
      defineSetter(this, "SearchTextBoxSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SearchTextBoxSkin=val;
        }
      });
      defineGetter(this, "SearchTextBoxSkin", function() {
        return this._SearchTextBoxSkin;
      });
      defineSetter(this, "SearchTextBoxPlaceholder", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SearchTextBoxPlaceholder=val;
        }
      });
      defineGetter(this, "SearchTextBoxPlaceholder", function() {
        return this._SearchTextBoxPlaceholder;
      });
      defineSetter(this, "ProductListHeaderSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ProductListHeaderSkin=val;
        }
      });
      defineGetter(this, "ProductListHeaderSkin", function() {
        return this._ProductListHeaderSkin;
      });
      defineSetter(this, "LblProductNameTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblProductNameTxt=val;
        }
      });
      defineGetter(this, "LblProductNameTxt", function() {
        return this._LblProductNameTxt;
      });
      defineSetter(this, "LblProductGroupTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblProductGroupTxt=val;
        }
      });
      defineGetter(this, "LblProductGroupTxt", function() {
        return this._LblProductGroupTxt;
      });
      defineSetter(this, "IconProductGroup", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconProductGroup=JSON.parse(val);
        }
      });
      defineGetter(this, "IconProductGroup", function() {
        return this._IconProductGroup;
      });
      defineSetter(this, "LblProductLineTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblProductLineTxt=val;
        }
      });
      defineGetter(this, "LblProductLineTxt", function() {
        return this._LblProductLineTxt;
      });
      defineSetter(this, "IconProductLine", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconProductLine=JSON.parse(val);
        }
      });
      defineGetter(this, "IconProductLine", function() {
        return this._IconProductLine;
      });
      defineSetter(this, "LblProductStatusTxt", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblProductStatusTxt=val;
        }
      });
      defineGetter(this, "LblProductStatusTxt", function() {
        return this._LblProductStatusTxt;
      });
      defineSetter(this, "IconProductStatus", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconProductStatus=JSON.parse(val);
        }
      });
      defineGetter(this, "IconProductStatus", function() {
        return this._IconProductStatus;
      });
      defineSetter(this, "HeaderSeparatorSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._HeaderSeparatorSkin=val;
        }
      });
      defineGetter(this, "HeaderSeparatorSkin", function() {
        return this._HeaderSeparatorSkin;
      });
      defineSetter(this, "LblProductSegmentSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblProductSegmentSkin=val;
        }
      });
      defineGetter(this, "LblProductSegmentSkin", function() {
        return this._LblProductSegmentSkin;
      });
      defineSetter(this, "IconStatusActiveSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconStatusActiveSkin=val;
        }
      });
      defineGetter(this, "IconStatusActiveSkin", function() {
        return this._IconStatusActiveSkin;
      });
      defineSetter(this, "IconStatusDeactiveSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconStatusDeactiveSkin=val;
        }
      });
      defineGetter(this, "IconStatusDeactiveSkin", function() {
        return this._IconStatusDeactiveSkin;
      });
      defineSetter(this, "IconStatusActiveDeactive", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconStatusActiveDeactive=JSON.parse(val);
        }
      });
      defineGetter(this, "IconStatusActiveDeactive", function() {
        return this._IconStatusActiveDeactive;
      });
      defineSetter(this, "IconOptionSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconOptionSkin=val;
        }
      });
      defineGetter(this, "IconOptionSkin", function() {
        return this._IconOptionSkin;
      });
      defineSetter(this, "IconOption", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconOption=JSON.parse(val);
        }
      });
      defineGetter(this, "IconOption", function() {
        return this._IconOption;
      });
      defineSetter(this, "SegRowSeparatorSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SegRowSeparatorSkin=val;
        }
      });
      defineGetter(this, "SegRowSeparatorSkin", function() {
        return this._SegRowSeparatorSkin;
      });
      defineSetter(this, "SegNoResultLblSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SegNoResultLblSkin=val;
        }
      });
      defineGetter(this, "SegNoResultLblSkin", function() {
        return this._SegNoResultLblSkin;
      });
      defineSetter(this, "OptionMenuSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._OptionMenuSkin=val;
        }
      });
      defineGetter(this, "OptionMenuSkin", function() {
        return this._OptionMenuSkin;
      });
      defineSetter(this, "IconOptionMenuSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconOptionMenuSkin=val;
        }
      });
      defineGetter(this, "IconOptionMenuSkin", function() {
        return this._IconOptionMenuSkin;
      });
      defineSetter(this, "IconEdit", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconEdit=JSON.parse(val);
        }
      });
      defineGetter(this, "IconEdit", function() {
        return this._IconEdit;
      });
      defineSetter(this, "IconDelete", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconDelete=JSON.parse(val);
        }
      });
      defineGetter(this, "IconDelete", function() {
        return this._IconDelete;
      });
      defineSetter(this, "IconActivate", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconActivate=JSON.parse(val);
        }
      });
      defineGetter(this, "IconActivate", function() {
        return this._IconActivate;
      });
      defineSetter(this, "IconDeactivate", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconDeactivate=JSON.parse(val);
        }
      });
      defineGetter(this, "IconDeactivate", function() {
        return this._IconDeactivate;
      });
      defineSetter(this, "IconCopy", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconCopy=JSON.parse(val);
        }
      });
      defineGetter(this, "IconCopy", function() {
        return this._IconCopy;
      });
      defineSetter(this, "FilterMenuSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._FilterMenuSkin=val;
        }
      });
      defineGetter(this, "FilterMenuSkin", function() {
        return this._FilterMenuSkin;
      });
      defineSetter(this, "FilterMenuSearchBoxSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._FilterMenuSearchBoxSkin=val;
        }
      });
      defineGetter(this, "FilterMenuSearchBoxSkin", function() {
        return this._FilterMenuSearchBoxSkin;
      });
      defineSetter(this, "FilterMenuSearchIconSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._FilterMenuSearchIconSkin=val;
        }
      });
      defineGetter(this, "FilterMenuSearchIconSkin", function() {
        return this._FilterMenuSearchIconSkin;
      });
      defineSetter(this, "FilterMenuCrossIconSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._FilterMenuCrossIconSkin=val;
        }
      });
      defineGetter(this, "FilterMenuCrossIconSkin", function() {
        return this._FilterMenuCrossIconSkin;
      });
      defineSetter(this, "FilterMenuSearchSeparatorSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._FilterMenuSearchSeparatorSkin=val;
        }
      });
      defineGetter(this, "FilterMenuSearchSeparatorSkin", function() {
        return this._FilterMenuSearchSeparatorSkin;
      });
      defineSetter(this, "FilterMenuSegLblSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._FilterMenuSegLblSkin=val;
        }
      });
      defineGetter(this, "FilterMenuSegLblSkin", function() {
        return this._FilterMenuSegLblSkin;
      });
      defineSetter(this, "FilterMenuNoResultLblSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._FilterMenuNoResultLblSkin=val;
        }
      });
      defineGetter(this, "FilterMenuNoResultLblSkin", function() {
        return this._FilterMenuNoResultLblSkin;
      });
      defineSetter(this, "TopDetailsBgSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._TopDetailsBgSkin=val;
        }
      });
      defineGetter(this, "TopDetailsBgSkin", function() {
        return this._TopDetailsBgSkin;
      });
      defineSetter(this, "ProductNameSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ProductNameSkin=val;
        }
      });
      defineGetter(this, "ProductNameSkin", function() {
        return this._ProductNameSkin;
      });
      defineSetter(this, "ProductDetailHeaderSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ProductDetailHeaderSkin=val;
        }
      });
      defineGetter(this, "ProductDetailHeaderSkin", function() {
        return this._ProductDetailHeaderSkin;
      });
      defineSetter(this, "ProductDetailSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ProductDetailSkin=val;
        }
      });
      defineGetter(this, "ProductDetailSkin", function() {
        return this._ProductDetailSkin;
      });
      defineSetter(this, "LblProductLineHeader", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblProductLineHeader=val;
        }
      });
      defineGetter(this, "LblProductLineHeader", function() {
        return this._LblProductLineHeader;
      });
      defineSetter(this, "LblProductGroupHeader", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblProductGroupHeader=val;
        }
      });
      defineGetter(this, "LblProductGroupHeader", function() {
        return this._LblProductGroupHeader;
      });
      defineSetter(this, "LblProductRefHeader", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblProductRefHeader=val;
        }
      });
      defineGetter(this, "LblProductRefHeader", function() {
        return this._LblProductRefHeader;
      });
      defineSetter(this, "LblPurposeHeader", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblPurposeHeader=val;
        }
      });
      defineGetter(this, "LblPurposeHeader", function() {
        return this._LblPurposeHeader;
      });
      defineSetter(this, "LblAvailableFromDateHeader", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblAvailableFromDateHeader=val;
        }
      });
      defineGetter(this, "LblAvailableFromDateHeader", function() {
        return this._LblAvailableFromDateHeader;
      });
      defineSetter(this, "LblAvailableToDateHeader", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblAvailableToDateHeader=val;
        }
      });
      defineGetter(this, "LblAvailableToDateHeader", function() {
        return this._LblAvailableToDateHeader;
      });
      defineSetter(this, "ProductDescriptionHeaderSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ProductDescriptionHeaderSkin=val;
        }
      });
      defineGetter(this, "ProductDescriptionHeaderSkin", function() {
        return this._ProductDescriptionHeaderSkin;
      });
      defineSetter(this, "LblProductDescriptionHeader", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblProductDescriptionHeader=val;
        }
      });
      defineGetter(this, "LblProductDescriptionHeader", function() {
        return this._LblProductDescriptionHeader;
      });
      defineSetter(this, "IconDropdownSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconDropdownSkin=val;
        }
      });
      defineGetter(this, "IconDropdownSkin", function() {
        return this._IconDropdownSkin;
      });
      defineSetter(this, "IconDropdownCollapse", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconDropdownCollapse=JSON.parse(val);
        }
      });
      defineGetter(this, "IconDropdownCollapse", function() {
        return this._IconDropdownCollapse;
      });
      defineSetter(this, "IconDropdownExpand", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._IconDropdownExpand=JSON.parse(val);
        }
      });
      defineGetter(this, "IconDropdownExpand", function() {
        return this._IconDropdownExpand;
      });
      defineSetter(this, "LblDescriptionHeader", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblDescriptionHeader=val;
        }
      });
      defineGetter(this, "LblDescriptionHeader", function() {
        return this._LblDescriptionHeader;
      });
      defineSetter(this, "LblDetailedDescHeader", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblDetailedDescHeader=val;
        }
      });
      defineGetter(this, "LblDetailedDescHeader", function() {
        return this._LblDetailedDescHeader;
      });
      defineSetter(this, "LblNotesHeader", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblNotesHeader=val;
        }
      });
      defineGetter(this, "LblNotesHeader", function() {
        return this._LblNotesHeader;
      });
      defineSetter(this, "LblDisclosureHeader", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblDisclosureHeader=val;
        }
      });
      defineGetter(this, "LblDisclosureHeader", function() {
        return this._LblDisclosureHeader;
      });
      defineSetter(this, "LblTermsAndConditionsHeader", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblTermsAndConditionsHeader=val;
        }
      });
      defineGetter(this, "LblTermsAndConditionsHeader", function() {
        return this._LblTermsAndConditionsHeader;
      });
      defineSetter(this, "ReadMoreSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ReadMoreSkin=val;
        }
      });
      defineGetter(this, "ReadMoreSkin", function() {
        return this._ReadMoreSkin;
      });
      defineSetter(this, "LblReadMore", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblReadMore=val;
        }
      });
      defineGetter(this, "LblReadMore", function() {
        return this._LblReadMore;
      });
      defineSetter(this, "BottomDetailsBgSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._BottomDetailsBgSkin=val;
        }
      });
      defineGetter(this, "BottomDetailsBgSkin", function() {
        return this._BottomDetailsBgSkin;
      });
      defineSetter(this, "TabSelectedSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._TabSelectedSkin=val;
        }
      });
      defineGetter(this, "TabSelectedSkin", function() {
        return this._TabSelectedSkin;
      });
      defineSetter(this, "TabUnselectedSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._TabUnselectedSkin=val;
        }
      });
      defineGetter(this, "TabUnselectedSkin", function() {
        return this._TabUnselectedSkin;
      });
      defineSetter(this, "Tab1Text", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._Tab1Text=val;
        }
      });
      defineGetter(this, "Tab1Text", function() {
        return this._Tab1Text;
      });
      defineSetter(this, "Tab2Text", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._Tab2Text=val;
        }
      });
      defineGetter(this, "Tab2Text", function() {
        return this._Tab2Text;
      });
      defineSetter(this, "Tab3Text", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._Tab3Text=val;
        }
      });
      defineGetter(this, "Tab3Text", function() {
        return this._Tab3Text;
      });
      defineSetter(this, "SeparatorBottomDetailsSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SeparatorBottomDetailsSkin=val;
        }
      });
      defineGetter(this, "SeparatorBottomDetailsSkin", function() {
        return this._SeparatorBottomDetailsSkin;
      });
      defineSetter(this, "LblNoResultSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblNoResultSkin=val;
        }
      });
      defineGetter(this, "LblNoResultSkin", function() {
        return this._LblNoResultSkin;
      });
      defineSetter(this, "NofeaturesText", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._NofeaturesText=val;
        }
      });
      defineGetter(this, "NofeaturesText", function() {
        return this._NofeaturesText;
      });
      defineSetter(this, "ImgHeaderSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ImgHeaderSkin=val;
        }
      });
      defineGetter(this, "ImgHeaderSkin", function() {
        return this._ImgHeaderSkin;
      });
      defineSetter(this, "LblImgTypeHeader", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblImgTypeHeader=val;
        }
      });
      defineGetter(this, "LblImgTypeHeader", function() {
        return this._LblImgTypeHeader;
      });
      defineSetter(this, "LblImgUrlHeader", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblImgUrlHeader=val;
        }
      });
      defineGetter(this, "LblImgUrlHeader", function() {
        return this._LblImgUrlHeader;
      });
      defineSetter(this, "SegImgLabelSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SegImgLabelSkin=val;
        }
      });
      defineGetter(this, "SegImgLabelSkin", function() {
        return this._SegImgLabelSkin;
      });
      defineSetter(this, "NoImagesText", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._NoImagesText=val;
        }
      });
      defineGetter(this, "NoImagesText", function() {
        return this._NoImagesText;
      });
      defineSetter(this, "AttributeHeaderSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._AttributeHeaderSkin=val;
        }
      });
      defineGetter(this, "AttributeHeaderSkin", function() {
        return this._AttributeHeaderSkin;
      });
      defineSetter(this, "LblAttribute1Header", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblAttribute1Header=val;
        }
      });
      defineGetter(this, "LblAttribute1Header", function() {
        return this._LblAttribute1Header;
      });
      defineSetter(this, "LblAttribute2Header", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblAttribute2Header=val;
        }
      });
      defineGetter(this, "LblAttribute2Header", function() {
        return this._LblAttribute2Header;
      });
      defineSetter(this, "SegAttributeLabelSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SegAttributeLabelSkin=val;
        }
      });
      defineGetter(this, "SegAttributeLabelSkin", function() {
        return this._SegAttributeLabelSkin;
      });
      defineSetter(this, "NoAttributesText", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._NoAttributesText=val;
        }
      });
      defineGetter(this, "NoAttributesText", function() {
        return this._NoAttributesText;
      });
      defineSetter(this, "PopupOuterShadowBgSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupOuterShadowBgSkin=val;
        }
      });
      defineGetter(this, "PopupOuterShadowBgSkin", function() {
        return this._PopupOuterShadowBgSkin;
      });
      defineSetter(this, "PopupBgSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupBgSkin=val;
        }
      });
      defineGetter(this, "PopupBgSkin", function() {
        return this._PopupBgSkin;
      });
      defineSetter(this, "PopupTopBarSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTopBarSkin=val;
        }
      });
      defineGetter(this, "PopupTopBarSkin", function() {
        return this._PopupTopBarSkin;
      });
      defineSetter(this, "PopupTopHeaderSeparatorSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupTopHeaderSeparatorSkin=val;
        }
      });
      defineGetter(this, "PopupTopHeaderSeparatorSkin", function() {
        return this._PopupTopHeaderSeparatorSkin;
      });
      defineSetter(this, "PopupCloseIconSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupCloseIconSkin=val;
        }
      });
      defineGetter(this, "PopupCloseIconSkin", function() {
        return this._PopupCloseIconSkin;
      });
      defineSetter(this, "LblPopupReadMoreHeaderSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblPopupReadMoreHeaderSkin=val;
        }
      });
      defineGetter(this, "LblPopupReadMoreHeaderSkin", function() {
        return this._LblPopupReadMoreHeaderSkin;
      });
      defineSetter(this, "LblAgreementTermsSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblAgreementTermsSkin=val;
        }
      });
      defineGetter(this, "LblAgreementTermsSkin", function() {
        return this._LblAgreementTermsSkin;
      });
      defineSetter(this, "LblAgreementTermsText", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblAgreementTermsText=val;
        }
      });
      defineGetter(this, "LblAgreementTermsText", function() {
        return this._LblAgreementTermsText;
      });
      defineSetter(this, "LblReadMoreDetailsSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._LblReadMoreDetailsSkin=val;
        }
      });
      defineGetter(this, "LblReadMoreDetailsSkin", function() {
        return this._LblReadMoreDetailsSkin;
      });
      defineSetter(this, "PopupButtonConatinerBgSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupButtonConatinerBgSkin=val;
        }
      });
      defineGetter(this, "PopupButtonConatinerBgSkin", function() {
        return this._PopupButtonConatinerBgSkin;
      });
      defineSetter(this, "PopupButtonCloseSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupButtonCloseSkin=val;
        }
      });
      defineGetter(this, "PopupButtonCloseSkin", function() {
        return this._PopupButtonCloseSkin;
      });
      defineSetter(this, "PopupButtonCloseHoverSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupButtonCloseHoverSkin=val;
        }
      });
      defineGetter(this, "PopupButtonCloseHoverSkin", function() {
        return this._PopupButtonCloseHoverSkin;
      });
      defineSetter(this, "PopupWarningTopBarSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupWarningTopBarSkin=val;
        }
      });
      defineGetter(this, "PopupWarningTopBarSkin", function() {
        return this._PopupWarningTopBarSkin;
      });
      defineSetter(this, "PopupAlertTopBarSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupAlertTopBarSkin=val;
        }
      });
      defineGetter(this, "PopupAlertTopBarSkin", function() {
        return this._PopupAlertTopBarSkin;
      });
      defineSetter(this, "PopupMainHeaderSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupMainHeaderSkin=val;
        }
      });
      defineGetter(this, "PopupMainHeaderSkin", function() {
        return this._PopupMainHeaderSkin;
      });
      defineSetter(this, "PopupDisclaimerSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupDisclaimerSkin=val;
        }
      });
      defineGetter(this, "PopupDisclaimerSkin", function() {
        return this._PopupDisclaimerSkin;
      });
      defineSetter(this, "PopupButtonNoSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupButtonNoSkin=val;
        }
      });
      defineGetter(this, "PopupButtonNoSkin", function() {
        return this._PopupButtonNoSkin;
      });
      defineSetter(this, "PopupButtonNoHoverSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupButtonNoHoverSkin=val;
        }
      });
      defineGetter(this, "PopupButtonNoHoverSkin", function() {
        return this._PopupButtonNoHoverSkin;
      });
      defineSetter(this, "PopupButtonYesSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupButtonYesSkin=val;
        }
      });
      defineGetter(this, "PopupButtonYesSkin", function() {
        return this._PopupButtonYesSkin;
      });
      defineSetter(this, "PopupButtonYesHoverSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._PopupButtonYesHoverSkin=val;
        }
      });
      defineGetter(this, "PopupButtonYesHoverSkin", function() {
        return this._PopupButtonYesHoverSkin;
      });
    },

    viewProductPreShow: function() {
      this.setConfiguration();
      this.setPropertiesValueToWidget();
      this.setflowActions();
      this.resetFieldsOnPreShow();
    },

    willUpdateUI: function(context) {
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
          if (context.action === this._operationName && this.getProductsAction === 1) {
            this.formUpdateUI({progressBar : {show : "success"}});
            this.productsList = this.getProductsArray(context.marketingCatalogue);
            this.showProductsList();
            this.formUpdateUI({progressBar : {show : "fail"}});
          }
          else if(context.action === this._operationName2){
            this.formUpdateUI({toastModel : {status : "success", message: "Product Deleted Successfully"}});
            this.closePopup();
            this.getProducts();
          }
          else if (context.action === this._operationName && this.getProductsAction === 2) {
            this.showProductDetails(context.marketingCatalogue);
            this.formUpdateUI({progressBar : {show : "fail"}});
          }
          else if(context.action === this._operationName && this.getProductsAction === 3){
            this.showEditProduct(context.marketingCatalogue);
            this.formUpdateUI({progressBar : {show : "fail"}});
          }
        }
      }
      this.view.forceLayout();
    },

    setflowActions: function() {
      var scopeObj = this;
      this.view.flxProductName.onClick = function() {
        scopeObj.sortProductList("productName");
      };
      this.view.flxProductGroup.onClick = function() {
        var flxRight = scopeObj.view.flxProductsHeader.frame.width - scopeObj.view.flxProductGroup.frame.x - scopeObj.view.flxProductGroup.frame.width;
        var iconRight = scopeObj.view.flxProductGroup.frame.width - scopeObj.view.fontIconFilterGroup.frame.x;
        scopeObj.view.flxProductGroupFilter.right = (flxRight + iconRight - 28) +"px";
        scopeObj.view.flxProductLineFilter.setVisibility(false);
        scopeObj.view.flxProductStatusFilter.setVisibility(false);
        if(scopeObj.view.flxProductGroupFilter.isVisible){
          scopeObj.view.flxProductGroupFilter.setVisibility(false);
        } else {
          scopeObj.view.flxProductGroupFilter.setVisibility(true);
        }
        scopeObj.view.forceLayout();
      };
      this.view.flxProductLine.onClick = function() {
        var flxRight = scopeObj.view.flxProductsHeader.frame.width - scopeObj.view.flxProductLine.frame.x - scopeObj.view.flxProductLine.frame.width;
        var iconRight = scopeObj.view.flxProductLine.frame.width - scopeObj.view.fontIconFilterLine.frame.x;
        scopeObj.view.flxProductLineFilter.right = (flxRight + iconRight - 28) +"px";
        scopeObj.view.flxProductGroupFilter.setVisibility(false);
        scopeObj.view.flxProductStatusFilter.setVisibility(false);
        if(scopeObj.view.flxProductLineFilter.isVisible){
          scopeObj.view.flxProductLineFilter.setVisibility(false);
        } else {
          scopeObj.view.flxProductLineFilter.setVisibility(true);
        }
        scopeObj.view.forceLayout();
      };
      this.view.flxProductStatus.onClick = function() {
        var flxRight = scopeObj.view.flxProductsHeader.frame.width - scopeObj.view.flxProductStatus.frame.x - scopeObj.view.flxProductStatus.frame.width;
        var iconRight = scopeObj.view.flxProductStatus.frame.width - scopeObj.view.fontIconFilterStatus.frame.x;
        scopeObj.view.flxProductStatusFilter.right = (flxRight + iconRight - 28) +"px";
        scopeObj.view.flxProductGroupFilter.setVisibility(false);
        scopeObj.view.flxProductLineFilter.setVisibility(false);
        if(scopeObj.view.flxProductStatusFilter.isVisible){
          scopeObj.view.flxProductStatusFilter.setVisibility(false);
        } else {
          scopeObj.view.flxProductStatusFilter.setVisibility(true);
        }
        scopeObj.view.forceLayout();
      };
      this.view.subHeader.tbxSearchBox.onDone = function() {
        kony.print("Function written to avoid opening a new Window in Browser");
      };
      this.view.subHeader.tbxSearchBox.onTouchStart=function(){
        scopeObj.view.subHeader.flxSearchContainer.skin="slFbox0ebc847fa67a243Search";
      };
      this.view.subHeader.tbxSearchBox.onKeyUp = function() {
        scopeObj.noDataMsg = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") 
          + '"' + scopeObj.view.subHeader.tbxSearchBox.text + '"';
        scopeObj.delayedSearch();
        if(scopeObj.view.subHeader.tbxSearchBox.text === ""){
          scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100";
          scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
          scopeObj.view.forceLayout();
        } else {
          scopeObj.view.subHeader.flxSearchContainer.skin ="slFbox0ebc847fa67a243Search";
          scopeObj.view.subHeader.flxClearSearchImage.setVisibility(true);
        }
        scopeObj.view.forceLayout();

      };
      this.view.subHeader.flxClearSearchImage.onClick = function() {
        scopeObj.view.subHeader.tbxSearchBox.text = "";
        scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100";
        scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
        scopeObj.noDataMsg = "";
        scopeObj.filterProductGroupLineStatus(); //performs both filter and search
        scopeObj.view.forceLayout();
      };
      this.view.segProducts.onRowClick = function(event){
        scopeObj.getProductsAction = 2; //fetch specific product details
        var index = event.selectedRowIndex[1];
        var productRef = scopeObj.view.segProducts.data[index].productRef;
        var param ={"productRef":productRef};
        scopeObj.viewProductsDAO.productOperations(scopeObj._objSeviceName, scopeObj._objName, scopeObj._operationName, param, scopeObj.willUpdateUI);
      };
      this.view.productGroupFilterMenu.segStatusFilterDropdown.onRowClick = function(){
        scopeObj.filterProductGroupLine(scopeObj.view.productGroupFilterMenu.segStatusFilterDropdown);
      };
      this.view.productLineFilterMenu.segStatusFilterDropdown.onRowClick = function(){
        scopeObj.filterProductGroupLine(scopeObj.view.productLineFilterMenu.segStatusFilterDropdown);
      };
      this.view.statusFilterMenu.segStatusFilterDropdown.onRowClick = function(){
        scopeObj.filterProductGroupLineStatus();
      };
      this.view.productGroupFilterMenu.tbxSearchBox.onKeyUp = function(){
        scopeObj.searchProductFilter(scopeObj.view.productGroupFilterMenu.tbxSearchBox.text, scopeObj.productGrpFilterList, scopeObj.view.productGroupFilterMenu);
      };
      this.view.productGroupFilterMenu.flxClearSearchImage.onClick = function(){
        scopeObj.searchProductFilter("", scopeObj.productGrpFilterList, scopeObj.view.productGroupFilterMenu);        
      };
      this.view.productLineFilterMenu.tbxSearchBox.onKeyUp = function(){
        scopeObj.searchProductFilter(scopeObj.view.productLineFilterMenu.tbxSearchBox.text, scopeObj.productLineFilterList, scopeObj.view.productLineFilterMenu);
      };
      this.view.productLineFilterMenu.flxClearSearchImage.onClick = function(){
        scopeObj.searchProductFilter("", scopeObj.productLineFilterList, scopeObj.view.productLineFilterMenu);        
      };
      this.view.selectOptions.flxOption1.onClick = function(){
        scopeObj.getProductsAction = 3; //fetch specific product details for edit
        var index = scopeObj.view.segProducts.selectedRowIndex[1];
        var productRef = scopeObj.view.segProducts.data[index].productRef;
        var param ={"productRef":productRef};
        scopeObj.viewProductsDAO.productOperations(scopeObj._objSeviceName, scopeObj._objName, scopeObj._operationName, param, scopeObj.willUpdateUI);
      };
      this.view.selectOptions.flxOption2.onClick = function(){
        var index = scopeObj.view.segProducts.selectedRowIndex[1];
        var selItem = scopeObj.view.segProducts.data[index];
        scopeObj.showPopup(false, "Delete Product", "Are you sure you want to delete \""+ selItem.productName +"\"? \nUpon deleting, this product won’t be available.");
      };

      this.view.flxProductGroupFilter.onHover = scopeObj.onHoverEventCallback;
      this.view.flxProductLineFilter.onHover = scopeObj.onHoverEventCallback;
      this.view.flxProductStatusFilter.onHover = scopeObj.onHoverEventCallback;
      this.view.flxSelectOptions.onHover = scopeObj.onHoverEventCallback;

      this.view.flxOptions.onClick = function(){
        scopeObj.showProductOptions("viewDetails");
      };
      this.view.flxReadMoreDisclosure.onClick = function(){
        scopeObj.showReadMoreDisclosurePopup();
      };
      this.view.flxReadMoreTC.onClick = function(){
        scopeObj.showReadMoreTCPopup();
      };
      this.view.popUp.btnPopUpDelete.onClick = function(){
        scopeObj.deleteProduct();
      };
      this.view.popUp.flxPopUpClose.onClick = function(){
        scopeObj.closePopup();
      };
      this.view.popUp.btnPopUpCancel.onClick = function(){
        scopeObj.closePopup();
      };
      this.view.flxCloseReadMore.onClick = function(){
        scopeObj.closePopup();
      };
      this.view.btnCloseReadMore.onClick = function(){
        scopeObj.closePopup();
      };
      this.view.flxTabFacilities.onClick = function(){
        scopeObj.setTabSkins(scopeObj.view.lblTabFacilities);
        scopeObj.showProductDetailsTabs(scopeObj.view.flxProductFacilities);
      };
      this.view.flxTab1.onClick = function(){
        scopeObj.setTabSkins(scopeObj.view.lblTab1);
        scopeObj.showProductDetailsTabs(scopeObj.view.flxProductFeatures);
      };
      this.view.flxTab2.onClick = function(){
        scopeObj.setTabSkins(scopeObj.view.lblTab2);
        scopeObj.showProductDetailsTabs(scopeObj.view.flxImgDetails);
      };
      this.view.flxTab3.onClick = function(){
        scopeObj.setTabSkins(scopeObj.view.lblTab3);
        scopeObj.showProductDetailsTabs(scopeObj.view.flxAdditionalAttributes);
      };
      this.view.flxProductDescDropdown.onClick = function(){
        scopeObj.showHideProductDescription();
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
      this.view.fontIconSortFeatureName.onTouchStart = function(){
        scopeObj.sortViewList("featureName",scopeObj.view.segAddedFeatures);
      };
      this.view.lblIconFacilityNameSort.onTouchStart = function(){
        scopeObj.sortViewList("facilityName",scopeObj.view.segProductFacilities);
      };
      this.view.lblIconFacilityFeatureSort.onTouchStart = function(){
        scopeObj.sortViewList("featuresCount",scopeObj.view.segProductFacilities);
      };
      this.view.fontIconFilter.onTouchStart = function(){
        var flxRight = scopeObj.view.flxProductFeaturesSegHeader.frame.width - scopeObj.view.flxType.frame.x - scopeObj.view.flxType.frame.width;
        var iconRight = scopeObj.view.flxType.frame.width - scopeObj.view.fontIconFilter.frame.x;
        scopeObj.view.flxProductFeaturesStatusFilter.right = (flxRight + iconRight - 28) +"px";
        if(scopeObj.view.flxProductFeaturesStatusFilter.isVisible){
          scopeObj.view.flxProductFeaturesStatusFilter.setVisibility(false);
        } else {
          scopeObj.view.flxProductFeaturesStatusFilter.setVisibility(true);
        }
        scopeObj.view.forceLayout();
      };
      this.view.statusFilterMenuFeatures.segStatusFilterDropdown.onRowClick = function(){
        scopeObj.filterBasedOnStatus();
      };
      this.view.flxProductFeaturesStatusFilter.onHover=scopeObj.onHoverEventCallback;
    },

    setConfiguration: function() {
      var self = this;
      let configurationSvc = kony.sdk.getCurrentInstance().getConfigurationService();
      configurationSvc.getAllClientAppProperties(function(response) {
        if(response && response.MARKETING_CATALOG_CONFIG && response.MARKETING_CATALOG_CONFIG.toUpperCase()==="FALSE"){
          self.config2 = false;
        } else {
          self.config2 = true;
        }
        //self.view.selectOptions.flxOption2.setVisibility(self.config2);
      },function(){});    
    },

    resetFieldsOnPreShow: function() {
      this.view.subHeader.tbxSearchBox.text = "";
      this.view.subHeader.flxClearSearchImage.setVisibility(false);
      this.view.selectOptions.flxOption2.setVisibility(false);
    },

    alignProductPopup: function() {
      if(this.formUpdateUI){
        this.view.flxViewProducts.left = "340px";
        this.view.flxViewProducts.right = "35px";
        this.view.flxViewProducts.top = this.view.flxProducts.isVisible? "106px" : "146px";
        this.view.flxPopup.left = "0px";
        this.view.flxPopup.top = "0px";
        this.view.flxPopup.width = "100%";
        this.view.flxPopup.height = "100%";
        // Due to some wierd issue flxPopup wasn't visible, So a work around is done where Dummy flex is made visible to view flxPopup.
        this.view.flxDummyToOpenPopup.setVisibility(true);
        this.view.forceLayout();
        this.formUpdateUI({action : "alignProductPopup", openPopup : true, flxProduct : "flxViewProducts"});
      }
    },

    closePopup: function() {
      this.view.popUp.setVisibility(false);
      this.view.flxReadMorePopup.setVisibility(false);
      this.view.flxPopup.setVisibility(false);
      this.view.flxDummyToOpenPopup.setVisibility(false);
      if(this.formUpdateUI)
        this.formUpdateUI({
          action : "alignProductPopup",
          openPopup : false, 
          flxProduct : "flxViewProducts", 
          top: this.view.flxProducts.isVisible? "106px" : "146px"
        });
      this.view.flxViewProducts.left = "0px";
      this.view.flxViewProducts.right = "0px";
      this.view.flxViewProducts.top = "0px";
      this.view.forceLayout();
    },

    searchProductFilter: function(text, segList, component) {
      component.flxClearSearchImage.setVisibility(text !== "");
      component.tbxSearchBox.text = text;
      var segData = segList.filter(function(data) {
        var searchText = component.tbxSearchBox.text;
        if(typeof searchText === 'string' && searchText.length > 0){
          return data.lblDescription.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
        } else{
          return true;
        }
      });
      component.segStatusFilterDropdown.setData(segData);
      component.segStatusFilterDropdown.setVisibility(segData.length > 0);
      component.flxNoResultFound.setVisibility(segData.length === 0);
      if(text === ""){
        this.filterProductGroupLineStatus();
      }
    },

    sortProductList: function(columnName) {
      // Sort ProductList by Name
      var scopeObj = this;
      var segData = scopeObj.view.segProducts.data;
      scopeObj.sortBy.column(columnName);
      var sortedSegData = segData.sort(scopeObj.sortBy.sortData);
      scopeObj.view.segProducts.setData(sortedSegData);
      scopeObj.resetSortImages();
    },
    sortViewList: function(columnName,segPath){
      var scopeObj = this;
      var segData = segPath.data;
      scopeObj.sortBy.column(columnName);
      var sortedSegData = segData.sort(scopeObj.sortBy.sortData);
      segPath.setData(sortedSegData);
      scopeObj.resetSortImages(columnName);
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

    delayTimer : function() {
      var scopeObj = this;
      return setTimeout(function() {
        scopeObj.filterProductGroupLineStatus(); //performs both filter and search
      }, 300);
    },

    delayedSearch : function() {
      clearTimeout(this.delayTimer);
      this.delayTimer();
    },

    searchFilter: function(product) {
      var searchText = this.view.subHeader.tbxSearchBox.text;
      if (product.productName===undefined){
        return false;
      } else if (typeof searchText === "string" && searchText.length > 0) {
        return product.productName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 
          || product.productGroupName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
          || product.productLineName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
      } else {
        return true;
      }
    },

    showHideSegment: function(segment, noResultFound, text) { 
      segment.setVisibility(segment.data.length > 0);
      noResultFound.setVisibility(segment.data.length === 0);
      if(text && text.length > 0)
        this.view[noResultFound.children[0]].text = text;
    },

    getProductsArray: function(productsData){
      // Creating an array of productGroups from ProductLines
      let productGroupsAll = [];
      productsData.forEach(productLine => {
        let productGroups = [];
        productGroups.push.apply(productGroups,productLine.productGroups);
        productGroups.forEach(productGroup => {
          productGroup.productLineId = productLine.productLineId || "";
          productGroup.productLineName = productLine.productLineName || "";
          productGroup.productLineRef = productLine.productLineRef || "";
        });
        productGroupsAll.push.apply(productGroupsAll, productGroups);
      });
      // Creating an array of products from ProductGroups
      let productsAll = [];
      productGroupsAll.forEach(productGroup => {
        let products = [];
        products.push.apply(products, productGroup.products);
        products.forEach(product => {
          product.productLineId = productGroup.productLineId || "";
          product.productLineName = productGroup.productLineName || "";
          product.productLineRef = productGroup.productLineRef || "";
          product.productGroupId = productGroup.productGroupId || "";
          product.productGroupName = productGroup.productGroupName || "";
          product.productGroupRef = productGroup.productGroupRef || "";
          product.description = productGroup.description || "";
          product.detailedDesc = productGroup.detailedDesc || "";
        });
        productsAll.push.apply(productsAll, products);
      });
      return productsAll;
    },

    showProductsList: function(){
      if (this.productsList) {
        //display the list
        this.view.flxProducts.setVisibility(true);
        this.view.flxProductDetails.setVisibility(false);
        this.sortBy = SortingFormExtn.getObjectSorter("productName");
        this.resetSortImages();
        this.noDataMsg = "No records found.";
        this.loadProductsPage();
        this.setProductGrpLineStatusFilter();
        this.view.forceLayout();
      }
    },

    loadProductsPage: function(){
      this.setProductSegmentData(this.productsList);
      this.showHideSegment(this.view.segProducts, this.view.flxNoRecordsFound, this.noDataMsg);
    },

    setProductSegmentData: function(resData) {
      var self = this;
      var data = [];
      resData = resData.filter(self.searchFilter).sort(this.sortBy.sortData);
      data = resData.map(self.toProductSegment.bind(self));
      this.view.segProducts.setData(data);
      this.view.forceLayout();
    },

    mappingFilterData: function(data){
      return{
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "lblDescription": {
          "text" : data,
          "skin" : this._FilterMenuSegLblSkin
        },
        "imgCheckBox":{
          "src":"checkboxselected.png"
        }
      };
    },

    setProductGrpLineStatusFilter: function(){
      var self = this;
      var data = this.productsList, statusFilter = [], groupFilter = [], lineFilter = [];
      for(var i=0;i<data.length;i++){
        if(!statusFilter.contains(data[i].status) && data[i].status!=="")
          statusFilter.push(data[i].status);
        if(!groupFilter.contains(data[i].productGroupName) && data[i].productGroupName!=="")
          groupFilter.push(data[i].productGroupName);
        if(!lineFilter.contains(data[i].productLineName) && data[i].productLineName!=="")
          lineFilter.push(data[i].productLineName);
      }

      var maxSizeText = self.getMaxSizeText(statusFilter);
      var segStatusData = statusFilter.map(self.mappingFilterData);
      self.view.statusFilterMenu.segStatusFilterDropdown.setData(segStatusData);
      self.view.flxProductStatusFilter.width=AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+55+"px";
      var indices = [];
      for(var index = 0; index < segStatusData.length; index++){
        indices.push(index);
      }
      self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,indices]];

      var segGroupData = groupFilter.map(this.mappingFilterData);
      this.view.productGroupFilterMenu.segStatusFilterDropdown.setData(segGroupData);
      this.productGrpFilterList = segGroupData;
      maxSizeText = this.getMaxSizeText(data);
      if(groupFilter.length>=3)
        this.view.flxProductGroupFilter.width=AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+72+"px";
      else
        this.view.flxProductGroupFilter.width=AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+55+"px";
      this.view.productGroupFilterMenu.width=this.view.flxProductGroupFilter.width;

      var segLineData = lineFilter.map(this.mappingFilterData);
      this.view.productLineFilterMenu.segStatusFilterDropdown.setData(segLineData);
      this.productLineFilterList = segLineData;
      maxSizeText = this.getMaxSizeText(data);
      if(lineFilter.length>=3)
        this.view.flxProductLineFilter.width=AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+72+"px";
      else
        this.view.flxProductLineFilter.width=AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+55+"px";
      this.view.productLineFilterMenu.width=this.view.flxProductLineFilter.width;

      self.selFilter = [[]];
      let selStatusInd = indices;
      self.selFilter[0][0] = [];
      self.selFilter[0][1] = [];
      self.selFilter[0][2] = [];        
      for(let i=0; i<selStatusInd.length; i++){
        self.selFilter[0][0].push(segStatusData[selStatusInd[i]].lblDescription.text);
      }
      for(let i=0; i<segGroupData.length; i++){
        if(segGroupData[i].imgCheckBox.src==="checkboxselected.png")
          self.selFilter[0][1].push(segGroupData[i].lblDescription.text);
      }
      for(let i=0; i<segLineData.length; i++){
        if(segLineData[i].imgCheckBox.src==="checkboxselected.png")
          self.selFilter[0][2].push(segLineData[i].lblDescription.text);
      }
      this.view.forceLayout();
    },

    getMaxSizeText : function(data){
      var maxText=data[0];
      for(var i=1;i<data.length;i++){
        if(maxText.length<data[i].length)
          maxText=data[i];
      }
      return maxText;
    },

    // Mapping Data to Segment segProducts
    toProductSegment: function(productData) {
      var self=this;
      var statusText = "", statusImgSkin = "";
      if(productData.status === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
        statusText = kony.i18n.getLocalizedString("i18n.secureimage.Active");
        statusImgSkin = self._IconStatusActiveSkin;
      } else if(productData.status === kony.i18n.getLocalizedString("i18n.secureimage.Inactive")) {
        statusText = kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
        statusImgSkin = self._IconStatusDeactiveSkin;
      } 
      var prodName = productData.productName ? AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(productData.productName,true) :"";
      var prodLine = productData.productLineName ? AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(productData.productLineName,true) : "";
      var prodGroup = productData.productGroupName ? AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(productData.productGroupName,true) : "";
      return {
        productName: productData.productName ? productData.productName : "N/A",
        productId: productData.productId ? productData.productId : "N/A",
        productRef: productData.productRef ? productData.productRef : "",
        productGroupName: productData.productGroupName ? productData.productGroupName : "N/A",
        productLineName: productData.productLineName ? productData.productLineName : "N/A",
        lblProductName: {
          "text": prodName ? AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getTruncatedString(prodName, 25, 25) : "N/A",
          "tooltip": prodName ? prodName : "",
          "skin" : self._LblProductSegmentSkin,
        },
        lblProductGroup: {
          "text": prodGroup ? AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getTruncatedString(prodGroup, 25, 25) : "N/A",
          "tooltip": prodGroup ? prodGroup : "",
          "skin" : self._LblProductSegmentSkin,
        },
        lblProductLine: {
          "text": prodLine ? AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getTruncatedString(prodLine, 25, 25) : "N/A",
          "tooltip": prodLine ? prodLine : "",
          "skin" : self._LblProductSegmentSkin,
        },
        fonticonActive: {
          "text": this.getStringFromi18n(this._IconStatusActiveDeactive.text),
          "skin": statusImgSkin
        },
        lblStatus: {
          "text": statusText,
          "skin" : self._LblProductSegmentSkin,
        },
        flxOptions: {
          "skin": "sknFlxBorffffff1pxRound",
          "onclick": self.showProductOptions,
          "isVisible": true
        },
        lblOptions: {
          "text": self.getStringFromi18n(self._IconOption.text),
          "skin" : self._IconOptionSkin
        },
        lblSeparator: {
          "text": "-",
          "skin" : self._SegRowSeparatorSkin
        },
      };
    },

    showProductOptions: function (type) {
      var self = this;
      var top = 0;
      var left = 0;
      self.view.selectOptions.flxSelectOptionsInner.top = "-1px";
      self.view.selectOptions.flxArrowImage.setVisibility(true);
      self.view.selectOptions.flxDownArrowImage.setVisibility(false);
      if(type==="viewDetails"){
        //showing contextual menu for View details page
        //self.setProductOptions(this.view.lblStatus.text); 
        //top of option 3 dots + height of option 3 dots
        top = this.view.flxOptions.frame.y + 25 + "px";
        //left of option 3 dots + width of select option widget - extra padding arrow postion to option 3 dots
        left = this.view.flxOptions.frame.x - 140 + 35 + "px";
      }
      else {
        //showing contextual menu in segment of listing page 
        var index = self.view.segProducts.selectedRowIndex[1];
        var templateArray = self.view.segProducts.clonedTemplates;
        //self.setProductOptions(templateArray[index].lblStatus.text);
        // Option menu height
        var contextualWidgetHeight = 48;
        for (var i = 0; i < index; i++) {
          top += templateArray[i].flxProducts.frame.height;
        }
        var segmentWidget = this.view.segProducts;
        // top + extra segment height - segmentWidget.contentOffsetMeasured.y
        top = top + 50 - segmentWidget.contentOffsetMeasured.y;
        if (top + contextualWidgetHeight > segmentWidget.frame.height) {
          //top - contextualWidgetHeight - height of 3 dots
          top = top - contextualWidgetHeight - 25;
          self.view.selectOptions.flxArrowImage.setVisibility(false);
          self.view.selectOptions.flxDownArrowImage.setVisibility(true);
          self.view.selectOptions.flxSelectOptionsInner.top = "0px";
        }
        //top + extra top height from select option widget - padding from bottom of option 3 dots
        top = top + 122 - 13 + "px";
        //left of option 3 dots + width of select option widget - extra padding arrow postion to option 3 dots
        left = templateArray[index].flxOptions.frame.x - 140 + 35 + "px";
      }
      if ((self.view.flxSelectOptions.isVisible === false) || (self.view.flxSelectOptions.isVisible === true && self.view.flxSelectOptions.top !== top)) {
        self.view.flxSelectOptions.top = top;
        self.view.flxSelectOptions.left = left;
        self.view.flxSelectOptions.setVisibility(true);
        self.view.flxSelectOptions.onHover = self.onHoverEventCallback;
      }
      else {
        self.view.flxSelectOptions.setVisibility(false);
      }
      self.view.forceLayout();
    },

    setProductOptions: function(option){
      if(option === "Active") {
        this.view.selectOptions.fontIconOption2.text = this.getStringFromi18n(this._IconDeactivate.text);
        this.view.selectOptions.lblOption2.text = kony.i18n.getLocalizedString("i18n.common.deactivate");
      }
      else {
        this.view.selectOptions.fontIconOption2.text = this.getStringFromi18n(this._IconActivate.text);
        this.view.selectOptions.lblOption2.text = kony.i18n.getLocalizedString("i18n.common.activate");
      }
    },

    resetSortImages: function (columnName) {
      if(columnName==="featureName")
        SortingFormExtn.determineSortFontIcon(this.sortBy,'featureName',this.view.fontIconSortFeatureName);
      else if(columnName==="facilityName"||columnName==="featuresCount"){
        SortingFormExtn.determineSortFontIcon(this.sortBy,'facilityName',this.view.lblIconFacilityNameSort);
        SortingFormExtn.determineSortFontIcon(this.sortBy,'featuresCount',this.view.lblIconFacilityFeatureSort);
      }
      else
        SortingFormExtn.determineSortFontIcon(this.sortBy,'productName',this.view.fontIconSortProductName);
    },

    filterProductGroupLine: function(segment){
      var selItems = segment.selectedRowItems[0];
      if(selItems.imgCheckBox.src === "checkbox.png")
        selItems.imgCheckBox.src = "checkboxselected.png";
      else
        selItems.imgCheckBox.src = "checkbox.png";
      segment.setDataAt(selItems, segment.selectedRowIndex[1]);
      this.filterProductGroupLineStatus();
    },
    /**
   *  Set Data to Segment according to Filters Applied
   */
    filterProductGroupLineStatus: function(){
      let self = this;
      let filteredData = [];
      let statusIndices = self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices;
      let segStatusData = self.view.statusFilterMenu.segStatusFilterDropdown.data;
      let segGroupData = self.view.productGroupFilterMenu.segStatusFilterDropdown.data;
      let segLineData = self.view.productLineFilterMenu.segStatusFilterDropdown.data;
      if(statusIndices!==null && segGroupData.length!==0 && segLineData.length!==0){
        let selStatusInd = statusIndices[0][1];
        if(this.view.flxProductStatusFilter.isVisible){
          self.selFilter[0][0] = [];
          for(let i=0; i<selStatusInd.length; i++){
            self.selFilter[0][0].push(segStatusData[selStatusInd[i]].lblDescription.text);
          }
        }
        else if(this.view.flxProductGroupFilter.isVisible){
          self.selFilter[0][1] = [];
          for(let i=0; i<segGroupData.length; i++){
            if(segGroupData[i].imgCheckBox.src==="checkboxselected.png")
              self.selFilter[0][1].push(segGroupData[i].lblDescription.text);
          }
        }
        else if(this.view.flxProductLineFilter.isVisible){
          self.selFilter[0][2] = [];
          for(let i=0; i<segLineData.length; i++){
            if(segLineData[i].imgCheckBox.src==="checkboxselected.png")
              self.selFilter[0][2].push(segLineData[i].lblDescription.text);
          }
        }
        filteredData = self.productsList.filter(function (rec) {
          if (self.selFilter[0][0].indexOf(rec.status===kony.i18n.getLocalizedString("i18n.secureimage.Active")?
                                           kony.i18n.getLocalizedString("i18n.secureimage.Active"):
                                           kony.i18n.getLocalizedString("i18n.secureimage.Inactive")) >= 0 && (
              rec.productGroupName===""||rec.productGroupName===undefined||self.selFilter[0][1].indexOf(rec.productGroupName) >= 0) && 
              self.selFilter[0][2].indexOf(rec.productLineName) >=0 ) {
            return rec;
          }
        });
      }
      self.setProductSegmentData(filteredData);
      self.showHideSegment(self.view.segProducts, self.view.flxNoRecordsFound, kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found"));
      self.view.forceLayout();
    },

    showEditProduct: function(productDetails) {
      var payload = productDetails.productGroup ? productDetails.productGroup.product : null;
      payload["productLineName"] = productDetails.productLineName || "N/A";
      payload["productLineId"] = productDetails.productLineId;
      payload["productLineRef"] = productDetails.productLineRef;
      payload["productGroupName"] = productDetails.productGroup ? productDetails.productGroup.productGroupName : "N/A";
      payload["productGroupId"] = productDetails.productGroup ? productDetails.productGroup.productGroupId : undefined;
      payload["productGroupRef"] = productDetails.productGroup ? productDetails.productGroup.productGroupRef : undefined;
      if(!payload.hasOwnProperty("productDescription"))
        payload.productDescription = {};
      payload = {
        "productId": payload.productId,
        "productLineRef": payload.productLineRef || "",
        "productGroupRef": payload.productGroupRef || "",
        "productName": payload.productName || "",
        "externalIndicator":payload.externalIndicator||"",
        "productRef": payload.productRef || "",
        "availableFrom": payload.availableFrom || "",
        "availableTo": payload.availableTo || "",
        "purposes": payload.purposes || "",
        "description": payload.productDescription.description  || "",
        "detailedDesc": payload.productDescription.detailedDesc || "",
        "notes": payload.productDescription.notes || "",
        "disclosure": payload.productDescription.disclosure || "",
        "termsConditions": payload.productDescription.termsConditions || "",
        "productFeatures": payload.features || "",
        "productFacilities": payload.productFacilities || "",
        "imageDetails": payload.imageDetails || "",
        "extensionData": payload.extensionData || "",
      };
      this.formUpdateUI({action: "showEditProduct", payload: payload });
    },

    showPopup: function(isError, header, message) {
      this.view.popUp.flxPopUpTopColor.skin = isError ? "sknFlxee6565Op100NoBorder" : "sknflxebb54cOp100";
      this.view.popUp.lblPopUpMainMessage.text = header;
      this.view.popUp.rtxPopUpDisclaimer.text = message;
      this.view.flxPopup.setVisibility(true);
      this.view.popUp.setVisibility(true);
      this.view.forceLayout();
      this.alignProductPopup();
    },

    deleteProduct: function() {
      var index = this.view.segProducts.selectedRowIndex[1];
      var productId = this.view.segProducts.data[index].productId;
      var payload = this.productsList.filter(function(data){
        if(data.productId === productId)
          return true;
        else return false;
      })[0];
      payload = {
        "productLine": payload.productLineName,
        "productGroup": payload.productGroupName,
        "productName": payload.productName,
        "availableFrom": payload.availableFrom,
        "availableTo": payload.availableTo,
        "purposes": payload.purposes,
        "extensionData": payload.extensionData || payload.productDescription.extensionData,
        "productDescription": payload.productDescription,
        "productDetails": payload.productDetails,
        "productFeatures": payload.productFeatures,
        "imageDetails": payload.imageDetails
      };
      this.viewProductsDAO.productOperations(this._objSeviceName2, this._objName2, this._operationName2, payload, this.willUpdateUI);
    },

    showProductDetails: function(productDetails) {
      this.view.flxProducts.setVisibility(false);
      this.view.flxProductDetails.setVisibility(true);
      var product = productDetails.productGroup ? productDetails.productGroup.product : null;
      product["productLineName"] = productDetails.productLineName || "N/A";
      product["productLineId"] = productDetails.productLineId;
      product["productLineRef"] = productDetails.productLineRef;
      product["productGroupName"] = productDetails.productGroup ? productDetails.productGroup.productGroupName : "N/A";
      product["productGroupId"] = productDetails.productGroup ? productDetails.productGroup.productGroupId : undefined;
      product["productGroupRef"] = productDetails.productGroup ? productDetails.productGroup.productGroupRef : undefined;
      this.formUpdateUI({action : "showProductDetails", breadCrumbText : product.productName.toUpperCase()});
      this.setProductTopDetails(product);
      this.setProductFeatures(product.features);
      this.setProductFacilities(product.productFacilities);
      this.setImageDetails(product.imageDetails);
      var extensionData = product.extensionData || (product.productDescription ? product.productDescription.extensionData :"");
      this.setAdditionalAttributes(extensionData || "");
      this.setTabSkins(this.view.lblTabFacilities);
      this.showProductDetailsTabs(this.view.flxProductFacilities);
      this.view.flxProductDetails.scrollToWidget(this.view.flxTopDetails);
    },

    setProductTopDetails: function(product) {
      // head row
      this.view.lblProductNameSelected.text = product.productName ? AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(product.productName) : "N/A";
      this.view.lblStatus.text = product.status || "N/A";
      this.view.fontIconStatus.text = "\ue921";
      this.view.fontIconStatus.skin = product.status === kony.i18n.getLocalizedString("i18n.secureimage.Active") ?
         this._IconStatusActiveSkin: this._IconStatusDeactiveSkin;
      // 1st row
      this.view.lblProductLineDetail.text = product.productLineName ? AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(product.productLineName) : "N/A";
      this.view.lblProductGroupDetail.text = product.productGroupName ? AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(product.productGroupName) : "N/A";
      this.view.lblProductRefDetail.text = product.productRef ? AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(product.productRef) : "N/A";
      // 2nd row
      var purposeArr = product.purposes? product.purposes.map(function(rec){return rec.type;}) : "";
      var purposes =  purposeArr.join();
      purposes = purposes.replace(/,/g,", ");
      this.view.lblPurpose.text = purposes || "N/A";
      this.view.lblAvailableFromDate.text = product.availableFrom || "N/A";
      this.view.lblAvailableToDate.text = product.availableTo || "N/A";
      // 3rd row
      this.setExtraProductDetails(product);
      // 4th row
      if(product.productDescription && (product.productDescription.description || product.productDescription.detailedDesc ||
        product.productDescription.notes || product.productDescription.disclosure || product.productDescription.termsConditions)){
        this.view.fonticonArrow.text = this._IconDropdownCollapse.text;
        this.view.flxFourthRow.setVisibility(true);
        this.view.flxProductDescBody.setVisibility(false);
        this.view.lblDescription.text = product.productDescription.description ? AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(product.productDescription.description).replace(/&amp;/g,"&") : "N/A";
        this.view.flxDescription.setVisibility(product.productDescription.hasOwnProperty("description"));
        this.view.lblDetailedDesc.text = product.productDescription.detailedDesc ? AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(product.productDescription.detailedDesc) : "N/A";
        this.view.flxDetailedDesc.setVisibility(product.productDescription.hasOwnProperty("detailedDesc"));
        this.view.lblNotes.text = product.productDescription.notes ? AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(product.productDescription.notes) : "N/A";
        this.view.flxNotes.setVisibility(product.productDescription.hasOwnProperty("notes"));
        var text = product.productDescription.disclosure || "N/A";
        this.view.lblDisclosure.fullText = text;
        this.view.flxReadMoreDisclosure.setVisibility(text.length > 250);
        this.view.lblDisclosure.bottom = text.length > 250? "19px" : "0px";
        this.view.lblDisclosure.text = text? AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getTruncatedString(AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(text), 250, 250) : "N/A";
        this.view.flxDisclosure.setVisibility(product.productDescription.hasOwnProperty("disclosure"));
        text = product.productDescription.termsConditions || "N/A";
        this.view.lblTermsAndConditions.fullText = text;
        this.view.flxReadMoreTC.setVisibility(text.length > 250);
        this.view.lblTermsAndConditions.bottom = text.length > 250? "19px" : "0px";
        this.view.lblTermsAndConditions.text = text? AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getTruncatedString(AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(text), 250, 250) : "N/A";
        this.view.flxTermsAndConditions.setVisibility(product.productDescription.hasOwnProperty("termsConditions"));
        if(this.view.flxThirdRow.isVisible)
          this.view.flxThirdRow.bottom = "0px";
        else
          this.view.flxSecondRow.bottom = "0px";
      }
      else{
        this.view.flxFourthRow.setVisibility(false);
        if(this.view.flxThirdRow.isVisible)
          this.view.flxThirdRow.bottom = "20px";
        else
          this.view.flxSecondRow.bottom = "20px";
      }
      this.view.forceLayout();
    },

    setExtraProductDetails: function(product) {
      //Add extra fields in there;
      this.view.flxThirdRow.setVisibility(false);
      this.view.flxRow1.setVisibility(true);
      this.view.lblLabel1.setVisibility(true);
      this.view.lblValue1.setVisibility(true);
      this.view.lblLabel2.setVisibility(true);
      this.view.lblValue2.setVisibility(true);
      this.view.lblLabel3.setVisibility(true);
      this.view.lblValue3.setVisibility(true);
      this.view.lblLabel1.text = this.getStringFromi18n(this._Label1);
      this.view.lblValue1.text = "";
      this.view.lblLabel2.text = this.getStringFromi18n(this._Label2);
      this.view.lblValue2.text = "";
      this.view.lblLabel3.text = this.getStringFromi18n(this._Label3);
      this.view.lblValue3.text = "";
      this.view.flxRow2.setVisibility(true);
      this.view.lblLabel4.setVisibility(true);
      this.view.lblValue4.setVisibility(true);
      this.view.lblLabel5.setVisibility(true);
      this.view.lblValue5.setVisibility(true);
      this.view.lblLabel6.setVisibility(true);
      this.view.lblValue6.setVisibility(true);
      this.view.lblLabel4.text = this.getStringFromi18n(this._Label4);
      this.view.lblValue4.text = "";
      this.view.lblLabel5.text = this.getStringFromi18n(this._Label5);
      this.view.lblValue5.text = "";
      this.view.lblLabel6.text = this.getStringFromi18n(this._Label6);
      this.view.lblValue6.text = "";
      this.view.flxRow3.setVisibility(true);
      this.view.lblLabel7.setVisibility(true);
      this.view.lblValue7.setVisibility(true);
      this.view.lblLabel8.setVisibility(true);
      this.view.lblValue8.setVisibility(true);
      this.view.lblLabel9.setVisibility(true);
      this.view.lblValue9.setVisibility(true);
      this.view.lblLabel7.text = this.getStringFromi18n(this._Label7);
      this.view.lblValue7.text = "";
      this.view.lblLabel8.text = this.getStringFromi18n(this._Label8);
      this.view.lblValue8.text = "";
      this.view.lblLabel9.text = this.getStringFromi18n(this._Label9);
      this.view.lblValue9.text = "";
      this.view.flxRow4.setVisibility(true);
      this.view.lblLabel10.setVisibility(true);
      this.view.lblValue10.setVisibility(true);
      this.view.lblLabel11.setVisibility(true);
      this.view.lblValue11.setVisibility(true);
      this.view.lblLabel12.setVisibility(true);
      this.view.lblValue12.setVisibility(true);
      this.view.lblLabel10.text = this.getStringFromi18n(this._Label10);
      this.view.lblValue10.text = "";
      this.view.lblLabel11.text = this.getStringFromi18n(this._Label11);
      this.view.lblValue11.text = "";
      this.view.lblLabel12.text = this.getStringFromi18n(this._Label12);
      this.view.lblValue12.text = "";
      this.view.flxRow5.setVisibility(true);
      this.view.lblLabel13.setVisibility(true);
      this.view.lblValue13.setVisibility(true);
      this.view.lblLabel14.setVisibility(true);
      this.view.lblValue14.setVisibility(true);
      this.view.lblLabel15.setVisibility(true);
      this.view.lblValue15.setVisibility(true);
      this.view.lblLabel13.text = this.getStringFromi18n(this._Label13);
      this.view.lblValue13.text = "";
      this.view.lblLabel14.text = this.getStringFromi18n(this._Label14);
      this.view.lblValue14.text = "";
      this.view.lblLabel15.text = this.getStringFromi18n(this._Label15);
      this.view.lblValue15.text = "";
    },

    setProductFeatures: function(features) {
      var self=this;
      if(features){
        var dataMap = {
          "feature":"feature",
          "flxViewActionBody":"flxViewActionBody",
          "flxContractsFABodyView":"flxContractsFABodyView",
          "lblActionName":"lblActionName",
          "lblActionDesc":"lblActionDesc",
          "flxFeatureStatus":"flxFeatureStatus",
          "statusValue":"statusValue",
          "statusIcon":"statusIcon"
        };
        this.view.segAddedFeatures.info=[];
        var rowData={};
        var selectedFeatures = features.filter(function(feature){ return feature.isSelected === "true";});
        var mappedData=selectedFeatures.map(function(feature){
          var selAction = feature.actions.filter(function(action){
            return action.isSelected === "true";
          });
          rowData={
            "feature":feature,
            "featureName":feature.featureName,
            "flxViewActionBody":{"left":"0px","width":"100%"},
            "flxContractsFABodyView":{"isVisible":true,"skin":"sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight"},
            "lblActionName":{"text":feature.featureName,"left":"20px"},
            "lblFASeeprator1":{"isVisible":true,"text":"-"},
            "lblActionDesc":{"text": self.getTwoDigitNumber(selAction.length)+" of "+self.getTwoDigitNumber(feature.actions.length),
                             "left": "33%",
                             "width":"30%",
                             "skin":"sknLblLatoReg117eb013px",
                             "hoverSkin":"sknLbl117eb013pxHov",
                             "onTouchStart":function(context){self.showFacilityDetailsPopup(context.rowContext.rowIndex,"FEATURES");}
                            },
            "flxFeatureStatus":{"left":"65%"},
            "statusValue":{"text":feature.featureStatus === "SID_FEATURE_ACTIVE" ? kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive")},
            "statusIcon":{"skin":feature.featureStatus === "SID_FEATURE_ACTIVE" ?self._IconStatusActiveSkin : self._IconStatusDeactiveSkin,
                          "text" :''},//"sknfontIconInactive",
            "lblCustom":{"isVisible": false},
            "template":"flxContractsFABodyView",
          };
          self.view.segAddedFeatures.info[feature.featureId]=rowData;
          return rowData;
        });
        this.view.segAddedFeatures.widgetDataMap=dataMap;
        this.sortBy = SortingFormExtn.getObjectSorter("featureName");
        mappedData=mappedData.sort(this.sortBy.sortData);
        this.resetSortImages("featureName");
        if(mappedData.length > 0){
          mappedData[mappedData.length-1].lblFASeeprator1.isVisible=false;
        }
        this.setStatusFilter(mappedData);
        this.view.segAddedFeatures.setData(mappedData);
        this.view.flxProductFeaturesSegHeader.setVisibility(mappedData.length > 0);
        this.showHideSegment(this.view.segAddedFeatures, this.view.flxNoResultFoundPF, kony.i18n.getLocalizedString("i18n.products.NoProductFeaturesAvailable"));
        this.view.forceLayout();
      } else{
        this.view.flxNoResultFoundPF.setVisibility(true);
        this.view.flxProductFeaturesSegHeader.setVisibility(false);
        this.view.segAddedFeatures.setVisibility(false);
      }
    },

    getFeatureDetailsComponent: function(index) {
      return new com.adminConsole.Products.ViewProductFeatureDetails({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "id": "ViewProductFeatureDetails" + index,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0dp",
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "isModalContainer": false,
        "skin": "slFbox",
        "top": "20px",
        "width": "100%",
        "overrides": {}
      }, {
        "overrides": {}
      }, {
        "overrides": {}
      });   
    },

    setFeatureDetails: function(viewProductFeatureDetails, feature) {
      viewProductFeatureDetails.lblFeatureName.text = feature.featureName;
      viewProductFeatureDetails.lblFeatureType.text = feature.type || "N/A";
      viewProductFeatureDetails.lbFeatureGrp.text = feature.featureGroup || "N/A";
      viewProductFeatureDetails.lblSequenceNumber.text = feature.sequenceNo || "N/A";
      viewProductFeatureDetails.lblMandatory.text = feature.isMandatory || "false";
      viewProductFeatureDetails.lblDescription.text = feature.description || "N/A";
      viewProductFeatureDetails.lblOptionDisplayType.text = feature.optionDispType || "N/A";
    },

    setOptionValues: function(viewProductFeatureDetails, feature) {
      var segData = [];
      if(feature.optionValues){
        segData = feature.optionValues.map(function(data){
          return {
            lblValue: {
              text: data.value,
            },
            lblDefault:{
              isVisible: data.value === feature.defaultValue
            },
            lblDescription: {
              text: data.desc || "N/A",
            },
            lblSeparator: {
              text: "-",
            },
          };
        });
      }
      viewProductFeatureDetails.segOptionValues.setData(segData);
      this.showHideSegment(viewProductFeatureDetails.segOptionValues, viewProductFeatureDetails.flxNoResultFoundOptionValues, "");
    },
    setProductFacilities: function(facilities){
      var self=this;
      var dataMap = {
        "flxProductAddedFeatures":"flxProductAddedFeatures",
        "lblProductsValue1":"lblProductsValue1",
        "lblProductsValue2":"lblProductsValue2",
        "lblProductsValue3":"lblProductsValue3",
        "flxOptions":"flxOptions",
        "lblIconOptions":"lblIconOptions",
        "facility":"facility"
      };
      facilities = facilities ? facilities : [];
      var mappedData=facilities.map(function(facility){
        var selectedFeatures = facility.features.filter(function(rec){return rec.isSelected === "true";});
        facility.features = selectedFeatures;
        return{
          "facilityName":facility.facilityName,
          "lblProductsValue1": {
            "text": facility.facilityName || "N/A",
            "skin":"sknLblLatoReg117eb013px",
            "onTouchStart":function(context){self.showFacilityDetailsPopup(context.rowContext.rowIndex,"FACILITIES");}
          },
          "lblProductsValue2": {
            "text": facility.code || "N/A",
            "left": "33%"
          },
          "lblProductsValue3": {
            "text":self.getTwoDigitNumber(facility.features.length)
          },
          "featuresCount":facility.features.length,
          "flxOptions":{
            "isVisible":false
          },
          "facility":JSON.parse(JSON.stringify(facility))
        };
      });
      this.sortBy = SortingFormExtn.getObjectSorter("facilityName");
      mappedData = mappedData.sort(this.sortBy.sortData);
      this.resetSortImages("facilityName");
      this.view.segProductFacilities.widgetDataMap=dataMap;
      this.view.segProductFacilities.setData(mappedData);
      this.view.flxViewFacilitiesList.setVisibility(mappedData.length > 0);
      this.view.flxFacilitiesNoResultFound.setVisibility(mappedData.length <= 0);
      this.view.forceLayout();
    },
    showFacilityDetailsPopup : function(rowIndex,context){
      var facilityData=context==="FEATURES"?this.view.segAddedFeatures.data[rowIndex].feature:this.view.segProductFacilities.data[rowIndex].facility;
      this.view.ViewProductFacilityDetails.flxProductFeatureDetails.skin="slFbox";
      if(context==="FEATURES"){
        this.setFeaturesList([facilityData],false);
        this.view.flxFacilityTabs.setVisibility(false);
        this.view.flxFacilityFeaturedAction.setVisibility(true);
        this.view.flxFacilityContainer.setVisibility(false);
        this.view.flxFacilityFeaturedAction.top="55px";
        this.view.lblFacilityPopupHeading.text = kony.i18n.getLocalizedString("i18n.products.ViewAccountActions");
        this.view.lblFacilityNamePopup.text ="";
      }else{
        this.setFeaturesList(facilityData.features,true);
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
      this.view.flxFacilityDetailsPopup.setVisibility(true);
      this.view.flxPopup.setVisibility(true);
      this.view.flxReadMorePopup.setVisibility(false);
      this.view.popUp.setVisibility(false);
      this.view.forceLayout();
      this.alignProductPopup();
    },
    setFeaturesList : function(features,showToggleArrow){
      var segmentPath=this.view.segViewSegment;
      var self =this;
      var featuresSegData = features.map(function(rec){
        var segRowData = [];
        var selAction = rec.actions.filter(function(action){return action.isSelected === "true";});
        let totalLen = rec.actions.length;
        var segSecData = {
          "id":rec.featureId,
          "flxViewActionHeader":{"isVisible":!showToggleArrow,"left":"0px","width":"100%","skin":"sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight","top":"74px"},
          "lblFASeperator3":{"isVisible":!showToggleArrow},
          "lblArrow":{"text":"\ue922","skin":"sknfontIconDescRightArrow14px"},
          "flxArrow":{"isVisible":showToggleArrow,"onClick": self.toggleSegmentSecArrow.bind(self,segmentPath)},
          "lblFeatureName":rec.featureName,
          "statusValue":{"text":rec.featureStatus === "SID_FEATURE_ACTIVE" ?
                         kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive")},
          "statusIcon":{"skin": rec.featureStatus  === "SID_FEATURE_ACTIVE"? self._IconStatusActiveSkin : self._IconStatusDeactiveSkin,
                        'text':''},
          "lblCustom":{"isVisible":false},
          "lblFASeperator1":{"isVisible":!showToggleArrow,"text":"-","top":"74px"},
          "lblFASeperator2":"-",
          "lblAvailableActions": kony.i18n.getLocalizedString("i18n.products.AccountActionsColon")+" ",
          "lblCountActions": self.getTwoDigitNumber(selAction.length),
          "lblTotalActions":{"isVisible":true, "text": "of "+self.getTwoDigitNumber(rec.actions.length)},
          'flxSelectedActions' :{'width':"50%"},
          "lblActionHeader":{"text":kony.i18n.getLocalizedString("i18n.frmMfascenarios.ACTION_CAP"),"left":"27px"},
          "lblActionDescHeader":{"text":kony.i18n.getLocalizedString("i18n.permission.DESCRIPTION"),"left":"38%"},
          "lblActionStatusHeader":kony.i18n.getLocalizedString("i18n.permission.STATUS"),
          "flxHeader":{"skin":"sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px","left":"0px","width":"100%","top":"10px"},
          "template":"flxContractsFAHeaderView"
        };
        for(var i=0;i < selAction.length; i++){
          segRowData.push({
            "id":selAction[i].actionId,
            "isRowVisible": !showToggleArrow,
            "flxViewActionBody":{"left":"0px","width":"100%"},
            "flxContractsFABodyView":{"isVisible":!showToggleArrow,"skin":"sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight"},
            "lblActionName":{"text":selAction[i].actionName,"left":"27px","width": "30%"},
            "lblActionDesc":{"text":selAction[i].actionDescription,
                             "width": "53%",
                            "left":"38%"},
            "statusValue":{"text":selAction[i].actionStatus === "SID_ACTION_ACTIVE" ?
                           kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive")},
            "statusIcon":{"skin":selAction[i].actionStatus === "SID_ACTION_ACTIVE" ? self._IconStatusActiveSkin : self._IconStatusDeactiveSkin,
                          "text" :''},//"sknfontIconInactive",
            "lblCustom":{"isVisible": false},
            "template":"flxContractsFABodyView",
          });
        }
        if( segRowData.length === 0){
          return [segSecData, [{"template": "flxContractsFAHeaderView"}]];
        }
        else {
          segRowData[segRowData.length-1].flxContractsFABodyView.skin="sknFlxBgFFFFFFbrD7D9E0r3pxBottomRound";
          return [segSecData, segRowData];
        }      
      });
      segmentPath.widgetDataMap = {
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
      segmentPath.setData(featuresSegData);
      segmentPath.setVisibility(featuresSegData.length > 0);
      this.view.lblNoFacilityFeatures.setVisibility(featuresSegData.length <= 0);
      this.view.forceLayout();
    },
    toggleSegmentSecArrow : function(segmentWidgetPath,event){
      var segData = segmentWidgetPath.data;
      var selectedSecInd = event.rowContext.sectionIndex;
      //update remaining sections
      for(var i=0;i< segData.length;i++){
        segData[i][0].lblFASeperator3.isVisible = false;
        if(selectedSecInd !== i){
          segData[i][0].flxViewActionHeader.isVisible = false;
          segData[i][0].lblFASeperator1.isVisible = false;
          segData[i][0].lblArrow.text = "\ue922";
          segData[i][0].lblArrow.skin = "sknfontIconDescRightArrow14px";
          segData[i][0].flxHeader.skin="sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px";
           segData[i][1] = this.showHideRowFlex(segData[i][1],false);
        }
      }
      if(segData[selectedSecInd][1][0].isRowVisible === false){
      segData[selectedSecInd][0].flxViewActionHeader.isVisible = true;
      segData[selectedSecInd][0].lblFASeperator1.isVisible = true;
      segData[selectedSecInd][0].lblArrow.text = "\ue915";
      segData[selectedSecInd][0].lblArrow.skin = "sknfontIconDescDownArrow12px";
      segData[selectedSecInd][0].flxHeader.skin="sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound";
      segData[selectedSecInd][1] = this.showHideRowFlex(segData[selectedSecInd][1],true);
      if(selectedSecInd < (segData.length-1)){
        segData[selectedSecInd+1][0].lblFASeperator3.isVisible = true;
      }
    } else{
      segData[selectedSecInd][0].flxViewActionHeader.isVisible = false;
      segData[selectedSecInd][0].lblFASeperator1.isVisible = false;
      segData[selectedSecInd][0].lblArrow.text = "\ue922";
      segData[selectedSecInd][0].lblArrow.skin = "sknfontIconDescRightArrow14px";
      segData[selectedSecInd][0].flxHeader.skin="sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px";
      segData[selectedSecInd][1] = this.showHideRowFlex(segData[selectedSecInd][1],false);
      if(selectedSecInd < (segData.length-1)){
        segData[selectedSecInd+1][0].lblFASeperator3.isVisible = false;
      }
    }
    segmentWidgetPath.setData(segData);
    },
    showHideRowFlex : function(rowsData,visibility){
    for(var i=0;i<rowsData.length;i++){
      if(rowsData[i].flxContractsFABodyView){
        rowsData[i].isRowVisible =visibility;
        rowsData[i].flxContractsFABodyView.isVisible = visibility;
      } 
    }
    return rowsData;
  },
    setStatusFilter: function (segData) {
    var self = this;
    var statusList=[];
    var maxSizeText="";
    var filterPath="";
    for(var i=0;i<segData.length;i++){
      if(!statusList.contains(segData[i].statusValue.text))
        statusList.push(segData[i].statusValue.text);
    }
    var widgetMap = {
      "role": "role",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var roleData = statusList.map(function(rec){
      maxSizeText=rec.length> maxSizeText.length?rec: maxSizeText;
      return {
        "role": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": rec
      };
    });
    this.view.statusFilterMenuFeatures.segStatusFilterDropdown.widgetDataMap = widgetMap;
    this.view.statusFilterMenuFeatures.segStatusFilterDropdown.setData(roleData);
    this.view.flxProductFeaturesStatusFilter.width=AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+55+"px";

    var selRoleInd = [];
    for(var j=0;j<statusList.length;j++){
      selRoleInd.push(j);
    }
    this.view.statusFilterMenuFeatures.segStatusFilterDropdown.selectedIndices = [[0,selRoleInd]];
    self.view.forceLayout();
  },
  /*
   * filters groups list based on selected role
   * @param: users backend data
   * @return : filtered data
   */
  filterBasedOnStatus : function(){
    var selFilter =[],count=0,dataToReturn=[];
    var usersData = Object.values(this.view.segAddedFeatures.info);
    var statusIndices = this.view.statusFilterMenuFeatures.segStatusFilterDropdown.selectedIndices;
    var selStatusInd = statusIndices ? statusIndices[0][1] : [];
    for (var j = 0; j < selStatusInd.length; j++) {
      selFilter.push(this.view.statusFilterMenuFeatures.segStatusFilterDropdown.data[selStatusInd[j]].lblDescription);
    }
    for(var i=0;i<usersData.length; i++){
      if (selFilter.indexOf(usersData[i].statusValue.text) >= 0){
        dataToReturn.push(usersData[i]);
      }
    }
    if(dataToReturn.length>0){
      this.view.segAddedFeatures.setVisibility(true);
      this.view.flxNoResultFoundPF.setVisibility(false);
	this.view.segAddedFeatures.setData(dataToReturn);
    }else{
      this.view.segAddedFeatures.setVisibility(false);
      this.view.flxNoResultFoundPF.setVisibility(true);
      this.view.lblNoResultFoundPF.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNorecords");
    }
    this.view.forceLayout();
  },
    setImageDetails: function(images) {
      var self = this;
      var segData = [];
      if(images){
        segData = images.map(function(data){
          return {
            lblImgType: {
              text: data.imageType,
              left: "10px",
              skin: self._SegImgLabelSkin
            },
            lblImgUrl: {
              text: data.imageUrl,
              left: "41%",
              skin: self._SegImgLabelSkin
            },
            lblSeparator: {
              text: "-",
            },
          };
        });
      }
      this.view.segImgDetails.setData(segData);
      this.showHideSegment(this.view.segImgDetails, this.view.flxNoResultFoundImgDetails, "");
    },

    setAdditionalAttributes: function(extensionData) {
      var self = this, segData = [], attributes =[];
      if (extensionData && (typeof extensionData === 'string' || extensionData instanceof String)){
        extensionData = extensionData.replace(/=/g, ":");
        extensionData = extensionData.replace(/(['"])?([a-zA-Z0-9]+)(['"])?:/g, '"$2":');
        extensionData = extensionData.replace(/:(['"])?([a-zA-Z0-9]+)(['"])?/g, ':"$2"');
        extensionData = JSON.parse(extensionData);
        for(var key in extensionData){
        attributes.push({value1 : key, value2 : extensionData[key]});
      }
      }else{
        extensionData=extensionData.additionalAttributes;
        for(var i=0;i<extensionData.length;i++){
        attributes.push({value1 : extensionData[i].key, value2 : extensionData[i].value});
      }
      }
      
      segData = attributes.map(function(data){
        return {
          lblImgType: {
            text:  AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(data.value1).replace(/&/g,"&amp;"),
            left: "10px",
            skin: self._SegAttributeLabelSkin
          },
          lblImgUrl: {
            text: AdminConsoleCommonUtilities.AdminConsoleCommonUtils.getEncodedTextInput(data.value2).replace(/&/g,"&amp;"),
            left: "41%",
            skin: self._SegAttributeLabelSkin
          },
          lblSeparator: {
            text: "-",
          },
        };
      });

      this.view.segAdditionalAttributes.setData(segData);
      this.showHideSegment(this.view.segAdditionalAttributes, this.view.flxNoResultFoundAdditionalAttributes, "");
    },

    showReadMoreDisclosurePopup: function() {
      this.view.lbReadMoreTopHeader.text = "Disclocure";
      this.view.lblReadMoreDetails.text = this.view.lblDisclosure.fullText;
      this.view.flxPopup.setVisibility(true);
      this.view.flxReadMorePopup.setVisibility(true);
      this.view.forceLayout();
      this.alignProductPopup();
    },

    showReadMoreTCPopup: function() {
      this.view.lbReadMoreTopHeader.text = "Terms And Conditions";
      this.view.lblReadMoreDetails.text = this.view.lblTermsAndConditions.fullText;
      this.view.flxPopup.setVisibility(true);
      this.view.flxReadMorePopup.setVisibility(true);
      this.view.forceLayout();
      this.alignProductPopup();
    },

    setTabSkins: function(widget) {
      this.view.lblTab1.skin = this._TabUnselectedSkin;
      this.view.lblTab2.skin = this._TabUnselectedSkin;
      this.view.lblTab3.skin = this._TabUnselectedSkin;
      this.view.lblTabFacilities.skin = this._TabUnselectedSkin;
      widget.skin = this._TabSelectedSkin;
    },

    showProductDetailsTabs: function(widget) {
      this.view.flxProductFacilities.setVisibility(false);
      this.view.flxProductFeatures.setVisibility(false);
      this.view.flxImgDetails.setVisibility(false);
      this.view.flxAdditionalAttributes.setVisibility(false);
      widget.setVisibility(true);
    },

    showHideProductDescription: function() {
      if(this.view.fonticonArrow.text === this.getStringFromi18n(this._IconDropdownCollapse.text)){
        this.view.fonticonArrow.text = this.getStringFromi18n(this._IconDropdownExpand.text);
        this.view.flxProductDescBody.setVisibility(true);
      }
      else{
        this.view.fonticonArrow.text = this.getStringFromi18n(this._IconDropdownCollapse.text);
        this.view.flxProductDescBody.setVisibility(false);
      }
    },

    getProducts: function() {
      this.getProductsAction = 1; //fetch all products list
      this.viewProductsDAO.productOperations(this._objSeviceName, this._objName, this._operationName, "", this.willUpdateUI);
    },

    getStringFromi18n: function(value){
      return  kony.i18n.getLocalizedString(value) ? kony.i18n.getLocalizedString(value) : value;
    },

    setPropertiesValueToWidget: function() {
      this.view.flxProductList.skin = this._ProductListBgSkin;
      // Product Sub Header
      this.view.subHeader.flxSubHeader.skin = this._SubHeaderSkin;
      this.view.subHeader.flxSearchContainer.skin = this._SearchContainerSkin;
      this.view.subHeader.fontIconSearchImg.skin = this._SearchIconSkin;
      this.view.subHeader.fontIconSearchImg.text = this.getStringFromi18n(this._SearchIconText.text);
      this.view.subHeader.fontIconCross.skin = this._CrossIconSkin;
      this.view.subHeader.fontIconCross.text = this.getStringFromi18n(this._CrossIconText.text);
      this.view.subHeader.tbxSearchBox.skin = this._SearchTextBoxSkin;
      this.view.subHeader.tbxSearchBox.placeholder = this.getStringFromi18n(this._SearchTextBoxPlaceholder);
      // Product List Header
      this.view.lblProductName.skin = this._ProductListHeaderSkin;
      this.view.lblProductGroup.skin = this._ProductListHeaderSkin;
      this.view.lblProductLine.skin = this._ProductListHeaderSkin;
      this.view.lblProductStatus.skin = this._ProductListHeaderSkin;
      this.view.lblProductName.text = this.getStringFromi18n(this._LblProductNameTxt);
      this.view.lblProductGroup.text = this.getStringFromi18n(this._LblProductGroupTxt);
      this.view.fontIconFilterGroup.text = this.getStringFromi18n(this._IconProductGroup.text);
      this.view.lblProductLine.text = this.getStringFromi18n(this._LblProductLineTxt);
      this.view.fontIconFilterLine.text = this.getStringFromi18n(this._IconProductLine.text);
      this.view.lblProductStatus.text = this.getStringFromi18n(this._LblProductStatusTxt);
      this.view.fontIconFilterStatus.text = this.getStringFromi18n(this._IconProductStatus.text);
      this.view.lblHeaderSeperator.skin = this._HeaderSeparatorSkin;
      // Product List Segement
      this.view.lblNoResultFound.skin = this._SegNoResultLblSkin;
      // Select Option Menu
      this.view.selectOptions.flxSelectOptionsInner.skin = this._OptionMenuSkin;
      this.view.selectOptions.fontIconOption1.skin = this._IconOptionMenuSkin;
      this.view.selectOptions.fontIconOption2.skin = this._IconOptionMenuSkin;
      this.view.selectOptions.fontIconOption3.skin = this._IconOptionMenuSkin;
      this.view.selectOptions.fontIconOption4.skin = this._IconOptionMenuSkin;
      this.view.selectOptions.lblSeperator.skin = this._SegRowSeparatorSkin;
      this.view.selectOptions.fontIconOption1.text = this.getStringFromi18n(this._IconEdit.text);
      this.view.selectOptions.fontIconOption2.text = this.getStringFromi18n(this._IconDelete.text);
      this.view.selectOptions.fontIconOption4.text = this.getStringFromi18n(this._IconCopy.text);
      // Product Filter Menu
      this.view.statusFilterMenu.flxChechboxOuter.skin = this._FilterMenuSkin;
      this.view.productGroupFilterMenu.flxCheckbox.skin = this._FilterMenuSkin;
      this.view.productLineFilterMenu.flxCheckbox.skin = this._FilterMenuSkin;
      this.view.productGroupFilterMenu.tbxSearchBox.skin = this._FilterMenuSearchBoxSkin;
      this.view.productLineFilterMenu.tbxSearchBox.skin = this._FilterMenuSearchBoxSkin;
      this.view.productGroupFilterMenu.fontIconSearchImg.skin = this._FilterMenuSearchIconSkin;
      this.view.productLineFilterMenu.fontIconSearchImg.skin = this._FilterMenuSearchIconSkin;
      this.view.productGroupFilterMenu.fontIconCross.skin = this._FilterMenuCrossIconSkin;
      this.view.productLineFilterMenu.fontIconCross.skin = this._FilterMenuCrossIconSkin;
      this.view.productGroupFilterMenu.fontIconSearchImg.text = this.getStringFromi18n(this._SearchIconText.text);
      this.view.productLineFilterMenu.fontIconSearchImg.text = this.getStringFromi18n(this._SearchIconText.text);
      this.view.productGroupFilterMenu.fontIconCross.text = this.getStringFromi18n(this._CrossIconText.text);
      this.view.productLineFilterMenu.fontIconCross.text = this.getStringFromi18n(this._CrossIconText.text);
      this.view.productGroupFilterMenu.lblSeperator.skin = this._FilterMenuSearchSeparatorSkin;
      this.view.productLineFilterMenu.lblSeperator.skin = this._FilterMenuSearchSeparatorSkin;
      this.view.productGroupFilterMenu.lblNoResultFoundPF.skin = this._FilterMenuNoResultLblSkin;
      this.view.productLineFilterMenu.lblNoResultFoundPF.skin = this._FilterMenuNoResultLblSkin;
      // Product Details Top
      this.view.flxTopDetails.skin = this._TopDetailsBgSkin;
      this.view.lblProductNameSelected.skin = this._ProductNameSkin;
      this.view.lblIconOptions.skin = this._IconOptionSkin;
      this.view.lblIconOptions.text = this.getStringFromi18n(this._IconOption.text);
      this.view.lblProductLineHeader.skin = this._ProductDetailHeaderSkin;
      this.view.lblProductGroupHeader.skin = this._ProductDetailHeaderSkin;
      this.view.lblProductRefHeader.skin = this._ProductDetailHeaderSkin;
      this.view.lblPurposeHeader.skin = this._ProductDetailHeaderSkin;
      this.view.lblAvailableFromDateHeader.skin = this._ProductDetailHeaderSkin;
      this.view.lblAvailableToDateHeader.skin = this._ProductDetailHeaderSkin;
      this.view.lblDescriptionHeader.skin = this._ProductDetailHeaderSkin;
      this.view.lblDetailedDescHeader.skin = this._ProductDetailHeaderSkin;
      this.view.lblNotesHeader.skin = this._ProductDetailHeaderSkin;
      this.view.lblDisclosureHeader.skin = this._ProductDetailHeaderSkin;
      this.view.lblTermsAndConditionsHeader.skin = this._ProductDetailHeaderSkin;
      this.view.lblProductLineDetail.skin = this._ProductDetailSkin;
      this.view.lblProductGroupDetail.skin = this._ProductDetailSkin;
      this.view.lblProductRefDetail.skin = this._ProductDetailSkin;
      this.view.lblPurpose.skin = this._ProductDetailSkin;
      this.view.lblAvailableFromDate.skin = this._ProductDetailSkin;
      this.view.lblAvailableToDate.skin = this._ProductDetailSkin;
      this.view.lblDescription.skin = this._ProductDetailSkin;
      this.view.lblDetailedDesc.skin = this._ProductDetailSkin;
      this.view.lblNotes.skin = this._ProductDetailSkin;
      this.view.lblDisclosure.skin = this._ProductDetailSkin;
      this.view.lblTermsAndConditions.skin = this._ProductDetailSkin;
      this.view.lblProductLineHeader.text = this.getStringFromi18n(this._LblProductLineHeader);
      this.view.lblProductGroupHeader.text = this.getStringFromi18n(this._LblProductGroupHeader);
      this.view.lblProductRefHeader.text = this.getStringFromi18n(this._LblProductRefHeader);
      this.view.lblPurposeHeader.text = this.getStringFromi18n(this._LblPurposeHeader);
      this.view.lblAvailableFromDateHeader.text = this.getStringFromi18n(this._LblAvailableFromDateHeader);
      this.view.lblAvailableToDateHeader.text = this.getStringFromi18n(this._LblAvailableToDateHeader);
      this.view.lblProductDescHeader.skin = this._ProductDescriptionHeaderSkin;
      this.view.lblProductDescHeader.text = this.getStringFromi18n(this._LblProductDescriptionHeader);
      this.view.fonticonArrow.skin = this._IconDropdownSkin;
      this.view.fonticonArrow.text = this.getStringFromi18n(this._IconDropdownCollapse.text);
      this.view.lblDescriptionHeader.text = this.getStringFromi18n(this._LblDescriptionHeader);
      this.view.lblDetailedDescHeader.text = this.getStringFromi18n(this._LblDetailedDescHeader);
      this.view.lblNotesHeader.text = this.getStringFromi18n(this._LblNotesHeader);
      this.view.lblDisclosureHeader.text = this.getStringFromi18n(this._LblDisclosureHeader);
      this.view.lblTermsAndConditionsHeader.text = this.getStringFromi18n(this._LblTermsAndConditionsHeader);
      this.view.lblReadMoreDisclosure.skin = this._ReadMoreSkin;
      this.view.lblReadMoreDisclosure.text = this.getStringFromi18n(this._LblReadMore);
      this.view.lblReadMoreTC.skin = this._ReadMoreSkin;
      this.view.lblReadMoreTC.text = this.getStringFromi18n(this._LblReadMore);
      // Product Details Bottom
      this.view.flxBottomDetails.skin = this._BottomDetailsBgSkin;
      this.view.lblTab1.text = this.getStringFromi18n(this._Tab1Text);
      this.view.lblTab2.text = this.getStringFromi18n(this._Tab2Text);
      this.view.lblTab3.text = this.getStringFromi18n(this._Tab3Text);
      this.view.lblSeparatorBottomDetails.skin = this._SeparatorBottomDetailsSkin;
      this.view.lblNoResultFoundPF.skin = this._LblNoResultSkin;
      this.view.lblNoResultFoundImgDetails.skin = this._LblNoResultSkin;
      this.view.lblNoResultFoundAdditionalAttributes.skin = this._LblNoResultSkin;
      this.view.lblNoResultFoundPF.text = this.getStringFromi18n(this._NofeaturesText);
      this.view.lblImgTypeHeader.skin = this._ImgHeaderSkin;
      this.view.lblImgUrlHeader.skin = this._ImgHeaderSkin;
      this.view.lblSeparatorImgDetailsHeader.skin = this._HeaderSeparatorSkin;
      this.view.lblImgTypeHeader.text = this.getStringFromi18n(this._LblImgTypeHeader);
      this.view.lblImgUrlHeader.text = this.getStringFromi18n(this._LblImgUrlHeader);
      this.view.lblNoResultFoundImgDetails.text = this.getStringFromi18n(this._NoImagesText);
      this.view.lblAttribute1Header.skin = this._AttributeHeaderSkin;
      this.view.lblAttribute2Header.skin = this._AttributeHeaderSkin;
      this.view.lblSeparatorAttributeHeader.skin = this._HeaderSeparatorSkin;
      this.view.lblAttribute1Header.text = this.getStringFromi18n(this._LblAttribute1Header);
      this.view.lblAttribute2Header.text = this.getStringFromi18n(this._LblAttribute2Header);
      this.view.lblNoResultFoundAdditionalAttributes.text = this.getStringFromi18n(this._NoAttributesText);
      // Popup
      this.view.flxPopup.skin = this._PopupOuterShadowBgSkin;
      this.view.flxReadMorePopup.skin = this._PopupBgSkin;
      this.view.popUp.flxPopUp.skin = this._PopupBgSkin;
      this.view.flxReadMoreTopBar.skin = this._PopupTopBarSkin;
      this.view.lblSeparatorReadMoreHeader.skin = this._PopupTopHeaderSeparatorSkin;
      this.view.fontIconCloseReadMore.skin = this._PopupCloseIconSkin;
      this.view.popUp.fontIconImgCLose.skin = this._PopupCloseIconSkin;
      this.view.lbReadMoreTopHeader.skin = this._LblPopupReadMoreHeaderSkin;
      this.view.lblAgreementTerms.skin = this._LblAgreementTermsSkin;
      this.view.lblAgreementTerms.text = this.getStringFromi18n(this._LblAgreementTermsText);
      this.view.lblReadMoreDetails.skin = this._LblReadMoreDetailsSkin;
      this.view.flxReadMorePopupButtons.skin = this._PopupButtonConatinerBgSkin;
      this.view.popUp.flxPopUpButtons.skin = this._PopupButtonConatinerBgSkin;
      this.view.btnCloseReadMore.skin = this._PopupButtonCloseSkin;
      this.view.btnCloseReadMore.hoverSkin = this._PopupButtonCloseHoverSkin;
      this.view.popUp.flxPopUpTopColor.skin = this._PopupWarningTopBarSkin;
      //this.view.popUp.flxPopUpTopColor.skin = this._PopupAlertTopBarSkin;
      this.view.popUp.lblPopUpMainMessage.skin = this._PopupMainHeaderSkin;
      this.view.popUp.rtxPopUpDisclaimer.skin = this._PopupDisclaimerSkin;
      this.view.popUp.btnPopUpCancel.skin = this._PopupButtonNoSkin;
      this.view.popUp.btnPopUpCancel.hoverSkin = this._PopupButtonNoHoverSkin;
      this.view.popUp.btnPopUpCancel.skin = this._PopupButtonYesSkin;
      this.view.popUp.btnPopUpCancel.hoverSkin = this._PopupButtonYesHoverSkin;
      this.view.forceLayout();
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
      return updatedCount;
    },
  };
});