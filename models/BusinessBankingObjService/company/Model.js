/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "company", "objectService" : "BusinessBankingObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function company(defaultValues) {
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
    BaseModel.isParentOf(company);

    //Create new class level validator object
    BaseModel.Validator.call(company);

    var registerValidatorBackup = company.registerValidator;

    company.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(company.isValid(this, propName, val)) {
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
    //For Operation 'getAllAccounts' with service id 'getAllAccounts9702'
     company.getAllAccounts = function(params, onCompletion){
        return company.customVerb('getAllAccounts', params, onCompletion);
     };

    //For Operation 'getCompanyAccounts' with service id 'getCompanyAccounts7026'
     company.getCompanyAccounts = function(params, onCompletion){
        return company.customVerb('getCompanyAccounts', params, onCompletion);
     };

    //For Operation 'getCompanyDetails' with service id 'getCompanySearch7925'
     company.getCompanyDetails = function(params, onCompletion){
        return company.customVerb('getCompanyDetails', params, onCompletion);
     };

    //For Operation 'getCompanyActionLimits' with service id 'getCompanyActionLimits9405'
     company.getCompanyActionLimits = function(params, onCompletion){
        return company.customVerb('getCompanyActionLimits', params, onCompletion);
     };

    //For Operation 'getListOfCompanyByStatus' with service id 'getListOfCompanyByStatus9425'
     company.getListOfCompanyByStatus = function(params, onCompletion){
        return company.customVerb('getListOfCompanyByStatus', params, onCompletion);
     };

    //For Operation 'createCompany' with service id 'createOrganization1924'
     company.createCompany = function(params, onCompletion){
        return company.customVerb('createCompany', params, onCompletion);
     };

    //For Operation 'suspendCompanyFeatures' with service id 'suspendCompanyFeatures6075'
     company.suspendCompanyFeatures = function(params, onCompletion){
        return company.customVerb('suspendCompanyFeatures', params, onCompletion);
     };

    //For Operation 'updateCompanyStatusToRejected' with service id 'updateCompanyStatusToRejected7524'
     company.updateCompanyStatusToRejected = function(params, onCompletion){
        return company.customVerb('updateCompanyStatusToRejected', params, onCompletion);
     };

    //For Operation 'updateCompanyStatusToActive' with service id 'updateCompanyStatusToActive9068'
     company.updateCompanyStatusToActive = function(params, onCompletion){
        return company.customVerb('updateCompanyStatusToActive', params, onCompletion);
     };

    //For Operation 'unlinkAccounts' with service id 'unlinkAccounts7098'
     company.unlinkAccounts = function(params, onCompletion){
        return company.customVerb('unlinkAccounts', params, onCompletion);
     };

    //For Operation 'getCompanyApprovalMatrix' with service id 'getCompanyApprovalMatrix5183'
     company.getCompanyApprovalMatrix = function(params, onCompletion){
        return company.customVerb('getCompanyApprovalMatrix', params, onCompletion);
     };

    //For Operation 'fetchAccountSignatories' with service id 'fetchAccountSignatories7148'
     company.fetchAccountSignatories = function(params, onCompletion){
        return company.customVerb('fetchAccountSignatories', params, onCompletion);
     };

    //For Operation 'editCompany' with service id 'editOrganization5424'
     company.editCompany = function(params, onCompletion){
        return company.customVerb('editCompany', params, onCompletion);
     };

    //For Operation 'getMembershipDetails' with service id 'getMembershipDetails2406'
     company.getMembershipDetails = function(params, onCompletion){
        return company.customVerb('getMembershipDetails', params, onCompletion);
     };

    //For Operation 'getCompanySignatories' with service id 'getCompanySignatories1972'
     company.getCompanySignatories = function(params, onCompletion){
        return company.customVerb('getCompanySignatories', params, onCompletion);
     };

    //For Operation 'verifyOFACandCIP' with service id 'verifyOFACandCIP7054'
     company.verifyOFACandCIP = function(params, onCompletion){
        return company.customVerb('verifyOFACandCIP', params, onCompletion);
     };

    //For Operation 'validateTIN' with service id 'validateTIN4532'
     company.validateTIN = function(params, onCompletion){
        return company.customVerb('validateTIN', params, onCompletion);
     };

    //For Operation 'getCompanyCustomers' with service id 'getCompanyCustomers1823'
     company.getCompanyCustomers = function(params, onCompletion){
        return company.customVerb('getCompanyCustomers', params, onCompletion);
     };

    var relations = [];

    company.relations = relations;

    company.prototype.isValid = function() {
        return company.isValid(this);
    };

    company.prototype.objModelName = "company";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    company.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("BusinessBankingObjService", "company", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    company.clone = function(objectToClone) {
        var clonedObj = new company();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return company;
});