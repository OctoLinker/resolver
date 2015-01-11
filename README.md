# github-linker-resolve 
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image] [![Coverage Status][coveralls-image]][coveralls-url]



## Install

```bash
$ npm install --save github-linker-resolve
```


## Usage

```javascript
var githubLinkerResolve = require('github-linker-resolve');

githubLinkerResolve('user/repo'); // => https://github.com/user/repo
githubLinkerResolve('user/repo#master'); // => https://github.com/user/repo/tree/master
githubLinkerResolve('../../index.js','https://github.com/user/repo/blob/master/lib/utils/math.js'); // => https://github.com/user/repo/blob/master/index.js
githubLinkerResolve('user/repo@master'); // => https://github.com/user/tree/master
githubLinkerResolve('user/repo@master:/folder/file.js'); // => https://github.com/user/repo/blob/master/folder/file.js
```


## License

Copyright (c) 2014 Stefan Buck. Licensed under the MIT license.



[npm-url]: https://npmjs.org/package/github-linker-resolve
[npm-image]: https://badge.fury.io/js/github-linker-resolve.svg
[travis-url]: https://travis-ci.org/stefanbuck/github-linker-resolve
[travis-image]: https://travis-ci.org/stefanbuck/github-linker-resolve.svg?branch=master
[daviddm-url]: https://david-dm.org/stefanbuck/github-linker-resolve.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/stefanbuck/github-linker-resolve
[coveralls-url]: https://coveralls.io/r/stefanbuck/github-linker-resolve
[coveralls-image]: https://coveralls.io/repos/stefanbuck/github-linker-resolve/badge.png
