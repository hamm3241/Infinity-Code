function AS_FlexContainer_c640921d587c4781914a4605c42306b8(eventobject) {
    var self = this;
    if (this.view.flxImage.src === "img_down_arrow.png") {
        this.view.flxImage.src = "img_desc_arrow.png";
        this.view.flxFilters.setVisibility(false);
    } else {
        this.view.flxImage.src = "img_down_arrow.png";
        this.view.flxFilters.setVisibility(true);
    }
}