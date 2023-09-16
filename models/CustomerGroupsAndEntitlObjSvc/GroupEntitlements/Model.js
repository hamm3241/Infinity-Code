/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "GroupEntitlements", "objectService" : "CustomerGroupsAndEntitlObjSvc"};

    var setterFunctions = {
        Description: function(val, state) {
            context["field"] = "Description";
            context["metadata"] = (objectMetadata ? objectMetadata["Description"] : null);
            state['Description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Group_id: function(val, state) {
            context["field"] = "Group_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Group_id"] : null);
            state['Group_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Name: function(val, state) {
            context["field"] = "Name";
            context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
            state['Name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Service_id: function(val, state) {
            context["field"] = "Service_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Service_id"] : null);
            state['Service_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TransactionFee_id: function(val, state) {
            context["field"] = "TransactionFee_id";
            context["metadata"] = (objectMetadata ? objectMetadata["TransactionFee_id"] : null);
            state['TransactionFee_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TransactionLimit_id: function(val, state) {
            context["field"] = "TransactionLimit_id";
            context["metadata"] = (objectMetadata ? objectMetadata["TransactionLimit_id"] : null);
            state['TransactionLimit_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Type_id: function(val, state) {
            context["field"] = "Type_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Type_id"] : null);
            state['Type_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MaxDailyLimit: function(val, state) {
            context["field"] = "MaxDailyLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["MaxDailyLimit"] : null);
            state['MaxDailyLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MaxTransferLimit: function(val, state) {
            context["field"] = "MaxTransferLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["MaxTransferLimit"] : null);
            state['MaxTransferLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MinTransferLimit: function(val, state) {
            context["field"] = "MinTransferLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["MinTransferLimit"] : null);
            state['MinTransferLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function GroupEntitlements(defaultValues) {
        var privateState = {};
        context["field"] = "Description";
        context["metadata"] = (objectMetadata ? objectMetadata["Description"] : null);
        privateState.Description = defaultValues ?
            (defaultValues["Description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Description"], context) :
                null) :
            null;

        context["field"] = "Group_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Group_id"] : null);
        privateState.Group_id = defaultValues ?
            (defaultValues["Group_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Group_id"], context) :
                null) :
            null;

        context["field"] = "Name";
        context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
        privateState.Name = defaultValues ?
            (defaultValues["Name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Name"], context) :
                null) :
            null;

        context["field"] = "Service_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Service_id"] : null);
        privateState.Service_id = defaultValues ?
            (defaultValues["Service_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Service_id"], context) :
                null) :
            null;

        context["field"] = "TransactionFee_id";
        context["metadata"] = (objectMetadata ? objectMetadata["TransactionFee_id"] : null);
        privateState.TransactionFee_id = defaultValues ?
            (defaultValues["TransactionFee_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TransactionFee_id"], context) :
                null) :
            null;

        context["field"] = "TransactionLimit_id";
        context["metadata"] = (objectMetadata ? objectMetadata["TransactionLimit_id"] : null);
        privateState.TransactionLimit_id = defaultValues ?
            (defaultValues["TransactionLimit_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TransactionLimit_id"], context) :
                null) :
            null;

        context["field"] = "Type_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Type_id"] : null);
        privateState.Type_id = defaultValues ?
            (defaultValues["Type_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Type_id"], context) :
                null) :
            null;

        context["field"] = "MaxDailyLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["MaxDailyLimit"] : null);
        privateState.MaxDailyLimit = defaultValues ?
            (defaultValues["MaxDailyLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MaxDailyLimit"], context) :
                null) :
            null;

        context["field"] = "MaxTransferLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["MaxTransferLimit"] : null);
        privateState.MaxTransferLimit = defaultValues ?
            (defaultValues["MaxTransferLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MaxTransferLimit"], context) :
                null) :
            null;

        context["field"] = "MinTransferLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["MinTransferLimit"] : null);
        privateState.MinTransferLimit = defaultValues ?
            (defaultValues["MinTransferLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MinTransferLimit"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "Description": {
                get: function() {
                    context["field"] = "Description";
                    context["metadata"] = (objectMetadata ? objectMetadata["Description"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Description, context);
                },
                set: function(val) {
                    setterFunctions['Description'].call(this, val, privateState);
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
            "Service_id": {
                get: function() {
                    context["field"] = "Service_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Service_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Service_id, context);
                },
                set: function(val) {
                    setterFunctions['Service_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TransactionFee_id": {
                get: function() {
                    context["field"] = "TransactionFee_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["TransactionFee_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TransactionFee_id, context);
                },
                set: function(val) {
                    setterFunctions['TransactionFee_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TransactionLimit_id": {
                get: function() {
                    context["field"] = "TransactionLimit_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["TransactionLimit_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TransactionLimit_id, context);
                },
                set: function(val) {
                    setterFunctions['TransactionLimit_id'].call(this, val, privateState);
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
            "MaxDailyLimit": {
                get: function() {
                    context["field"] = "MaxDailyLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["MaxDailyLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MaxDailyLimit, context);
                },
                set: function(val) {
                    setterFunctions['MaxDailyLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MaxTransferLimit": {
                get: function() {
                    context["field"] = "MaxTransferLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["MaxTransferLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MaxTransferLimit, context);
                },
                set: function(val) {
                    setterFunctions['MaxTransferLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MinTransferLimit": {
                get: function() {
                    context["field"] = "MinTransferLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["MinTransferLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MinTransferLimit, context);
                },
                set: function(val) {
                    setterFunctions['MinTransferLimit'].call(this, val, privateState);
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
            privateState.Description = value ? (value["Description"] ? value["Description"] : null) : null;
            privateState.Group_id = value ? (value["Group_id"] ? value["Group_id"] : null) : null;
            privateState.Name = value ? (value["Name"] ? value["Name"] : null) : null;
            privateState.Service_id = value ? (value["Service_id"] ? value["Service_id"] : null) : null;
            privateState.TransactionFee_id = value ? (value["TransactionFee_id"] ? value["TransactionFee_id"] : null) : null;
            privateState.TransactionLimit_id = value ? (value["TransactionLimit_id"] ? value["TransactionLimit_id"] : null) : null;
            privateState.Type_id = value ? (value["Type_id"] ? value["Type_id"] : null) : null;
            privateState.MaxDailyLimit = value ? (value["MaxDailyLimit"] ? value["MaxDailyLimit"] : null) : null;
            privateState.MaxTransferLimit = value ? (value["MaxTransferLimit"] ? value["MaxTransferLimit"] : null) : null;
            privateState.MinTransferLimit = value ? (value["MinTransferLimit"] ? value["MinTransferLimit"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(GroupEntitlements);

    //Create new class level validator object
    BaseModel.Validator.call(GroupEntitlements);

    var registerValidatorBackup = GroupEntitlements.registerValidator;

    GroupEntitlements.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(GroupEntitlements.isValid(this, propName, val)) {
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
    //For Operation 'getGroupEntitlements' with service id 'getGroupsEntitlements9371'
     GroupEntitlements.getGroupEntitlements = function(params, onCompletion){
        return GroupEntitlements.customVerb('getGroupEntitlements', params, onCompletion);
     };

    var relations = [];

    GroupEntitlements.relations = relations;

    GroupEntitlements.prototype.isValid = function() {
        return GroupEntitlements.isValid(this);
    };

    GroupEntitlements.prototype.objModelName = "GroupEntitlements";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    GroupEntitlements.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CustomerGroupsAndEntitlObjSvc", "GroupEntitlements", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    GroupEntitlements.clone = function(objectToClone) {
        var clonedObj = new GroupEntitlements();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return GroupEntitlements;
});