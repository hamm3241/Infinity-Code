/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "CustomerActions", "objectService" : "CustomerManagementObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function CustomerActions(defaultValues) {
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
    BaseModel.isParentOf(CustomerActions);

    //Create new class level validator object
    BaseModel.Validator.call(CustomerActions);

    var registerValidatorBackup = CustomerActions.registerValidator;

    CustomerActions.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(CustomerActions.isValid(this, propName, val)) {
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
    //For Operation 'getCustomerFeaturesAndActionsByRole' with service id 'getCustomerFeaturesAndActionsByRole2185'
     CustomerActions.getCustomerFeaturesAndActionsByRole = function(params, onCompletion){
        return CustomerActions.customVerb('getCustomerFeaturesAndActionsByRole', params, onCompletion);
     };

    //For Operation 'updateCustomerActions' with service id 'updateCustomerActions4004'
     CustomerActions.updateCustomerActions = function(params, onCompletion){
        return CustomerActions.customVerb('updateCustomerActions', params, onCompletion);
     };

    //For Operation 'getCoreCustomerRoleFeatureActionLimits' with service id 'getCoreCustomerRoleFeatureActionLimits5398'
     CustomerActions.getCoreCustomerRoleFeatureActionLimits = function(params, onCompletion){
        return CustomerActions.customVerb('getCoreCustomerRoleFeatureActionLimits', params, onCompletion);
     };

    //For Operation 'getCustomerRetailDirectFeaturesAndActions' with service id 'getCustomerRetailDirectFeaturesAndActions3306'
     CustomerActions.getCustomerRetailDirectFeaturesAndActions = function(params, onCompletion){
        return CustomerActions.customVerb('getCustomerRetailDirectFeaturesAndActions', params, onCompletion);
     };

    //For Operation 'getCoreCustomerProductRolesFeatureActionLimits' with service id 'getCoreCustomerProductRolesFeatureActionLimits6181'
     CustomerActions.getCoreCustomerProductRolesFeatureActionLimits = function(params, onCompletion){
        return CustomerActions.customVerb('getCoreCustomerProductRolesFeatureActionLimits', params, onCompletion);
     };

    //For Operation 'getCustomerFeaturesAndActionsCombined' with service id 'getCustomerFeaturesAndActionsCombined8692'
     CustomerActions.getCustomerFeaturesAndActionsCombined = function(params, onCompletion){
        return CustomerActions.customVerb('getCustomerFeaturesAndActionsCombined', params, onCompletion);
     };

    //For Operation 'getCustomerFeaturesAndActions' with service id 'getCustomerFeaturesAndActions3460'
     CustomerActions.getCustomerFeaturesAndActions = function(params, onCompletion){
        return CustomerActions.customVerb('getCustomerFeaturesAndActions', params, onCompletion);
     };

    var relations = [];

    CustomerActions.relations = relations;

    CustomerActions.prototype.isValid = function() {
        return CustomerActions.isValid(this);
    };

    CustomerActions.prototype.objModelName = "CustomerActions";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    CustomerActions.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CustomerManagementObjService", "CustomerActions", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    CustomerActions.clone = function(objectToClone) {
        var clonedObj = new CustomerActions();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return CustomerActions;
});