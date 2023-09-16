/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "feature", "objectService" : "FeatureObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function feature(defaultValues) {
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
    BaseModel.isParentOf(feature);

    //Create new class level validator object
    BaseModel.Validator.call(feature);

    var registerValidatorBackup = feature.registerValidator;

    feature.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(feature.isValid(this, propName, val)) {
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
    //For Operation 'getAccountLevelFeatureAction' with service id 'getAccountLevelFeatureAction9770'
     feature.getAccountLevelFeatureAction = function(params, onCompletion){
        return feature.customVerb('getAccountLevelFeatureAction', params, onCompletion);
     };

    //For Operation 'editFeatureAndActionLimits' with service id 'editFeatureAndActions6464'
     feature.editFeatureAndActionLimits = function(params, onCompletion){
        return feature.customVerb('editFeatureAndActionLimits', params, onCompletion);
     };

    //For Operation 'getAccessPolicies' with service id 'getAccessPolicies4064'
     feature.getAccessPolicies = function(params, onCompletion){
        return feature.customVerb('getAccessPolicies', params, onCompletion);
     };

    //For Operation 'editLimitGroup' with service id 'editLimitGroup9579'
     feature.editLimitGroup = function(params, onCompletion){
        return feature.customVerb('editLimitGroup', params, onCompletion);
     };

    //For Operation 'getAllFeaturesAndActions' with service id 'getFeatureActionsByType2070'
     feature.getAllFeaturesAndActions = function(params, onCompletion){
        return feature.customVerb('getAllFeaturesAndActions', params, onCompletion);
     };

    //For Operation 'getActionLevels' with service id 'getActionLevels1907'
     feature.getActionLevels = function(params, onCompletion){
        return feature.customVerb('getActionLevels', params, onCompletion);
     };

    //For Operation 'manageActionStatus' with service id 'manageActionStatus7035'
     feature.manageActionStatus = function(params, onCompletion){
        return feature.customVerb('manageActionStatus', params, onCompletion);
     };

    //For Operation 'getFeatureActions' with service id 'getFeatureActions4860'
     feature.getFeatureActions = function(params, onCompletion){
        return feature.customVerb('getFeatureActions', params, onCompletion);
     };

    //For Operation 'downloadFeaturesList' with service id 'downloadFeaturesList2993'
     feature.downloadFeaturesList = function(params, onCompletion){
        return feature.customVerb('downloadFeaturesList', params, onCompletion);
     };

    //For Operation 'getServiceFee' with service id 'getServiceFee1684'
     feature.getServiceFee = function(params, onCompletion){
        return feature.customVerb('getServiceFee', params, onCompletion);
     };

    //For Operation 'getAllFeatures' with service id 'getAllFeatures8005'
     feature.getAllFeatures = function(params, onCompletion){
        return feature.customVerb('getAllFeatures', params, onCompletion);
     };

    //For Operation 'getLimitGroups' with service id 'getAllLimitGroups4443'
     feature.getLimitGroups = function(params, onCompletion){
        return feature.customVerb('getLimitGroups', params, onCompletion);
     };

    //For Operation 'getAllMonetaryActions' with service id 'getAllMonetaryActions3686'
     feature.getAllMonetaryActions = function(params, onCompletion){
        return feature.customVerb('getAllMonetaryActions', params, onCompletion);
     };

    var relations = [];

    feature.relations = relations;

    feature.prototype.isValid = function() {
        return feature.isValid(this);
    };

    feature.prototype.objModelName = "feature";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    feature.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("FeatureObjService", "feature", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    feature.clone = function(objectToClone) {
        var clonedObj = new feature();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return feature;
});