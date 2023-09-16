function AS_FlexContainer_f060a06b2a454e61a0577b070e30e355(eventobject, context) {
    var self = this;
    var self = this;
    var isHover = context.event !== "mouseout";
    var formName = eventobject.pf;
    var code = "";
    if (formName && formName === "frmDepositsDashboard") {
        code = eventobject.id.replace("depositsInfo", "");
    } else {
        code = eventobject.id.replace("loaninfo", "");
    }
    eventobject[code + "flxLoanAprDetails"].setVisibility(!isHover);
    eventobject[code + "flxApplyLoan"].setVisibility(isHover);
    eventobject[code + "lblLearnMore"].setVisibility(isHover);
    eventobject[code + "btnApplyLoan"].setVisibility(isHover);
    eventobject.skin = isHover ? "sknFlxBorder117eb0CustomRadius5px" : "sknFlxBordere1e5eedCustomRadius5px";
    self.view.forceLayout();
}