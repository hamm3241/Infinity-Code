//should help write jasmine test cases by recording a running app
//record the arguments and the response of methods in mvc modules
//keep track of the order in which methods are called
//should use localStorage as the app may have to be refreshed(logout) inbetween 
//provide api commands like startRecording, pause/stopRecording, generate a test from the currently recorded, resetRecording
//should be able to keep track of async process so should stop going to the next step until some callback
//generate lean assertions for example if we go call the same method twice during a test it should diff the response and only assert on the difference
//provide api to help control test generation - for example we may want to limit the test to a particular module or layer

//we need to differentiate between user events and callback driven function executions as we try to follow the user when we formulate the tests
//should we examine the stack(possible?)? or record all the user actions(by monitoring the form events) as well?
var initialiseTestRecorder = _ => {
    if (window.testRecorderReady) {
        return;
    }
    var removeLeftPadding = str => {
        var nonEmptyLines = str.split('\n').filter(e => e.length > 0);
        var minLeftSpace = nonEmptyLines.map(e => e.match(/^\s{1,}/))
            .filter(e => Array.isArray(e) && e.length > 0)
            .map(e => e[0])
            .reduce((a, e) => a.length < e.length ? a : e, {
                length: Infinity
            });
        if (minLeftSpace.length != Infinity) {
            return str.split('\n').map(line => line.replace(minLeftSpace, '')).join('\n');
        } else {
            return str;
        }
    };
    var isCallBack = arg => arg && typeof (arg.called) === 'boolean' && typeof (arg.calledAt) === 'string';
    var argTest = (callRecord, otherCallRecords, nextStepStr) => callRecord.args.map((arg,i) => {
        if (isCallBack(arg)) {
            if (arg.called) {
                var similarCallRecords = otherCallRecords
                .filter(c => c.module === callRecord.module)
                .filter(c => c.controller === callRecord.controller)
                .filter(c => c.method === callRecord.method)
                .filter(c => c.args[i].called);
                return `(...args)=>{
                    ${arg.args
                        .map((callBackArg,i)=>generateExpectation('args'+'['+i+']', 
                            callBackArg, 
                            similarCallRecords.flatMap(c=>c.args.filter(isCallBack).filter(e=>e.called).map(e=>e.args[i]))))
                        .reduce((a,e)=>a+e,'')}
                    ${removeLeftPadding(nextStepStr)}
                }`;
            } else {
                return `_=>{
                    fail("This callback should not be called");
                }`
            }
        } else {
            return JSON.stringify(arg);
        }
    }).join(',\n');

    var deepEquals = (obj1, obj2) => {
        var same = (e1, e2) => e1 === e2;
        var forType = {
            'number': same,
            'string': same,
            'boolean': same,
            'undefined': same,
            'object': (obj1, obj2) => obj1 === obj2 || (obj1 != null && Object.entries(obj1).every(([key, val]) => deepEquals(obj2[key], val))),
        };
        return same(typeof (obj1), typeof (obj2)) && forType[typeof (obj1)](obj1, obj2);
    };
    var toJasmineMatchPattern = (obj, leftPad = '') => {
        if (typeof (obj) === 'object' && obj != null) {
            if (Array.isArray(obj)) {
                return `jasmine.arrayContaining([${obj
                            .map(e=>toJasmineMatchPattern(e,leftPad+'\t'))
                            .reduce((a,e)=>a+leftPad+e+',\n','\n')}${leftPad}])`;
            } else return `jasmine.objectContaining({${Object.entries(obj)
                            .map(([key,val])=> `${key}: ${toJasmineMatchPattern(val,leftPad+'\t')}`)
                            .reduce((a,e)=>a+leftPad+e+',\n','\n')}${leftPad}})`;
        } else return JSON.stringify(obj);
    };
    var ignoredPropPaths = [
        ['httpresponse'],
        ['params', 'raw_response'],
        ['params', 'security_attributes', 'raw_response'],
        ['params', 'security_attributes', 'session_token'],
        ['params', 'security_attributes', '_provider_token'],
        ['params', 'user_attributes', 'raw_response'],
        ['params', 'user_attributes', 'SyncTimeStamp'],
        ['params', 'user_attributes', 'LastModifiedTimeStamp']
    ];
    var withOnlyReleventProps = obj => {
        var deleteProp = (obj, path) => {
            if (path.length === 1) {
                delete obj[path[0]];
            } else {
                if (typeof (obj[path[0]]) === 'object' && obj[path[0]] != null) {
                    deleteProp(obj[path[0]], path.slice(1));
                }
            }
        };
        var newObj = JSON.parse(JSON.stringify(obj));
        ignoredPropPaths.forEach(path => {
            deleteProp(newObj, path);
        });
        return newObj;
    }
    var generateExpectation = (refName, refData, diffFrom = []) => {
        var forObj = (obj, others, report, path = []) => {
            Object.keys(obj).forEach(key => {
                if (typeof (obj[key]) === 'object' && obj[key] != null) {
                    if (Array.isArray(obj)) {
                        forArrays(obj, others, report, path);
                    }else if (others.map(e => e[key]).some(e => typeof (e) !== 'object')) {
                        report('notSame', path.concat(key), obj[key]);
                    }else {
                        forObj(obj[key], others.map(e => e[key]), report, path.concat(key));
                    }
                } else {
                    if (others.some(e => e[key] !== obj[key])) {
                        report('notSame', path.concat(key), obj[key]);
                    }
                }
            });
        };
        var forArrays = (arr, otherArrs, report, path = []) => {
            otherArrs.forEach(otherArr => {
                var usedIndexes = []; //index in otherArr that was found to match something in arr
                arr.forEach(e => {
                    var isFound = false;
                    otherArr.some((otherE, otherI) => {
                        if (usedIndexes.includes(otherI)) {
                            return false;
                        }
                        if (deepEquals(e, otherE)) {
                            usedIndexes.push(otherI);
                            isFound = true;
                            return true;
                        }
                    });
                    if (!isFound) {
                        report('onlyFoundInArr', path, e);
                    }
                });
                if (usedIndexes.length !== otherArr.length) {
                    otherArr.filter((e, i) => !usedIndexes.includes(i)).forEach(e => {
                        report('missingInArr', path, e);
                    })
                }
            });
        };

        if (typeof (refData) === 'object' && refData != null) {
            var differences = [];
            var reportUnique = (msg, path, context) => {
                if (differences.find(e => e[0] === msg &&
                        JSON.stringify(e[1]) === JSON.stringify(path) &&
                        JSON.stringify(e[2]) === JSON.stringify(context))) {
                    return;
                } else {
                    differences.push([msg, path, context]);
                }
            }
            if (Array.isArray(refData)) {
                forArrays(refData, diffFrom, reportUnique);
            } else {
                forObj(withOnlyReleventProps(refData), diffFrom.map(withOnlyReleventProps), reportUnique);
            }
            return differences.reduce((a, [msg, path, context]) => {
                if (msg === 'notSame') {
                    if(typeof(context) === 'object' && context != null){
                        return a + `expect(${path.reduce((a,e)=>a+'["'+e+'"]',refName)}).toEqual(${toJasmineMatchPattern(context)});\n`;
                    }else{
                        return a + `expect(${path.reduce((a,e)=>a+'["'+e+'"]',refName)}).toBe(${JSON.stringify(context)})\n`;
                    }
                } else if (msg === 'onlyFoundInArr') {
                    return a + `expect(${path.reduce((a,e)=>a+'["'+e+'"]',refName)}).toEqual(${toJasmineMatchPattern([context])});\n`;
                } else if (msg === 'missingInArr') {
                    return a + `expect(${path.reduce((a,e)=>a+'["'+e+'"]',refName)}).not.toEqual(${toJasmineMatchPattern([context])});\n`;
                }
            }, '');
        } else {
            if (diffFrom.some(e => e !== refData)) {
                return `expect(${refName}).toBe(${JSON.stringify(refData)})\n`;
            }
            return '';
        }
    };

    //used to generate jasmine tests from the callRecords
    var generateTest = ([sessionName, callRecords], onlyAssertOn = _ => true) => {
        var callRecordsToAssertOn = callRecords.filter(onlyAssertOn);
        var userTriggeredEvents = callRecordsToAssertOn.filter(e => e.isUserTriggered)
            .filter(e => e.calledBy === -1).sort((a, b) => a.id - b.id);
        var get = key => obj => obj[key];
        var is = cond => get => e => cond(get(e));
        return userTriggeredEvents.reduce((a, userEvent, i) => {
            var nextUserEvent = userTriggeredEvents[i + 1];
            var callRecordsForThisUserEvent = callRecordsToAssertOn.filter(is(id => id > userEvent.id)(get('id')));
            if (nextUserEvent) {
                callRecordsForThisUserEvent = callRecordsForThisUserEvent.filter(is(id => id < nextUserEvent.id)(get('id')));
            }
            return innerStr => a(`
                    var ${userEvent.module} = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("${userEvent.module}");
                    ${userEvent.module}.${userEvent.controller}.${userEvent.method}(
                        ${removeLeftPadding(argTest(userEvent, callRecordsToAssertOn, innerStr))}
                    );
                `);
        }, innerStr => `it("${sessionName}", function(done){\n${removeLeftPadding(innerStr)}\n});`)('done();');
        // return callRecordsToAssertOn.filter(e => e.controller === 'businessController').map(testForCallBackReturnFnc).join('\n');
    };

    var callRecords = (_ => {
        var records = [];
        var localStorageManager = _ => localStorage;
        var recorderStorage = localStorageManager().getItem('jasmineRecorderStorage');
        var saveCurrentRecords = _ => localStorageManager().setItem('jasmineRecorderStorage', JSON.stringify({
            records
        }));
        if (recorderStorage) {
            records = JSON.parse(recorderStorage).records || [];
        }
        Error.stackTraceLimit = 100; //needed to determine if a function isUserTriggered
        var genId = _ => records.map(e => e.id).reduce((a, e) => a > e ? a : e, 0) + 1;
        var stack = [];
        var CallRecord = (moduleName, controller, method, args) => {
            var funcDoc = (called = false, args) => ({
                called,
                args,
                calledAt: new Date()
            });
            var err = Error();
            var callRecord = {
                id: genId(),
                module: moduleName,
                controller: controller,
                method: method,
                args: args.map(e => typeof (e) === 'function' ? funcDoc() : e),
                calledAt: new Date(),
                calledBy: (stack[stack.length - 1] || {
                    id: -1
                }).id,
                isUserTriggered: err.stack.includes('at Object.executeWidgetEventHandler'),
                onCallBack: (argInd, callBackArgs) => {
                    callRecord.args[argInd] = funcDoc(true, callBackArgs);
                    stack.push(callRecord);
                    saveCurrentRecords();
                },
                done: _ => {
                    stack.pop();
                    saveCurrentRecords();
                },
                callBackDone: _ => {
                    stack.pop();
                    saveCurrentRecords();
                }
            };
            stack.push(callRecord);
            return callRecord;
        };
        var callRecords = {
            new: (moduleName, controller, method, args) => {
                var callRecord = CallRecord(moduleName, controller, method, args);
                records.push(callRecord);
                saveCurrentRecords();
                return callRecord;
            },
            get: _ => [...records],
            clear: _ => {
                records = [];
                saveCurrentRecords();
            },
            saveAsSession: name => {
                var sessions = JSON.parse(localStorageManager().getItem('jasmineRecorderSessionStorage')) || [];
                sessions = sessions.filter(([n, v]) => n !== name);
                sessions.push([name, records]);
                localStorageManager().setItem('jasmineRecorderSessionStorage', JSON.stringify(sessions));
            },
            getSession: sessionName => {
                return (JSON.parse(localStorageManager().getItem('jasmineRecorderSessionStorage')) || []).find(([n]) => n === sessionName);
            },
            deleteSession: sessionName => {
                var sessions = JSON.parse(localStorageManager().getItem('jasmineRecorderSessionStorage')) || [];
                sessions = sessions.filter(([n, v]) => n !== sessionName);
                localStorageManager().setItem('jasmineRecorderSessionStorage', JSON.stringify(sessions));
            },
            generateTestsFor: (sessionName, filter) => {
                return generateTest(callRecords.getSession(sessionName), filter);
            },
            listSavedSessions: _ => {
                var sessions = {};
                (JSON.parse(localStorageManager().getItem('jasmineRecorderSessionStorage')) || [])
                .map(([n]) => [n, {
                    delete: _ => callRecords.deleteSession(n),
                    get: _ => callRecords.getSession(n),
                    generateTests: filter => callRecords.generateTestsFor(n, filter)
                }]).forEach(([n, operations]) => sessions[n] = operations);
                return sessions;
            }
        };
        return callRecords;
    })();

    var modules = Object.keys(window).filter(key => window[key] && typeof window[key].BusinessControllerConfig === 'object')
        .map(key => window[key].ModuleName)
        .map(moduleName => kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule(moduleName));

    var attachDocumentor = (module, controllerType) => {
        var controller = module[controllerType];
        detachDocumentor(controller);
        Object.keys(controller.__proto__).forEach(methodName => {
            var origMethod = controller[methodName];
            //override the original fnc to document the args
            controller[methodName] = (data, onSuccess, onError, ...other_args) => {
                var args = [data, onSuccess, onError, ...other_args];

                var callRecord = callRecords.new(
                    module.moduleName,
                    controllerType,
                    methodName,
                    args
                );
                args.forEach((arg, i) => {
                    if (typeof (arg) === 'function') {
                        //wrap any callback functions to document the args they will be called with
                        args[i] = (...callbackArgs) => {
                            //if the fnc is called it will be replaced -so only supports callbacks that are called once only
                            callRecord.onCallBack(i, callbackArgs);
                            arg(...callbackArgs);
                            callRecord.callBackDone();
                        };
                    }
                });

                //finally make the call to the actual fnc
                origMethod.apply(controller, args);
                callRecord.done();
            };
            controller[methodName].stopRecording = _ => {
                controller[methodName] = origMethod;
            };
        });
        //In case of presenter also document the presentUserInt... as this is used where response is returned
        if (typeof (controller.presentUserInterface) === 'function') {
            var origPUIfn = controller.presentUserInterface;
            controller.presentUserInterface = (...args) => {
                callRecords.new(
                    module.moduleName,
                    controllerType,
                    'presentUserInterface',
                    args
                );
                origPUIfn.call(controller, ...args);
            };
            controller.presentUserInterface.stopRecording = _ => {
                controller.presentUserInterface = origPUIfn;
            };
        }
    };

    var detachDocumentor = (controller) => {
        var isFunction = e => typeof (e) === 'function';
        Object.values(controller).filter(isFunction).forEach(fnc => {
            if (isFunction(fnc.stopRecording)) {
                fnc.stopRecording();
            }
        });
    };
    var startRecording = _ => {
        modules.forEach(module => {
            attachDocumentor(module, 'businessController');
            // attachDocumentor(module, 'presentationController');
        });
    };
    var stopRecording = _ => {
        modules.forEach(module => {
            detachDocumentor(module['businessController']);
            // detachDocumentor(module['presentationController']);
        });
    };
    var showRecords = _ => callRecords.get();
    var clearRecords = _ => callRecords.clear();
    var forwardTo = fn => (...args) => fn(...args);
    window.recorder = {
        startRecording,
        stopRecording,
        showRecords,
        clearRecords,
        session: {
            save: forwardTo(callRecords.saveAsSession),
            delete: forwardTo(callRecords.deleteSession),
            get: forwardTo(callRecords.getSession),
            generateTestsFor: forwardTo(callRecords.generateTestsFor),
            list: forwardTo(callRecords.listSavedSessions)
        }
    };
    window.testRecorderReady = true;

};
initialiseTestRecorder();