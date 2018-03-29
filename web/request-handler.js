var path = require('path');
var httpHelp = require('./http-helpers');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

// require more modules/folders here!

// var headers = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10, // Seconds.
//   'Content-Type': 'application/json'
// };

// var sendResponse = function(response, data, statusCode) {
//   statusCode = statusCode || 200;
  
//   response.end(JSON.stringify(data));
// };

exports.handleRequest = function (req, res) {
  if (req.url === '/favicon.ico') {
    res.writeHead(404);
    
  }
  debugger;
  console.log(req.url, req.method);
  if(req.method === 'GET') {
    httpHelp.serveAssets(res, req.url);
  }
  
  if (req.url === '/' && req.method === 'POST') {
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      
      // Remove 'url=' from body
      body = body.substr(4);
      body = body + '\n';
      
      // find a way to append body to './sites.txt'
      archive.addUrlToList(body);
      console.log(body);
    });
    httpHelp.serveAssets(res, req.url);
  }
  
  // res.end(archive.paths.list);
};