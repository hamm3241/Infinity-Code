/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "employeeFeatures", "objectService" : "InternalusersObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function employeeFeatures(defaultValues) {
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
    BaseModel.isParentOf(employeeFeatures);

    //Create new class level validator object
    BaseModel.Validator.call(employeeFeatures);

    var registerValidatorBackup = employeeFeatures.registerValidator;

    employeeFeatures.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(employeeFeatures.isValid(this, propName, val)) {
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
    //For Operation 'getInternalUserFeatureActions' with service id 'getInternalUserFeatureActions6786'
     employeeFeatures.getInternalUserFeatureActions = function(params, onCompletion){
        return employeeFeatures.customVerb('getInternalUserFeatureActions', params, onCompletion);
     };

    //For Operation 'updateInternalUserFeatureActions' with service id 'updateInternalUserFeatureActions7369'
     employeeFeatures.updateInternalUserFeatureActions = function(params, onCompletion){
        return employeeFeatures.customVerb('updateInternalUserFeatureActions', params, onCompletion);
     };

    //For Operation 'updateInternalUserActionStatus' with service id 'updateInternalUserActionStatus7618'
     employeeFeatures.updateInternalUserActionStatus = function(params, onCompletion){
        return employeeFeatures.customVerb('updateInternalUserActionStatus', params, onCompletion);
     };

    //For Operation 'getInternalUserFeatures' with service id 'getInternalUserFeatures7587'
     employeeFeatures.getInternalUserFeatures = function(params, onCompletion){
        return employeeFeatures.customVerb('getInternalUserFeatures', params, onCompletion);
     };

    //For Operation 'downloadEmployeeFeaturesList' with service id 'downloadEmployeeFeaturesList5349'
     employeeFeatures.downloadEmployeeFeaturesList = function(params, onCompletion){
        return employeeFeatures.customVerb('downloadEmployeeFeaturesList', params, onCompletion);
     };

    var relations = [];

    employeeFeatures.relations = relations;

    employeeFeatures.prototype.isValid = function() {
        return employeeFeatures.isValid(this);
    };

    employeeFeatures.prototype.objModelName = "employeeFeatures";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    employeeFeatures.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("InternalusersObjService", "employeeFeatures", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    employeeFeatures.clone = function(objectToClone) {
        var clonedObj = new employeeFeatures();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return employeeFeatures;
});