/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "servicedefinition", "objectService" : "BusinessBankingObjService"};

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
        serviceType: function(val, state) {
            context["field"] = "serviceType";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceType"] : null);
            state['serviceType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        featureactions: function(val, state) {
            context["field"] = "featureactions";
            context["metadata"] = (objectMetadata ? objectMetadata["featureactions"] : null);
            state['featureactions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceDefinitionId: function(val, state) {
            context["field"] = "serviceDefinitionId";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceDefinitionId"] : null);
            state['serviceDefinitionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        defaultGroup: function(val, state) {
            context["field"] = "defaultGroup";
            context["metadata"] = (objectMetadata ? objectMetadata["defaultGroup"] : null);
            state['defaultGroup'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        groupId: function(val, state) {
            context["field"] = "groupId";
            context["metadata"] = (objectMetadata ? objectMetadata["groupId"] : null);
            state['groupId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        defaultRole: function(val, state) {
            context["field"] = "defaultRole";
            context["metadata"] = (objectMetadata ? objectMetadata["defaultRole"] : null);
            state['defaultRole'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function servicedefinition(defaultValues) {
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

        context["field"] = "serviceType";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceType"] : null);
        privateState.serviceType = defaultValues ?
            (defaultValues["serviceType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceType"], context) :
                null) :
            null;

        context["field"] = "featureactions";
        context["metadata"] = (objectMetadata ? objectMetadata["featureactions"] : null);
        privateState.featureactions = defaultValues ?
            (defaultValues["featureactions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["featureactions"], context) :
                null) :
            null;

        context["field"] = "serviceDefinitionId";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceDefinitionId"] : null);
        privateState.serviceDefinitionId = defaultValues ?
            (defaultValues["serviceDefinitionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceDefinitionId"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "defaultGroup";
        context["metadata"] = (objectMetadata ? objectMetadata["defaultGroup"] : null);
        privateState.defaultGroup = defaultValues ?
            (defaultValues["defaultGroup"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["defaultGroup"], context) :
                null) :
            null;

        context["field"] = "groupId";
        context["metadata"] = (objectMetadata ? objectMetadata["groupId"] : null);
        privateState.groupId = defaultValues ?
            (defaultValues["groupId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["groupId"], context) :
                null) :
            null;

        context["field"] = "defaultRole";
        context["metadata"] = (objectMetadata ? objectMetadata["defaultRole"] : null);
        privateState.defaultRole = defaultValues ?
            (defaultValues["defaultRole"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["defaultRole"], context) :
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
            "serviceType": {
                get: function() {
                    context["field"] = "serviceType";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceType, context);
                },
                set: function(val) {
                    setterFunctions['serviceType'].call(this, val, privateState);
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
            "serviceDefinitionId": {
                get: function() {
                    context["field"] = "serviceDefinitionId";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceDefinitionId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceDefinitionId, context);
                },
                set: function(val) {
                    setterFunctions['serviceDefinitionId'].call(this, val, privateState);
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
            "defaultGroup": {
                get: function() {
                    context["field"] = "defaultGroup";
                    context["metadata"] = (objectMetadata ? objectMetadata["defaultGroup"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.defaultGroup, context);
                },
                set: function(val) {
                    setterFunctions['defaultGroup'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "groupId": {
                get: function() {
                    context["field"] = "groupId";
                    context["metadata"] = (objectMetadata ? objectMetadata["groupId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.groupId, context);
                },
                set: function(val) {
                    setterFunctions['groupId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "defaultRole": {
                get: function() {
                    context["field"] = "defaultRole";
                    context["metadata"] = (objectMetadata ? objectMetadata["defaultRole"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.defaultRole, context);
                },
                set: function(val) {
                    setterFunctions['defaultRole'].call(this, val, privateState);
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
            privateState.serviceType = value ? (value["serviceType"] ? value["serviceType"] : null) : null;
            privateState.featureactions = value ? (value["featureactions"] ? value["featureactions"] : null) : null;
            privateState.serviceDefinitionId = value ? (value["serviceDefinitionId"] ? value["serviceDefinitionId"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.defaultGroup = value ? (value["defaultGroup"] ? value["defaultGroup"] : null) : null;
            privateState.groupId = value ? (value["groupId"] ? value["groupId"] : null) : null;
            privateState.defaultRole = value ? (value["defaultRole"] ? value["defaultRole"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(servicedefinition);

    //Create new class level validator object
    BaseModel.Validator.call(servicedefinition);

    var registerValidatorBackup = servicedefinition.registerValidator;

    servicedefinition.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(servicedefinition.isValid(this, propName, val)) {
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
    //For Operation 'getServiceDefinitionMonetaryActions' with service id 'getServiceDefinitionMonetaryActions5203'
     servicedefinition.getServiceDefinitionMonetaryActions = function(params, onCompletion){
        return servicedefinition.customVerb('getServiceDefinitionMonetaryActions', params, onCompletion);
     };

    //For Operation 'deleteServiceDefinition' with service id 'deleteServiceDefinition8080'
     servicedefinition.deleteServiceDefinition = function(params, onCompletion){
        return servicedefinition.customVerb('deleteServiceDefinition', params, onCompletion);
     };


    //For Operation 'getServiceDefinitionProductIdPermissions' with service id 'getServiceDefinitionProductIdPermissions1835'
     servicedefinition.getServiceDefinitionProductIdPermissions = function(params, onCompletion){
        return servicedefinition.customVerb('getServiceDefinitionProductIdPermissions', params, onCompletion);
     };
    //For Operation 'getServiceDefinitionsForContracts' with service id 'getServiceDefinitionsForContracts1013'
     servicedefinition.getServiceDefinitionsForContracts = function(params, onCompletion){
        return servicedefinition.customVerb('getServiceDefinitionsForContracts', params, onCompletion);
     };

    //For Operation 'createServiceDefinition' with service id 'createServiceDefinition7525'
     servicedefinition.createServiceDefinition = function(params, onCompletion){
        return servicedefinition.customVerb('createServiceDefinition', params, onCompletion);
     };

    //For Operation 'getServicedefinitionAndRoleFeatures' with service id 'getServicedefinitionAndRoleFeatures9730'
     servicedefinition.getServicedefinitionAndRoleFeatures = function(params, onCompletion){
        return servicedefinition.customVerb('getServicedefinitionAndRoleFeatures', params, onCompletion);
     };

    //For Operation 'getServiceDefinition' with service id 'getServiceDefinition8278'
     servicedefinition.getServiceDefinition = function(params, onCompletion){
        return servicedefinition.customVerb('getServiceDefinition', params, onCompletion);
     };

    //For Operation 'getServiceDefinitionFeaturesAndLimits' with service id 'getServiceDefinitionFeaturesAndLimits2839'
     servicedefinition.getServiceDefinitionFeaturesAndLimits = function(params, onCompletion){
        return servicedefinition.customVerb('getServiceDefinitionFeaturesAndLimits', params, onCompletion);
     };

    //For Operation 'getServiceDefinitionActionLimit' with service id 'getServiceDefinitionActionLimit6965'
     servicedefinition.getServiceDefinitionActionLimit = function(params, onCompletion){
        return servicedefinition.customVerb('getServiceDefinitionActionLimit', params, onCompletion);
     };

    //For Operation 'updateDefaultRole' with service id 'updateDefaultRole6448'
     servicedefinition.updateDefaultRole = function(params, onCompletion){
        return servicedefinition.customVerb('updateDefaultRole', params, onCompletion);
     };

    //For Operation 'editServiceDefinition' with service id 'editServiceDefinition1700'
     servicedefinition.editServiceDefinition = function(params, onCompletion){
        return servicedefinition.customVerb('editServiceDefinition', params, onCompletion);
     };

    //For Operation 'getServiceDefinitionRoles' with service id 'getServiceDefinitionRoles7115'
     servicedefinition.getServiceDefinitionRoles = function(params, onCompletion){
        return servicedefinition.customVerb('getServiceDefinitionRoles', params, onCompletion);
     };

    //For Operation 'manageServiceDefinitionStatus' with service id 'deactivateServiceDefinition7817'
     servicedefinition.manageServiceDefinitionStatus = function(params, onCompletion){
        return servicedefinition.customVerb('manageServiceDefinitionStatus', params, onCompletion);
     };

    var relations = [];

    servicedefinition.relations = relations;

    servicedefinition.prototype.isValid = function() {
        return servicedefinition.isValid(this);
    };

    servicedefinition.prototype.objModelName = "servicedefinition";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    servicedefinition.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("BusinessBankingObjService", "servicedefinition", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    servicedefinition.clone = function(objectToClone) {
        var clonedObj = new servicedefinition();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return servicedefinition;
});
