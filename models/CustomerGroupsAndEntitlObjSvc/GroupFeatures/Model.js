/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "GroupFeatures", "objectService" : "CustomerGroupsAndEntitlObjSvc"};

    var setterFunctions = {
    };

    //Create the Model Class
    function GroupFeatures(defaultValues) {
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
    BaseModel.isParentOf(GroupFeatures);

    //Create new class level validator object
    BaseModel.Validator.call(GroupFeatures);

    var registerValidatorBackup = GroupFeatures.registerValidator;

    GroupFeatures.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(GroupFeatures.isValid(this, propName, val)) {
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
    //For Operation 'getGroupFeaturesAndActionsForEdit' with service id 'getGroupFeaturesAndActionsForEdit8219'
     GroupFeatures.getGroupFeaturesAndActionsForEdit = function(params, onCompletion){
        return GroupFeatures.customVerb('getGroupFeaturesAndActionsForEdit', params, onCompletion);
     };

    //For Operation 'getGroupFeaturesAndActions' with service id 'getGroupFeaturesAndActions4865'
     GroupFeatures.getGroupFeaturesAndActions = function(params, onCompletion){
        return GroupFeatures.customVerb('getGroupFeaturesAndActions', params, onCompletion);
     };

    //For Operation 'getGroupFeatureActionsByType' with service id 'getGroupFeatureActionsByType7857'
     GroupFeatures.getGroupFeatureActionsByType = function(params, onCompletion){
        return GroupFeatures.customVerb('getGroupFeatureActionsByType', params, onCompletion);
     };

    var relations = [];

    GroupFeatures.relations = relations;

    GroupFeatures.prototype.isValid = function() {
        return GroupFeatures.isValid(this);
    };

    GroupFeatures.prototype.objModelName = "GroupFeatures";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    GroupFeatures.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CustomerGroupsAndEntitlObjSvc", "GroupFeatures", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    GroupFeatures.clone = function(objectToClone) {
        var clonedObj = new GroupFeatures();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return GroupFeatures;
});