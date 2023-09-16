define(function () {
    var sortAlphaNum = function (a, b) {
        if (a === b) {
            return 0;
        }
        var reA = /[^a-zA-Z]/g;
        var reN = /[^0-9]/g;
        var aA = a.replace(reA, "");
        var bA = b.replace(reA, "");
        if (aA === bA) {
            var aN = parseInt(a.replace(reN, ""), 10);
            var bN = parseInt(b.replace(reN, ""), 10);
            return aN === bN ? 0 : aN > bN ? 1 : -1;
        } else {
            return aA > bA ? 1 : -1;
        }
    };
    return {
        getObjectSorter: function (defaultColumn) {
            var sortBy = {
                column: function (column) {
                    if (column === this.columnName) {
                        this.inAscendingOrder = !this.inAscendingOrder;
                    } else {
                        this.columnName = column;
                        this.inAscendingOrder = true;
                    }
                },
                columnName: defaultColumn,
                inAscendingOrder: true,
                sortData: function (obj1, obj2) {
                    var columnToSortBy = sortBy.columnName;
                    var getProperty = function(obj, path){
                        if(path.length === 1){
                            return obj[path[0]];
                        }
                        return getProperty(obj[path[0]], path.slice(1));
                    };
                    var val1 = getProperty(obj1, columnToSortBy.split('.')),
                    val2 = getProperty(obj2, columnToSortBy.split('.'));
                    if (val1 && val2) {
                        var  s1  =  "" + val1;
                        var  s2  =  "" + val2;
                        var comparisonResult = sortAlphaNum(s1.toLowerCase(), s2.toLowerCase());
                        if (!sortBy.inAscendingOrder) {
                            comparisonResult = comparisonResult === 1 ? -1 : 1;
                        }
                        return comparisonResult;
                    } else if (val1 || val2) {
                        return val1 ? -1 : 1;
                    } else {
                        return 0;
                    }
                }
            };
            return sortBy;
        },

        determineSortIcon : function(sortBy, column){
            if(sortBy.columnName === column){
                if(sortBy.inAscendingOrder){
                    return kony.adminConsole.utils.constants.ASCENDING_IMAGE;
                }else{
                    return kony.adminConsole.utils.constants.DESCENDING_IMAGE;
                }
            }
            return kony.adminConsole.utils.constants.SORTABLE_IMAGE;
        },
        returnSortFontIconValue : function(sortBy, column){
            if(sortBy.columnName === column){
                if(sortBy.inAscendingOrder){
                    return '\ue92a';
                }else{
                    return '\ue920';
                }
            }
            return '\ue92b';
        },
      determineSortFontIcon : function(sortBy, column, labelWidget){
            if(sortBy.columnName === column){
                if(sortBy.inAscendingOrder){
                  	labelWidget.text = '\ue92a';
                    labelWidget.left = "10px";
                  	labelWidget.skin = "sknIcon12pxBlack";
                    labelWidget.hoverSkin = "sknIcon12pxBlackHover";
                }else{
                   labelWidget.text = '\ue920';
                   labelWidget.left = "10px";
                   labelWidget.skin = "sknIcon12pxBlack";
                   labelWidget.hoverSkin = "sknIcon12pxBlackHover";
                }
            } else {
             labelWidget.text = '\ue92b';
             labelWidget.left = "5px";
             labelWidget.skin = "sknIcon15px";
             labelWidget.hoverSkin = "sknlblcursor";
            }
        },
      determineSortIconForSeg: function (sortBy, column) {
      	if (sortBy.columnName === column) {
      		if (sortBy.inAscendingOrder) {
      			return {
      				text: '\ue92a',
      				skin: 'sknIcon12pxBlack',
                    hoverSkin :'sknIcon12pxBlackHover',
                    left : "10px"
      			};
      		} else {
      			return {
      				text: '\ue920',
      				skin: 'sknIcon12pxBlack',
                    hoverSkin :'sknIcon12pxBlackHover',
                    left : "10px"
      			};
      		}
      	}
      	return {
      		text: '\ue92b',
      		skin: 'sknIcon15px',
            hoverSkin:'sknlblCursorFont',
            left : "5px"
      	};
      }
    };
  	
});