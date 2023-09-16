/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "ApprovalMode", "objectService" : "SignatoryGroupManageObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function ApprovalMode(defaultValues) {
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
    BaseModel.isParentOf(ApprovalMode);

    //Create new class level validator object
    BaseModel.Validator.call(ApprovalMode);

    var registerValidatorBackup = ApprovalMode.registerValidator;

    ApprovalMode.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(ApprovalMode.isValid(this, propName, val)) {
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
    //For Operation 'updateApprovalMode' with service id 'updateApprovalMode5722'
     ApprovalMode.updateApprovalMode = function(params, onCompletion){
        return ApprovalMode.customVerb('updateApprovalMode', params, onCompletion);
     };

    //For Operation 'fetchApprovalMode' with service id 'fetchApprovalMode5365'
     ApprovalMode.fetchApprovalMode = function(params, onCompletion){
        return ApprovalMode.customVerb('fetchApprovalMode', params, onCompletion);
     };

    //For Operation 'deleteApprovalMode' with service id 'deleteApprovalMode9157'
     ApprovalMode.deleteApprovalMode = function(params, onCompletion){
        return ApprovalMode.customVerb('deleteApprovalMode', params, onCompletion);
     };

    var relations = [];

    ApprovalMode.relations = relations;

    ApprovalMode.prototype.isValid = function() {
        return ApprovalMode.isValid(this);
    };

    ApprovalMode.prototype.objModelName = "ApprovalMode";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    ApprovalMode.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("SignatoryGroupManageObjService", "ApprovalMode", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    ApprovalMode.clone = function(objectToClone) {
        var clonedObj = new ApprovalMode();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return ApprovalMode;
});