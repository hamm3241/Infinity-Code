/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "bankFacility", "objectService" : "BankProductManagment"};

    var setterFunctions = {
    };

    //Create the Model Class
    function bankFacility(defaultValues) {
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
    BaseModel.isParentOf(bankFacility);

    //Create new class level validator object
    BaseModel.Validator.call(bankFacility);

    var registerValidatorBackup = bankFacility.registerValidator;

    bankFacility.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(bankFacility.isValid(this, propName, val)) {
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
    //For Operation 'createFacility' with service id 'createFacility8259'
     bankFacility.createFacility = function(params, onCompletion){
        return bankFacility.customVerb('createFacility', params, onCompletion);
     };

    //For Operation 'getFacilities' with service id 'getFacilities8777'
     bankFacility.getFacilities = function(params, onCompletion){
        return bankFacility.customVerb('getFacilities', params, onCompletion);
     };

    //For Operation 'editFacility' with service id 'editFacility4939'
     bankFacility.editFacility = function(params, onCompletion){
        return bankFacility.customVerb('editFacility', params, onCompletion);
     };

    var relations = [];

    bankFacility.relations = relations;

    bankFacility.prototype.isValid = function() {
        return bankFacility.isValid(this);
    };

    bankFacility.prototype.objModelName = "bankFacility";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    bankFacility.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("BankProductManagment", "bankFacility", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    bankFacility.clone = function(objectToClone) {
        var clonedObj = new bankFacility();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return bankFacility;
});