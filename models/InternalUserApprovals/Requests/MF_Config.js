/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"ApprovalRequestId": "ApprovalRequestId",
		"recordId": "recordId",
		"module": "module",
		"feature": "feature",
		"action": "action",
		"status": "status",
		"createdby": "createdby",
		"createdts": "createdts",
		"checkedBy": "checkedBy",
		"checkedts": "checkedts",
		"reason": "reason",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"opstatus": "opstatus",
		"httpstatuscode": "httpstatuscode",
		"pendingRequests": "pendingRequests",
		"pendingApprovals": "pendingApprovals",
		"approvalHistory": "approvalHistory",
		"requestHistory": "requestHistory",
		"searchStartDate": "searchStartDate",
		"searchEndDate": "searchEndDate",
		"sortOrder": "sortOrder",
		"sortParam": "sortParam",
		"pageSize": "pageSize",
		"pageOffset": "pageOffset",
	};

	Object.freeze(mappings);

	var typings = {
		"ApprovalRequestId": "string",
		"recordId": "string",
		"module": "string",
		"feature": "string",
		"action": "string",
		"status": "string",
		"createdby": "string",
		"createdts": "string",
		"checkedBy": "string",
		"checkedts": "string",
		"reason": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"opstatus": "string",
		"httpstatuscode": "string",
		"pendingRequests": "string",
		"pendingApprovals": "string",
		"approvalHistory": "string",
		"requestHistory": "string",
		"searchStartDate": "string",
		"searchEndDate": "string",
		"sortOrder": "string",
		"sortParam": "string",
		"pageSize": "string",
		"pageOffset": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"ApprovalRequestId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "InternalUserApprovals",
		tableName: "Requests"
	};

	Object.freeze(config);

	return config;
})