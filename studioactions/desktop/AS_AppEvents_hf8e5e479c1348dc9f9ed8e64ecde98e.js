function AS_AppEvents_hf8e5e479c1348dc9f9ed8e64ecde98e(eventobject) {
    var self = this;
    loadCommonFiles();
    //http integrity custome key
    var client = kony.sdk.getCurrentInstance();
    var response = client.setAppSecurityKey("ohvm42yd1i88");
    if (response !== null && response === true) {
        kony.print("Custom security key is set successfully");
    } else {
        kony.print(response.errmsg + " and " + response.errcode);
    }
    /***/
    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
    clearCache();
}