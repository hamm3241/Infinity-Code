/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "LocationObject", "objectService" : "LocationObjService"};

    var setterFunctions = {
        Address_id: function(val, state) {
            context["field"] = "Address_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Address_id"] : null);
            state['Address_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Code: function(val, state) {
            context["field"] = "Code";
            context["metadata"] = (objectMetadata ? objectMetadata["Code"] : null);
            state['Code'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdby: function(val, state) {
            context["field"] = "createdby";
            context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
            state['createdby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdts: function(val, state) {
            context["field"] = "createdts";
            context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
            state['createdts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Description: function(val, state) {
            context["field"] = "Description";
            context["metadata"] = (objectMetadata ? objectMetadata["Description"] : null);
            state['Description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        DisplayName: function(val, state) {
            context["field"] = "DisplayName";
            context["metadata"] = (objectMetadata ? objectMetadata["DisplayName"] : null);
            state['DisplayName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        EmailId: function(val, state) {
            context["field"] = "EmailId";
            context["metadata"] = (objectMetadata ? objectMetadata["EmailId"] : null);
            state['EmailId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        IsMainBranch: function(val, state) {
            context["field"] = "IsMainBranch";
            context["metadata"] = (objectMetadata ? objectMetadata["IsMainBranch"] : null);
            state['IsMainBranch'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastmodifiedts: function(val, state) {
            context["field"] = "lastmodifiedts";
            context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
            state['lastmodifiedts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MainBranchCode: function(val, state) {
            context["field"] = "MainBranchCode";
            context["metadata"] = (objectMetadata ? objectMetadata["MainBranchCode"] : null);
            state['MainBranchCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        modifiedby: function(val, state) {
            context["field"] = "modifiedby";
            context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
            state['modifiedby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Name: function(val, state) {
            context["field"] = "Name";
            context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
            state['Name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        PhoneNumber: function(val, state) {
            context["field"] = "PhoneNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["PhoneNumber"] : null);
            state['PhoneNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        softdeleteflag: function(val, state) {
            context["field"] = "softdeleteflag";
            context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
            state['softdeleteflag'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Status_id: function(val, state) {
            context["field"] = "Status_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Status_id"] : null);
            state['Status_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        synctimestamp: function(val, state) {
            context["field"] = "synctimestamp";
            context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
            state['synctimestamp'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Type_id: function(val, state) {
            context["field"] = "Type_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Type_id"] : null);
            state['Type_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        WebSiteUrl: function(val, state) {
            context["field"] = "WebSiteUrl";
            context["metadata"] = (objectMetadata ? objectMetadata["WebSiteUrl"] : null);
            state['WebSiteUrl'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        WorkingDays: function(val, state) {
            context["field"] = "WorkingDays";
            context["metadata"] = (objectMetadata ? objectMetadata["WorkingDays"] : null);
            state['WorkingDays'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        WorkSchedule_id: function(val, state) {
            context["field"] = "WorkSchedule_id";
            context["metadata"] = (objectMetadata ? objectMetadata["WorkSchedule_id"] : null);
            state['WorkSchedule_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function LocationObject(defaultValues) {
        var privateState = {};
        context["field"] = "Address_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Address_id"] : null);
        privateState.Address_id = defaultValues ?
            (defaultValues["Address_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Address_id"], context) :
                null) :
            null;

        context["field"] = "Code";
        context["metadata"] = (objectMetadata ? objectMetadata["Code"] : null);
        privateState.Code = defaultValues ?
            (defaultValues["Code"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Code"], context) :
                null) :
            null;

        context["field"] = "createdby";
        context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
        privateState.createdby = defaultValues ?
            (defaultValues["createdby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdby"], context) :
                null) :
            null;

        context["field"] = "createdts";
        context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
        privateState.createdts = defaultValues ?
            (defaultValues["createdts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdts"], context) :
                null) :
            null;

        context["field"] = "Description";
        context["metadata"] = (objectMetadata ? objectMetadata["Description"] : null);
        privateState.Description = defaultValues ?
            (defaultValues["Description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Description"], context) :
                null) :
            null;

        context["field"] = "DisplayName";
        context["metadata"] = (objectMetadata ? objectMetadata["DisplayName"] : null);
        privateState.DisplayName = defaultValues ?
            (defaultValues["DisplayName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["DisplayName"], context) :
                null) :
            null;

        context["field"] = "EmailId";
        context["metadata"] = (objectMetadata ? objectMetadata["EmailId"] : null);
        privateState.EmailId = defaultValues ?
            (defaultValues["EmailId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["EmailId"], context) :
                null) :
            null;

        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "IsMainBranch";
        context["metadata"] = (objectMetadata ? objectMetadata["IsMainBranch"] : null);
        privateState.IsMainBranch = defaultValues ?
            (defaultValues["IsMainBranch"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["IsMainBranch"], context) :
                null) :
            null;

        context["field"] = "lastmodifiedts";
        context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
        privateState.lastmodifiedts = defaultValues ?
            (defaultValues["lastmodifiedts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastmodifiedts"], context) :
                null) :
            null;

        context["field"] = "MainBranchCode";
        context["metadata"] = (objectMetadata ? objectMetadata["MainBranchCode"] : null);
        privateState.MainBranchCode = defaultValues ?
            (defaultValues["MainBranchCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MainBranchCode"], context) :
                null) :
            null;

        context["field"] = "modifiedby";
        context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
        privateState.modifiedby = defaultValues ?
            (defaultValues["modifiedby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["modifiedby"], context) :
                null) :
            null;

        context["field"] = "Name";
        context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
        privateState.Name = defaultValues ?
            (defaultValues["Name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Name"], context) :
                null) :
            null;

        context["field"] = "PhoneNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["PhoneNumber"] : null);
        privateState.PhoneNumber = defaultValues ?
            (defaultValues["PhoneNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["PhoneNumber"], context) :
                null) :
            null;

        context["field"] = "softdeleteflag";
        context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
        privateState.softdeleteflag = defaultValues ?
            (defaultValues["softdeleteflag"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["softdeleteflag"], context) :
                null) :
            null;

        context["field"] = "Status_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Status_id"] : null);
        privateState.Status_id = defaultValues ?
            (defaultValues["Status_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Status_id"], context) :
                null) :
            null;

        context["field"] = "synctimestamp";
        context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
        privateState.synctimestamp = defaultValues ?
            (defaultValues["synctimestamp"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["synctimestamp"], context) :
                null) :
            null;

        context["field"] = "Type_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Type_id"] : null);
        privateState.Type_id = defaultValues ?
            (defaultValues["Type_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Type_id"], context) :
                null) :
            null;

        context["field"] = "WebSiteUrl";
        context["metadata"] = (objectMetadata ? objectMetadata["WebSiteUrl"] : null);
        privateState.WebSiteUrl = defaultValues ?
            (defaultValues["WebSiteUrl"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["WebSiteUrl"], context) :
                null) :
            null;

        context["field"] = "WorkingDays";
        context["metadata"] = (objectMetadata ? objectMetadata["WorkingDays"] : null);
        privateState.WorkingDays = defaultValues ?
            (defaultValues["WorkingDays"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["WorkingDays"], context) :
                null) :
            null;

        context["field"] = "WorkSchedule_id";
        context["metadata"] = (objectMetadata ? objectMetadata["WorkSchedule_id"] : null);
        privateState.WorkSchedule_id = defaultValues ?
            (defaultValues["WorkSchedule_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["WorkSchedule_id"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "Address_id": {
                get: function() {
                    context["field"] = "Address_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Address_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Address_id, context);
                },
                set: function(val) {
                    setterFunctions['Address_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Code": {
                get: function() {
                    context["field"] = "Code";
                    context["metadata"] = (objectMetadata ? objectMetadata["Code"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Code, context);
                },
                set: function(val) {
                    setterFunctions['Code'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "createdby": {
                get: function() {
                    context["field"] = "createdby";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdby, context);
                },
                set: function(val) {
                    setterFunctions['createdby'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "createdts": {
                get: function() {
                    context["field"] = "createdts";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdts, context);
                },
                set: function(val) {
                    setterFunctions['createdts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Description": {
                get: function() {
                    context["field"] = "Description";
                    context["metadata"] = (objectMetadata ? objectMetadata["Description"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Description, context);
                },
                set: function(val) {
                    setterFunctions['Description'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "DisplayName": {
                get: function() {
                    context["field"] = "DisplayName";
                    context["metadata"] = (objectMetadata ? objectMetadata["DisplayName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.DisplayName, context);
                },
                set: function(val) {
                    setterFunctions['DisplayName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "EmailId": {
                get: function() {
                    context["field"] = "EmailId";
                    context["metadata"] = (objectMetadata ? objectMetadata["EmailId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.EmailId, context);
                },
                set: function(val) {
                    setterFunctions['EmailId'].call(this, val, privateState);
                },
                enumerable: true,
            },
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
            "IsMainBranch": {
                get: function() {
                    context["field"] = "IsMainBranch";
                    context["metadata"] = (objectMetadata ? objectMetadata["IsMainBranch"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.IsMainBranch, context);
                },
                set: function(val) {
                    setterFunctions['IsMainBranch'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastmodifiedts": {
                get: function() {
                    context["field"] = "lastmodifiedts";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastmodifiedts, context);
                },
                set: function(val) {
                    setterFunctions['lastmodifiedts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MainBranchCode": {
                get: function() {
                    context["field"] = "MainBranchCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["MainBranchCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MainBranchCode, context);
                },
                set: function(val) {
                    setterFunctions['MainBranchCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "modifiedby": {
                get: function() {
                    context["field"] = "modifiedby";
                    context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.modifiedby, context);
                },
                set: function(val) {
                    setterFunctions['modifiedby'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Name": {
                get: function() {
                    context["field"] = "Name";
                    context["metadata"] = (objectMetadata ? objectMetadata["Name"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Name, context);
                },
                set: function(val) {
                    setterFunctions['Name'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "PhoneNumber": {
                get: function() {
                    context["field"] = "PhoneNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["PhoneNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.PhoneNumber, context);
                },
                set: function(val) {
                    setterFunctions['PhoneNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "softdeleteflag": {
                get: function() {
                    context["field"] = "softdeleteflag";
                    context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.softdeleteflag, context);
                },
                set: function(val) {
                    setterFunctions['softdeleteflag'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Status_id": {
                get: function() {
                    context["field"] = "Status_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Status_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Status_id, context);
                },
                set: function(val) {
                    setterFunctions['Status_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "synctimestamp": {
                get: function() {
                    context["field"] = "synctimestamp";
                    context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.synctimestamp, context);
                },
                set: function(val) {
                    setterFunctions['synctimestamp'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Type_id": {
                get: function() {
                    context["field"] = "Type_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Type_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Type_id, context);
                },
                set: function(val) {
                    setterFunctions['Type_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "WebSiteUrl": {
                get: function() {
                    context["field"] = "WebSiteUrl";
                    context["metadata"] = (objectMetadata ? objectMetadata["WebSiteUrl"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.WebSiteUrl, context);
                },
                set: function(val) {
                    setterFunctions['WebSiteUrl'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "WorkingDays": {
                get: function() {
                    context["field"] = "WorkingDays";
                    context["metadata"] = (objectMetadata ? objectMetadata["WorkingDays"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.WorkingDays, context);
                },
                set: function(val) {
                    setterFunctions['WorkingDays'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "WorkSchedule_id": {
                get: function() {
                    context["field"] = "WorkSchedule_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["WorkSchedule_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.WorkSchedule_id, context);
                },
                set: function(val) {
                    setterFunctions['WorkSchedule_id'].call(this, val, privateState);
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
            privateState.Address_id = value ? (value["Address_id"] ? value["Address_id"] : null) : null;
            privateState.Code = value ? (value["Code"] ? value["Code"] : null) : null;
            privateState.createdby = value ? (value["createdby"] ? value["createdby"] : null) : null;
            privateState.createdts = value ? (value["createdts"] ? value["createdts"] : null) : null;
            privateState.Description = value ? (value["Description"] ? value["Description"] : null) : null;
            privateState.DisplayName = value ? (value["DisplayName"] ? value["DisplayName"] : null) : null;
            privateState.EmailId = value ? (value["EmailId"] ? value["EmailId"] : null) : null;
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.IsMainBranch = value ? (value["IsMainBranch"] ? value["IsMainBranch"] : null) : null;
            privateState.lastmodifiedts = value ? (value["lastmodifiedts"] ? value["lastmodifiedts"] : null) : null;
            privateState.MainBranchCode = value ? (value["MainBranchCode"] ? value["MainBranchCode"] : null) : null;
            privateState.modifiedby = value ? (value["modifiedby"] ? value["modifiedby"] : null) : null;
            privateState.Name = value ? (value["Name"] ? value["Name"] : null) : null;
            privateState.PhoneNumber = value ? (value["PhoneNumber"] ? value["PhoneNumber"] : null) : null;
            privateState.softdeleteflag = value ? (value["softdeleteflag"] ? value["softdeleteflag"] : null) : null;
            privateState.Status_id = value ? (value["Status_id"] ? value["Status_id"] : null) : null;
            privateState.synctimestamp = value ? (value["synctimestamp"] ? value["synctimestamp"] : null) : null;
            privateState.Type_id = value ? (value["Type_id"] ? value["Type_id"] : null) : null;
            privateState.WebSiteUrl = value ? (value["WebSiteUrl"] ? value["WebSiteUrl"] : null) : null;
            privateState.WorkingDays = value ? (value["WorkingDays"] ? value["WorkingDays"] : null) : null;
            privateState.WorkSchedule_id = value ? (value["WorkSchedule_id"] ? value["WorkSchedule_id"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(LocationObject);

    //Create new class level validator object
    BaseModel.Validator.call(LocationObject);

    var registerValidatorBackup = LocationObject.registerValidator;

    LocationObject.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(LocationObject.isValid(this, propName, val)) {
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
    //For Operation 'getLocationDetails' with service id 'GetLocationDetails4630'
     LocationObject.getLocationDetails = function(params, onCompletion){
        return LocationObject.customVerb('getLocationDetails', params, onCompletion);
     };

    //For Operation 'getFilteredLocations' with service id 'FilteredLocationsGetService3799'
     LocationObject.getFilteredLocations = function(params, onCompletion){
        return LocationObject.customVerb('getFilteredLocations', params, onCompletion);
     };

    //For Operation 'getBranchDetails' with service id 'getBranchDetails4659'
     LocationObject.getBranchDetails = function(params, onCompletion){
        return LocationObject.customVerb('getBranchDetails', params, onCompletion);
     };

    //For Operation 'getAddressSuggestions' with service id 'getAddressSuggestions4994'
     LocationObject.getAddressSuggestions = function(params, onCompletion){
        return LocationObject.customVerb('getAddressSuggestions', params, onCompletion);
     };

    //For Operation 'getLocations' with service id 'getLocation7929'
     LocationObject.getLocations = function(params, onCompletion){
        return LocationObject.customVerb('getLocations', params, onCompletion);
     };

    //For Operation 'downloadLocationsList' with service id 'downloadLocationsList5500'
     LocationObject.downloadLocationsList = function(params, onCompletion){
        return LocationObject.customVerb('downloadLocationsList', params, onCompletion);
     };

    //For Operation 'getATMDetails' with service id 'getATMDetails6336'
     LocationObject.getATMDetails = function(params, onCompletion){
        return LocationObject.customVerb('getATMDetails', params, onCompletion);
     };

    //For Operation 'getLocationRange' with service id 'GetLocationRangeDetails5443'
     LocationObject.getLocationRange = function(params, onCompletion){
        return LocationObject.customVerb('getLocationRange', params, onCompletion);
     };

    //For Operation 'getSearchedLocation' with service id 'GetSearchedLocation2720'
     LocationObject.getSearchedLocation = function(params, onCompletion){
        return LocationObject.customVerb('getSearchedLocation', params, onCompletion);
     };

    //For Operation 'getLocationAddress' with service id 'GetLocationAddress2917'
     LocationObject.getLocationAddress = function(params, onCompletion){
        return LocationObject.customVerb('getLocationAddress', params, onCompletion);
     };

    var relations = [];

    LocationObject.relations = relations;

    LocationObject.prototype.isValid = function() {
        return LocationObject.isValid(this);
    };

    LocationObject.prototype.objModelName = "LocationObject";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    LocationObject.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("LocationObjService", "LocationObject", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    LocationObject.clone = function(objectToClone) {
        var clonedObj = new LocationObject();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return LocationObject;
});