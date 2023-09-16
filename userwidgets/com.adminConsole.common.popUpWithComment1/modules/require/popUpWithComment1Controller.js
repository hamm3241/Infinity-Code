define(function () {

	return {

		constructor: function (baseConfig, layoutConfig, pspConfig) {
			this._minTextCount = 0;
			this._maxTextAreaLimit = 150;
			this._heading = "";
			this._subheading = "";

			this.resetTextData();
			this.view.textAreaComment.onKeyUp = this.setTextCount.bind(this);
			this.view.btnPopUpYes.onclick = this.onBtnPositiveClick.bind(this);
			this.view.btnPopUpNo.onclick = this.onBtnNegativeClick.bind(this);
			this.view.flxPopUpClose.onClick = this.onBtnCloseClick.bind(this);
			this.callBacksObj = {};
		},

		initGettersSetters: function () {
			defineSetter(this, "heading", function (val) {
				if ((typeof val === 'string') && (val !== "")) {
					this._heading = val;
					this.view.lblPopUpMainMessage.text = this._heading;
				}
			});
			defineGetter(this, "heading", function () {
				return this._heading;
			});

			defineSetter(this, "subheading", function (val) {
				if ((typeof val === 'string') && (val !== "")) {
					this._subheading = val;
					this.view.rtxPopUpDisclaimer.text = this._subheading;
				}
			});
			defineGetter(this, "subheading", function () {
				return this._subheading;
			});

			defineSetter(this, "maxTextAreaLimit", function (val) {
				if (!isNaN(val)) {
					this._maxTextAreaLimit = val;
					this.view.textAreaComment.maxTextLength = this._maxTextAreaLimit;
				}
			});
			defineGetter(this, "maxTextAreaLimit", function () {
				return this._maxTextAreaLimit;
			});
		},

		resetTextData: function () {
			this.view.textAreaComment.text = "";
			this.view.lblTextCount.text = this._minTextCount + "/" + this._maxTextAreaLimit;
           let specialCharactersSet = "~#^|$%&ℼΩ€£¥₹₱¿£¢‘*±!@()_-+=}{][/|?><`:;\\\¶÷°×π";
          this.view.textAreaComment.restrictCharactersSet = specialCharactersSet ;
		},

		getTextData: function () {
			return this.view.textAreaComment.text;
		},

		setTextCount: function () {
			let textData = this.view.textAreaComment.text;
			let textLength = textData.length;
			this.view.lblTextCount.text = textLength + "/" + this._maxTextAreaLimit;
		},

		onBtnPositiveClick: function () {
			let textData = this.getTextData();
			let context = {
				"textData": textData
			}
			this.resetTextData();
			if (this.onBtnYesClick) {
				this.onBtnYesClick(context);
			}
		},

		onBtnNegativeClick: function () {
			this.resetTextData();
			if (this.onBtnNoClick) {
				this.onBtnNoClick();
			}
		},

		onBtnCloseClick: function () {
			this.resetTextData();
			if (this.onCloseClick) { 
				this.onCloseClick();
			}
		}
	};
});