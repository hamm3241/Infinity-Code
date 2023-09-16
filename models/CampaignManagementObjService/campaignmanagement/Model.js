/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "campaignmanagement", "objectService" : "CampaignManagementObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function campaignmanagement(defaultValues) {
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
    BaseModel.isParentOf(campaignmanagement);

    //Create new class level validator object
    BaseModel.Validator.call(campaignmanagement);

    var registerValidatorBackup = campaignmanagement.registerValidator;

    campaignmanagement.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(campaignmanagement.isValid(this, propName, val)) {
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
    //For Operation 'getEvents' with service id 'getEvents6553'
     campaignmanagement.getEvents = function(params, onCompletion){
        return campaignmanagement.customVerb('getEvents', params, onCompletion);
     };

    //For Operation 'updateDefaultCampaigns' with service id 'updateDefaultCampaigns4311'
     campaignmanagement.updateDefaultCampaigns = function(params, onCompletion){
        return campaignmanagement.customVerb('updateDefaultCampaigns', params, onCompletion);
     };

    //For Operation 'getCampaigns' with service id 'getCampaigns2521'
     campaignmanagement.getCampaigns = function(params, onCompletion){
        return campaignmanagement.customVerb('getCampaigns', params, onCompletion);
     };

    //For Operation 'getAllDefaultCampaigns' with service id 'getAllDefaultCampaigns2781'
     campaignmanagement.getAllDefaultCampaigns = function(params, onCompletion){
        return campaignmanagement.customVerb('getAllDefaultCampaigns', params, onCompletion);
     };

    //For Operation 'createCampaign' with service id 'createCampaign7341'
     campaignmanagement.createCampaign = function(params, onCompletion){
        return campaignmanagement.customVerb('createCampaign', params, onCompletion);
     };

    //For Operation 'getPlaceholders' with service id 'getPlaceholders4051'
     campaignmanagement.getPlaceholders = function(params, onCompletion){
        return campaignmanagement.customVerb('getPlaceholders', params, onCompletion);
     };

    //For Operation 'updateCampaign' with service id 'updateCampaign6451'
     campaignmanagement.updateCampaign = function(params, onCompletion){
        return campaignmanagement.customVerb('updateCampaign', params, onCompletion);
     };

    var relations = [];

    campaignmanagement.relations = relations;

    campaignmanagement.prototype.isValid = function() {
        return campaignmanagement.isValid(this);
    };

    campaignmanagement.prototype.objModelName = "campaignmanagement";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    campaignmanagement.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CampaignManagementObjService", "campaignmanagement", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    campaignmanagement.clone = function(objectToClone) {
        var clonedObj = new campaignmanagement();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return campaignmanagement;
});