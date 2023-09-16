define(['ModelManager'], function (ModelManager) { 

  /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Delegator
     */
  function BusinessController() { 

    kony.mvc.Business.Delegator.call(this); 

  } 

  inheritsFrom(BusinessController, kony.mvc.Business.Delegator); 

  /**
   * @name getApprovalMatrix
   * @member ApprovalMatrixManageManager.businessController
   * @param {"contractId": ""}
   */
  BusinessController.prototype.getApprovalMatrix = function(context, onSuccess, onError) {
    ModelManager.invoke('ApprovalMatrix', 'getApprovalMatrix', context, onSuccess, onError);
  };
  /**
   * @name getApprovalMatrixByContractId
   * @member ApprovalMatrixManageManager.businessController
   * @param {"contractId": ""}
   */
  BusinessController.prototype.getApprovalMatrixByContractId = function(context, onSuccess, onError) {
    ModelManager.invoke('ApprovalMatrix', 'getApprovalMatrixByContractId', context, onSuccess, onError);
  };
  /**
   * @name getApprovalRules
   * @member ApprovalMatrixManageManager.businessController
   * @param {"contractId":"","cifId": "","accountId": "","featureId": "","actionId":"","limitTypeId": ""}
   */
  BusinessController.prototype.getApprovalRules = function(context, onSuccess, onError) {
    ModelManager.invoke('ApprovalMatrix', 'getApprovalRules', context, onSuccess, onError);
  };
  /**
   * @name getApprovalMatrix
   * @member ApprovalMatrixManageManager.businessController
   * @param {"signatoryGroupId":""}
   */
  BusinessController.prototype.getApproversInSignatoryGroup = function(context, onSuccess, onError) {
    ModelManager.invoke('ApprovalMatrix', 'getApproversInSignatoryGroup', context, onSuccess, onError);
  };
  /**
   * @name createApprovalRuleUserLevel
   * @member ApprovalMatrixManageManager.businessController
   */
  BusinessController.prototype.createApprovalRuleUserLevel = function(context, onSuccess, onError) {
    ModelManager.invoke('ApprovalMatrix', 'createApprovalRuleUserLevel', context, onSuccess, onError);
  };
  /**
   * @name createApprovalRuleSGLevel
   * @member ApprovalMatrixManageManager.businessController
   */
  BusinessController.prototype.createApprovalRuleSGLevel = function(context, onSuccess, onError) {
    ModelManager.invoke('ApprovalMatrix', 'createApprovalRuleSGLevel', context, onSuccess, onError);
  };
  /**
   * @name updateApprovalRuleUserLevel
   * @member ApprovalMatrixManageManager.businessController
   */
  BusinessController.prototype.updateApprovalRuleUserLevel = function(context, onSuccess, onError) {
    ModelManager.invoke('ApprovalMatrix', 'updateApprovalRuleUserLevel', context, onSuccess, onError);
  };
  /**
   * @name updateApprovalRuleSGLevel
   * @member ApprovalMatrixManageManager.businessController
   */
  BusinessController.prototype.updateApprovalRuleSGLevel = function(context, onSuccess, onError) {
    ModelManager.invoke('ApprovalMatrix', 'updateApprovalRuleSGLevel', context, onSuccess, onError);
  };
  /**
   * @name isApprovalMatrixDisabled
   * @member ApprovalMatrixManageManager.businessController
   */
  BusinessController.prototype.isApprovalMatrixDisabled = function(context, onSuccess, onError) {
    ModelManager.invoke('ApprovalMatrix', 'isApprovalMatrixDisabled', context, onSuccess, onError);
  };
  /**
   * @name updateApprovalMatrixStatus
   * @member ApprovalMatrixManageManager.businessController
   */
  BusinessController.prototype.updateApprovalMatrixStatus = function(context, onSuccess, onError) {
    ModelManager.invoke('ApprovalMatrix', 'updateApprovalMatrixStatus', context, onSuccess, onError);
  };
  /**
   * @name getAccountActionCustomerApproverList
   * @member ApprovalMatrixManageManager.businessController
   */
  BusinessController.prototype.getAccountActionCustomerApproverList = function(context, onSuccess, onError) {
    ModelManager.invoke('ApprovalMatrix', 'getAccountActionCustomerApproverList', context, onSuccess, onError);
  };

  return BusinessController;

});