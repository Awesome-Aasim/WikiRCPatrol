<?php
// Based on the RedWarn build script, Apache 2.0 (c) WikiRCPatrol Contributors https://gitlab.com/RedWarn/RedWarn-web/-/blob/master/build.php
// USAGE: Run this in the terminal, or grab it as a web request.
//
// To output the built script into a file, run the follwing:
//
//     php build.php > WikiRCPatrol.js
//

// ==== Part 1. Defining constants ====

$jsRoot = __DIR__ . DIRECTORY_SEPARATOR . "src" . DIRECTORY_SEPARATOR . "js";

// Add your files, in order of how they'll be joined in the array below
$jsFiles = [
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

$htmlRoot = __DIR__ . DIRECTORY_SEPARATOR . "src" . DIRECTORY_SEPARATOR . "html";

$magicWords = [
	"BUILDINFO" =>
		"Build Time: " . date('d/m/Y H:i:s', time()) . "UTC" . PHP_EOL .
        "Excecuted script: " . str_replace("\\", "/", __FILE__) . PHP_EOL .
        "User: " . get_current_user() . '@'. gethostname() .' on '. php_uname('s')
];

// ==== Part 2. Function definitions ====

/**
 * Output the credits for WikiRCPatrol.
 **/
function getCredits() {
?>
* MIT Licensed - see https://github.com/Awesome-Aasim/WikiRCPatrol/blob/master/LICENSE
* 
* Copyright (c) 2020 Awesome Aasim and contributors
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
* SOFTWARE.
<?php
}

/**
 * Output the notices for Wikipedia editors.
 **/
function getNotice() {
?>
* This script is a work in progress.  Your help in developing this tool is welcomed at https://github.com/Awesome-Aasim/WikiRCPatrol.
* Contributions and changes to this script should be made at the GitHub repository above.
* All other changes will be lost if this file is rebuilt and saved.
* By contributing to this project, you agree to release your work under the MIT license.
<?php
}

/**
 * Read a JavaScript file from the sources directory.
 *
 * @param $file string The filename to be used
 * @return false|string The contents of the requested JavaScript file.
 */
function readJSSourceFile($file) {
    global $jsRoot;

    return file_get_contents($jsRoot . DIRECTORY_SEPARATOR . $file);
}

/**
 * Process JavaScript includes and magic words.
 *
 * @param $fileContents string Raw executable JavaScript.
 * @return string The processed JavaScript code.
 **/
function processJS($fileContents) {
    return processMagicWords(
		processIncludedFiles(
			$fileContents
		)
	);
}

/**
 * Process JavaScript includes.
 *
 * @param $fileContents string The JavaScript code to be processed.
 * @return string The processed JavaScript code.
 **/
function processIncludedFiles($fileContents) {
    return preg_replace_callback(
		"#\[\[\[\[include (.+?)]]]]#",
		function ($matches) {
			global $htmlRoot;

			$filePath = $htmlRoot . DIRECTORY_SEPARATOR . $matches[1];

			return file_exists($filePath) ?
				file_get_contents($filePath) : "!!!! WikiRCPatrol Build Error: failed to include " . $matches[1]. " !!!!";
		},
        $fileContents
	);
}

/**
 * Process magic words into their respective output values.
 *
 * @param $fileContents string The JavaScript code to be processed.
 * @return string The processed JavaScript code.
 **/
function processMagicWords($fileContents) {
	return preg_replace_callback(
		"#\[\[\[\[(\S+)]]]]#",
		function ($matches) {
			global $magicWords;
			if (isset($magicWords[$matches[1]]))
				return $magicWords[$matches[1]];
			else
				return $matches[0];
		},
        $fileContents
	);
}

/**
 * Outputs processed JavaScript from the loading list.
 **/
function getJSSources() {
    global $jsFiles;
    $js = "";

    foreach($jsFiles as $file) {
        $js .= readJSSourceFile($file) . PHP_EOL;
    }

    echo processJS($js);
}

/**
 * Outputs everything.
 */
function buildScript() {?>
/**
<?php getCredits(); ?>

<?php getNotice(); ?>
**/
// <nowiki>

mw.loader.using( ['oojs-ui-core', 'oojs-ui.styles.icons-editing-core', 'oojs-ui.styles.icons-movement', 'oojs-ui.styles.icons-interactions', 'oojs-ui.styles.icons-layout', 'oojs-ui.styles.icons-alerts'], function () {
<?php getJSSources(); ?>
});
// </nowiki>
<?php
}

// ==== Part 3. Output ====

header("Content-Type: application/javascript; charset=utf-8");
buildScript();