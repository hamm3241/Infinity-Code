function AS_Button_e1685424d4c6426b95ee8300041e29ac(eventobject) {
    var self = this;
    var self = this;
    var parentid = eventobject.parent.parent.parent.id;
    var editId = parentid.replace("view", "edit");
    if ($KG.__currentForm.flxViewLoanDetails) $KG.__currentForm.flxViewLoanDetails.setVisibility(false);
    if ($KG.__currentForm.flxEditLoanInformation) {
        $KG.__currentForm.flxEditLoanInformation.setVisibility(true);
        // $KG.__currentForm.flxEditLoanInformation.flxEditLoanInformation1.scrollToWidget($KG.__currentForm.flxEditLoanInformation.flxEditLoanInformation1[editId]);
    }
}