define(['MenuModel'], function (Menu) {
    var presentUserInterface = kony.mvc.Presentation.BasePresenter.prototype.presentUserInterface;
    var currentPresentor = null;
    var isAllowedToPresent = function (presentor) {
        return currentPresentor === null || 
        currentPresentor === presentor ||
        presentor === kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AuthModule').presentationController;
    };
    var setCurrentPresentor = function (presentor) {
        currentPresentor = presentor;
    };
    
    var assertPresentorIsValid = function(presentor){
        if(!presentor || !(presentor instanceof kony.mvc.Presentation.BasePresenter)){
            throw Error('Not Valid PresentationController');
        }
    };
    var navigateTo = function (moduleName, presentationMethod, args) {
        var presentor = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule(moduleName).presentationController;
        assertPresentorIsValid(presentor);
        if(typeof(presentor.initializePresentationController) === 'function'){
            presentor.initializePresentationController();
        }
        args = args || [];
        var previousPresentor = currentPresentor;
        try{
            setCurrentPresentor(presentor);
            return presentor[presentationMethod].apply(presentor, args);
        }catch(e){
            setCurrentPresentor(previousPresentor);
            throw e;
        }
    };
    
    var menu = new Menu(navigateTo);
    menu.setItems([
        menu.newItem('Dashboard','i18n.leftmenu.dashboard','DashboardModule','fetchDashBoardData'),
        menu.newItem('Messages','i18n.leftmenu.messages','CSRModule','showMessages'),
        menu.newItem('Alerts','i18n.leftmenu.alerts','AlertsManagementModule','initAlerts'),
      	//menu.newItem('Money Movement Scheduling','i18n.leftMenu.MoneyMovementScheduling','SchedulingModule','initMoneyMovement'),
        menu.newSection('REPORTS & LOGS','i18n.leftmenu.reports&Logs', [
            menu.newItem('Logs','i18n.leftmenu.Logs','LogsModule', 'showLogsUIScreen'),
          	menu.newItem('Reports','i18n.leftmenu.reports','ReportsManagementModule','renderReports')
        ]),
        menu.newSection('MEMBER MANAGEMENT','i18n.leftmenu.customerManagement', [
            // menu.newItem('Leads','i18n.leftmenu.leads','LeadManagementModule','fetchLeads'),
            menu.newItem('Customers','i18n.leftmenu.customers','CustomerManagementModule','showCustomerManagement'),
            // menu.newItem('Contracts','i18n.leftmenu.contracts','CompaniesModule','showCompanies'),
            menu.newItem('Contracts','i18n.leftmenu.contracts','CompaniesModule','showContractSearch'),
            menu.newItem('Customer Roles','i18n.leftmenu.groups','CustomerGroupsModule','fetchLegalEntity'),
           // menu.newItem('Application Management','i18n.leftmenu.applicationManagement','MasterDataModule','openJourneyManager'),
            menu.newItem('Infinity Assist','i18n.leftmenu.infinityAssist','MasterDataModule','openInfinityAssist'),
            menu.newItem('Journey Analytics','i18n.leftmenu.JAManagement','MasterDataModule','openJADashboard')
        ]),
        menu.newSection('EMPLOYEE MANAGEMENT','i18n.leftmenu.employeeManagement', [
            menu.newItem('Roles','i18n.leftmenu.roles','RoleModule','fetchRoleList'),
            menu.newItem('Users','i18n.leftmenu.users', 'InternalUserModule', 'fetchUsersList'),
            menu.newItem('Permissions','i18n.leftmenu.permissions', 'PermissionsModule', 'showPermissionsForm')
        ]),
      	menu.newSection('CONFIGURATIONS','i18n.leftmenu.configurations', [
        	menu.newItem('Configuration Bundles','i18n.leftmenu.configurationBundles','ConfigurationsModule','fetchBundles'),
            menu.newItem('Business Configurations','i18n.leftmenu.businessconfigurations','ConfigurationsModule','fetchEligibilityCriteria'),
          	menu.newItem('Service Definition Configurations','i18n.leftmenu.serviceDefinition','ConfigurationsModule','showServiceDefinition'),
        ]),
      	menu.newSection('SECURITY & AUTHENTICATION','i18n.leftmenu.securityAuthentication', [
            menu.newItem('MFA Scenarios','i18n.leftmenu.mfaTriggers','MFAModule','showMFAScenarios','SPOTLIGHT_DISABLE_SCA'),
            menu.newItem('SCA Scenarios','i18n.leftmenu.scaTriggers','SCAModule','showSCAScenarios','SPOTLIGHT_DISABLE_SCA'),
            menu.newItem('Credential Policy','i18n.leftmenu.credentialManagement','PolicyModule','showUserPasswordPolicies','SPOTLIGHT_DISABLE_SCA'),
            menu.newItem('Password Settings','i18n.leftmenu.passwordAgeAndLockout','PasswordAgeAndLockoutModule','getPasswordLockoutSettings','SPOTLIGHT_DISABLE_SCA'),
        ]),
        menu.newSection('APPLICATIONS CONTENT MANAGEMENT','i18n.leftmenu.applicationsContentManagement', [
          	menu.newItem('Locations','i18n.leftmenu.locations', 'MasterDataModule', 'fetchAllLocationDetails'),
          	menu.newItem('Privacy Policies','i18n.leftmenu.privacyPolicies','PrivacyPolicyModule','showPrivacyPolicy'),
          	menu.newItem('T&C','i18n.leftmenu.t&c','TermsAndConditionsModule','getAllTermsAndConditions'),
            menu.newItem('Service Outage Message','i18n.leftmenu.serviceOutageMessage','OutageMessageModule','showOutageMessage'),
            menu.newItem('Customer Care Information','i18n.leftmenu.customerCareInformation','MasterDataModule','fetchAllCustomerCareDetails'),
            menu.newItem('FAQs','i18n.leftmenu.faqs','FAQsModule','fetchFAQs'),
        ]),
        menu.newSection('MASTER DATA MANAGEMENT','i18n.leftmenu.masterDataManagement', [
            menu.newItem('Services','i18n.leftmenu.ServicesLC','ServicesManagementModule','showFeatures'),
            menu.newItem('Products','i18n.leftmenu.products','MasterDataModule','getProducts'),
            //menu.newItem('Employee Features','i18n.leftmenu.EmployeeFeatures','ServicesManagementModule','showEmployeeFeatures'),
          	menu.newItem('Security Questions','i18n.leftmenu.securityQuestions', 'SecurityModule' ,'fetchAllSecurityQuestions','SPOTLIGHT_DISABLE_SCA'),
            menu.newItem('Banks for transfer','i18n.leftmenu.banksForTransfer'),
            menu.newItem('Schedule Master','i18n.leftmenu.scheduleMaster'),
          	// commented 'Secure Images' entry in Left Menu from R4.2.1 onwards
            // menu.newItem('Secure Images','i18n.leftmenu.secureImages','SecurityModule','fetchAllImages'),
            
            //menu.newItem('Decision Management','i18n.decisionManagement.DecisionManagement', 'DecisionManagementModule' ,'showDecisionManagement')
        ]),
      menu.newSection('ENGAGEMENTS','i18n.leftmenu.engagements', [
        menu.newItem('Segments','i18n.leftmenu.segments', 'ProfileManagementModule', 'getProfiles'),
        menu.newItem('Ad Management','i18n.leftmenu.adManagement','CampaignModule','fetchConfigurationsAndDatasets'),
      ]),
    ]);
    var leftMenuTag = 'leftMenuModel';
    var presentLeftMenu = function (presentor, formName) {
        var leftMenuViewModel = {};
        leftMenuViewModel[leftMenuTag] = menu;
        presentUserInterface.call(presentor, formName, leftMenuViewModel);
    };

    return {
        presentUserInterface: function (formName, viewModel) {
            if (isAllowedToPresent(this)) {
                var exception = null;
                try{
                    presentUserInterface.call(this, formName, viewModel);
                }catch(e){
                    exception = e;
                }
                presentLeftMenu(this, formName);
                if(exception){
                    throw exception;
                }
            }else{
                throw Error('Not allowed to present as this is not the current presentor');
            }
        },
        getLeftMenuTag : function(){
            return leftMenuTag;
        },
        navigateTo: function(moduleName, presentationMethod, args){
            return menu.navigateTo(moduleName, presentationMethod, args);
        },
        canNavigateBack : function(){
            return menu.canGoBack();
        },
        navigateBack : function(){
            return menu.goBack();
        }
    };
});