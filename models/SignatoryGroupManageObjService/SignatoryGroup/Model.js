/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "SignatoryGroup", "objectService" : "SignatoryGroupManageObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function SignatoryGroup(defaultValues) {
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
    BaseModel.isParentOf(SignatoryGroup);

    //Create new class level validator object
    BaseModel.Validator.call(SignatoryGroup);

    var registerValidatorBackup = SignatoryGroup.registerValidator;

    SignatoryGroup.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(SignatoryGroup.isValid(this, propName, val)) {
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
    //For Operation 'getAllSignatoryGroupsbyCoreCustomerIds' with service id 'getAllSignatoryGroupsbyCoreCustomerIds8650'
     SignatoryGroup.getAllSignatoryGroupsbyCoreCustomerIds = function(params, onCompletion){
        return SignatoryGroup.customVerb('getAllSignatoryGroupsbyCoreCustomerIds', params, onCompletion);
     };

    //For Operation 'deleteSignatoryGroup' with service id 'deleteSignatoryGroup7918'
     SignatoryGroup.deleteSignatoryGroup = function(params, onCompletion){
        return SignatoryGroup.customVerb('deleteSignatoryGroup', params, onCompletion);
     };

    //For Operation 'getApprovalPermissionsForUser' with service id 'getApprovalPermissionsForUser6757'
     SignatoryGroup.getApprovalPermissionsForUser = function(params, onCompletion){
        return SignatoryGroup.customVerb('getApprovalPermissionsForUser', params, onCompletion);
     };

    //For Operation 'createSignatoryGroup' with service id 'createSignatoryGroup2393'
     SignatoryGroup.createSignatoryGroup = function(params, onCompletion){
        return SignatoryGroup.customVerb('createSignatoryGroup', params, onCompletion);
     };

    //For Operation 'getNoGroupUsers' with service id 'getNoGroupUsers8238'
     SignatoryGroup.getNoGroupUsers = function(params, onCompletion){
        return SignatoryGroup.customVerb('getNoGroupUsers', params, onCompletion);
     };

    //For Operation 'isSignatoryGroupEligibleForDelete' with service id 'isSignatoryGroupEligibleForDelete6985'
     SignatoryGroup.isSignatoryGroupEligibleForDelete = function(params, onCompletion){
        return SignatoryGroup.customVerb('isSignatoryGroupEligibleForDelete', params, onCompletion);
     };

    //For Operation 'getSignatoryGroupDetails' with service id 'getSignatoryGroupDetails1157'
     SignatoryGroup.getSignatoryGroupDetails = function(params, onCompletion){
        return SignatoryGroup.customVerb('getSignatoryGroupDetails', params, onCompletion);
     };

    //For Operation 'getAllSignatoryGroups' with service id 'getAllSignatoryGroups9481'
     SignatoryGroup.getAllSignatoryGroups = function(params, onCompletion){
        return SignatoryGroup.customVerb('getAllSignatoryGroups', params, onCompletion);
     };

    //For Operation 'updateSignatoryGroups' with service id 'updateSignatoryGroups6735'
     SignatoryGroup.updateSignatoryGroups = function(params, onCompletion){
        return SignatoryGroup.customVerb('updateSignatoryGroups', params, onCompletion);
     };

    var relations = [];

    SignatoryGroup.relations = relations;

    SignatoryGroup.prototype.isValid = function() {
        return SignatoryGroup.isValid(this);
    };

    SignatoryGroup.prototype.objModelName = "SignatoryGroup";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    SignatoryGroup.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("SignatoryGroupManageObjService", "SignatoryGroup", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    SignatoryGroup.clone = function(objectToClone) {
        var clonedObj = new SignatoryGroup();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return SignatoryGroup;
});