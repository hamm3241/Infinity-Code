define(["Permission", "permissionsConfig"], function (Permission, permissionsConfig) {
    "use strict";
    var isValidWidget = function (widget) {
        return typeof widget === "object" && widget !== null;
    };
    var isSegment = function (widget) {
        return typeof widget.setData === "function";
    };
    var SegmentPermissionConfig = /** @class */ (function () {
        function SegmentPermissionConfig(widgetVisibilityMap) {
            this.widgetVisibilityMap = widgetVisibilityMap;
            this.widgetsKeysToModify = Object.keys(widgetVisibilityMap);
        }
        SegmentPermissionConfig.isSectionedSegment = function (data) {
            if (data.length > 0) {
                if (data.every(function (e) { return Array.isArray(e); })) {
                    return true;
                }
            }
            return false;
        };
        //changes each Row data so the Visible property is properly set
        SegmentPermissionConfig.prototype.dataMapper = function (dataObject) {
            var _this = this;
            var newObj = {};
            var originalObjKeys = Object.keys(dataObject);
            originalObjKeys.forEach(function (key) {
                newObj[key] = dataObject[key];
            });
            this.widgetsKeysToModify.forEach(function (key) {
                if (originalObjKeys.indexOf(key) > -1) {
                    if (typeof newObj[key] === "object") {
                        //if they mentioned the widget add the correct isVisible value
                        if (typeof newObj[key].isVisible === "boolean") {
                            //if isVisible property already exists
                            if (newObj[key].isVisible) {
                                //only effect it if it is visible - as it could be intensionally hidden for this row
                                newObj[key].isVisible = _this.widgetVisibilityMap[key];
                            }
                        }
                        else {
                            newObj[key].isVisible = _this.widgetVisibilityMap[key];
                        }
                    }
                    else if (typeof newObj[key] === "string") {
                        //for some widgets (like label) they may have given text directly
                        newObj[key] = {
                            text: newObj[key],
                            isVisible: _this.widgetVisibilityMap[key]
                        };
                    }
                    else {
                        kony.print("ERROR - Not implemented for transforming this type of property");
                    }
                }
                else {
                    //If they have not mentioned the widget in the data
                    newObj[key] = {
                        isVisible: _this.widgetVisibilityMap[key]
                    };
                }
            });
            return newObj;
        };
        SegmentPermissionConfig.prototype.isObject = function (data) {
            return typeof data === "object";
        };
        SegmentPermissionConfig.prototype.isArray = function (data) {
            return this.isObject(data) && Array.isArray(data);
        };
        /**
         * @param {[segementData]|segementData} data 
         */
        SegmentPermissionConfig.prototype.transform = function (data) {
            var _this = this;
            if (this.isArray(data)) {
                var isSectioned = SegmentPermissionConfig.isSectionedSegment(data);
                if (!isSectioned) {
                    return data.filter(this.isObject).map(this.dataMapper.bind(this));
                }
                else {
                    return data.map(function (tupple) {
                        return [
                            tupple[0],
                            tupple[1].filter(_this.isObject).map(_this.dataMapper.bind(_this))
                        ];
                    });
                }
            }else{
                return this.dataMapper(data);
            }
        };
        return SegmentPermissionConfig;
    }());
    //Replaces the segments setData method so it will check and enforce Permissions
    var rigSegment = function (segment, widgetVisibilityMap) {
        if (segment.permissionConfig instanceof SegmentPermissionConfig) {
            segment.permissionConfig = new SegmentPermissionConfig(widgetVisibilityMap);
        }
        else {
            segment.permissionConfig = new SegmentPermissionConfig(widgetVisibilityMap);
            var replaceSegmentMethodWithPermissionEnforcer = function(methodName){
                var backUpMethod = segment[methodName];
                segment[methodName] = function(data){
                    var args = Array.prototype.slice.call(arguments);
                    backUpMethod.apply(segment, [segment.permissionConfig.transform(data)].concat(args.slice(1)));
                };
            };
            ['setData','setDataAt','addAll','addDataAt','addSectionAt','setSectionAt'].forEach(replaceSegmentMethodWithPermissionEnforcer);
            if (Array.isArray(segment.data)) {
                segment.setData(segment.data);
            }
        }
    };
    var isValidPermission = function (permission) {
        return permission instanceof Permission;
    };
    var enforcePermissionOnWidget = function (widget, canBeShown) {
        if (typeof widget.setVisibility === "function")
            widget.setVisibility(canBeShown);
        else
            widget.isVisible = canBeShown;
    };
    var unableToFindConfiguredWidget = function(path){
        //Not neccesarily an error -> as the widget this requires may not be loaded yet
        //It might get loaded in future form updates,the permissions will be enforced then.
        kony.print("Warning - Unable to Find Widget " + path);
    };
    var isMatchForPattern = function(patternObj, actualObj){
        return Object.keys(patternObj).every(function(key){
            if(isValidPermission(patternObj[key])){
                return isValidWidget(actualObj[key]);
            }else if(isValidWidget(patternObj[key]) && isValidWidget(actualObj[key])){
                return isMatchForPattern(patternObj[key], actualObj[key]);
            }else{
                return false;
            }
        });
    };
    var resolveWidgetPermissions = function (parent, widgetMap, isPermitted, navKeys) {
        Object.keys(widgetMap).forEach(function (key) {
          /* this case is for components with contract
             as the component level widgets cannt be accessed directly from form level parent[key] is always null
             using the 'userWidgetProxyObject' field available as part of properties  to access the component widgts
           */
          if(parent.wType === "KComponent" && parent.userWidgetProxyObject){
            parent = parent.userWidgetProxyObject;           
          }
            if (isValidPermission(widgetMap[key])) {
                if (isValidWidget(parent[key])) {
                    if (parent[key].isVisible) {
                        enforcePermissionOnWidget(parent[key], isPermitted(widgetMap[key]));
                    }
                    else {
                        //skipped flx/widget might be hidden intensionally in code
                        //kony.print("Skipping " + navKeys.concat(key).join(".") + " as it is Invisible");
                        //Removed Above Kony.print as it is flooding the console/logs.
                    }
                }
                else {
                    unableToFindConfiguredWidget(navKeys.concat(key).join("."));
                }
            }
            else if (Array.isArray(widgetMap[key]) && widgetMap[key].length === 2) {
                if (isValidWidget(parent[key])) {
                    if(widgetMap[key][0] === 'segment'){
                        if(isSegment(parent[key])){
                            var segmentWidgetMap = widgetMap[key][1];
                            var widgetVisibleMap = {};
                            Object.keys(segmentWidgetMap).forEach(function (key) {
                                widgetVisibleMap[key] = isPermitted(segmentWidgetMap[key]);
                            });
                            rigSegment(parent[key], widgetVisibleMap);
                        }else{
                            unableToFindConfiguredWidget(navKeys.concat(key).join("."));
                        }
                    }else if(widgetMap[key][0] === 'pattern'){
                        Object.keys(parent[key])
                        .filter(function(k){
                            return isValidWidget(parent[key][k]) && isMatchForPattern(widgetMap[key][1], parent[key][k]);
                        }).forEach(function(k){
                            resolveWidgetPermissions(parent[key][k], widgetMap[key][1], isPermitted, navKeys.concat(key).concat(k));
                        });
                    } else if(widgetMap[key][0] === 'dynamicComponent'){ // parsing for dynamically created components
                      var dynamicWidgets = parent[key].widgets();
                      dynamicWidgets.forEach(function(widRef){
                        resolveWidgetPermissions(widRef, widgetMap[key][1], isPermitted, navKeys.concat(key).concat(widRef.id));
                      });
                    }
                }
                else {
                    unableToFindConfiguredWidget(navKeys.concat(key).join("."));
                }
            }
            else if (typeof widgetMap[key] === "object" &&
                !Array.isArray(widgetMap[key])) {
                if (isValidWidget(parent[key])) {
                    resolveWidgetPermissions(parent[key], widgetMap[key], isPermitted, navKeys.concat(key));
                }
                else {
                    unableToFindConfiguredWidget(navKeys.concat(key).join("."));
                }
            }
            else {
                throw Error("Improper configuration for : " + navKeys.concat(key).join("."));
            }
        });
    };
    return {
        didUpdateUI: function () {
            var self = this;
            try {
                var enforcePermissions = function () {
                    var userPermissions = kony.mvc.MDAApplication.getSharedInstance()
                        .appContext.accessDetails;
                    var widgetPermissionsConfig = permissionsConfig.fetchConfigForForm(self.view.id);
                    var isPermitted = function (reqPermission) {
                        return reqPermission.checkPermitted(userPermissions);
                    };
                    resolveWidgetPermissions(self.view, widgetPermissionsConfig, isPermitted, [self.view.id]);
                };
                if (typeof this.view.forceLayout !== "function") {
                    throw Error("Unable to find view.forceLayout, Is this a form controller?");
                }
                if (this.view.willEnforcePermissions) {
                    enforcePermissions();
                    return;
                }
                else {
                    var forceLayoutBackup = this.view.forceLayout;
                    var permissionCheckingForceLayout = function () {
                        enforcePermissions();
                        forceLayoutBackup.call(this);
                    };
                    this.view.forceLayout = permissionCheckingForceLayout;
                    this.view.willEnforcePermissions = true;
                    this.view.forceLayout();
                }
            }
            catch (e) {
                throw e;
            }
        }
    };
});
