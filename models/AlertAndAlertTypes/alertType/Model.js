/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "alertType", "objectService" : "AlertAndAlertTypes"};

    var setterFunctions = {
    };

    //Create the Model Class
    function alertType(defaultValues) {
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
    BaseModel.isParentOf(alertType);

    //Create new class level validator object
    BaseModel.Validator.call(alertType);

    var registerValidatorBackup = alertType.registerValidator;

    alertType.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(alertType.isValid(this, propName, val)) {
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
    //For Operation 'getCustomerAlertTypePreference' with service id 'getCustomerAlertTypePreference6045'
     alertType.getCustomerAlertTypePreference = function(params, onCompletion){
        return alertType.customVerb('getCustomerAlertTypePreference', params, onCompletion);
     };

    //For Operation 'getAlertTypeDefinition' with service id 'getAlertTypeDefinition7175'
     alertType.getAlertTypeDefinition = function(params, onCompletion){
        return alertType.customVerb('getAlertTypeDefinition', params, onCompletion);
     };

    //For Operation 'getAccountTypes' with service id 'get_accounttype4542'
     alertType.getAccountTypes = function(params, onCompletion){
        return alertType.customVerb('getAccountTypes', params, onCompletion);
     };

    //For Operation 'getAlertCategoriesByAccountType' with service id 'getAlertCategoriesByAccountType6038'
     alertType.getAlertCategoriesByAccountType = function(params, onCompletion){
        return alertType.customVerb('getAlertCategoriesByAccountType', params, onCompletion);
     };

    //For Operation 'getCustomerAccountAlertSettings' with service id 'getCustomerAccountAlertSettings4192'
     alertType.getCustomerAccountAlertSettings = function(params, onCompletion){
        return alertType.customVerb('getCustomerAccountAlertSettings', params, onCompletion);
     };

    //For Operation 'createAlertType' with service id 'createAlertType6549'
     alertType.createAlertType = function(params, onCompletion){
        return alertType.customVerb('createAlertType', params, onCompletion);
     };

    //For Operation 'updateAlertType' with service id 'updateAlertType8630'
     alertType.updateAlertType = function(params, onCompletion){
        return alertType.customVerb('updateAlertType', params, onCompletion);
     };

    //For Operation 'reassignAlertType' with service id 'reassignAlertType8550'
     alertType.reassignAlertType = function(params, onCompletion){
        return alertType.customVerb('reassignAlertType', params, onCompletion);
     };

    //For Operation 'editAlertType' with service id 'editAlertType6322'
     alertType.editAlertType = function(params, onCompletion){
        return alertType.customVerb('editAlertType', params, onCompletion);
     };

    //For Operation 'reorderAlertType' with service id 'reorderAlertType2337'
     alertType.reorderAlertType = function(params, onCompletion){
        return alertType.customVerb('reorderAlertType', params, onCompletion);
     };

    var relations = [];

    alertType.relations = relations;

    alertType.prototype.isValid = function() {
        return alertType.isValid(this);
    };

    alertType.prototype.objModelName = "alertType";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    alertType.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("AlertAndAlertTypes", "alertType", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    alertType.clone = function(objectToClone) {
        var clonedObj = new alertType();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return alertType;
});