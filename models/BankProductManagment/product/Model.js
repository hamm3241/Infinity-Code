/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "product", "objectService" : "BankProductManagment"};

    var setterFunctions = {
    };

    //Create the Model Class
    function product(defaultValues) {
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
    BaseModel.isParentOf(product);

    //Create new class level validator object
    BaseModel.Validator.call(product);

    var registerValidatorBackup = product.registerValidator;

    product.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(product.isValid(this, propName, val)) {
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
    //For Operation 'GetFeatures' with service id 'GetFeatures7047'
     product.GetFeatures = function(params, onCompletion){
        return product.customVerb('GetFeatures', params, onCompletion);
     };

    //For Operation 'UpdateProduct' with service id 'UpdateProduct5588'
     product.UpdateProduct = function(params, onCompletion){
        return product.customVerb('UpdateProduct', params, onCompletion);
     };

    //For Operation 'importProduct' with service id 'importProductFromCSV5736'
     product.importProduct = function(params, onCompletion){
        return product.customVerb('importProduct', params, onCompletion);
     };

    //For Operation 'CreateProduct' with service id 'CreateProduct8732'
     product.CreateProduct = function(params, onCompletion){
        return product.customVerb('CreateProduct', params, onCompletion);
     };

    //For Operation 'CreateProductGroup' with service id 'CreateProductGroup6591'
     product.CreateProductGroup = function(params, onCompletion){
        return product.customVerb('CreateProductGroup', params, onCompletion);
     };

    //For Operation 'GetProductLines' with service id 'GetProductLines5577'
     product.GetProductLines = function(params, onCompletion){
        return product.customVerb('GetProductLines', params, onCompletion);
     };

    //For Operation 'getProductGroupsByProductLine' with service id 'getProductGroupsByProductLine5330'
     product.getProductGroupsByProductLine = function(params, onCompletion){
        return product.customVerb('getProductGroupsByProductLine', params, onCompletion);
     };

    //For Operation 'FetchBankDetailsBasedOnRoutingNumber' with service id 'FetchBankDetailsBasedOnRoutingNumber7370'
     product.FetchBankDetailsBasedOnRoutingNumber = function(params, onCompletion){
        return product.customVerb('FetchBankDetailsBasedOnRoutingNumber', params, onCompletion);
     };

    //For Operation 'CreateProductLine' with service id 'CreateProductLines2919'
     product.CreateProductLine = function(params, onCompletion){
        return product.customVerb('CreateProductLine', params, onCompletion);
     };

    //For Operation 'GetProductGroups' with service id 'GetProductGroups9523'
     product.GetProductGroups = function(params, onCompletion){
        return product.customVerb('GetProductGroups', params, onCompletion);
     };

    //For Operation 'CreateFeature' with service id 'CreateFeature6344'
     product.CreateFeature = function(params, onCompletion){
        return product.customVerb('CreateFeature', params, onCompletion);
     };

    //For Operation 'UpdateProductLine' with service id 'UpdateProductLines8392'
     product.UpdateProductLine = function(params, onCompletion){
        return product.customVerb('UpdateProductLine', params, onCompletion);
     };

    //For Operation 'GetAllProductGroups' with service id 'GetProductGroupsForCampaign1010'
     product.GetAllProductGroups = function(params, onCompletion){
        return product.customVerb('GetAllProductGroups', params, onCompletion);
     };

    //For Operation 'GetProducts' with service id 'GetProducts8873'
     product.GetProducts = function(params, onCompletion){
        return product.customVerb('GetProducts', params, onCompletion);
     };

    //For Operation 'UpdateProductGroup' with service id 'UpdateProductGroup1412'
     product.UpdateProductGroup = function(params, onCompletion){
        return product.customVerb('UpdateProductGroup', params, onCompletion);
     };

    //For Operation 'manageProductStatus' with service id 'manageStatus4738'
     product.manageProductStatus = function(params, onCompletion){
        return product.customVerb('manageProductStatus', params, onCompletion);
     };

    //For Operation 'getProductListFromMS' with service id 'fetchProductList7332'
     product.getProductListFromMS = function(params, onCompletion){
        return product.customVerb('getProductListFromMS', params, onCompletion);
     };

    //For Operation 'UpdateFeature' with service id 'UpdateFeature8900'
     product.UpdateFeature = function(params, onCompletion){
        return product.customVerb('UpdateFeature', params, onCompletion);
     };

    //For Operation 'getProductsByProductGroup' with service id 'GetProductsByProductGroupsForPurpose8420'
     product.getProductsByProductGroup = function(params, onCompletion){
        return product.customVerb('getProductsByProductGroup', params, onCompletion);
     };

    //For Operation 'getProductList' with service id 'GetProductsForPurprose4769'
     product.getProductList = function(params, onCompletion){
        return product.customVerb('getProductList', params, onCompletion);
     };

    var relations = [];

    product.relations = relations;

    product.prototype.isValid = function() {
        return product.isValid(this);
    };

    product.prototype.objModelName = "product";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    product.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("BankProductManagment", "product", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    product.clone = function(objectToClone) {
        var clonedObj = new product();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return product;
});