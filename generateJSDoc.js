const fs = require('fs');
const assert = require('assert');
const { exec } = require('child_process');

const lastOf = arr => arr[arr.length-1];

const mvcExtPath = './mvcextensions';
const jsDocPath = './jsDoc';
if (!fs.existsSync(jsDocPath)) {
    fs.mkdirSync(jsDocPath);
}
const pathToBC = 'BusinessControllers/BusinessController.js';
var parseTypeJSON = str => {
    return JSON.parse(str.replace(/([\w$]{1,}) :/g, '"$1" :')
    .replace(/: (\w{1,})/g, ': "$1"')
    .replace(/: \[(\w{1,})\]/g, ': ["$1"]'));
}
assert.deepStrictEqual(parseTypeJSON('{alertTypeID : string, alertTypeName : string, alertTypeDescription : string, isAlertSubscriptionRequired : boolean}'), {
    "alertTypeID": "string",
    "alertTypeName": "string",
    "alertTypeDescription": "string",
    "isAlertSubscriptionRequired": "boolean"
});
var extractJson = (str, startBraceIndex) => {
    var startBrace = str[startBraceIndex];
    var isEndBrace = char => {
        var map = {
            '[': ']',
            '{': '}'
        };
        return char === map[startBrace];
    }
    var nestLevel = 1;
    var extractedChars = [startBrace];
    var currentPos = startBraceIndex;
    while (currentPos < (str.length - 1)) {
        currentPos += 1;
        extractedChars.push(str[currentPos]);
        if (isEndBrace(str[currentPos])) {
            nestLevel -= 1;
            if (nestLevel === 0) {
                return parseTypeJSON(extractedChars.join(''));
            }
        }
        if (str[currentPos] === startBrace) {
            nestLevel += 1;
        }
    }
    throw Error('Unable to extract JSON');
};
assert.deepStrictEqual(extractJson('     * @param {alertTypeID : string, alertTypeName : string, alertTypeDescription : string, isAlertSubscriptionRequired : boolean} context',
    14), {
    "alertTypeID": "string",
    "alertTypeName": "string",
    "alertTypeDescription": "string",
    "isAlertSubscriptionRequired": "boolean"
});
var PARAM_OBJECT_SNIPPET = '@param {';
var PARAM_ARR_SNIPPET = '@param [';
var isObjectParam = (line) => line.includes(PARAM_OBJECT_SNIPPET);
var isArrayParam = (line) => line.includes(PARAM_ARR_SNIPPET);
var flatMap = (arr, mapper) => {
    var newArr = [];
    arr.forEach(e => {
        var result = mapper(e);
        if (Array.isArray(result)) {
            newArr = newArr.concat(result);
        } else {
            newArr.push(result);
        }
    });
    return newArr;
};

