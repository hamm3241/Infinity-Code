/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "report", "objectService" : "ReportsObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function report(defaultValues) {
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
    BaseModel.isParentOf(report);

    //Create new class level validator object
    BaseModel.Validator.call(report);

    var registerValidatorBackup = report.registerValidator;

    report.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(report.isValid(this, propName, val)) {
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
    //For Operation 'displayAllColumns' with service id 'displayAllColumns1818'
     report.displayAllColumns = function(params, onCompletion){
        return report.customVerb('displayAllColumns', params, onCompletion);
     };

    //For Operation 'fetchRecords' with service id 'fetchRecords9182'
     report.fetchRecords = function(params, onCompletion){
        return report.customVerb('fetchRecords', params, onCompletion);
     };

    //For Operation 'showReports' with service id 'showReports6799'
     report.showReports = function(params, onCompletion){
        return report.customVerb('showReports', params, onCompletion);
     };

    //For Operation 'saveReports' with service id 'saveReports4357'
     report.saveReports = function(params, onCompletion){
        return report.customVerb('saveReports', params, onCompletion);
     };

    var relations = [];

    report.relations = relations;

    report.prototype.isValid = function() {
        return report.isValid(this);
    };

    report.prototype.objModelName = "report";
    report.prototype.objServiceName = "ReportsObjService";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    report.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ReportsObjService", "report", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    report.clone = function(objectToClone) {
        var clonedObj = new report();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return report;
});