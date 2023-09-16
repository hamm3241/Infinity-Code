/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "LoginType", "objectService" : "AppConfigurationsObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function LoginType(defaultValues) {
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
    BaseModel.isParentOf(LoginType);

    //Create new class level validator object
    BaseModel.Validator.call(LoginType);

    var registerValidatorBackup = LoginType.registerValidator;

    LoginType.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(LoginType.isValid(this, propName, val)) {
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
    //For Operation 'getLoginTypeConfiguration' with service id 'getLoginTypeConfiguration4354'
     LoginType.getLoginTypeConfiguration = function(params, onCompletion){
        return LoginType.customVerb('getLoginTypeConfiguration', params, onCompletion);
     };

    //For Operation 'getAttribute' with service id 'getAttribute2378'
     LoginType.getAttribute = function(params, onCompletion){
        return LoginType.customVerb('getAttribute', params, onCompletion);
     };

    var relations = [];

    LoginType.relations = relations;

    LoginType.prototype.isValid = function() {
        return LoginType.isValid(this);
    };

    LoginType.prototype.objModelName = "LoginType";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    LoginType.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("AppConfigurationsObjService", "LoginType", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    LoginType.clone = function(objectToClone) {
        var clonedObj = new LoginType();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return LoginType;
});