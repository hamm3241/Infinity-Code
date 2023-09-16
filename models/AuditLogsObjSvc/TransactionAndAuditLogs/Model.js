/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "TransactionAndAuditLogs", "objectService" : "AuditLogsObjSvc"};

    var setterFunctions = {
    };

    //Create the Model Class
    function TransactionAndAuditLogs(defaultValues) {
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
    BaseModel.isParentOf(TransactionAndAuditLogs);

    //Create new class level validator object
    BaseModel.Validator.call(TransactionAndAuditLogs);

    var registerValidatorBackup = TransactionAndAuditLogs.registerValidator;

    TransactionAndAuditLogs.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(TransactionAndAuditLogs.isValid(this, propName, val)) {
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
    //For Operation 'generateCustomerActivityLogs' with service id 'generateCustomerActivityLogs5367'
     TransactionAndAuditLogs.generateCustomerActivityLogs = function(params, onCompletion){
        return TransactionAndAuditLogs.customVerb('generateCustomerActivityLogs', params, onCompletion);
     };

    //For Operation 'getModules' with service id 'get_eventtype4000'
     TransactionAndAuditLogs.getModules = function(params, onCompletion){
        return TransactionAndAuditLogs.customVerb('getModules', params, onCompletion);
     };

    //For Operation 'SearchCustomerAuditLogs' with service id 'SearchCustomerAuditLogs9708'
     TransactionAndAuditLogs.SearchCustomerAuditLogs = function(params, onCompletion){
        return TransactionAndAuditLogs.customVerb('SearchCustomerAuditLogs', params, onCompletion);
     };

    //For Operation 'exportAdminConsoleLogs' with service id 'exportAdminConsoleLogs5235'
     TransactionAndAuditLogs.exportAdminConsoleLogs = function(params, onCompletion){
        return TransactionAndAuditLogs.customVerb('exportAdminConsoleLogs', params, onCompletion);
     };

    //For Operation 'getAdminActivityLogs' with service id 'getAdminActivityLogs8430'
     TransactionAndAuditLogs.getAdminActivityLogs = function(params, onCompletion){
        return TransactionAndAuditLogs.customVerb('getAdminActivityLogs', params, onCompletion);
     };

    //For Operation 'exportTransactionalLogs' with service id 'exportTransactionalLogs5367'
     TransactionAndAuditLogs.exportTransactionalLogs = function(params, onCompletion){
        return TransactionAndAuditLogs.customVerb('exportTransactionalLogs', params, onCompletion);
     };

    //For Operation 'getTransactionLogs' with service id 'getTransactionLogs2140'
     TransactionAndAuditLogs.getTransactionLogs = function(params, onCompletion){
        return TransactionAndAuditLogs.customVerb('getTransactionLogs', params, onCompletion);
     };

    //For Operation 'getTransactionMasterData' with service id 'getTransactionMasterData5224'
     TransactionAndAuditLogs.getTransactionMasterData = function(params, onCompletion){
        return TransactionAndAuditLogs.customVerb('getTransactionMasterData', params, onCompletion);
     };

    //For Operation 'getAdminActivityMasterData' with service id 'getAdminActivityMasterData6287'
     TransactionAndAuditLogs.getAdminActivityMasterData = function(params, onCompletion){
        return TransactionAndAuditLogs.customVerb('getAdminActivityMasterData', params, onCompletion);
     };

    //For Operation 'getActivityType' with service id 'get_eventsubtype8160'
     TransactionAndAuditLogs.getActivityType = function(params, onCompletion){
        return TransactionAndAuditLogs.customVerb('getActivityType', params, onCompletion);
     };

    //For Operation 'getCustomerLogs' with service id 'getCustomerLogs8714'
     TransactionAndAuditLogs.getCustomerLogs = function(params, onCompletion){
        return TransactionAndAuditLogs.customVerb('getCustomerLogs', params, onCompletion);
     };

    //For Operation 'exportCustomerActivityLogs' with service id 'exportCustomerActivityLogs1493'
     TransactionAndAuditLogs.exportCustomerActivityLogs = function(params, onCompletion){
        return TransactionAndAuditLogs.customVerb('exportCustomerActivityLogs', params, onCompletion);
     };

    //For Operation 'getCustomerActivityMasterData' with service id 'getCustomerActivityMasterData2489'
     TransactionAndAuditLogs.getCustomerActivityMasterData = function(params, onCompletion){
        return TransactionAndAuditLogs.customVerb('getCustomerActivityMasterData', params, onCompletion);
     };

    var relations = [];

    TransactionAndAuditLogs.relations = relations;

    TransactionAndAuditLogs.prototype.isValid = function() {
        return TransactionAndAuditLogs.isValid(this);
    };

    TransactionAndAuditLogs.prototype.objModelName = "TransactionAndAuditLogs";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    TransactionAndAuditLogs.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("AuditLogsObjSvc", "TransactionAndAuditLogs", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    TransactionAndAuditLogs.clone = function(objectToClone) {
        var clonedObj = new TransactionAndAuditLogs();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return TransactionAndAuditLogs;
});