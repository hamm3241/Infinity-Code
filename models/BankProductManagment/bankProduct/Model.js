/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "bankProduct", "objectService" : "BankProductManagment"};

    var setterFunctions = {
    };

    //Create the Model Class
    function bankProduct(defaultValues) {
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
    BaseModel.isParentOf(bankProduct);

    //Create new class level validator object
    BaseModel.Validator.call(bankProduct);

    var registerValidatorBackup = bankProduct.registerValidator;

    bankProduct.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(bankProduct.isValid(this, propName, val)) {
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
    //For Operation 'updateProduct' with service id 'updateProduct8770'
     bankProduct.updateProduct = function(params, onCompletion){
        return bankProduct.customVerb('updateProduct', params, onCompletion);
     };

    //For Operation 'createProduct' with service id 'createProduct5776'
     bankProduct.createProduct = function(params, onCompletion){
        return bankProduct.customVerb('createProduct', params, onCompletion);
     };

    //For Operation 'deleteProductFacility' with service id 'deleteProductFacility9286'
     bankProduct.deleteProductFacility = function(params, onCompletion){
        return bankProduct.customVerb('deleteProductFacility', params, onCompletion);
     };

    //For Operation 'updateProductFacility' with service id 'updateProductFacility3566'
     bankProduct.updateProductFacility = function(params, onCompletion){
        return bankProduct.customVerb('updateProductFacility', params, onCompletion);
     };

    //For Operation 'createProductFacility' with service id 'createProductFacility7435'
     bankProduct.createProductFacility = function(params, onCompletion){
        return bankProduct.customVerb('createProductFacility', params, onCompletion);
     };

    //For Operation 'getProducts' with service id 'getProducts7684'
     bankProduct.getProducts = function(params, onCompletion){
        return bankProduct.customVerb('getProducts', params, onCompletion);
     };

    var relations = [];

    bankProduct.relations = relations;

    bankProduct.prototype.isValid = function() {
        return bankProduct.isValid(this);
    };

    bankProduct.prototype.objModelName = "bankProduct";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    bankProduct.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("BankProductManagment", "bankProduct", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    bankProduct.clone = function(objectToClone) {
        var clonedObj = new bankProduct();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return bankProduct;
});