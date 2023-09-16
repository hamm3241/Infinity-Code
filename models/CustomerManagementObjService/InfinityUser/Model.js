/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "InfinityUser", "objectService" : "CustomerManagementObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function InfinityUser(defaultValues) {
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
    BaseModel.isParentOf(InfinityUser);

    //Create new class level validator object
    BaseModel.Validator.call(InfinityUser);

    var registerValidatorBackup = InfinityUser.registerValidator;

    InfinityUser.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(InfinityUser.isValid(this, propName, val)) {
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
    //For Operation 'getInfinityUserAccounts' with service id 'getInfinityUserAccounts1836'
     InfinityUser.getInfinityUserAccounts = function(params, onCompletion){
        return InfinityUser.customVerb('getInfinityUserAccounts', params, onCompletion);
     };

    //For Operation 'getInfinityUserContractDetails' with service id 'getInfinityUserContractDetails5295'
     InfinityUser.getInfinityUserContractDetails = function(params, onCompletion){
        return InfinityUser.customVerb('getInfinityUserContractDetails', params, onCompletion);
     };

    //For Operation 'getAllEligibleRelationalCustomers' with service id 'getAllEligibleRelationalCustomers6193'
     InfinityUser.getAllEligibleRelationalCustomers = function(params, onCompletion){
        return InfinityUser.customVerb('getAllEligibleRelationalCustomers', params, onCompletion);
     };

    //For Operation 'getInfinityUserAccountsForCorecustomer' with service id 'getInfinityUserAccountsForCorecustomer6990'
     InfinityUser.getInfinityUserAccountsForCorecustomer = function(params, onCompletion){
        return InfinityUser.customVerb('getInfinityUserAccountsForCorecustomer', params, onCompletion);
     };

    //For Operation 'getInfinityUserFeatureActions' with service id 'getInfinityUserFeatureActions1507'
     InfinityUser.getInfinityUserFeatureActions = function(params, onCompletion){
        return InfinityUser.customVerb('getInfinityUserFeatureActions', params, onCompletion);
     };

    //For Operation 'createInfinityUser' with service id 'createInfinityUser4150'
     InfinityUser.createInfinityUser = function(params, onCompletion){
        return InfinityUser.customVerb('createInfinityUser', params, onCompletion);
     };

    //For Operation 'getRelativeCoreCustomerContractDetails' with service id 'getRelativeCoreCustomerContractDetails2286'
     InfinityUser.getRelativeCoreCustomerContractDetails = function(params, onCompletion){
        return InfinityUser.customVerb('getRelativeCoreCustomerContractDetails', params, onCompletion);
     };

    //For Operation 'getAssociatedCustomers' with service id 'getAssociatedCustomers4126'
     InfinityUser.getAssociatedCustomers = function(params, onCompletion){
        return InfinityUser.customVerb('getAssociatedCustomers', params, onCompletion);
     };

    //For Operation 'editInfinityUser' with service id 'editInfinityUser4150'
     InfinityUser.editInfinityUser = function(params, onCompletion){
        return InfinityUser.customVerb('editInfinityUser', params, onCompletion);
     };

    //For Operation 'getInfinityUser' with service id 'getInfinityUser9007'
     InfinityUser.getInfinityUser = function(params, onCompletion){
        return InfinityUser.customVerb('getInfinityUser', params, onCompletion);
     };

    //For Operation 'getInfinityUserLimits' with service id 'getInfinityUserLimits9127'
     InfinityUser.getInfinityUserLimits = function(params, onCompletion){
        return InfinityUser.customVerb('getInfinityUserLimits', params, onCompletion);
     };

    //For Operation 'getInfinityUserServiceDefsRoles' with service id 'getInfinityUserServiceDefsRoles2513'
     InfinityUser.getInfinityUserServiceDefsRoles = function(params, onCompletion){
        return InfinityUser.customVerb('getInfinityUserServiceDefsRoles', params, onCompletion);
     };

    //For Operation 'getCoreCustomerContractDetails' with service id 'getCoreCustomerContractDetails4650'
     InfinityUser.getCoreCustomerContractDetails = function(params, onCompletion){
        return InfinityUser.customVerb('getCoreCustomerContractDetails', params, onCompletion);
     };

    var relations = [];

    InfinityUser.relations = relations;

    InfinityUser.prototype.isValid = function() {
        return InfinityUser.isValid(this);
    };

    InfinityUser.prototype.objModelName = "InfinityUser";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    InfinityUser.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CustomerManagementObjService", "InfinityUser", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    InfinityUser.clone = function(objectToClone) {
        var clonedObj = new InfinityUser();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return InfinityUser;
});