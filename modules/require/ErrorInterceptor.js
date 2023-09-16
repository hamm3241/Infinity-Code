define(function(){
    var isFunction = function(obj){
        return typeof(obj) === 'function';
    };
    var hasLength = function(length){
        return function(obj){
            return obj.length === length;
        };
    };
    var slice = function(args, stIndex, endIndex){
        return Array.prototype.slice.call(args, stIndex, endIndex);
    };
    var errorMessage = function(error){
        if (error.dbpErrCode) {
            if (kony.i18n.getLocalizedString("i18n.errCode." + error.dbpErrCode))
                errorMessage = kony.i18n.getLocalizedString("i18n.errCode." + error.dbpErrCode);
            else
                errorMessage = error.dbpErrMsg;
        }
        else
            errorMessage = error.errMsg || error.errmsg;
      return errorMessage;
    };
    var wrapController = function(presentor, controllerName){
        var MatchConfiguration = [];
        var onMatch = function(isMatch){
            if(!isFunction(isMatch)){
                throw Error('Expected function any=>boolean');
            }
            return {
                do : function MatchConfig(action){
                    if(!isFunction(action)){
                        throw Error('Expected function any=>void');
                    }
                    return {
                        isMatch : isMatch,
                        action : action
                    };
                }
            };
        };
        var ConfigureMatches = function(matchConfiguror){
            MatchConfiguration = MatchConfiguration.concat(matchConfiguror(onMatch));
        };
        
        var interceptErrors = function(controller){
            var value = function(fnc){
                return function(key){
                    return fnc(controller[key])
                };
            };
            Object.keys(controller.__proto__).concat(Object.keys(controller))
                .filter(value(isFunction))
                .filter(value(hasLength(3)))
                .forEach(function(functionName){
                    var backup = controller[functionName];
                    var replacedOnError = function(origOnError){
                        return function interceptingOnError(){
                            var args = slice(arguments, 0);
                            var MatchedConfigs = MatchConfiguration.filter(function(matchConfig){
                                return matchConfig.isMatch.apply(null, args);
                            });
                            if(MatchedConfigs.length === 0){
                                if(typeof(origOnError) === 'function')
                                origOnError.apply(null, args);
                            }else{
                                MatchedConfigs.forEach(function(matchConfig){
                                    matchConfig.action(args);
                                });
                            }
                        };
                    };
                    controller[functionName] = function(data, onSuccess, onError){
                        return backup.apply(controller, 
                            [data, onSuccess, replacedOnError(onError)].concat(slice(arguments,3)));
                    };
                });
        };
        var tryToIntercept = function(){
            if(presentor[controllerName]){
                interceptErrors(presentor[controllerName]);
            }else{
                setTimeout(tryToIntercept, 0);
            }
        };
        tryToIntercept();
        
        return {
            match : ConfigureMatches,
        };
    };

    var errorInterceptor = {
        wrap : wrapController,
        errorMessage : errorMessage
    };
    return errorInterceptor;
});