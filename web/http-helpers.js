var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  
  var contentType;
  var assetPath;

  if (asset === '/') {
    contentType = 'text/html';
    assetPath = archive.paths.siteAssets + '/index.html';
  }
  
  if (asset === '/styles.css') {
    contentType = 'text/css';
    assetPath = archive.paths.siteAssets + '/styles.css';
  }
  
  fs.readFile(assetPath,function (err, data){
    res.writeHead(200, {'Content-Type': contentType,'Content-Length':data.length});
    res.write(data);
    res.end();
  });
};



// As you progress, keep thinking about what helper functions you can put here!
