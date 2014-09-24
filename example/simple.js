/*
 * github-linker-resolve
 * https://github.com/stefanbuck/github-linker-resolve
 *
 * Copyright (c) 2014 Stefan Buck
 * Licensed under the MIT license.
 */

'use strict';

var githubLinkerResolve = require('../');

console.log(githubLinkerResolve('user/repo')); // => https://github.com/user/repo
console.log(githubLinkerResolve('../../index.js','https://github.com/user/repo/blob/master/lib/utils/math.js')); // => https://github.com/user/repo/blob/master/index.js
console.log(githubLinkerResolve('user/repo@master')); // => https://github.com/user/tree/master
console.log(githubLinkerResolve('user/repo@master:/folder/file.js')); // => https://github.com/user/repo/blob/master/folder/file.js
