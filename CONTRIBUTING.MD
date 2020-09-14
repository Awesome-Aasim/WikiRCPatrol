## Setting up a development server
* Make sure you have PHP installed
* Clone the WikiRCPatrol project from GitHub with `git clone https://github.com/Awesome-Aasim/WikiRCPatrol.git`
* Remove all release versions of the script from your common.js, and replace with or add `mw.loader.load('http://localhost:9696/build.php')`
* In a terminal, ensure you are in the WikiRCPatrol directory and run `php -S localhost:9696` to start the devlopment server.
* To build a final file to paste to Wikipedia, use `php build.php > WikiRCPatrol.js`