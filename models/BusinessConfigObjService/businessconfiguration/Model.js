/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "businessconfiguration", "objectService" : "BusinessConfigObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function businessconfiguration(defaultValues) {
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
    BaseModel.isParentOf(businessconfiguration);

    //Create new class level validator object
    BaseModel.Validator.call(businessconfiguration);

    var registerValidatorBackup = businessconfiguration.registerValidator;

    businessconfiguration.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(businessconfiguration.isValid(this, propName, val)) {
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
    //For Operation 'getAlertConfigurations' with service id 'getAlertConfigurations2071'
     businessconfiguration.getAlertConfigurations = function(params, onCompletion){
        return businessconfiguration.customVerb('getAlertConfigurations', params, onCompletion);
     };

    //For Operation 'editBusinessConfiguration' with service id 'editBusinessConfiguration7976'
     businessconfiguration.editBusinessConfiguration = function(params, onCompletion){
        return businessconfiguration.customVerb('editBusinessConfiguration', params, onCompletion);
     };

    //For Operation 'getBusinessConfigurations' with service id 'getBusinessConfigurations1506'
     businessconfiguration.getBusinessConfigurations = function(params, onCompletion){
        return businessconfiguration.customVerb('getBusinessConfigurations', params, onCompletion);
     };

    //For Operation 'editAlertConfiguration' with service id 'editAlertConfiguration5397'
     businessconfiguration.editAlertConfiguration = function(params, onCompletion){
        return businessconfiguration.customVerb('editAlertConfiguration', params, onCompletion);
     };

    //For Operation 'getCoreTypeInformation' with service id 'getCoreTypeInformation9400'
     businessconfiguration.getCoreTypeInformation = function(params, onCompletion){
        return businessconfiguration.customVerb('getCoreTypeInformation', params, onCompletion);
     };

    var relations = [];

    businessconfiguration.relations = relations;

    businessconfiguration.prototype.isValid = function() {
        return businessconfiguration.isValid(this);
    };

    businessconfiguration.prototype.objModelName = "businessconfiguration";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    businessconfiguration.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("BusinessConfigObjService", "businessconfiguration", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    businessconfiguration.clone = function(objectToClone) {
        var clonedObj = new businessconfiguration();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return businessconfiguration;
});