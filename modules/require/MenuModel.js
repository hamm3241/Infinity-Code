define([], function () {
    var MenuItem = function (name, displayName, navigateAction, menu, clientProperty) {
        this.name = name;
        this.displayName = displayName;
        var self = this;
        this.onTouch = function () {
            kony.adminConsole.utils.showProgressBar(kony.application.getCurrentForm());
            menu.select(self);
            navigateAction();
        };
        this.navigateAction = navigateAction;
        this.clientProperty = clientProperty;
    };
    var MenuSection = function (sectionName, displayName, sectionItems) {
        this.name = sectionName;
        this.displayName = displayName;
        this.sectionItems = sectionItems;
    };
    /**
     *  Menu Class that handles all operations related to the menu
     * @param {(moduleName:string, presentationMethod:string, args:[any])=>void} navigateWith
     */
    var Menu = function (navigateWith) {
        var selected = null;
        var previousSelected = [];//stack of previous navigated menu items
        this.changeSelected = function(menuItem){
            if (selected !== null) {
                selected.isSelected = false;
            }
            selected = menuItem;
            menuItem.isSelected = true;
          	previousSelected.push(selected);
            return menuItem;
        };
        this.select = function (menuItem) {
            if(!Menu.isItem(menuItem)){
                return;
            }
            return this.changeSelected(menuItem);
        };
        this.canGoBack = function(){
            return previousSelected.length > 0;
        };
        this.goBack = function(){
            if(!this.canGoBack()){
                throw Error('Cant Go Back!!!');
            }
            var previousMenu = previousSelected.pop();
            this.changeSelected(previousMenu);
            return previousMenu.navigateAction();
        };
        this.isSelected = function (menuItem) {
            return menuItem === this.selected;
        };
        this.menuItems = [];
        this.virtualDOM = {};
        this.updateViewWith = null;
        this.updateDebounce = null;
        var scrollPosition = 0;
        var getScrollPosition = null;
        this.scrollPosition = function(){
            return scrollPosition;
        };
        this.setHowToGetScrollPosition = function(getter){
            getScrollPosition = getter;
        };
        this.navAction = function (moduleName, presentorMethod, args) {
            return function () {
                if(typeof getScrollPosition === 'function'){
                    //store last scroll position before navigating away
                    scrollPosition = getScrollPosition();
                    if(typeof scrollPosition !== 'number'){
                        throw Error('fetched Scroll position is invalid');
                    }
                }
                navigateWith(moduleName, presentorMethod, args);
            };
        };
        /**
         * navigationMenuMap Object holds the relation between modules and the left menu items
         * @method setMenuItem : (moduleName:string, presentorMethod:string, menuItem:Menu)=>void
         * @method getMenuItem : (moduleName:string, presentorMethod:string)=> Menu|undefined
         */
        this.navigationMenuMap = (function(){
            var privateMap = {};
            return {
                setMenuItem : function(moduleName, presentorMethod, menuItem){
                    if(!privateMap[moduleName]){
                        privateMap[moduleName] = {};
                    }
                    privateMap[moduleName][presentorMethod] = menuItem;
                },
                getMenuItem : function(moduleName, presentorMethod){
                    if(!privateMap[moduleName]){
                        return;
                    }
                    if(!Menu.isItem(privateMap[moduleName][presentorMethod])){
                        if(Object.keys(privateMap[moduleName]).length === 1){
                            return Object.keys(privateMap[moduleName]).map(function(key){
                                return privateMap[moduleName][key];
                            })[0];
                        }else{
                          return;
                        }
                    }
                  return privateMap[moduleName][presentorMethod];
                }
            };
        })();
    };
  var VisibilityCheck = function(menu, clientProperty,context){
    this.menu = menu;
    let isVisible = true;
    if(clientProperty){
      isVisible = (kony.adminConsole.utils.clientProperties !== undefined && kony.adminConsole.utils.clientProperties[clientProperty] !== undefined && kony.adminConsole.utils.clientProperties[clientProperty].toUpperCase() === "TRUE");           			
     // special case for strong customer authentication menu, it has to be shown only if sca is enabled
      if(context && context.currentMenu === "SCA Scenarios")
        isVisible=!isVisible;
      // special case for credential policy menu, it has to be hidden only if both sca and keycloak are enabled
      if(context && context.currentMenu==="Credential Policy")
        isVisible=isVisible || !(context.isKeyCloakEnabled !== undefined && context.isKeyCloakEnabled);
    }
    this.isVisible = isVisible;
  };
	VisibilityCheck.prototype.setVisibility = function(visible){
        if(this.isVisible !== visible){
            var menu = this.menu;
            if(menu.updateDebounce !== null){
                clearTimeout(menu.updateDebounce);
                menu.updateDebounce = null;
            }
            menu.updateDebounce = setTimeout(function(){
                menu.updateViewWith(menu.getVisibleItems());
            }, 50);
        }
		this.isVisible = visible;
	};
    Menu.prototype.setItems = function (_menuItems) {
      this.menuItems = _menuItems;
      var virtualDOM = {};
      var self = this;
      self.menuItems = _menuItems;
      self.context={};
      function addMenuItems(){
        // this function will be execute irrespective of client properties fetch.
        // hence it is called in success & failure callback functions
        self.menuItems.forEach(function(item) {
          if (Menu.isItem(item)) {
            virtualDOM[item.name] = new VisibilityCheck(self);
          } else if (Menu.isSection(item)) {
            virtualDOM[item.name] = {};
            item.sectionItems.forEach(function(sectionItem) {
              self.context.currentMenu=sectionItem.name;
              virtualDOM[item.name][sectionItem.name] = new VisibilityCheck(self, sectionItem.clientProperty,self.context);
            });
          } else {
            throw Error('Invalid input');
          }
        });
        self.virtualDOM = virtualDOM;
      };
      let client = kony.sdk.getCurrentInstance();
      if(client) {
        kony.adminConsole.utils.clientProperties = undefined;
        var configurationSvc = client.getConfigurationService();
        function getKeycloakDbProperty(){
          var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AuthModule');
          function onSuccesskeycloakResponse(response){         
            self.context.isKeyCloakEnabled=response.isKeyCloakEnabled;
          addMenuItems();
          }authModule.presentationController.getLoginTypeConfiguration(onSuccesskeycloakResponse,addMenuItems);
        };
        function onSuccess(response) {
          kony.adminConsole.utils.clientProperties = response;
          getKeycloakDbProperty();
        }
        configurationSvc.getAllClientAppProperties(onSuccess, addMenuItems);
      } else {
        addMenuItems();
      } 
    };
    Menu.prototype.getItems = function () {
        return this.menuItems;
    };
    Menu.prototype.getVirtualDOM = function () {
        return this.virtualDOM;
    };
    Menu.prototype.onDOMChange = function(updateItems){
        this.updateViewWith = updateItems;
    };
    Menu.prototype.getVisibleItems = function(){
        var virtualDOM = this.virtualDOM;
        var isMenuItemVisible = function(menuItem, sectionName){
			if(sectionName){
				return virtualDOM[sectionName][menuItem.name].isVisible;
			}else{
				return virtualDOM[menuItem.name].isVisible;
			}
		};
		var onlyVisibleItemsFrom = function(items){
			var visibleItems = [];
			items.forEach(function(item){
				if (Menu.isItem(item)) {
					if(isMenuItemVisible(item)){
						visibleItems.push(item);
					}
				} else if (Menu.isSection(item)) {
					var visibleSectionItems = item.sectionItems.filter(function(sectionItem){
						return isMenuItemVisible(sectionItem, item.name);
					});
					if(visibleSectionItems.length > 0){
						visibleItems.push(new MenuSection(item.name, item.displayName, visibleSectionItems));
					}
				} else {
					throw Error('Invalid input');
				}
			});
			return visibleItems;
        };
        return onlyVisibleItemsFrom(this.getItems());
    };
    Menu.prototype.newItem = function (name, i18Key, moduleName, presentorMethod, clientProperty) {
        if (moduleName && presentorMethod) {
            var menuItem = new MenuItem(name, kony.i18n.getLocalizedString(i18Key), this.navAction(moduleName, presentorMethod), this, clientProperty);
            this.navigationMenuMap.setMenuItem(moduleName, presentorMethod, menuItem);
            return menuItem;
        } else {
            return new MenuItem(name, kony.i18n.getLocalizedString(i18Key), function(){
                kony.print('This Menu Item Has No Event, Set it in "require/Navigation_Presentation_Extn.js"');
            }, this);
        }
    };
    Menu.prototype.navigateTo = function(moduleName, presentationMethod, args){
        this.select(this.navigationMenuMap.getMenuItem(moduleName, presentationMethod));
        return this.navAction(moduleName, presentationMethod, args)();
    };
    Menu.isItem = function (menutItem) {
        return menutItem instanceof MenuItem;
    };
    Menu.prototype.newSection = function (sectionName, i18Key, sectionItems) {
        return new MenuSection(sectionName, kony.i18n.getLocalizedString(i18Key), sectionItems);
    };
    Menu.isSection = function (menuSection) {
        return menuSection instanceof MenuSection;
    };
    return Menu;
});