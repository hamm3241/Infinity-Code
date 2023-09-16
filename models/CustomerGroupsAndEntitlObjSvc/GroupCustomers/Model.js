/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "GroupCustomers", "objectService" : "CustomerGroupsAndEntitlObjSvc"};

    var setterFunctions = {
        Customer_id: function(val, state) {
            context["field"] = "Customer_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Customer_id"] : null);
            state['Customer_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Email: function(val, state) {
            context["field"] = "Email";
            context["metadata"] = (objectMetadata ? objectMetadata["Email"] : null);
            state['Email'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        FullName: function(val, state) {
            context["field"] = "FullName";
            context["metadata"] = (objectMetadata ? objectMetadata["FullName"] : null);
            state['FullName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Group_id: function(val, state) {
            context["field"] = "Group_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Group_id"] : null);
            state['Group_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Status_id: function(val, state) {
            context["field"] = "Status_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Status_id"] : null);
            state['Status_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        UpdatedBy: function(val, state) {
            context["field"] = "UpdatedBy";
            context["metadata"] = (objectMetadata ? objectMetadata["UpdatedBy"] : null);
            state['UpdatedBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        UpdatedOn: function(val, state) {
            context["field"] = "UpdatedOn";
            context["metadata"] = (objectMetadata ? objectMetadata["UpdatedOn"] : null);
            state['UpdatedOn'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Username: function(val, state) {
            context["field"] = "Username";
            context["metadata"] = (objectMetadata ? objectMetadata["Username"] : null);
            state['Username'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function GroupCustomers(defaultValues) {
        var privateState = {};
        context["field"] = "Customer_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Customer_id"] : null);
        privateState.Customer_id = defaultValues ?
            (defaultValues["Customer_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Customer_id"], context) :
                null) :
            null;

        context["field"] = "Email";
        context["metadata"] = (objectMetadata ? objectMetadata["Email"] : null);
        privateState.Email = defaultValues ?
            (defaultValues["Email"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Email"], context) :
                null) :
            null;

        context["field"] = "FullName";
        context["metadata"] = (objectMetadata ? objectMetadata["FullName"] : null);
        privateState.FullName = defaultValues ?
            (defaultValues["FullName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["FullName"], context) :
                null) :
            null;

        context["field"] = "Group_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Group_id"] : null);
        privateState.Group_id = defaultValues ?
            (defaultValues["Group_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Group_id"], context) :
                null) :
            null;

        context["field"] = "Status_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Status_id"] : null);
        privateState.Status_id = defaultValues ?
            (defaultValues["Status_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Status_id"], context) :
                null) :
            null;

        context["field"] = "UpdatedBy";
        context["metadata"] = (objectMetadata ? objectMetadata["UpdatedBy"] : null);
        privateState.UpdatedBy = defaultValues ?
            (defaultValues["UpdatedBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["UpdatedBy"], context) :
                null) :
            null;

        context["field"] = "UpdatedOn";
        context["metadata"] = (objectMetadata ? objectMetadata["UpdatedOn"] : null);
        privateState.UpdatedOn = defaultValues ?
            (defaultValues["UpdatedOn"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["UpdatedOn"], context) :
                null) :
            null;

        context["field"] = "Username";
        context["metadata"] = (objectMetadata ? objectMetadata["Username"] : null);
        privateState.Username = defaultValues ?
            (defaultValues["Username"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Username"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "Customer_id": {
                get: function() {
                    context["field"] = "Customer_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Customer_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Customer_id, context);
                },
                set: function(val) {
                    setterFunctions['Customer_id'].call(this, val, privateState);
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
            "FullName": {
                get: function() {
                    context["field"] = "FullName";
                    context["metadata"] = (objectMetadata ? objectMetadata["FullName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.FullName, context);
                },
                set: function(val) {
                    setterFunctions['FullName'].call(this, val, privateState);
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
            "UpdatedBy": {
                get: function() {
                    context["field"] = "UpdatedBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["UpdatedBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.UpdatedBy, context);
                },
                set: function(val) {
                    setterFunctions['UpdatedBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "UpdatedOn": {
                get: function() {
                    context["field"] = "UpdatedOn";
                    context["metadata"] = (objectMetadata ? objectMetadata["UpdatedOn"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.UpdatedOn, context);
                },
                set: function(val) {
                    setterFunctions['UpdatedOn'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.Customer_id = value ? (value["Customer_id"] ? value["Customer_id"] : null) : null;
            privateState.Email = value ? (value["Email"] ? value["Email"] : null) : null;
            privateState.FullName = value ? (value["FullName"] ? value["FullName"] : null) : null;
            privateState.Group_id = value ? (value["Group_id"] ? value["Group_id"] : null) : null;
            privateState.Status_id = value ? (value["Status_id"] ? value["Status_id"] : null) : null;
            privateState.UpdatedBy = value ? (value["UpdatedBy"] ? value["UpdatedBy"] : null) : null;
            privateState.UpdatedOn = value ? (value["UpdatedOn"] ? value["UpdatedOn"] : null) : null;
            privateState.Username = value ? (value["Username"] ? value["Username"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(GroupCustomers);

    //Create new class level validator object
    BaseModel.Validator.call(GroupCustomers);

    var registerValidatorBackup = GroupCustomers.registerValidator;

    GroupCustomers.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(GroupCustomers.isValid(this, propName, val)) {
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
    //For Operation 'getGroupCustomers' with service id 'getGroupCustomers2906'
     GroupCustomers.getGroupCustomers = function(params, onCompletion){
        return GroupCustomers.customVerb('getGroupCustomers', params, onCompletion);
     };

    //For Operation 'getGroupBusinessTypeCustomers' with service id 'getGroupBusinessTypeCustomers3519'
     GroupCustomers.getGroupBusinessTypeCustomers = function(params, onCompletion){
        return GroupCustomers.customVerb('getGroupBusinessTypeCustomers', params, onCompletion);
     };

    var relations = [];

    GroupCustomers.relations = relations;

    GroupCustomers.prototype.isValid = function() {
        return GroupCustomers.isValid(this);
    };

    GroupCustomers.prototype.objModelName = "GroupCustomers";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    GroupCustomers.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CustomerGroupsAndEntitlObjSvc", "GroupCustomers", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    GroupCustomers.clone = function(objectToClone) {
        var clonedObj = new GroupCustomers();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return GroupCustomers;
});