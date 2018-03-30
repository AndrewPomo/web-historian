var path = require('path');
var httpHelp = require('./http-helpers');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var fetcher = require('../workers/htmlfetcher.js');

exports.handleRequest = function (req, res) {
  if (req.url === '/favicon.ico') {
    res.writeHead(404);
    res.end(); 
  }

  console.log(req.url, req.method);
  
  if(req.method === 'GET') {
    if(req.url === '/' || req.url === '/styles.css') {
      fetcher.downloadAll(archive.paths.list);
      httpHelp.serveAssets(res, req.url);
    } else {
      archive.isUrlArchived(req.url, function(exists) {
        if (exists){
          httpHelp.serveArchives(res, req.url);
        } else {
          res.writeHead(404);
          res.end();
        }
      });
    }
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
      
      archive.addUrlToList(body, function () {        
        archive.isUrlArchived(body, function(exists) {
          if (exists){
            console.log('tried to load archive')
            httpHelp.serveArchives(res, body);
          } else {
            console.log('tried to load loading page')
            httpHelp.serveAssets(res, '/loading.html');
          }
        }); 
      });
      console.log(body);
    });
    
  }
  
  // res.end(archive.paths.list);
};