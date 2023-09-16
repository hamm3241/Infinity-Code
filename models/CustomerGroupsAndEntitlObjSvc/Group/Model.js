/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Group", "objectService" : "CustomerGroupsAndEntitlObjSvc"};

    var setterFunctions = {
        name: function(val, state) {
            context["field"] = "name";
            context["metadata"] = (objectMetadata ? objectMetadata["name"] : null);
            state['name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        description: function(val, state) {
            context["field"] = "description";
            context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
            state['description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        typeId: function(val, state) {
            context["field"] = "typeId";
            context["metadata"] = (objectMetadata ? objectMetadata["typeId"] : null);
            state['typeId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isEAgreementActive: function(val, state) {
            context["field"] = "isEAgreementActive";
            context["metadata"] = (objectMetadata ? objectMetadata["isEAgreementActive"] : null);
            state['isEAgreementActive'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        featureactions: function(val, state) {
            context["field"] = "featureactions";
            context["metadata"] = (objectMetadata ? objectMetadata["featureactions"] : null);
            state['featureactions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        servicedefinitions: function(val, state) {
            context["field"] = "servicedefinitions";
            context["metadata"] = (objectMetadata ? objectMetadata["servicedefinitions"] : null);
            state['servicedefinitions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isApplicabletoAllServices: function(val, state) {
            context["field"] = "isApplicabletoAllServices";
            context["metadata"] = (objectMetadata ? objectMetadata["isApplicabletoAllServices"] : null);
            state['isApplicabletoAllServices'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Group(defaultValues) {
        var privateState = {};
        context["field"] = "name";
        context["metadata"] = (objectMetadata ? objectMetadata["name"] : null);
        privateState.name = defaultValues ?
            (defaultValues["name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["name"], context) :
                null) :
            null;

        context["field"] = "description";
        context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
        privateState.description = defaultValues ?
            (defaultValues["description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["description"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "typeId";
        context["metadata"] = (objectMetadata ? objectMetadata["typeId"] : null);
        privateState.typeId = defaultValues ?
            (defaultValues["typeId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["typeId"], context) :
                null) :
            null;

        context["field"] = "isEAgreementActive";
        context["metadata"] = (objectMetadata ? objectMetadata["isEAgreementActive"] : null);
        privateState.isEAgreementActive = defaultValues ?
            (defaultValues["isEAgreementActive"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isEAgreementActive"], context) :
                null) :
            null;

        context["field"] = "featureactions";
        context["metadata"] = (objectMetadata ? objectMetadata["featureactions"] : null);
        privateState.featureactions = defaultValues ?
            (defaultValues["featureactions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featureactions"], context) :
                null) :
            null;

        context["field"] = "servicedefinitions";
        context["metadata"] = (objectMetadata ? objectMetadata["servicedefinitions"] : null);
        privateState.servicedefinitions = defaultValues ?
            (defaultValues["servicedefinitions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["servicedefinitions"], context) :
                null) :
            null;

        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "isApplicabletoAllServices";
        context["metadata"] = (objectMetadata ? objectMetadata["isApplicabletoAllServices"] : null);
        privateState.isApplicabletoAllServices = defaultValues ?
            (defaultValues["isApplicabletoAllServices"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isApplicabletoAllServices"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "description": {
                get: function() {
                    context["field"] = "description";
                    context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.description, context);
                },
                set: function(val) {
                    setterFunctions['description'].call(this, val, privateState);
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
            "typeId": {
                get: function() {
                    context["field"] = "typeId";
                    context["metadata"] = (objectMetadata ? objectMetadata["typeId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.typeId, context);
                },
                set: function(val) {
                    setterFunctions['typeId'].call(this, val, privateState);
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
            "featureactions": {
                get: function() {
                    context["field"] = "featureactions";
                    context["metadata"] = (objectMetadata ? objectMetadata["featureactions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.featureactions, context);
                },
                set: function(val) {
                    setterFunctions['featureactions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "servicedefinitions": {
                get: function() {
                    context["field"] = "servicedefinitions";
                    context["metadata"] = (objectMetadata ? objectMetadata["servicedefinitions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.servicedefinitions, context);
                },
                set: function(val) {
                    setterFunctions['servicedefinitions'].call(this, val, privateState);
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
            "isApplicabletoAllServices": {
                get: function() {
                    context["field"] = "isApplicabletoAllServices";
                    context["metadata"] = (objectMetadata ? objectMetadata["isApplicabletoAllServices"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isApplicabletoAllServices, context);
                },
                set: function(val) {
                    setterFunctions['isApplicabletoAllServices'].call(this, val, privateState);
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
            privateState.name = value ? (value["name"] ? value["name"] : null) : null;
            privateState.description = value ? (value["description"] ? value["description"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.typeId = value ? (value["typeId"] ? value["typeId"] : null) : null;
            privateState.isEAgreementActive = value ? (value["isEAgreementActive"] ? value["isEAgreementActive"] : null) : null;
            privateState.featureactions = value ? (value["featureactions"] ? value["featureactions"] : null) : null;
            privateState.servicedefinitions = value ? (value["servicedefinitions"] ? value["servicedefinitions"] : null) : null;
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.isApplicabletoAllServices = value ? (value["isApplicabletoAllServices"] ? value["isApplicabletoAllServices"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Group);

    //Create new class level validator object
    BaseModel.Validator.call(Group);

    var registerValidatorBackup = Group.registerValidator;

    Group.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Group.isValid(this, propName, val)) {
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
    //For Operation 'downloadGroupsList' with service id 'downloadGroupsList5501'
     Group.downloadGroupsList = function(params, onCompletion){
        return Group.customVerb('downloadGroupsList', params, onCompletion);
     };

    //For Operation 'createGroup' with service id 'createGroup9799'
     Group.createGroup = function(params, onCompletion){
        return Group.customVerb('createGroup', params, onCompletion);
     };

    //For Operation 'CustomerAssignRole' with service id 'CustomerAssignRoleService3822'
     Group.CustomerAssignRole = function(params, onCompletion){
        return Group.customVerb('CustomerAssignRole', params, onCompletion);
     };

    //For Operation 'editGroup' with service id 'editGroup2800'
     Group.editGroup = function(params, onCompletion){
        return Group.customVerb('editGroup', params, onCompletion);
     };

    //For Operation 'FetchEntityStatus' with service id 'EntityStatusGetService1502'
     Group.FetchEntityStatus = function(params, onCompletion){
        return Group.customVerb('FetchEntityStatus', params, onCompletion);
     };

    //For Operation 'manageStatus' with service id 'manageStatus2919'
     Group.manageStatus = function(params, onCompletion){
        return Group.customVerb('manageStatus', params, onCompletion);
     };

    var relations = [];

    Group.relations = relations;

    Group.prototype.isValid = function() {
        return Group.isValid(this);
    };

    Group.prototype.objModelName = "Group";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Group.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CustomerGroupsAndEntitlObjSvc", "Group", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Group.clone = function(objectToClone) {
        var clonedObj = new Group();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Group;
});