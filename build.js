// build.js
let fs = require('fs');
let root = "src/js";
// add files in order of compilation
let files = [
    'init.js',
    'i18n.js',
    'enwikiconfig.js',
    'ui.js',
    'fetchandloaddiff.js',
    'revert.js',
    'warn.js',
    'report.js',
    'eventHandler.js',
    'keyCombinations.js'
];
function getCredits() {
    return `* MIT Licensed - see https://github.com/Awesome-Aasim/WikiRCPatrol/blob/master/LICENSE
* 
* Copyright (c) 2020-22 Awesome Aasim and contributors
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.`
}
function getNotice() {
    return `* This script is a work in progress.  Your help in developing this tool is welcomed at https://github.com/Awesome-Aasim/WikiRCPatrol.
* Contributions and changes to this script should be made at the GitHub repository above.
* All other changes will be lost if this file is rebuilt and saved.
* By contributing to this project, you agree to release your work under the MIT license.`
}

var os = "";
os += "/*";
os += getCredits() + "\n";
os += getNotice() + "\n";
os += "*/\n";
os += "mw.loader.using(['oojs-ui-core', 'oojs-ui.styles.icons-editing-core', 'oojs-ui.styles.icons-movement', 'oojs-ui.styles.icons-interactions', 'oojs-ui.styles.icons-layout', 'oojs-ui.styles.icons-alerts'], function () {\n";
function buildAllFiles(files, i, callback) {
    if (i == files.length) callback();
    else {
        fs.readFile(root + "/" + files[i], function(err, data) {
            if (err) console.error(err);
            else {
                os += data;
                buildAllFiles(files, i + 1, callback);
            }
        });
    }
}

buildAllFiles(files, 0, function() {
    os += "})";
    console.log(os);
    fs.writeFile("rcpatrol.js", os, function(err, data) {
        if (err) console.error(err);
        else console.log(data);
    });
});