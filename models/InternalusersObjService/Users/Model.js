/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Users", "objectService" : "InternalusersObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function Users(defaultValues) {
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
    BaseModel.isParentOf(Users);

    //Create new class level validator object
    BaseModel.Validator.call(Users);

    var registerValidatorBackup = Users.registerValidator;

    Users.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Users.isValid(this, propName, val)) {
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
    //For Operation 'getPermissionsForLegalEntities' with service id 'getPermissionsForLegalEntities8710'
     Users.getPermissionsForLegalEntities = function(params, onCompletion){
        return Users.customVerb('getPermissionsForLegalEntities', params, onCompletion);
     };

    //For Operation 'getUserType' with service id 'get_usertype9016'
     Users.getUserType = function(params, onCompletion){
        return Users.customVerb('getUserType', params, onCompletion);
     };

    //For Operation 'manageUserCompositeActions' with service id 'manageUserCompositeActions2955'
     Users.manageUserCompositeActions = function(params, onCompletion){
        return Users.customVerb('manageUserCompositeActions', params, onCompletion);
     };

    //For Operation 'EditInternalUser' with service id 'editInternalUser4755'
     Users.EditInternalUser = function(params, onCompletion){
        return Users.customVerb('EditInternalUser', params, onCompletion);
     };

    //For Operation 'UpdateUserStatus' with service id 'updateUserStatus1710'
     Users.UpdateUserStatus = function(params, onCompletion){
        return Users.customVerb('UpdateUserStatus', params, onCompletion);
     };

    //For Operation 'manageUserCompositePermissions' with service id 'manageUserCompositePermissions3308'
     Users.manageUserCompositePermissions = function(params, onCompletion){
        return Users.customVerb('manageUserCompositePermissions', params, onCompletion);
     };

    var relations = [];

    Users.relations = relations;

    Users.prototype.isValid = function() {
        return Users.isValid(this);
    };

    Users.prototype.objModelName = "Users";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Users.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("InternalusersObjService", "Users", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Users.clone = function(objectToClone) {
        var clonedObj = new Users();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Users;
});