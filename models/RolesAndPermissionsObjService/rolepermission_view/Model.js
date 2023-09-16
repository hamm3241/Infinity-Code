/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "rolepermission_view", "objectService" : "RolesAndPermissionsObjService"};

    var setterFunctions = {
        DataType_id: function(val, state) {
            context["field"] = "DataType_id";
            context["metadata"] = (objectMetadata ? objectMetadata["DataType_id"] : null);
            state['DataType_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        PermissionValue: function(val, state) {
            context["field"] = "PermissionValue";
            context["metadata"] = (objectMetadata ? objectMetadata["PermissionValue"] : null);
            state['PermissionValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Permission_createdby: function(val, state) {
            context["field"] = "Permission_createdby";
            context["metadata"] = (objectMetadata ? objectMetadata["Permission_createdby"] : null);
            state['Permission_createdby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Permission_createdts: function(val, state) {
            context["field"] = "Permission_createdts";
            context["metadata"] = (objectMetadata ? objectMetadata["Permission_createdts"] : null);
            state['Permission_createdts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Permission_Description: function(val, state) {
            context["field"] = "Permission_Description";
            context["metadata"] = (objectMetadata ? objectMetadata["Permission_Description"] : null);
            state['Permission_Description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Permission_id: function(val, state) {
            context["field"] = "Permission_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Permission_id"] : null);
            state['Permission_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Permission_lastmodifiedts: function(val, state) {
            context["field"] = "Permission_lastmodifiedts";
            context["metadata"] = (objectMetadata ? objectMetadata["Permission_lastmodifiedts"] : null);
            state['Permission_lastmodifiedts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Permission_modifiedby: function(val, state) {
            context["field"] = "Permission_modifiedby";
            context["metadata"] = (objectMetadata ? objectMetadata["Permission_modifiedby"] : null);
            state['Permission_modifiedby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Permission_Name: function(val, state) {
            context["field"] = "Permission_Name";
            context["metadata"] = (objectMetadata ? objectMetadata["Permission_Name"] : null);
            state['Permission_Name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Permission_softdeleteflag: function(val, state) {
            context["field"] = "Permission_softdeleteflag";
            context["metadata"] = (objectMetadata ? objectMetadata["Permission_softdeleteflag"] : null);
            state['Permission_softdeleteflag'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Permission_Status_id: function(val, state) {
            context["field"] = "Permission_Status_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Permission_Status_id"] : null);
            state['Permission_Status_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Permission_synctimestamp: function(val, state) {
            context["field"] = "Permission_synctimestamp";
            context["metadata"] = (objectMetadata ? objectMetadata["Permission_synctimestamp"] : null);
            state['Permission_synctimestamp'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Permission_Type_id: function(val, state) {
            context["field"] = "Permission_Type_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Permission_Type_id"] : null);
            state['Permission_Type_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Role_Description: function(val, state) {
            context["field"] = "Role_Description";
            context["metadata"] = (objectMetadata ? objectMetadata["Role_Description"] : null);
            state['Role_Description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Role_id: function(val, state) {
            context["field"] = "Role_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Role_id"] : null);
            state['Role_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Role_Name: function(val, state) {
            context["field"] = "Role_Name";
            context["metadata"] = (objectMetadata ? objectMetadata["Role_Name"] : null);
            state['Role_Name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Role_Status_id: function(val, state) {
            context["field"] = "Role_Status_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Role_Status_id"] : null);
            state['Role_Status_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Permission_isComposite: function(val, state) {
            context["field"] = "Permission_isComposite";
            context["metadata"] = (objectMetadata ? objectMetadata["Permission_isComposite"] : null);
            state['Permission_isComposite'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        companyLegalUnit: function(val, state) {
            context["field"] = "companyLegalUnit";
            context["metadata"] = (objectMetadata ? objectMetadata["companyLegalUnit"] : null);
            state['companyLegalUnit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function rolepermission_view(defaultValues) {
        var privateState = {};
        context["field"] = "DataType_id";
        context["metadata"] = (objectMetadata ? objectMetadata["DataType_id"] : null);
        privateState.DataType_id = defaultValues ?
            (defaultValues["DataType_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["DataType_id"], context) :
                null) :
            null;

        context["field"] = "PermissionValue";
        context["metadata"] = (objectMetadata ? objectMetadata["PermissionValue"] : null);
        privateState.PermissionValue = defaultValues ?
            (defaultValues["PermissionValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["PermissionValue"], context) :
                null) :
            null;

        context["field"] = "Permission_createdby";
        context["metadata"] = (objectMetadata ? objectMetadata["Permission_createdby"] : null);
        privateState.Permission_createdby = defaultValues ?
            (defaultValues["Permission_createdby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Permission_createdby"], context) :
                null) :
            null;

        context["field"] = "Permission_createdts";
        context["metadata"] = (objectMetadata ? objectMetadata["Permission_createdts"] : null);
        privateState.Permission_createdts = defaultValues ?
            (defaultValues["Permission_createdts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Permission_createdts"], context) :
                null) :
            null;

        context["field"] = "Permission_Description";
        context["metadata"] = (objectMetadata ? objectMetadata["Permission_Description"] : null);
        privateState.Permission_Description = defaultValues ?
            (defaultValues["Permission_Description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Permission_Description"], context) :
                null) :
            null;

        context["field"] = "Permission_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Permission_id"] : null);
        privateState.Permission_id = defaultValues ?
            (defaultValues["Permission_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Permission_id"], context) :
                null) :
            null;

        context["field"] = "Permission_lastmodifiedts";
        context["metadata"] = (objectMetadata ? objectMetadata["Permission_lastmodifiedts"] : null);
        privateState.Permission_lastmodifiedts = defaultValues ?
            (defaultValues["Permission_lastmodifiedts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Permission_lastmodifiedts"], context) :
                null) :
            null;

        context["field"] = "Permission_modifiedby";
        context["metadata"] = (objectMetadata ? objectMetadata["Permission_modifiedby"] : null);
        privateState.Permission_modifiedby = defaultValues ?
            (defaultValues["Permission_modifiedby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Permission_modifiedby"], context) :
                null) :
            null;

        context["field"] = "Permission_Name";
        context["metadata"] = (objectMetadata ? objectMetadata["Permission_Name"] : null);
        privateState.Permission_Name = defaultValues ?
            (defaultValues["Permission_Name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Permission_Name"], context) :
                null) :
            null;

        context["field"] = "Permission_softdeleteflag";
        context["metadata"] = (objectMetadata ? objectMetadata["Permission_softdeleteflag"] : null);
        privateState.Permission_softdeleteflag = defaultValues ?
            (defaultValues["Permission_softdeleteflag"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Permission_softdeleteflag"], context) :
                null) :
            null;

        context["field"] = "Permission_Status_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Permission_Status_id"] : null);
        privateState.Permission_Status_id = defaultValues ?
            (defaultValues["Permission_Status_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Permission_Status_id"], context) :
                null) :
            null;

        context["field"] = "Permission_synctimestamp";
        context["metadata"] = (objectMetadata ? objectMetadata["Permission_synctimestamp"] : null);
        privateState.Permission_synctimestamp = defaultValues ?
            (defaultValues["Permission_synctimestamp"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Permission_synctimestamp"], context) :
                null) :
            null;

        context["field"] = "Permission_Type_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Permission_Type_id"] : null);
        privateState.Permission_Type_id = defaultValues ?
            (defaultValues["Permission_Type_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Permission_Type_id"], context) :
                null) :
            null;

        context["field"] = "Role_Description";
        context["metadata"] = (objectMetadata ? objectMetadata["Role_Description"] : null);
        privateState.Role_Description = defaultValues ?
            (defaultValues["Role_Description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Role_Description"], context) :
                null) :
            null;

        context["field"] = "Role_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Role_id"] : null);
        privateState.Role_id = defaultValues ?
            (defaultValues["Role_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Role_id"], context) :
                null) :
            null;

        context["field"] = "Role_Name";
        context["metadata"] = (objectMetadata ? objectMetadata["Role_Name"] : null);
        privateState.Role_Name = defaultValues ?
            (defaultValues["Role_Name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Role_Name"], context) :
                null) :
            null;

        context["field"] = "Role_Status_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Role_Status_id"] : null);
        privateState.Role_Status_id = defaultValues ?
            (defaultValues["Role_Status_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Role_Status_id"], context) :
                null) :
            null;

        context["field"] = "Permission_isComposite";
        context["metadata"] = (objectMetadata ? objectMetadata["Permission_isComposite"] : null);
        privateState.Permission_isComposite = defaultValues ?
            (defaultValues["Permission_isComposite"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Permission_isComposite"], context) :
                null) :
            null;

        context["field"] = "companyLegalUnit";
        context["metadata"] = (objectMetadata ? objectMetadata["companyLegalUnit"] : null);
        privateState.companyLegalUnit = defaultValues ?
            (defaultValues["companyLegalUnit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["companyLegalUnit"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "DataType_id": {
                get: function() {
                    context["field"] = "DataType_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["DataType_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.DataType_id, context);
                },
                set: function(val) {
                    setterFunctions['DataType_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "PermissionValue": {
                get: function() {
                    context["field"] = "PermissionValue";
                    context["metadata"] = (objectMetadata ? objectMetadata["PermissionValue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.PermissionValue, context);
                },
                set: function(val) {
                    setterFunctions['PermissionValue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Permission_createdby": {
                get: function() {
                    context["field"] = "Permission_createdby";
                    context["metadata"] = (objectMetadata ? objectMetadata["Permission_createdby"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Permission_createdby, context);
                },
                set: function(val) {
                    setterFunctions['Permission_createdby'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Permission_createdts": {
                get: function() {
                    context["field"] = "Permission_createdts";
                    context["metadata"] = (objectMetadata ? objectMetadata["Permission_createdts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Permission_createdts, context);
                },
                set: function(val) {
                    setterFunctions['Permission_createdts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Permission_Description": {
                get: function() {
                    context["field"] = "Permission_Description";
                    context["metadata"] = (objectMetadata ? objectMetadata["Permission_Description"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Permission_Description, context);
                },
                set: function(val) {
                    setterFunctions['Permission_Description'].call(this, val, privateState);
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
            "Permission_lastmodifiedts": {
                get: function() {
                    context["field"] = "Permission_lastmodifiedts";
                    context["metadata"] = (objectMetadata ? objectMetadata["Permission_lastmodifiedts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Permission_lastmodifiedts, context);
                },
                set: function(val) {
                    setterFunctions['Permission_lastmodifiedts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Permission_modifiedby": {
                get: function() {
                    context["field"] = "Permission_modifiedby";
                    context["metadata"] = (objectMetadata ? objectMetadata["Permission_modifiedby"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Permission_modifiedby, context);
                },
                set: function(val) {
                    setterFunctions['Permission_modifiedby'].call(this, val, privateState);
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
            "Permission_softdeleteflag": {
                get: function() {
                    context["field"] = "Permission_softdeleteflag";
                    context["metadata"] = (objectMetadata ? objectMetadata["Permission_softdeleteflag"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Permission_softdeleteflag, context);
                },
                set: function(val) {
                    setterFunctions['Permission_softdeleteflag'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Permission_Status_id": {
                get: function() {
                    context["field"] = "Permission_Status_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Permission_Status_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Permission_Status_id, context);
                },
                set: function(val) {
                    setterFunctions['Permission_Status_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Permission_synctimestamp": {
                get: function() {
                    context["field"] = "Permission_synctimestamp";
                    context["metadata"] = (objectMetadata ? objectMetadata["Permission_synctimestamp"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Permission_synctimestamp, context);
                },
                set: function(val) {
                    setterFunctions['Permission_synctimestamp'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Permission_Type_id": {
                get: function() {
                    context["field"] = "Permission_Type_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Permission_Type_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Permission_Type_id, context);
                },
                set: function(val) {
                    setterFunctions['Permission_Type_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Role_Description": {
                get: function() {
                    context["field"] = "Role_Description";
                    context["metadata"] = (objectMetadata ? objectMetadata["Role_Description"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Role_Description, context);
                },
                set: function(val) {
                    setterFunctions['Role_Description'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Role_id": {
                get: function() {
                    context["field"] = "Role_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Role_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Role_id, context);
                },
                set: function(val) {
                    setterFunctions['Role_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Role_Name": {
                get: function() {
                    context["field"] = "Role_Name";
                    context["metadata"] = (objectMetadata ? objectMetadata["Role_Name"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Role_Name, context);
                },
                set: function(val) {
                    setterFunctions['Role_Name'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Role_Status_id": {
                get: function() {
                    context["field"] = "Role_Status_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Role_Status_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Role_Status_id, context);
                },
                set: function(val) {
                    setterFunctions['Role_Status_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Permission_isComposite": {
                get: function() {
                    context["field"] = "Permission_isComposite";
                    context["metadata"] = (objectMetadata ? objectMetadata["Permission_isComposite"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Permission_isComposite, context);
                },
                set: function(val) {
                    setterFunctions['Permission_isComposite'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "companyLegalUnit": {
                get: function() {
                    context["field"] = "companyLegalUnit";
                    context["metadata"] = (objectMetadata ? objectMetadata["companyLegalUnit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.companyLegalUnit, context);
                },
                set: function(val) {
                    setterFunctions['companyLegalUnit'].call(this, val, privateState);
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
            privateState.DataType_id = value ? (value["DataType_id"] ? value["DataType_id"] : null) : null;
            privateState.PermissionValue = value ? (value["PermissionValue"] ? value["PermissionValue"] : null) : null;
            privateState.Permission_createdby = value ? (value["Permission_createdby"] ? value["Permission_createdby"] : null) : null;
            privateState.Permission_createdts = value ? (value["Permission_createdts"] ? value["Permission_createdts"] : null) : null;
            privateState.Permission_Description = value ? (value["Permission_Description"] ? value["Permission_Description"] : null) : null;
            privateState.Permission_id = value ? (value["Permission_id"] ? value["Permission_id"] : null) : null;
            privateState.Permission_lastmodifiedts = value ? (value["Permission_lastmodifiedts"] ? value["Permission_lastmodifiedts"] : null) : null;
            privateState.Permission_modifiedby = value ? (value["Permission_modifiedby"] ? value["Permission_modifiedby"] : null) : null;
            privateState.Permission_Name = value ? (value["Permission_Name"] ? value["Permission_Name"] : null) : null;
            privateState.Permission_softdeleteflag = value ? (value["Permission_softdeleteflag"] ? value["Permission_softdeleteflag"] : null) : null;
            privateState.Permission_Status_id = value ? (value["Permission_Status_id"] ? value["Permission_Status_id"] : null) : null;
            privateState.Permission_synctimestamp = value ? (value["Permission_synctimestamp"] ? value["Permission_synctimestamp"] : null) : null;
            privateState.Permission_Type_id = value ? (value["Permission_Type_id"] ? value["Permission_Type_id"] : null) : null;
            privateState.Role_Description = value ? (value["Role_Description"] ? value["Role_Description"] : null) : null;
            privateState.Role_id = value ? (value["Role_id"] ? value["Role_id"] : null) : null;
            privateState.Role_Name = value ? (value["Role_Name"] ? value["Role_Name"] : null) : null;
            privateState.Role_Status_id = value ? (value["Role_Status_id"] ? value["Role_Status_id"] : null) : null;
            privateState.Permission_isComposite = value ? (value["Permission_isComposite"] ? value["Permission_isComposite"] : null) : null;
            privateState.companyLegalUnit = value ? (value["companyLegalUnit"] ? value["companyLegalUnit"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(rolepermission_view);

    //Create new class level validator object
    BaseModel.Validator.call(rolepermission_view);

    var registerValidatorBackup = rolepermission_view.registerValidator;

    rolepermission_view.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(rolepermission_view.isValid(this, propName, val)) {
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
    var relations = [];

    rolepermission_view.relations = relations;

    rolepermission_view.prototype.isValid = function() {
        return rolepermission_view.isValid(this);
    };

    rolepermission_view.prototype.objModelName = "rolepermission_view";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    rolepermission_view.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("RolesAndPermissionsObjService", "rolepermission_view", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    rolepermission_view.clone = function(objectToClone) {
        var clonedObj = new rolepermission_view();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return rolepermission_view;
});