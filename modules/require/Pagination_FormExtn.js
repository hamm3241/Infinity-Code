define(function () {
    var inPage = function (numPerPage, currentPage) {
      	numPerPage = parseInt(numPerPage);
        var inBetween = function (start, end) {
            return function (_, index) {
                return start <= index && index < end;
            };
        };
        return inBetween((currentPage - 1) * numPerPage, (currentPage - 1) * numPerPage + numPerPage);
    };
    var generatePaginationArr = function (numPerPage, totalCount) {
        var noOfPages = Math.ceil(totalCount / numPerPage);
        var paginationArr = Array.apply(null, {length: noOfPages});
        return paginationArr.map(function(elem, index){
            return  [++index, "Page " + index + " of " + noOfPages];
        });
    };
    var getPageSelectionList = function (numPerPage, totalCount) {
        return generatePaginationArr(numPerPage, totalCount);
    };
    var setupPaginationButtons = function (numPrev, numNext) {
      if(numNext.length === 0){
        this.nextPageDisabled = true;
      }else{
        this.nextPageDisabled = false;
      }
      if(numPrev.length === 0){
        this.prevPageDisabled = true;
      }else{
        this.prevPageDisabled = false;
      }
    };
    return {
        getPageRecords: function (allRecords, getNumPerPage, assignPageList) {
            var numPerPage = parseInt(getNumPerPage(),10);
            if (!this.currentPage) {
                this.currentPage = 1;
            }
            var currentPage = parseInt(this.currentPage,10);
            assignPageList(getPageSelectionList.call(this, numPerPage, allRecords.length));
            setupPaginationButtons.call(this, allRecords.filter(inPage(numPerPage, currentPage - 1)), allRecords.filter(inPage(numPerPage, currentPage + 1)));
            return allRecords.filter(inPage(numPerPage, currentPage));
        },
    };
});