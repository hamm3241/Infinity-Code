/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "alertcategory", "objectService" : "AlertAndAlertTypes"};

    var setterFunctions = {
    };

    //Create the Model Class
    function alertcategory(defaultValues) {
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
    BaseModel.isParentOf(alertcategory);

    //Create new class level validator object
    BaseModel.Validator.call(alertcategory);

    var registerValidatorBackup = alertcategory.registerValidator;

    alertcategory.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(alertcategory.isValid(this, propName, val)) {
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
    //For Operation 'editAlertCategory' with service id 'editAlertCategory7741'
     alertcategory.editAlertCategory = function(params, onCompletion){
        return alertcategory.customVerb('editAlertCategory', params, onCompletion);
     };

    //For Operation 'getAlertCategoryDefinition' with service id 'getAlertCategoryDefinition6545'
     alertcategory.getAlertCategoryDefinition = function(params, onCompletion){
        return alertcategory.customVerb('getAlertCategoryDefinition', params, onCompletion);
     };

    //For Operation 'getCustomerAlertCategoryPreference' with service id 'getCustomerAlertCategoryPreference6925'
     alertcategory.getCustomerAlertCategoryPreference = function(params, onCompletion){
        return alertcategory.customVerb('getCustomerAlertCategoryPreference', params, onCompletion);
     };

    //For Operation 'getCustomerAlertCategoryChannelPreference' with service id 'getCustomerAlertCategoryChannelPreference2145'
     alertcategory.getCustomerAlertCategoryChannelPreference = function(params, onCompletion){
        return alertcategory.customVerb('getCustomerAlertCategoryChannelPreference', params, onCompletion);
     };

    //For Operation 'getCustomerAlertCategories' with service id 'getAlertCategories9032'
     alertcategory.getCustomerAlertCategories = function(params, onCompletion){
        return alertcategory.customVerb('getCustomerAlertCategories', params, onCompletion);
     };

    //For Operation 'reorderAlertCategory' with service id 'reorderAlertCategory5100'
     alertcategory.reorderAlertCategory = function(params, onCompletion){
        return alertcategory.customVerb('reorderAlertCategory', params, onCompletion);
     };

    //For Operation 'createAlertCategory' with service id 'createAlertCategory7106'
     alertcategory.createAlertCategory = function(params, onCompletion){
        return alertcategory.customVerb('createAlertCategory', params, onCompletion);
     };

    //For Operation 'getAlertCategories' with service id 'getAlertCategories_Prev7586'
     alertcategory.getAlertCategories = function(params, onCompletion){
        return alertcategory.customVerb('getAlertCategories', params, onCompletion);
     };

    var relations = [];

    alertcategory.relations = relations;

    alertcategory.prototype.isValid = function() {
        return alertcategory.isValid(this);
    };

    alertcategory.prototype.objModelName = "alertcategory";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    alertcategory.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("AlertAndAlertTypes", "alertcategory", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    alertcategory.clone = function(objectToClone) {
        var clonedObj = new alertcategory();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return alertcategory;
});