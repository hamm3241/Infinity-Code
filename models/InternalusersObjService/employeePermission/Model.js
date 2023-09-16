/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "employeePermission", "objectService" : "InternalusersObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function employeePermission(defaultValues) {
        var privateState = {};

        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(employeePermission);

    //Create new class level validator object
    BaseModel.Validator.call(employeePermission);

    var registerValidatorBackup = employeePermission.registerValidator;

    employeePermission.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(employeePermission.isValid(this, propName, val)) {
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
    //For Operation 'getEmployeePermissionDetails' with service id 'getEmployeePermissionDetails6629'
     employeePermission.getEmployeePermissionDetails = function(params, onCompletion){
        return employeePermission.customVerb('getEmployeePermissionDetails', params, onCompletion);
     };

    //For Operation 'fetchLegalEntityList' with service id 'fetchLegalEntityList3278'
     employeePermission.fetchLegalEntityList = function(params, onCompletion){
        return employeePermission.customVerb('fetchLegalEntityList', params, onCompletion);
     };

    //For Operation 'updateEmployeePermissionStatus' with service id 'updateEmployeePermissionStatus5077'
     employeePermission.updateEmployeePermissionStatus = function(params, onCompletion){
        return employeePermission.customVerb('updateEmployeePermissionStatus', params, onCompletion);
     };

    //For Operation 'createEmployeePermission' with service id 'createEmployeePermission5816'
     employeePermission.createEmployeePermission = function(params, onCompletion){
        return employeePermission.customVerb('createEmployeePermission', params, onCompletion);
     };

    //For Operation 'getPermissionsByLegalEntities' with service id 'getPermissionsByLegalEntities2378'
     employeePermission.getPermissionsByLegalEntities = function(params, onCompletion){
        return employeePermission.customVerb('getPermissionsByLegalEntities', params, onCompletion);
     };

    //For Operation 'getEmployeePermissions' with service id 'getEmployeePermissions4918'
     employeePermission.getEmployeePermissions = function(params, onCompletion){
        return employeePermission.customVerb('getEmployeePermissions', params, onCompletion);
     };

    //For Operation 'updateEmployeePermissionDetails' with service id 'updateEmployeePermissionDetails1993'
     employeePermission.updateEmployeePermissionDetails = function(params, onCompletion){
        return employeePermission.customVerb('updateEmployeePermissionDetails', params, onCompletion);
     };

    var relations = [];

    employeePermission.relations = relations;

    employeePermission.prototype.isValid = function() {
        return employeePermission.isValid(this);
    };

    employeePermission.prototype.objModelName = "employeePermission";
    employeePermission.prototype.objServiceName = "InternalusersObjService";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    employeePermission.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("InternalusersObjService", "employeePermission", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    employeePermission.clone = function(objectToClone) {
        var clonedObj = new employeePermission();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return employeePermission;
});