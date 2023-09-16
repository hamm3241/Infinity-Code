function Dimension(){
    this.dimensions=[];
};

Dimension.prototype.registerDimension=function(dimensionList){
    this.dimensions.push(dimensionList);
};

Dimension.prototype.registerParameter=function(dimensionString,param){
    var index=parseInt(dimensionString.split("-")[1]);
    var currentDimension=this.dimensions[index-1];
    var paramKey=Object.keys(param)[0];
    var isParamPresent=false;
    for(var eachParam in Object.keys(currentDimension)){
        var currentParam=currentDimension[eachParam];
        if(Object.keys(currentParam)[0]===paramKey){
            isParamPresent=true;
            break;
        }
    }
    if(isParamPresent===false){
        currentDimension.push(param);
    }
};

Dimension.prototype.getDimensionsArrayList=function(){
    var dims=[];
    for(var eachDimension in this.dimensions){
        var dimensionArray=this.dimensions[eachDimension];
        for(var param in dimensionArray){
            dims.push(dimensionArray[param]);
        }
    }
    return dims;
};

Dimension.prototype.getDimensionsSet=function(){    
    var letters=this.getDimensionsArrayList();
    var combi = [];
    var temp= "";
    var letLen = Math.pow(2, letters.length);

    for (var i = 0; i < letLen ; i++){
        temp= "";
        var dependencyFlag="dependent";
        for (var j=0;j<letters.length;j++) {
            
            if ((i & Math.pow(2,j))){
                var key=Object.keys(letters[j])[0];
                var value=letters[j][key];
                if(dependencyFlag==="dependent")
                    dependencyFlag=(value==="independent")?"independent":"dependent";
                temp += key+",";
            }
        }
        if(temp !=="" && dependencyFlag==="independent"){
            temp = temp.substr(0, temp.lastIndexOf(",", temp.length - 1));
            combi.push(temp);
        }
    }
    
    return combi;
};