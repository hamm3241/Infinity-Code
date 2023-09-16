/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "ApprovalMatrix", "objectService" : "ApprovalMatrixManageObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function ApprovalMatrix(defaultValues) {
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
    BaseModel.isParentOf(ApprovalMatrix);

    //Create new class level validator object
    BaseModel.Validator.call(ApprovalMatrix);

    var registerValidatorBackup = ApprovalMatrix.registerValidator;

    ApprovalMatrix.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(ApprovalMatrix.isValid(this, propName, val)) {
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
    //For Operation 'getApproversInSignatoryGroup' with service id 'getApproversInSignatoryGroup6848'
     ApprovalMatrix.getApproversInSignatoryGroup = function(params, onCompletion){
        return ApprovalMatrix.customVerb('getApproversInSignatoryGroup', params, onCompletion);
     };

    //For Operation 'updateApprovalRuleSGLevel' with service id 'updateApprovalRuleSGLevel5349'
     ApprovalMatrix.updateApprovalRuleSGLevel = function(params, onCompletion){
        return ApprovalMatrix.customVerb('updateApprovalRuleSGLevel', params, onCompletion);
     };

    //For Operation 'updateApprovalMatrixStatus' with service id 'updateApprovalMatrixStatus2930'
     ApprovalMatrix.updateApprovalMatrixStatus = function(params, onCompletion){
        return ApprovalMatrix.customVerb('updateApprovalMatrixStatus', params, onCompletion);
     };

    //For Operation 'getApprovalMatrix' with service id 'getApprovalMatrix3487'
     ApprovalMatrix.getApprovalMatrix = function(params, onCompletion){
        return ApprovalMatrix.customVerb('getApprovalMatrix', params, onCompletion);
     };

    //For Operation 'getApprovalMatrixByContractId' with service id 'getApprovalMatrixByContractId5472'
     ApprovalMatrix.getApprovalMatrixByContractId = function(params, onCompletion){
        return ApprovalMatrix.customVerb('getApprovalMatrixByContractId', params, onCompletion);
     };

    //For Operation 'createApprovalRuleUserLevel' with service id 'createApprovalRuleUserLevel5632'
     ApprovalMatrix.createApprovalRuleUserLevel = function(params, onCompletion){
        return ApprovalMatrix.customVerb('createApprovalRuleUserLevel', params, onCompletion);
     };

    //For Operation 'getApprovalRules' with service id 'getApprovalRules3410'
     ApprovalMatrix.getApprovalRules = function(params, onCompletion){
        return ApprovalMatrix.customVerb('getApprovalRules', params, onCompletion);
     };

    //For Operation 'updateApprovalRuleUserLevel' with service id 'updateApprovalRuleUserLevel7170'
     ApprovalMatrix.updateApprovalRuleUserLevel = function(params, onCompletion){
        return ApprovalMatrix.customVerb('updateApprovalRuleUserLevel', params, onCompletion);
     };

    //For Operation 'isApprovalMatrixDisabled' with service id 'isApprovalMatrixDisabled1575'
     ApprovalMatrix.isApprovalMatrixDisabled = function(params, onCompletion){
        return ApprovalMatrix.customVerb('isApprovalMatrixDisabled', params, onCompletion);
     };

    //For Operation 'createApprovalRuleSGLevel' with service id 'createApprovalRuleSGLevel1638'
     ApprovalMatrix.createApprovalRuleSGLevel = function(params, onCompletion){
        return ApprovalMatrix.customVerb('createApprovalRuleSGLevel', params, onCompletion);
     };

    //For Operation 'getAccountActionCustomerApproverList' with service id 'getAccountActionCustomerApproverList4297'
     ApprovalMatrix.getAccountActionCustomerApproverList = function(params, onCompletion){
        return ApprovalMatrix.customVerb('getAccountActionCustomerApproverList', params, onCompletion);
     };

    var relations = [];

    ApprovalMatrix.relations = relations;

    ApprovalMatrix.prototype.isValid = function() {
        return ApprovalMatrix.isValid(this);
    };

    ApprovalMatrix.prototype.objModelName = "ApprovalMatrix";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    ApprovalMatrix.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("ApprovalMatrixManageObjService", "ApprovalMatrix", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    ApprovalMatrix.clone = function(objectToClone) {
        var clonedObj = new ApprovalMatrix();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return ApprovalMatrix;
});