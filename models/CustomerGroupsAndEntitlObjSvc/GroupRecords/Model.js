/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "GroupRecords", "objectService" : "CustomerGroupsAndEntitlObjSvc"};

    var setterFunctions = {
        Customers_Count: function(val, state) {
            context["field"] = "Customers_Count";
            context["metadata"] = (objectMetadata ? objectMetadata["Customers_Count"] : null);
            state['Customers_Count'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Entitlements_Count: function(val, state) {
            context["field"] = "Entitlements_Count";
            context["metadata"] = (objectMetadata ? objectMetadata["Entitlements_Count"] : null);
            state['Entitlements_Count'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Group_Desc: function(val, state) {
            context["field"] = "Group_Desc";
            context["metadata"] = (objectMetadata ? objectMetadata["Group_Desc"] : null);
            state['Group_Desc'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Group_id: function(val, state) {
            context["field"] = "Group_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Group_id"] : null);
            state['Group_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Group_Name: function(val, state) {
            context["field"] = "Group_Name";
            context["metadata"] = (objectMetadata ? objectMetadata["Group_Name"] : null);
            state['Group_Name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Status_id: function(val, state) {
            context["field"] = "Status_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Status_id"] : null);
            state['Status_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Name: function(val, state) {
            context["field"] = "Name";
            context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
            state['Name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Type_id: function(val, state) {
            context["field"] = "Type_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Type_id"] : null);
            state['Type_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isEAgreementActive: function(val, state) {
            context["field"] = "isEAgreementActive";
            context["metadata"] = (objectMetadata ? objectMetadata["isEAgreementActive"] : null);
            state['isEAgreementActive'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Type_Name: function(val, state) {
            context["field"] = "Type_Name";
            context["metadata"] = (objectMetadata ? objectMetadata["Type_Name"] : null);
            state['Type_Name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function GroupRecords(defaultValues) {
        var privateState = {};
        context["field"] = "Customers_Count";
        context["metadata"] = (objectMetadata ? objectMetadata["Customers_Count"] : null);
        privateState.Customers_Count = defaultValues ?
            (defaultValues["Customers_Count"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Customers_Count"], context) :
                null) :
            null;

        context["field"] = "Entitlements_Count";
        context["metadata"] = (objectMetadata ? objectMetadata["Entitlements_Count"] : null);
        privateState.Entitlements_Count = defaultValues ?
            (defaultValues["Entitlements_Count"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Entitlements_Count"], context) :
                null) :
            null;

        context["field"] = "Group_Desc";
        context["metadata"] = (objectMetadata ? objectMetadata["Group_Desc"] : null);
        privateState.Group_Desc = defaultValues ?
            (defaultValues["Group_Desc"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Group_Desc"], context) :
                null) :
            null;

        context["field"] = "Group_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Group_id"] : null);
        privateState.Group_id = defaultValues ?
            (defaultValues["Group_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Group_id"], context) :
                null) :
            null;

        context["field"] = "Group_Name";
        context["metadata"] = (objectMetadata ? objectMetadata["Group_Name"] : null);
        privateState.Group_Name = defaultValues ?
            (defaultValues["Group_Name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Group_Name"], context) :
                null) :
            null;

        context["field"] = "Status_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Status_id"] : null);
        privateState.Status_id = defaultValues ?
            (defaultValues["Status_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Status_id"], context) :
                null) :
            null;

        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "Name";
        context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
        privateState.Name = defaultValues ?
            (defaultValues["Name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Name"], context) :
                null) :
            null;

        context["field"] = "Type_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Type_id"] : null);
        privateState.Type_id = defaultValues ?
            (defaultValues["Type_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Type_id"], context) :
                null) :
            null;

        context["field"] = "isEAgreementActive";
        context["metadata"] = (objectMetadata ? objectMetadata["isEAgreementActive"] : null);
        privateState.isEAgreementActive = defaultValues ?
            (defaultValues["isEAgreementActive"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isEAgreementActive"], context) :
                null) :
            null;

        context["field"] = "Type_Name";
        context["metadata"] = (objectMetadata ? objectMetadata["Type_Name"] : null);
        privateState.Type_Name = defaultValues ?
            (defaultValues["Type_Name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Type_Name"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "Customers_Count": {
                get: function() {
                    context["field"] = "Customers_Count";
                    context["metadata"] = (objectMetadata ? objectMetadata["Customers_Count"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Customers_Count, context);
                },
                set: function(val) {
                    setterFunctions['Customers_Count'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Entitlements_Count": {
                get: function() {
                    context["field"] = "Entitlements_Count";
                    context["metadata"] = (objectMetadata ? objectMetadata["Entitlements_Count"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Entitlements_Count, context);
                },
                set: function(val) {
                    setterFunctions['Entitlements_Count'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Group_Desc": {
                get: function() {
                    context["field"] = "Group_Desc";
                    context["metadata"] = (objectMetadata ? objectMetadata["Group_Desc"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Group_Desc, context);
                },
                set: function(val) {
                    setterFunctions['Group_Desc'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Group_id": {
                get: function() {
                    context["field"] = "Group_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Group_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Group_id, context);
                },
                set: function(val) {
                    setterFunctions['Group_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Group_Name": {
                get: function() {
                    context["field"] = "Group_Name";
                    context["metadata"] = (objectMetadata ? objectMetadata["Group_Name"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Group_Name, context);
                },
                set: function(val) {
                    setterFunctions['Group_Name'].call(this, val, privateState);
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
            "id": {
                get: function() {
                    context["field"] = "id";
                    context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.id, context);
                },
                set: function(val) {
                    setterFunctions['id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Name": {
                get: function() {
                    context["field"] = "Name";
                    context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Name, context);
                },
                set: function(val) {
                    setterFunctions['Name'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Type_id": {
                get: function() {
                    context["field"] = "Type_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Type_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Type_id, context);
                },
                set: function(val) {
                    setterFunctions['Type_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isEAgreementActive": {
                get: function() {
                    context["field"] = "isEAgreementActive";
                    context["metadata"] = (objectMetadata ? objectMetadata["isEAgreementActive"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isEAgreementActive, context);
                },
                set: function(val) {
                    setterFunctions['isEAgreementActive'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Type_Name": {
                get: function() {
                    context["field"] = "Type_Name";
                    context["metadata"] = (objectMetadata ? objectMetadata["Type_Name"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Type_Name, context);
                },
                set: function(val) {
                    setterFunctions['Type_Name'].call(this, val, privateState);
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
            privateState.Customers_Count = value ? (value["Customers_Count"] ? value["Customers_Count"] : null) : null;
            privateState.Entitlements_Count = value ? (value["Entitlements_Count"] ? value["Entitlements_Count"] : null) : null;
            privateState.Group_Desc = value ? (value["Group_Desc"] ? value["Group_Desc"] : null) : null;
            privateState.Group_id = value ? (value["Group_id"] ? value["Group_id"] : null) : null;
            privateState.Group_Name = value ? (value["Group_Name"] ? value["Group_Name"] : null) : null;
            privateState.Status_id = value ? (value["Status_id"] ? value["Status_id"] : null) : null;
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.Name = value ? (value["Name"] ? value["Name"] : null) : null;
            privateState.Type_id = value ? (value["Type_id"] ? value["Type_id"] : null) : null;
            privateState.isEAgreementActive = value ? (value["isEAgreementActive"] ? value["isEAgreementActive"] : null) : null;
            privateState.Type_Name = value ? (value["Type_Name"] ? value["Type_Name"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(GroupRecords);

    //Create new class level validator object
    BaseModel.Validator.call(GroupRecords);

    var registerValidatorBackup = GroupRecords.registerValidator;

    GroupRecords.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(GroupRecords.isValid(this, propName, val)) {
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

    GroupRecords.relations = relations;

    GroupRecords.prototype.isValid = function() {
        return GroupRecords.isValid(this);
    };

    GroupRecords.prototype.objModelName = "GroupRecords";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    GroupRecords.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CustomerGroupsAndEntitlObjSvc", "GroupRecords", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    GroupRecords.clone = function(objectToClone) {
        var clonedObj = new GroupRecords();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return GroupRecords;
});