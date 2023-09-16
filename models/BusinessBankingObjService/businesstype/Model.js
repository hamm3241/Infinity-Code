/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "businesstype", "objectService" : "BusinessBankingObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function businesstype(defaultValues) {
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
    BaseModel.isParentOf(businesstype);

    //Create new class level validator object
    BaseModel.Validator.call(businesstype);

    var registerValidatorBackup = businesstype.registerValidator;

    businesstype.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(businesstype.isValid(this, propName, val)) {
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
    //For Operation 'createBusinessType' with service id 'createBusinessType4284'
     businesstype.createBusinessType = function(params, onCompletion){
        return businesstype.customVerb('createBusinessType', params, onCompletion);
     };

    //For Operation 'getBusinessTypeGroups' with service id 'getBusinessTypeGroups9005'
     businesstype.getBusinessTypeGroups = function(params, onCompletion){
        return businesstype.customVerb('getBusinessTypeGroups', params, onCompletion);
     };

    //For Operation 'getBusinessTypes' with service id 'getBusinessTypes4872'
     businesstype.getBusinessTypes = function(params, onCompletion){
        return businesstype.customVerb('getBusinessTypes', params, onCompletion);
     };

    //For Operation 'deleteBusinessType' with service id 'deleteBusinessType2650'
     businesstype.deleteBusinessType = function(params, onCompletion){
        return businesstype.customVerb('deleteBusinessType', params, onCompletion);
     };

    //For Operation 'updateBusinessType' with service id 'updateBusinessType1948'
     businesstype.updateBusinessType = function(params, onCompletion){
        return businesstype.customVerb('updateBusinessType', params, onCompletion);
     };

    //For Operation 'getBusinessTypeCustomers' with service id 'getBusinessTypeCustomers4516'
     businesstype.getBusinessTypeCustomers = function(params, onCompletion){
        return businesstype.customVerb('getBusinessTypeCustomers', params, onCompletion);
     };

    var relations = [];

    businesstype.relations = relations;

    businesstype.prototype.isValid = function() {
        return businesstype.isValid(this);
    };

    businesstype.prototype.objModelName = "businesstype";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    businesstype.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("BusinessBankingObjService", "businesstype", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    businesstype.clone = function(objectToClone) {
        var clonedObj = new businesstype();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return businesstype;
});