/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Requests", "objectService" : "InternalUserApprovals"};

    var setterFunctions = {
        ApprovalRequestId: function(val, state) {
            context["field"] = "ApprovalRequestId";
            context["metadata"] = (objectMetadata ? objectMetadata["ApprovalRequestId"] : null);
            state['ApprovalRequestId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        recordId: function(val, state) {
            context["field"] = "recordId";
            context["metadata"] = (objectMetadata ? objectMetadata["recordId"] : null);
            state['recordId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        module: function(val, state) {
            context["field"] = "module";
            context["metadata"] = (objectMetadata ? objectMetadata["module"] : null);
            state['module'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        feature: function(val, state) {
            context["field"] = "feature";
            context["metadata"] = (objectMetadata ? objectMetadata["feature"] : null);
            state['feature'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        action: function(val, state) {
            context["field"] = "action";
            context["metadata"] = (objectMetadata ? objectMetadata["action"] : null);
            state['action'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        checkedBy: function(val, state) {
            context["field"] = "checkedBy";
            context["metadata"] = (objectMetadata ? objectMetadata["checkedBy"] : null);
            state['checkedBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        checkedts: function(val, state) {
            context["field"] = "checkedts";
            context["metadata"] = (objectMetadata ? objectMetadata["checkedts"] : null);
            state['checkedts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reason: function(val, state) {
            context["field"] = "reason";
            context["metadata"] = (objectMetadata ? objectMetadata["reason"] : null);
            state['reason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrCode: function(val, state) {
            context["field"] = "dbpErrCode";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
            state['dbpErrCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrMsg: function(val, state) {
            context["field"] = "dbpErrMsg";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
            state['dbpErrMsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        opstatus: function(val, state) {
            context["field"] = "opstatus";
            context["metadata"] = (objectMetadata ? objectMetadata["opstatus"] : null);
            state['opstatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        httpstatuscode: function(val, state) {
            context["field"] = "httpstatuscode";
            context["metadata"] = (objectMetadata ? objectMetadata["httpstatuscode"] : null);
            state['httpstatuscode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pendingRequests: function(val, state) {
            context["field"] = "pendingRequests";
            context["metadata"] = (objectMetadata ? objectMetadata["pendingRequests"] : null);
            state['pendingRequests'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pendingApprovals: function(val, state) {
            context["field"] = "pendingApprovals";
            context["metadata"] = (objectMetadata ? objectMetadata["pendingApprovals"] : null);
            state['pendingApprovals'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        approvalHistory: function(val, state) {
            context["field"] = "approvalHistory";
            context["metadata"] = (objectMetadata ? objectMetadata["approvalHistory"] : null);
            state['approvalHistory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestHistory: function(val, state) {
            context["field"] = "requestHistory";
            context["metadata"] = (objectMetadata ? objectMetadata["requestHistory"] : null);
            state['requestHistory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchStartDate: function(val, state) {
            context["field"] = "searchStartDate";
            context["metadata"] = (objectMetadata ? objectMetadata["searchStartDate"] : null);
            state['searchStartDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchEndDate: function(val, state) {
            context["field"] = "searchEndDate";
            context["metadata"] = (objectMetadata ? objectMetadata["searchEndDate"] : null);
            state['searchEndDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortOrder: function(val, state) {
            context["field"] = "sortOrder";
            context["metadata"] = (objectMetadata ? objectMetadata["sortOrder"] : null);
            state['sortOrder'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortParam: function(val, state) {
            context["field"] = "sortParam";
            context["metadata"] = (objectMetadata ? objectMetadata["sortParam"] : null);
            state['sortParam'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pageSize: function(val, state) {
            context["field"] = "pageSize";
            context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
            state['pageSize'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pageOffset: function(val, state) {
            context["field"] = "pageOffset";
            context["metadata"] = (objectMetadata ? objectMetadata["pageOffset"] : null);
            state['pageOffset'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Requests(defaultValues) {
        var privateState = {};
        context["field"] = "ApprovalRequestId";
        context["metadata"] = (objectMetadata ? objectMetadata["ApprovalRequestId"] : null);
        privateState.ApprovalRequestId = defaultValues ?
            (defaultValues["ApprovalRequestId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ApprovalRequestId"], context) :
                null) :
            null;

        context["field"] = "recordId";
        context["metadata"] = (objectMetadata ? objectMetadata["recordId"] : null);
        privateState.recordId = defaultValues ?
            (defaultValues["recordId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["recordId"], context) :
                null) :
            null;

        context["field"] = "module";
        context["metadata"] = (objectMetadata ? objectMetadata["module"] : null);
        privateState.module = defaultValues ?
            (defaultValues["module"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["module"], context) :
                null) :
            null;

        context["field"] = "feature";
        context["metadata"] = (objectMetadata ? objectMetadata["feature"] : null);
        privateState.feature = defaultValues ?
            (defaultValues["feature"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["feature"], context) :
                null) :
            null;

        context["field"] = "action";
        context["metadata"] = (objectMetadata ? objectMetadata["action"] : null);
        privateState.action = defaultValues ?
            (defaultValues["action"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["action"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
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

        context["field"] = "checkedBy";
        context["metadata"] = (objectMetadata ? objectMetadata["checkedBy"] : null);
        privateState.checkedBy = defaultValues ?
            (defaultValues["checkedBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["checkedBy"], context) :
                null) :
            null;

        context["field"] = "checkedts";
        context["metadata"] = (objectMetadata ? objectMetadata["checkedts"] : null);
        privateState.checkedts = defaultValues ?
            (defaultValues["checkedts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["checkedts"], context) :
                null) :
            null;

        context["field"] = "reason";
        context["metadata"] = (objectMetadata ? objectMetadata["reason"] : null);
        privateState.reason = defaultValues ?
            (defaultValues["reason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reason"], context) :
                null) :
            null;

        context["field"] = "dbpErrCode";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
        privateState.dbpErrCode = defaultValues ?
            (defaultValues["dbpErrCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrCode"], context) :
                null) :
            null;

        context["field"] = "dbpErrMsg";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
        privateState.dbpErrMsg = defaultValues ?
            (defaultValues["dbpErrMsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrMsg"], context) :
                null) :
            null;

        context["field"] = "opstatus";
        context["metadata"] = (objectMetadata ? objectMetadata["opstatus"] : null);
        privateState.opstatus = defaultValues ?
            (defaultValues["opstatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["opstatus"], context) :
                null) :
            null;

        context["field"] = "httpstatuscode";
        context["metadata"] = (objectMetadata ? objectMetadata["httpstatuscode"] : null);
        privateState.httpstatuscode = defaultValues ?
            (defaultValues["httpstatuscode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["httpstatuscode"], context) :
                null) :
            null;

        context["field"] = "pendingRequests";
        context["metadata"] = (objectMetadata ? objectMetadata["pendingRequests"] : null);
        privateState.pendingRequests = defaultValues ?
            (defaultValues["pendingRequests"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pendingRequests"], context) :
                null) :
            null;

        context["field"] = "pendingApprovals";
        context["metadata"] = (objectMetadata ? objectMetadata["pendingApprovals"] : null);
        privateState.pendingApprovals = defaultValues ?
            (defaultValues["pendingApprovals"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pendingApprovals"], context) :
                null) :
            null;

        context["field"] = "approvalHistory";
        context["metadata"] = (objectMetadata ? objectMetadata["approvalHistory"] : null);
        privateState.approvalHistory = defaultValues ?
            (defaultValues["approvalHistory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["approvalHistory"], context) :
                null) :
            null;

        context["field"] = "requestHistory";
        context["metadata"] = (objectMetadata ? objectMetadata["requestHistory"] : null);
        privateState.requestHistory = defaultValues ?
            (defaultValues["requestHistory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestHistory"], context) :
                null) :
            null;

        context["field"] = "searchStartDate";
        context["metadata"] = (objectMetadata ? objectMetadata["searchStartDate"] : null);
        privateState.searchStartDate = defaultValues ?
            (defaultValues["searchStartDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchStartDate"], context) :
                null) :
            null;

        context["field"] = "searchEndDate";
        context["metadata"] = (objectMetadata ? objectMetadata["searchEndDate"] : null);
        privateState.searchEndDate = defaultValues ?
            (defaultValues["searchEndDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchEndDate"], context) :
                null) :
            null;

        context["field"] = "sortOrder";
        context["metadata"] = (objectMetadata ? objectMetadata["sortOrder"] : null);
        privateState.sortOrder = defaultValues ?
            (defaultValues["sortOrder"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortOrder"], context) :
                null) :
            null;

        context["field"] = "sortParam";
        context["metadata"] = (objectMetadata ? objectMetadata["sortParam"] : null);
        privateState.sortParam = defaultValues ?
            (defaultValues["sortParam"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortParam"], context) :
                null) :
            null;

        context["field"] = "pageSize";
        context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
        privateState.pageSize = defaultValues ?
            (defaultValues["pageSize"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pageSize"], context) :
                null) :
            null;

        context["field"] = "pageOffset";
        context["metadata"] = (objectMetadata ? objectMetadata["pageOffset"] : null);
        privateState.pageOffset = defaultValues ?
            (defaultValues["pageOffset"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pageOffset"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "ApprovalRequestId": {
                get: function() {
                    context["field"] = "ApprovalRequestId";
                    context["metadata"] = (objectMetadata ? objectMetadata["ApprovalRequestId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ApprovalRequestId, context);
                },
                set: function(val) {
                    setterFunctions['ApprovalRequestId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "recordId": {
                get: function() {
                    context["field"] = "recordId";
                    context["metadata"] = (objectMetadata ? objectMetadata["recordId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.recordId, context);
                },
                set: function(val) {
                    setterFunctions['recordId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "module": {
                get: function() {
                    context["field"] = "module";
                    context["metadata"] = (objectMetadata ? objectMetadata["module"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.module, context);
                },
                set: function(val) {
                    setterFunctions['module'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "feature": {
                get: function() {
                    context["field"] = "feature";
                    context["metadata"] = (objectMetadata ? objectMetadata["feature"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.feature, context);
                },
                set: function(val) {
                    setterFunctions['feature'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "action": {
                get: function() {
                    context["field"] = "action";
                    context["metadata"] = (objectMetadata ? objectMetadata["action"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.action, context);
                },
                set: function(val) {
                    setterFunctions['action'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "status": {
                get: function() {
                    context["field"] = "status";
                    context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.status, context);
                },
                set: function(val) {
                    setterFunctions['status'].call(this, val, privateState);
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
            "checkedBy": {
                get: function() {
                    context["field"] = "checkedBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["checkedBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.checkedBy, context);
                },
                set: function(val) {
                    setterFunctions['checkedBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "checkedts": {
                get: function() {
                    context["field"] = "checkedts";
                    context["metadata"] = (objectMetadata ? objectMetadata["checkedts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.checkedts, context);
                },
                set: function(val) {
                    setterFunctions['checkedts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reason": {
                get: function() {
                    context["field"] = "reason";
                    context["metadata"] = (objectMetadata ? objectMetadata["reason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reason, context);
                },
                set: function(val) {
                    setterFunctions['reason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dbpErrCode": {
                get: function() {
                    context["field"] = "dbpErrCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dbpErrCode, context);
                },
                set: function(val) {
                    setterFunctions['dbpErrCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dbpErrMsg": {
                get: function() {
                    context["field"] = "dbpErrMsg";
                    context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dbpErrMsg, context);
                },
                set: function(val) {
                    setterFunctions['dbpErrMsg'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "opstatus": {
                get: function() {
                    context["field"] = "opstatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["opstatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.opstatus, context);
                },
                set: function(val) {
                    setterFunctions['opstatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "httpstatuscode": {
                get: function() {
                    context["field"] = "httpstatuscode";
                    context["metadata"] = (objectMetadata ? objectMetadata["httpstatuscode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.httpstatuscode, context);
                },
                set: function(val) {
                    setterFunctions['httpstatuscode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pendingRequests": {
                get: function() {
                    context["field"] = "pendingRequests";
                    context["metadata"] = (objectMetadata ? objectMetadata["pendingRequests"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pendingRequests, context);
                },
                set: function(val) {
                    setterFunctions['pendingRequests'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pendingApprovals": {
                get: function() {
                    context["field"] = "pendingApprovals";
                    context["metadata"] = (objectMetadata ? objectMetadata["pendingApprovals"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pendingApprovals, context);
                },
                set: function(val) {
                    setterFunctions['pendingApprovals'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "approvalHistory": {
                get: function() {
                    context["field"] = "approvalHistory";
                    context["metadata"] = (objectMetadata ? objectMetadata["approvalHistory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.approvalHistory, context);
                },
                set: function(val) {
                    setterFunctions['approvalHistory'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestHistory": {
                get: function() {
                    context["field"] = "requestHistory";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestHistory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestHistory, context);
                },
                set: function(val) {
                    setterFunctions['requestHistory'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchStartDate": {
                get: function() {
                    context["field"] = "searchStartDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchStartDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchStartDate, context);
                },
                set: function(val) {
                    setterFunctions['searchStartDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchEndDate": {
                get: function() {
                    context["field"] = "searchEndDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchEndDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchEndDate, context);
                },
                set: function(val) {
                    setterFunctions['searchEndDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sortOrder": {
                get: function() {
                    context["field"] = "sortOrder";
                    context["metadata"] = (objectMetadata ? objectMetadata["sortOrder"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sortOrder, context);
                },
                set: function(val) {
                    setterFunctions['sortOrder'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sortParam": {
                get: function() {
                    context["field"] = "sortParam";
                    context["metadata"] = (objectMetadata ? objectMetadata["sortParam"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sortParam, context);
                },
                set: function(val) {
                    setterFunctions['sortParam'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pageSize": {
                get: function() {
                    context["field"] = "pageSize";
                    context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pageSize, context);
                },
                set: function(val) {
                    setterFunctions['pageSize'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pageOffset": {
                get: function() {
                    context["field"] = "pageOffset";
                    context["metadata"] = (objectMetadata ? objectMetadata["pageOffset"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pageOffset, context);
                },
                set: function(val) {
                    setterFunctions['pageOffset'].call(this, val, privateState);
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
            privateState.ApprovalRequestId = value ? (value["ApprovalRequestId"] ? value["ApprovalRequestId"] : null) : null;
            privateState.recordId = value ? (value["recordId"] ? value["recordId"] : null) : null;
            privateState.module = value ? (value["module"] ? value["module"] : null) : null;
            privateState.feature = value ? (value["feature"] ? value["feature"] : null) : null;
            privateState.action = value ? (value["action"] ? value["action"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.createdby = value ? (value["createdby"] ? value["createdby"] : null) : null;
            privateState.createdts = value ? (value["createdts"] ? value["createdts"] : null) : null;
            privateState.checkedBy = value ? (value["checkedBy"] ? value["checkedBy"] : null) : null;
            privateState.checkedts = value ? (value["checkedts"] ? value["checkedts"] : null) : null;
            privateState.reason = value ? (value["reason"] ? value["reason"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.opstatus = value ? (value["opstatus"] ? value["opstatus"] : null) : null;
            privateState.httpstatuscode = value ? (value["httpstatuscode"] ? value["httpstatuscode"] : null) : null;
            privateState.pendingRequests = value ? (value["pendingRequests"] ? value["pendingRequests"] : null) : null;
            privateState.pendingApprovals = value ? (value["pendingApprovals"] ? value["pendingApprovals"] : null) : null;
            privateState.approvalHistory = value ? (value["approvalHistory"] ? value["approvalHistory"] : null) : null;
            privateState.requestHistory = value ? (value["requestHistory"] ? value["requestHistory"] : null) : null;
            privateState.searchStartDate = value ? (value["searchStartDate"] ? value["searchStartDate"] : null) : null;
            privateState.searchEndDate = value ? (value["searchEndDate"] ? value["searchEndDate"] : null) : null;
            privateState.sortOrder = value ? (value["sortOrder"] ? value["sortOrder"] : null) : null;
            privateState.sortParam = value ? (value["sortParam"] ? value["sortParam"] : null) : null;
            privateState.pageSize = value ? (value["pageSize"] ? value["pageSize"] : null) : null;
            privateState.pageOffset = value ? (value["pageOffset"] ? value["pageOffset"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Requests);

    //Create new class level validator object
    BaseModel.Validator.call(Requests);

    var registerValidatorBackup = Requests.registerValidator;

    Requests.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Requests.isValid(this, propName, val)) {
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
    //For Operation 'PendingApprovals' with service id 'FetchAllPendingApprovals5010'
     Requests.PendingApprovals = function(params, onCompletion){
        return Requests.customVerb('PendingApprovals', params, onCompletion);
     };

    //For Operation 'getCounts' with service id 'FetchDashboardCounts4953'
     Requests.getCounts = function(params, onCompletion){
        return Requests.customVerb('getCounts', params, onCompletion);
     };

    //For Operation 'ApprovalHistory' with service id 'FetchAllApprovalHistory8279'
     Requests.ApprovalHistory = function(params, onCompletion){
        return Requests.customVerb('ApprovalHistory', params, onCompletion);
     };

    var relations = [];

    Requests.relations = relations;

    Requests.prototype.isValid = function() {
        return Requests.isValid(this);
    };

    Requests.prototype.objModelName = "Requests";
    Requests.prototype.objServiceName = "InternalUserApprovals";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Requests.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("InternalUserApprovals", "Requests", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Requests.clone = function(objectToClone) {
        var clonedObj = new Requests();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Requests;
});