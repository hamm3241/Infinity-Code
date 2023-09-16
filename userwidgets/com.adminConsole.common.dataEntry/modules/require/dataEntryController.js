define(function() {
	var skin = {
		textBox : {
			normal : "skntbxLato35475f14px",
			error : "skinredbg"
		},
		textCounter : {
			normal : "sknlbl485c7514px",
			error : "sknlblError"
		},
	};
	var isType = function(obj, type){
		return typeof(obj) === type;
	};
	var assertType = function(obj, type){
		if(!isType(obj, type)){
			throw Error('Expected type to be a ' + type + ' but got '+ typeof(obj));
		}
	};
	return {
		configure : function(labelText, placeHolderText, textMaxCount, validators){
			var self = this;
			
			assertType(labelText, 'string');
			this.view.lblData.text = labelText;
			this.view.tbxData.placeholder = isType(placeHolderText, 'string') ? placeHolderText : '';
			this.view.lblTextCounter.text = '0/'+textMaxCount;
			this.view.tbxData.text = '';
			this.hideErrors();

			self.view.lblTextCounter.setVisibility(false);
			if(typeof(textMaxCount) === 'number'){
				this.view.tbxData.onBeginEditing = function(){
					if(self.view.tbxData.text.length > 0){
						self.view.lblTextCounter.setVisibility(true);
						self.view.forceLayout();
					}
				};
				this.view.tbxData.onEndEditing = function(){
					self.view.lblTextCounter.setVisibility(false);
				};
			}

			this.validators = [];
			if(Array.isArray(validators)){
				validators.forEach(function(tupple){
					self.addValidator(tupple[0], tupple[1]);
				});
			}
			if(typeof(textMaxCount) === 'number'){
				this.validators.push(['Input Too Big', function(text){
					return text.length < textMaxCount;
				}]);
			}

			this.view.tbxData.onKeyUp = function(){
				if(self.isValid()){
					self.hideErrors();
				}else{
					self.showErrors();
				}
				if(typeof(textMaxCount) === 'number'){
					self.view.lblTextCounter.text = ''+self.view.tbxData.text.length+'/'+textMaxCount;
					if(self.view.tbxData.length > textMaxCount){
						self.view.lblTextCounter.skin = skin.textCounter.error;
					}else{
						self.view.lblTextCounter.skin = skin.textCounter.normal;
					}
					if(!self.view.lblTextCounter.isVisible && self.view.tbxData.text.length > 0){
						self.view.lblTextCounter.setVisibility(true);
						self.view.forceLayout();
					}
				}
				self.view.forceLayout();
			};
		},
		addValidator : function(errorMsg, isValid) {
			assertType(errorMsg, 'string');
			assertType(isValid, 'function');
			this.validators.push([errorMsg, isValid]);
		},
		getText : function(){
			return this.view.tbxData.text;
		},
		showErrors : function(){
			var self = this;
			var failingValidator = this.validators.find(function(tupple){
				var isValid = tupple[1];
				return !isValid(self.view.tbxData.text);
			});
			var msg = failingValidator[0];
			this.view.lblErrorMsg.text = msg;
			this.view.tbxData.skin = skin.textBox.error;
			this.view.flxError.setVisibility(true);
		},
		hideErrors : function(){
			this.view.tbxData.skin = skin.textBox.normal;
			this.view.flxError.setVisibility(false);
		},
		isValid : function(){
			var self = this;
			return this.validators.map(function(e){
				return e[1];
			}).every(function(isValid){
				return isValid(self.view.tbxData.text);
			});
		}
	};
});//sknLabelRed
//sknErrorIcon
// %EE%A5%8C