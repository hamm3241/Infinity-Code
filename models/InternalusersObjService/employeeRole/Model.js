/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "employeeRole", "objectService" : "InternalusersObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function employeeRole(defaultValues) {
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
    BaseModel.isParentOf(employeeRole);

    //Create new class level validator object
    BaseModel.Validator.call(employeeRole);

    var registerValidatorBackup = employeeRole.registerValidator;

    employeeRole.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(employeeRole.isValid(this, propName, val)) {
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
    //For Operation 'getEmployeeRoles' with service id 'getEmployeeRoles4314'
     employeeRole.getEmployeeRoles = function(params, onCompletion){
        return employeeRole.customVerb('getEmployeeRoles', params, onCompletion);
     };

    //For Operation 'createEmployeeRole' with service id 'createEmployeeRole7525'
     employeeRole.createEmployeeRole = function(params, onCompletion){
        return employeeRole.customVerb('createEmployeeRole', params, onCompletion);
     };

    //For Operation 'getEmployeeRoleDetails' with service id 'getEmployeeRoleDetails9950'
     employeeRole.getEmployeeRoleDetails = function(params, onCompletion){
        return employeeRole.customVerb('getEmployeeRoleDetails', params, onCompletion);
     };

    //For Operation 'updateEmployeeRoleStatus' with service id 'updateEmployeeRoleStatus7257'
     employeeRole.updateEmployeeRoleStatus = function(params, onCompletion){
        return employeeRole.customVerb('updateEmployeeRoleStatus', params, onCompletion);
     };

    //For Operation 'updateEmployeeRoleDetails' with service id 'updateEmployeeRoleDetails7866'
     employeeRole.updateEmployeeRoleDetails = function(params, onCompletion){
        return employeeRole.customVerb('updateEmployeeRoleDetails', params, onCompletion);
     };

    var relations = [];

    employeeRole.relations = relations;

    employeeRole.prototype.isValid = function() {
        return employeeRole.isValid(this);
    };

    employeeRole.prototype.objModelName = "employeeRole";
    employeeRole.prototype.objServiceName = "InternalusersObjService";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    employeeRole.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("InternalusersObjService", "employeeRole", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    employeeRole.clone = function(objectToClone) {
        var clonedObj = new employeeRole();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return employeeRole;
});