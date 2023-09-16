/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Authenticator", "objectService" : "SCAObjectServices"};

    var setterFunctions = {
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        name: function(val, state) {
            context["field"] = "name";
            context["metadata"] = (objectMetadata ? objectMetadata["name"] : null);
            state['name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        resourceType: function(val, state) {
            context["field"] = "resourceType";
            context["metadata"] = (objectMetadata ? objectMetadata["resourceType"] : null);
            state['resourceType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isActive: function(val, state) {
            context["field"] = "isActive";
            context["metadata"] = (objectMetadata ? objectMetadata["isActive"] : null);
            state['isActive'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastSuccessfulLogin: function(val, state) {
            context["field"] = "lastSuccessfulLogin";
            context["metadata"] = (objectMetadata ? objectMetadata["lastSuccessfulLogin"] : null);
            state['lastSuccessfulLogin'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastFailedLogin: function(val, state) {
            context["field"] = "lastFailedLogin";
            context["metadata"] = (objectMetadata ? objectMetadata["lastFailedLogin"] : null);
            state['lastFailedLogin'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        successfulCount: function(val, state) {
            context["field"] = "successfulCount";
            context["metadata"] = (objectMetadata ? objectMetadata["successfulCount"] : null);
            state['successfulCount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        failureCount: function(val, state) {
            context["field"] = "failureCount";
            context["metadata"] = (objectMetadata ? objectMetadata["failureCount"] : null);
            state['failureCount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        maximumNumberOfUsages: function(val, state) {
            context["field"] = "maximumNumberOfUsages";
            context["metadata"] = (objectMetadata ? objectMetadata["maximumNumberOfUsages"] : null);
            state['maximumNumberOfUsages'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        startDate: function(val, state) {
            context["field"] = "startDate";
            context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
            state['startDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiryDate: function(val, state) {
            context["field"] = "expiryDate";
            context["metadata"] = (objectMetadata ? objectMetadata["expiryDate"] : null);
            state['expiryDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Authenticator(defaultValues) {
        var privateState = {};
        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
                null) :
            null;

        context["field"] = "name";
        context["metadata"] = (objectMetadata ? objectMetadata["name"] : null);
        privateState.name = defaultValues ?
            (defaultValues["name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["name"], context) :
                null) :
            null;

        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "resourceType";
        context["metadata"] = (objectMetadata ? objectMetadata["resourceType"] : null);
        privateState.resourceType = defaultValues ?
            (defaultValues["resourceType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["resourceType"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "isActive";
        context["metadata"] = (objectMetadata ? objectMetadata["isActive"] : null);
        privateState.isActive = defaultValues ?
            (defaultValues["isActive"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isActive"], context) :
                null) :
            null;

        context["field"] = "lastSuccessfulLogin";
        context["metadata"] = (objectMetadata ? objectMetadata["lastSuccessfulLogin"] : null);
        privateState.lastSuccessfulLogin = defaultValues ?
            (defaultValues["lastSuccessfulLogin"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastSuccessfulLogin"], context) :
                null) :
            null;

        context["field"] = "lastFailedLogin";
        context["metadata"] = (objectMetadata ? objectMetadata["lastFailedLogin"] : null);
        privateState.lastFailedLogin = defaultValues ?
            (defaultValues["lastFailedLogin"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastFailedLogin"], context) :
                null) :
            null;

        context["field"] = "successfulCount";
        context["metadata"] = (objectMetadata ? objectMetadata["successfulCount"] : null);
        privateState.successfulCount = defaultValues ?
            (defaultValues["successfulCount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["successfulCount"], context) :
                null) :
            null;

        context["field"] = "failureCount";
        context["metadata"] = (objectMetadata ? objectMetadata["failureCount"] : null);
        privateState.failureCount = defaultValues ?
            (defaultValues["failureCount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["failureCount"], context) :
                null) :
            null;

        context["field"] = "maximumNumberOfUsages";
        context["metadata"] = (objectMetadata ? objectMetadata["maximumNumberOfUsages"] : null);
        privateState.maximumNumberOfUsages = defaultValues ?
            (defaultValues["maximumNumberOfUsages"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["maximumNumberOfUsages"], context) :
                null) :
            null;

        context["field"] = "startDate";
        context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
        privateState.startDate = defaultValues ?
            (defaultValues["startDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["startDate"], context) :
                null) :
            null;

        context["field"] = "expiryDate";
        context["metadata"] = (objectMetadata ? objectMetadata["expiryDate"] : null);
        privateState.expiryDate = defaultValues ?
            (defaultValues["expiryDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiryDate"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "name": {
                get: function() {
                    context["field"] = "name";
                    context["metadata"] = (objectMetadata ? objectMetadata["name"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.name, context);
                },
                set: function(val) {
                    setterFunctions['name'].call(this, val, privateState);
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
            "resourceType": {
                get: function() {
                    context["field"] = "resourceType";
                    context["metadata"] = (objectMetadata ? objectMetadata["resourceType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.resourceType, context);
                },
                set: function(val) {
                    setterFunctions['resourceType'].call(this, val, privateState);
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
            "isActive": {
                get: function() {
                    context["field"] = "isActive";
                    context["metadata"] = (objectMetadata ? objectMetadata["isActive"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isActive, context);
                },
                set: function(val) {
                    setterFunctions['isActive'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastSuccessfulLogin": {
                get: function() {
                    context["field"] = "lastSuccessfulLogin";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastSuccessfulLogin"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastSuccessfulLogin, context);
                },
                set: function(val) {
                    setterFunctions['lastSuccessfulLogin'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastFailedLogin": {
                get: function() {
                    context["field"] = "lastFailedLogin";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastFailedLogin"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastFailedLogin, context);
                },
                set: function(val) {
                    setterFunctions['lastFailedLogin'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "successfulCount": {
                get: function() {
                    context["field"] = "successfulCount";
                    context["metadata"] = (objectMetadata ? objectMetadata["successfulCount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.successfulCount, context);
                },
                set: function(val) {
                    setterFunctions['successfulCount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "failureCount": {
                get: function() {
                    context["field"] = "failureCount";
                    context["metadata"] = (objectMetadata ? objectMetadata["failureCount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.failureCount, context);
                },
                set: function(val) {
                    setterFunctions['failureCount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "maximumNumberOfUsages": {
                get: function() {
                    context["field"] = "maximumNumberOfUsages";
                    context["metadata"] = (objectMetadata ? objectMetadata["maximumNumberOfUsages"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.maximumNumberOfUsages, context);
                },
                set: function(val) {
                    setterFunctions['maximumNumberOfUsages'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "startDate": {
                get: function() {
                    context["field"] = "startDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.startDate, context);
                },
                set: function(val) {
                    setterFunctions['startDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "expiryDate": {
                get: function() {
                    context["field"] = "expiryDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["expiryDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.expiryDate, context);
                },
                set: function(val) {
                    setterFunctions['expiryDate'].call(this, val, privateState);
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
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
            privateState.name = value ? (value["name"] ? value["name"] : null) : null;
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.resourceType = value ? (value["resourceType"] ? value["resourceType"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.isActive = value ? (value["isActive"] ? value["isActive"] : null) : null;
            privateState.lastSuccessfulLogin = value ? (value["lastSuccessfulLogin"] ? value["lastSuccessfulLogin"] : null) : null;
            privateState.lastFailedLogin = value ? (value["lastFailedLogin"] ? value["lastFailedLogin"] : null) : null;
            privateState.successfulCount = value ? (value["successfulCount"] ? value["successfulCount"] : null) : null;
            privateState.failureCount = value ? (value["failureCount"] ? value["failureCount"] : null) : null;
            privateState.maximumNumberOfUsages = value ? (value["maximumNumberOfUsages"] ? value["maximumNumberOfUsages"] : null) : null;
            privateState.startDate = value ? (value["startDate"] ? value["startDate"] : null) : null;
            privateState.expiryDate = value ? (value["expiryDate"] ? value["expiryDate"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Authenticator);

    //Create new class level validator object
    BaseModel.Validator.call(Authenticator);

    var registerValidatorBackup = Authenticator.registerValidator;

    Authenticator.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Authenticator.isValid(this, propName, val)) {
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
    //For Operation 'getUserAuthenticators' with service id 'getAuthenticatorDetails1568'
     Authenticator.getUserAuthenticators = function(params, onCompletion){
        return Authenticator.customVerb('getUserAuthenticators', params, onCompletion);
     };

    var relations = [];

    Authenticator.relations = relations;

    Authenticator.prototype.isValid = function() {
        return Authenticator.isValid(this);
    };

    Authenticator.prototype.objModelName = "Authenticator";
    Authenticator.prototype.objServiceName = "SCAObjectServices";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Authenticator.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("SCAObjectServices", "Authenticator", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Authenticator.clone = function(objectToClone) {
        var clonedObj = new Authenticator();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Authenticator;
});