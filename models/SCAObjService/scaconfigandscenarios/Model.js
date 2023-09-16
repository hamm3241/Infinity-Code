/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "scaconfigandscenarios", "objectService" : "SCAObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function scaconfigandscenarios(defaultValues) {
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
    BaseModel.isParentOf(scaconfigandscenarios);

    //Create new class level validator object
    BaseModel.Validator.call(scaconfigandscenarios);

    var registerValidatorBackup = scaconfigandscenarios.registerValidator;

    scaconfigandscenarios.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(scaconfigandscenarios.isValid(this, propName, val)) {
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
    //For Operation 'getSCAScenario' with service id 'getSCAScenario8902'
     scaconfigandscenarios.getSCAScenario = function(params, onCompletion){
        return scaconfigandscenarios.customVerb('getSCAScenario', params, onCompletion);
     };

    //For Operation 'getSCAAction' with service id 'getSCAAction2483'
     scaconfigandscenarios.getSCAAction = function(params, onCompletion){
        return scaconfigandscenarios.customVerb('getSCAAction', params, onCompletion);
     };

    //For Operation 'getSCAFeature' with service id 'getSCAFeature6144'
     scaconfigandscenarios.getSCAFeature = function(params, onCompletion){
        return scaconfigandscenarios.customVerb('getSCAFeature', params, onCompletion);
     };

    //For Operation 'createSCAScenario' with service id 'createSCAScenario6244'
     scaconfigandscenarios.createSCAScenario = function(params, onCompletion){
        return scaconfigandscenarios.customVerb('createSCAScenario', params, onCompletion);
     };

    //For Operation 'testSCAService' with service id 'testSCAScenario3572'
     scaconfigandscenarios.testSCAService = function(params, onCompletion){
        return scaconfigandscenarios.customVerb('testSCAService', params, onCompletion);
     };

    //For Operation 'editSCAScenario' with service id 'editSCAScenario1390'
     scaconfigandscenarios.editSCAScenario = function(params, onCompletion){
        return scaconfigandscenarios.customVerb('editSCAScenario', params, onCompletion);
     };

    //For Operation 'getSCAMode' with service id 'getSCAMode1306'
     scaconfigandscenarios.getSCAMode = function(params, onCompletion){
        return scaconfigandscenarios.customVerb('getSCAMode', params, onCompletion);
     };

    //For Operation 'deleteSCAScenario' with service id 'deleteSCAScenario8594'
     scaconfigandscenarios.deleteSCAScenario = function(params, onCompletion){
        return scaconfigandscenarios.customVerb('deleteSCAScenario', params, onCompletion);
     };

    var relations = [];

    scaconfigandscenarios.relations = relations;

    scaconfigandscenarios.prototype.isValid = function() {
        return scaconfigandscenarios.isValid(this);
    };

    scaconfigandscenarios.prototype.objModelName = "scaconfigandscenarios";
    scaconfigandscenarios.prototype.objServiceName = "SCAObjService";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    scaconfigandscenarios.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("SCAObjService", "scaconfigandscenarios", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    scaconfigandscenarios.clone = function(objectToClone) {
        var clonedObj = new scaconfigandscenarios();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return scaconfigandscenarios;
});