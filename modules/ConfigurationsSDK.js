function ConfigProviderMFAPPOnline(backendUrl) {
    function getConfigurationFromBundle(type, configurations, configurationObject, successCallback) {
        try {
            var configDataObject = {};
            var keys_in_configurations = Object.keys(configurations);
            for (var i = 0; i < keys_in_configurations.length; i++) {
                while (configurations[keys_in_configurations[i]] && configurations[keys_in_configurations[i]].search("'") !== -1) {
                    configurations[keys_in_configurations[i]] = configurations[keys_in_configurations[i]].replace("'", "\"");
                }
                configDataObject[keys_in_configurations[i]] = configurations[keys_in_configurations[i]];

            }
            if (keys_in_configurations.length !== 0) {
                configurationObject.addConfigurationBundle(type, configDataObject);
            }
            if (typeof successCallback === 'function') successCallback(configurationObject,type);
        } catch (e) {
            kony.print(e);
        }
    }

    this.getConfigurations = function(contextObject, successCB) {
        try {
            var frmData = new kony.net.FormData();
            var comb = getConfigDimensionCombination(contextObject);
            var appController = AppConfigurationController.getInstance(backendUrl);
			var javaServiceURL=backendUrl.split('/data')[0]+"/Configurations/getConfigurations";
          var id2 = null;
          	
            if (id2 !== null) {
              var id2Valid=Object.keys(JSON.parse(id2));
              if(id2Valid.length>0)
                frmData.append("id1", comb + "|" + id2+"|"+backendUrl);
              else 
                frmData.append("id1", comb+"|"+backendUrl);
            } else {
                frmData.append("id1", comb+"|"+backendUrl);
            }
            var httpclient = new kony.net.HttpRequest();
            var returnResponse;
            var configObject = new ConfigurationObject();
    		httpclient.timeout=10000;
          	httpclient.onReadyStateChange = function() {
                if (this.readyState === constants.HTTP_READY_STATE_DONE) {
                    var response = httpclient.response;
                    operationSuccess(JSON.parse(response));
                }
            }
            httpclient.open(constants.HTTP_METHOD_POST, encodeURI(javaServiceURL));
            httpclient.send(frmData);
          
          	
        } catch (e) {
            kony.print(e);
        }




        function getLocalConfigBundles() {
            var myFile = kony.io.FileSystem.getFile(fileLocation);
            if (myFile.exists()) {
                var a = myFile.read();
                var data_in_file = a.text;
                var parsed_data_in_file = JSON.parse(data_in_file);
                if(parsed_data_in_file.newConfigBundles!== null && parsed_data_in_file.newConfigBundles!== undefined)
                  {
                    var updatedConfigBundles = parsed_data_in_file.newConfigBundles;
                	return JSON.stringify(updatedConfigBundles);
                  }
                else
                  return null;

            } else
                return null;
        }




        function operationSuccess(res) {
            kony.print((res));
            var output = res.output;
            var configObject = new ConfigurationObject();
            var LocalOutput;
            var bundle_ids;
            var x = {};
            var bundles_array;
          	var mergeOutput = {};
                 	mergeOutput = mergeConfigurationBundles(mergeOutput, output);
                 	var finalConfigurationKeys = Object.keys(mergeOutput);
                 	for (var keys = 0; keys < finalConfigurationKeys.length; keys++) {
                     getConfigurationFromBundle(finalConfigurationKeys[keys], mergeOutput[finalConfigurationKeys[keys]], configObject, successCB);
                   }	
          
        }



        function mergeConfigurationBundles(mergedOutput, LocalOutput) {
            for (var combination in LocalOutput.masters) {
                var bundle_id_List = JSON.parse(LocalOutput.masters[combination]);
                var bundle_ids_arr = (bundle_id_List.bundle_id).split(",");
                j = 0;
                for (var loop = 0; loop < bundle_ids_arr.length; loop++) {
                    j++;
                  	if(bundle_ids_arr[loop]!=="")
                    var bundle_desc = LocalOutput.updatedConfigurations[bundle_ids_arr[loop]];
                    for (var keys in JSON.parse(bundle_desc)) {

                        if (!mergedOutput[(JSON.parse(bundle_desc))[keys].type]) {
                            mergedOutput[(JSON.parse(bundle_desc))[keys].type] = {};
                        }
                        mergedOutput[(JSON.parse(bundle_desc))[keys].type][(JSON.parse(bundle_desc))[keys].key] = (JSON.parse(bundle_desc))[keys].value;


                    }
                }

            }
          return mergedOutput;
        }

        function updateLocalFile(LocalOutput, ServerOutput) {
            //for local file final bundles

            var finalBundlesLocal = LocalOutput.finalBundles.bundles;
            var finalBundlesLocalArr = finalBundlesLocal.split(",");

            //for server side final bundles

            var finalBundlesServer = ServerOutput.finalBundles.bundles;
            var finalBundlesServerArr = finalBundlesServer.split(",");

            //for server new configuration bundles

            var newConfigBundlesServer = ServerOutput.newConfigBundles;
            var keysInNewConfigBundlesServer = Object.keys(newConfigBundlesServer);

            var updatedConfigurationsServer = ServerOutput.updatedConfigurations;


            for (var localBundles in finalBundlesLocalArr) {
                if (finalBundlesServerArr.indexOf(finalBundlesLocalArr[localBundles]) > -1) {
                    if (keysInNewConfigBundlesServer.indexOf(finalBundlesLocalArr[localBundles]) > -1) {
                        // 4 operations:
                        //update newConfigBundlesLocal
                        LocalOutput.newConfigBundles[finalBundlesLocalArr[localBundles]] = newConfigBundlesServer[finalBundlesLocalArr[localBundles]];
                        //delete localBundles in newConfigBundlesServer
                        delete newConfigBundlesServer[finalBundlesLocalArr[localBundles]];
                        //update LocalConfigurations
                        LocalOutput.updatedConfigurations[finalBundlesLocalArr[localBundles]] = updatedConfigurationsServer[finalBundlesLocalArr[localBundles]];
                        //remove configurations from updatedConfigurationsServer
                        delete updatedConfigurationsServer[finalBundlesLocalArr[localBundles]];

                    }
                } else {
                    //remove bundle in local configBundles
                    delete LocalOutput.newConfigBundles[finalBundlesLocalArr[localBundles]];
                    //remove bundle in Local configurations
                    delete LocalOutput.updatedConfigurations[finalBundlesLocalArr[localBundles]];
                }
            }
            for (var bundles in newConfigBundlesServer) {
                //add remaining config bundles into local file
                LocalOutput.newConfigBundles[bundles] = newConfigBundlesServer[bundles];
                //add remaining configurations into local file
                LocalOutput.updatedConfigurations[bundles] = updatedConfigurationsServer[bundles];
            }
            LocalOutput.masters = ServerOutput.masters;
            return LocalOutput;
        }
    }
    getConfigDimensionCombination = function(contextObject) {
        var dimObj = new Dimension();
        dimObj.registerDimension([{
            "app_id": "independent"
        }]);
        dimObj.registerDimension([{
            "channels": "dependent"
        }, {
            "device": "dependent"
        }]);
         dimObj.registerDimension([{
             "user_id": "dependent"
         }]);

        var combi = dimObj.getDimensionsSet();


        var combinationsParameters = combi[combi.length - 1].split(",");
        var combinationsString = combi.join(";");
        for (var parameters = 0; parameters < combinationsParameters.length; parameters++) {
            var urlParameter = combinationsParameters[parameters] + ":" + contextObject[combinationsParameters[parameters]];
            var re = new RegExp(combinationsParameters[parameters], 'g');
            combinationsString = combinationsString.replace(re, urlParameter);
        }
        kony.print("combinationsString=   " + combinationsString);
        return combinationsString;
    }
}

