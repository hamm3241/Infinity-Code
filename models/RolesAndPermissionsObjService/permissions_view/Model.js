/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "permissions_view", "objectService" : "RolesAndPermissionsObjService"};

    var setterFunctions = {
        PermissionType_id: function(val, state) {
            context["field"] = "PermissionType_id";
            context["metadata"] = (objectMetadata ? objectMetadata["PermissionType_id"] : null);
            state['PermissionType_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Permission_Desc: function(val, state) {
            context["field"] = "Permission_Desc";
            context["metadata"] = (objectMetadata ? objectMetadata["Permission_Desc"] : null);
            state['Permission_Desc'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Permission_id: function(val, state) {
            context["field"] = "Permission_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Permission_id"] : null);
            state['Permission_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Permission_Name: function(val, state) {
            context["field"] = "Permission_Name";
            context["metadata"] = (objectMetadata ? objectMetadata["Permission_Name"] : null);
            state['Permission_Name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Role_Count: function(val, state) {
            context["field"] = "Role_Count";
            context["metadata"] = (objectMetadata ? objectMetadata["Role_Count"] : null);
            state['Role_Count'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Status_Desc: function(val, state) {
            context["field"] = "Status_Desc";
            context["metadata"] = (objectMetadata ? objectMetadata["Status_Desc"] : null);
            state['Status_Desc'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Status_id: function(val, state) {
            context["field"] = "Status_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Status_id"] : null);
            state['Status_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Users_Count: function(val, state) {
            context["field"] = "Users_Count";
            context["metadata"] = (objectMetadata ? objectMetadata["Users_Count"] : null);
            state['Users_Count'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function permissions_view(defaultValues) {
        var privateState = {};
        context["field"] = "PermissionType_id";
        context["metadata"] = (objectMetadata ? objectMetadata["PermissionType_id"] : null);
        privateState.PermissionType_id = defaultValues ?
            (defaultValues["PermissionType_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["PermissionType_id"], context) :
                null) :
            null;

        context["field"] = "Permission_Desc";
        context["metadata"] = (objectMetadata ? objectMetadata["Permission_Desc"] : null);
        privateState.Permission_Desc = defaultValues ?
            (defaultValues["Permission_Desc"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Permission_Desc"], context) :
                null) :
            null;

        context["field"] = "Permission_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Permission_id"] : null);
        privateState.Permission_id = defaultValues ?
            (defaultValues["Permission_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Permission_id"], context) :
                null) :
            null;

        context["field"] = "Permission_Name";
        context["metadata"] = (objectMetadata ? objectMetadata["Permission_Name"] : null);
        privateState.Permission_Name = defaultValues ?
            (defaultValues["Permission_Name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Permission_Name"], context) :
                null) :
            null;

        context["field"] = "Role_Count";
        context["metadata"] = (objectMetadata ? objectMetadata["Role_Count"] : null);
        privateState.Role_Count = defaultValues ?
            (defaultValues["Role_Count"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Role_Count"], context) :
                null) :
            null;

        context["field"] = "Status_Desc";
        context["metadata"] = (objectMetadata ? objectMetadata["Status_Desc"] : null);
        privateState.Status_Desc = defaultValues ?
            (defaultValues["Status_Desc"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Status_Desc"], context) :
                null) :
            null;

        context["field"] = "Status_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Status_id"] : null);
        privateState.Status_id = defaultValues ?
            (defaultValues["Status_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Status_id"], context) :
                null) :
            null;

        context["field"] = "Users_Count";
        context["metadata"] = (objectMetadata ? objectMetadata["Users_Count"] : null);
        privateState.Users_Count = defaultValues ?
            (defaultValues["Users_Count"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Users_Count"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "PermissionType_id": {
                get: function() {
                    context["field"] = "PermissionType_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["PermissionType_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.PermissionType_id, context);
                },
                set: function(val) {
                    setterFunctions['PermissionType_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Permission_Desc": {
                get: function() {
                    context["field"] = "Permission_Desc";
                    context["metadata"] = (objectMetadata ? objectMetadata["Permission_Desc"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Permission_Desc, context);
                },
                set: function(val) {
                    setterFunctions['Permission_Desc'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Permission_id": {
                get: function() {
                    context["field"] = "Permission_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Permission_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Permission_id, context);
                },
                set: function(val) {
                    setterFunctions['Permission_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Permission_Name": {
                get: function() {
                    context["field"] = "Permission_Name";
                    context["metadata"] = (objectMetadata ? objectMetadata["Permission_Name"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Permission_Name, context);
                },
                set: function(val) {
                    setterFunctions['Permission_Name'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Role_Count": {
                get: function() {
                    context["field"] = "Role_Count";
                    context["metadata"] = (objectMetadata ? objectMetadata["Role_Count"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Role_Count, context);
                },
                set: function(val) {
                    setterFunctions['Role_Count'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Status_Desc": {
                get: function() {
                    context["field"] = "Status_Desc";
                    context["metadata"] = (objectMetadata ? objectMetadata["Status_Desc"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Status_Desc, context);
                },
                set: function(val) {
                    setterFunctions['Status_Desc'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Status_id": {
                get: function() {
                    context["field"] = "Status_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Status_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Status_id, context);
                },
                set: function(val) {
                    setterFunctions['Status_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Users_Count": {
                get: function() {
                    context["field"] = "Users_Count";
                    context["metadata"] = (objectMetadata ? objectMetadata["Users_Count"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Users_Count, context);
                },
                set: function(val) {
                    setterFunctions['Users_Count'].call(this, val, privateState);
                },
                enumerable: true,
            },
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.PermissionType_id = value ? (value["PermissionType_id"] ? value["PermissionType_id"] : null) : null;
            privateState.Permission_Desc = value ? (value["Permission_Desc"] ? value["Permission_Desc"] : null) : null;
            privateState.Permission_id = value ? (value["Permission_id"] ? value["Permission_id"] : null) : null;
            privateState.Permission_Name = value ? (value["Permission_Name"] ? value["Permission_Name"] : null) : null;
            privateState.Role_Count = value ? (value["Role_Count"] ? value["Role_Count"] : null) : null;
            privateState.Status_Desc = value ? (value["Status_Desc"] ? value["Status_Desc"] : null) : null;
            privateState.Status_id = value ? (value["Status_id"] ? value["Status_id"] : null) : null;
            privateState.Users_Count = value ? (value["Users_Count"] ? value["Users_Count"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(permissions_view);

    //Create new class level validator object
    BaseModel.Validator.call(permissions_view);

    var registerValidatorBackup = permissions_view.registerValidator;

    permissions_view.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(permissions_view.isValid(this, propName, val)) {
                    return setterBackup.apply(null, arguments);
                } else {
                    throw Error("Validation failed for " + propName + " : " + val);
                }
            }
            setterFunctions[arguments[0]].changed = true;
        }
        return registerValidatorBackup.apply(null, arguments);
    }

    //Extending Model for custom operations
    //For Operation 'downloadPermissionsList' with service id 'downloadPermissionsList3496'
     permissions_view.downloadPermissionsList = function(params, onCompletion){
        return permissions_view.customVerb('downloadPermissionsList', params, onCompletion);
     };

    //For Operation 'generatePermissionsList' with service id 'generatePermissionsList5214'
     permissions_view.generatePermissionsList = function(params, onCompletion){
        return permissions_view.customVerb('generatePermissionsList', params, onCompletion);
     };

    //For Operation 'getPermissions' with service id 'get_permissions_view1866'
     permissions_view.getPermissions = function(params, onCompletion){
        return permissions_view.customVerb('getPermissions', params, onCompletion);
     };

    //For Operation 'downloadPermissionList' with service id 'downloadPermissionList1042'
     permissions_view.downloadPermissionList = function(params, onCompletion){
        return permissions_view.customVerb('downloadPermissionList', params, onCompletion);
     };

    var relations = [];

    permissions_view.relations = relations;

    permissions_view.prototype.isValid = function() {
        return permissions_view.isValid(this);
    };

    permissions_view.prototype.objModelName = "permissions_view";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    permissions_view.registerProcessors = function(options, successCallback, failureCallback) {

        if(!options) {
            options = {};
        }

        if(options && ((options["preProcessor"] && typeof(options["preProcessor"]) === "function") || !options["preProcessor"])) {
            preProcessorCallback = options["preProcessor"];
        }

        if(options && ((options["postProcessor"] && typeof(options["postProcessor"]) === "function") || !options["postProcessor"])) {
            postProcessorCallback = options["postProcessor"];
        }

        function metaDataSuccess(res) {
            objectMetadata = kony.mvc.util.ProcessorUtils.convertObjectMetadataToFieldMetadataMap(res);
            successCallback();
        }

        function metaDataFailure(err) {
            failureCallback(err);
        }

        kony.mvc.util.ProcessorUtils.getMetadataForObject("RolesAndPermissionsObjService", "permissions_view", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    permissions_view.clone = function(objectToClone) {
        var clonedObj = new permissions_view();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return permissions_view;
});