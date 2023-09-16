define(function () {

	/* for header tabs*/
	var tabUtilButtonFunction = function (widgetArray, selectedTab) {
		for (var i = 0; i < widgetArray.length; i++) {

			if (widgetArray[i] === selectedTab) {
				widgetArray[i].skin = "sknBtnUtilActiveUnderline192B4512pxSemibold"; //selected skin
				widgetArray[i].hoverSkin = "sknBtnUtilActiveUnderline192B4512pxSemibold";
			} else {
				widgetArray[i].skin = "sknBtnUtilRest696C73LatoSemibold12Px"; //normal skin sknBtnUtilRest73767812pxReg
				widgetArray[i].hoverSkin = "sknBtnUtilHoverLatoSemibold192B4512Px"; //hover skin
			}
		}
	};

	var tabUtilLabelFunction = function (widgetArray, selectedTab) {
		for (var i = 0; i < widgetArray.length; i++) {

			if (widgetArray[i] === selectedTab) {
				widgetArray[i].skin = "sknLblTabUtilActive";  //selected skin
				widgetArray[i].hoverSkin = "sknLblTabUtilActive";
			} else {
				widgetArray[i].skin = "sknLblTabUtilRest"; //normal skin
				widgetArray[i].hoverSkin = "sknLblTabUtilHover"; //hover skin
			}
		}
	};
	/* for vertical tabs*/
	var tabUtilVerticleButtonFunction = function (widgetArray, selectedTab) {
		for (var i = 0; i < widgetArray.length; i++) {

			if (widgetArray[i] === selectedTab) {
				widgetArray[i].skin = "sknBtnUtilActive485b7512pxBold"; //selected skin
				widgetArray[i].hoverSkin = "sknBtnUtilActive485b7512pxBold";

			} else {
				widgetArray[i].skin = "sknBtnUtilRest73767812pxReg"; //normal skin sknBtnUtilRest73767812pxReg
				widgetArray[i].hoverSkin = "sknBtnUtilHover30353612pxReg"; //hover skin
			}
		}
	};

	var tabUtilVerticleArrowVisibilityFunction = function (widgetArray, selectedTab) {
		for (var i = 0; i < widgetArray.length; i++) {

			if (widgetArray[i] === selectedTab) {
				widgetArray[i].setVisibility(true);
			} else {
				widgetArray[i].setVisibility(false);
			}
		}
	};
  //customer profile/loans tabs,sub-tabs with white background
    var subTabsButtonUtilFunction = function (widgetArray, selectedTab){
      for (var i = 0; i < widgetArray.length; i++) {

        if (widgetArray[i] === selectedTab) {
          widgetArray[i].skin = "sknBtnBgffffffBrD7D9E0Rd3px485B75Bold12px"; //selected button with border

        } else {
          widgetArray[i].skin = "sknBtnBgD2D7E2Rou3pxLato485B7512px"; //normal skin
        }
      }
    };
   // for rounded sub-tabs which are having background other than white
    var subTabsButtonWithBgUtilFunction = function (widgetArray, selectedTab){
      for (var i = 0; i < widgetArray.length; i++) {

        if (widgetArray[i] === selectedTab) {
          widgetArray[i].skin = "sknBtnBgBrFFFFFFrd3pxf485B75Bold12px"; //selected button without border

        } else {
          widgetArray[i].skin = "sknBtnBgD2D7E2Rou3pxLato485B7512px"; //normal button
        }
      }
    };
   // for toggle button component
    var toggleButtonsUtilFunction = function (widgetArray, selectedTabOpt){
      if(selectedTabOpt === 1){
        widgetArray[0].skin = "sknBtnBgE5F0F9Br006CCAFn0069cdSemiBold12pxLeftRnd";
        widgetArray[1].skin = "sknBtnBgFFFFFFBrD7D9E0Fn485C75Reg12pxRightRnd";
      } else if(selectedTabOpt === 2){
        widgetArray[0].skin = "sknBtnBgFFFFFFBrD7D9E0Fn485C75Reg12pxLeftRnd";
        widgetArray[1].skin = "sknBtnBgE5F0F9Br006CCAFn0069cdSemiBold12pxRightRnd";
      }
    };
	return {
		tabUtilButtonFunction: tabUtilButtonFunction,
		tabUtilLabelFunction: tabUtilLabelFunction,
		tabUtilVerticleButtonFunction: tabUtilVerticleButtonFunction,
		tabUtilVerticleArrowVisibilityFunction: tabUtilVerticleArrowVisibilityFunction,
        subTabsButtonUtilFunction: subTabsButtonUtilFunction,
        subTabsButtonWithBgUtilFunction: subTabsButtonWithBgUtilFunction,
        toggleButtonsUtilFunction: toggleButtonsUtilFunction
	};
});
