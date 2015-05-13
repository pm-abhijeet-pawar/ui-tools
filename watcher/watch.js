/**
Usage: watch [folder_to_watch]
folder_to_watch is optional and defaults to 'ui'
**/

var chokidar = require('chokidar');
var fs = require('fs');
var mPath = require('path');

var CWD = process.argv[2];
var TOMCAT = 'E:\\Dev_Programs\\apache-tomcat-7.0.34\\';
var TOMCAT_ROOT = TOMCAT + 'webapps\\ROOT\\';
var TOMCAT_APP = TOMCAT + 'webapps\\ui\\'; // Change this as per requirement

var folderToWatch = CWD + "\\" + (process.argv[3] || 'ui') + "\\";

console.log('\n');
console.log('COPY: ', folderToWatch, ' >>>> ' , TOMCAT_APP , ' \n');

fs.mkdirParent = function(dirPath, mode, callback) {

    if (fs.existsSync(dirPath)) {
        callback();
    } else {
        if (!fs.existsSync(mPath.dirname(dirPath))) {
            mkdirParent(mPath.dirname(dirPath), mode, callback);
        }
        fs.mkdir(dirPath, mode, function (error) {
            callback && callback(error);
        });
    }

    /*
    if (fs.existsSync(dirPath)){
        callback();
        return;
    }

    //Call the standard fs.mkdir
    fs.mkdir(dirPath, mode, function(error) {
        //When it fail in this way, do the custom steps
        if (error && error.errno === '-4058') {
            //Create all the parents recursively
            fs.mkdirParent(mPath.dirname(dirPath), mode, callback);
            //And then the directory
            fs.mkdirParent(dirPath, mode, callback);
        }
        //Manually run the callback since we used our own callback to do all these
        callback && callback(error);
    });
    */
};

function copyFile(path, stats) {
	//var relPath = TOMCAT_APP + path; //path.replace(folderToWatch, tomcatWeb),
	var fullPath = folderToWatch + path;

	var cont = fs.readFileSync(fullPath, 'utf8');

	//console.log(path);
	var appDir = mPath.dirname(TOMCAT_APP + path);
	var rootDir = mPath.dirname(TOMCAT_ROOT + path);


	fs.mkdirParent(appDir, 0777, function () {
		fs.writeFileSync(TOMCAT_APP + path, cont);
	});

	fs.mkdirParent(rootDir, 0777, function (err) {;
		fs.writeFileSync(TOMCAT_ROOT + path, cont);
	});

	//fs.writeFileSync(TOMCAT_APP + path, cont);
	//fs.writeFileSync(TOMCAT_ROOT + path, cont);
	console.log(stats.mtime.toLocaleTimeString(), ' | ', path);
}

var watcher = chokidar.watch("", {
	ignored: [/^\./, '_archive', 'node_modules'],
	persistent: true,
	ignoreInitial: true,
	cwd: folderToWatch
});

watcher
  .on('add', copyFile)
  .on('change', copyFile);
//  .on('unlink', function(path) {console.log('File', path, 'has been removed');})
//  .on('error', function(error) {console.error('Error happened', error);})




// 'add' and 'change' events also receive stat() results as second argument.
// http://nodejs.org/api/fs.html#fs_class_fs_stats
/* watcher.on('change', function(path, stats) {
  console.log('File', path, 'changed size to', stats.size);
});*/
