/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "customer", "objectService" : "BusinessBankingObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function customer(defaultValues) {
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
    BaseModel.isParentOf(customer);

    //Create new class level validator object
    BaseModel.Validator.call(customer);

    var registerValidatorBackup = customer.registerValidator;

    customer.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(customer.isValid(this, propName, val)) {
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
    //For Operation 'editCustomer' with service id 'editCustomer2093'
     customer.editCustomer = function(params, onCompletion){
        return customer.customVerb('editCustomer', params, onCompletion);
     };

    //For Operation 'getCustomerAccounts' with service id 'getCustomerAccounts5075'
     customer.getCustomerAccounts = function(params, onCompletion){
        return customer.customVerb('getCustomerAccounts', params, onCompletion);
     };

    //For Operation 'createSignatory' with service id 'createSignatory4282'
     customer.createSignatory = function(params, onCompletion){
        return customer.customVerb('createSignatory', params, onCompletion);
     };

    //For Operation 'createCustomer' with service id 'createCustomer9096'
     customer.createCustomer = function(params, onCompletion){
        return customer.customVerb('createCustomer', params, onCompletion);
     };

    //For Operation 'editSignatory' with service id 'editSignatory5330'
     customer.editSignatory = function(params, onCompletion){
        return customer.customVerb('editSignatory', params, onCompletion);
     };

    //For Operation 'upgradeUser' with service id 'upgradeUser2327'
     customer.upgradeUser = function(params, onCompletion){
        return customer.customVerb('upgradeUser', params, onCompletion);
     };

    //For Operation 'verifyUsername' with service id 'verifyUsername2376'
     customer.verifyUsername = function(params, onCompletion){
        return customer.customVerb('verifyUsername', params, onCompletion);
     };

    //For Operation 'fetchAuthorizedSignatories' with service id 'fetchAuthorizedSignatories7613'
     customer.fetchAuthorizedSignatories = function(params, onCompletion){
        return customer.customVerb('fetchAuthorizedSignatories', params, onCompletion);
     };

    //For Operation 'upgradeRolesAndEntiltlements' with service id 'upgradeRolesAndPermissions6743'
     customer.upgradeRolesAndEntiltlements = function(params, onCompletion){
        return customer.customVerb('upgradeRolesAndEntiltlements', params, onCompletion);
     };

    var relations = [];

    customer.relations = relations;

    customer.prototype.isValid = function() {
        return customer.isValid(this);
    };

    customer.prototype.objModelName = "customer";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    customer.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("BusinessBankingObjService", "customer", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    customer.clone = function(objectToClone) {
        var clonedObj = new customer();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return customer;
});