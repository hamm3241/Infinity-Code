/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "createUser", "objectService" : "InternalusersObjService"};

    var setterFunctions = {
        currUser: function(val, state) {
            context["field"] = "currUser";
            context["metadata"] = (objectMetadata ? objectMetadata["currUser"] : null);
            state['currUser'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Email: function(val, state) {
            context["field"] = "Email";
            context["metadata"] = (objectMetadata ? objectMetadata["Email"] : null);
            state['Email'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        FirstName: function(val, state) {
            context["field"] = "FirstName";
            context["metadata"] = (objectMetadata ? objectMetadata["FirstName"] : null);
            state['FirstName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        LastName: function(val, state) {
            context["field"] = "LastName";
            context["metadata"] = (objectMetadata ? objectMetadata["LastName"] : null);
            state['LastName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MiddleName: function(val, state) {
            context["field"] = "MiddleName";
            context["metadata"] = (objectMetadata ? objectMetadata["MiddleName"] : null);
            state['MiddleName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        permission_ids: function(val, state) {
            context["field"] = "permission_ids";
            context["metadata"] = (objectMetadata ? objectMetadata["permission_ids"] : null);
            state['permission_ids'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        role_id: function(val, state) {
            context["field"] = "role_id";
            context["metadata"] = (objectMetadata ? objectMetadata["role_id"] : null);
            state['role_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Status_id: function(val, state) {
            context["field"] = "Status_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Status_id"] : null);
            state['Status_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Username: function(val, state) {
            context["field"] = "Username";
            context["metadata"] = (objectMetadata ? objectMetadata["Username"] : null);
            state['Username'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        vizServerURL: function(val, state) {
            context["field"] = "vizServerURL";
            context["metadata"] = (objectMetadata ? objectMetadata["vizServerURL"] : null);
            state['vizServerURL'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        WorkID: function(val, state) {
            context["field"] = "WorkID";
            context["metadata"] = (objectMetadata ? objectMetadata["WorkID"] : null);
            state['WorkID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lineOfBusiness: function(val, state) {
            context["field"] = "lineOfBusiness";
            context["metadata"] = (objectMetadata ? objectMetadata["lineOfBusiness"] : null);
            state['lineOfBusiness'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userType: function(val, state) {
            context["field"] = "userType";
            context["metadata"] = (objectMetadata ? objectMetadata["userType"] : null);
            state['userType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reportingManager: function(val, state) {
            context["field"] = "reportingManager";
            context["metadata"] = (objectMetadata ? objectMetadata["reportingManager"] : null);
            state['reportingManager'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function createUser(defaultValues) {
        var privateState = {};
        context["field"] = "currUser";
        context["metadata"] = (objectMetadata ? objectMetadata["currUser"] : null);
        privateState.currUser = defaultValues ?
            (defaultValues["currUser"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currUser"], context) :
                null) :
            null;

        context["field"] = "Email";
        context["metadata"] = (objectMetadata ? objectMetadata["Email"] : null);
        privateState.Email = defaultValues ?
            (defaultValues["Email"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Email"], context) :
                null) :
            null;

        context["field"] = "FirstName";
        context["metadata"] = (objectMetadata ? objectMetadata["FirstName"] : null);
        privateState.FirstName = defaultValues ?
            (defaultValues["FirstName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["FirstName"], context) :
                null) :
            null;

        context["field"] = "LastName";
        context["metadata"] = (objectMetadata ? objectMetadata["LastName"] : null);
        privateState.LastName = defaultValues ?
            (defaultValues["LastName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["LastName"], context) :
                null) :
            null;

        context["field"] = "MiddleName";
        context["metadata"] = (objectMetadata ? objectMetadata["MiddleName"] : null);
        privateState.MiddleName = defaultValues ?
            (defaultValues["MiddleName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MiddleName"], context) :
                null) :
            null;

        context["field"] = "permission_ids";
        context["metadata"] = (objectMetadata ? objectMetadata["permission_ids"] : null);
        privateState.permission_ids = defaultValues ?
            (defaultValues["permission_ids"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["permission_ids"], context) :
                null) :
            null;

        context["field"] = "role_id";
        context["metadata"] = (objectMetadata ? objectMetadata["role_id"] : null);
        privateState.role_id = defaultValues ?
            (defaultValues["role_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["role_id"], context) :
                null) :
            null;

        context["field"] = "Status_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Status_id"] : null);
        privateState.Status_id = defaultValues ?
            (defaultValues["Status_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Status_id"], context) :
                null) :
            null;

        context["field"] = "Username";
        context["metadata"] = (objectMetadata ? objectMetadata["Username"] : null);
        privateState.Username = defaultValues ?
            (defaultValues["Username"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Username"], context) :
                null) :
            null;

        context["field"] = "vizServerURL";
        context["metadata"] = (objectMetadata ? objectMetadata["vizServerURL"] : null);
        privateState.vizServerURL = defaultValues ?
            (defaultValues["vizServerURL"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["vizServerURL"], context) :
                null) :
            null;

        context["field"] = "WorkID";
        context["metadata"] = (objectMetadata ? objectMetadata["WorkID"] : null);
        privateState.WorkID = defaultValues ?
            (defaultValues["WorkID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["WorkID"], context) :
                null) :
            null;

        context["field"] = "lineOfBusiness";
        context["metadata"] = (objectMetadata ? objectMetadata["lineOfBusiness"] : null);
        privateState.lineOfBusiness = defaultValues ?
            (defaultValues["lineOfBusiness"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lineOfBusiness"], context) :
                null) :
            null;

        context["field"] = "userType";
        context["metadata"] = (objectMetadata ? objectMetadata["userType"] : null);
        privateState.userType = defaultValues ?
            (defaultValues["userType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userType"], context) :
                null) :
            null;

        context["field"] = "reportingManager";
        context["metadata"] = (objectMetadata ? objectMetadata["reportingManager"] : null);
        privateState.reportingManager = defaultValues ?
            (defaultValues["reportingManager"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reportingManager"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "currUser": {
                get: function() {
                    context["field"] = "currUser";
                    context["metadata"] = (objectMetadata ? objectMetadata["currUser"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currUser, context);
                },
                set: function(val) {
                    setterFunctions['currUser'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Email": {
                get: function() {
                    context["field"] = "Email";
                    context["metadata"] = (objectMetadata ? objectMetadata["Email"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Email, context);
                },
                set: function(val) {
                    setterFunctions['Email'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "FirstName": {
                get: function() {
                    context["field"] = "FirstName";
                    context["metadata"] = (objectMetadata ? objectMetadata["FirstName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.FirstName, context);
                },
                set: function(val) {
                    setterFunctions['FirstName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "LastName": {
                get: function() {
                    context["field"] = "LastName";
                    context["metadata"] = (objectMetadata ? objectMetadata["LastName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.LastName, context);
                },
                set: function(val) {
                    setterFunctions['LastName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MiddleName": {
                get: function() {
                    context["field"] = "MiddleName";
                    context["metadata"] = (objectMetadata ? objectMetadata["MiddleName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MiddleName, context);
                },
                set: function(val) {
                    setterFunctions['MiddleName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "permission_ids": {
                get: function() {
                    context["field"] = "permission_ids";
                    context["metadata"] = (objectMetadata ? objectMetadata["permission_ids"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.permission_ids, context);
                },
                set: function(val) {
                    setterFunctions['permission_ids'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "role_id": {
                get: function() {
                    context["field"] = "role_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["role_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.role_id, context);
                },
                set: function(val) {
                    setterFunctions['role_id'].call(this, val, privateState);
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
            "Username": {
                get: function() {
                    context["field"] = "Username";
                    context["metadata"] = (objectMetadata ? objectMetadata["Username"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Username, context);
                },
                set: function(val) {
                    setterFunctions['Username'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "vizServerURL": {
                get: function() {
                    context["field"] = "vizServerURL";
                    context["metadata"] = (objectMetadata ? objectMetadata["vizServerURL"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.vizServerURL, context);
                },
                set: function(val) {
                    setterFunctions['vizServerURL'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "WorkID": {
                get: function() {
                    context["field"] = "WorkID";
                    context["metadata"] = (objectMetadata ? objectMetadata["WorkID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.WorkID, context);
                },
                set: function(val) {
                    setterFunctions['WorkID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lineOfBusiness": {
                get: function() {
                    context["field"] = "lineOfBusiness";
                    context["metadata"] = (objectMetadata ? objectMetadata["lineOfBusiness"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lineOfBusiness, context);
                },
                set: function(val) {
                    setterFunctions['lineOfBusiness'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "userType": {
                get: function() {
                    context["field"] = "userType";
                    context["metadata"] = (objectMetadata ? objectMetadata["userType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userType, context);
                },
                set: function(val) {
                    setterFunctions['userType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reportingManager": {
                get: function() {
                    context["field"] = "reportingManager";
                    context["metadata"] = (objectMetadata ? objectMetadata["reportingManager"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reportingManager, context);
                },
                set: function(val) {
                    setterFunctions['reportingManager'].call(this, val, privateState);
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
            privateState.currUser = value ? (value["currUser"] ? value["currUser"] : null) : null;
            privateState.Email = value ? (value["Email"] ? value["Email"] : null) : null;
            privateState.FirstName = value ? (value["FirstName"] ? value["FirstName"] : null) : null;
            privateState.LastName = value ? (value["LastName"] ? value["LastName"] : null) : null;
            privateState.MiddleName = value ? (value["MiddleName"] ? value["MiddleName"] : null) : null;
            privateState.permission_ids = value ? (value["permission_ids"] ? value["permission_ids"] : null) : null;
            privateState.role_id = value ? (value["role_id"] ? value["role_id"] : null) : null;
            privateState.Status_id = value ? (value["Status_id"] ? value["Status_id"] : null) : null;
            privateState.Username = value ? (value["Username"] ? value["Username"] : null) : null;
            privateState.vizServerURL = value ? (value["vizServerURL"] ? value["vizServerURL"] : null) : null;
            privateState.WorkID = value ? (value["WorkID"] ? value["WorkID"] : null) : null;
            privateState.lineOfBusiness = value ? (value["lineOfBusiness"] ? value["lineOfBusiness"] : null) : null;
            privateState.userType = value ? (value["userType"] ? value["userType"] : null) : null;
            privateState.reportingManager = value ? (value["reportingManager"] ? value["reportingManager"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(createUser);

    //Create new class level validator object
    BaseModel.Validator.call(createUser);

    var registerValidatorBackup = createUser.registerValidator;

    createUser.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(createUser.isValid(this, propName, val)) {
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

    createUser.relations = relations;

    createUser.prototype.isValid = function() {
        return createUser.isValid(this);
    };

    createUser.prototype.objModelName = "createUser";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    createUser.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("InternalusersObjService", "createUser", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    createUser.clone = function(objectToClone) {
        var clonedObj = new createUser();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return createUser;
});