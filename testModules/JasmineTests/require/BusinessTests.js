define([], function () {
    return function Tests({
        describe,
        it,
        expect,
        beforeAll,
        spyOn,
        fail
    }) {
        describe('AuthModule', function () {
            var authModule;
            it('can be fetched from MOduleManger', function () {
                authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
                expect(authModule).toBeDefined();
            });

            it('can be used to login', function (done) {
                authModule.businessController.doLogin({
                }, () => {
                    done();
                }, () => {
                    fail('supposes to be logged in');
                });
            });
        });

        describe('DashBoard Manager', function () {
            var dashBoardManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("DashboardManager");
            it('exists', function () {
                expect(dashBoardManager).toBeDefined();
            });
            it('can be used to fetch DashBoard Alerts', function (done) {
                dashBoardManager.businessController.fetchDashBoardAlerts({}, (alerts) => {
                    console.log('dashBoardAlerts', alerts);
                    expect(alerts.length).toBe(6);
                    done();
                }, () => {
                    fail('Error Callback');
                });
            });
        });

        describe('user test case-', function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

            beforeAll(function () {
                window.onbeforeunload = () => console.log('Mock redirect');
                window.open = () => console.log('Mock redirect');
            });
            it("disabled permission will not be available for the user", function (done) {

                var AuthModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
                AuthModule.businessController.doLogin({
                        "rememberMe": null
                    },
                    (...args) => {
                        expect(args[0]["params"]["security_attributes"]["Permissions"]).toEqual(jasmine.arrayContaining([
                            jasmine.objectContaining({
                                Permission_name: "ChangePassword",
                                Permission_id: "PID39",
                            }),
                        ]));
                        expect(args[0]["params"]["security_attributes"]["ServicesAuthData"]).toEqual(jasmine.arrayContaining([
                            jasmine.objectContaining({
                                ServiceName: "CustomIdentity",
                                Operations: "[\"updatePassword\"]",
                            }),
                        ]));
                        expect(args[0]["params"]["security_attributes"]["ServicesAuthData"]).not.toEqual(jasmine.arrayContaining([
                            jasmine.objectContaining({
                                ServiceName: "CustomIdentity",
                                Operations: "[]",
                            }),
                        ]));
                        // expect(args[0]["value"]).toBe("161D7E0D50BFB087979BB77AEF75506F")


                        var PermissionsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PermissionsModule");
                        PermissionsModule.businessController.fetchPermissions({},
                            (...args) => {
                                expect(args[0]).toEqual(jasmine.arrayContaining([
                                    jasmine.objectContaining({
                                        PermissionType_id: "PER_TYPE_AUTH",
                                        Permission_Desc: "Permission to update the password for their own profiles",
                                        Permission_id: "PID39",
                                        Permission_Name: "ChangePassword",
                                        Role_Count: "2",
                                        Status_Desc: "Active",
                                        Status_id: "SID_ACTIVE",
                                        Users_Count: "4",
                                    }),
                                ]));
                                expect(args[0]).not.toEqual(jasmine.arrayContaining([
                                    jasmine.objectContaining({
                                        PermissionType_id: "PER_TYPE_AUTH",
                                        Permission_Desc: "Permission to update the password for their own profiles",
                                        Permission_id: "PID39",
                                        Permission_Name: "ChangePassword",
                                        Role_Count: "2",
                                        Status_Desc: "Inactive",
                                        Status_id: "SID_INACTIVE",
                                        Users_Count: "4",
                                    }),
                                ]));


                                var PermissionsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PermissionsModule");
                                PermissionsModule.businessController.changePermissionStatus({
                                        "Permission_id": "PID39",
                                        "Status_id": "SID_INACTIVE"
                                    },
                                    (...args) => {


                                        var AuthModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
                                        AuthModule.businessController.doLogout({},
                                            (...args) => {


                                                var AuthModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
                                                AuthModule.businessController.doLogin({
                                                        "rememberMe": null
                                                    },
                                                    (...args) => {
                                                        expect(args[0]["params"]["security_attributes"]["Permissions"]).not.toEqual(jasmine.arrayContaining([
                                                            jasmine.objectContaining({
                                                                Permission_name: "ChangePassword",
                                                                Permission_id: "PID39",
                                                            }),
                                                        ]));
                                                        expect(args[0]["params"]["security_attributes"]["ServicesAuthData"]).toEqual(jasmine.arrayContaining([
                                                            jasmine.objectContaining({
                                                                ServiceName: "CustomIdentity",
                                                                Operations: "[]",
                                                            }),
                                                        ]));
                                                        expect(args[0]["params"]["security_attributes"]["ServicesAuthData"]).not.toEqual(jasmine.arrayContaining([
                                                            jasmine.objectContaining({
                                                                ServiceName: "CustomIdentity",
                                                                Operations: "[\"updatePassword\"]",
                                                            }),
                                                        ]));
                                                        // expect(args[0]["value"]).toBe("EE9ADF4C275349A45EAD701881036FEB")


                                                        var PermissionsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PermissionsModule");
                                                        PermissionsModule.businessController.fetchPermissions({},
                                                            (...args) => {
                                                                expect(args[0]).toEqual(jasmine.arrayContaining([
                                                                    jasmine.objectContaining({
                                                                        PermissionType_id: "PER_TYPE_AUTH",
                                                                        Permission_Desc: "Permission to update the password for their own profiles",
                                                                        Permission_id: "PID39",
                                                                        Permission_Name: "ChangePassword",
                                                                        Role_Count: "2",
                                                                        Status_Desc: "Inactive",
                                                                        Status_id: "SID_INACTIVE",
                                                                        Users_Count: "4",
                                                                    }),
                                                                ]));
                                                                expect(args[0]).not.toEqual(jasmine.arrayContaining([
                                                                    jasmine.objectContaining({
                                                                        PermissionType_id: "PER_TYPE_AUTH",
                                                                        Permission_Desc: "Permission to update the password for their own profiles",
                                                                        Permission_id: "PID39",
                                                                        Permission_Name: "ChangePassword",
                                                                        Role_Count: "2",
                                                                        Status_Desc: "Active",
                                                                        Status_id: "SID_ACTIVE",
                                                                        Users_Count: "4",
                                                                    }),
                                                                ]));

                                                                var PermissionsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PermissionsModule");
                                                                PermissionsModule.businessController.changePermissionStatus({
                                                                        "Permission_id": "PID39",
                                                                        "Status_id": "SID_ACTIVE"
                                                                    },
                                                                    (...args) => {
                                                                        done();
                                                                    },
                                                                    _ => {
                                                                        fail("This callback should not be called");
                                                                    });
                                                            },
                                                            _ => {
                                                                fail("This callback should not be called");
                                                            }
                                                        );

                                                    },
                                                    _ => {
                                                        fail("This callback should not be called");
                                                    }
                                                );

                                            },
                                            _ => {
                                                fail("This callback should not be called");
                                            }
                                        );

                                    },
                                    _ => {
                                        fail("This callback should not be called");
                                    }
                                );

                            },
                            _ => {
                                fail("This callback should not be called");
                            }
                        );

                    },
                    _ => {
                        fail("This callback should not be called");
                    }
                );
            });
            it("disable and enable a role", function (done) {

                var AuthModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
                AuthModule.businessController.doLogin({
                        "rememberMe": null
                    },
                    (...args) => {
            
            
                        var RoleModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("RoleModule");
                        RoleModule.businessController.fetchAllRoles({},
                            (...args) => {
                                expect(args[0]["roles_view"]).toEqual(jasmine.arrayContaining([
                                    jasmine.objectContaining({
                                        Status: "Active",
                                        role_Name: "Operations",
                                        Status_id: "SID_ACTIVE",
                                        role_id: "RID_OPS",
                                        permission_Count: "30",
                                        Users_Count: "4",
                                        Status_Desc: "Active",
                                        role_Desc: "This role can manage the various services, operations and entitlements provided by the bank/CU",
                                        roleType_id: "ROLE_TYPE_1",
                                    }),
                                ]));
                                expect(args[0]["roles_view"]).not.toEqual(jasmine.arrayContaining([
                                    jasmine.objectContaining({
                                        Status: "Inactive",
                                        role_Name: "Operations",
                                        Status_id: "SID_INACTIVE",
                                        role_id: "RID_OPS",
                                        permission_Count: "30",
                                        Users_Count: "4",
                                        Status_Desc: "Inactive",
                                        role_Desc: "This role can manage the various services, operations and entitlements provided by the bank/CU",
                                        roleType_id: "ROLE_TYPE_1",
                                    }),
                                ]));
            
            
                                var RoleModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("RoleModule");
                                RoleModule.businessController.updateRoleStatus({
                                        "User_id": "UID11",
                                        "Role_Details": {
                                            "id": "RID_OPS",
                                            "Status_id": "SID_INACTIVE"
                                        }
                                    },
                                    (...args) => {
                                        expect(args[0]["updateRoleResponse"]).toBe("{\"role\":[{\"Status_id\":\"SID_INACTIVE\",\"id\":\"RID_OPS\"}],\"opstatus\":0,\"updatedRecords\":1,\"httpStatusCode\":0}")
            
            
                                        var RoleModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("RoleModule");
                                        RoleModule.businessController.fetchAllRoles({},
                                            (...args) => {
                                                expect(args[0]["roles_view"]).toEqual(jasmine.arrayContaining([
                                                    jasmine.objectContaining({
                                                        Status: "Inactive",
                                                        role_Name: "Operations",
                                                        Status_id: "SID_INACTIVE",
                                                        role_id: "RID_OPS",
                                                        permission_Count: "30",
                                                        Users_Count: "4",
                                                        Status_Desc: "Inactive",
                                                        role_Desc: "This role can manage the various services, operations and entitlements provided by the bank/CU",
                                                        roleType_id: "ROLE_TYPE_1",
                                                    }),
                                                ]));
                                                expect(args[0]["roles_view"]).not.toEqual(jasmine.arrayContaining([
                                                    jasmine.objectContaining({
                                                        Status: "Active",
                                                        role_Name: "Operations",
                                                        Status_id: "SID_ACTIVE",
                                                        role_id: "RID_OPS",
                                                        permission_Count: "30",
                                                        Users_Count: "4",
                                                        Status_Desc: "Active",
                                                        role_Desc: "This role can manage the various services, operations and entitlements provided by the bank/CU",
                                                        roleType_id: "ROLE_TYPE_1",
                                                    }),
                                                ]));
            
            
                                                var RoleModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("RoleModule");
                                                RoleModule.businessController.updateRoleStatus({
                                                        "User_id": "UID11",
                                                        "Role_Details": {
                                                            "id": "RID_OPS",
                                                            "Status_id": "SID_ACTIVE"
                                                        }
                                                    },
                                                    (...args) => {
                                                        expect(args[0]["updateRoleResponse"]).toBe("{\"role\":[{\"Status_id\":\"SID_ACTIVE\",\"id\":\"RID_OPS\"}],\"opstatus\":0,\"updatedRecords\":1,\"httpStatusCode\":0}")
            
            
                                                        var RoleModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("RoleModule");
                                                        RoleModule.businessController.fetchAllRoles({},
                                                            (...args) => {
                                                                expect(args[0]["roles_view"]).toEqual(jasmine.arrayContaining([
                                                                    jasmine.objectContaining({
                                                                        Status: "Active",
                                                                        role_Name: "Operations",
                                                                        Status_id: "SID_ACTIVE",
                                                                        role_id: "RID_OPS",
                                                                        permission_Count: "30",
                                                                        Users_Count: "4",
                                                                        Status_Desc: "Active",
                                                                        role_Desc: "This role can manage the various services, operations and entitlements provided by the bank/CU",
                                                                        roleType_id: "ROLE_TYPE_1",
                                                                    }),
                                                                ]));
                                                                expect(args[0]["roles_view"]).not.toEqual(jasmine.arrayContaining([
                                                                    jasmine.objectContaining({
                                                                        Status: "Inactive",
                                                                        role_Name: "Operations",
                                                                        Status_id: "SID_INACTIVE",
                                                                        role_id: "RID_OPS",
                                                                        permission_Count: "30",
                                                                        Users_Count: "4",
                                                                        Status_Desc: "Inactive",
                                                                        role_Desc: "This role can manage the various services, operations and entitlements provided by the bank/CU",
                                                                        roleType_id: "ROLE_TYPE_1",
                                                                    }),
                                                                ]));
            
                                                                done();
                                                            },
                                                            _ => {
                                                                fail("This callback should not be called");
                                                            }
                                                        );
            
                                                    },
                                                    _ => {
                                                        fail("This callback should not be called");
                                                    }
                                                );
            
                                            },
                                            _ => {
                                                fail("This callback should not be called");
                                            }
                                        );
            
                                    },
                                    _ => {
                                        fail("This callback should not be called");
                                    }
                                );
            
                            },
                            _ => {
                                fail("This callback should not be called");
                            }
                        );
            
                    },
                    _ => {
                        fail("This callback should not be called");
                    }
                );
            
            });
        });//describe end

    };
});