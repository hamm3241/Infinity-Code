define(function () {
    var expect = chai.expect;
    var loginSuccess = function (response) {
        expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
        expect(response.data,
            'to get response token').to.include.keys("value");
        expect(kony.mvc.MDAApplication.getSharedInstance().appContext.session_token,
            'to store response token in to appContext global').to.equal(response.data.value);
    };
    var loginFail = function (response) {
        expect(response.status, 'status to be failure').to.equal(kony.mvc.constants.STATUS_FAILURE);
        expect(response.data.details.errmsg).to.be.a("string");
        expect(JSON.parse(response.data.details.errmsg).loginErrorCode, 'to be correct error code').to.equal(-3);
    };

    var testData = [
        {
            testId : 'Login with correct UserName Should Succeed',
            forInput : {
                },
            expect : loginSuccess
        },
        {
            testId : 'Login with inCorrect UserName Should Fail',
            forInput : {
                },
            expect : loginFail
        },
    ];

    return testData;
});