define(function () {
  var checkboxSelected = "checkboxselected.png";
  var checkbox = "checkbox.png";
  var scrollHeight = 0;

  function optimizeCalendarField(widgetID) {
    var text = document.getElementById(widgetID);
    text.onkeypress = text.onpaste = checkInput;
  }

  function checkInput(e) {
    var calendarExpression = /[^\d|/]/gi;

    e = e || event;
    var char = e.type === 'keypress' ? String.fromCharCode(e.keyCode || e.which)
      : (e.clipboardData || window.clipboardData).getData('Text');

    if (calendarExpression.test(char)) {
      return false;
    }
  }
  var getDisplayCode = function (code,displayLength) {
    if(code !== undefined){
      if(code.length<=displayLength)
        return code;
      else
        return code.slice(0,displayLength-3) + "...";
    }      
  };

  var optimizeNumberField = function (widgetID) {
    var text = document.getElementById(widgetID);
    text.onkeypress = text.onpaste = checkNumberInput;
  };
  function allowOnlyAlphaNumericValues(e) {
    var alphaNumeric = /[^\d|a-z|A-Z]/i;

    e = e || event;
    var char = e.type === 'keypress' ? String.fromCharCode(e.keyCode || e.which)
      : (e.clipboardData || window.clipboardData).getData('Text');

    if (alphaNumeric.test(char)) {
      return false;
    }
  }
  var restrictTextFieldToAlphaNumeric = function (widgetID) {
    var text = document.getElementById(widgetID);
    text.onkeypress = text.onpaste = allowOnlyAlphaNumericValues;
  };
  function allowAlphaNumericWithSpaceValues(e) {
    var alphaNumeric = /[^\d|a-z|A-Z| ]/i;

    e = e || event;
    var char = e.type === 'keypress' ? String.fromCharCode(e.keyCode || e.which)
      : (e.clipboardData || window.clipboardData).getData('Text');

    if (alphaNumeric.test(char)) {
      return false;
    }
  }
  var restrictTextFieldToAlphaNumericWithSpace = function (widgetID) {
    var text = document.getElementById(widgetID);
    text.onkeypress = text.onpaste = allowAlphaNumericWithSpaceValues;
  };

  function allowOnlyNumericValues(e) {
    var alphaNumeric = /[^\d]/i;

    e = e || event;
    var char = e.type === 'keypress' ? String.fromCharCode(e.keyCode || e.which)
      : (e.clipboardData || window.clipboardData).getData('Text');

    if (alphaNumeric.test(char)) {
      return false;
    }
  }
  var restrictTextFieldToNumeric = function (widgetID) {
    var text = document.getElementById(widgetID);
    text.onkeypress = text.onpaste = allowOnlyNumericValues;
  };
  
  function allowOnlyISDCode(e){
    var ISDCode = /^(\+?\d{1,3}|\+?\d{1,4})$/;
    
    e = e || event;
    var char = e.type === 'keypress' ? String.fromCharCode(e.keyCode || e.which)
      : (e.clipboardData || window.clipboardData).getData('Text');
    
    return ISDCode.test(char);
  }
  var restrictTextFieldToISDCode = function(widgetID){
    var text = document.getElementById(widgetID);
    text.onkeypress = text.onpaste = allowOnlyISDCode;
  }
  
  function allowOnlyPhoneNumber(e) {
    var phoneNumber = /^[+|\-|0-9]/;

    e = e || event;
    var char = e.type === 'keypress' ? String.fromCharCode(e.keyCode || e.which)
      : (e.clipboardData || window.clipboardData).getData('Text');

    return phoneNumber.test(char);
  }
  var restrictTextFieldToPhoneNumber = function (widgetID) {
    var text = document.getElementById(widgetID);
    text.onkeypress = text.onpaste = allowOnlyPhoneNumber;
  }
  function allowOnlyAlphabets(e) {
    var alphabets = /[^a-z|A-Z]/i;

    e = e || event;
    var char = e.type === 'keypress' ? String.fromCharCode(e.keyCode || e.which)
      : (e.clipboardData || window.clipboardData).getData('Text');

    if (alphabets.test(char)) {
      return false;
    }
  }
  var restrictTextFieldToAlphabets = function (widgetID) {
    var text = document.getElementById(widgetID);
    text.onkeypress = text.onpaste = allowOnlyAlphabets;
  }


  var checkNumberInput = function (e) {
    var arr = "1234567890";
    var code;
    if (window.event)
      code = e.keyCode;
    else
      code = e.which;
    var char = keychar = String.fromCharCode(code);
    if (arr.indexOf(char) == -1)
      return false;
  };
  var deepEquals = function (obj1, obj2) {
    if (!obj1 || !obj2) {
      return false;
    }
    if (typeof obj1 !== typeof obj2) {
      return false;
    }
    if (typeof obj1 === 'object') {
      if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
      }
      return Object.keys(obj1).every(function (key) {
        return deepEquals(obj1[key], obj2[key]);
      });
    } else {
      return obj1 === obj2;
    }
  };
  var rowLeftSwipeAnimation = function (formRef, segRef, rowObj) {
    var transfromObject = kony.ui.makeAffineTransform();
    transfromObject.translate
      (
        -1000,
        0
      );
    var animationDef = {

      50: {
        "transform": transfromObject
      },
      100: {
        "height": "0dp",
        "stepConfig": {
          "timingFunction": kony.anim.Linear
        }
      }
    };

    var animationConfig =
    {
      delay: 0.01,
      duration: 2.5,
      fillMode: kony.anim.FILL_MODE_FORWARDS,
      iterationCount: 1,
    };
    var rowObject = {
      sectionIndex: rowObj.sectionIndex, // section index of row to be swiped left
      rowIndex: rowObj.rowIndex // row index of row to be swiped left
    };
    var animationDefObject = kony.ui.createAnimation(animationDef);

    var CallBack = function (res) {
      console.log(res);
      return null;
    };
    var endCallBack = function (res) {
      console.log(res);
      var removeRow = function () {
        segRef.removeAt(rowObj.rowIndex, rowObj.sectionIndex);
      };
      window.setTimeout(removeRow, 2500);
    };
    segRef.animateRows(
      {
        rows: [rowObject],
        animation:
        {
          definition: animationDefObject,
          config: animationConfig,
          animationStart: CallBack("start"),
          animationEnd: endCallBack("end")
        }
      }
    );
    return null;
  };
  function isValidAmount(numStr) {
    try {
      if (numStr || numStr == "0") {
        numStr = +numStr;
        if (!isNaN(numStr)) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }
  var getTruncatedString = function (text, maxLimit, truncateSize) {
    var self = this;
    var truncatedStr = "";
    if (text) {
      truncatedStr = text.length > maxLimit ? (text.substr(0, truncateSize) + "...") : (text);
    }
    return truncatedStr;
  };
  var getParamValueOrNA = function (param) {
    return param ? param : "N/A";
  };
  var getParamValueOrEmptyString = function (param) {
    return param ? param : "";
  };
  function togglePreferredCheckbox(widget) {
    widget.src = (widget.src === checkbox) ? checkboxSelected : checkbox;
  }
  function maskSSN(ssn) {
    return "XX-XXX-" + ssn.slice(-4);
  }
  function getValidString(value) {
    return value ? value : "N/A";
  }
  function showError(Widget) {
    var ErrorSkinTbx = "skntbxBordereb30173px";// Error skin for text box
    var ErrorSkinLst = "sknlbxeb30173px";// Error skin for list box

    if (Widget.wType === "TextField")
      Widget.skin = ErrorSkinTbx;
    else
      Widget.skin = ErrorSkinLst;
  }
  function showNoError(Widget) {
    var NormalSkinTbx = "skntxtbxDetails0bbf1235271384a";// Normal skin for text box
    var NormalSkinLst = "sknlstbxNormal0f9abd8e88aa64a";// Normal skin for list box

    if (Widget.wType === "TextField")
      Widget.skin = NormalSkinTbx;
    else
      Widget.skin = NormalSkinLst;
  }
  function openEmailConfirm(popupModel, formInstance) {
    //Opens an email popup 
    formInstance.view.lblPopupHeader.text = popupModel.header;
    formInstance.view.lblPopUpMainMessage.text = popupModel.message;
    formInstance.view.btnPopUpDelete.text = popupModel.confirmMsg;
    formInstance.view.btnPopUpCancel.text = popupModel.cancelMsg;

    formInstance.view.btnPopUpDelete.onClick = function () {
      popupModel.confirmAction();
      formInstance.view.flxPopupSelectEnrolEmail.setVisibility(false);
    };
    formInstance.view.flxPopUpClose.onClick = function () {
      popupModel.cancelAction();
      formInstance.view.flxPopupSelectEnrolEmail.setVisibility(false);
    };
    formInstance.view.btnPopUpCancel.onClick = function () {
      formInstance.view.flxPopupSelectEnrolEmail.setVisibility(false);
    };
    formInstance.view.flxPopupSelectEnrolEmail.setVisibility(true);
  }
  function openErrorPopup(popupModel, formInstance) {
    //Opens an error popup 
    formInstance.view.popUpError.flxPopUpTopColor.skin = "sknFlxBge61919";
    formInstance.view.popUpError.lblPopUpMainMessage.text = popupModel.header;
    formInstance.view.popUpError.rtxPopUpDisclaimer.text = popupModel.message;
    formInstance.view.popUpError.btnPopUpCancel.text = popupModel.closeMsg;

    formInstance.view.popUpError.btnPopUpCancel.onClick = function () {
      popupModel.closeAction();
      formInstance.view.flxPopUpError.setVisibility(false);
    };
    formInstance.view.popUpError.flxPopUpClose.onClick = function () {
      formInstance.view.flxPopUpError.setVisibility(false);
    };
    formInstance.view.flxPopUpError.setVisibility(true);
    formInstance.view.forceLayout();
  }
  function openConfirm(popupModel, formInstance) {
    //Opens a confirm popup 
    formInstance.view.popUpConfirmation.lblPopUpMainMessage.text = popupModel.header;
    formInstance.view.popUpConfirmation.rtxPopUpDisclaimer.text = popupModel.message;
    formInstance.view.popUpConfirmation.btnPopUpDelete.text = popupModel.confirmMsg;
    formInstance.view.popUpConfirmation.btnPopUpCancel.text = popupModel.cancelMsg;
    formInstance.view.popUpConfirmation.setVisibility(true);
    formInstance.view.SuspendUserpopUp.setVisibility(false);

    formInstance.view.popUpConfirmation.btnPopUpDelete.onClick = function () {
      popupModel.confirmAction();
      formInstance.view.flxPopUpConfirmation.setVisibility(false);
    };
    formInstance.view.popUpConfirmation.btnPopUpCancel.onClick = function () {
      popupModel.cancelAction();
      formInstance.view.flxPopUpConfirmation.setVisibility(false);
    };
    formInstance.view.popUpConfirmation.flxPopUpClose.onClick = function () {
      popupModel.cancelAction();
      formInstance.view.flxPopUpConfirmation.setVisibility(false);
    };
    formInstance.view.flxPopUpConfirmation.setVisibility(true);
  }
  function openConfirmforComponent(popupModel, formInstance) {
    //Opens a confirm popup 
    formInstance.popUpConfirmation.lblPopUpMainMessage.text = popupModel.header;
    formInstance.popUpConfirmation.rtxPopUpDisclaimer.text = popupModel.message;
    formInstance.popUpConfirmation.btnPopUpDelete.text = popupModel.confirmMsg;
    formInstance.popUpConfirmation.btnPopUpCancel.text = popupModel.cancelMsg;
	formInstance.popUpConfirmation.lblPopUpMainMessage.setVisibility(true);
    formInstance.popUpConfirmation.btnPopUpDelete.onClick = function () {
      popupModel.confirmAction();
      formInstance.flxPopUpConfirmation.setVisibility(false);
    };
    formInstance.popUpConfirmation.btnPopUpCancel.onClick = function () {
      popupModel.cancelAction();
      formInstance.flxPopUpConfirmation.setVisibility(false);
    };
    formInstance.popUpConfirmation.flxPopUpClose.onClick = function () {
      popupModel.cancelAction();
      formInstance.flxPopUpConfirmation.setVisibility(false);
    };
    formInstance.flxPopUpConfirmation.setVisibility(true);
  }
  function setVisibility(widget, state) {
    if (state !== widget.isVisible) {
      widget.setVisibility(state);
    }
  }
  function getSortData(SegmentWidget, columnName, sortImgWidget, formInstance) {

    var data = SegmentWidget.info.searchAndSortData;
    if ((!formInstance.sortBy) || formInstance.sortBy.columnName !== columnName) {
      formInstance.sortBy = formInstance.getObjectSorter(columnName);
    }
    formInstance.sortBy.column(columnName);
    if (formInstance.sortBy.inAscendingOrder) {
      sortImgWidget.text = kony.adminConsole.utils.fonticons.DESCENDING_IMAGE;
      sortImgWidget.skin = kony.adminConsole.utils.fonticons.DESCENDING_SKIN;
    } else {
      sortImgWidget.text = kony.adminConsole.utils.fonticons.ASCENDING_IMAGE;
      sortImgWidget.skin = kony.adminConsole.utils.fonticons.ASCENDING_SKIN;
    }
    return data.sort(formInstance.sortBy.sortData);
  }
  function sort(SegmentWidget, columnName, sortImgWidget, defaultScrollWidget, NumberofRecords, LoadMoreRow, formInstance) {
    var data = SegmentWidget.info.searchAndSortData;
    var sortdata = getSortData(SegmentWidget, columnName, sortImgWidget, formInstance);
    if (NumberofRecords === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ALL")) {
      SegmentWidget.info.searchAndSortData = sortdata;
      SegmentWidget.setData(sortdata);
    } else if (data.length > NumberofRecords) {
      SegmentWidget.info.searchAndSortData = sortdata;
      var newData = sortdata.slice(0, NumberofRecords);
      if (LoadMoreRow !== null) newData.push(LoadMoreRow);
      SegmentWidget.setData(newData);
    } else {
      SegmentWidget.info.searchAndSortData = sortdata;
      SegmentWidget.setData(sortdata);
    }
    formInstance.view.forceLayout();
    if (defaultScrollWidget !== "NONE") {
      if (defaultScrollWidget === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.TOEND")) {
        formInstance.view.flxMainContent.scrollToEnd();
      } else {
        formInstance.view.flxMainContent.scrollToWidget(defaultScrollWidget);
      }
    }
  }
  function storeScrollHeight(widget) {
    try {
      scrollHeight = widget.contentOffsetMeasured.y < 0 ? (widget.contentOffsetMeasured.y) * (-1) : (widget.contentOffsetMeasured.y);
    } catch (ignored) { }
  }
  function scrollToDefaultHeight(widget) {
    try {
      widget.setContentOffset({
        y: scrollHeight,
        x: 0
      });
    } catch (ignored) { }
  }
  function getLabelWidth(text,skinFont){
    var font = skinFont?skinFont:"13px Lato-Regular";
    var canvas = document.createElement("canvas"); 
    var context = canvas.getContext("2d"); 
    context.font = font; 
    var width = context.measureText(text).width; 
    return Math.ceil(width);
  }
  function copyTextToClipboard(text) {
    function selectElementText(element) {
      if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
      } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(element);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    }

    var element = document.createElement('DIV');
    element.textContent = text;
    document.body.appendChild(element);
    selectElementText(element);
    document.execCommand('copy');
    element.remove();

  }
  function setEnableDisableSkinForButton(btnWidgetPath,isPrimary,isEnable){
    if(isPrimary === true && isEnable === true){
      btnWidgetPath.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      btnWidgetPath.hoverSkin = "sknBtn005198LatoRegular13pxFFFFFFRad20px";
      btnWidgetPath.focusSkin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      btnWidgetPath.setEnabled(true);
    } else if(isPrimary === false && isEnable === true){
      btnWidgetPath.skin = "sknBtn4A77A0LatoRegular13pxFFFFFFRad20px";
      btnWidgetPath.hoverSkin = "sknBtn2D5982LatoRegular13pxFFFFFFRad20px";
      btnWidgetPath.focusSkin = "sknBtn4A77A0LatoRegular13pxFFFFFFRad20px";
      btnWidgetPath.setEnabled(true);
    } else {
      btnWidgetPath.skin = "sknBtnDisable7B7B7Brad20px";
      btnWidgetPath.hoverSkin = "sknBtnDisable7B7B7Brad20px";
      btnWidgetPath.focusSkin = "sknBtnDisable7B7B7Brad20px";
      btnWidgetPath.setEnabled(false);
    }
  }
  function getAddressText(city,country){
    var address="N/A";
    if(city&&city.length>0){
      address=city;
      if(country)
        address=address+", "+country;
    }else{
      address=country;
    }
    address= (address && address.length>0) ? address:"N/A";
    return address;
  }
  function getEncodedTextInput(textInput,replaceAmp){
    var encodedInput = textInput ? textInput.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/=/g,"&eq;") : "";
    if(textInput && textInput.indexOf("&amp") < 0 && replaceAmp === true){
      encodedInput = encodedInput.replace(/&/g,"&amp;");
    }
    return encodedInput;
  }
  var constantConfig =  {
    BUSINESS_TYPE : "TYPE_ID_BUSINESS",
    CAMPAIGN_TYPE : "TYPE_ID_CAMPAIGN",
    RETAIL_TYPE : "TYPE_ID_RETAIL",
    WEALTH_TYPE : "TYPE_ID_WEALTH",
    LEAD_TYPE : "TYPE_ID_LEAD",
    PROSPECT_TYPE : "TYPE_ID_PROSPECT",
    APPLICANT : "APPLICANT",
    ACTIVE:"SID_ACTIVE",
    INACTIVE:"SID_INACTIVE",
    SUSPEND:"SID_SUSPENDED",
    MONETARY:"MONETARY",
    NON_MONETARY:"NON_MONETARY",
    ACTION_ACTIVE: "SID_ACTION_ACTIVE",
    ACTION_INACTIVE:"SID_ACTION_INACTIVE",
    FEATURE_ACTIVE: "SID_FEATURE_ACTIVE",
    FEATURE_INACTIVE:"SID_FEATURE_INACTIVE",
    FEATURE_UNAVAILABLE : "SID_FEATURE_UNAVAILABLE",
    FEATURE_DOWN : "SID_FEATURE_DOWN",
    CUST_ACTIVE : "SID_CUS_ACTIVE",
    CUST_LOCKED : "SID_CUS_LOCKED",
    CUST_SUSPEND  : "SID_CUS_SUSPENDED",
    CUST_NEW : "SID_CUS_NEW"
  };
  var executableHtmlKeywords = ["alert(","prompt(","onload=","onerror=","confirm("];
  var clientProperties ;

  function isSCAEnable(clientProperties){
    if(clientProperties){
      return clientProperties.SPOTLIGHT_DISABLE_SCA && clientProperties.SPOTLIGHT_DISABLE_SCA.toUpperCase()==="FALSE";
    } else {
      return false;
    }
  };
  
  function isSCADeviceManagementEnable(clientProperties){
    if(clientProperties){
      return clientProperties.SCA_DEVICE_MANAGEMENT && clientProperties.SCA_DEVICE_MANAGEMENT.toUpperCase()==="TRUE";
    } else {
      return false;
    }
  };
  
  function isSCAAuthenticatorManagementEnable(clientProperties){
    if(clientProperties){
      return clientProperties.SCA_AUTHENTICATOR_MANAGEMENT && clientProperties.SCA_AUTHENTICATOR_MANAGEMENT.toUpperCase()==="TRUE";
    } else {
      return false;
    }
  };
  
  function fetchClientProperties(){
    return new Promise((resolve, reject) => {
      let configurationSvc = kony.sdk.getCurrentInstance().getConfigurationService();
      configurationSvc.getAllClientAppProperties(function(response) {
        resolve(response);
      },function(){
        reject("unable to fetch client properties");
      });
    });
  };
  
  function showInformationPopup(popupModel, formInstance) {
    //Opens a information popup 
    formInstance.view.popUpConfirmation.lblPopUpMainMessage.text = popupModel.header;
    formInstance.view.popUpConfirmation.rtxPopUpDisclaimer.text = popupModel.message;
    formInstance.view.popUpConfirmation.btnPopUpDelete.text = popupModel.confirmMsg;
    formInstance.view.popUpConfirmation.btnPopUpCancel.isVisible = false;

    formInstance.view.popUpConfirmation.btnPopUpDelete.onClick = closePopup;
    
    formInstance.view.popUpConfirmation.flxPopUpClose.onClick = closePopup;
    
    function closePopup(){
      formInstance.view.flxPopUpConfirmation.setVisibility(false);
      formInstance.view.popUpConfirmation.btnPopUpCancel.isVisible = true;
    }
    
    formInstance.view.flxPopUpConfirmation.setVisibility(true);
  };
  return {
    AdminConsoleCommonUtils: {
      optimizeCalendarField: optimizeCalendarField,
      optimizeNumberField: optimizeNumberField,
      getDisplayCode: getDisplayCode,
      deepEquals: deepEquals,
      restrictTextFieldToAlphaNumeric: restrictTextFieldToAlphaNumeric,
      restrictTextFieldToNumeric: restrictTextFieldToNumeric,
      restrictTextFieldToISDCode: restrictTextFieldToISDCode,
      restrictTextFieldToPhoneNumber: restrictTextFieldToPhoneNumber,
      restrictTextFieldToAlphabets: restrictTextFieldToAlphabets,
      restrictTextFieldToAlphaNumericWithSpace : restrictTextFieldToAlphaNumericWithSpace,
      rowLeftSwipeAnimation: rowLeftSwipeAnimation,
      isValidAmount: isValidAmount,
      getTruncatedString: getTruncatedString,
      getParamValueOrNA: getParamValueOrNA,
      getParamValueOrEmptyString: getParamValueOrEmptyString,
      getLabelWidth : getLabelWidth,
      togglePreferredCheckbox: togglePreferredCheckbox,
      maskSSN: maskSSN,
      getValidString: getValidString,
      showError: showError,
      showNoError: showNoError,
      openEmailConfirm: openEmailConfirm,
      openErrorPopup: openErrorPopup,
      openConfirm: openConfirm,
      openConfirmforComponent:openConfirmforComponent,
      setVisibility: setVisibility,
      radioNotSelected: "radio_notselected.png",
      radioSelected: "radio_selected.png",
      checkboxSelected: "checkboxselected.png",
      checkboxSelectedlbl: "\ue965",
       checkboxnormallbl: "\ue966",
      
      checkboxnormal: "checkboxnormal.png",
      checkbox: "checkbox.png",
      checkboxDisable: "checkboxdisable.png",
      checkboxPartial: "checkboxpartial.png",
       checkboxPartiallbl: "\ue9ad",
      ALERTS_INPUT_TYPES: {
        "Range": "Range",
        "List": "List",
        "EqualTo": "EqualTo",
        "NoInputNeeded": "NoInputNeeded"
      },
      getSortData: getSortData,
      sort: sort,
      storeScrollHeight: storeScrollHeight,
      scrollToDefaultHeight: scrollToDefaultHeight,
      copyTextToClipboard: copyTextToClipboard,
      constantConfig: constantConfig,
      setEnableDisableSkinForButton: setEnableDisableSkinForButton,
      getAddressText : getAddressText,
      getEncodedTextInput: getEncodedTextInput,
      clientProperties : clientProperties,
      isSCAEnable : isSCAEnable,
      showInformationPopup : showInformationPopup,
      fetchClientProperties : fetchClientProperties,
      isSCAAuthenticatorManagementEnable : isSCAAuthenticatorManagementEnable,
      isSCADeviceManagementEnable : isSCADeviceManagementEnable,
      executableHtmlKeywords : executableHtmlKeywords
    }
  };

});
