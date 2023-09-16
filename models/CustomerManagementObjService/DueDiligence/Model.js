/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "DueDiligence", "objectService" : "CustomerManagementObjService"};

    var setterFunctions = {
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        productNature: function(val, state) {
            context["field"] = "productNature";
            context["metadata"] = (objectMetadata ? objectMetadata["productNature"] : null);
            state['productNature'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionType: function(val, state) {
            context["field"] = "transactionType";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
            state['transactionType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        source: function(val, state) {
            context["field"] = "source";
            context["metadata"] = (objectMetadata ? objectMetadata["source"] : null);
            state['source'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sourceDate: function(val, state) {
            context["field"] = "sourceDate";
            context["metadata"] = (objectMetadata ? objectMetadata["sourceDate"] : null);
            state['sourceDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        intendedTransactionCountry: function(val, state) {
            context["field"] = "intendedTransactionCountry";
            context["metadata"] = (objectMetadata ? objectMetadata["intendedTransactionCountry"] : null);
            state['intendedTransactionCountry'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        estimatedVolume: function(val, state) {
            context["field"] = "estimatedVolume";
            context["metadata"] = (objectMetadata ? objectMetadata["estimatedVolume"] : null);
            state['estimatedVolume'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        estimatedTransactionNumber: function(val, state) {
            context["field"] = "estimatedTransactionNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["estimatedTransactionNumber"] : null);
            state['estimatedTransactionNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        frequency: function(val, state) {
            context["field"] = "frequency";
            context["metadata"] = (objectMetadata ? objectMetadata["frequency"] : null);
            state['frequency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        intentionsReference: function(val, state) {
            context["field"] = "intentionsReference";
            context["metadata"] = (objectMetadata ? objectMetadata["intentionsReference"] : null);
            state['intentionsReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        comments: function(val, state) {
            context["field"] = "comments";
            context["metadata"] = (objectMetadata ? objectMetadata["comments"] : null);
            state['comments'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function DueDiligence(defaultValues) {
        var privateState = {};
        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "productNature";
        context["metadata"] = (objectMetadata ? objectMetadata["productNature"] : null);
        privateState.productNature = defaultValues ?
            (defaultValues["productNature"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["productNature"], context) :
                null) :
            null;

        context["field"] = "transactionType";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
        privateState.transactionType = defaultValues ?
            (defaultValues["transactionType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionType"], context) :
                null) :
            null;

        context["field"] = "source";
        context["metadata"] = (objectMetadata ? objectMetadata["source"] : null);
        privateState.source = defaultValues ?
            (defaultValues["source"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["source"], context) :
                null) :
            null;

        context["field"] = "sourceDate";
        context["metadata"] = (objectMetadata ? objectMetadata["sourceDate"] : null);
        privateState.sourceDate = defaultValues ?
            (defaultValues["sourceDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sourceDate"], context) :
                null) :
            null;

        context["field"] = "intendedTransactionCountry";
        context["metadata"] = (objectMetadata ? objectMetadata["intendedTransactionCountry"] : null);
        privateState.intendedTransactionCountry = defaultValues ?
            (defaultValues["intendedTransactionCountry"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["intendedTransactionCountry"], context) :
                null) :
            null;

        context["field"] = "estimatedVolume";
        context["metadata"] = (objectMetadata ? objectMetadata["estimatedVolume"] : null);
        privateState.estimatedVolume = defaultValues ?
            (defaultValues["estimatedVolume"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["estimatedVolume"], context) :
                null) :
            null;

        context["field"] = "estimatedTransactionNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["estimatedTransactionNumber"] : null);
        privateState.estimatedTransactionNumber = defaultValues ?
            (defaultValues["estimatedTransactionNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["estimatedTransactionNumber"], context) :
                null) :
            null;

        context["field"] = "frequency";
        context["metadata"] = (objectMetadata ? objectMetadata["frequency"] : null);
        privateState.frequency = defaultValues ?
            (defaultValues["frequency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["frequency"], context) :
                null) :
            null;

        context["field"] = "intentionsReference";
        context["metadata"] = (objectMetadata ? objectMetadata["intentionsReference"] : null);
        privateState.intentionsReference = defaultValues ?
            (defaultValues["intentionsReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["intentionsReference"], context) :
                null) :
            null;

        context["field"] = "comments";
        context["metadata"] = (objectMetadata ? objectMetadata["comments"] : null);
        privateState.comments = defaultValues ?
            (defaultValues["comments"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["comments"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "id": {
                get: function() {
                    context["field"] = "id";
                    context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.id, context);
                },
                set: function(val) {
                    setterFunctions['id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "productNature": {
                get: function() {
                    context["field"] = "productNature";
                    context["metadata"] = (objectMetadata ? objectMetadata["productNature"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.productNature, context);
                },
                set: function(val) {
                    setterFunctions['productNature'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionType": {
                get: function() {
                    context["field"] = "transactionType";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionType, context);
                },
                set: function(val) {
                    setterFunctions['transactionType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "source": {
                get: function() {
                    context["field"] = "source";
                    context["metadata"] = (objectMetadata ? objectMetadata["source"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.source, context);
                },
                set: function(val) {
                    setterFunctions['source'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sourceDate": {
                get: function() {
                    context["field"] = "sourceDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["sourceDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sourceDate, context);
                },
                set: function(val) {
                    setterFunctions['sourceDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "intendedTransactionCountry": {
                get: function() {
                    context["field"] = "intendedTransactionCountry";
                    context["metadata"] = (objectMetadata ? objectMetadata["intendedTransactionCountry"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.intendedTransactionCountry, context);
                },
                set: function(val) {
                    setterFunctions['intendedTransactionCountry'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "estimatedVolume": {
                get: function() {
                    context["field"] = "estimatedVolume";
                    context["metadata"] = (objectMetadata ? objectMetadata["estimatedVolume"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.estimatedVolume, context);
                },
                set: function(val) {
                    setterFunctions['estimatedVolume'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "estimatedTransactionNumber": {
                get: function() {
                    context["field"] = "estimatedTransactionNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["estimatedTransactionNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.estimatedTransactionNumber, context);
                },
                set: function(val) {
                    setterFunctions['estimatedTransactionNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "frequency": {
                get: function() {
                    context["field"] = "frequency";
                    context["metadata"] = (objectMetadata ? objectMetadata["frequency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.frequency, context);
                },
                set: function(val) {
                    setterFunctions['frequency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "intentionsReference": {
                get: function() {
                    context["field"] = "intentionsReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["intentionsReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.intentionsReference, context);
                },
                set: function(val) {
                    setterFunctions['intentionsReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "comments": {
                get: function() {
                    context["field"] = "comments";
                    context["metadata"] = (objectMetadata ? objectMetadata["comments"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.comments, context);
                },
                set: function(val) {
                    setterFunctions['comments'].call(this, val, privateState);
                },
                enumerable: true,
            },
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.productNature = value ? (value["productNature"] ? value["productNature"] : null) : null;
            privateState.transactionType = value ? (value["transactionType"] ? value["transactionType"] : null) : null;
            privateState.source = value ? (value["source"] ? value["source"] : null) : null;
            privateState.sourceDate = value ? (value["sourceDate"] ? value["sourceDate"] : null) : null;
            privateState.intendedTransactionCountry = value ? (value["intendedTransactionCountry"] ? value["intendedTransactionCountry"] : null) : null;
            privateState.estimatedVolume = value ? (value["estimatedVolume"] ? value["estimatedVolume"] : null) : null;
            privateState.estimatedTransactionNumber = value ? (value["estimatedTransactionNumber"] ? value["estimatedTransactionNumber"] : null) : null;
            privateState.frequency = value ? (value["frequency"] ? value["frequency"] : null) : null;
            privateState.intentionsReference = value ? (value["intentionsReference"] ? value["intentionsReference"] : null) : null;
            privateState.comments = value ? (value["comments"] ? value["comments"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(DueDiligence);

    //Create new class level validator object
    BaseModel.Validator.call(DueDiligence);

    var registerValidatorBackup = DueDiligence.registerValidator;

    DueDiligence.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(DueDiligence.isValid(this, propName, val)) {
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
    //For Operation 'CreateEmploymentDetails' with service id 'CreateEmploymentDetails5545'
     DueDiligence.CreateEmploymentDetails = function(params, onCompletion){
        return DueDiligence.customVerb('CreateEmploymentDetails', params, onCompletion);
     };

    //For Operation 'CreateTaxDetails' with service id 'CreateTaxDetails5243'
     DueDiligence.CreateTaxDetails = function(params, onCompletion){
        return DueDiligence.customVerb('CreateTaxDetails', params, onCompletion);
     };

    //For Operation 'UpdateTaxDetails' with service id 'UpdateTaxDetails4792'
     DueDiligence.UpdateTaxDetails = function(params, onCompletion){
        return DueDiligence.customVerb('UpdateTaxDetails', params, onCompletion);
     };

    //For Operation 'GetDueDiligenceDetails' with service id 'GetDueDiligenceDetails5467'
     DueDiligence.GetDueDiligenceDetails = function(params, onCompletion){
        return DueDiligence.customVerb('GetDueDiligenceDetails', params, onCompletion);
     };

    //For Operation 'UpdateAccountUsage' with service id 'UpdateAccountUsage4660'
     DueDiligence.UpdateAccountUsage = function(params, onCompletion){
        return DueDiligence.customVerb('UpdateAccountUsage', params, onCompletion);
     };

    //For Operation 'UpdateEmploymentDetails' with service id 'UpdateEmploymentDetails2920'
     DueDiligence.UpdateEmploymentDetails = function(params, onCompletion){
        return DueDiligence.customVerb('UpdateEmploymentDetails', params, onCompletion);
     };

    //For Operation 'GetEmploymentDetails' with service id 'GetEmploymentDetails8939'
     DueDiligence.GetEmploymentDetails = function(params, onCompletion){
        return DueDiligence.customVerb('GetEmploymentDetails', params, onCompletion);
     };

    //For Operation 'UpdateCitizenshipDetails' with service id 'UpdateCitizenship4190'
     DueDiligence.UpdateCitizenshipDetails = function(params, onCompletion){
        return DueDiligence.customVerb('UpdateCitizenshipDetails', params, onCompletion);
     };

    //For Operation 'GetTaxDetails' with service id 'GetTaxDetails1679'
     DueDiligence.GetTaxDetails = function(params, onCompletion){
        return DueDiligence.customVerb('GetTaxDetails', params, onCompletion);
     };

    //For Operation 'GetAccountUsage' with service id 'GetAccountUsage7510'
     DueDiligence.GetAccountUsage = function(params, onCompletion){
        return DueDiligence.customVerb('GetAccountUsage', params, onCompletion);
     };

    //For Operation 'CreateAccountUsage' with service id 'CreateAccountUsage1909'
     DueDiligence.CreateAccountUsage = function(params, onCompletion){
        return DueDiligence.customVerb('CreateAccountUsage', params, onCompletion);
     };

    var relations = [];

    DueDiligence.relations = relations;

    DueDiligence.prototype.isValid = function() {
        return DueDiligence.isValid(this);
    };

    DueDiligence.prototype.objModelName = "DueDiligence";
    DueDiligence.prototype.objServiceName = "CustomerManagementObjService";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    DueDiligence.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CustomerManagementObjService", "DueDiligence", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    DueDiligence.clone = function(objectToClone) {
        var clonedObj = new DueDiligence();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return DueDiligence;
});