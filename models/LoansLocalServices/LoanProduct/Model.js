define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		AnnualFee : function(val, state){
			state['AnnualFee'] = val;
		},
		APR : function(val, state){
			state['APR'] = val;
		},
		AtAGlance : function(val, state){
			state['AtAGlance'] = val;
		},
		Code : function(val, state){
			state['Code'] = val;
		},
		createdby : function(val, state){
			state['createdby'] = val;
		},
		createdts : function(val, state){
			state['createdts'] = val;
		},
		Description : function(val, state){
			state['Description'] = val;
		},
		id : function(val, state){
			state['id'] = val;
		},
		Image : function(val, state){
			state['Image'] = val;
		},
		lastmodifiedts : function(val, state){
			state['lastmodifiedts'] = val;
		},
		LoanType_id : function(val, state){
			state['LoanType_id'] = val;
		},
		MaxLimitAmount : function(val, state){
			state['MaxLimitAmount'] = val;
		},
		MinLimitAmount : function(val, state){
			state['MinLimitAmount'] = val;
		},
		modifiedby : function(val, state){
			state['modifiedby'] = val;
		},
		Name : function(val, state){
			state['Name'] = val;
		},
		Rewards : function(val, state){
			state['Rewards'] = val;
		},
		softdeleteflag : function(val, state){
			state['softdeleteflag'] = val;
		},
		synctimestamp : function(val, state){
			state['synctimestamp'] = val;
		},
	};
	
	
	//Create the Model Class
	function LoanProduct(defaultValues){
		var privateState = {};
			privateState.AnnualFee = defaultValues?(defaultValues["AnnualFee"]?defaultValues["AnnualFee"]:null):null;
			privateState.APR = defaultValues?(defaultValues["APR"]?defaultValues["APR"]:null):null;
			privateState.AtAGlance = defaultValues?(defaultValues["AtAGlance"]?defaultValues["AtAGlance"]:null):null;
			privateState.Code = defaultValues?(defaultValues["Code"]?defaultValues["Code"]:null):null;
			privateState.createdby = defaultValues?(defaultValues["createdby"]?defaultValues["createdby"]:null):null;
			privateState.createdts = defaultValues?(defaultValues["createdts"]?defaultValues["createdts"]:null):null;
			privateState.Description = defaultValues?(defaultValues["Description"]?defaultValues["Description"]:null):null;
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.Image = defaultValues?(defaultValues["Image"]?defaultValues["Image"]:null):null;
			privateState.lastmodifiedts = defaultValues?(defaultValues["lastmodifiedts"]?defaultValues["lastmodifiedts"]:null):null;
			privateState.LoanType_id = defaultValues?(defaultValues["LoanType_id"]?defaultValues["LoanType_id"]:null):null;
			privateState.MaxLimitAmount = defaultValues?(defaultValues["MaxLimitAmount"]?defaultValues["MaxLimitAmount"]:null):null;
			privateState.MinLimitAmount = defaultValues?(defaultValues["MinLimitAmount"]?defaultValues["MinLimitAmount"]:null):null;
			privateState.modifiedby = defaultValues?(defaultValues["modifiedby"]?defaultValues["modifiedby"]:null):null;
			privateState.Name = defaultValues?(defaultValues["Name"]?defaultValues["Name"]:null):null;
			privateState.Rewards = defaultValues?(defaultValues["Rewards"]?defaultValues["Rewards"]:null):null;
			privateState.softdeleteflag = defaultValues?(defaultValues["softdeleteflag"]?defaultValues["softdeleteflag"]:null):null;
			privateState.synctimestamp = defaultValues?(defaultValues["synctimestamp"]?defaultValues["synctimestamp"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"AnnualFee" : {
					get : function(){return privateState.AnnualFee},
					set : function(val){
						setterFunctions['AnnualFee'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"APR" : {
					get : function(){return privateState.APR},
					set : function(val){
						setterFunctions['APR'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"AtAGlance" : {
					get : function(){return privateState.AtAGlance},
					set : function(val){
						setterFunctions['AtAGlance'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Code" : {
					get : function(){return privateState.Code},
					set : function(val){
						setterFunctions['Code'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"createdby" : {
					get : function(){return privateState.createdby},
					set : function(val){
						setterFunctions['createdby'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"createdts" : {
					get : function(){return privateState.createdts},
					set : function(val){
						setterFunctions['createdts'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Description" : {
					get : function(){return privateState.Description},
					set : function(val){
						setterFunctions['Description'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"id" : {
					get : function(){return privateState.id},
					set : function(val){
						setterFunctions['id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Image" : {
					get : function(){return privateState.Image},
					set : function(val){
						setterFunctions['Image'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"lastmodifiedts" : {
					get : function(){return privateState.lastmodifiedts},
					set : function(val){
						setterFunctions['lastmodifiedts'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"LoanType_id" : {
					get : function(){return privateState.LoanType_id},
					set : function(val){
						setterFunctions['LoanType_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"MaxLimitAmount" : {
					get : function(){return privateState.MaxLimitAmount},
					set : function(val){
						setterFunctions['MaxLimitAmount'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"MinLimitAmount" : {
					get : function(){return privateState.MinLimitAmount},
					set : function(val){
						setterFunctions['MinLimitAmount'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"modifiedby" : {
					get : function(){return privateState.modifiedby},
					set : function(val){
						setterFunctions['modifiedby'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Name" : {
					get : function(){return privateState.Name},
					set : function(val){
						setterFunctions['Name'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Rewards" : {
					get : function(){return privateState.Rewards},
					set : function(val){
						setterFunctions['Rewards'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"softdeleteflag" : {
					get : function(){return privateState.softdeleteflag},
					set : function(val){
						setterFunctions['softdeleteflag'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"synctimestamp" : {
					get : function(){return privateState.synctimestamp},
					set : function(val){
						setterFunctions['synctimestamp'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(LoanProduct);
	
	//Create new class level validator object
	BaseModel.Validator.call(LoanProduct);
	
	var registerValidatorBackup = LoanProduct.registerValidator;
	
	LoanProduct.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( LoanProduct.isValid(this, propName, val) ){
					return setterBackup.apply(null, arguments);
				}else{
					throw Error("Validation failed for "+ propName +" : "+val);
				}
			}
			setterFunctions[arguments[0]].changed = true;
		}
		return registerValidatorBackup.apply(null, arguments);
	}
	
	//Extending Model for custom operations
	
	var relations = [
	];
	
	LoanProduct.relations = relations;
	
	LoanProduct.prototype.isValid = function(){
		return LoanProduct.isValid(this);
	};
	
	LoanProduct.prototype.objModelName = "LoanProduct";
	
	return LoanProduct;
});