define(["Permission", "Permissions"], function (Permission, Permissions) {
    "use strict";
    var componentConfigs = {};
    var formConfigs = {};
    var complexPermission = function(tupple){
        if(tupple[0] === "any"){
            return Permissions.any(tupple[1].map(toPermission));
        }else if(tupple[0] === "all"){
            return Permissions.all(tupple[1].map(toPermission));
        }else {
            throw Error("Invalid Permissions Tupple");
        }
    };
    var toPermission = function(permissionRaw){
        if(typeof permissionRaw === 'string'){
            return new Permission(permissionRaw);
        }else if(Array.isArray(permissionRaw) && permissionRaw.length === 2){
            return complexPermission(permissionRaw);
        }else {
            throw Error("Invalid Permission Format");
        }
    };
    var parsePermissions = function (objConfig) {
        var outputConfig = {};
        Object.keys(objConfig).forEach(function (key) {
            var val = objConfig[key];
            if (typeof val === "string") {
                outputConfig[key] = toPermission(val);
            }
            else if (Array.isArray(val) && val.length === 2) {
                if (val[0] === "any" || val[0] === "all") {
                    outputConfig[key] = toPermission(val);
                }
                else if (val[0] === "component") {
                    outputConfig[key] = componentConfigs[val[1]];
                }
                else if (val[0] === "segment") {
                    outputConfig[key] = ["segment", parsePermissions(val[1])];
                }
                else if(val[0] === "pattern"){
                    outputConfig[key] = ["pattern", parsePermissions(val[1])];
                }
                else if(val[0] === "dynamicComponent"){
                    outputConfig[key] = ["dynamicComponent", parsePermissions(val[1])];
                }
                else {
                    throw Error("Invalid Permissions Tupple");
                }
            }
            else if (typeof val === "object") {
                outputConfig[key] = parsePermissions(val);
            }
            else {
                throw Error("Invalid Format for Permissions Config");
            }
        });
        return outputConfig;
    };
    return {
        /**
         * @param config : {
         *      components : [
         *          componentName : {//component object structure
         *                  can use all formats except component format
         *                  cant use reference to another component
         *              }
         *      ],
         *      forms : [
         *          formName : {//form object structure
         *                  allowed to use permissions
         *                  allowed to use components//will be substituted into the form
         *                  allowed to use segments//will store it in same format but parses the content
         *                  allowed to use pattern match/will store it in same format but parses the content
         *              }
         *      ]
         * }
         * Permission format : string-permission name || tupple-[string-'any'||'all', array-[Permission format]]
         * Component format : tupple-[string-'component', string-component name from config.components]
         * Segment format : tupple-[string-'segment', object-{//segment object format
         *                                                          allowed to use only permissions format
         *                                                      }]
         * Pattern Match format : tupple-[string-'pattern', object-{//object keys patterns to search
         *                                                              allowed to use only permissions format
         *                                                              }]
         */
        registerConfig: function (config) {
            Object.keys(config.components).forEach(function (component) {
                componentConfigs[component] = parsePermissions(config.components[component]);
            });
            Object.keys(config.forms).forEach(function (form) {
                formConfigs[form] = parsePermissions(config.forms[form]);
            });
        },
        fetchConfigForForm: function (formId) {
            return formConfigs[formId] || {};
        }
    };
});