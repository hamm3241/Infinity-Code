/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "LocationsUsingCSV", "objectService" : "LocationObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function LocationsUsingCSV(defaultValues) {
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
    BaseModel.isParentOf(LocationsUsingCSV);

    //Create new class level validator object
    BaseModel.Validator.call(LocationsUsingCSV);

    var registerValidatorBackup = LocationsUsingCSV.registerValidator;

    LocationsUsingCSV.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(LocationsUsingCSV.isValid(this, propName, val)) {
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
    //For Operation 'downloadLocationCSV' with service id 'downloadLocationCSV1674'
     LocationsUsingCSV.downloadLocationCSV = function(params, onCompletion){
        return LocationsUsingCSV.customVerb('downloadLocationCSV', params, onCompletion);
     };

    //For Operation 'importLocations' with service id 'importLocations4486'
     LocationsUsingCSV.importLocations = function(params, onCompletion){
        return LocationsUsingCSV.customVerb('importLocations', params, onCompletion);
     };

    //For Operation 'getImportLocationsStatus' with service id 'getImportLocationsStatus6540'
     LocationsUsingCSV.getImportLocationsStatus = function(params, onCompletion){
        return LocationsUsingCSV.customVerb('getImportLocationsStatus', params, onCompletion);
     };

    //For Operation 'downloadLocationsCSV' with service id 'downloadLocationsCSV5844'
     LocationsUsingCSV.downloadLocationsCSV = function(params, onCompletion){
        return LocationsUsingCSV.customVerb('downloadLocationsCSV', params, onCompletion);
     };

    //For Operation 'generateLocationsCSV' with service id 'generateLocationsCSV9237'
     LocationsUsingCSV.generateLocationsCSV = function(params, onCompletion){
        return LocationsUsingCSV.customVerb('generateLocationsCSV', params, onCompletion);
     };

    var relations = [];

    LocationsUsingCSV.relations = relations;

    LocationsUsingCSV.prototype.isValid = function() {
        return LocationsUsingCSV.isValid(this);
    };

    LocationsUsingCSV.prototype.objModelName = "LocationsUsingCSV";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    LocationsUsingCSV.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("LocationObjService", "LocationsUsingCSV", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    LocationsUsingCSV.clone = function(objectToClone) {
        var clonedObj = new LocationsUsingCSV();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return LocationsUsingCSV;
});