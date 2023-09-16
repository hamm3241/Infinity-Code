/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "ApprovalRequest", "objectService" : "MakerCheckerWorkflow"};

    var setterFunctions = {
        requestId: function(val, state) {
            context["field"] = "requestId";
            context["metadata"] = (objectMetadata ? objectMetadata["requestId"] : null);
            state['requestId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expAPIOperationName: function(val, state) {
            context["field"] = "expAPIOperationName";
            context["metadata"] = (objectMetadata ? objectMetadata["expAPIOperationName"] : null);
            state['expAPIOperationName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        context: function(val, state) {
            context["field"] = "context";
            context["metadata"] = (objectMetadata ? objectMetadata["context"] : null);
            state['context'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recordId: function(val, state) {
            context["field"] = "recordId";
            context["metadata"] = (objectMetadata ? objectMetadata["recordId"] : null);
            state['recordId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        hasPermission: function(val, state) {
            context["field"] = "hasPermission";
            context["metadata"] = (objectMetadata ? objectMetadata["hasPermission"] : null);
            state['hasPermission'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reason: function(val, state) {
            context["field"] = "reason";
            context["metadata"] = (objectMetadata ? objectMetadata["reason"] : null);
            state['reason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        statusMessage: function(val, state) {
            context["field"] = "statusMessage";
            context["metadata"] = (objectMetadata ? objectMetadata["statusMessage"] : null);
            state['statusMessage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function ApprovalRequest(defaultValues) {
        var privateState = {};
        context["field"] = "requestId";
        context["metadata"] = (objectMetadata ? objectMetadata["requestId"] : null);
        privateState.requestId = defaultValues ?
            (defaultValues["requestId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestId"], context) :
                null) :
            null;

        context["field"] = "expAPIOperationName";
        context["metadata"] = (objectMetadata ? objectMetadata["expAPIOperationName"] : null);
        privateState.expAPIOperationName = defaultValues ?
            (defaultValues["expAPIOperationName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expAPIOperationName"], context) :
                null) :
            null;

        context["field"] = "context";
        context["metadata"] = (objectMetadata ? objectMetadata["context"] : null);
        privateState.context = defaultValues ?
            (defaultValues["context"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["context"], context) :
                null) :
            null;

        context["field"] = "recordId";
        context["metadata"] = (objectMetadata ? objectMetadata["recordId"] : null);
        privateState.recordId = defaultValues ?
            (defaultValues["recordId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recordId"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "hasPermission";
        context["metadata"] = (objectMetadata ? objectMetadata["hasPermission"] : null);
        privateState.hasPermission = defaultValues ?
            (defaultValues["hasPermission"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["hasPermission"], context) :
                null) :
            null;

        context["field"] = "reason";
        context["metadata"] = (objectMetadata ? objectMetadata["reason"] : null);
        privateState.reason = defaultValues ?
            (defaultValues["reason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reason"], context) :
                null) :
            null;

        context["field"] = "statusMessage";
        context["metadata"] = (objectMetadata ? objectMetadata["statusMessage"] : null);
        privateState.statusMessage = defaultValues ?
            (defaultValues["statusMessage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["statusMessage"], context) :
                null) :
            null;

        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "requestId": {
                get: function() {
                    context["field"] = "requestId";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestId, context);
                },
                set: function(val) {
                    setterFunctions['requestId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "expAPIOperationName": {
                get: function() {
                    context["field"] = "expAPIOperationName";
                    context["metadata"] = (objectMetadata ? objectMetadata["expAPIOperationName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.expAPIOperationName, context);
                },
                set: function(val) {
                    setterFunctions['expAPIOperationName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "context": {
                get: function() {
                    context["field"] = "context";
                    context["metadata"] = (objectMetadata ? objectMetadata["context"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.context, context);
                },
                set: function(val) {
                    setterFunctions['context'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recordId": {
                get: function() {
                    context["field"] = "recordId";
                    context["metadata"] = (objectMetadata ? objectMetadata["recordId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recordId, context);
                },
                set: function(val) {
                    setterFunctions['recordId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "status": {
                get: function() {
                    context["field"] = "status";
                    context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.status, context);
                },
                set: function(val) {
                    setterFunctions['status'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "hasPermission": {
                get: function() {
                    context["field"] = "hasPermission";
                    context["metadata"] = (objectMetadata ? objectMetadata["hasPermission"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.hasPermission, context);
                },
                set: function(val) {
                    setterFunctions['hasPermission'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reason": {
                get: function() {
                    context["field"] = "reason";
                    context["metadata"] = (objectMetadata ? objectMetadata["reason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reason, context);
                },
                set: function(val) {
                    setterFunctions['reason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "statusMessage": {
                get: function() {
                    context["field"] = "statusMessage";
                    context["metadata"] = (objectMetadata ? objectMetadata["statusMessage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.statusMessage, context);
                },
                set: function(val) {
                    setterFunctions['statusMessage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "userId": {
                get: function() {
                    context["field"] = "userId";
                    context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userId, context);
                },
                set: function(val) {
                    setterFunctions['userId'].call(this, val, privateState);
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
            privateState.requestId = value ? (value["requestId"] ? value["requestId"] : null) : null;
            privateState.expAPIOperationName = value ? (value["expAPIOperationName"] ? value["expAPIOperationName"] : null) : null;
            privateState.context = value ? (value["context"] ? value["context"] : null) : null;
            privateState.recordId = value ? (value["recordId"] ? value["recordId"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.hasPermission = value ? (value["hasPermission"] ? value["hasPermission"] : null) : null;
            privateState.reason = value ? (value["reason"] ? value["reason"] : null) : null;
            privateState.statusMessage = value ? (value["statusMessage"] ? value["statusMessage"] : null) : null;
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(ApprovalRequest);

    //Create new class level validator object
    BaseModel.Validator.call(ApprovalRequest);

    var registerValidatorBackup = ApprovalRequest.registerValidator;

    ApprovalRequest.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(ApprovalRequest.isValid(this, propName, val)) {
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
    //For Operation 'invokeApprovalWorkflow' with service id 'checkApprovalWorkFlowService6531'
     ApprovalRequest.invokeApprovalWorkflow = function(params, onCompletion){
        return ApprovalRequest.customVerb('invokeApprovalWorkflow', params, onCompletion);
     };

    var relations = [];

    ApprovalRequest.relations = relations;

    ApprovalRequest.prototype.isValid = function() {
        return ApprovalRequest.isValid(this);
    };

    ApprovalRequest.prototype.objModelName = "ApprovalRequest";
    ApprovalRequest.prototype.objServiceName = "MakerCheckerWorkflow";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    ApprovalRequest.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("MakerCheckerWorkflow", "ApprovalRequest", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    ApprovalRequest.clone = function(objectToClone) {
        var clonedObj = new ApprovalRequest();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return ApprovalRequest;
});