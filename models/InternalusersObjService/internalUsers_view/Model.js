/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "internalUsers_view", "objectService" : "InternalusersObjService"};

    var setterFunctions = {
        createdts: function(val, state) {
            context["field"] = "createdts";
            context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
            state['createdts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        Home_Addr: function(val, state) {
            context["field"] = "Home_Addr";
            context["metadata"] = (objectMetadata ? objectMetadata["Home_Addr"] : null);
            state['Home_Addr'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastloggedin: function(val, state) {
            context["field"] = "lastloggedin";
            context["metadata"] = (objectMetadata ? objectMetadata["lastloggedin"] : null);
            state['lastloggedin'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastmodifiedts: function(val, state) {
            context["field"] = "lastmodifiedts";
            context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
            state['lastmodifiedts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        Name: function(val, state) {
            context["field"] = "Name";
            context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
            state['Name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Permission_Count: function(val, state) {
            context["field"] = "Permission_Count";
            context["metadata"] = (objectMetadata ? objectMetadata["Permission_Count"] : null);
            state['Permission_Count'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Role_Desc: function(val, state) {
            context["field"] = "Role_Desc";
            context["metadata"] = (objectMetadata ? objectMetadata["Role_Desc"] : null);
            state['Role_Desc'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        Username: function(val, state) {
            context["field"] = "Username";
            context["metadata"] = (objectMetadata ? objectMetadata["Username"] : null);
            state['Username'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        User_id: function(val, state) {
            context["field"] = "User_id";
            context["metadata"] = (objectMetadata ? objectMetadata["User_id"] : null);
            state['User_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Work_Addr: function(val, state) {
            context["field"] = "Work_Addr";
            context["metadata"] = (objectMetadata ? objectMetadata["Work_Addr"] : null);
            state['Work_Addr'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function internalUsers_view(defaultValues) {
        var privateState = {};
        context["field"] = "createdts";
        context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
        privateState.createdts = defaultValues ?
            (defaultValues["createdts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdts"], context) :
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

        context["field"] = "Home_Addr";
        context["metadata"] = (objectMetadata ? objectMetadata["Home_Addr"] : null);
        privateState.Home_Addr = defaultValues ?
            (defaultValues["Home_Addr"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Home_Addr"], context) :
                null) :
            null;

        context["field"] = "lastloggedin";
        context["metadata"] = (objectMetadata ? objectMetadata["lastloggedin"] : null);
        privateState.lastloggedin = defaultValues ?
            (defaultValues["lastloggedin"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastloggedin"], context) :
                null) :
            null;

        context["field"] = "lastmodifiedts";
        context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
        privateState.lastmodifiedts = defaultValues ?
            (defaultValues["lastmodifiedts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastmodifiedts"], context) :
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

        context["field"] = "Name";
        context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
        privateState.Name = defaultValues ?
            (defaultValues["Name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Name"], context) :
                null) :
            null;

        context["field"] = "Permission_Count";
        context["metadata"] = (objectMetadata ? objectMetadata["Permission_Count"] : null);
        privateState.Permission_Count = defaultValues ?
            (defaultValues["Permission_Count"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Permission_Count"], context) :
                null) :
            null;

        context["field"] = "Role_Desc";
        context["metadata"] = (objectMetadata ? objectMetadata["Role_Desc"] : null);
        privateState.Role_Desc = defaultValues ?
            (defaultValues["Role_Desc"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Role_Desc"], context) :
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

        context["field"] = "Username";
        context["metadata"] = (objectMetadata ? objectMetadata["Username"] : null);
        privateState.Username = defaultValues ?
            (defaultValues["Username"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Username"], context) :
                null) :
            null;

        context["field"] = "User_id";
        context["metadata"] = (objectMetadata ? objectMetadata["User_id"] : null);
        privateState.User_id = defaultValues ?
            (defaultValues["User_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["User_id"], context) :
                null) :
            null;

        context["field"] = "Work_Addr";
        context["metadata"] = (objectMetadata ? objectMetadata["Work_Addr"] : null);
        privateState.Work_Addr = defaultValues ?
            (defaultValues["Work_Addr"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Work_Addr"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "createdts": {
                get: function() {
                    context["field"] = "createdts";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdts, context);
                },
                set: function(val) {
                    setterFunctions['createdts'].call(this, val, privateState);
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
            "Home_Addr": {
                get: function() {
                    context["field"] = "Home_Addr";
                    context["metadata"] = (objectMetadata ? objectMetadata["Home_Addr"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Home_Addr, context);
                },
                set: function(val) {
                    setterFunctions['Home_Addr'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastloggedin": {
                get: function() {
                    context["field"] = "lastloggedin";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastloggedin"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastloggedin, context);
                },
                set: function(val) {
                    setterFunctions['lastloggedin'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastmodifiedts": {
                get: function() {
                    context["field"] = "lastmodifiedts";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastmodifiedts, context);
                },
                set: function(val) {
                    setterFunctions['lastmodifiedts'].call(this, val, privateState);
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
            "Permission_Count": {
                get: function() {
                    context["field"] = "Permission_Count";
                    context["metadata"] = (objectMetadata ? objectMetadata["Permission_Count"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Permission_Count, context);
                },
                set: function(val) {
                    setterFunctions['Permission_Count'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Role_Desc": {
                get: function() {
                    context["field"] = "Role_Desc";
                    context["metadata"] = (objectMetadata ? objectMetadata["Role_Desc"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Role_Desc, context);
                },
                set: function(val) {
                    setterFunctions['Role_Desc'].call(this, val, privateState);
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
            "User_id": {
                get: function() {
                    context["field"] = "User_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["User_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.User_id, context);
                },
                set: function(val) {
                    setterFunctions['User_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Work_Addr": {
                get: function() {
                    context["field"] = "Work_Addr";
                    context["metadata"] = (objectMetadata ? objectMetadata["Work_Addr"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Work_Addr, context);
                },
                set: function(val) {
                    setterFunctions['Work_Addr'].call(this, val, privateState);
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
            privateState.createdts = value ? (value["createdts"] ? value["createdts"] : null) : null;
            privateState.Email = value ? (value["Email"] ? value["Email"] : null) : null;
            privateState.FirstName = value ? (value["FirstName"] ? value["FirstName"] : null) : null;
            privateState.Home_Addr = value ? (value["Home_Addr"] ? value["Home_Addr"] : null) : null;
            privateState.lastloggedin = value ? (value["lastloggedin"] ? value["lastloggedin"] : null) : null;
            privateState.lastmodifiedts = value ? (value["lastmodifiedts"] ? value["lastmodifiedts"] : null) : null;
            privateState.LastName = value ? (value["LastName"] ? value["LastName"] : null) : null;
            privateState.MiddleName = value ? (value["MiddleName"] ? value["MiddleName"] : null) : null;
            privateState.Name = value ? (value["Name"] ? value["Name"] : null) : null;
            privateState.Permission_Count = value ? (value["Permission_Count"] ? value["Permission_Count"] : null) : null;
            privateState.Role_Desc = value ? (value["Role_Desc"] ? value["Role_Desc"] : null) : null;
            privateState.Role_id = value ? (value["Role_id"] ? value["Role_id"] : null) : null;
            privateState.Role_Name = value ? (value["Role_Name"] ? value["Role_Name"] : null) : null;
            privateState.Status_Desc = value ? (value["Status_Desc"] ? value["Status_Desc"] : null) : null;
            privateState.Status_id = value ? (value["Status_id"] ? value["Status_id"] : null) : null;
            privateState.Username = value ? (value["Username"] ? value["Username"] : null) : null;
            privateState.User_id = value ? (value["User_id"] ? value["User_id"] : null) : null;
            privateState.Work_Addr = value ? (value["Work_Addr"] ? value["Work_Addr"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(internalUsers_view);

    //Create new class level validator object
    BaseModel.Validator.call(internalUsers_view);

    var registerValidatorBackup = internalUsers_view.registerValidator;

    internalUsers_view.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(internalUsers_view.isValid(this, propName, val)) {
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
    //For Operation 'downloadUserList' with service id 'downloadUserList4157'
     internalUsers_view.downloadUserList = function(params, onCompletion){
        return internalUsers_view.customVerb('downloadUserList', params, onCompletion);
     };

    //For Operation 'generateUsersList' with service id 'generateUsersList4596'
     internalUsers_view.generateUsersList = function(params, onCompletion){
        return internalUsers_view.customVerb('generateUsersList', params, onCompletion);
     };

    //For Operation 'GetUsers' with service id 'getUserList2642'
     internalUsers_view.GetUsers = function(params, onCompletion){
        return internalUsers_view.customVerb('GetUsers', params, onCompletion);
     };

    //For Operation 'downloadUsersList' with service id 'downloadUsersList4453'
     internalUsers_view.downloadUsersList = function(params, onCompletion){
        return internalUsers_view.customVerb('downloadUsersList', params, onCompletion);
     };

    var relations = [];

    internalUsers_view.relations = relations;

    internalUsers_view.prototype.isValid = function() {
        return internalUsers_view.isValid(this);
    };

    internalUsers_view.prototype.objModelName = "internalUsers_view";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    internalUsers_view.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("InternalusersObjService", "internalUsers_view", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    internalUsers_view.clone = function(objectToClone) {
        var clonedObj = new internalUsers_view();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return internalUsers_view;
});