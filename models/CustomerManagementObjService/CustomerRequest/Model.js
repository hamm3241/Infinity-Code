/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "CustomerRequest", "objectService" : "CustomerManagementObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function CustomerRequest(defaultValues) {
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
    BaseModel.isParentOf(CustomerRequest);

    //Create new class level validator object
    BaseModel.Validator.call(CustomerRequest);

    var registerValidatorBackup = CustomerRequest.registerValidator;

    CustomerRequest.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(CustomerRequest.isValid(this, propName, val)) {
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
    //For Operation 'discardMessageAttachments' with service id 'discardMessageAttachments1974'
     CustomerRequest.discardMessageAttachments = function(params, onCompletion){
        return CustomerRequest.customVerb('discardMessageAttachments', params, onCompletion);
     };

    //For Operation 'getRequestCategory' with service id 'get_requestcategory1918'
     CustomerRequest.getRequestCategory = function(params, onCompletion){
        return CustomerRequest.customVerb('getRequestCategory', params, onCompletion);
     };

    //For Operation 'downloadMessageAttachment' with service id 'downloadMessageAttachment4024'
     CustomerRequest.downloadMessageAttachment = function(params, onCompletion){
        return CustomerRequest.customVerb('downloadMessageAttachment', params, onCompletion);
     };

    //For Operation 'getRequestMessages' with service id 'getRequestMessages9277'
     CustomerRequest.getRequestMessages = function(params, onCompletion){
        return CustomerRequest.customVerb('getRequestMessages', params, onCompletion);
     };

    //For Operation 'createNewCustomerRequestMessage' with service id 'createNewCustomerRequestMessage5809'
     CustomerRequest.createNewCustomerRequestMessage = function(params, onCompletion){
        return CustomerRequest.customVerb('createNewCustomerRequestMessage', params, onCompletion);
     };

    //For Operation 'assignRequests' with service id 'assignRequests2447'
     CustomerRequest.assignRequests = function(params, onCompletion){
        return CustomerRequest.customVerb('assignRequests', params, onCompletion);
     };

    //For Operation 'getRequestSummaryCount' with service id 'getRequestSummaryCount2641'
     CustomerRequest.getRequestSummaryCount = function(params, onCompletion){
        return CustomerRequest.customVerb('getRequestSummaryCount', params, onCompletion);
     };

    //For Operation 'createNewCustomerRequest' with service id 'createNewCustomerRequest1932'
     CustomerRequest.createNewCustomerRequest = function(params, onCompletion){
        return CustomerRequest.customVerb('createNewCustomerRequest', params, onCompletion);
     };

    //For Operation 'getRequests' with service id 'getRequests6674'
     CustomerRequest.getRequests = function(params, onCompletion){
        return CustomerRequest.customVerb('getRequests', params, onCompletion);
     };

    //For Operation 'getallmessages' with service id 'getAllMessagesOfARequest8993'
     CustomerRequest.getallmessages = function(params, onCompletion){
        return CustomerRequest.customVerb('getallmessages', params, onCompletion);
     };

    //For Operation 'getCustomerRequests' with service id 'getRequests3415'
     CustomerRequest.getCustomerRequests = function(params, onCompletion){
        return CustomerRequest.customVerb('getCustomerRequests', params, onCompletion);
     };

    //For Operation 'getMessageAttachments' with service id 'getMessageAttachment4027'
     CustomerRequest.getMessageAttachments = function(params, onCompletion){
        return CustomerRequest.customVerb('getMessageAttachments', params, onCompletion);
     };

    //For Operation 'getUnreadMessageCount' with service id 'getUnreadMessageCount1428'
     CustomerRequest.getUnreadMessageCount = function(params, onCompletion){
        return CustomerRequest.customVerb('getUnreadMessageCount', params, onCompletion);
     };

    //For Operation 'updateCustomerRequest' with service id 'updateCustomerRequest9014'
     CustomerRequest.updateCustomerRequest = function(params, onCompletion){
        return CustomerRequest.customVerb('updateCustomerRequest', params, onCompletion);
     };

    var relations = [];

    CustomerRequest.relations = relations;

    CustomerRequest.prototype.isValid = function() {
        return CustomerRequest.isValid(this);
    };

    CustomerRequest.prototype.objModelName = "CustomerRequest";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    CustomerRequest.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CustomerManagementObjService", "CustomerRequest", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    CustomerRequest.clone = function(objectToClone) {
        var clonedObj = new CustomerRequest();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return CustomerRequest;
});