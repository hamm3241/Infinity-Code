define({
    /*
        This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_AppEvents_d9f275df03bb4f2c9c87f0aca8dac598: function AS_AppEvents_d9f275df03bb4f2c9c87f0aca8dac598(eventobject) {
        var self = this;
        var qpExists = window.location.href.indexOf("qp=");
        if (qpExists !== -1) {
            return "frmErrorLogin";
        } else {
            return "frmLogin";
        }
    },
    AS_AppEvents_hf8e5e479c1348dc9f9ed8e64ecde98e: function AS_AppEvents_hf8e5e479c1348dc9f9ed8e64ecde98e(eventobject) {
        var self = this;
        loadCommonFiles();
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
        clearCache();
    }
});