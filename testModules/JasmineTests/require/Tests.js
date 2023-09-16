define([],function(){
    return function Tests({describe,it,expect}){
        describe('Permission',function(){
            var Permission = require('Permission');
            var allowSomething;
            it('can be instantiated with a permissions name : string',function(){
                allowSomething = new Permission('something');
                expect(allowSomething).toBeDefined();
            });
            it('returns true if we call check permitted with a list of strings that contains the permissions name', function(){
                var listOfPermissions = ['something','others'];
                expect(allowSomething.checkPermitted(listOfPermissions)).toBe(true);
            });
            it('returns false if we call check permitted with a list of strings that does not contain the permissions name', function(){
                var listOfPermissions = ['other1','other2'];
                expect(allowSomething.checkPermitted(listOfPermissions)).toBe(false);
            });
        });
        describe('Permissions',function(){
            var Permission = require('Permission');
            var somePermissions = [new Permission("1"), new Permission("2"), new Permission("3")];
            var Permissions = require('Permissions');
            it('has method all & any',function(){
                expect(Permissions.all).toBeDefined();
                expect(Permissions.any).toBeDefined();
            });
            it('all: given permissions returns a new permissions that only returns true if all the permissions are permitted', function(){
                var allPermission = Permissions.all(somePermissions);
                expect(allPermission.checkPermitted(['1','2','4','5'])).toBe(false);
                expect(allPermission.checkPermitted(['1','2','3','5'])).toBe(true);
            });
            it('all: given permissions returns a new permissions that returns true if any permission is permitted', function(){
                var anyPermission = Permissions.any(somePermissions);
                expect(anyPermission.checkPermitted(['4','5'])).toBe(false);
                expect(anyPermission.checkPermitted(['1','5'])).toBe(true);
            });
            it('all & any can be mixed to create more complex permissions',function(){
                var complexPerm = Permissions.any(
                    Permissions.all(new Permission('1'), new Permission('2')),
                    Permissions.all(new Permission('4'), new Permission('5'))
                );
                //complexPerm -> true if (1 && 2) || (4 && 5)
                expect(complexPerm.checkPermitted(['1','5'])).toBe(false);
                expect(complexPerm.checkPermitted(['1','2','3'])).toBe(true);
                expect(complexPerm.checkPermitted(['3','4','5'])).toBe(true);
                expect(complexPerm.checkPermitted(['1', '2', '4', '5'])).toBe(true);
            });
        });
    };
});