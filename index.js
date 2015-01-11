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
var ghParse = require('github-url-from-git');
var ghShorthand = require('github-url-from-username-repo');

function isLocalPath(val) {
  if (val === '..') {
    return true;
  }

  var result = val.match(/^(\.\/|\.\.\/)/gm);
  if (result && result.length > 0) {
    return true;
  }

  return false;
}

function removeTrailingSlash(value) {
  if (value.slice(-1) === '/') {
    return value.slice(0,-1);
  }

  return value;
}

function resolver(dep, href) {
  var result = '';
  var baseUrl = 'https://github.com';

  // resolve local path like ../folder/file.js
  if (isLocalPath(dep)) {
    return url.resolve(href, dep);
  }

  // resolve github shorthands like user/repo
  result = ghShorthand(dep, true);
  if (result) {
    return result;
  }

  // resolve git urls from github like git://github.com/user/repo
  // TODO: Handle other git url as well
  result = ghParse(dep);
  if (result) {
    return result;
  }

  // Duo resolver
  var gh = duoParse(dep);
  if (gh.user && gh.repo) {
    if (gh.path) {
      // resolve duojs shorthand like user/repo@master:/file.js
      result = util.format('%s/%s/blob/%s%s', gh.user, gh.repo, gh.ref, gh.path);

    } else if (gh.ref) {
      // resolve duojs shorthand like user/repo@master
      result = util.format('%s/%s/tree/%s', gh.user, gh.repo, gh.ref);
    }

    if (result) {
      return url.resolve(baseUrl, result);
    }
  }

  return '';
}

module.exports = function(dep, href) {
  var result = resolver(dep, href);
  return removeTrailingSlash(result);
};
