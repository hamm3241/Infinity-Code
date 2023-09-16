/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "getAndPushUsersCount", "objectService" : "LicensingUnitObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function getAndPushUsersCount(defaultValues) {
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
    BaseModel.isParentOf(getAndPushUsersCount);

    //Create new class level validator object
    BaseModel.Validator.call(getAndPushUsersCount);

    var registerValidatorBackup = getAndPushUsersCount.registerValidator;

    getAndPushUsersCount.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(getAndPushUsersCount.isValid(this, propName, val)) {
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
    //For Operation 'getAndPushUsersCountToMeteringStore' with service id 'getAndPushUsersCountToMeteringStore9826'
     getAndPushUsersCount.getAndPushUsersCountToMeteringStore = function(params, onCompletion){
        return getAndPushUsersCount.customVerb('getAndPushUsersCountToMeteringStore', params, onCompletion);
     };

    var relations = [];

    getAndPushUsersCount.relations = relations;

    getAndPushUsersCount.prototype.isValid = function() {
        return getAndPushUsersCount.isValid(this);
    };

    getAndPushUsersCount.prototype.objModelName = "getAndPushUsersCount";
    getAndPushUsersCount.prototype.objServiceName = "LicensingUnitObjService";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    getAndPushUsersCount.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("LicensingUnitObjService", "getAndPushUsersCount", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    getAndPushUsersCount.clone = function(objectToClone) {
        var clonedObj = new getAndPushUsersCount();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return getAndPushUsersCount;
});