define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      kony.print("Inside constructor...");
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      kony.print("Inside initGettersSetters...");
      var scopeObj = this;
      defineGetter(this, "maxLimit", function() {
        return this._maxLimit;
      });

      defineSetter(this, "maxLimit", function(val) {
        this._maxLimit = val;
      });
      defineGetter(this, "minLimit", function() {
        return this._minLimit;
      });

      defineSetter(this, "minLimit", function(val) {
        this._minLimit = val;
      });
      defineGetter(this, "defaultValue", function() {
        return this._defaultValue;
      });

      defineSetter(this, "defaultValue", function(val) {
        scopeObj.state = val;
        scopeObj.updateView();
        this._defaultValue = val;
      });
      
    },
    state:0,
    preShow: function(){
      var scopeObj = this;
      this.view.btnMinus.onClick = function(){
        if(scopeObj.state===scopeObj._minLimit){
          if(scopeObj.onLimitLowers && scopeObj.onLimitLowers instanceof Function){
            scopeObj.onLimitLowers(scopeObj._minLimit);
            scopeObj.view.btnMinus.skin = "btnIcondisabled";
            scopeObj.view.btnMinus.focusSkin = "btnIcondisabled";
          }
        }
        if(scopeObj.state>scopeObj._minLimit){
          scopeObj.state--;
          scopeObj.updateView();
          scopeObj.view.btnPlus.skin = "btnIcon";
          scopeObj.view.btnPlus.focusSkin = "btnIcon";
        }
      };
      this.view.btnPlus.onClick = function(){
        if(scopeObj.state===scopeObj._maxLimit){
          if(scopeObj.onLimitExceeds && scopeObj.onLimitExceeds instanceof Function){
            scopeObj.onLimitExceeds(scopeObj._maxLimit);
            scopeObj.view.btnPlus.skin = "btnIcondisabled";
            scopeObj.view.btnPlus.focusSkin = "btnIcondisabled";
          }
        }
        if(scopeObj.state<scopeObj._maxLimit){
          scopeObj.state++;
          scopeObj.updateView();
          scopeObj.view.btnMinus.skin = "btnIcon";
          scopeObj.view.btnMinus.focusSkin = "btnIcon";
        }
      };
      this.state = this._defaultValue;
      this.updateView();
    },
    updateView: function(){
      this.view.lblValue.text = this.state;
      if(this.onChange && this.onChange instanceof Function){
        this.onChange(this.state);
      }
    },
    getValue: function(){
      return this.state;
    },
    enableFocus: function(){
      this.view.skin = "sknflxffffffop100Border006ccaRadius3px";
      this.view.flxSeperator1.skin = "sknFlx006CCA";
      this.view.flxSeperator2.skin = "sknFlx006CCA";
    },
    disableFocus: function(){
      this.view.skin = "sknflxffffffop100Bordercbcdd1Radius3px";
      this.view.flxSeperator1.skin = "sknflxd6dbe7";
      this.view.flxSeperator2.skin = "sknflxd6dbe7";
    }
  };
});