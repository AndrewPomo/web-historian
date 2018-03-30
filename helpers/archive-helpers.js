var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpHelp = require('../web/http-helpers');
var fetcher = require('../workers/htmlfetcher.js');
var axios = require('axios');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    data = data.split('\n');
    callback(data);
  });
};


exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(data) {
    callback(data.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url, (err) => {
    if (err) {
      throw err;
    }
  });
  callback();
};

exports.isUrlArchived = function(url, callback) {
  callback(fs.existsSync(exports.paths.archivedSites + '/' + url));
};

exports.downloadUrls = function(urls) {
  _.each(urls, function(url) {
    axios({
      method:'get',
      url:'http://' + url,
      responseEncoding: 'utf8'
    })
    .then(function (response) {
      
      fs.writeFile(exports.paths.archivedSites + '/' + url, response.data, (err) => {
        if (err) {
          throw err;
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log(url, 'was downloaded')
  });
};
