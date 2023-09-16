define(['MenuModel', 'AdminConsoleCommonUtilities','Navigation_Presentation_Extn','Navigation_Form_Extn'],function (Menu, utils) {
	var SKIN_MENUITEM_LABEL = 'sknLeftMenuItemLabel';
	var SKIN_MENUITEM_LABEL_HOVER = 'sknLeftMenuItemLabelHover';
	var isMenuItem = function (item) {
		return Menu.isItem(item);//item.type === 'MenuItem';
	};
	var isMenuSection = function (item) {
		return Menu.isSection(item);//item.type === 'MenuSection';
	};
	var MenuItemForTemplate = function (menuItem, templateName) {
		return {
			lblMenuItem: {
				skin : menuItem.isSelected ? SKIN_MENUITEM_LABEL_HOVER : SKIN_MENUITEM_LABEL,
				text: menuItem.displayName,
                onClick: menuItem.onTouch
			},
			fontIconimgSelectionArrow: {
				isVisible: menuItem.isSelected ? true : false,
                 text  : kony.i18n.getLocalizedString("i18n.userwidgetmodel.fontIconSelected1")
			},
			template: templateName
		};
	};
	var LargeMenuItemSegment = function (menuItem) {
		return MenuItemForTemplate(menuItem, 'flxLeftMenuItem');
	};
	var SmallMenuItemSegment = function (menuItem) {
		return MenuItemForTemplate(menuItem, 'flxLeftMenuSectionItem');
	};
	var HeaderSegment = function(sectionName){
		return {
			lblMenuSectionHeader : sectionName,
			template : 'flxLeftMenuSectionHeader'
		};
	};
	var not = function(fnc){
		return function(){
			return !fnc.apply(this, arguments);
		};
	}
	var lastElement = function(array){
		return function(_, index){
			return index === (array.length -1);
		};
	};
	var SectionSegments = function(section){
		if(section.sectionItems.length === 0){
			//no need to create section if it does not have any items in it
			return [];
		}
		var sectionSegmentItems = [];
		sectionSegmentItems.push(HeaderSegment(section.displayName));
		sectionSegmentItems = sectionSegmentItems.concat(
			section.sectionItems.filter(not(lastElement(section.sectionItems))).map(SmallMenuItemSegment));
		return sectionSegmentItems.concat(
			section.sectionItems.filter(lastElement(section.sectionItems)).map(LargeMenuItemSegment));
	};
	var exactlyOneMenuItemSelected = function(segments){
		return segments.filter(function(segment){
			return typeof segment.fontIconimgSelectionArrow === 'object';
		}).filter(function(segment){
			return segment.fontIconimgSelectionArrow.isVisible;
		}).length === 1;
	};
	var deepEquals = utils.AdminConsoleCommonUtils.deepEquals;
	var update = function updateMenu(menuItems) {
		var sectionData = [];
		menuItems.forEach(
			function (item) {
				if (isMenuItem(item)) {
					sectionData.push(LargeMenuItemSegment(item));
				} else if (isMenuSection(item)) {
					sectionData = sectionData.concat(SectionSegments(item));
				} else {
					throw Error('Invalid input');
				}
			}
		);
		this.view.segMenu.widgetDataMap = {
			lblMenuItem : 'lblMenuItem',
			lblMenuSectionHeader : 'lblMenuSectionHeader',
			imgSelectionArrow : 'imgSelectionArrow',
            fontIconimgSelectionArrow : 'fontIconimgSelectionArrow'
		};
		if(!deepEquals(sectionData, this.view.segMenu.data)){
			this.view.segMenu.setData(sectionData);
			this.view.forceLayout();
		}
	};
	return {
		updateMenu: function updateMenu(menuModel) {
			if(!(menuModel instanceof Menu)){
				throw Error('Expected Menu object');
			}
			this.view.virtualDOM = menuModel.getVirtualDOM();
			update.call(this, menuModel.getVisibleItems());
			menuModel.onDOMChange(update.bind(this));
			try{
				//Rare bug only occurs on some machines
				//Causes this code to fail
				this.view.flxScrollMenu.contentOffset = {x:0, y:menuModel.scrollPosition()};
			}catch(e){
				kony.print(e);
			}
			var self = this;
			menuModel.setHowToGetScrollPosition(function(){
				return self.view.flxScrollMenu.contentOffsetMeasured.y;
			}); 
		}
	};
});