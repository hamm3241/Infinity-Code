/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Reports", "objectService" : "CustomReports"};

    var setterFunctions = {
    };

    //Create the Model Class
    function Reports(defaultValues) {
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
    BaseModel.isParentOf(Reports);

    //Create new class level validator object
    BaseModel.Validator.call(Reports);

    var registerValidatorBackup = Reports.registerValidator;

    Reports.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Reports.isValid(this, propName, val)) {
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
    //For Operation 'createReport' with service id 'createReport9206'
     Reports.createReport = function(params, onCompletion){
        return Reports.customVerb('createReport', params, onCompletion);
     };

    //For Operation 'deleteReport' with service id 'deleteReport8897'
     Reports.deleteReport = function(params, onCompletion){
        return Reports.customVerb('deleteReport', params, onCompletion);
     };

    //For Operation 'downloadReport' with service id 'downloadReport5086'
     Reports.downloadReport = function(params, onCompletion){
        return Reports.customVerb('downloadReport', params, onCompletion);
     };

    //For Operation 'getReport' with service id 'viewReport3330'
     Reports.getReport = function(params, onCompletion){
        return Reports.customVerb('getReport', params, onCompletion);
     };

    //For Operation 'shareReport' with service id 'shareReport9424'
     Reports.shareReport = function(params, onCompletion){
        return Reports.customVerb('shareReport', params, onCompletion);
     };

    var relations = [];

    Reports.relations = relations;

    Reports.prototype.isValid = function() {
        return Reports.isValid(this);
    };

    Reports.prototype.objModelName = "Reports";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Reports.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CustomReports", "Reports", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Reports.clone = function(objectToClone) {
        var clonedObj = new Reports();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Reports;
});