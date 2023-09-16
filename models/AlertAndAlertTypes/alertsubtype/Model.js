/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "alertsubtype", "objectService" : "AlertAndAlertTypes"};

    var setterFunctions = {
    };

    //Create the Model Class
    function alertsubtype(defaultValues) {
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
    BaseModel.isParentOf(alertsubtype);

    //Create new class level validator object
    BaseModel.Validator.call(alertsubtype);

    var registerValidatorBackup = alertsubtype.registerValidator;

    alertsubtype.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(alertsubtype.isValid(this, propName, val)) {
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
    //For Operation 'createAlertSubType' with service id 'createAlertSubType4443'
     alertsubtype.createAlertSubType = function(params, onCompletion){
        return alertsubtype.customVerb('createAlertSubType', params, onCompletion);
     };

    //For Operation 'getAlertSubTypeDefinition' with service id 'getAlertSubTypeDefinition4575'
     alertsubtype.getAlertSubTypeDefinition = function(params, onCompletion){
        return alertsubtype.customVerb('getAlertSubTypeDefinition', params, onCompletion);
     };

    //For Operation 'updateAlertSubTypeStatus' with service id 'updateAlertSubTypeStatus4000'
     alertsubtype.updateAlertSubTypeStatus = function(params, onCompletion){
        return alertsubtype.customVerb('updateAlertSubTypeStatus', params, onCompletion);
     };

    //For Operation 'editAlertSubType' with service id 'editAlertSubType7903'
     alertsubtype.editAlertSubType = function(params, onCompletion){
        return alertsubtype.customVerb('editAlertSubType', params, onCompletion);
     };

    var relations = [];

    alertsubtype.relations = relations;

    alertsubtype.prototype.isValid = function() {
        return alertsubtype.isValid(this);
    };

    alertsubtype.prototype.objModelName = "alertsubtype";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    alertsubtype.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("AlertAndAlertTypes", "alertsubtype", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    alertsubtype.clone = function(objectToClone) {
        var clonedObj = new alertsubtype();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return alertsubtype;
});