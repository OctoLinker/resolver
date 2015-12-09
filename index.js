/*
 * octo-linker-resolve
 * https://github.com/octo-linker/octo-linker-resolve
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

function localPath (value, href) {
  if (isLocalPath(value)) {
    return url.resolve(href, value);
  }
  return null;
}

function githubShorthand (value) {
  return ghShorthand(value, true);
}

function githubGitUrl (value) {
  return ghParse(value);
}

function duo (value) {
  var result = null;
  var gh = duoParse(value);
  if (gh.user && gh.repo) {
    if (gh.path) {
      // resolve duojs shorthand like user/repo@master:/file.js
      result = util.format('%s/%s/blob/%s%s', gh.user, gh.repo, gh.ref, gh.path);

    } else if (gh.ref) {
      // resolve duojs shorthand like user/repo@master
      result = util.format('%s/%s/tree/%s', gh.user, gh.repo, gh.ref);
    }

    if (result) {
      return url.resolve('https://github.com', result);
    }
  }
  return null;
}

module.exports = function(dep, href) {
  var result = '';
  var flow = [localPath, githubShorthand, githubGitUrl, duo];

  for (var i = flow.length - 1; i >= 0; i--) {
    result = flow[i](dep, href);
    if (result) {
      break;
    }
  }

  return removeTrailingSlash(result || '');
};
