/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Contract", "objectService" : "ContractManagementObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function Contract(defaultValues) {
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
    BaseModel.isParentOf(Contract);

    //Create new class level validator object
    BaseModel.Validator.call(Contract);

    var registerValidatorBackup = Contract.registerValidator;

    Contract.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Contract.isValid(this, propName, val)) {
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
    //For Operation 'editContract' with service id 'editContract4893'
     Contract.editContract = function(params, onCompletion){
        return Contract.customVerb('editContract', params, onCompletion);
     };

    //For Operation 'searchContract' with service id 'searchContract9389'
     Contract.searchContract = function(params, onCompletion){
        return Contract.customVerb('searchContract', params, onCompletion);
     };

    //For Operation 'getCoreRelativeCustomers' with service id 'getCoreRelativeCustomers9183'
     Contract.getCoreRelativeCustomers = function(params, onCompletion){
        return Contract.customVerb('getCoreRelativeCustomers', params, onCompletion);
     };

    //For Operation 'getListOfContractsByStatus' with service id 'getListOfContractsByStatus5202'
     Contract.getListOfContractsByStatus = function(params, onCompletion){
        return Contract.customVerb('getListOfContractsByStatus', params, onCompletion);
     };

    //For Operation 'getContractFeatureActionLimits' with service id 'getContractFeatureActionLimits9537'
     Contract.getContractFeatureActionLimits = function(params, onCompletion){
        return Contract.customVerb('getContractFeatureActionLimits', params, onCompletion);
     };

    //For Operation 'searchCoreCustomers' with service id 'searchCoreCustomers9816'
     Contract.searchCoreCustomers = function(params, onCompletion){
        return Contract.customVerb('searchCoreCustomers', params, onCompletion);
     };

    //For Operation 'getContractInfinityUsers' with service id 'getContractInfinityUsers4359'
     Contract.getContractInfinityUsers = function(params, onCompletion){
        return Contract.customVerb('getContractInfinityUsers', params, onCompletion);
     };

    //For Operation 'getContractDetails' with service id 'getContractDetails9946'
     Contract.getContractDetails = function(params, onCompletion){
        return Contract.customVerb('getContractDetails', params, onCompletion);
     };

    //For Operation 'getContractAccounts' with service id 'getContractAccounts6743'
     Contract.getContractAccounts = function(params, onCompletion){
        return Contract.customVerb('getContractAccounts', params, onCompletion);
     };

    //For Operation 'createContract' with service id 'createContract8985'
     Contract.createContract = function(params, onCompletion){
        return Contract.customVerb('createContract', params, onCompletion);
     };

    //For Operation 'getCoreCustomerAccounts' with service id 'getCoreCustomerAccounts1587'
     Contract.getCoreCustomerAccounts = function(params, onCompletion){
        return Contract.customVerb('getCoreCustomerAccounts', params, onCompletion);
     };

  

    //For Operation 'updateContractStatus' with service id 'updateContractStatus3562'
     Contract.updateContractStatus = function(params, onCompletion){
        return Contract.customVerb('updateContractStatus', params, onCompletion);
     };

    //For Operation 'getCoreCustomerDetails' with service id 'getCoreCustomerDetails9194'
     Contract.getCoreCustomerDetails = function(params, onCompletion){
        return Contract.customVerb('getCoreCustomerDetails', params, onCompletion);
     };

    var relations = [];

    Contract.relations = relations;

    Contract.prototype.isValid = function() {
        return Contract.isValid(this);
    };

    Contract.prototype.objModelName = "Contract";
    Contract.prototype.objServiceName = "ContractManagementObjService";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Contract.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ContractManagementObjService", "Contract", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Contract.clone = function(objectToClone) {
        var clonedObj = new Contract();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Contract;
});