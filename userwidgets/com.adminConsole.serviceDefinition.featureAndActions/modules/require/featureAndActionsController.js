define(function() {
	
	return {
	showReviewPage : function(){
      scopeObj= this;
      scopeObj.view.flxFeatures.setVisibility(false);
      scopeObj.view.flxReview.setVisibility(true);
    }
	};
});