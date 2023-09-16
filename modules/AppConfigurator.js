//Type your code here
kony = kony || {};
kony.servicesapp = kony.servicesapp || {};

kony.servicesapp.loadAndConfigureApp = function(userID, backendUrl, success) {
    //var backendUrl = "http://appsqa.konylabs.net/services/data/v1";
    //backendUrl = backendUrl.replace("/authService/100000002/appconfig","/services/data/v1");
    backendUrl = backendUrl + "/services/data/v1";
    var contextObject = {};
    contextObject.user_id = userID;
    contextObject.app_id = "KonyBankingAdminConsole";
    //contextObject.channel = kony.retailBanking.globalData.deviceInfo.getDeviceInfo().name;
	contextObject.channels=kony.os.deviceInfo().name;
  	
  	//alert("device"+kony.os.deviceInfo().model);
  	//alert(kony.sdk.getCurrentInstance().customReportingURL);
  	contextObject.device=kony.os.deviceInfo().model;
    //contextObject.device = kony.retailBanking.globalData.deviceInfo.getDeviceInfo().model;

    var appController = AppConfigurationController.getInstance(backendUrl);
    appController.getConfigurations(contextObject, function(configurationObject,type) { //"EAM_QA2"
        // if(type==="SKIN")
        // SkinConfigHandller.getInstance().loadConfigurationBasedSkinsAndApply(configurationObject);
        // else if(type==="IMAGE")
        // ImageAssetConfigHandler.getInstance().loadConfigurationBasedImages(configurationObject);
        // else if(type==="PREFERENCE")
        if(type==="PREFERENCE")
        PreferenceConfigHandler.getInstance().loadConfigurationBasedPreferences(configurationObject);
        success();
    }, true);
}

var SkinConfigHandller = (function() {
    var instance;

    function createInstance() {
        this.loadConfigurationBasedSkinsAndApply = function(configurationObject) {
            //var defTheme = kony.servicesapp.defaultTheme;//kony.theme.getCurrentThemeData();
            try {
                var jsonString = configurationObject.getConfigurationsBasedOnType("SKIN"); //JSON.stringify(theme);
              
                function onsuccesscallback() {}

                function onerrorcallback() {}
                for (var c in jsonString) {
                    jsonString[c] = JSON.parse(jsonString[c]);
                }
                var date = new Date();
                kony.theme.createThemeFromJSONString(JSON.stringify(jsonString), date.toISOString(), onsuccesscallback, onerrorcallback);
                kony.theme.setCurrentTheme(date.toISOString(), onsuccesscallback, onerrorcallback);

            } catch (e) {
                kony.print("error in skin handler");
            }
        };
    }
    return {
        getInstance: function() {
            if (!instance) instance = new createInstance();
            return instance;
        }
    }
})();
kony.servicesapp.skinConfigHandler=SkinConfigHandller;
var ImageAssetConfigHandler = (function() { //ImageAssetConfigHandler
    var instance;
	 
    function createInstance() {
        var imagesObject;
        this.loadConfigurationBasedImages = function(configurationObject) {
            var imagesObject = configurationObject.getConfigurationsBasedOnType("IMAGE");

            function fetchImage(image) {
                var httpclient = new kony.net.HttpRequest();
                httpclient.open(constants.HTTP_METHOD_GET, imagesObject[image]);
                httpclient.send();
                httpclient.onReadyStateChange = function() {
                    if (this.readyState === constants.HTTP_READY_STATE_DONE) {
                        var rb = httpclient.response;
                      	//rb=httpclient.responseText;
                        var myfile = new kony.io.File(kony.io.FileSystem.getDataDirectoryPath() + "/" + image + ".jpg");
                        myfile.write(rb, true);
                      	
                    }
                }
            }
            for (var image in imagesObject) {
                fetchImage(image);
            }
            //});
        };
        this.getImage = function(imageName) {
            var imageFile = kony.io.FileSystem.getFile(kony.io.FileSystem.getDataDirectoryPath() + "/" + imageName + ".jpg");
            return imageFile.read() !== undefined ? imageFile.read() : null;
            //return imageFile;
        };

    }
    return {
        getInstance: function() {
            if (!instance) instance = new createInstance();
            return instance;
        }
    }
})();
kony.servicesapp.imageConfigHandler=ImageAssetConfigHandler;
var PreferenceConfigHandler = (function() {
    var instance;

    function createInstance() {
        var preferences = {};
      	
        this.loadConfigurationBasedPreferences = function(configurationObject) {
            preferences = configurationObject.getConfigurationsBasedOnType("PREFERENCE");
          
        };
        this.getPreferenceValue = function(key) {
            return preferences[key] !== undefined ? preferences[key] : null;
        }
    }
    return {
        getInstance: function() {
            if (!instance) instance = new createInstance();
            return instance;
        }
    }

})();
kony.servicesapp.preferenceConfigHandler=PreferenceConfigHandler;