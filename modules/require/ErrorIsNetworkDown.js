define(function(){
  return function isNetworkDown(errorObj){
      return errorObj.errcode === 1011 || errorObj.opstatus === 1011 || errorObj.errCode === null || errorObj.opstatus === null ;
    };
});