var jsDocObjectExpansion = (line, paramSnippet) => {
    var commentLinePrepend = line.slice(0, line.indexOf(paramSnippet));
    var objDef = extractJson(line, line.indexOf(paramSnippet) + paramSnippet.length - 1);
    var paramName = lastOf(line.trim().split(' '));
    var jsDocLinesFor = (obj, paramRef) => {
        if (Array.isArray(obj)) {
            return obj.length>0? [
                `${commentLinePrepend}${PARAM_OBJECT_SNIPPET}${typeof(obj[0])==='string'?obj[0]:'Object'}[]} ${paramRef}`,
                ...(typeof(obj[0])==='string'?[]:jsDocLinesFor(obj[0], `${paramRef}[]`))
            ] :
            `${commentLinePrepend}${PARAM_OBJECT_SNIPPET}Object} ${paramRef}`;
        } else {
            if(paramRef.endsWith('[]')){
                return flatMap(Object.keys(obj),
                    key => typeof (obj[key]) === 'string' ?
                    `${commentLinePrepend}${PARAM_OBJECT_SNIPPET}${obj[key]}} ${paramRef}.${key}` :
                    jsDocLinesFor(obj[key], `${paramRef}.${key}`)
                );
            }else if(Object.keys(obj).length === 0){
                return paramRef.includes('.') ?
                 `${commentLinePrepend}${paramSnippet}Object} ${paramRef}` :
                 `${commentLinePrepend}${paramSnippet}Object} ${paramRef} No data required for this, but pass an empty object to satisfy the standard call signature`;
            }else{
                return [
                    `${commentLinePrepend}${paramSnippet}Object} ${paramRef}`,
                    ...flatMap(Object.keys(obj),
                        key => typeof (obj[key]) === 'string' ?
                        `${commentLinePrepend}${PARAM_OBJECT_SNIPPET}${obj[key]}} ${paramRef}.${key}` :
                        jsDocLinesFor(obj[key], `${paramRef}.${key}`)
                    )
                ];
            }
        }
    };
    return jsDocLinesFor(objDef, paramName);
};
assert.deepStrictEqual(jsDocObjectExpansion('     * @param {alertTypeID : string, alertTypeName : string, alertTypeDescription : string, isAlertSubscriptionRequired : boolean} context', PARAM_OBJECT_SNIPPET),
    ['     * @param {Object} context',
        '     * @param {string} context.alertTypeID',
        '     * @param {string} context.alertTypeName',
        '     * @param {string} context.alertTypeDescription',
        '     * @param {boolean} context.isAlertSubscriptionRequired'
    ]
);
assert.deepStrictEqual(jsDocObjectExpansion('     * @param [{id : string}] context', PARAM_ARR_SNIPPET),
    ['     * @param {Object[]} context',
        '     * @param {string} context[].id'
    ]
);
var removeFunctionDef = lines => lines.map(line=>{
    const funcStartTemp = '@param (';
    if(line.includes(funcStartTemp)){
        var indentation = line.slice(0, line.indexOf(funcStartTemp));
        var paramName = lastOf(line.trim().split(' '));
        var functionDesc = line.slice(line.indexOf(funcStartTemp)+funcStartTemp.length-1, line.indexOf(' '+paramName)).replace('...callbackArgs:','');
        return `${indentation}@param {function} ${paramName} ${functionDesc}`;
    }else{
        return line;
    }
});

var addClassDefinition = (line, managerName) => {
    var indentation = line.slice(0,line.indexOf('*'));
    return [
        line, 
        `${indentation}* @alias module:${managerName}`,
        `${indentation}* @class `
    ];
};

var removeNameNMemberDocs = lines => lines.filter(line=>!(line.includes('* @name') 
    ||  line.includes('* @member')));

var transformComments = (managerName, managerStr) => {
    var fileLines = managerStr.split('\n');
    
    fileLines = [
`/**
 *@module ${managerName}
 */`,
        ...fileLines
    ]
    fileLines = flatMap(removeNameNMemberDocs(fileLines),
        line => {
            if (isObjectParam(line)) {
                return jsDocObjectExpansion(line, PARAM_OBJECT_SNIPPET);
            } else if (isArrayParam(line)) {
                return jsDocObjectExpansion(line, PARAM_ARR_SNIPPET);
            } else if(line.includes(' manages models: ')){
                return addClassDefinition(line, managerName);
            } else {
                return line;
            }
        }
    );

    return removeFunctionDef(fileLines).join('\n');
};

var transformAndWriteFile = (manager, inputPath, outputPath) => new Promise((resolve,reject)=>{
    fs.readFile(inputPath, 'utf8', function (err, data) {
        if(err){
            reject(err, inputPath, outputPath);
            return;
        }
        fs.writeFile(outputPath, transformComments(manager, data), err => {
            if(err){
                reject(err, inputPath, outputPath);
                return;
            }
            console.log('wrote ' + manager);
            resolve();
        });
    });
});
fs.readdir(mvcExtPath, function (err, items) {
    var managerModules = items.filter(e => e.endsWith('Manager'));
    Promise.all(managerModules.map(manager => {
        var businessContPath = `${mvcExtPath}/${manager}/${pathToBC}`;
        var outputPath = `./${jsDocPath}/${manager}.js`;
        return transformAndWriteFile(manager, businessContPath, outputPath);
    })).then(_=>{
        console.log('Generating JSDoc');
        exec('cd jsDoc && jsdoc -r .',_=>{
            console.log('JSDoc generated see jsDoc/out/index.html');
        });
    })
});