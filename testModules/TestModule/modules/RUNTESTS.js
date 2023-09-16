RUNTESTS = function(){
    var testModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TestModule");
    testModule.presentationController.configureCommandTests();
    //testModule.presentationController.presentUserInterface = console.log;
    testModule.presentationController.startNewTestRun();

    var backup = testModule.presentationController.afterAll;

    testModule.presentationController.afterAll = function(results){
        backup.call(testModule.presentationController, results);
        //sending test results to server to generate test report
        $.post('https://mac63.konylabs.net:7654/mdapostresults',{
                  content: results.map(result => {
                    result.status = result.isPass ? 'PASS' : 'FAIL';
                    return JSON.parse(JSON.stringify(result));
                  }) ,
                    ExecutioName : "adminConsole",
                    platform : "desktopWeb",
                    moduleName : testModule.presentationController.Test_Suite_Name
				}
      		);
    };
};
setTimeout(RUNTESTS, 60 * 1000);