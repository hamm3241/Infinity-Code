define(['WidgetConfig_FormExtn'],function(WidgetConfig){
    var COMPONENT_LIST = 'componentList';
    var FORM_LIST = 'formList';
    var replaceDoubleWithSingleQuote = function(str){
        return str.split('"').join("'");
    };
    var replaceSingleWithDoubleQuote = function(str){
        return str.split("'").join('"');
    };
    var Properties = function(){
        this.props = {};
    };
    Properties.prototype.addProperty = function(key, value){
        if(key.length > 255){
            throw Error('key length overflow!!!');
        }
        if(value.length > 2000){
            throw Error('value length overflow!!!');
        }
        this.props[key] = value;
    };
    Properties.prototype.print = function(){
        var self = this;
        var propertyString = Object.keys(this.props).map(function(key){
            var value = self.props[key];
            return key + '=' + replaceDoubleWithSingleQuote(value);
        }).join('\n');
        kony.print(propertyString);
    };
    var exportToProperties = function(config){
        var componentList = Object.keys(config.components);
        var props = new Properties();
        props.addProperty(COMPONENT_LIST,JSON.stringify(componentList));
        componentList.forEach(function(componentKey){
            props.addProperty(componentKey,JSON.stringify(config.components[componentKey]));
        });
        var formList = Object.keys(config.forms);
        props.addProperty(FORM_LIST,JSON.stringify(formList));
        formList.forEach(function(formId){
            props.addProperty(formId,JSON.stringify(config.forms[formId]));
        });
        return props;
    };
    var exportToCSV = function(config, prevCSVStr){
        var prevCSV = prevCSVStr.split('\n').map(function(line){
            return '['+line+']';
        }).map(function(arrStr){
            return JSON.parse(arrStr);
        });
        var headers = prevCSV[0];
        var rowToObj = function(row){
            var obj = {};
            row.forEach(function(e,i){
                obj[headers[i]] = e;
            });
            return obj;
        };
        var objToRow = function(obj){
            var row = [];
            headers.forEach(function(key){
                row.push(obj[key]);
            });
            return row;
        };
        var csvObjs = prevCSV.slice(1).map(rowToObj);
        var maxOf = function(arr){
            return arr.reduce(function(a,e){
                return a>e?a:e;
            },0);
        };
        var Time = function(){
            var timeArr = new Date().toString().split(' ');
            return timeArr[2]+'-'+timeArr[1]+'-'+timeArr[3]+' '+timeArr[4];
        };
        var newCSVObj = function(key, value){
            var nextID = maxOf(csvObjs.map(function(obj){return Number(obj['id']);})) + 1;
            return {
                "CreatedBy" : "admin",
                "CreatedDateTime" : Time(),
                "id" : ""+nextID,
                "config_key" : key,
                "LastUpdatedBy" : "admin",
                "LastUpdatedDateTime" : Time(),
                "SoftDeleteFlag" : "false",
                "value" : value,
                "configurationBundle_id" : "2",
                "type" : "PREFERENCE"
            };
        };
        var insertInToCsv = function(configKey, configValue){
            var updateObj = csvObjs.find(function(obj){
                return obj['config_key'] === configKey;
            });
            if(updateObj){
                if(updateObj['value'] === configValue) return;
                updateObj['value'] = configValue;
                updateObj['LastUpdatedDateTime'] = Time();
            }else{
                csvObjs.push(newCSVObj(configKey, configValue));
            }
        };
        var propertiesToInsert = exportToProperties(config).props;
        Object.entries(propertiesToInsert).forEach(function(keyValTupple){
            insertInToCsv(keyValTupple[0], replaceDoubleWithSingleQuote(keyValTupple[1]));
        });
        return [headers].concat(csvObjs.map(objToRow)).map(function(row){
            return row.map(function(e){return '"'+e+'"';}).join(',');
        }).join('\n');
    };

    var parseJSON = function(str){
        return JSON.parse(replaceSingleWithDoubleQuote(str));
    };

    var importFromConfiguration = function(getConfiguration){
        var config = {
            components : {},
            forms : {}
        };
        var componentList = parseJSON(getConfiguration(COMPONENT_LIST));
        componentList.forEach(function(componentKey){
            config.components[componentKey] = parseJSON(getConfiguration(componentKey));
        });
        var formList = parseJSON(getConfiguration(FORM_LIST));
        formList.forEach(function(formId){
            config.forms[formId] = parseJSON(getConfiguration(formId));
        });
        return config;
    };

    var MockConfiguration = function(properties){
        return function getConfiguration(key){
            return properties.props[key];
        };
    };
    var defineExportConfig = function(){
        var internalConfigStr = JSON.stringify(WidgetConfig);
        var properties = exportToProperties(WidgetConfig);
        this.ExportConfig = function(oldCSVStr){
            if(internalConfigStr !== JSON.stringify(importFromConfiguration(MockConfiguration(properties)))){
                throw Error('Export and Import Not in Sync');
            }
            kony.print(exportToCSV(WidgetConfig, oldCSVStr));
            //properties.print();
        };
    };
    defineExportConfig(); 
    return {
        buildConfigurationWith : importFromConfiguration
    };
});