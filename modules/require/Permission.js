define([], function () {
    "use strict";
    var Permission = /** @class */ (function () {
        function Permission(name) {
            this.name = name;
        }
        Permission.prototype.checkPermitted = function (availablePermissions) {
            return availablePermissions.indexOf(this.name) > -1;
        };
        return Permission;
    }());
    return Permission;
});
