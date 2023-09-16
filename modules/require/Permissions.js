define(["Permission"], function (Permission) {
    "use strict";
    return {
        all: function (permissions) {
            var newPermission = new Permission('all');
            newPermission.checkPermitted = function (availablePermissions) {
                return permissions.every(function (permission) {
                    return permission.checkPermitted(availablePermissions);
                });
            };
            return newPermission;
        },
        any: function (permissions) {
            var newPermission = new Permission('any');
            newPermission.checkPermitted = function (availablePermissions) {
                return permissions.some(function (permission) {
                    return permission.checkPermitted(availablePermissions);
                });
            };
            return newPermission;
        }
    };
});
