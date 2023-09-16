//run this in browser console and it will start recording the signatures of methods of mvc2 modules
var documentation = {};//generated comments are stored in this global->call toString on the method to get comment
var documentationMaxLevel = 2;//adjust this to control how deep you want to expand an object
(()=>{
    var modules = Object.keys(window).filter(key=>window[key] && typeof window[key].BusinessControllerConfig === 'object')
        .map(key=>window[key].ModuleName)
        .map(moduleName=>kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule(moduleName));
    var insertDocs = (module, controllerType, method, content) => {
        if(!documentation[module]){
            documentation[module] = {};
        }
        if(!documentation[module][controllerType]){
            documentation[module][controllerType] = {};
        }
        documentation[module][controllerType][method] = content;
    }
    var JSONtype = JSONobj => {
      var typeString = (obj, address=[]) => address.length > documentationMaxLevel ?
       'object' :
       (map[typeof(obj)](obj, address));
      var map = {
          number : _=>'number',
          string : _=>'string',
          object : (obj, address)=>{
              if(obj){
                if(Array.isArray(obj)){
                    return map['array'](obj, address);
                }else{
                    return '{'+Object.keys(obj).map(key=>key+' : '+typeString(obj[key], address.concat(key))).join(', ')+'}';
                }
              }else{
                  return 'null';
              }
          },
          array : (arr, address) => {
              if(arr.length === 0){
                  return '[]';
              }else{
                  return '['+typeString(arr[0], address.concat(0))+']';
              }
          },
          'undefined' : _=>'undefined',
          boolean : _=>'boolean',
          'function' : _=>'function'
      };
      return typeString(JSONobj);
    };
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    var getParamNames = func => {
      var fnStr = func.toString().replace(STRIP_COMMENTS, '');
      var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
      if(result === null)
         result = [];
      return result;
    };
    var formatAsComment = (module,type,method,doc) => ()=>{
    return `
    /**
     * @name ${method}
     * @member ${module}.${type}
     * ${getParamNames(doc.method).map((param,i)=>{
         if(typeof(doc.args[i]) === 'function'){
             return '@param ('+getParamNames(doc.args[i]).join(', ')+')=>any '+param;
         }else if(doc.args[i] instanceof MethodArg){
             var callbackArgs = doc.args[i].args;
             return '@param ('+getParamNames(doc.args[i].fnc).map((p,i)=>p+':'+JSONtype(callbackArgs[i]))+')=>any '+param;
         }
         return '@param '+JSONtype(doc.args[i])+' '+param;
     }).join('\n     * ')}
     */
    `;
    };
    var MethodArg = function(fnc, args){
        this.fnc = fnc;
        this.args = args;
    };
    var attachDocumentor = (module, controllerType) => {
        var controller = module[controllerType];
        Object.keys(controller.__proto__).forEach(methodName => {
            //override the original fnc to document the args
            controller[methodName] = (data, onSuccess, onError, ...other_args)=>{
                var args = [data, onSuccess, onError, ...other_args];
                
                args.forEach((arg, i)=>{
                    if(typeof(arg) === 'function'){
                        //wrap any callback functions to document the args they will be called with
                        args[i] = (...callbackArgs)=>{
                            //if the fnc is called it will be replaced -so only supports callbacks that are called once only
                            args[i] = new MethodArg(arg, callbackArgs);
                            arg(...callbackArgs);
                        };
                    }
                });
                var docObj = {
                    method : controller.__proto__[methodName],
                    args : args
                };
                docObj.toString = formatAsComment(module.moduleName, controllerType, methodName, docObj);
                //store the documentation for this fnc call
                insertDocs(module.moduleName, controllerType, methodName, docObj);
                //finally make the call to the actual fnc
                controller.__proto__[methodName].apply(controller, args);
            };
        });
    };
    modules.forEach(module=>{
        attachDocumentor(module, 'businessController');
        attachDocumentor(module, 'presentationController');
    });
})();
