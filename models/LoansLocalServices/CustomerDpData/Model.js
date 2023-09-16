define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		AccountBalance : function(val, state){
			state['AccountBalance'] = val;
		},
		ActionProfile_id : function(val, state){
			state['ActionProfile_id'] = val;
		},
		Age : function(val, state){
			state['Age'] = val;
		},
		AnnualIncome : function(val, state){
			state['AnnualIncome'] = val;
		},
		createdby : function(val, state){
			state['createdby'] = val;
		},
		createdts : function(val, state){
			state['createdts'] = val;
		},
		CreditScore : function(val, state){
			state['CreditScore'] = val;
		},
		Customer_id : function(val, state){
			state['Customer_id'] = val;
		},
		DebtToIncomeRatio : function(val, state){
			state['DebtToIncomeRatio'] = val;
		},
		EmploymentType : function(val, state){
			state['EmploymentType'] = val;
		},
		id : function(val, state){
			state['id'] = val;
		},
		Input1 : function(val, state){
			state['Input1'] = val;
		},
		Input2 : function(val, state){
			state['Input2'] = val;
		},
		Input3 : function(val, state){
			state['Input3'] = val;
		},
		Input4 : function(val, state){
			state['Input4'] = val;
		},
		Input5 : function(val, state){
			state['Input5'] = val;
		},
		lastmodifiedts : function(val, state){
			state['lastmodifiedts'] = val;
		},
		modifiedby : function(val, state){
			state['modifiedby'] = val;
		},
		PrequalifyScore : function(val, state){
			state['PrequalifyScore'] = val;
		},
		softdeleteflag : function(val, state){
			state['softdeleteflag'] = val;
		},
		State : function(val, state){
			state['State'] = val;
		},
		synctimestamp : function(val, state){
			state['synctimestamp'] = val;
		},
		TimeofEmployment : function(val, state){
			state['TimeofEmployment'] = val;
		},
	};
	
	
	//Create the Model Class
	function CustomerDpData(defaultValues){
		var privateState = {};
			privateState.AccountBalance = defaultValues?(defaultValues["AccountBalance"]?defaultValues["AccountBalance"]:null):null;
			privateState.ActionProfile_id = defaultValues?(defaultValues["ActionProfile_id"]?defaultValues["ActionProfile_id"]:null):null;
			privateState.Age = defaultValues?(defaultValues["Age"]?defaultValues["Age"]:null):null;
			privateState.AnnualIncome = defaultValues?(defaultValues["AnnualIncome"]?defaultValues["AnnualIncome"]:null):null;
			privateState.createdby = defaultValues?(defaultValues["createdby"]?defaultValues["createdby"]:null):null;
			privateState.createdts = defaultValues?(defaultValues["createdts"]?defaultValues["createdts"]:null):null;
			privateState.CreditScore = defaultValues?(defaultValues["CreditScore"]?defaultValues["CreditScore"]:null):null;
			privateState.Customer_id = defaultValues?(defaultValues["Customer_id"]?defaultValues["Customer_id"]:null):null;
			privateState.DebtToIncomeRatio = defaultValues?(defaultValues["DebtToIncomeRatio"]?defaultValues["DebtToIncomeRatio"]:null):null;
			privateState.EmploymentType = defaultValues?(defaultValues["EmploymentType"]?defaultValues["EmploymentType"]:null):null;
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.Input1 = defaultValues?(defaultValues["Input1"]?defaultValues["Input1"]:null):null;
			privateState.Input2 = defaultValues?(defaultValues["Input2"]?defaultValues["Input2"]:null):null;
			privateState.Input3 = defaultValues?(defaultValues["Input3"]?defaultValues["Input3"]:null):null;
			privateState.Input4 = defaultValues?(defaultValues["Input4"]?defaultValues["Input4"]:null):null;
			privateState.Input5 = defaultValues?(defaultValues["Input5"]?defaultValues["Input5"]:null):null;
			privateState.lastmodifiedts = defaultValues?(defaultValues["lastmodifiedts"]?defaultValues["lastmodifiedts"]:null):null;
			privateState.modifiedby = defaultValues?(defaultValues["modifiedby"]?defaultValues["modifiedby"]:null):null;
			privateState.PrequalifyScore = defaultValues?(defaultValues["PrequalifyScore"]?defaultValues["PrequalifyScore"]:null):null;
			privateState.softdeleteflag = defaultValues?(defaultValues["softdeleteflag"]?defaultValues["softdeleteflag"]:null):null;
			privateState.State = defaultValues?(defaultValues["State"]?defaultValues["State"]:null):null;
			privateState.synctimestamp = defaultValues?(defaultValues["synctimestamp"]?defaultValues["synctimestamp"]:null):null;
			privateState.TimeofEmployment = defaultValues?(defaultValues["TimeofEmployment"]?defaultValues["TimeofEmployment"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"AccountBalance" : {
					get : function(){return privateState.AccountBalance},
					set : function(val){
						setterFunctions['AccountBalance'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"ActionProfile_id" : {
					get : function(){return privateState.ActionProfile_id},
					set : function(val){
						setterFunctions['ActionProfile_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Age" : {
					get : function(){return privateState.Age},
					set : function(val){
						setterFunctions['Age'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"AnnualIncome" : {
					get : function(){return privateState.AnnualIncome},
					set : function(val){
						setterFunctions['AnnualIncome'].call(this,val,privateState);
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
				"CreditScore" : {
					get : function(){return privateState.CreditScore},
					set : function(val){
						setterFunctions['CreditScore'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Customer_id" : {
					get : function(){return privateState.Customer_id},
					set : function(val){
						setterFunctions['Customer_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"DebtToIncomeRatio" : {
					get : function(){return privateState.DebtToIncomeRatio},
					set : function(val){
						setterFunctions['DebtToIncomeRatio'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"EmploymentType" : {
					get : function(){return privateState.EmploymentType},
					set : function(val){
						setterFunctions['EmploymentType'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"id" : {
					get : function(){return privateState.id},
					set : function(val){throw Error("id cannot be changed."); },
					enumerable : true,
				},
				"Input1" : {
					get : function(){return privateState.Input1},
					set : function(val){
						setterFunctions['Input1'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Input2" : {
					get : function(){return privateState.Input2},
					set : function(val){
						setterFunctions['Input2'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Input3" : {
					get : function(){return privateState.Input3},
					set : function(val){
						setterFunctions['Input3'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Input4" : {
					get : function(){return privateState.Input4},
					set : function(val){
						setterFunctions['Input4'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Input5" : {
					get : function(){return privateState.Input5},
					set : function(val){
						setterFunctions['Input5'].call(this,val,privateState);
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
				"modifiedby" : {
					get : function(){return privateState.modifiedby},
					set : function(val){
						setterFunctions['modifiedby'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"PrequalifyScore" : {
					get : function(){return privateState.PrequalifyScore},
					set : function(val){
						setterFunctions['PrequalifyScore'].call(this,val,privateState);
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
				"State" : {
					get : function(){return privateState.State},
					set : function(val){
						setterFunctions['State'].call(this,val,privateState);
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
				"TimeofEmployment" : {
					get : function(){return privateState.TimeofEmployment},
					set : function(val){
						setterFunctions['TimeofEmployment'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(CustomerDpData);
	
	//Create new class level validator object
	BaseModel.Validator.call(CustomerDpData);
	
	var registerValidatorBackup = CustomerDpData.registerValidator;
	
	CustomerDpData.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( CustomerDpData.isValid(this, propName, val) ){
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
	
	CustomerDpData.relations = relations;
	
	CustomerDpData.prototype.isValid = function(){
		return CustomerDpData.isValid(this);
	};
	
	CustomerDpData.prototype.objModelName = "CustomerDpData";
	
	return CustomerDpData;
});