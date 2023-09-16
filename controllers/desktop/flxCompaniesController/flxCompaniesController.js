define({ 

 showViewPermission : function(){
    
    kony.application.getCurrentForm().mainHeader.flxAddNewOption.setVisibility(false);
    kony.application.getCurrentForm().mainHeader.flxDownloadList.setVisibility(false);
 	kony.application.getCurrentForm().flxPermissions.setVisibility(false);
 	kony.application.getCurrentForm().flxViews.setVisibility(true);
 	kony.application.getCurrentForm().flxMainSubHeader.setVisibility(false);
 	kony.application.getCurrentForm().flxAddMainContainer.setVisibility(false);
 	kony.application.getCurrentForm().flxViewPermissions.setVisibility(true);
 	this.setViewPermissionSegmentData();
 },
 
 setViewPermissionSegmentData : function(){
        var dataMap={
            "flxViewPermissions": "flxViewPermissions",
            "lblDescription": "lblDescription",
            "lblPermissionName": "lblPermissionName",
            "lblSeperator": "lblSeperator"
        };
        var data=[
            {
            "lblDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
            "lblPermissionName": "Admin Role",
            "lblSeperator": "-",
            "template": "flxViewPermissions"
            },
            {
            "lblDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
            "lblPermissionName": "A/c Role",
            "lblSeperator": "-",
            "template": "flxViewPermissions"
            },
            {
            "lblDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
            "lblPermissionName": "FD Admin",
            "lblSeperator": "-",
            "template": "flxViewPermissions"
            },
            {
            "lblDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
            "lblPermissionName": "Backend Admin",
            "lblSeperator": "-",
            "template": "flxViewPermissions"
            },
            {
            "lblDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
            "lblPermissionName": "ATM Admin",
            "lblSeperator": "-",
            "template": "flxViewPermissions"
            },
            {
            "lblDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
            "lblPermissionName": "Loans Admin",
            "lblSeperator": "-",
            "template": "flxViewPermissions"
            },
            {
            "lblDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
            "lblPermissionName": "Branch Admin",
            "lblSeperator": "-",
            "template": "flxViewPermissions"
            },
            {
            "lblDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
            "lblPermissionName": "Admin Role",
            "lblSeperator": "-",
            "template": "flxViewPermissions"
            }
        ];
        kony.application.getCurrentForm().segViewSegment.widgetDataMap=dataMap;
        kony.application.getCurrentForm().segViewSegment.setData(data);
        kony.application.getCurrentForm().forceLayout();
    }

 });