var AppConfigurationController = (function() {
    var instance;

     function createInstance(backendUrl) {
        var configProvider = new ConfigProviderMFAPPOnline(backendUrl); //configFactory.getConfigurationProvider();
        this.getConfigurations = function(context, successCB, isRefresh) {
            if (isRefresh) {
                var contextObject = {};
                
                contextObject.app_id = context.app_id;
                contextObject.channels = context.channels;
                contextObject.device = "'" + context.device + "'";

                var success = function(configurationObject,type) {
                    successCB(configurationObject,type);
                }
                configProvider.getConfigurations(contextObject, success);
             } 
        }
    }
   return {
        getInstance: function(backendUrl) {
            if (!instance) instance = new createInstance(backendUrl);
            return instance;
        }
    }
})();

var ConfigurationFactory = (function() {
    var instance;

    function createInstance() {
        instance = {
            getConfigurationProvider: function() {
                var configProvider;
                configProvider = new ConfigProviderMFAPPOnline();
               
                return configProvider;
            }
        }
        return instance;
    }
    return {
        getInstance: function() {
            if (!instance) instance = new createInstance();
            return instance;
        }
    }
})();

var configObject = function(key, value) {
    this.key = key;
    this.value = value;
};

var ConfigurationBundle = function(t, d) {
    var data = d;
    var type = t;
    this.getBundleData = function() {
        return data;
    };
    this.getBundleType = function() {
        return type;
    }

};
var ConfigurationObject = function(configurationObjectJSON) {
    var configObject = {};
    if (configurationObjectJSON) {
        for (var cb in configurationObjectJSON) {
            var bundleJSON = configurationObjectJSON[cb];
            var bundle = new ConfigurationBundle(bundleJSON.type, bundleJSON.data, bundleJSON.bundleId);
            configObject[cb] = bundle;
        }
    }
    this.addConfigurationBundle = function(type, data) {
        var configBundle = new ConfigurationBundle(type, data);
        configObject[type] = configBundle;
    };
    this.getConfigurationBundleBasedOnType = function(type) {
        var configBundles = [];
        for (var cb in configObject) {
            if (configObject[cb].getBundleType() === type) configBundles.push(configObject[cb]);
        }
        return configBundles;
    };
    this.getConfigurationBundleBasedOnBundleId = function(bundleId) {
        return configObject[bundleId];
    };
    this.stringify = function() {
        var configObj = {};
        for (var key in configObject) {
            var bundle = configObject[key];
            var bundleJSON = {};
            bundleJSON.data = bundle.getBundleData();
            bundleJSON.type = bundle.getBundleType();
            bundleJSON.bundleId = bundle.getBundleId();
            configObj[key] = bundleJSON;
        }
        return JSON.stringify(configObj);
    }
    this.getConfigurationsBasedOnType = function(type) {
        var bundlesArray = this.getConfigurationBundleBasedOnType(type);
        var configurationsObject = {};
        for (var i = 0; i < bundlesArray.length; i++) {
            var bundle = bundlesArray[i];
            var bundleData = bundle.getBundleData();
            for (var configuration in bundleData) {
                configurationsObject[configuration] = bundleData[configuration];
            }
        }
        return configurationsObject;
    }
}