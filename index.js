/*
 * github-linker-resolve
 * https://github.com/stefanbuck/github-linker-resolve
 *
 * Copyright (c) 2014 Stefan Buck
 * Licensed under the MIT license.
 */

'use strict';

var url = require('url');
var util = require('util');
var duoParse = require('duo-parse');

var isLocalPath = function(val) {
  if (val === '..') {
    return true;
  }

  var result = val.match(/^(\.\/|\.\.\/)/gm);
  if (result && result.length > 0) {
    return true;
  }

  return false;
};

function removeTrailingSlash(value) {
  if (value.slice(-1) === '/') {
    return value.slice(0,-1);
  }

  return value;
}

module.exports = function(dep, href) {
  var result = '';
  var baseUrl = 'https://github.com';

  var gh = duoParse(dep);

  if (isLocalPath(dep)) {

    // resolve local path like ../folder/file.js
    result = url.resolve(href, dep);

  } else if (gh.user && gh.repo) {

    if (gh.path) {

      // resolve duojs shorthand like user/repo@master:/file.js
      result = util.format('%s/%s/blob/%s%s', gh.user, gh.repo, gh.ref, gh.path);

    } else if (gh.ref) {

      // resolve duojs shorthand like user/repo@master
      result = util.format('%s/%s/tree/%s', gh.user, gh.repo, gh.ref);

    } else {

      // resolve gihtub shorthand like https://github.com/user/repo
      result = util.format('%s/%s', gh.user, gh.repo);
    }
  }

  result = removeTrailingSlash(result);

  if (result) {
    return url.resolve(baseUrl, result);
  }

  return '';
};
