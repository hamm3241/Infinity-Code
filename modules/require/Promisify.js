define(function () {
    //return a promise version of the business Controller method
    return function Promisify(businessController, functionName) {
        var businessMethod = businessController[functionName];
        if(typeof(businessMethod) !== 'function'){
            throw Error('Unable to find the requested function in the businessController');
        }
        if (businessMethod.length === 3) {
            //We assume that the function take 3 parameters of the form - data, onSuccess, onError
            return function (data) {
                return new Promise(function (resolve, reject) {
                    businessController[functionName].call(businessController, data, resolve, reject);
                });
            };
        }
        throw Error('the function does not follow the standard pattern for the arguments');
    };
});