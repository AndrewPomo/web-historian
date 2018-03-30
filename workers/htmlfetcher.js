var path = require('path');
var httpHelp = require('../web/http-helpers');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var axios = require ('axios')

// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

// Write a script in workers/htmlfetcher.js that uses the code in helpers/archive-helpers.js to download files when it runs (and then exit)

exports.downloadAll = function(listOfUrls) {
  archive.readListOfUrls(function(listOfUrls) {
    archive.downloadUrls(listOfUrls);
  })
}