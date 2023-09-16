/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "profile", "objectService" : "CampaignManagementObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function profile(defaultValues) {
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
    BaseModel.isParentOf(profile);

    //Create new class level validator object
    BaseModel.Validator.call(profile);

    var registerValidatorBackup = profile.registerValidator;

    profile.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(profile.isValid(this, propName, val)) {
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
    //For Operation 'getAndUpdateUsersForSegment' with service id 'getAndUpdateUsersForSegment6751'
     profile.getAndUpdateUsersForSegment = function(params, onCompletion){
        return profile.customVerb('getAndUpdateUsersForSegment', params, onCompletion);
     };

    //For Operation 'updateProfile' with service id 'updateProfile6183'
     profile.updateProfile = function(params, onCompletion){
        return profile.customVerb('updateProfile', params, onCompletion);
     };

    //For Operation 'createProfile' with service id 'createProfile8378'
     profile.createProfile = function(params, onCompletion){
        return profile.customVerb('createProfile', params, onCompletion);
     };

    //For Operation 'getProfiles' with service id 'getProfiles4415'
     profile.getProfiles = function(params, onCompletion){
        return profile.customVerb('getProfiles', params, onCompletion);
     };

    var relations = [];

    profile.relations = relations;

    profile.prototype.isValid = function() {
        return profile.isValid(this);
    };

    profile.prototype.objModelName = "profile";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    profile.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CampaignManagementObjService", "profile", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    profile.clone = function(objectToClone) {
        var clonedObj = new profile();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return profile;
});